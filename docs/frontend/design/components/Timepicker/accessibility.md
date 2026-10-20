# Timepicker — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Timepicker 문서 인덱스](./README.md)

## 9. Interaction와 접근성

| 대상            | 필수 동작 / ARIA                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| field           | `role="combobox"`, `aria-haspopup="dialog"`, `aria-expanded={open}`, single은 `aria-label="시간 선택"`, range는 `aria-label="시간 범위 선택"` |
| open            | field click, clock click, Enter, Space, ArrowDown                                                                                             |
| close           | 선택 완료, 취소, outside click, Escape                                                                                                        |
| clock           | native `button`, `aria-label="시간 선택"`, `aria-haspopup="dialog"`, `aria-expanded`; readOnly/disabled에서 native `disabled`                 |
| readOnly        | `aria-readonly=true`, `tabIndex=-1`, inactive surface지만 시간 값은 enabled text 색                                                           |
| disabled        | `tabIndex=-1`, text/icon disabled 색, native clock disabled                                                                                   |
| time column     | `role="listbox"`, `aria-label="시" / "분" / "초"`                                                                                             |
| option          | native button + `role="option"` + `aria-selected` + `data-selected`                                                                           |
| option keyboard | Tab으로 이동, Enter/Space로 선택                                                                                                              |

새로 열린 popover에서 현재 selected option은 `scrollIntoView({ block: 'center' })`로 각 column의 중앙 부근에 놓는다.

