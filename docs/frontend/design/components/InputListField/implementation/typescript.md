# Input List Field TypeScript

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 7. 복사 가능한 구현 코드

```tsx
export function InputListField({
  label,
  values,
  placeholder,
  error,
  optional = false,
  required = !optional,
  size = "medium",
  variant = "default",
  type = "text",
  onValueChange,
}: InputListFieldProps) {
  const update = (index: number, value: string) => {
    onValueChange(
      values.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };
  const remove = (index: number) => {
    if (values.length > 1)
      onValueChange(values.filter((_, itemIndex) => itemIndex !== index));
  };
  return (
    <div className={styles.root}>
      <p className={styles.label}>
        {label}
        {optional ? <span>(선택사항)</span> : null}
        {required ? <span>*</span> : null}
      </p>
      <div className={styles.list}>
        {values.map((value, index) => (
          <div key={`${label}-${index}`} className={styles.row}>
            <Input
              aria-invalid={Boolean(error) || undefined}
              aria-label={`${label} ${index + 1}`}
              className={styles.input}
              placeholder={placeholder}
              size={size}
              type={type}
              value={value}
              variant={variant}
              onChange={(event) => update(index, event.target.value)}
            />
            <IconButton
              aria-label={`${label} 항목 삭제`}
              disabled={values.length === 1}
              icon="eliminate"
              iconSize="l"
              size="xlarge"
              variant="ghost"
              onClick={() => remove(index)}
            />
          </div>
        ))}
      </div>
      <Button
        className={styles.addButton}
        leadingIcon="plus"
        size="small"
        variant="tertiary"
        onClick={() => onValueChange([...values, ""])}
      >
        항목 추가
      </Button>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
```

