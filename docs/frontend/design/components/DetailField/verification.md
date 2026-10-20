# Detail Field 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 9. 검증 체크리스트

- [ ] `<dl>` 안의 각 field가 하나의 `dt/dd` 묶음인가?
- [ ] empty/null/blank 값은 `-` 또는 지정한 emptyValue로 일관되게 표시되는가?
- [ ] short value는 ellipsis, URI/list는 wrap으로 표시되는가?
- [ ] edit 진입 시 field 위치·label·grid gap이 변하지 않는가?
- [ ] read-only, disabled, invalid, required, optional, help/error 상태를 각각 확인했는가?
- [ ] error가 있을 때 help가 중복 노출되지 않는가?
- [ ] `≤699px`에서 1열 흐름과 긴 값의 overflow를 확인했는가?
- [ ] light/dark에서 label/value/error/focus token이 올바른가?

## 10. 재현 잠금 계약

- **State:** `editing`, value, draft value, errors는 page 소유. field family는 state를 복제하지 않는다.
- **Geometry:** DetailItem/DetailInputField는 field 내부 spacing만 소유. grid/card는 DetailPage 소유다.
- **Renderer:** `DetailTextField`는 editing boolean에 따라 하나의 renderer만 mount한다. 읽기와 입력을
  동시에 숨겨 두지 않는다.
- **Responsive:** field 자체는 폭 100%/min-width 0을 유지하며, 2→1열 전환은 parent grid만 한다.

