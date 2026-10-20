# Detail Field 사용 예시

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

```tsx
<section className={styles.card} aria-label="솔루션 기본 정보">
  <dl className={styles.detailGrid}>
    <DetailTextField
      editing={isEditing}
      label="이름"
      value={resource.name}
      editingValue={draft?.name}
      error={errors.name}
      required
      onValueChange={(value) => updateDraft("name", value)}
    />
    <DetailTextField
      editing={isEditing}
      label="Client ID"
      readOnly
      value={resource.clientId}
    />
    <DetailTextField
      className={styles.fullWidth}
      editing={isEditing}
      label="설명"
      value={resource.description}
      editingValue={draft?.description}
      optional
      wrap
      onValueChange={(value) => updateDraft("description", value)}
    />
  </dl>
</section>
```

```tsx
<DetailItem label="Redirect URI" wrap>
  <ul>
    {redirectUris.map((uri) => <li key={uri}>{uri}</li>)}
  </ul>
</DetailItem>
```
