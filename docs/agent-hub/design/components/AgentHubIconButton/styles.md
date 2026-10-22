# AgentHubIconButton — 크기와 색상

[실측 기록](../../references/icon-button.figma.json)의 Light mode 기준입니다.
제품의 IconButton 전용 token/variant adapter에 연결하고 공용 IconButton이나 전역 accent를 바꾸지 않습니다.

## 크기와 radius

| 버튼 frame | radius | Figma 패딩 | 아이콘 box | 원본 선 두께 | 공용과 다른 점 |
| --- | --- | --- | --- | --- | --- |
| 32×32 | 6px (`radius/control-md`) | 0 | 20×20 | 1.25px | 공용 radius 4px와 다름 |
| 24×24 | 4px (`radius/control-sm`) | 0 | 16×16 | 1px | 공용 아이콘 선 1.25px와 다름 |
| 20×20, ghost만 | 4px (`radius/control-sm`) | 사방 2px | 16×16 | 1px | 공용 tiny는 아이콘12px·패딩0 |

32/24px는 패딩 없이 중앙 정렬하며 glyph와 frame 사이 여유는 정렬 결과로 생깁니다.
16px 도형을 공용의 선 보정 1.25px로 바꾸거나 부모 CSS에서 모든 SVG의 fill/stroke를 덮어쓰지 않습니다.
다른 glyph는 `AgentHubIcon`의 해당 크기 원본을 확인합니다. 위 선 값은 현재 plus 예시의 실측입니다.

## Ghost·outlined

| state | 배경 | 아이콘 | outlined 외곽선 |
| --- | --- | --- | --- |
| default | 투명 | #1C1C1C | 1px 검정 10% |
| hovered | 검정 5% | #1C1C1C | 1px 검정 10% |
| pressed | 검정 10% | #1C1C1C | 1px 검정 10% |
| disabled | 투명 | #AAAAAA | 1px 검정 10% |
| active | #EBF3FF | #1C1C1C | 1px 검정 10% |

ghost에는 모든 상태에서 실제 외곽선이 없습니다. outlined 선은 inside 정렬이며 disabled·active에도 유지됩니다.
hover/pressed/border의 검정 alpha는 각각 `rgba(0,0,0,0.05/0.10/0.10)`입니다.
부모 배경과 합성한 회색을 고정 hex로 저장하지 않습니다. 공용 라이트 기본·hover·pressed·disabled 값과
같고, active 표현은 Agent Hub에서 추가로 확인한 값입니다.

## Primary

| state | 배경 | 아이콘 | 외곽선 |
| --- | --- | --- | --- |
| default | #3B82F6 | #FFFFFF | 없음 |
| hovered | #0066FF | #FFFFFF | 없음 |
| pressed | #0056D6 | #FFFFFF | 없음 |
| disabled | #99C2FF | #AAAAAA | 없음 |

primary는 공용 IconButton에 없는 추가 variant입니다.
특히 disabled 아이콘은 #AAAAAA이며, Agent Hub의 텍스트 Button primary disabled 글자색 #FFFFFF와 다릅니다.
Button 스타일을 일괄 복사하거나 opacity 하나로 disabled를 만들지 않습니다.

## 변수와 미확인 값

- radius: `radius/control-md` = 6, `radius/control-sm` = 4.
- ghost/outlined hover·pressed·border: `color/button/opacity-hovered`, `opacity-pressed`, `opacity-border`.
- active 배경: `color/action/default-selected` = #EBF3FF.
- primary 배경: `color/button/primary-fill`과 `-hovered`, `-pressed`, `-disabled`.
- glyph의 색상 바인딩·원본 component ID·alias는 [변수 기록](../../references/icon-buttons.variables.figma.json)과 variant별 실측을 확인합니다.

그림자는 없습니다. dark/focus/loading 시각 variant는 이 노드에서 확인되지 않았습니다.
공용의 focus 표시 의무를 유지하고, 미제공 색상은 제품에서 근거를 확인해 연결합니다.
