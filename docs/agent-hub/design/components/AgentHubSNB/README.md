# AgentHubSNB

Agent Hub의68px 기본 탐색 레일과288px 콘텐츠 패널을 연결하는 신규 SNB 계약입니다.
[NavRail](../AgentHubNavRail/README.md)과 [SNBPanel](../AgentHubSNBPanel/README.md)을 조합하며 CMP SNBV1/V2를 수정하거나 상속하지 않습니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 공용을 끈 제품에 공용 지침이나 이 catalog를 강제하지 않습니다.

Figma [SNB 보드](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3074-101398)는 전시 FRAME입니다.
이름이 AgentHubSNB인 완성 COMPONENT나 실행 export가 발견됐다는 뜻이 아닙니다.
보드 안의6개 실제 원본과 그 상태를 기반으로 전체 조합의 책임을 이 문서에서 정의합니다.
직접 의존 계약은 `AgentHubNavRail`, `AgentHubSNBPanel`이며 실제 제품 source/export는 `unmapped`입니다.

- [구조와 하위 계약](./definition.md)
- [배치와 상태별 시각](./styles.md)
- [탐색·펼침·요청의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [신규 구현과 제품 연결](./implementation.md)
- [검증](./verification.md)
- [원본 실측](../../references/snb.figma.json)·[변수](../../references/snb.variables.figma.json)·[자산](../../references/snb.assets.json)

확인 범위는2026-10-21의 Light 원본6개와 보드 조합입니다.
다크·모바일·패널 접힘·실제 API·라우팅·키보드·스크롤 실행을 확인한 결과는 아닙니다.
