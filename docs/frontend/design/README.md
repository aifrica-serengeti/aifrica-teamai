# Frontend 공통 디자인 가이드

컴포넌트 의미·상태·접근성과 List/Create/Detail 작업 흐름을 여러 솔루션에서 함께 사용하는 기준이다.
특정 제품의 테마·메뉴·페이지 치수·자산과 참조 구현은 솔루션 확장에서 연결한다.
이 문서는 원본에서 추출한 **reference-contract baseline**이다. 회사에서 별도로 승인한 디자인 규격이라는 주장은 하지 않는다.

## 작업별 진입점

| 작업 | 먼저 읽기 | 이어서 확인 |
| --- | --- | --- |
| 작업 시작·구현 판단 | [Frontend 허브](../README.md) | [AI 작업 헌장](../ai-prompt.md), [아키텍처](../architecture.md) |
| 계약 적용 범위·충돌 | [계약 수준](./contract-levels.md) | 현재 솔루션의 profile·mapping |
| 색·글꼴·간격·border | [Foundations](./foundations.md) | Color, Elevation, Typography, Layout |
| 기존 UI 찾기 | [컴포넌트 카탈로그](./components/index.md) | [레지스트리](./component-registry.json), 실제 public mapping |
| 재사용·확장·조합·신규 판단 | [작업 절차](./component-workflow.md) | 컴포넌트의 필수 6개 문서와 의존성 closure |
| 목록·생성·상세 | [공통 페이지 패턴](./patterns/README.md) | List·Create·Detail, [페이지 정책](./page-policies.md) |
| 새 프로젝트에서 구현 | [문서 기반 구현](./docs-only-build.md) | [재현·검증 절차](./reproduction.md) |
| 문서 작성·변경 | [Authoring](./authoring.md) | [Evolution](./evolution.md), [Quality](./quality.md) |
| 알림·문구 | [API 피드백](./api-error-notifications.md) | [Content·i18n](./content-i18n.md) |

## 보존한 상세 계약

공용 컴포넌트 51개에 `README`, `definition`, `styles`, `behavior`, `accessibility`, `verification`을
보존했다. 구현 예제가 있던 경우 `implementation/`의 TypeScript·CSS·사용 예제도 함께 유지했다.
Table의 정렬·선택·row action, Input의 native validation, Select의 option·focus·loading,
Dialog의 focus·portal, Notification의 수명, List/Create/Detail의 상태 전이와 검증 matrix를
한 문단 요약으로 대체하지 않는다.

모든 registry implementation은 `unmapped`이며 source·export는 `null`이다. 문서의 API 이름은
참조 계약의 식별자다. 솔루션에 같은 컴포넌트가 이미 존재한다는 뜻이 아니므로 실제 코드와 대조한 뒤
매핑한다. CMP shell 4종은 `DOCS_ROOT/cmp/design`의 솔루션 확장에서 관리한다.
CMP를 선택하면 공통 registry와 CMP registry의 합집합으로 id·alias·dependency를 탐색한다.
고객별 관찰 자료는 배포하지 않는다.

저자 저장소의 `audit/design-extraction.md`는 출처·전체 inventory·이동·제외·한계를 기록한다.
