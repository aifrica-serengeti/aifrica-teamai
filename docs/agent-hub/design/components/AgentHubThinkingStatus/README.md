# AgentHubThinkingStatus

assistant가 생각하는 동안 기존 BrandMark와 상태·경과시간 문구를 보여 주는 Agent Hub 조합 계약입니다.
적용 조건은 [상위 안내](../../README.md), 화면 연결은 [채팅 진행 안내](../../chat-progress.md)를 따릅니다.
실제 상태와 경과시간은 제품이 공급하며 이 컴포넌트 안에서 요청이나 timer를 새로 만들지 않습니다.

직접 의존 계약은 [AgentHubBrandMark](../AgentHubBrandMark/README.md) 하나입니다.
UserMessage·ProgressAlert·Spinner를 새 상태로 확장한 것이 아닙니다. 공용을 끄면 공용 문서·스킬을 요구하지 않습니다.
실제 제품 source/public export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 실제 원본](./definition.md)
- [치수·원본 gradient와 현재 채택·정적 로고](./styles.md)
- [처리 상태와 시간의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [기존 구현 연결과 제안 API](./implementation.md)
- [검증](./verification.md)
- [Figma 실측](../../references/chat-progress.figma.json)
- [변수와 표시 범위](../../references/chat-progress.variables.figma.json)
- [자산 재사용 근거](../../references/chat-progress.assets.json)
- [연결할 Header motion](../AgentHubChatHeader/motion.md)

2026-10-21에 Figma [채팅 진행 예시](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-118094)의
`status/in-progress` FRAME `3016:118106`을 확인했습니다.136×32와 ‘생각하는 중 · 4초’는 단일 Light 표본입니다.
실제 상태 전환·시간 갱신·streaming·브라우저 동작이나 텍스트 shimmer·로고 회전을 측정한 것은 아닙니다.

## 명시적으로 채택한 글자 모션

[Agent Hub 모션 채택](../../motion.md)에 따라 `motion="shimmer"`를 기본으로 사용하고 `static`도 선택할 수 있습니다.
균일한 기본 글자 위에서 흰 띠가 일정 간격으로 왼쪽→오른쪽 흐르는 패턴은 이번 사용자 요청입니다.
띠 폭28%·중심 간격50%·1800ms linear 반복은 구현 제안값이며 Figma 실측이 아닙니다.
고정5-stop gradient는 원본 비교에만 보존하고 현재 소비 recipe에는 적용하지 않습니다. static/reduced에서 고정된 흐림을 남기지 않습니다.
기존 PNG와 font·HUG·부모 경과시간을 유지하며 로고 회전·자체 timer·초 단위 live 안내는 추가하지 않습니다.
