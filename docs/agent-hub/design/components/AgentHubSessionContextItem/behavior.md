# AgentHubSessionContextItem — 동작과 상태 소유권

label은 컨텍스트 그룹, value는 대표 표시값, count는 표시용 문자열입니다.
실제 group ID·전체 항목·선택 값·집계·권한·연결 상태는 [Session Panel](../AgentHubSessionPanel/behavior.md)과 제품 데이터 owner가 관리합니다.
count5나 value 한 개를 전체 데이터·페이지 크기·연결 한도로 사용하지 않습니다.

행은 한 활성화 의도를 통지합니다. 선택 변경·상세 보기·제품이 채택한 팝업 중 실제 결과는 제품이 명시합니다.
Flyout·Menu·Dropdown이 원본에 없으므로 자동 trigger·aria-haspopup·고정 route를 만들지 않습니다.
후속 팝업을 채택하면 별도 owner에 열림·대상·focus 복귀를 연결하고 이 표시 행에 popup 상태를 이중 저장하지 않습니다.

hovered/pressed는 포인터 상태이며 selected는 외부 선택 표시입니다.
selected를 실제 컨텍스트 연결·활성화 성공·체크 값·펼침 상태로 자동 변환하지 않습니다.
선택이 바뀌어도 대화·draft·첨부·에이전트·프로젝트를 임의로 제거하지 않습니다.

native button type=button의 click 한 경로에서 활성화를 통지하고 Enter/Space를 별도 keydown으로 재실행하지 않습니다.
icon·label·value·count 각각이나 wrapper에 같은 callback을 중복 등록하지 않습니다.
독립적인 연결/해제/메뉴 조작이 필요하면 제품이 별도 형제 control로 설계하며 중첩 button·Link를 만들지 않습니다.

추가 disabled/loading/read-only는 제품 정책이며 실제 변경 guard와 연결합니다.
새 시각·Spinner·상태 알림·자동 닫힘을 네 variant에서 확인한 기능으로 추가하지 않습니다.
이 행이 파일 조회·볼륨 권한·도구 실행·스킬 설치·API URL·debounce를 소유하지 않습니다.
