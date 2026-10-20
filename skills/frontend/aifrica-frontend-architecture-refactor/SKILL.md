---
name: aifrica-frontend-architecture-refactor
description: Aifrica frontend의 TypeScript 타입·모듈·directory·import·의존 경계를 동작 보존으로 감사하고 정리한다. DTO·domain·draft·page state·Props 배치, 모듈 이동, 중복·private deep import·cycle 제거에 사용한다.
---

# Aifrica UI Architecture Refactor

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md)과 [상세 리팩터링 절차](references/refactor-procedure.md)를 읽는다.
공용 `docs/frontend/architecture.md`, `ai-prompt.md`, `import-style.md`, `technology/typescript.md`와
소비 저장소의 실제 architecture mapping·package·source·export·test가 근거다.
배치 결정 전에 선택 솔루션의 README·extension과 연결된 아키텍처 추가 계약을 읽는다.

ownership inventory, type-placement matrix, module placement, dependency gate와 검증 절차를
적용한다. `src/{app,core,domains,pages}`, `type/`, DTO/I/T naming은 참조 mapping이고
현재 솔루션의 architecture 계약을 우선한다. 선택 솔루션이 경로·naming을 정했다면 그 규칙을 적용하며
공통의 참조 표현을 이유로 선택 사항으로 낮추지 않는다. 스타일 도구·라우터·package manager는 솔루션에서 확인한다.

1. type-placement/module-placement/dependency-boundary/mixed를 정하고 동작 보존 범위를 명시한다.
2. 정의·모든 caller·re-export·type/runtime import·test를 조사해 현재 symbol/path → target owner → 근거를 기록한다.
3. DTO/domain/draft/query/view model/Props의 책임과 수명을 구분한다. 같은 shape만으로 alias/공유 타입을 만들지 않는다.
4. 한 책임씩 이동하며 import·export·test·문서를 함께 갱신한다. verified public caller에 필요한 compat export만 유지한다.
5. stale path/symbol, reverse dependency, cycle, orphan, private deep import, page workflow type 누적을 확인한다.
6. 실제로 존재하는 check를 실행하고 baseline failure와 새 regression을 구분한다.

UI·공개 컴포넌트·List/Create/Detail 계약이 바뀌면 공용 workflow/design/page 기준도 함께 적용한다.
결과에는 ownership 이동과 이유, dependency 변화, 동작·public API 보존, migration 및 실제 검증을 남긴다.
