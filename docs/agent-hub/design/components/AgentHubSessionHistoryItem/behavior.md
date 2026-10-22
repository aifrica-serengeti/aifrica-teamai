# AgentHubSessionHistoryItem — 현재 보기와 확인 상태

현재 보고 있는 실행과 확인 여부는 독립된 값입니다. selected가 true라고 dot을 자동 제거하거나,
dot이 있다는 이유로 기록을 자동 선택하지 않습니다. 원본의 selected/dot 조합은 표시 샘플이며 읽음 정책을 정의하지 않습니다.

행 활성화는 실제 execution ID에 대한 보기/선택 의도를 한 번 전달합니다.
선택·내용 조회·대상 응답 표시·권한·실패·경쟁 요청은 [Session Panel](../AgentHubSessionPanel/behavior.md)과 제품 owner가 관리합니다.
기록 클릭이 예약 실행·재시도·삭제·메시지 전송을 자동 실행하지 않습니다.

‘확인하지 않은 실행’ 상태의 생성·서버 동기화·해제 시점은 제품이 정합니다.
click·focus·hover·화면 노출·조회 시작·조회 성공 중 어느 시점을 읽음으로 삼을지 이 행에서 조용히 결정하지 않습니다.
확인 API가 필요한 제품은 요청 owner가 중복 방지·실패 복구·여러 화면의 일관성을 담당합니다.

title은 제품이 만든 날짜/시간 표시 문자열입니다. ‘오늘 오후 3:00’을 실제 timestamp나 고정 locale/timezone으로 사용하지 않습니다.
다섯 샘플의 순서·개수를 보관 한도·페이지 크기·새 기록 자동 추적 정책으로 만들지 않습니다.

기본 action은 native button type=button의 click 한 경로를 사용합니다.
Enter/Space를 위한 별도 keydown·wrapper·title·dot click에 같은 callback을 중복 등록하지 않습니다.
dot은 장식과 상태 설명이며 독립적인 읽음 토글 버튼이 아닙니다.

추가 disabled/loading은 실제 활성화를 guard하고 제품 요청 owner와 연결합니다.
비활성·loading 시각·자동 스크롤·실시간 갱신·별도 live region을 네 상태의 확인된 기능으로 추가하지 않습니다.
새 선택·기록 갱신이 기존 대화·draft·첨부를 임의로 초기화하지 않아야 합니다.
