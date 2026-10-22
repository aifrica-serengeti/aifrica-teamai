# AgentHubSelect — 동작

공용 Select의 단일 선택·키보드·스크롤·popup150ms만 현재 범위로 구현합니다. 검색·다중 선택·비동기/가상화 API는 미구현이며 공개하지 않습니다.
원본은 닫힌 trigger만 제공하므로 popup의 AgentHubMenu 표현은 이번 사용자 요청에 따른 제품 채택값입니다.
필수값·오류·읽기 전용·disabled를 구분합니다. disabled는 focus/변경/요청을 즉시 차단하고 read-only는 읽기·복사를 허용합니다.
form submit은 부모 한 곳만 소유합니다. 선택 취소/Escape는 draft를 임의 변경하지 않습니다.

### 공용 baseline과 이번 키보드 채택 차이

공용 Select baseline은 Enter/Space 선택을 제공하며 방향키 목록 탐색은 미지원으로 기록되어 있습니다.
이번 Agent Hub 단일 선택 adapter는 사용자 승인 계획에 따라 ArrowUp/Down·Home/End 탐색을 **추가 채택**합니다.
따라서 geometry만 바꾼 무변경 재사용으로 주장하지 않습니다. 공용 의미·단일 값·popup150ms/scroll은 계승하되
소비 구현의 SingleSelect helper가 이 키보드 강화 계약을 제공하고 실제 제품 mapping 시 기존 onKeyDown과 충돌을 검사합니다.
검색·다중선택은 계속 미구현입니다. 공용 원본의 방향키 미지원 관찰값을 조용히 수정하지 않습니다.

## Menu 표현과 Select 의미를 분리합니다

패널·행 배경·check glyph는 Agent Hub Menu/MenuItem 표현을 재사용하지만 빈도 선택은 명령 menu로 바꾸지 않습니다.
엔진은 combobox/listbox/option의 단일 값·`aria-selected`·Arrow/Home/End·Enter/Space·Escape·Tab 동작을 계속 소유합니다.
현재 선택은 부모 value이며 keyboard active·hover·현재 선택을 같은 state로 합치지 않습니다.
마우스/터치로 열면 선택값의 check만 표시하고 option의 키보드 ring은 표시하지 않습니다.
Enter/Space·ArrowUp/Down으로 열거나 열린 목록에서 Arrow/Home/End로 탐색한 때만 키보드 active를 표시합니다.
포인터가 항목 위로 이동하면 키보드 표시를 해제하며, 포인터 이탈 후 마지막 hover 행에 ring이 남지 않습니다.
탐색 index는 값·스크롤 계산을 위해 유지할 수 있으나 시각적 키보드 표시 여부와 분리합니다.
option content의 hover/pressed 배경은200ms ease, popup은150ms ease fade/slide6px로 열고 닫습니다.
Escape는 상위 Dialog까지 전파하지 않고 draft를 바꾸지 않은 채 popup만 닫고 trigger로 focus를 복귀합니다.
닫힌 popup은 즉시 inert 처리하고 빠른 재열기는 이전 종료 처리를 취소합니다. reduced-motion에서는 현재 상태로 즉시 완료합니다.
