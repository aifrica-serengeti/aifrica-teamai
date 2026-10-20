# Tab — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
// 기본 — 텍스트만
<Tab
  tabs={[
    { value: 'overview', label: '개요' },
    { value: 'analytics', label: '분석' },
    { value: 'reports', label: '보고서' },
  ]}
  defaultValue="overview"
/>

// 카운터 포함
<Tab
  tabs={[
    { value: 'all', label: '전체', count: 128 },
    { value: 'done', label: '완료', count: 5 },
    { value: 'pending', label: '대기', count: 0 },  // count=0 → 미표시
  ]}
  defaultValue="all"
/>

// 아이콘 + 카운터
<Tab
  tabs={[
    { value: 'inbox', label: '받은편지', icon: 'bell', count: 12 },
    { value: 'sent', label: '보낸편지', icon: 'external_link' },
  ]}
  value={active}
  onValueChange={setActive}
  fullWidth
/>
```

---

