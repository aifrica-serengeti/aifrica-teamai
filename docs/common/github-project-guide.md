# PR 운영 기준

사용자가 제공한 pr-agent 규약의 PR 전략을 이식한 진입점이다. 제품별 Project 번호나 원격 상태는
이 문서에 추정하여 기록하지 않는다.

- PR 제목은 커밋과 같은 간결한 명사형 스타일을 따른다.
- 기본 base는 `dev`다. 가이드 문서·CI 등 운영성 변경은 `master`가 가능하다.
  사용자가 base를 명시했다면 그 지시를 따르고 실제 원격 branch 존재 여부를 확인한다.
- 관련 Issue와 `Closes #<번호>`를 연결한다. 실제 Issue가 없으면 임의 번호를 만들지 않는다.
- 변경 동작, 주요 변경과 실제 실행한 검증을 본문에 담는다.
- 범위가 커서 검토하기 어렵다면 영향과 분리 가능성을 알린다.
- 요청받은 단계의 권한은 후속 대화에서도 유지한다. 이미 허용된 commit/push/PR 생성에
  반복 확인을 요구하지 않으며 merge·deploy까지 임의로 확대하지 않는다.

[원문 PR 지침](./git-docs/pr-agent.md) · [커밋 규약](./git-docs/commit.md)

frontend 작업에서 inheritCommon을 켜고 frontend-common 역할을 선택한 경우에만 배포된
frontend/workflow/README.md를 읽는다. 공용을 끈 frontend와 backend 작업은 현재 제품의
검증·리뷰 절차를 따른다. 공용 문서의 존재나 공용 스킬 실행을 요구하지 않는다.
