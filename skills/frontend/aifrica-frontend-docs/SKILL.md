---
name: aifrica-frontend-docs
description: 사용자가 명시적으로 요청한 Aifrica frontend 기술 지식 snapshot 최신화·공식 재검증·보안·deprecation·migration 점검을 수행한다. 일반 UI 구현이나 날짜 경과만으로 실행하지 않는다.
---

# Aifrica Frontend Documentation Refresh

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md) 후 `docs/frontend/technology/update-policy.md`,
`README.md`, `sources.json`과 관련 technology guide/index/pack을 읽는다.
일반 구현은 이 스킬의 실행 이유가 아니다. 사용자 요청 범위에서 공식 문서를 재검증하고 snapshot을 수정한다.

1. 요청한 기술·보안·migration 범위와 원본의 checkedAt/latestObserved를 확인한다.
2. 소비 프로젝트의 package/lockfile/runtime/browser 목표와 upstream stable/preview 채널을 구분한다.
3. 공식 docs/release/security와 package metadata만 근거로 확인하고 확인 날짜·정확한 source URL을 기록한다.
4. exact API/syntax, 최소 version/baseline, 선택 조건, runnable example, lifecycle/caveat, fallback,
   consuming version/config gate를 함께 갱신한다. 전체 원문 mirror를 만들지 않는다.
5. 큰 React/Next.js 지식은 task-routed pack으로 유지하고 index, sources.json의 topic/pack metadata를 함께 수정한다.
6. source의 관찰 기록과 이번에 실제 재검증한 사실을 분리한다. 확인하지 않은 source의 날짜를 일괄 갱신하지 않는다.
7. dependency/code migration은 요청 범위에서만 수행한다. 문서 최신화만 요청됐다면 영향과 migration 계획을 보고한다.
8. 공용 repo는 공용 원본 저장소의 `npm run verify`와 필요 시 실제 존재하는 source checker를 실행한다.

결과에는 확인일, 기술/채널, 공식 변경, 현재 솔루션 영향, 수정 guide/pack/source metadata,
upgrade 여부, 실제 검증과 남은 불확실성을 남긴다.
