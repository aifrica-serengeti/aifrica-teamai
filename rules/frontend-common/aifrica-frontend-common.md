# 선택된 frontend 공용 묶음

먼저 common/frontend-policy.mjs와 선택 솔루션의 frontend.json·제품 local adoption에서 inheritCommon을 확인한다.
false이면 아래 공용 절차와 React·Next 지식·공용 컴포넌트를 적용하지 않는다.
common/frontend-policy.mjs의 계획에 따라 frontend-common 선택을 해제하고 선택 솔루션의 자체 지침을 따른다.

공용 묶음을 선택한 frontend·UI 작업은 frontend/README.md·frontend/ai-prompt.md와
선택 솔루션의 README.md·extension.md를 읽는다. 정확한 경로는 common/resolution.md를 따른다.

일반 UI는 aifrica-frontend-workflow, 디자인 시스템은 aifrica-design-system,
List/Create/Detail은 aifrica-page-patterns, 설계는 aifrica-ui-architecture-design,
리팩터링은 aifrica-frontend-architecture-refactor, GitHub 단계는 aifrica-frontend-github-workflow를 선택한다.
명시적인 공식 기술 지식 갱신은 aifrica-frontend-docs를 사용한다.

공통 상태·접근성·공개 API를 유지하면서 솔루션별 theme·geometry·도메인·실제 구현을 연결한다.
registry의 unmapped는 구현 부재의 증거가 아니다.
