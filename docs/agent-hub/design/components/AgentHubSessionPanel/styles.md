# AgentHubSessionPanel — 크기·색상·표면

값은 [실측 스냅샷](../../references/session.figma.json)의 Light 기준입니다.
전체 색상 alias와 노드별 mode는 [변수 기록](../../references/session.variables.figma.json)에 있습니다.

| 영역 | 실측 |
| --- | --- |
| 외곽 | width320, 세로 HUG, radius16 (`radius/surface-md`) |
| 배치 | 세로 flex, px12/py16, 섹션 gap24, border 포함 layout |
| 표면 | `color/surface/blue-gray` #F6F7F9 |
| 선 | `color/border/default-subtle` #EEE, 1px INSIDE |
| 그림자 | Mid: `0 0 1px 0 rgba(9,30,66,.31)`, `0 4px 6px 0 rgba(9,30,66,.15)` |
| 내부 폭 | 320 − 좌우 border2 − px24 =294px |
| 빈 안내 | Pretendard Regular400·14/20·#AAA, px4 |

Mid의 Figma radius1/6은 CSS box-shadow blur1/6 기준입니다.
생성 코드의 drop-shadow filter에 있는.5/3을 box-shadow blur로 그대로 옮기지 않습니다.
공용 Card radius8·padding16/24·선택 shadow 또는 Flyout radius12/height398을 적용하지 않습니다.

## 예약과 기록

예약 섹션 gap4, 내부 items gap8입니다. 예약 행36px 아래 history-wrap은 좌우4px로286px white 카드를 배치합니다.
카드는 radius8, px4/pt12/pb8, header와 목록 gap8, 선·그림자 없음, clipsContent=true입니다.
내부 Header는 ‘기록’12/16·600·#757575와16px toggle, gap2, 좌우8입니다.
이 toggle은 ghost/default/24 원본을 **16×16으로 재정의하고 glyph16을 x0/y0에 유지**합니다.
24px 전체를 축소해 glyph를10.67px로 만들거나 native16 variant가 있다고 기록하지 않습니다.

HistoryItem 목록은278px, gap0, 행32px×5입니다. 첫 행 선택 배경은#EBF3FF이며
standalone의 `color/element/primary-subtle`과 실제 인스턴스의 `color/action/default-selected`는 이름이 다릅니다.
눈에 보이는 두 unread dot는6px·#3B82F6입니다. 숨긴 dot의 색 alias와 실제 표시한 dot의 alias 차이도 snapshot에 남깁니다.

## 진행·출력·컨텍스트

진행 섹션 gap8, 목록 px4로 Step 폭286px입니다. Step32×3 + 마지막20 =116px입니다.
Indicator20·gap8·label14/20, connector12px 공간과 실제1×4px 선을 보존합니다.
done 체크는 white 선.875px, active는 blue 채움과4px 옅은 파란 ring이며 pending의 순번은 별도 텍스트입니다.

출력 섹션 gap4, Item 목록 gap0입니다. Item의 선택 시각·14/20 제목·흰28px icon-box는
[Item 스타일](../AgentHubSessionItem/styles.md)을 따릅니다.

컨텍스트 목록은294px box의 left4 inset 안에 white290×168/radius8/p4 container를 둡니다.
그 안의 ContextItem은282×32이며5행, gap0입니다. label-group66px·12/16 글자와 trailing count를 보존합니다.
출력처럼 왼쪽에28px icon-box를 덧붙이거나 context outer에 오른쪽4px inset까지 추가하지 않습니다.

모든 행의 hover는 반투명 검정5%, pressed는10%입니다. 배경에 따라 보이는 색이 달라지므로
불투명 #F8F8F8/#F4F4F4로 일괄 대체하지 않습니다.

## 자산과 미측정 범위

[전용 자산](../../references/session.assets.json)에17개 byte-distinct SVG와 source/표시 크기/색/해시를 남겼습니다.
20px source에서16px로 재정의한 schedule·file-text·table·code·image·folder는 실제 선1.25px를 유지합니다.
Header chevron은#757575, plus는#1C1C1C입니다. 한 부모 color로 모두 덮어쓰지 않습니다.
임시 Figma URL은 runtime 경로로 사용하지 않고 제품 소유 asset 경로에 연결합니다.

다크·mobile·긴 데이터·disabled/focus·loading/error·접힘 전환 모션은 미측정입니다.
너비 변경과 줄바꿈은 제품의 별도 확장으로 검증하고 원본934/154px에 억지로 맞춰 자르지 않습니다.

## 사용자 채택: bounded viewport와 gap 이동

[새 채택](../../motion.md)은 기존 border·radius·Mid와 내부294px 폭을 유지합니다. 원본 py16은 고정 shell의 위아래12px와 scroll content의 위아래4px로 나눕니다. 좌우12px는 content에만 둡니다.
scrollbar는 원본 AH의4px/#DDD/11px overlay를 연결하며 공용 wrapper의 추가 선·배경·p16을 중복하지 않습니다.
height/maxHeight를 주지 않으면 filled934/empty154px HUG를 유지하고, 제한한 경우 실제 viewport에서 마지막 행까지 접근합니다.
section gap24는 유지합니다. 본문 앞4px·진행 앞8px·기록 목록 앞8px는 animated body 안으로 이동해 닫힘 끝에서 여백이 튀지 않게 합니다.
기본 본문은 실제 측정 높이↔0을250ms ease로 표현하며 934px 전체를 animation의 목표 높이로 고정하지 않습니다.

### 사용자 채택: 둥근 모서리를 피하는 scroll track

스크롤이 생긴 경우 track의 시작과 끝은 **패널 바깥 위·아래 경계에서 각각16px 안쪽**에 둡니다.
radius16의 곡면과 thumb가 겹치지 않도록 이번 요청으로 채택한 조립값이며 Figma의 HUG 원본에 측정된 스크롤 수치가 아닙니다.

- `border1 + 고정 shell12 + 공용 track inset3 = 16px`입니다. ScrollArea 자체를 고정 shell 안에 배치하고 공용 엔진의3px inset·thumb 비율·drag 계산을 함께 사용합니다.
- 실제 viewport 높이는 패널 높이에서 border2와 shell24를 뺀 값입니다. `maxHeight`도 같은26px를 차감합니다. 패널560px일 때 viewport534px, track528px입니다.
- content의 py4와 고정 shell12의 합계는 기존 py16입니다. 첫·마지막 행의 정적 배치와 제한 없는 HUG 높이, 좌우 폭은 바꾸지 않습니다.
- track의 CSS top/bottom만16px로 덮어써 엔진이 계산하는 길이와 어긋나게 만들지 않습니다. 패널 외곽·안쪽 scroll viewport에 추가 radius나 여백을 중복 적용하지 않습니다.
