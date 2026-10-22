# AgentHubProgressAlert

응답 중단 안내와 ‘다시시도’·‘프롬프트 편집’ 두 동작을 연결하는 Agent Hub 계약입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 호환되는 기존 안내 컴포넌트를 재사용하고,
없으면 [구현 순서와 제안 API](./implementation.md)에 따라 소비 저장소에 새 export를 만들 수 있습니다.

직접 의존 계약은 [AgentHubButton](../AgentHubButton/README.md)과 [AgentHubIcon](../AgentHubIcon/README.md)입니다.
공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Button/README.md`의 의미·접근성 계약도 유지합니다.
실제 제품 source/export는 아직 `unmapped`이며 공유 채택 설정은 `draft`입니다.

- [정의와 재사용 관계](./definition.md)
- [크기·색상·border 배치](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/progress-alert.figma.json), [변수](../../references/progress-alert.variables.figma.json), [자산](../../references/progress-alert.assets.json)
- [하위 조합 대조](../../references/progress-alert-composition.json)

2026-10-21에 Figma [progress-alert](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-102212)의
Light mode 단일 COMPONENT를 확인했습니다. 이름과 달리 진행률 bar·Spinner·취소·닫기·자동 Toast가 있는 시안은 아닙니다.
재시도 요청·편집·진행 상태의 실제 앱 동작과 다크·좁은 화면의 배치는 별도 검증이 필요합니다.
