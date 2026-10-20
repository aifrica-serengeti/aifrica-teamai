# Edit Confirmation Dialog TypeScript

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 7. 복사 가능한 구현 코드

```tsx
export type EditConfirmationAction = "save" | "cancel";

export interface EditConfirmationDialogProps {
  returnFocusRef?: RefObject<HTMLElement | null>;
  // 나머지 controlled action/copy callback props
}

export function EditConfirmationDialog({
  action,
  saveTitle,
  saveDescription,
  continueLabel,
  confirmLabel = "저장하기",
  cancelTitle = "수정을 취소할까요?",
  cancelDescription,
  cancelConfirmLabel = "나가기",
  returnFocusRef,
  onOpenChange,
  onConfirm,
}: EditConfirmationDialogProps) {
  if (action === undefined) return null;
  const isSaveAction = action === "save";
  const safeLabel = continueLabel ?? (isSaveAction ? "돌아가기" : "계속하기");

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent
        size="small"
        profile="confirmation"
        title={isSaveAction ? saveTitle : cancelTitle}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef?.current?.focus();
        }}
        description={
          <span className={styles.description}>
            {isSaveAction ? saveDescription : cancelDescription}
          </span>
        }
        footer={
          <>
            <Button
              size="medium"
              variant="tertiary"
              onClick={() => onOpenChange(false)}
            >
              {safeLabel}
            </Button>
            <Button size="medium" variant="primary" onClick={onConfirm}>
              {isSaveAction ? confirmLabel : cancelConfirmLabel}
            </Button>
          </>
        }
      />
    </Dialog>
  );
}
```

기본 문구가 아닌 locale별 문구가 필요하면 현재 intent에 맞춰 safe action을 전달한다.

```tsx
<EditConfirmationDialog
  action={confirmationAction}
  continueLabel={confirmationAction === "save" ? t("return") : t("continue")}
  {...copyAndCallbacks}
/>
```
