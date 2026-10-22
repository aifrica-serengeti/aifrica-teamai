# AgentHubThumbnailCard — 치수와 상태

[실측](../../references/card.figma.json)의 Light 기준이며 폭은 소비 제품의 부모 layout이 공급합니다.

| 영역 | 실제 값 |
| --- | --- |
| root | 324×343.5px 샘플, FIXED/HUG·세로 MIN/CENTER·padding/gap0 |
| 외곽 | radius24·사방1px INSIDE·border 포함 layout·opacity1·clipping true |
| thumbnail | x1/y1·322×241.500015px·폭 FILL·4:3 비율·#F4F4F4 |
| thumbnail 선 | 아래만1px INSIDE #EEEEEE, 위/좌우0·선은 layout에 미포함 |
| content | x1/y242.500015·322×100px·padding16·세로 gap4·clipping true |
| title-row | content 안 x16/y16·290×24px·가로 gap8 |
| title | 폭274 FILL·16/24·600·#1C1C1C·ENDING/maxLines1 |
| dot | 8×8px·title-row 안 x282/y8·#3B82F6·선 없음 |
| meta | x16/y44·28×16px 샘플·12/16·400·#757575·HUG |
| description | x16/y64·290×20px 샘플·14/20·400·#555555·FILL |

글꼴은 Pretendard, 자간0입니다. meta는 ENDING/maxLines1·WIDTH_AND_HEIGHT,
description은 ENDING/maxLines3·HEIGHT이며 샘플은 한 줄입니다.
title274 + gap8 + dot8 =290px이고 점을 숨긴 뒤8px+gap8을 빈 공간으로 남기지 않습니다.

원본 root는 border를 포함하므로 내부 폭은324−2=322px입니다. 생성 코드의324/243은 같은4:3 비율의 표현이고
실제 thumbnail은322×241.5입니다. 썸네일 아래 선은 그 높이 안에 그려져 전체 높이에1px를 더하지 않습니다.
내용100 = padding32 + title24 + gap4 + meta16 + gap4 + description20,
전체343.5 = 외곽 border2 + thumbnail241.5 + content100입니다.343.5px를 고정 높이로 강제하지 않습니다.

| state | root 배경 | 외곽 선 | 그림자 |
| --- | --- | --- | --- |
| default | #FFFFFF | #DDDDDD·1px | Overflow |
| hovered | #F8F8F8 | #DDDDDD·1px | Mid |
| pressed | #F4F4F4 | #DDDDDD·1px | Mid |
| selected | #EBF3FF | #3B82F6·1px | Overflow |
| disabled | #FFFFFF | #DDDDDD·1px | Overflow |

Overflow는 `0 0 1px 0 rgba(9,30,66,.12)` + `0 0 8px 0 rgba(9,30,66,.16)`,
Mid는 `0 0 1px 0 rgba(9,30,66,.31)` + `0 4px 6px 0 rgba(9,30,66,.15)`입니다.
selected에 inset1px를 더하지 않습니다. thumbnail의 #F4F4F4·아래 #EEE 선은 모든 state에서 유지합니다.

disabled는 title/meta/description과 dot만 #AAAAAA로 바뀌며 전체 opacity는1입니다.
공용의 자식 opacity0.4를 추가해 thumbnail·선·그림자까지 흐리게 하지 않습니다.
점은 [제공 자산](../../references/card.assets.json)의 enabled/disabled 원본 SVG를 그대로 사용합니다.

324px·샘플 문자열 폭은 reference fixture입니다. 긴 설명은 최대3줄 metadata를 보존하며 실제 HUG 높이와 전체 정보 접근을 검증합니다.
false branch·가변 이미지·큰 글자·좁은 폭·dark·focus·선택+hover/pressed 교차 시각·전환 모션은 별도 제품 검증 범위입니다.
