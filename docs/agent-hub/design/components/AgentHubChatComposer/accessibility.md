# AgentHubChatComposer — 접근성

- native textarea에 실제 label/id 또는 동등한 접근 가능한 이름을 제공합니다. placeholder나 에이전트 제목만으로 입력 이름을 대신하지 않습니다.
- 값·선택·복사·붙여넣기·IME를 보존합니다. Figma의 TEXT나 caret 사각형을 별도의 editable 요소로 중복 렌더링하지 않습니다.
- 첨부·프로젝트 선택은 목적이 있는 native `button type="button"`으로 연결합니다. 전송은 단일 submit 경로의 버튼으로 연결하고
  실제 동작명을 제공합니다. plus·arrow·folder는 장식으로 숨기며 SVG 자체에 focus·click을 만들지 않습니다.
- 모든 조작은 Tab과 해당 native 키보드 동작을 지원합니다. 입력은 후속 사용자 채택에 따라 별도 focus 테두리를 추가하지 않습니다.
  첨부·전송·프로젝트 버튼의 독립 focus 표시는 유지하고 실제 surface·shadow·부모 overflow에서 보이는지 검증합니다.
- 유형 Chip은 정보 표시이고 Divider는 장식입니다. 임의의 삭제·선택 button이나 tab stop을 추가하지 않습니다.
  숨겨진 description은 화면·읽기 순서에 끼워 넣지 않습니다.
- 프로젝트 선택이 실제 팝업을 열면 해당 owner가 expanded/controls·열기·Escape·focus 복원을 관리합니다.
  원본 FRAME 이름만으로 menu·dialog 역할이나 aria-pressed를 부여하지 않습니다.
- Tooltip을 채택하면 한 trigger에 하나만 조합합니다. Tooltip은 버튼 이름을 대신하지 않으며 pending 중에도 동작명을 안정적으로 유지합니다.
- disabled와 read-only는 의미가 다릅니다. 실제 값 변경·조작 차단과 읽기·focus 정책을 기존 제품 계약에 맞게 검증합니다.
- 실패·진행·파일 처리 상태가 있다면 제품의 상태 영역과 연결하고 색상만으로 전달하지 않습니다. 이번 원본에 없는 live region·오류 UI를
  검증된 디자인으로 표시하지 않습니다.

surface 아래 프로젝트 행까지 레이아웃 공간을 확보하고 확대·긴 라벨·좁은 폭에서도 조작과 focus가 가려지지 않게 합니다.
32px 원형 버튼·원본 색상만으로 타깃 크기·대비·보조 기술 통과를 보증하지 않습니다. 실제 앱에서 검증합니다.

[입력 focus 채택](../../motion.md)은 Composer의 안쪽 사각 ring과 바깥 pill ring을 모두 추가하지 않는 한정 예외입니다.
공용 Textarea의 다른 사용처로 확대하지 않으며 입력의 native focus·caret·Tab 진입은 유지합니다.
textarea label/id·ref·읽기/복사·IME는 유지하고 첨부·전송·프로젝트의 별도 focus와 이름을 지우지 않습니다.
