# AgentHubGlobalHeader — 접근성

제품 shell의 전역 header 영역에 연결합니다. 이미 해당 landmark가 있으면 `<header>`를 다시 중첩하지 않습니다.
PageHeader의 페이지 h1 역할과 구분하며 브랜드 이름을 임의 페이지 제목으로 사용하지 않습니다.
탐색 링크 묶음을 별도 `nav`로 만들 때만 목적에 맞는 이름을 제공하고 두 버튼을 담았다는 이유만으로 menu 역할을 붙이지 않습니다.

- 로고가 링크라면 실제 href와 ‘Cheetah Agent Hub’ 등 목적을 설명하는 이름을 제공합니다.
  텍스트가 이미 이름을 제공하면 심볼 SVG는 장식으로 숨기고 같은 브랜드명을 중복 읽지 않습니다. 정적 로고에는 가짜 button·link를 만들지 않습니다.
- 바로가기는 보이는 문구를 접근성 이름에 포함합니다. 실제 이동은 anchor, 실제 명령은 native button 한 개로 구현합니다.
  내부 심볼은 장식이며 추가 Tab 정지·별도 click 경로를 만들지 않습니다.
- bell만 있는 알림에는 실제 동작에 맞는 이름을 제공합니다. 예를 들어 실제 알림을 여는 경우 ‘알림 열기’를 사용합니다.
  장식 bell은 보조 기술에서 숨깁니다. 원본에 없는 unread 상태나 ‘읽지 않은 알림 있음’을 이름에 넣지 않습니다.
- 버튼은 Tab·Enter·Space, 링크는 native 링크 키보드를 사용합니다. div role로 기본 입력을 다시 만들지 않습니다.
  공용을 켠 경우 `DOCS_ROOT/frontend/design/components/Button/accessibility.md`,
  `DOCS_ROOT/frontend/design/components/Link/accessibility.md`, `DOCS_ROOT/frontend/design/components/IconButton/accessibility.md`를 함께 따릅니다.
- 키보드 focus-visible을 제공합니다. 공용1px outline+1px offset 계약을 약화하지 않으며 이 색상·형태를 Figma 실측 상태라고 쓰지 않습니다.
  원본 root의 clip과 로고 넘침 때문에 focus가 잘리지 않는지 제품 DOM에서 검사합니다.
- 실제 popup을 연결할 때만 정확한 expanded·controls·haspopup을 사용하고 해당 popup의 닫힘·focus 복귀 계약을 따릅니다.
  단순 link나 정적 로고에 불필요한 expanded·pressed·current를 부여하지 않습니다.
- 추가 disabled를 채택하면 버튼의 native disabled와 handler guard를 연결합니다. 링크 차단은 제품 Link의 비활성 계약과 이동 guard를 사용하며
  `aria-disabled`만 붙여 실제 이동을 남기지 않습니다. 숨김 또는 비활성에 따른 초점 이동도 제품에서 검사합니다.

숨김 Divider·Breadcrumb·chip과 그 자식은 보조 기술·Tab 순서·읽기 순서에 넣지 않습니다.
한 Light 샘플만으로 dark·고대비·큰 글자·협소 화면의 대비와 조작성을 검증했다고 쓰지 않습니다.
zoom·글꼴 로드·긴 번역에서도 로고와 두 action이 겹치거나 잘리지 않고 이름과 focus가 유지되는지 확인합니다.
