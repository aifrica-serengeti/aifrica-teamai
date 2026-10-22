# AgentHubSNB — 접근성

전체 영역은 제품의 탐색 문맥에 맞는 aside/영역으로 배치하고 기본 탐색과 콘텐츠 탐색에 구별 가능한 이름을 제공합니다.
예를 들어 이름 있는 두 nav를 형제로 두고 목록·heading·링크·버튼을 native 요소로 연결합니다.
같은 목적의 nav를 중복 선언하거나 일반 탐색 목록 전체를 application menu로 바꾸지 않습니다.

- URL 이동은 실제 href가 있는 링크로 제공합니다. 실제 현재 leaf에만 `aria-current="page"`를 연결하고 ancestor·pressed·hover에는 붙이지 않습니다.
- 검색·설정·계정과 기타 action은 native 버튼으로 제공하며 아이콘만 있는 조작에 목적을 설명하는 접근성 이름을 부여합니다.
  설정 glyph나 계정 initial에만 클릭을 연결하지 않고 조작 host 한 곳이 focus와 Enter/Space를 소유합니다.
- section/project disclosure는 `aria-expanded`와 대상 group을 연결합니다. 접힌 children은 시각뿐 아니라 Tab·보조기술 탐색에서도 제외합니다.
  접는 순간 내부에 focus가 있으면 남아 있는 toggle로 먼저 복귀시킵니다.
- 행 링크·toggle·더보기는 형제 조작으로 둡니다. 링크/버튼 안에 다른 버튼을 중첩하거나 행 전체의 click으로 보조 조작을 두 번 실행하지 않습니다.
- hover에서만 보이는 조작은 focus-within과 제품이 채택한 터치 경로에서도 사용할 수 있어야 합니다.
  숨길 때는 보이지 않는 버튼이 Tab 순서나 클릭 대상으로 남지 않도록 실제 노출 모델을 맞춥니다.
- 긴 이름을 줄이면 전체 label을 접근 가능한 이름으로 보존합니다. fade나 ellipsis만으로 항목의 의미를 삭제하지 않습니다.
- 현재 위치·펼침·선택을 색상 하나로만 전달하지 않고 의미 속성과 이름을 연결합니다. 실제 focus-visible은 clipping/fade에 가리지 않게 합니다.
- native 스크롤을 유지하고 키보드로 마지막 행·더보기·계정 조작까지 접근할 수 있는지 확인합니다.
  시안에서 아래로 잘린 행을 focus 가능한데 보이지 않는 상태로 배포하지 않습니다.
- 실제 popup을 연결한 경우에만 해당 Menu/Dialog의 키보드·Escape·닫힌 뒤 trigger 복귀를 적용합니다.
  source에 없는 popup을 자동 생성하거나 전체 SNB에 trap을 설치하지 않습니다.
- 고대비·확대·큰 글자·reduced-motion·터치를 제품에서 검증합니다. Figma Light 한 보드를 접근성 승인으로 취급하지 않습니다.

Tree 패턴을 별도로 채택한다면 제품에서 roving focus·방향키·Home/End·typeahead와 disabled 동작까지 구현·검증합니다.
공용 Tree 예시나 CMP source가 이 동작을 완성했다는 보장은 없습니다. 기본 탐색 목록 구현에는 Tree 역할을 강제하지 않습니다.
