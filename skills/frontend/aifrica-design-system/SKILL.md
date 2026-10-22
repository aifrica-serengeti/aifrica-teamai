---
name: aifrica-design-system
description: Aifrica frontend의 component·버튼·아이콘 버튼·semantic token·typography·spacing·border·접근성과 솔루션별 아이콘·로고 자산 계약을 적용하거나 확장한다. 회사 공용 기준과 솔루션·local adoption을 합성하고 실제 컴포넌트 재사용 및 registry 정합성을 검증할 때 사용한다.
---

# Aifrica UI Design System

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md) 후 `docs/frontend/design/README.md`, `component-workflow.md`,
`component-registry.json`, 작업 관련 foundation/component 문서를 읽는다. 회사 공통 기준 위에 선택한
solution과 `.aifrica/frontend.json`의 허용된 override를 합성한다.
색상·타이포그래피·elevation 등 기반 작업에서는 선택 솔루션의 `design/README.md`와 연결된 foundation 확장도 읽는다.
foundation은 component registry id가 없어도 적용 근거가 될 수 있으며, 기존 컴포넌트의 개별 토큰과 샘플 값을 구분한다.
선택 솔루션에 `design/component-registry.json`이 있으면 공통 registry에 추가해 검색하고 해당 상세 문서를 읽는다.
공통 id를 덮어쓰지 않으며 같은 id의 변형은 별도 override·migration 근거로 구분한다.
솔루션 컴포넌트 문서에 Figma 실측 기록이 연결되면 필요한 type/size/state의 radius·fill·실제 border·
glyph 크기/선·alpha를 확인한다. 속성 목록의 모든 조합이 제공된 것으로 추정하지 않는다.
조합 컴포넌트에서는 실제 자식 instance의 원본·variant·override를 독립 primitive 계약과 대조한다.
전체 속성 기본값만으로 숨겨졌거나 없는 slot을 추가하지 않으며 중첩 조작 요소의 interaction 소유자를 하나로 둔다.
pressed와 별도 active를 구분하고, state5처럼 의미가 정의되지 않은 시각 상태는 제품 mapping 전까지
선택·열림·로딩 등으로 단정하지 않는다. native semantics·keyboard·focus·disabled 의무는 유지한다.
아이콘·로고 등 자산 작업에서는 선택 솔루션의 `design/README.md`와 `design/assets.md`가 있으면 읽고,
`design/asset-manifest.json`의 해당 이름·크기·출처·파일을 확인한다. 원본 asset과 캔버스 배경을 구분하고
솔루션이 확인한 도형·선 두께·색상·비율을 공용 예시나 유사한 라이브러리 아이콘으로 대체하지 않는다.
상세 manifest는 필요한 항목만 조회한다. 다른 솔루션 자산을 가져오거나 Figma MCP 재접속을 필수로 만들지 않는다.

## 결정 계약

1. 요청한 컴포넌트·token·interaction 의미를 먼저 정의한다. 주색이나 고객명을 공통 기준으로 고정하지 않는다.
2. 유지보수/문서 전용 재현 모드를 정하고 선택 솔루션의 registry id/name/alias와 local mapping을 먼저 찾는다.
   유지보수에서는 현재 소비 저장소의 실제 source/public export를 확인한다. 문서 전용 재현은 외부 제품 source를 요구하지 않는다.
3. 호환되는 솔루션 구현이 없거나 하위 의존성이 필요하면 공용 registry의 id/alias·의미·direct dependency를 따라 찾는다.
   정적 외형뿐 아니라 motion, focus owner, scroll owner, disabled 차단, keyboard, reduced motion, 상태/API 소유권을 비교한다.
4. reuse → extend → compose → create 순서로 판단한다. 공용 계약만 있고 실행 구현이 없으면 해당 계약의 재사용 컴포넌트를
   현재 제품의 가장 좁은 공용 UI 범위에 먼저 구현·검증한 뒤 상위 UI를 조합한다. Input·Select·Textarea 등을 상위마다 임시 복제하지 않는다.
5. 계약의 첫 구현과 새 디자인 계약 생성을 구분한다. 솔루션 geometry·paint는 adapter로 연결하고, 별도 interaction 의미가
   필요할 때만 새 계약을 검토한다. 라벨·DTO·route 차이로 복제하거나 공용을 끈 제품에 이 절차를 강제하지 않는다.

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
