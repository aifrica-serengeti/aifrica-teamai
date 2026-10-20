# Divider — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Divider 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
{
  /* Horizontal — 콘텐츠 위/아래 분리 */
}
<div>
  <span>위 콘텐츠</span>
  <Divider />
  <span>아래 콘텐츠</span>
</div>;

{
  /* Vertical — 컬럼 분리 (부모가 높이를 가져야 함) */
}
<div style={{ display: "flex", alignItems: "center", height: 80 }}>
  <span>왼쪽</span>
  <Divider orientation="vertical" />
  <span>오른쪽</span>
</div>;
```

---

