# List · Create · Detail 공통 페이지 패턴

세 페이지의 상태·상호작용·접근성·조립 흐름을 frontend 공용으로 유지한다. 테마·도메인·고정 치수와
메뉴 구조는 [솔루션 매핑](../contract-levels.md)에 둔다. 특정 제품의 기본값을 다른 솔루션에 자동 적용하지 않는다.

| 종류 | 상세 가이드 | 공통 책임 |
| --- | --- | --- |
| List | [ListPage](./ListPage.md) | query·filter·sort·pagination·selection·view와 Table/Card 조립 |
| Create | [CreatePage](./CreatePage.md) | draft·touched/error·validation·payload·submit·confirmation·success |
| Detail | [DetailPage](./DetailPage.md) | route·원본/draft·read/edit·refresh·save/cancel·conflict |

[페이지 정책](../page-policies.md), [API 피드백](../api-error-notifications.md), [Quality](../quality.md)를 함께 읽는다.

## 공통 필수

1. API/query/route/draft/validation/mutation/permission은 page 또는 가까운 page hook이 소유한다.
2. Table·field·Dialog·overlay는 controlled 값과 callback만 받는다.
3. initial loading과 기존 content refresh를 구분하고 stale response·취소·retry를 처리한다.
4. 원본을 저장 성공 전에 draft로 덮지 않으며 실패해도 사용자 입력을 보존한다.
5. native semantics·label/error 연결·keyboard·focus·pending·권한·파괴적 action을 상태마다 설계한다.
6. scroll과 overlay owner를 하나로 정하고 Header/본문의 정렬·border 중복을 검증한다.
7. dirty guard·duplicate submit·server field error·부분 실패·not-found/forbidden을 누락하지 않는다.

## 솔루션에서 선택하는 값

콘텐츠 폭, 외곽 band, inset, narrow breakpoint, Card minimum/열 수, 기본 보기와 page size, 검색 debounce,
option viewport, motion duration, header action 배치·성공 후 route·민감 결과 표시 정책은 profile 입력이다.
상세 문서의 수치·도메인 적용 예는 채택한 baseline 범위에서만 사용한다.

## 작업 순서

page kind와 resource identity → 실제 구현·registry 검색 → solution/profile mapping → dependency closure →
domain adapter·page state → controlled 표현 조립 → 상세 matrix와 해당 저장소 검증 순서로 진행한다.
타입·state 배치는 [아키텍처](../../architecture.md)를 따른다.
