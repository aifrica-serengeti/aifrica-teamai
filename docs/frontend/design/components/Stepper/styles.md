# Stepper — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

> 모든 색상은 `--stepper-*` semantic 토큰으로 참조한다. raw palette 직접 참조 금지.
> 토큰 정의는 §11 참조.

### Stepper-icon (원형)

| 상태           | 배경 (fill)         | 테두리 (stroke)             | 내부 마크 | 마크 색상              |
| -------------- | ------------------- | --------------------------- | --------- | ---------------------- |
| **Completed**  | `#ffffff`           | `var(--accent-500)` 1.25px            | 체크 SVG  | `var(--accent-500)` stroke 1.5px |
| **Active**     | `var(--accent-500)`           | `var(--accent-500)` 1.25px            | 숫자      | `#ffffff`              |
| **Incomplete** | `#ffffff`           | `#aaaaaa` (gray-400) 1.25px | 숫자      | `#1c1c1c`              |
| **Invalid**    | `#d00a0a` (red-700) | `#d00a0a` 1.25px            | X SVG     | `#ffffff`              |
| **Disabled**   | `#ffffff`           | `#dddddd` (gray-300) 1.25px | 숫자      | `#aaaaaa` (gray-400)   |

### Divider (연결선)

| 구간             | 색상                                       | 비고                      |
| ---------------- | ------------------------------------------ | ------------------------- |
| Completed → next | `var(--accent-500)` (`--border-primary`)             | 완료된 step에서 나가는 선 |
| 그 외            | `#1c1c1c` (`--stepper-divider-incomplete`) | 미완료 구간               |

### Stepper-base (라벨)

| 상태                   | 색상      | 비고          |
| ---------------------- | --------- | ------------- |
| Completed / Incomplete | `#1c1c1c` | 기본          |
| **Active**             | `var(--accent-500)` | 강조(primary) |
| **Invalid**            | `#d00a0a` | 에러          |
| **Disabled**           | `#aaaaaa` | 비활성        |

### Help Text

| 상태     | 색상                          |
| -------- | ----------------------------- |
| 기본     | `#555555` (`--text-subtle`)   |
| Disabled | `#aaaaaa` (`--text-disabled`) |

---

## 6. 색상 스펙 — 다크 모드 (`.dark`)

> 다크 모드 값은 Figma REST API에서 노드의 **실제 fill/stroke 값**(opacity 포함)을
> 직접 추출한 것이다. variable_defs의 변수 참조값과 다를 수 있으므로 반드시 REST API 값 기준.

### Stepper-icon (원형)

| 상태           | 배경 (fill)                                          | 테두리 (stroke)                            | 내부 마크 색상                          |
| -------------- | ---------------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| **Completed**  | `#1c1c1c` (icon/default-inverse)                     | `var(--accent-400)` (icon/primary) 1.25px            | 체크: `var(--accent-400)`                         |
| **Active**     | `var(--accent-400)` (element/primary)                          | `var(--accent-400)` 1.25px                           | 숫자: `#ffffff`                         |
| **Incomplete** | `rgba(0,0,0,0.2)` (element/default, **opacity=0.2**) | `#555555` (border/bold) 1.25px             | 숫자: `#dddddd`                         |
| **Invalid**    | `#e81919` (icon/error)                               | `#e81919` 1.25px                           | X: **`#1c1c1c`** (icon/default-inverse) |
| **Disabled**   | `#282828` (surface/default)                          | `#555555` (border/disabled-subtler) 1.25px | 숫자: `#555555`                         |

> **주의 — Incomplete 배경**: `#000000` 불투명이 아닌 `rgba(0,0,0,0.2)` **반투명 검정**이다.
> Figma REST API에서 `fill=#000000 opacity=0.2`로 확인. variable_defs만 보면 놓치기 쉽다.
>
> **주의 — Invalid X 마크**: 다크 모드에서 X 마크는 **검정(#1c1c1c)** 이다.
> 라이트 모드(#ffffff 흰색)와 다르다. icon/default-inverse 변수 참조.

### Divider (연결선)

| 구간             | 색상                                       |
| ---------------- | ------------------------------------------ |
| Completed → next | `var(--accent-400)` (`--border-primary`)             |
| 그 외            | `#555555` (`--stepper-divider-incomplete`) |

### Stepper-base (라벨)

| 상태     | 색상                      |
| -------- | ------------------------- |
| 기본     | `#dddddd` (text/default)  |
| Active   | `var(--accent-200)` (text/primary)  |
| Invalid  | `#fec3c3` (text/error)    |
| Disabled | `#555555` (text/disabled) |

---

## 8. 타이포그래피

Pretendard. 모든 값은 Figma text style 변수에서 추출한 정확값.

### Stepper-base (라벨)

| size       | 스타일 | 폰트       | 크기 | 굵기           | 줄높이 |
| ---------- | ------ | ---------- | ---- | -------------- | ------ |
| **Small**  | Title2 | Pretendard | 14px | 600 (SemiBold) | 20px   |
| **Medium** | Title1 | Pretendard | 16px | 600 (SemiBold) | 24px   |

### 숫자 (icon 내부)

| size       | 폰트       | 크기 | 굵기               | 줄높이 | 비고                       |
| ---------- | ---------- | ---- | ------------------ | ------ | -------------------------- |
| **Small**  | Pretendard | 10px | **700 (Bold)**     | 15px   | Active/Incomplete/Disabled |
| **Medium** | Pretendard | 12px | **600 (SemiBold)** | 20px   | Active/Incomplete/Disabled |

### Help Text

| 스타일 | 폰트       | 크기 | 굵기          | 줄높이 |
| ------ | ---------- | ---- | ------------- | ------ |
| Body3  | Pretendard | 12px | 400 (Regular) | 16px   |

### 체크 SVG (Completed)

**모양**: 표준 체크마크(✓). 우상단에서 시작해 좌하단으로 내려갔다가 우중앙으로 올라가는 V 자.
3개 점을 2개 선분으로 연결한 열린 path (채움 없음, stroke만).

```
시작점(우상) ──┐
              │
              ▼
          중간점(좌하)
              │
              ▼
          끝점(좌중앙)
```

| size   | SVG width×height | viewBox          | path d                              | stroke                            | strokeWidth |
| ------ | ---------------- | ---------------- | ----------------------------------- | --------------------------------- | ----------- |
| Small  | 8.47 × 6.13      | `0 0 8.47 6.13`  | `M7.97 0.5 L2.83 5.63 L0.5 3.3`     | `--stepper-icon-completed-border` | 1px         |
| Medium | 10.83 × 7.92     | `0 0 10.83 7.92` | `M10.08 0.75 L3.67 7.17 L0.75 4.25` | `--stepper-icon-completed-border` | 1.5px       |

> **stroke 색상**: 라이트 `var(--accent-500)` / 다크 `var(--accent-400)`. 토큰으로 자동 전환.
> **핵심**: `fill="none"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
> 체크 SVG는 icon(20px) 중앙에 위치. icon에 padding 없이 SVG 고정 크기로 중앙 정렬.

**전체 SVG 코드 (Small)**:

```html
<svg width="8.47" height="6.13" viewBox="0 0 8.47 6.13" fill="none">
  <path
    d="M7.97 0.5 L2.83 5.63 L0.5 3.3"
    stroke="var(--stepper-icon-completed-border)"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

**전체 SVG 코드 (Medium)**:

```html
<svg width="10.83" height="7.92" viewBox="0 0 10.83 7.92" fill="none">
  <path
    d="M10.08 0.75 L3.67 7.17 L0.75 4.25"
    stroke="var(--stepper-icon-completed-border)"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

### X SVG (Invalid)

**모양**: 두 개의 대각선이 교차하는 X 자. Figma Union(boolean operation)으로 만들어진
닫힌 path (채움 fill). stroke가 아닌 **fill**로 렌더된다 — 이것이 핵심.
단순한 두 선(`M..L.. M..L..`)이 아니라, 각 선의 양 끝이 둥근 캡슐 형태로 확장된
**하나의 닫힌 도형**이다.

```
↖     ↗
  ╲   ╱
    ╳
  ╱   ╲
↙     ↘
```

| size   | SVG width×height | viewBox       | fill                            |
| ------ | ---------------- | ------------- | ------------------------------- |
| Small  | 6.6 × 6.6        | `0 0 6.6 6.6` | `--stepper-mark-default-static` |
| Medium | 8.5 × 8.5        | `0 0 8.5 8.5` | `--stepper-mark-default-static` |

> **fill 색상**: 라이트 `#ffffff` (흰색) / 다크 `#1c1c1c` (검정). 토큰으로 자동 전환.
> **다크 모드에서 X 마크는 검정이다** — 흰색이 아님.
> **핵심**: `fill`로 렌더 (stroke 아님). path는 Figma Union 에서 추출한 정확한 값 사용.
> 단순한 X 선분 2개로 만들면 모양이 다름 — 반드시 아래 path 그대로 사용.

**X SVG path (Small)** — 닫힌 도형, fill 렌더:

```
M5.746 0.146C5.941 -0.049 6.258 -0.049 6.453 0.146C6.648 0.342 6.648 0.658 6.453 0.853L4.007 3.3L6.453 5.746C6.648 5.941 6.648 6.258 6.453 6.453C6.258 6.648 5.941 6.648 5.746 6.453L3.3 4.007L0.853 6.453C0.658 6.648 0.342 6.648 0.146 6.453C-0.049 6.258 -0.049 5.941 0.146 5.746L2.593 3.3L0.146 0.853C-0.049 0.658 -0.049 0.342 0.146 0.146C0.342 -0.049 0.658 -0.049 0.853 0.146L3.3 2.593L5.746 0.146Z
```

**X SVG path (Medium)** — 닫힌 도형, fill 렌더:

```
M7.22 0.22C7.513 -0.073 7.987 -0.073 8.28 0.22C8.573 0.513 8.573 0.987 8.28 1.28L5.31 4.25L8.28 7.22C8.573 7.513 8.573 7.987 8.28 8.28C7.987 8.573 7.513 8.573 7.22 8.28L4.25 5.31L1.28 8.28C0.987 8.573 0.513 8.573 0.22 8.28C-0.073 7.987 -0.073 7.513 0.22 7.22L3.19 4.25L0.22 1.28C-0.073 0.987 -0.073 0.513 0.22 0.22C0.513 -0.073 0.987 -0.073 1.28 0.22L4.25 3.19L7.22 0.22Z
```

**전체 SVG 코드 (Small)**:

```html
<svg width="6.6" height="6.6" viewBox="0 0 6.6 6.6" fill="none">
  <path
    d="M5.746 0.146C5.941 -0.049 6.258 -0.049 6.453 0.146C6.648 0.342 6.648 0.658 6.453 0.853L4.007 3.3L6.453 5.746C6.648 5.941 6.648 6.258 6.453 6.453C6.258 6.648 5.941 6.648 5.746 6.453L3.3 4.007L0.853 6.453C0.658 6.648 0.342 6.648 0.146 6.453C-0.049 6.258 -0.049 5.941 0.146 5.746L2.593 3.3L0.146 0.853C-0.049 0.658 -0.049 0.342 0.146 0.146C0.342 -0.049 0.658 -0.049 0.853 0.146L3.3 2.593L5.746 0.146Z"
    fill="var(--stepper-mark-default-static)"
  />
</svg>
```

**전체 SVG 코드 (Medium)**:

```html
<svg width="8.5" height="8.5" viewBox="0 0 8.5 8.5" fill="none">
  <path
    d="M7.22 0.22C7.513 -0.073 7.987 -0.073 8.28 0.22C8.573 0.513 8.573 0.987 8.28 1.28L5.31 4.25L8.28 7.22C8.573 7.513 8.573 7.987 8.28 8.28C7.987 8.573 7.513 8.573 7.22 8.28L4.25 5.31L1.28 8.28C0.987 8.573 0.513 8.573 0.22 8.28C-0.073 7.987 -0.073 7.513 0.22 7.22L3.19 4.25L0.22 1.28C-0.073 0.987 -0.073 0.513 0.22 0.22C0.513 -0.073 0.987 -0.073 1.28 0.22L4.25 3.19L7.22 0.22Z"
    fill="var(--stepper-mark-default-static)"
  />
</svg>
```

**X SVG path (Small)**:

```
M5.746 0.146C5.941 -0.049 6.258 -0.049 6.453 0.146C6.648 0.342 6.648 0.658 6.453 0.853L4.007 3.3L6.453 5.746C6.648 5.941 6.648 6.258 6.453 6.453C6.258 6.648 5.941 6.648 5.746 6.453L3.3 4.007L0.853 6.453C0.658 6.648 0.342 6.648 0.146 6.453C-0.049 6.258 -0.049 5.941 0.146 5.746L2.593 3.3L0.146 0.853C-0.049 0.658 -0.049 0.342 0.146 0.146C0.342 -0.049 0.658 -0.049 0.853 0.146L3.3 2.593L5.746 0.146Z
```

**X SVG path (Medium)**:

```
M7.22 0.22C7.513 -0.073 7.987 -0.073 8.28 0.22C8.573 0.513 8.573 0.987 8.28 1.28L5.31 4.25L8.28 7.22C8.573 7.513 8.573 7.987 8.28 8.28C7.987 8.573 7.513 8.573 7.22 8.28L4.25 5.31L1.28 8.28C0.987 8.573 0.513 8.573 0.22 8.28C-0.073 7.987 -0.073 7.513 0.22 7.22L3.19 4.25L0.22 1.28C-0.073 0.987 -0.073 0.513 0.22 0.22C0.513 -0.073 0.987 -0.073 1.28 0.22L4.25 3.19L7.22 0.22Z
```

---

## 11. 디자인 토큰 정의 (CSS 변수)

Stepper는 기존 토큰 외에 **`--stepper-*` semantic 토큰**을 사용한다.
이 토큰들은 `.dark`에서 재매핑되어 다크 모드 자동 전환을 보장한다.
raw palette 값을 컴포넌트에서 직접 참조하지 않는다.

```css
:root {
  /* Stepper invalid 텍스트 — Figma color/text/error.
   * 라이트 #d00a0a (red-700). --text-danger(#e81919)와 다름. */
  --stepper-text-error: var(--color-red-700); /* #d00a0a */

  /* Stepper semantic 토큰 — Figma color collection 기반 (라이트). */
  --stepper-icon-completed-bg: var(
    --color-white
  ); /* #fff — icon/default-inverse */
  --stepper-icon-completed-border: var(--accent-500); /* var(--accent-500) — icon/primary */
  --stepper-icon-active-bg: var(--accent-500); /* var(--accent-500) — element/primary */
  --stepper-icon-incomplete-bg: var(--color-white); /* #fff — element/default */
  --stepper-icon-incomplete-border: var(
    --color-gray-400
  ); /* #aaaaaa — border/bold */
  --stepper-icon-invalid-bg: var(--color-red-700); /* #d00a0a — icon/error */
  --stepper-icon-disabled-bg: var(--color-white); /* #fff — surface/default */
  --stepper-icon-disabled-border: var(
    --color-gray-300
  ); /* #dddddd — border/disabled-subtler */
  --stepper-number-inverse: var(--color-white); /* #fff — text/defult-static */
  --stepper-number-default: var(--color-gray-900); /* #1c1c1c — text/default */
  --stepper-number-disabled: var(
    --color-gray-400
  ); /* #aaaaaa — text/disabled */
  --stepper-mark-default-static: var(
    --color-white
  ); /* #fff — icon/default-static (X fill) */
  --stepper-divider-incomplete: var(
    --color-gray-900
  ); /* #1c1c1c — border/bolder */
  --stepper-label-default: var(--color-gray-900); /* #1c1c1c — text/default */
  --stepper-label-active: var(--accent-500); /* var(--accent-500) — text/primary */
}

.dark {
  /* Stepper invalid 텍스트 — 다크 #fec3c3 (color/text/error). */
  --stepper-text-error: color-mix(
    in srgb,
    var(--color-red-200) 98%,
    white
  ); /* ≈ #fec3c3 */

  /* Stepper semantic 토큰 — 다크 모드 매핑 (Figma REST API 실제 fill/stroke 값). */
  --stepper-icon-completed-bg: var(
    --color-gray-900
  ); /* #1c1c1c — icon/default-inverse */
  --stepper-icon-completed-border: var(--accent-400); /* var(--accent-400) — icon/primary */
  --stepper-icon-active-bg: var(--accent-400); /* var(--accent-400) — element/primary */
  --stepper-icon-incomplete-bg: color-mix(
    in srgb,
    var(--color-black) 20%,
    transparent
  ); /* rgba(0,0,0,0.2) — REST API opacity=0.2 */
  --stepper-icon-incomplete-border: var(
    --color-gray-700
  ); /* #555555 — border/bold */
  --stepper-icon-invalid-bg: var(--color-red-600); /* #e81919 — icon/error */
  --stepper-icon-disabled-bg: var(
    --color-gray-800
  ); /* #282828 — surface/default (REST API) */
  --stepper-icon-disabled-border: var(
    --color-gray-700
  ); /* #555555 — border/disabled-subtler */
  --stepper-number-inverse: var(--color-white); /* #fff — text/defult-static */
  --stepper-number-default: var(--color-gray-200); /* #dddddd — text/default */
  --stepper-number-disabled: var(
    --color-gray-700
  ); /* #555555 — text/disabled */
  --stepper-mark-default-static: var(
    --color-gray-900
  ); /* #1c1c1c — icon/default-inverse (X 마크 다크) */
  --stepper-divider-incomplete: var(
    --color-gray-700
  ); /* #555555 — REST API 다크 divider */
  --stepper-label-default: var(--color-gray-200); /* #dddddd — text/default */
  --stepper-label-active: var(--accent-200); /* var(--accent-200) — text/primary */
}
```

> 다크 모드 값은 Figma variable_defs가 아닌 **REST API에서 노드의 실제 fill/stroke**
> 값을 추출한 것이다. 특히 Incomplete 배경의 `opacity=0.2`는 REST API에서만 확인 가능.

---

