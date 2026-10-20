# Select — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Select 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 색상 (라이트)

- [ ] Trigger enabled 테두리가 `#dddddd` (`--form-border-default`)
- [ ] Trigger open/focus 테두리가 `var(--accent-500)` (`--form-border-active`), 2px 로 보임(inset box-shadow 기법)
- [ ] Trigger invalid 테두리가 `#e81919` (`--form-border-invalid`)
- [ ] Trigger disabled 표면이 `#f8f8f8` (`--form-surface-inactive`), 텍스트 `#aaaaaa`
- [ ] Create variant 표면이 `#f8f8f8` (border 없음)
- [ ] 드롭다운 배경이 `#ffffff` (`--menu-surface`), 테두리 `#dddddd`
- [ ] 드롭다운 그림자가 `--menu-shadow` (navy tone)
- [ ] Item hover 배경이 `#f8f8f8` (`--menu-item-hovered`)
- [ ] Item hover/pressed/selected 배경과 텍스트가 0.2s ease로 전환되어 깜빡이지 않음
- [ ] Selected item 배경이 `var(--accent-50)` (`--menu-item-selected`), 텍스트 `var(--accent-500)`
- [ ] Chevron 아이콘 색상이 `#1c1c1c` (`--icon`), disabled 시 `#aaaaaa`
- [ ] Clear button 이 회색 원형(`#555555`) + 흰 X(`#ffffff`), 16px
- [ ] Chip 이 `var(--accent-50)` 배경 + `var(--accent-500)` 텍스트
- [ ] 모든 색상을 토큰 변수로 참조 (hex 하드코딩 없음)

### 색상 (다크)

- [ ] Trigger 표면이 `#1c1c1c` 로 전환
- [ ] Focus 테두리가 `var(--accent-400)` (더 밝은 primary)
- [ ] 드롭다운 배경이 `#1c1c1c` 로 전환
- [ ] Selected item 배경이 `color-mix(accent-400 12%, transparent)` 로 전환
- [ ] 다크 전환이 깜빡임 없이 0.2s ease 로 부드럽게

### 레이아웃

- [ ] field 가 세로 정렬(`flex column`), gap **4px**, standalone 기본 width **320px**
- [ ] Create/Detail grid와 Popover 조합에서는 `fullWidth`로 root/trigger가 parent cell의 100% 폭을 쓰고 `min-width: 0`임
- [ ] labelRow 요소 간 gap 이 **2px** (Label ↔ (선택사항) ↔ \* ↔ info icon)
- [ ] Label 텍스트가 Title2(**14px SemiBold**) `#1c1c1c`
- [ ] (선택사항) 텍스트가 Body3(**12px Regular**) `#757575`
- [ ] required(\*) 가 Body2(**14px Regular**) `#e81919`
- [ ] info icon 이 14px, `#757575`
- [ ] Help text 가 Body3(**12px Regular**) `#555555`, invalid 시 `#d00a0a`
- [ ] 긴 Help/Error 문구가 field 폭 안에서 줄바꿈되고 인접 grid column이나 viewport를 밀지 않음
- [ ] Trigger 높이가 Small 28 / Medium 32 / Large 36 / X-Large 40px
- [ ] Trigger 가로 패딩이 `pl 12px, pr 6px` (single/multi)
- [ ] Trigger border-radius 가 **4px**
- [ ] Chevron 이 16px, open 시 180deg 회전
- [ ] 기본 드롭다운은 최소 너비 140px, 트리거 너비에 맞춤
- [ ] `contentWidth="content"`은 가장 긴 option 폭에 맞고 viewport available-width를 넘지 않음
- [ ] `maxVisibleOptions={6}`은 size별 option 행 6개까지만 보이고 초과 option을 listbox 내부에서 스크롤함
- [ ] Dialog 안에서는 기본값 또는 `portalMode="dialog"`로 option layer가 trigger 전체 폭을 유지하며 Dialog 경계에 잘리지 않음
- [ ] Dialog 밖에서는 body로 fallback하고 `portalMode="body"` 명시 시 자동 Dialog 탐색을 사용하지 않음
- [ ] Dialog 안의 긴 option 목록에서 wheel이 page/Dialog body가 아니라 option `ScrollArea`를 스크롤함
- [ ] option이 6개 이하이면 실제 option 행 높이만 사용하고 overlay thumb가 생기지 않음
- [ ] option viewport는 공용 `ScrollArea`의 overlay thumb를 사용하며 브라우저 native scrollbar가 보이지 않음
- [ ] Item 패딩이 size 별로 small 4px / medium 6px / large 8px
- [ ] Chip 간 gap 이 4px
- [ ] Clear button 이 16×16px 원형
- [ ] Divider 가 위아래 2px 여백(`margin: 2px 0`)

### Single 모드

- [ ] 옵션 클릭 시 선택 후 드롭다운이 닫힘
- [ ] Selected 옵션에 우측 check 아이콘 표시
- [ ] searchable 시 트리거 안에서 타이핑으로 옵션 필터링
- [ ] 검색 결과 없을 시 "검색 결과가 없습니다." 표시
- [ ] Single selected value가 API value/key가 아니라 현재 locale의 option label로 표시
- [ ] 빈 문자열 value가 option에 존재하면 placeholder가 아니라 해당 option의 localized label로 표시
- [ ] searchable Single의 선택 label이 placeholder가 아닌 input value로 표시
- [ ] searchable Single을 열면 선택 label이 유지되고 입력 전에는 전체 option이 표시
- [ ] 선택 label이 열린 input에서 전체 선택되어 첫 입력으로 기존 label을 교체

### Multi 모드

- [ ] 옵션 클릭 시 토글, 드롭다운 열린 상태 유지
- [ ] Selected 옵션에 좌측 checkbox(checked) 표시
- [ ] 선택값이 chip 으로 트리거에 표시
- [ ] Chip 의 ✕ 클릭 시 개별 제거
- [ ] Clear button 클릭 시 전체 제거
- [ ] Chip 이 container 너비를 넘치면 "+N" overflow chip 표시
- [ ] "+N" chip 이 잘리지 않고 표시됨
- [ ] Large/X-Large size 에서 chip 이 medium(24px) 크기
- [ ] "모두 선택" 행이 최상단에 표시, 하단에 divider
- [ ] option을 스크롤해도 "모두 선택" 행과 divider는 최상단에 고정됨
- [ ] "모두 선택" checkbox 가 indeterminate(일부 선택) 상태 표시
- [ ] loading/error/empty 시 "모두 선택" 행 미표시
- [ ] `showSelectAll=false` 시 전체 선택과 divider가 함께 사라짐
- [ ] 전체 선택/해제가 기존 비활성 선택값을 변경하지 않음
- [ ] 비활성 option으로 선택된 값의 칩에는 제거 버튼이 없고, 전체 해제는 그 값만 남기며, 그 값만 선택되어 있으면 전체 해제 버튼이 없음
- [ ] 칩 제거·전체 해제가 panel을 새로 열지 않고 trigger 포커스를 유지함
- [ ] 값 추가/제거·폭 변경·긴 라벨에서 +N을 다시 계산하며 숨겨진 측정 칩은 읽히거나 포커스되지 않음
- [ ] disabled/read-only로 바꾸면 panel이 닫히고 aria-expanded가 false로 유지됨
- [ ] Multi listbox의 aria-multiselectable 및 비활성 option의 aria-disabled 확인

### Loading / Error / Empty

- [ ] loading 시 Spinner(16px) + "데이터를 불러오는 중입니다" disabled option
- [ ] error 시 Status error icon(16px) + "데이터 불러오기에 실패했습니다" disabled option
- [ ] empty 시 "선택할 항목이 없습니다" disabled option
- [ ] trigger 는 클릭 가능 (disabled 아님)
- [ ] page가 후보 0개와 no-action을 이미 알면 trigger가 disabled이고 help에 이유가 보이며 chevron이 회전하지 않음
- [ ] option/selected/description/loading/error/empty/accessible copy에 translation key 또는 raw enum이 노출되지 않음
- [ ] Status error icon 이 채워진 빨간 원 + 흰 X 모양 (lucide CircleX 아님)

### 접근성

- [ ] Trigger 에 `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded` 있음
- [ ] 열린 trigger와 searchable input의 `aria-controls`가 실제 listbox ID와 일치하고 닫히면 제거됨
- [ ] 보이는 label ID가 trigger와 searchable input의 `aria-labelledby`에 연결됨
- [ ] 시각적 label이 없으면 의미 있는 `ariaLabel`이 trigger/searchable input의 accessible name으로 사용됨
- [ ] help/error ID가 trigger와 searchable input의 `aria-describedby`에 연결되고 invalid 오류는 `role="alert"`임
- [ ] required·invalid 상태가 trigger와 searchable input에 동일하게 전달됨
- [ ] Option 에 `role="option"`, `aria-selected` 있음
- [ ] invalid 시 `aria-invalid="true"`
- [ ] Tab 으로 trigger 포커스 이동 가능
- [ ] searchable trigger 내부 input은 `tabIndex=-1`이며 닫힌 field에서 Tab 정지점이 trigger 하나뿐임
- [ ] Enter/Space 또는 클릭으로 panel을 열면 searchable input으로 focus가 이동함
- [ ] Enter/Space 로 드롭다운 토글, option 선택
- [ ] `portalMode="dialog"`에서도 focus trap과 combobox/listbox 접근성 관계가 유지됨
- [ ] Clear button 에 `aria-label` 있음

### 의존성

- [ ] Checkbox 가 공용 Checkbox 컴포넌트를 사용함 (직접 구현 아님)
- [ ] Chip 이 공용 Chip 컴포넌트를 사용함
- [ ] Spinner 가 공용 Spinner 컴포넌트를 사용함 (loading 상태)
- [ ] Status 가 공용 Status 컴포넌트를 사용함 (error 상태, `iconSize={16}`)
- [ ] `maxVisibleOptions` 상태의 option viewport가 공용 ScrollArea를 사용함
- [ ] 드롭다운 시각 토큰이 Menu(`--menu-*`)와 동일

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Select 를 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), 이 문서의 의존 컴포넌트(Checkbox · Chip · Spinner · Status) 가이드라인과 명시된 폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 Popover portal surface, focus 제어(searchable 시 트리거 input 포커스 유지), open/close animation, chip overflow 측정, single/multi 상태 관리를 소유한다. 부모는 controlled API(`value`/`onValueChange`, `values`/`onValuesChange`)로만 연결한다.
- **변형 금지**: 임의 z-index, native `<select>` 요소, DropdownMenu primitive(searchable combobox 불가), 문서에 없는 viewport 재배치는 사용하지 않는다.
- **검증 기준**: 이 문서의 검증 체크리스트(섹션 13)를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠, light/dark 상태를 함께 확인한다.

### 입력창 로딩 검증

- [ ] Single/Multi × searchable 조합에서 닫힌 입력창의 placeholder/선택값 앞에 tiny Spinner가 보인다.
- [ ] disabled와 loading을 함께 전달해도 Spinner가 보이고 panel은 열리지 않는다.
- [ ] 재조회 중 선택값이 유지되고 완료·실패 후 Spinner와 aria-busy가 제거된다.
- [ ] 최초 조회·재조회에서 field 높이가 늘어나지 않으며 loading 접근성 문구를 주입할 수 있다.
