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

## 현재 채택: 긴 대표 value hover/focus 이동

실제 value가 가용 폭을 넘칠 때만 오른쪽 끝을 흐리게 하고, 기존 native 주 동작의 hover·focus에서 value만 이동해 숨은 끝을 보여줍니다.
대기100ms·속도36px/s linear·이탈 복귀200ms ease·흐림24px는 신규 제안값입니다. 원본 prototype 동작 실측이 아닙니다.
짧거나 긴 overflow 모두 같은 속도로 이동합니다. 최소 시간 없이 현재 위치부터 남은 거리로 시간을 계산하며 재진입에도 적용합니다. 남은 거리가0이면 즉시 끝 상태를 유지합니다.
끝에서는 오른쪽 흐림을 해제하고 머무르며 반복 재생하지 않습니다. icon·label66px·count·행의 좌표와 기존 click·선택·popup 소유권은 유지합니다.
[긴 제목 채택 계약](../../title-overflow.md)의 단일 helper를 재사용하고 disabled에서는 자동 이동하지 않습니다.
빠른 이탈/재진입·value 변경·resize·unmount·동작 줄이기 변경은 이전 완료를 취소하며 title 기반 기본 툴팁을 표시하지 않습니다.
