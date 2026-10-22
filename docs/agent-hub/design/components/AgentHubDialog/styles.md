# AgentHubDialog — 수치·색상과 공용 비교

[실측](../../references/dialog.figma.json)과 [변수](../../references/dialog.variables.figma.json)의 Light 샘플을 기준으로 합니다.
수치는 제품 token에 연결하며 미제공 dark·mobile·disabled 전체 화면을 확인한 상태로 확대하지 않습니다.

| 항목 | 공용 추출 baseline | 이번 Agent Hub recipe |
| --- | --- | --- |
| 표면 | 흰색, r8, #DDD1px | #F6F7F9, r16. 예약 root 선 없음 / Finder root #EEE1px INSIDE |
| 폭 | 기본580, small400, large720, xlarge920 | 예약580 / Finder1296 샘플. 공용 xlarge 값을 바꾸지 않음 |
| 높이 | viewport 제한·본문 scroll | 예약 HUG554 / Finder FIXED800 샘플. 실제 viewport 제한은 제품 adapter |
| 제목 |20/24·600 | Pretendard24/32·600·#1C1C1C |
| header | px24·pt24·pb18 | 예약 px24·pt24·pb16=72 / Finder px24·pt24·pb12=68 |
| 닫기 | 읽기 전용 CMP는32/glyph20 | 두 시안은32/r4/glyph24·선1.5px·inset4. AHIconButton32/r6/glyph20과 별도 |
| footer | p24·gap8·우측 정렬, 기본 Button32 | 예약은 같은 배치에40/r8/font16/24·600. Finder 없음 |
| 그림자 | Overlay | 같은 Overlay 두 겹. 추가 강화하지 않음 |

Overlay는 `0 0 1px 0 rgba(9,30,66,.31)`과 `0 8px 12px 0 rgba(9,30,66,.15)`입니다.
둘을 root에 한 번만 적용하고 header/body별 그림자나 filter 그림자를 겹치지 않습니다.
선·그림자 없는 배경 scrim은 이 두 frame 밖의 미측정 영역입니다. 실제 모달 엔진의 overlay 계약으로 연결합니다.

## 선과 layout의 차이

두 root의 clipping은 true입니다. 예약 root에는 strokeWeight1 메타데이터가 있어도 실제 strokes는 비어 있으므로 선을 만들지 않습니다.
Finder root의 #EEE1px 선은 `strokesIncludedInLayout=false`입니다. 실제 header/body가 x0/y0부터 전체 폭을 쓰므로
CSS border로 안쪽 폭·위치를 줄이지 말고 기존 inside 선 adapter 또는 별도 장식 레이어로 표현합니다.
예약 header도 bottomWeight1만 저장돼 있고 strokes가 없어 구분선이 없습니다.
Finder header는 실제 하단 #DDD1px 선이 있고 layout에는 포함되지 않습니다.

## 예약 작업 편집

| 영역 | 실제 geometry·스타일 |
| --- | --- |
| 본문 |580×394, content px24, 내부532, 세로 gap24 |
| 이름 |532×64, label20 + gap4 + field40. field r8·white·#DDD1px·px12·14/20 regular |
| 지침 | y88,532×164, label20 + gap4 + textarea140. inner r8·white·#DDD1px·px12py8 |
| textarea toolbar | inner x0/y103,532×37, pX8/pY4, top #EEE1px layout 포함, #F4F4F4 |
| toolbar actions | ghost28 세 개, 실제 폭98/98/77, r4·gap4·12/16·600, 보이는 leading/trailing glyph16 |
| 모델 표시 |120×28 FRAME, p8/4·gap4, logo20 + Qwen3.8 샘플14/20 regular + chevron16 |
| 빈도 | y276,532×74. label20 + gap4 + card50 |
| 빈도 card | r12·white·#DDD1px layout 포함·p12, 실제 row x13/y13·506×24 |
| 빈도 버튼 | ghost24,14/20 regular. ‘매시간’은 샘플이며 실제 주기 정책이 아님 |
| 고급 | y374,20px 행,14/20·600 + up16. 추가 본문·토글 상태 미제공 |
| footer | y466,580×88,p24·gap8·우측 정렬, 취소60×40 + 저장하기88×40 |
| 저장 | 실제 disabled primary40, #99C2FF·white. 비활성 이유는 미확인 |
| scrollbar | legacy11×180, x569/y0, thumb4×160·x3/y3·r8·opaque #DDD |

Toolbar의 content y5는 위 선1 + padding4입니다. 저장된 SPACE_BETWEEN의 itemSpacing329를 실제 gap329로 더하지 않습니다.
빈도 card는 선을 layout에 포함하므로50=24+24+2입니다. 반면 footer Button의 선은 layout 밖 INSIDE 표현이라
취소60=label28+32, 저장88=label56+32이며 선2px를 추가하지 않습니다.
count wrapper31×20은 존재하지만 실제 `0/100`은 숨겨져 있습니다. resize·info·시간 두 번째 행·inner textarea scrollbar·body fade도 숨김입니다.

## 에이전트 찾기

| 영역 | 실제 geometry·스타일 |
| --- | --- |
| body | y68,1296×732, rail192 + content1104 |
| rail | pL16/R8/T24/B16, gap20, 우측 #DDD1px. 행168×32/r6·pL12/R8/Y6·gap12 |
| rail text | label14/20·500·#1C1C1C, count12/16·400·#757575 |
| 선택처럼 보이는 행 | ‘최근 사용’의 black alpha.1 표면만 확인. 실제 선택 상태 enum은 없음 |
| content | px24/py24·gap24, clipping true, 실제 overflowDirection NONE |
| Search |1064×48 FIXED, r8·#3B82F6 2px·white, focused/filtered=false |
| 결과 |1056×914, content 내부 y96. header142×24 + gap12 + 카드 행들 |
| 카드 행 |1056×166,3×344 + 2×12. 다섯 행의 y36/214/392/570/748은 결과 section 기준 |
| 카드 |15개 default,344×166/r24/p16, #DDD1px layout 포함. 내부 x17/y17 |
| 설명 |310×40, maxHeight40,14/20 regular·#555, HEIGHT/ENDING/maxLines null |
| fade | RECTANGLE1137×48, content x−19/y684. #F6F7F9 alpha0→1,69.230771%에서 opaque |
| scrollbar |11×180, body x1285/y8, thumb4×160·x3/y3·r9999·opaque #DDD |

Search는 우측 inset16, 카드 행은24입니다. 실제 fixed1064와 rows1056을 같은 폭으로 정규화하지 않습니다.
카드 설명은40px 최대 높이를 가진 표본이며 제한 없는 HUG나 새 maxLines2로 기록하지 않습니다.
fade는 실제 gradient paint입니다. 생성 코드의 PNG처럼 런타임 이미지를 요구하지 않습니다.
장식 fade와 scrollbar160/180은 정적 실측이며 실제 scroll 가능 여부·thumb 비율·끝 지점 공식이 아닙니다.
