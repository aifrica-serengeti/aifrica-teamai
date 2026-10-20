# List Content State

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System
> 구현 컴포넌트: `ListContentState`
> 최종 갱신: 2026-09-22

`ListContentState`는 목록의 빈 결과, 필터 결과 없음, 최초 오류를 같은 icon·타이포·행동 계약으로
표시한다. Card 결과는 기본 surface presentation을 사용하고, Table은 컬럼 문맥과 frame을 유지한 채
`presentation="embedded"`로 같은 본문을 조합한다. Small Table은 `density="compact"`를 함께 사용해
제한된 행 높이에 맞는 icon과 타이포를 적용한다.

## 문서

- [정의와 API](./definition.md)
- [시각 규칙](./styles.md)
- [동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)

## 기본 사용

```tsx
<ListContentState
  kind={keyword ? "filtered" : "empty"}
  title={
    keyword ? "검색 조건에 맞는 결과가 없습니다." : "등록된 항목이 없습니다."
  }
  description={
    keyword
      ? "검색 조건을 변경해 다시 확인해 주세요."
      : "항목을 등록하면 이곳에서 확인할 수 있습니다."
  }
  action={keyword ? { label: "검색 초기화", onClick: resetFilters } : undefined}
/>
```

## 최초 조회 오류

Page/query hook이 retry 소유권을 유지한 채 `createListErrorState`로 공통 config를 만든다. Card는
`ListContentState`에, Table은 `emptyState`에 같은 config를 전달한다.

```tsx
const errorState = createListErrorState({
  title: "리소스 목록을 불러오지 못했습니다.",
  description: "잠시 후 다시 시도해 주세요.",
  onRetry: refresh,
  retrying,
});

return viewMode === "table" ? (
  <ResourceTable rows={[]} emptyState={errorState} />
) : (
  <ListContentState {...errorState} />
);
```
