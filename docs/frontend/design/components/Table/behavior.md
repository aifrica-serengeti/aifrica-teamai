# Table — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Table 문서 인덱스](./README.md)

## 7. 상태와 동작

### Sort

- `sortable: true`인 header만 button이다. 초기 `sort`에 해당 column이 없으면 화살표의 `opacity: 0`을 유지한다.
- 한 column의 순환: **없음 → ascending → descending → 없음**.
- `single`: 다른 column을 처음 클릭하면 기존 sort를 교체한다.
- `multiple`: 새 column을 오름차순으로 끝에 추가한다. `sort` 배열의 앞 항목이 더 높은 정렬 우선순위다.
- arrow는 `ascending`에서 위쪽, `descending`에서 180° 회전한 아래쪽이다. 나타남·사라짐은 opacity만으로 처리하고, 방향 변경만 transform으로 처리한다.
- Table은 data 순서를 바꾸지 않는다. 부모가 `onSortChange`의 다음 sort를 사용해 data를 정렬한다.

### Selection

- `TableColumn.kind="selection"`의 커스텀 선택 열은 Small 40px·Medium 48px 중앙 정렬과 다음 데이터 열의 중복 여백 제거를 적용한다.
  추가 Checkbox나 선택 상태를 만들지 않으며, 전체 선택·중간 상태·선택 불가 행·페이지 간 선택 보존은
  호출부의 header/cell control과 callback이 담당한다. `onRowClick`이 있으면 호출부가 선택 이벤트 전파도 제어한다.
  기본·선택·중간·disabled 상태에서도 같은 앞뒤 간격을 유지하며 내장 checkbox/radio 선택 열은 변경하지 않는다.

- `selection` prop을 생략하면 Default Table이다. 구조적 blank selection column은 만들지 않으며, 첫/마지막 data cell의 24px padding으로 좌우 균형을 유지한다.
- 내장 checkbox/radio 선택 열 다음의 첫 data cell은 시작 padding을 0으로 둔다. Small은 12px,
  Medium은 16px로 frame→control과 control→data의 실제 간격을 맞추며 선택 상태와 callback은 바꾸지 않는다.
- checkbox: header Checkbox는 disabled 행을 제외한 모든 selectable 행을 선택/해제한다. 일부 선택이면 `indeterminate`다.
- radio: 모든 행의 RadioGroupItem은 하나의 RadioGroup에 속하고, 그룹 이름은
  `selectionLabels.selectionColumn` 또는 기본값 `${ariaLabel} 행 단일 선택`이다.
- 전체 선택은 기존 선택 set을 보존한 채 **보이는 행만** 추가·제거한다. 다른 page·조건에서 이미 선택된 key를 지우지 않는다.
- checkbox·radio control의 click과 keyboard 입력은 row click·row keyboard action으로 전파되지 않는다. 선택 조작이 상세 이동 등 `onRowClick` 동작을 겸발하지 않게 막는다.
- radio: header는 비어 있는 40/48px 선택 열이며, 한 행만 선택한다.
- 내장 선택 열 다음 header/body cell의 좌측 padding은 0이다. Checkbox의 앞뒤 간격은 Small 12px·Medium 16px이며, Radio의 32px hit area는 40/48px 열 가운데 정렬한다.
- 선택된 행은 selected surface를 쓰고, **실제 checkbox/radio selection**으로 활성화된 경우에만 왼쪽에 3px primary inset line을 표시한다.
- `isRowDisabled` 행은 전체 선택 대상·row control·row action 대상에서 제외한다.

### Row 상태와 action

- `onRowClick`이 있으면 행 전체는 pointer cursor와 keyboard focus를 가지며 Enter/Space로 같은 action을 실행한다.
  focus-visible은 행 외곽의 연속된 링 하나로 표시하며, Shift+휠 같은 modifier scroll 중에도 셀별 테두리를 만들지 않는다.
- hover/pressed는 disabled·selected가 아닌 행에만 적용한다.
- `getRowVisualState`는 상태 시트 전시용이다. `hovered`, `pressed`, `selected`를 비인터랙티브로 재현한다.
- 한 행에서 실제 제공하는 작업 개수를 기준으로 표현을 선택한다. 작업이 1개면 텍스트가 항상 보이는
  `Button size="small" variant="tertiary"`를 사용한다. 단일 작업을 즉시 실행하는 icon-only Button으로 축약하지 않는다.
- 행별 상태 때문에 작업 수가 달라도 관리 열을 같은 UI로 유지할 필요가 있으면
  `triggerMode="menu"`를 명시한다. 단일 작업도 more_vertical → small Menu를 거쳐 선택하며,
  빈 작업 배열은 표시하지 않는다. 기본 auto 사용처는 변경하지 않는다.
- 작업이 2개 이상이면 `IconButton icon="more_vertical" size="medium" variant="ghost" → MenuContent
size="small" → MenuItem` 조합을 사용한다. 수정·삭제 Icon Button을 나란히 노출하거나 Menu를 직접
  구현하지 않는다.
- 삭제처럼 위험한 복수 작업은 Menu의 마지막 영역에 두고 앞에 `MenuDivider`를 배치한다. label과 leading
  Icon은 danger semantic color를 사용한다. 단일 작업은 tertiary Button label로 결과를 명시하고 필요한
  확인 흐름은 page가 소유한다.
- 조회/수정 모드에 따라 작업 개수가 바뀌면 같은 행도 현재 모드의 실제 작업 개수로 패턴을 다시 선택한다.
  한 column 안에서 패턴이 섞일 수 있으면 가장 넓은 단일 Button이 잘리지 않는 폭을 예약한다.
- 작업 Button과 Menu trigger의 click·keyboard event는 row click으로 전파하지 않는다.
- `renderRowAction`과 `TableRowActions`는 같은 구현을 사용한다. 최초 메뉴를 열기 전에는 Portal을
  만들지 않고 열린 후에는 닫힘 animation과 focus 복원 수명까지 유지한다.
- 메뉴 선택 callback은 Menu의 닫힘 focus 복원 시점에 한 번 실행한다. trigger로 focus를 돌린 뒤
  callback에 trigger를 전달하므로 페이지가 확인창을 열어도 메뉴가 확인창의 focus를 빼앗지 않는다.
  Escape·외부 클릭은 작업을 실행하지 않는다. 선택 후 권한·disabled가 바뀌거나 행이 제거되면 실행하지 않는다.

### Empty / Loading

- Empty와 Loading은 header/column 구조 및 160px body 높이를 유지하도록 body에 aria-hidden `colSpan`
  spacer cell 하나를 렌더한다. 선택 열과 `renderRowAction` 열도 `colSpan`에 포함한다.
- 실제 Empty/Loading 표현은 scroll content 밖의 frame 고정 viewport에 둔다. Medium은 header 아래 40px,
  Small은 32px부터 body 영역 중앙에 배치해, table의 intrinsic width나 `scrollLeft`에 영향을 받지 않는다.
- Empty 표현은 `ListContentState presentation="embedded"`를 사용한다. Medium은 regular의 32px 상태
  icon, 18/28px semibold title, 14/20px subtle description을 Card와 공유한다. Small은 compact의 24px
  icon, 14/20px semibold title, 12/16px subtle description을 사용한다. 모두 최대 너비 480px 안에서
  중앙 정렬한다.
- icon을 생략하면 empty=`database`, filtered=`search`, error=`triangle_alert`를 사용한다. 도메인 icon을
  전달하면 Table과 Card에 같은 값을 사용하고, 명시적인 `false`일 때만 숨긴다.
- `kind="error"`는 `role="alert"`, `empty | filtered`는 `role="status"`다. 오류 재조회와 검색·필터
  초기화 callback이 있으면 `Button size="small" variant="tertiary"` 하나로 렌더한다. 동일한 복구
  action을 Page notification이나 toolbar가 이미 제공하면 Table action은 생략한다.
- 단순 Empty에는 action을 두지 않는다. 등록·추가 주 CTA는 PageHeader나 section header에 유지한다.
- Loading은 `loadingLabel`과 size별 공용 Spinner를 쓰고 Table root의 `aria-busy`를 유지한다.
  Medium은 medium Spinner·14/20px regular copy·12px 간격, Small은 small Spinner·12/16px regular
  copy·8px 간격을 사용한다.

### Sticky header

- header는 ScrollArea 내부에서 `position: sticky; top: 0; z-index: 2`다.
- frame은 `isolation: isolate`로 paint 순서를 한정하고 스크롤하지 않는 `::before`를 header 위에 둔다.
  이 층은 기존 상단 border 1px와 바로 안쪽 header surface 1px만 덮으며 pointer event를 받지 않는다.
  소수 픽셀에 배치된 dialog에서도 scrollport와 sticky layer의 반올림 차이로 body가 상단에 비치지 않아야 한다.
  셀별 가상 요소나 header 높이·top 변경으로 보정하지 않으며 Small 32px/40px, Medium 40px/48px를 유지한다.
- Table의 ScrollArea는 기본 `type="hover"`를 유지한다. overflow thumb는 기본 상태에서 숨기고 Table 영역을 hover할 때만 표시한다.
- 각 `th`는 기본 상태부터 1px bottom divider를 소유한다. `border-collapse: separate; border-spacing: 0`으로 browser collapse 규칙 때문에 divider가 사라지지 않게 한다.
- body가 세로로 scroll되어 최상단이 아니면 sticky header에 `var(--elevation-overlay)` shadow를 올린다.
- 최상단에서는 shadow만 `none`이며 header bottom divider는 계속 표시한다.

## 8. 애니메이션

모든 색상 관련 transition은 요소 단위로 **0.2s ease**다. `transition: all` 또는 전역 `*` transition을 사용하지 않는다.

```css
.table-frame {
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}
.table-root {
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
.body-row {
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}
.sticky-header {
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}
.sort-icon {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    color 0.2s ease;
}
.row-action {
  transition: opacity 0.2s ease;
}
```

### 행별 이동 조건

- `onRowClick`과 `isRowClickable(row, index)`가 모두 허용하는 행만 pointer, Tab focus,
  Enter/Space 및 클릭 이동을 제공한다. predicate 생략 시 기존의 전체 행 이동 동작을 유지한다.
- predicate가 false여도 내부 Checkbox/Radio 및 작업 버튼을 비활성화하지 않는다.
  이동 불가 사유는 페이지가 해당 셀의 텍스트로 제공한다.
- 내부 버튼·입력에서 발생한 Enter/Space는 행 이동을 중복 실행하지 않는다.
- `onSortChange`가 없으면 정렬 버튼을 비활성화해 동작하지 않는 조작을 활성 상태로 보이지 않게 한다.
