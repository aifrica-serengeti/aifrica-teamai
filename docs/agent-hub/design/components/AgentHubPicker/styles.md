# AgentHubPicker 스타일

수치는 [실측](../../references/picker.figma.json)의 Light 스냅샷입니다.
두 완성본은 고정 크기 예시이며 제품의 유일한 폭·높이 또는 mobile 규격이 아닙니다.

## Shell과 배치

| 항목 | 두 조립 공통 |
| --- | --- |
| 표면·선 | white / `color/surface/default`, 1px INSIDE #DDDDDD / `color/border/default` |
| radius | 24px |
| 그림자 | 기존 [Elevation Mid](../../foundations/Elevation.md)의 두 겹 navy 그림자 |
| Auto layout | 세로·gap20·상하 padding20·좌우0, border 포함 layout |
| 클리핑 | true, 원본 overflowDirection=NONE |
| footer | 높이39·absolute bottom, shell과 같은 폭 |
| 구획 제목 | 왼쪽8, 12/16px Bold700, #757575 |
| 목록 wrapper | 좌우4, 제목과 목록 gap4 |

Mid는 원본 순서로 `0 0 1px 0 rgba(9,30,66,.31), 0 4px 6px 0 rgba(9,30,66,.15)`입니다.
샘플의 shell 자체 opacity는1입니다. foundation 샘플의 별도 opacity를 곱하지 않습니다.
CSS shadow의 표기 순서를 바꾸어 앞뒤 그림자를 바꾸지 않습니다.

| 항목 | 추천 에이전트 | 프로젝트·채팅 검색 |
| --- | --- | --- |
| shell 샘플 | 776×455 | 532×536 |
| 내부 폭 | 774 | 530 |
| 주요 행 폭 | 766 | 522 |
| 기본 행 | 36px·px8/py6·title14/20/600 | 32px·px8/py6·label14/20/400 |
| 행 radius | assistant/chat6, 직접 workflow/runtime8 | 6 |
| 구획 띠 | 높이8, #F4F4F4, top1 #EEEEEE·semantic 연결 | 높이8, #F2F2F2, top1 #E3E3E3·raw 값 |
| 상단 | chat36, 모델 logo20/label/chevron16 | Search32·radius6·2px #3B82F6 focused |
| footer 시작 y | 416 | 497 |
| 탐색 링크 | 있음 | branch 부재 |

추천 조립의 body 내부 gap은12입니다. 검색 조립은 Search wrapper 좌우12, Search 샘플 폭506입니다.
추천 제목16px와 목록 사이에만4px를 두고, 목록의9행은36px씩 간격0으로 이어집니다.
body의12px를20px로 바꾸거나 제목용4px를 모든 행 사이에 반복하지 않습니다.
검색 입력의 글꼴14/20·돋보기16·filter20/glyph16·필터 배경 rgba(0,0,0,.05)는
[AgentHubSearch](../AgentHubSearch/styles.md)를 유지합니다. 입력 caret 사각형은 디자인 표현이며 별도 DOM으로 넣지 않습니다.
검색의 filter glyph 실제 선은1px·#757575입니다. 기본 glyph 색으로 일괄 바꾸지 말고 해당 인스턴스의 paint를 연결합니다.

추천의 hovered 직접 FRAME 행만 실제 #F8F8F8을 보입니다. 검색의 hovered 원본 menu-item도 이 인스턴스에서는
fills가 비어 있습니다. 이 원본 관찰값과 별개로 후속 사용자 요청에 따라 **검색형의 프로젝트·채팅 행에도**
공용 Menu와 같은 투명↔`#F8F8F8` hover를 채택합니다. 검색형이 정적 원본과 달라지는 제품 채택 계약이며 실측을 바꾸지 않습니다.
실제 배경을 그리는 navigation row에 `background-color 200ms ease`를 지정하고 disabled 행에는 적용하지 않습니다.
대안 trailing gradient는 #F8F8F8 alpha1→.74→0의 paint와 transform을 기록했지만 부모 opacity0입니다.
숨은 gradient·보조 조작을 기본 상태에 노출하지 않습니다. opacity1인 more도 원본 footer 아래에 겹칠 수 있으므로
투명도에 의한 숨김과 footer/viewport에 의한 가림을 구분합니다.

## 공용 Menu에서 계승하는 focus

추천형과 검색형의 main action은 공용 Menu의 **행 안쪽2px focus ring**을 사용합니다.
행 wrapper가 `inset 0 0 0 2px <제품 focus token>`을 그리고 내부 투명 main button의 중복 outline만 제거합니다.
키보드 focus는 배경을 hover 색으로 바꾸지 않으며, 같은 행에 pointer가 올라온 동안에는 hover가 우선해 ring을 숨깁니다.
행 배경·글자색·ring의 `box-shadow`를 각각200ms ease로 전환하고 크기·padding·스크롤 위치는 바꾸지 않습니다.
독립 model·more·filter 버튼은 각자의 focus 표시를 유지하며, `:focus-within`만으로 이들까지 main action과 같은 행 focus로 합치지 않습니다.
reduced-motion에서는 즉시 전환하고 forced-colors에서는 inset shadow 대신2px 시스템색 outline을 행 안쪽에 표시합니다.
이 표현과 우선순위는 공용 Menu(`DOCS_ROOT/frontend/design/components/Menu/styles.md`, 공용 묶음 선택 시)의 계승값이며 Figma focus 실측이 아닙니다.

## 안전한 viewport로 연결하기

원본 추천 body는 y21..433인데 footer y416..455와17px 겹칩니다.
검색의 마지막 섹션 y585..649는 높이536 shell 밖에 있습니다. 이 잘림은 내용 삭제·탭 접근 금지·스크롤 완성 규격이 아닙니다.
실제 구현에서는 일반 채팅·모델, Search, 구획 띠, 추천 제목과 footer39px를 고정하고 **목록만** 스크롤합니다.
추천 원본의 `picker/recommended` 아래 `section-header`·`items`·Scrollbar 구성을 이 경계의 근거로 사용합니다.
추천 제목은 목록 바깥이며 검색 조립의 결과 그룹 제목은 해당 결과 목록 안에서 읽습니다.
목록에는 기존 공용 ScrollArea 기능과 [AgentHubScrollbar](../AgentHubScrollbar/README.md)의4px thumb·11px gutter를
명시적으로 채택합니다. 원본의 source2019:3708을 새 source3155:20473으로 바꾸어 기록하지 않습니다.
이 배치·시각 adapter는 제품 채택 결정이며 원본의 `overflowDirection=NONE`이 동작하는 스크롤을 입증하지 않습니다.
`min-height:0`인 목록 wrapper에만 ScrollArea를 두고 native overflow·thumb 계산을 다시 구현하지 않습니다.
공용 엔진이 오른쪽 gutter11px를 내용과 분리해 예약하면 추천 목록 행은 원본766px에서755px,
검색 목록 행은 원본522px에서511px가 됩니다. 고정 채팅·검색·제목 폭은 그대로이며 이 차이는
스크롤바 기능 채택 결과입니다. 표의 원본 행 폭을 runtime 재측정값으로 바꾸지 않습니다.

원본 비교에서 추천 채팅 y21/높이36 → gap12 → 구획 y69/높이8 → gap12 → 제목 y89/높이16 → gap4 → 목록 y109입니다.
footer는 y416..455, 검색 footer는 y497..536입니다. border-box의 footer를 단순 내부 흐름으로 넣어1px 위로 당기지 않도록
하단·좌우 border 영역까지 쓰는 adapter를 명시하고, footer의 자체 top1px 선이나39px 높이를 중복하지 않습니다.
실제 목록 높이는 가용 공간에서 계산하며 샘플의 겹친17px를 그대로 가리지 않습니다.
긴 문구·확대·협소 viewport에서는 고정 영역의 HUG 높이와 마지막 항목/focus 가시성을 함께 검증합니다.

고정 샘플 폭을 전역 min-width로 강제하지 않습니다. 긴 이름·meta·모델명은 겹치지 않게 영역을 배분하고
줄임표·줄바꿈·보조 정보 노출 방식을 제품이 정합니다. 전체 label의 접근성 이름은 유지합니다.
다크·협소 화면·로딩·오류·disabled·선택 완료의 색상은 제공되지 않았습니다.
