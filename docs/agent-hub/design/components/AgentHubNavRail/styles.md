# AgentHubNavRail — 치수와 표면

| 영역 | 실제 값 |
| --- | --- |
| root | 68×1037px·폭 HUG/높이 FIXED·세로 SPACE_BETWEEN/CENTER |
| root padding·gap | 좌우8/위18/아래16px·저장 gap32 |
| root 표면 | #F6F7F9·opacity1·radius0·실제 stroke/effect 없음 |
| root clipping | false·overflowDirection NONE·strokesIncludedInLayout true |
| 상단 묶음 | root 안 x8/y18·52×232px·세로 시작 정렬·gap8 |
| 항목 | 52×52px·묶음 안 y0/60/120/180 |
| 하단 묶음 | root 안 x18/y945·32×76px·세로 CENTER/CENTER·gap16 |
| 설정 Button | 하단 묶음 x0/y0·32×32px·radius6·투명·선/효과 없음 |
| settings glyph | Button 안 x6/y6·20×20px·#757575 채움·실제 stroke 없음 |
| avatar | 하단 묶음 x2/y48·28×28px·radius9999·#3235EC·실제 stroke/effect 없음 |

68 =8+52+8, 상단232 =52×4+8×3, 하단76 =32+16+28입니다.
SPACE_BETWEEN 때문에 상단 묶음 아래 y250부터 하단 y945까지 실제 여유는695px입니다.
저장 gap32를 이 여유 공간의 고정값으로 바꾸지 않습니다.1037px는 샘플 높이이며 실제 높이는 제품 shell이 공급합니다.
root의 border layout metadata가 true여도 strokes가 비어 있으므로 폭/높이에 border2px를 더하지 않습니다.

home은 selected 배경 #CCE0FF·glyph #3B82F6이고 나머지3항목은 투명·glyph #757575입니다.
NavItem 자체의4상태는 [해당 스타일](../AgentHubNavItem/styles.md)을 읽습니다. rail에서 모든 glyph의 hover/pressed가 측정된 것은 아닙니다.

avatar 이름은 ‘김’·Pretendard SemiBold10.5/14·600·자간0·흰색입니다.
TEXT는 avatar 전체28×28px·ABSOLUTE x0/y0·가로/세로 CENTER이며 textAutoResize NONE·truncation DISABLED·maxLines null입니다.
단일 자식의 저장 gap8.75는 avatar 안에 추가 공간을 만들지 않습니다. 샘플 한 글자를 모든 사용자 이름으로 고정하지 않습니다.
실제 사용자 표시와 대체 문자열은 제품 adapter가 소유하고 공용 Avatar의 다른 크기/색으로 자동 교체하지 않습니다.

NavIcon은 전용28px 자산, settings는 actual20px 자산을 [manifest](../../references/snb.assets.json)에 맞춰 사용합니다.
root #F6F7F9의 binding은 `3081:129`, avatar fill은 `3081:162`, 이름 fill은 `3081:51`입니다.
[변수 기록](../../references/snb.variables.figma.json)에서 alias를 확인합니다.
보드의1224×1264/radius100·제목 SNB·40px 전시 간격은 rail 또는 전체 앱의 시각 규격이 아닙니다.
focus·disabled·dark·작은 높이·collapsed/mobile·avatar action·모션은 별도 제품 검증 범위입니다.
