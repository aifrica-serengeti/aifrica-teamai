# Menu — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](../README.md)

## 구현 내용

### 13-2. Menu 컴포넌트 (`dropdown-menu.tsx`)

```tsx
import * as React from "react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import { ScrollArea } from "./ScrollArea"; // 공용 컴포넌트
import {
  content,
  contentScrollable,
  contentNoScroll,
  scrollAreaWrap,
  scrollAreaContent,
  section,
  sectionHeader,
  item,
  itemSmall,
  itemMedium,
  itemLarge,
  itemLeading,
  itemContent,
  itemDescription,
  itemTrailing,
  itemShortcut,
  checkIcon,
  chevronIcon,
  divider,
} from "./dropdown-menu.css";

export type MenuSize = "small" | "medium" | "large";

const ITEM_SIZE_CLASS: Record<MenuSize, string> = {
  small: itemSmall,
  medium: itemMedium,
  large: itemLarge,
};
const MenuContext = React.createContext<{ size: MenuSize }>({ size: "large" });

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  size = "large",
  scrollable = true,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
  size?: MenuSize;
  scrollable?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <MenuContext.Provider value={{ size }}>
        <DropdownMenuPrimitive.Content
          data-slot="dropdown-menu-content"
          data-size={size}
          data-scroll={scrollable ? "true" : "false"}
          sideOffset={sideOffset}
          className={cn(
            content,
            scrollable ? contentScrollable : contentNoScroll,
            className,
          )}
          {...props}
        >
          {scrollable ? (
            <ScrollArea
              type="auto"
              className={scrollAreaWrap}
              contentClassName={scrollAreaContent}
            >
              {children}
            </ScrollArea>
          ) : (
            children
          )}
        </DropdownMenuPrimitive.Content>
      </MenuContext.Provider>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group
      data-slot="dropdown-menu-group"
      className={section}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn(sectionHeader, className)}
      {...props}
    />
  );
}

/* ===== Item =====
 * 레이아웃: [leading] [content(label+desc)] ----- [trailing]
 * trailing 이 string 이면 itemShortcut 클래스 적용.
 * selected + trailing 미지정 → CheckIcon 자동. */
function DropdownMenuItem({
  className,
  children,
  selected = false,
  size: sizeProp,
  description,
  leading,
  trailing,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  size?: MenuSize;
  selected?: boolean;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  const ctx = React.useContext(MenuContext);
  const size = sizeProp ?? ctx.size;
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-selected={selected ? "true" : undefined}
      className={cn(item, ITEM_SIZE_CLASS[size], className)}
      {...props}
    >
      {leading && <span className={itemLeading}>{leading}</span>}
      <span className={itemContent}>
        {children}
        {description && <span className={itemDescription}>{description}</span>}
      </span>
      {trailing && (
        <span className={itemTrailing}>
          {typeof trailing === "string" ? (
            <span className={itemShortcut}>{trailing}</span>
          ) : (
            trailing
          )}
        </span>
      )}
      {selected && !trailing && (
        <span className={itemTrailing}>
          <CheckIcon className={checkIcon} />
        </span>
      )}
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(divider, className)}
      {...props}
    />
  );
}

/* ===== Submenu =====
 * SubTrigger: item 스타일 + 우측 chevron 자동.
 * SubContent: content 스타일 + 기본 size="small". */
function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  children,
  size: sizeProp,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  size?: MenuSize;
}) {
  const ctx = React.useContext(MenuContext);
  const size = sizeProp ?? ctx.size;
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={cn(item, ITEM_SIZE_CLASS[size], className)}
      {...props}
    >
      <span className={itemContent}>{children}</span>
      <span className={itemTrailing}>
        <ChevronRightIcon className={chevronIcon} />
      </span>
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  size = "small",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> & {
  size?: MenuSize;
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <MenuContext.Provider value={{ size }}>
        <DropdownMenuPrimitive.SubContent
          data-slot="dropdown-menu-sub-content"
          className={cn(content, className)}
          {...props}
        />
      </MenuContext.Provider>
    </DropdownMenuPrimitive.Portal>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
```

