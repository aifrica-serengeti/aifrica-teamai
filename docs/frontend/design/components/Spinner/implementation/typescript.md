# Spinner — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Spinner.tsx`)

```tsx
import * as React from "react";
import { cn } from "./utils"; // clsx + tailwind-merge
import {
  spinner,
  spinnerSvg,
  spinnerTrackStroke,
  spinnerIndicatorStroke,
  spinnerSize,
} from "./Spinner.css";

export type SpinnerSize = "tiny" | "small" | "medium" | "large" | "xlarge";

export interface SpinnerProps extends React.ComponentProps<"span"> {
  /** 스피너 크기. 기본값 medium. */
  size?: SpinnerSize;
}

function Spinner({
  className,
  size = "medium",
  children: _children,
  ...props
}: SpinnerProps) {
  // linearGradient id 가 한 페이지에 여러 스피너가 있을 때 충돌하지 않도록 고유화.
  const gradientId = React.useId().replace(/:/g, "");

  return (
    <span
      data-slot="spinner"
      data-size={size}
      role="status"
      aria-label="로딩 중"
      className={cn(spinner, spinnerSize[size], className)}
      {...props}
    >
      <svg
        className={spinnerSvg}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {/* Track — 배경 원 링. stroke-width 는 size variant 의 CSS 변수 사용. */}
        <circle
          cx="24"
          cy="24"
          r="18"
          className={spinnerTrackStroke}
          strokeWidth="var(--spinner-stroke-width)"
          vectorEffect="non-scaling-stroke"
        />
        {/* Indicator — 270° 회전 아크. stroke-linecap round. */}
        <path
          d="M24 42C19.2261 42 14.6477 40.1036 11.2721 36.7279C7.89642 33.3523 6 28.7739 6 24C6 19.2261 7.89642 14.6477 11.2721 11.2721C14.6477 7.89642 19.2261 6 24 6"
          stroke={`url(#${gradientId})`}
          className={spinnerIndicatorStroke}
          strokeWidth="var(--spinner-stroke-width)"
          strokeLinecap="round"
          strokeDasharray="0.11 0.11"
          vectorEffect="non-scaling-stroke"
        />
        {/* linearGradient — 수직(top 불투명 → bottom 투명). */}
        <defs>
          <linearGradient
            id={gradientId}
            x1="24"
            y1="6"
            x2="24"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--spinner-indicator)" />
            <stop
              offset="0.755208"
              stopColor="var(--spinner-indicator)"
              stopOpacity="0.01"
            />
            <stop
              offset="1"
              stopColor="var(--spinner-indicator)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

export { Spinner };
```

