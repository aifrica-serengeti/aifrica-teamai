# Tooltip — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](../README.md)

## 구현 내용

### 11.5 사용 예

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@primitives/tooltip";

// Provider는 앱 최상단에 한 번만.
<TooltipProvider delayDuration={300}>
  {/* Icon type */}
  <Tooltip>
    <TooltipTrigger asChild>
      <button aria-label="복사">📋</button>
    </TooltipTrigger>
    <TooltipContent side="top" align="center" variant="icon">
      복사
    </TooltipContent>
  </Tooltip>

  {/* Standard type (다중 줄) */}
  <Tooltip>
    <TooltipTrigger asChild>
      <button>도움말</button>
    </TooltipTrigger>
    <TooltipContent side="bottom" align="center" variant="standard">
      <p>표준 툴팁은 간단한 보충 설명을 제공합니다.</p>
      <p>최대 3줄까지 가능합니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

---

