# 병합, Issue 종료와 사후 정리

[← 작업 흐름](./README.md)

PR 생성이나 첫 승인만으로 작업을 완료 처리하지 않는다. 현재 HEAD의 코드, CI, 리뷰,
Issue 완료 조건이 모두 일치할 때 병합한다.

## 1. 병합 전 Gate

- [ ] PR이 최신 integration branch와 통합되어 있다.
- [ ] 필수 CI와 로컬 검증이 통과했다.
- [ ] Issue의 모든 완료 조건을 충족했다.
- [ ] 현재 HEAD에 유효한 blocking review가 없다.
- [ ] 모든 리뷰 지적의 판정과 처리 근거가 PR에 있다.
- [ ] 미완료 범위는 후속 Issue로 분리했다.
- [ ] PR 본문에 `Closes #<issue-number>`가 있다.

merge 방식은 repository ruleset과 팀 정책을 따른다. 자동화나 에이전트는 사용자의 병합 요청
또는 명시된 repository 정책 없이 임의로 병합하지 않는다.

## 2. 병합 실행과 확인

GitHub 웹 UI에서 허용된 merge 방식을 선택하거나, 승인된 경우 `gh`를 사용한다.

```bash
gh pr view <pr-number> --json mergeable,reviewDecision,statusCheckRollup
gh pr merge <pr-number> --<allowed-merge-method>
```

`<allowed-merge-method>`는 repository에서 허용한 `merge`, `squash`, `rebase` 중 하나다.
placeholder를 그대로 실행하지 않는다.

병합 후 다음을 확인한다.

```bash
gh pr view <pr-number> --json state,mergedAt,mergeCommit
gh issue view <issue-number> --json state,projectItems
```

1. PR의 `mergedAt`이 존재한다.
2. `Closes #...`로 연결된 Issue가 닫혔다.
3. 사용하는 경우 GitHub Project가 완료 상태다.
4. acceptance criteria와 최종 CI가 통과했다.
5. 실제 전달 범위가 다르면 남은 내용을 새 Issue로 만든다.

Issue는 PR 병합 전 수동으로 닫지 않는다.

## 3. 문서 정합화

진행 상태만 변했다면 UI 문서에 복제하지 않는다. 다음처럼 오래 남을 변화가 있을 때만 해당
원본 문서를 갱신한다.

- 제품·API·디자인 계약 변경
- 아키텍처 소유 경계 변경
- 검증된 구현 기준 또는 범위 변경
- 확정된 정책·결정·회고

코드 변경과 큰 정책·운영 문서 변경은 repository 정책에 따라 별도 Issue와 PR로 분리한다.

## 4. Worktree 정리

Worktree 정리는 merge와 분리된 유지보수 작업이다. 먼저 실제 경로와 상태를 확인한다.

```bash
issue_number="<github-issue-number>"
repository_root="$(git rev-parse --show-toplevel)"
worktree_path="${repository_root}-worktrees/issue-${issue_number}"

git worktree list
git -C "${worktree_path}" branch --show-current
git -C "${worktree_path}" status --short
```

다음을 모두 충족하고 사용자가 정리를 원할 때만 제거한다.

- 대상 경로가 실제 Git Worktree다.
- 예상한 Issue branch다.
- 커밋되지 않은 변경이 없다.
- 연결된 PR이 병합되었다.

```bash
git worktree remove "${worktree_path}"
git worktree prune
```

Worktree 제거와 local·remote branch 삭제는 별개다. branch 삭제는 repository 정책과 사용자
요청을 확인한 뒤 수행한다.

## 5. Release branch가 있는 경우

일반 Issue PR은 integration branch에 병합한다. 별도 release branch가 있다면 개별 Issue마다
따라 움직이지 않고 release 절차에서 검증된 integration branch를 승격할 때만 사용한다.

## 6. 완료 정의

```text
완료 = merged PR
     + closed Issue
     + passed verification
     + resolved review cycle
     + consistent Project state (사용하는 경우)
```

열린 PR, 부분 검증, 처리되지 않은 유효 리뷰가 남아 있으면 `완료`가 아니다.
