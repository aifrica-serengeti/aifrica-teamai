# CSS 로컬 적용 기준

> 마지막 공식 확인: 2026-08-12  
> 스냅샷 기준: CSS Snapshot 2026  
> 일반 작업: 이 문서만 사용하며 최신성 확인을 위한 인터넷 검색 금지

## 기본 전략

Aifrica solution에서는 디자인 token과 component contract를 먼저 사용한다. shadcn primitive 자체가 아닌
프로젝트 UI 스타일은 소비 저장소의 architecture와 설치된 스타일 도구가 정한 전략을 따른다. CSS 기능의 최신성보다
예측 가능한 cascade, 반응형 content, 접근성과 유지보수성을 우선한다.

## 최신 지식 주입: CSS

AI는 아래 modern CSS를 알고 있어야 하지만 현재 browser baseline, 채택한 CSS/build output과 fallback을
확인한 뒤 사용한다.

### Container query

viewport가 아니라 component가 배치된 container 폭에 반응한다.

```css
.cardRegion {
  container: project-card / inline-size;
}

.projectCard {
  display: grid;
  gap: var(--space-16);
}

@container project-card (width >= 40rem) {
  .projectCard {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
}
```

- size query는 ancestor에 `container-type: inline-size|size` 또는 `container` shorthand가 필요하다.
- component 자신이 아니라 query container의 descendant가 style 대상이다.
- `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax` 단위를 사용할 수 있지만 token scale과 과도하게 섞지 않는다.
- container가 없을 때의 기본 layout을 먼저 완성한다.
- style query는 custom property 조건이 실용적인 범위이며 일반 CSS property query 지원을 가정하지 않는다.

```css
@container style(--density: compact) {
  .row {
    min-block-size: 2rem;
  }
}
```

### Native CSS nesting

```css
.field {
  color: var(--text-primary);

  &:hover {
    background: var(--surface-hover);
  }

  & > .label {
    font-weight: 600;
  }

  @media (width < 48rem) {
    gap: var(--space-8);
  }
}
```

- `&`가 parent selector를 나타낸다.
- nesting을 deep DOM selector를 만드는 수단으로 사용하지 않는다.
- build tool이 자체 nesting transform을 하는지와 native output target을 확인한다.

### `:has()` relational selector

자손/후속 요소 상태를 기준으로 parent를 styling할 수 있다.

```css
.field:has(input:focus-visible) {
  outline: 2px solid var(--border-focus);
}

.field:has(input[aria-invalid="true"]) .label {
  color: var(--text-danger);
}
```

- DOM query를 대체하는 CSS state 표현에 유용하지만 component state owner를 숨기지 않는다.
- 광범위한 `body:has(...)`와 복잡한 descendant 조건은 style invalidation 비용과 유지보수성을 검토한다.
- accessible state는 실제 element attribute에도 존재해야 하며 `:has()`로만 추론하지 않는다.

### `@scope`

selector specificity를 과도하게 높이지 않고 DOM subtree 적용 범위를 제한한다. 2025 baseline 이후 기능이므로
solution browser 지원을 확인한다.

```css
@scope (.articleBody) to (figure) {
  :scope {
    color: var(--text-primary);
  }

  a {
    color: var(--text-link);
  }
}
```

scope는 inheritance를 차단하는 shadow DOM이 아니다. 현재 솔루션의 class ownership이 충분하면
추가 `@scope`가 필요한지 먼저 판단한다.

### Cascade layer

```css
@layer reset, foundation, components, utilities;

@layer components {
  .button { /* component contract */ }
}

@layer utilities {
  .visuallyHidden { /* explicit utility */ }
}
```

layer 순서는 첫 선언이 소유한다. unlayered author style은 layered style보다 우선할 수 있으므로 외부 CSS를
layer로 감쌀 때 cascade 결과를 검증한다. `!important`의 layer priority는 normal declaration과 반대 방향임을
주의한다.

### Subgrid

```css
.detailList {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
}

.detailRow {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}
```

여러 row의 label/value column을 parent grid track에 맞출 때 사용한다. 단순 1단 layout에 불필요하게 쓰지
않으며 source order와 responsive 단일 column 전환을 확인한다.

### `light-dark()`, `color-mix()`와 relative color

```css
:root {
  color-scheme: light dark;
  --surface-canvas: light-dark(#ffffff, #111318);
  --border-muted: color-mix(in oklab, currentColor 20%, transparent);
}
```

- `light-dark(light, dark)`는 active color scheme에 따라 값을 선택한다. `color-scheme` 설정이 필요하다.
- `color-mix()`는 지정 color space에서 token을 혼합한다.
- relative color syntax는 base color channel에서 새 색을 계산할 수 있다.
- Aifrica semantic token이 이미 theme 값을 소유하면 component에서 임의 혼합하지 말고 token 정의 계층에서
  사용한다.
- 계산 색도 contrast가 자동 보장되지 않으므로 state/theme별 확인이 필요하다.

### `@starting-style`와 discrete transition

display/top-layer 진입처럼 이전 rendered style이 없던 element의 시작값을 정의할 수 있다.

```css
[popover] {
  opacity: 0;
  transform: translateY(-0.25rem);
  transition:
    opacity 160ms ease,
    transform 160ms ease,
    display 160ms allow-discrete;
}

[popover]:popover-open {
  opacity: 1;
  transform: translateY(0);
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: translateY(-0.25rem);
  }
}
```

지원되지 않아도 popover 기능은 완전해야 한다. reduced motion에서는 duration을 제거한다.

### CSS anchor positioning

trigger 기준 popup 위치와 viewport overflow fallback을 CSS로 표현할 수 있다.

```css
.trigger {
  anchor-name: --project-trigger;
}

.panel {
  position: fixed;
  position-anchor: --project-trigger;
  inset-block-start: anchor(bottom);
  inset-inline-start: anchor(left);
  position-try-fallbacks: flip-block, flip-inline;
}
```

`anchor()`, `anchor-size()`, `position-area`, `@position-try`, `position-try-fallbacks`가 관련 API다. 일부 세부
기능은 여전히 limited availability일 수 있으므로 공용 Dropdown/Dialog의 검증된 positioning engine을
임의로 교체하지 않는다. fallback은 usable on-screen position을 제공해야 한다.

### View Transition API용 CSS

```css
@view-transition {
  navigation: auto;
}

.projectTitle {
  view-transition-name: project-title;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*) {
    animation-duration: 0.01ms;
  }
}
```

SPA는 DOM update를 `document.startViewTransition(update)`에 전달하고, same-origin MPA는 양쪽 document가
`@view-transition { navigation: auto; }`로 opt-in할 수 있다. 동일 화면에 같은
`view-transition-name`이 중복되지 않게 한다. React/Next의 transition 기능과 결합할 때 framework 지원과
focus/scroll 복구를 확인한다.

## Cascade와 소유권

- reset/base, foundation token, theme, component, utility/override의 책임을 구분한다.
- cascade layer를 사용하는 프로젝트라면 layer 순서를 한 곳에서 정의하고 component마다 재선언하지 않는다.
- selector는 component root와 명시된 slot/state 범위에서 짧게 유지한다.
- element 구조에 강하게 묶인 deep selector와 ID selector, 반복되는 `!important`를 피한다.
- override가 필요하면 variant, slot, CSS variable 또는 documented style hook으로 해결한다.
- inline style은 실제 runtime numeric geometry나 CSS variable 전달처럼 동적인 값에 제한한다.
- 공용 component 내부 DOM을 외부 page selector로 관통하지 않는다.

## Token과 theme

- raw color, spacing, radius, shadow, typography, z-index를 component마다 반복하지 않는다.
- foundation token은 원시 scale, semantic token은 `surface`, `text`, `border`, `danger` 같은 역할을 표현한다.
- component token은 실제 component 계약상 필요한 경우에만 semantic token 위에 둔다.
- light/dark theme에서 같은 semantic 이름이 같은 의미와 대비를 유지해야 한다.
- 상태 색은 color 하나에 의존하지 않고 text/icon/shape와 함께 표현한다.
- 임의 opacity로 disabled color를 만들기 전에 design system의 state token을 확인한다.
- z-index 숫자 경쟁 대신 overlay, sticky, navigation의 정해진 layer scale을 사용한다.

## Layout 선택

### Flexbox

- 한 축의 정렬, toolbar, action group, inline field, 균등/가변 item 배치에 사용한다.
- overflow되는 child에는 필요에 따라 `min-inline-size: 0`을 적용한다.
- `flex: 1`이 basis, grow, shrink를 어떻게 바꾸는지 이해하고 사용한다.
- wrap 시 읽기 순서와 action 우선순위가 자연스러운지 확인한다.

### Grid

- 행과 열의 2차원 관계, form/detail field, card collection에 사용한다.
- content 기반 최소 크기가 overflow를 만들면 `minmax(0, 1fr)`을 검토한다.
- source order와 visual order를 다르게 만들어 keyboard/screen reader 순서를 깨지 않는다.
- field 수에 고정된 column count보다 `auto-fit/minmax` 또는 명시된 breakpoint를 선택한다.

### Position

- absolute/fixed는 normal flow로 표현하기 어려운 overlay, badge, anchored control에 제한한다.
- containing block과 stacking context를 의도적으로 만든다.
- viewport 절대 좌표로 page shell을 복제하지 않는다.
- sticky는 실제 scroll container, top offset, overflow ancestor와 focus visibility를 확인한다.

## Intrinsic sizing과 overflow

- 고정 width/height보다 content가 늘어나는 최소·최대 제약을 사용한다.
- 긴 번역, 사용자 입력, email/URL, 큰 숫자에서 layout을 검증한다.
- text truncation은 전체 내용을 확인할 경로와 accessible name이 있을 때 사용한다.
- `overflow: hidden`으로 focus ring, shadow, popup을 우연히 자르지 않는다.
- page scroll과 table/internal scroll을 중첩하지 않도록 scroll owner를 하나로 정한다.
- viewport 단위는 mobile browser chrome 영향을 고려하고 현재 지원 범위에서 dynamic viewport 단위를 검토한다.
- image/media에는 aspect ratio와 max inline size를 제공한다.

## 반응형 설계

- device 이름보다 content가 실제로 깨지는 지점에서 breakpoint를 선택한다.
- mobile-first 또는 desktop-first 전략은 기존 codebase와 일관되게 사용한다.
- component가 page가 아닌 container 폭에 반응해야 하면 container query를 사용한다. 기존 browser baseline과
  fallback이 필요한지는 로컬 project 정책을 따른다.
- 작은 화면에서 정보를 숨길 때 기능과 우선순위가 손실되지 않게 한다.
- pointer hover만으로 기능을 노출하지 않고 touch/keyboard 경로를 제공한다.
- 200% zoom과 320 CSS px 상당 폭에서도 horizontal page scroll 없이 핵심 기능을 사용할 수 있어야 한다.

## Logical property와 국제화

- `margin-inline`, `padding-block`, `inset-inline-start`, `border-inline-*` 등 logical property를 우선한다.
- icon 방향, breadcrumb, 이전/다음 개념이 writing direction에 따라 달라지는지 확인한다.
- 문자열 길이 증가를 허용하고 button/label에 고정 width를 강제하지 않는다.
- line clamp와 truncation은 번역·접근성 정책을 확인한 후 사용한다.

## Typography

- typography token의 family, size, line-height, weight, letter spacing을 조합해서 사용한다.
- line-height를 element 높이 맞춤 수단으로 사용하지 않는다.
- font load 전후 layout shift와 fallback metric을 확인한다.
- 작은 text와 muted text도 theme별 contrast를 충족해야 한다.
- user zoom과 browser 기본 font size를 방해하지 않는다.

## 상태와 selector

- native pseudo-class(`:disabled`, `:checked`, `:invalid`, `:focus-visible`)를 우선한다.
- component-owned 상태는 일관된 `data-*` attribute 또는 documented class로 노출한다.
- DOM query나 text content로 style state를 추론하지 않는다.
- hover, active, focus-visible, selected, disabled, readOnly, invalid, loading 상태의 우선순위를 정의한다.
- disabled state에서도 정보 contrast는 유지하고 pointer cursor만으로 비활성 상태를 표현하지 않는다.
- readOnly를 disabled visual로 동일하게 처리하지 않는다.

## Focus와 접근성

- focus indicator를 제거하지 않는다. custom ring은 배경과 theme에서 충분히 구분되어야 한다.
- mouse click에 불필요한 focus style을 줄일 때 `:focus-visible`을 사용하되 keyboard focus는 선명하게 유지한다.
- outline이 border radius와 overflow에서 잘리는지 확인한다.
- forced colors/high contrast 환경에서 색상·outline이 사라지지 않게 한다.
- visual reordering, `display: contents`, generated content가 semantics와 focus 순서에 미치는 영향을 확인한다.
- hidden content는 시각적으로만 숨길지 accessibility tree에서도 제거할지 목적을 구분한다.

## Motion과 transition

- 변화하는 property만 transition한다. `transition: all`과 전역 `*` transition은 사용하지 않는다.
- layout을 매 frame 바꾸는 property보다 transform/opacity를 우선하되 의미와 품질을 검증한다.
- motion이 완료되지 않아도 action과 정보가 사용 가능해야 한다.
- `prefers-reduced-motion`에서 비필수 animation을 제거하거나 즉시 상태 전환한다.
- 반복·자동 animation은 중지 가능성과 주의 분산을 확인한다.
- View Transition은 browser/framework 지원과 route focus 복구가 검증된 경우에만 사용한다.

## 최신 기능 채택 기준

이 스냅샷에서 container query, cascade layer, nesting, `:has()`, subgrid, modern color, view transition 등
modern CSS 개념을 참고할 수 있다. 실제 적용은 다음 조건을 모두 충족해야 한다.

1. 프로젝트의 browser baseline에서 지원된다.
2. build/postcss/vanilla-extract pipeline이 syntax를 보존 또는 처리한다.
3. fallback 없이도 핵심 기능이 유지되거나 명확한 fallback이 있다.
4. 기존 design system contract보다 복잡도를 줄인다.

일반 작업 중 이를 확인하려고 인터넷을 검색하지 않는다. 현재 project config와 local support policy로
판단할 수 없으면 기존에 검증된 기능을 사용하거나 업데이트 요청이 필요함을 보고한다.

## 성능

- style 최적화 전에 실제 layout/style/paint 병목을 측정한다.
- 큰 DOM, 복잡한 deep selector, 대형 blur/shadow, 고정 background와 layout animation을 경계한다.
- `will-change`, containment, content visibility는 측정된 문제에 제한하고 부작용을 검증한다.
- critical UI를 숨기는 CSS load 순서와 theme flash를 확인한다.
- component별 중복 CSS와 unused variant가 bundle에 미치는 영향을 확인한다.

## 금지 패턴

- token 대신 반복되는 raw color/spacing/z-index
- `transition: all` 또는 모든 element의 전역 transition
- 대체 없이 focus outline 제거
- 공용 component 내부를 page의 deep selector로 override
- layout을 위한 과도한 absolute position과 JS measurement
- source order와 다른 visual order
- overflow hidden으로 문제를 숨기기
- browser 지원·fallback 확인 없이 최신 syntax 도입
- readOnly와 disabled의 동일 처리

## 구현 체크리스트

- [ ] design token과 기존 style recipe를 먼저 사용했다.
- [ ] selector와 cascade 소유권이 명확하다.
- [ ] flex/grid/intrinsic sizing 선택이 content에 맞다.
- [ ] 긴 문자열, 200% zoom, 작은 container와 overflow를 확인했다.
- [ ] light/dark, focus-visible, high contrast, reduced motion을 확인했다.
- [ ] hover 없이 touch/keyboard로 사용할 수 있다.
- [ ] animation과 최신 CSS 기능의 fallback이 있다.
- [ ] style/layout 성능을 근거 없이 최적화하지 않았다.

## 공식 source 기록

- [CSS Snapshot 2026](https://drafts.csswg.org/css-2026/)
- [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

이 링크는 스냅샷의 출처다. 일반 작업 중 다시 열지 않으며 사용자가 업데이트를 요청한 경우에만
`$aifrica-frontend-docs`로 확인한다.
