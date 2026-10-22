# AgentHubSelect — 스타일

**Figma 실측**: 반복 card50 / radius12 / padding12 / 오른쪽 ghost24 / glyph16.
원본 [Dialog styles](../AgentHubDialog/styles.md)·[recipe](../AgentHubDialog/scheduled-task-recipe.md)의 source/toolbar 슬롯을 함께 대조합니다.
공용의 다른 radius·기본 높이는 솔루션 geometry로 합성하고 전역 공용 값을 바꾸지 않습니다.
**공용 계승**: 배경·글자·선200ms ease. 신규 popup 측정값을 만들지 않습니다.

## Agent Hub Menu 표현을 채택한 popup

예약 Dialog Figma에는 닫힌 trigger만 제공됩니다. 아래 popup 조합은 사용자 요청으로 채택한 제품 표현이며,
빈도 popup 자체를 Figma에서 측정한 것으로 기록하지 않습니다. 이전 공용 r4/행32px popup 채택을 이 Agent Hub adapter에서 대체합니다.

패널은 [AgentHubMenu](../AgentHubMenu/styles.md)의 r12/white/#DDD1px/상하4·좌우0와 Mid 그림자를 공유합니다.
원본 샘플 폭160·11행·높이318은 고정 개수나 높이로 강제하지 않습니다.
각 option의 표현은 [AgentHubMenuItem](../AgentHubMenuItem/styles.md)의28px/r0·pL16/R12/Y4·14/20을 재사용합니다.
배경은 default 투명↔hover #F8F8F8↔pressed #F4F4F4를200ms ease로 전환하며 disabled는 hover/선택을 차단합니다.
MenuItem wrapper/header/divider 전체에 hover를 칠하지 않고 실제 option content만 소유합니다.

선택값은 현재 제품 채택으로16px check glyph로 표시하고 기존 공용의 파란 글자·파란 선택 배경은 이 adapter에서 제거합니다.
이는 Menu Figma의 미제공 selected palette를 확인했다는 뜻이 아닙니다. check는 장식이고 단일 선택 의미는 `aria-selected`로 유지합니다.
선택과 hover·pressed·키보드 active는 별개이며 현재 선택된 option에도 기존 행 배경·focus 계약을 적용합니다.
popup의150ms ease fade/slide6px은 기존 AgentHubMenu 열림·닫힘 모션을 계승하며, 옵션 목록은 AgentHubScrollbar skin을 사용합니다.
짧은 빈도 목록에 세로 overflow가 없으면 scrollbar용11px gutter를 예약하지 않습니다. 패널 좌우에는 추가 여백을 만들지 않고
원본 MenuItem의 L16/R12 padding을 사용합니다. 실제 overflow가 생기면 같은 엔진의11px gutter와4px thumb를 함께 복원합니다.
이 보완은 빈도 popup의 조합 계약이며, Picker·Flyout 등 고정 gutter를 채택한 목록의 폭을 전역으로 바꾸지 않습니다.
reduced-motion에서는 popup과 option 색상 전환을 즉시 처리합니다.

### 공용 baseline과 이번 키보드 채택 차이

공용 Select baseline은 Enter/Space 선택을 제공하며 방향키 목록 탐색은 미지원으로 기록되어 있습니다.
이번 Agent Hub 단일 선택 adapter는 사용자 승인 계획에 따라 ArrowUp/Down·Home/End 탐색을 **추가 채택**합니다.
따라서 geometry만 바꾼 무변경 재사용으로 주장하지 않습니다. 공용 의미·단일 값·popup150ms/scroll은 계승하되
소비 구현의 SingleSelect helper가 이 키보드 강화 계약을 제공하고 실제 제품 mapping 시 기존 onKeyDown과 충돌을 검사합니다.
검색·다중선택은 계속 미구현입니다. 공용 원본의 방향키 미지원 관찰값을 조용히 수정하지 않습니다.

카드50/r12는 비상호작용 표면이며 오른쪽 실제 선택 trigger만 ghost24로 조합합니다. 카드 전체를50px Button으로 만들지 않습니다. label·반복 icon/문구·trigger를 각각 구분합니다. 미제공 invalid는 공용 danger #E81919·read-only/disabled surface #F8F8F8을 계승하고 이를 Figma 실측으로 표시하지 않습니다.
