---
name: aifrica-design-system
description: Aifrica frontend의 component·semantic token·typography·spacing·border·접근성 계약을 적용하거나 확장한다. 회사 공용 기준과 솔루션·local adoption을 합성하고 실제 컴포넌트 재사용 및 registry 정합성을 검증할 때 사용한다.
---

# Aifrica UI Design System

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md) 후 `docs/frontend/design/README.md`, `component-workflow.md`,
`component-registry.json`, 작업 관련 foundation/component 문서를 읽는다. 회사 공통 기준 위에 선택한
solution과 `.aifrica/frontend.json`의 허용된 override를 합성한다.
선택 솔루션에 `design/component-registry.json`이 있으면 공통 registry에 추가해 검색하고 해당 상세 문서를 읽는다.
공통 id를 덮어쓰지 않으며 같은 id의 변형은 별도 override·migration 근거로 구분한다.

## 결정 계약

1. 요청한 컴포넌트·token·interaction 의미를 먼저 정의한다. 주색이나 고객명을 공통 기준으로 고정하지 않는다.
2. registry id/name/alias와 local implementation mapping을 찾고 실제 source/public export를 확인한다.
3. 후보의 semantics, variant, state, keyboard/focus, data ownership과 direct dependency를 비교한다.
4. reuse → extend → compose → create 순서로 가능성을 검토한다. 동일 의미면 호환 가능한 variant를 우선한다.
5. 별도 interaction 의미가 필요한 경우 가장 좁은 owner에 생성한다. 라벨·DTO·route 차이만으로 복제하지 않는다.

## Token 및 확장

foundation scale과 semantic 역할, component role을 구분한다. color는 상태를 단독으로 전달하지 않는다.
브랜드 실제 색·font family·모서리·border·밀도·shell 치수는 공용 계약이 허용하는 solution/local 값을 쓴다.
같은 의미의 token을 다른 이름으로 반복하거나 컴포넌트에서 raw 값을 반복하지 않는다.
solution이 컴포넌트 계약을 바꾸면 version/compatibility/migration을 명시하고 공통 문서를 조용히 덮어쓰지 않는다.

## 공개 계약과 검증

component의 정의·행동·접근성·의존성·검증 문서와 registry를 design 가이드에 맞게 동기화한다.
actual source/export를 확인하기 전에는 implemented로 표시하지 않는다. document-only mode는
`docs/frontend/design/docs-only-build.md`의 독립 재현 경계와 dependency closure를 따른다.
관련 light/dark, responsive, long text, zoom, keyboard/focus, reduced motion 및 실제 test를 확인한다.
공용 repo 문서는 공용 원본 저장소의 `npm run verify`, 소비 앱 코드는 실제 package scripts로 검증한다.
결과에는 component 선택 근거, 적용 solution/override, 변경 계약·migration, 검증 결과를 남긴다.
