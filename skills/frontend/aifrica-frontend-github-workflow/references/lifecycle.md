# Aifrica UI GitHub Workflow

Apply the repository-owned UI and GitHub contracts, then perform only the lifecycle stage the user requested.
Do not depend on a user-home skill, machine-specific path, or external planning document. Use `gh` when available
and authenticated; otherwise prepare the same content and report the web-UI handoff. Do not require a GitHub
plugin when the local CLI is sufficient.

## 1. Classify the requested stop point

Choose one or more ordered stages before changing state.

| User request | Stage and allowed result |
| --- | --- |
| “Issue 초안/본문 작성” | Draft only; do not create remotely |
| “Issue 만들어/등록해” | Duplicate check, compose, and create Issue |
| “#123 작업 시작/브랜치 준비” | Validate Issue and create or reuse branch or worktree |
| “변경 커밋해” | Inspect and commit only in-scope current changes |
| “PR 초안/본문 작성” | Draft only; do not push or create remotely |
| “PR 만들어/날려/올려” | Validate, commit if required, push, and create PR |
| “리뷰 확인” | Read and classify feedback; no fixes or comments unless requested |
| “리뷰 반영” | Classify, fix valid findings, verify, commit and push; respond externally only when the user authorized the reply |
| “병합 가능 여부 확인” | Read-only merge-readiness report |
| “병합해” | Run merge gate and merge using a confirmed allowed method |
| “정리해” | Clean worktree or branch only for verified merged work and requested targets |

A PR creation request authorizes the necessary in-scope commit and push unless the user explicitly requests a
draft body only. It does not authorize merge, Issue closure, Project field changes, branch deletion, release, or
deployment.

## 2. Load repository contracts

1. Locate the repository root and read the nearest `AGENTS.md` completely. Resolve shared docs through `doc-locations.md`, then read `docs/common/git-docs/{commit,issue,pr-agent}.md` and `docs/common/github-project-guide.md`. Company PR policy defaults to `dev`; `master` is an allowed exception for operational docs/CI changes. Verify the real remote branches and honor the current user request.
2. Read `docs/frontend/workflow/README.md` and the stage-specific document:
   - repository setup: `docs/frontend/workflow/configuration.md`
   - Issue: `docs/frontend/workflow/issue.md` and `docs/frontend/workflow/templates.md`
   - branch, worktree, or commit: `docs/frontend/workflow/development.md`
   - PR: `docs/frontend/workflow/pull-request.md` and `docs/frontend/workflow/templates.md`
   - review: `docs/frontend/workflow/review.md` and `docs/frontend/workflow/templates.md`
   - merge or cleanup: `docs/frontend/workflow/merge.md`
3. For UI scope and acceptance criteria, read:
   - `docs/frontend/ai-prompt.md`
   - `docs/frontend/architecture.md` for code changes
   - `docs/frontend/design/README.md`
   - `docs/frontend/design/component-workflow.md`
   - `docs/frontend/design/quality.md`
4. For List/Create/Detail work, read the matching `docs/frontend/design/patterns/` guide and
   `docs/frontend/design/page-policies.md`.
5. Prefer repository Issue Forms and PR templates over portable fallback templates.

If these paths differ, follow the nearest repository instructions. Do not copy organization names, Project
numbers, bot names, labels, milestones, branch names, or merge policies from another repository.

When technical UI implementation is also requested, apply the repository's `aifrica-frontend-workflow` skill when it
is available. If the host does not support invoking another skill, follow its canonical instructions at
the host-discovered `aifrica-frontend-workflow` skill directly.

## 3. Run read-only repository preflight

Resolve facts before any Issue, branch, commit, push, comment, or merge.

```sh
git rev-parse --show-toplevel
git status --short
git branch --show-current
git remote -v
git worktree list
gh --version
gh auth status -h github.com
gh repo view --json nameWithOwner,defaultBranchRef
```

Also inspect when present:

- `package.json`, `packageManager`, lockfile, and actual scripts;
- `.github/workflows/` and required check names;
- `.github/ISSUE_TEMPLATE/` and Issue Forms;
- `.github/PULL_REQUEST_TEMPLATE.md` or configured template directories;
- `CODEOWNERS`;
- existing branch naming and open PR targets;
- accessible rulesets, allowed merge methods, and branch deletion policy.

Never print tokens. If `gh auth status` fails, stop remote mutations and ask the user to authenticate in their
own terminal. Do not modify Git identity, credential helpers, auth scopes, remote URLs, or repository settings
without a separate explicit request.

If the current directory is not a Git repository, stop GitHub execution and report the required repository path.
Drafting an Issue or PR body from supplied context may continue without remote execution.

## 4. Build UI-specific evidence

Classify the work as `List`, `Create`, `Detail`, `Component`, or `Other`. Extract evidence rather than inventing
generic acceptance criteria.

For a UI Issue or PR, capture as applicable:

- user-visible goal and current failure or gap;
- affected route, viewport, theme, role, browser, and reproduction steps;
- component decision: `reuse`, `extend`, `compose`, or `create`;
- query, draft, validation, mutation, permission, route, and presentation state owners;
- relevant loading, refresh, empty, filtered-empty, error, retry, disabled, read-only, success, conflict, and
  destructive states;
- keyboard, focus, accessible name, ARIA, zoom, responsive, light/dark, and reduced-motion expectations;
- actual lint, typecheck, test, build, browser, and visual verification requirements;
- documentation and component-registry synchronization when public contracts change.

Do not claim a component exists from docs alone. For implementation or PR evidence, verify actual source and
export.

## 5. Draft or create an Issue

### Check duplicates and conflicts

Search by outcome, route, component meaning, and error symptom.

```sh
gh issue list --state open --search "<keywords>"
gh pr list --state open --search "<keywords>"
```

Read plausible matches before creating anything. Reuse or link an existing Issue when its goal and acceptance
criteria genuinely match. Do not reopen or duplicate a closed Issue without evidence that the work remains undone.

### Compose the body

Use the repository Issue Form when required. Otherwise use the structure in
`docs/frontend/workflow/templates.md`:

```text
## 개발 목표
## 배경 / 근거
## 작업
## 완료 조건
## 제외
## 선행 조건
```

Make completion criteria binary and externally verifiable. Include only UI states relevant to the change. Keep
labels, type, priority, milestone, and Project fields out of the title.

### Create only when authorized

Write the final body to a safe temporary file and run:

```sh
gh issue create --title "[UI] <outcome>" --body-file <validated-body-file>
```

Use repository naming instead of `[UI]` when an Issue Form or local convention says otherwise. Apply labels,
assignees, milestone, Project, or sub-issue relations only when the requested or repository policy is known and
the target values were resolved. Return the observed Issue number and URL.

## 6. Start an Issue branch or worktree

When the repository or requested task uses an Issue workflow, require an open Issue with usable scope and acceptance criteria. Otherwise use the user-authorized scope and the repository’s branch policy. Resolve the integration branch from repository
evidence, not memory.

Before switching or creating a worktree:

- preserve uncommitted changes; avoid a switch/pull that would overwrite them, and use an independent worktree when it safely permits progress;
- never auto-stash, discard, reset, or overwrite changes;
- reuse an existing worktree for the same Issue;
- ensure the branch is not another Issue's work;
- fetch and fast-forward the integration branch according to repository policy.

Use the repository branch convention. If none exists and policy permits the documented fallback, use
`codex/<issue-number>-<slug>` for feature UI work and an evidenced equivalent such as `fix/<issue-number>` for bugs.

```sh
git fetch origin "<integration-branch>"
git switch "<integration-branch>"
git pull --ff-only origin "<integration-branch>"
git worktree add -b "<feature-branch>" "<resolved-worktree-path>" "<integration-branch>"
```

Do not create or switch branches when the user requested only an Issue.

## 7. Inspect, verify, and commit

Before committing:

```sh
git status --short
git diff --stat
git diff
git diff --cached
git config user.name
git config user.email
```

- Preserve unrelated user changes and exclude them from the commit.
- Do not stage broad paths until each changed file is understood.
- Do not change author identity or use `--author`.
- Use Issue acceptance criteria as the implementation checklist.
- Run only scripts actually defined in `package.json` and CI.
- For UI changes, run relevant browser, accessibility, viewport, theme, loading/error, and visual checks.
- Record exact commands, results, skipped checks, and remaining risks.

Create reviewable commits with messages that describe the outcome. Do not amend, rebase, force push, reset, or
rewrite history unless the user requested it and repository policy allows it.

## 8. Draft or create a Pull Request

Review the in-scope feature branch and full base diff, not only the last commit.

```sh
git fetch origin "<integration-branch>"
git rev-list --count HEAD.."origin/<integration-branch>"
git diff --stat "origin/<integration-branch>...HEAD"
git log --oneline "origin/<integration-branch>..HEAD"
```

If behind, follow repository merge or rebase policy and rerun affected verification. Never force push a shared
branch merely to make history prettier.

PR body follows the company `pr-agent.md` and the consuming repository template; its required evidence shape is:

```text
## 변경 내용
## 주요 변경 사항
## 관련 이슈
Closes #<issue-number>
## 테스트
```

Map each Issue acceptance criterion to a change or verification result. Mention reused components, state owners,
important alternatives, review order, visual routes and states, skipped checks, and risks. Mark only checks that
actually ran.

For authorized PR creation:

```sh
git push -u origin "<feature-branch>"
gh pr create \
  --base "<integration-branch>" \
  --head "<feature-branch>" \
  --title "<issue outcome>" \
  --body-file <validated-pr-body-file>
```

Use `--draft` only when requested or required by repository policy. After creation, read the PR back and return
its observed number, URL, base, head, and checks. Do not close the Issue manually; `Closes #...` closes it after
merge.

## 9. Inspect and address reviews

Read all review channels and current HEAD.

```sh
gh pr view <pr-number> --json headRefOid,reviews,comments,reviewDecision,statusCheckRollup
gh api repos/<owner>/<repo>/pulls/<pr-number>/comments
gh api repos/<owner>/<repo>/issues/<pr-number>/comments
```

Classify every finding as:

- `수정 필요`: real defect, regression, security, data, compatibility, accessibility, or test gap;
- `설명 필요`: code or contract is unclear;
- `오탐`: failure condition does not hold in the full context;
- `보류`: valid but out of scope and non-blocking; create a follow-up Issue only when authorized.

For review inspection only, report classifications without editing or commenting. For review application, inspect
callers, owners, tests, and docs; implement the smallest valid fix; add regression coverage; rerun verification;
commit and push. When the user explicitly authorized review replies, reply with finding link, classification, reason, commit SHA, and results; otherwise report the ready reply locally.

Do not treat an old review or resolved diff line as current approval. Re-read formal reviews, inline comments,
conversation comments, CI, and `headRefOid` after each push. Do not resolve or dismiss feedback without evidence.

## 10. Check or perform merge

Read-only readiness check:

```sh
gh pr view <pr-number> --json state,mergeable,reviewDecision,statusCheckRollup,headRefOid
```

Report blockers precisely. Do not equate an open PR or one approval with completion.

Merge only when the user explicitly requests it and every repository gate passes:

- current HEAD includes the reviewed changes;
- required checks and local verification pass;
- Issue acceptance criteria are complete;
- no valid blocking review remains;
- PR contains the correct closing keyword;
- the allowed merge method is confirmed.

```sh
gh pr merge <pr-number> --<confirmed-allowed-method>
```

Never execute a placeholder method. After merge, verify `mergedAt`, merge commit, linked Issue state, and Project
state when applicable. Do not delete branches, remove worktrees, publish releases, or deploy unless separately
requested.

## 11. Clean up safely

Before worktree or branch cleanup, verify the exact path, branch, clean status, and merged PR. Remove only the
resolved target the user requested. Worktree removal, local branch deletion, remote branch deletion, and Project
changes are separate actions; one does not authorize the others.

Never use broad or destructive targets, unresolved variables, `git reset --hard`, or `git checkout --` to clean
up.

## 12. Report evidence

Return a compact stage record:

```text
요청 단계: issue-draft | issue-create | work-start | commit | pr-draft | pr-create | review | merge-check | merge | cleanup
저장소: owner/repo · integration branch
UI 분류: List | Create | Detail | Component | Other
Issue: number/URL 또는 생성하지 않음
Branch/Worktree: resolved path 또는 변경 없음
Commit/Push: SHA와 remote branch 또는 수행하지 않음
PR: number/URL · base ← head 또는 생성하지 않음
검증: 실제 명령과 결과
리뷰/CI: current HEAD 기준 상태
미실행·위험: 없으면 없음
```

Never report a remote object, commit, push, check, review resolution, merge, Issue closure, or cleanup that was
not actually observed.
