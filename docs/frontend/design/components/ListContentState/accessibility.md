# List Content State 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- `empty`, `filtered`는 `role="status"`, `error`는 `role="alert"`를 기본으로 사용한다.
- title은 문서 heading 구조를 유지하는 `h2`이다.
- icon은 장식 정보이며 상태의 핵심 의미를 title과 description으로 함께 전달한다.
- action label은 동작 결과를 명확히 설명해야 한다. `다시 시도`는 실제 재요청과 연결한다.
- 재시도 중 action은 disabled와 `aria-busy="true"`를 함께 사용해 중복 요청을 막고 상태를 전달한다.
- 로딩 중 빈 컴포넌트를 읽히게 하지 않는다. 로딩은 별도의 overlay/status owner가 담당한다.
- compact density는 icon과 글자만 축소한다. heading, live role, 읽기 순서와 action의 클릭 영역은
  regular density와 동일하게 유지한다.
