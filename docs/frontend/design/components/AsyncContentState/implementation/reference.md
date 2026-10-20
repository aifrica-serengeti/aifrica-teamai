# Async Content State 구현 참조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 7. 복사 가능한 조립 예시

```tsx
function ResourceDetail() {
  const { resource, loading, error, refresh } = useResourceDetail(id);
  const isInitialLoading = loading && resource === null && !error;
  const isRefreshing = loading && (resource !== null || error !== null);

  return (
    <>
      <PageHeader
        buttonGroup={
          <RefreshControl
            loading={isRefreshing}
            onRefresh={() => void refresh()}
          />
        }
      />
      <main className={styles.contentArea}>
        {isInitialLoading ? (
          <StateCard loading />
        ) : resource ? (
          <ResourceCard resource={resource} />
        ) : (
          <StateCard error={error} />
        )}
        <RefreshContentOverlay
          visible={isRefreshing}
          label="리소스 정보를 불러오는 중입니다."
        />
      </main>
    </>
  );
}
```

```ts
export const contentArea = style({ position: "relative" });
export const overlay = style({
  position: "absolute",
  inset: 0,
  zIndex: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  color: "var(--text-subtle)",
  backgroundColor: "color-mix(in srgb, var(--surface) 88%, transparent)",
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
});
```
