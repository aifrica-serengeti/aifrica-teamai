# Text Button — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Text Button 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { TextButton } from './TextButton'

// 기본 (라벨만)
<TextButton size="medium">Label</TextButton>

// 아이콘 조합 — Figma System icon 이름(snake_case) 전달
<TextButton size="small" leadingIcon="plus">생성</TextButton>
<TextButton size="large" trailingIcon="triangle_right">다음</TextButton>
<TextButton size="medium" leadingIcon="plus" trailingIcon="triangle_right">편집</TextButton>

// 링크로 렌더(asChild)
<TextButton asChild size="medium" trailingIcon="external_link">
  <a href="/help">도움말</a>
</TextButton>

// 비활성 (icon 색상이 자동으로 disabled 토큰으로 전환 — inherit)
<TextButton size="medium" leadingIcon="plus" disabled>생성</TextButton>

// icon size 개별 override (button size 와 다른 icon 크기 필요 시)
<TextButton size="large" leadingIcon="plus" leadingIconSize="m">작은 아이콘</TextButton>
```

> **주의**: Text Button 에서 `lucide-react` 아이콘을 직접 `<Plus />` 처럼 children 으로 넣지 않는다.
> lucide 기본 stroke-width(2px)가 Figma 스펙(1.25px)보다 굵게 렌더링된다.
> 반드시 `leadingIcon`/`trailingIcon` prop + Icon 컴포넌트 경유.

---

