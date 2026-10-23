# AgentHubSNBPanel — 배치·paint·잘림

| 영역 | 실제 값 |
| --- | --- |
| root | 288×1033px·FIXED/FIXED·세로 MIN/MIN·gap16 |
| root padding | 좌우16/상하24px |
| 표면·선 | white·오른쪽만1px INSIDE #DDD·border 포함 layout |
| root 외곽 | radius0·opacity1·효과 없음·clipping true·overflowDirection NONE |
| 내부 폭 | 288−32−1=255px |
| top | x16/y24·255×73px·세로 gap16 |
| 새 채팅 wrapper | 폭255px·좌우 padding8·버튼239×40px |
| Divider wrapper | top 안 y56·255×17px·좌우 padding8·실제 Divider239×17px |
| list | x16/y113·255×964px·섹션 사이 gap32 |

오른쪽 선만 layout에 포함되므로 x16/y24에 선1px를 다시 더하지 않습니다. 다른 세 변의 border를 추가하지 않습니다.
행과 header는 원본에서 고정256px여서 부모 내부255px보다1px 넓습니다. 이 실제 차이를 보존해 기록하며 조용히 같은 폭으로 정규화하지 않습니다.
제품에서 폭 FILL로 맞춘다면1px 보정은 구현 adapter의 결정으로 기록하고 시각·focus를 검증합니다.

새 채팅은 primary40·radius8·#3B82F6·실제 stroke/effect 없음입니다. Pretendard SemiBold16/24·600·흰 label ‘새 채팅’과 흰 leading plus20이 gap4로 배치됩니다.
Button 안 leading은 x84.5/y10, label은 x108.5/y8·46×24px 샘플입니다. 버튼239px는 FILL 결과이며 번역 문자열 폭을 고정하지 않습니다.
trailing plus20은 숨김이고 keycap 속성값 true여도40px 자식은 없습니다. 하위 시각은 [AgentHubButton](../AgentHubButton/styles.md)을 따릅니다.
Divider의17px에는 선1px와 위아래8px가 포함됩니다. wrapper의 좌우8px와 Divider의 세로 여백을 서로 중복하지 않습니다.
Top73 =40+16+17이고 다음 list는 추가 gap16 뒤 y113에서 시작합니다.

| 섹션 | list 안 y / 높이 | 구성 |
| --- | --- | --- |
| 고정됨 | 0 /184px | header20 + gap4 + 행32×5 |
| 프로젝트 | 216 /308px | header20 + gap4 + 행32×8 + gap8 + 더보기20 |
| 채팅 | 556 /408px | header20 + gap4 + 행32×12 |

전체 list964 =184+32+308+32+408px입니다. 행끼리의 gap은0입니다.
더보기 FRAME은 높이20·좌우 padding10·표면/선/효과 없음이고 label은14/20·600·#656B74·왼쪽 정렬입니다.
header·행·숨김 조작·connector는 각 하위 계약의 실제 상태와 override를 함께 확인합니다.
특수 고정 행 `2611:62907`의 #F4F4F4와 보이는 #F8 gradient·숨김 more 조합을 일반 hovered/selected 규칙으로 지우지 않습니다.

## 원본의 잘림과 fade

list는 y113..1077로 root1033px를44px 넘습니다. 아래 padding24px까지 확보하면 필요한 용량은 추가68px입니다.
이 잘림을 마지막 행 삭제·키보드 접근 금지·고정 viewport 규격으로 복제하지 않습니다.

fade `2611:62229`는 x−6/y980·303×53px·ABSOLUTE·horizontal STRETCH/vertical MAX인 RECTANGLE입니다.
white alpha0→1 stops와 다음 원본 gradientTransform이 있습니다. 실제 stroke/effect는 없습니다.

```text
[[5.4282847748e-13, 0.4669603407, 0.5330396295],
 [-6.1160163879, 3.7547588194e-14, 3.5580081940]]
```

원본 변환에서 세로 bounds의 alpha는 위쪽 약0.53303963, 아래쪽 약1로 해석됩니다.
`linear-gradient(to bottom,rgba(255,255,255,.53304),#fff)`는 이53px bounds의 **수학적 CSS 변환 제안**이며 원본 CSS 선언이 아닙니다.
투명 stop의 환산 위치는 음수 약−114.15%입니다. 생성 코드의 양수114.15%를 그대로 복사하지 않습니다.
원본 fade는 보이는 단일 정적 상태입니다. runtime에서는 실제 viewport 상태·focus·마지막 행 접근을 기준으로 채택 범위를 검증합니다.
fade가 click·focus를 막지 않도록 pointer-events:none을 연결하고 내용을 가려 읽을 수 없게 만들지 않습니다.
dark·큰 글자·긴 번역·좁은 높이·모션·다른 상태는 별도 제품 검증 범위입니다.

## 현재 채택: 공용 엔진 기반 목록 스크롤

top73·바깥 px16·위 padding24·gap16·오른쪽 선은 유지하며, 남은 높이의 목록에 [AgentHubScrollbar](../AgentHubScrollbar/styles.md)를 연결합니다.
원본 아래 padding24는 아래2026-10-23 채택에 따라 스크롤 콘텐츠 끝으로 옮깁니다.
thumb4px/radius9999/불투명 #DDD를 사용하며 SNB만 gutter27px·track 하단27px를 채택하고 native thin scrollbar는 숨깁니다.
실제 viewport 한 곳만 scroll owner이며 목록만 이동하고 top 영역은 고정됩니다. gutter 공간은 항상 예약하여 노출에 따라 행 폭이 움직이지 않게 합니다.
노출은 패널 hover·스크롤 영역 focus-within·thumb drag 중에200ms opacity로 표시합니다. coarse pointer에서는 상시 노출합니다.
overflow가 없으면 thumb를 만들지 않습니다. 이는 사용자 요청과 공용 기능을 연결한 runtime 채택이며 원본의 정적 fade/clip을 수정한 실측이 아닙니다.

## 2026-10-23 채택: 경계 흐림과 스크롤 끝 여백

[화면 인스턴스3016:108416](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-108416)의
288×1033·top y24/73·list y113/964·하단 fade x−6/y980/303×53은 위 원본과 같습니다.
원본은 하단 장식 한 개이며 상단 장식·실제 overflow 반응·타이밍은 제공하지 않습니다.

| 현재 구현에 적용할 값 | 근거 |
| --- | --- |
| 위·좌우 padding24/16·top73·gap16·목록 시작 y113 유지 | Figma 대조 |
| 하단24px를 바깥 고정 padding에서 스크롤 콘텐츠 끝 padding으로 이동 | 끝 행 접근과 중간 경계 처리를 위한 사용자 채택 |
| 하단 흐림 높이53px·white alpha약.53304→1 | Figma bounds와 기존 수학적 CSS adapter |
| 상단 흐림 높이53px·white1→약.53304 | 하단 표현을 반전한 이번 사용자 채택 |
| 흐림 폭은 목록 영역에서 오른쪽 gutter27px 제외 | thumb 조작을 보존하는 runtime 채택. 원본303px의 단순 복제가 아님 |
| opacity200ms ease·동작 줄이기에서 즉시 | 공용 상태 전환 계승. Figma 모션 실측이 아님 |

1033px fixture에서는 viewport가 y113부터 바닥1033까지920px를 사용하고,
스크롤 콘텐츠는 list964 + 끝 padding24 =988px입니다. 이동 범위는 기존과 같은68px입니다.
끝에 도달하면 마지막 행 아래24px가 드러납니다. 바깥에24px를 다시 더하거나 viewport 높이에서53px를 빼지 않습니다.
흐림은 relative 목록 영역의 top0/bottom0에 절대 배치하고 pointer-events:none·장식으로 처리합니다.
실제 backdrop blur로 글자·thumb를 흐리게 하지 않으며, white gradient로 경계에서 자연스럽게 가립니다.

## 추가 채택: thumb 끝 위치와 콘텐츠 간격

하단24px 빈 공간까지 thumb가 내려가지 않도록 수직 track의 끝은 viewport 하단에서27px 위에 둡니다.
기존 기본 inset3px + 추가 여백24px이며, 콘텐츠의 실제 viewport·scroll range·끝 padding24px는 그대로 유지합니다.
track의 표시 길이뿐 아니라 thumb 크기·이동량·drag 환산도 같은24px를 제외해 계산합니다.
CSS bottom만 늘리고 기존 `clientHeight−6` 계산을 남기는 방식이나 마지막 thumb를 clipping하는 방식은 사용하지 않습니다.

SNB에서만 gutter27px·track right2px·목록 영역의 오른쪽 margin−16px를 채택합니다.
288px 패널의 영역 폭은271px이고 행 폭은244px로 유지합니다. 행 오른쪽과 thumb 사이 간격은21px이며,
thumb 오른쪽 끝과 패널 외곽 경계는3px입니다. 패널의 오른쪽 border1px와 track right2px를 함께 계산한 값입니다.
이전 SNB 채택인 gutter19px·margin−8px·track right4px보다 thumb가 오른쪽10px 이동하며, 기본 gutter11px 배치보다18px 이동합니다.
새 채팅·Divider·항목·더보기의 원래 폭과 x좌표는 바꾸지 않습니다. 흐림도27px gutter를 제외해 기존 행 경계에서 끝납니다.
이는 이번 사용자 이미지에 따른 runtime 보완이며 Figma 원본 root padding16px·목록255px·측정 JSON이나 공용 기본 gutter11px를 변경한 기록이 아닙니다.
다른 Picker·Flyout·Session·Viewer의 gutter와 기본 track inset은 유지합니다.
