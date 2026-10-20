# Icon — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon 문서 인덱스](../README.md)

## 구현 내용

### 아이콘 컴포넌트 공통 타입 (`iconComponentType.ts`)

lucide 컴포넌트와 커스텀 SVG 컴포넌트를 모두 수용하는 공통 타입.

```ts
import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number | string;
  }
>;
```

### 커스텀 솔리드 삼각형 아이콘 (`triangleIcons.tsx`)

Figma 의 triangle\__ 아이콘은 채워진(fill) 삼각형이며, lucide 의 Chevron_ (stroke 기반
꺾쇠) 와 형태가 다르다. 정확한 재현을 위해 직접 SVG path 로 렌더링한다.
원본 SVG (triangle_down): `<path d="M5 7.63147L10 12.7165L15 7.63147" fill="#AAAAAA"/>`
컴포넌트는 `fill="currentColor"` 로 받아 Icon 의 color prop 을 따른다.

```tsx
import type { SVGProps } from "react";

export interface TriangleIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

/** ▼ 아래쪽 솔리드 삼각형. */
export function TriangleDown({ size = 20, ...props }: TriangleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path d="M5 7.63147L10 12.7165L15 7.63147" fill="currentColor" />
    </svg>
  );
}

/** ▲ 위쪽 솔리드 삼각형. Y축 대칭. */
export function TriangleUp({ size = 20, ...props }: TriangleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path d="M5 12.3685L10 7.28348L15 12.3685" fill="currentColor" />
    </svg>
  );
}

/** ◀ 왼쪽 솔리드 삼각형. */
export function TriangleLeft({ size = 20, ...props }: TriangleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path d="M12.3685 5L7.28348 10L12.3685 15" fill="currentColor" />
    </svg>
  );
}

/** ▶ 오른쪽 솔리드 삼각형. */
export function TriangleRight({ size = 20, ...props }: TriangleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path d="M7.63147 5L12.7165 10L7.63147 15" fill="currentColor" />
    </svg>
  );
}
```

### 아이콘 토큰 + 색상 해석 (`iconTokens.ts`)

```ts
/**
 * 사이즈 토큰 → 픽셀값. 출처: Figma Icon / Size (node 6705:13323).
 */
export const ICON_SIZES = {
  t: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 36,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

/**
 * 사이즈별 스트로크 굵기. 출처: Figma Icon / Stroke 테이블 (node 6705:13536).
 * 소사이즈 그룹은 1px → 1.25px 로 시각 보정.
 */
export const ICON_STROKE_WIDTH: Record<IconSize, number> = {
  t: 1.25,
  s: 1.25,
  m: 1.25,
  l: 1.25,
  xl: 1.25,
  "2xl": 1.5,
  "3xl": 2,
  "4xl": 2,
};

/**
 * Semantic 색상 → CSS 토큰. hex 직접 사용 금지.
 */
export const ICON_COLORS = {
  default: "var(--icon)",
  subtle: "var(--icon-subtle)",
  subtler: "var(--icon-subtler)",
  primary: "var(--icon-primary)",
  success: "var(--icon-success)",
  warning: "var(--icon-warning)",
  danger: "var(--icon-danger)",
  disabled: "var(--icon-disabled)",
} as const;

export type IconSemanticColor = keyof typeof ICON_COLORS;

/**
 * color prop 형식 — semantic 이름 또는 raw palette dot 표기('blue.500').
 * hex 직접 값은 허용하지 않는다(토큰 경유).
 */
export type IconColor = IconSemanticColor | string;

/** raw palette dot 표기('blue.500')인지 판별. */
function isPaletteToken(value: string): boolean {
  return /^[a-z]+\.\d+$/.test(value);
}

/**
 * color prop 문자열 → CSS 변수값.
 * semantic 이름이면 ICON_COLORS 에서, raw palette 표기면 CSS 변수로 해석한다.
 */
export function resolveIconColor(color: IconColor): string {
  if (color in ICON_COLORS) {
    return ICON_COLORS[color as IconSemanticColor];
  }
  if (isPaletteToken(color)) {
    const [name, shade] = color.split(".");
    return `var(--color-${name}-${shade})`;
  }
  // 알 수 없는 값은 기본 색상으로 폴백.
  return ICON_COLORS.default;
}
```

### 아이콘 이름 → 컴포넌트 매핑 (`iconMap.ts`, 요약)

```ts
import {
  Plus,
  Minus,
  Check,
  X,
  Search /* ... 전체 lucide import ... */,
  Clock,
  CalendarClock,
  Grid2X2,
  Grid2x2X,
  AppWindow,
  BriefcaseBusiness,
  ClipboardPaste,
} from "lucide-react";
import type { IconComponent } from "./iconComponentType";
import {
  TriangleDown,
  TriangleUp,
  TriangleLeft,
  TriangleRight,
} from "./triangleIcons";

export const systemIconMap = {
  plus: Plus,
  minus: Minus,
  check: Check,
  close: X,
  search: Search,
  clock: Clock, // 시간 선택(Timepicker)
  schedule: CalendarClock, // 일정/캘린더 맥락
  sync: ArrowLeftRight, // refresh와 구분되는 목록 전체 동기화 또는 외부 자원 불러오기
  grid: Grid2X2,
  grid_off: Grid2x2X,
  app_window: AppWindow, // 소프트웨어 1depth 메뉴
  briefcase_business: BriefcaseBusiness, // 서비스 관리 1depth 메뉴
  clipboard_paste: ClipboardPaste, // 클립보드 내용을 편집 영역에 붙여넣기
  // ... lucide 매핑 (6절 레지스트리 참조)
  // triangle_* — 커스텀 솔리드 SVG (lucide Chevron* 와 형태 다름)
  triangle_up: TriangleUp,
  triangle_down: TriangleDown,
  triangle_left: TriangleLeft,
  triangle_right: TriangleRight,
  // ...
} as const satisfies Record<string, IconComponent>;

export type SystemIconName = keyof typeof systemIconMap;
```

### System Icon 컴포넌트 (`Icon.tsx`)

```tsx
import type { ComponentProps } from "react";
import { systemIconMap, type SystemIconName } from "./iconMap";
import {
  ICON_SIZES,
  ICON_STROKE_WIDTH,
  resolveIconColor,
  type IconSize,
  type IconColor,
} from "./iconTokens";

export interface IconProps extends Omit<ComponentProps<"svg">, "name"> {
  name: SystemIconName;
  size?: IconSize; // 기본 'm' (16px)
  /**
   * 색상. 기본 default(--icon).
   * - semantic 이름: 'default' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger' | 'disabled'
   * - raw palette dot 표기: 'blue.500' | 'gray.700' | 'green.600' ...
   * hex 직접 값은 허용하지 않는다(토큰 경유).
   */
  color?: IconColor;
}

export function Icon({
  name,
  size = "m",
  color = "default",
  strokeWidth,
  ...props
}: IconProps) {
  const Component = systemIconMap[name];
  return (
    <Component
      size={ICON_SIZES[size]}
      strokeWidth={strokeWidth ?? ICON_STROKE_WIDTH[size]}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: resolveIconColor(color) }}
      {...props}
    />
  );
}
```

> StatusIcon 컴포넌트(error/warning/success/... 이름별 자동 색상 매핑)는 별도 Status
> 컴포넌트 가이드라인에서 다룬다.
