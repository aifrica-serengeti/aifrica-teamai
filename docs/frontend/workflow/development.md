# 개발 시작과 Worktree

[← 작업 흐름](./README.md)

저장소가 Issue 기반 개발을 채택했다면 한 Issue의 branch와 작업 경로를 일관되게 유지한다.
기존 적합한 작업 공간을 우선 재사용하고 Worktree는 격리가 필요할 때 선택한다. 다른 작업의 미완성 변경을
기준으로 새 branch를 만들거나 여러 세션이 서로 다른 경로에서 같은 Issue를 수정하지 않는다.

## 1. 변수 준비

[저장소 설정](./configuration.md)을 확인한 뒤 실제 값을 설정한다.

```bash
integration_branch="<repository-integration-branch>"
issue_number="<github-issue-number>"
task_slug="<short-task-slug>"
feature_branch="codex/${issue_number}-${task_slug}"
repository_root="$(git rev-parse --show-toplevel)"
worktree_root="${repository_root}-worktrees"
worktree_path="${worktree_root}/issue-${issue_number}"
```

## 2. 시작 전 확인

```bash
gh auth status -h github.com
git status --short
git branch --show-current
git worktree list
gh issue view "${issue_number}" --json state,title,body
```

확인할 내용:

1. 현재 GitHub 계정이 이 repository에 권한이 있다.
2. 메인 작업 트리가 깨끗하다.
3. Issue가 열려 있고 완료 조건과 선행 조건을 충족한다.
4. 같은 Issue의 적합한 branch·작업 경로가 이미 있으면 재사용한다.
5. 다른 Issue의 Worktree를 기준이나 작업 경로로 재사용하지 않는다.

메인 작업 트리에 변경이 있으면 이를 덮을 switch·pull을 피한다. 기존 변경을 복사하지 않는 독립
Worktree로 안전하게 진행할 수 있으면 그 경로에서 계속한다. 기존 변경을 임의로
stash·삭제·덮어쓰지 않는다.

## 3. Integration branch 최신화

```bash
git fetch origin "${integration_branch}"
git switch "${integration_branch}"
git pull --ff-only origin "${integration_branch}"
```

새 branch는 최신 integration branch에서만 만든다. 다른 feature branch, 오래된 local branch,
선택되지 않은 release branch를 기준으로 만들지 않는다.

## 4. Worktree 생성

```bash
mkdir -p "${worktree_root}"
git worktree add \
  -b "${feature_branch}" \
  "${worktree_path}" \
  "${integration_branch}"
```

이미 branch나 원격 branch가 존재한다면 새로 덮어쓰지 않는다. 먼저 해당 branch가 같은 Issue의
작업인지 확인하고 기존 Worktree에 연결하거나 올바른 경로를 재사용한다.

```bash
git worktree list
git branch --list "${feature_branch}"
git branch --remotes --list "origin/${feature_branch}"
```

생성 후에는 모든 구현과 커밋을 `worktree_path`에서 진행한다.

## 5. 구현 중 범위 관리

- Issue의 완료 조건을 구현·테스트 체크리스트로 사용한다.
- 관련 없는 리팩터링과 전체 포맷 변경을 함께 넣지 않는다.
- 예상하지 못한 유효한 작업이 크면 후속 Issue로 분리한다.
- API·도메인·디자인 계약이 필요하면 추측하지 않고 확인한다.
- 공용 UI 변경은 [UI 아키텍처](../architecture.md)와
  [컴포넌트 카탈로그](../design/components/index.md)를 함께 확인한다.
- 커밋은 리뷰 가능한 단위로 만들고 무엇을 왜 바꿨는지 메시지에 남긴다.

## 6. UI 검증

`package.json`에 실제로 존재하는 명령만 실행한다. pnpm과 네 script를 사용하는 저장소의
예시는 다음과 같다.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

화면·컴포넌트 변경은 필요한 경우 다음 근거도 남긴다.

- 변경 전후 screenshot 또는 시각 회귀 결과
- light/dark와 responsive 상태
- keyboard·focus·ARIA 확인
- loading·empty·error·disabled 상태
- API 실패와 재시도 흐름

실행하지 못한 검증을 통과한 것처럼 기록하지 않는다. 이유와 남은 위험을 PR에 적는다.

## 7. Runtime 격리

Git Worktree는 파일과 branch만 분리한다. 포트, Docker Compose project, container, database는
별도로 분리해야 한다. 여러 UI 개발 서버를 동시에 실행하면 Issue별 포트를 지정한다.

## 8. PR 준비 Gate

아래 Issue·Worktree 항목은 저장소가 해당 흐름을 채택했거나 사용자가 요청한 경우에 적용한다.

- [ ] 현재 경로가 해당 Issue의 Worktree다.
- [ ] branch가 해당 Issue의 feature branch다.
- [ ] Issue 범위를 벗어난 변경이 없다.
- [ ] 완료 조건을 충족했다.
- [ ] 관련 검증을 실행했다.
- [ ] 모든 변경을 의도한 commit으로 만들었다.
- [ ] 작업 트리가 깨끗하다.
