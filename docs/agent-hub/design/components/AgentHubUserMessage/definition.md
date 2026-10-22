# AgentHubUserMessage — 정의와 재사용 관계

원본 `message/user`는 **사용자 발화**의 세 표시 형식입니다. `kind`는 chat·agent·schedule이며
송신 요청의 lifecycle이나 성공/실패 enum이 아닙니다. assistant 응답 버블로 자동 전용하지 않습니다.

| kind | 보이는 구조 | 확인 범위 |
| --- | --- | --- |
| chat | 본문을 감싼 회색 버블 | 일반 사용자 메시지 |
| agent | 유형 Chip·에이전트 이름·Divider·본문 | 에이전트를 지정한 사용자 메시지 |
| schedule | 상태 행 + 일반형 회색 버블 | 예약 경로로 전송됐다는 표시 |

텍스트 속성은 `message#2972:0`, `agent-name#2972:3`, `schedule-status#3103:2`입니다.
본문·에이전트 이름·예약 상태 문구의 원본 연결이며 검증된 앱 prop 이름은 아닙니다. 예시 문구를 제품 상수로 고정하지 않습니다.

agent의 Chip은 일반 Chip 원본 `2079:11964`의 Rounded/Small/Enabled, leading/trailing false 조합입니다.
실제 인스턴스는 보라색 배경·글자로 override됐습니다. `AgentHubAgentTypeChip`의 workflow와 색상이 같지만 그 원본을 사용한 것은 아니며,
라벨 ‘에이전트’를 workflow 업무 유형으로 매핑하지 않습니다. 에이전트 제목은 별도 텍스트이고 description 노드는 존재하지만 숨겨져 있습니다.
Divider는 원본 `2019:118`의 Vertical 인스턴스를17×12px로 사용합니다.

schedule 안의 `message/user`는 FRAME입니다. chat 버블과 스타일은 일치하지만 chat COMPONENT의 인스턴스 재사용이라고 기록하지 않습니다.
실제 제품에서는 공통 local bubble helper로 같은 스타일을 재사용할 수 있습니다.
보이는 시계는20px 원본 `2053:5271`을12px로 축소한 인스턴스이며 [전용 SVG](../../assets/message-user/schedule-12.svg)를 사용합니다.

세 버블에는 숨겨진 arrow 인스턴스가 있습니다. 이름은 arrow-right/24, 실제 원본은 arrow-right/16(`2199:23721`), 저장 frame은19.2px입니다.
이들은 보이지 않으므로 메시지 action·아이콘 slot·추가 간격·신규 glyph 의존성으로 만들지 않습니다.
직접 의존 계약은 `Chip`, `Divider`, `AgentHubIcon`이며 실제 제품 source/public export는 소비 저장소에서 확인하거나 개발한 뒤 연결합니다.
