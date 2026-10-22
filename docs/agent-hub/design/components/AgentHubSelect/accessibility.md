# AgentHubSelect — 접근성

공용 Select의 native semantics·label/id·키보드·오류 연결을 유지합니다. 오류는 aria-invalid/aria-describedby와 읽을 수 있는 문장으로 제공합니다.
표면이 focus를 소유할 때 내부 outline만 scoped 제거하고 toolbar/button의 독립 focus는 보존합니다.
Select는 combobox/listbox의 단일 선택, Arrow/Home/End, Enter/Space, Escape·Tab 닫힘과 trigger 복귀를 제공합니다.
가상 focus를 사용하는 경우 실제 DOM focus는 combobox에 유지하고, 키보드 탐색 중에만 유효한 enabled option을 `aria-activedescendant`로 연결합니다.
포인터로 열기·hover 이동은 키보드 가상 focus로 발표하지 않으며 현재 값의 `aria-selected`와 check는 계속 유지합니다.
읽기 전용·disabled에서 option 변경을 막으며 reduced-motion에서는 지연 없는 종료를 제공합니다.

### 공용 baseline과 이번 키보드 채택 차이

공용 Select baseline은 Enter/Space 선택을 제공하며 방향키 목록 탐색은 미지원으로 기록되어 있습니다.
이번 Agent Hub 단일 선택 adapter는 사용자 승인 계획에 따라 ArrowUp/Down·Home/End 탐색을 **추가 채택**합니다.
따라서 geometry만 바꾼 무변경 재사용으로 주장하지 않습니다. 공용 의미·단일 값·popup150ms/scroll은 계승하되
소비 구현의 SingleSelect helper가 이 키보드 강화 계약을 제공하고 실제 제품 mapping 시 기존 onKeyDown과 충돌을 검사합니다.
검색·다중선택은 계속 미구현입니다. 공용 원본의 방향키 미지원 관찰값을 조용히 수정하지 않습니다.
