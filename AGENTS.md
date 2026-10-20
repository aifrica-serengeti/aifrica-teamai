# Aifrica TeamAI 작성 계약

이 저장소는 실행 앱이 아니라 팀 AI 자산의 공용 원본이다. [README](./README.md)와
[문서 적용 순서](./docs/common/resolution.md)를 먼저 읽는다.

- `skills/frontend/`는 선택 가능한 frontend-common 묶음의 원본이다. frontend 기본 역할은 공용 스킬을 강제하지 않는다.
  inheritCommon과 실제 추가 역할이 일치할 때만 공용 문서·스킬·registry를 적용한다. 이 저장소의 공용 스킬을
  작업용 개인 홈 스킬로 설치하거나 source 제품에 자동 배포하지 않는다.
- 원본의 고객별 자료는 추출·비교 근거다. 이를 별도 역할·고객 전용 스킬로 배포하지 않는다.
  재사용 가능한 절차는 frontend 공통에, CMP의 추가 계약은 `docs/cmp`에 둔다.
- 회사 공통은 `docs/common`, 프론트엔드 공통은 `docs/frontend`, 솔루션 확장은
  `docs/cmp`, `docs/paas`, `docs/agent-hub`에 둔다. backend에는 별도로 확인한 계약만 추가한다.
- 스킬은 절차를, 문서는 공통 계약을, 솔루션 확장은 차이와 구현 매핑을 소유한다.
  솔루션별 스킬을 같은 이름으로 덮어쓰는 구조를 만들지 않는다.
- 공용을 채택한 제품의 List/Create/Detail 상태 소유권·상호작용·접근성 계약은 공통으로 유지한다.
  테마, 폭, 메뉴, API, shell과 개별 화면 조립은 솔루션/로컬 확장에서 정한다.
- `serengeti-cmp` 원본은 이 작업의 읽기 전용 근거다. 원본을 수정하지 않는다.
- 컴포넌트 문서의 예시를 consuming repository의 구현 증거로 취급하지 않는다.
  실제 source/export는 그 저장소에서 검증한 후 로컬 매핑에 기록한다.
- 기술 문서는 추출한 로컬 스냅샷이다. 이 작업은 공식 API 최신화가 아니다.
- Git 작업 시 [커밋](./docs/common/git-docs/commit.md), [이슈](./docs/common/git-docs/issue.md),
  [PR](./docs/common/git-docs/pr-agent.md) 규약과 현재 사용자의 권한 범위를 따른다.
  이 저장소 구성 요청 자체는 원격 게시·스킬 설치·제품 저장소 변경을 의미하지 않는다.

변경 후 `npm run verify`와 `npm test`를 실행한다. 새 스킬은 `SKILL.md` frontmatter와
문서 탐색 경로를 확인하고 실제 적용 시나리오로 읽기 전용 검증한다.
