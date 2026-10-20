# Card — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](../README.md)

## 구현 내용

대표 날짜는 `Card.SubDescription`에 배치하고, 목록 카드의 나머지 사실 정보는
`Card.Summary`, `Card.SummaryRow`, `Card.SummaryLabel`, `Card.SummaryValue` compound
component로 조합한다. 날짜가 있는 목록 카드에서는 SubDescription 뒤에 ExtendedHeader를
추가하지 않는다. SubDescription은 `p`, 네 Summary 구성요소는 각각 `div`, `div`,
`span`, `span`의 native props를 전달한다.

### Card.tsx

```tsx
import * as React from "react";

import { cn } from "@design/cn";
import { Button } from "@components/button/Button";
import type { ButtonVariant } from "@components/button/Button";
import { Chip } from "@components/chip/Chip";
import type { ChipColor, ChipShape, ChipVariant } from "@components/chip/Chip";
import { IconButton } from "@components/icon-button/IconButton";
import { Icon } from "@components/icon/Icon";
import type { SystemIconName } from "@components/icon/iconMap";
import { Link } from "@components/link/Link";
import {
  cardBody,
  cardButtonGroup,
  cardButtonGroupItem,
  cardChipContainer,
  cardCreatorBy,
  cardCreatorInfo,
  cardCreatorName,
  cardCreatorNameText,
  cardDescription,
  cardDetailDot,
  cardDetailItem,
  cardDetailItems,
  cardDetailText,
  cardExtendedHeader,
  cardFocusOutline,
  cardHeader,
  cardHeaderGroup,
  cardHeaderText,
  cardLeadingVisual,
  cardLinkFooter,
  cardRoot,
  cardSummary,
  cardSummaryLabel,
  cardSummaryRow,
  cardSummaryValue,
  cardSubDescription,
  cardThumbnailContent,
  cardThumbnailImage,
  cardThumbnailWrapper,
  cardTitle,
  cardTitleRow,
} from "./Card.css";

export type CardType = "default" | "thumbnail";
export type CardSize = "small" | "medium" | "large";
export type CardState =
  "enabled" | "hovered" | "pressed" | "selected" | "disabled" | "focused";

export interface CardProps extends Omit<React.ComponentProps<"div">, "title"> {
  type?: CardType;
  size?: CardSize;
  state?: CardState;
  interactive?: boolean;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
}

const LEADING_VISUAL_SIZE: Record<CardSize, number> = {
  small: 40,
  medium: 40,
  large: 44,
};

function CardBase({
  type = "default",
  size = "medium",
  state = "enabled",
  interactive = false,
  thumbnailSrc,
  thumbnailAlt = "",
  className,
  children,
  ...props
}: CardProps) {
  /* Thumbnail type */
  if (type === "thumbnail") {
    return (
      <div
        className={cn(cardThumbnailWrapper, className)}
        data-state={state}
        aria-disabled={state === "disabled" ? true : undefined}
        {...props}
      >
        {state === "focused" && <span className={cardFocusOutline} />}
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className={cardThumbnailImage}
          />
        )}
        <div className={cardThumbnailContent} data-state={state}>
          {children}
        </div>
      </div>
    );
  }

  /* Default type */
  const dataAttrs = {
    "data-size": size,
    "data-state": state,
    "data-interactive": interactive ? "" : undefined,
    "aria-disabled": state === "disabled" ? true : undefined,
    className: cn(cardRoot, className),
  };

  const showFocusOutline = state === "focused" || interactive;
  const focusOutline = showFocusOutline ? (
    <span className={cardFocusOutline} />
  ) : null;

  if (interactive) {
    return (
      <button
        type="button"
        disabled={state === "disabled"}
        {...dataAttrs}
        {...(props as React.ComponentProps<"button">)}
      >
        {focusOutline}
        {children}
      </button>
    );
  }

  return (
    <div {...dataAttrs} {...props}>
      {focusOutline}
      {children}
    </div>
  );
}

/* 서브 컴포넌트들 — compound component 패턴 */
function CardHeaderComponent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(cardHeader, className)} {...props}>
      {children}
    </div>
  );
}

function CardHeaderGroupComponent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(cardHeaderGroup, className)} {...props}>
      {children}
    </div>
  );
}

function CardLeadingVisualComponent({
  size,
  className,
  children,
  ...props
}: CardLeadingVisualProps) {
  const dimension = size ? LEADING_VISUAL_SIZE[size] : undefined;
  return (
    <div
      className={cn(cardLeadingVisual, className)}
      style={dimension ? { width: dimension, height: dimension } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeaderTextComponent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(cardHeaderText, className)} {...props}>
      {children}
    </div>
  );
}

function CardTitleRowComponent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(cardTitleRow, className)} {...props}>
      {children}
    </div>
  );
}

function CardTitleComponent({
  cardSize,
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <p className={cn(cardTitle, className)} data-size={cardSize} {...props}>
      {children}
    </p>
  );
}

function CardDescriptionComponent({
  cardSize,
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn(cardDescription, className)}
      data-size={cardSize}
      {...props}
    >
      {children}
    </p>
  );
}

function CardSubDescriptionComponent({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn(cardSubDescription, className)} {...props}>
      {children}
    </p>
  );
}

function CardNewBadgeComponent({
  label = "new",
  disabled = false,
}: CardNewBadgeProps) {
  return (
    <Chip
      color="blue"
      variant="subtle"
      shape="pill"
      size="small"
      disabled={disabled}
    >
      {label}
    </Chip>
  );
}

function CardIconButtonComponent({
  icon = "more_vertical",
  label = "더 보기",
  disabled = false,
  onClick,
}: CardIconButtonProps) {
  return (
    <IconButton
      icon={icon}
      variant="ghost"
      size="medium"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    />
  );
}

function CardExtendedHeaderComponent({
  details,
  chips,
  disabled = false,
}: CardExtendedHeaderProps) {
  if (!details && !chips) return null;
  return (
    <div className={cardExtendedHeader}>
      {details && details.length > 0 && (
        <div className={cardDetailItems}>
          {details.map((item, index) => (
            <React.Fragment key={`${item.text}-${index}`}>
              {index > 0 && <span className={cardDetailDot}>•</span>}
              <div className={cardDetailItem}>
                {item.icon && (
                  <Icon
                    name={item.icon}
                    size="t"
                    color={disabled ? "disabled" : "subtler"}
                  />
                )}
                <span className={cardDetailText}>{item.text}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
      {chips && chips.length > 0 && (
        <div className={cardChipContainer}>
          {chips.map((chip, index) => (
            <Chip
              key={`${chip.label}-${index}`}
              color={chip.color ?? "default"}
              variant={chip.variant ?? "subtle"}
              shape={chip.shape ?? "rounded"}
              size="small"
              disabled={disabled}
            >
              {chip.label}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}

function CardBodyComponent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(cardBody, className)} {...props}>
      {children}
    </div>
  );
}

function CardSummaryComponent(props: React.ComponentProps<"div">) {
  return <div {...props} className={cn(cardSummary, props.className)} />;
}
function CardSummaryRowComponent(props: React.ComponentProps<"div">) {
  return <div {...props} className={cn(cardSummaryRow, props.className)} />;
}
function CardSummaryLabelComponent(props: React.ComponentProps<"span">) {
  return <span {...props} className={cn(cardSummaryLabel, props.className)} />;
}
function CardSummaryValueComponent(props: React.ComponentProps<"span">) {
  return <span {...props} className={cn(cardSummaryValue, props.className)} />;
}

function CardFooterComponent({
  variant,
  linkText = "더 보기",
  linkHref,
  creatorName,
  creatorAvatar,
  buttons,
  disabled = false,
}: CardFooterProps) {
  if (variant === "link") {
    return (
      <div className={cardLinkFooter}>
        <Link size="small" href={linkHref} disabled={disabled}>
          {linkText}
        </Link>
      </div>
    );
  }
  if (variant === "creator") {
    return (
      <div className={cardCreatorInfo}>
        <span className={cardCreatorBy}>by</span>
        <span className={cardCreatorName}>
          <span className={cardCreatorNameText}>{creatorName}</span>
          {creatorAvatar}
        </span>
      </div>
    );
  }
  return (
    <div className={cardButtonGroup}>
      {buttons?.map((btn, index) => (
        <Button
          key={`${btn.label}-${index}`}
          variant={btn.variant ?? "tertiary"}
          size="small"
          disabled={disabled}
          className={cardButtonGroupItem}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  );
}

/* 타입 정의 */
export interface CardLeadingVisualProps extends React.ComponentProps<"div"> {
  size?: CardSize;
}
export interface CardTitleProps extends React.ComponentProps<"p"> {
  cardSize?: CardSize;
}
export interface CardDescriptionProps extends React.ComponentProps<"p"> {
  cardSize?: CardSize;
}
export interface CardNewBadgeProps {
  label?: string;
  disabled?: boolean;
}
export interface CardIconButtonProps {
  icon?: SystemIconName;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}
export interface CardDetailItemData {
  icon?: SystemIconName;
  text: string;
}
export interface CardChipData {
  label: string;
  color?: ChipColor;
  variant?: ChipVariant;
  shape?: ChipShape;
}
export interface CardExtendedHeaderProps {
  details?: CardDetailItemData[];
  chips?: CardChipData[];
  disabled?: boolean;
}
export interface CardFooterButton {
  label: string;
  variant?: ButtonVariant;
}
export interface CardFooterProps {
  variant: "link" | "creator" | "buttons";
  linkText?: string;
  linkHref?: string;
  creatorName?: string;
  creatorAvatar?: React.ReactNode;
  buttons?: CardFooterButton[];
  disabled?: boolean;
}

/* Compound component 조합 */
type CardComponent = typeof CardBase & {
  Header: typeof CardHeaderComponent;
  HeaderGroup: typeof CardHeaderGroupComponent;
  LeadingVisual: typeof CardLeadingVisualComponent;
  HeaderText: typeof CardHeaderTextComponent;
  TitleRow: typeof CardTitleRowComponent;
  Title: typeof CardTitleComponent;
  Description: typeof CardDescriptionComponent;
  SubDescription: typeof CardSubDescriptionComponent;
  NewBadge: typeof CardNewBadgeComponent;
  IconButton: typeof CardIconButtonComponent;
  ExtendedHeader: typeof CardExtendedHeaderComponent;
  Summary: typeof CardSummaryComponent;
  SummaryRow: typeof CardSummaryRowComponent;
  SummaryLabel: typeof CardSummaryLabelComponent;
  SummaryValue: typeof CardSummaryValueComponent;
  Body: typeof CardBodyComponent;
  Footer: typeof CardFooterComponent;
};

export const Card = CardBase as CardComponent;
Card.Header = CardHeaderComponent;
Card.HeaderGroup = CardHeaderGroupComponent;
Card.LeadingVisual = CardLeadingVisualComponent;
Card.HeaderText = CardHeaderTextComponent;
Card.TitleRow = CardTitleRowComponent;
Card.Title = CardTitleComponent;
Card.Description = CardDescriptionComponent;
Card.SubDescription = CardSubDescriptionComponent;
Card.NewBadge = CardNewBadgeComponent;
Card.IconButton = CardIconButtonComponent;
Card.ExtendedHeader = CardExtendedHeaderComponent;
Card.Summary = CardSummaryComponent;
Card.SummaryRow = CardSummaryRowComponent;
Card.SummaryLabel = CardSummaryLabelComponent;
Card.SummaryValue = CardSummaryValueComponent;
Card.Body = CardBodyComponent;
Card.Footer = CardFooterComponent;
```
