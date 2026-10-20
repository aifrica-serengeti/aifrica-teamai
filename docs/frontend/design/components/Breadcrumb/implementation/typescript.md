# Breadcrumb — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Breadcrumb.tsx`)

```tsx
import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import { IconButton } from "../icon-button/IconButton";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "../menu/Menu";
import {
  list,
  container,
  collapsibleList,
  measureLayer,
  itemLink,
  itemCurrent,
  separator,
} from "./Breadcrumb.css";

/** items prop 모드의 단일 항목 데이터. */
export interface BreadcrumbItemData {
  label: string;
  href?: string;
  current?: boolean;
  /** 축약 메뉴에서 선택 시 콜백. */
  onSelect?: () => void;
}

/** 개별 depth 아이템. */
export interface BreadcrumbItemProps extends Omit<
  React.ComponentProps<"a">,
  "color"
> {
  current?: boolean;
  asChild?: boolean;
}

/** Separator 너비(gap 포함). 측정 단위. */
const SEPARATOR_WIDTH = 8 + 7 + 8; // gap + "/" + gap
/** Overflow 버튼 너비(gap 포함). */
const OVERFLOW_WIDTH = 8 + 20 + 8; // gap + button(20) + gap
const MIN_VISIBLE_ITEMS = 2;

/**
 * 가용 너비에 맞춰 표시할 item 개수 계산.
 * 루트 + 끝에서 (visible-1)개 보존, 중간을 overflow 로 축약.
 */
function computeVisibleCount(itemWidths: number[], available: number): number {
  const total = itemWidths.length;
  if (total <= MIN_VISIBLE_ITEMS) return total;

  const fullWidth =
    itemWidths.reduce((sum, w) => sum + w, 0) + SEPARATOR_WIDTH * (total - 1);
  if (fullWidth <= available) return total;

  for (let visible = total - 1; visible >= MIN_VISIBLE_ITEMS; visible--) {
    const tailStart = total - (visible - 1);
    const keptWidths = [itemWidths[0], ...itemWidths.slice(tailStart)];
    const itemsWidth = keptWidths.reduce((sum, w) => sum + w, 0);
    const separatorsWidth = SEPARATOR_WIDTH * (visible - 1);
    const totalWidth = itemsWidth + separatorsWidth + OVERFLOW_WIDTH;
    if (totalWidth <= available) return visible;
  }
  return MIN_VISIBLE_ITEMS;
}

/** 개별 depth. current 면 텍스트, 아니면 링크. */
function BreadcrumbItem({
  className,
  current = false,
  asChild = false,
  children,
  ...props
}: BreadcrumbItemProps) {
  if (current) {
    return (
      <span aria-current="page" className={cn(itemCurrent, className)}>
        {children}
      </span>
    );
  }
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp className={cn(itemLink, className)} {...props}>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
}

/** "/" 구분자. 장식(aria-hidden). */
function BreadcrumbSeparator({
  className,
  children = "/",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span aria-hidden className={cn(separator, className)} {...props}>
      {children}
    </span>
  );
}

/** 축약 "···" IconButton + 드롭다운 Menu (축약 항목 노출). */
function BreadcrumbOverflow({
  collapsedItems,
}: {
  collapsedItems: BreadcrumbItemData[];
}) {
  if (collapsedItems.length === 0) return null;
  return (
    <Menu>
      <MenuTrigger asChild>
        <IconButton
          icon="more_horizontal"
          size="tiny"
          variant="outlined"
          aria-label={`${collapsedItems.length}개 축약된 경로 펼치기`}
        />
      </MenuTrigger>
      <MenuContent size="small" align="start">
        {collapsedItems.map((item, i) => (
          <MenuItem key={i} onSelect={() => item.onSelect?.()}>
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  );
}

/** Compound 모드용 단순 "···" IconButton (메뉴 없음, 사용처가 직접 Menu 로 감쌈). */
function BreadcrumbOverflowManual({
  "aria-label": ariaLabel = "축약된 경로 펼치기",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <IconButton
      icon="more_horizontal"
      size="tiny"
      variant="outlined"
      aria-label={ariaLabel}
      {...props}
    />
  );
}

/** 자동 축약 모드(items prop) 실제 구현. */
function CollapsibleBreadcrumb({
  items,
  className,
  style,
  ...props
}: {
  items: BreadcrumbItemData[];
  className?: string;
  style?: React.CSSProperties;
} & React.ComponentProps<"nav">) {
  const containerRef = React.useRef<HTMLElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = React.useState(Infinity);
  const [itemWidths, setItemWidths] = React.useState<number[]>([]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setAvailableWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const widths = Array.from(el.children).map(
      (c) => (c as HTMLElement).offsetWidth,
    );
    setItemWidths(widths);
  }, [items]);

  const total = items.length;
  const visibleCount = React.useMemo(
    () => computeVisibleCount(itemWidths, availableWidth),
    [itemWidths, availableWidth],
  );
  const isTruncated = visibleCount < total && total > MIN_VISIBLE_ITEMS;
  const tailStart = total - (visibleCount - 1);
  const tailItems = isTruncated ? items.slice(tailStart) : [];
  const collapsedItems = isTruncated ? items.slice(1, tailStart) : [];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(container, className)}
      style={style}
      ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>}
      {...props}
    >
      <div className={collapsibleList}>
        <BreadcrumbItem
          {...(items[0].current
            ? { current: true }
            : items[0].href
              ? { href: items[0].href }
              : {})}
        >
          {items[0].label}
        </BreadcrumbItem>
        {isTruncated ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbOverflow collapsedItems={collapsedItems} />
            {tailItems.map((item, i) => (
              <React.Fragment key={i}>
                <BreadcrumbSeparator />
                <BreadcrumbItem
                  {...(item.current
                    ? { current: true }
                    : item.href
                      ? { href: item.href }
                      : {})}
                >
                  {item.label}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </>
        ) : (
          items.slice(1).map((item, i) => (
            <React.Fragment key={i}>
              <BreadcrumbSeparator />
              <BreadcrumbItem
                {...(item.current
                  ? { current: true }
                  : item.href
                    ? { href: item.href }
                    : {})}
              >
                {item.label}
              </BreadcrumbItem>
            </React.Fragment>
          ))
        )}
      </div>
      <div className={measureLayer} ref={measureRef} aria-hidden>
        {items.map((item, i) => (
          <span key={i} className={itemCurrent}>
            {item.label}
          </span>
        ))}
      </div>
    </nav>
  );
}

/** Root — items prop 이면 자동 축약, 아니면 compound 컨테이너. */
function BreadcrumbRoot({
  className,
  items,
  style,
  ...props
}: React.ComponentProps<"nav"> & { items?: BreadcrumbItemData[] }) {
  if (items && items.length > 0) {
    return (
      <CollapsibleBreadcrumb
        items={items}
        className={className}
        style={style}
        {...props}
      />
    );
  }
  return (
    <nav aria-label="Breadcrumb" className={cn(list, className)} {...props} />
  );
}

type BreadcrumbComponent = typeof BreadcrumbRoot & {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
  Overflow: typeof BreadcrumbOverflowManual;
};

const Breadcrumb = BreadcrumbRoot as BreadcrumbComponent;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Overflow = BreadcrumbOverflowManual;

export { Breadcrumb };
```

