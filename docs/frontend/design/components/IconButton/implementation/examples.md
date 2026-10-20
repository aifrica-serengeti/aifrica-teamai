# Icon Button — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { IconButton } from './IconButton'
import { Tooltip, TooltipProvider } from './Tooltip' // 공용 Tooltip 컴포넌트

// 기본
<IconButton icon="search" aria-label="검색" />
<IconButton icon="plus" size="xlarge" variant="ghost" aria-label="추가" />

// icon size override (터치 영역은 32px, 아이콘은 24px)
<IconButton icon="gears" size="xlarge" iconSize="2xl" aria-label="설정" />

// 비활성 (icon 색상 자동 전환)
<IconButton icon="close" size="medium" disabled aria-label="닫기" />

// Tooltip 조합 — 공용 Tooltip 컴포넌트로 감싼다 (Icon Button 이 직접 Tooltip 을 만들지 않음)
<TooltipProvider delayDuration={300}>
  <Tooltip type="icon" side="top" content="추가">
    <IconButton icon="plus" size="xlarge" variant="outlined" aria-label="추가" />
  </Tooltip>
</TooltipProvider>

// 보충 설명이 필요한 경우 standard type
<TooltipProvider delayDuration={300}>
  <Tooltip
    type="standard"
    side="bottom"
    content={<>새 항목 추가<br />클릭하여 새로운 항목을 생성합니다.</>}
  >
    <IconButton icon="plus" size="xlarge" aria-label="추가" />
  </Tooltip>
</TooltipProvider>
```

---

