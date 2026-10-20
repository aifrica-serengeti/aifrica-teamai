# Agent Hub 솔루션 확장

공용 frontend를 확장하는 아래 절차는 inheritCommon을 켜고 frontend-common 묶음을 선택한 경우에 적용한다.
공용을 끈 제품은 공용 문서·registry·스킬을 요구하지 않고 현재 제품의 자체 지침을 사용한다.
선택·해제 방법은 DOCS_ROOT/common/frontend-bundle.md를 따른다.

이 namespace는 Agent Hub의 공통 기준 추가·변경 사항을 담는다. 현재 [frontend.json](./frontend.json)은
`status: draft`이며 테마·실제 source·페이지 구성을 채택한 상태가 아니다. 빈 map과 `null`은 미확인을 뜻한다.
이 문서의 frontend 확장·채택 절차는 frontend·UI 작업에만 적용한다. backend 작업은
회사 공통 규약과 제품의 backend 계약을 따르며 아래 frontend 문서와 설정을 읽을 의무가 없다.

Agent Hub의 실제 디자인 토큰·컴포넌트·경로·업무 정책은 아직 이 저장소에서 검증하지 않았다. 제품 이름만으로 화면·도메인·라우팅 구조를 추정하지 않는다.

## 읽는 순서

1. [회사 공통 해석 계약](../common/resolution.md)에서 문서 root와 솔루션 선택을 확인한다.
2. Frontend·UI 작업일 때 `DOCS_ROOT/frontend/README.md`와 작업별 공용 스킬을 선택한다.
3. [Agent Hub 확장 작성·적용](./extension.md)과 [확장 데이터](./frontend.json)를 읽는다.
4. 현재 제품 저장소의 실제 코드와 로컬 `.aifrica/frontend.json`을 비교한다.

TeamAI의 `frontend-common` 역할과 `agent-hub` 프로젝트는 서로 다른 선택이다. 공용 역할은 frontend 스킬을,
프로젝트는 이 솔루션 문서를 배정한다. `frontend` 기본 역할만으로는 공용을 받지 않는다. 제품에 배포할 때도 namespace는
`.teamai/docs/agent-hub/`로 유지하며 공통 frontend 문서를 덮어쓰지 않는다.
이 프로젝트를 선택한 backend 역할도 솔루션 리소스를 받으므로 frontend 계약은 frontend 작업에서 적용한다.

## 실서비스 도입 시 채울 항목

| 항목 | 확인할 근거 |
| --- | --- |
| 테마·타이포그래피·border 등 token mapping | 실제 token 선언, light/dark 값, 대비와 상태 구별 |
| 컴포넌트 mapping | 공통 registry id, 제품 source, public export, 호출자와 지원 API |
| List·Create·Detail 구성 | 실제 route·화면 요구, 권한, API, 상태 소유권, 반응형 정책 |
| 아키텍처·문서 경로 | 현재 소비 저장소의 실제 파일과 모듈 경계 |
| 제품 한정 변경 | 이유·영향 범위·검증 근거와 `exceptions` |

경로는 모두 소비 제품 저장소 상대경로다. 이 공용 문서 저장소나 원본 `serengeti-cmp`의 경로를
실서비스 구현 위치로 간주하지 않는다. List·Create·Detail의 공통 상태·접근성 기준은
`DOCS_ROOT/frontend/design/patterns/README.md`에서 유지하며 frontend 작업일 때 읽는다.

고객·배포별 차이가 생기면 검증한 차이만 `profiles/<profile-id>/`에 추가한다. 현재 등록된 Agent Hub profile은 없다.
