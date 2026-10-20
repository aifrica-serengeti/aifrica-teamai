# CardAccordion — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드 (`:root`)

Card Accordion은 일반 semantic 토큰과 다른 전용 토큰(`--ca-*`)을 사용한다.
라이트 모드에서는 semantic 토큰과 동일값이지만, 별도 토큰으로 정의한다.

### 전용 토큰 — 라이트

| 토큰                     | 값        | 비고                                       |
| ------------------------ | --------- | ------------------------------------------ |
| `--ca-header-bg`         | `#ffffff` | Header 기본 배경 (action/default)          |
| `--ca-header-bg-hover`   | `#f8f8f8` | Header hover 배경                          |
| `--ca-header-bg-pressed` | `#f4f4f4` | Header pressed 배경                        |
| `--ca-surface`           | `#ffffff` | Panel 배경 (surface/default)               |
| `--ca-border`            | `#dddddd` | 카드 외곽 테두리 (border/default)          |
| `--ca-border-subtle`     | `#eeeeee` | Header 하단 구분선 (border/default-subtle) |

### 상태별 Header 배경 — 라이트

배경과 open-state border/radius는 Trigger가 아니라 Trigger와 Actions를 함께 감싸는 Header가 소유한다.
Title meta는 제목 바로 옆에서 6px gap으로 배치하고 좁은 폭에서 wrap한다.
Trigger의 hover/pressed 상태는 `:has()`로 Header surface에 반영한다.

| Interactive state | Header 배경 | 토큰                                  |
| ----------------- | ----------- | ------------------------------------- |
| Enabled           | `#ffffff`   | `--ca-header-bg`                      |
| Hovered           | `#f8f8f8`   | `--ca-header-bg-hover`                |
| Pressed           | `#f4f4f4`   | `--ca-header-bg-pressed`              |
| Focused           | `#ffffff`   | `--ca-header-bg` + 파랑 outline       |
| Disabled          | `#ffffff`   | `--ca-header-bg` (hover/pressed 무시) |

### 텍스트·아이콘 색상 — 라이트 (semantic 토큰)

| 요소                   | 색상      | 토큰              |
| ---------------------- | --------- | ----------------- |
| Title                  | `#1c1c1c` | `--text`          |
| Optional               | `#757575` | `--text-subtler`  |
| Info icon              | `#757575` | `--icon-subtler`  |
| Expand icon            | `#1c1c1c` | `--icon`          |
| Title (Disabled)       | `#aaaaaa` | `--text-disabled` |
| Optional (Disabled)    | `#aaaaaa` | `--text-disabled` |
| Expand icon (Disabled) | `#aaaaaa` | `--icon-disabled` |

### Focus outline — 라이트

| 항목          | 값                                                               |
| ------------- | ---------------------------------------------------------------- |
| border        | `1px solid var(--accent-500)` (`--border-focused`, accent-500)               |
| border-radius | Collapsed: `10px` / Expanded: `10px 10px 0 0`                    |
| inset         | `-3px` (Trigger 테두리 바깥 3px)                                 |
| 표시 위치     | **Trigger(Header 56px) 내부에만** — Expanded 시 패널 영역은 제외 |

---

## 6. 색상 스펙 — 다크 모드 (`.dark`)

Card Accordion은 일반 semantic 다크 토큰과 **다른 전용 팔레트**를 사용한다.
`--surface`(`#1c1c1c`)가 아닌 `#282828`을 기본 배경으로 사용한다.

### 전용 토큰 — 다크

| 토큰                     | 값        | 비고                                                               |
| ------------------------ | --------- | ------------------------------------------------------------------ |
| `--ca-header-bg`         | `#282828` | Header 기본 배경 (semantic `--surface` #1c1c1c 보다 밝음)          |
| `--ca-header-bg-hover`   | `#333333` | Header hover 배경                                                  |
| `--ca-header-bg-pressed` | `#2d2d2d` | Header pressed 배경                                                |
| `--ca-surface`           | `#282828` | Panel 배경                                                         |
| `--ca-border`            | `#333333` | 카드 외곽 테두리 (semantic `--border-default` #555555 보다 어두움) |
| `--ca-border-subtle`     | `#333333` | Header 하단 구분선                                                 |

### 상태별 Header 배경 — 다크

| Interactive state | Header 배경 | 토큰                                  |
| ----------------- | ----------- | ------------------------------------- |
| Enabled           | `#282828`   | `--ca-header-bg`                      |
| Hovered           | `#333333`   | `--ca-header-bg-hover`                |
| Pressed           | `#2d2d2d`   | `--ca-header-bg-pressed`              |
| Focused           | `#282828`   | `--ca-header-bg` + 파랑 outline       |
| Disabled          | `#282828`   | `--ca-header-bg` (hover/pressed 무시) |

### 텍스트·아이콘 색상 — 다크 (semantic 토큰 자동 전환)

| 요소                   | 색상      | 토큰              |
| ---------------------- | --------- | ----------------- |
| Title                  | `#dddddd` | `--text`          |
| Optional               | `#8f8f8f` | `--text-subtler`  |
| Info icon              | `#8f8f8f` | `--icon-subtler`  |
| Expand icon            | `#dddddd` | `--icon`          |
| Title (Disabled)       | `#555555` | `--text-disabled` |
| Expand icon (Disabled) | `#555555` | `--icon-disabled` |

### Focus outline — 다크

| 항목   | 값                                                                |
| ------ | ----------------------------------------------------------------- |
| border | `1px solid var(--accent-400)` (`--border-focused`, accent-400 — 더 밝은 accent) |
| 기타   | 라이트와 동일 (border-radius, inset, 표시 위치)                   |

---

## 8. 타이포그래피

폰트: **Pretendard** (`--font-sans`).

| 요소              | 토큰               | font shorthand                   | 굵기          | 크기 | 줄높이 |
| ----------------- | ------------------ | -------------------------------- | ------------- | ---- | ------ |
| Title             | `--text-title1`    | `600 16px/24px var(--font-sans)` | SemiBold(600) | 16px | 24px   |
| Optional          | `--text-body3`     | `400 12px/16px var(--font-sans)` | Regular(400)  | 12px | 16px   |
| Panel placeholder | `--text-headline1` | `700 32px/39px var(--font-sans)` | Bold(700)     | 32px | 39px   |

> **재현자 주의**: typography 토큰은 CSS 변수로 정의되어야 한다.
> Section 11 의 토큰 정의에 포함된 `--text-title1` 등의 정의를 반드시 추가해야 한다.
> vanilla-extract 에서는 `vars.typography.title1` 로 참조하며, 이는 `var(--text-title1)` 로 컴파일된다.
> `vars` 객체가 없는 새 환경에서는 CSS 코드에서 직접 `font: 'var(--text-title1)'` 로 참조한다.

> 라이트/다크 공통 (Typography 토큰은 모드 전환 없음).

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 전역 CSS(`globals.css`)에 아래 코드를 추가한다.
**모든 변수를 누락 없이 정의해야 한다.** Card Accordion이 정상 렌더되려면
전용 토큰(`--ca-*`), semantic 토큰, typography 토큰이 모두 필요하다.

### `:root` (라이트)

```css
:root {
  /* ---- Card Accordion 전용 토큰 — 라이트 ---- */
  --ca-header-bg: #ffffff;
  --ca-header-bg-hover: #f8f8f8;
  --ca-header-bg-pressed: #f4f4f4;
  --ca-surface: #ffffff;
  --ca-border: #dddddd;
  --ca-border-subtle: #eeeeee;

  /* ---- Semantic 토큰 — 라이트 (Card Accordion이 참조) ---- */
  /* Text */
  --text: #1c1c1c; /* 기본 텍스트 (Title) */
  --text-subtler: #757575; /* 보조 (Optional) */
  --text-disabled: #aaaaaa; /* 비활성 */
  /* Icon */
  --icon: #1c1c1c; /* 기본 (expand icon) */
  --icon-subtler: #757575; /* 보조 (info icon) */
  --icon-disabled: #aaaaaa; /* 비활성 */
  /* Surface */
  --surface-subtle: #f8f8f8; /* Panel placeholder 배경 */
  /* Border */
  --border-focused: var(--accent-500); /* Focus outline (accent-500) */

  /* ---- Typography 토큰 (font shorthand) ---- */
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
  --text-title1: 600 16px/24px var(--font-sans); /* Pretendard SemiBold 16px */
  --text-body3: 400 12px/16px var(--font-sans); /* Pretendard Regular 12px */
  --text-headline1: 700 32px/39px var(--font-sans); /* Pretendard Bold 32px */
}
```

### `.dark` (다크)

```css
.dark {
  /* ---- Card Accordion 전용 토큰 — 다크 (Figma 전용 팔레트) ---- */
  --ca-header-bg: #282828;
  --ca-header-bg-hover: #333333;
  --ca-header-bg-pressed: #2d2d2d;
  --ca-surface: #282828;
  --ca-border: #333333;
  --ca-border-subtle: #333333;

  /* ---- Semantic 토큰 — 다크 ---- */
  /* Text */
  --text: #dddddd;
  --text-subtler: #8f8f8f;
  --text-disabled: #555555;
  /* Icon */
  --icon: #dddddd;
  --icon-subtler: #8f8f8f;
  --icon-disabled: #555555;
  /* Surface */
  --surface-subtle: #333333;
  /* Border */
  --border-focused: var(--accent-400); /* accent-400 (다크에서 더 밝은 accent) */

  /* Typography 토큰은 라이트/다크 공통 (재정의 불필요) */
}
```

> **재현자 주요**: `--font-sans` 폰트 패밀리가 실제로 로드되어야 한다.
> Pretendard 는 `@fontsource/pretendard` 패키지 또는 CDN 으로 import.

---
