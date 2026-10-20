# Notification — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](./README.md)

## 9. 접근성

- close/clear는 각각 구체적인 `aria-label`(예: `알림 닫기`, `모든 알림 닫기`)을 가진 실제 button이다.
- close와 actionable button은 Tab/Enter/Space로 동작하며, focus ring은 의존 Button/Icon Button이 제공한다.
- Status 아이콘 슬롯은 중복 낭독을 막기 위해 `aria-hidden=true`다. 알림의 role이 상태를 전달한다.
- Link는 실제 `<a>`를 사용한다. 새 창이면 `target="_blank"`와 안전한 `rel`을 전달한다.
- ScrollArea의 keyboard scroll/drag/hover scrollbar는 ScrollArea 의존 컴포넌트에 위임한다.
- viewport mount wrapper는 `pointer-events: none`, 실제 Notification은 `pointer-events: auto`여서
  보이지 않는 Container 여백이 뒤 page의 keyboard/pointer interaction을 막지 않는다.
- error Toast는 `role="alert"`, 나머지는 `role="status"`다. 같은 오류를 inline alert와 Toast에서
  동시에 읽지 않는다.
- `titleOverflow="wrap"`은 제목의 시각적 줄바꿈만 바꾸며 제목 DOM과 낭독 순서를 유지한다. 확대·좁은
  viewport에서도 텍스트가 가로로 잘리거나 다른 control을 덮지 않아야 한다.

자동으로 닫히는 Actionable은 재시도·닫기 버튼의 기존 키보드 조작을 유지한다. 시간이 지나도 필요한 작업은 원래 화면의 버튼에서 다시 실행할 수 있어야 한다.

- 공용 `aria-live="polite"` viewport를 앱 mount부터 유지한다. 새 알림 때문에 입력 포커스를 이동하지 않는다.
- Dialog가 열려 있을 때도 기존 focus trap을 유지한다. 재시도 버튼은 Dialog 내부에 남긴다.
- 공용 전체 닫기는 `Alt+Shift+N`으로 실행할 수 있다. clear button에 `aria-keyshortcuts`와 설명을 제공한다.
  이 단축키는 Dialog를 닫거나 포커스를 빼앗지 않는다. modal 밖에서는 개별/전체 닫기를 Tab/Enter로도 조작한다.
- viewport 아래 투명 영역은 클릭을 통과시키며, 좁은 화면에서도 본문과 닫기 버튼이 화면 밖으로 나가지 않는다.

### 공용 스택의 스크롤과 복구

모달이 열린 상태에서도 공용 알림 스택의 휠·터치 스크롤을 허용한다. 알림 밖의 배경 스크롤 잠금과 Dialog focus trap은 유지한다. API 실패 후 페이지 포커스는 의미 있는 등록/변경 버튼으로 복귀하며, 재시도 버튼의 보이는 이름은 토스트가 사라진 뒤에도 대상을 구분할 수 있어야 한다.
