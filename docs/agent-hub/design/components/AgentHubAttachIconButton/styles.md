# AgentHubAttachIconButton — 스타일

## 크기와 모양

| 항목 | 확인한 값 | 공용 IconButton과 비교 |
| --- | --- | --- |
| 버튼 frame | 32×32px | 공용 xlarge와 동일 |
| radius | 9999px (`radius/full`) | 공용 4px에서 원형으로 변경 |
| 내부 아이콘 | 24×24px | 공용 xlarge 기본 20px에서 변경 |
| 아이콘 선 | 1.5px, round cap/join | AgentHubIcon 24px 원본 사용 |
| padding / gap | 0 / 0 | 추가 padding 없이 중앙 정렬 |
| 외곽선 / 그림자 | 없음 / 없음 | 모든 상태에 `strokes: []`, `effects: []` |

원본은 고정 크기, 가로·세로 중앙 정렬입니다. frame과 아이콘 사이의 시각 여백을 CSS padding 4px로
중복 추가하지 않습니다. 루트에 `strokeWeight: 1`이 있어도 실제 strokes가 없으므로 border를 만들지 않습니다.
버튼 전체 opacity는 1입니다. disabled를 전체 투명도로 처리하거나 원형 바깥으로 focus가 잘리게 하지 않습니다.

## Light mode 상태색

| 원본 state | node | 배경 | 아이콘 | 외곽선 |
| --- | --- | --- | --- | --- |
| default | `3104:20` | transparent | `#1C1C1C` | 없음 |
| hovered | `3104:21` | `rgba(0, 0, 0, 0.05)` | `#1C1C1C` | 없음 |
| pressed | `3104:22` | `rgba(0, 0, 0, 0.10)` | `#1C1C1C` | 없음 |
| disabled | `3104:23` | transparent | `#AAAAAA` | 없음 |
| state5 | `3074:92873` | `#3B82F6` | `#FFFFFF` | 없음 |

default·hovered·pressed·disabled 색상은 공용 ghost의 Light baseline과 같습니다.
원형 모양·24px 아이콘·별도의 `state5` 표현은 Agent Hub 확장에 남깁니다.

원본 변수는 배경 hover/pressed에 `color/action/opacity-hovered`, `color/action/opacity-pressed`,
state5 배경에 `color/action/primary`를 사용합니다. 아이콘은 `color/icon/default`, `color/icon/disabled`,
state5에서 `color/icon/default-static`에 연결됩니다. 이 변수 이름만으로 제품 전체의 토큰이나 상태 의미를 결정하지 않습니다.

hover/pressed는 실제 surface 위에 합성되는 검정 오버레이입니다. 흰 배경에서 보이는 회색 한 가지로 대체하지 않습니다.
`state5`를 CSS `:active`에 자동 연결하거나 disabled에 파란색이 남도록 합성하지 않습니다.
dark·focus·loading 및 state5의 추가 hover/pressed 색상은 이 노드에 없습니다.
공용 focus 표시 의무를 유지하고 미확인 값은 제품에서 근거와 함께 정합니다.
