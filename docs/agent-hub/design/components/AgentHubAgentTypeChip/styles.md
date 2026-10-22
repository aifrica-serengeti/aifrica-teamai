# AgentHubAgentTypeChip — 스타일

아래 값은 [Figma 실측 기록](../../references/agent-type-chip.figma.json)의 현재 표시 기준입니다.
Agent Hub 전체 팔레트나 다크 모드 설정을 의미하지 않습니다.

| 항목 | 값 | 공용 Chip과 비교 |
| --- | --- | --- |
| 높이 | 20px | small과 동일 |
| 최대 폭 | 200px | small과 동일 |
| radius | 4px | rounded와 동일 |
| 좌우 패딩 | 8px | 기본값과 동일 |
| 상하 패딩 | 0px | 텍스트를 세로 중앙 정렬 |
| 글꼴 | Pretendard SemiBold, 600 | 동일 |
| 글자 / 줄 높이 | 12px / 16px | 동일 |
| 자간 | 0 | 동일 |
| 테두리 / 그림자 | 없음 | 공용의 transparent 1px border를 자동 적용하지 않음 |
| 배치 | 가로·세로 중앙 정렬, 한 줄 | 긴 텍스트는 최대 폭 안에서 말줄임 확인 |

Figma의 `strokeWeight: 1` 속성만으로 테두리를 만들지 않습니다. 네 variant 모두 `strokes: []`입니다.
`itemSpacing: 4`는 기록돼 있지만 현재 자식은 텍스트 하나여서 표시 간격을 만들지 않습니다.

| 유형 | 배경 | 글자 | 폭 정책 | 공용과 다른 점 |
| --- | --- | --- | --- | --- |
| assistant | #EBF3FF | #3B82F6 | HUG, 현재 68px | 공용 blue-subtle 글자 #0066FF와 다름 |
| workflow | #FAF5FF | #9333EA | HUG, 현재 68px | 공용 purple-subtle 색상과 동일 |
| runtime | #DDE2F1 | #1E232E | 고정 68px | 공용 navy-subtle 색상과 동일, 유형별 고정 폭 적용 |
| common-chat | #EEEEEE | #1E232E | 고정 68px | 공용 default-subtle 글자 #1C1C1C와 다름 |

assistant·workflow는 내용에 맞춰 폭이 결정됩니다. 현재 둘 다 68px이지만 모든 유형을 `width: 68px`로
일괄 고정하지 않습니다. runtime·common-chat은 원본의 68px 고정 폭을 유지합니다.
assistant·workflow 텍스트는 왼쪽 정렬, runtime·common-chat 텍스트는 가운데 정렬이며 컨테이너는 모두 중앙 정렬입니다.
텍스트 노드는 모두 `maxLines: 1`, `textTruncation: ENDING`입니다. 실제 말줄임과 확대 시 표시는 제품에서 확인합니다.

유형별 배경·글자를 제품의 component token으로 연결합니다. 공용 blue나 default 토큰을 전역으로
수정하지 않고 이 유형 Chip에만 위 값을 적용합니다. 공용의 다른 크기·shape·variant·아이콘을
이 노드의 확인된 지원 범위에 자동 추가하지 않습니다.
