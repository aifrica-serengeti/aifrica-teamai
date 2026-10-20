# Page Header — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Page Header 문서 인덱스](../README.md)

## 구현 원칙

`PageHeader`는 화면 제목, 대표 날짜 메타데이터, 설명, 페이지 액션, 탭을 배치하는 레이아웃 컴포넌트다. Button·Chip·Tab을 재구현하지 않고, 호출부에서 만든 public 컴포넌트를 slot prop으로 받는다. `titleChip`에는 상태를 나타내는 **medium Chip**을 전달한다. `detailText`에는 생성일·수정일·등록일·요청일·발생 시각 같은 lifecycle 날짜만 전달하고 작성자·소유자·버전·식별자·소속 정보는 본문에 둔다.

## 의존성

```ts
export const PAGE_HEADER_DEPENDENCIES = [
  "IconButton",
  "Tooltip (PageHeaderIconAction)",
  "Tab",
  "Button / SplitButton (buttonGroup slot)",
  "Chip (titleChip slot)",
  "Skeleton (loading placeholder)",
] as const;
```

로딩 placeholder의 surface와 pulse는 공용 Skeleton을 재사용하고, `PageHeader.css.ts`는 각 자리의
width·height·margin과 Chip 자리의 radius만 소유한다.

## Public API

```tsx
export interface PageHeaderProps extends Omit<
  ComponentProps<"header">,
  "title"
> {
  title?: string;
  isLoading?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  backLabel?: string;
  thumbnail?: ReactNode;
  titleChip?: ReactNode;
  titleAction?: ReactNode;
  detailText?: ReactNode;
  description?: ReactNode;
  buttonGroup?: ReactNode;
  /** @deprecated 신규 화면은 buttonGroup을 사용한다. */
  actions?: ReactNode;
  trailingElement?: ReactNode;
  tabs?: readonly TabItem[];
  tabValue?: string;
  defaultTabValue?: string;
  onTabValueChange?: (value: string) => void;
  tabsDisabled?: boolean;
  tabsAriaLabel?: string;
  borderBottom?: boolean;
}

export interface PageHeaderIconActionProps extends Omit<IconButtonProps, "aria-label"> {
  label: string;
  tooltip: ReactNode;
  suppressTooltipOnFocusReturn?: boolean;
}
```

`isLoading` 중에도 전달된 `title`을 시각적으로 숨긴 `h1`으로 유지한다. `backLabel`은
화면 locale에 맞는 뒤로 가기 접근성 문구를 주입한다.

`actions`는 이전 호출부 호환을 위한 deprecated alias이며, 신규 화면에서는 `buttonGroup`만 사용한다.

`label`은 `PageHeaderIconAction`이 실제 `IconButton`의 `aria-label`로 변환하는 wrapper 전용 입력이다.
`IconButton`을 직접 사용할 때는 `aria-label`을 전달한다. `tabsDisabled` 기본값은 false,
`tabsAriaLabel` 기본값은 `페이지 탭`이다. 다른 tab 입력은 선택적 값과 callback을 그대로 전달한다.

## 제목과 상태 Chip

상태는 제목 옆에 `size="medium"` Chip으로 표시한다. PageHeader가 Chip의 색상·문구·variant를 결정하지 않는다.

```tsx
<PageHeader
  title="aifrica-vmware 상세 정보"
  titleChip={
    <Chip color="green" size="medium" variant="subtle">
      사용
    </Chip>
  }
  titleAction={
    <PageHeaderIconAction
      icon="refresh"
      iconSize="l"
      label="클라우드 상세 새로고침"
      tooltip="새로고침"
      size="medium"
      variant="ghost"
    />
  }
  description="클라우드 환경의 연결 정보와 운영 리소스를 확인하고 관리합니다."
/>
```

## 로딩 상태와 높이 동등성

로딩이어도 호출부가 전달한 행만 placeholder로 렌더한다. 따라서 평상시와 로딩 상태의 PageHeader 높이가 달라지지 않는다.

| 전달된 영역         | 일반 상태 line-height |           로딩 placeholder |
| ------------------- | --------------------: | -------------------------: |
| 제목                |                  32px |                 180 × 32px |
| 제목 Chip (있을 때) |          medium, 24px |                  48 × 24px |
| 상세 정보 (있을 때) |                  16px |   72 × 16px, 제목 아래 2px |
| 설명 (있을 때)      |                  20px | 260 × 20px, 앞 행 아래 4px |

```tsx
<PageHeader
  title="클라우드"
  titleChip={
    <Chip color="green" size="medium">
      사용
    </Chip>
  }
  detailText="생성일 2026. 08. 14. · 수정일 2026. 08. 15."
  description="운영 중인 클라우드 환경과 리소스 상태를 확인할 수 있습니다."
  isLoading
/>
```

로딩 중에도 `header`에 `aria-busy="true"`를 설정한다. placeholder 요소는 `aria-hidden="true"`이므로 최종 제목·설명 정보를 중복해서 읽지 않는다.

## 구현 핵심

```tsx
<header
  data-slot="page-header"
  data-actions-stacked={actionsStacked || undefined}
  data-border-bottom={borderBottom}
  aria-busy={isLoading || undefined}
  className={cn(root, className)}
  {...props}
>
  <div ref={contentRef} className={content}>
    {hasLeading ? (
      <div className={leading}>{/* back / thumbnail */}</div>
    ) : null}
    <div className={titleCopy}>
      {isLoading ? (
        <>
          <h1 className={visuallyHidden}>{heading}</h1>
          <div className={titleRow}>
            <Skeleton
              className={loadingLine}
              data-line="title"
              aria-hidden="true"
            />
            {titleChip ? (
              <Skeleton className={loadingChip} aria-hidden="true" />
            ) : null}
          </div>
          {detail ? (
            <Skeleton
              className={loadingLine}
              data-line="detail"
              aria-hidden="true"
            />
          ) : null}
          {description ? (
            <Skeleton
              className={loadingLine}
              data-line="description"
              aria-hidden="true"
            />
          ) : null}
        </>
      ) : (
        <>
          <div className={titleRow}>
            <h1 className={title}>{heading}</h1>
            {titleChip}
            {titleAction ? (
              <div
                data-slot="page-header-title-actions"
                className={titleActions}
              >
                {titleAction}
              </div>
            ) : null}
          </div>
          {detail && <div className={detailText}>{detail}</div>}
          {description && <div className={descriptionText}>{description}</div>}
        </>
      )}
    </div>
  </div>
  {(resolvedActions || trailingElement) && (
    <div ref={actionRef} className={actions}>
      {resolvedActions}
      {trailingElement}
    </div>
  )}
  {tabs?.length ? (
    <nav className={tabsSlot} aria-label={tabsAriaLabel}>
      <Tab
        tabs={[...tabs]}
        value={tabValue}
        defaultValue={defaultTabValue}
        onValueChange={onTabValueChange}
        disabled={tabsDisabled}
        aria-label={tabsAriaLabel}
        showContent={false}
      />
    </nav>
  ) : null}
</header>
```

`ResizeObserver`는 content/action의 실제 폭을 관찰해 버튼 그룹이 제목과 겹치기 전에 다음 행으로 이동하도록 한다. `tabs`는 헤더와 같은 grid의 전체 열을 차지한다.

위 조립에 사용하는 값은 `PageHeaderProps`에서 구조 분해한다. `tabsDisabled=false`,
`tabsAriaLabel="페이지 탭"`을 적용하고, wrapper 전용 prop을 native `<header>`의 `...props`에 남기지 않는다.

## PageHeaderIconAction 조립

아래 wrapper는 [Tooltip의 공개 Root·Trigger·Content](../../Tooltip/implementation/typescript.md)와
공용 `IconButton`을 조합한다. `React`와 두 컴포넌트는 소비 저장소의 확인한 public entrypoint에서
import한다. Tooltip open·delay는 wrapper, 후속 Dialog/Popover의 open·close는 page가 소유한다.

```tsx
export function PageHeaderIconAction({
  label,
  tooltip,
  suppressTooltipOnFocusReturn = false,
  onClick,
  ...buttonProps
}: PageHeaderIconActionProps) {
  const [open, setOpen] = React.useState(false);
  const suppressOpen = React.useRef(false);
  const focusReturned = React.useRef(false);

  return (
    <Tooltip
      open={open}
      delayDuration={500}
      onOpenChange={(nextOpen) => setOpen(nextOpen && !suppressOpen.current)}
    >
      <TooltipTrigger asChild>
        <span
          onFocusCapture={() => {
            if (suppressOpen.current) {
              focusReturned.current = true;
              setOpen(false);
            }
          }}
          onBlurCapture={(event) => {
            if (
              focusReturned.current &&
              !event.currentTarget.contains(event.relatedTarget)
            ) {
              suppressOpen.current = false;
              focusReturned.current = false;
            }
          }}
          onPointerMove={(event) => {
            if (event.movementX || event.movementY) {
              suppressOpen.current = false;
              focusReturned.current = false;
            }
          }}
        >
          <IconButton
            {...buttonProps}
            aria-label={label}
            onClick={(event) => {
              setOpen(false);
              suppressOpen.current = suppressTooltipOnFocusReturn;
              focusReturned.current = false;
              onClick?.(event);
            }}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
```

overlay가 닫혀 trigger에 focus가 돌아오는 이벤트만으로 Tooltip을 다시 열지 않는다. 이후 실제
포인터 이동 또는 복원된 focus의 이탈이 새 상호작용 수명을 시작한다. overlay 제거로 발생할 수 있는
pointer enter만으로 억제를 해제하지 않는다. 일반 refresh는 이 옵션을 생략하여 다음 hover/focus가
정상적으로 Tooltip을 열 수 있게 한다. 이벤트와 ref는 원래 IconButton으로 전달한다.
