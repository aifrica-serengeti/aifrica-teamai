# Content State 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- [ ] error·forbidden에 icon, title, description, 허용된 action이 같은 순서로 보이는가?
- [ ] title과 description 사이는 4px이고 다른 상위 요소 사이는 16px인가?
- [ ] description을 생략해도 locale에 맞는 상태별 기본 안내가 표시되는가?
- [ ] detail surface 최소 높이 280px, list layout 360px, embedded 0 계약을 지키는가?
- [ ] error·forbidden은 alert이고 icon은 screen reader에서 제외되는가?
- [ ] route 전체 상태만 h1을 사용하고 card·section 상태는 h2를 사용하는가?
- [ ] retry pending에 disabled와 aria-busy가 함께 전달되는가?
- [ ] 기존 data가 있는 refresh 오류가 본문 전체 상태로 바뀌지 않는가?
