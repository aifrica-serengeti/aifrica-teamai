# Tab — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](../README.md)

## 구현 내용

### Trigger 컴포넌트 (`tabs.tsx`)

```tsx
import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import {
  tabsRoot,
  tabsList,
  tabsListFullWidth,
  tabsTrigger,
  tabsTriggerFullWidth,
  tabsContent,
} from "./tabs.css";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(tabsRoot, className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  fullWidth = false,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { fullWidth?: boolean }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsList, fullWidth && tabsListFullWidth, className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  fullWidth = false,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  fullWidth?: boolean;
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTrigger, fullWidth && tabsTriggerFullWidth, className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContent, className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

### Tab markup 컴포넌트 (`Tab.tsx`)

```tsx
import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Icon } from "./Icon"; // 공용 Icon 컴포넌트
import { Chip } from "./Chip"; // 공용 Chip 컴포넌트
import type { SystemIconName } from "./iconMap";
import {
  triggerContent,
  triggerIcon,
  triggerLabel,
  triggerCount,
} from "./Tab.css";

export interface TabItem {
  value: string;
  label: string;
  icon?: SystemIconName; // 선행 아이콘 (optional)
  count?: number; // 항목 수 (optional, 0 이하면 미표시)
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabProps {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  showContent?: boolean;
  "aria-label"?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Tab({
  tabs,
  value,
  defaultValue,
  onValueChange,
  showContent = true,
  "aria-label": ariaLabel,
  fullWidth = false,
  disabled = false,
  className,
}: TabProps) {
  return (
    <Tabs
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList fullWidth={fullWidth} aria-label={ariaLabel}>
        {tabs.map((tab) => {
          const tabDisabled = disabled || tab.disabled;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tabDisabled}
              fullWidth={fullWidth}
            >
              <span className={triggerContent}>
                {tab.icon && (
                  <Icon
                    name={tab.icon}
                    size="m"
                    style={{ color: "inherit" }}
                    className={triggerIcon}
                    aria-hidden="true"
                  />
                )}
                <span className={triggerLabel}>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={triggerCount}>
                    <Chip
                      color="default"
                      variant="subtle"
                      size="small"
                      aria-label={`${tab.count}개`}
                    >
                      {tab.count}
                    </Chip>
                  </span>
                )}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {showContent && tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
```

`showContent={false}`는 Header처럼 page가 별도 패널을 소유할 때 사용한다. Tab은 trigger와
controlled 선택 callback을 유지하고 `TabsContent`를 만들지 않는다. `aria-label`은 선택 집합의
이름이므로 Radix `TabsList`에 전달한다. 기본 `showContent=true`인 기존 호출은 그대로 패널을 렌더한다.
이 분기는 외부 page panel의 id·`aria-controls`·`aria-labelledby`를 연결하지 않는다.
[구현 범위](./README.md)의 별도 adapter와 실제 Radix runtime 검증이 필요하다.

### 오버플로우 이동 버튼 상태 계약

이동 버튼은 조건부 렌더링하지 않는다. 양쪽 버튼을 항상 mount하고 스크롤 가능한 방향만
`data-visible`로 표시해야 퇴장 transition이 끝까지 실행된다.

```tsx
interface OverflowButtonProps {
  direction: "previous" | "next";
  visible: boolean;
  onClick: () => void;
}

function OverflowButton({ direction, visible, onClick }: OverflowButtonProps) {
  const previous = direction === "previous";
  return (
    <button
      type="button"
      data-visible={visible}
      disabled={!visible}
      aria-hidden={!visible}
      aria-label={previous ? "이전 탭 보기" : "다음 탭 보기"}
      tabIndex={-1}
      onClick={onClick}
    >
      <Icon
        name={previous ? "chevron_left" : "chevron_right"}
        aria-hidden="true"
      />
    </button>
  );
}
```
