# AgentHubScheduleCard — 접근성

- root는 제목·메타·상태·독립 control을 담는 일반 카드/목록 구조입니다. toggle이 있는 전체 root를 button으로 감싸지 않습니다.
  카드 조회가 필요하면 header의 native control과 footer toggle을 형제로 두고 DOM·읽기 순서를 유지합니다.
- toggle은 native button 한 개·type=button·실제 disabled와 단일 click 경로를 사용합니다. Enter/Space keydown으로 재실행하지 않습니다.
  “제목 예약 일시 중지”, “제목 예약 재개”처럼 대상과 실제 명령을 설명하는 이름을 제품이 제공합니다.
- 상태 변경 button의 glyph만 바뀌어도 이름과 제품의 status가 일치해야 합니다. selected 색만으로 aria-pressed/aria-selected를 자동 붙이지 않습니다.
  제품이 명시적 toggle 패턴을 채택하면 고정 이름·상태 표현 등 그 패턴 전체를 함께 검증합니다.
- active/paused는 읽을 수 있는 상태 문구로 제공합니다. 원본 active의 ‘label’을 “실행 중”이라는 고정 의미로 읽지 않습니다.
  status 표시는 일반 텍스트이며 항상 `role=status`/live region으로 선언하지 않습니다. 공지 여부·빈도는 제품 owner가 정합니다.
- status/toggle의 SVG는 장식으로 숨기고 img는 빈 alt를 사용합니다. meta 사이의 ‘·’도 구분 장식으로 숨길 수 있으며 두 실제 값은 읽을 수 있게 합니다.
- title·meta·상태가 생략돼도 전체 의미를 읽고 확인할 수 있어야 합니다. Tooltip·hover만이 유일한 정보 접근 경로가 되지 않게 합니다.
- disabled 색만 바꾸지 않고 host·keyboard·실제 handler를 함께 차단합니다. paused를 disabled로 선언하지 않습니다.
- focus-visible은 radius24 외곽/24px toggle에 맞는 제품 token으로 연결합니다. 원본에 없는 focus 시각을 측정값으로 기록하지 않습니다.
  toggle24px의 실제 hit area·간격·zoom·대비와 긴 문구에서의 조작을 제품에서 검증합니다.
- status 변경 후 button/카드 ID를 안정적으로 유지하고, 제거될 때의 focus 복귀 대상은 목록 owner가 관리합니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Card/accessibility.md`와
`DOCS_ROOT/frontend/design/components/Button/accessibility.md`의 관련 의미를 적용합니다.
run-status를 별도 button·progressbar로 바꾸거나 root에 menu/listbox 패턴을 자동 도입하지 않습니다.
