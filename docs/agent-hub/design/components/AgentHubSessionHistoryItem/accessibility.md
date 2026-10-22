# AgentHubSessionHistoryItem — 접근성

- 기본 단일 기록 action은 native button type=button·Tab·Enter/Space를 유지합니다.
  listbox·탐색 링크 등 다른 의미를 제품이 채택하면 그 패턴의 한 host/keyboard 경로를 사용하고 button을 중첩하지 않습니다.
- 전체 title을 읽을 수 있게 연결하며 ellipsis가 접근성 이름까지 줄이지 않게 합니다.
  날짜 문자열만으로 대상 실행이 불명확하면 제품의 문맥·설명을 연결합니다.
- selected는 현재 보고 있는 실행입니다. native button에 토글의 `aria-pressed`나 option의 aria-selected를 자동 복사하지 않습니다.
  실제 현재 항목을 표현한다면 부모가 채택한 `aria-current` 등 알맞은 상태를 연결합니다.
- dot은6px 시각 표시이며 별도 focus/click/읽음 토글을 만들지 않습니다. 원형 SVG는 장식으로 숨기고
  ‘확인하지 않은 실행’ 같은 locale 문구를 안정적인 설명 ID 또는 동등한 텍스트로 제공합니다.
  파란 점만으로 상태를 전달하지 않습니다.
- dot=false이면 원형·빈 gap·읽지 않은 상태 설명을 함께 제거합니다. actual true 두 행과 숨김 standalone 노드를 구분합니다.
- Figma에 focus가 없어도 focus-visible은 필수입니다. 공용을 켠 UI 작업에서만
  `DOCS_ROOT/frontend/design/components/Button/accessibility.md`를 연결하고 선택 배경을 focus 대신 쓰지 않습니다.
- 추가 disabled는 native 속성과 handler guard를 함께 적용하고 keyboard 활성화를 남기지 않습니다.
- 기록 변경·확인 상태 갱신마다 모든 행을 live region으로 만들지 않습니다. 필요 시 부모의 한 owner가 실제 변경만 알립니다.
- 긴 날짜/실행 제목·번역·확대·좁은 폭·Panel clipping에서 전체 정보·focus·타깃 크기를 검증합니다.
  dot6px 자체는 조작 타깃이 아니며32px 행만으로 모바일 접근성을 검증했다고 선언하지 않습니다.
