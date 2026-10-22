# AgentHubSelect

공용 Select 위에 Agent Hub 예약 Dialog의 실측 geometry를 연결하는 얇은 adapter입니다.
[Figma 본문](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3192-27855)의 FRAME 관찰을
새 Figma COMPONENT/public API로 주장하지 않습니다. 실제 제품 구현은 unmapped입니다.

- [정의](./definition.md)
- [스타일](./styles.md)
- [동작](./behavior.md)
- [접근성](./accessibility.md)
- [구현](./implementation.md)
- [검증](./verification.md)
- [채택 모션·focus·scroll](../../motion.md)
- [Dialog 원본 실측](../../references/dialog.figma.json)

공용 사용 조건은 [상위 안내](../../README.md)와 문서 적용 순서를 따릅니다.

현재 popup 표현은 [AgentHubMenu](../AgentHubMenu/README.md)·[AgentHubMenuItem](../AgentHubMenuItem/README.md)을 재사용하고,
목록에는 [AgentHubScrollbar](../AgentHubScrollbar/README.md)를 연결합니다. 값·키보드·listbox 의미는 공용 Select 엔진이 소유합니다.

### 공용 baseline과 이번 키보드 채택 차이

공용 Select baseline은 Enter/Space 선택을 제공하며 방향키 목록 탐색은 미지원으로 기록되어 있습니다.
이번 Agent Hub 단일 선택 adapter는 사용자 승인 계획에 따라 ArrowUp/Down·Home/End 탐색을 **추가 채택**합니다.
따라서 geometry만 바꾼 무변경 재사용으로 주장하지 않습니다. 공용 의미·단일 값·popup150ms/scroll은 계승하되
소비 구현의 SingleSelect helper가 이 키보드 강화 계약을 제공하고 실제 제품 mapping 시 기존 onKeyDown과 충돌을 검사합니다.
검색·다중선택은 계속 미구현입니다. 공용 원본의 방향키 미지원 관찰값을 조용히 수정하지 않습니다.
