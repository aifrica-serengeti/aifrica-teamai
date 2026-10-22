# AgentHubInput — 스타일

**Figma 실측**: 높이40 / radius8 / padding12 / 글자14/20 / label14/20·600.
원본 [Dialog styles](../AgentHubDialog/styles.md)·[recipe](../AgentHubDialog/scheduled-task-recipe.md)의 source/toolbar 슬롯을 함께 대조합니다.
공용의 다른 radius·기본 높이는 솔루션 geometry로 합성하고 전역 공용 값을 바꾸지 않습니다.
**공용 계승**: 배경·글자·선200ms ease. 신규 popup 측정값을 만들지 않습니다.

미제공 focus/invalid/read-only/disabled는 공용 계약을 계승합니다. focus는 표면 안쪽2px accent, invalid는 #E81919 경계·inset, disabled/read-only 표면은 #F8F8F8입니다. Figma에서 추가 상태를 측정한 것으로 기록하지 않습니다.

label와 필수 표시 간격2px·별표14/20 regular/#E81919는 원본 관찰입니다. 입력의 text 시작은 표면 left12px/y10px이며 CSS border1px를 layout에 쓰면 padding9px/11px로 보정해 실제 시각 여백을 유지합니다.
