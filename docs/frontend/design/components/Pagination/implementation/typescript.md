# Pagination — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Pagination.tsx`)

```tsx
import { useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "./utils"; // clsx + tailwind-merge
import { IconButton } from "../icon-button/IconButton";
import { Input } from "../input/Input";
import { Dropdown, type DropdownOption } from "../dropdown/Dropdown";
import {
  root,
  countText,
  countHighlight,
  navGroup,
  pageInputArea,
  pageInputWrap,
  pageInput,
  pageTotal,
  slash,
  totalPagesText,
  pageSizeWrap,
} from "./Pagination.css";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];
const DEFAULT_RANGE_TEMPLATE = "총\u00A0{total}건 중 {start}-{end}건";

/** 언어별 token 순서를 유지하면서 total에 전용 강조 token을 적용한다. */
function renderRangeTemplate({
  template,
  locale,
  total,
  start,
  end,
}: {
  template: string;
  locale?: string;
  total: number;
  start: number;
  end: number;
}) {
  let formatter: Intl.NumberFormat;
  try {
    formatter = new Intl.NumberFormat(locale);
  } catch {
    formatter = new Intl.NumberFormat();
  }
  return template.split(/(\{total\}|\{start\}|\{end\})/g).map((part, index) => {
    if (part === "{total}")
      return (
        <span key={`${part}-${index}`} className={countHighlight}>
          {formatter.format(total)}
        </span>
      );
    if (part === "{start}") return formatter.format(start);
    if (part === "{end}") return formatter.format(end);
    return part;
  });
}

export interface PaginationProps {
  /** 현재 페이지 (1-based, controlled). */
  page: number;
  /** 총 항목 수. */
  total: number;
  /** 페이지당 항목 수. 기본 20. */
  pageSize?: number;
  /** 페이지당 항목수 옵션. 기본 [10, 20, 30, 50, 100]. */
  pageSizeOptions?: number[];
  /** 고정 크기 목록에서 항목 수 선택기만 숨김. 기본 true. */
  showPageSize?: boolean;
  /** 페이지 변경 콜백. input Enter/blur 또는 nav 클릭 시. */
  onPageChange?: (page: number) => void;
  /** 페이지당 항목수 변경 콜백. 선택 시 페이지는 1로 리셋. */
  onPageSizeChange?: (pageSize: number) => void;
  /** 비활성(로딩 등). */
  disabled?: boolean;
  /** `simple`이면 현재 페이지 번호(N / 총페이지) + 이전/다음 버튼만 표시한다. 결과 카운트는 숨긴다. 기본 "default". */
  mode?: "default" | "simple";
  /** 결과 카운트 포맷터. 기본 한국어. 테이블 i18n 등에 사용. */
  formatRange?: (range: {
    total: number;
    start: number;
    end: number;
  }) => ReactNode;
  /** i18n 결과 카운트 템플릿. {total} 강조는 Pagination이 소유한다. */
  rangeTemplate?: string;
  /** 템플릿 숫자 표시 locale. */
  locale?: string;
  /** 접근성 라벨 override. */
  labels?: {
    navigation?: string;
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
    pageInput?: (totalPages: number) => string;
  };
  className?: string;
}

interface PageInputProps {
  page: number;
  totalPages: number;
  disabled: boolean;
  onCommit: (page: number) => void;
  ariaLabel?: string;
}

/** page key로 remount해 외부 controlled page 변화와 입력 중 텍스트를 함께 보장한다. */
function PageInput({
  page,
  totalPages,
  disabled,
  onCommit,
  ariaLabel,
}: PageInputProps) {
  const [text, setText] = useState(String(page));
  const commit = () => {
    const parsed = Number.parseInt(text, 10);
    const next = Number.isNaN(parsed)
      ? page
      : Math.min(Math.max(parsed, 1), totalPages);
    setText(String(next));
    if (next !== page) onCommit(next);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") event.currentTarget.blur();
  };
  return (
    <Input
      value={text}
      onChange={(event) => setText(event.target.value.replace(/[^\d]/g, ""))}
      onBlur={commit}
      onKeyDown={onKeyDown}
      disabled={disabled}
      inputMode="numeric"
      className={pageInput}
      aria-label={ariaLabel ?? `현재 페이지, 총 ${totalPages}페이지`}
    />
  );
}

export function Pagination({
  page,
  total,
  pageSize = 20,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showPageSize = true,
  onPageChange,
  onPageSizeChange,
  disabled = false,
  formatRange,
  rangeTemplate = DEFAULT_RANGE_TEMPLATE,
  locale,
  labels,
  className,
}: PaginationProps) {
  // 파생값 — 총페이지, 현재 페이지의 항목 범위.
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = total > 0 ? (safePage - 1) * pageSize + 1 : 0;
  const end = Math.min(safePage * pageSize, total);

  // nav 버튼 disabled.
  const atFirst = safePage <= 1 || total === 0;
  const atLast = safePage >= totalPages || total === 0;

  const pageSizeOptionsData: DropdownOption[] = pageSizeOptions.map((size) => ({
    value: String(size),
    label: String(size),
  }));

  const handlePageSizeChange = (value: string) => {
    const next = Number.parseInt(value, 10);
    if (!Number.isNaN(next)) {
      onPageSizeChange?.(next);
      if (safePage !== 1) onPageChange?.(1); // 첫 페이지로 리셋
    }
  };

  const range = { total, start, end };
  const rangeContent = formatRange
    ? formatRange(range)
    : renderRangeTemplate({ template: rangeTemplate, locale, ...range });

  return (
    <nav
      className={cn(root, className)}
      aria-label={labels?.navigation ?? "페이지네이션"}
    >
      {/* 결과 카운트 */}
      <p className={countText}>{rangeContent}</p>

      {/* 이전 nav — « ‹ */}
      <div className={navGroup}>
        <IconButton
          icon="chevrons_left"
          size="medium"
          iconSize="2xl"
          variant="ghost"
          label={labels?.first ?? "처음 페이지"}
          disabled={disabled || atFirst}
          onClick={() => onPageChange?.(1)}
        />
        <IconButton
          icon="chevron_left"
          size="medium"
          iconSize="2xl"
          variant="ghost"
          label={labels?.prev ?? "이전 페이지"}
          disabled={disabled || atFirst}
          onClick={() => onPageChange?.(safePage - 1)}
        />
      </div>

      {/* 페이지 입력 + 총페이지 */}
      <div className={pageInputArea}>
        <div className={pageInputWrap}>
          <PageInput
            key={`${safePage}-${totalPages}`}
            page={safePage}
            totalPages={totalPages}
            disabled={disabled}
            ariaLabel={labels?.pageInput?.(totalPages)}
            onCommit={(next) => onPageChange?.(next)}
          />
        </div>
        <span className={pageTotal}>
          <span className={slash}>/</span>
          <span className={totalPagesText}>{totalPages}</span>
        </span>
      </div>

      {/* 다음 nav — › » */}
      <div className={navGroup}>
        <IconButton
          icon="chevron_right"
          size="medium"
          iconSize="2xl"
          variant="ghost"
          label={labels?.next ?? "다음 페이지"}
          disabled={disabled || atLast}
          onClick={() => onPageChange?.(safePage + 1)}
        />
        <IconButton
          icon="chevrons_right"
          size="medium"
          iconSize="2xl"
          variant="ghost"
          label={labels?.last ?? "마지막 페이지"}
          disabled={disabled || atLast}
          onClick={() => onPageChange?.(totalPages)}
        />
      </div>

      {/* 페이지당 항목수 */}
      {showPageSize ? (
        <div className={pageSizeWrap}>
          <Dropdown
            contentWidth="content"
            size="medium"
            value={String(pageSize)}
            options={pageSizeOptionsData}
            onValueChange={handlePageSizeChange}
            disabled={disabled}
          />
        </div>
      ) : null}
    </nav>
  );
}
```
