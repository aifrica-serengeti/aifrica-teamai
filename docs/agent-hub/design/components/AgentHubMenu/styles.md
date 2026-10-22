# AgentHubMenu 스타일

## 패널

| 항목 | 확인 값 |
| --- | --- |
| 샘플 | 폭160/FIXED·높이318/HUG |
| radius | 12px, radius/surface-sm → radius/12 |
| 표면 | #FFFFFF, color/surface/default-mid |
| 선 | 사방1px #DDDDDD INSIDE, color/border/default |
| Auto layout | 세로·gap0·상하4/좌우0, border 포함 |
| 내부 행 | 폭158/FILL·x1, 첫 y5·다음은28px씩 |
| clipping / overflowDirection | true / NONE |
| 그림자 | 0 0 1px rgba(9,30,66,.31), 0 4px 6px rgba(9,30,66,.15) |

샘플 높이318은11행×28 + 상하 padding8 + border2입니다.
160px·11행·318px를 모든 메뉴의 최소/최대 폭·개수·높이로 강제하지 않습니다.
공용 max296·large8행 규칙도 이 Figma의 실측 값으로 기록하지 않습니다.

원본 effectStyleId는 `S:a15de5d74923403292f59da1f6d689b596ade000,`입니다.
기존 [Elevation Mid](../../foundations/Elevation.md)와 효과 값은 같지만 style ID는 다릅니다.
원본 순서의 두 효과와 alpha를 유지하고 foundation 샘플의 opacity0.9를 메뉴에 곱하지 않습니다.

## 항목과 표시 옵션

[MenuItem 스타일](../AgentHubMenuItem/styles.md)을 연결합니다. hover/pressed 배경은 wrapper 전체가 아니라 content에 적용합니다.
header·divider는 state의 배경이나 실행 영역에 포함하지 않습니다.
기본 enabled/disabled는 투명이며 패널의 white가 보입니다.
default14/20/400 #1C1C1C, destructive의 label/edit/check는#D00A0A입니다.
value와 chevron은 두 intent 모두#757575이고 disabled일 때만 해당 항목 요소들이#AAAAAA입니다.
숨김 header 글자는 disabled에서도#1C1C1C, 구분선은#DDDDDD여서 전체 wrapper opacity로 바꾸지 않습니다.

현재 숨김 header frame28·divider frame9는 metadata 실측입니다.
둘을 켠 전체 item 높이65px는 28+28+9의 계산값이며 별도 렌더 검증은 아닙니다.
자식 글자나 선의 visible=true만으로 숨김 조상을 무시해 표시하지 않습니다.
옵션을 켜면 HUG 높이와 실제 흐름으로 다시 배치하고 숨김 상태의 저장 좌표에 절대 배치하지 않습니다.

## 스크롤·focus

숨김 scrollbar wrapper11×318, thumb4×28/radius-full/#DDD는 그려진 값입니다.
scrollbar Boolean=true의 별도 화면이나 실제 휠·드래그·키보드 스크롤은 확인하지 않았습니다.
내용이 viewport를 넘으면 제품이 collision·최대 높이·실제 scroll viewport를 연결하고 마지막 항목까지 노출해야 합니다.
막연히 overflow:hidden만 복사하거나 스크롤바 장식만 표시하지 않습니다.

공용 focus·선택 의미는 유지합니다. 이 Figma에 focus variant가 없더라도 키보드 focus를 숨기지 않습니다.
공용 Menu의 inset2 focus와 제품 primary/focus token을 연결해 radius12/clipping 안에서 보이게 합니다.
키보드 강조는 배경을 hover 색으로 바꾸지 않으며 같은 행 hover에서는 ring을 숨깁니다.
기본 outline을 겹쳐 그리지 않고 [MenuItem의 hover/focus 우선순위](../AgentHubMenuItem/styles.md#공용-focus와-hover-우선순위)를 적용합니다.
다크·긴 문구·협소 화면·선택 palette는 제품 채택과 추가 검증으로 남깁니다.
