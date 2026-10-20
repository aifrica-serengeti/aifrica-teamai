# Table

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

데이터 행을 비교·선택·정렬·스크롤·행 액션으로 다루는 native HTML Table 컴포넌트다. 이 문서는 Table 자체를 재현하기 위한 완전한 스펙이며, 외부의 Pagination은 Table 내부 기능이 아니다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

상세 페이지와 Dialog 내부에서는 `size="small"`, 별도 목록 페이지의 주 표에서는 `size="medium"`을
명시한다. [화면별 크기 정책](../../page-policies.md#화면별-table-크기)은 사용처의 조합 기준이며
Table 자체의 기본 prop과 크기별 geometry를 바꾸지 않는다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [TypeScript와 React 구현](./implementation/typescript.md)

## 1. 개요

- 기반: native `<table>` 구조를 유지하는 shadcn Table primitive + vanilla-extract 스타일.
- 데이터 API: `columns`, `data`, `getRowKey`를 받는 controlled React API.
- 변형: Default / Checkbox selection / Radio selection / row click, Small / Medium, single / multiple sort, Empty / Loading, row action, 양방향 scroll.
- 클릭 가능한 행의 keyboard focus는 열마다 분리하지 않고 행 바깥 둘레의 연속된 2px 링으로 표시한다.
- 행 작업: 한 행의 작업이 1개면 `Button size="small" variant="tertiary"`, 2개 이상이면
  `IconButton(more_vertical) → Menu`로 제공한다. 여러 Icon Button을 나란히 노출하지 않는다.
- 같은 표의 관리 UI를 통일해야 할 때는 `TableRowActions triggerMode="menu"`를 명시해
  단일 작업도 더보기 메뉴로 제공할 수 있다. 생략한 사용처는 기존 작업 수 기반 규칙을 유지한다.
- 실제 공용 API는 `renderRowAction`이며 마지막 작업 열을 추가한다. 기존 사용자 정의 컬럼은
  동일한 공개 렌더러 `TableRowActions`를 `renderCell` 안에서 재사용한다. 작업 권한·확인·API는 페이지가 소유한다.
- Header: 모든 `th`가 기본 1px bottom divider를 유지하고, vertical scroll 시 sticky header에 overlay shadow를 추가한다.
- 정렬: Table은 **정렬 상태만 요청**한다. 실제 데이터 정렬은 부모가 `sort`를 기준으로 수행한 `data`를 다시 전달한다.
- Pagination: 부모가 전체 데이터를 정렬한 뒤 현재 페이지 범위만 `data`로 잘라 전달한다. Table에 Pagination footer나 페이지 상태를 넣지 않는다.
- Radio selection의 RadioGroup은 `selectionLabels.selectionColumn`을 하나의 accessible name으로 사용하며,
  호출부가 생략하면 `행 선택`을 기본값으로 사용한다.
- 페이지가 선택 정책·Checkbox를 직접 제공하는 열은 `TableColumn.kind="selection"`으로
  Small 40px·Medium 48px 폭과 중앙 정렬을 적용하고 다음 데이터 열의 중복 padding을 제거한다.
  생략하면 기존 data 열이며 내장 selection과 동일한 크기 규격을 사용한다.
- 내장 Checkbox/Radio와 커스텀 선택 열은 바로 다음 데이터 열의 시작 padding을 제거한다. Checkbox는
  Small 12px·Medium 16px의 바깥 여백을 가지며, Radio의 32px hit area는 40/48px 열 가운데 정렬한다.
- 빈 상태는 `emptyState`의 `empty | filtered | error` 의미를 사용하고 `ListContentState`의 embedded
  presentation으로 조합한다. Medium은 regular(32px icon·18/28px title·14/20px description), Small은
  compact(24px icon·14/20px title·12/16px description)를 사용한다. 표의 시각 상태는 scroll content가
  아니라 frame viewport에 고정되어, 가로 스크롤이 있어도 현재 보이는 영역의 중앙을 유지한다.
- 호환용 `emptyContent`도 동일한 viewport, `data-kind="empty"`, `role="status"`를 사용하지만 신규
  목록은 title·description·action을 분리할 수 있는 `emptyState`를 사용한다.
- Loading은 empty/error 제목 강조를 재사용하지 않는다. Medium은 medium Spinner와 14/20px regular
  문구, Small은 small Spinner와 12/16px regular 문구를 사용한다.
- `error`의 실제 재시도와 `filtered`의 조건 초기화 callback이 제공될 때만 small tertiary action으로
  표시한다. Page notification이나 toolbar가 같은 복구 동작을 이미 소유하면 Table에 중복 action을 두지
  않는다. 최초 오류는 `createListErrorState`로 Card와 같은 config를 만들며, retry pending에는 action의
  `disabled`와 `ariaBusy`를 함께 설정한다. 단순 빈 목록의 등록·추가 CTA도 Table 안에 복제하지 않고
  PageHeader 또는 section header가 소유한다.

- 혼합 목록은 `isRowClickable`로 행별 이동 가능 여부를 제어한다. 상세 미지원 행의 선택·작업은 유지한다.
