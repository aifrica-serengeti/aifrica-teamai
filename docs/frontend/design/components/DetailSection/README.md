# Detail Section

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

Detail Section은 상세 화면의 의미 있는 정보 card를 `제목 + 한 문장 설명 + 본문` 구조로 조립하는 공용 layout 컴포넌트다. 제목에는 개수나 상태처럼 짧은 보조 정보를 바로 이어 붙일 수 있다. 제목과 설명은 선택 사항이 아니며 읽기·편집·내부 loading 상태에서 같은 위치를 유지한다.

## 문서 탐색

- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)

참조 계약은 `대상 솔루션의 public UI mapping`와 같은 디렉터리의 vanilla-extract style을 기준으로 한다.
