# Stepper — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

의존 컴포넌트 없음. 모든 요소(원형 인디케이터, 체크/X 마크, 연결선, 라벨)를 자체 렌더한다.

---

## 3. 구조 (Anatomy)

### Horizontal (라벨이 icon **오른쪽**)

```
Stepper (HORIZONTAL, gap 16, items-center, width 100%)
├── Stepper-item (flex-col, flex:1)            × n
│   ├── Step (flex-row, gap 16, items-center, w-full)
│   │   ├── Icon + Label (flex-row, gap 8, items-center)
│   │   │   ├── Stepper-icon (20px 원)
│   │   │   │   ├── 체크 SVG (Completed)
│   │   │   │   ├── 숫자 (Active/Incomplete/Disabled)
│   │   │   │   └── X SVG (Invalid)
│   │   │   └── Stepper-base (라벨 텍스트 / 전체·단계 clickable 시 button)
│   │   └── Divider (flex:1, h-px)             ← 마지막 item 제외
│   └── Help Text (pl-28)                      ← optional
├── Stepper-item ...
└── Stepper-item (마지막 — Divider 없음, 콘텐츠 너비만 차지)
```

### Vertical (라벨이 icon **오른쪽**, help text가 icon 아래 절대 위치)

```
Stepper (flex-col, items-start, stretch)
├── Stepper-item (flex-col, flex:1)            × n
│   ├── Icon + Label (flex-row, gap 8, items-center)
│   │   ├── Stepper-icon (20px 원)
│   │   └── Stepper-base (라벨 텍스트 / 전체·단계 clickable 시 button)
│   ├── Divider wrap (flex:1, px-9.5, py-6)    ← 마지막 item 제외
│   │   └── line (h-full, w-px)
│   └── Help Text (absolute, left:28, top:20)  ← optional
├── Stepper-item ...
└── Stepper-item (마지막 — Divider 없음)
```

---

## 4. 레이아웃 스펙

모든 수치는 px 단위. Figma boundingBox / MCP 코드 / REST API 교차 검증 값.

### Stepper 컨테이너

| 항목        | Horizontal     | Vertical                 | 비고             |
| ----------- | -------------- | ------------------------ | ---------------- |
| 방향        | `flex-row`     | `flex-col`               | —                |
| 정렬        | `items-center` | `items-start`            | —                |
| item 간 gap | `16`           | `0` (item 자체가 flex:1) | —                |
| stretch     | width 100%     | `align-self: stretch`    | 부모 높이에 맞춤 |

Horizontal의 마지막 item은 `flex: 0 0 auto`로 콘텐츠 너비만 차지한다. 앞 단계의
divider가 남은 공간을 채우므로 마지막 라벨 뒤에 빈 flex 영역이 생기지 않는다.

### Stepper-icon (원형 인디케이터)

| 항목          | 값            | 비고                                                                                 |
| ------------- | ------------- | ------------------------------------------------------------------------------------ |
| 크기          | **20 × 20px** | **항상 20px** — size prop(Small/Medium)과 무관                                       |
| border-radius | `50%` (원형)  | —                                                                                    |
| border 두께   | `1.25px`      | Completed/Active/Incomplete/Invalid/Disabled 공통                                    |
| border 스타일 | `solid`       | —                                                                                    |
| 내부 패딩     | 없음          | Completed 체크 SVG 가 8.47~10.83px 고정 크기로 icon 중앙에 표시되므로 padding 불필요 |

> **핵심 규칙**: Stepper-icon은 **항상 20px(Medium)** 이다. size prop의 Small/Medium 차이는
> **Stepper-base(라벨) 폰트 크기**와 **숫자 폰트**에만 반영된다. Figma MCP 코드에서
> `StepperItem size="Small"`이 `StepperIcon size="Medium"`을 호출하는 것으로 확인.

### Divider (연결선) — Horizontal

| 항목      | 값                                                                                         | 비고                                                                 |
| --------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| 형태      | 가로선                                                                                     | `height: 1px`                                                        |
| 너비      | `flex: 1`                                                                                  | 두 icon 사이 남은 공간을 균등 분할                                   |
| 최소 너비 | `8px`                                                                                      | 공간 부족 시에도 선 표시                                             |
| 위치      | icon 수직 중심 (icon 20px → marginTop 불필요, Step 행 items-center)                        | —                                                                    |
| 구조      | `Icon+Label` 그룹(div)과 `Divider`(div)가 **형제**로 `Step` 행(flex-row, gap 16) 안에 배치 | Divider는 icon+label 그룹 **전체** 다음에 위치 (label 끝에서 시작 X) |

> **Divider 배치 핵심**: Step 행 구조는 `[Icon+Label(shrink-0)] ── gap 16 ── [Divider(flex:1)]` 이다.
> Divider는 icon 바로 옆이 아니라 **icon+label 그룹 끝에서 gap 16px 후** 시작한다.
> 이유: Figma에서 Step 행의 gap-16이 Icon+Label 그룹과 Divider 사이에 적용되기 때문.
> label이 없는(showLabel=false) 경우에도 동일한 구조를 유지한다 — icon만 있는 그룹 뒤에 Divider.

> **⚠️ 가로 divider 너비 압축 버그 방지 (핵심 — 이 함정으로 divider가 8px로 압축되어 안 보임)**:
>
> Horizontal Stepper는 **반드시 부모 컨테이너 전체 폭을 사용**해야 한다 (`width: 100%`).
> 부모가 `align-items: flex-start` 이거나 Stepper 에 width: 100% 가 없으면, Stepper 가
> content 너비만 차지해서 `flex: 1` divider 가 **`min-width: 8px`까지 압축**되어 거의 보이지 않는다.
>
> ```tsx
> /* ❌ 잘못 — 부모가 flex-start 여서 Stepper 가 좁아짐 → divider 8px 압축 */
> <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
>   <Stepper direction="horizontal" ... />  {/* width 미지정 → content 너비만 */}
> </div>
>
> /* ✅ 올바름 — Stepper 에 width: 100% 명시 */
> <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
>   <Stepper direction="horizontal" ... style={{ width: '100%' }} />
> </div>
> ```
>
> Divider 가 보이지 않으면 Stepper 의 `offsetWidth` 를 확인하라 — 부모 폭보다 작으면
> `width: 100%` 가 빠진 것이다.

### Divider 표시 규칙 (매우 중요)

Divider는 **마지막 step을 제외한 모든 step에 항상 존재한다**.

| 조건                                                       | Divider 표시 | 비고                        |
| ---------------------------------------------------------- | ------------ | --------------------------- |
| 마지막 step                                                | **없음**     | 더 이상 다음 step이 없음    |
| 그 외 모든 step (completed/active/incomplete/invalid 포함) | **있음**     | invalid step도 divider 있음 |

```typescript
// 구현 로직 — 마지막 step만 제외
const showDivider = !isLast;
```

> **주의**: invalid(에러) step도 divider가 있습니다. divider를 제거하면 안 됩니다.
> 마지막 step만 divider가 없습니다. Vertical에서도 동일합니다.

### Divider (연결선) — Vertical

| 항목           | 값                                                          | 비고                                                 |
| -------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| 래퍼           | `flex: 1, align-items: stretch, padding: 0 9.5px 6px 9.5px` | icon 중앙 정렬용 패딩 + 세로선 stretch               |
| 내부 선        | `width: 1px` (height 명시 **금지**)                         | 래퍼 높이만큼 stretch. height: 100% 금지 (아래 경고) |
| 위치           | icon 수평 중심 (icon 20px → paddingLeft 9.5px = 10 - 0.5)   | —                                                    |
| 최소 래퍼 높이 | `32px`                                                      | —                                                    |
| align-self     | `stretch`                                                   | item 내부에서 남은 공간 차지                         |
| 표시 규칙      | 마지막 step만 제외                                          | Horizontal과 동일                                    |

> **정렬 계산**: icon 반지름(10px) - 선 반(0.5px) = **9.5px** padding-left로 icon 중앙에 선 위치.

> **⚠️ 세로선 height 0px 버그 방지 (핵심 — 이 함정으로 세로선이 안 보이는 버그 발생함)**:
>
> `vDividerWrap`은 **반드시 `align-items: stretch`** 여야 한다.
> 내부 선(`vDivider`)은 `height: 100%`를 **쓰면 안 된다** — height 속성을 아예 설정하지 않는다.
>
> **원인**: flex 컨테이너에서 자식이 `height: 100%`를 가지면, 부모에 명시적 height가 없을 때
> 100%가 **0px**로 계산된다. `align-items: center`로 두면 자식이 stretch 되지 않아
> 세로선 height가 0이 되어 **화면에서 보이지 않는다**.
>
> ```css
> /* ❌ 잘못 — 세로선이 안 보임 (height 0px) */
> .vDividerWrap {
>   display: flex;
>   align-items: center;
> } /* center 금지 */
> .vDivider {
>   height: 100%;
> } /* flex에서 0px 됨 */
>
> /* ✅ 올바름 — 세로선이 wrap 높이만큼 stretch */
> .vDividerWrap {
>   display: flex;
>   align-items: stretch;
> } /* stretch 필수 */
> .vDivider {
>   /* height 속성 없음 — 자동 stretch */
> }
> ```

### Icon + Label 행

| 항목 | 값             |
| ---- | -------------- |
| 방향 | `flex-row`     |
| gap  | `8px`          |
| 정렬 | `items-center` |

### Help Text

| 항목 | Horizontal                                     | Vertical                       |
| ---- | ---------------------------------------------- | ------------------------------ |
| 위치 | Step 행 아래                                   | `position: absolute`           |
| left | `28px` (icon 20 + gap 8 = label 시작점과 동일) | `28px`                         |
| top  | — (Step 아래 자동)                             | `20px` (icon 높이 = icon 아래) |

---
