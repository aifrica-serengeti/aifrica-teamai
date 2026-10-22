import { useId, useRef, useState } from "react";
import { AnimatedDisclosure } from "../components/common/Disclosure";
import {
  AgentHubCalendar,
  AgentHubCalendarDate,
  AgentHubPickerItem,
  AgentHubPickerFooter,
  AgentHubPicker,
  AgentHubMenuItem,
  AgentHubMenu,
  AgentHubFlyoutHeader,
  AgentHubFlyoutFooter,
  AgentHubFlyoutItem,
  AgentHubFlyout,
  AgentHubFileItem,
  AgentHubDataCard,
  AgentHubThumbnailCard,
  AgentHubScheduleCard,
  AgentHubItemCard,
} from "../components/collections";
import type {
  FlyoutEntry,
  ItemCardTool,
  PickerGroup,
} from "../components/collections";

const tools: readonly ItemCardTool[] = [
  {
    id: "mail",
    name: "메일 도구 샘플",
    imageUrl: "/agent-hub/assets/cards/tool-logo-mail-sample.png",
    displayWidth: 16.5,
    displayHeight: 13.1175,
  },
  {
    id: "productivity",
    name: "문서 도구 샘플",
    imageUrl: "/agent-hub/assets/cards/tool-logo-productivity-sample.png",
    displayWidth: 15,
    displayHeight: 15,
  },
];
const recommendations: PickerGroup[] = [
  {
    id: "recommendations",
    label: "추천 에이전트",
    entries: [
      {
        id: "agent-minutes",
        kind: "agent",
        title: "회의록 작성 도우미",
        meta: "전체 공개",
      },
      {
        id: "agent-research",
        kind: "agent",
        title: "시장 동향 조사",
        meta: "전체 공개",
      },
      {
        id: "agent-contract",
        kind: "agent",
        title: "계약서 검토 도우미",
        meta: "그룹 공개",
      },
      {
        id: "agent-translate",
        kind: "agent",
        title: "문서 번역",
        meta: "전체 공개",
      },
      {
        id: "agent-report",
        kind: "agent",
        title: "주간 업무 보고서",
        meta: "전체 공개",
      },
      {
        id: "workflow-news",
        kind: "agent",
        agentType: "workflow",
        title: "뉴스 요약 워크플로",
        meta: "그룹 공개",
      },
      {
        id: "workflow-analytics",
        kind: "agent",
        agentType: "workflow",
        title: "데이터 분석",
        meta: "전체 공개",
      },
      {
        id: "workflow-document",
        kind: "agent",
        agentType: "workflow",
        title: "문서 처리",
        meta: "전체 공개",
      },
      {
        id: "runtime-service",
        kind: "agent",
        agentType: "runtime",
        title: "고객 문의 서비스",
        meta: "그룹 공개",
      },
    ],
  },
];
const flyoutEntries: readonly FlyoutEntry[] = [
  { id: "summary", label: "프로젝트 요약.docx" },
  { id: "guide", label: "사용자 가이드.pdf" },
  { id: "analysis-a", label: "분석 결과.xlsx" },
  { id: "analysis-b", label: "차트 데이터.csv" },
  { id: "analysis-c", label: "분기 보고서.pdf" },
  ...Array.from(
    { length: 9 },
    (_, index): FlyoutEntry => ({
      id: `file-${index}`,
      label: `참고 자료 ${index + 1}.docx`,
    }),
  ),
];
const folderFlyoutEntries: readonly FlyoutEntry[] = [
  ...flyoutEntries.slice(0, 2),
  {
    id: "analysis",
    label: "분석 자료",
    children: [
      { id: "analysis-a", label: "분석 결과.xlsx", metaText: "방금 생성" },
      { id: "analysis-b", label: "차트 데이터.csv" },
      { id: "analysis-c", label: "분기 보고서.pdf", metaText: "방금 생성" },
    ],
  },
  ...flyoutEntries.slice(5),
];

export function CollectionsGallery() {
  const [notice, setNotice] = useState(
    "컴포넌트를 조작하면 결과가 여기에 표시됩니다.",
  );
  const [date, setDate] = useState<Date | null>(new Date(2026, 9, 20));
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(false);
  const [modelIndex, setModelIndex] = useState(0);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [flyoutFolders, setFlyoutFolders] = useState(true);
  const [expandedFlyoutIds, setExpandedFlyoutIds] = useState<string[]>([
    "analysis",
  ]);
  const [partFolderExpanded, setPartFolderExpanded] = useState(true);
  const partFolderTrigger = useRef<HTMLButtonElement>(null);
  const partFolderGroupId = useId();
  const [flyoutSide, setFlyoutSide] = useState<
    "top" | "bottom" | "left" | "right"
  >("bottom");
  const [selectedFile, setSelectedFile] = useState("summary");
  const [selectedCard, setSelectedCard] = useState<string>("selected");
  const [pinned, setPinned] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState<"active" | "paused">(
    "active",
  );
  const [showDot, setShowDot] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showTools, setShowTools] = useState(true);
  const [showSize, setShowSize] = useState(false);
  const [cardsDisabled, setCardsDisabled] = useState(false);
  const flyoutTrigger = useRef<HTMLButtonElement>(null);
  const model = {
    label: modelIndex ? "Qwen 3.8 Max" : "Qwen 3.8",
    imageUrl: "/agent-hub/assets/picker/model-logo-qwen-sample.png",
    onActivate: () => {
      setModelIndex((value) => 1 - value);
      setNotice(
        "갤러리 모델 샘플을 변경했습니다. 행 선택은 실행되지 않았습니다.",
      );
    },
  };
  const searchGroups: PickerGroup[] = [
    {
      id: "pinned-projects",
      label: "고정된 프로젝트",
      entries: Array.from({ length: 6 }, (_, index) => ({
        id: `project-${index}`,
        title: [
          "새로운 서비스 기획",
          "시장 조사 프로젝트",
          "고객 지원 자료",
          "개발 문서 정리",
          "디자인 시스템",
          "분기 업무 보고",
        ][index],
        kind: "project" as const,
        onMore:
          index === 0
            ? () => setNotice("프로젝트 더보기 요청 (행 선택과 분리)")
            : undefined,
      })),
    },
    {
      id: "pinned-chats",
      label: "고정된 채팅",
      entries: Array.from({ length: 6 }, (_, index) => ({
        id: `chat-${index}`,
        title: `채팅 기록 ${index + 1}`,
        kind: "chat" as const,
      })),
    },
    {
      id: "other",
      label: "기타",
      entries: [
        { id: "other-1", title: "마지막 프로젝트", kind: "project" },
        { id: "other-2", title: "마지막 채팅", kind: "chat" },
      ],
    },
  ];
  const cardCallbacks = {
    onOpen: (id: string) => {
      setSelectedCard(id);
      setNotice(`카드 선택: ${id}`);
    },
    onMore: (id: string) => setNotice(`더보기 요청: ${id}`),
    onChat: (id: string) => setNotice(`대화 시작 요청: ${id}`),
  };
  return (
    <div className="ah-collections-gallery" data-gallery="collections">
      <p className="ah-collection-status" role="status" aria-live="polite">
        {notice}
      </p>
      <section className="ah-collection-demo" id="calendar">
        <h2>Calendar / CalendarDate</h2>
        <p>
          288px 패널 · 실제 4~6주 계산 · 방향키·Home/End·PageUp/Down · 선택 후
          확정/취소. 월·연도 보기는 공용 계약을 연결한 로컬 어댑터입니다.
        </p>
        <div className="ah-collection-demo-row">
          <AgentHubCalendar
            value={date}
            initialMonth={new Date(2026, 9, 1)}
            today={new Date(2026, 9, 20)}
            onConfirm={(next) => {
              setDate(next);
              setNotice(
                `${next.toLocaleDateString("ko-KR")} 날짜를 확정했습니다.`,
              );
            }}
            onCancel={() => setNotice("날짜 초안을 취소했습니다.")}
          />
          <div>
            <p>
              확정 값:{" "}
              <output>{date?.toLocaleDateString("ko-KR") ?? "없음"}</output>
            </p>
            <div
              role="grid"
              aria-label="날짜 셀 네 유형"
              style={{ width: 256 }}
            >
              <div
                role="row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                }}
              >
                <AgentHubCalendarDate date={new Date(2026, 9, 19)} />
                <AgentHubCalendarDate date={new Date(2026, 9, 20)} today />
                <AgentHubCalendarDate date={new Date(2026, 9, 21)} selected />
                <AgentHubCalendarDate />
              </div>
            </div>
            <p>기본 · 오늘 · 선택 · 빈 자리</p>
          </div>
        </div>
      </section>
      <section className="ah-collection-demo" id="picker">
        <h2>Picker / PickerItem / PickerFooter</h2>
        <p>
          추천 행 36px와 검색 행 32px를 구분합니다. ↑/↓ 이동, native Enter/Space
          선택, 모델·필터·더보기는 별도 조작입니다. Footer를 실제 흐름으로
          확보해 끝 항목까지 스크롤합니다. 두 목록 모두 행 배경이 부드럽게
          바뀌며 키보드 focus는 공용 메뉴처럼 행 안쪽에 표시합니다.
        </p>
        <div className="ah-collection-demo-row">
          <div className="ah-collection-picker-fixture">
            <AgentHubPicker
              recipe="agent-recommendations"
              label="추천 에이전트 선택"
              groups={recommendations}
              chatEntry={{
                id: "general-chat",
                kind: "chat",
                title: "일반 채팅",
              }}
              model={model}
              onChoose={(target) =>
                setNotice(`선택: ${target.kind} / ${target.id}`)
              }
              footerAction={{
                label: "에이전트 찾기",
                onActivate: () => setNotice("에이전트 찾기 요청"),
              }}
            />
          </div>
          <div className="ah-collection-search-picker-fixture">
            <AgentHubPicker
              recipe="project-chat-search"
              label="프로젝트와 채팅 찾기"
              groups={searchGroups}
              query={query}
              onQueryChange={setQuery}
              filtered={filter}
              onFilter={() => {
                setFilter((value) => !value);
                setNotice(
                  "갤러리 필터 강조를 변경했습니다. 서버 필터는 연결하지 않았습니다.",
                );
              }}
              onChoose={(target) =>
                setNotice(`선택: ${target.kind} / ${target.id}`)
              }
            />
          </div>
        </div>
        <div style={{ marginTop: 20, maxWidth: 758 }}>
          <AgentHubPickerItem
            id="standalone-agent"
            kind="agent"
            title="회의록 작성 도우미"
            meta="전체 공개"
            onChoose={(id) => setNotice(`항목 선택: ${id}`)}
          />
          <AgentHubPickerItem
            id="standalone-chat"
            kind="chat"
            title="일반 채팅"
            model={model}
            onChoose={(id) => setNotice(`항목 선택: ${id}`)}
          />
          <AgentHubPickerFooter
            action={{
              label: "에이전트 찾기",
              onActivate: () => setNotice("Footer 찾기 요청"),
            }}
          />
        </div>
      </section>
      <section className="ah-collection-demo" id="menu">
        <h2>Menu / MenuItem</h2>
        <p>
          radius12 · 행 28px · 방향키/처음/끝/문자 탐색 · Escape와 명령 후 focus
          복원 · 비활성 명령 차단. 아이콘·값·체크 표시 조합은 로컬 채택
          예시입니다.
        </p>
        <div className="ah-collection-demo-row">
          <AgentHubMenu
            label="메뉴 열기"
            entries={[
              {
                id: "edit",
                label: "이름 변경",
                sectionLabel: "관리",
                showIcon: true,
                onSelect: () => setNotice("이름 변경 요청"),
              },
              {
                id: "pin",
                label: "고정하기",
                showCheck: pinned,
                valueText: "현재 항목",
                onSelect: () => {
                  setPinned((value) => !value);
                  setNotice("고정 상태 변경 요청");
                },
              },
              {
                id: "disabled",
                label: "권한이 없는 명령",
                disabled: true,
                showIcon: true,
                onSelect: () => setNotice("실행되면 안 되는 비활성 명령"),
              },
              {
                id: "delete",
                label: "삭제 요청",
                intent: "destructive",
                dividerAfter: true,
                showIcon: true,
                onSelect: () => setNotice("갤러리 삭제 요청만 표시했습니다."),
              },
              {
                id: "last",
                label: "마지막 항목",
                onSelect: () => setNotice("마지막 메뉴 항목 실행"),
              },
            ]}
          />
          <div
            className="ah-menu"
            role="menu"
            aria-label="MenuItem 표현 샘플"
            style={{ width: 210 }}
            onKeyDown={(event) => {
              const buttons = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>(
                  "button:not(:disabled)",
                ),
              );
              const index = buttons.indexOf(
                document.activeElement as HTMLButtonElement,
              );
              if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                event.preventDefault();
                buttons[
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? buttons.length - 1
                      : (index +
                          (event.key === "ArrowDown" ? 1 : -1) +
                          buttons.length) %
                        buttons.length
                ]?.focus();
              }
            }}
          >
            <AgentHubMenuItem
              id="menu-item-sample"
              label="일반 명령"
              tabIndex={0}
              onSelect={() => setNotice("독립 MenuItem 실행")}
            />
            <AgentHubMenuItem
              id="menu-item-disabled"
              label="비활성 명령"
              disabled
              onSelect={() => undefined}
            />
            <AgentHubMenuItem
              id="menu-item-destructive"
              label="삭제 요청"
              intent="destructive"
              tabIndex={0}
              onSelect={() => setNotice("독립 destructive 명령 실행")}
            />
          </div>
        </div>
      </section>
      <section className="ah-collection-demo" id="flyout">
        <h2>Flyout / Header / Footer / Item</h2>
        <p>
          파일·폴더 목록 · Header 구분선은 고정하고 본문만 스크롤합니다. 패널은
          150ms fade/6px 이동, 폴더는 250ms 높이 전환과 200ms 화살표 회전을
          사용합니다. 팝업의 ‘분석 자료’와 아래의 ‘파일 모음’을 눌러 실제
          펼침·접힘을 확인할 수 있습니다.
        </p>
        <div className="ah-collection-controls">
          <label>
            <input
              type="checkbox"
              checked={flyoutFolders}
              onChange={(event) => setFlyoutFolders(event.target.checked)}
            />
            폴더 포함
          </label>
          <label className="ah-collection-field">
            요청 방향{" "}
            <select
              value={flyoutSide}
              onChange={(event) =>
                setFlyoutSide(event.target.value as typeof flyoutSide)
              }
            >
              <option value="bottom">bottom</option>
              <option value="top">top</option>
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          </label>
          <button
            type="button"
            className="ah-collection-trigger"
            ref={flyoutTrigger}
            aria-haspopup="dialog"
            aria-expanded={flyoutOpen}
            aria-controls={flyoutOpen ? "gallery-file-flyout" : undefined}
            onClick={() => setFlyoutOpen((value) => !value)}
          >
            {flyoutOpen ? "첨부파일 닫기" : "첨부파일 열기"}
          </button>
        </div>
        <AgentHubFlyout
          id="gallery-file-flyout"
          open={flyoutOpen}
          onOpenChange={setFlyoutOpen}
          triggerRef={flyoutTrigger}
          entries={flyoutFolders ? folderFlyoutEntries : flyoutEntries}
          disclosure={
            flyoutFolders
              ? {
                  expandedIds: expandedFlyoutIds,
                  onExpandedChange: setExpandedFlyoutIds,
                }
              : undefined
          }
          selectedId={selectedFile}
          onSelect={(id) => {
            setSelectedFile(id);
            setNotice(`첨부파일 선택: ${id}`);
          }}
          title="첨부파일"
          count="14"
          meta="이 대화에 첨부한 파일입니다."
          footerMeta="파일 연결·관리는 제품에서 연결합니다."
          side={flyoutSide}
        />
        <div className="ah-collection-demo-row">
          <div className="ah-flyout" style={{ width: 280 }}>
            <AgentHubFlyoutHeader
              title="첨부파일"
              count="3"
              meta="파일 모음을 눌러 펼치고 접을 수 있습니다."
            />
            <AgentHubFlyoutItem
              id="part-file"
              kind="item"
              label="파일 이름.docx"
              selected={selectedFile === "part-file"}
              onActivate={(id) => {
                setSelectedFile(id);
                setNotice(id);
              }}
            />
            <AgentHubFlyoutItem
              id="part-folder"
              kind={partFolderExpanded ? "folder-open" : "folder"}
              label="파일 모음"
              countText="2"
              expanded={partFolderExpanded}
              controlsId={partFolderGroupId}
              buttonRef={partFolderTrigger}
              onActivate={() => setPartFolderExpanded((value) => !value)}
            />
            <AnimatedDisclosure
              id={partFolderGroupId}
              open={partFolderExpanded}
              triggerRef={partFolderTrigger}
            >
              <AgentHubFlyoutItem
                id="part-child"
                kind="child"
                label="생성된 파일.docx"
                metaText="방금 생성"
                selected={selectedFile === "part-child"}
                onActivate={(id) => {
                  setSelectedFile(id);
                  setNotice(`첨부파일 선택: ${id}`);
                }}
              />
              <AgentHubFlyoutItem
                id="part-child-report"
                kind="child"
                label="진행 보고서.pdf"
                selected={selectedFile === "part-child-report"}
                onActivate={(id) => {
                  setSelectedFile(id);
                  setNotice(`첨부파일 선택: ${id}`);
                }}
              />
            </AnimatedDisclosure>
            <AgentHubFlyoutFooter meta="독립 Footer: bottom4 / 배경 없음" />
          </div>
          <div style={{ width: 280 }}>
            <AgentHubFlyoutFooter
              meta="Shell Footer: bottom8 / white"
              inShell
            />
          </div>
        </div>
      </section>
      <section className="ah-collection-demo" id="cards">
        <h2>FileItem / DataCard / ThumbnailCard / ScheduleCard / ItemCard</h2>
        <p>
          5개 유형의 border 포함 여부·서로 다른 shadow·전용 SVG를 각각
          연결했습니다. 카드 선택, 예약 상태, 고정 상태는 갤러리 부모가
          소유합니다.
        </p>
        <div className="ah-collection-controls">
          <label className="ah-collection-field">
            <input
              type="checkbox"
              checked={cardsDisabled}
              onChange={(event) => setCardsDisabled(event.target.checked)}
            />
            비활성 전환
          </label>
          <label className="ah-collection-field">
            <input
              type="checkbox"
              checked={showSize}
              onChange={(event) => setShowSize(event.target.checked)}
            />
            파일 크기
          </label>
          <label className="ah-collection-field">
            <input
              type="checkbox"
              checked={showThumbnail}
              onChange={(event) => setShowThumbnail(event.target.checked)}
            />
            썸네일
          </label>
          <label className="ah-collection-field">
            <input
              type="checkbox"
              checked={showDescription}
              onChange={(event) => setShowDescription(event.target.checked)}
            />
            설명
          </label>
          <label className="ah-collection-field">
            <input
              type="checkbox"
              checked={showDot}
              onChange={(event) => setShowDot(event.target.checked)}
            />
            표시 점
          </label>
          <label className="ah-collection-field">
            <input
              type="checkbox"
              checked={showTools}
              onChange={(event) => setShowTools(event.target.checked)}
            />
            도구 로고
          </label>
        </div>
        <div className="ah-collection-demo-row" style={{ marginBottom: 20 }}>
          <div className="ah-collection-file-fixture">
            <AgentHubFileItem
              fileId="report"
              title="월간 분석 보고서.xlsx"
              fileTypeText="스프레드시트"
              extensionText="xlsx"
              iconType="spreadsheet"
              showSize={showSize}
              fileSizeText="2.4 MB"
              downloadAction={{
                label: "다운로드",
                disabled: cardsDisabled,
                onRequest: (id) =>
                  setNotice(`${id} 다운로드 옵션 요청 (파일 API 미연결)`),
              }}
            />
          </div>
          <AgentHubDataCard
            id="data"
            title="data-name"
            description="volume"
            typeLabel="Type"
            disabled={cardsDisabled}
            onActivate={(id) => setNotice(`${id} 데이터 열기 요청`)}
          />
        </div>
        <div className="ah-collection-card-grid">
          <div className="ah-collection-card-fixture">
            <AgentHubThumbnailCard
              itemId="thumbnail"
              title="프로젝트 자료 모음"
              metaText="문서 · 공개"
              descriptionText="프로젝트에서 사용할 자료를 모아 두었습니다."
              showThumbnail={showThumbnail}
              showDescription={showDescription}
              showDot={showDot}
              selected={selectedCard === "thumbnail"}
              disabled={cardsDisabled}
              onActivate={(id) => {
                setSelectedCard(id);
                setNotice(`${id} 선택`);
              }}
            />
          </div>
          <div className="ah-collection-card-fixture">
            <AgentHubScheduleCard
              scheduleId="daily-summary"
              title="매일 아침 뉴스 요약"
              metaPrimary="매일"
              metaSecondary="오전 9:00"
              status={scheduleStatus}
              statusText={
                scheduleStatus === "active" ? "예약 활성" : "일시 중지됨"
              }
              selected={selectedCard === "daily-summary"}
              disabled={cardsDisabled}
              onActivate={setSelectedCard}
              onRequestStatusChange={(_, status) => {
                setScheduleStatus(status);
                setNotice(`예약 상태: ${status}`);
              }}
            />
          </div>
          <div className="ah-collection-card-fixture">
            <AgentHubItemCard
              itemId="assistant"
              title="회의록 작성 도우미"
              meta="작성 도구 · 전체 공개 · 사용 중"
              description="회의 내용을 요약하고 결정 사항을 정리합니다."
              tools={tools}
              showDescription={showDescription}
              showTools={showTools}
              showDot={showDot}
              selected={selectedCard === "assistant"}
              disabled={cardsDisabled}
              pinAction={{
                pinned,
                label: pinned ? "고정 해제" : "고정하기",
                onRequest: (_, next) => {
                  setPinned(next);
                  setNotice(next ? "고정했습니다." : "고정을 해제했습니다.");
                },
              }}
              {...cardCallbacks}
            />
          </div>
          <div className="ah-collection-card-fixture">
            <AgentHubItemCard
              itemId="selected"
              title="선택된 에이전트"
              meta="공개 · 예시"
              description="선택은 1px 파란 선으로 표시합니다. 설명은 최대 40px 안에서 두 줄로 생략하는 로컬 어댑터를 사용합니다."
              tools={tools}
              selected={selectedCard === "selected"}
              showDescription={showDescription}
              showTools={showTools}
              showDot={showDot}
              {...cardCallbacks}
            />
          </div>
          <div className="ah-collection-card-fixture">
            <AgentHubItemCard
              itemId="accent"
              title="추천 에이전트"
              meta="강조 · 예시"
              description="Accent는 투명 1px 선의 공간을 유지합니다."
              tools={tools}
              appearance="accent"
              showDescription={showDescription}
              showTools={showTools}
              showDot={showDot}
              {...cardCallbacks}
            />
          </div>
          <div className="ah-collection-card-fixture">
            <AgentHubItemCard
              itemId="disabled"
              title="비활성 에이전트"
              meta="권한 없음 · 예시"
              description="자식 paint만 #AAA이며 로고는 grayscale입니다."
              tools={tools}
              disabled
              showDescription={showDescription}
              showTools={showTools}
              showDot={showDot}
              {...cardCallbacks}
            />
          </div>
          <div className="ah-collection-card-fixture">
            <AgentHubThumbnailCard
              itemId="thumbnail-disabled"
              title="비활성 자료"
              metaText="문서"
              descriptionText="썸네일·border·그림자는 유지합니다."
              disabled
              showThumbnail={showThumbnail}
              showDescription={showDescription}
              showDot={showDot}
              onActivate={() => setNotice("비활성 항목은 실행되면 안 됩니다.")}
            />
          </div>
          <div className="ah-collection-card-fixture">
            <AgentHubScheduleCard
              scheduleId="paused-disabled"
              title="중지된 예약"
              metaPrimary="매주 월요일"
              metaSecondary="오전 10:00"
              status="paused"
              statusText="일시 중지됨"
              disabled
              onRequestStatusChange={() =>
                setNotice("비활성 예약은 실행되면 안 됩니다.")
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
