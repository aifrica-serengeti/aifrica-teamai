# Divider — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Divider 문서 인덱스](../README.md)

## 구현 내용

### Divider 래퍼 스타일 (`Divider.css.ts`)

핵심: 선 주위 8px 패딩 + 다크 모드 전환 transition. vanilla-extract은 `& > *` 같은
자손 셀렉터를 `style()` 내부에 허용하지 않으므로 `globalStyle`로 자식 선 transition을 건다.

```ts
import { style, globalStyle } from "@vanilla-extract/css";

/**
 * Divider 래퍼.
 * Figma: 선 주위 8px 여백.
 *  - horizontal: 위아래 8px, 가로 100%
 *  - vertical: 양옆 8px, 세로 100%
 *
 * 다크 모드 전환 시 선 색상(--border-default)이 부드럽게 보간되도록
 * 래퍼와 자식 선 모두에 배경색 transition 을 건다.
 */
export const dividerWrapper = style({
  display: "flex",
  transition: "background-color 240ms ease",
  selectors: {
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      alignItems: "stretch",
      paddingBlock: "8px",
      width: "100%",
    },
    '&[data-orientation="vertical"]': {
      flexDirection: "row",
      alignItems: "stretch",
      paddingInline: "8px",
      height: "100%",
    },
  },
});

// 자식 선(Separator)의 배경색 전환도 함께 보간.
// vanilla-extract 는 `& > *` 같은 자손 셀렉터를 style() 내부에 허용하지 않으므로
// globalStyle 로 부모 클래스 스코프를 지정한다.
globalStyle(`${dividerWrapper} > *`, {
  transition: "background-color 240ms ease",
});
```

