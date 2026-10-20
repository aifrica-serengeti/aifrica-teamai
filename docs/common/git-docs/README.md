# Git 규약 원문

사용자가 지정한 전역 Git 규약 3종을 팀 문서로 옮겼다.

- [commit.md](./commit.md): 제목과 본문 작성 규칙
- [issue.md](./issue.md): 제공된 원문은 commit.md와 동일하며 제목도 Commit Message 작성 규칙이다.
  이를 새로운 Issue 정책으로 해석하거나 원문을 임의 수정하지 않았다. 실제 Issue 본문 구조는
  공용을 채택한 frontend 작업(inheritCommon: true와 frontend-common 역할 선택)에서만
  `DOCS_ROOT/frontend/workflow/issue.md`와 제품 저장소 템플릿을 함께 읽는다.
  공용을 끈 frontend와 backend 작업은 제품 자체 템플릿·절차를 따르며 공용 frontend 문서를 요구하지 않는다.
- [pr-agent.md](./pr-agent.md): PR base·이슈 연결·본문 규칙. 내부 가이드 참조만
  [이식한 경로](../github-project-guide.md)로 연결했다.

사용자의 현재 요청과 각 저장소에서 명시한 적용 규약을 확인한다. 원문 간 모호함이 실제 원격 작업의
결정에 영향을 줄 때 해당 작업 전에 확인하고, 일반 로컬 문서 작업을 불필요하게 멈추지 않는다.
