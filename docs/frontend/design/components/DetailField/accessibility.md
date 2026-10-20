# Detail Field 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 8. 접근성

- definition presentation에는 `<dl> → <dt>/<dd>` 순서를 유지한다.
- Input field에는 visible label과 `htmlFor/id`가 필수다.
- validation error 시 Input `aria-invalid`를 true로 전달한다. page/form 수준 error에는 별도의
  `role="alert"`를 사용한다.
- 긴 값이 ellipsis가 되면 detail context에서 전체 값을 확인할 수 있어야 한다. 중요 ID는 copy action,
  Table cell은 Tooltip, URL은 wrap 중 하나를 선택한다.
- `readOnly` value는 keyboard로 접근 가능해야 한다. disabled는 실제 조작 금지일 때만 쓴다.

