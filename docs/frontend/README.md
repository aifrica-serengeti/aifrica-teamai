# Aifrica frontend 공용 가이드

공용 스킬은 이 문서의 계약을 작업 절차로 실행한다. 디자인·기술·아키텍처의 기준을 여기서 유지하고,
CMP·PaaS·Agent Hub의 구체 테마와 업무 차이는 솔루션 확장에서 합성한다.

이 문서는 inheritCommon을 켜고 frontend-common 묶음을 선택한 제품에 적용한다.
공용을 끈 제품은 이 가이드·기술 snapshot·registry를 의존성으로 요구하지 않고 자체 지침을 따른다.
선택과 비활성화는 `DOCS_ROOT/common/frontend-bundle.md`를 따른다.

## 먼저 읽을 계약

처음 도입하거나 빈 제품을 만드는 경우 [첫 제품 적용과 동일 결과 검증](./first-use.md)부터 읽는다.

1. [회사 공통 문서·솔루션 해석](../common/resolution.md): 문서 root와 우선순위, local adoption 위치
2. [작업 헌장](./ai-prompt.md): 조사·상태·구현·접근성·검증의 공통 기준
3. [디자인 시스템](./design/README.md): foundation, component 계약, registry와 재사용
4. [참조 아키텍처](./architecture.md): 역할·타입·의존 방향과 소비 저장소 mapping
5. [기술 지식 인덱스](./technology/README.md): 기존 React·Next.js·web·TypeScript snapshot

TeamAI 배포 후에는 `.teamai/docs/frontend/` 등 scope root의 mirror를 같은 논리 경로로 읽는다.
기존 앱이 `docs/architecture.md`나 `docs/design`을 소유하면 `.aifrica/frontend.json`에서 그 adoption을
선택한다. 공용 문서 예시가 파일 생성이나 stack 전환을 자동으로 요구하지 않는다.

## 작업에 맞는 스킬

| 요청 | frontend 공용 스킬 | 읽을 상세 기준 |
| --- | --- | --- |
| UI 구현·수정·리뷰 | `aifrica-frontend-workflow` | 헌장 + 관련 기술 + 디자인 |
| 컴포넌트·token·design-system 계약 | `aifrica-design-system` | 디자인 및 솔루션 token/component override |
| List·Create·Detail 화면 | `aifrica-page-patterns` | [페이지 패턴](./design/patterns/README.md) + 해당 패턴 |
| 새 기능·모듈 아키텍처 설계 | `aifrica-ui-architecture-design` | 참조 아키텍처 + 요구·호출자·runtime 경계 |
| 타입·모듈 배치·의존 방향 리팩터링 | `aifrica-frontend-architecture-refactor` | 참조 아키텍처 + import 기준 |
| Issue·commit·PR·review·merge | `aifrica-frontend-github-workflow` | [GitHub 작업 흐름](./workflow/README.md) + 회사 Git 규약 |
| 명시적 기술 문서 최신화·공식 검증 | `aifrica-frontend-docs` | [갱신 정책](./technology/update-policy.md) |

`workflow`가 기본 구현 흐름을 조정하고 나머지 스킬은 작업에 필요한 전문 계약을 추가한다.
스킬 파일 위치는 host별 설치 경로에 따라 다르므로 사용자 홈 또는 `.agents/skills`를 고정 전제로 삼지 않는다.

## List · Create · Detail 공통 범위

세 패턴은 전체 frontend 그룹의 공용 계약이다. 상태 소유권, reusable shell 역할, validation,
permission, query/draft/mutation, loading·empty·error·refresh, keyboard·focus·접근성,
성공·실패·취소 흐름과 검증은 유지한다. 구체 route, backend payload, 테이블 컬럼, 제목, 폼 필드,
주색, 정확한 치수와 업무별 action은 솔루션 확장에서 선택한다.

## 도입 결과와 구현 증거

컴포넌트 명세와 기술 예제는 구현 존재의 증거가 아니다. 실제 source와 public export를 검색하고,
solution/local registry mapping을 확인한 뒤 reuse·extend·compose·create를 결정한다.
공용 문서의 기준일을 현재 검증일로 바꾸지 않으며 설치된 framework/runtime에서 지원되는 API만 사용한다.

문서 구조 검증은 공용 저장소에서 공용 원본 저장소의 `npm run verify`를 실행한다. 소비 앱에서는 실제로 존재하는
lint·typecheck·test·build 명령과 변경에 맞는 화면 검증을 실행하고 결과를 구분해 기록한다.
