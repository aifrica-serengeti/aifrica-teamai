# AgentHubFileCard — 치수와 상태

[실측 JSON](../../references/cards-actions-refresh.figma.json)의2026-11-05 Light 관찰입니다.
256px는 reference fixture이며 다른 크기에서 비례 확대하거나 내부 글자를 같이 확대하는 규칙은 관찰되지 않았습니다.

| 영역 | 확인값 |
| --- | --- |
| root/card | 256×256px, card inset0·border1 #DDDDDD·radius24·padding16·세로 gap16 |
| 기본 표면 | #FFFFFF, 별도 elevation 없음 |
| header | 가로 gap12, header-content는 교차축 중앙 정렬, details는 남은 폭 사용·min-width0 |
| leading-icon 타일 | 32×32px·white·border1 #DDDDDD·radius6 |
| header glyph | 원본20×20px, 가운데 배치 |
| details | 세로 gap4, 자식 묶음은 세로 주축 중앙 정렬 |
| title | Pretendard600 16/24·자간0·#1C1C1C·한 줄 ENDING |
| meta | Pretendard400 12/16·자간0·#757575·한 줄 |
| preview | 남은 높이 채움·#F8F8F8·radius12·clip·원본56×56px glyph를 가로·세로 중앙 배치 |
| image | absolute inset0·width/height100%·object-fit:cover·radius24 clip, header/preview/문구 없음 |
| 더보기 | 32×32px, top16/right16·radius6·#000000CC·원본20px 흰 glyph |
| checkbox | 20×20px, bottom16/right16. 미선택 white/radius5·1px #1C1C1C, 선택 원본 파란 체크 |
| 선택 링 | card 밖 별도 형제, inset-3px·2px #3B82F6·radius26 |

원본 생성 코드의 header 타일 padding8.889px와20px glyph는 border-box 해석을 따로 확인해야 합니다.
타일32px·glyph20px 중심 배치를 기준으로 검증하고 padding 값을 더해 glyph를 찌그러뜨리지 않습니다.
카드 내부 폭을222/224px 중 임의 값으로 고정하지 말고 border 포함 실제 layout에서 확인합니다.

원본 header-content의 `items-center`와 details의 `justify-center`를 유지합니다. 기본 title24 + gap4 + meta16의44px 텍스트 묶음 옆에32px 타일이 세로 중앙에 놓이며, meta를 숨겼을 때도 타일·제목을 위쪽으로 임의 정렬하지 않습니다. preview의56px glyph도 두 축 중앙 정렬을 모든 파일 유형·상태에서 유지합니다.

사진형은 MCP 원문의 `object-cover`를 연결해 사진 비율을 유지하면서 카드 전체를 채우고 넘친 부분을 자릅니다. 실제 fixture PNG1672×941을256×256으로 늘여 찌그러뜨리지 않습니다. 이는 사진 레이어가 있는 FileCard의 관찰값이며 회색 placeholder만 확인한 독립 Thumbnail의 fit 정책이나 모든 제품 이미지의 전역 규칙이 아닙니다. native 이미지 focal point·별도 object-position은 이 원문에서 확인되지 않았습니다.

| state | 표면과 보조 조작 |
| --- | --- |
| enabled | 기본 표면만. checkbox·더보기·바깥 선택 링 없음 |
| hovered | 전체 카드에 black5% dim, 오른쪽 위 더보기와 오른쪽 아래 미선택 checkbox 표시 |
| selected | 기본 표면/사진 유지, 오른쪽 아래 선택 checkbox와 바깥 선택 링 표시. hovered dim/더보기는 이 variant에 없음 |

hover dim은 card 안에 clip합니다. 생성 코드에서 dim이 inset-13으로 표현되어도 카드 밖으로 검정 overlay를
넘치게 하지 않습니다. 선택 링은 반대로 card 밖에 있어야 하며 root나 grid의 overflow가 자르면 안 됩니다.
2px 링과1px 바깥 간격이 전체3px inset으로 표현됩니다. selected를 기존1px 테두리 교체로 축소하지 않습니다.

selected+hover/pressed 조합·focus·disabled·dark는 이번 matrix에 없습니다. 그 상태를 selected에 무조건 hovered를
합성한 결과로 확정하지 않습니다. 기능이 필요하면 의미 계약과 읽기 가능성을 유지하며 제품 검증에 기록합니다.

색상 역할은 원본 `color/surface/default`, `color/surface/default-subtle`, `color/action/opacity-hovered`,
`color/border/primary`와 연결합니다. 원본 변수명·해결값은 실측 JSON에 보존했으며 제품 token export 확인은 별도입니다.
공용 Card에서 계승하는200ms ease 색상 모션은 background-color/border-color/color/box-shadow에 한정합니다.
전역 `transition: all`이나 파일 glyph/src 전환을 추가하지 않으며 reduced motion에서는 전환을 해제합니다.
hover 도구의 등장/퇴장 timing은 이번 Figma에서 확인되지 않았습니다.
