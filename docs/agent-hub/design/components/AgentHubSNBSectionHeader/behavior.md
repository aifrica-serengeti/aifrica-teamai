# AgentHubSNBSectionHeader — 펼침과 명령의 책임

후속 채택에 따라 title-group 내부의 제목과20px toggle 박스 사이만2px 띄웁니다.
원본 gap0과 구분하며 gap이 toggle의 hit area·native 동작·heading 의미나 외부 actions 배치를 바꾸지 않게 합니다.

섹션 목록·제목·콘텐츠 ID·펼침값·필터·추가·이동·권한은 Panel 또는 호출한 화면 owner가 관리합니다.
Header 내부에 별도의 목록·요청·route·collapsed 상태를 복제하지 않습니다.
원본 state enabled/hovered는 시각 구성이고 실제 펼침값과 독립입니다.

접기를 채택하면 명시적 expanded 값과 제어 대상에 연결합니다. native button의 click 한 경로에서
다음 expanded 의도를 한 번 요청하며 제목·root·glyph·추가 keydown에서 재호출하지 않습니다.
보이는 chevron-down만으로 현재 내용이 펼쳐졌거나 자동 접기 동작이 구현됐다고 선언하지 않습니다.
접힘 glyph·애니메이션·접은 뒤 focus 정책은 제품에서 별도 채택합니다.

오른쪽 세 glyph는 각각 별도 명령의 표시입니다. direct/filter/plus 이름에서 목적지·필터 조건·생성 대상을 추정하지 않습니다.
제품이 제공한 접근성 이름과 한 callback 또는 실제 목적지로 연결하고, 보조 명령이 섹션 접기까지 함께 실행되지 않게 합니다.
필터 메뉴나 Dialog를 실제 채택한 경우에만 해당 popup의 열림·닫힘·focus 복귀를 연결합니다.

enabled 원본에는 조작 subtree가 없습니다. 기능을 제공하는 제품이 포인터 hover만으로 조작에 접근하게 구현해서는 안 됩니다.
focus-within·항상 노출·별도 명령 메뉴 등 keyboard/touch 접근 경로를 제품 확장으로 정하고 focus 중 제어를 제거하지 않습니다.
이 추가 경로를 Figma focus/touch 시안이 제공된 것으로 기록하지 않습니다.

비대화형 제목만 필요한 섹션에는 불필요한 Tab·collapsed state·callback을 만들지 않습니다.
조작을 숨기면 읽기/Tab 트리와 빈 slot도 함께 정리하되 현재 focus의 유효 위치를 보존합니다.
요청·권한·pending·실패·공지와 focus 복귀는 해당 명령/Panel owner가 담당합니다.

## 프로젝트 disclosure 채택

[Figma 프로젝트](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62777)의256px/행32·depth2 left36·connector x18을 유지합니다.
제품이 자식 데이터와expanded를 소유하며 Session과 같은 측정height helper(250ms ease)를 사용합니다.
기본 닫힘은 공용 Icon의 closed Folder16 규격, 열림은 원본 snb/folder-16.svg입니다. source를 서로 같은 Figma자산으로 기록하지 않습니다.
원본 down glyph만0↔−90°/200ms 회전하고 leading gap도 함께 접습니다. focus 내부에서 닫으면 trigger로복귀하고 즉시inert처리합니다.
행·레일·보조 버튼은200ms 색상전환을 계승하고 disabled 기능차단은즉시입니다.
