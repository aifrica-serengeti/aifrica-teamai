# SNB v1 — 스타일과 토큰

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v1 문서 인덱스](README.md)

## 5. 색상 스펙 — 라이트 모드

SNB는 별도 semantic token만 소비한다. 아래 hex 값은 실제 표시값이다.

| 요소 / 상태 | 값 |
| --- | --- |
| Shell background | `#1e232e` |
| Shell right border | `#dddddd` |
| Expanded popup / child panel surface | `#242a36` |
| 기본 text·icon | `#727885` |
| Hovered / Pressed text·icon | `#ffffff` |
| Hover / Pressed item fill | `#3a4258` |
| Selected item fill | `#2b3244` |
| Selected item label (all depths) | `#66a3ff` |
| Non-selected focus surface | `#ffffff` |
| Focus border / outline | `#0066ff` |
| Header toggle border | `#5e6370` |
| Header toggle icon | `#ffffff` |
| Divider | `#2d3a55` |
| Tree line / inactive favorite fill | `#3f4450` |
| Inactive favorite stroke / hovered tree line | `#5e6370` |
| Active favorite | `#f0bb00` |
| Collapsed selected fill | `#0056d6` |
| Section title | `#9ba1af` |
| Scroll thumb / hover | `#dde2f1` 45% / 65% alpha compositing |

### Expanded item states

| 상태 | 배경 | text/icon | border / outline | favorite |
| --- | --- | --- | --- | --- |
| Enabled | transparent | `#727885` | 2px transparent border | leaf hover 전 숨김 |
| Hovered | `#3a4258` | `#ffffff` | transparent | leaf에 표시 |
| Pressed | `#3a4258` | `#ffffff` | transparent | leaf에 표시 |
| Selected | `#2b3244` | label·leading icon·chevron 모두 `#66a3ff` | transparent | leaf에 표시 |
| Expanded branch | Enabled와 동일 | Enabled와 동일, chevron만 180° | 2px transparent border | 표시하지 않음 |
| Focused, non-selected | `#ffffff` | `#727885` | 2px `#0066ff` | 숨김 |
| Focused, selected | `#2b3244` | selected 색 유지 | 2px `#0066ff` | selected 규칙 유지 |
| Disabled | 기존 상태 × opacity .5 | — | — | 조작 불가 |

3depth는 transparent 2px border를 갖지 않는다. focus는 `outline:2px solid #0066ff;
outline-offset:-2px`로 안쪽에 그려 item 높이가 흔들리지 않게 한다.

### Collapsed rail / popup states

| 상태 | 배경 | icon | border |
| --- | --- | --- | --- |
| Enabled | transparent | `#727885` | 2px transparent |
| Hovered | `#3a4258` | `#ffffff` | transparent |
| Pressed | `#3a4258` | `#ffffff` | transparent |
| Selected (hover/pressed 포함) | `#0056d6` | `#ffffff` | transparent |
| Focused, non-selected | `#ffffff` | `#727885` | 2px `#0066ff` |
| Focused, selected | `#0056d6` | `#ffffff` | 2px `#0066ff` |

Collapsed popup은 `#242a36` background, `#2d3a55` border, 기본 text `#727885`, active text
`#ffffff`을 사용한다. 선택된 3depth의 2depth 조상은 `#3a4258` background로 활성 경로를 보인다.

### Menu item 상태 우선순위 — 구현 시 임의로 합치지 않는다

이 절은 Playground의 실제 selector 우선순위를 문장으로 고정한다. `hover`, `pressed`,
`selected`, `focused`를 하나의 generic `active` 스타일로 합치면 안 된다. `expanded`는
선택 state가 아닌 chevron과 accordion만 제어하는 별도 boolean이다.
`data-state`는 반드시 wrapper가 아닌 **실제 menu `<button>`**에 둔다.

실제 상호작용은 native `:hover`, `:active`, `:focus-visible`로 처리한다. `data-state="hovered"`,
`pressed`, `focused`는 Playground state matrix를 고정해 보여주기 위한 동등한 visual override다.
새 구현에서 item hover를 React state로 매 frame 추적하거나, focus를 `onFocus`로 selected처럼
저장하지 않는다. 그렇게 하면 trigger↔popup handoff와 keyboard focus가 다른 상태를 덮어쓴다.

#### Expanded item의 상태 해석

| 순서 | 조건 | `data-state` / 표시 결과 | 다른 상태와 겹칠 때 규칙 |
| ---: | --- | --- | --- |
| 1 | children이 있는 1/2depth가 열림 | `data-expanded="true"` · chevron 180° 및 accordion만 변경 | 배경·text/icon은 Enabled와 같아야 한다. 열렸다는 이유만으로 `selected`를 주지 않는다. |
| 2 | leaf가 activeId와 같음 | `selected` · fill `#2b3244`, label/icon/chevron `#66a3ff`, `aria-current="page"` | 3depth leaf만 label에 추가로 600 weight를 쓴다. 배경은 그대로 `#2b3244`다. |
| 3 | active leaf의 가장 가까운 **접힌** ancestor | `selected` · fill `#2b3244`, label/icon/chevron `#66a3ff` | descendant가 보이지 않을 때만 선택 surface를 승계한다. 이 ancestor에는 `aria-current`를 주지 않는다. |
| 4 | pointer가 enabled item 위에 있음 | native `:hover` 또는 showcase의 `hovered` · fill `#3a4258`, text/icon `#ffffff` | selected item은 hover해도 fill `#2b3244`와 label/icon/chevron `#66a3ff`를 모두 유지한다. |
| 5 | pointer press 중 | native `:active` 또는 showcase의 `pressed` · fill `#3a4258`, text/icon `#ffffff` | selected item은 press 중에도 fill `#2b3244`와 label/icon/chevron `#66a3ff`를 유지한다. |
| 6 | keyboard focus, selected 아님 | native `:focus-visible` 또는 showcase의 `focused` · fill `#ffffff`, text/icon `#727885`, 2px `#0066ff` | depth 1/2는 2px transparent border 자리를 blue border로 교체한다. depth 3은 border 없이 안쪽 outline을 쓴다. |
| 7 | keyboard focus + selected | selected fill/text를 유지하고 2px blue border/outline만 더한다 | selected item을 white focus surface로 바꾸면 안 된다. |
| 8 | disabled | 현재 시각 상태에 `opacity: .5`, pointer/keyboard interaction 없음 | disabled에 hover/press callback이나 favorite trigger를 연결하지 않는다. |

열린 branch가 keyboard focus를 받으면 non-selected focus 규칙에 해당한다. 따라서 white focus
surface + blue border가 나오며, 열린 상태를 `selected`처럼 파란 surface에 고정하지 않는다.
닫힌 2depth가 active 3depth를 감출 때에는 그 2depth만 selected가 되고, 이어 1depth를 닫으면
그 1depth가 selected가 된다. 다시 열어 descendant가 보이면 ancestor의 선택 surface는 즉시 제거한다.

#### Expanded depth별 고정 규칙

| depth | idle / hover / selected 높이 | leading / trailing | focus 처리 | 금지 |
| --- | --- | --- | --- | --- |
| 1depth | 44px | 24×24 leading `Icon` + label 4px gap, branch면 24×24 chevron | 2px border | 16px icon box, branch favorite |
| 2depth | 40px | leading 없음, branch면 trailing chevron | 2px border | 1depth와 같은 left padding, favorite |
| 3depth | 36px | 16px tree connector + leading 없음 | `outline: 2px solid #0066ff; outline-offset:-2px` | 2px transparent border, item보다 짧은 connector |

3depth connector는 idle `#3f4450`이고, hover/pressed/selected이면 `#5e6370`으로 바뀐다.
이 선은 **각 3depth button의 36px 높이 안에서만** 채워야 한다. 2→3depth 사이에는 별도 gap이나
child panel padding을 두지 않고, connector 또는 pseudo-element도 렌더하지 않는다.

#### Favorite의 정확한 표시 조건

favorite은 **children이 없는 leaf의 sibling button**으로만 렌더한다. 다음 중 하나일 때만
opacity 1 / pointer-events auto다.

- leaf wrapper의 native pointer hover
- `data-state="hovered"`, `pressed`, `selected`
- 이미 starred 상태

`focused`만으로는 favorite을 표시하지 않는다. branch/2depth/3depth parent에는 favorite DOM을
생성하지 않는다. favorite 자체 hover/pressed는 item 상태를 바꾸지 않고 자신의 24×24 button
안에서 `#3a4258` / `#3a4258` background만 바꾼다. inactive `Icon name="star"`는 fill `#3f4450`,
stroke `#5e6370`; starred는 fill/stroke `#f0bb00`이다.

#### Collapsed rail의 상태 해석

| 상태 | background | icon | border | 우선순위 |
| --- | --- | --- | --- |
| Enabled | transparent | `#727885` | 2px transparent | 기본 |
| Hovered / Pressed | `#3a4258` | `#ffffff` | transparent | selected가 아니면 적용 |
| Selected path | `#0056d6` | `#ffffff` | 2px transparent | root 자신 또는 2/3depth descendant가 activeId이면 적용 |
| Selected path + hover/pressed | `#0056d6` 유지 | `#ffffff` | transparent | 공용 IconButton ghost hover가 덮어쓰지 못하게 한다 |
| Focused, non-selected | `#ffffff` | `#727885` | 2px `#0066ff` | white focus surface |
| Focused, selected path | `#0056d6` 유지 | `#ffffff` | 2px `#0066ff` | blue selected fill을 유지 |

child가 없는 rail icon은 Tooltip만 열며 click으로 activeId를 바꾼다. child가 있는 rail icon은
click selection/Tooltip 대신 hover Menu만 연다. 현재 active 3depth가 있으면 그 1depth rail icon은
selected path blue fill을 받는다.

#### Collapsed Menu / MenuSub의 상태 해석

| 요소 | idle | hover / press | selected / active path | keyboard focus |
| --- | --- | --- | --- | --- |
| `MenuContent`, `MenuSubContent` | `#242a36` surface, `#2d3a55` border | — | — | — |
| root popup 2depth `MenuItem` / `MenuSubTrigger` | `#242a36` + `#727885`, `size="large"` = min-height 36 | `#3a4258` + `#ffffff` | leaf: `#0056d6` + `#ffffff` + check. Trigger: active 3depth 조상이면 **`#3a4258`**, blue가 아님 | Radix `data-highlighted`일 때 2px inset `#0066ff` |
| nested 3depth `MenuItem` | `#242a36` + `#727885`, `MenuSubContent size="small"` = min-height 28 | `#3a4258` + `#ffffff` | `#0056d6` + `#ffffff` + check | Radix `data-highlighted`일 때 2px inset `#0066ff` |
| favorites popup leaf | 위 leaf와 동일 | 위 leaf와 동일 | `#0056d6` + check | 위 leaf와 동일 |

popup item에는 leading icon을 넣지 않는다. label은 한 줄(`white-space: nowrap`)이며 content의 긴
이름에 맞춰 popup width가 넓어진다. 3depth `MenuSubContent`에도 반드시 `.snb-menu` class와
같은 state token mapping을 적용한다. root popup만 navy로 만들고 submenu를 공용 white surface로
남기는 구현은 실패다.

## 6. 색상 스펙 — 다크 모드

`.dark`에서 SNB v1이 재매핑하는 값은 아래 두 항목이다. 나머지 navy interaction 색상은
다크 모드에서도 고정이다.

| 요소 | 라이트 | 다크 |
| --- | --- | --- |
| Shell background | `#1e232e` | `#282828` |
| Shell right border | `#dddddd` | `#333333` |

따라서 child panel `#242a36`, hover/pressed `#3a4258`, selected `#2b3244`와 label/icon 선택색
`#66a3ff`, focus `#0066ff`, collapsed selected `#0056d6`과 모든 favorite/tree/divider 색은 다크에서도
동일하다. 이 규칙은 일반 semantic surface를 SNB에 섞지 않는 이유다.

## 8. 타이포그래피와 자산

폰트는 모든 경우 Pretendard다.

| 역할 | font |
| --- | --- |
| 1depth label / selected 3depth | 600 14px/20px (`Title2`) |
| 2depth, 일반 3depth label | 400 14px/20px (`Body2`) |
| Section title | 400 12px/16px (`Body3`) |

브랜드 자산은 아래처럼 고정 배치한다.

| 자산 | 용도 / 색상 |
| --- | --- |
| Brand symbol, wordmark, subtitle SVG | Expanded Header의 고정 좌표 배치 |
| Compact symbol SVG | Collapsed Header 32×32 |
| Favorite | 공용 `Icon name="star"`, 16×16.272. inactive fill `#3f4450` / stroke `#5e6370`; active fill·stroke `#f0bb00` |

## 11. SNB 토큰 정의

새 프로젝트는 아래 변수를 먼저 정의한다. 공용 Icon/Menu/ScrollArea의 토큰 정의는 각 의존
컴포넌트 가이드라인을 따른다.

```css
:root {
  --font-sans: 'Pretendard', system-ui, -apple-system, sans-serif;
  --text-title2: 600 14px/20px var(--font-sans);
  --text-body2: 400 14px/20px var(--font-sans);
  --text-body3: 400 12px/16px var(--font-sans);

  --snb-bg: #1e232e;
  --snb-shell-border: #dddddd;
  --snb-surface: #242a36;
  --snb-fill-hovered: #3a4258;
  --snb-fill-pressed: #3a4258;
  --snb-fill-selected: #2b3244;
  --snb-focus-surface: #ffffff;
  --snb-on-default: #727885;
  --snb-on-active: #ffffff;
  --snb-3depth-on-selected: #66a3ff;
  --snb-focus-border: #0066ff;
  --snb-toggle-border: #5e6370;
  --snb-toggle-icon: #ffffff;
  --snb-favorite-inactive: #3f4450;
  --snb-favorite-border: #5e6370;
  --snb-favorite-active: #f0bb00;
  --snb-collapsed-selected: #0056d6;
  --snb-tree-border: #3f4450;
  --snb-divider: #2d3a55;
  --snb-section-title: #9ba1af;
  --snb-scrollbar-thumb: color-mix(in srgb, #dde2f1 45%, transparent);
  --snb-scrollbar-thumb-hover: color-mix(in srgb, #dde2f1 65%, transparent);
}

.dark {
  --snb-bg: #282828;
  --snb-shell-border: #333333;
}
```

