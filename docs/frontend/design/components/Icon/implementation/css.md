# Icon — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon 문서 인덱스](../README.md)

## 구현 내용

### 다크 모드 전환 래퍼 (`Icon.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

// 색상 전환 보간 — 전역 * 금지, 컴포넌트 요소에만 적용.
export const iconWrapper = style({
  transition: "color 0.2s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});
```

