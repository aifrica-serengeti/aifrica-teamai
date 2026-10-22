# AgentHubUserMessage

사용자가 보낸 일반 메시지·에이전트 지정 메시지·예약 경로 메시지를 표시하는 Agent Hub 계약입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 기존 사용자 메시지를 재사용·확장하고,
없으면 [구현 순서와 제안 API](./implementation.md)에 따라 소비 저장소의 가까운 범위에 새 export를 만들 수 있습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Chip/README.md`와
`DOCS_ROOT/frontend/design/components/Divider/README.md`도 읽습니다.
직접 의존 계약은 `Chip`, `Divider`, [AgentHubIcon](../AgentHubIcon/README.md)입니다.
실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 재사용 관계](./definition.md)
- [크기·색상·배치](./styles.md)
- [상태와 제품 연결](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/message-user.figma.json), [변수](../../references/message-user.variables.figma.json), [자산](../../references/message-user.assets.json)
- [하위 조합 대조](../../references/message-user-composition.json)

2026-10-21에 Figma [message/user](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2972-20901)의
Light mode chat·agent·schedule 세 구성을 확인했습니다. assistant 응답·Markdown·streaming·송신 중/실패·재시도·피드백이나 실제 앱 동작까지 검증한 것은 아닙니다.

## 외부 본문 주입 모션

AI가 사용자 초안을 채우거나 새 본문을 표시할 때는 [Composer와 같은 TextReveal](../AgentHubChatComposer/external-text-motion.md)을 재사용합니다.
정적 과거 메시지 기본값은 유지하고, 새 청크만 reveal하며 본문 의미·발화자·요청 상태는 바꾸지 않습니다.
