# Agent Hub Menu 확장 검증

검증일: 2026-10-21. Figma file `cUKHT2PdHjAKRXZlzulnO5`의
`3135:16031` menu/item과 `3135:16036` menu를 get_design_context 스크린샷 및 읽기 전용 Plugin API로 확인했다.
공용 Menu의 명령·키보드·focus 의미를 유지하며 시각·항목 조립 차이를 Agent Hub에 추가했다.

- [AgentHubMenu](../docs/agent-hub/design/components/AgentHubMenu/README.md)
- [AgentHubMenuItem](../docs/agent-hub/design/components/AgentHubMenuItem/README.md)

## 공용 대비 차이

| 항목 | 공용 baseline | Agent Hub |
| --- | --- | --- |
| 패널 radius | 4 | 12, radius/surface-sm→radius/12 |
| 항목 | small28/medium32/large36, 기본large·px16 | content28·pl16/pr12/py4, size property 없음 |
| header | 32·12/16/600·#555 | 숨김 frame28·pt8/pb4/pl16/pr12·#1C1C1C |
| divider | line1+상하 margin2 | 숨김 frame9=py4+line1+py4 |
| 상태 | default/selected/focus 등 참조 | default/destructive × enabled/hovered/pressed/disabled 8종 |
| 파괴적 표현 | 별도 공개 danger API 확인 안 됨 | label/edit/check #D00A0A, value/chevron #757575 유지 |
| 스크롤 | scrollable=true·max296 참조 | Scroll bar Boolean=false, 실제 overflowDirection=NONE |

패널 white/#DDD1·py4와 두 navy 그림자, label14/20/400, hoverF8·pressedF4·disabledAAA는 기존 값과 일치한다.
새 effectStyleId `S:a15de5d74923403292f59da1f6d689b596ade000,`는 기존 Mid ID와 다르며 효과 값만 같다.
서로 다른 style identity를 같은 source로 기록하지 않았다.

단일 menu COMPONENT의 현재11행은 모두3135:15951 default/enabled 원본을 사용한다.
폭160이 내부158/FILL로 바뀌고 x1/y5부터28px씩 놓인다. 샘플 HUG318은11×28+padding8+border2다.
160/318·11행·row 이름의 빠진 번호는 제품 최소/최대 크기나 필수 업무 데이터가 아니다.

## 실측·속성·자산

[실측](../docs/agent-hub/design/references/menu.figma.json)은 hidden instance children까지 읽어
289nodes(121+168)·33개 deduplicated styles·68instances를 보존했다.
직접 변수16개에서 alias closure28개·collection5개를 기록했다. 모든 노드의 actual mode·instance property와
62개 icon-swap preferred key도 보존하지만 전체 교체·표시 조합을 지원 검증했다는 뜻은 아니다.

icon/value/check/chevron/header/divider는 현재 모두false다. header28·divider9는 숨김 frame 자체의 실측이며
all-on65px는 계산값일 뿐 별도 렌더 확인이 아니다. value는 표시 Boolean과 literal 샘플이고 TEXT 속성은 없다.
label·section label만 실제 TEXT property를 갖는다. check는 표시이고 pressed는 순간 상태이며
checked/selected/aria-checked 또는 공용 selected palette의 증거가 아니다.

숨김 edit/check/chevron source는 각각3018:24803/3074:98929/2842:38917이며 native16·선1이다.
[자산 기록](../docs/agent-hub/design/references/menu.assets.json)에 기존 exact-source geometry3개와
제공 원본 상태별 SVG8개를 연결했다. temporary URL·스크린샷·추출한 glyph path를 runtime 자산으로 쓰지 않는다.
default edit/check1C·chevron7575, destructive edit/checkD00A0A·chevron7575, disabled5요소AAA를 구분했다.
header 글자1C와 dividerDDD는 disabled에서도 유지되므로 전체 wrapper opacity를 적용하지 않는다.

숨김 Scroll bar3192:35200은 FRAME이다. Boolean 참조·11×318 wrapper·4×28 thumb metadata를 보존했지만
scrollbar component 재사용이나 실제 scrolling으로 주장하지 않는다. 공용 Scrollbar 의존은 제품 채택 계약이다.

## 구현 경계

공용 Menu source/API·primitive를 제품에서 먼저 확인하고 adapter를 우선 연결한다.
header/구분선은 클릭 가능한 menuitem 안에 넣지 않고 Group/Label/Separator와 실제 content 명령으로 조립한다.
권한·명령·중복 실행·checked 값·서브메뉴·포털/collision·스크롤은 제품 owner가 소유하며 onSelect 한 경로에 연결한다.
공용 focus·키보드·disabled 의미는 유지하고 focused/selected/dark 시각을 이 Figma에서 확인했다고 주장하지 않는다.
Picker의 복합 panel/검색·모델 조작이나 navigation32 source를 이 명령 Menu와 합치지 않았다.

Agent Hub27개·공용 포함78개로 registry와 문서 진입점을 연결했다. 공용 스킬7개, 공유 frontend patch의draft,
제품 source/export의unmapped, 공용 묶음 해제와 CMP·PaaS 격리는 유지한다.
원본 serengeti-cmp와 Figma 문서를 수정하거나 제품·사용자 홈에 설치하지 않았다.

## 최종 검증

- 독립 에이전트가 raw289개 노드와 정규화33개 style·68instances·변수28개·collection5개를 재귀 대조했다.
  root canvas x/y만 제외하고 모든 자식 좌표·치수·clipping/constraints/wrap/overflow·edge 선/cap/join·
  text/paint/binding/effects·preferredValues를 포함한 instance properties·node modes가 일치했다.
- MenuItem7문서와 부모 Menu7문서를 별도 에이전트들이 교차 검토했다.
  중복 callback 등록으로 읽힐 수 있는 문구를 단일 onSelect 경로로 교정했다. 그 외 핵심 불일치는 없었다.
- `menu-composition.json`은8 variants·11개 전체 nested row tree·패널 border 포함318 계산·서로 다른 effect ID와
  같은 Mid 값·숨김 scrollbar FRAME 및 자산11개를 대조해 issues0이다. runtimeVerified/allStatesVerified는false다.
  자산6,645bytes의 source·SHA-256·native16·상태별 SVG paint가 일치했다.
- 임시 fixture에서 잘못된 row source·숨김 glyph 노출·destructive value 오색·스크롤바 노출·border layout 유실을 검출했다.
  선언한 해시까지 함께 바꾼 SVG 색상 변조도 검출했으며 임시 fixture는 제거했다.
- `npm run verify` 통과: 로컬 링크2907개, 공용51+솔루션31개 계약·의존성, 스킬7개,
  역할/솔루션9조합·schema3개·namespace 격리를 확인했다. `npm test`는36/36 통과했다.
- 격리한 임시 제품에서 실제 `teamai-cli@0.27.0` 배포를 검증했다. 공용 채택 시 문서·자산1034개가 원본과
  byte 단위로 일치했고 Codex·Claude 각각 스킬7개와 공용 hook을 받았다.
  해제 후 회사·Agent Hub 문서·자산488개를 유지하고 frontend 공용 문서·스킬·hook은 제외했다.
  양쪽 도구의 제품 전용 스킬은 보존했으며 실제 홈·제품 저장소에는 설치하지 않았다.
- loader Agent Hub78개·off0개, CMP55·PaaS51 격리를 확인했다. 단독 Menu closure에는 Picker가 포함되지 않는다.
  `git diff --check` 통과, 읽기 전용 serengeti-cmp 작업 트리는clean이다. 이 변경은 커밋·push하지 않았다.
