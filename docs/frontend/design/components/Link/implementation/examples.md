# Link — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Link 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Link } from './Link'
import { Icon } from '../icon/Icon'

// Inline link — 문단 내 (주변 본문이 16px=Body1 이므로 size="large")
<p style={{ fontSize: '16px', lineHeight: '24px' }}>
  새로운 프로젝트를 시작하려면{' '}
  <Link size="large" href="/docs">README를 참고</Link>
  하세요.
</p>

// Inline link — 본문이 14px=Body2 인 경우
<p style={{ fontSize: '14px', lineHeight: '20px' }}>
  자세한 내용은 <Link size="medium" href="/guide">가이드</Link>를 확인하세요.
</p>

// Standalone link — trailing 아이콘과 함께 (외부 이동 암시)
// Icon 색상은 color:'inherit' 로 Link 텍스트 색을 상속받아 상태 전환에 자동 대응.
<Link
  size="large"
  href="https://example.com"
  target="_blank"
  rel="noreferrer"
  trailingIcon={<Icon name="external_link" size="l" style={{ color: 'inherit' }} />}
>
  외부 문서 보기
</Link>

// react-router-dom 과 합성 (asChild)
import { Link as RouterLink } from 'react-router-dom'

<Link asChild size="medium" trailingIcon={<Icon name="external_link" size="m" style={{ color: 'inherit' }} />}>
  <RouterLink to="/playground">목록으로 이동</RouterLink>
</Link>

// 비활성 (밑줄 사라짐, 회색, 클릭 차단)
<Link size="medium" href="#" disabled>비활성 링크</Link>
```

> **주의 (Icon 색상)**: Icon 컴포넌트 기본은 semantic `--icon` 토큰(`color` prop)을 직접
> 주입하므로 `currentColor` 상속이 아니다. Link 의 hover/pressed/disabled 상태 전환에
> 아이콘이 자동 대응하려면 반드시 `style={{ color: 'inherit' }}` 로 덮어써야 한다.
> Icon 컴포넌트는 내부에서 `style={{ color: ICON_COLORS[color] }}` 뒤에 `{...props}` 를
> 전개하므로, props 로 넘긴 `style` 이 우선 적용된다.

> **주의 (Inline link 크기)**: Inline link 의 `size` 는 반드시 주변 문단 텍스트의
> font-size 와 일치시킨다. 본문 16px → `large`, 14px → `medium`, 12px → `small`.
> 불일치 시 폰트 크기가 달라 UI 가 어색해진다.

---

