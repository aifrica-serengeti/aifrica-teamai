# AgentHubSNB — 구조와 경계

```text
제품 탐색 영역: AgentHubSNB
├─ AgentHubNavRail: 기본 목적지와 검색/설정/계정 조작
│  ├─ AgentHubNavItem + AgentHubNavIcon
│  └─ 실제 IconButton32 + 계정 FRAME28
└─ AgentHubSNBPanel: 콘텐츠 탐색
   ├─ 새 채팅: 기존 AgentHubButton primary40
   ├─ 가로 Divider: 실제 source2022:2
   ├─ 고정됨 / 프로젝트 / 채팅
   │  ├─ AgentHubSNBSectionHeader
   │  └─ AgentHubSNBItem:1단계·2단계
   └─ 실제 viewport와 하단 fade 연결: 제품에서 구현
```

레일과 패널은 Figma에서 서로 다른 COMPONENT입니다. 보드에는 이 둘 외에도 아이콘·행·헤더의 상태표가 함께 놓여 있습니다.
상태표와 제목을 실제 화면의 오른쪽 콘텐츠로 렌더하지 않습니다.
`AgentHubSNB`는 이 하위 계약을 묶는 제품 조합이며 특정 React 파일이나 router 구현을 전제하지 않습니다.

| 책임 | 소유자 |
| --- | --- |
| 현재 URL·실제 현재 목적지/항목 | 제품 router 또는 페이지 owner |
| rail action과 URL 이동의 구분 | 제품 탐색 모델 |
| 고정 항목·프로젝트·채팅 데이터와 순서 | 해당 도메인의 데이터 owner |
| 섹션·프로젝트 펼침 상태 | 제품에서 선택한 상태 owner 한 곳 |
| hover·pressed·focus | 각 native 조작 host의 일시적 UI 상태 |
| 더보기·검색·새 채팅·설정·계정 | 제품 action owner |
| viewport 크기·scroll 위치·fade 표시 | 실제 scroll container |

반복된 label이나 source 이름을 데이터의 ID·업무 유형·URL로 사용하지 않습니다.
예시의 ‘고정됨’·‘프로젝트’·‘채팅’은 현재 조합을 설명합니다. 고정 순서 저장이나 계정 권한 API가 제공된 것은 아닙니다.
원본은 두 단계의 행과 보이는 하위3개를 제공하지만 최대 깊이·확장 데이터 모델·빈/오류 상태를 정의하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Link/README.md`,
`DOCS_ROOT/frontend/design/components/Button/README.md`, `DOCS_ROOT/frontend/design/components/Scrollbar/README.md`의 의미를 필요한 범위에서 유지합니다.
목록이라는 이유로 공용 Menu나 Tree의 역할·키보드·시각을 자동 채택하지 않습니다.
