# Icon — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon 문서 인덱스](./README.md)

## 4. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명(`--icon` 등)은 토큰 체계를 따르며,
괄호 안의 hex 값이 실제 색이다. 컴포넌트는 hex 를 직접 쓰지 않고 토큰만 참조한다.

### System icon — `color` prop

`color` prop은 **문자열 하나로 두 가지 형식**을 모두 받는다. hex 직접 값은 허용하지 않는다.

**형식 1 — semantic 이름 (8종):**

| `color` 값       | 토큰              | hex       | 용도         |
| ---------------- | ----------------- | --------- | ------------ |
| `default` (기본) | `--icon`          | `#1c1c1c` | 기본 아이콘  |
| `subtle`         | `--icon-subtle`   | `#555555` | 보조 아이콘  |
| `subtler`        | `--icon-subtler`  | `#757575` | 더 흐린 보조 |
| `primary`        | `--icon-primary`  | `var(--accent-500)` | 강조/선택됨  |
| `success`        | `--icon-success`  | `#05a85a` | 성공         |
| `warning`        | `--icon-warning`  | `#f0bb00` | 경고         |
| `danger`         | `--icon-danger`   | `#e81919` | 오류/삭제    |
| `disabled`       | `--icon-disabled` | `#aaaaaa` | 비활성       |

**형식 2 — raw palette dot 표기법:**

`"{색상}.{음영}"` 형태. `tokens.css.ts`의 `vars.palette`에 정의된 모든 색상·음영을 지원한다.
`resolveIconColor()` 가 `"blue.500"` → `var(--accent-500)` 로 해석한다.

| `color` 값 예 | 매핑되는 CSS 변수    | hex       | 비고                               |
| ------------- | -------------------- | --------- | ---------------------------------- |
| `blue.500`    | `--color-blue-500`   | `#0066ff` | categorical raw blue; primary와 독립                    |
| `green.600`   | `--color-green-600`  | `#05a85a` | success 와 동일                    |
| `purple.500`  | `--color-purple-500` | `#a855f7` | semantic 매핑 없음 — raw 로만 접근 |
| `gray.400`    | `--color-gray-400`   | `#aaaaaa` | disabled 와 동일                   |
| `orange.500`  | `--color-orange-500` | `#f97316` | semantic 매핑 없음                 |

> 사용 가능 색상: `blue / red / orange / yellow / green / cyan / indigo / purple / fuchsia / gray`
> × 음영 `50 / 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900` (red 는 700 까지).
>
> **다크 모드 주의**: raw palette 색상은 다크 모드에서 자동 전환되지 않는다(고정 hex).
> 다크 모드 호환성이 필요하면 semantic 이름을 우선한다.

```tsx
<Icon name="search" color="primary" />    // semantic — 다크 모드 자동 전환
<Icon name="star" color="blue.500" />     // raw palette
<Icon name="bell" color="purple.500" />   // semantic 매핑 없는 색도 가능
```

`grid`와 `grid_off`도 다른 system icon과 동일한 사이즈·스트로크·색상 토큰을 사용한다.

---

## 5. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환. 컴포넌트는 동일 토큰을
참조하므로 코드 수정 없이 자동 전환된다.

### Icon 색상 (Dark)

| 토큰              | hex       | 비고                                     |
| ----------------- | --------- | ---------------------------------------- |
| `--icon`          | `#dddddd` | 다크 기본 (gray-200)                     |
| `--icon-subtle`   | `#aaaaaa` | gray-400                                 |
| `--icon-subtler`  | `#8f8f8f` | gray-500                                 |
| `--icon-primary`  | `var(--accent-400)` | accent-400 (라이트 `var(--accent-500)` 보다 더 밝음) |
| `--icon-success`  | `#06ce6e` | green-500 (더 밝음)                      |
| `--icon-warning`  | `#f0bb00` | yellow-500 (동일)                        |
| `--icon-danger`   | `#f52424` | red-500 (라이트 `#e81919` 보다 더 밝음)  |
| `--icon-disabled` | `#555555` | gray-700                                 |

> 다크에서 primary/danger 가 더 밝은 음영으로 전환되어 어두운 배경에서 가독성을 확보한다.
> raw palette 색상(`var(--color-*)`)은 `.dark`에서 재매핑되지 않으므로 전환되지 않는다.

---

## 7. 타이포그래피

아이콘 컴포넌트 자체는 텍스트를 포함하지 않는다. 아이콘과 함께 쓰이는 라벨(선택)은
Typography 토큰을 따른다 — 여기서는 아이콘 래퍼의 `color` 전환만 정의한다.

---

## 10. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Icon — semantic 색상 토큰 */
  --icon: #1c1c1c; /* gray-900, 기본 */
  --icon-subtle: #555555; /* gray-700 */
  --icon-subtler: #757575; /* gray-600 */
  --icon-disabled: #aaaaaa; /* gray-400 */
  --icon-primary: var(--accent-500); /* accent-500 */
  --icon-success: #05a85a; /* green-600 (Figma color/icon/success) */
  --icon-warning: #f0bb00; /* yellow-500 (Figma color/icon/warning) */
  --icon-danger: #e81919; /* red-600 (Figma color/icon/error #d00a0a 근사) */

  /* Raw palette (발췌) — dot 표기법으로 접근 */
  --color-blue-500: #0066ff; /* named raw palette baseline; primary와 독립 */
  --color-green-600: #05a85a;
  --color-purple-500: #a855f7;
  --color-orange-500: #f97316;
  --color-gray-400: #aaaaaa;
  /* …전체 11색상 × 10음영은 [foundation 문서](../../foundations.md) Color 섹션 참조 */

  --font-sans: "Pretendard", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}
```

> Status icon 의 Figma 변수값: error `#d00a0a`, warning `#f0bb00`, success `#05a85a`,
> info/primary `var(--accent-500)`. 위 토큰은 이 값을 기반으로 한다 (danger 은 red-600 `#e81919` 사용).

### `.dark` (다크)

```css
.dark {
  --icon: #dddddd; /* gray-200 */
  --icon-subtle: #aaaaaa; /* gray-400 */
  --icon-subtler: #8f8f8f; /* gray-500 */
  --icon-disabled: #555555; /* gray-700 */
  --icon-primary: var(--accent-400); /* accent-400 (더 밝음) */
  --icon-success: #06ce6e; /* green-500 */
  --icon-warning: #f0bb00; /* yellow-500 */
  --icon-danger: #f52424; /* red-500 (더 밝음) */

  /* Raw palette 는 .dark 에서 재매핑하지 않음 — 고정값 유지. */
}
```

---
