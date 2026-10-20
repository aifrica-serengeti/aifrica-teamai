# Detail Section — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- root는 기본 `section`이며 보조 탐색 영역에서만 `aside`를 선택한다.
- title은 실제 heading이고 description은 보이는 문장이다. 둘 다 root에 programmatically 연결된다.
- `titleAccessory`는 heading의 accessible name을 바꾸지 않으며 시각적으로 제목 바로 뒤에 배치한다. 의미가 있는 보조 문구는 자체 text semantics를 유지하고 Button·Link 같은 상호작용 요소는 넣지 않는다.
- heading level은 page의 `h1` 다음에 기본 `h2`를 사용하며 실제 중첩 section에서만 `h3`를 사용한다.
- title이나 description을 Tooltip, placeholder, `aria-label`만으로 대체하지 않는다.
- header action은 정확한 accessible name, keyboard 동작, focus 표시를 가진 기존 공용 control을 전달한다.
- loading은 root의 `aria-busy`와 body의 적절한 status semantics를 page가 함께 제공한다.
