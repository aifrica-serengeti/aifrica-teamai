# AgentHubSNBItem — 수치·상태·gradient

[실측](../../references/snb.figma.json)의 standalone8종 기준입니다. set의 보라색 외곽선은 항목의 선이 아닙니다.

| 영역 | 확인한 값 |
| --- | --- |
| root | 256×32px 샘플, 폭 FIXED/높이 HUG, radius6·opacity1 |
| 배치 | HORIZONTAL·MIN/CENTER·저장 gap12·NO_WRAP |
| padding | 1depth L8/R8/Y6, 2depth L36/R8/Y6 |
| 실제 선·효과 | strokes/effects 없음·clipping false·overflow NONE |
| label-group | x8/y6·81×20(1depth) 또는 x36/y6·57×20(2depth), HUG·gap8 |
| 제목 | Pretendard Regular14/20·400·자간0·#1C1C1C |
| leading glyph | 1depth에서16×16·group 안 x0/y2, 제목 x24/y0 |
| trailing surface | hovered/pressed에서 absolute x220/y6·36×20·left padding16 |
| more control | surface 안 x16/y0·20×20·radius4, glyph16·inset2 |

32=상하6+제목20입니다. 실제 border paint가 없으므로 저장 strokeWeight1·border layout=true로 투명/실선 공간을 추가하지 않습니다.
256px와 제목57px는 비교 샘플입니다. 제목은 WIDTH_AND_HEIGHT·truncation DISABLED·maxLines null이며 원본 ellipsis는 없습니다.
trailing은 absolute여서 root gap12에 참여하지 않습니다. control은 row 오른쪽 끝에 닿고 root paddingRight8을 다시 더하지 않습니다.

| state | row fill | fill alias | title alias |
| --- | --- | --- | --- |
| enabled | 없음(투명) | 없음 | `3081:136` on-item-fill-enabled |
| hovered | #F8F8F8 | `3081:133` item-fill-hovered | `3081:137` on-item-fill-hovered |
| pressed | #F4F4F4 | `3081:134` item-fill-pressed | `3081:138` on-item-fill-pressed |
| selected | #F4F4F4 | `3081:135` item-fill-selected | `3081:139` on-item-fill-selected |

위 ID는 VariableID 접두를 생략한 표기입니다. 전체는 [변수](../../references/snb.variables.figma.json)를 따릅니다.
pressed/selected의 현재 hex와 네 title의#1C가 같아도 alias 역할을 합치거나 pressed를 지속 선택으로 사용하지 않습니다.
blue 선택면·outline·추가 shadow는 이 원본에 없습니다.

## trailing gradient와 glyph

hover surface는 F8, pressed surface는 F4의 gradient입니다. 원본 stop은 position0/0.258928567/1에서 alpha1/.74000001/0이며
변환은 `[[−4.30769253,0,1],[0,−0.54945052,0.77472514]]`(거의0인 부동소수 항 생략)입니다.
단순히36px 전체에서 opacity1→0인 gradient로 다시 그리지 않습니다.
생성 context의 CSS 표현은 **to left, 불투명색76.786%, alpha.74색82.797%, 투명색100%**입니다.
raw stop 위치와 CSS의 화면상 stop 위치가 다른 표현임을 구분하고 실제 render로 맞춥니다.

more는 실제 Vector의 fill/stroke #757575·선1·round cap/join입니다.
leading folder는 #1C1C1C·실제 선1·round입니다. source wrapper의 소수 strokeWeight를 glyph 선으로 쓰지 않습니다.
[자산 기록](../../references/snb.assets.json)의 실제 제공 SVG를 연결하며 glyph 경로/색을 임의 제작하지 않습니다.
[folder16](../../assets/snb/folder-16.svg)·[more16](../../assets/snb/more-16.svg)과
1depth pressed의 [FRAME glyph16](../../assets/snb/more-frame-16.svg)을 source 종류에 맞게 연결합니다.
실제 Panel의 chat swap은 [chat16](../../assets/snb/chat-16.svg)이며 standalone folder와 구분합니다.

## 2depth connector와 Panel override

connector는 FRAME 약20×32가 raw x28/y32에서 약180도 회전한 absolute 구조입니다.
내부 line은 약1×32·#DDD이며 실제 constraints는 가로 MIN/세로 STRETCH입니다.
회전을 포함한 가시 범위는 대략 row 왼쪽8~28의20px slot이며1px 선은 가운데 놓입니다.
raw 좌표에 회전을 빼먹거나 이미 반영한 CSS/자산에 다시 회전을 더하지 않습니다. 장식 선이지 Tree 역할의 증거가 아닙니다.

Panel pinned 항목의 hovered source+selected fill·숨김 more·남은 F8 gradient는 별도 실제 override입니다.
standalone selected에 more를 추가하거나 Panel의 F8 gradient를 임의로 F4로 교정하지 않습니다.
긴 문구·focus·keyboard/touch용 action 노출·disabled/dark·모션·다른 depth는 추가 제품 검증 범위입니다.

## 현재 채택: 더보기 주변의 배경 불일치 제거

위36px gradient와 특수 pinned 인스턴스는 원본의 실측·비교 기록입니다. 현재 신규 구현은 사용자 요청에 따라
일반 행의 trailing surface를 투명한20×20px wrapper로 바꾸고 gradient·왼쪽 padding16을 제거합니다.
more가 있는 행은 제목 main에 오른쪽20px를 항상 예약하여 노출 전후 제목과 형제 행이 움직이지 않게 합니다.
버튼은 사용자 요청에 따라 row 오른쪽 끝에서 `right:2px` 안쪽에 배치합니다. 원본의 `right:0` 관찰값은 위에 보존합니다.
이2px는 버튼 slot의 채택 변경이며 행 폭·제목 시작 위치·depth2 padding을 바꾸지 않습니다.
main의 상시20px 예약과 행의 오른쪽8px 안쪽 여유를 함께 적용해 label과 버튼이 겹치지 않게 합니다.
more가 없으면 예약 공간·조작·Tab target을 만들지 않습니다. wrapper가 행과 다른 F8/F4 사각형을 그리지 않게 합니다.

20px/r4 버튼만 자체 hover #EEE·pressed #DDD를 `background-color 200ms ease`로 전환합니다.
행 fill transparent/F8/F4와 selected 우선순위는 유지합니다. 원본의 숨긴 more를 임의로 노출하지 않으며,
특수 pinned의 source·gradient 기록도 덮어쓰지 않습니다. 이 보완은 runtime 채택값이며 원본 gradient 실측 변경이 아닙니다.


## 현재 채택: 말줄임표 대신 끝 흐림

원본 글꼴·색상·높이·glyph·padding과 선택 배경은 유지합니다. 제목만 한 줄 viewport와 원문 레이어로 나눕니다.
`…`를 추가하거나 원문을 자르지 않고, 실제 넘침에서만 오른쪽24px mask를 적용합니다. 이동 중 양끝, 끝에서는 왼쪽만 흐립니다.
mask와 transform은 제목에만 적용해 행 배경·focus ring·아이콘·형제 조작을 가리지 않습니다.
이는 [사용자 채택](../../title-overflow.md)이며 위 Figma 측정값을 덮어쓰지 않습니다.
