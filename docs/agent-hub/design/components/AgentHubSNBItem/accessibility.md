# AgentHubSNBItem — 접근성

- 실제 SNB 목적지 목록은 의미 있는 nav/list와 native link를 기준으로 구성하고 해당 leaf의 현재 경로에만 aria-current를 연결합니다.
  menu-item이라는 Figma 이름 때문에 role=menuitem·treeitem·option을 자동 부여하지 않습니다.
- 하위 목록 펼침은 native disclosure button의 이름·aria-expanded·aria-controls와 실제 콘텐츠를 연결합니다.
  연결할 본문이 없으면 depth/connector만 보고 가짜 펼침 기능을 만들지 않습니다.
- main link/button과 more를 형제로 두고 중첩 interactive element를 만들지 않습니다.
  native Enter/Space·link 동작에 root/key handler의 같은 명령을 중복 추가하지 않습니다.
- more는 대상 항목을 포함한 실제 이름을 제공합니다. popup이 있다면 채택한 전체 keyboard·닫힘·trigger 복귀 계약을 검증합니다.
  glyph 이름과 말줄임 점만으로 메뉴 역할이나 항목 목록을 추정하지 않습니다.
- hover/pressed 전용 기능에도 keyboard/touch로 접근할 수 있게 합니다. focus-within 등은 제품 확장이고 실제 Figma focus 상태가 아닙니다.
  focus가 있는 control을 숨기거나 touch에 포인터 hover를 요구하지 않습니다.
- folder/chat/more glyph·connector·gradient는 장식이며 필요한 이름은 실제 제목/명령이 전달합니다.
  gradient surface가 focus·텍스트·클릭을 가리거나 투명 영역이 입력을 가로막지 않는지 확인합니다.
- 긴 제목·번역·큰 글자·zoom·좁은 폭에서 전체 정보와 조작에 접근할 수 있어야 합니다.
  원본의 HUG/ellipsis 없음과 제품이 채택하는 생략/줄바꿈을 구분하고 hover Tooltip만을 유일한 이름 접근 경로로 사용하지 않습니다.
- disabled는 추가 제품 상태입니다. 실제 link/button의 pointer/keyboard 실행과 명령을 함께 차단하며 색상만 바꾸지 않습니다.
  selected의 F4 면이나 focus 시각을 disabled 표현으로 대신하지 않습니다.
- focus-visible·현재 페이지 설명·목록 갱신 후 유효 위치를 검증합니다. 새 콘텐츠가 와도 읽던 위치나 focus를 임의로 초기화하지 않습니다.
- 20px more·32px row는 실측 geometry이며 hit area·대비·마지막 항목 접근·보조기술 검증을 완료한 값이 아닙니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Link/accessibility.md`와
`DOCS_ROOT/frontend/design/components/Button/accessibility.md`의 관련 의미를 적용합니다.
Tree/Menu를 실제 채택하려면 별도의 전체 의미·keyboard 계약과 제품 검증이 필요합니다.
