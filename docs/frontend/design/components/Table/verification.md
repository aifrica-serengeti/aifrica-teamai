# Table — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Table 문서 인덱스](./README.md)

## 12. 검증 체크리스트

- [ ] Small header/body가 32px/40px, Medium이 40px/48px인지 확인한다.
- [ ] Table frame 안에 16px 등의 내부 gutter가 없는지 확인한다. frame border 바로 안에서 header/background/divider가 시작되어야 한다.
- [ ] `ScrollArea`에 `contentClassName`으로 `padding: 0`을 적용하고, ScrollArea 자신의 border/radius도 제거했는지 확인한다.
- [ ] overflow thumb가 기본 상태에서는 숨겨지고 Table 영역을 hover할 때 0.2s로 나타나는지 확인한다.
- [ ] Default Table의 첫·마지막 content가 각각 24px outer padding으로 균형을 이루는지 확인한다.
- [ ] Checkbox/Radio가 모든 row content와 정확히 수직 중앙에 있는지 확인한다. 두 선택 열 모두 Small 40px·Medium 48px이며, Radio의 32px hit area가 열 가운데 정렬되는지 확인한다.
- [ ] fixed table layout과 남는 가로 폭이 있는 목록에서 selection `col` 및 header/body cell의 width·min/max-width가 같고 선택 열이 늘어나지 않는지 확인한다.
- [ ] 모든 data column에 width가 있어도 첫 일반 data column만 남는 폭을 흡수하고 selection `col/th/td`는 Small 40px·Medium 48px로 실측되는지 확인한다.
- [ ] 내장 Checkbox/Radio 다음 data cell의 시작 padding이 0인지 확인한다. Checkbox는 Small에서
      frame→control과 control→data가 각각 12px, Medium에서 각각 16px이며, Radio의 32px hit area는
      Small 40px·Medium 48px 선택 열 가운데 정렬되는지 header/body에서 실측한다.
- [ ] 커스텀 `kind="selection"` 열도 Small 40px·Medium 48px·padding 0·중앙 정렬이며, 바로 다음 데이터 열의 시작 padding은 0이다.
- [ ] 커스텀 선택 열의 16px Checkbox 양옆 간격도 Small 12px·Medium 16px인지 header/body에서 실측한다.
- [ ] 커스텀 선택 열에 별도 Checkbox를 추가하지 않으며 내장 checkbox/radio와 같은 40/48px 규격을 유지한다.
- [ ] 커스텀 선택 열의 checked/indeterminate/disabled와 accessible name은 호출부 값을 유지한다.
- [ ] radio selection의 RadioGroup accessible name이 `selectionLabels.selectionColumn` 또는 기본값 `${ariaLabel} 행 단일 선택`인지 확인한다.
- [ ] Radio Table에 accessible name이 있는 `radiogroup` 하나와 행별 공용 `Radio` item이 렌더링된다.
- [ ] Radio에서 ↑↓ 이동 시 focus와 선택이 함께 이동하며 row click/action은 실행되지 않는다.
- [ ] 실제 선택 행에만 왼쪽 3px blue accent가 나타나며 disabled 행은 선택·action에서 제외되는지 확인한다.
- [ ] sort가 none → ascending → descending → none 순서인지, single과 multiple의 배열 규칙이 다른지 확인한다.
- [ ] unsorted sortable column의 arrow는 보이지 않고, 나타남/사라짐이 opacity 0.2s인지 확인한다.
- [ ] 단일 row action이 visible label의 `Button size="small" variant="tertiary"`로 표시되는지 확인한다.
- [ ] `triggerMode="menu"`에서는 작업 1개도 more_vertical Menu이며, 작업 0개는 숨김이다.
      기존 auto 사용처의 0/1/2개 패턴, disabled/busy, Escape 및 확인창 focus 복원이 유지된다.
- [ ] 동일 행에서 작업 배열 0→1→2→1, 조회/수정 모드와 권한 변경에 따라 표현이 바뀌는지 확인한다.
- [ ] 메뉴를 Escape로 닫으면 callback을 호출하지 않고, 작업 선택→확인창→취소에서 callback이 한 번만 실행되는지 확인한다.
- [ ] `renderRowAction`의 추가 열이 Empty/Loading의 colSpan에 포함되고 사용자 정의 컬럼과 같은 동작을 사용하는지 확인한다.
- [ ] 브라우저 DOM이 있는 테스트에서도 초기 static render는 닫힌 메뉴 Portal을 만들지 않는지 확인한다.
- [ ] 복수 row action이 `more_vertical` IconButton 하나와 small Menu로 표시되고, 여러 Icon Button이 나란히 노출되지 않는지 확인한다.
- [ ] 위험한 복수 작업 앞에 Divider가 있고 danger label/Icon이 적용되는지 확인한다.
- [ ] row action을 마우스·키보드로 실행해도 row click이 함께 실행되지 않고 Menu 닫힘 후 trigger로 focus가 복원되는지 확인한다.
- [ ] 길어진 cell의 ellipsis와 Tooltip, row action hover/focus/menu 동작을 확인한다.
- [ ] 기본 상태에서 모든 th 하단에 1px divider가 보이는지 확인한다.
- [ ] `maxHeight`에서 header가 sticky이고 scroll 시 divider는 유지한 채 overlay shadow가 보이는지 확인한다.
- [ ] dialog를 높이 720px·721px 등의 viewport에서 확인하고, 50개 행의 중간 위치를 스크롤해 상단 border와 header 사이에 body 글자가 비치지 않는지 확인한다. 소수 픽셀 좌표에서도 Small 32px/40px 규격과 한 줄 header를 유지한다.
- [ ] frame의 상단 paint guard가 선택 control·정렬 버튼·스크롤바의 포인터 동작을 막지 않는지 확인한다.
- [ ] frame이 data보다 길면 마지막 body row divider가 유지되고, 실제 frame bottom에 닿을 때만 divider가 제거되어 2px로 겹쳐 보이지 않는지 확인한다.
- [ ] 클릭 가능한 행이 pointer cursor이며 Enter/Space로 같은 callback을 실행하는지 확인한다.
- [ ] 행에 keyboard focus가 있을 때 2px 링이 행 외곽에만 연속해서 표시되고, Shift+휠 가로 스크롤 중에도 셀 경계별 파란 사각형이 생기지 않는지 확인한다.
- [ ] Empty / Loading이 aria-hidden `colSpan` spacer로 header와 160px body 높이를 유지하고 Loading이 공용 Spinner를 쓰는지 확인한다.
- [ ] Medium/Small Loading이 각각 정해진 Spinner·regular 문구·gap profile을 사용하고 status가 한 번만 읽히는지 확인한다.
- [ ] 최소 너비가 viewport보다 큰 Empty Table을 좌우 끝까지 가로 스크롤해도 문구 중심이 현재 frame의 수평 중앙에서 움직이지 않는지 확인한다.
- [ ] Empty가 `ListContentState presentation="embedded"`를 사용하고 Medium은 regular(32px icon,
      18/28px title, 14/20px description), Small은 compact(24px icon, 14/20px title, 12/16px
      description)를 표시하며 error만 `role="alert"`인지 확인한다.
- [ ] Small header는 12/16px, body 일반 텍스트는 14/20px이면서 Checkbox·Button·Status의 클릭 영역과
      자체 size 계약은 축소되지 않는지 확인한다.
- [ ] 조회 오류에는 실제 `다시 시도`, 검색·필터 결과 없음에는 조건 초기화 action만 small tertiary로 표시되고 Page notification·toolbar의 복구 action이나 단순 빈 목록의 등록 CTA가 중복되지 않는지 확인한다.
- [ ] 라이트/다크의 table token 값과 0.2s 색상 전환을 확인한다.
- [ ] Pagination 조합 시 sort 후 page 1로 돌아가고, Pagination이 Table 내부 의존성으로 추가되지 않는지 확인한다.

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 Table을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

### 행별 이동 조건

- `onRowClick`과 `isRowClickable(row, index)`가 모두 허용하는 행만 pointer, Tab focus,
  Enter/Space 및 클릭 이동을 제공한다. predicate 생략 시 기존의 전체 행 이동 동작을 유지한다.
- predicate가 false여도 내부 Checkbox/Radio 및 작업 버튼을 비활성화하지 않는다.
  이동 불가 사유는 페이지가 해당 셀의 텍스트로 제공한다.
- 내부 버튼·입력에서 발생한 Enter/Space는 행 이동을 중복 실행하지 않는다.
- `onSortChange`가 없으면 정렬 버튼을 비활성화해 동작하지 않는 조작을 활성 상태로 보이지 않게 한다.
