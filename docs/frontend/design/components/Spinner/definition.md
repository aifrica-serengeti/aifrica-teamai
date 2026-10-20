# Spinner — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

**의존 컴포넌트 없음.** Spinner 는 단일 인라인 SVG 로 자급적이며, 다른 공용 컴포넌트에
의존하지 않는다.

---

## 3. 구조 (Anatomy)

```
Spinner (span 요소 — 회전 컨테이너)
└── svg (viewBox 48×48)
    ├── circle (Track)     ── 배경 원 링. 완전한 원. 정지(대칭이므로 회전 무시)
    ├── path (Indicator)   ── 270° 회전 아크. 12시(top) → 3시 → 6시(bottom)
    └── defs
        └── linearGradient ── 수직 그라데이션(top 불투명 → bottom 투명)
```

- **Track**(`circle`): 배경 역할 원 링. `cx=cy=24, r=18, stroke-width=N`. 색상 균일.
- **Indicator**(`path`): 실제 진행 상태를 나타내는 270° 호. `stroke-linecap="round"`.
  12시 방향(top)에서 시작해 시계 방향으로 3시, 6시를 거쳐 끝.
- **linearGradient**: Indicator 의 stroke 그라데이션. 수직(y 축) 기준으로
  top(12시, 진함)에서 bottom(6시, 투명)으로 선형 분포.
- Spinner 는 `role="status"` + `aria-label` 로 스크린리더에 로딩 상태를 전달한다.

### Anatomy 번호 (Figma 가이드라인 node 10903:3354)

| #   | 요소          | 설명                                |
| --- | ------------- | ----------------------------------- |
| 1   | **Indicator** | 실제 진행 상태를 나타내는 회전 아크 |
| 2   | **Track**     | 배경 역할을 하는 원 링              |

---

## 4. 레이아웃 스펙

### 비율 (모든 size 공통)

원본 48px 마스터 SVG(circle `cx=24 cy=24 r=18`, `viewBox 48×48`) 기준:

| 비율      | 값                 | 비고                                            |
| --------- | ------------------ | ----------------------------------------------- |
| r / box   | **0.375**          | 원 반지름이 박스 크기의 37.5% (예: 48px → r=18) |
| path 각도 | **270°**           | 12시(top) → 3시 → 6시(bottom) 호                |
| path 시작 | **12시 방향(top)** | y 최소값에서 시작                               |

> 단일 SVG(viewBox 48×48)를 size 만큼 CSS 로 스케일한다.
> `vector-effect: non-scaling-stroke` 로 스케일 시에도 stroke 두께가 물리 픽셀로 유지된다.

### Size 별 치수 (Figma 교차 검증 + 마스터 비율 보정)

| Size        | box (레이아웃) | ring 직경 (2r) | stroke-width | stroke/ring 비율 |
| ----------- | -------------- | -------------- | ------------ | ---------------- |
| **Tiny**    | 16px           | 12px           | **2px**      | 16.7%            |
| **Small**   | 20px           | 15px           | **2px**      | 13.3%            |
| **Medium**  | 24px           | 18px           | **2px**      | 11.1%            |
| **Large**   | 36px           | 27px           | **3px**      | 11.1%            |
| **X-Large** | 48px           | 36px           | **4px**      | 11.1%            |

> **Medium 보정 주의**: Figma 개별 SVG 내보내기에서는 Medium 의 stroke-width 가
> `1.5px`로 나오나, 이는 `preserveAspectRatio="none"`拉伸으로 인한 왜곡이다.
> 마스터 SVG 비율(stroke/r = 0.222)로 역산하면 Medium = 2px이며, Large/X-Large 와
> 동일한 11.1% 비율을 가져 시각적 일관성이 확보된다. **2px 을 정값으로 사용한다.**

### 공통 레이아웃

| 항목      | 값                                        |
| --------- | ----------------------------------------- |
| 요소      | `<span>` (인라인 컨테이너) + 자식 `<svg>` |
| 배치 방식 | `inline-flex`, 중앙 정렬                  |
| 회전축    | 중심(center)                              |
| 회전 방향 | 시계 방향(0° → 360°)                      |
| viewBox   | `0 0 48 48` (고정, size 로 스케일)        |

---

