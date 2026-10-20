# Skeleton — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Skeleton 문서 인덱스](./README.md)

## 접근성 계약

- Skeleton은 시각 placeholder이며 기본 focus target이나 interaction을 만들지 않는다.
- 장식용 Skeleton은 호출부에서 `aria-hidden="true"`를 전달한다.
- loading 영역의 parent는 필요에 따라 `aria-busy="true"`를 소유한다.
- Skeleton 자체로 loading 상태를 알릴 때만 `role="status"`와 locale에 맞는 `aria-label`을 함께
  전달한다. 같은 영역에 여러 status Skeleton을 중복해서 두지 않는다.
- 실제 콘텐츠처럼 읽힐 가짜 텍스트, 임시 ID, 빈 heading을 Skeleton 안에 넣지 않는다.
- pulse는 `prefers-reduced-motion`에서 정지한다.

```tsx
<section aria-busy={loading || undefined} aria-labelledby="profile-heading">
  <h2 id="profile-heading">사용자 정보</h2>
  {loading ? <Skeleton className={styles.value} aria-hidden="true" /> : value}
</section>
```
