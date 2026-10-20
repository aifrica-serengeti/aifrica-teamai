# Select — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

Multi listbox에는 `aria-multiselectable="true"`, 비활성 option에는 `aria-disabled="true"`를 제공한다.
칩 제거 버튼의 이름은 `messages.remove`(기본 `{label} 제거`)로 어떤 값을 제거하는지 구분한다.
제거 버튼은 `tabIndex=-1`로 두고, 키보드 사용자는 listbox에서 같은 값을 토글할 수 있다.
비활성 option으로 선택된 값의 칩에는 제거 버튼이 없고 listbox의 같은 option은 `aria-disabled`이므로, 키보드 사용자도 그 값을 제거하지 않는다("비활성 선택값 보존").
측정용 칩은 `aria-hidden`과 `inert`로 접근성 트리와 Tab 순서에서 제외한다.
Trigger의 `aria-expanded`는 실제 열린 상태와 일치하며 disabled/read-only에서는 항상 false다.
열린 trigger와 searchable input의 `aria-controls`는 같은 안정적인 listbox ID를 가리키고,
그 ID는 popup의 실제 `role="listbox"` 요소에 부여한다. 닫힌 상태에서는 존재하지 않는 popup을
참조하지 않도록 `aria-controls`를 제거한다.

[← Select 문서 인덱스](./README.md)

## 10. 접근성

| 항목                 | 스펙                                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trigger role         | `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`                                                                                         |
| Trigger aria-invalid | `aria-invalid="true"` (invalid 상태 시)                                                                                                               |
| Trigger name         | 보이는 label ID를 `aria-labelledby`로 연결. 시각적 label이 없으면 `ariaLabel` 사용                                                                    |
| Help/Error 연결      | help/error ID를 trigger와 searchable input의 `aria-describedby`에 연결                                                                                |
| Required             | required 상태를 trigger와 searchable input의 `aria-required="true"`로 전달                                                                            |
| Trigger tabIndex     | disabled/read-only 시 `-1`, 그 외 `0`                                                                                                                 |
| 드롭다운             | 안정적인 `id`, `role="listbox"`; 열린 trigger/search input의 `aria-controls` 대상                                                                     |
| Option               | `role="option"`, `aria-selected`                                                                                                                      |
| 키보드               | Tab 으로 trigger 포커스 이동. Enter/Space 로 드롭다운 토글. 방향키 미지원(Popover 기반). Enter/Space 로 option 선택.                                  |
| clear button         | `aria-label="선택 모두 지우기"`, `tabIndex={-1}` (트리거 포커스 유지)                                                                                 |
| 검색 input           | 보이는 label이 있으면 같은 `aria-labelledby`를 사용하고, 없으면 `ariaLabel` 또는 검색 기본 문구 사용. `tabIndex={-1}`로 두고 panel open 시 직접 focus |
| "모두 선택"          | `role="option"`, `aria-selected`. Checkbox 의 `indeterminate` 상태로 일부 선택 표시                                                                   |

`fullWidth`, `contentWidth="content"`과 `maxVisibleOptions`는 시각적 geometry만 바꾸므로
combobox/listbox role, focus 순서와 키보드 동작은 기본 Select와 동일하게 유지한다.
`maxVisibleOptions`의 option viewport는 공용 `ScrollArea`를 사용하며 browser native scrollbar를
노출하지 않는다. Multi listbox의 첫 option인 “모두 선택”은 ScrollArea 밖의 고정 영역에 있어도 같은
`role="listbox"` 안에 유지하며, 이어지는 실제 option만 스크롤한다.
`portalMode="dialog"`는 listbox의 DOM portal container만 바꾸며 combobox/listbox 관계, focus trap,
accessible name과 키보드 순서는 유지한다. listbox가 Dialog Content 경계 안에 남으므로 modal 외부
상호작용으로 오인되지 않는다.

---

검색·빈 상태·오류·선택 해제 등 사용자 노출 문구는 `messages`로 현재 page locale을 주입한다.
searchable input은 상태와 관계없이 별도 Tab 정지점으로 만들지 않으며, panel이 닫힐 때 검색 query를 초기화한다.
invalid help/error는 `role="alert"`로 알리되 `aria-describedby` 연결을 유지해 focus 시에도 원인을 다시 읽을 수 있게 한다.

### 입력창 로딩 접근성

로딩 중 trigger는 `aria-busy="true"`를 제공하며 완료 시 제거한다. 입력창 Spinner의 접근 가능한 이름은 `messages.loading`을 사용한다. label/help 연결과 disabled 상태는 기존 계약을 유지한다.
