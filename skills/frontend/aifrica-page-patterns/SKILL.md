---
name: aifrica-page-patterns
description: Aifrica frontend List·Create·Detail 페이지를 공용 상태·조립·접근성 계약에 맞게 설계·구현·리뷰한다. 솔루션별 컬럼·필드·탭·route·theme을 확장으로 합성할 때 사용한다.
---

# Aifrica UI Page Patterns

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md) 후 `docs/frontend/design/patterns/README.md`,
`docs/frontend/design/page-policies.md`, solution의 pagePatterns와 local adoption을 읽는다.
이 스킬은 List/Create/Detail 전체 frontend 공용 가이드다. 기존 고객의 geometry와 domain field는 기본값이 아니다.

작업에 해당하는 reference를 선택한다. 여러 kind의 workflow면 실제로 필요한 파일을 함께 읽는다.

| kind | 상세 실행 가이드 |
| --- | --- |
| List | [List](references/list.md) |
| Create | [Create](references/create.md) |
| Detail | [Detail](references/detail.md) |

페이지 코드는 query/route/original/draft/validation/mutation/permission 상태를 소유한다.
reusable shell·toolbar·field·table·card·dialog는 필요한 값과 callback을 받는다.
기존 컴포넌트의 registry와 실제 export를 확인해 reuse·extend·compose·create를 판단한다.
공용 상태·접근성·보안 계약을 유지하며 solution/local은 구체 route, label, column, field, tab, action,
브랜드와 shell geometry를 허용된 범위에서 정한다. source docs의 예시를 제품 요구로 오인하지 않는다.

검증은 해당 kind의 failure path와 keyboard/focus를 포함하고, URL·원본·draft·API payload가 혼동되지
않는지 확인한다. 실제 package checks와 화면 검증 결과, 적용 override를 기록한다.
