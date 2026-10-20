# Dialog — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](../README.md)

## 구현 내용

### 13-2. Dialog primitive 컴포넌트 (`dialog.tsx`)

```tsx
import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import { ScrollArea } from "./ScrollArea"; // 공용 ScrollArea 컴포넌트
import {
  dialogOverlay,
  dialogContent,
  animatableContent,
  animatableOverlay,
  dialogHeader,
  dialogTitle,
  dialogDescription,
  dialogBody,
  bodyScrollAreaWrap,
  bodyScrollAreaContent,
  dialogFooter,
} from "./dialog.css";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(dialogOverlay, animatableOverlay, className)}
      {...props}
    />
  );
}

type DialogSize = "small" | "medium" | "large" | "xlarge";
type DialogProfile = "default" | "confirmation";

interface DialogContentProps extends React.ComponentProps<
  typeof DialogPrimitive.Content
> {
  size?: DialogSize;
  profile?: DialogProfile;
}

function DialogContent({
  className,
  children,
  size = "medium",
  profile = "default",
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-size={size}
        data-profile={profile}
        className={cn(dialogContent, animatableContent, className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(dialogHeader, className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn(dialogTitle, className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn(dialogDescription, className)}
      {...props}
    />
  );
}

type DialogScrollFadeTone = "default" | "subtle";

interface DialogBodyProps extends React.ComponentProps<"div"> {
  scrollFadeTone?: DialogScrollFadeTone;
}

/**
 * DialogBody — 공용 ScrollArea 컴포넌트로 스크롤을 위임하는 본문 영역.
 *
 * 스크롤 위치 추적:
 * - ScrollArea의 onScrollMetricsChange 콜백으로 실제 scroll container의 측정값을 받는다.
 * - data-scroll-position 속성으로 border/fade 분기:
 *   none → 없음, top → 하단만, middle → 상하 둘 다, bottom → 상단만.
 */
function DialogBody({
  className,
  children,
  scrollFadeTone = "default",
  ...props
}: DialogBodyProps) {
  const [scrollPos, setScrollPos] = React.useState<
    "none" | "top" | "middle" | "bottom"
  >("none");

  const update = React.useCallback(
    ({ clientHeight, scrollHeight, scrollTop }) => {
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) setScrollPos("none");
      else if (scrollTop <= 0) setScrollPos("top");
      else if (scrollTop >= maxScroll - 1) setScrollPos("bottom");
      else setScrollPos("middle");
    },
    [],
  );

  return (
    <div
      data-slot="dialog-body"
      data-scroll-position={scrollPos}
      data-scroll-fade-tone={scrollFadeTone}
      className={cn(dialogBody, className)}
      {...props}
    >
      <ScrollArea
        type="always"
        className={bodyScrollAreaWrap}
        contentClassName={bodyScrollAreaContent}
        onScrollMetricsChange={update}
      >
        {children}
      </ScrollArea>
    </div>
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(dialogFooter, className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
};
```

### 13-3. Dialog 조립 컴포넌트 (`Dialog.tsx`)

```tsx
import type { ComponentProps, ReactNode } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  Dialog as SgDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "./dialog";
// 의존 컴포넌트 — Icon Button, Button, Segmented Control, Input, ScrollArea
import { IconButton } from "./IconButton";

export type DialogSize = "small" | "medium" | "large" | "xlarge";
export type DialogProfile = "default" | "confirmation";
export type DialogScrollFadeTone = "default" | "subtle";
export type DialogDescription = Exclude<ReactNode, null | undefined | boolean>;

type DialogProfileProps =
  | { profile: "confirmation"; description: DialogDescription }
  | { profile?: "default"; description?: ReactNode };

export type DialogProps = DialogProfileProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: DialogSize;
  title: ReactNode;
  children?: ReactNode;
  subheader?: ReactNode;
  footer?: ReactNode;
  trigger?: ReactNode;
  className?: string;
  closeLabel?: string;
  scrollFadeTone?: DialogScrollFadeTone;
};

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  size = "medium",
  profile = "default",
  title,
  description,
  children,
  subheader,
  footer,
  trigger,
  className,
  scrollFadeTone = "default",
  closeLabel = "다이얼로그 닫기",
}: DialogProps) {
  return (
    <SgDialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          <span>{trigger}</span>
        </DialogTrigger>
      )}
      <DialogContent size={size} profile={profile} className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* 닫기 버튼 — Header 우측 절대 위치. IconButton ghost xlarge. */}
          <DialogPrimitive.Close asChild>
            <IconButton
              icon="close"
              variant="ghost"
              size="xlarge"
              label={closeLabel}
            />
          </DialogPrimitive.Close>
        </DialogHeader>

        {subheader && <div className={dialogSubheader}>{subheader}</div>}

        <DialogBody scrollFadeTone={scrollFadeTone}>
          {description && <DialogDescription>{description}</DialogDescription>}
          {children}
        </DialogBody>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </SgDialog>
  );
}
```

`profile="confirmation"`은 type 단계에서 `description`을 필수로 요구한다. 실제 공용 구현은 빈 문자열,
공백, 빈 native DOM wrapper가 전달된 경우에도 title 아래가 비지 않도록
`작업 대상과 영향을 확인한 후 진행해 주세요.`를 마지막 안전 문구로 표시한다.

### 공용 알림의 바깥 클릭 예외

Radix Content의 기존 props 전달 뒤에 아래 handler를 조합한다. 호출자 callback과 일반 scrim 닫기는 유지한다.

```tsx
onInteractOutside={(event) => {
  props.onInteractOutside?.(event);
  const target = event.detail.originalEvent.target;
  if (target instanceof Element && target.closest('[data-slot="notification-viewport"]')) {
    event.preventDefault();
  }
}}
```
