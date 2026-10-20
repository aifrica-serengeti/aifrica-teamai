# Color

> **미채택 JDC 관찰 자료**: 아래 색·치수·도메인·경로는 원본 관찰 시점의 근거입니다. 솔루션 공통 기본값으로 적용하지 않습니다.

> 원본 Figma: Aifrica Design System / `RP8QTyB9n2ZpgfCgmuXgsz` · node `6606:9474`

색상은 중요한 부분을 강조하고, 상태와 긴급성을 전달하며, 주의를 유도한다.

## 원칙

- **토큰으로만 사용** — 모든 색상은 CSS 변수로만 참조한다. 컴포넌트(`.tsx` / `.css.ts`)에서
  hex·oklch 값을 직접 하드코딩하지 않는다. 매번 hex 를 적으면 같은 색이 미세하게 달라지는 것을 막기 위해서다.
- **3계층 구조** — Raw palette → Semantic → shadcn 매핑. 역할이 명확하면 semantic 을 우선한다.
- **다크 모드는 semantic 토큰 단위 전환** — `.dark` 에서 semantic 토큰을 재매핑하면 모든 컴포넌트가 자동 전환.

## 토큰 계층

| 계층            | 용도                                                                  | 참조 방법                             |
| --------------- | --------------------------------------------------------------------- | ------------------------------------- |
| **Raw palette** | 12 색상 × 10 음영. Figma color collection 그대로.                     | `var(--color-{name}-{shade})`         |
| **Semantic**    | text·surface·border·element·icon 역할별 매핑. 컴포넌트는 이쪽을 우선. | `var(--text)`, `var(--surface-hover)` |
| **shadcn**      | shadcn primitive 가 소비. semantic 을 shadcn 명명으로 재매핑.         | `bg-primary`, `text-muted-foreground` |

## Raw palette — 전체 색상표 (12 colors × 10 shades)

각 색상은 50(가장 밝음) ~ 900(가장 어둡기) 음영을 가진다.

### Blue (Primary)

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#ebf3ff` | `#cce0ff` | `#99c2ff` | `#66a3ff` | `#3384ff` | `#0066ff` | `#0056d6` | `#0045ad` | `#003585` | `#00255c` |

> **Primary**. 브랜드, CTA, 강조. 전체 사용량 10% 이하 제한.

### Red

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 1000      |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#fff0f0` | `#ffd1d1` | `#ffa3a3` | `#ff7171` | `#fb3e3e` | `#f52424` | `#e81919` | `#d00a0a` | `#730303` |

> Danger, 에러, 삭제.

### Orange

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#fff7ed` | `#ffedd5` | `#fed7aa` | `#fdba74` | `#fb923c` | `#f97316` | `#ea580c` | `#c2410c` | `#9a3412` | `#7c2d12` |

> 경고(강).

### Yellow

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#fffaea` | `#fff2c1` | `#ffe897` | `#fbdd70` | `#fbd343` | `#f0bb00` | `#d79c04` | `#b87b05` | `#916103` | `#6f4a01` |

> Warning.

### Green

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#e9fbf2` | `#aff8d5` | `#80f4bc` | `#5beca7` | `#25e086` | `#06ce6e` | `#05a85a` | `#048145` | `#035930` | `#023b20` |

> Success.

### Cyan

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#ecfeff` | `#cffafe` | `#a5f3fc` | `#67e8f9` | `#22d3ee` | `#06b6d4` | `#0891b2` | `#0e7490` | `#155e75` | `#164e63` |

> 정보 보조.

### Indigo

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#f1edff` | `#e0d9fc` | `#bdb4f9` | `#8c85f4` | `#818cf8` | `#6366f1` | `#3235ec` | `#1616ca` | `#121093` | `#0e0b5b` |

> 보조 강조.

### Purple

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#faf5ff` | `#f3e8ff` | `#e9d5ff` | `#d8b4fe` | `#c084fc` | `#a855f7` | `#9333ea` | `#7e22ce` | `#6b21a8` | `#581c87` |

> 특수 태그/칩.

### Fuchsia

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#fdf4ff` | `#fae8ff` | `#f5d0fe` | `#f0abfc` | `#e879f9` | `#d946ef` | `#c026d3` | `#a21caf` | `#86198f` | `#701a75` |

> 특수 태그/칩.

### Gray (Cool Tone)

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#f8f8f8` | `#f4f4f4` | `#eeeeee` | `#dddddd` | `#aaaaaa` | `#8f8f8f` | `#757575` | `#555555` | `#333333` | `#1c1c1c` |

> **Grayscale**. Cool tone. 배경/선/텍스트 기반. 가장 많이 사용.

### Navy — Chip 컬러 팔레트용

출처: Figma RP8QTyB9n2ZpgfCgmuXgsz (node 10378:1853~1864). Chip 컬러 팔레트에
사용하기 위해 추가된 색상.

| 음영 | 50        | 100       | 200       | 300       | 400       | 500       | 600       | 700       | 800       | 900       |
| ---- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| hex  | `#f5faff` | `#f0f6ff` | `#eaf0ff` | `#dde2f1` | `#babfce` | `#9ba1af` | `#727885` | `#5e6370` | `#3f4450` | `#1e232e` |

> **차가운 청회색**. Chip filled/subtle/outlined 색상으로 사용. 라이트/다크 공통(static 원시 팔레트).

### Monochrome

| 색상  | hex       |
| ----- | --------- |
| white | `#ffffff` |
| black | `#000000` |

## Semantic tokens — 라이트 모드 (`:root`)

역할별 매핑. 컴포넌트는 raw 보다 이쪽을 우선 참조한다.

### Text

| 토큰                   | 값                   | 비고                       |
| ---------------------- | -------------------- | -------------------------- |
| `--text`               | `#1c1c1c` (gray-900) | 기본 텍스트                |
| `--text-subtle`        | `#555555` (gray-700) | 보조                       |
| `--text-subtler`       | `#757575` (gray-600) | 헤더 라벨·설명·placeholder |
| `--text-disabled`      | `#aaaaaa` (gray-400) | 비활성 본문                |
| `--text-disabled-bold` | `#8f8f8f` (gray-500) | 비활성 라벨                |
| `--text-on-primary`    | `#ffffff`            | primary 위 텍스트          |
| `--text-primary`       | `#0066ff` (blue-500) | 강조·링크                  |
| `--text-link`          | `#0066ff` (blue-500) | 링크                       |
| `--text-static`        | `#ffffff`            | 배경 불문 고정색           |
| `--text-danger`        | `#e81919` (red-600)  | Invalid/필수 표시          |

### Surface

| 토큰                       | 값                    | 비고                                |
| -------------------------- | --------------------- | ----------------------------------- |
| `--surface`                | `#ffffff`             | 기본 배경                           |
| `--surface-shell`          | `#ffffff`             | 앱 shell / Global Header v1·v2 배경 |
| `--surface-subtle`         | `#f8f8f8` (gray-50)   | header 배경 등                      |
| `--surface-hover`          | `#f8f8f8` (gray-50)   | hover 배경                          |
| `--surface-pressed`        | `#f4f4f4` (gray-100)  | pressed 배경                        |
| `--surface-primary-subtle` | `#ebf3ff` (blue-50)   | selected 행 배경                    |
| `--surface-success-subtle` | `#e9fbf2` (green-50)  |                                     |
| `--surface-warning-subtle` | `#fffaea` (yellow-50) |                                     |
| `--surface-danger-subtle`  | `#fff0f0` (red-50)    |                                     |

### Border

| 토큰                       | 값                     | 비고                      |
| -------------------------- | ---------------------- | ------------------------- |
| `--border-default`         | `#dddddd` (gray-300)   | 기본 테두리               |
| `--border-subtle`          | `#eeeeee` (gray-200)   |                           |
| `--border-bolder`          | `#1c1c1c` (gray-900)   | checkbox 미선택 테두리 등 |
| `--border-primary`         | `#0066ff` (blue-500)   |                           |
| `--border-success`         | `#05a85a` (green-600)  |                           |
| `--border-warning`         | `#f0bb00` (yellow-500) |                           |
| `--border-danger`          | `#e81919` (red-600)    |                           |
| `--border-disabled-subtle` | `#aaaaaa` (gray-400)   | unchecked disabled 테두리 |
| `--border-disabled-fill`   | `#dddddd` (gray-300)   | checked disabled 테두리   |

### Element

| 토큰                       | 값                   | 비고                  |
| -------------------------- | -------------------- | --------------------- |
| `--element-default`        | `#ffffff`            | unchecked fill        |
| `--element-primary`        | `#0066ff` (blue-500) | checked fill          |
| `--element-on-primary`     | `#ffffff`            | checked 내부 점       |
| `--element-primary-subtle` | `#ebf3ff` (blue-50)  |                       |
| `--element-disabled`       | `#eeeeee` (gray-200) | checked disabled fill |
| `--element-on-disabled`    | `#555555` (gray-700) | disabled 위 점/아이콘 |

### Icon

| 토큰              | 값                     | 비고 |
| ----------------- | ---------------------- | ---- |
| `--icon`          | `#1c1c1c` (gray-900)   | 기본 |
| `--icon-subtle`   | `#555555` (gray-700)   |      |
| `--icon-subtler`  | `#757575` (gray-600)   |      |
| `--icon-disabled` | `#aaaaaa` (gray-400)   |      |
| `--icon-primary`  | `#0066ff` (blue-500)   |      |
| `--icon-success`  | `#05a85a` (green-600)  |      |
| `--icon-warning`  | `#f0bb00` (yellow-500) |      |
| `--icon-danger`   | `#e81919` (red-600)    |      |

## Semantic tokens — 다크 모드 (`.dark`)

다크 모드는 `.dark` 클래스 적용 시 전환. primary 가 더 밝은 blue(#3384ff)로, text 는 밝은 회색으로 바뀐다.

### Text (Dark)

| 토큰                   | 값                   | 비고                     |
| ---------------------- | -------------------- | ------------------------ |
| `--text`               | `#dddddd` (gray-200) | 기본 텍스트              |
| `--text-subtle`        | `#aaaaaa` (gray-400) | 보조                     |
| `--text-subtler`       | `#8f8f8f` (gray-500) |                          |
| `--text-disabled`      | `#757575` (gray-600) | 비활성 본문              |
| `--text-disabled-bold` | `#757575` (gray-600) | 비활성 라벨              |
| `--text-on-primary`    | `#ffffff`            |                          |
| `--text-primary`       | `#3384ff` (blue-400) | 강조·링크 (더 밝은 파랑) |
| `--text-link`          | `#3384ff` (blue-400) |                          |
| `--text-static`        | `#ffffff`            |                          |
| `--text-danger`        | `#f52424` (red-500)  | (더 밝은 빨강)           |

### Surface (Dark)

| 토큰                       | 값                           | 비고                                |
| -------------------------- | ---------------------------- | ----------------------------------- |
| `--surface`                | `#1c1c1c` (gray-900)         | 기본 배경                           |
| `--surface-shell`          | `#282828`                    | 앱 shell / Global Header v1·v2 배경 |
| `--surface-subtle`         | `#333333` (gray-800)         |                                     |
| `--surface-hover`          | `#333333` (gray-800)         |                                     |
| `--surface-pressed`        | `#555555` (gray-700)         |                                     |
| `--surface-primary-subtle` | blue-400 12% + transparent   | color-mix                           |
| `--surface-success-subtle` | green-500 12% + transparent  | color-mix                           |
| `--surface-warning-subtle` | yellow-500 12% + transparent | color-mix                           |
| `--surface-danger-subtle`  | red-500 12% + transparent    | color-mix                           |

### Border (Dark)

| 토큰                       | 값                     | 비고                   |
| -------------------------- | ---------------------- | ---------------------- |
| `--border-default`         | `#555555` (gray-700)   |                        |
| `--border-subtle`          | `#333333` (gray-800)   |                        |
| `--border-bolder`          | `#555555` (gray-700)   | unchecked radio 테두리 |
| `--border-primary`         | `#3384ff` (blue-400)   |                        |
| `--border-success`         | `#05a85a` (green-600)  |                        |
| `--border-warning`         | `#f0bb00` (yellow-500) |                        |
| `--border-danger`          | `#f52424` (red-500)    |                        |
| `--border-disabled-subtle` | `#333333` (gray-800)   | unchecked disabled     |
| `--border-disabled-fill`   | `#555555` (gray-700)   | checked disabled       |

### Element (Dark)

| 토큰                       | 값                         | 비고                        |
| -------------------------- | -------------------------- | --------------------------- |
| `--element-default`        | `rgba(0,0,0,0.2)`          | 반투명 검정                 |
| `--element-primary`        | `#3384ff` (blue-400)       | checked fill (더 밝은 파랑) |
| `--element-on-primary`     | `#ffffff`                  |                             |
| `--element-primary-subtle` | blue-400 12% + transparent | color-mix                   |
| `--element-disabled`       | `rgba(255,255,255,0.1)`    | 반투명 흰                   |
| `--element-on-disabled`    | `#555555` (gray-700)       |                             |

### Icon (Dark)

| 토큰              | 값                     | 비고 |
| ----------------- | ---------------------- | ---- |
| `--icon`          | `#dddddd` (gray-200)   |      |
| `--icon-subtle`   | `#aaaaaa` (gray-400)   |      |
| `--icon-subtler`  | `#8f8f8f` (gray-500)   |      |
| `--icon-disabled` | `#555555` (gray-700)   |      |
| `--icon-primary`  | `#3384ff` (blue-400)   |      |
| `--icon-success`  | `#06ce6e` (green-500)  |      |
| `--icon-warning`  | `#f0bb00` (yellow-500) |      |
| `--icon-danger`   | `#f52424` (red-500)    |      |

## CSS 변수 정의 — 복사 가능한 코드

새 프로젝트에서 아래 코드를 전역 CSS(`globals.css` 또는 동급)에 붙여넣는다.

### `:root` (라이트)

<details>
<summary>raw palette + semantic 정의 (펼치기)</summary>

```css
:root {
  /* Raw palette — Blue */
  --color-blue-50: #ebf3ff;
  --color-blue-100: #cce0ff;
  --color-blue-200: #99c2ff;
  --color-blue-300: #66a3ff;
  --color-blue-400: #3384ff;
  --color-blue-500: #0066ff;
  --color-blue-600: #0056d6;
  --color-blue-700: #0045ad;
  --color-blue-800: #003585;
  --color-blue-900: #00255c;
  /* Red */
  --color-red-50: #fff0f0;
  --color-red-100: #ffd1d1;
  --color-red-200: #ffa3a3;
  --color-red-300: #ff7171;
  --color-red-400: #fb3e3e;
  --color-red-500: #f52424;
  --color-red-600: #e81919;
  --color-red-700: #d00a0a;
  --color-red-1000: #730303;
  /* Orange */
  --color-orange-50: #fff7ed;
  --color-orange-100: #ffedd5;
  --color-orange-200: #fed7aa;
  --color-orange-300: #fdba74;
  --color-orange-400: #fb923c;
  --color-orange-500: #f97316;
  --color-orange-600: #ea580c;
  --color-orange-700: #c2410c;
  --color-orange-800: #9a3412;
  --color-orange-900: #7c2d12;
  /* Yellow */
  --color-yellow-50: #fffaea;
  --color-yellow-100: #fff2c1;
  --color-yellow-200: #ffe897;
  --color-yellow-300: #fbdd70;
  --color-yellow-400: #fbd343;
  --color-yellow-500: #f0bb00;
  --color-yellow-600: #d79c04;
  --color-yellow-700: #b87b05;
  --color-yellow-800: #916103;
  --color-yellow-900: #6f4a01;
  /* Green */
  --color-green-50: #e9fbf2;
  --color-green-100: #aff8d5;
  --color-green-200: #80f4bc;
  --color-green-300: #5beca7;
  --color-green-400: #25e086;
  --color-green-500: #06ce6e;
  --color-green-600: #05a85a;
  --color-green-700: #048145;
  --color-green-800: #035930;
  --color-green-900: #023b20;
  /* Cyan */
  --color-cyan-50: #ecfeff;
  --color-cyan-100: #cffafe;
  --color-cyan-200: #a5f3fc;
  --color-cyan-300: #67e8f9;
  --color-cyan-400: #22d3ee;
  --color-cyan-500: #06b6d4;
  --color-cyan-600: #0891b2;
  --color-cyan-700: #0e7490;
  --color-cyan-800: #155e75;
  --color-cyan-900: #164e63;
  /* Indigo */
  --color-indigo-50: #f1edff;
  --color-indigo-100: #e0d9fc;
  --color-indigo-200: #bdb4f9;
  --color-indigo-300: #8c85f4;
  --color-indigo-400: #818cf8;
  --color-indigo-500: #6366f1;
  --color-indigo-600: #3235ec;
  --color-indigo-700: #1616ca;
  --color-indigo-800: #121093;
  --color-indigo-900: #0e0b5b;
  /* Purple */
  --color-purple-50: #faf5ff;
  --color-purple-100: #f3e8ff;
  --color-purple-200: #e9d5ff;
  --color-purple-300: #d8b4fe;
  --color-purple-400: #c084fc;
  --color-purple-500: #a855f7;
  --color-purple-600: #9333ea;
  --color-purple-700: #7e22ce;
  --color-purple-800: #6b21a8;
  --color-purple-900: #581c87;
  /* Fuchsia */
  --color-fuchsia-50: #fdf4ff;
  --color-fuchsia-100: #fae8ff;
  --color-fuchsia-200: #f5d0fe;
  --color-fuchsia-300: #f0abfc;
  --color-fuchsia-400: #e879f9;
  --color-fuchsia-500: #d946ef;
  --color-fuchsia-600: #c026d3;
  --color-fuchsia-700: #a21caf;
  --color-fuchsia-800: #86198f;
  --color-fuchsia-900: #701a75;
  /* Gray */
  --color-gray-50: #f8f8f8;
  --color-gray-100: #f4f4f4;
  --color-gray-200: #eeeeee;
  --color-gray-300: #dddddd;
  --color-gray-400: #aaaaaa;
  --color-gray-500: #8f8f8f;
  --color-gray-600: #757575;
  --color-gray-700: #555555;
  --color-gray-800: #333333;
  --color-gray-900: #1c1c1c;
  /* Navy — Chip 컬러 팔레트용 */
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
  /* Monochrome */
  --color-white: #ffffff;
  --color-black: #000000;

  /* Semantic — Text */
  --text: var(--color-gray-900);
  --text-subtle: var(--color-gray-700);
  --text-subtler: var(--color-gray-600);
  --text-disabled: var(--color-gray-400);
  --text-disabled-bold: var(--color-gray-500);
  --text-on-primary: var(--color-white);
  --text-primary: var(--color-blue-500);
  --text-link: var(--color-blue-500);
  --text-static: var(--color-white);
  --text-danger: var(--color-red-600);
  /* Semantic — Surface */
  --surface: var(--color-white);
  --surface-subtle: var(--color-gray-50);
  --surface-hover: var(--color-gray-50);
  --surface-pressed: var(--color-gray-100);
  --surface-primary-subtle: var(--color-blue-50);
  --surface-success-subtle: var(--color-green-50);
  --surface-warning-subtle: var(--color-yellow-50);
  --surface-danger-subtle: var(--color-red-50);
  /* Semantic — Border */
  --border-default: var(--color-gray-300);
  --border-subtle: var(--color-gray-200);
  --border-bolder: var(--color-gray-900);
  --border-primary: var(--color-blue-500);
  --border-success: var(--color-green-600);
  --border-warning: var(--color-yellow-500);
  --border-danger: var(--color-red-600);
  --border-disabled-subtle: var(--color-gray-400);
  --border-disabled-fill: var(--color-gray-300);
  /* Semantic — Element */
  --element-default: var(--color-white);
  --element-primary: var(--color-blue-500);
  --element-on-primary: var(--color-white);
  --element-primary-subtle: var(--color-blue-50);
  --element-disabled: var(--color-gray-200);
  --element-on-disabled: var(--color-gray-700);
  /* Semantic — Icon */
  --icon: var(--color-gray-900);
  --icon-subtle: var(--color-gray-700);
  --icon-subtler: var(--color-gray-600);
  --icon-disabled: var(--color-gray-400);
  --icon-primary: var(--color-blue-500);
  --icon-success: var(--color-green-600);
  --icon-warning: var(--color-yellow-500);
  --icon-danger: var(--color-red-600);
}
```

</details>

### `.dark` (다크)

<details>
<summary>semantic 다크 매핑 (펼치기)</summary>

```css
.dark {
  /* Text */
  --text: var(--color-gray-200);
  --text-subtle: var(--color-gray-400);
  --text-subtler: var(--color-gray-500);
  --text-disabled: var(--color-gray-600);
  --text-disabled-bold: var(--color-gray-600);
  --text-on-primary: var(--color-white);
  --text-primary: var(--color-blue-400);
  --text-link: var(--color-blue-400);
  --text-static: var(--color-white);
  --text-danger: var(--color-red-500);
  /* Surface */
  --surface: var(--color-gray-900);
  --surface-subtle: var(--color-gray-800);
  --surface-hover: var(--color-gray-800);
  --surface-pressed: var(--color-gray-700);
  --surface-primary-subtle: var(--color-blue-900); /* #00255c */
  --surface-success-subtle: var(--color-green-900); /* #023b20 */
  --surface-warning-subtle: var(--color-yellow-900); /* #6f4a01 */
  --surface-danger-subtle: var(--color-red-1000); /* #730303 */
  /* Border */
  --border-default: var(--color-gray-700);
  --border-subtle: var(--color-gray-800);
  --border-bolder: var(--color-gray-700);
  --border-primary: var(--color-blue-400);
  --border-success: var(--color-green-600);
  --border-warning: var(--color-yellow-500);
  --border-danger: var(--color-red-500);
  --border-disabled-subtle: var(--color-gray-800);
  --border-disabled-fill: var(--color-gray-700);
  /* Element */
  --element-default: color-mix(in srgb, var(--color-black) 20%, transparent);
  --element-primary: var(--color-blue-400);
  --element-on-primary: var(--color-white);
  --element-primary-subtle: color-mix(
    in srgb,
    var(--color-blue-400) 12%,
    transparent
  );
  --element-disabled: color-mix(in srgb, var(--color-white) 10%, transparent);
  --element-on-disabled: var(--color-gray-700);
  /* Icon */
  --icon: var(--color-gray-200);
  --icon-subtle: var(--color-gray-400);
  --icon-subtler: var(--color-gray-500);
  --icon-disabled: var(--color-gray-700);
  --icon-primary: var(--color-blue-400);
  --icon-success: var(--color-green-500);
  --icon-warning: var(--color-yellow-500);
  --icon-danger: var(--color-red-500);
}
```

</details>

## shadcn 매핑 (참고)

shadcn primitive 가 소비하는 변수는 semantic 토큰을 가리킨다. 별도 정의 필요:

```css
:root {
  --background: var(--surface);
  --foreground: var(--text);
  --primary: var(--element-primary);
  --primary-foreground: var(--text-on-primary);
  --secondary: var(--surface-subtle);
  --muted: var(--surface-subtle);
  --muted-foreground: var(--text-subtler);
  --accent: var(--surface-hover);
  --border: var(--border-default);
  --input: var(--border-default);
  --ring: var(--color-blue-500);
  --destructive: var(--color-red-600);
  /* ... card, popover, sidebar 등 동일 패턴 */
}
```

---

## Serengeti CMP 사이드바 제품 매핑

제품 SNB 토큰은 `src/styles/serengeti-cmp-theme.css.ts`에서 소유한다. 다크 모드 사이드바 surface는 Purple 800(#6b21a8), hover/selected는 Purple 900(#581c87), pressed/selected-hover는 Purple 700(#7e22ce), 선택 표시와 아바타 강조는 Purple 400(#c084fc)을 사용한다. 라이트 모드의 Indigo 50 surface는 유지한다. 앱 공통 primary 색상과 다른 위젯의 강조색은 이 제품 SNB 매핑과 구분한다.
