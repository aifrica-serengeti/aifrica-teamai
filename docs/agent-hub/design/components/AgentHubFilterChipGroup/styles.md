# AgentHubFilterChipGroup — 크기와 배치

## 그룹 geometry

| layout | 현재 frame | 폭 / 높이 정책 | wrap | 가로 / 줄 간격 | clipping / 실제 overflow |
| --- | --- | --- | --- | --- | --- |
| hug | 344×32px | HUG / HUG | NO_WRAP | 8 / 0px | false / NONE |
| wrap | 280×72px | FIXED / HUG | WRAP | 8 / 8px | false / NONE |
| scroll | 280×32px | FIXED / HUG | NO_WRAP | 8 / 0px | true / NONE |

모두 horizontal layout, 시작 정렬(`primaryAxisAlignItems: MIN`), 교차축 중앙 정렬이며 padding은 사방 0입니다.
그룹 자체 radius는 0, opacity는 1이고 fill·border·shadow가 없습니다.
`strokeWeight: 1`만 보고 그룹에 border를 만들지 않습니다.

344px은 예시 칩 6개와 gap의 합입니다. HUG를 고정 344px로 만들지 않습니다.
280px은 wrap·scroll 원본 frame의 폭이며 제품 전체에 적용할 breakpoint나 최소 폭이 아닙니다.
wrap의 현재 높이 72px은 32px 두 줄과 줄 간격 8px의 결과로, 칩 개수·라벨·가용 폭이 바뀌면 높이도 바뀝니다.
scroll의 칩은 shrink로 축소하거나 줄바꿈하지 않고 한 줄의 원래 폭을 유지합니다.

예시의 선택 칩은 49×32px, 비선택 칩은 각각 51×32px입니다. 같은 라벨이어도 원본 border 유무로 폭이 다르므로
그룹에서 모든 칩 폭을 49px나 51px로 고정하지 않습니다. 칩의 상세 시각 값은
[AgentHubFilterChip](../AgentHubFilterChip/styles.md)을 따릅니다.

## 우측 fade의 실제 구조

| 항목 | 확인한 값 |
| --- | --- |
| node | `3099:25231`, 이름 `fade`, RECTANGLE |
| 소유 layout | scroll에만 존재 |
| 위치 / 크기 | x=232, y=0 / 48×32px |
| 배치 | ABSOLUTE, 가로 MAX·세로 STRETCH constraint |
| visible 연결 | `fade#3099:0`, 원본 true |
| paint | GRADIENT_LINEAR, opacity 1 |
| stop 0 | position 0, white `rgba(255,255,255,0)` |
| stop 1 | position 1, white `rgba(255,255,255,1)` |
| gradientTransform | `[[1,0,0],[0,1,0]]` |
| border / shadow | 없음 / 없음 |

fade는 우측 48px에 겹치는 별도 사각형입니다. layout의 gap을 차지하거나 칩의 폭을 줄이지 않습니다.
설명에 가로 scroll이라고 되어 있어도 실제 root의 `overflowDirection`은 `NONE`이고 `clipsContent`만 true입니다.
이 구조가 브라우저의 실제 스크롤·스크롤바·fade 자동 숨김을 구현한 것으로 취급하지 않습니다.

흰색 gradient는 확인한 Light 표면의 값입니다. 다른 surface·dark에 흰색을 그대로 씌우거나 임의 색상을
확인된 원본으로 기록하지 않습니다. 표면별 조정과 실제 gradient 렌더링은 제품에서 검증합니다.
