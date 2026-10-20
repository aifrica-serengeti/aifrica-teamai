# 회사 공통 기준

회사 공통의 범위는 문서 적용 순서와 Git 작성 규약이다. 프론트엔드 구현 규칙은
`DOCS_ROOT/frontend/README.md`에 두며 backend의 아키텍처를 추측해 만들지 않는다.
frontend namespace는 frontend-common 묶음을 명시 선택했을 때만 배포된다.
공용을 끈 제품은 자체 지침을 사용하며 CMP·PaaS·Agent Hub 차이는 선택 솔루션의 확장에서 읽는다.

- [문서 탐색·합성·우선순위](./resolution.md)
- [Git 규약 출처와 원문 상태](./git-docs/README.md)
- [PR 운영 기준](./github-project-guide.md)
- [TeamAI 도입과 배포](./onboarding.md)
- [Frontend 공용 묶음 켜기·끄기](./frontend-bundle.md)

역할별 공용 스킬과 솔루션별 확장은 별도 네임스페이스다. 역할은 업무 분야,
프로젝트는 담당 솔루션을 선택한다. 둘을 합쳐도 접근권한을 제한하는 보안 경계가 되지는 않는다.
