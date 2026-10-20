# Open panel — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](../README.md)

## 구현 내용

### 12-2. Sheet primitive 컴포넌트 (`sheet.tsx`)

```tsx
import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import {
  sheetOverlay,
  sheetContent,
  animatableContent,
  animatableOverlay,
  sheetHeader,
  sheetHeaderMain,
  sheetTitle,
  sheetHeaderActions,
  sheetBody,
  sheetResizeHandle,
  sheetResizeLine,
} from "./sheet.css";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

type SheetSide = "top" | "right" | "bottom" | "left";
type SheetType = "overlay" | "inline";

const DEFAULT_SIDE_WIDTH = 424;
const DEFAULT_SIDE_HEIGHT = 386;
const MIN_SIZE = 280;
const MAX_RATIO = 0.9;

interface SheetContentProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Content>,
  "onPointerDown"
> {
  side?: SheetSide;
  type?: SheetType;
  resizable?: boolean;
  sideWidth?: number;
  sideHeight?: number;
  modal?: boolean;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(sheetOverlay, animatableOverlay, className)}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  type = "overlay",
  resizable = false,
  sideWidth = DEFAULT_SIDE_WIDTH,
  sideHeight = DEFAULT_SIDE_HEIGHT,
  modal = true,
  ...props
}: SheetContentProps) {
  const isHorizontal = side === "top" || side === "bottom";
  const [size, setSize] = React.useState(isHorizontal ? sideHeight : sideWidth);
  const draggingRef = React.useRef(false);
  const startPosRef = React.useRef(0);
  const startSizeRef = React.useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizable) return;
    e.preventDefault();
    draggingRef.current = true;
    startPosRef.current = isHorizontal ? e.clientY : e.clientX;
    startSizeRef.current = size;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const current = isHorizontal ? e.clientY : e.clientX;
    const delta = current - startPosRef.current;
    const growsWithNegative = side === "right" || side === "bottom";
    const raw = growsWithNegative
      ? startSizeRef.current - delta
      : startSizeRef.current + delta;
    const max = isHorizontal
      ? window.innerHeight * MAX_RATIO
      : window.innerWidth * MAX_RATIO;
    setSize(Math.max(MIN_SIZE, Math.min(max, raw)));
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  React.useEffect(() => {
    if (!resizable) setSize(isHorizontal ? sideHeight : sideWidth);
  }, [resizable, isHorizontal, sideWidth, sideHeight]);

  const sizeStyle: React.CSSProperties | undefined = resizable
    ? isHorizontal
      ? { height: `${size}px` }
      : { width: `${size}px` }
    : undefined;

  return (
    <SheetPortal>
      {type === "overlay" && modal && <SheetOverlay />}
      <DialogPrimitive.Content
        data-side={side}
        data-type={type}
        style={sizeStyle}
        className={cn(sheetContent, animatableContent, className)}
        {...props}
      >
        {children}
        {resizable && (
          <div
            data-slot="sheet-resize-handle"
            data-side={side}
            role="separator"
            aria-orientation={isHorizontal ? "horizontal" : "vertical"}
            aria-label="패널 크기 조절"
            tabIndex={0}
            className={sheetResizeHandle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <span
              className={sheetResizeLine}
              data-orientation={isHorizontal ? "horizontal" : "vertical"}
            />
          </div>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(sheetHeader, className)} {...props} />;
}
function SheetHeaderMain({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(sheetHeaderMain, className)} {...props} />;
}
function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn(sheetTitle, className)} {...props} />;
}
function SheetHeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn(sheetHeaderActions, className)} {...props} />;
}
function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(sheetBody, className)} {...props} />;
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetHeaderMain,
  SheetHeaderActions,
  SheetTitle,
  SheetBody,
  SheetOverlay,
};
```

### 12-3. OpenPanel 조립 컴포넌트 (`OpenPanel.tsx`)

```tsx
import type { ComponentProps, ReactNode } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetHeaderMain,
  SheetHeaderActions,
  SheetTitle,
  SheetBody,
} from "./sheet";
// 의존 컴포넌트 — Button, Icon Button, Icon (각 가이드라인 참조)
import { Icon } from "./Icon";
import type { SystemIconName } from "./iconMap";
import { IconButton } from "./IconButton";

export type OpenPanelSide = "top" | "right" | "bottom" | "left";
export type OpenPanelType = "overlay" | "inline";

export interface OpenPanelProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: OpenPanelSide;
  type?: OpenPanelType;
  icon?: SystemIconName;
  title: ReactNode;
  children: ReactNode;
  headerActions?: ReactNode;
  trigger?: ReactNode;
  resizable?: boolean;
  closeLabel?: string;
  resizeLabel?: string;
  modal?: boolean;
  className?: string;
}

export function OpenPanel({
  open,
  defaultOpen,
  onOpenChange,
  side = "right",
  type = "overlay",
  icon,
  title,
  children,
  headerActions,
  trigger,
  resizable = false,
  modal = true,
  className,
}: OpenPanelProps) {
  return (
    <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && (
        <SheetTrigger asChild>
          <span>{trigger}</span>
        </SheetTrigger>
      )}
      <SheetContent
        side={side}
        type={type}
        modal={modal}
        resizable={resizable}
        className={className}
      >
        <SheetHeader>
          {/* 닫기 버튼 — Header 가장 좌측. Icon Button(ghost, xlarge). */}
          <DialogPrimitive.Close asChild>
            <IconButton
              icon="close"
              variant="ghost"
              size="xlarge"
              aria-label="패널 닫기"
            />
          </DialogPrimitive.Close>
          <SheetHeaderMain>
            {icon && <Icon name={icon} size="l" color="default" />}
            <SheetTitle>{title}</SheetTitle>
          </SheetHeaderMain>
          {headerActions && (
            <SheetHeaderActions>{headerActions}</SheetHeaderActions>
          )}
        </SheetHeader>
        <SheetBody>{children}</SheetBody>
      </SheetContent>
    </Sheet>
  );
}
```
