# AgentHubDialogFooter

공용 Dialog의 action·focus·닫힘 의미를 유지하면서 Agent Hub의40px 취소/결과 버튼을 연결하는 전용 footer 계약입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 기존 Dialog의 footer 영역과 Button adapter를 우선 재사용하며 별도 래퍼를 강제하지 않습니다.

직접 의존 계약은 `Dialog`, [AgentHubButton](../AgentHubButton/README.md)입니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Dialog/README.md`와 `DOCS_ROOT/frontend/design/components/Button/README.md`를 함께 읽습니다.
실제 Figma 재사용은 tertiary40/primary40 Button 두 개이며, footer 전체가 공용 Dialog 인스턴스인 것은 아닙니다.
새 이름은 공용 Dialog를 덮어쓰지 않습니다. 실제 제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [정의와 실제 하위 원본](./definition.md)
- [치수·색상과 공용 비교](./styles.md)
- [취소·확정·비동기 상태의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [기존 footer 연결과 새 구현](./implementation.md)
- [검증](./verification.md)
- [Figma 실측](../../references/dialog-footer.figma.json)
- [변수와 alias](../../references/dialog-footer.variables.figma.json)

2026-10-21에 Figma [dialog/footer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3151-20373)의
Light 단일 COMPONENT를 확인했습니다.580×88px 샘플과 cancel 표시 Boolean이 있으며 실제 요청·닫힘·단축키는 포함하지 않습니다.
ProgressAlert·PickerFooter·FlyoutFooter는 다른 의미와 source를 가진 계약이므로 이 footer로 일괄 교체하지 않습니다.
