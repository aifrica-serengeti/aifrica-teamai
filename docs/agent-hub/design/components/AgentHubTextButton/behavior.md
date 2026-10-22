# AgentHubTextButton — 상태와 동작

공용 TextButton의 native button 의미를 유지하고 기본 HTML type은 `button`으로 둡니다.
Tab 이동과 Enter/Space 활성화, 실제 disabled 차단을 유지합니다.
hovered/pressed를 제품의 hover/누르는 순간에 연결하되 disabled에서 활성 스타일이나 이벤트를 실행하지 않습니다.

오른쪽 화살표만으로 실제 이동 URL·요청·메뉴 열림을 결정하지 않습니다. action과 데이터·권한·비동기 상태는
호출부가 소유합니다. 필요한 링크 동작은 해당 제품의 의미와 기존 API를 확인해 연결합니다.
요청 중 중복 실행 방지는 호출부에서 처리하고 이 Figma 노드에 없는 loading 모양을 추정하지 않습니다.

네 상태 사이에 새 레이아웃이나 숨겨진 leading 아이콘을 끼워 넣지 않습니다.
공용의 색상 속성별 transition 기준을 따르고 `transition: all`이나 링크처럼 보이게 하는 underline을 추가하지 않습니다.
실제 source/public export를 확인한 뒤에만 로컬 구현 mapping을 기록합니다.

2026-10-21 [모션 채택 계약](../../motion.md)은 배경·글자색의200ms ease를 명시적으로 적용합니다.
화살표를 이동·회전하거나 밑줄을 추가하지 않고 padding4·gap2·높이24px를 유지합니다.
reduced-motion에서는 즉시 최종 색상을 표시하며 버튼의 focus·키보드·disabled 의미를 유지합니다.
