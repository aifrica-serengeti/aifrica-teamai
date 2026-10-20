# Async Content State 조립 예시

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

```tsx
function ResourceDetail() {
  const { resource, loading, error, refresh } = useResourceDetail(id);
  const initialLoading = loading && resource === null && !error;
  const refreshing = loading && (resource !== null || error !== null);

  return (
    <>
      <PageHeader
        buttonGroup={
          <RefreshControl
            loading={refreshing}
            onRefresh={() => void refresh()}
          />
        }
      />
      <main className={styles.contentArea}>
        {initialLoading ? (
          <StateCard loading />
        ) : resource ? (
          <ResourceCard resource={resource} />
        ) : (
          <StateCard error={error} />
        )}
        <RefreshContentOverlay
          visible={refreshing}
          label="리소스 정보를 불러오는 중입니다."
        />
      </main>
    </>
  );
}
```
