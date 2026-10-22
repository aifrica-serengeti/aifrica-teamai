# Agent Hub Chat Header 시작하기

Figma 원본 `chat-header`는 대화의 경로와 일시정지·파일·더보기를 배치하는 채팅 헤더입니다.
[AgentHubChatHeader](./components/AgentHubChatHeader/README.md)에서 구조를 읽고
[구현 연결](./components/AgentHubChatHeader/implementation.md)에서 실제 제품의 실행 상태와 명령을 연결합니다.
공용을 켠 UI 작업에 적용하며, 공용을 끈 제품은 자체 지침을 사용합니다.

| 영역 | 확인한 원본 | 구현 시 확인할 점 |
| --- | --- | --- |
| 헤더 | 높이48px·좌우16px·white·하단1px #DDD | 640px는 샘플 폭, 전역 Global Header와 별도 영역 |
| 경로 | 기존 Agent Hub Breadcrumb·font16/24·단일 항목 | 샘플 문구를 실제 경로와 current 의미에 연결 |
| 조작 | 기존 ghost24/r4 버튼3개·glyph16·gap4 | pause/file/more의 정확한 source와 native 동작 |
| 하단 표시 | 325×1px·4stop 그라데이션 | 기본은 정적 표시. 생각 중 흐름은 [별도 motion 제안](./components/AgentHubChatHeader/motion.md)으로 선택 |

[실측](./references/chat-header.figma.json)·[변수](./references/chat-header.variables.figma.json)·
[자산 manifest](./references/chat-header.assets.json)를 함께 확인합니다.
하위 아이콘 레이어의 이름이 `plus/24`여도 실제 source는 pause/file/more16입니다.
표시용 Boolean4개는 실제 실행 상태와 구분하고, 숨길 때 버튼·접근성 target·불필요한 간격을 함께 제거합니다.

기본 COMPONENT에는 단일 all-true Light 조합이 있습니다. 추가 [생각 중 예시](./chat-progress.md)의 pause=false 조합과 처리 표시를 별도 연결합니다. 일시정지 명령·파일 대상·메뉴·상태 안내·focus·좁은 폭 대응은 제품에서 연결하고 검증합니다.
실제 source/export가 확인되기 전에는 `unmapped`를 유지합니다.
