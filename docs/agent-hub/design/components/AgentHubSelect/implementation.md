# AgentHubSelect — 구현

공용 Select를 먼저 확보한 뒤 solution adapter가 반복 card50 / radius12 / padding12 / 오른쪽 ghost24 / glyph16를 연결합니다.
테스트 앱의 `src/components/forms.tsx`는 별도 소비 fixture의 예시이며 실제 Agent Hub source/export 증거가 아닙니다.
단일 Select는 `common/Select.tsx`의 값·combobox/listbox 엔진과 공용 ScrollArea를 사용합니다.
Select의 미제공 popup은 아래 AgentHubMenu 표현을 채택하며 검색/다중선택 기능을 구현 완료로 표시하지 않습니다.
read-only/disabled이면 popup 열기와 값 변경을 차단합니다. 목록이 줄거나 비면 유효한 enabled active index만 노출합니다.
탐색 index와 키보드 표시 여부를 분리합니다. pointer open·option pointer move는 키보드 표시를 끄고,
keyboard open·Arrow/Home/End는 켭니다. renderer의 active와 `aria-activedescendant`는 이 표시 여부를 함께 따릅니다.
선택값으로 초기 index를 맞추거나 포인터로 index를 갱신했다는 이유만으로 focus ring을 만들지 않습니다.
trigger와 popup viewport 모두 Escape를 소유해 상위 Dialog를 닫지 않고 trigger로 focus를 돌려줍니다.
label/trigger id와 기존 describedBy를 보존하며 popup은 기존 portal 또는 검증한 native popover로 body clipping을 피합니다.
공용을 끈 솔루션은 자체 구현으로 연결하며 frontend-common을 강제 설치하지 않습니다.

### 공용 baseline과 이번 키보드 채택 차이

공용 Select baseline은 Enter/Space 선택을 제공하며 방향키 목록 탐색은 미지원으로 기록되어 있습니다.
이번 Agent Hub 단일 선택 adapter는 사용자 승인 계획에 따라 ArrowUp/Down·Home/End 탐색을 **추가 채택**합니다.
따라서 geometry만 바꾼 무변경 재사용으로 주장하지 않습니다. 공용 의미·단일 값·popup150ms/scroll은 계승하되
소비 구현의 SingleSelect helper가 이 키보드 강화 계약을 제공하고 실제 제품 mapping 시 기존 onKeyDown과 충돌을 검사합니다.
검색·다중선택은 계속 미구현입니다. 공용 원본의 방향키 미지원 관찰값을 조용히 수정하지 않습니다.

option 노출은 popup ScrollArea의 ensureVisible handle만 사용합니다. DOM scrollIntoView로 상위 Dialog 본문까지 스크롤하지 않습니다. popup ResizeObserver가 목록 크기 변경에도 anchor 위치를 갱신하고 종료 시 해제합니다.

## 기존 Menu 표현을 연결하는 adapter

먼저 소비 저장소의 AgentHubMenu/AgentHubMenuItem source와 public export를 확인합니다.
SingleSelect의 표현 slot 또는 scoped adapter로 기존 Menu 패널 CSS와 MenuItem content를 재사용하며,
같은 모양의 임시 popup/option을 다시 작성하지 않습니다. 표현 재사용을 위해 값·열림·keyboard owner를 둘로 만들지 않습니다.

패널은 r12·white·#DDD1px·padding4px 0·Mid 두 겹 그림자, content는28px/r0·padding4px 12px 4px 16px입니다.
AgentHubMenuItem에 `role=option` adapter를 연결하는 경우 기존 명령 menuitem semantics를 대체하고,
Select가 소유한 option id·`aria-selected`·`aria-disabled`·active 상태와 단일 선택 handler를 연결합니다.
한 항목에 menuitem과 option을 중첩하거나 별도 onSelect/onClick으로 값 변경을 두 번 실행하지 않습니다.
선택된 content에 장식16px check를 연결하고 이 adapter에서 공용 파란 selected 배경/글자 규칙을 적용하지 않습니다.
미선택 행에도 동일한 trailing slot 공간을 예약해 선택 변경으로 label 시작 위치나 패널 폭이 움직이지 않게 합니다.

Menu의150ms ease fade/slide6px과 MenuItem의 background-color200ms를 공유합니다.
목록 ScrollArea에는 AgentHubScrollbar의 thumb4/gutter11/inset3/r9999/#DDD skin을 연결하며 native bar를 추가하지 않습니다.
현재 로컬 fixture는 이 표현과 엔진의 조합을 검증하는 예시이며 실제 제품 source/export를 mapped로 올리는 근거가 아닙니다.
공용을 끈 환경에서는 자체 Select 엔진에 같은 솔루션 표현·접근성을 연결하며 frontend-common을 강제하지 않습니다.
