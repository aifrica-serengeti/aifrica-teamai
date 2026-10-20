# Avatar — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Avatar 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Avatar } from './Avatar'

// 기본 (indigo solid, size 24)
<Avatar>A</Avatar>

// 크기/색상 지정
<Avatar size="40" color="primary">B</Avatar>

// subtle variant (덜 강조)
<Avatar size="32" variant="subtle" color="green">G</Avatar>

// 이미지 + 이니셜 fallback (이미지 로드 실패 시 자동)
<Avatar size="48" src="/user.jpg" alt="홍길동">홍</Avatar>

// 비활성
<Avatar size="24" disabled>X</Avatar>

// 여러 사용자 (서로 다른 색상으로 구분)
<Avatar size="24" color="indigo">G</Avatar>
<Avatar size="24" color="cyan">C</Avatar>
<Avatar size="24" color="primary">B</Avatar>
<Avatar size="24" color="fuchsia">F</Avatar>
```

---

