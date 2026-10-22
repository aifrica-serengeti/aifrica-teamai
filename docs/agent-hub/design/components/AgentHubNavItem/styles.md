# AgentHubNavItem — 치수와 색상

네 상태 모두52×52px·FIXED/FIXED·radius8·padding0·세로 CENTER/CENTER·gap4입니다.
glyph는28×28px로 x12/y12에 놓입니다. 자식 하나이므로 저장 gap4가 추가 여백을 만들지 않습니다.
root opacity1·clipping false이며 실제 stroke/effect가 없습니다. strokesIncludedInLayout=true라도 border를 더하지 않습니다.

| state | root 배경 | 실제 clock glyph fill |
| --- | --- | --- |
| enabled | 없음·투명 | #757575 |
| hovered | 검정5% | #757575 |
| pressed | 검정10% | #757575 |
| selected | #CCE0FF·불투명 | #3B82F6 |

hover/pressed는 `rgba(0,0,0,.05/.10)` paint입니다. Rail의 #F6F7F9 위 합성 결과를 고정 회색 hex로 바꾸지 않습니다.
실제 binding은 hovered `3081:140`, pressed `3081:141`, selected 배경 `3081:142`, neutral glyph `3081:143`, selected glyph `3081:144`입니다.
전체 alias는 [변수](../../references/snb.variables.figma.json)를 따릅니다.

icon 자체는 filled path이며 실제 선이 없습니다. 원본 metadata의 strokeWeight로 테두리나 선을 추가하지 않습니다.
전체28px 자산을 보존하고16/20/24px glyph 확대·generic IconButton의 크기/radius로 교체하지 않습니다.
selected 배경을 파란 focus outline·aria-pressed·현재 route의 증거로 사용하지 않습니다.
focus·disabled·dark·교차 상태·모션은 제품이 채택한 근거로 검증합니다.

현재 채택은 배경 `background-color 200ms ease`와 내부 [NavIcon](../AgentHubNavIcon/styles.md)의 단일 mask 색상 `200ms ease`를 각각 적용합니다.
52px/r8와 glyph28px는 고정합니다. hover/pressed에서 glyph는 원본 neutral 색을 유지하고 selected 전환에서만 blue와 보간합니다.
타이밍은 공용 계승이며 Figma 정적 상태에서 측정한 값이 아닙니다. reduced-motion에서는 두 전환을 즉시 완료합니다.
