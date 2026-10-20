# CardAccordion — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](../README.md)

## 구현 내용

### 파일 1: `accordion.tsx` (shadcn Accordion 커스텀)

shadcn 기본 Tailwind 클래스를 모두 제거하고 vanilla-extract로 교체한다.
**`data-slot` 속성이 핵심** — `CardAccordion.css.ts`의 globalStyle이 이 속성으로 요소를 참조한다.

```tsx
import * as React from 'react'
import { Accordion as AccordionPrimitive } from 'radix-ui'

import { cn } from '@design/cn'
import {
  accordionHeader,
  accordionItem,
  accordionTrigger,
  accordionContent,
  accordionContentInner,
} from './accordion.css'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItem, className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    {/* AccordionHeader — Radix 필수 래퍼 (<h3>).
        accordionHeader 스타일로 margin/font 리셋 + display:flex 설정.
        className="flex" (Tailwind) 만으로는 부족함 — <h3> 기본 margin/font 가 남음. */}
    <AccordionPrimitive.Header className={accordionHeader}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTrigger, className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(accordionContent, className)}
      {...props}
    >
      <div className={cn(accordionContentInner, className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

### 파일 4: `CardAccordion.tsx` (메인 컴포넌트)

compound component 패턴. Radix Accordion Root + Item + Trigger + Content 조합.

```tsx
import * as React from "react";
import {
  Accordion as AccordionRootPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
  AccordionContent as AccordionContentPrimitive,
} from "./accordion"; // 파일 1
import { Icon } from "./Icon"; // 의존 컴포넌트 (Icon/README.md 참조)
import {
  accordionActions,
  accordionExpandButton,
  accordionFocusOutline,
  accordionOptional,
  accordionPanelPlaceholder,
  accordionTitle,
  accordionTitleGroup,
  accordionTitleText,
} from "./CardAccordion.css"; // 파일 3

export type CardAccordionInteractive =
  "enabled" | "hovered" | "pressed" | "focused" | "disabled";

export interface CardAccordionProps {
  title: string;
  titleMeta?: React.ReactNode;
  optionalLabel?: string;
  showInfoIcon?: boolean;
  infoLabel?: string;
  interactiveState?: CardAccordionInteractive;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function CardAccordionBase({
  title,
  titleMeta,
  optionalLabel,
  showInfoIcon = false,
  infoLabel = "정보 보기",
  interactiveState,
  defaultExpanded = false,
  expanded: expandedProp,
  onExpandedChange,
  disabled = false,
  className,
  children,
}: CardAccordionProps) {
  const isDisabled = disabled || interactiveState === "disabled";
  const resolvedInteractive: CardAccordionInteractive = isDisabled
    ? "disabled"
    : (interactiveState ?? "enabled");

  const isControlled = expandedProp !== undefined;
  const ITEM_VALUE = "card-accordion";

  // children 에서 Actions 와 Panel 추출
  const childArray = React.Children.toArray(children);
  const actions = childArray.filter(
    (child) =>
      React.isValidElement(child) &&
      child.type === CardAccordionActionsComponent,
  );
  const panels = childArray.filter(
    (child) =>
      React.isValidElement(child) && child.type === CardAccordionPanelComponent,
  );

  const isStaticDemo = interactiveState !== undefined;

  // Radix Root props — 제어/비제어 분기
  const rootProps = isControlled
    ? {
        value: expandedProp ? ITEM_VALUE : "",
        onValueChange: (val: string) => onExpandedChange?.(val === ITEM_VALUE),
      }
    : { defaultValue: defaultExpanded ? ITEM_VALUE : "" };

  return (
    <AccordionRootPrimitive
      type="single"
      collapsible
      className={className}
      data-interactive={resolvedInteractive}
      {...rootProps}
    >
      <AccordionItemPrimitive
        value={ITEM_VALUE}
        data-interactive={resolvedInteractive}
      >
        <AccordionTriggerPrimitive
          disabled={isDisabled}
          data-interactive={isStaticDemo ? resolvedInteractive : undefined}
        >
          {/* Focus outline — Trigger 내부. 표시/숨김은 CSS globalStyle 제어 */}
          <span className={accordionFocusOutline} aria-hidden="true" />

          {/* Title 그룹: expand icon + title + optional + info */}
          <span className={accordionTitleGroup}>
            <span
              className={accordionExpandButton}
              data-disabled={isDisabled || undefined}
              aria-hidden="true"
            >
              <Icon
                name="triangle_down"
                size="m"
                color={isDisabled ? "disabled" : "default"}
              />
            </span>
            <span className={accordionTitleText}>
              <span
                className={accordionTitle}
                data-disabled={isDisabled || undefined}
              >
                {title}
              </span>
              {titleMeta ? (
                <span data-slot="accordion-title-meta">{titleMeta}</span>
              ) : null}
              {optionalLabel && (
                <span
                  className={accordionOptional}
                  data-disabled={isDisabled || undefined}
                >
                  {optionalLabel}
                </span>
              )}
              {showInfoIcon && (
                <Icon
                  name="info"
                  size="s"
                  color={isDisabled ? "disabled" : "subtler"}
                  role="img"
                  aria-label={infoLabel}
                />
              )}
            </span>
          </span>
        </AccordionTriggerPrimitive>

        {/* 우측 Actions — nested button을 피하도록 Trigger의 형제로 렌더 */}
        {actions.length > 0 && (
          <span className={accordionActions}>{actions}</span>
        )}

        {/* Panel — Radix Content 가 data-state + keyframes 애니메이션 처리 */}
        <AccordionContentPrimitive>
          {panels.length > 0 ? (
            panels
          ) : (
            <div className={accordionPanelPlaceholder}>Panel</div>
          )}
        </AccordionContentPrimitive>
      </AccordionItemPrimitive>
    </AccordionRootPrimitive>
  );
}

/* ============================================================
 * Actions — header 우측 액션 버튼 영역.
 * Button / IconButton 컴포넌트를 children 으로 주입받는다.
 * ============================================================ */
function CardAccordionActionsComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
}

/* ============================================================
 * Panel — 본문 컨테이너.
 * placeholder=true 시 데모용 placeholder 표시.
 * ============================================================ */
interface CardAccordionPanelProps extends React.ComponentProps<"div"> {
  placeholder?: boolean;
}
function CardAccordionPanelComponent({
  className,
  children,
  placeholder = false,
  ...props
}: CardAccordionPanelProps) {
  if (placeholder && !children) {
    return <div className={accordionPanelPlaceholder}>Panel</div>;
  }
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

/* ============================================================
 * Compound 조합
 * ============================================================ */
type CardAccordionComponent = typeof CardAccordionBase & {
  Actions: typeof CardAccordionActionsComponent;
  Panel: typeof CardAccordionPanelComponent;
};
export const CardAccordion = CardAccordionBase as CardAccordionComponent;
CardAccordion.Actions = CardAccordionActionsComponent;
CardAccordion.Panel = CardAccordionPanelComponent;
```
