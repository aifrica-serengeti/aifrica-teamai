# Status — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Status 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Status 의 **In progress** 상태는 공용 **Spinner** 컴포넌트를 사용한다. 재현자는
Status 를 구현하기 전에 Spinner 를 먼저 확보해야 한다.

| 의존 컴포넌트 | 가이드라인                   | 구현 여부 | 사용 상태    | 비고                                                             |
| ------------- | ---------------------------- | --------- | ------------ | ---------------------------------------------------------------- |
| **Spinner**   | [`Spinner/README.md`](../Spinner/README.md) | ✅ 참조 계약 · 매핑 확인 필요 | `inProgress` | `size="small"`(20px) 사용. Status icon 박스(20×20)에 정확히 일치 |

나머지 8개 상태(Error / Warning / Success / Normal / Incomplete / Not started /
Pending / Info)는 인라인 SVG 로 자체 렌더하므로 추가 의존성이 없다.

> Spinner 컴포넌트는 자체적으로 `role="status"` + `aria-label="로딩 중"` 을 가진다.
> Status(inProgress) 의 부모 `role="status"` 와 중복을 피하기 위해 Spinner 에
> `aria-hidden="true"` 를 전달하여 스크린리더가 부모 Status 의 라벨만 읽도록 한다.

---

## 3. 구조 (Anatomy)

```
Status (span 요소 — role="status")
├── State icon (20×20 박스)
│   └── svg (인라인 SVG 또는 Spinner 컴포넌트)
└── Label text ── Body2 / Pretendard Regular 14px (showLabel={false} 시 생략)
```

- **Status container:** `<span>` 인라인 플렉스(`inline-flex`), `align-items: center`,
  `gap: 4px`. State icon 과 Label 을 가로로 나란히 배치.
- **State icon wrapper:** 20×20 고정 박스. Status 는 단일 사이즈만 지원한다.
  내부에 인라인 SVG(8개 상태) 또는 Spinner 컴포넌트(inProgress)를 가로·세로 중앙 정렬.
- **Label:** Pretendard Regular 14px / line-height 20px, `--text` 색상. 상태 이름(또는
  커스텀 텍스트). `showLabel={false}` 시 렌더하지 않음(아이콘만).
- Status 는 `role="status"` + `aria-label` 로 스크린리더에 상태를 전달한다.

---

## 4. 레이아웃 스펙

### 공통 레이아웃

| 항목            | 값                                                         |
| --------------- | ---------------------------------------------------------- |
| 요소            | `<span>` (인라인)                                          |
| 배치 방식       | `inline-flex`, 가로 정렬, 세로 중앙(`align-items: center`) |
| gap(icon↔label) | **4px**                                                    |
| white-space     | `nowrap` (Label 줄바꿈 방지)                               |

### State icon 치수 (Figma 교차 검증)

모든 State icon은 **20×20px 레이아웃 영역**을 차지한다. 인라인 SVG 상태는
20×20 viewBox로 렌더하며, In progress는 `size="small"` Spinner를 같은 20×20px
영역에서 렌더한다.

| 아이콘 분류                                        | 도형            | 반경(r)   | stroke-width | 비고                                      |
| -------------------------------------------------- | --------------- | --------- | ------------ | ----------------------------------------- |
| **채워진 원** (error/warning/success/pending/info) | `circle` fill   | **8.335** | —            | center (10, 10)                           |
| **테두리 원** (normal)                             | `circle` stroke | **7.708** | **1.25**     | 투명 fill + primary stroke(실선)          |
| **점선 원** (incomplete/notStarted)                | `circle` stroke | **7.708** | **1.25**     | `stroke-dasharray` 보정값 사용(아래 참조) |

> **Figma 근거**: 채워진 원은 Figma `aspect-[18/18]` 원본(circle r=8.335 in 16.67 마스터).
> 테두리/점선 원은 Figma `Ellipse 9`(r=7.708 in 16.667 마스터).
> 두 반경이 다르므로 주의(8.335 ≠ 7.708).

### 점선 원의 dasharray 보정 (핵심)

Figma 원본 점선 원은 `stroke-dasharray="1.67 3.33"` 을 사용한다. 그러나 이 값을
브라우저 SVG `<circle>` 에 그대로 적용하면 **3시 방향(시작점)에서 두 대시가 겹쳐
하나로 길게 보이는 문제**가 발생한다.

원인: 원 둘레(`2π × 7.708 = 48.433`)가 패턴 길이(`1.67 + 3.33 = 5.0`)로 정확히
나누어 떨어지지 않기 때문(`48.433 / 5.0 = 9.686개`). Figma 툴은 점선을 둘레에 맞춰
균등 분할하지만, 브라우저 SVG 는 시작점에서 단순 반복한다.

**해결:** 둘레를 **정확히 10개 대시**로 나누도록 보정한다. Figma 원본의
대시:갭 비율(1.67:3.33 ≈ 1:2)을 유지.

| 항목                 | 값                                              |
| -------------------- | ----------------------------------------------- |
| 원 둘레              | `2π × 7.708` = **48.433px**                     |
| Figma 원본 dasharray | `1.67 3.33` (패턴 5.0 → 9.686개, 겹침 발생)     |
| **보정 dasharray**   | **`1.6177 3.2256`** (패턴 4.8433 → 정확히 10개) |

---

