# Detail Section — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

Detail Section 자체는 query나 edit state를 소유하지 않는 순수 presentation component다.

- read/edit 전환에서도 같은 title과 description 영역을 유지한다. 문구는 목적이 달라질 때만 `확인합니다`/`수정합니다`처럼 바꿀 수 있다.
- 내부 loading에서도 header는 그대로 보이고 body만 Skeleton 또는 status content로 바뀐다.
- header action의 pending, disabled, click은 page owner가 제어한다.
- 카드 헤더의 `headerAction`에 넣는 Button은 `size="small"`을 명시한다. 본문·페이지 footer·Dialog footer 버튼은 각 영역의 크기 정책을 따른다.
- `titleAccessory`는 개수나 상태처럼 제목을 보조하는 짧은 정보만 표시한다. 독립 동작은 `headerAction`을 사용한다.
- 최초 route loading, not-found, forbidden, error, confirmation처럼 정보 section이 아닌 상태 surface에는 이 컴포넌트를 강제하지 않는다.
- 목록 card, metric tile, dialog, notification처럼 별도 의미 계약이 있는 surface를 Detail Section으로 감싸지 않는다.
