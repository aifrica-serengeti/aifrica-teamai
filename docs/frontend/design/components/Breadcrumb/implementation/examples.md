# Breadcrumb — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Breadcrumb } from './Breadcrumb'
import { Link as RouterLink } from 'react-router-dom'

// 1) 자동 축약 모드 — 권장. 컨테이너 너비에 맞춰 중간 자동 축약.
<Breadcrumb
  items={[
    { label: '1depth', href: '/', onSelect: () => navigate('/') },
    { label: '2depth', href: '/2', onSelect: () => navigate('/2') },
    { label: '3depth', href: '/3', onSelect: () => navigate('/3') },
    { label: '4depth', href: '/4', onSelect: () => navigate('/4') },
    { label: '5depth', current: true },
  ]}
  style={{ maxWidth: 300 }}
/>

// 2) react-router-dom 과 합성 (자동 축약 모드는 href 대신 직접 RouterLink 를
//    쓰려면 compound 모드를 사용)
<Breadcrumb>
  <Breadcrumb.Item asChild>
    <RouterLink to="/">Playground</RouterLink>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item asChild>
    <RouterLink to="/playground/link">Link</RouterLink>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
</Breadcrumb>

// 3) compound 모드 + 수동 축약 (사용처가 직접 Menu 구성)
<Breadcrumb>
  <Breadcrumb.Item asChild><a href="/">1depth</a></Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Overflow />
  <Breadcrumb.Separator />
  <Breadcrumb.Item current>n depth</Breadcrumb.Item>
</Breadcrumb>
```

> **주의 (자동 축약 vs router 합성)**: 자동 축약(`items`) 모드는 `href` 문자열 기반이라
> react-router-dom `<Link>` 합성이 필요하면 compound 모드를 쓴다. `items` 모드에서
> `onSelect` 로 프로그래밍 방향 네비게이션(`navigate(href)`)을 호출하는 것도 가능하다.

---

