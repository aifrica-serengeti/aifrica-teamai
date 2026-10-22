import { useState } from "react";

import { ShellGallery } from "./components/shell";
import { PrimitivesGallery } from "./gallery/PrimitivesGallery";
import { CollectionsGallery } from "./gallery/CollectionsGallery";
import { ConversationGallery } from "./gallery/ConversationGallery";

import contracts from "./data/contracts.json";

const groups = [
  {
    id: "controls",
    label: "입력과 기본 요소",
    tag: "17 COMPONENTS",
    description:
      "버튼부터 칩과 검색까지. 작은 요소의 크기와 상태를 확인합니다.",
  },
  {
    id: "collections",
    label: "탐색과 콘텐츠",
    tag: "16 COMPONENTS",
    description: "캘린더, 메뉴, 파일과 카드를 조합하고 상호작용을 확인합니다.",
  },
  {
    id: "conversation",
    label: "대화와 세션",
    tag: "12 COMPONENTS",
    description: "메시지 입력, 실행 상태, 세션과 산출물이 이어지는 흐름입니다.",
  },
  {
    id: "shell",
    label: "헤더와 내비게이션",
    tag: "14 COMPONENTS",
    description: "Agent Hub의 전역 헤더, 대화 헤더, SNB와 다이얼로그입니다.",
  },
  {
    id: "catalog",
    label: "컴포넌트 목록",
    tag: "59 CONTRACTS",
    description:
      "TeamAI로 받은 계약과 이 앱의 실제 React export를 연결했습니다.",
  },
] as const;
type Group = (typeof groups)[number]["id"];
export default function App() {
  const [active, setActive] = useState<Group>("controls");
  const [query, setQuery] = useState("");
  const group = groups.find((g) => g.id === active) ?? groups[0];
  const visible = contracts.filter((c) =>
    `${c.id} ${c.name}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="lab-app">
      <a className="lab-skip" href="#content">
        본문으로 이동
      </a>
      <aside className="lab-nav">
        <a
          className="lab-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActive("controls");
          }}
        >
          <span className="lab-brand-symbol">a.</span>
          <span>
            AIFRICA<small>COMPONENT LAB</small>
          </span>
        </a>
        <div className="lab-workspace">
          <span className="lab-workspace-dot" />
          Agent Hub<span className="lab-workspace-version">v0.1</span>
        </div>
        <p className="lab-nav-label">컴포넌트 살펴보기</p>
        <nav aria-label="컴포넌트 그룹">
          {groups.map((g, i) => (
            <button
              key={g.id}
              type="button"
              data-page={g.id}
              aria-current={g.id === active ? "page" : undefined}
              onClick={() => setActive(g.id)}
            >
              <span className="lab-nav-number">0{i + 1}</span>
              {g.label}
              <span className="lab-nav-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </nav>
        <div className="lab-nav-footer">
          <span className="lab-connected">
            <i />
            TeamAI 연결됨
          </span>
          <p>frontend-common + agent-hub</p>
          <small>
            가이드라인을 React로 확인하는
            <br />
            독립 컴포넌트 테스트 앱
          </small>
        </div>
      </aside>
      <div className="lab-main">
        <header className="lab-topbar">
          <span>
            Design system <span aria-hidden="true">/</span>{" "}
            <strong>Agent Hub</strong>
          </span>
          <span className="lab-topbar-pill">React · Guide driven</span>
        </header>
        <main id="content" tabIndex={-1}>
          <div className="lab-page-heading">
            <div>
              <span className="lab-eyebrow">{group.tag}</span>
              <h1>{group.label}</h1>
              <p>{group.description}</p>
            </div>
            <span className="lab-contract-count">
              <strong>{contracts.length}</strong>Agent Hub 계약
            </span>
          </div>
          <div className="lab-source-note">
            <span className="lab-source-dot" />
            TeamAI CLI로 받은 가이드 · 원본 SVG/PNG · Pretendard / Poppins /
            Inter<span>Light reference</span>
          </div>
          <div className="lab-stage" key={active}>
            {active === "controls" ? (
              <PrimitivesGallery />
            ) : active === "collections" ? (
              <CollectionsGallery />
            ) : active === "conversation" ? (
              <ConversationGallery />
            ) : active === "shell" ? (
              <ShellGallery />
            ) : (
              <section className="lab-catalog">
                <label>
                  컴포넌트 검색
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Button, Session, Card…"
                  />
                </label>
                <p>{visible.length}개 계약</p>
                <div className="lab-table-wrap">
                  <table>
                    <caption className="ah-sr-only">
                      Agent Hub 컴포넌트와 직접 의존 계약
                    </caption>
                    <thead>
                      <tr>
                        <th>React export / 계약 ID</th>
                        <th>분류</th>
                        <th>직접 의존 계약</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((c) => (
                        <tr key={c.id}>
                          <td>
                            <code>{c.id}</code>
                            <small>{c.name}</small>
                          </td>
                          <td>{c.category}</td>
                          <td>
                            {c.dependencies.length
                              ? c.dependencies.join(", ")
                              : "없음"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
          <footer className="lab-page-footer">
            Agent Hub component implementation test
            <span>
              수치와 상태의 근거는 수신한 가이드에 있습니다. 모션 제안값은
              예제에 별도로 표시합니다.
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
