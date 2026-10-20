# Badge — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Badge 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Badge } from './Badge'

// Dot — 단순 알림
<Badge variant="dot" />

// Counter — 항목 수
<Badge variant="counter" count={5} />
<Badge variant="counter" count={1} />

// 99+ 캡핑 (자동)
<Badge variant="counter" count={120} />   // → "99+"
<Badge variant="counter" count={999} />   // → "99+"

// 캡핑 임계값 조정
<Badge variant="counter" count={120} max={999} />  // → "120"

// count = 0 → 렌더하지 않음
<Badge variant="counter" count={0} />     // → null

// 호스트 요소 우상단에 겹치기 배치
<span style={{ position: 'relative', display: 'inline-flex' }}>
  <button aria-label="알림">🔔</button>
  <Badge
    variant="counter"
    count={8}
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translate(50%, -50%)',
    }}
  />
</span>
```

---

