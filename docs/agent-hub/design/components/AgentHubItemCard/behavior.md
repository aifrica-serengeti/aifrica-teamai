# AgentHubItemCard — 상태와 동작

| 상태/동작 | 소유자 | 연결 원칙 |
| --- | --- | --- |
| 항목 선택·활성화 | 목록/화면 owner | selected 표시와 실제 열기·탐색 의도를 구분 |
| accent | 제품 표시 정책 | 강조 시각이며 선택/focus/실행 상태로 자동 매핑하지 않음 |
| 더보기 | 제품 명령 owner | native button 한 번 활성화, 실제 메뉴 채택 시 메뉴 계약 연결 |
| 고정 | 제품 고정 owner | pin 요청·저장·실패 복구와 실제 pinned 값을 제어 |
| 대화 | 제품 대화 owner | 해당 항목에 대한 대화 진입 의도, 메시지 자동 전송은 별도 정책 |
| dot·description·tools 표시 | 제품 데이터/adapter | 실제 의미와 문구 공급, dot만 보고 unread/실행중 등으로 확정하지 않음 |
| disabled | 제품 권한/입력 owner | 카드 main action과 더보기/고정/대화 모두 실제 차단 |

원본 state는 순간 시각과 disabled/selected/accent를 한 축으로 전시합니다.
제품에서는 hover/pressed를 포인터 입력에서 파생하고 selected·disabled·강조·pinned를 각각 제어합니다.
원본에 없는 교차 상태의 우선순위는 제품에서 채택·검증하며6개 시안을 완전 상태 matrix로 확대하지 않습니다.

카드 전체를 button으로 만들고 더보기/고정/대화 button을 그 안에 중첩하지 않습니다.
주요 항목 열기는 제목 등 별도 native control에, 나머지 조작은 형제 control에 연결합니다.
각 control의 click 한 경로에서 callback을 한 번 호출하고 native Enter/Space에 별도 keydown 실행을 추가하지 않습니다.
자식 명령이 카드 열기·선택·대화까지 연쇄 실행되지 않게 하고, 숨긴 control은 focus에서도 제외합니다.

pin은 hovered/pressed에만 실제 subtree가 있지만 포인터 hover만으로 기능에 접근하게 구현하지 않습니다.
고정을 채택한 제품은 focus-within·명령 메뉴 등 keyboard/touch에서도 접근 가능한 표시 정책을 정합니다.
원본에 없는 focus 시 노출·고정 후 유지·고정 해제 시각은 접근성/제품 확장으로 기록합니다.
pin Boolean은 실제 pinned 데이터와 다른 표시값입니다.

description=false/tools=false/dot=false는 해당 노드를 제거하고 HUG 배치를 다시 계산합니다.
도구 로고는 기본적으로 표시 이미지이며, 클릭/Tooltip/권한 요청이 자동 추가되는 데이터가 아닙니다.
동적 도구·메뉴·대화 API·로딩·실패·자동 저장·삭제 동작은 제품이 구현·검증합니다.
실제 명령·전환에 연결된 prototype reactions는 제공되지 않았습니다.


## 공용 색상 모션

공용을 채택한 경우 [Card 모션 적용](../../cards.md#공용-색상-모션-계승)과 [공용 모션](../../motion.md)을 따릅니다.
root의 background-color·border-color·box-shadow·color와 해당 텍스트 color는200ms ease로 전환합니다.
이 값은 공용 계승 계약이며 Figma 정적 시안의 motion 실측값이 아닙니다. 원본에 없는 상태·표면은 새로 만들지 않습니다.
disabled 입력은 즉시 차단하고 이 계약의 paint·opacity·정확한 SVG를 유지합니다. reduced motion에서는 전환을 해제합니다.
