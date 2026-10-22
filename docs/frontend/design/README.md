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
Agent Hub를 선택하면 `DOCS_ROOT/agent-hub/design`에서 관리하는 컴포넌트·자산 59종의 추가 계약과 원본 자산을
추가해 탐색한다. 솔루션별 자산·규격은 해당 확장에 두고 공용 51종의 기본값을 바꾸지 않는다.
Breadcrumb의 글꼴·색·구분자 간격·전용 arrow 자산도 Agent Hub 확장에서 연결하며 공용의 탐색·현재 페이지·focus 계약은 유지한다.
공용에 별도 Composer 계약은 없으므로 Agent Hub의 ChatComposer는 Textarea의 native 의미와 필요한 하위 계약을 조합한다.
기존 제품 구현을 먼저 비교하고 없으면 솔루션 구현을 개발하며 공용 Textarea의 시각 수치를 신규 입력 surface에 중복 강제하지 않는다.
Agent Hub UserMessage는 공용 Chip·Divider·해당 솔루션 아이콘을 조합한 사용자 표시 계약이며 assistant 응답이나 범용 메시지 렌더러로 확대하지 않는다.
Agent Hub ProgressAlert는 기존 버튼·아이콘을 조합한 응답 중단 안내이며 공용 Notification이나 진행률 표시로 자동 대체하지 않는다.
Agent Hub MessageExample은 Button의 native 의미를 참고하는 예시 선택 action이며 발송된 UserMessage·기존 Button 원본 재사용과 구분한다.
Agent Hub Picker는 Item·Footer와 실제 Search/아이콘/유형 Chip 조합을 연결하며 공용 Select/Menu의 외형으로 대체하지 않는다.
모델 데이터·패널 의미·검색·키보드·scroll/focus는 해당 솔루션/제품이 채택하고 검증한다.
Agent Hub Menu/Item은 공용 Menu의 의미를 유지하는 시각 확장이며 radius12·행 여백·section/구분선·destructive 차이는 솔루션에서 연결한다.
Agent Hub의 Elevation은 같은 namespace의 `foundations/Elevation.md`에서 별도로 확장하며 component registry id를 추가하지 않는다.
고객별 관찰 자료는 배포하지 않는다.

저자 저장소의 `audit/design-extraction.md`는 출처·전체 inventory·이동·제외·한계를 기록한다.

Agent Hub Flyout은 Header/Footer/파일·폴더 Item의 새 조합이며 같은 솔루션의 모션 안내에서 Menu 열림/닫힘 규칙만 채택한다.
Menu 의미나 시각을 통째로 상속하지 않으며 실제 계층·선택·focus/scroll·제품 명령은 별도로 검증한다.

Agent Hub Session은320px 패널과 예약/출력 행·진행 단계·컨텍스트 행·섹션 제목·기록 행의 전용6계약이다.
공용 Session은 추가하지 않으며 제품이 이 확장을 채택할 때만 해당 솔루션 문서와 자산을 읽는다.
선택·unread·접기·진행·추가 action을 분리하고 실제 구현은 제품에서 검증 후 연결한다.

Agent Hub OutputViewer는 제목/파일 형식·확대/닫기·본문 SLOT으로 구성한 전용 패널이다.
모서리와 각 변의 선·실제 IconButton 자산을 연결하고 파일 조회/renderer·실제 표시 방식은 제품 owner가 구현·검증한다.

Agent Hub Card5종은 파일행·데이터·썸네일·예약·항목의 다른 구성이다. 해당 솔루션의 cards.md에서 유형을 고르고
실제하위source재사용과공용Card의의미·접근성참고를구분한다. 기존공용Card의모양이나전체API를강제하지않는다.
