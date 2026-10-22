# AgentHubDataCard — 크기·Raised·글꼴·색상

[실측](../../references/card.figma.json)의 Light 기준입니다.

| 항목 | 확인한 값 |
| --- | --- |
| root | 120×120px FIXED·radius12 |
| 배치 | 세로 SPACE_BETWEEN·교차축 MIN, padding12px·저장 gap18px |
| 실제 선 | 사방1px INSIDE #DDD, strokesIncludedInLayout=true |
| 효과 / clipping | 세 상태 모두 Raised / false |
| text-group | x13/y13·94×36px·폭 FILL/높이 HUG·gap4px |
| title | Regular14/20px·400·#1C1C1C·폭 FILL |
| description | Regular10/12px·400·#757575·폭 FILL·title 아래 y24 |
| Chip | x13/y87·44×20px·HUG/FIXED·maxWidth200px |

글꼴은 Pretendard이고 자간은0입니다. title/description은 textAutoResize HEIGHT·truncation DISABLED·maxLines 없음입니다.
원본 ellipsis가 있다고 주장하지 않습니다. root의 border가 layout에 포함돼 내부 시작점은13px, 가용 폭은94px입니다.
SPACE_BETWEEN으로 text-group 하단49와 Chip 상단87 사이의 실제 간격은38px입니다.
저장 gap18을 고정 여백으로 더하거나 가운데 공간을18px로 줄이지 않습니다.

| state | root 배경 | 선·그림자·텍스트·Chip |
| --- | --- | --- |
| enabled | white, `color/action/default` | 모두 유지 |
| hovered | #F8F8F8, `color/action/default-hovered` | 모두 유지 |
| pressed | #F4F4F4, `color/action/default-pressed` | 모두 유지 |

배경은 불투명 paint이며 검정5/10% overlay로 바꾸지 않습니다.
공용 Card는 enabled에 그림자가 없고 hover/pressed에 Mid를 사용하지만, 이 카드는 **기본부터 세 상태 모두 Raised**입니다.
Raised의 실제 순서는 offset0/0·radius1·spread0·rgba(9,30,66,.31), offset0/1·radius1·spread0·rgba(9,30,66,.10)입니다.
[Elevation](../../foundations/Elevation.md)의 Raised를 연결하고 Mid의4px/6px 효과를 추가하지 않습니다.
filter의 radius0.5 표현과 CSS box-shadow blur1을 혼합하지 않습니다.

## 정보용 Chip

Chip은 white·inside1px #DDD·radius10·padding 좌우8/상하0·gap4·shadow 없음입니다.
선은 layout에 포함되지 않아 ‘Type’28px+px16=44px이며 CSS border 때문에46px로 만들지 않습니다.
label은 x8/y2·28×16px·SemiBold12/16·600·#1C1C1C·ENDING/maxLines1입니다.
원본42px와 실제44px, 최대폭200px와 현재44px를 구분합니다. 최대폭200을 카드의 내부94px에 무조건 강제하지 않습니다.

120px 정사각형·샘플 문구만 확인했습니다. 긴 제목/설명/유형·번역·가변 grid 폭·focus·disabled/loading·selected·dark/mobile는
제품에서 새 배치와 의미를 채택해 검증하며 고정120px에 내용을 겹치거나 잘라 넣지 않습니다.
