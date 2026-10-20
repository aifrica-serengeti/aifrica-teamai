# Pagination — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Pagination.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

/* ===== Root — 가로 정렬, gap 16px ===== */
export const root = style({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  fontFamily: "var(--font-sans)",
});

/* ===== 결과 카운트 — "총 152건 중 1-10건" ===== */
export const countText = style({
  display: "inline-flex",
  alignItems: "center",
  font: "var(--text-body3)",
  color: "var(--text)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/* 총건수(N) — primary 강조. 라이트 accent-500 / 다크 accent-200.
 * 전역 --text-primary 다크 값(accent-400)과 달라 별도 토큰 사용. */
export const countHighlight = style({
  font: "600 12px/16px var(--font-sans)",
  color: "var(--pg-count-primary)",
  transition: "color 0.2s ease",
});

/* ===== Nav 버튼 그룹 — Icon Button 끼리 인접 ===== */
export const navGroup = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});

/* ===== 페이지 입력 영역 — input + "/" + 총페이지, gap 8px ===== */
export const pageInputArea = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
});

/* 페이지 번호 input wrapper — 폭 44px 제한.
 * InputField 의 field/inputWrap 이 width:100% 이므로 부모가 폭 결정. */
export const pageInputWrap = style({
  width: "44px",
  flexShrink: 0,
});

/* 페이지 번호 input 자체 — InputField className 으로 input에 적용.
 * 44px 좁은 폭에 맞춰 가운데 정렬 + 패딩 축소. */
export const pageInput = style({
  paddingLeft: "8px",
  paddingRight: "8px",
  textAlign: "center",
});

/* 총페이지 표시 영역("/ N") — Body3 12px. */
export const pageTotal = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  font: "var(--text-body3)",
  whiteSpace: "nowrap",
});

/* "/" 구분자 — gray-700(--text-subtle). */
export const slash = style({
  color: "var(--text-subtle)",
  transition: "color 0.2s ease",
});

/* 총페이지 숫자 — gray-900(--text). */
export const totalPagesText = style({
  color: "var(--text)",
  transition: "color 0.2s ease",
});

/* ===== 페이지당 항목수 dropdown wrapper — 폭 59px 제한.
 * Dropdown root 가 width:100% 이므로 부모가 폭 결정. */
export const pageSizeWrap = style({
  width: "59px",
  flexShrink: 0,
});
```

`rangeTemplate`의 `{total}`은 TypeScript 구현이 위 `countHighlight` class로 렌더링한다.
페이지 호출부에서 이 스타일을 복제하지 않는다.
