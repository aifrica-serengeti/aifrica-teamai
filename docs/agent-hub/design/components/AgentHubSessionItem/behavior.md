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


## 현재 채택: 긴 제목 hover/focus 이동

실측 폭이 넘칠 때만 오른쪽 끝을 흐리게 하고, 기존 native 주 동작의 hover·focus에서 글자만 이동해 숨은 끝을 보여줍니다.
대기100ms·속도36px/s linear·이탈 복귀200ms ease·흐림24px는 신규 제안값입니다. 원본 prototype 동작 실측이 아닙니다.
짧거나 긴 overflow 모두 같은 속도로 이동합니다. 최소 시간 없이 현재 위치부터 남은 거리로 이동 시간을 계산하고, 재진입 때도 같은 계산을 적용합니다. 남은 거리가0이면 즉시 끝 상태를 유지합니다.
끝에서는 오른쪽 흐림을 해제하고 머무르며 반복 재생하지 않습니다. 빠른 이탈/재진입·제목 변경·resize·설정 변경은 이전 완료를 취소합니다.
[긴 제목 채택 계약](../../title-overflow.md)의 단일 helper를 재사용하고 disabled에서 자동 이동하지 않습니다.
