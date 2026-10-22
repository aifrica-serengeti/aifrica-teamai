# AgentHubOutputViewer — 크기·모서리·색상·배치

[실측](../../references/output-viewer.figma.json)의 Light 단일 샘플 기준입니다.
원본의 프레임과 실제 paint를 분리하고 [변수](../../references/output-viewer.variables.figma.json)의 역할별 token에 연결합니다.

## root와 모서리별 표면

| 대상 | 크기·배치 | 표면·선 | radius TL / TR / BR / BL |
| --- | --- | --- | --- |
| root | 540×977px FIXED, 세로 MIN·padding0·gap0 | fills 없음·strokes 없음, Mid 효과 | 0 / 0 / 0 / 0 |
| Header | x0/y0·540×34px·폭 FILL/높이 HUG | #F6F7F9, 사방1px INSIDE #DDDDDD | 16 / 16 / 0 / 0 |
| content SLOT | x0/y34·540×943px·가로/세로 FILL | white, 위0·좌우아래1px INSIDE #DDDDDD | 0 / 0 / 16 / 16 |

16px 모서리는 `radius/surface-md`, Header는 `color/surface/blue-gray`, 본문은 `color/surface/default`,
선은 `color/border/default`입니다. root는 `clipsContent: false`, Header도 false이며 본문만 true입니다.
세 노드 모두 overflowDirection=NONE입니다. 실제 스크롤 구현이 있다는 뜻은 아닙니다.

Header34px는 top border1 + padding-top8 + 콘텐츠20 + padding-bottom4 + bottom border1입니다.
본문에는 top border가 없어 Header 하단 선을 중복하지 않습니다.
root의 저장 strokeWeight1만 보고 외곽 선을 추가하거나 전체에 원본에 없는 radius16을 실측값으로 기록하지 않습니다.
실제 둥근 외곽은 위/아래 표면의 모서리 조합으로 만들어집니다.

Mid 효과의 실제 순서는 다음과 같습니다.

1. DROP_SHADOW, offset0/0·radius1·spread0·rgba(9,30,66,0.31)
2. DROP_SHADOW, offset0/4·radius6·spread0·rgba(9,30,66,0.15)

[Elevation Mid](../../foundations/Elevation.md)와 같은 style ID이며 root에 적용돼 있습니다.
원본 root는 표면이 없는 사각 프레임이므로 CSS의 그림자 적용 대상·둥근 표면 윤곽을 [구현 안내](./implementation.md)에 따라 검증합니다.
생성 context의 filter drop-shadow radius0.5/3과 CSS box-shadow blur1/6은 표현 방식을 구분하며 숫자를 섞지 않습니다.
Header와 body 각각에 Mid를 중복 적용하지 않습니다.

## Header 제목과 형식

| 항목 | 확인한 값 |
| --- | --- |
| Header 배치 | horizontal·SPACE_BETWEEN·CENTER, padding 좌우16/상8/하4·저장 gap10 |
| title-area | Header 안 x17/y9·506×20px·FILL/HUG·padding-right44px |
| title-group | 106×20px 샘플·HUG/HUG·gap4px·CENTER·clipping false |
| title | ‘title’26px 샘플·Pretendard SemiBold14/20px·600·#1C1C1C |
| divider-dot | 3×3px·#AAAAAA·group 안 x30/y8.5·실제 선/그림자 없음 |
| type | ‘file-format’69px 샘플·title과 같은 글꼴·group 안 x37/y0 |

title/type은 자간0·textAutoResize WIDTH_AND_HEIGHT·truncation DISABLED·maxLines 없음입니다.
그룹의106px는 title26 + gap4 + dot3 + gap4 + type69의 결과입니다.
제목에 원본 ellipsis가 있다고 주장하거나26/69/106px를 모든 파일명에 고정하지 않습니다.
title-area의 우측44px는 조작 영역을 위한 저장 padding입니다. actions는 ABSOLUTE이므로 Header gap10을 버튼 앞의 추가 공간으로 더하지 않습니다.

## actions와 정확한 glyph

actions는 Header 안 x483/y5·52×24px·가로 HUG·gap4px·ABSOLUTE입니다.
24px 버튼 두 개+gap4로52px입니다. 오른쪽 실제 잔여5px에는 Header border1이 포함되며,
CSS border 안쪽 기준 right4px와 원본의 외곽 기준5px를 구분합니다. 세로 중앙은34/2 −24/2 =5px입니다.

두 버튼은 ghost/default/24·radius4·padding0·기본 fill/border/shadow 없음이며
native16 glyph를 x4/y4에 중앙 배치합니다. 실제 maximize16은 Vector4개, x16은 Vector2개이며
모두 선1px·round cap/join·#1C1C1C를 보존합니다. 정확한 내보내기는 [자산 기록](../../references/output-viewer.assets.json)을 따릅니다.
[maximize16](../../assets/output-viewer/maximize-16.svg)·[close16](../../assets/output-viewer/close-16.svg)과
[형식 구분점3](../../assets/output-viewer/type-divider-dot-3.svg)은 제공된 원본을 보존한 자산입니다.
icon-only 조작의 focus·추가 hover/pressed/disabled는 [AgentHubIconButton](../AgentHubIconButton/README.md)의 실제 계약과 제품에서 연결합니다.
현재 Viewer의 별도 상태로 측정한 값은 아닙니다.

## 비어 있는 본문과 미검증 범위

content SLOT은 세로 배치·MIN/MIN·좌우8px/상하16px·gap24px이며 children이 없습니다.
943px는977−Header34의 샘플 잔여 높이입니다. 인스턴스 높이를 조정하면 본문이 FILL하는 설명과 구조를 보존하되
977px 고정·빈 content를 실제 renderer·로딩·오류·스크롤 상태로 일반화하지 않습니다.

긴 제목·type·번역·모바일·줄바꿈·버튼과 겹침 방지·본문 overflow는 제품 정책으로 추가 검증합니다.
show type/expand/close의 전체8조합, 확대 화면·focus·disabled/loading·dark·전환 모션·가변 본문은 이 한 샘플에서 측정하지 않았습니다.

## 사용자 채택: 본문 viewport

[새 채택](../../motion.md)은 header34px와 본문 padding16/8·bottom16·LRbottom1px 선을 유지합니다.
본문 안에 실제 ScrollArea를 한 번 연결하고 viewport의 남은 높이를 FILL합니다. content/renderer의 기존 viewport와 중첩하지 않습니다.
기본 비교 높이977px와 제품 height/maxHeight를 구분하며 소비 데모의560/확대720px를 원본 수치로 기록하지 않습니다.
AH thumb4px/#DDD/gutter11px는 overlay이며 별도의 공용 wrapper border·radius8·padding16을 덧붙이지 않습니다.
