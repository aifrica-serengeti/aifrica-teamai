# AgentHubSearch — 크기와 색상

[실측 기록](../../references/search.figma.json)과 [변수](../../references/search.variables.figma.json)의 Light mode 기준입니다.
각 노드의 `styleRef`는 같은 파일의 `styles`를 참조합니다. 선택한 Search 범위의 매핑이며 공용 Input이나 전체 테마를 바꾸지 않습니다.

## 크기와 공용 대비 차이

| 항목 | Agent Hub 48 | Agent Hub 32 | 공용 Search baseline |
| --- | --- | --- | --- |
| 높이 | 48px | 32px | 28/32/36/40px |
| radius | 8px, radius/control-lg | 6px, radius/control-md | 4px |
| 좌우 padding | 12px | 8px | leading 좌12px·기본 우12px |
| 돋보기 frame / 선 | 20px / 1.25px | 16px / 1px | 16px / 2px |
| 돋보기 ↔ 텍스트 | 8px | 4px | 4px |
| 입력·placeholder 글꼴 | Pretendard Regular16/24px | Pretendard Regular14/20px | 14/20px |
| clear 원 / X frame·선 | 20px / 16px·1px | 20px / 16px·1px | 16px / 9.6px·2.5px |
| filter frame / glyph | 24px / 16px | 20px / 16px | 이 필터 조합 없음 |

텍스트는400·자간0입니다. 비편집 기본 상태의 텍스트 시작은 root 왼쪽에서 각각40px/28px입니다.
focus 시 실제 입력 위치가 밀리지 않게 유지합니다. Figma focused의 caret 사각형과 그 뒤4px 간격을
추가 placeholder padding으로 복사하지 않습니다. 원본 caret 샘플은48에서1×17px, 32에서1×14px이며 native caret으로 구현합니다.

root는 SPACE_BETWEEN 정렬입니다. 샘플 폭1064/506px·저장된 itemSpacing189px·텍스트 HUG 폭을
고정 규격으로 사용하지 않습니다. 제품 레이아웃에서 입력 영역은 늘고 줄며 긴 값은 입력 안에서 스크롤돼야 합니다.
오른쪽 조작 공간은 실제로 보이는 요소를 기준으로 확보합니다. 숨겨진 filter frame이 저장한24/20px trailing 폭이나
숨긴 filter의 x24 좌표를 phantom 버튼·빈 gap으로 만들지 않습니다. 두 조작이 실제로 함께 있으면 trailing gap4px를 사용합니다.

## 상태색과 선

| 확인한 상태 | 배경 | 실제 Figma border | 텍스트 / 돋보기 |
| --- | --- | --- | --- |
| enabled | #FFFFFF | 1px INSIDE #DDDDDD | placeholder #8F8F8F / #1C1C1C |
| focused | #FFFFFF | 2px INSIDE #3B82F6 | placeholder #8F8F8F / #1C1C1C |
| typing (filtered=false) | #FFFFFF | 2px INSIDE #3B82F6 | 입력 #1C1C1C / #1C1C1C |
| disabled (filtered=false) | #F8F8F8 | 1px INSIDE #DDDDDD | placeholder #757575 / #757575 |

disabled placeholder는 공용의 #AAAAAA와 다릅니다. Figma가 보여 주는 disabled 안내를 실제 입력 값으로 넣지 않습니다.
기본 surface·placeholder·입력색·border 중립색은 공용과 같고, active border는 이 범위에서 #3B82F6으로 연결합니다.
root와 내부 조작에 실제 shadow는 없습니다. `strokeWeight: 1`이어도 `strokes: []`인 요소에 선을 추가하지 않습니다.

Figma의 INSIDE 선은 내용 위치를 바꾸지 않습니다. 제품에서는 공용처럼 실제 border1px + 같은 색 inset1px,
또는 동등한 overlay로 시각2px를 구현해 focus 전후 외곽 높이·아이콘 위치를 유지합니다.
CSS border를1→2px로 바꾸며 내용이1px씩 밀리거나 icon offset에 border를 중복 더하지 않습니다.
원본 clipping을 그대로 옮겨 keyboard focus나 긴 입력을 가리지 않습니다.

## 내부 조작

- **Clear**: 두 typing 샘플에서20×20px·radius9999·사방 padding2px, 배경rgba(0,0,0,.05), 실제 border 없음입니다.
  x/16은 #1C1C1C·선1px입니다. 공용의 #555555 원·흰 X와 다릅니다.
  배경 변수 이름 `color/button/opacity-hovered`만으로 이 샘플을 clear hover 상태라고 판단하지 않습니다.
- **표시된 filter 강조**:48/32에서 각각24/20px·radius4, 중앙 filter/16·선1px입니다.
  배경 `color/surface/primary-subtle`=#EBF3FF, glyph `color/icon/primary`=#3B82F6입니다.
- **숨겨진 filter**: filtered=false의 frame에는 rgba(0,0,0,.05) 배경이 기록돼 있습니다.
  일부 숨김 glyph에 #757575가 남아 있어도 보이는 기본/hover/disabled 조합을 검증한 근거로 사용하지 않습니다.
  필터를 켠 실제 조합의 상태값은 제품에서 추가 확인합니다.

아이콘은 정확한 [Agent Hub 자산](../../assets.md)을 연결하고 모노크롬 도형을 보존하며 semantic 상태색을 적용합니다.
clear·filter의 hover/pressed/focus-visible·dark와 filtered+typing/disabled 색상은 이번 원본에 별도로 제공되지 않았습니다.
