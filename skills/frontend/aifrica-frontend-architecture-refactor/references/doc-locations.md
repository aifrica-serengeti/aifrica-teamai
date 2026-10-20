# 문서 위치 해결

이 스킬의 문서 경로는 논리 경로다. 작업 대상 Git root(모노레포라면 현재 package)를 확인하고 가장 가까운
AGENTS.md와 `.aifrica/frontend.json`으로 작업 범위·솔루션을 확인하고 유지보수/문서 전용 재현 모드를 먼저 정한다.
실제 source·export·기존 화면 탐색은 유지보수 모드에서만 수행한다. 문서 전용 모드에서는
`DOCS_ROOT/frontend/design/docs-only-build.md`의 조사 금지 경계를 지킨다.

1. 작성 저장소에서 이 스킬을 읽는 경우 `SKILL.md`를 기준으로 상위 directory를 탐색해 `docs/common/resolution.md`와
   `docs/frontend/README.md`가 함께 있는 root를 찾는다. 현재 cwd가 그 root와 같다고 가정하지 않는다.
2. TeamAI로 설치된 경우 현재 checkout과 연결된 scope 설정의 `sharing.docs.localDir`를 먼저 확인한다. 기본 경로를 쓰면 프로젝트 root부터 상위 scope root의 `.teamai/docs/`를 탐색해
   `common/resolution.md`와 `frontend/README.md`가 있는 mirror를 찾는다. 작업 대상과 연결된 TeamAI scope만 사용한다.
   `docs/frontend/...`는 해당 mirror의 `frontend/...`, `docs/common/...`는 `common/...`로 해석한다.
3. 발견한 `common/resolution.md`를 읽어 선택된 solution(CMP/PaaS/Agent Hub)의 `docs/<solution>/` 또는 mirror,
   `.aifrica/frontend.json`, documentOverrides와 source/registry/architecture mapping을 합성한다.
4. local solution config의 `solution` 또는 현재 TeamAI project 설정으로 solution을 결정한다. source 경로·회사명·
   색상만으로 추측하지 않는다. 여러 solution이 선택될 때는 해당 frontend package의 설정을 우선하고 충돌을 알린다.
5. 같은 문서의 scope가 여러 개면 현재 소비 프로젝트의 적용 범위를 먼저 확인한다. solution/local override는
   허용된 속성에만 적용하고 접근성·보안·상태 소유권 등 공통 계약을 암묵적으로 약화하지 않는다.

문서 root가 없으면 실제 확인한 위치와 누락을 알리고 기존 소비 저장소 지침과 verified source로 진행 가능한
범위를 수행한다. 명세나 예제만으로 구현을 존재한다고 기록하지 않는다. 공통 reference architecture 경로는 예시다. 선택 솔루션이 정한 추가 구조·타입 규칙은 해당 계약대로 적용한다.
스킬 경로는 `.agents`, `.codex`, Claude 등 host마다 달라지므로 다른 스킬 조합은 host discovery를 사용한다.
필요한 지침이 현재 스킬과 연결 문서에 있으면 사용자 홈의 별도 스킬 설치를 요구하지 않는다.

빈 제품 또는 첫 도입으로 로컬 채택이 없다면 `DOCS_ROOT/frontend/first-use.md`를 읽고 입력 준비와 실제 재현 검증을 구분한다.
공용 문서와 배포된 진단 도구를 사용하며, 문서/파일 존재만으로 동일 동작·외형이 검증됐다고 보고하지 않는다.
