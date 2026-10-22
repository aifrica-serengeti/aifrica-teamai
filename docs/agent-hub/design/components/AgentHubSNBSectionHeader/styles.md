# AgentHubSNBSectionHeader — 수치와 색상

[실측](../../references/snb.figma.json)의 두 Light 구성을 기준으로 합니다.
COMPONENT_SET의 보라색 정리용 외곽선은 실제 Header 표면이 아닙니다.

| 영역 | 확인한 값 |
| --- | --- |
| root | 256×20px FIXED/FIXED, HORIZONTAL·SPACE_BETWEEN/CENTER |
| padding·gap | left8/right0/top0/bottom0, 저장 gap10 |
| root 표면 | fill/stroke/effect 없음·radius0·opacity1·clipping false |
| enabled title-group | root 안 x8/y2·65×16px·HUG |
| hovered title-group | x8/y0·85×20px·가로 gap0·HUG |
| 제목 | Pretendard Regular12/16·400·자간0·#656B74 |
| collapse-toggle | 제목 뒤 x65/y0·20×20px·radius4·배경/선 없음 |
| 오른쪽 보조 그룹 | x196/y0·60×20px·ghost20 세 개·gap0 |

제목은 WIDTH_AND_HEIGHT·truncation DISABLED·maxLines null입니다.
65px는 샘플 ‘section-title’ 폭이며 모든 제품 제목을 고정 폭으로 자르지 않습니다.
hovered의 제목은 그룹 안 y2이고 접기 glyph는20px FRAME 안 x2/y2·16×16입니다.
root의 SPACE_BETWEEN이 두 그룹 사이를 분배하므로 저장 gap10을 별도 margin으로 더하지 않습니다.

보조 버튼은 실제 ghost/default/20·radius4·padding2이며 glyph16·inset2입니다.
hovered Header 안에서도 각 버튼 source state는 default입니다. Header hover를 버튼 hovered state로 자동 치환하지 않습니다.
제목은 `color/snb/section-label`(`VariableID:3081:130`), glyph는 `color/snb/section-icon`(`VariableID:3081:131`)에 연결됩니다.
둘의 현재 값은 #656B74로 같아도 역할과 alias identity를 합치지 않습니다.
실제 Vector는 선1px·round cap/join입니다. glyph root의 소수 strokeWeight만 보고 선을 다시 계산하지 않습니다.

[자산 기록](../../references/snb.assets.json)의 chevron/direct/filter/plus16 실제 paint를 연결합니다.
[chevron-down16](../../assets/snb/section-chevron-down-16.svg)·[direct16](../../assets/snb/section-direct-16.svg)·
[filter16](../../assets/snb/section-filter-16.svg)·[plus16](../../assets/snb/section-plus-16.svg)은 모두 이 원본의 #656B74입니다.
일반 #1C 또는 #757575 아이콘 파일을 그대로 대체하거나 외부 SVG img 부모 color만으로 내부 stroke가 바뀐다고 가정하지 않습니다.
Header/접기 제어에 저장된 strokeWeight1은 paints가 비어 있어 실제 border를 만들지 않습니다.

Panel의 제목 override는 같은12/16·#656B74를 유지합니다. 제목 길이·좁은 폭·큰 글자·focus·접힘 표시·
보조 버튼의 독립 hover/pressed·disabled·dark·모션은 제품에서 채택하고 검증할 범위입니다.

## 현재 채택: 제목과 접기 버튼 사이2px

사용자 요청에 따라 제목 HUG 박스와20px toggle 박스 사이를2px 띄웁니다. 위 원본 hovered title-group의 gap0 실측은 보존합니다.
제목 길이·버튼 크기·glyph16px·root20px 높이·왼쪽8px와 오른쪽 actions 배치는 유지합니다.
root의 SPACE_BETWEEN이나 저장 gap10에2px를 더하지 않고 title-group에만 `gap:2px`를 적용합니다.
보조 버튼의 hover/pressed 색상200ms와 down glyph 회전200ms는 공용 계승이며 Figma 실측 모션이 아닙니다.
