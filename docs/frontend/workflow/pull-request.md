# Pull Request 작성과 제출

[← 작업 흐름](./README.md)

PR은 변경 파일 목록이 아니라 Issue의 목표가 어떤 방식으로 구현되었고 무엇으로 검증되었는지
남기는 완료 증거다.

회사 공통 `docs/common/git-docs/pr-agent.md`의 제목·기본 base·Issue 연결·본문 형식이 우선이다.
아래 예시는 그 형식 안에 source workflow의 설계·검증 증거를 담는다.

## 1. 변수와 현재 상태

```bash
integration_branch="<repository-integration-branch>"
issue_number="<github-issue-number>"
task_slug="<short-task-slug>"
feature_branch="codex/${issue_number}-${task_slug}"

git status --short
git branch --show-current
git config user.name
git config user.email
```

- 작업 트리는 깨끗해야 한다.
- 현재 branch는 Issue의 feature branch여야 한다.
- Git identity가 실제 작업자와 일치해야 한다.
- 자동화가 `user.name`, `user.email`, `--author`를 임의로 바꾸면 안 된다.

## 2. 최신 Integration branch 통합

```bash
git fetch origin "${integration_branch}"
git rev-list --count HEAD.."origin/${integration_branch}"
```

뒤처져 있으면 repository 정책에 따라 `origin/<integration-branch>`를 rebase 또는 merge하고
충돌을 해결한다. 통합 후에는 관련 검증을 다시 실행한다. force push가 금지된 저장소에서는
공유된 branch history를 rewrite하지 않는다.

## 3. Push와 PR 생성

```bash
git push -u origin "${feature_branch}"
```

[PR 템플릿](./templates.md#pull-request-템플릿)으로 본문 파일을 작성한 뒤 생성한다.

```bash
gh pr create \
  --base "${integration_branch}" \
  --head "${feature_branch}" \
  --title "<issue-title>" \
  --body-file <pr-body-file>
```

`gh`가 없으면 같은 base, head, title, body로 GitHub 웹 UI에서 생성한다.

## 4. PR 본문의 필수 구조

```text
## 변경 내용
## 주요 변경 사항
## 관련 이슈
Closes #<issue-number>
## 테스트
```

- `Closes #...`는 병합 시 Issue가 닫히도록 연결한다.
- 변경 내용은 Issue의 목표와 사용자에게 생기는 결과를 요약한다.
- 주요 변경 사항은 핵심 설계·상태 소유자·리뷰 순서와 알려진 위험/후속 범위를 설명한다.
- 관련 이슈에는 실제 연결된 `Closes #...`를 적는다.
- 테스트에는 실제 실행 명령, 시각·수동 결과, 미실행 이유를 적는다.

## 5. PR 크기와 리뷰 가능성

- 하나의 PR은 하나의 Issue를 해결한다.
- 코드 변경과 unrelated policy 변경을 같은 PR에 섞지 않는다.
- 생성 파일, 무관한 포맷 변경, 디버그 로그를 제외한다.
- 큰 변경은 파일 나열 대신 리뷰 순서와 위험 영역을 안내한다.
- UI 변경은 확인할 route, viewport, theme, interaction state를 적는다.

## 6. 리뷰 시작 Gate

- [ ] PR 대상이 확인된 integration branch다.
- [ ] 본문에 정확한 `Closes #<issue-number>`가 있다.
- [ ] Issue 완료 조건과 PR 변경이 대응한다.
- [ ] CI와 로컬 검증 결과가 보인다.
- [ ] 알려진 미검증·위험이 숨겨져 있지 않다.
- [ ] 리뷰어가 변경 의도와 확인 순서를 이해할 수 있다.

PR을 열었다고 Issue를 수동으로 닫거나 완료 처리하지 않는다. 리뷰·CI·병합이 끝날 때까지
Issue 또는 Project의 활성 상태를 유지한다.
