# Avatar — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Avatar 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

모든 색상값을 그대로 사용한다. 괄호 안의 hex가 실제 색이다.

### Solid variant (채움)

브랜드색 배경 + 흰색 글자(`--avatar-on-fill` = `#ffffff`, 라이트/다크 공통 고정).

| Color            | 배경 (fill)             | 글자      |
| ---------------- | ----------------------- | --------- |
| **indigo**(기본) | `#3235ec` (indigo-600)  | `#ffffff` |
| **primary**      | `var(--accent-500)` (accent-500)    | `#ffffff` |
| **green**        | `#05a85a` (green-600)   | `#ffffff` |
| **cyan**         | `#0891b2` (cyan-600)    | `#ffffff` |
| **purple**       | `#9333ea` (purple-600)  | `#ffffff` |
| **fuchsia**      | `#c026d3` (fuchsia-600) | `#ffffff` |
| **gray**         | `#1c1c1c` (gray-900)    | `#ffffff` |

### Subtle variant (옅은 배경)

pastel(-50 음영) 배경 + 동색(-600 음영) 글자. 덜 강조된 컨텍스트에 사용.

| Color       | 배경 (fill)            | 글자                    |
| ----------- | ---------------------- | ----------------------- |
| **indigo**  | `#f1edff` (indigo-50)  | `#3235ec` (indigo-600)  |
| **primary** | `var(--accent-50)` (accent-50)    | `var(--accent-500)` (accent-500)    |
| **green**   | `#e9fbf2` (green-50)   | `#05a85a` (green-600)   |
| **cyan**    | `#ecfeff` (cyan-50)    | `#0891b2` (cyan-600)    |
| **purple**  | `#faf5ff` (purple-50)  | `#9333ea` (purple-600)  |
| **fuchsia** | `#fdf4ff` (fuchsia-50) | `#c026d3` (fuchsia-600) |
| **gray**    | `#eeeeee` (gray-200)   | `#1c1c1c` (gray-900)    |

> **gray 예외**: 다른 색상은 pastel(-50) 배경을 가지지만, gray는 pastel 단계가 없어
> `#eeeeee`(gray-200)를 배경으로 사용한다. 따라서 글자는 어두운 `#1c1c1c`(gray-900)가
> 되어야 대비가 유지된다. 동색 계열의 밝은 글자를 쓰면 배경에 묻힌다.

### Disabled — 모든 color/variant 공통

semantic 토큰 사용. 다크 모드 자동 전환 대상.

| 상태                 | 배경      | 글자                 | 토큰(배경/글자)                         |
| -------------------- | --------- | -------------------- | --------------------------------------- |
| **Disabled**(라이트) | `#ffffff` | `#aaaaaa` (gray-400) | `--element-default` / `--text-disabled` |

> Figma 다크 가이드의 disabled는 라이트와 반대(반투명 어두운 배경 + 어두운 글자)이지만,
> 본 스펙은 semantic 토큰으로 통일하여 자동 전환시킨다(아래 "색상 스펙 — 다크 모드" 참조).

### 핵심 규칙

- **solid** 글자는 항상 흰색(`#ffffff`) — 라이트/다크 모두. 배경이 브랜드색(중간 명도)이므로
  흰색 글자가 가장 대비가 좋다. 다크 모드에서도 배경 색이 바뀌지 않으므로 글자도 유지.
- **subtle** 글자는 배경과 **같은 색상 계열**의 짙은 음영(-600). gray만 예외(배경이
  gray-200이므로 글자는 gray-900).
- **disabled** 는 색상과 무관하게 semantic 토큰으로 통일. color/variant 셀렉터보다
  **CSS 특이성이 높아야** disabled 색상이 이긴다(아래 "구현 주의점" 참조).

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `.dark` 클래스 적용 시 전환.

### Solid variant (Dark)

라이트와 **동일**. solid 배경/글자는 정적 브랜드색이므로 다크에서 전환하지 않는다.

| Color   | 배경      | 글자      |
| ------- | --------- | --------- |
| indigo  | `#3235ec` | `#ffffff` |
| primary | `var(--accent-500)` | `#ffffff` |
| green   | `#05a85a` | `#ffffff` |
| cyan    | `#0891b2` | `#ffffff` |
| purple  | `#9333ea` | `#ffffff` |
| fuchsia | `#c026d3` | `#ffffff` |
| gray    | `#1c1c1c` | `#ffffff` |

### Subtle variant (Dark)

배경은 라이트와 동일(pastel은 다크 배경 위에서도 그대로 사용). **글자만** 다크 배경에서
대비를 위해 -600 → -500(더 밝은) 음영으로 재매핑. **gray는 예외**(아래 참조).

| Color          | 배경      | 글자(다크)              | 라이트와 비교 |
| -------------- | --------- | ----------------------- | ------------- |
| indigo         | `#f1edff` | `#6366f1` (indigo-500)  | 더 밝음       |
| primary        | `var(--accent-50)` | `var(--accent-400)` (accent-400)    | 더 밝음       |
| green          | `#e9fbf2` | `#06ce6e` (green-500)   | 더 밝음       |
| cyan           | `#ecfeff` | `#06b6d4` (cyan-500)    | 더 밝음       |
| purple         | `#faf5ff` | `#a855f7` (purple-500)  | 더 밝음       |
| fuchsia        | `#fdf4ff` | `#d946ef` (fuchsia-500) | 더 밝음       |
| **gray**(예외) | `#eeeeee` | `#555555` (gray-700)    | 어두움 유지   |

> **gray subtle 다크 주의(핵심)**: gray subtle 배경은 밝은 회색(`#eeeeee`)이다.
> 다른 색상처럼 글자를 더 밝게 바꾸면(`#dddddd`) 밝은 배경 + 밝은 글자가 되어
> **글자가 안 보인다**. 따라서 gray는 다크 모드에서도 어두운 `#555555`(gray-700)를
> 유지한다. 밝은 배경 위에는 어두운 글자가 있어야 한다.

### Disabled (Dark)

semantic 토큰이 다크 값으로 자동 전환된다.

| 상태               | 배경              | 글자                 | 토큰(배경/글자)                         |
| ------------------ | ----------------- | -------------------- | --------------------------------------- |
| **Disabled**(다크) | `rgba(0,0,0,0.2)` | `#757575` (gray-600) | `--element-default` / `--text-disabled` |

> 다크에서 `--element-default`는 반투명 검정, `--text-disabled`는 gray-600으로
> 재매핑된다. 별도 disabled 토큰 정의 없이 semantic 토큰만 참조하면 양쪽이 해결된다.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard** (모든 텍스트). 굵기 600 (SemiBold) 고정.

size별 font-size/line-height는 "4. 레이아웃 스펙"의 표를参照. 요약:

| font-size | line-height | 해당 size |
| --------- | ----------- | --------- |
| 10px      | normal      | 16        |
| 12px      | 16px        | 20        |
| 14px      | 20px        | 24        |
| 16px      | 24px        | 28        |
| 18px      | normal      | 32        |
| 20px      | 24px        | 36        |
| 22px      | normal      | 40        |
| 26px      | normal      | 48        |

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* 글자 — solid 공통 흰색(라이트/다크 공통 고정) */
  --avatar-on-fill: #ffffff; /* = --text-static */

  /* solid 배경 — 브랜드색 */
  --avatar-solid-indigo: #3235ec; /* indigo-600 */
  --avatar-solid-primary: var(--accent-500); /* accent-500 */
  --avatar-solid-green: #05a85a; /* green-600 */
  --avatar-solid-cyan: #0891b2; /* cyan-600 */
  --avatar-solid-purple: #9333ea; /* purple-600 */
  --avatar-solid-fuchsia: #c026d3; /* fuchsia-600 */
  --avatar-solid-gray: #1c1c1c; /* gray-900 */

  /* subtle 배경 — pastel(-50 음영). gray만 -200 */
  --avatar-subtle-indigo: #f1edff; /* indigo-50 */
  --avatar-subtle-primary: var(--accent-50); /* accent-50 */
  --avatar-subtle-green: #e9fbf2; /* green-50 */
  --avatar-subtle-cyan: #ecfeff; /* cyan-50 */
  --avatar-subtle-purple: #faf5ff; /* purple-50 */
  --avatar-subtle-fuchsia: #fdf4ff; /* fuchsia-50 */
  --avatar-subtle-gray: #eeeeee; /* gray-200 */

  /* subtle 글자 — 동색(-600 음영). gray만 -900 */
  --avatar-subtle-text-indigo: #3235ec; /* indigo-600 */
  --avatar-subtle-text-primary: var(--accent-500); /* accent-500 */
  --avatar-subtle-text-green: #05a85a; /* green-600 */
  --avatar-subtle-text-cyan: #0891b2; /* cyan-600 */
  --avatar-subtle-text-purple: #9333ea; /* purple-600 */
  --avatar-subtle-text-fuchsia: #c026d3; /* fuchsia-600 */
  --avatar-subtle-text-gray: #1c1c1c; /* gray-900 */

  /* disabled — semantic 토큰 재사용(별도 정의 불필요) */
  /* --element-default: #ffffff; (이미 정의됨) */
  /* --text-disabled: #aaaaaa;  (이미 정의됨) */

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* solid 배경/글자 — 라이트와 동일(정적 브랜드색). 재정의 불필요. */

  /* subtle 배경 — 라이트와 동일(pastel 그대로). 재정의 불필요. */

  /* subtle 글자 — 다크 배경 대비를 위해 -600 → -500(더 밝은) 음영으로 재매핑.
   * gray만 예외: 밝은 배경(#eee) 위이므로 어두운 글자(gray-700)를 유지. */
  --avatar-subtle-text-indigo: #6366f1; /* indigo-500 */
  --avatar-subtle-text-primary: var(--accent-400); /* accent-400 */
  --avatar-subtle-text-green: #06ce6e; /* green-500 */
  --avatar-subtle-text-cyan: #06b6d4; /* cyan-500 */
  --avatar-subtle-text-purple: #a855f7; /* purple-500 */
  --avatar-subtle-text-fuchsia: #d946ef; /* fuchsia-500 */
  --avatar-subtle-text-gray: #555555; /* gray-700 — 밝은 배경 위 어두운 글자 유지(핵심) */

  /* disabled — semantic 토큰이 다크 값으로 자동 전환됨 */
  /* --element-default: rgba(0,0,0,0.2); (이미 정의됨) */
  /* --text-disabled: #757575;          (이미 정의됨) */
}
```

---

