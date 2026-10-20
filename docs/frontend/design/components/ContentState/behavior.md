# Content State 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- page/query owner가 kind, 사용자용 문구, retry callback과 pending 상태를 전달한다.
- description을 생략한 경우 kind별 공용 안내를 locale에 맞춰 제공하므로 제목만 단독으로 노출하지
  않는다. 도메인별 복구 절차가 있으면 페이지가 description을 명시해 기본 안내를 대체한다.
- error와 forbidden은 alert를 사용한다. not-found는 상세 본문을 대체할 때 alert, 목록·embedded
  상태에서는 status semantics를 사용하며 empty·filtered는 status를 사용한다.
- retry pending에는 action의 disabled와 ariaBusy를 함께 전달해 중복 요청을 막는다.
- 기존 성공 데이터가 있는 재조회 실패는 이 상태로 본문을 교체하지 않고 기존 content와 공용
  notification을 유지한다.
- 목록은 `ListContentState`가 list layout과 small tertiary action을 고정한 뒤 이 컴포넌트를 조합한다.
