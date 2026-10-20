# Content State 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- error·forbidden과 상세 본문을 대체하는 not-found는 `role="alert"`, 나머지 상태는 기본
  `role="status"`다.
- icon은 장식이므로 `aria-hidden`이며 상태 의미는 title과 description에 텍스트로 제공한다.
- title과 description을 항상 함께 제공해 오류 사실과 다음 행동을 각각 읽을 수 있게 한다.
- route 본문 전체 상태는 `headingLevel={1}`, 상세 card·section 상태는 기본 h2를 사용한다.
- 재시도 action은 실제 query 재요청과 연결하고 pending 동안 disabled·`aria-busy="true"`를 제공한다.
- 상태 전환만으로 focus를 강제로 이동하지 않으며 사용자가 재시도 action에 접근할 수 있게 유지한다.
