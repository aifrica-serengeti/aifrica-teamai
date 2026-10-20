# 저장소 설정 탐지와 적용

[← 작업 흐름](./README.md)

이 워크플로를 새 저장소에서 처음 사용할 때 먼저 실행 환경과 운영 정책을 확인한다. 조직명,
브랜치명, Project 번호, 봇 이름을 이전 저장소에서 복사하지 않는다.

## 1. 자동으로 확인할 값

저장소 루트와 remote를 확인한다.

```bash
git rev-parse --show-toplevel
git remote -v
git status --short
git branch --show-current
```

GitHub CLI를 사용할 수 있으면 repository와 기본 브랜치를 확인한다.

```bash
gh auth status -h github.com
gh repo view --json nameWithOwner,defaultBranchRef \
  --jq '{repository: .nameWithOwner, defaultBranch: .defaultBranchRef.name}'
```

`gh auth status`가 실패하면 토큰을 대화나 문서에 붙여 넣지 않는다. 사용자가 자신의 환경에서
`gh auth login -h github.com`으로 인증하도록 안내한다.

## 2. 저장소에서 읽을 설정

다음 파일이 있으면 우선 확인한다. 파일이 없다는 이유로 새로 만들 필요는 없다.

```text
ui/package.json 또는 package.json     # package manager와 scripts
lockfile                              # pnpm-lock.yaml, yarn.lock, package-lock.json 등
.github/workflows/                    # 실제 CI 명령과 대상 브랜치
.github/ISSUE_TEMPLATE/               # Issue Form과 label 규칙
.github/PULL_REQUEST_TEMPLATE.md      # PR 필수 본문
CODEOWNERS                            # 필수 사람 리뷰어
repository branch protection/ruleset # 승인 수, 필수 check, merge 방식
```

UI가 저장소 루트가 아니라 `ui/` 하위 모듈이면 명령의 실행 위치를 구분한다.

## 3. 반드시 결정할 계약

Aifrica 회사 Git 규약은 `docs/common/git-docs/`에 있다. PR 기본 base는 `dev`, 가이드 문서·CI 등
운영성 변경은 `master` 예외가 가능하다. 사용자가 base를 지정하지 않으면 `dev`를 기본으로 검토하고,
실제 remote에 존재하는지 확인한다. default branch 이름만으로 회사 PR base를 덮어쓰지 않는다.

| 항목 | 결정 방법 | 안전한 기본 원칙 |
| --- | --- | --- |
| Integration branch | repository 설정·CI·팀 규칙 확인 | 회사 기본 `dev`와 운영성 `master` 예외를 실제 branch·요청에 대조 |
| Release branch | release workflow 확인 | 없다면 별도 branch를 만들지 않음 |
| Feature branch | 기존 branch와 PR 확인 | `codex/<issue-number>-<slug>` 권장 |
| PR target | integration branch와 동일 | feature 간 PR 금지 |
| Required checks | package scripts와 CI 확인 | 정의된 lint·typecheck·test·build 실행 |
| Review requirement | ruleset·CODEOWNERS 확인 | 유효한 차단 지적이 있으면 병합 금지 |
| Merge method | repository 설정 확인 | 허용된 방식만 사용 |
| Project fields | Project 사용 시 확인 | Status·Type·Priority 정도부터 시작 |

저장소 정책을 확인할 수 없고 선택에 따라 결과가 달라지면 사용자에게 확인한다.

## 4. 명령에서 사용할 변수

아래 문서의 명령은 값을 하드코딩하지 않고 작업별 변수로 표현한다.

```bash
integration_branch="<repository-integration-branch>"
issue_number="<github-issue-number>"
task_slug="<short-task-slug>"
feature_branch="codex/${issue_number}-${task_slug}"
repository_root="$(git rev-parse --show-toplevel)"
worktree_root="${repository_root}-worktrees"
worktree_path="${worktree_root}/issue-${issue_number}"
```

`<...>` placeholder를 그대로 실행하지 않는다. 실제 값을 확인한 뒤 현재 shell session에만
설정한다. 이 변수는 문서 설명용이며 저장소 전역 설정 파일을 요구하지 않는다.

## 5. 패키지 명령 탐지

`package.json`의 `packageManager`와 `scripts`를 읽고 존재하는 명령만 실행한다.

```bash
node -e 'const p=require("./package.json"); console.log(p.packageManager); console.log(p.scripts)'
```

모듈이 `ui/`라면 `ui/package.json`을 읽거나 `ui/`에서 실행한다. 예를 들어 pnpm 저장소에
네 명령이 모두 정의되어 있다면 다음을 사용할 수 있다.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

존재하지 않는 script 이름을 관례만으로 실행하거나 문서에 통과했다고 기록하지 않는다.

## 6. 도입 완료 Gate

- [ ] repository와 remote를 확인했다.
- [ ] integration branch와 PR target을 확인했다.
- [ ] package manager와 실제 scripts를 확인했다.
- [ ] CI required checks와 사람 승인 조건을 확인했다.
- [ ] Issue·PR template과 CODEOWNERS 존재 여부를 확인했다.
- [ ] Project·Milestone·Iteration 사용 여부를 확인했다.
- [ ] 특정 조직·봇·번호를 이전 저장소에서 복사하지 않았다.
