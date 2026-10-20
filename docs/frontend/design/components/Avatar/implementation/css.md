# Avatar — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Avatar 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`avatar.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

/** Avatar 루트(원형 컨테이너). 기본 = indigo solid. */
export const avatarRoot = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  borderRadius: "50%",
  overflow: "hidden",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  letterSpacing: 0,
  textAlign: "center",
  // 기본 배경/글자 = indigo solid (Figma 원본 기본값)
  background: "var(--avatar-solid-indigo)",
  color: "var(--avatar-on-fill)",
  // 색상 전환 애니메이션 — 다크/라이트 전환 시 깜빡임 없이 부드럽게.
  transition: "background-color 0.2s ease, color 0.2s ease",

  selectors: {
    // ===== 사이즈 (data-size) — 원 크기 + 폰트 크기 + line-height =====
    '&[data-size="16"]': {
      width: "16px",
      height: "16px",
      fontSize: "10px",
      lineHeight: "normal",
    },
    '&[data-size="20"]': {
      width: "20px",
      height: "20px",
      fontSize: "12px",
      lineHeight: "16px",
    },
    '&[data-size="24"]': {
      width: "24px",
      height: "24px",
      fontSize: "14px",
      lineHeight: "20px",
    },
    '&[data-size="28"]': {
      width: "28px",
      height: "28px",
      fontSize: "16px",
      lineHeight: "24px",
    },
    '&[data-size="32"]': {
      width: "32px",
      height: "32px",
      fontSize: "18px",
      lineHeight: "normal",
    },
    '&[data-size="36"]': {
      width: "36px",
      height: "36px",
      fontSize: "20px",
      lineHeight: "24px",
    },
    '&[data-size="40"]': {
      width: "40px",
      height: "40px",
      fontSize: "22px",
      lineHeight: "normal",
    },
    '&[data-size="48"]': {
      width: "48px",
      height: "48px",
      fontSize: "26px",
      lineHeight: "normal",
    },

    // ===== Variant: subtle (pastel 배경 + 동색 글자) =====
    '&[data-variant="subtle"][data-color="indigo"]': {
      background: "var(--avatar-subtle-indigo)",
      color: "var(--avatar-subtle-text-indigo)",
    },
    '&[data-variant="subtle"][data-color="primary"]': {
      background: "var(--avatar-subtle-primary)",
      color: "var(--avatar-subtle-text-primary)",
    },
    '&[data-variant="subtle"][data-color="green"]': {
      background: "var(--avatar-subtle-green)",
      color: "var(--avatar-subtle-text-green)",
    },
    '&[data-variant="subtle"][data-color="cyan"]': {
      background: "var(--avatar-subtle-cyan)",
      color: "var(--avatar-subtle-text-cyan)",
    },
    '&[data-variant="subtle"][data-color="purple"]': {
      background: "var(--avatar-subtle-purple)",
      color: "var(--avatar-subtle-text-purple)",
    },
    '&[data-variant="subtle"][data-color="fuchsia"]': {
      background: "var(--avatar-subtle-fuchsia)",
      color: "var(--avatar-subtle-text-fuchsia)",
    },
    '&[data-variant="subtle"][data-color="gray"]': {
      background: "var(--avatar-subtle-gray)",
      color: "var(--avatar-subtle-text-gray)",
    },

    // ===== Variant: solid — 색상별 배경 (글자는 --avatar-on-fill 공통 흰색) =====
    '&[data-variant="solid"][data-color="indigo"]': {
      background: "var(--avatar-solid-indigo)",
    },
    '&[data-variant="solid"][data-color="primary"]': {
      background: "var(--avatar-solid-primary)",
    },
    '&[data-variant="solid"][data-color="green"]': {
      background: "var(--avatar-solid-green)",
    },
    '&[data-variant="solid"][data-color="cyan"]': {
      background: "var(--avatar-solid-cyan)",
    },
    '&[data-variant="solid"][data-color="purple"]': {
      background: "var(--avatar-solid-purple)",
    },
    '&[data-variant="solid"][data-color="fuchsia"]': {
      background: "var(--avatar-solid-fuchsia)",
    },
    '&[data-variant="solid"][data-color="gray"]': {
      background: "var(--avatar-solid-gray)",
    },

    // ===== Disabled — semantic 토큰 사용(다크 자동 전환) =====
    // 특이성 주의: 위 variant+color 셀렉터([data-variant][data-color], 0-2-0)보다
    // 높여야 disabled 색상이 이긴다. 두 속성을 추가해 0-3-0 으로 격상.
    "&[data-disabled][data-variant][data-color]": {
      background: "var(--element-default)",
      color: "var(--text-disabled)",
    },
    "&[data-disabled][data-size]": {
      background: "var(--element-default)",
      color: "var(--text-disabled)",
    },
  },
});

/** Avatar fallback(이니셜 텍스트 컨테이너). root 의 색상을 상속. */
export const avatarFallback = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  // 라인 높이 보정 — lineHeight 가 normal 인 size 에서 텍스트가 중앙에서
  // 약간 벗어날 수 있어 flex 중앙 정렬로 보정.
  lineHeight: 1,
});
```

