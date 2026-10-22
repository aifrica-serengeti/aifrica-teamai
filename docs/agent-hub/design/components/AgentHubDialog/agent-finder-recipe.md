# AgentHubDialog — 에이전트 찾기 recipe

실측 source는 FRAME `3163:22376`입니다.1296×800은 desktop 비교 표본이며 공용 Dialog의 xlarge920을 전역 변경하는 값이 아닙니다.
이 recipe는 탐색 조합과 실제 하위 source를 기록합니다. agent 조회·대화 시작·권한·선택 API는 제품 owner가 정합니다.

## 1. 화면을 네 영역으로 나눕니다

```text
root1296×800 / r16 / #F6F7F9 / #EEE1px(레이아웃 밖) / Overlay
├─ header1296×68: 제목24/32 + legacy 닫기32/r4/glyph24
└─ body1296×732
   ├─ finder/rail192×732: filter 의미는 제품이 연결
   ├─ content1104×732 / p24 / gap24
   │  ├─ Search1064×48 (실제 fixed)
   │  └─ results1056×914: 제목24 + gap12 +5행×166 +4gap12
   └─ 실제 source AHScrollbar, body x1285/y8
```

Header의 `Show icon-button=false`는 뒤로 가기만 숨기며 닫기는 보입니다.
제목·닫기와 아래 구분선 #DDD1px은 유지합니다. Finder에는 footer가 없습니다.

Rail source는 `2324:30418`이고 실제 행은 직접 FRAME입니다.
pL16/R8/T24/B16·gap20·우측 #DDD1px, 행168×32/r6·pL12/R8/Y6·gap12입니다.
즐겨찾기7·최근 사용23·전체 공개11·그룹 공개23·내 에이전트9는 원문 샘플입니다.
‘최근 사용’의 black alpha.1은 표면 실측이며 공용 Menu pressed나 확정된 selected variant로 전환하지 않습니다.
이 rail을 AgentHubNavRail·SNB·Menu·Picker의 실제 source 재사용으로 기록하지 않습니다.

## 2. Search와 결과의 폭 차이를 보존합니다

Search는 [AgentHubSearch](../AgentHubSearch/README.md)의 실제 source `2304:19755`,48/focused/filtered=false입니다.
1064px FIXED라 content 오른쪽 여백은16px, 결과1056px의 오른쪽 여백은24px입니다.
실측 비교에서 둘을 같은 폭으로 바꾸지 않습니다. 제품에서 FILL로 정렬하면 반응형 adapter 제안과 변경 범위를 기록해 검증합니다.
숨긴 help text와 filter subtree는 렌더하지 않습니다. focused 외형만으로 검색 autofocus나 실제 조회 완료를 추정하지 않습니다.

결과 제목 ‘최근 사용(23)’은20/24·600이며 delay20이 보입니다. count·제목은 실제 제품 데이터와 locale로 공급합니다.
카드는 source `3095:20` default15개, 세 열·다섯 행입니다.
각344×166/r24/p16·border1 layout 포함이라 내부 시작은17입니다.
description은310×40·maxHeight40·14/20 regular·#555·HEIGHT/ENDING/maxLines null입니다.
원본324×146보다 넓고 설명 두 줄 표본으로 높이166이 됐습니다. maxLines null을 새2줄 API나 무제한 HUG로 바꾸지 않습니다.
title/meta/tool/pin/more/주 동작은 [AgentHubItemCard](../AgentHubItemCard/README.md)의 source·접근성 계약으로 연결합니다.
실제 결과를15개로 제한하거나 tool 로고·pin 값·도메인 ID를 fixture에 고정하지 않습니다.

## 3. 제안 API와 단일 활성화를 연결합니다

```ts
// 제품 제안입니다. 원본 FRAME에는 이 속성이 없습니다.
type AgentFinderProps<TAgent> = {
  query: string;
  onQueryChange: (query: string) => void;
  activeFilterId: string;
  onFilterChange: (id: string) => void;
  results: readonly TAgent[];
  onAgentActivate: (agent: TAgent) => void;
};
```

실제 agent 타입·ID·ACL·요청 상태·정렬·pagination은 소비 저장소에서 확인합니다.
query와 필터는 한 owner가 관리하고 stale 응답이 현재 결과를 덮지 않게 합니다.
submit/clear/debounce·IME 정책은 기존 Search adapter에 연결하며 샘플만 보고 지연값이나 endpoint를 정하지 않습니다.
필터가 button이면 type=button의 click 한 곳에서 값을 바꾸고, route 이동이면 제품의 실제 link를 사용합니다.
카드 활성화는 한 명령만 실행하며 pin·more 같은 보조 버튼을 주 button/link 안에 중첩하지 않습니다.
agent 선택 후 자동 닫기·대화 송신·새 route 이동은 제품이 명시적으로 선택할 정책입니다.

## 4. 실제 viewport를 구현합니다

```css
.hub-agent-finder-body { display: flex; flex: 1 1 auto; min-width: 0; min-height: 0; overflow: hidden; }
.hub-agent-finder-rail { position: relative; box-sizing: border-box; flex: 0 0 192px; padding: 24px 8px 16px 16px; }
.hub-agent-finder-scroll-area { flex: 1 1 auto; min-width: 0; min-height: 0; overflow: hidden; }
.hub-agent-finder-content { position: relative; box-sizing: border-box; display: flex; flex-direction: column; gap: 24px; padding: 24px; }
.hub-agent-finder-card-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
```

위 구조는 **현재 제품 채택**이며 원본의 overflow NONE이 실제 scroll을 제공한다는 뜻이 아닙니다.
Dialog body는 비스크롤 layout만 소유하고 rail과 header는 고정합니다.
오른쪽에는 AgentHubScrollbar를 배치하고 그 실제 viewport 하나가 Search와 결과 콘텐츠를 함께 스크롤합니다.
Search를 별도로 고정하는 채택은 없으며 기존 오른쪽 콘텐츠의 scroll 범위를 유지합니다.
`.hub-agent-finder-scroll-area`는 엔진 root이고 `overflow:auto`는 내부 실제 viewport만 소유합니다.
기존 콘텐츠의 native overflow를 남겨 두고 바깥 Dialog에만 AgentHubScrollbar를 연결하지 않습니다.
같은 축에 native scrollbar와 장식 thumb를 중복 표시하거나 바깥/안쪽 viewport를 동시에 스크롤하지 않습니다.
Search와 카드의 원본 폭 차이는 fixture에서 별도로 비교합니다. 협소 화면의 rail 전환·열 수·가로 overflow 방지는 제품이 채택해 검증합니다.

실제 fade는 content x−19/y684의1137×48 RECTANGLE, #F6F7F9 alpha0→1 gradient이며69.230771%에서 opaque입니다.
원본 gradient transform은 [실측](../../references/dialog.figma.json)에 보존합니다.
제품 CSS로 변환할 때 clipped 범위·alpha·방향을 비교하고 pointer-events:none·AT 제외로 연결합니다.
generated context의 PNG를 실제 IMAGE paint로 취급하지 않습니다. canScrollMore와 focus 가시성에 맞춘 fade 노출은 제품 구현입니다.

AHScrollbar source `3155:20473`의11px gutter·thumb4·r9999·opaque #DDD는 유지하되
180px track·160px thumb·y8을 모든 viewport에서 고정하지 않습니다.
공용을 선택한 경우 공용 ScrollArea 엔진 한 곳에 이 skin을 연결하고 공용을 끈 환경은 자체 엔진으로 같은 계약을 충족합니다.
wheel·PageDown·drag·resize 후 실제 scrollTop/Height/clientHeight로 thumb 길이와 위치를 갱신합니다.
header와 rail의 좌표는 움직이지 않아야 하며 카드의 마지막 action으로 focus를 옮겨도 native scrollbar가 새로 나타나지 않아야 합니다.
실제 내용 끝까지 keyboard·wheel·touch로 접근하고 마지막 카드와 focus가 fade에 가려지지 않는지 확인합니다.
loading·empty·error·필터 전환·긴 설명·200% zoom·작은 viewport·dark는 별도 제품 검증 범위입니다.
