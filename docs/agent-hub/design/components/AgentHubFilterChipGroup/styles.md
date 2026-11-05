# AgentHubFilterChipGroup — 크기와 배치

## 최초 추출 geometry와 현재 갱신

| layout | 2026-10-20 frame | 폭 / 높이 정책 | wrap | 가로 / 줄 간격 | clipping / 실제 overflow |
| --- | --- | --- | --- | --- | --- |
| hug | 344×32px | HUG / HUG | NO_WRAP | 8 / 0px | false / NONE |
| wrap | 280×72px | FIXED / HUG | WRAP | 8 / 8px | false / NONE |
| scroll | 280×32px | FIXED / HUG | NO_WRAP | 8 / 0px | true / NONE |

모두 horizontal layout, 시작 정렬(`primaryAxisAlignItems: MIN`), 교차축 중앙 정렬이며 padding은 사방 0입니다.
그룹 자체 radius는 0, opacity는 1이고 fill·border·shadow가 없습니다.
`strokeWeight: 1`만 보고 그룹에 border를 만들지 않습니다.

과거344px은 당시 예시 칩6개와 gap의 합입니다. HUG를 고정 344px로 만들지 않습니다.
280px은 wrap·scroll 원본 frame의 폭이며 제품 전체에 적용할 breakpoint나 최소 폭이 아닙니다.
과거 wrap 높이72px은 32px 두 줄과 줄 간격 8px의 결과로, 칩 개수·라벨·가용 폭이 바뀌면 높이도 바뀝니다.
scroll의 칩은 shrink로 축소하거나 줄바꿈하지 않고 한 줄의 원래 폭을 유지합니다.

최초 예시의 선택 칩은49×32px, 비선택 칩은 각각51×32px입니다. 같은 라벨이어도 원본 border 유무로 폭이 다르므로
그룹에서 모든 칩 폭을 49px나 51px로 고정하지 않습니다. 칩의 상세 시각 값은
[AgentHubFilterChip](../AgentHubFilterChip/styles.md)을 따릅니다.

## 2026-11-05 metadata 갱신

현재 hug source3099:25138의 외곽은 **334×32px**입니다. wrap3099:25169는280×72px, scroll3099:25200은280×32px로 metadata 외곽은 같습니다.
[현재 관찰](../../references/existing-components-refresh.figma.json)의 FilterChip 샘플은 md의 모든 상태가49px이므로, 이전344px·선택49/미선택51 관계를 현재 그룹의 필수 geometry로 적용하지 않습니다.

현재 그룹의 내부 instance 폭·줄별 개수·native layout flag·fade binding은 재수집하지 않았습니다. 과거4+2 배치를 현재도 같다고 단정하거나49px만으로5+1 배치라고 추정하지 않습니다. 실제 배치는 라벨·아이콘·count·가용 폭에 따라 기존 HUG/wrap 엔진이 계산합니다.
제품 채택의 선 공간 예약·안정된 폭·gap8은 유지하며334px 역시 고정 runtime 폭이 아닙니다. 아래 fade와 내부 source 설명은 최초 snapshot의 상세 근거로 읽습니다.

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
