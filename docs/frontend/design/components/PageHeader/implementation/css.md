# Page Header — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Page Header 문서 인덱스](../README.md)

## 레이아웃

`PageHeader.css.ts`는 Vanilla Extract를 사용한다. 직접 hex 색을 쓰지 않고 페이지 표면·텍스트·border·disabled element CSS token만 사용한다.

좁은 폭 조건은 솔루션 layout adapter가 build 시 제공한다. 아래 `narrowQuery`는 해당 adapter에서
확인한 유효한 CSS media query 문자열이며 이 공통 문서가 특정 breakpoint를 정하지 않는다.

```ts
import { narrowQuery } from "@design/page-layout";

export const root = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  columnGap: "16px",
  rowGap: "4px",
  width: "100%",
  padding: "24px",
  background: "var(--surface-shell)",
  color: "var(--text)",
  selectors: {
    "&[data-actions-stacked]": {
      gridTemplateColumns: "minmax(0, 1fr)",
      rowGap: "12px",
    },
    '&[data-border-bottom="true"]': {
      borderBottom: "1px solid var(--border-subtle)",
    },
  },
  "@media": { [narrowQuery]: { paddingInline: "16px" } },
});

export const content = style({
  display: "flex",
  alignItems: "flex-start",
  minWidth: 0,
  gap: "12px",
});

export const tabsSlot = style({ gridColumn: "1 / -1", marginTop: "12px" });
```

액션이 아래 행으로 이동하면 액션은 좌측 정렬되고 탭의 추가 상단 여백은 제거한다.

## 제목 행과 상태 Chip

```ts
export const titleCopy = style({ minWidth: 0, paddingTop: "2px" });
export const titleRow = style({
  display: "flex",
  alignItems: "center",
  minWidth: 0,
  gap: "8px",
});
export const titleActions = style({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  height: "24px",
  gap: "4px",
  lineHeight: 0,
});
export const title = style({
  overflow: "hidden",
  margin: 0,
  color: "var(--text)",
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: "32px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const visuallyHidden = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
});
```

`@design/page-layout`는 역할 alias다. 제품 설정의 실제 layout adapter로 매핑하고 그 경로·선택한
breakpoint를 `documentOverrides`에 기록한다. Header와 본문은 같은 narrow 조건과 inset을 사용한다.
`narrowQuery`가 없을 때 899px 같은 임의 숫자로 채우지 않는다.

상태 Chip은 호출부가 `medium`(24px 높이)으로 제공한다. `titleRow`의 32px 제목 line-height 안에서 세로 중앙 정렬되므로 별도 margin이나 높이 보정은 추가하지 않는다.

## 로딩 placeholder

일반 텍스트의 line-height와 동일한 높이를 지정한다. 존재하지 않는 `detailText` 또는 `description`의 placeholder는 렌더하지 않는다.

```ts
export const loadingLine = style({
  display: "block",
  borderRadius: "4px",
  background: "var(--element-disabled)",
  selectors: {
    '&[data-line="title"]': { width: "180px", height: "32px" },
    '&[data-line="detail"]': {
      width: "72px",
      height: "16px",
      marginTop: "2px",
    },
    '&[data-line="description"]': {
      width: "260px",
      height: "20px",
      marginTop: "4px",
    },
  },
});

export const loadingChip = style({
  display: "block",
  width: "48px",
  height: "24px",
  flexShrink: 0,
  borderRadius: "12px",
  background: "var(--element-disabled)",
});
```

`element-disabled`는 단색이며 shimmer·진행 애니메이션을 추가하지 않는다. PageHeader 자체가 fade transition을 담당하지 않는다.

## 보조 정보와 액션

```ts
export const detailText = style({
  marginTop: "2px",
  color: "var(--text-subtle)",
  fontSize: "12px",
  lineHeight: "16px",
});

export const descriptionText = style({
  marginTop: "4px",
  color: "var(--text-subtle)",
  fontSize: "14px",
  lineHeight: "20px",
});

export const actions = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "flex-end",
  alignSelf: "start",
  gap: "8px",
  minHeight: "36px",
  whiteSpace: "nowrap",
});
```

액션 slot의 Button과 SplitButton은 컴포넌트 가이드의 medium size를 사용하며, PageHeader는 개별 버튼의 높이를 덮어쓰지 않는다.
