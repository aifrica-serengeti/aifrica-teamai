# Edit Confirmation Dialog 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 3. controlled state contract

```tsx
const [confirmationAction, setConfirmationAction] =
  useState<EditConfirmationAction>();
const [saving, setSaving] = useState(false);

const confirm = () => {
  const action = confirmationAction;
  setConfirmationAction(undefined);
  if (action === "save") {
    void save();
  } else if (action === "cancel") {
    cancelDraft();
  }
};

<EditConfirmationDialog
  action={confirmationAction}
  saveTitle="솔루션 정보를 저장할까요?"
  saveDescription="변경 사항이 즉시 적용됩니다."
  cancelTitle="수정을 취소할까요?"
  cancelDescription={
    <>
      변경한 내용은 저장되지 않습니다.
      <br />
      작성 중인 값은 모두 초기화됩니다.
    </>
  }
  returnFocusRef={confirmationTriggerRef}
  onConfirm={confirm}
  onOpenChange={(open) => {
    if (!open && !saving) setConfirmationAction(undefined);
  }}
/>;
```

### 3.1 parent가 반드시 지킬 규칙

1. user가 Save/Cancel을 눌렀을 때 parent만 `action`을 설정한다. Dialog가 입력값, draft, route를
   직접 알거나 변경하지 않는다.
2. `onConfirm`의 첫 줄에서 현재 action을 local variable로 읽고 `undefined`로 닫는다. 이 순서로
   double click/비동기 state update 중 같은 intent가 두 번 실행되는 일을 줄인다.
3. Save를 열기 전에 client validation을 통과시킨다. 실제 `save()` 시작 직전에도 validation한다.
4. saving 중에는 Page의 Save/Cancel control을 disabled하고 `onOpenChange(false)`도 무시한다.
   현재 Dialog의 public API에는 `disabled` prop이 없으므로, parent가 action reset을 막는 것이
   dismissal policy의 소유자다.
5. request 실패 시 draft와 field errors를 유지한다. confirmation만 닫고 form으로 돌아와 오류를
   수정하게 한다.
6. 외부 Button으로 controlled Dialog를 열면 `returnFocusRef`에 해당 Button ref를 전달한다. confirm 결과가
   page의 작업 기준점과 scroll 위치를 바꾸면 mutation을 실행하기 전에 ref를 다음 focusable `HTMLElement`로
   갱신한다. 단순 dismiss에서는 원 trigger를 유지한다.
7. 안전 action의 기본 문구는 `action`으로 결정된다. 저장을 실행하지 않고 폼으로 복귀하면 `돌아가기`,
   수정 취소나 화면 이탈을 실행하지 않고 편집을 유지하면 `계속하기`다. locale 또는 도메인 override가
   필요한 경우에만 `continueLabel`을 전달한다.
8. description을 생략하면 save는 `변경 내용을 확인한 후 저장해 주세요.`, cancel은
   `저장하지 않은 변경 내용은 유지되지 않습니다.`를 표시한다. 영향이 더 구체적이면 caller 문구를 우선한다.
