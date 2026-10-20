# Table — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Table 문서 인덱스](./README.md)

## 9. 접근성

- `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`를 유지하고 Table root에 구체적인 `aria-label`을 지정한다.
- sortable `<th>`에 현재 `aria-sort="ascending" | "descending" | "none"`을 지정하고, header 자체가 아닌 내부 button을 keyboard focus 가능하게 한다.
- sort button은 visible focus ring(`1px solid primary`, offset 2px)을 제공한다.
- checkbox와 radio에 행 번호를 포함한 `aria-label`, 전체 선택에는 `aria-label="전체 행 선택"`을 부여한다.
- radio Table은 `RadioGroup`의 하나의 group label을 사용한다. 이름은
  `selectionLabels.selectionColumn`이며, 미지정 시 `${ariaLabel} 행 단일 선택`을 사용한다.
- Small 선택 Table의 첫 data cell 간격을 줄여도 선택 control의 32px hit area와 40px 선택 열은 유지한다.
- radio Table은 외곽 frame에 조합한 `RadioGroupRoot`의 하나의 group label을 사용한다. group role을
  `<table>`이나 `<tbody>`에 직접 적용해 native table semantics를 덮어쓰지 않는다.
- Tooltip은 300ms delay provider 아래에서 동작한다. long text는 tooltip prop이 있을 때만 Tooltip을 만들며, 단순 ellipsis만으로 접근 가능한 원문을 잃지 않는다.
- Menu, IconButton, Checkbox, RadioGroup의 키보드·focus·Escape 동작은 각 의존 컴포넌트에 위임한다.
- 단일 행 작업은 visible text를 가진 native Button으로 제공한다. 동일 label이 반복되어 맥락이 모호하면
  `aria-label`에 행 식별자와 작업을 함께 넣는다(예: `공통 라이브러리 참조 해제`).
- 복수 행 작업의 `more_vertical` Icon Button에는 `{행 식별자} 작업` accessible name을 제공한다. Menu가
  닫히면 trigger로 focus가 복원되어야 하며 각 MenuItem label은 실행 결과를 직접 설명해야 한다.
- `triggerMode="menu"`를 사용한 단일 작업에도 동일한 대상별 accessible name과 키보드 메뉴
  동작을 제공한다. 메뉴 열기는 mutation이 아니며, 항목 선택 후 기존 확인 흐름을 유지한다.
- 행 작업 control의 click, Enter, Space는 `onRowClick`을 함께 실행하지 않는다.
- 공용 `TableRowActions`는 Portal 내부의 click·keyboard도 행으로 전파하지 않는다. 단일 버튼의
  accessible name은 항목의 `ariaLabel`을 우선하고, 없으면 행 작업 이름과 문자열 label을 조합한다.
- 확인창을 여는 페이지는 전달받은 trigger 또는 `triggerRef`를 복귀 대상으로 사용한다.
  확인창이 닫히는 시점의 대체 focus(삭제된 행 등)는 페이지가 계속 소유한다.
- header divider와 scroll shadow는 시각적 구분만 담당하며 table semantics, `scope="col"`, focus 순서를 바꾸지 않는다.
- `onRowClick` 행은 Tab으로 focus하고 Enter/Space로 클릭과 동일한 callback을 실행한다. 행의
  `:focus-visible` outline은 유지하되 개별 셀에 반복하지 않아 현재 focus target이 하나의 행임을 시각적으로 전달한다.
- 커스텀 `kind="selection"` 열도 native `th`/`td`를 유지한다. 호출부는 Checkbox/Radio에 전체/개별 선택
  accessible name과 disabled·checked 상태를 제공하며, 중앙 정렬을 위해 control의 focus ring을 잘라내지 않는다.
- 커스텀 선택 열의 40/48px 균형 배치는 control의 크기·클릭 영역·Tab 순서·accessible name을 바꾸지 않는다.
- 내장 Checkbox/Radio 다음 data cell의 시작 padding을 제거해도 Checkbox의 16px control, Radio의
  32px hit area, focus outline, 선택 열의 40/48px 폭과 keyboard 순서는 그대로 유지한다.
- Empty/Loading spacer cell은 `aria-hidden="true"`이고, 실제 Empty 상태는 frame layer 한 곳에서만
  알린다. `kind="error"`는 `role="alert"`, `empty | filtered`는 `role="status"`를 사용한다.
- Empty 상태의 공용 icon은 `aria-hidden="true"`이며 title과 description이 같은 의미를 텍스트로 전달한다.
- Small의 compact density는 icon과 상속 글자만 축소하고 heading, live role, 읽기 순서와 action의
  클릭 영역은 Medium과 동일하게 유지한다.
- Empty action은 visible label이 있는 native small tertiary Button이다. 오류일 때는 실제 조회를 다시
  실행하고, 검색·필터 결과 없음일 때는 해당 조건을 초기화한다. 동작 없는 `다시 시도` 버튼이나 Page
  notification·toolbar에 이미 있는 복구 action을 중복 생성하지 않는다.
- Loading layer 한 곳이 `role="status"`와 문구를 소유하고 `<table aria-busy="true">`를 함께 제공한다.
  내부 Spinner는 decorative이며 screen reader에 별도 이름을 노출하지 않는다.

### 행별 이동 조건

- `onRowClick`과 `isRowClickable(row, index)`가 모두 허용하는 행만 pointer, Tab focus,
  Enter/Space 및 클릭 이동을 제공한다. predicate 생략 시 기존의 전체 행 이동 동작을 유지한다.
- predicate가 false여도 내부 Checkbox/Radio 및 작업 버튼을 비활성화하지 않는다.
  이동 불가 사유는 페이지가 해당 셀의 텍스트로 제공한다.
- 내부 버튼·입력에서 발생한 Enter/Space는 행 이동을 중복 실행하지 않는다.
- `onSortChange`가 없으면 정렬 버튼을 비활성화해 동작하지 않는 조작을 활성 상태로 보이지 않게 한다.
