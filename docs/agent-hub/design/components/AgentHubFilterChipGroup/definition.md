# AgentHubFilterChipGroup — 정의와 지원 범위

Figma component set `3099:25232`의 `layout`은 `hug`, `wrap`, `scroll` 3종이며 기본값은 `hug`입니다.
`fade#3099:0`은 기본 true인 Boolean 속성입니다. 실제 fade 노드는 scroll에만 있고 hug·wrap에는 없습니다.
이 속성 목록은 확인된 제품 API가 아닙니다.

| layout | node | description의 용도 | 확인한 구성 |
| --- | --- | --- | --- |
| hug | `3099:25138` | 칩 개수만큼 늘어나는 한 줄 | HUG 폭, 6개 칩 |
| wrap | `3099:25169` | 필터 패널·모달의 고정 폭 줄바꿈 | 고정 폭 280px, 4개+2개 배치 |
| scroll | `3099:25200` | 좁은 툴바·모바일의 가로 스크롤과 우측 fade | 고정 폭 280px, clipping과 absolute fade |

각 그룹의 칩 6개는 모두 `md`, `enabled`이며 첫 번째만 selected입니다. 모든 예시 라벨은 “전체”이고
leading/trailing icon·count는 숨겨져 있습니다. 6개·md·첫 선택·같은 라벨을 실제 제품의 필수값으로 고정하지 않습니다.
count의 숨겨진 예시 값 `3`도 실제 필터 결과 수가 아닙니다.

## 중첩 instance와 원본

세 그룹은 새 칩 도형을 복제하지 않고 같은 filter-chip 원본을 조합합니다.

| 중첩 상태 | 원본 component | 원본 variant |
| --- | --- | --- |
| 첫 번째 칩 | `3092:25164` | size=md, selected=true, state=enabled |
| 나머지 다섯 칩 | `3092:25109` | size=md, selected=false, state=enabled |

| layout | selected instance | unselected instances |
| --- | --- | --- |
| hug | `3099:25139` | `3099:25144`, `3099:25149`, `3099:25154`, `3099:25159`, `3099:25164` |
| wrap | `3099:25170` | `3099:25175`, `3099:25180`, `3099:25185`, `3099:25190`, `3099:25195` |
| scroll | `3099:25201` | `3099:25206`, `3099:25211`, `3099:25216`, `3099:25221`, `3099:25226` |

직접 의존 계약은 `AgentHubFilterChip`입니다. 칩별 색상·radius·아이콘·count·disabled는 그 계약에 위임합니다.
공용 Chip은 정보 표시용이며, 이 그룹의 선택·토글 의미는 FilterChip 확장이 소유합니다.
칩의 id·선택 방식·라벨·count·실제 필터 조건·결과 갱신은 consuming repository의 페이지 계약에 연결합니다.
