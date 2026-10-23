# AgentHubSessionItem — 접근성

- 기본 단일 action은 native button type=button·Tab·Enter/Space를 유지합니다.
  실제 URL 이동을 채택하는 제품은 의미에 맞는 링크 adapter를 검증하고 자동으로 두 조작을 중첩하지 않습니다.
- 제목의 전체 문자열이 접근성 이름에 남아야 합니다. 시각적 ellipsis로 이름까지 잘라서는 안 됩니다.
  예약 meta가 필요한 설명이면 안정적인 ID로 연결하며 아이콘·반복 문구를 중복 낭독하지 않게 합니다.
- icon-box와 icon은 별도 action이 아닙니다. 제목/설명과 같은 의미를 표현하는 SVG는 장식으로 숨기고 Tab·click을 추가하지 않습니다.
- selected만 보고 `aria-pressed`를 부여하지 않습니다. 현재 항목·단일 선택 등의 실제 의미와 채택한 패턴에 맞는 상태를 부모가 연결합니다.
  listbox를 채택했다면 option 안에 button을 중첩하지 않고 부모 keyboard·selection 경로를 사용합니다.
- meta=false는 읽기 요소·숨김 focus target·빈 설명 ID를 남기지 않습니다. true이면 문구를 평문으로 읽을 수 있게 제공합니다.
- Figma에 focus가 없어도 focus-visible은 필수입니다. 공용을 켠 UI 작업에서만
  `DOCS_ROOT/frontend/design/components/Button/accessibility.md`를 연결하고 Panel·content clipping에 focus가 잘리지 않게 합니다.
- 추가 disabled는 native disabled와 handler guard를 함께 적용합니다. 비활성 색만 바꾸거나 pointer만 막고 keyboard 활성화를 남기지 않습니다.
- 긴 제목·meta·큰 글자·번역·좁은 폭에서 전체 정보·대비·조작 영역을 확인합니다.36px 샘플만으로 모든 타깃 크기를 검증했다고 선언하지 않습니다.
- 행마다 live region을 만들지 않습니다. 실제 선택·요청 결과 안내가 필요하면 부모의 한 owner가 관리합니다.


긴 제목 이동에서도 전체 원문은 접근성 이름에 한 번 남기고 제목에 별도 Tab 정지점·live region을 만들지 않습니다.
키보드 focus는 hover와 같은 이동을 제공하며 전체 원문을 접근성 이름에 유지하고, 제목과 상위 행의 title 속성은 제거합니다.
reduced-motion·forced-colors·print에서는 이동·mask를 제거한 정적 시작 표시를 사용합니다. 고정 높이 행에서 자동줄바꿈을 강제하지 않습니다.
원문 접근과 touch·disabled·focus의 검증은 [긴 제목 계약](../../title-overflow.md)을 따릅니다.
