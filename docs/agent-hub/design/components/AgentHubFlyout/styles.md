# AgentHubFlyout 스타일

[실측](../../references/flyout.figma.json)은 정적인 Light layout입니다.
샘플 viewport와 실제 제품의 scroll 구현은 구분합니다.

| 항목 | Shell |
| --- | --- |
| 폭·높이 |280×398 고정, maxHeight398 |
| radius |12, radius/surface-sm |
| 표면·선 |white·1px #DDD INSIDE |
| padding·gap |상하4·좌우0·gap0, border 포함 |
| shadow |[Elevation Mid](../../foundations/Elevation.md)의 동일 style ID·두 navy 효과 |
| clipping / overflowDirection |true / NONE |
| 내부 폭 |278 |

Mid는 `0 0 1px rgba(9,30,66,.31), 0 4px 6px rgba(9,30,66,.15)`의 원본 순서입니다.
shell opacity는1이며 foundation 예시 opacity를 곱하지 않습니다.

| 부분 | 실제 위치·치수 | 원본 대비 |
| --- | --- | --- |
| Header |x1/y5,278×54 |폭FILL·title/count/meta 문자열 override |
| items |x1/y59,278×317 |divider9+11행×28, clip=true |
| Scrollbar |items 안 x267/y8,11×95 |실제 source180 높이에서95로 조정 |
| Footer |x1/y365,278×33 |원본280×29/pb4/no-fill →pb8/white/absolute |

Footer는 y365..398로 items y59..376의 마지막11px을 가립니다.
이 겹침·잘림을 내용 삭제나 스크롤 완료 규격으로 사용하지 않습니다.
제품에서는 header/footer를 실제 높이로 확보하고 `min-height:0`인 body에 기존 ScrollArea를 연결해
마지막 항목·focus outline을 노출하세요. viewport 보정 범위와 시각 결과를 제품 채택 문서에 남깁니다.
footer를 숨긴 별도 화면은 미제공이므로 높이·여백·스크롤도 추가 검증합니다.

채택 runtime에서는 기존 ScrollArea를 body에만 재사용합니다. Header/Footer를 그 viewport 안에 넣지 않고,
[AgentHubScrollbar](../AgentHubScrollbar/README.md)의 thumb4px·gutter11px를 이 적용처에 명시적으로 연결합니다.
원본 source2019:3708 기록은 그대로 보존하고 새로운 source 인스턴스를 측정한 것으로 바꾸지 않습니다.
기능 엔진의 기본 content padding16px는 제거하고 body에는 행 padding만 남깁니다.
아래의9px 구분 영역은 고정 Header가 소유하며 스크롤 content 안에는 divider를 렌더하지 않습니다.
엔진이 gutter11px를 별도로 예약하면 행 가용 폭은 원본278px에서267px가 됩니다.
이는 runtime 스크롤바 채택 차이이며 header/footer의278px 폭이나 원본 측정값은 바꾸지 않습니다.

## 고정 Header 구분선 채택

원본 JSON의 Header54·items 첫 divider9는 정적 측정값으로 보존합니다.
후속 사용자 요청으로 runtime에서는 Header의 내용54px 뒤에 **4px + 선1px #DDD + 4px**를 붙입니다.
standalone Header는 기본 `withDivider:false`로54px을 유지하고, shell은 `withDivider:true`로 총63px을 확보합니다.
이9px은 Header의 추가 bottom padding과 장식 pseudo-element로 구성하여 세로 flex gap2를 한 번 더 만들지 않습니다.

280×398 비교에서 CSS border1을 쓰면 상단 padding4로 Header y5/내용높이54를 유지합니다.
Footer 자체의 p8·33px는 바꾸지 않고 shell bottom padding을0으로, shell Footer의 bottom margin을−1px로 연결하면
Header와 구분 영역은 y5..68의63px, body는 y68..365의297px viewport가 되고 Footer y365..398이 유지됩니다.
구분선은 Header 상대 y58..59, shell 상대 y63..64에 고정됩니다. 위·중간·끝까지 목록을 스크롤해도 좌표가 변하지 않아야 합니다.
원본의317px HUG 목록과 다른297px는 고정 구분 영역을 확보하고 footer가 끝 행을 가리지 않게 한 runtime viewport입니다.
일반 흐름에 bottom4와 border1을 모두 예약해 Footer를5px 위로 당기거나 하단에 추가 공백을 남기지 않습니다.
문구가 여러 줄이면 Header/Footer의 HUG 증가분만큼 body 가용 높이를 줄입니다. 내용54/33px로 자르거나 구분선 여백을 줄이지 않습니다.

## 행과 글꼴

[Item](../AgentHubFlyoutItem/styles.md)은 높이28·font12/16/400·radius0입니다.
item px8, folder/folder-open은 L8/R16, child는 L56/R16입니다.
hover#F8F8F8, item pressed는 검정10% opacity, selected는#EBF3FF이며 라벨은#1C1C1C를 유지합니다.
pressed를 Menu의#F4F4F4로 바꾸거나 selected를 자동으로 pressed 상태로 취급하지 않습니다.
child meta는#3B82F6의 표시 문구이며 링크 스타일이라는 뜻이 아닙니다.

file-text source20을16px로 재정의한 [전용 glyph](../../assets/flyout/file-text-16.svg)는 선1.25px·#757575입니다.
20→16 배율 .8을 선 두께로 적용하지 않습니다. 펼침 chevron은16px·선1·#1C1C1C입니다.
숨김5행은 같은 gray 결과를 외부 semantic alias로 연결한 차이도 보존했습니다. alias ID가 같다고 주장하지 않습니다.

원본280×398을 모든 화면에서 강제하지 않습니다. 긴 label·meta·번역·협소 viewport는 제품 token·크기 정책으로 검증합니다.
다크·disabled/loading/focus 및 미제공 kind/state 조합의 시각은 새로 확인한 계약으로 추가합니다.
