# SNB v1 — 검증과 재현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v1 문서 인덱스](README.md)

## 0. 새 환경 구현의 필수 순서

아래 순서는 선택 사항이 아니다. 특히 기존 shadcn/Radix의 흰색 `Menu`나 회색 `IconButton`을
먼저 화면에 두고 나중에 색상만 덧입히면, portal·focus·selected 상태가 기본 테마로 새어 나온다.

1. **토큰을 먼저 적용한다.** [11. SNB 토큰 정의](styles.md#11-snb-토큰-정의)의 모든 `--snb-*` 값을
   전역 CSS에 복사한다. `--surface`, Tailwind gray/blue, 브라우저 기본 색으로 대체하지 않는다.
2. **이 문서를 유일한 시각 원본으로 사용한다.** 외부 디자인 파일, 링크, 임의의 일반 sidebar 사례를 열어 보거나 참조하지 않는다. 문서에 없는 값이 필요하면 비슷한 UI로 보완하지 말고 가이드라인의 누락으로 보고한다.
3. **brand asset bundle을 복사·검증한다.** 아래 asset manifest의 파일과 SHA-256이 모두 있어야 한다.
   누락된 로고를 글자 로고나 임의 이미지로 대체하지 않는다. 단, 모든 상호작용 icon은 asset이 아니라 공용 `Icon`을 사용한다.
4. **공용 의존성 closure를 준비한다.** IconButton, Menu, ScrollArea, Tooltip의 기본 UI가 이
   문서의 공개 API를 지원하는지 확인한다.
5. **SNB markup과 [12.1 필수 SNB adapter CSS](implementation/css.md#121-새-환경에서-반드시-적용할-snb-adapter-css)를
   함께 적용한다.** 이 CSS는 장식용 예제가 아니라 SNB v1의 시각적 소유권이다.
6. **expanded → collapsed → hover popup → keyboard focus → dark 순서로 검증한다.** 마지막
   체크리스트와 다른 상태의 screenshot gate를 통과하기 전에는 완료로 표시하지 않는다.

이 가이드는 외부 참조 없이 재현할 수 있도록 실제 색상값, geometry, asset bundle, DOM class,
portal override, interaction 및 screenshot gate를 모두 포함한다. 외부 디자인을 보지 않는 대신,
아래 명시값을 하나라도 생략하지 않는 것이 구현자의 책임이다.

다음 변경은 명시적으로 금지한다.

- root 또는 child tree를 `background: white`, border/radius가 있는 card로 감싸기
- Menu portal에서 SNB local variable mapping을 생략해 기본 흰색 surface를 노출하기
- 1depth icon을 16px hit area에 직접 넣기(반드시 24×24 alignment box 안의 16px icon)
- branch에도 favorite star를 표시하거나, 3depth tree line을 item보다 짧게 그리기
- viewport가 좁다는 이유만으로 rail을 자동 collapse하거나, 임의의 mobile sidebar로 바꾸기

### 0.1 재현 잠금 — 이 문서의 UI/UX를 바꾸는 구현을 금지한다

이 문서는 "비슷한 sidebar"를 만드는 지침이 아니다. 아래 네 가지는 SNB v1을 재현하는 데
필수인 **구현 잠금**이다. 하나라도 빠지면 색상과 모션이 누락된 실패 UI로 판단한다.

1. SNB의 style module/token CSS는 SNB component module에서 직접 로드한다. page, story,
   검증 harness에만 CSS를 두거나 공용 `IconButton` 기본 theme에 맡기지 않는다.
2. mode가 바뀌어도 `<aside class="snb">` DOM node를 교체·key 변경·`display:none` 처리하지 않는다.
   **같은 root에 `snb--collapsed` class만 추가/제거**하여 `240px ↔ 60px` width transition이
   실제로 실행되어야 한다. mode별 header와 navigation child의 교체는 가능하지만 root는 유지한다.
3. 모든 UI glyph는 공용 `Icon`/`IconButton`에 `inherit` 색상 경로를 명시한다. 단순히 parent에
   `color`만 주면 공용 Icon의 기본 semantic color가 inline style로 남아 screenshot처럼 어둡거나
   검은 icon이 될 수 있다.
4. 아래 12.1 adapter CSS는 선택적 예제가 아니다. selector, state specificity, portal mapping,
   transition 값을 그대로 적용한다. 별도 page CSS가 `.snb-*`의 background/color/transition을
   덮어써서는 안 된다.

아래 실패는 기능이 일부 동작해도 **미완성**이다.

| 보이는 실패 | 직접 원인 | 반드시 할 수정 |
| --- | --- | --- |
| 확장 header가 비어 있거나 text/placeholder logo가 보임 | brand asset bundle 또는 header DOM 누락 | asset manifest의 3개 expanded asset/1개 compact asset을 실제 `<img>`로 배치 |
| rail/leading/chevron icon이 검정·회색으로 남음 | `iconColor="inherit"` 또는 `style={{ color: 'inherit' }}` 누락 | 아래 Icon 색상 전달 계약을 그대로 적용 |
| 접기/펼치기가 순간 전환됨 | root가 mode마다 새로 mount되거나 root transition CSS 누락 | 하나의 stable root + `width/min-width/padding/gap .24s ease` 적용 |
| accordion이 즉시 열리거나 3depth가 겹침 | `grid-template-rows` wrapper/`min-height:0` inner/transition 누락 | 12.1의 `.snb-panel`과 `.snb-panel__inner` 구조를 그대로 사용 |
| selected hover에서 글자·icon이 흰색으로 바뀜 | `:hover` specificity가 selected selector를 덮음 | 12.1의 `.snb-item.snb-item[data-state="selected"]:hover/:active` selector 유지 |

### Asset manifest — 전달물에 반드시 포함

다음은 **브랜드 식별 전용** asset이다. `assets/snb/`로 원본 그대로 전달한다. 이 네 파일만
`<img>`로 렌더할 수 있다. menu item, chevron, overflow, favorite, tooltip trigger처럼 상호작용하는
모든 glyph는 이 asset을 쓰거나 SVG path를 직접 작성하지 않고 공용 `Icon`을 쓴다.

> `serengeti-functions-*`는 현재 checksum으로 잠긴 레거시 파일 식별자이며 디자인 시스템 명칭이
> 아니다. UI와 대체 텍스트의 브랜드명은 Aifrica를 사용한다. 실제 Aifrica wordmark 자산을
> 재발급하면 파일명과 checksum을 함께 교체하고 이 manifest를 갱신한다.

| 대상 경로 | 쓰임 | SHA-256 |
| --- | --- | --- |
| `assets/snb/serengeti-functions-symbol.svg` | expanded brand symbol | `9fee58ac4ceb23ca392bf758079bb3b1cef78cafff5f388663f0ab44b526f88e` |
| `assets/snb/serengeti-functions-wordmark.svg` | expanded wordmark | `b549703441da0ca0600604a00112a65cded94ab3e080ba310eb43372268d235a` |
| `assets/snb/serengeti-functions-subtitle.svg` | expanded subtitle | `5decec9bb4bda409120ff7cc5a0841eac37e769478c265d291f9067f6909ab44` |
| `assets/snb/serengeti-functions-symbol-compact.svg` | collapsed 32px symbol | `bb67a4e3c019e6b9f4499df9191af525fc2d003e7b1183c7c165ecc5d76be5aa` |

checksum은 축약하지 않는다. 실제 asset bundle에는 반드시 원본 파일을 넣고, 전달 시스템이
checksum을 지원하면 위 값과 대조한다. 이 문서만 단독 전달되는 경우에는 **asset bundle 없이는
brand header를 재현할 수 없으므로 구현을 시작하지 않는다.**

## 13. 검증 체크리스트

- [ ] **기본 외형 gate:** root 240px 전체가 `#1e232e` navy shell이고, white surface는 non-selected `:focus-visible` item에서만 보인다. root·section·child panel 어느 곳에도 white card border/radius가 없다.
- [ ] **asset gate:** expanded header에 symbol/wordmark/subtitle 세 brand asset이 지정 좌표로 보이고, collapsed header에는 compact symbol이 보인다. brand asset을 텍스트·임의 이미지로 대체한 곳이 없다.
- [ ] **Icon gate:** brand logo 외에는 SVG asset·직접 SVG·직접 path가 없고, favorite을 포함한 모든 UI glyph가 공용 `Icon` 또는 그를 조합한 `IconButton`으로 렌더된다.
- [ ] **portal gate:** collapsed branch와 3depth submenu, favorites popup 모두 `#242a36` background / `#2d3a55` border이다. 어느 popup도 공용 Menu의 white background를 쓰지 않는다.
- [ ] **icon gate:** expanded 1depth는 24×24 alignment box 안의 16px icon + label 4px gap이며, collapsed rail target은 32×32이다.
- [ ] **expanded state priority gate:** 열린 branch는 Enabled surface를 유지하고 chevron만 회전한다. 실제 active leaf 또는 그것을 감춘 가장 가까운 접힌 ancestor만 `#2b3244` selected fill을 받으며, selected item에 pointer를 올리고 눌러도 이 fill을 유지한다. 일반 hover/pressed만 `#3a4258`을 쓴다.
- [ ] **focus gate:** non-selected 1/2depth focus는 white `#ffffff` + 2px `#0066ff`, selected focus는 selected fill을 유지한다. 3depth focus는 layout을 바꾸지 않는 inset outline이다.
- [ ] **favorite gate:** focused-only leaf에는 별표가 나타나지 않고, branch에는 별표 DOM이 없다. favorite은 `Icon name="star"`이며 inactive `#3f4450/#5e6370`, starred `#f0bb00`이다.
- [ ] **popup state gate:** root popup 2depth는 `large` 36px, nested 3depth는 `small` 28px이다. selected leaf는 blue `#0056d6`, selected 3depth의 2depth ancestor는 gray-blue `#3a4258`이다.
- [ ] Expanded 240px / Collapsed 60px이고 0.24초로 전환된다.
- [ ] 1depth 44px, 2depth 40px, 3depth 36px이며 3depth line은 item 전체 높이를 채운다.
- [ ] 1depth icon box는 24×24 중앙, icon과 label 사이는 4px이다.
- [ ] 3depth 및 favorite 예약 item의 긴 label은 control 왼쪽에서 ellipsis 처리된다.
- [ ] expandable item에는 favorite이 없고, leaf favorite은 hover/selected/starred에서만 보인다.
- [ ] active 3depth가 열려 있으면 3depth만 selected이며, 2depth를 닫으면 2depth만 selected, 1depth까지 닫으면 1depth만 selected다. branch click 자체는 `activeId`를 바꾸지 않는다.
- [ ] Focused non-selected item과 collapsed icon은 white surface + 2px blue focus border다.
- [ ] selected collapsed icon은 hover/pressed 중에도 `#0056d6`을 유지한다.
- [ ] 3depth 선택 시 해당 2depth는 collapsed popup에서 active path background를 보인다.
- [ ] 접힌 child menu는 trigger↔popup 이동 중 깜빡이지 않고, mouse leave 250ms 후 닫힌다.
- [ ] Collapsed icon rail이 overflow되면 header는 고정되고 rail만 스크롤되며 thumb는 SNB 우측 4px 안쪽이다.
- [ ] 즐겨찾기 popup은 최대 5 item만 보이고 이후에는 밝은 navy thumb ScrollArea를 사용한다.
- [ ] Expanded favorites 4개 이상에서 32×20 pill은 32px section gap 안 중앙에 있고, 열기/닫기 모두 accordion으로 동작한다.
- [ ] 실제 사용자 스크롤 후에만 expanded header border가 보이며, collapse→expand가 이전 scroll state를 복원하지 않는다.
- [ ] `.dark`에서 shell은 `#282828`, border는 `#333333`으로 전환되고 나머지 SNB navy state 값은 유지된다.
- [ ] Tab/Enter/Space, Menu keyboard navigation, `aria-expanded`, `aria-current`, `aria-pressed`가 모두 동작한다.

### Screenshot gate

Pretendard 400/600/700 로드 완료 상태에서 browser zoom 100%, DPR 1, desktop **1920×930** CSS px로
아래 네 장을 캡처해 확인한다. 한 장의 default 상태만 맞는 구현은 통과가 아니다.

| 캡처 | 반드시 보일 상태 |
| --- | --- |
| Expanded light | brand header, 1→2→3 inline accordion, tree connector, leaf favorite, 밝은 scrollbar |
| Collapsed light | compact brand, toggle 아래 divider, star가 최상단, 32px rail과 SNB 우측 scrollbar |
| Collapsed popup | selected root blue fill, navy 2depth Menu, selected 3depth의 2depth active path, submenu navy surface |
| Focus + dark | non-selected focus의 white+blue 2px ring, selected rail focus의 blue fill 유지, dark shell `#282828` |

capture 중 white card나 black default icon이 보이면 spacing 조정으로 덮지 말고, 먼저 [11. SNB 토큰 정의](styles.md#11-snb-토큰-정의)와 [12.1 adapter CSS](implementation/css.md#121-새-환경에서-반드시-적용할-snb-adapter-css)의 누락을 수정한다.

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 SNBV1을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: 이 문서, 이 문서의 의존 컴포넌트 API closure, 명시된 brand asset/폰트 자산만 확보한 뒤 구현한다. 외부 디자인 문서는 전달·열람하지 않는다.
- **소유권**: 상위 application shell이 화면 간 shared state와 frame 배치를 소유하고, 이 컴포넌트는 문서에 적힌 고정 geometry와 내부 interaction만 소유한다. SNB와 Global Header의 v1/v2 조합은 섞지 않는다.
- **변형 금지**: 문서에 없는 viewport 기반 collapse, shell radius 중복, sibling local state 분리는 금지한다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트와 screenshot gate를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
