# Status — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Status 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Status } from './Status'

// 기본 — 상태별 기본 라벨 사용
<Status state="success" />           // ✓ Success
<Status state="error" />             // ✗ Error
<Status state="inProgress" />        // ⟳ In progress

// 커스텀 라벨 (한글/다국어)
<Status state="success" label="배포 완료" />
<Status state="error" label="업로드 실패" />

// 아이콘만 (공간 제약 시)
<Status state="info" showLabel={false} />
```

---

