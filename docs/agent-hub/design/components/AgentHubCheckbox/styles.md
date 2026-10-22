# AgentHubCheckbox — 크기와 색상

[실측 기록](../../references/checkbox.figma.json)과 [변수](../../references/checkbox.variables.figma.json)의 Light mode 값입니다.
각 노드의 `styleRef`는 같은 파일의 `styles`를 참조합니다. root canvas 나열 좌표를 앱 화면 좌표로 사용하지 않습니다.

## 공용 대비 박스

| 항목 | small | medium | large | 공용 대비 |
| --- | --- | --- | --- | --- |
| 시각 박스 | 12×12px | 16×16px | 20×20px | 공용12/16 유지, large 추가 |
| root·Box radius | 3px | 4px | 5px | 공용은 두 크기 모두2px |
| Box 위치 | 0 / 0 | 0 / 0 | 0 / 0 | root와 같은 외곽 크기 |
| 미선택/disabled 선 | 1px INSIDE | 1px INSIDE | 1px INSIDE | 상태별 실제 paint 확인 |

모든 상태에서 외곽 크기는 고정입니다. `box-sizing: border-box` 또는 동등한 inside/overlay 표현으로
선 때문에12/16/20px가14/18/22px가 되지 않게 합니다. selected enabled의 실제 border는 없습니다.
공용의 primary border를 그대로 추가하거나 SVG 전체 위에 border를 중복하지 않습니다.
root와 자식에 실제 shadow는 없습니다. root는 `clipsContent: true`지만 keyboard outline은 바깥 조작 primitive에서
보여 주어 clipping에 잘리지 않게 합니다.

## 상태색과 실제 border

| type | state | Box 배경 | Box border | Mark |
| --- | --- | --- | --- | --- |
| unchecked | enabled | #FFFFFF | 1px #1C1C1C | 없음 |
| checked / indeterminate | enabled | #3B82F6 | **없음** | #FFFFFF |
| unchecked | disabled | #EEEEEE | 1px #AAAAAA | 없음 |
| checked / indeterminate | disabled | #EEEEEE | 1px #DDDDDD | #FFFFFF |

미선택·disabled의 중립색과 disabled의 흰 마크는 공용과 같습니다. active 배경은 공용의 의미 primary를
이 범위에서 `color/element/primary`=#3B82F6으로 연결합니다. 같은 색의 선이 있는 공용 enabled checked/mixed와 달리
원본 Box는 `strokes: []`입니다. `strokeWeight: 1` 속성이 남아 있어도 실제 선으로 만들지 않습니다.
Mark는 enabled에서 `color/element/on-primary`, disabled에서 `color/element/on-disabled`에 연결되며 현재 둘 다 #FFFFFF입니다.
값이 같아도 상태별 semantic 역할을 합치거나 상위 label 색으로 대체하지 않습니다.
이번 값으로 공용 palette·Agent Hub 전체 primary·미제공 dark 값을 변경하지 않습니다.

## 마크의 정확한 도형

아래 좌표는 root 내부의 **path 기준 geometry bounds**이며 SVG 전체 frame 크기가 아닙니다.
stroke가 bounds 밖으로 반 픽셀씩 그려질 수 있으므로 가로선 height0을 보이지 않는 마크로 해석하지 않습니다.

| 마크 | small x/y · width/height | medium x/y · width/height | large x/y · width/height |
| --- | --- | --- | --- |
| 체크 | 3/3.75 · 6×4.125px | 4/5 · 8×5.5px | 5/6.25 · 10×6.875px |
| indeterminate 가로선 | 3/6 · 6×0px | 4/8 · 8×0px | 5/10 · 10×0px |

체크와 가로선은 세 크기 모두 **1px CENTER stroke·ROUND cap/join·흰색**입니다. 체크를 일반 check/16 아이콘으로
치환하거나 large에 선을 비례 확대하면 달라집니다. 원본 vectorPaths와 전체 SVG를 비교 기준으로 사용합니다.

공용 체크는9/12px 크기의 Lucide SVG에 `strokeWidth={3}`을 지정한 참조입니다. 그3은 SVG 좌표계의 값이며
viewBox·렌더 크기 확인 없이3 CSS px라고 비교하지 않습니다. Agent Hub의1px native stroke와 path bounds를 독립적으로 비교합니다.
공용 mixed는6×1.5/8×2px 채운 사각형이지만 Agent Hub는6/8/10px 길이의1px round stroke입니다.
같은 가로선이라는 이유로 공용의 높이·끝 모양을 그대로 사용하지 않습니다.

이 노드는 텍스트·hit area·focus를 포함하지 않습니다. 공용 small24px/medium32px hit area와 라벨 기준을 유지하고,
large의 해당 정책은 제품에서 확인합니다. 공용 focus1px outline·offset1px 의무를 유지하되 달라진 모서리와 함께
실제 제품에서 비교하며 focus의 새 수치를 Figma 확인값으로 표시하지 않습니다.

## 표시 애니메이션에서 위치 고정

사용자 요청으로 채택한 Mark fade는 원본 좌표·native 크기 그대로 opacity만 전환합니다.
scale0.8→1 방식은 왼쪽 윤곽의 이동이 체크 밀림으로 보여 폐기했습니다. 마크별 stroke를 포함한 export x/y는
[Mark manifest](../../references/checkbox-marks.assets.json)를 유지하며, 반 픽셀을 정수로 반올림하지 않습니다.
중앙 정렬을 위한 transform과 표시 애니메이션 transform을 상태 종료 시 교체하지 않습니다.
