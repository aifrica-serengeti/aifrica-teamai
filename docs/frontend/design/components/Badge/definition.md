# Badge — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Badge 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

**의존 컴포넌트 없음.** Badge 는 단일 point 색상과 숫자만으로 구성되는 자급적
컴포넌트로, 다른 공용 컴포넌트에 의존하지 않는다.

> 단, **배치(Position)** 시 Badge 를 겹쳐 보여줄 호스트 요소(예: Icon Button)가 필요하다.
> 이는 Badge 의 의존성이 아니라 사용 측의 조합이며, 호스트 요소의 구현은 해당 컴포넌트의
> 가이드라인을 따른다.

---

## 3. 구조 (Anatomy)

```
Badge (span 요소)
├── Dot          ── 원형(dot variant). 자식 없음.
└── Counter      ── 둥근 사각형 + 숫자(counter variant)
    └── Label text  ── Pretendard SemiBold 10px (숫자 또는 "99+")
```

- **Dot container:** 원형(`border-radius: 50%`) 단일 채움. 자식 요소 없음.
- **Counter container:** 둥근 사각형(`border-radius: 8px`) `inline-flex` 가로/세로 중앙 정렬.
- **Label:** Pretendard SemiBold 10px / line-height 12px, `--element-on-point` 색상.
- Badge 는 `role="status"` + `aria-label` 로 스크린리더에 알림 수를 전달한다.

### 배치 (Position) — 호스트 요소와 조합

```
Host container (position: relative)
├── Host element (Icon Button 등) — position: static
└── Badge                         — position: absolute, 우상단 (translate(50%, -50%))
```

- Badge 를 겹칠 호스트 요소를 `position: relative` 로 감싸고, Badge 에
  `position: absolute; top: 0; right: 0; transform: translate(50%, -50%)` 를 적용해
  우상단에 중심축으로 걸치듯 배치한다.

---

## 4. 레이아웃 스펙

### Variant 치수 (Figma 교차 검증)

| Variant             | 가로             | 세로     | padding-x | radius         | 비고                              |
| ------------------- | ---------------- | -------- | --------- | -------------- | --------------------------------- |
| **Dot**             | **6px**          | **6px**  | —         | **50%** (원형) | 고정 크기. 자식 없음              |
| **Counter** (1자리) | min **16px**     | **16px** | **4px**   | **8px**        | 숫자 폭에 따라 확장               |
| **Counter** ("99+") | **28px** @ "99+" | **16px** | **4px**   | **8px**        | 콘텐츠 폭(20px 텍스트 + 8px 패딩) |

> **Figma 근거**: 라이트 node `11394:7146` 과 다크 node `10704:30302` 의 Badge
> instance(`10704:30111`/`30112`/`30113`)를 교차 검증. Dot = `size-[6px]`,
> Counter = `h-[16px] min-w-[16px] px-[4px] rounded-[8px]`, "99+" = `w-[28px]`.
> 텍스트 컨테이너 height 9px(`h-[9px]`)에 line-height 12px(`leading-[12px]`)로
> 수직 중앙 정렬된다.

### 공통 레이아웃

| 항목        | 값                                          |
| ----------- | ------------------------------------------- |
| 요소        | `<span>` (인라인)                           |
| 배치 방식   | `inline-flex`, 가로/세로 중앙 정렬(Counter) |
| border 두께 | 없음 (배경 채움 전용)                       |
| white-space | `nowrap` (Counter 숫자 줄바꿈 방지)         |
| 글자 정렬   | `center` (Counter)                          |

---

