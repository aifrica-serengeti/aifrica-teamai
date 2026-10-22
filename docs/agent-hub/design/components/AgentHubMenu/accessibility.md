# AgentHubMenu 접근성

명령 메뉴의 역할과 focus 계약은 공용 Menu를 유지합니다.
공용 채택 시 `DOCS_ROOT/frontend/design/components/Menu/accessibility.md`를 함께 읽습니다.

- 실제 trigger의 이름과 expanded·popup 관계를 primitive에 연결합니다. 일반 div에 클릭만 추가하지 않습니다.
- menu/menuitem과 한 roving focus owner를 유지합니다. 열림 시 focus, ↑/↓·Home/End·Enter,
  Escape 닫기·trigger 복귀를 소비 제품에서 확인합니다. typeahead·서브메뉴 좌우키는 실제 primitive의 지원 범위로 검증합니다.
- disabled를 실제 primitive에 전달해 활성화 경로를 차단합니다. 제목·구분선·숨김 slot은 탐색 target이 아닙니다.
- header는 Group/Label, divider는 Separator로 조립합니다. content 명령 안에 header·separator를 넣어 같은
  접근성 이름·클릭 영역으로 만들지 않습니다. 제목은 실제 그룹에 연결하고 label의 전체 문자열을 보존합니다.
- check는 단순 장식일 때 숨겨 읽고, 실제 checked 값이 있는 메뉴라면 적절한 checkbox/radio primitive가
  checked 의미를 소유하게 합니다. 원본의 표시 Boolean만으로 aria-checked를 발명하지 않습니다.
- glyph16은 장식으로 숨깁니다. icon-only 메뉴를 새로 만들거나 라벨을 임의로 제거하지 않습니다.
  파괴적 의미는 빨강만으로 전달하지 말고 실행 목적이 드러나는 label을 사용합니다.
- radius12와 clipping 안에서 공용 inset2 focus가 보이도록 실제 제품 token·대비를 확인합니다.
  Figma에 focused variant가 없다는 이유로 outline/focus 표현을 제거하지 않습니다.
- scroll viewport가 현재 focus를 노출하고 마지막 항목까지 이동할 수 있어야 합니다.
  숨김 scrollbar 그림이나 overflowDirection=NONE을 키보드 스크롤 완료로 취급하지 않습니다.

검색 input·모델 선택·보조 버튼이 있는 Picker의 focus 모델을 이 메뉴에 섞지 않습니다.
반대로 이 메뉴의 첫 item focus·role menu를 Picker에 자동 적용하지 않습니다.
원본에는 보조 기술·키보드·실제 popup 동작 검증이 없습니다.
