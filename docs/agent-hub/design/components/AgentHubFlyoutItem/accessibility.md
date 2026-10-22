# AgentHubFlyoutItem — 접근성

평면 Flyout과 선택적인 폴더 disclosure를 지원합니다. standalone folder/open/child 모양은 실제 펼침이나 Tree 의미의 근거가 아니며,
폴더 동작은 후속 사용자 요청으로 채택한 runtime 계약입니다. 참조를 표시만 하면 native action·tab stop을 만들지 않습니다.

- 파일·폴더를 보여 준다는 사실만으로 `role=menu`를 붙이지 않습니다. 실제 데이터가 계층이면 tree 패턴,
  독립적인 평면 조작 목록이면 목록과 native button 등 제품에 맞는 패턴을 부모가 선택합니다.
  단일 선택 목록으로 채택할 때도 실제 listbox owner의 focus·selection 계약을 완성하고 option 안에 별도 button을 넣지 않습니다.
- tree 패턴은 stable ID·tree/treeitem/group·aria-level·폴더 aria-expanded·실제 선택에 맞는 aria-selected를 연결합니다.
  접힌 자식은 키보드와 읽기 트리에서 제외하며, 그 안에 focus가 있었다면 제거 전에 부모의 복귀 정책을 적용합니다.
- 공용 Tree 참조 문서만으로 방향키 탐색이 이미 제공된다고 선언하지 않습니다.
  별도 계층 탐색과 공용 Tree를 채택한 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Tree/accessibility.md`의 focus manager 경계를 확인하고,
  위/아래·좌/우·Home/End·필요한 typeahead와 roving focus를 실제 제품에서 구현·검증합니다.
- flat 목록의 native button은 type=button·Tab·Enter/Space·실제 disabled와 실행 guard를 유지합니다.
  계층의 한 treeitem과 내부 chevron을 임의로 각각 Tab 정지점으로 만들지 않습니다.
  폴더의 선택과 확장을 나눈 제품은 중첩 button 대신 채택한 복합 패턴에 맞는 별도 조작 구조를 검증합니다.
- 채택한 disclosure 폴더는 native 버튼의 `aria-expanded`·`aria-controls`와 중첩 `ul`을 연결합니다.
  children 존재 여부와 부모 expandedIds를 기준으로 표시하고, disclosure owner가 없으면 폴더 조작을 차단합니다.
  닫는 subtree는 즉시 inert/aria-hidden으로 제외하고 내부 focus를 폴더 버튼으로 옮긴 뒤 높이 전환 종료 시 제거합니다.
  같은 down glyph만 회전하며 화살표·hit area를 별도 Tab stop으로 만들지 않습니다. 계층만으로 role=tree를 붙이지 않습니다.
- label은 전체 파일/폴더 이름을 읽을 수 있게 연결합니다. 시각적 ellipsis가 접근성 이름까지 잘라서는 안 됩니다.
  count와 meta가 필요한 설명이면 안정적인 연결로 제공하고 ‘7’만으로 문맥 없는 접근성 이름을 만들지 않습니다.
- file-text와 chevron이 이름·펼침 상태를 중복 표현하면 장식으로 숨깁니다. SVG 자체에 별도 Tab·click·이름을 주지 않습니다.
  화살표 방향만으로 펼침 상태를 알리지 않습니다. child meta는 정보 문구이며 별도의 링크·조작이 아닙니다.
- Figma에 focus 상태가 없어도 실제 조작의 focus-visible은 필수입니다. 공용을 켰다면
  Menu의 [inset2px ring·hover 우선 정책](./styles.md#공용-menu의-행-focus-계승)을 연결하며,28px 행·스크롤·패널 경계에 표시가 잘리지 않게 합니다.
  기본 outline과 ring을 중복하지 않습니다. forced-colors에서는2px 시스템색 내부 outline으로 대체합니다.
  선택 배경만으로 키보드 focus를 대신하지 않습니다.
- 추가 disabled는 native disabled 또는 채택한 primitive의 aria-disabled와 실제 입력 차단을 함께 연결합니다.
  표시색만 바꾸고 선택·확장이 실행되게 두지 않습니다.
- 긴 label·번역·count/meta·확대·좁은 화면의 전체 정보와 타깃 크기를 검사합니다.
  standalone28px 행과 Light paint만으로 대비·모바일 타깃·완전한 keyboard 지원을 검증했다고 선언하지 않습니다.
- 행마다 live region을 만들지 않습니다. 폴더 로딩·검색·선택 결과의 상태 안내가 필요하면 부모의 한 owner가 실제 변경만 알립니다.
