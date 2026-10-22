import { useCallback, useId, useLayoutEffect, useRef } from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  ReactNode,
  Ref,
  RefObject,
} from "react";
import {
  AttachIconButton,
  BrandMark,
  Button,
  Icon,
  IconButton,
  AgentHubScrollbar,
} from "./primitives";
import { AnimatedDisclosure } from "./common/Disclosure";
import { TextareaControl } from "./common/controls";
import { AgentHubTextReveal, useTextRevealMotion } from "./TextReveal";
export { AgentHubTextReveal } from "./TextReveal";
import "./conversation.css";

const asset = (path: string) => `/agent-hub/assets/${path}`;
const sessionAsset = (name: string) => asset(`session/${name}.svg`);

function ExactGlyph({
  src,
  size,
  className = "",
}: {
  src: string;
  size: number;
  className?: string;
}) {
  return (
    <img
      className={`ah-conversation-glyph ${className}`}
      src={src}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}

/** General information Chip, not AgentHubAgentTypeChip or an interactive filter. */
function AgentMetadata({ label, name }: { label: string; name: string }) {
  return (
    <span className="ah-agent-metadata">
      <span className="ah-agent-info-chip">{label}</span>
      <strong>{name}</strong>
    </span>
  );
}

/** Includes the source Divider's 8px space on each side of its 1px line. */
function VerticalDivider({ height = 12 }: { height?: number }) {
  return (
    <span
      aria-hidden="true"
      className="ah-conversation-divider"
      style={{ height }}
    >
      <span />
    </span>
  );
}

export type ComposerAgent = { id: string; typeLabel: string; title: string };
export type ComposerKeyDecision = "native" | "submit" | "block";
export interface AgentHubChatComposerProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  agent?: ComposerAgent | null;
  projectLabel: string;
  disabled?: boolean;
  readOnly?: boolean;
  requestBusy?: boolean;
  canSubmit: boolean;
  sendTone?: "neutral" | "emphasis";
  onSubmit: () => void;
  onAttach: () => void;
  onSelectProject: () => void;
  decideKey?: (
    event: KeyboardEvent<HTMLTextAreaElement>,
    context: { value: string; requestBusy: boolean },
  ) => ComposerKeyDecision;
  textareaRef?: Ref<HTMLTextAreaElement>;
  /** Increment only for an externally committed prompt, never for typing/IME. */
  externalTextRevision?: string | number;
}

export function AgentHubChatComposer({
  id,
  label,
  value,
  onValueChange,
  placeholder = "무엇이든 물어보세요.",
  agent = null,
  projectLabel,
  disabled = false,
  readOnly = false,
  requestBusy = false,
  canSubmit,
  sendTone = "neutral",
  onSubmit,
  onAttach,
  onSelectProject,
  decideKey,
  textareaRef,
  externalTextRevision,
}: AgentHubChatComposerProps) {
  const composing = useRef(false);
  const editor = useRef<HTMLTextAreaElement>(null);
  const connectEditor = useCallback(
    (node: HTMLTextAreaElement | null) => {
      editor.current = node;
      if (typeof textareaRef === "function") return textareaRef(node);
      if (textareaRef) textareaRef.current = node;
    },
    [textareaRef],
  );
  const cancelTextReveal = useTextRevealMotion(editor, externalTextRevision);
  useLayoutEffect(() => () => cancelTextReveal(), [value, cancelTextReveal]);
  const submitDisabled = disabled || readOnly || requestBusy || !canSubmit;
  return (
    <div className="ah-chat-composer" data-component="AgentHubChatComposer">
      <label className="ah-conversation-sr" htmlFor={id}>
        {label}
      </label>
      <form
        className="ah-chat-composer-surface"
        onSubmit={(event) => {
          event.preventDefault();
          if (!submitDisabled) onSubmit();
        }}
      >
        <div className="ah-chat-composer-left">
          <AttachIconButton
            label="파일 첨부"
            type="button"
            disabled={disabled}
            onClick={() => {
              if (!disabled) onAttach();
            }}
          />
          <div className="ah-chat-composer-editor-group">
            {agent && (
              <>
                <AgentMetadata label={agent.typeLabel} name={agent.title} />
                <VerticalDivider />
              </>
            )}
            <TextareaControl
              ref={connectEditor}
              id={id}
              className="ah-chat-composer-editor"
              focusOwner="container"
              unstyled
              rows={1}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              onChange={(event) => {
                cancelTextReveal();
                onValueChange(event.currentTarget.value);
              }}
              onPointerDown={cancelTextReveal}
              onCompositionStart={() => {
                cancelTextReveal();
                composing.current = true;
              }}
              onCompositionEnd={() => {
                composing.current = false;
              }}
              onKeyDown={(event) => {
                cancelTextReveal();
                if (
                  composing.current ||
                  event.nativeEvent.isComposing ||
                  event.keyCode === 229 ||
                  !decideKey
                )
                  return;
                const decision = decideKey(event, { value, requestBusy });
                if (decision === "native") return;
                event.preventDefault();
                if (decision === "submit" && !submitDisabled)
                  event.currentTarget.form?.requestSubmit();
              }}
            />
          </div>
        </div>
        <AttachIconButton
          className="ah-chat-composer-send"
          icon="arrow-up"
          label="메시지 전송"
          type="submit"
          tone={sendTone === "emphasis" ? "emphasis" : "default"}
          data-send-tone={sendTone}
          disabled={submitDisabled}
        />
      </form>
      <Button
        variant="ghost"
        size={28}
        className="ah-chat-composer-project"
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) onSelectProject();
        }}
      >
        <ExactGlyph
          src={asset("chat-composer/project-folder-16.svg")}
          size={16}
        />
        {projectLabel}
      </Button>
    </div>
  );
}

type UserMessageBase = {
  id: string;
  senderLabel: string;
  message: string;
  textMotion?: "static" | "reveal";
  textRevision?: string | number;
};
export type AgentHubUserMessageProps = UserMessageBase &
  (
    | { kind: "chat"; agent?: never; scheduleStatus?: never }
    | {
        kind: "agent";
        agent: { name: string; chipLabel: string };
        scheduleStatus?: never;
      }
    | { kind: "schedule"; scheduleStatus: string; agent?: never }
  );
export function AgentHubUserMessage(props: AgentHubUserMessageProps) {
  const senderId = useId();
  return (
    <article
      className="ah-user-message"
      data-component="AgentHubUserMessage"
      data-kind={props.kind}
      data-message-id={props.id}
      aria-labelledby={senderId}
    >
      <span className="ah-conversation-sr" id={senderId}>
        {props.senderLabel}
      </span>
      {props.kind === "schedule" && (
        <div className="ah-user-message-schedule">
          <ExactGlyph src={asset("message-user/schedule-12.svg")} size={12} />
          <span>{props.scheduleStatus}</span>
        </div>
      )}
      <div className="ah-user-message-bubble">
        {props.kind === "agent" && (
          <>
            <AgentMetadata
              label={props.agent.chipLabel}
              name={props.agent.name}
            />
            <VerticalDivider />
          </>
        )}
        <p className="ah-user-message-body">
          <AgentHubTextReveal
            text={props.message}
            motion={props.textMotion}
            revision={props.textRevision}
          />
        </p>
      </div>
    </article>
  );
}

export interface AgentHubProgressAlertProps {
  title: string;
  retryLabel?: string;
  editLabel?: string;
  onRetry: () => void;
  onEditPrompt: () => void;
  retryDisabled?: boolean;
  editDisabled?: boolean;
}
export function AgentHubProgressAlert({
  title,
  retryLabel = "다시시도",
  editLabel = "프롬프트 편집",
  onRetry,
  onEditPrompt,
  retryDisabled = false,
  editDisabled = false,
}: AgentHubProgressAlertProps) {
  return (
    <div className="ah-progress-alert" data-component="AgentHubProgressAlert">
      <div className="ah-progress-alert-message">
        <Icon name="circle-alert" size={20} />
        <p>{title}</p>
      </div>
      <div className="ah-progress-alert-actions">
        <Button
          variant="tertiary"
          size={28}
          type="button"
          disabled={retryDisabled}
          onClick={() => {
            if (!retryDisabled) onRetry();
          }}
        >
          {retryLabel}
        </Button>
        <Button
          variant="tertiary"
          size={28}
          type="button"
          disabled={editDisabled}
          onClick={() => {
            if (!editDisabled) onEditPrompt();
          }}
        >
          {editLabel}
        </Button>
      </div>
    </div>
  );
}

export interface AgentHubMessageExampleProps {
  id: string;
  label: string;
  showIcon?: boolean;
  disabled?: boolean;
  onActivate: (id: string) => void;
}
export function AgentHubMessageExample({
  id,
  label,
  showIcon = true,
  disabled = false,
  onActivate,
}: AgentHubMessageExampleProps) {
  return (
    <Button
      variant="ghost"
      type="button"
      className="ah-message-example"
      componentId="AgentHubMessageExample"
      disabled={disabled}
      onClick={() => {
        if (!disabled) onActivate(id);
      }}
    >
      <span>{label}</span>
      {showIcon && <Icon name="arrow-right" size={20} />}
    </Button>
  );
}

export type SessionSectionId = "schedule" | "progress" | "output" | "context";
export type SessionProgressStatus = "done" | "active" | "pending";
export type SessionRun = { id: string; title: string; unread: boolean };
export type SessionOutput = {
  id: string;
  title: string;
  icon: "file-text" | "table" | "code" | "image";
};
export type SessionContext = {
  id: string;
  label: string;
  value: string;
  countText: string;
  icon: "file-text" | "folder" | "book-open" | "wrench" | "scroll-text";
};
export type SessionProgress = {
  id: string;
  label: string;
  indexText: string;
  status: SessionProgressStatus;
};
export type SessionData = {
  schedule: {
    id: string;
    title: string;
    metaText: string;
    runs: readonly SessionRun[];
  } | null;
  steps: readonly SessionProgress[];
  outputs: readonly SessionOutput[];
  contexts: readonly SessionContext[];
  outputCountText: string;
};

export type AgentHubSessionSectionHeaderProps = {
  title: string;
  titleId?: string;
  showCount?: boolean;
  countText?: string;
  toggle?: {
    collapsed: boolean;
    contentId: string;
    label: string;
    triggerRef?: RefObject<HTMLButtonElement | null>;
    onCollapsedChange: (collapsed: boolean) => void;
  };
  action?: { label: string; onActivate: () => void };
};
export function AgentHubSessionSectionHeader({
  title,
  titleId,
  showCount = false,
  countText = "",
  toggle,
  action,
}: AgentHubSessionSectionHeaderProps) {
  return (
    <div
      className="ah-session-section-header"
      data-component="AgentHubSessionSectionHeader"
    >
      <div className="ah-session-section-heading">
        <div className="ah-session-section-title-group">
          <h3 id={titleId}>{title}</h3>
          {showCount && <span>{countText}</span>}
        </div>
        {toggle && (
          <IconButton
            ref={toggle.triggerRef}
            className="ah-session-section-toggle"
            size={24}
            label={toggle.label}
            icon={sessionAsset("chevron-down-16")}
            type="button"
            aria-expanded={!toggle.collapsed}
            aria-controls={toggle.contentId}
            onClick={() => toggle.onCollapsedChange(!toggle.collapsed)}
          />
        )}
      </div>
      {action && (
        <IconButton
          size={24}
          icon={sessionAsset("plus-16")}
          label={action.label}
          type="button"
          onClick={action.onActivate}
        />
      )}
    </div>
  );
}

export type AgentHubSessionItemProps = {
  id: string;
  title: string;
  iconName?: "file-text" | "schedule" | "table" | "code" | "image";
  showMeta?: boolean;
  metaText?: string;
  selected?: boolean;
  disabled?: boolean;
  onActivate: (id: string) => void;
};
export function AgentHubSessionItem({
  id,
  title,
  iconName = "file-text",
  showMeta = false,
  metaText = "",
  selected = false,
  disabled = false,
  onActivate,
}: AgentHubSessionItemProps) {
  return (
    <Button
      variant="ghost"
      type="button"
      className="ah-session-item ah-session-action"
      componentId="AgentHubSessionItem"
      data-session-item-id={id}
      data-selected={selected || undefined}
      aria-current={selected ? "true" : undefined}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onActivate(id);
      }}
      title={title}
    >
      <span className="ah-session-item-icon-box">
        <ExactGlyph src={sessionAsset(`${iconName}-16`)} size={16} />
      </span>
      <span className="ah-session-item-content">
        <span className="ah-session-item-title">{title}</span>
        {showMeta && <span className="ah-session-item-meta">{metaText}</span>}
      </span>
    </Button>
  );
}

export type AgentHubSessionHistoryItemProps = {
  executionId: string;
  title: string;
  current?: boolean;
  unread?: boolean;
  unreadDescription?: string;
  disabled?: boolean;
  onActivate: (executionId: string) => void;
};
export function AgentHubSessionHistoryItem({
  executionId,
  title,
  current = false,
  unread = false,
  unreadDescription = "확인하지 않은 실행",
  disabled = false,
  onActivate,
}: AgentHubSessionHistoryItemProps) {
  const descriptionId = useId();
  return (
    <Button
      variant="ghost"
      type="button"
      className="ah-session-history-item ah-session-action"
      componentId="AgentHubSessionHistoryItem"
      data-current={current || undefined}
      aria-current={current ? "true" : undefined}
      aria-describedby={unread ? descriptionId : undefined}
      disabled={disabled}
      title={title}
      onClick={() => {
        if (!disabled) onActivate(executionId);
      }}
    >
      <span className="ah-session-history-title">{title}</span>
      {unread && (
        <>
          <ExactGlyph src={sessionAsset("history-unread-dot-6")} size={6} />
          <span className="ah-conversation-sr" id={descriptionId}>
            {unreadDescription}
          </span>
        </>
      )}
    </Button>
  );
}

export type AgentHubSessionProgressStepProps = {
  id: string;
  label: string;
  status: SessionProgressStatus;
  indexText: string;
  showConnector?: boolean;
};
const stepStateText: Record<SessionProgressStatus, string> = {
  done: "완료",
  active: "진행 중",
  pending: "대기",
};
export function AgentHubSessionProgressStep({
  id,
  label,
  status,
  indexText,
  showConnector = true,
}: AgentHubSessionProgressStepProps) {
  const imageName =
    status === "pending"
      ? "progress-pending-circle-20"
      : `progress-${status}-20`;
  return (
    <div
      className="ah-session-progress-step"
      data-component="AgentHubSessionProgressStep"
      data-step-id={id}
      data-status={status}
    >
      <div className="ah-session-progress-track" aria-hidden="true">
        <span className="ah-session-progress-indicator">
          <ExactGlyph src={sessionAsset(imageName)} size={20} />
          {status === "pending" && (
            <span className="ah-session-progress-index">{indexText}</span>
          )}
        </span>
        {showConnector && (
          <span className="ah-session-progress-connector">
            <VerticalDivider height={4} />
          </span>
        )}
      </div>
      <p className="ah-session-progress-label" title={label}>
        {label}
        <span className="ah-conversation-sr">, {stepStateText[status]}</span>
      </p>
    </div>
  );
}

export type AgentHubSessionContextItemProps = {
  id: string;
  label: string;
  value: string;
  countText: string;
  iconName?: SessionContext["icon"];
  selected?: boolean;
  disabled?: boolean;
  onActivate: (id: string) => void;
};
export function AgentHubSessionContextItem({
  id,
  label,
  value,
  countText,
  iconName = "book-open",
  selected = false,
  disabled = false,
  onActivate,
}: AgentHubSessionContextItemProps) {
  const iconFile =
    iconName === "book-open" ? "context-book-open-16" : `${iconName}-16`;
  return (
    <Button
      variant="ghost"
      type="button"
      className="ah-session-context-item ah-session-action"
      componentId="AgentHubSessionContextItem"
      data-selected={selected || undefined}
      aria-current={selected ? "true" : undefined}
      disabled={disabled}
      title={`${label}: ${value}, ${countText}개`}
      onClick={() => {
        if (!disabled) onActivate(id);
      }}
    >
      <span className="ah-session-context-content">
        <span className="ah-session-context-label-group">
          <ExactGlyph src={sessionAsset(iconFile)} size={16} />
          <span className="ah-session-context-label">{label}</span>
        </span>
        <span className="ah-session-context-value">{value}</span>
      </span>
      <span className="ah-session-context-count">
        {countText}
        <span className="ah-conversation-sr">개</span>
      </span>
    </Button>
  );
}

export interface AgentHubSessionPanelProps {
  accessibleName: string;
  view: "empty" | "filled";
  data: SessionData;
  expanded: Readonly<Record<SessionSectionId, boolean>>;
  historyExpanded: boolean;
  currentRunId: string | null;
  height?: CSSProperties["height"];
  maxHeight?: CSSProperties["maxHeight"];
  onExpandedChange: (section: SessionSectionId, expanded: boolean) => void;
  onHistoryExpandedChange: (expanded: boolean) => void;
  onScheduleActivate: (id: string) => void;
  onRunActivate: (id: string) => void;
  onOutputActivate: (id: string) => void;
  onContextActivate: (id: string) => void;
  onAddOutput: () => void;
  onAddContext: () => void;
}
export function AgentHubSessionPanel({
  accessibleName,
  view,
  data,
  expanded,
  historyExpanded,
  currentRunId,
  height,
  maxHeight,
  onExpandedChange,
  onHistoryExpandedChange,
  onScheduleActivate,
  onRunActivate,
  onOutputActivate,
  onContextActivate,
  onAddOutput,
  onAddContext,
}: AgentHubSessionPanelProps) {
  const prefix = useId();
  const scheduleTrigger = useRef<HTMLButtonElement>(null);
  const progressTrigger = useRef<HTMLButtonElement>(null);
  const outputTrigger = useRef<HTMLButtonElement>(null);
  const contextTrigger = useRef<HTMLButtonElement>(null);
  const historyTrigger = useRef<HTMLButtonElement>(null);
  const triggers = {
    schedule: scheduleTrigger,
    progress: progressTrigger,
    output: outputTrigger,
    context: contextTrigger,
  };
  const filled = view === "filled";
  // Keep the ScrollArea inside border2 + fixed block padding24, not in the r16 corners.
  const innerMaxHeight =
    maxHeight === undefined || maxHeight === "none"
      ? undefined
      : `calc(${typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight} - 26px)`;
  const toggleFor = (section: SessionSectionId, title: string) => ({
    collapsed: !expanded[section],
    contentId: `${prefix}-${section}`,
    triggerRef: triggers[section],
    label: `${title} ${expanded[section] ? "접기" : "펼치기"}`,
    onCollapsedChange: (collapsed: boolean) =>
      onExpandedChange(section, !collapsed),
  });
  return (
    <aside
      className="ah-session-panel"
      data-component="AgentHubSessionPanel"
      data-view={view}
      aria-label={accessibleName}
      style={{ height, maxHeight }}
    >
      <AgentHubScrollbar
        height={height === undefined ? "auto" : "100%"}
        maxHeight={innerMaxHeight}
        orientation="vertical"
        label={`${accessibleName} 내용`}
        className="ah-session-panel-scrollarea"
        viewportClassName="ah-session-panel-viewport"
        contentClassName="ah-session-panel-body"
        viewportStyle={{
          height: height === undefined ? "auto" : "100%",
          maxHeight: "inherit",
          paddingRight: 0,
        }}
      >
        {filled && data.schedule && (
          <section
            className="ah-session-section"
            aria-labelledby={`${prefix}-schedule-title`}
          >
            <AgentHubSessionSectionHeader
              title="예약"
              titleId={`${prefix}-schedule-title`}
              toggle={toggleFor("schedule", "예약")}
            />
            <AnimatedDisclosure
              open={expanded.schedule}
              id={`${prefix}-schedule`}
              triggerRef={scheduleTrigger}
            >
              <div className="ah-session-disclosure-body ah-session-schedule-body">
                <AgentHubSessionItem
                  id={data.schedule.id}
                  title={data.schedule.title}
                  iconName="schedule"
                  showMeta
                  metaText={data.schedule.metaText}
                  onActivate={onScheduleActivate}
                />
                <div className="ah-session-history-wrap">
                  <div className="ah-session-history">
                    <div className="ah-session-history-heading">
                      <h4 id={`${prefix}-history-title`}>기록</h4>
                      <IconButton
                        ref={historyTrigger}
                        icon={sessionAsset("chevron-down-16")}
                        label={`기록 ${historyExpanded ? "접기" : "펼치기"}`}
                        className="ah-session-history-toggle"
                        size={24}
                        type="button"
                        aria-expanded={historyExpanded}
                        aria-controls={`${prefix}-history`}
                        onClick={() =>
                          onHistoryExpandedChange(!historyExpanded)
                        }
                      />
                    </div>
                    <AnimatedDisclosure
                      open={historyExpanded}
                      id={`${prefix}-history`}
                      triggerRef={historyTrigger}
                    >
                      <ul
                        className="ah-session-list ah-session-history-items"
                        aria-labelledby={`${prefix}-history-title`}
                      >
                        {data.schedule.runs.map((run) => (
                          <li key={run.id}>
                            <AgentHubSessionHistoryItem
                              executionId={run.id}
                              title={run.title}
                              current={currentRunId === run.id}
                              unread={run.unread}
                              onActivate={onRunActivate}
                            />
                          </li>
                        ))}
                      </ul>
                    </AnimatedDisclosure>
                  </div>
                </div>
              </div>
            </AnimatedDisclosure>
          </section>
        )}
        {filled && (
          <section
            className="ah-session-section ah-session-section-progress"
            aria-labelledby={`${prefix}-progress-title`}
          >
            <AgentHubSessionSectionHeader
              title="진행 상황"
              titleId={`${prefix}-progress-title`}
              toggle={toggleFor("progress", "진행 상황")}
            />
            <AnimatedDisclosure
              open={expanded.progress}
              id={`${prefix}-progress`}
              triggerRef={progressTrigger}
            >
              <div className="ah-session-disclosure-body">
                <ol className="ah-session-list ah-session-progress-list">
                  {data.steps.map((step, index) => (
                    <li
                      key={step.id}
                      aria-current={
                        step.status === "active" ? "step" : undefined
                      }
                    >
                      <AgentHubSessionProgressStep
                        {...step}
                        showConnector={index < data.steps.length - 1}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedDisclosure>
          </section>
        )}
        <section
          className="ah-session-section"
          aria-labelledby={`${prefix}-output-title`}
        >
          <AgentHubSessionSectionHeader
            title="출력"
            titleId={`${prefix}-output-title`}
            showCount={filled}
            countText={data.outputCountText}
            toggle={filled ? toggleFor("output", "출력") : undefined}
            action={{ label: "출력 추가", onActivate: onAddOutput }}
          />
          <AnimatedDisclosure
            open={!filled || expanded.output}
            id={`${prefix}-output`}
            triggerRef={outputTrigger}
          >
            <div className="ah-session-disclosure-body">
              {filled ? (
                <ul className="ah-session-list">
                  {data.outputs.map((output) => (
                    <li key={output.id}>
                      <AgentHubSessionItem
                        id={output.id}
                        title={output.title}
                        iconName={output.icon}
                        onActivate={onOutputActivate}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ah-session-empty">출력물이 없습니다.</p>
              )}
            </div>
          </AnimatedDisclosure>
        </section>
        <section
          className="ah-session-section"
          aria-labelledby={`${prefix}-context-title`}
        >
          <AgentHubSessionSectionHeader
            title="컨텍스트"
            titleId={`${prefix}-context-title`}
            toggle={filled ? toggleFor("context", "컨텍스트") : undefined}
            action={{ label: "컨텍스트 추가", onActivate: onAddContext }}
          />
          <AnimatedDisclosure
            open={!filled || expanded.context}
            id={`${prefix}-context`}
            triggerRef={contextTrigger}
          >
            <div className="ah-session-disclosure-body">
              {filled ? (
                <div className="ah-session-context-list">
                  <ul className="ah-session-list ah-session-context-body">
                    {data.contexts.map((context) => (
                      <li key={context.id}>
                        <AgentHubSessionContextItem
                          {...context}
                          iconName={context.icon}
                          onActivate={onContextActivate}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="ah-session-empty">
                  업로드한 컨텍스트가 없습니다.
                </p>
              )}
            </div>
          </AnimatedDisclosure>
        </section>
      </AgentHubScrollbar>
    </aside>
  );
}

export type ViewerAction = {
  label: string;
  disabled?: boolean;
  onRequest: () => void;
};
export interface AgentHubOutputViewerProps {
  open: boolean;
  outputId: string;
  title: string;
  typeText: string;
  showType?: boolean;
  content: ReactNode;
  expandAction?: ViewerAction;
  closeAction?: ViewerAction;
  height?: CSSProperties["height"];
  maxHeight?: CSSProperties["maxHeight"];
  style?: CSSProperties;
}
export function AgentHubOutputViewer({
  open,
  outputId,
  title,
  typeText,
  showType = true,
  content,
  expandAction,
  closeAction,
  height = 977,
  maxHeight,
  style,
}: AgentHubOutputViewerProps) {
  const titleId = useId();
  if (!open) return null;
  return (
    <section
      className="ah-output-viewer"
      data-component="AgentHubOutputViewer"
      data-output-id={outputId}
      aria-labelledby={titleId}
      style={{ height, maxHeight, ...style }}
    >
      <header className="ah-output-viewer-header">
        <div className="ah-output-viewer-title-area">
          <div className="ah-output-viewer-title-group">
            <h3 id={titleId}>{title}</h3>
            {showType && (
              <>
                <ExactGlyph
                  className="ah-output-viewer-dot"
                  src={asset("output-viewer/type-divider-dot-3.svg")}
                  size={3}
                />
                <span>{typeText}</span>
              </>
            )}
          </div>
        </div>
        {(expandAction || closeAction) && (
          <div className="ah-output-viewer-actions">
            {expandAction && (
              <IconButton
                size={24}
                icon={asset("output-viewer/maximize-16.svg")}
                label={expandAction.label}
                type="button"
                disabled={expandAction.disabled}
                onClick={() => {
                  if (!expandAction.disabled) expandAction.onRequest();
                }}
              />
            )}
            {closeAction && (
              <IconButton
                size={24}
                icon={asset("output-viewer/close-16.svg")}
                label={closeAction.label}
                type="button"
                disabled={closeAction.disabled}
                onClick={() => {
                  if (!closeAction.disabled) closeAction.onRequest();
                }}
              />
            )}
          </div>
        )}
      </header>
      <div className="ah-output-viewer-content">
        <AgentHubScrollbar
          className="ah-output-viewer-viewport"
          height="100%"
          orientation="both"
          label={`${title} 본문`}
          contentClassName="ah-output-viewer-document"
        >
          {content}
        </AgentHubScrollbar>
      </div>
    </section>
  );
}

export interface AgentHubThinkingStatusProps {
  requestId: string;
  label: string;
  elapsedSeconds?: number;
  formatElapsed?: (seconds: number) => string;
  readable?: boolean;
  /** User-adopted motion; the source Figma paint remains a static reference. */
  motion?: "static" | "shimmer";
}
export function AgentHubThinkingStatus({
  requestId,
  label,
  elapsedSeconds,
  formatElapsed = (seconds) => `${seconds}초`,
  readable = false,
  motion = "shimmer",
}: AgentHubThinkingStatusProps) {
  const seconds =
    typeof elapsedSeconds === "number" &&
    Number.isFinite(elapsedSeconds) &&
    elapsedSeconds >= 0
      ? Math.floor(elapsedSeconds)
      : null;
  const text =
    seconds === null ? label : `${label} · ${formatElapsed(seconds)}`;
  return (
    <div
      className="ah-thinking-status"
      data-component="AgentHubThinkingStatus"
      data-request-id={requestId}
      data-readable={readable || undefined}
      data-motion={motion}
    >
      <span aria-hidden="true">
        <BrandMark size={32} />
      </span>
      <span
        className="ah-thinking-status-text"
        aria-hidden="true"
        data-visual-text={text}
      >
        {text}
      </span>
      <span className="ah-conversation-sr">{label}</span>
      {seconds !== null && (
        <span className="ah-conversation-sr" aria-live="off">
          경과 시간: {formatElapsed(seconds)}
        </span>
      )}
    </div>
  );
}
