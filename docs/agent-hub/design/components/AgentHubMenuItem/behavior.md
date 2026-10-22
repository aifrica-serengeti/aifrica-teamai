# AgentHubMenuItem — 명령과 상태 소유권

항목은 [부모 Menu](../AgentHubMenu/behavior.md)의 한 명령입니다. 실제 명령 ID·권한·실행 가능 여부·요청·닫힘 정책은 제품 owner가 정합니다.
문구나 destructive 색상만으로 삭제 API·고정 route·확인 dialog·자동 송신을 만들지 않습니다.

기존 메뉴 primitive의 `onSelect` 한 경로에서 명령을 실행합니다. click·keydown·부모 wrapper에 같은 callback을 달지 않고,
Enter/Space나 포인터 한 번에 명령이 두 번 실행되지 않게 합니다. 실제 disabled는 primitive의 입력 차단과 실행 guard에 함께 연결합니다.
disabled에서 hover/pressed 색상이나 요청이 다시 활성화되지 않아야 합니다.

## 순간 상호작용과 표시 상태

hovered/pressed는 순간 상호작용이며 지속 선택·요청 성공·저장 완료가 아닙니다.
check Boolean은 표시 속성이므로 그 자체로 선택 토글·`aria-pressed`·checked state를 만들지 않습니다.
현재 값 표시·체크형 명령·radio/checkbox menu 의미가 필요한 제품은 실제 상태와 해당 primitive를 따로 채택해 검증합니다.

chevron을 표시한다고 submenu가 자동으로 열리는 것은 아닙니다. 실제 하위 메뉴가 있으면 부모의 SubTrigger/SubContent·
열림·keyboard·focus·collision 계약에 연결합니다. chevron·edit·check 각각에 별도 클릭 대상이나 Tab 정지점을 만들지 않습니다.
value는 보조 표시이며 form value·실제 선택 값·검색어를 소유하지 않습니다.

## header·divider와 추가 조합

header와 divider를 켜면 명령 영역과 구분해 렌더합니다. header 클릭이나 구분선 선택이 명령을 실행하지 않게 합니다.
Boolean false일 때 branch 전체를 생략하고 자식 텍스트·Vector가 저장돼 있다는 이유로 노출하지 않습니다.
label과 section label은 실제 property에 연결하되, ‘label’·‘section-title’·‘value’를 제품 데이터로 고정하지 않습니다.

새 icon-swap·표시 slot 조합·submenu·check 의미·loading·read-only가 필요하면 제품 요구와 채택 범위를 먼저 기록합니다.
미제공 상태를 원본 여덟 variant에 포함된 것으로 표시하지 않으며, 비동기 중복 실행 방지는 요청 owner에 둡니다.
항목이 나타났다는 이유로 명령을 자동 실행하거나 제품의 선택 값·draft를 초기화하지 않습니다.
