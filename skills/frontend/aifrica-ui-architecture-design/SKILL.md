---
name: aifrica-ui-architecture-design
description: Aifrica frontend 새 기능·모듈·상태·API adapter·public UI 경계를 설계한다. 사용자 흐름과 수명에서 소유권·의존 방향·검증 계획을 도출할 때 사용한다. 기존 코드의 동작 보존 이동만 필요하면 architecture-refactor를 사용한다.
---

# Aifrica UI Architecture Design

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md) 후 `docs/frontend/architecture.md`, `ai-prompt.md`,
소비 저장소의 architecture mapping과 실제 package·source·public export를 읽는다.
기술 선택에 관련된 `docs/frontend/technology` pack만 추가한다.
선택 솔루션의 README·extension과 연결된 아키텍처 계약을 읽고 그 솔루션의 배치·naming 기준을 적용한다.

## 설계 흐름

1. 사용자 흐름, 성공 조건, route·API·permission·latency·offline/refresh 요구를 정리한다.
2. original/domain model, page draft/query/view model, reusable interaction, app assembly의 수명과 변경 이유를 구분한다.
3. 각 symbol/state를 가장 좁은 owner에 배치하고 dependency graph를 작성한다. `src/{app,core,domains,pages}`는
   reference mapping이며 기존 framework/package 경계를 유지한다.
4. 기존 service/component/hook/config와 의미가 겹치는지 검색하고 재사용·확장 가능성을 검토한다.
5. public contract는 필요한 값·event·typed result·error/cancel을 정하고 trust boundary의 검증·인가를 명시한다.
6. List/Create/Detail이면 공용 page 패턴과 solution의 columns/fields/tabs/actions·geometry를 합성한다.
7. loading/empty/error/retry/permission/dirty/conflict/stale-response와 focus 복구를 설계한다.
8. 구현 요청이면 이 설계를 필요한 범위만 기록하고 구현·검증까지 계속한다. 설계만 요청하면 구체 owner mapping,
   interface, tradeoff, migration 및 검증 계획을 전달한다.

설계에는 문제/제약, 선택한 owner와 근거, public contract, dependency 방향, failure 상태, 검증을 남긴다.
아직 확인되지 않은 컴포넌트나 endpoint를 존재한다고 단정하지 않는다. dependency upgrade나 새로운
상태관리 도구가 꼭 필요하면 기존 방식으로 해결할 수 없는 이유와 도입 범위를 먼저 구체화한다.
허용된 기존 사용자 요청은 반복 확인하지 않는다.
