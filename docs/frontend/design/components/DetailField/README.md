# Detail Field

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System
> 구현 컴포넌트: `DetailItem`, `DetailInputField`, `DetailTextField`
> 최종 갱신: 2026-08-12

Detail Field는 상세 화면의 label/value를 일관되게 보이고, 편집 모드에서는 같은 자리에서 Input으로
전환하는 공용 field family다. 상세 페이지가 각 값을 `div + span`으로 다시 조립하지 않도록
정의 목록 semantics, 빈 값, 긴 값, read-only, validation 표시를 한 계약으로 묶는다.

---
## 문서

- [정의와 API](./definition.md)
- [layout·typography·token](./styles.md)
- [읽기/편집 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증·재현 잠금](./verification.md)
- [사용 예시](./implementation/README.md)
