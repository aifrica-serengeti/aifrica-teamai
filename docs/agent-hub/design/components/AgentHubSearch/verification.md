# AgentHubSearch — 검증

Figma의48/32px·12개 실제 variant, 표시/숨김 참조와 정확한 glyph 원본을 확인했습니다.
실제 Agent Hub 앱 source/export·검색 동작·브라우저 렌더링은 아직 미검증입니다.

- 48px은radius8·px12·search20/선1.25·gap8·font16/24/400, 32px은radius6·px8·search16/선1·gap4·font14/20/400인지 비교합니다.
  공용 Search의radius4·leading16/선2·clear16 규격을 그대로 적용하지 않습니다.
- enabled border1 #DDDDDD, focus/typing 시각border2 #3B82F6, white 배경·placeholder #8F8F8F·입력 #1C1C1C를 확인합니다.
  disabled는 #F8F8F8·placeholder/돋보기 #757575이고 실제 입력 값에 안내문이 들어가지 않아야 합니다.
- 모든 확인 요소는 shadow가 없습니다. Figma INSIDE border를 실제 border1+inset 등으로 연결해 입력 높이·leading 위치가
  focus 전후 흔들리지 않는지 검사합니다. native caret 외의 사각형·caret 뒤4px 추가 padding이 생기지 않게 합니다.
- clear는20px 원형·radius9999·p2·검정5% 배경·x/16·선1·#1C1C1C인지 확인합니다.
  공용 clear의16px 회색 원·흰 X나 원형 첨부 IconButton32로 대체하지 않습니다.
- filter 강조는24/20px·radius4·glyph16/선1·#EBF3FF/#3B82F6입니다.
  filtered=false의8개 frame은 Boolean filter에 숨김 참조, filtered=true의4개는 보이며 그 참조가 없는지 구분합니다.
  부모 숨김 아래 자식visible=true와 저장된 trailing 폭을 실제 표시로 오인하지 않습니다.
- 실제 Filter 노출과 clear가 함께 있는 배치는 제품에서 확인합니다. root 샘플 폭1064/506px·itemSpacing189px를 고정하지 않고
  실제 입력 영역과 보이는 조작만 공간을 차지하도록 합니다. 긴 입력·좁은 폭·확대·번역에서 겹침을 검사합니다.
- 기존 manifest의 search/20·search/16·x/16·filter/16 원본ID·파일·실제 크기·선을 대조합니다.
  현재 원본의 clear/filter 바깥은 FRAME이므로 독립 IconButton 인스턴스 일치로 표시하지 않습니다.
- 실제 값의 입력/변경·controlled/uncontrolled clear·input focus 복귀·disabled/read-only 차단·label·Tab·Enter/Space를 검증합니다.
  필터 적용·열림·입력 focus가 분리되고 색 외 상태 설명이 있는지 확인합니다.
- 검색 실행이 있는 제품은 IME·Enter·debounce·요청/결과 상태를 그 제품 계약에 맞게 확인합니다.
  Figma 속성만으로 검색 API·필터 팝업·지연 시간을 새로 만들지 않습니다.
- filtered+typing/disabled·filled/unfocused·read-only/invalid·dark·clear/filter hover/pressed/focus-visible은 미제공 시각 상태입니다.
  의미·접근성 의무는 유지하고 이번12종의 검증 범위를 확대하지 않습니다.
- 실제 source/public export를 확인한 후에만 제품 로컬 매핑에 implemented로 기록합니다.

공용 원본에서는 `npm run verify`·`npm test`로 문서 탐색·registry·자산 참조·솔루션 격리를 확인합니다.
실제 제품의 스타일·동작 검사는 해당 제품에서 수행합니다.

입력 primitive의 container focus 모드를 연결한 뒤48/32px에서 Tab·클릭·clear 후 복귀를 확인합니다.
안쪽 직사각형과 바깥 경계가 중복되지 않고 실제 input 시작점·외곽 높이가 변하지 않아야 합니다.
read-only는 복사·Tab이 가능하면서 활성 경계·clear 변경이 없고, clear는 tabIndex=-1 및 programmatic focus의2px outline/offset2px를 유지합니다.
필터는 별도 Tab/키보드 경로를 유지합니다. 전역 focus를 제거해 다른 컨트롤의 focus가 사라지지 않게 검사합니다.
