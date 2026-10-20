# Spinner — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Spinner } from './Spinner'

// 기본 (medium)
<Spinner />

// 각 size
<Spinner size="tiny" />
<Spinner size="small" />
<Spinner size="medium" />
<Spinner size="large" />
<Spinner size="xlarge" />

// 로딩 메시지와 조합
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Spinner size="small" />
  <span>불러오는 중…</span>
</div>

// 커스텀 라벨
<Spinner aria-label="데이터를 불러오는 중" />

// 조건부 렌더링 (로딩 완료 시 제거)
{isLoading && <Spinner />}
```

---

