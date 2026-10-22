# AgentHubChatComposer

후속 채택: [예시·AI가 채운 문구의 좌→우 reveal](./external-text-motion.md)은 입력값과 시각 효과를 분리하며 직접 타이핑·IME에는 적용하지 않습니다.

요청 입력·첨부·전송·선택한 에이전트 정보와 프로젝트 선택을 조합하는 Agent Hub 계약입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 기존 Composer가 있으면 확장·조합하고,
없으면 [구현 순서와 제안 API](./implementation.md)를 따라 소비 저장소에 필요한 범위부터 새로 개발할 수 있습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Textarea/README.md`,
`DOCS_ROOT/frontend/design/components/Chip/README.md`, `DOCS_ROOT/frontend/design/components/Divider/README.md`도 읽습니다.
직접 의존 계약은 `Textarea`, `Chip`, `Divider`, [AgentHubAttachIconButton](../AgentHubAttachIconButton/README.md),
[AgentHubIcon](../AgentHubIcon/README.md)입니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 재사용 관계](./definition.md)
- [크기·색상·배치](./styles.md)
- [상태와 제품 연결](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/chat-composer.figma.json), [자산](../../references/chat-composer.assets.json)
- [하위 컴포넌트 조합 대조](../../references/chat-composer-composition.json)

2026-10-20에 Figma [chat-composer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-69436)의
Light mode enabled·focused·typing·agent-selected 네 구성을 확인했습니다.
전송·업로드·응답 stream·프로젝트 팝업·다중 줄·mobile·dark나 실제 앱 구현을 검증한 것은 아닙니다.

[입력·focus 채택](../../motion.md)에서는 공용 Textarea의 unstyled control adapter를 pill 안에 연결합니다.
후속 사용자 요청에 따라 textarea 내부와 바깥 pill 모두 입력 focus 테두리를 추가하지 않습니다.
기본1px 선·두 shadow·caret는 유지하고, 첨부·전송·프로젝트 버튼의 독립 focus는 유지합니다.
