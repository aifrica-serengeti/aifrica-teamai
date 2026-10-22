# Agent Hub SNB 시작하기

Agent Hub SNB는 전용 레일과 프로젝트·채팅 패널을 조합하는 새 탐색 컴포넌트입니다.
[AgentHubSNB](./components/AgentHubSNB/README.md)에서 전체 구현 흐름을 확인한 뒤 필요한 하위 계약을 읽습니다.
공용을 켠 UI 작업에만 이 확장을 적용하며, 공용을 끈 제품은 자체 지침을 사용합니다.

| 계약 | 담당하는 부분 | 원본 범위 |
| --- | --- | --- |
| [AgentHubNavIcon](./components/AgentHubNavIcon/README.md) | 전용28px 채움 아이콘 | home·book·clock·search4종 |
| [AgentHubNavItem](./components/AgentHubNavItem/README.md) | 52px 레일 항목 | clock의4상태·실제 home 선택 예외 |
| [AgentHubNavRail](./components/AgentHubNavRail/README.md) | 68px 기본 탐색 레일 | 상단4항목·하단 설정과 계정 |
| [AgentHubSNBSectionHeader](./components/AgentHubSNBSectionHeader/README.md) | 섹션 이름과 보조 조작 | enabled/hovered2종 |
| [AgentHubSNBItem](./components/AgentHubSNBItem/README.md) | 32px 콘텐츠 탐색 행 | 1·2단계 × 4상태 |
| [AgentHubSNBPanel](./components/AgentHubSNBPanel/README.md) | 288px 프로젝트·채팅 패널 | 새 채팅·고정됨·프로젝트·채팅 |
| [AgentHubSNB](./components/AgentHubSNB/README.md) | 제품의 레일·패널 조합과 상태 연결 | 위6원본을 연결하는 신규 구현 recipe |

[실측](./references/snb.figma.json)·[변수](./references/snb.variables.figma.json)·[정확한 자산](./references/snb.assets.json)을 함께 확인합니다.
같은 이름의 일반 아이콘·MenuItem이나 CMP SNBV1/V2를 이 컴포넌트의 구현으로 취급하지 않습니다.
공용의 native 링크·버튼·focus·스크롤 의미는 유지하고, 실제 하위 원본이 맞을 때만 기존 Agent Hub 컴포넌트를 재사용합니다.

보드의1224×1264px·radius100·‘SNB’ 제목·레일과 패널 사이40px는 컴포넌트 전시용입니다.
실제 제품의 shell 간격·헤더·전체 폭으로 복사하지 않습니다. 레일68px·패널288px와 내부 치수는 각각의 계약에서 연결합니다.
레일1037px와 패널1033px도 샘플 높이이므로 실제 화면의 가용 높이와 스크롤을 제품에서 검증합니다.

원본에는 작동하는 라우터·펼침·검색·메뉴·계정 popup·저장 API가 없습니다.
제안한 상태 모델과 callback을 제품에 연결한 뒤 실제 source/public export·렌더·키보드·스크롤을 검증해 로컬 mapping에 기록합니다.

## 현재 구현에서 함께 적용할 보완

원본 실측·자산·특수 인스턴스 기록은 보존하고 아래 사용자 채택을 적용합니다.

- 레일 glyph는 원본28px alpha mask 한 층의 색을 #757575↔#3B82F6/200ms ease로 전환합니다. host 배경만 전환하거나 SVG src만 교체하지 않습니다.
- 섹션 제목과20px 접기 버튼 사이만2px 띄웁니다. 원본 gap0과 runtime 채택을 구분합니다.
- 목록은 공용 엔진 기반 AgentHubScrollbar를 사용합니다. top은 고정하고 목록만 스크롤하며 패널 hover·focus-within·drag에서4px/#DDD thumb를 표시합니다.
  coarse pointer에서는 상시 노출하며 native scrollbar를 중복 표시하지 않습니다. gutter11px는 항상 예약합니다.
- 일반 행의 더보기는 투명한20px wrapper·right2px을 사용하고 main의 오른쪽20px를 항상 예약합니다. 버튼 자체 hover/pressed만 #EEE/#DDD로200ms 전환합니다.
  원본36px gradient와 특수 pinned override를 일반 프로젝트 runtime의 다른 색 사각형 배경으로 복제하지 않습니다.

reduced-motion에서는 전환을 즉시 반영합니다. 상세한 동작·근거·검사 항목은 위 하위 계약과 [모션 채택](./motion.md)을 함께 읽습니다.
