# AgentHubTextarea — 스타일

**Figma 실측**: 표면140(본문103+toolbar37) / radius8 / label gap4 / 글자14/20.
원본 [Dialog styles](../AgentHubDialog/styles.md)·[recipe](../AgentHubDialog/scheduled-task-recipe.md)의 source/toolbar 슬롯을 함께 대조합니다.
공용의 다른 radius·기본 높이는 솔루션 geometry로 합성하고 전역 공용 값을 바꾸지 않습니다.
**공용 계승**: 배경·글자·선200ms ease. 신규 popup 측정값을 만들지 않습니다.

미제공 focus/invalid/read-only/disabled는 공용 계약을 계승합니다. focus는 표면 안쪽2px accent, invalid는 #E81919 경계·inset, disabled/read-only 표면은 #F8F8F8입니다. Figma에서 추가 상태를 측정한 것으로 기록하지 않습니다.

원본 Text area의 내용 padding은8px 12px이며 label↔필수 표시 간격은2px입니다. 본문103px/toolbar37px을 분리하는 runtime 조합에서 이 내용 시작점과140px 전체 높이를 유지합니다.

## Toolbar를 포함한 외곽선 채택

원본 Text area `3192:27869`는 전체532×140/r8/#DDD1px INSIDE이고, 그 안의 toolbar `3192:27876`는
x0/y103·532×37/#F4F4F4·위 #EEE1px입니다. 이 원본 측정과 구조는 그대로 보존합니다.
현재 구현은 사용자 요청에 따라 **toolbar를 포함한140px 표면 전체의 외곽선**을 연속해서 표시합니다.
불투명한 toolbar 아래에 부모 inset shadow를 그려 경계가 가려지는 기존 runtime 조합을 대체하는 채택값입니다.

외곽 장식층을 자식보다 위에 두고 default1px #DDD, 입력 focus2px #3B82F6, invalid1px/입력 focus2px #E81919를
같은 r8 경로에 표시합니다. read-only는 읽기·복사를 허용하며 focus에서도 기본1px 경계를 유지합니다.
선은 layout 공간을 추가하지 않으며 본문103/toolbar37·입력 padding·위 #EEE1px divider를 바꾸지 않습니다.
toolbar 버튼의 독립 focus는 남기고, toolbar 버튼 focus만으로 입력의2px 외곽선을 켜지 않습니다.
