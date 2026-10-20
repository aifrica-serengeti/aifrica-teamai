# Icon — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Icon } from './Icon'

// System icon — 기본 m(16px), default 색상
<Icon name="plus" />

// 사이즈/색상 지정 (semantic)
<Icon name="search" size="xl" color="primary" />

// raw palette dot 표기법
<Icon name="star" size="m" color="purple.500" />
<Icon name="bell" size="l" color="orange.500" />

// 다크 모드 전환 보간이 필요한 래퍼
<span className={iconWrapper}>
  <Icon name="bell" size="m" />
</span>
```

---

