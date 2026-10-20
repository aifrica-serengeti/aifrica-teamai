# Frontend engineering 이관 근거

기준일: 2026-10-20. source `project.serengeti-cmp`는 읽기 전용으로 조사했다. 이 문서는 기술 최신성을
재검증한 기록이 아니라 기존 문서·스킬을 frontend 공용으로 분리한 기록이다.

## 조사와 이관

| source | 공용 결과 | 보존한 계약 |
| --- | --- | --- |
| `AGENTS.md`, `docs/frontend/ai-prompt.md` | `docs/frontend/ai-prompt.md`, workflow skill | 조사·state ownership·reuse·접근성·검증·기록 |
| `.agents/skills/aifrica-ui-workflow/SKILL.md` | 동일 이름 frontend skill | local knowledge routing, component preflight, 공개 계약 동기화 |
| `.agents/skills/aifrica-ui-architecture-refactor/SKILL.md` | 동일 이름 frontend skill + 상세 reference | 소유권 inventory·type placement·move·dependency·검증 |
| `.agents/skills/aifrica-ui-github-workflow/SKILL.md`, `docs/workflow/*.md` | 동일 이름 skill + `docs/frontend/workflow` | 요청 단계·repository discovery·duplicate·review current HEAD·merge evidence |
| `docs/architecture.md` | `docs/frontend/architecture.md`, architecture-design skill | assembly/domain/page/public UI 역할·DTO/draft/Props·단방향 의존 |
| `docs/frontend/{react,nextjs,...}` | `docs/frontend/technology` | 상세 pack·task index·API 예제·최소 version·caveat·source 기록 |
| `docs/frontend/import-style.md` | 동일 frontend 경로 | 기능 그룹·표시 길이·type·side-effect·public API 경계 |

workflow/refactor/GitHub 스킬은 이번 작업을 실행하는 고객 전용 도구로 적용한 것이 아니라 이관 대상 원본으로
조사했다. 신규 design-system, page-patterns, architecture-design, frontend-docs 스킬은 상세 문서를 선택적으로
읽고 소비 저장소의 solution/local adoption을 적용한다.

## 공통 계약으로 승격하지 않은 source 구현

- Vite SPA·vanilla-extract·pnpm 채택: 실제 소비 저장소 stack/config 확인으로 치환.
- `src/app`, `core`, `domains`, `pages`와 `Dto`/`I`/`T` prefix: 강제 구조가 아닌 참조 mapping으로 보존.
- `AccessKey`/Keycloak header·refresh, `/menu/roots/`, navigation adapter·SNBV2 연결: 고객/솔루션 API 구현으로 제외.
- Code MSA `MenuActionPolicy`, `Root`, Include/Exclude ACL·rollback 정책: source backend 연동으로 제외.
- 문서 tool `docs/tools/*.mjs`: 복사하지 않음. 공용 validator와 consuming repository의 실제 script를 사용.
- 항상 Issue·Worktree 선행: 모든 frontend 수정에 강제하지 않고 repository 정책·사용자 요청에 맞게 적용.
- 보라색/고객 shell 치수/메뉴 필드: 공용 기술·architecture·skill의 기본값으로 채택하지 않음.

List/Create/Detail은 공용 page-pattern skill과 상세 실행 reference로 유지한다. query·draft·original·validation·
mutation·permission·refresh·error·focus 계약은 공통이며 필드·column·tab·route·geometry는 solution 확장이다.

## Snapshot의 의미

원본 sources.json의 `checkedAt=2026-08-12`와 latestObserved는 원본의 관찰 기록이다. 이번 이관은 web 공식
재검증을 수행하지 않았고 날짜나 upstream version을 현재 값으로 바꾸지 않았다. metadata guide 경로는 이동한
technology subtree로 수정했다. 현재 프로젝트 채택 버전과 혼동하지 않도록 technology README에 명시했다.

machine-readable import inventory: [engineering-sources.json](./engineering-sources.json).
