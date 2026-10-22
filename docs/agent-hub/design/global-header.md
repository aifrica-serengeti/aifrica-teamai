# Agent Hub Global Header 시작하기

Agent Hub의 전역 헤더는 서비스 로고와 플랫폼 바로가기, 알림 조작을 담는 새 컴포넌트입니다.
[AgentHubGlobalHeader](./components/AgentHubGlobalHeader/README.md)에서 구조를 읽고
[구현 연결](./components/AgentHubGlobalHeader/implementation.md)에서 제품 shell과 실제 동작을 연결합니다.
공용을 켠 UI 작업에 이 확장을 적용하며 공용을 끈 제품은 자체 지침을 사용합니다.

| 영역 | 확인한 기본 모습 | 구현할 때 구분할 점 |
| --- | --- | --- |
| 헤더 | 높이43px·좌우16px·#F6F7F9 | 774px는 샘플 폭, 하단 선·shadow 없음 |
| 서비스 로고 | blue Cheetah 마크와 혼합 굵기 Poppins | 138px 박스 밖으로 글자가 보이는 원본 구조 |
| 플랫폼 바로가기 | 24px/r4·흰 배경·1px #DDD·12/16 글자 | 기존 Button instance가 아닌 직접 FRAME |
| 알림 | 32px/r6·투명·20px bell·1.25px 선 | unread나 알림 패널은 원본에 없음 |

[실측](./references/global-header.figma.json)·[변수](./references/global-header.variables.figma.json)·
[자산 manifest](./assets/global-header/manifest.json)를 함께 확인합니다.
화면에 숨겨진 Divider·Breadcrumb·Chip은 기본 DOM·탭 순서·접근성 트리·flex 간격에 넣지 않습니다.
공용 PageHeader는 페이지 제목을 구성하는 계약이고 CMP 헤더는 별도 shell 계약이므로 이 헤더의 구현으로 자동 채택하지 않습니다.

제공된 것은 한 가지 Light 시각입니다. 제품에서 목적지·알림 동작·focus·shell 배치·좁은 폭 대응을 결정하고 실제 source/export를 검증합니다.
이 문서를 전달받은 상태는 `unmapped`이며 작동하는 앱이나 모든 상태의 시각 일치를 확인했다는 뜻은 아닙니다.
