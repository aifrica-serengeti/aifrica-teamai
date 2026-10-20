# Status — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Status 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Status.tsx`)

```tsx
import * as React from "react";
import { cn } from "./utils"; // clsx + tailwind-merge
import { Spinner } from "./Spinner"; // 공용 Spinner 컴포넌트 (inProgress용)
import {
  status,
  statusIcon,
  statusSvg,
  statusLabel,
  statusSpinner,
} from "./Status.css";

export type StatusState =
  | "error"
  | "warning"
  | "success"
  | "normal"
  | "inProgress"
  | "incomplete"
  | "notStarted"
  | "pending"
  | "info";

export interface StatusProps extends React.ComponentProps<"span"> {
  /** 상태 종류. 기본 'normal'. */
  state?: StatusState;
  /** 라벨 텍스트. 생략 시 상태 이름을 기본값으로 사용. */
  label?: string;
  /** 라벨 표시 여부. 기본 true. false 면 icon 만 렌더. */
  showLabel?: boolean;
}

const DEFAULT_LABELS: Record<StatusState, string> = {
  error: "Error",
  warning: "Warning",
  success: "Success",
  normal: "Normal",
  inProgress: "In progress",
  incomplete: "Incomplete",
  notStarted: "Not started",
  pending: "Pending",
  info: "Info",
};

/* 채워진 원 위 마크 색 — 흰색 고정. */
const fillBase = "var(--status-on-fill)";

/* 점선 원의 둘레(2π×7.708=48.433)를 10개 대시로 정확히 분할하는 dasharray.
 * Figma 원본(1.67 3.33)은 9.686개로 나누어 떨어지지 않아,
 * SVG circle 시작점(3시 방향)에서 두 대시가 겹쳐 보이는 문제를 해결. */
const DASHED_DASHARRAY = "1.6177 3.2256";

/* ===== 아이콘 — Figma 원본 SVG path 그대로 사용 (20×20 viewBox) ===== */

function ErrorIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8.335" fill="var(--status-error)" />
      <path
        d="M13.334 6.666 L6.666 13.334 M6.666 6.666 L13.334 13.334"
        stroke={fillBase}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8.335" fill="var(--status-warning)" />
      <path
        d="M10 5.73 V9.88"
        stroke={fillBase}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="10" cy="12.4" r="0.775" fill={fillBase} />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8.335" fill="var(--status-success)" />
      <path
        d="M13.89 7.08 L8.55 12.43 L6.11 10.00"
        stroke={fillBase}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NormalIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {/* 테두리 원 마스터(17×17) — center (8.33, 8.33) r=7.708. 투명 fill + primary 실선. */}
      <svg x="1.5" y="1.5" width="17" height="17" viewBox="0 0 17 17">
        <circle
          cx="8.333"
          cy="8.333"
          r="7.708"
          fill="none"
          stroke="var(--status-primary)"
          strokeWidth="1.25"
        />
      </svg>
      {/* 체크 — primary 색. Figma Vector path 역산 좌표. */}
      <path
        d="M13.89 7.08 L8.55 12.43 L6.11 10.00"
        stroke="var(--status-primary)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InProgressIcon() {
  return (
    <span className={statusSpinner}>
      <Spinner size="small" aria-hidden="true" />
    </span>
  );
}

function IncompleteIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {/* 1. 점선 원 (아래층) */}
      <circle
        cx="10"
        cy="10"
        r="7.708"
        stroke="var(--status-primary)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={DASHED_DASHARRAY}
        fill="none"
      />
      {/* 2. 좌측 반원 fill (위층) — stroke 외곽(r=8.333)까지 확장하여 좌측 점선을 덮음 */}
      <path
        d="M10 1.667 A 8.333 8.333 0 0 0 10 18.333 Z"
        fill="var(--status-primary)"
      />
    </svg>
  );
}

function NotStartedIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {/* 점선 원 마스터(17×17) — neutral */}
      <svg x="1.5" y="1.5" width="17" height="17" viewBox="0 0 17 17">
        <circle
          cx="8.333"
          cy="8.333"
          r="7.708"
          stroke="var(--status-neutral)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={DASHED_DASHARRAY}
        />
      </svg>
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8.335" fill="var(--status-neutral)" />
      <circle cx="5.83" cy="10" r="1.042" fill={fillBase} />
      <circle cx="10" cy="10" r="1.042" fill={fillBase} />
      <circle cx="14.17" cy="10" r="1.042" fill={fillBase} />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className={statusSvg}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10.005" cy="10.005" r="8.335" fill="var(--status-primary)" />
      {/* dot — 곡선 path (Figma 원본 그대로) */}
      <path
        d="M10.0002 5.34863C9.80859 5.34863 9.62125 5.40546 9.4619 5.51194C9.30255 5.61841 9.17835 5.76975 9.10501 5.94681C9.03167 6.12387 9.01248 6.3187 9.04987 6.50667C9.08726 6.69463 9.17955 6.86729 9.31506 7.00281C9.45058 7.13832 9.62324 7.23061 9.8112 7.268C9.99917 7.30539 10.194 7.2862 10.3711 7.21286C10.5481 7.13952 10.6995 7.01532 10.8059 6.85597C10.9124 6.69662 10.9692 6.50927 10.9692 6.31762C10.9692 6.06063 10.8671 5.81417 10.6854 5.63244C10.5037 5.45072 10.2572 5.34863 10.0002 5.34863Z"
        fill={fillBase}
      />
      {/* stem — ⌐형 */}
      <path
        d="M9.03125 9.22461H10.194V13.4882"
        stroke={fillBase}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* foot — 하단 가로 발 */}
      <path
        d="M8.45117 13.876H11.9395"
        stroke={fillBase}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: Record<StatusState, React.ComponentType> = {
  error: ErrorIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  normal: NormalIcon,
  inProgress: InProgressIcon,
  incomplete: IncompleteIcon,
  notStarted: NotStartedIcon,
  pending: PendingIcon,
  info: InfoIcon,
};

function Status({
  className,
  state = "normal",
  label,
  showLabel = true,
  ...props
}: StatusProps) {
  const Icon = ICONS[state];
  const text = label ?? DEFAULT_LABELS[state];

  return (
    <span
      data-slot="status"
      data-state={state}
      role="status"
      aria-label={text}
      className={cn(status, className)}
      {...props}
    >
      {/* In progress 는 Spinner 전용 20px 래퍼를, 다른 상태는 SVG 전용 20px 래퍼를 사용. */}
      {state === "inProgress" ? (
        <InProgressIcon />
      ) : (
        <span className={statusIcon}>
          <Icon />
        </span>
      )}
      {showLabel && <span className={statusLabel}>{text}</span>}
    </span>
  );
}

export { Status };
```

