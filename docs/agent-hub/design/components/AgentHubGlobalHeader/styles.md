# AgentHubGlobalHeader — 치수와 색상

아래는 Light 단일 샘플의 실측입니다. 상세 원본과 변수 alias는 [실측](../../references/global-header.figma.json)과
[변수](../../references/global-header.variables.figma.json)에 보존합니다.774px를 모든 화면 폭으로 고정하지 않습니다.

| 영역 | 실측 |
| --- | --- |
| root |774×43, HORIZONTAL/FIXED/FIXED, px16·py0, SPACE_BETWEEN/CENTER, 저장된 gap8·NO_WRAP |
| root 표면 | `#F6F7F9`(`color/surface/blue-gray`), r0, opacity1, `strokes=[]`, `effects=[]` |
| root 경계 | `clipsContent=true`, overflowDirection=NONE, strokesIncludedInLayout=false |
| service-logo | x16/y10.64606761932373,138×21.70786476135254, 고정 FRAME·clipsContent=false |
| actions | x582/y5.5,176×32, HUG/HUG, 가로 gap8·세로 CENTER |
| shortcut | actions 안 x0/y4,136×24, HUG/FIXED, px8·py4·gap4·r4 |
| shortcut 표면 | 흰색 tertiary-fill·`#DDD` tertiary-border1px INSIDE, strokesIncludedInLayout=false, shadow 없음 |
| shortcut 내부 | mark16×16 x8/y4, label100×16 x28/y4·Pretendard SemiBold12/16/600·자간0·`#1C1C1C` |
| 알림 | actions 안 x144/y0,32×32·r6·투명·선/효과 없음, bell20×20 x6/y6 |
| bell | `#1C1C1C`·실제 stroke1.25·ROUND cap/join.20px 자산의 geometry를 유지 |

root의 `strokeBottomWeight=1`은 메타데이터이며 실제 strokes가 비어 있습니다. 하단1px 선을 새로 그리지 않습니다.
root의 두 표시 자식 layout 박스 사이 공간은 샘플에서428px입니다. 로고 텍스트의 넘침은 이 박스 간격과 별도로 봅니다.
SPACE_BETWEEN을 gap8만 있는 고정 조합으로 바꾸지 않습니다.
shortcut의 inside 선은 content 크기에2px를 더하지 않으므로136=8+16+4+100+8, 높이24=4+16+4입니다.

## 로고의 박스와 보이는 범위를 구분합니다

심볼은21.70786476135254 square이고 service-name은 로고 내부 x27.91015625/y1.55078125의154×19 TEXT입니다.
따라서 텍스트 오른쪽은181.91015625px이며138px 박스를43.91015625px 넘습니다. service-logo는 이 넘침을 자르지 않습니다.
로고의 layout 폭을 자동 HUG181.91015625로 바꾸면 샘플의 원본 배치와 다릅니다.

`Cheetah `의 문자 범위0..8은 Poppins SemiBold600, `Agent Hub`의8..17은 Poppins Regular400입니다.
두 범위 모두 font-size15.50561809539795px·line-height18.606740951538086px·자간0·`#1C1C1C`입니다.
TEXT의 단일 fontWeight로 두 범위를 합치거나 Pretendard로 대체하지 않습니다. 원형 심볼은 `#0066FF`, 얼굴은 흰색이며 실제 stroke는 없습니다.

[전용 자산 기록](../../assets/global-header/manifest.json)은 로고 심볼·바로가기 심볼·bell의 원본 SVG3개만 포함합니다.
로고 심볼의 공급 SVG는21.7079 square이고 실측 layout slot은21.70786476135254 square입니다.
바로가기 심볼의 slot은16×16이지만 공급 SVG의 width/viewBox는16.002×16이고 내부 vector x=-0.001953125입니다.
SVG 원본 수치와 bytes를16으로 고쳐 저장하지 않습니다.16px slot에 표시하는 adapter는 제품에서 따로 검증합니다.
서비스명과 바로가기 label은 SVG에 포함되지 않은 형제 TEXT입니다. 기존 메인 BrandMark PNG나 SNB glyph로 대체하지 않습니다.

공용을 켰을 때 Button·Link·IconButton의 의미와 focus 계약은 유지합니다. 시각은 이 헤더에만 연결하고
공용 PageHeader의 p24·제목24/32나 CMP GlobalHeader의 높이48/56·하단선·SNB geometry를 가져오지 않습니다.
기존 버튼과 크기나 기본색이 일부 비슷해도 actual source와 모든 상태가 같다는 증거는 아닙니다.
협소 폭에서 로고 넘침과 action이 충돌하지 않도록 하는 최소 폭·재배치·문구 정책은 제품 제안으로 별도 검증합니다.
hover·pressed·focus 시각, disabled·dark·다른 언어 label의 폭은 이 원본에서 실측되지 않았습니다.
