import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "../components/primitives";
import { AnimatedDisclosure } from "../components/common/Disclosure";
import {
  AgentHubChatComposer,
  AgentHubMessageExample,
  AgentHubOutputViewer,
  AgentHubProgressAlert,
  AgentHubSessionContextItem,
  AgentHubSessionHistoryItem,
  AgentHubSessionItem,
  AgentHubSessionPanel,
  AgentHubSessionProgressStep,
  AgentHubSessionSectionHeader,
  AgentHubThinkingStatus,
  AgentHubUserMessage,
} from "../components/conversation";
import type {
  SessionData,
  SessionSectionId,
  SessionProgressStatus,
  AgentHubUserMessageProps,
} from "../components/conversation";

const startingData: SessionData = {
  schedule: {
    id: "mail-summary",
    title: "전일 수신 업무메일 요약",
    metaText: "매시간",
    runs: [
      { id: "run-15", title: "오늘 오후 3:00", unread: false },
      { id: "run-14", title: "오늘 오후 2:00", unread: true },
      { id: "run-13", title: "오늘 오후 1:00", unread: true },
      { id: "run-12", title: "오늘 오후 12:00", unread: false },
      { id: "run-11", title: "오늘 오전 11:00", unread: false },
    ],
  },
  steps: [
    { id: "analyze", label: "첨부 자료 분석", indexText: "1", status: "done" },
    {
      id: "aggregate",
      label: "부서별 실적 집계",
      indexText: "2",
      status: "active",
    },
    {
      id: "draft-report",
      label: "보고서 초안 작성",
      indexText: "3",
      status: "pending",
    },
    { id: "validate", label: "출력물 검증", indexText: "4", status: "pending" },
  ],
  outputs: [
    { id: "summary", title: "주간 실적 보고서.docx", icon: "file-text" },
    { id: "table", title: "부서별 실적 집계.xlsx", icon: "table" },
    { id: "analysis", title: "데이터 분석.py", icon: "code" },
    { id: "result", title: "실행 결과.json", icon: "code" },
    { id: "chart", title: "부서별 실적 그래프.png", icon: "image" },
  ],
  contexts: [
    {
      id: "attachments",
      label: "첨부파일",
      value: "회계_조직도_근무조회계_9월_업무일지.docx",
      countText: "5",
      icon: "file-text",
    },
    {
      id: "volume",
      label: "볼륨",
      value: "회사 업무일지",
      countText: "2",
      icon: "folder",
    },
    {
      id: "knowledge",
      label: "지식",
      value: "사내 보고서 작성 가이드",
      countText: "5",
      icon: "book-open",
    },
    {
      id: "tools",
      label: "도구",
      value: "그룹웨어 메일",
      countText: "5",
      icon: "wrench",
    },
    {
      id: "skills",
      label: "스킬",
      value: "report-writer",
      countText: "3",
      icon: "scroll-text",
    },
  ],
  outputCountText: "5",
};

function Example({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section
      className="ah-conversation-demo"
      data-contract={id}
      id={`demo-${id}`}
    >
      <div className="ah-conversation-demo-heading">
        <h3>{title}</h3>
        <code>{id}</code>
      </div>
      {note && <p className="ah-conversation-demo-note">{note}</p>}
      <div className="ah-conversation-demo-canvas">{children}</div>
    </section>
  );
}

export function ConversationGallery() {
  const [draft, setDraft] = useState("");
  const [draftRevision, setDraftRevision] = useState(0);
  const [aiText, setAiText] = useState("");
  const [aiTextRevision, setAiTextRevision] = useState(0);
  const [agentSelected, setAgentSelected] = useState(false);
  const [project, setProject] = useState("Serengeti AI");
  const [readOnly, setReadOnly] = useState(false);
  const [composerDisabled, setComposerDisabled] = useState(false);
  const [messages, setMessages] = useState<AgentHubUserMessageProps[]>([]);
  const [phase, setPhase] = useState<
    "idle" | "thinking" | "interrupted" | "complete"
  >("idle");
  const [elapsed, setElapsed] = useState(4);
  const [readable, setReadable] = useState(false);
  const [thinkingMotion, setThinkingMotion] = useState(true);
  const [attachmentNames, setAttachmentNames] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [expanded, setExpanded] = useState<Record<SessionSectionId, boolean>>({
    schedule: true,
    progress: true,
    output: true,
    context: true,
  });
  const [historyExpanded, setHistoryExpanded] = useState(true);
  const [currentRunId, setCurrentRunId] = useState<string | null>("run-15");
  const [sessionData, setSessionData] = useState(startingData);
  const [emptyPanel, setEmptyPanel] = useState(false);
  const [sessionBounded, setSessionBounded] = useState(true);
  const [outputId, setOutputId] = useState<string | null>("summary");
  const [viewerExpanded, setViewerExpanded] = useState(false);
  const [showType, setShowType] = useState(true);
  const [showExpand, setShowExpand] = useState(true);
  const [showClose, setShowClose] = useState(true);
  const [emptyContent, setEmptyContent] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [selectedContext, setSelectedContext] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [headerCount, setHeaderCount] = useState(true);
  const [headerAction, setHeaderAction] = useState(true);
  const [headerToggle, setHeaderToggle] = useState(true);
  const [historyUnread, setHistoryUnread] = useState(true);
  const [historyCurrent, setHistoryCurrent] = useState(false);
  const [stepStatus, setStepStatus] = useState<SessionProgressStatus>("active");
  const [connector, setConnector] = useState(true);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const headerTriggerRef = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const viewerTrigger = useRef<HTMLElement | null>(null);
  const lastPrompt = useRef("지난주 부서별 실적을 요약해 주세요.");
  const messageNumber = useRef(0);
  const selectedOutput = sessionData.outputs.find(
    (output) => output.id === outputId,
  );
  const outputFormat =
    selectedOutput?.title.split(".").at(-1)?.toUpperCase() ?? "file-format";
  const selectedRun = sessionData.schedule?.runs.find(
    (run) => run.id === currentRunId,
  );

  function send() {
    if (phase === "thinking" || !draft.trim() || composerDisabled || readOnly)
      return;
    messageNumber.current += 1;
    const base = {
      id: `sent-${messageNumber.current}`,
      senderLabel: "사용자",
      message: draft,
      textMotion: "reveal" as const,
    };
    setMessages((current) => [
      ...current,
      agentSelected
        ? {
            ...base,
            kind: "agent",
            agent: { name: "문서 요약", chipLabel: "에이전트" },
          }
        : { ...base, kind: "chat" },
    ]);
    lastPrompt.current = draft;
    // Demo adapter policy: accept locally, then clear draft. No network or generated response.
    setDraft("");
    setPhase("thinking");
    setElapsed(0);
    setFeedback(
      "로컬 데모에서 요청을 접수했습니다. 실제 서버 요청은 실행하지 않습니다.",
    );
  }
  function fillExample(id: string) {
    const prompts: Record<string, string> = {
      weekly: "지난주 부서별 실적을 요약해 주세요.",
      compare: "두 문서를 비교하고 주요 차이를 정리해 주세요.",
    };
    setDraft(prompts[id] ?? "");
    setDraftRevision((revision) => revision + 1);
    editorRef.current?.focus();
    setFeedback("예시를 입력란에 채웠습니다. 전송 버튼으로 직접 보내세요.");
  }
  function openOutput(id: string) {
    viewerTrigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setOutputId(id);
    setViewerExpanded(false);
    setFeedback(
      `출력 선택: ${sessionData.outputs.find((output) => output.id === id)?.title ?? id}`,
    );
  }
  function closeOutput() {
    setOutputId(null);
    setViewerExpanded(false);
    const trigger = viewerTrigger.current;
    if (trigger?.isConnected) trigger.focus();
    else document.getElementById("ah-reopen-output")?.focus();
  }
  const emptyData: SessionData = {
    schedule: null,
    steps: [],
    outputs: [],
    contexts: [],
    outputCountText: "0",
  };

  return (
    <div className="ah-conversation-gallery">
      <header className="ah-conversation-gallery-intro">
        <h2>대화와 세션</h2>
        <p>
          설치된 TeamAI 가이드의 12개 계약을 재현했습니다. 아래 상태는 브라우저
          안의 데모 데이터로 제어합니다.
        </p>
        <p className="ah-conversation-demo-note">
          데모 확장: Enter 전송·Shift+Enter 개행, 긴 본문 줄바꿈, 좁은 폭
          재배치, 출력 확대/복원 및 읽기 모드. 이 동작은 Figma 실측값과
          구분합니다.
        </p>
      </header>
      <Example
        id="AgentHubChatComposer"
        title="메시지 입력"
        note="32px 원형 조작 · 58px surface + 4px 간격 + 28px 프로젝트 행. IME 조합 중 Enter는 전송하지 않습니다."
      >
        <div className="ah-conversation-controls">
          <label>
            <input
              type="checkbox"
              checked={agentSelected}
              onChange={(event) =>
                setAgentSelected(event.currentTarget.checked)
              }
            />
            에이전트 지정
          </label>
          <label>
            <input
              type="checkbox"
              checked={readOnly}
              onChange={(event) => setReadOnly(event.currentTarget.checked)}
            />
            읽기 전용
          </label>
          <label>
            <input
              type="checkbox"
              checked={composerDisabled}
              onChange={(event) =>
                setComposerDisabled(event.currentTarget.checked)
              }
            />
            비활성
          </label>
          <label>
            프로젝트
            <select
              value={project}
              onChange={(event) => setProject(event.currentTarget.value)}
            >
              <option>Serengeti AI</option>
              <option>팀 공용 프로젝트</option>
            </select>
          </label>
        </div>
        <div className="ah-composer-sample">
          <AgentHubChatComposer
            id="ah-conversation-draft"
            label="보낼 메시지"
            value={draft}
            onValueChange={setDraft}
            textareaRef={editorRef}
            externalTextRevision={draftRevision || undefined}
            projectLabel={project}
            agent={
              agentSelected
                ? {
                    id: "summary-agent",
                    typeLabel: "에이전트",
                    title: "문서 요약",
                  }
                : null
            }
            canSubmit={Boolean(draft.trim())}
            sendTone={draft.trim() || agentSelected ? "emphasis" : "neutral"}
            disabled={composerDisabled}
            readOnly={readOnly}
            requestBusy={phase === "thinking"}
            onSubmit={send}
            onAttach={() => fileRef.current?.click()}
            onSelectProject={() => {
              document.getElementById("ah-project-demo")?.focus();
              setFeedback("프로젝트 선택은 아래의 데모 선택기에 연결했습니다.");
            }}
            decideKey={(event) =>
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.ctrlKey &&
              !event.altKey &&
              !event.metaKey
                ? "submit"
                : "native"
            }
          />
        </div>
        <input
          ref={fileRef}
          type="file"
          multiple
          className="ah-conversation-sr"
          tabIndex={-1}
          aria-label="첨부할 파일"
          onChange={(event) => {
            setAttachmentNames(
              Array.from(event.currentTarget.files ?? [], (file) => file.name),
            );
            event.currentTarget.value = "";
          }}
        />
        <label className="ah-project-picker-label">
          프로젝트 선택기{" "}
          <select
            id="ah-project-demo"
            value={project}
            onChange={(event) => setProject(event.currentTarget.value)}
          >
            <option>Serengeti AI</option>
            <option>팀 공용 프로젝트</option>
          </select>
        </label>
        {attachmentNames.length > 0 && (
          <p className="ah-conversation-demo-note">
            로컬 파일 선택: {attachmentNames.join(", ")} · 업로드하지 않습니다.
          </p>
        )}
        <div className="ah-transcript" aria-label="로컬 전송한 사용자 메시지">
          {messages.map((message) => (
            <AgentHubUserMessage key={message.id} {...message} />
          ))}
        </div>
        {phase !== "idle" && (
          <div className="ah-conversation-controls">
            <span>
              요청 상태:{" "}
              {phase === "thinking"
                ? "생각 중"
                : phase === "interrupted"
                  ? "중단됨"
                  : "완료"}
            </span>
            <Button
              size={28}
              variant="tertiary"
              disabled={phase !== "thinking"}
              onClick={() => {
                setPhase("interrupted");
                setFeedback("데모 요청을 중단했습니다.");
              }}
            >
              중단 상태 보기
            </Button>
            <Button
              size={28}
              variant="tertiary"
              disabled={phase !== "thinking"}
              onClick={() => {
                setPhase("complete");
                setFeedback(
                  "데모 요청 상태를 완료로 변경했습니다. 응답 본문을 생성하지 않습니다.",
                );
              }}
            >
              완료 상태 보기
            </Button>
          </div>
        )}
      </Example>

      <Example
        id="AgentHubMessageExample"
        title="예시 선택"
        note="예시는 원문 전체를 즉시 채우고, 글자 위의 부드러운 경계만 왼쪽→오른쪽 400ms로 펼칩니다. 직접 타이핑·IME에는 적용하지 않으며 자동 전송하지 않습니다."
      >
        <div className="ah-conversation-inline">
          <AgentHubMessageExample
            id="weekly"
            label="지난주 실적 요약하기"
            onActivate={fillExample}
          />
          <AgentHubMessageExample
            id="compare"
            label="두 문서 비교하기"
            onActivate={fillExample}
          />
          <AgentHubMessageExample
            id="weekly"
            label="아이콘 없는 예시"
            showIcon={false}
            onActivate={fillExample}
          />
        </div>
      </Example>

      <Example
        id="AgentHubUserMessage"
        title="사용자 메시지 3종"
        note="평문을 표시합니다. 아래 AI 주입 데모는 같은 TextReveal을 사용하며 기존 본문은 유지하고 새 청크만 왼쪽→오른쪽으로 나타냅니다. 네트워크·타자 타이머를 만들지 않습니다."
      >
        <div className="ah-conversation-controls">
          <Button
            size={28}
            variant="tertiary"
            onClick={() => {
              setAiText("지난주 부서별 실적을 분석했습니다.");
              setAiTextRevision((revision) => revision + 1);
            }}
          >
            AI 본문 주입
          </Button>
          <Button
            size={28}
            variant="tertiary"
            onClick={() =>
              setAiText((text) => `${text} 주요 지표가 개선되었습니다.`)
            }
          >
            AI 청크 추가
          </Button>
          <Button
            size={28}
            variant="tertiary"
            onClick={() => {
              setAiText("다른 요청에서 전달된 새 본문입니다.");
              setAiTextRevision((revision) => revision + 1);
            }}
          >
            다른 본문으로 교체
          </Button>
        </div>
        <div className="ah-transcript">
          {aiText && (
            <AgentHubUserMessage
              id="sample-ai-injected"
              kind="chat"
              senderLabel="사용자 초안에 AI가 채운 메시지"
              message={aiText}
              textMotion="reveal"
              textRevision={aiTextRevision}
            />
          )}
          <AgentHubUserMessage
            id="sample-chat"
            kind="chat"
            senderLabel="사용자"
            message="오늘의 업무를 요약해 주세요."
          />
          <AgentHubUserMessage
            id="sample-agent"
            kind="agent"
            senderLabel="사용자"
            message="핵심 내용을 알려줘"
            agent={{ name: "문서 요약", chipLabel: "에이전트" }}
          />
          <AgentHubUserMessage
            id="sample-schedule"
            kind="schedule"
            senderLabel="사용자"
            message="오늘의 업무를 요약해 주세요."
            scheduleStatus="예약된 작업으로 전송됨"
          />
          <AgentHubUserMessage
            id="sample-long"
            kind="chat"
            senderLabel="사용자"
            message={
              "여러 줄 사용자 메시지도 원문을 보존합니다.\n<tag>와 **강조**는 평문으로 표시합니다. 긴 URL: https://example.com/a-very-long-path-that-stays-readable-without-dropping-the-user-message"
            }
          />
        </div>
      </Example>

      <Example
        id="AgentHubProgressAlert"
        title="응답 중단 안내"
        note="640×46px 기준. 진행률·자동 닫힘 알림이 아니며 재시도와 편집은 독립 명령입니다."
      >
        <AgentHubProgressAlert
          title="응답이 중단되었습니다."
          retryDisabled={phase === "thinking"}
          onRetry={() => {
            if (phase !== "thinking") {
              setPhase("thinking");
              setElapsed(0);
              setFeedback("같은 데모 요청을 다시 시작했습니다.");
            }
          }}
          onEditPrompt={() => {
            setDraft(lastPrompt.current);
            setDraftRevision((revision) => revision + 1);
            editorRef.current?.focus();
            setFeedback(
              "마지막 요청을 편집할 수 있도록 입력란에 복원했습니다.",
            );
          }}
        />
      </Example>

      <Example
        id="AgentHubThinkingStatus"
        title="생각 중 표시"
        note="정지 상태는 균일한 단색입니다. 조금 넓힌 두 밝은 띠(문구 폭의 28%, 간격 50%)가 왼쪽→오른쪽 1800ms 반복 이동하며, 로고는 정적입니다. 경과 시간은 부모가 공급합니다."
      >
        <div className="ah-conversation-controls">
          <label>
            <input
              type="checkbox"
              checked={thinkingMotion}
              onChange={(event) =>
                setThinkingMotion(event.currentTarget.checked)
              }
            />
            글자 shimmer 사용
          </label>
          <label>
            부모가 공급한 경과 초
            <input
              type="number"
              min={0}
              value={Number.isFinite(elapsed) ? elapsed : ""}
              onChange={(event) =>
                setElapsed(event.currentTarget.valueAsNumber)
              }
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={readable}
              onChange={(event) => setReadable(event.currentTarget.checked)}
            />
            단색 읽기 모드 (제품 확장)
          </label>
        </div>
        <AgentHubThinkingStatus
          requestId="demo-request"
          label="생각하는 중"
          elapsedSeconds={elapsed}
          readable={readable}
          motion={thinkingMotion ? "shimmer" : "static"}
        />
        {phase === "thinking" && (
          <p className="ah-conversation-demo-note">
            현재 데모 요청이 생각 중입니다. 위 입력으로 시간을 바꿀 수 있습니다.
          </p>
        )}
      </Example>

      <Example
        id="AgentHubSessionPanel"
        title="세션 패널"
        note="폭320px·border 포함 내부294px. 원본 HUG934/154px는 유지하고, 이 데모에서는 최대560px 내부 viewport와250ms 접기를 채택합니다."
      >
        <div className="ah-conversation-controls">
          <label>
            <input
              type="checkbox"
              checked={emptyPanel}
              onChange={(event) => setEmptyPanel(event.currentTarget.checked)}
            />
            빈 패널
          </label>
          <label>
            <input
              type="checkbox"
              checked={sessionBounded}
              onChange={(event) =>
                setSessionBounded(event.currentTarget.checked)
              }
            />
            내부 높이 제한560px
          </label>
          <Button
            variant="tertiary"
            size={28}
            onClick={() => setSessionData(startingData)}
          >
            샘플 복원
          </Button>
          <Button
            variant="tertiary"
            size={28}
            onClick={() =>
              setSessionData((current) => ({
                ...current,
                schedule: current.schedule
                  ? {
                      ...current.schedule,
                      runs: current.schedule.runs.map((run) =>
                        run.id === currentRunId
                          ? { ...run, unread: false }
                          : run,
                      ),
                    }
                  : null,
              }))
            }
          >
            현재 기록 읽음 처리
          </Button>
        </div>
        <div className="ah-session-gallery-layout">
          <div className="ah-session-gallery-viewport">
            <AgentHubSessionPanel
              accessibleName="업무 실행 세션"
              maxHeight={sessionBounded ? 560 : undefined}
              view={emptyPanel ? "empty" : "filled"}
              data={emptyPanel ? emptyData : sessionData}
              expanded={expanded}
              historyExpanded={historyExpanded}
              currentRunId={currentRunId}
              onExpandedChange={(section, next) =>
                setExpanded((current) => ({ ...current, [section]: next }))
              }
              onHistoryExpandedChange={setHistoryExpanded}
              onScheduleActivate={() =>
                setFeedback(
                  "예약 상세 보기 의도를 받았습니다. 데모에서는 예약을 실행하지 않습니다.",
                )
              }
              onRunActivate={(id) => {
                setCurrentRunId(id);
                setFeedback(
                  "현재 기록을 선택했습니다. 읽음 표시는 독립 버튼으로 변경합니다.",
                );
              }}
              onOutputActivate={openOutput}
              onContextActivate={(id) =>
                setFeedback(`컨텍스트 활성화 의도: ${id}`)
              }
              onAddOutput={() => {
                setEmptyPanel(false);
                setSessionData((current) => {
                  const outputs = [
                    ...current.outputs,
                    {
                      id: `output-${current.outputs.length + 1}`,
                      title: `추가 산출물 ${current.outputs.length + 1}.txt`,
                      icon: "file-text" as const,
                    },
                  ];
                  return {
                    ...current,
                    outputs,
                    outputCountText: String(outputs.length),
                  };
                });
                setFeedback("데모 산출물을 한 개 추가했습니다.");
              }}
              onAddContext={() => {
                setEmptyPanel(false);
                setSessionData((current) => ({
                  ...current,
                  contexts: [
                    ...current.contexts,
                    {
                      id: `context-${current.contexts.length + 1}`,
                      label: "지식",
                      value: "추가한 데모 컨텍스트",
                      countText: "1",
                      icon: "book-open",
                    },
                  ],
                }));
                setFeedback("데모 컨텍스트를 한 개 추가했습니다.");
              }}
            />
          </div>
          <div className="ah-session-selection-note">
            <h4>데모 owner</h4>
            <p>현재 실행: {selectedRun?.title ?? "없음"}</p>
            <p>
              섹션 펼침·기록 펼침·현재 실행·읽음·진행 상태는 각각 독립입니다.
            </p>
            <p>
              출력 행을 누르면 아래 Viewer를 엽니다. 닫으면 선택했던 출력 행으로
              focus가 돌아갑니다.
            </p>
          </div>
        </div>
      </Example>

      <Example
        id="AgentHubSessionSectionHeader"
        title="섹션 제목"
        note="count 표시 Boolean과 문자열을 분리하고 접기와 +를 형제 버튼으로 연결합니다."
      >
        <div className="ah-conversation-controls">
          <label>
            <input
              type="checkbox"
              checked={headerCount}
              onChange={(event) => setHeaderCount(event.currentTarget.checked)}
            />
            count
          </label>
          <label>
            <input
              type="checkbox"
              checked={headerToggle}
              onChange={(event) => setHeaderToggle(event.currentTarget.checked)}
            />
            toggle
          </label>
          <label>
            <input
              type="checkbox"
              checked={headerAction}
              onChange={(event) => setHeaderAction(event.currentTarget.checked)}
            />
            action
          </label>
        </div>
        <div className="ah-session-standalone">
          <AgentHubSessionSectionHeader
            title="출력"
            showCount={headerCount}
            countText="5"
            toggle={
              headerToggle
                ? {
                    collapsed: headerCollapsed,
                    contentId: "ah-header-example-content",
                    triggerRef: headerTriggerRef,
                    label: `출력 ${headerCollapsed ? "펼치기" : "접기"}`,
                    onCollapsedChange: setHeaderCollapsed,
                  }
                : undefined
            }
            action={
              headerAction
                ? {
                    label: "출력 추가 예시",
                    onActivate: () =>
                      setFeedback(
                        "섹션 보조 동작을 한 번 실행했습니다. 접힘 값은 유지합니다.",
                      ),
                  }
                : undefined
            }
          />
          <AnimatedDisclosure
            open={!headerToggle || !headerCollapsed}
            id="ah-header-example-content"
            triggerRef={headerTriggerRef}
          >
            <p className="ah-conversation-demo-note">접기 대상의 예시 본문</p>
          </AnimatedDisclosure>
        </div>
      </Example>
      <Example
        id="AgentHubSessionItem"
        title="예약·출력 행"
        note="36px 행 · 흰28px icon box · 전용16px glyph. meta=false에서는 자리도 남기지 않습니다."
      >
        <div className="ah-session-standalone">
          <AgentHubSessionItem
            id="standalone-output"
            title="주간 실적 보고서.docx"
            selected={selectedItem}
            onActivate={() => setSelectedItem((current) => !current)}
          />
          <AgentHubSessionItem
            id="standalone-schedule"
            title="전일 수신 업무메일 요약"
            iconName="schedule"
            showMeta
            metaText="매시간"
            onActivate={() => setFeedback("예약 행을 활성화했습니다.")}
          />
        </div>
      </Example>
      <Example
        id="AgentHubSessionHistoryItem"
        title="실행 기록 행"
        note="현재 실행과 unread dot는 독립입니다. 선택만으로 점을 지우지 않습니다."
      >
        <div className="ah-conversation-controls">
          <label>
            <input
              type="checkbox"
              checked={historyUnread}
              onChange={(event) =>
                setHistoryUnread(event.currentTarget.checked)
              }
            />
            unread
          </label>
        </div>
        <div className="ah-session-history-standalone">
          <AgentHubSessionHistoryItem
            executionId="standalone-run"
            title="오늘 오후 3:00"
            current={historyCurrent}
            unread={historyUnread}
            onActivate={() => setHistoryCurrent((current) => !current)}
          />
        </div>
      </Example>
      <Example
        id="AgentHubSessionProgressStep"
        title="진행 단계"
        note="20px 표시 공간 안 파란 중심12px은 고정하고, 하늘색은1600ms 파동으로만 표현합니다. 정적 하늘색 테두리는 표시하지 않습니다. connector는12px 공간 안 1×4px 선입니다."
      >
        <div className="ah-conversation-controls">
          {(["done", "active", "pending"] as const).map((status) => (
            <label key={status}>
              <input
                type="radio"
                name="ah-step-state"
                checked={stepStatus === status}
                onChange={() => setStepStatus(status)}
              />
              {status}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              checked={connector}
              onChange={(event) => setConnector(event.currentTarget.checked)}
            />
            다음 연결선
          </label>
        </div>
        <div className="ah-session-progress-standalone">
          <AgentHubSessionProgressStep
            id="standalone-step"
            label="부서별 실적 집계"
            indexText="3"
            status={stepStatus}
            showConnector={connector}
          />
        </div>
      </Example>
      <Example
        id="AgentHubSessionContextItem"
        title="컨텍스트 행"
        note="label 컬럼66px·value FILL·count HUG. 활성화 결과는 제품 owner가 정합니다."
      >
        <div className="ah-session-context-standalone">
          <AgentHubSessionContextItem
            id="standalone-context"
            label="지식"
            value="사내 보고서 작성 가이드"
            countText="5"
            selected={selectedContext}
            onActivate={() => setSelectedContext((current) => !current)}
          />
        </div>
      </Example>

      <Example
        id="AgentHubOutputViewer"
        title="산출물 Viewer"
        note="Header34px는 고정하고 본문 안에서 스크롤합니다. 540×977px가 원본이며, 데모의560px 높이와 확대720px는 제품 배치 정책입니다."
      >
        <div className="ah-conversation-controls">
          <Button
            id="ah-reopen-output"
            variant="tertiary"
            size={28}
            onClick={() => openOutput("summary")}
          >
            보고서 열기
          </Button>
          <label>
            <input
              type="checkbox"
              checked={showType}
              onChange={(event) => setShowType(event.currentTarget.checked)}
            />
            형식 표시
          </label>
          <label>
            <input
              type="checkbox"
              checked={showExpand}
              onChange={(event) => setShowExpand(event.currentTarget.checked)}
            />
            확대 조작
          </label>
          <label>
            <input
              type="checkbox"
              checked={showClose}
              onChange={(event) => setShowClose(event.currentTarget.checked)}
            />
            닫기 조작
          </label>
          <label>
            <input
              type="checkbox"
              checked={emptyContent}
              onChange={(event) => setEmptyContent(event.currentTarget.checked)}
            />
            원본처럼 빈 SLOT
          </label>
        </div>
        <div
          className="ah-output-viewer-demo-frame"
          data-expanded={viewerExpanded || undefined}
        >
          <AgentHubOutputViewer
            open={outputId !== null}
            outputId={outputId ?? ""}
            title={selectedOutput?.title ?? "title"}
            typeText={outputFormat}
            showType={showType}
            height={viewerExpanded ? 720 : 560}
            style={{
              width: viewerExpanded ? "100%" : 540,
            }}
            expandAction={
              showExpand
                ? {
                    label: viewerExpanded
                      ? "산출물 보기 원래 크기로 복원"
                      : "산출물 보기 확대",
                    onRequest: () => setViewerExpanded((current) => !current),
                  }
                : undefined
            }
            closeAction={
              showClose
                ? { label: "산출물 보기 닫기", onRequest: closeOutput }
                : undefined
            }
            content={
              emptyContent ? null : (
                <article className="ah-demo-document">
                  <p className="ah-demo-document-kicker">
                    DEMO CONTENT · 실제 파일 renderer가 아닙니다
                  </p>
                  <h4>주간 실적 보고서</h4>
                  <p>
                    이 본문은 제품이 제공하는 SLOT의 데모 콘텐츠입니다. 형식
                    문자열로 문서 parser가 자동 실행되지 않습니다.
                  </p>
                  {Array.from({ length: 12 }, (_, index) => (
                    <section key={index}>
                      <h5>{index + 1}. 부서별 실적 검토</h5>
                      <p>
                        전체 본문을 읽고 끝의 링크에 키보드로 접근할 수 있도록
                        별도 실제 scroll viewport를 연결했습니다. 제목·내용·확대
                        상태와 파일 선택은 갤러리가 소유합니다.
                      </p>
                    </section>
                  ))}
                  <a href="#demo-AgentHubSessionPanel">세션 패널로 이동</a>
                </article>
              )
            }
          />
        </div>
      </Example>
      <p className="ah-conversation-feedback" role="status" aria-live="polite">
        {feedback || "조작 결과가 여기에 표시됩니다."}
      </p>
    </div>
  );
}
