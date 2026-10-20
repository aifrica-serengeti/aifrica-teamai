---
name: aifrica-frontend-github-workflow
description: Aifrica frontend의 Git·GitHub 요청 단계에 따라 Issue·branch/worktree·commit·push·PR·review·merge·정리를 수행한다. GitHub lifecycle이 요청된 경우에 사용하며 일반 UI 구현만으로 원격 작업을 시작하지 않는다.
---

# Aifrica UI GitHub Workflow

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md)로 `docs/common/resolution.md`, 회사 Git 규약(`docs/common/git-docs/{commit,issue,pr-agent}.md`)과
`docs/frontend/workflow/README.md`를 찾는다. AGENTS.md, 실제 remote, branch/ruleset,
Issue/PR template·CODEOWNERS, actual checks를 읽고 [상세 단계](references/lifecycle.md)에서 요청한 단계만 실행한다.

## 범위와 사용자 권한

사용자가 이미 요청한 작업과 권한은 이어받고 단계마다 재확인하지 않는다. Issue 초안은 local 작성,
Issue 생성 요청은 duplicate 조사와 생성, PR 생성 요청은 필요한 in-scope commit/push/PR 생성,
리뷰 반영 요청은 타당한 수정·검증·commit/push를 포함한다. 외부 댓글·답변은 사용자가 명시적으로
요청했거나 허용된 workflow에 그 전달을 명시한 경우에만 보낸다. merge·삭제·release·deploy는 요청 범위에서
확인한다. 단순 구현 요청이 원격 생성·push·병합까지 자동으로 넓어지지 않는다.

## 실행 계약

- branch prefix는 상위/사용자/소비 저장소 지침을 따른다. 별도 규칙이 없으면 `codex/`를 기본으로 한다.
- 기존 작업·스킬을 되돌리거나 auth·Git identity·remote 설정을 임의로 수정하지 않는다.
- `gh` 사용 가능성과 인증을 확인한다. 충분하면 플러그인 설치를 요구하지 않는다.
- Issue·Worktree·Closes 연결은 현재 저장소 정책/요청에 맞게 적용한다. 모든 작은 코드 변경에 사전 Issue를 강제하지 않는다.
- 기존 적합한 branch/worktree를 재사용하고 unrelated 변경은 staging에서 제외한다.
- UI evidence는 actual source/export, 상태 owner, loading/error/permission, keyboard/focus와 실행한 checks를 근거로 한다.
- commit/Issue/PR은 회사 공통 규약과 consuming repository template을 따르고 multiline body는 임시 파일로 작성해 전달한다.
  회사 PR 기본 base는 `dev`, 운영 문서·CI의 `master` 예외와 Issue/Closes 필수 연결을 실제 remote에서 확인한다.
- 리뷰는 formal/inline/conversation과 current HEAD를 읽어 수정 필요·설명 필요·오탐·보류로 판정한다.
- merge는 실제 required checks, 유효한 blocker, 현재 HEAD, 허용 방식과 사용자 요청을 확인한 뒤 수행한다.
- 생성한 PR은 host가 artifact attachment를 제공하면 연결하고 실제 관찰한 URL/commit/검증만 보고한다.

단계별 상세 문서는 `docs/frontend/workflow/{configuration,issue,development,pull-request,review,merge,templates}.md`에 있다.
