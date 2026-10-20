# Edit Confirmation Dialog 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 6. 접근성

- Dialog의 focus trap, Escape/backdrop close, title/description 연결은 공용 Dialog에 위임한다.
- description override가 없어도 intent별 기본 설명을 렌더해 `aria-describedby`가 빈 안내를 가리키지 않는다.
- 열릴 때 안전한 tertiary Button에 focus를 둔다. 저장 확인에서는 `돌아가기`, 수정 취소·화면 이탈
  확인에서는 `계속하기`로 현재 유지되는 작업을 명시한다. 닫힐 때는 기본적으로 `returnFocusRef`가 가리키는
  trigger로 복원한다. 초기화처럼 현재 작업 위치가 바뀐 confirm 결과는 parent가 새 viewport 안의 다음
  focus target을 지정해 focus가 화면 밖 footer에 남지 않게 한다.
- confirm button text는 동사와 결과를 드러내야 한다. `확인`만 사용하지 않는다.
- 이 tertiary Button은 safe escape action이다. backdrop/Escape로 닫는 것은 draft discard가 아니라
  confirmation intent 취소로 취급한다.
- saving 중은 parent가 close를 무시하므로, request 시작 후 사용자가 뒤로 돌아가 변경이 취소됐다고
  오해하지 않게 Page action에도 pending text/disabled state를 제공한다.
