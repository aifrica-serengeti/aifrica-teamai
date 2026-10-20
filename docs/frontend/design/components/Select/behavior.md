# Select — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Select 문서 인덱스](./README.md)

## 5. 상태 스펙

### Trigger 상태 (Default variant)

| 상태             | border                                                                        | surface                               | 텍스트                                              | 비고                                                                 |
| ---------------- | ----------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------- |
| **Enabled**      | 1px `#dddddd` (`--form-border-default`)                                       | `#ffffff` (`--form-surface-active`)   | placeholder `#8f8f8f` (`--form-placeholder-active`) | 기본                                                                 |
| **Focused/Open** | 1px `var(--accent-500)` + inset box-shadow 1px (겹쳐 2px 효과) (`--form-border-active`) | `#ffffff`                             | —                                                   | 레이아웃 밀림 방지를 위해 border-width 고정 + box-shadow 로 2px 표현 |
| **Filled**       | 1px `#dddddd`                                                                 | `#ffffff`                             | 값 텍스트 `#1c1c1c` (`--text`)                      | 선택값 있음                                                          |
| **Invalid**      | 1px `#e81919` + inset 1px (`--form-border-invalid`)                           | `#ffffff`                             | —                                                   | `aria-invalid="true"`                                                |
| **Disabled**     | 1px `#dddddd`                                                                 | `#f8f8f8` (`--form-surface-inactive`) | `#aaaaaa` (`--text-disabled`)                       | 클릭 불가, 드롭다운 안 열림                                          |
| **Read-only**    | 1px `#dddddd`                                                                 | `#f8f8f8`                             | 값은 `#1c1c1c` 유지                                 | 선택 불가, 드롭다운 안 열림                                          |

### Trigger 상태 (Create variant)

| 상태             | border                    | surface                               | 비고                      |
| ---------------- | ------------------------- | ------------------------------------- | ------------------------- |
| **Enabled**      | 1px transparent           | `#f8f8f8` (`--form-surface-inactive`) | 채워진 표면, 생성 폼 전용 |
| **Focused/Open** | 1px `var(--accent-500)` + inset 1px | `#ffffff` (`--form-surface-active`)   | focus 시 표면 활성화      |

### 드롭다운 상태 (loading / error / empty)

| 상태        | prop             | 드롭다운 표시                               | leading                              |
| ----------- | ---------------- | ------------------------------------------- | ------------------------------------ |
| **Loading** | `loading={true}` | "데이터를 불러오는 중입니다" (disabled)     | Spinner `size="tiny"` (16px)         |
| **Error**   | `error={true}`   | "데이터 불러오기에 실패했습니다" (disabled) | Status `state="error" iconSize={16}` |
| **Empty**   | `options={[]}`   | "선택할 항목이 없습니다" (disabled)         | 없음                                 |

> loading/error/empty 상태에서는 trigger 가 disabled 되지 않는다. 사용자가
> 드롭다운을 열어 상태를 확인할 수 있다. 단, "모두 선택" 행은 표시하지 않는다.

이 기본 동작은 상태를 panel 안에서 설명해야 하는 standalone Select용이다. page가 option 0개를 이미
알고 있고 사용자가 panel에서 할 수 있는 action도 없다면 page는 trigger를 `disabled`로 전달하고,
field help에 원인과 다음 행동을 보이는 문구로 둔다. 이 경우 open state를 만들거나 chevron을 회전시키지
않는다.

Single의 filled trigger는 `value` 문자열 자체가 아니라 `options`에서 찾은 localized `label`을 표시한다.
빈 문자열(`""`)도 option 목록에 같은 value가 있으면 유효한 선택값으로 취급하며, placeholder 대신 해당
option의 localized `label`을 표시한다. 구형 API에서 빈 문자열을 "신규 생성" 같은 명시적 선택으로 사용하는
경우에도 선택 상태와 trigger 문구가 일치해야 한다.
searchable Single도 선택된 label을 input의 실제 `value`로 렌더링하고, `placeholder`는 선택값이 없을 때만
안내 문구로 사용한다. 선택값이 있는 상태에서 panel을 열면 input의 label을 유지하고 전체 option을 표시하며,
label 텍스트를 선택해 다음 입력이 즉시 검색어로 교체되게 한다. 사용자가 실제로 입력한 뒤에만 option을
검색 query로 필터링하고, panel이 닫히면 다시 선택된 label을 표시한다.
searchable 모드에서도 닫힌 field의 Tab 정지점은 combobox trigger 하나만 둔다. 내부 input은
`tabIndex={-1}`로 두고 panel이 열릴 때 컴포넌트가 직접 focus해 trigger와 input이 연속으로 Tab 순서에
노출되지 않게 한다.
현재 value가 option에 없으면 translation key/API enum을 그대로 보여 주지 않고 page가 safe fallback과
저장 차단 정책을 결정한다. loading/error/empty copy와 option description, clear accessible label도
모두 locale resource에서 공급한다.

### Content 폭

`contentWidth`의 기본값은 `trigger`다. `content`는 option 폭이 짧고 trigger와 동일한 넓이가
오히려 불필요한 Pagination selector에 한해 사용한다. 폭 변형은 선택, keyboard, focus, portal
동작을 바꾸지 않는다.

`fullWidth`는 field와 trigger가 부모 cell의 100% 폭을 사용하게 하며 선택, open, focus 동작은 바꾸지 않는다.

### Portal 경계

기본 `portalMode="dialog"`는 열릴 때 가장 가까운 Dialog Content를 자동으로 찾아 portal container로
사용한다. Dialog가 없으면 body로 fallback하며, `portalMode="body"`를 명시하면 항상 body에 렌더링한다.
이 모드는 Dialog의 body scroll lock이 option wheel을 외부 상호작용으로 차단하는 것을 막고,
option layer가 Dialog Body의 `overflow: hidden`에 잘리지 않게 한다. 선택·검색·focus·닫힘 규칙은 동일하다.

### Option viewport

`maxVisibleOptions`를 지정하면 지정 개수를 초과하는 option은 listbox 내부에서 선택한다.
scroll container는 공용 `ScrollArea`이며 `type="auto"`의 overlay thumb를 사용한다. 기본은
기존처럼 모든 option을 표시한다. 이 제한은 option 표시 높이만 바꾸며 선택, 닫힘,
loading/error/empty 상태 규칙은 바꾸지 않는다.
Multi에서는 “모두 선택”과 Divider를 ScrollArea 밖의 listbox 최상단에 유지한다. 검색이나 스크롤로
실제 option 위치가 바뀌어도 “모두 선택”은 움직이지 않는다. 실제 option 수가 `maxVisibleOptions` 이하이면
ScrollArea 높이를 실제 행 수에 맞추며 scrollbar를 표시하지 않는다.

Invalid 상태에서는 trigger와 searchable input에 `aria-invalid="true"`를 함께 전달하고,
help/error ID를 `aria-describedby`로 연결한다. 오류 문구는 `role="alert"`로 갱신을 알린다.

---

## 9. 애니메이션

다중 선택의 칩 제거는 panel을 새로 열지 않고 trigger로 포커스를 복원한다. 전체 해제도 동일하다.
비활성 option으로 이미 선택된 값은 전체 선택/해제와 같이 보존한다: 그 칩에는 제거 버튼이 없고, 전체 해제는
그 값만 남기며, 제거할 값이 없으면 전체 해제 버튼을 표시하지 않는다.
`showSelectAll={false}`이면 전체 선택 행과 divider를 함께 숨긴다. disabled/read-only 전환 시 열린 panel을
닫고 다시 활성화해도 자동으로 재개하지 않는다. 숨겨진 측정 칩은 표시·클릭·Tab 순서에 참여하지 않는다.
`messages.remove`의 `{label}`은 해당 옵션 라벨로 치환한다. `messages.noResults`는 검색 결과가 없을 때,
`messages.empty`는 옵션 자체가 없을 때 사용한다. 기존 `messages.empty`만 지정한 호출부의 검색 문구도 유지한다.

### 다크/라이트 전환

색상 관련 요소(trigger, item, chevron, chip 등)에 `transition: '<속성> 0.2s ease'` 적용한다.
option item은 `background-color`, `color`만 전환해 hover·pressed·selected 상태가 깜빡이지 않게 한다.
전역 `*` 셀렉터 금지. `transition: all` 금지.

### 드롭다운 open/close

fade + slide 6px, 0.15s ease. `data-side` 속성으로 방향별 keyframes 적용.

### Chevron 회전

`transform: rotate(180deg)`, 0.2s ease. `data-state="open"` 일 때.

### Clear button

`opacity` 변화, 0.2s ease.

> option item은 `@media (prefers-reduced-motion: reduce)`에서 전환을 즉시 완료한다.

---

### 입력창 로딩 표시

`loading`이면 panel을 열지 않아도 placeholder/선택값 앞에 Spinner를 표시한다. 기존 선택값을 지우거나 loading만으로 disabled를 강제하지 않는다. 부모가 `disabled`를 함께 전달하면 입력을 막으면서 스피너를 유지한다. 완료·실패 시 부모가 loading을 해제하면 스피너도 사라진다.
