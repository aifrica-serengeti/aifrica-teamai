# Chip — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Chip 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

9색(default + 8 hue) × 3 variant. 색상값은 Figma `get_variable_defs`(node 9882:82820)로
추출한 정확한 값이다.

### Filled (진한 배경 + 흰 글자)

| 색상        | 배경                    | 글자                 | 토큰(배경 / 글자)                               |
| ----------- | ----------------------- | -------------------- | ----------------------------------------------- |
| **default** | `#eeeeee` (gray-200)    | `#1c1c1c` (gray-900) | `--chip-subtle-gray` / `--text`                 |
| **gray**    | `#1c1c1c` (gray-900)    | `#ffffff`            | `--chip-filled-gray` / `--chip-on-fill-inverse` |
| **green**   | `#05a85a` (green-600)   | `#ffffff`            | `--chip-filled-green` / `--chip-on-fill`        |
| **blue**    | `#0066ff` (blue-500)    | `#ffffff`            | `--chip-filled-blue` / `--chip-on-fill`         |
| **cyan**    | `#0891b2` (cyan-600)    | `#ffffff`            | `--chip-filled-cyan` / `--chip-on-fill`         |
| **indigo**  | `#3235ec` (indigo-600)  | `#ffffff`            | `--chip-filled-indigo` / `--chip-on-fill`       |
| **purple**  | `#9333ea` (purple-600)  | `#ffffff`            | `--chip-filled-purple` / `--chip-on-fill`       |
| **fuchsia** | `#c026d3` (fuchsia-600) | `#ffffff`            | `--chip-filled-fuchsia` / `--chip-on-fill`      |
| **navy**    | `#727885` (navy-600)    | `#ffffff`            | `--chip-filled-navy` / `--chip-on-fill`         |

> **핵심 규칙:**
>
> - `default` filled 는 일반 텍스트 칩 — gray-subtle 배경 + 본문 글자색(검정).
> - `gray` filled 는 **반전 글자**(`--chip-on-fill-inverse`) — 라이트에서 흰색.
> - 그 외 컬러 filled 는 흰색 글자(`--chip-on-fill` = `--text-static`).

### Subtle (pastel 배경 + 동색 글자)

| 색상        | 배경                   | 글자                    | 토큰(배경 / 글자)                               |
| ----------- | ---------------------- | ----------------------- | ----------------------------------------------- |
| **default** | `#eeeeee` (gray-200)   | `#1c1c1c` (gray-900)    | `--chip-subtle-gray` / `--text`                 |
| **gray**    | `#eeeeee` (gray-200)   | `#1c1c1c` (gray-900)    | `--chip-subtle-gray` / `--chip-text-gray`       |
| **green**   | `#e9fbf2` (green-50)   | `#05a85a` (green-600)   | `--chip-subtle-green` / `--chip-text-green`     |
| **blue**    | `#ebf3ff` (blue-50)    | `#0066ff` (blue-500)    | `--chip-subtle-blue` / `--chip-text-blue`       |
| **cyan**    | `#ecfeff` (cyan-50)    | `#0891b2` (cyan-600)    | `--chip-subtle-cyan` / `--chip-text-cyan`       |
| **indigo**  | `#f1edff` (indigo-50)  | `#3235ec` (indigo-600)  | `--chip-subtle-indigo` / `--chip-text-indigo`   |
| **purple**  | `#faf5ff` (purple-50)  | `#9333ea` (purple-600)  | `--chip-subtle-purple` / `--chip-text-purple`   |
| **fuchsia** | `#fdf4ff` (fuchsia-50) | `#c026d3` (fuchsia-600) | `--chip-subtle-fuchsia` / `--chip-text-fuchsia` |
| **navy**    | `#dde2f1` (navy-300)   | `#1e232e` (navy-900)    | `--chip-subtle-navy` / `--chip-text-navy`       |

> **핵심 규칙:**
>
> - subtle 글자는 라이트에서 `-600` 음영(green/cyan/indigo/purple/fuchsia) 또는
>   blue-500. navy는 예외적으로 `-900`(가장 어두움).
> - `default` 와 `gray` subtle 은 동일 (둘 다 gray-200 배경 + gray-900 글자).

### Outlined (투명 배경 + 동색 테두리 + 동색 글자)

| 색상        | 배경              | 테두리 (1px)            | 글자                 | 토큰(테두리 / 글자)                             |
| ----------- | ----------------- | ----------------------- | -------------------- | ----------------------------------------------- |
| **default** | `#ffffff` (white) | `#1c1c1c` (gray-900)    | `#1c1c1c`            | `--border-bolder` / `--text`                    |
| **gray**    | `#ffffff`         | `#1c1c1c` (gray-900)    | `#1c1c1c`            | `--chip-border-gray` / `--chip-text-gray`       |
| **green**   | `#ffffff`         | `#05a85a` (green-600)   | `#05a85a`            | `--chip-border-green` / `--chip-text-green`     |
| **blue**    | `#ffffff`         | `#0066ff` (blue-500)    | `#0066ff`            | `--chip-border-blue` / `--chip-text-blue`       |
| **cyan**    | `#ffffff`         | `#0891b2` (cyan-600)    | `#0891b2`            | `--chip-border-cyan` / `--chip-text-cyan`       |
| **indigo**  | `#ffffff`         | `#3235ec` (indigo-600)  | `#3235ec`            | `--chip-border-indigo` / `--chip-text-indigo`   |
| **purple**  | `#ffffff`         | `#9333ea` (purple-600)  | `#9333ea`            | `--chip-border-purple` / `--chip-text-purple`   |
| **fuchsia** | `#ffffff`         | `#c026d3` (fuchsia-600) | `#c026d3`            | `--chip-border-fuchsia` / `--chip-text-fuchsia` |
| **navy**    | `#ffffff`         | `#9ba1af` (navy-500)    | `#1e232e` (navy-900) | `--chip-border-navy` / `--chip-text-navy`       |

> **핵심 규칙:**
>
> - `default` outlined 는 `--border-bolder`(#1c1c1c, 가장 진한 테두리) + 본문 글자.
> - navy outlined 는 테두리가 `-500`(#9ba1af, 중간 음영)이지만 글자는 `-900`(가장 어두움).
>   테두리와 글자 음영이 다른 유일한 예외.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `.dark` 클래스 적용 시 전환. Chip 이 참조하는 `--chip-*` 토큰을
`.dark`에서 재매핑하면 모든 variant 가 자동 전환된다.

### Filled (다크)

| 색상        | 배경 (다크)             | 글자 (다크)          | 비고               |
| ----------- | ----------------------- | -------------------- | ------------------ |
| **default** | `#333333` (gray-800)    | `#dddddd` (gray-200) | gray-subtle 다크값 |
| **gray**    | `#dddddd` (gray-200)    | `#1c1c1c` (gray-900) | **라이트와 반전**  |
| **green**   | `#25e086` (green-500)   | `#ffffff`            | 더 밝은 green      |
| **blue**    | `#3384ff` (blue-400)    | `#ffffff`            | 더 밝은 blue       |
| **cyan**    | `#0891b2` (cyan-600)    | `#ffffff`            | 동일               |
| **indigo**  | `#3235ec` (indigo-600)  | `#ffffff`            | 동일               |
| **purple**  | `#9333ea` (purple-600)  | `#ffffff`            | 동일               |
| **fuchsia** | `#c026d3` (fuchsia-600) | `#ffffff`            | 동일               |
| **navy**    | `#727885` (navy-600)    | `#ffffff`            | 동일               |

> **핵심 규칙 (다크 filled):**
>
> - gray는 라이트 `#1c1c1c` → 다크 `#dddddd`로 **반전**. 글자도 반전(백→흑).
> - green, blue는 다크에서 더 밝게(green-600→green-500, blue-500→blue-400).
> - cyan/indigo/purple/fuchsia/navy는 라이트와 동일(static).

### Subtle (다크) — 진한 배경 + 밝은 글자

| 색상        | 배경 (다크)             | 글자 (다크)             | 비고                  |
| ----------- | ----------------------- | ----------------------- | --------------------- |
| **default** | `#333333` (gray-800)    | `#dddddd` (gray-200)    | gray-subtle 다크값    |
| **gray**    | `#333333` (gray-800)    | `#dddddd` (gray-200)    | 동일                  |
| **green**   | `#035930` (green-800)   | `#06ce6e` (green-500)   | 진한 배경 + 밝은 글자 |
| **blue**    | `#003585` (blue-800)    | `#99c2ff` (blue-200)    | 진한 배경 + 밝은 글자 |
| **cyan**    | `#164e63` (cyan-900)    | `#22d3ee` (cyan-400)    | 진한 배경 + 밝은 글자 |
| **indigo**  | `#0e0b5b` (indigo-900)  | `#8c85f4` (indigo-300)  | 진한 배경 + 밝은 글자 |
| **purple**  | `#581c87` (purple-900)  | `#d8b4fe` (purple-300)  | 진한 배경 + 밝은 글자 |
| **fuchsia** | `#701a75` (fuchsia-900) | `#f0abfc` (fuchsia-300) | 진한 배경 + 밝은 글자 |
| **navy**    | `#3f4450` (navy-800)    | `#dde2f1` (navy-300)    | 진한 배경 + 밝은 글자 |

> **핵심 규칙 (다크 subtle):**
>
> - 라이트의 pastel 배경이 다크에서는 **진한 톤**으로 전환.
> - 글자는 라이트 `-600` → 다크 `-400~500`(더 밝음)으로 전환하여 어두운 배경 위 대비 유지.
> - navy 글자는 라이트 `#1e232e`(어두움) → 다크 `#dde2f1`(밝음)으로 **반전**.

### Outlined (다크) — 반투명 배경 + 테두리 + 밝은 글자

| 색상        | 배경 (다크)       | 테두리 (다크)        | 글자 (다크)             |
| ----------- | ----------------- | -------------------- | ----------------------- |
| **default** | `rgba(0,0,0,0.2)` | `#555555` (gray-700) | `#dddddd` (gray-200)    |
| **gray**    | `rgba(0,0,0,0.2)` | `#555555`            | `#dddddd`               |
| **green**   | `rgba(0,0,0,0.2)` | `#05a85a`            | `#06ce6e` (green-500)   |
| **blue**    | `rgba(0,0,0,0.2)` | `#3384ff` (blue-400) | `#99c2ff` (blue-200)    |
| **cyan**    | `rgba(0,0,0,0.2)` | `#0891b2`            | `#22d3ee` (cyan-400)    |
| **indigo**  | `rgba(0,0,0,0.2)` | `#3235ec`            | `#8c85f4` (indigo-300)  |
| **purple**  | `rgba(0,0,0,0.2)` | `#9333ea`            | `#d8b4fe` (purple-300)  |
| **fuchsia** | `rgba(0,0,0,0.2)` | `#c026d3`            | `#f0abfc` (fuchsia-300) |
| **navy**    | `rgba(0,0,0,0.2)` | `#9ba1af`            | `#dde2f1` (navy-300)    |

> **핵심 규칙 (다크 outlined):**
>
> - 배경은 `--element-default`의 다크값 `rgba(0,0,0,0.2)` (반투명 검정).
> - 테두리는 라이트와 대부분 동일하나 blue만 밝게(blue-500→blue-400).
> - 글자는 subtle 다크와 동일한 밝은 톤.

> **Figma 근거:** 다크 node `10704:45474` 의 Chip instance 전수 조사.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**. 모든 size/variant 공통.

| 항목           | 값                           |
| -------------- | ---------------------------- |
| font-family    | `Pretendard` (`--font-sans`) |
| font-size      | **12px** (모든 size 공통)    |
| line-height    | **16px**                     |
| font-weight    | **600** (SemiBold)           |
| letter-spacing | 0                            |
| text-align     | `center`                     |

> **Figma 근거:** 가이드라인 node `9883:91438` Label 항목 — "Chip 내 텍스트는 12px
> 크기로 통일하며, 서체는 디자인 상황에 따라 적절히 선택할 수 있습니다. 폰트 굵기는
> 긴 단어의 경우 가독성을 고려해 Regular로 통일하며, 짧은 단어의 경우 디자인 맥락에
> 따라 다양한 굵기를 적용할 수 있습니다." 본 구현은 SemiBold(600)로 통일.

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### navy 원시 팔레트 (Chip 컬러용으로 추가)

```css
:root {
  /* Navy — 출처: Figma RP8QTyB9n2ZpgfCgmuXgsz (node 10378:1853~1864). 라이트/다크 공통(static). */
  --color-navy-50: #f5faff;
  --color-navy-100: #f0f6ff;
  --color-navy-200: #eaf0ff;
  --color-navy-300: #dde2f1;
  --color-navy-400: #babfce;
  --color-navy-500: #9ba1af;
  --color-navy-600: #727885;
  --color-navy-700: #5e6370;
  --color-navy-800: #3f4450;
  --color-navy-900: #1e232e;
}
```

### `:root` (라이트) — Chip semantic 토큰

```css
:root {
  /* Chip filled 글자 */
  --chip-on-fill: var(--text-static); /* #ffffff — 흰색 고정 */
  --chip-on-fill-inverse: var(
    --text-inverse
  ); /* 라이트 #ffffff / 다크 #1c1c1c */

  /* Chip filled 배경 — 진한 브랜드색 */
  --chip-filled-gray: var(--color-gray-900); /* #1c1c1c */
  --chip-filled-green: var(--color-green-600); /* #05a85a */
  --chip-filled-blue: #0066ff; /* #0066ff */
  --chip-filled-cyan: var(--color-cyan-600); /* #0891b2 */
  --chip-filled-indigo: var(--color-indigo-600); /* #3235ec */
  --chip-filled-purple: var(--color-purple-600); /* #9333ea */
  --chip-filled-fuchsia: var(--color-fuchsia-600); /* #c026d3 */
  --chip-filled-navy: var(--color-navy-600); /* #727885 */

  /* Chip subtle 배경 — pastel(-50 음영) */
  --chip-subtle-gray: var(--color-gray-200); /* #eeeeee */
  --chip-subtle-green: var(--color-green-50); /* #e9fbf2 */
  --chip-subtle-blue: #ebf3ff; /* #ebf3ff */
  --chip-subtle-cyan: var(--color-cyan-50); /* #ecfeff */
  --chip-subtle-indigo: var(--color-indigo-50); /* #f1edff */
  --chip-subtle-purple: var(--color-purple-50); /* #faf5ff */
  --chip-subtle-fuchsia: var(--color-fuchsia-50); /* #fdf4ff */
  --chip-subtle-navy: var(--color-navy-300); /* #dde2f1 */

  /* Chip border — outlined 테두리 */
  --chip-border-gray: var(--border-bolder); /* #1c1c1c */
  --chip-border-green: var(--color-green-600); /* #05a85a */
  --chip-border-blue: #0066ff; /* #0066ff */
  --chip-border-cyan: var(--color-cyan-600); /* #0891b2 */
  --chip-border-indigo: var(--color-indigo-600); /* #3235ec */
  --chip-border-purple: var(--color-purple-600); /* #9333ea */
  --chip-border-fuchsia: var(--color-fuchsia-600); /* #c026d3 */
  --chip-border-navy: var(--color-navy-500); /* #9ba1af */

  /* Chip text — subtle/outlined 글자. 라이트는 -600 음영(navy 예외 = -900) */
  --chip-text-gray: var(--text); /* #1c1c1c */
  --chip-text-green: var(--color-green-600); /* #05a85a */
  --chip-text-blue: #0066ff; /* #0066ff */
  --chip-text-cyan: var(--color-cyan-600); /* #0891b2 */
  --chip-text-indigo: var(--color-indigo-600); /* #3235ec */
  --chip-text-purple: var(--color-purple-600); /* #9333ea */
  --chip-text-fuchsia: var(--color-fuchsia-600); /* #c026d3 */
  --chip-text-navy: var(--color-navy-900); /* #1e232e */

  /* 공통 semantic (Chip 이 재사용) */
  --text: var(--color-gray-900); /* #1c1c1c — default 글자 */
  --text-disabled: var(--color-gray-400); /* #aaaaaa */
  --text-static: var(--color-white); /* #ffffff */
  --text-inverse: var(--color-white); /* #ffffff (라이트) */
  --element-default: var(--color-white); /* #ffffff — outlined 배경 */
  --element-disabled: var(--color-gray-200); /* #eeeeee */
  --border-bolder: var(--color-gray-900); /* #1c1c1c */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크) — Chip 토큰 재매핑

```css
.dark {
  /* filled 배경 — gray 반전, green/blue 더 밝게, 나머지 동일 */
  --chip-filled-gray: var(--color-gray-200); /* #dddddd — 라이트 #1c1c1c 반전 */
  --chip-filled-green: var(--color-green-500); /* #25e086 */
  --chip-filled-blue: #3384ff; /* #3384ff */
  /* cyan/indigo/purple/fuchsia/navy filled: 라이트와 동일 — 재정의 불필요 */

  /* subtle 배경 — 진한 톤 */
  --chip-subtle-gray: var(--color-gray-800); /* #333333 */
  --chip-subtle-green: var(--color-green-800); /* #035930 */
  --chip-subtle-blue: #003585; /* #003585 */
  --chip-subtle-cyan: var(--color-cyan-900); /* #164e63 */
  --chip-subtle-indigo: var(--color-indigo-900); /* #0e0b5b */
  --chip-subtle-purple: var(--color-purple-900); /* #581c87 */
  --chip-subtle-fuchsia: var(--color-fuchsia-900); /* #701a75 */
  --chip-subtle-navy: var(--color-navy-800); /* #3f4450 */

  /* border — navy 동일, 나머지는 라이트와 동일(재정의 불필요한 토큰은 생략) */
  --chip-border-navy: var(--color-navy-500); /* #9ba1af — 라이트와 동일 */

  /* text — 더 밝은 음영(-400~500), navy는 반전 */
  --chip-text-green: var(--color-green-500); /* #06ce6e */
  --chip-text-blue: #99c2ff; /* #99c2ff */
  --chip-text-cyan: var(--color-cyan-400); /* #22d3ee */
  --chip-text-indigo: var(--color-indigo-300); /* #8c85f4 */
  --chip-text-purple: var(--color-purple-300); /* #d8b4fe */
  --chip-text-fuchsia: var(--color-fuchsia-300); /* #f0abfc */
  --chip-text-navy: var(--color-navy-300); /* #dde2f1 — 라이트 #1e232e 반전 */

  /* 공통 semantic 다크 매핑 */
  --text: var(--color-gray-200); /* #dddddd */
  --text-disabled: var(--color-gray-600); /* #757575 */
  --text-static: var(--color-white); /* #ffffff */
  --text-inverse: var(--color-gray-900); /* #1c1c1c — 다크에서 흑 */
  --element-default: color-mix(in srgb, var(--color-black) 20%, transparent);
  --element-disabled: color-mix(in srgb, var(--color-white) 10%, transparent);
  --border-bolder: var(--color-gray-700); /* #555555 */
}
```

---

