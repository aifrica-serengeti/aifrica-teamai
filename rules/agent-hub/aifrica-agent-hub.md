# Agent Hub 솔루션 컨텍스트

먼저 inheritCommon과 실제 frontend-common 선택 여부를 확인한다. 아래 공용 frontend 문서·컴포넌트
참조는 공용을 켠 작업에서만 적용한다. 공용을 끄면 현재 제품의 자체 지침을 따르고 공용 문서의 존재를 요구하지 않는다.

현재 checkout이 TeamAI 프로젝트 `agent-hub` 또는 제품 로컬 설정으로 이 솔루션을 선택했는지 확인한다.
문서 root와 선택 충돌 처리 기준은 `common/resolution.md`를 따른다.
공용 원본의 `docs/agent-hub/`는 기본 TeamAI mirror에서 `.teamai/docs/agent-hub/`로 유지된다.

**Frontend·UI 작업일 때** `agent-hub/README.md`, `agent-hub/extension.md`, `agent-hub/frontend.json`과
`frontend/README.md`를 읽고 현재 제품 코드·로컬 채택 설정을 비교한다.
프로젝트 namespace는 backend 역할에도 배포되므로 frontend 계약을 backend 작업에 적용하지 않는다.

공유 frontend 설정은 현재 `draft`다. 미확인 테마·경로·도메인·페이지 구성을 추정하지 않는다.
List·Create·Detail의 공통 상태·접근성 계약을 유지하고 제품 차이는 명시적인 extension에 기록한다.
JDC 관찰 자료나 다른 솔루션 설정을 이 제품의 기본값으로 자동 상속하지 않는다.
고객 profile은 검증된 채택 파일과 제품의 명시적 선택이 있을 때만 적용한다.
