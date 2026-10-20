# Input List Field

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System
> 구현 컴포넌트: `InputListField`
> 최종 갱신: 2026-08-12

Input List Field는 Redirect URI, Web Origin처럼 같은 형식의 문자열을 한 개 이상 입력해야 하는
반복 field다. 배열 state, 행 추가/삭제, 최소 한 행 보존, field-level validation 표시를 공통화한다.

---
## 문서

- [정의와 API](./definition.md)
- [layout·token](./styles.md)
- [array·payload·validation 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증·재현 잠금](./verification.md)
- [구현 코드](./implementation/README.md)
