# Detail Field 스타일

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 6. 상세 grid 조립

```tsx
<section className={styles.card} aria-label="솔루션 기본 정보">
  <dl className={styles.detailGrid}>
    <DetailTextField editing={isEditing} label="이름" value={resource.name}
      editingValue={draft?.name} error={errors.name} required
      onValueChange={(value) => updateDraft("name", value)} />
    <DetailTextField editing={isEditing} label="Client ID" readOnly value={resource.clientId} />
    <DetailTextField editing={isEditing} label="설명" className={styles.fullWidth}
      editingValue={draft?.description} optional value={resource.description} wrap
      onValueChange={(value) => updateDraft("description", value)} />
  </dl>
</section>
```

기본 grid는 2열, `gap: 24px 48px`, `padding: 24px`; `≤699px`는 1열, `gap: 20px`,
`padding: 20px`다. 긴 설명/URI/반복 목록은 `fullWidth`(`grid-column: 1 / -1`)를 쓴다.
이 규칙의 outer card/grid geometry는 [Detail Page](../../patterns/DetailPage.md)가 소유한다.

## 7. 디자인 토큰

| 요소 | light | dark |
| --- | --- | --- |
| label | `--text-subtle` `#555555` | `--text-subtle` `#aaaaaa` |
| input label | `--text` `#1c1c1c` | `--text` `#dddddd` |
| value | `--text` `#1c1c1c` | `--text` `#dddddd` |
| optional/help | `--text-subtler` `#757575` | `--text-subtler` `#8f8f8f` |
| error/required | `--text-danger` `#e81919` | `--text-danger` `#f52424` |
| input focus | `--border-primary` `var(--accent-500)` | `--border-primary` `var(--accent-400)` |

