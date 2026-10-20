# Edit Confirmation Dialog 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 8. 검증 체크리스트

- [ ] `undefined`, save, cancel 세 상태에서 mount/copy/action이 맞는가?
- [ ] backdrop/Escape/tertiary safe action이 draft를 지우지 않고 Dialog만 닫는가?
- [ ] save의 safe action은 `돌아가기`, cancel/leave의 safe action은 `계속하기`로 표시되는가?
- [ ] confirm은 정확히 한 번만 save/cancel handler를 실행하는가?
- [ ] invalid form에서 save confirmation이 열리지 않는가?
- [ ] saving 중 buttons, dialog dismissal, 중복 confirm이 적절히 막히는가?
- [ ] request failure 뒤 values와 field error가 유지되는가?
- [ ] 긴 description이 두 줄을 넘지 않고, 명시한 `\n`이 의미 단위 줄바꿈으로 표시되는가?
- [ ] save/cancel description을 생략해도 intent별 기본 설명이 표시되고 빈 `aria-describedby`가 생기지 않는가?
- [ ] width가 Dialog 공통 Confirmation profile과 같은 400px이며 page별 임의 너비를 추가하지 않았는가?
- [ ] light/dark의 Dialog 색상은 공용 Dialog를 따르는가?
- [ ] keyboard focus가 열릴 때 tertiary safe action으로 이동하는가? dismiss 시 원 trigger로 돌아가고, confirm 결과가
      page 위치를 바꾸면 `returnFocusRef`의 새 target이 현재 viewport 안에서 focus를 받는가?

## 9. 재현 잠금 계약

- **State:** `confirmationAction`의 단일 소유자는 parent Page다. Dialog는 action을 변경하지 않고
  callback으로 intent만 알린다.
- **Scope:** save/cancel confirmation만 다룬다. destructive/success result는 다른 Dialog contract다.
- **Geometry:** Dialog shell, focus, portal, footer spacing은 Dialog/Button guide가 소유한다. 이
  component는 small shell 위의 400px width, two-line description과 footer action 순서만 추가한다.
