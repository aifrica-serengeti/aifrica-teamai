import { useId, useRef, useState, useLayoutEffect, useEffect } from "react";
import type { ReactNode, RefObject } from "react";

import {
  AgentHubIcon,
  AgentHubButton,
  AgentHubSearch,
  AgentHubBreadcrumb,
  AgentHubIconButton,
  AgentHubScrollbar,
} from "./primitives";
import { AgentHubItemCard } from "./collections";

import { AnimatedDisclosure, useReducedMotion } from "./common/Disclosure";
import { AgentHubInput, AgentHubTextarea, AgentHubSelect } from "./forms";
import "./shell.css";

const asset = (path: string) => `/agent-hub/assets/${path}`;
function ExactIcon({ path, size = 16 }: { path: string; size?: number }) {
  return (
    <img
      src={asset(path)}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
export function AgentHubNavIcon({
  name,
  selected = false,
}: {
  name: "home" | "book" | "clock" | "search";
  selected?: boolean;
}) {
  const file = `snb/nav-${name}-28.svg`;
  return (
    <span
      data-component="AgentHubNavIcon"
      className="ah-nav-icon"
      data-selected={selected}
      aria-hidden="true"
    >
      <span
        className="ah-nav-glyph-mask"
        style={{ maskImage: `url(${asset(file)})` }}
      />
    </span>
  );
}
export function AgentHubNavItem({
  icon,
  label,
  current = false,
  onActivate,
}: {
  icon: "home" | "book" | "clock" | "search";
  label: string;
  current?: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      data-component="AgentHubNavItem"
      className="ah-nav-item"
      aria-label={label}
      aria-current={current ? "page" : undefined}
      data-selected={current}
      title={label}
      onClick={onActivate}
    >
      <AgentHubNavIcon name={icon} selected={current} />
    </button>
  );
}
export function AgentHubNavRail({
  current = "home",
  onNavigate,
  onSettings,
  account = "김",
}: {
  current?: "home" | "book" | "clock" | "search";
  onNavigate: (name: "home" | "book" | "clock" | "search") => void;
  onSettings: () => void;
  account?: string;
}) {
  return (
    <nav
      data-component="AgentHubNavRail"
      className="ah-nav-rail"
      aria-label="Agent Hub 주요 탐색"
    >
      <div className="ah-nav-items">
        {(
          [
            ["home", "홈"],
            ["search", "검색"],
            ["book", "에이전트"],
            ["clock", "예약 작업"],
          ] as const
        ).map(([icon, label]) => (
          <AgentHubNavItem
            key={icon}
            icon={icon}
            label={label}
            current={icon === current}
            onActivate={() => onNavigate(icon)}
          />
        ))}
      </div>
      <div className="ah-nav-bottom">
        <button
          type="button"
          className="ah-icon-button ah-nav-settings"
          aria-label="설정"
          onClick={onSettings}
        >
          <ExactIcon path="snb/settings-20.svg" size={20} />
        </button>
        <span className="ah-nav-avatar" aria-label={`사용자 ${account}`}>
          {account.slice(0, 1)}
        </span>
      </div>
    </nav>
  );
}
export function AgentHubSNBSectionHeader({
  title,
  expanded,
  onExpandedChange,
  onAdd,
  contentId,
  triggerRef,
}: {
  title: string;
  expanded: boolean;
  onExpandedChange: (v: boolean) => void;
  onAdd?: () => void;
  contentId?: string;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div
      data-component="AgentHubSNBSectionHeader"
      className="ah-snb-section-header"
    >
      <div className="ah-snb-section-title">
        <h3>{title}</h3>
        <button
          type="button"
          className="ah-icon-button ah-snb-small ah-snb-disclosure"
          ref={triggerRef}
          data-expanded={expanded}
          aria-label={`${title} ${expanded ? "접기" : "펼치기"}`}
          aria-expanded={expanded}
          aria-controls={expanded ? contentId : undefined}
          onClick={() => onExpandedChange(!expanded)}
        >
          <ExactIcon path="snb/section-chevron-down-16.svg" />
        </button>
      </div>
      {onAdd && (
        <button
          type="button"
          className="ah-icon-button ah-snb-small"
          aria-label={`${title} 추가`}
          onClick={onAdd}
        >
          <ExactIcon path="snb/section-plus-16.svg" />
        </button>
      )}
    </div>
  );
}
export function AgentHubSNBItem({
  title,
  depth = 1,
  icon = "chat",
  current = false,
  onActivate,
  onMore,
  expanded,
  contentId,
  triggerRef,
}: {
  title: string;
  depth?: 1 | 2;
  icon?: "chat" | "folder" | false;
  current?: boolean;
  onActivate: () => void;
  onMore?: () => void;
  expanded?: boolean;
  contentId?: string;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div
      data-component="AgentHubSNBItem"
      className="ah-snb-item"
      data-depth={depth}
      data-selected={current}
      data-has-more={Boolean(onMore)}
    >
      {depth === 2 && <span className="ah-snb-connector" aria-hidden="true" />}
      <button
        type="button"
        className="ah-snb-item-main"
        ref={triggerRef}
        aria-expanded={expanded}
        aria-controls={expanded === undefined ? undefined : contentId}
        onClick={onActivate}
        aria-pressed={current}
      >
        {depth === 1 &&
          icon &&
          (icon === "folder" && !expanded ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              data-glyph="common-folder-closed"
            >
              <path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z" />
            </svg>
          ) : (
            <ExactIcon path={`snb/${icon}-16.svg`} />
          ))}
        <span title={title}>{title}</span>
      </button>
      {onMore && (
        <span className="ah-snb-item-more">
          <button
            type="button"
            className="ah-icon-button"
            aria-label={`${title} 더보기`}
            onClick={onMore}
          >
            <ExactIcon path="snb/more-16.svg" />
          </button>
        </span>
      )}
    </div>
  );
}
export type SNBRow = {
  id: string;
  title: string;
  depth?: 1 | 2;
  icon?: "folder" | "chat" | false;
  children?: SNBRow[];
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};
export type SNBSection = {
  id: string;
  title: string;
  expanded: boolean;
  onExpandedChange: (v: boolean) => void;
  rows: SNBRow[];
};
function SNBProject({
  row,
  selected,
  onSelect,
  onMore,
}: {
  row: SNBRow;
  selected: string;
  onSelect: (id: string) => void;
  onMore?: (id: string) => void;
}) {
  const trigger = useRef<HTMLButtonElement>(null),
    id = useId();
  const isProject = Boolean(row.children);
  return (
    <>
      <AgentHubSNBItem
        title={row.title}
        depth={row.depth}
        icon={row.icon}
        current={selected === row.id}
        expanded={isProject ? Boolean(row.expanded) : undefined}
        contentId={id}
        triggerRef={trigger}
        onActivate={() => {
          if (isProject) row.onExpandedChange?.(!row.expanded);
          else onSelect(row.id);
        }}
        onMore={onMore ? () => onMore(row.id) : undefined}
      />
      {isProject && (
        <AnimatedDisclosure
          id={id}
          open={Boolean(row.expanded)}
          triggerRef={trigger}
        >
          {row.children?.map((child) => (
            <AgentHubSNBItem
              key={child.id}
              {...child}
              depth={2}
              current={selected === child.id}
              onActivate={() => onSelect(child.id)}
              onMore={onMore ? () => onMore(child.id) : undefined}
            />
          ))}
        </AnimatedDisclosure>
      )}
    </>
  );
}
function SNBSectionView({
  section,
  selected,
  onSelect,
  onMore,
}: {
  section: SNBSection;
  selected: string;
  onSelect: (id: string) => void;
  onMore?: (id: string) => void;
}) {
  const trigger = useRef<HTMLButtonElement>(null),
    id = useId();
  return (
    <section>
      <AgentHubSNBSectionHeader
        title={section.title}
        expanded={section.expanded}
        onExpandedChange={section.onExpandedChange}
        contentId={id}
        triggerRef={trigger}
      />
      <AnimatedDisclosure id={id} open={section.expanded} triggerRef={trigger}>
        <div className="ah-snb-rows">
          {section.rows.map((row) => (
            <SNBProject
              key={row.id}
              row={row}
              selected={selected}
              onSelect={onSelect}
              onMore={onMore}
            />
          ))}
        </div>
      </AnimatedDisclosure>
    </section>
  );
}
export function AgentHubSNBPanel({
  sections,
  selected,
  onSelect,
  onNewChat,
  onMore,
}: {
  sections: SNBSection[];
  selected: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onMore?: (id: string) => void;
}) {
  return (
    <aside
      data-component="AgentHubSNBPanel"
      className="ah-snb-panel"
      aria-label="대화 탐색"
    >
      <div className="ah-snb-top">
        <div className="ah-snb-inset">
          <AgentHubButton
            variant="primary"
            size={40}
            onClick={onNewChat}
            style={{ width: "100%" }}
            leadingIcon="plus"
          >
            새 채팅
          </AgentHubButton>
        </div>
        <div className="ah-snb-inset">
          <div className="ah-divider" role="separator" />
        </div>
      </div>
      <AgentHubScrollbar
        className="ah-snb-scroll"
        viewportClassName="ah-snb-viewport"
        height="auto"
        visibility="hover"
        label="대화 목록"
      >
        <div className="ah-snb-sections">
          {sections.map((section) => (
            <SNBSectionView
              key={section.id}
              section={section}
              selected={selected}
              onSelect={onSelect}
              onMore={onMore}
            />
          ))}
        </div>
      </AgentHubScrollbar>
    </aside>
  );
}
export function AgentHubSNB({
  rail,
  panel,
}: {
  rail: ReactNode;
  panel?: ReactNode;
}) {
  return (
    <div data-component="AgentHubSNB" className="ah-snb">
      {rail}
      {panel}
    </div>
  );
}
export function AgentHubGlobalHeader({
  onShortcut,
  onNotification,
}: {
  onShortcut: () => void;
  onNotification: () => void;
}) {
  return (
    <header data-component="AgentHubGlobalHeader" className="ah-global-header">
      <div className="ah-global-brand" aria-label="Cheetah Agent Hub">
        <ExactIcon
          path="global-header/service-logo-mark.svg"
          size={21.70786476135254}
        />
        <span className="ah-global-brand-name">
          <b>Cheetah </b>Agent Hub
        </span>
      </div>
      <div className="ah-global-actions">
        <button
          type="button"
          className="ah-global-shortcut"
          onClick={onShortcut}
        >
          <span className="ah-global-shortcut-icon">
            <img
              src={asset("global-header/platform-shortcut-mark-16.svg")}
              alt=""
              aria-hidden="true"
              width="16.002"
              height="16"
            />
          </span>
          치타 플랫폼 바로가기
        </button>
        <button
          type="button"
          className="ah-icon-button ah-global-notification"
          aria-label="알림 열기"
          onClick={onNotification}
        >
          <ExactIcon path="global-header/notification-bell-20.svg" size={20} />
        </button>
      </div>
    </header>
  );
}
function ThinkingTrack() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !globalThis.ResizeObserver) return;
    let disposed = false;
    const observer = new ResizeObserver((entries) => {
      if (disposed) return;
      const width = entries.find((e) => e.target === el)?.contentRect.width;
      if (width && Number.isFinite(width)) {
        el.style.setProperty("--ah-track-width", `${width}px`);
        el.dataset.ready = "true";
      } else {
        delete el.dataset.ready;
        el.style.removeProperty("--ah-track-width");
      }
    });
    observer.observe(el);
    return () => {
      disposed = true;
      observer.disconnect();
      delete el.dataset.ready;
      el.style.removeProperty("--ah-track-width");
    };
  }, []);
  return (
    <div ref={ref} className="ah-thinking-track" aria-hidden="true">
      <span />
    </div>
  );
}
type ChatHeaderBase = {
  title: string;
  showActiveIndicator?: boolean;
  onPause?: () => void;
  onFiles?: () => void;
  onMore?: () => void;
};
export type AgentHubChatHeaderProps = ChatHeaderBase &
  (
    | { indicatorMode?: "static"; indicatorSessionKey?: never }
    | { indicatorMode: "thinking"; indicatorSessionKey: string }
  );
export function AgentHubChatHeader(props: AgentHubChatHeaderProps) {
  const {
    title,
    onPause,
    onFiles,
    onMore,
    showActiveIndicator = true,
    indicatorMode = "static",
  } = props;
  return (
    <header data-component="AgentHubChatHeader" className="ah-chat-header">
      <AgentHubBreadcrumb items={[{ label: title }]} label="대화 경로" />
      {(onPause || onFiles || onMore) && (
        <div className="ah-chat-header-actions">
          {onPause && (
            <AgentHubIconButton
              icon="pause"
              label="대화 실행 일시정지"
              size={24}
              onClick={onPause}
            />
          )}{" "}
          {onFiles && (
            <AgentHubIconButton
              icon="file"
              label="대화 파일 보기"
              size={24}
              onClick={onFiles}
            />
          )}{" "}
          {onMore && (
            <AgentHubIconButton
              icon="more"
              label="대화 더보기"
              size={24}
              onClick={onMore}
            />
          )}
        </div>
      )}
      {showActiveIndicator &&
        (indicatorMode === "thinking" ? (
          <ThinkingTrack key={props.indicatorSessionKey} />
        ) : (
          <span className="ah-chat-static-indicator" aria-hidden="true" />
        ))}
    </header>
  );
}
export function AgentHubDialogFooter({
  onCancel,
  onConfirm,
  confirmLabel = "확인",
  cancelLabel = "취소",
  disabled = false,
  formId,
}: {
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
  formId?: string;
}) {
  return (
    <footer data-component="AgentHubDialogFooter" className="ah-dialog-footer">
      {onCancel && (
        <AgentHubButton variant="tertiary" size={40} onClick={onCancel}>
          {cancelLabel}
        </AgentHubButton>
      )}
      <AgentHubButton
        variant="primary"
        size={40}
        type={formId ? "submit" : "button"}
        form={formId}
        disabled={disabled}
        onClick={formId ? undefined : onConfirm}
      >
        {confirmLabel}
      </AgentHubButton>
    </footer>
  );
}
export function AgentHubDialog({
  open,
  onOpenChange,
  title,
  recipe = "scheduled-task",
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  recipe?: "scheduled-task" | "agent-finder";
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const reduced = useReducedMotion();
  const returnFocus = useRef<HTMLElement | null>(null);
  const savedOverflow = useRef<string | null>(null);
  const restore = () => {
    if (savedOverflow.current !== null) {
      document.body.style.overflow = savedOverflow.current;
      savedOverflow.current = null;
    }
    const target = returnFocus.current;
    returnFocus.current = null;
    if (target?.isConnected) target.focus();
  };
  useEffect(
    () => () => {
      ref.current?.close();
      restore();
    },
    [],
  );
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      if (!el.open) {
        returnFocus.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        savedOverflow.current = document.body.style.overflow;
        el.showModal();
        document.body.style.overflow = "hidden";
        el.dataset.motion = reduced ? "open" : "enter";
        void el.offsetHeight;
        frame = requestAnimationFrame(() => {
          el.dataset.motion = "open";
        });
      } else el.dataset.motion = "open";
      el.inert = false;
    } else if (el.open) {
      el.inert = true;
      el.dataset.motion = "exit";
      const finish = () => {
        el.close();
        el.inert = false;
        restore();
      };
      if (reduced) finish();
      else timer = setTimeout(finish, 200);
    }
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [open, reduced]);
  return (
    <dialog
      ref={ref}
      data-component="AgentHubDialog"
      className="ah-dialog"
      data-recipe={recipe}
      aria-labelledby={id}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const items = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href],[tabindex="0"]',
          ),
        ].filter(
          (el) => el.getClientRects().length > 0 && !el.closest("[inert]"),
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (!first) {
          event.preventDefault();
          event.currentTarget.focus();
          return;
        }
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onOpenChange(false);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onOpenChange(false);
        }
      }}
    >
      <header className="ah-dialog-header">
        <h2 id={id}>{title}</h2>
        <button
          type="button"
          className="ah-icon-button ah-dialog-close"
          aria-label="다이얼로그 닫기"
          onClick={() => onOpenChange(false)}
        >
          <AgentHubIcon name="x" size={24} />
        </button>
      </header>
      {recipe === "agent-finder" ? (
        <div className="ah-dialog-body ah-dialog-body-layout">{children}</div>
      ) : (
        <AgentHubScrollbar
          className="ah-dialog-body"
          label={`${title} 본문`}
          viewportStyle={{ paddingRight: 0 }}
        >
          {children}
        </AgentHubScrollbar>
      )}
      {footer}
    </dialog>
  );
}
export function ShellGallery() {
  const [notice, setNotice] = useState("");
  const [frequency, setFrequency] = useState("hourly");
  const [fieldsReadOnly, setFieldsReadOnly] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState<string[]>(["projects2"]);
  const [open, setOpen] = useState(false);
  const [finder, setFinder] = useState(false);
  const [name, setName] = useState("주간 시장 동향 분석");
  const [instruction, setInstruction] = useState(
    "매주 시장의 주요 뉴스를 정리해 주세요.",
  );
  const [motion, setMotion] = useState(false);
  const [show, setShow] = useState(true);
  const [current, setCurrent] = useState<"home" | "book" | "clock" | "search">(
    "home",
  );
  const [selected, setSelected] = useState("chat1");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const notify = (s: string) => setNotice(s);
  const sections: SNBSection[] = [
    ["pinned", "고정됨"],
    ["projects", "프로젝트"],
    ["chats", "채팅"],
  ].map(([id, title]) => ({
    id,
    title,
    expanded: !collapsed.includes(id),
    onExpandedChange: (v) =>
      setCollapsed((a) => (v ? a.filter((i) => i !== id) : [...a, id])),
    rows: Array.from({ length: id === "chats" ? 12 : 4 }, (_, i) => ({
      id: `${id}${i}`,
      title:
        id === "projects"
          ? `프로젝트 ${i + 1}`
          : `${i === 0 ? "시장 동향 리서치" : "새로운 대화"} ${i + 1}`,
      icon: id === "projects" ? ("folder" as const) : ("chat" as const),
      ...(id === "projects"
        ? {
            children: Array.from({ length: 3 }, (_, n) => ({
              id: `${id}${i}-child${n}`,
              title: `프로젝트 대화 ${n + 1}`,
              icon: false as const,
            })),
            expanded: projectsOpen.includes(`${id}${i}`),
            onExpandedChange: (v: boolean) =>
              setProjectsOpen((previous) =>
                v
                  ? [...previous, `${id}${i}`]
                  : previous.filter((key) => key !== `${id}${i}`),
              ),
          }
        : {}),
    })),
  }));
  return (
    <div className="lab-stack">
      <section>
        <h2>전역 헤더</h2>
        <AgentHubGlobalHeader
          onShortcut={() => notify("플랫폼 바로가기 명령을 실행했습니다.")}
          onNotification={() => notify("새 알림이 없습니다.")}
        />
      </section>
      <section>
        <h2>탐색 · SNB</h2>
        <div className="lab-shell-preview">
          <AgentHubSNB
            rail={
              <AgentHubNavRail
                current={current}
                onNavigate={setCurrent}
                onSettings={() => notify("설정 명령을 실행했습니다.")}
              />
            }
            panel={
              <AgentHubSNBPanel
                sections={sections}
                selected={selected}
                onSelect={setSelected}
                onNewChat={() => {
                  setSelected("new");
                  notify("새 대화를 만들었습니다.");
                }}
                onMore={(id) => notify(`${id} 더보기 명령을 실행했습니다.`)}
              />
            }
          />
          <div className="lab-shell-content">
            <span className="lab-eyebrow">NAVIGATION PREVIEW</span>
            <h3>대화가 시작되는 공간</h3>
            <p>레일 탐색, 섹션 접기, 대화 선택을 직접 확인해 보세요.</p>
            <p>현재 선택: {selected}</p>
          </div>
        </div>
      </section>
      <section>
        <h2>대화 헤더 · 진행 표시</h2>
        <div className="lab-inline">
          <label>
            <input
              type="checkbox"
              checked={motion}
              onChange={(e) => setMotion(e.target.checked)}
            />{" "}
            생각 중 모션
          </label>
          <label>
            <input
              type="checkbox"
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
            />{" "}
            진행선 표시
          </label>
        </div>
        <AgentHubChatHeader
          title="LG CNS 주식 정보 알려줘"
          onFiles={() => notify("대화 파일 보기")}
          onMore={() => notify("대화 더보기")}
          showActiveIndicator={show}
          {...(motion
            ? { indicatorMode: "thinking", indicatorSessionKey: "demo-request" }
            : { indicatorMode: "static" })}
        />
        <p className="lab-note">
          모션은 구현 제안값: 1800ms · linear · 왼쪽→오른쪽 · 무한 반복.
          기본값은 정적입니다.
        </p>
      </section>
      <section>
        <h2>다이얼로그 · Footer</h2>
        <div className="lab-inline">
          <label>
            <input
              type="checkbox"
              checked={fieldsReadOnly}
              onChange={(event) => setFieldsReadOnly(event.target.checked)}
            />
            폼 읽기 전용
          </label>
          <label>
            <input
              type="checkbox"
              checked={fieldsDisabled}
              onChange={(event) => setFieldsDisabled(event.target.checked)}
            />
            폼 비활성
          </label>
          <label>
            <input
              type="checkbox"
              checked={fieldErrors}
              onChange={(event) => setFieldErrors(event.target.checked)}
            />
            오류 예시
          </label>
        </div>
        <div className="lab-inline">
          <AgentHubButton
            variant="tertiary"
            size={32}
            onClick={() => setOpen(true)}
          >
            예약 작업 편집
          </AgentHubButton>
          <AgentHubButton
            variant="secondary"
            size={32}
            onClick={() => setFinder(true)}
          >
            에이전트 찾기
          </AgentHubButton>
        </div>
        <AgentHubDialog
          open={open}
          onOpenChange={setOpen}
          title="예약 작업 편집"
          footer={
            <AgentHubDialogFooter
              onCancel={() => setOpen(false)}
              confirmLabel="저장하기"
              formId="schedule-form"
              disabled={
                fieldsDisabled ||
                fieldsReadOnly ||
                fieldErrors ||
                !name.trim() ||
                !instruction.trim()
              }
            />
          }
        >
          <form
            id="schedule-form"
            className="ah-schedule-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                fieldsDisabled ||
                fieldsReadOnly ||
                fieldErrors ||
                !name.trim() ||
                !instruction.trim()
              )
                return;
              setOpen(false);
              notify("예약 작업을 저장했습니다.");
            }}
          >
            <AgentHubInput
              label="이름"
              required
              disabled={fieldsDisabled}
              readOnly={fieldsReadOnly}
              error={fieldErrors ? "이름을 확인해 주세요." : undefined}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <AgentHubTextarea
              label="지침"
              required
              disabled={fieldsDisabled}
              readOnly={fieldsReadOnly}
              error={fieldErrors ? "지침을 확인해 주세요." : undefined}
              value={instruction}
              onChange={(event) => setInstruction(event.target.value)}
              toolbar={
                <>
                  <div>
                    {(
                      [
                        ["agent", "에이전트"],
                        ["folder", "프로젝트"],
                        ["chat", "채팅"],
                      ] as const
                    ).map(([icon, label]) => (
                      <AgentHubButton
                        key={icon}
                        variant="ghost"
                        size={28}
                        leadingIcon={icon}
                        trailingIcon="chevron-down"
                        onClick={() => notify(`${label} 연결 선택 요청`)}
                      >
                        {label}
                      </AgentHubButton>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ah-model-selector"
                    onClick={() => notify("모델 선택 요청: Qwen3.8")}
                  >
                    <img
                      src="/agent-hub/assets/picker/model-logo-qwen-sample.png"
                      alt=""
                      width="20"
                      height="20"
                      aria-hidden="true"
                    />
                    Qwen3.8
                    <AgentHubIcon name="chevron-down" size={16} />
                  </button>
                </>
              }
            />
            <AgentHubSelect
              label="빈도"
              required
              disabled={fieldsDisabled}
              readOnly={fieldsReadOnly}
              error={fieldErrors ? "반복 주기를 확인해 주세요." : undefined}
              value={frequency}
              onValueChange={setFrequency}
              options={[
                { value: "hourly", label: "매시간" },
                { value: "daily", label: "매일" },
                { value: "weekly", label: "매주" },
              ]}
            />
            <button
              type="button"
              className="ah-schedule-advanced"
              onClick={() => notify("고급 설정 요청")}
            >
              고급 <ExactIcon path="dialog/advanced-up-16.svg" />
            </button>
          </form>
        </AgentHubDialog>
        <AgentHubDialog
          open={finder}
          onOpenChange={setFinder}
          recipe="agent-finder"
          title="에이전트 찾기"
        >
          <FinderDemo
            onSelect={(label) => {
              setFinder(false);
              notify(`${label} 에이전트를 선택했습니다.`);
            }}
          />
        </AgentHubDialog>
      </section>
      <p className="lab-event" role="status">
        {notice || "컴포넌트의 버튼을 눌러 동작을 확인해 보세요."}
      </p>
    </div>
  );
}
function FinderDemo({ onSelect }: { onSelect: (label: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [details, setDetails] = useState("");
  const [pinned, setPinned] = useState<string[]>([]);
  const names = [
    "리서치 에이전트",
    "데이터 분석 에이전트",
    "문서 작성 에이전트",
    "코드 어시스턴트",
  ];
  const entries = Array.from({ length: 15 }, (_, i) => ({
    id: `agent-${i}`,
    title: `${names[i % 4]}${i < 4 ? "" : ` ${i + 1}`}`,
  })).filter((n) => n.title.includes(query));
  return (
    <div className="ah-finder-layout">
      <nav className="ah-finder-rail" aria-label="에이전트 분류">
        {["전체", "최근 사용", "고정됨"].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </nav>
      <AgentHubScrollbar
        className="ah-finder-scroll"
        contentClassName="ah-finder-demo"
        height="auto"
        label="에이전트 검색 결과"
      >
        <AgentHubSearch
          label="에이전트 검색"
          value={query}
          onValueChange={setQuery}
          placeholder="이름으로 검색"
        />
        <h3>
          {category} ·{" "}
          {
            entries.filter(
              (e) => category !== "고정됨" || pinned.includes(e.id),
            ).length
          }
        </h3>
        <div className="ah-finder-results">
          {entries
            .filter((e) => category !== "고정됨" || pinned.includes(e.id))
            .map(({ id, title }) => (
              <AgentHubItemCard
                key={id}
                itemId={id}
                title={title}
                meta="Aifrica"
                description="업무를 함께 해결하는 전문 에이전트입니다."
                showDot={false}
                showTools={false}
                onOpen={() => setDetails(title)}
                onMore={() => setDetails(`${title} 상세 정보`)}
                onChat={() => onSelect(title)}
                pinAction={{
                  pinned: pinned.includes(id),
                  label: `${title} 고정`,
                  onRequest: (_, next) =>
                    setPinned((v) =>
                      next ? [...v, id] : v.filter((n) => n !== id),
                    ),
                }}
              />
            ))}
        </div>
        <p role="status" className="lab-note">
          {details}
        </p>
      </AgentHubScrollbar>
    </div>
  );
}
export const shellContractIds = [
  "AgentHubNavIcon",
  "AgentHubNavItem",
  "AgentHubNavRail",
  "AgentHubSNBSectionHeader",
  "AgentHubSNBItem",
  "AgentHubSNBPanel",
  "AgentHubSNB",
  "AgentHubGlobalHeader",
  "AgentHubChatHeader",
  "AgentHubDialogFooter",
  "AgentHubDialog",
] as const;
