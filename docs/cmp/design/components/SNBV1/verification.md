# SNB v1 — 검증과 재현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← SNB v1 문서 인덱스](README.md)

## 0. 구현과 검증 순서

1. styles의 semantic 역할을 실제 제품의 light/dark token과 연결한다. 이 문서는 고정 색상 CSS를 번들하지 않는다.
2. 정의·행동·접근성을 전체 읽고 expanded/collapsed·active leaf·숨겨진 active descendant·favorites의 상태를 구분한다.
3. 제품에서 제공한 브랜드 자산과 font를 연결한다. 특정 고객 자산이나 checksum을 요구하지 않는다.
4. 공통 registry와 CMP registry의 dependency closure에서 IconButton·Menu·ScrollArea·Tooltip을 연결한다.
5. styles의 icon 색 상속·portal scope·selector 우선순위·scroll 경계를 실제 styling 도구로 구현한다.
6. expanded → collapsed → popup → keyboard focus → light/dark → 긴 콘텐츠 순서로 아래 matrix를 검증한다.

이 문서는 참조 shell 세대의 상태·DOM·치수와 제품 token adapter를 함께 적용한다. 제품에서 geometry를
변경하면 근거와 검증 결과를 기록한다. viewport만으로 자동 collapse하거나 branch-open과 selected를
합치지 않는다. 제공되지 않은 CSS 구현이나 자산 manifest를 복사했다고 보고하지 않는다.

### 제품 자산 확인

실제 제품의 brand slot·폰트·아이콘 자산과 라이선스·대체 텍스트를 연결한다. 특정 고객의 파일명·checksum은 이 계약에 포함하지 않는다.

## 13. 검증 체크리스트

- [ ] **기본 외형 gate:** root 240px 전체가 `var(--cmp-nav-surface)` navigation shell이고, white surface는 non-selected `:focus-visible` item에서만 보인다. root·section·child panel 어느 곳에도 white card border/radius가 없다.
- [ ] **asset gate:** expanded header에 symbol/wordmark/subtitle 세 brand asset이 지정 좌표로 보이고, collapsed header에는 compact symbol이 보인다. brand asset을 텍스트·임의 이미지로 대체한 곳이 없다.
- [ ] **Icon gate:** brand logo 외에는 SVG asset·직접 SVG·직접 path가 없고, favorite을 포함한 모든 UI glyph가 공용 `Icon` 또는 그를 조합한 `IconButton`으로 렌더된다.
- [ ] **portal gate:** collapsed branch와 3depth submenu, favorites popup 모두 `var(--cmp-nav-panel)` background / `var(--cmp-nav-border)` border이다. 어느 popup도 공용 Menu의 white background를 쓰지 않는다.
- [ ] **icon gate:** expanded 1depth는 24×24 alignment box 안의 16px icon + label 4px gap이며, collapsed rail target은 32×32이다.
- [ ] **expanded state priority gate:** 열린 branch는 Enabled surface를 유지하고 chevron만 회전한다. 실제 active leaf 또는 그것을 감춘 가장 가까운 접힌 ancestor만 `var(--cmp-nav-selected)` selected fill을 받으며, selected item에 pointer를 올리고 눌러도 이 fill을 유지한다. 일반 hover/pressed는 각각 `var(--cmp-nav-hover)` / `var(--cmp-nav-pressed)`를 쓴다.
- [ ] **focus gate:** non-selected 1/2depth focus는 `var(--cmp-nav-focus-surface)` + 2px `var(--solution-primary)`, selected focus는 selected fill을 유지한다. 3depth focus는 layout을 바꾸지 않는 inset outline이다.
- [ ] **favorite gate:** focused-only leaf에는 별표가 나타나지 않고, branch에는 별표 DOM이 없다. favorite은 `Icon name="star"`이며 inactive `var(--cmp-nav-subtle)/var(--cmp-nav-disabled)`, starred `var(--cmp-nav-favorite)`이다.
- [ ] **popup state gate:** root popup 2depth는 `large` 36px, nested 3depth는 `small` 28px이다. selected leaf는 `var(--cmp-nav-collapsed-selected)`, selected 3depth의 2depth ancestor는 `var(--cmp-nav-hover)`이다.
- [ ] Expanded 240px / Collapsed 60px이고 0.24초로 전환된다.
- [ ] 1depth 44px, 2depth 40px, 3depth 36px이며 3depth line은 item 전체 높이를 채운다.
- [ ] 1depth icon box는 24×24 중앙, icon과 label 사이는 4px이다.
- [ ] 3depth 및 favorite 예약 item의 긴 label은 control 왼쪽에서 ellipsis 처리된다.
- [ ] expandable item에는 favorite이 없고, leaf favorite은 hover/selected/starred에서만 보인다.
- [ ] active 3depth가 열려 있으면 3depth만 selected이며, 2depth를 닫으면 2depth만 selected, 1depth까지 닫으면 1depth만 selected다. branch click 자체는 `activeId`를 바꾸지 않는다.
- [ ] Focused non-selected item과 collapsed icon은 white surface + 2px blue focus border다.
- [ ] selected collapsed icon은 hover/pressed 중에도 `var(--cmp-nav-collapsed-selected)`을 유지한다.
- [ ] 3depth 선택 시 해당 2depth는 collapsed popup에서 active path background를 보인다.
- [ ] 접힌 child menu는 trigger↔popup 이동 중 깜빡이지 않고, mouse leave 250ms 후 닫힌다.
- [ ] Collapsed icon rail이 overflow되면 header는 고정되고 rail만 스크롤되며 thumb는 SNB 우측 4px 안쪽이다.
- [ ] 즐겨찾기 popup은 최대 5 item만 보이고 이후에는 밝은 navy thumb ScrollArea를 사용한다.
- [ ] Expanded favorites 4개 이상에서 32×20 pill은 32px section gap 안 중앙에 있고, 열기/닫기 모두 accordion으로 동작한다.
- [ ] 실제 사용자 스크롤 후에만 expanded header border가 보이며, collapse→expand가 이전 scroll state를 복원하지 않는다.
- [ ] `.dark`에서 shell은 `var(--surface-shell)`, border는 `var(--surface-hover)`으로 전환되고 나머지 SNB navy state 값은 유지된다.
- [ ] Tab/Enter/Space, Menu keyboard navigation, `aria-expanded`, `aria-current`, `aria-pressed`가 모두 동작한다.

### Screenshot gate

Pretendard 400/600/700 로드 완료 상태에서 browser zoom 100%, DPR 1, desktop **1920×930** CSS px로
아래 네 장을 캡처해 확인한다. 한 장의 default 상태만 맞는 구현은 통과가 아니다.

| 캡처 | 반드시 보일 상태 |
| --- | --- |
| Expanded light | brand header, 1→2→3 inline accordion, tree connector, leaf favorite, 밝은 scrollbar |
| Collapsed light | compact brand, toggle 아래 divider, star가 최상단, 32px rail과 SNB 우측 scrollbar |
| Collapsed popup | selected root blue fill, navy 2depth Menu, selected 3depth의 2depth active path, submenu navy surface |
| Focus + dark | non-selected focus의 white+blue 2px ring, selected rail focus의 blue fill 유지, dark shell `var(--surface-shell)` |

capture 중 white card나 black default icon이 보이면 spacing 조정으로 덮지 말고, 먼저 [11. SNB 토큰 adapter](styles.md#11-snb-토큰-adapter)와 [12.1 adapter CSS](implementation/css.md#121-새-환경에서-반드시-적용할-snb-adapter-css)의 누락을 수정한다.

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 SNBV1을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: 이 문서, 이 문서의 의존 컴포넌트 API closure, 명시된 brand asset/폰트 자산만 확보한 뒤 구현한다. 외부 디자인 문서는 전달·열람하지 않는다.
- **소유권**: 상위 application shell이 화면 간 shared state와 frame 배치를 소유하고, 이 컴포넌트는 문서에 적힌 고정 geometry와 내부 interaction만 소유한다. SNB와 Global Header의 v1/v2 조합은 섞지 않는다.
- **변형 금지**: 문서에 없는 viewport 기반 collapse, shell radius 중복, sibling local state 분리는 금지한다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트와 screenshot gate를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

[reference fixture와 runtime scenario](./implementation/reference.md) 및 [computed-style·mode motion gate](./implementation/css.md)를
함께 실행한다. favorites shortcut에는 `showFavoriteControl={false}`를 전달하고 일반 branch에는 별표 DOM이
없어야 한다. 재귀 child panel은 button 다음 sibling의 normal flow에 유지한다.

- [ ] `iconColor` 같은 미지원 prop 없이 `.snb-icon-inherit` adapter로 내부 Icon 색이 button 상태를 상속한다.
- [ ] `onScrollMetricsChange`의 `scrollTop`으로 header divider가 변하며 initial/resize callback도 안전하다.
- [ ] canonical block만으로 모든 내부 helper가 정의되고 controlled/default collapse·openIds·activeId가 연결된다.
- [ ] collapse/expand 후 동일 aside root와 favorites overflow의 열린 상태를 보존한다.
