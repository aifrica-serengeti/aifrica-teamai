# AgentHubChatHeader — 치수와 색상

아래 값은 기본 COMPONENT의 [실측](../../references/chat-header.figma.json)의 Light 단일 구성입니다.
변수 alias와 icon 모드는 [변수 기록](../../references/chat-header.variables.figma.json)을 함께 확인합니다.

| 영역 | 실측 |
| --- | --- |
| root |640×48, HORIZONTAL/FIXED/FIXED, px16·py0, SPACE_BETWEEN/CENTER, 저장 gap4·NO_WRAP |
| root 표면·선 | 불투명 흰색 `color/surface/default`, r0, 하단만1px INSIDE `#DDD`·strokesIncludedInLayout=true |
| root 기타 | opacity1, clipsContent=false, overflowDirection=NONE, BACKGROUND_BLUR radius11.5 |
| Breadcrumb | x16/y11.5,88×24 HUG 샘플, 실제 선·배경·효과 없음 |
| 현재 TEXT | Pretendard Regular16/24/400·자간0·`#1C1C1C`, 가로/세로 CENTER, truncation DISABLED |
| actions | x544/y11.5,80×24 HUG, 가로 gap4·세로 CENTER·표면 없음 |
| 버튼3개 |24×24·r4·padding0·ghost/default·투명·실제 선/효과 없음 |
| 버튼 위치 | actions 안 x0/28/56·y0 |
| glyph3개 |16×16·x4/y4, 실제 `#1C1C1C`·stroke1px ROUND |
| indicator | x0/y47,325×1, ABSOLUTE·좌측 MIN/하단 MAX, r0·실제 stroke/효과 없음 |

하단선이 레이아웃을 차지하므로 root 내부 세로 공간은47px이며24px 요소의 중앙 y는 `(47-24)/2=11.5`입니다.
선을 무시해 y12로 옮기거나 높이49px를 만들지 않습니다. 내부 Breadcrumb와 버튼의 strokeWeight 메타데이터는 실제 테두리가 아닙니다.
샘플에서 Breadcrumb 박스와 actions 사이 공간은440px입니다. SPACE_BETWEEN을 gap4만 있는 고정 조합으로 바꾸지 않습니다.

## Indicator와 하단선의 위치

indicator의 수평 그라데이션은 다음 네 stop과 identity gradientTransform으로 구성됩니다.

| stop | 색상·alpha |
| --- | --- |
|0 | `#45C4D6`·0 |
|0.35576921701431274 | `#45C4D6`·1 |
|0.7115384340286255 | `#9F83EF`·1 |
|1 | `#9F83EF`·0 |

CSS border-box48px·하단 border1px를 사용하는 adapter에서는 indicator를 `bottom:-1px`에 놓아 source y47의 선 행을 재현합니다.
`bottom:0`이면 내부 y46으로 올라갑니다. indicator는 overlay이므로 추가 border·layout 높이·pointer hit area를 만들지 않습니다.
325px는 원본의 고정 샘플 폭이며 전체 폭의50%·실제 진행률·애니메이션 구간으로 해석하지 않습니다.
가변 폭에서의 길이와 충돌 대응은 제품에서 확인하고 별도 adapter로 검증합니다.

## Blur와 기존 계약

Plugin API 원본 effect는 BACKGROUND_BLUR radius11.5입니다. 생성 코드의 `backdrop-filter:blur(5.75px)`는 별도의 변환 참고값이며
두 값의 browser 시각 등가를 검증한 결과는 아닙니다. blur를 보이게 하려고 실제 불투명 흰색 배경을 반투명으로 바꾸거나 box-shadow를 추가하지 않습니다.

버튼의 hit area·hover/pressed/disabled·키보드 focus는 [AgentHubIconButton](../AgentHubIconButton/README.md)의 채택한 adapter가 소유합니다.
이 원본에서 확인한 버튼 상태는 default이며 세 glyph의 모든 상태·헤더 dark·loading·협소 폭을 검증한 것은 아닙니다.
현재 항목의16/24 글꼴과 의미는 [AgentHubBreadcrumb](../AgentHubBreadcrumb/README.md)을 유지합니다.
PageHeader의 제목24/32·p24나 GlobalHeader/CMP Header의 브랜드·계정·SNB 구조를 가져오지 않습니다.


## 생각 중 예시의 범위

[추가 실측](../../references/chat-progress.figma.json)의 header1560×48에서도 같은 y47·325×1·4stop·선·blur를 유지합니다.
제목169px와 actions52px는 문구 대체·pause=false에 따른 HUG 결과입니다.
협소 폭 clamp·이동 거리·1800ms 등은 [motion 제안](./motion.md)이며 이 스타일 표의 Figma 수치로 합치지 않습니다.
