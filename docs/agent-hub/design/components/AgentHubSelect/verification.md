# AgentHubSelect — 검증

닫힌 card50/r12·ghost24와 사용자 채택 popup150ms/r12를 구분합니다.
Arrow/Home/End·Enter/Space 선택, Escape 취소·값 보존·trigger focus 복귀, Tab 닫힘과 긴 목록/마지막 항목을 확인합니다.
required·invalid·read-only·disabled, popup이 Dialog clipping에 잘리지 않는지 확인합니다.
방향키 탐색은 이번 Agent Hub 강화이며 공용 baseline 지원으로 주장하지 않습니다. 검색/다중 선택은 미구현입니다.

popup이 실제 AgentHubMenu 패널 표현과 AgentHubMenuItem content를 재사용하는지 source/export를 확인합니다.
r12·white·#DDD1px·py4/px0·Mid 그림자, option28px/r0·pL16/R12/Y4·14/20을 비교합니다.
hover #F8F8F8·pressed #F4F4F4의 중간 프레임과 이탈을 확인하고 disabled에서는 적용·선택되지 않아야 합니다.
selected는16px check와 `aria-selected`로 표시하며 공용의 파란 selected 면·글자가 이 adapter에 남지 않아야 합니다.
마우스로 열기 직후와 hover 후 이탈 시 모든 option의 키보드 ring과 `aria-activedescendant`가 없어야 합니다.
Enter/Space·Arrow로 열거나 Arrow/Home/End 탐색 시에만 유효한 행 하나의 내부 ring과 가상 focus가 생겨야 합니다.
선택 check는 유지하고, pointer↔keyboard 전환·닫고 다른 방식으로 재열기에서도 이전 ring이 남지 않아야 합니다.
선택 변경 전후 label 시작 위치·패널 폭을 비교하고 check를 위한 slot 예약을 확인합니다.
role이 combobox/listbox/option인지 확인하고 명령 menu/menuitem으로 바뀌거나 중첩되지 않아야 합니다.
fade/slide6px150ms·reduced-motion 즉시 종료·빠른 재열기, 긴 목록의4px/#DDD thumb·11px gutter·마지막 option과 focus 노출을 검사합니다.
매시간·매일·매주처럼 짧은 목록은 overflow=false이고 viewport의 추가 오른쪽 gutter가0인지 확인합니다.
옵션 행이 패널 양쪽에 동일하게 붙고 원본 행 내부 padding L16/R12를 유지하는지, 긴 목록에서만11px gutter가 생기는지 비교합니다.

실제 source/export·직접 의존성·부모 상태 소유권을 확인하고 소비 mapping에만 기록합니다.
reduced-motion과 빠른 조작에서 지연된 상태 복원이나 남은 listener가 없어야 합니다.
