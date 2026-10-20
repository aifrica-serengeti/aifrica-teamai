---
name: aifrica-frontend-workflow
description: Aifrica frontend 공통 지식·디자인 시스템·상태 소유권을 적용해 UI를 구현하거나 리뷰한다. 컴포넌트 및 List/Create/Detail 페이지 변경에 사용한다. GitHub 단계 실행만 요청되면 github-workflow를 사용한다.
---

# Aifrica UI Workflow

먼저 현재 솔루션의 frontend.json과 제품 .aifrica/frontend.json의 inheritCommon을 확인한다.
false이면 이 스킬의 공용 절차·참조·React/Next 지식을 적용하지 않고 해당 솔루션의 자체 지침으로 전환한다.
공용 묶음은 frontend-common 역할을 실제 선택한 경우에만 사용한다.
정확한 경로·선택 계획은 DOCS_ROOT/common/frontend-policy.mjs와 common/resolution.md에서 확인한다.

[문서 위치 해결](references/doc-locations.md)로 회사 공통·frontend·solution/local adoption을 찾는다.
현재 솔루션의 실제 구현과 채택 설정을 기준으로 작업한다.

## 계약 선택

1. 가장 가까운 AGENTS.md와 논리 경로 `docs/common/resolution.md`, `docs/frontend/ai-prompt.md`를 전체 읽는다.
2. `docs/frontend/README.md`, `architecture.md`, design의 README·component-workflow·quality·registry를 읽는다.
3. 실제 package/lockfile/runtime을 확인하고 `docs/frontend/technology/README.md`에서 관련 기술만 선택한다.
   React·Next.js는 상세 index를 전체 읽고 task signal에 맞는 최소 pack(보통 1~3개)을 선택한다.
   선택한 pack은 각각 전체 읽고 signature·version gate·caveat를 적용하며 결과에 읽은 경로를 기록한다.
4. List/Create/Detail은 `docs/frontend/design/patterns/README.md`와 해당 패턴·page-policies를 추가로 읽는다.
5. 선택한 solution의 README·extension과 연결된 추가 계약을 읽고 `.aifrica/frontend.json`의
   token·component·page·architecture mapping을 합성한다. 공통과 선택 솔루션의 component registry를 함께 검색한다.

일반 구현은 로컬 snapshot을 사용한다. 최신화·공식 재검증 요청이나 누락된 중대 호환성 사실이 있을 때
기술 갱신 정책을 적용한다. 현재 설치 버전에서 지원되는 API만 사용하며 문서의 최신 관찰 버전으로
dependency를 자동 변경하지 않는다. Next.js의 exact version bundled docs가 있으면 signature 확인에 사용한다.

## 조사와 구현

- UI 분류를 List/Create/Detail/Component/Other로 정하고 query/draft/validation/mutation/permission owner를 적는다.
- registry id/name/alias와 가까운 source·export를 의미로 검색한다. 문서 예시는 구현 증거가 아니다.
- 기존 후보의 semantics/state/accessibility/API와 direct dependency를 비교해 reuse·extend·compose·create를 결정한다.
- 기존 제품 수정이면 실제 source를 확인한다. 명시적 문서 전용 재현이면 design/docs-only-build 계약을 따르고
  현재 제품 구현을 베끼지 않는다. 두 모드를 혼동하지 않는다.
- page 상태·API는 page/domain owner에, public interaction은 가장 좁은 shared owner에 둔다.
- loading/refresh/empty/error/retry/permission/dirty/conflict와 keyboard/focus를 관련 상태에 포함한다.
- token은 semantic 역할을 사용하고 solution의 brand·geometry·업무 필드를 공통 기본값으로 강제하지 않는다.
- 타입·모듈 재배치는 architecture-refactor, 새 경계 설계는 architecture-design의 계약을 추가 적용한다.

## 동기화와 검증

public component 계약을 바꾸면 design의 6개 필수 component 문서·index·registry·dependency·migration을
함께 갱신한다. source/export metadata는 실제 소비 구현을 확인한 경우에만 기록한다.
코드 변경에는 import-style, 실제 package scripts, 관련 test 및 design quality를 적용한다.
선택 솔루션이 검증 순서·조건을 정하면 그 순서로 실행한다. 구현 연결이 완전한 제품에서만 strict
implementation 검사를, 명시적인 기술 문서 갱신에서만 strict source 검사를 수행한다.
공용 문서 저장소는 공용 원본 저장소의 `npm run verify`를 실행하고 소비 앱은 존재하는 검증 명령을 사용한다.

결과에는 UI 분류, 실제 설치 버전/읽은 pack, 후보와 선택 이유, 상태 owner, 변경한 공개 계약,
실행한 검증과 미실행 이유를 간결하게 남긴다.
