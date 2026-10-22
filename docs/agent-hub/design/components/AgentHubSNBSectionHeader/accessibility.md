# AgentHubSNBSectionHeader — 접근성

- 제목은 실제 섹션을 식별하는 텍스트이며 heading level·연결 ID는 제품의 문서 구조에 맞춥니다.
  Figma의 state만으로 menuitem·treeitem·listbox 역할을 부여하지 않습니다.
- 접기 기능을 채택한 경우 native button type=button에 실제 이름·aria-expanded·aria-controls를 연결합니다.
  Header 전체 button 안에 보조 button을 넣지 않고 제목·접기·보조 조작을 형제로 구성합니다.
- 보조 버튼은 ‘해당 섹션 필터’처럼 실제 대상을 식별하는 이름을 제공합니다. direct/plus라는 glyph 파일명을 이름으로 사용하지 않습니다.
  실제 이동이면 유효한 link, 실제 명령이면 button 한 host를 사용합니다.
- 모든 조작은 native keyboard로 한 번 실행합니다. Enter/Space keydown과 click·wrapper callback을 중복 연결하지 않습니다.
- hovered에서만 제공된 조작도 실제 제품에서는 keyboard/touch로 접근할 수 있어야 합니다.
  focus-within 노출 등은 제품 확장으로 검증하고 focus된 버튼이 hover 해제와 함께 사라지지 않게 합니다.
- 20px 제어 크기는 실측치이며 충분한 hit area·간격·대비·zoom 결과를 뜻하지 않습니다.
  추가 hit area가 필요하면 인접 조작을 가리지 않게 제품에서 검증하며 원본 치수로 기록하지 않습니다.
- 원본에 focus/disabled가 없어도 실제 focus-visible과 입력 guard를 유지합니다.
  긴 제목·큰 글자·좁은 폭에서 이름·제어·focus가 가려지지 않는지 확인합니다.
- 장식 glyph는 접근성 트리에서 숨기고 텍스트 이름을 보존합니다. popup을 채택했을 때만 해당 관계와 복귀를 연결합니다.
- 접힌 본문 안에 focus가 남지 않게 하고, 명령 후 콘텐츠가 제거되면 Panel owner가 유효한 위치를 정합니다.
  모든 Header를 자동 live region으로 만들지 않습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/IconButton/accessibility.md`의 관련 의미를 함께 확인합니다.
정적 두 구성과 source 이름은 실제 키보드·펼침·필터·navigation 검증 결과가 아닙니다.
