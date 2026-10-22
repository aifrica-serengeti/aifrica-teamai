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

top73·바깥 px16/py24·gap16·오른쪽 선은 유지하며, 남은 높이의 목록에 [AgentHubScrollbar](../AgentHubScrollbar/styles.md)를 연결합니다.
thumb4px/gutter11px/inset3px/radius9999/불투명 #DDD를 사용하고 native thin scrollbar는 숨깁니다.
실제 viewport 한 곳만 scroll owner이며 목록만 이동하고 top 영역은 고정됩니다. gutter 공간은 항상 예약하여 노출에 따라 행 폭이 움직이지 않게 합니다.
노출은 패널 hover·스크롤 영역 focus-within·thumb drag 중에200ms opacity로 표시합니다. coarse pointer에서는 상시 노출합니다.
overflow가 없으면 thumb를 만들지 않습니다. 이는 사용자 요청과 공용 기능을 연결한 runtime 채택이며 원본의 정적 fade/clip을 수정한 실측이 아닙니다.
