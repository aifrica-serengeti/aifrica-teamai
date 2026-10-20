# Portable frontend GitHub workflow

이 디렉터리는 프론트엔드 작업을 Issue로 정의하고, 독립 브랜치에서 구현하고, PR 리뷰를
반영한 뒤 병합하는 전체 절차를 제공한다. 특정 조직·저장소·GitHub Project·리뷰 봇·외부
Skill·전용 shell script에 의존하지 않는다.

필수 도구는 Git이다. GitHub CLI(`gh`) 예제를 제공하지만, 설치되어 있지 않으면 같은 작업을
GitHub 웹 UI로 수행할 수 있다. 명령을 실행하기 전에는
[저장소 설정 탐지](./configuration.md)를 통해 현재 저장소 값을 확인한다.

## Codex 실행 스킬의 선택적 사용

`$aifrica-frontend-github-workflow` 스킬은 이 문서의 절차를 대체하는 정책이 아니라, 현재 저장소의
`AGENTS.md`, GitHub 템플릿, 브랜치·검증·merge 규칙을 탐지한 뒤 요청된 단계만 실행하는
Codex 스킬이다. 스킬이 없어도 이 디렉터리의 문서만으로 같은 작업을 수동으로 진행할 수
있다.

사용 예:

- `$aifrica-frontend-github-workflow로 이 UI 변경의 Issue 초안만 작성해줘.`
- `$aifrica-frontend-github-workflow로 #123 작업을 검증하고 PR을 생성해줘.`
- `$aifrica-frontend-github-workflow로 PR #456 리뷰를 판정하고 유효한 지적만 반영해줘.`
- `$aifrica-frontend-github-workflow로 PR #456의 병합 가능 여부만 확인해줘.`

Issue 생성, push, PR 생성, 리뷰 답변, merge는 원격 상태를 바꾸므로 사용자가 요청한
단계에서만 수행한다. PR 생성 요청은 필요한 범위의 commit·push를 포함하지만 Issue 종료,
merge, branch 삭제, release, deploy까지 임의로 확장하지 않는다.

## 공통 Git 문서와 권한

커밋·Issue·PR을 작성할 때 [공통 문서 해석 계약](../../common/resolution.md)으로 찾은 회사 공통
Git 규약과 소비 저장소의 템플릿·ruleset을 먼저 읽는다. 회사 `pr-agent.md`가 정한 기본 PR base(`dev`),
운영성 변경의 `master` 예외, Issue/Closes 연결과 제목·본문 형식을 적용하고 실제 remote branch로 검증한다. 이미 받은 사용자 요청과 권한은 세션 동안
유효하다. 모든 단계마다 재승인을 요청하지 않는다. 구현 요청이 곧 Issue 생성·외부 답변·병합 권한은 아니다.
Issue/Worktree는 해당 저장소 정책 또는 작업 요청에 있을 때 사용하며, 이 문서만으로 모든 코드 수정에
사전 Issue를 강제하지 않는다.

## 전체 흐름

```text
요구사항·버그 발견
  → Issue 작성·등록
  → 최신 integration branch에서 codex/<issue-number>-<slug> Worktree 생성
  → 구현·로컬 검증·커밋
  → 최신 integration branch 통합·재검증
  → PR 생성(Closes #issue)
  → 사람/자동 리뷰 판정
  → 유효한 지적 수정·검증·답변·재리뷰
  → 모든 차단 조건 해소
  → integration branch 병합·Issue 종료 확인
  → 필요 시 문서 정합화·Worktree 정리
```

## 단계별 문서

| 단계 | 읽을 문서 | 결과 |
| --- | --- | --- |
| 새 저장소에 적용 | [저장소 설정 탐지](./configuration.md) | 브랜치·검증·리뷰·merge 계약 |
| 작업을 실행 단위로 정의 | [Issue 작성과 등록](./issue.md) | 목표·완료 조건·제외 범위가 있는 Issue |
| 브랜치와 작업 공간 준비 | [개발 시작과 Worktree](./development.md) | 최신 기준에서 분리된 작업 경로 |
| 변경 의도와 검증 제출 | [Pull Request](./pull-request.md) | Issue와 연결된 검증 가능한 PR |
| 리뷰 판정과 수정 반복 | [리뷰 반영](./review.md) | 모든 지적의 근거 있는 처리 기록 |
| 병합과 사후 정리 | [병합과 종료](./merge.md) | 병합·Issue 종료·상태의 일치 |
| 본문을 바로 작성 | [복사 템플릿](./templates.md) | Issue·PR·리뷰 답변 템플릿 |

## 변경 가능한 값과 변경하면 안 되는 흐름

새 저장소마다 다음 값은 달라질 수 있다.

- integration branch: `main`, `develop` 등
- feature branch prefix: `codex/`, `feat/`, `fix/` 등
- Worktree 위치와 사용 여부
- 패키지 매니저와 검증 명령
- GitHub Project, Milestone, Iteration 사용 여부
- 사람 승인 수와 자동 리뷰어
- merge 방식과 branch 삭제 정책

반면 다음 증거 흐름은 유지한다.

```text
Issue의 완료 조건
  → 독립된 변경
  → 실행한 검증
  → Issue와 연결된 PR
  → 모든 리뷰 지적의 판정
  → 현재 HEAD 재검증
  → 병합과 Issue 종료
```

## 기록의 단일 출처

| 정보 | 원본 |
| --- | --- |
| 현재 담당자·진행·리뷰·차단 상태 | GitHub Issue·Project·PR |
| 작업 목표·완료 조건·논의 | Issue |
| 구현 변경·검증·리뷰 반영 | PR |
| 실제 동작 | 코드와 테스트 |
| 오래 유지할 아키텍처·디자인·개발 규칙 | `docs/` |

브랜치명이나 현재 리뷰 대기를 문서에 반복해서 적지 않는다. 변하는 상태는 GitHub에 두고,
이 문서에는 다른 작업에서도 유지할 절차만 둔다.

## 독립성 경계

- 모든 필수 설명과 템플릿은 root `AGENTS.md`와 `docs/` 안에 있다.
- 외부 planning 문서, repository 전용 Skill, 사용자 홈 디렉터리의 설정을 요구하지 않는다.
- 저장소별 값이 문서에 없으면 [configuration.md](./configuration.md)의 명령으로 탐지한다.
- 탐지할 수 없는 정책은 임의로 선택하지 않고 저장소 관리자에게 확인한다.
- `../`가 포함된 Markdown 링크라도 최종 해석 위치가 저장소 내부면 독립성 위반이 아니다.
  검증은 문자열이 아니라 실제 해석된 경로가 저장소 경계를 벗어나는지 확인한다.
