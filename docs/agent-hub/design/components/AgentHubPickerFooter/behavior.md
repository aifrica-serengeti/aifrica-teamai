# AgentHubPickerFooter — 안내와 동작

↑/↓ 이동과 Enter 선택 안내는 현재 Picker가 제공하는 키보드 조작을 설명합니다.
실제 활성 항목·선택·쿼리·결과·중복 실행·입력 focus는 Picker와 제품 상태 owner가 관리합니다.
Footer에서 독립 전역 keydown을 등록하거나 같은 Enter를 다시 처리하지 않습니다.
검색 입력의 IME 조합·텍스트 편집·Picker 열림 상태·목록 경계 처리는 Picker의 하나의 키보드 정책에 연결합니다.

keycap은 누르는 버튼이 아니라 표시용 `<kbd>`입니다. 화살표 모양에 click handler나 별도 선택 상태를 붙이지 않습니다.
hint가 나타난다는 사실만으로 실제 방향키 탐색 구현이 완료됐다고 선언하지 않습니다.
실제 제품이 안내와 다른 조작을 채택하면 안내 문구도 함께 맞추고 근거를 기록합니다.

“에이전트 찾기”는 목적지 route가 있으면 native link, 현재 화면에서 명령을 실행하면 native button으로 연결합니다.
Figma의 footer-link FRAME만으로 URL·새 창·검색 팝업·이동 후 focus를 정하지 않습니다.
한 host와 한 활성화 경로를 유지하고 label·glyph에 중복 click handler를 달지 않습니다.
Button과 TextButton의 원본 인스턴스가 없으므로 해당 컴포넌트의 다른 크기·스타일을 자동 적용하지 않습니다.

링크 부재 예시는 자리를 비워 두거나 투명한 tab stop을 남기는 계약이 아닙니다.
제품이 `showLink=false`를 선택하면 동작 host와 label·glyph를 렌더하지 않습니다.
showLink는 제안 API이며 root Figma Boolean이나 측정한 disabled 상태가 아닙니다.

하단 고정 footer를 쓸 때는 리스트가 끝 항목까지 실제로 스크롤되고 focus 항목이 footer보다 위에 보이도록 합니다.
레이아웃이 바뀌어 footer 높이가 늘어나면 확보 공간도 함께 바꿉니다.39px는 현재 한 줄 기준이며 다른 높이를 확인한 것은 아닙니다.
Footer 자체에 라우팅·목록 스크롤·선택 상태의 별도 복제 owner를 만들지 않습니다.
