# Frontend 역할의 솔루션 선택

frontend는 업무 역할이며 공용 React·디자인·아키텍처 스킬을 자동 요구하지 않는다.
먼저 common/resolution.md와 현재 솔루션의 README.md·frontend.json, 제품 local adoption을 확인한다.

inheritCommon: true를 채택하고 frontend-common 추가 역할을 선택했을 때만 공용 7개 스킬과
frontend namespace의 헌장·컴포넌트·페이지 계약을 사용한다. JSON만 바꾸면 설치 파일은 바뀌지 않으므로
common/frontend-policy.mjs의 선택 계획과 TeamAI의 primaryRole/additionalRoles를 대조한다.

inheritCommon: false이면 frontend-common을 선택하지 않고 솔루션·제품의 자체 지침을 따른다.
공용 framework·디자인 시스템·디렉터리 규칙을 자동 요구하지 않는다.
해당 제품의 실제 기술·public API와 자체 지침을 먼저 확인한다.

상속 설정이 다른 여러 솔루션을 동시에 적용하지 않는다. 이 checkout의 단일 솔루션을 명시한다.
문서를 읽는 행위가 dependency migration·설치·제품 수정 권한을 추가하지 않는다.
