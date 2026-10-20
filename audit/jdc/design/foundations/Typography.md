# Typography

> **미채택 JDC 관찰 자료**: 아래 색·치수·도메인·경로는 원본 관찰 시점의 근거입니다. 솔루션 공통 기본값으로 적용하지 않습니다.

> 원본 Figma: Aifrica Design System / `RP8QTyB9n2ZpgfCgmuXgsz` · node `6722:6558`

타이포그래피(Typography)는 정보 전달의 핵심 요소다. 글꼴, 폰트 굵기, 텍스트 스타일을 정의하여
텍스트의 내용과 중요도를 시각적으로 표현하고 다양한 화면에서 일관된 경험을 보장한다.

## 원칙

- **토큰으로만 사용** — 색상·그림자와 동일하게 타이포그래피도 토큰 변수로만 지정한다.
  컴포넌트(`.tsx` / `.css.ts`)에서 `font-size`, `font-weight`, `line-height`, `font-family` 를
  개별적으로 하드코딩하지 않는다. 매번 픽셀값을 적으면 동일 스타일이 미세하게 달라지는 것을 막기 위해서다.
- **제한된 선택지** — Aifrica Design System은 신중한 설계를 위해 폰트 2종·굵기 3종·텍스트 스타일 12종으로 제한한다.
  이 범위 밖의 스타일은 원칙적으로 허용하지 않는다.
- **의미에 맞는 선택** — 시각적 크기가 아니라 용도(Display=키비주얼, Title=소그룹 타이틀, Body=본문 …)로
  스타일을 고른다.

## Typeface (글꼴)

Aifrica Design System은 오픈소스인 **Pretendard**와 **IBM Plex Mono** 두 가지를 사용한다.

| 폰트              | 용도                                                             | 패키지                                | 굵기                                                |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------- |
| **Pretendard**    | 인터페이스 요소 전용 (Display · Headline · Title · Body · Label) | `src/assets/fonts/Pretendard-*.woff2` | 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900 |
| **IBM Plex Mono** | 코드 관련 요소 전용 (Code)                                       | `@fontsource/ibm-plex-mono`           | 400                                                 |

> **폰트 자산 기준**: 현재 프로젝트는 한국어 glyph를 포함한 Pretendard static font를
> `src/assets/fonts`에서 import한다. `theme.css.ts`의 `@font-face`는 저장소에 있는 100~900 굵기를
> 모두 선언하며, 사용하지 않는 font 파일을 별도 CDN이나 package에서 중복 로드하지 않는다.

## Font weight (폰트 굵기)

기본 text token은 아래 **3가지** 굵기를 사용한다. 다만 실제 컴포넌트 가이드가 300·500 등 다른 굵기를
명시한 경우에는 `src/assets/fonts`에 선언된 실제 asset을 사용하며 browser synthetic weight에 의존하지 않는다.

| 굵기         | 값    | 용도                                         |
| ------------ | ----- | -------------------------------------------- |
| **Bold**     | `700` | Display1, Headline1, Label1. 가장 강한 강조. |
| **SemiBold** | `600` | Headline2/3, Title1/2/3. 섹션·그룹 타이틀.   |
| **Regular**  | `400` | Body1/2/3, Code1. 본문·코드.                 |

## Text styles (텍스트 스타일)

총 6그룹 12종. 텍스트의 시각적 표현을 정의하여 일관성을 제공하고, 다양한 사용 사례에 적합한
계층 구조를 형성한다.

> 값은 Figma text style 변수(`Display/Display1`, `Body/Body2` …)에서 추출한 정확한 스펙이다.
> 스크린샷 추측이 아니다.

### Display — 키 비주얼·마케팅 배너

| 스타일       | 토큰              | 폰트       | 굵기      | 크기 | 줄높이 | 자간 |
| ------------ | ----------------- | ---------- | --------- | ---- | ------ | ---- |
| **Display1** | `--text-display1` | Pretendard | Bold(700) | 34px | 42px   | 0    |

### Headline — 페이지·섹션 단위 타이틀

| 스타일        | 토큰               | 폰트       | 굵기          | 크기 | 줄높이 | 자간 |
| ------------- | ------------------ | ---------- | ------------- | ---- | ------ | ---- |
| **Headline1** | `--text-headline1` | Pretendard | Bold(700)     | 32px | 39px   | 0    |
| **Headline2** | `--text-headline2` | Pretendard | SemiBold(600) | 24px | 32px   | 0    |
| **Headline3** | `--text-headline3` | Pretendard | SemiBold(600) | 20px | 24px   | 0    |

### Title — 섹션 내 소그룹 타이틀

| 스타일     | 토큰            | 폰트       | 굵기          | 크기 | 줄높이 | 자간 |
| ---------- | --------------- | ---------- | ------------- | ---- | ------ | ---- |
| **Title1** | `--text-title1` | Pretendard | SemiBold(600) | 16px | 24px   | 0    |
| **Title2** | `--text-title2` | Pretendard | SemiBold(600) | 14px | 20px   | 0    |
| **Title3** | `--text-title3` | Pretendard | SemiBold(600) | 12px | 16px   | 0    |

### Body — 본문

| 스타일    | 토큰           | 폰트       | 굵기         | 크기 | 줄높이 | 자간 |
| --------- | -------------- | ---------- | ------------ | ---- | ------ | ---- |
| **Body1** | `--text-body1` | Pretendard | Regular(400) | 16px | 24px   | 0    |
| **Body2** | `--text-body2` | Pretendard | Regular(400) | 14px | 20px   | 0    |
| **Body3** | `--text-body3` | Pretendard | Regular(400) | 12px | 16px   | 0    |

### Label — 강조 라벨·캡션

| 스타일     | 토큰            | 폰트       | 굵기      | 크기 | 줄높이 | 자간 |
| ---------- | --------------- | ---------- | --------- | ---- | ------ | ---- |
| **Label1** | `--text-label1` | Pretendard | Bold(700) | 10px | 12px   | 0    |

### Code — 코드 요소

| 스타일    | 토큰           | 폰트          | 굵기         | 크기 | 줄높이 | 자간 |
| --------- | -------------- | ------------- | ------------ | ---- | ------ | ---- |
| **Code1** | `--text-code1` | IBM Plex Mono | Regular(400) | 14px | 20px   | 0    |

## 사용 가이드

- **Display** 는 키 비주얼·마케팅 배너에만. 일반 UI 화면에서는 가장 큰 Headline1 부터 시작.
- 페이지 최상단 타이틀 = Headline1, 섹션 타이틀 = Headline2/3, 소그룹 = Title1/2/3.
- 본문은 Body1(기본) → Body2(보조) → Body3(최소) 순서로 중요도에 따라 선택.
- Label1 은 라벨·캡션·태그 등 강조가 필요한 짧은 텍스트에만.
- Code1 은 코드 블록·인라인 코드·명령어 등 코드 관련 요소에만.

## 참조 방법

| 환경                  | 사용법                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **일반 CSS**          | `font: var(--text-body2)` (font-family·size·weight·line-height 한 번에)                        |
| **vanilla-extract**   | `vars.typography.body2`                                                                        |
| **Tailwind 유틸리티** | `text-display1`, `text-headline1`, `text-title2`, `text-body2`, `text-label1`, `text-code1` 등 |

## CSS 변수 정의 — 복사 가능한 코드

```css
:root {
  /* 폰트 패밀리 */
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Display — Pretendard Bold */
  --text-display1: 700 34px/42px var(--font-sans);

  /* Headline — Pretendard Bold/SemiBold */
  --text-headline1: 700 32px/39px var(--font-sans);
  --text-headline2: 600 24px/32px var(--font-sans);
  --text-headline3: 600 20px/24px var(--font-sans);

  /* Title — Pretendard SemiBold */
  --text-title1: 600 16px/24px var(--font-sans);
  --text-title2: 600 14px/20px var(--font-sans);
  --text-title3: 600 12px/16px var(--font-sans);

  /* Body — Pretendard Regular */
  --text-body1: 400 16px/24px var(--font-sans);
  --text-body2: 400 14px/20px var(--font-sans);
  --text-body3: 400 12px/16px var(--font-sans);

  /* Label — Pretendard Bold */
  --text-label1: 700 10px/12px var(--font-sans);

  /* Code — IBM Plex Mono Regular */
  --text-code1: 400 14px/20px var(--font-mono);
}
```

> 폰트 패밀리 import(Pretendard / IBM Plex Mono)는 각 폰트의 `@fontsource/*` 패키지 또는 CDN 사용.
> Typography 는 라이트/다크 공통. 별도 `.dark` 정의 불필요.

---
