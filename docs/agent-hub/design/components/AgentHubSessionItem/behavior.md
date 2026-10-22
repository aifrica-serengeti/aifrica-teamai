# AgentHubSessionItem — 동작과 상태 소유권

행은 ID·제목·아이콘·선택 표시·필요한 meta를 전달받고 한 활성화 의도를 통지합니다.
선택 값·파일 미리보기·다운로드·예약 편집·실행·권한·요청 수명은 [Session Panel](../AgentHubSessionPanel/behavior.md)과 제품 owner가 소유합니다.
파일이나 예약 아이콘만 보고 어느 동작인지 확정하지 않습니다.

hovered/pressed는 포인터 상태이고 selected는 제품이 전달한 선택 표시입니다.
selected를 다운로드 완료·예약 실행 중·응답 성공·토글 값으로 변환하지 않습니다.
다른 항목을 보는 것과 예약 실행·재실행·삭제는 별도 명령이며 행 선택에 자동 결합하지 않습니다.

meta 표시 Boolean과 문구를 분리합니다. false이면 DOM·읽기 트리와 gap에서도 제거합니다.
true이면 실제 반복 주기·locale 문구를 제공하고 ‘매주 월요일’이나 ‘매시간’을 운영 스케줄로 고정하지 않습니다.
표시 문구는 서버 예약 규칙·timezone·권한 판정을 대신하지 않으며 이 행이 timer·자동 실행을 소유하지 않습니다.

기본 action은 native button type=button의 click에서 한 번 통지합니다.
native Enter/Space와 별도 keydown·wrapper·SVG click에서 같은 callback을 중복 실행하지 않습니다.
추가 메뉴나 독립 명령이 필요하면 행 action과 형제로 구성하고 button 안에 button·Link를 넣지 않습니다.

disabled/loading을 제품이 추가하면 실제 활성화를 guard하고 요청 owner의 중복 방지와 연결합니다.
네 state에 비활성·loading 시각이 있다고 주장하거나 임의 Spinner를 붙이지 않습니다.
목록이 바뀌거나 선택이 갱신됐다는 이유로 기존 대화·draft·첨부·context를 초기화하지 않습니다.
