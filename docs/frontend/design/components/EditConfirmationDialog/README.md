# Edit Confirmation Dialog

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System
> 구현 컴포넌트: `EditConfirmationDialog`
> 최종 갱신: 2026-08-31

Edit Confirmation Dialog는 상세 수정 또는 등록에서 **저장**과 **작성 취소**를 확정하기 위한
controlled Dialog다. 작업을 실제 실행하는 컴포넌트가 아니라, parent page가 가진 action intent를
사용자에게 확인하고 단 하나의 `onConfirm`으로 되돌려 준다.
닫힌 뒤 focus는 `returnFocusRef`가 가리키는 trigger 또는 parent workflow의 다음 focus target으로 복원한다.
안전 버튼은 저장 확인에서는 `돌아가기`, 수정 취소·화면 이탈 확인에서는 `계속하기`를 사용해 사용자가
유지하게 되는 작업을 구체적으로 나타낸다.
save/cancel description을 생략해도 intent별 기본 문구를 표시하므로 title 아래 안내가 비어 있지 않는다.

문서 전용 재현에서는 이 공개 이름과 아래 문서의 controlled API를 새 public export로 만든다.
추출 참조 source의 구현 경로는 계약에 포함되지 않는다.

---

## 문서

- [정의·anatomy·사용 범위](./definition.md)
- [copy·layout](./styles.md)
- [controlled behavior](./behavior.md)
- [접근성](./accessibility.md)
- [검증·재현 잠금](./verification.md)
- [구현 코드](./implementation/README.md)
