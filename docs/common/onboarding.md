# TeamAI 도입과 배포

이 저장소는 독립된 AI 자산 저장소다. 업무 제품 저장소에서 이 저장소 URL에 연결한다.
`init .`는 업무 저장소 내부의 self mode를 뜻하므로 이 구성의 연결 명령으로 사용하지 않는다.

아래 계약은 npm 안정 버전 `teamai-cli@0.27.0`의 실제 배포 schema와 namespace 구현으로 확인했다.
상위 main의 문서/구현은 이후 달라질 수 있다. Node.js 20 이상, Git과 팀 자산 저장소 접근 권한이 필요하다.

## 처음 참여

본인이 사용할 제품 checkout에서 실제 AI 도구와 역할·솔루션을 지정한다.
다음은 frontend + CMP + Codex 예시다. 다른 도구는 설치된 TeamAI의 도움말로 이름을 확인한다.

```bash
npm install -g teamai-cli@0.27.0
teamai init https://github.com/aifrica-serengeti/aifrica-teamai.git --role frontend --project cmp --agent codex
teamai roles set frontend --add frontend-common
teamai pull --force
teamai doctor
```

위 명령은 이 저장소의 파일이 원격에 게시된 후 실행한다. 현재 로컬 준비만으로 원격이 갱신되지는 않는다.
`--project`를 `paas` 또는 `agent-hub`로 선택할 수 있다. backend 팀원은 `--role backend`를 쓴다.
이 문서의 설치 명령은 사용자 환경을 바꾸므로 구성 문서를 읽는 것만으로 자동 실행하지 않는다.

frontend 기본 역할에는 공용 스킬이 없다. 위의 추가 역할은 공용 묶음을 채택하는 경우에만 선택한다.
공용을 쓰지 않는 제품은 `roles set frontend`로 추가 역할을 비우고 자체 지침을 사용한다.
선택·상속 설정은 [공용 묶음 가이드](./frontend-bundle.md)를 따른다.
`frontend-common`을 기본 역할로 직접 선택한 `--role frontend-common --project cmp`도 공용과 CMP를
모두 받는다. 이 경우 frontend 기본 역할을 추가로 선택할 필요는 없다.
안정 버전은 init에서 pull하며, 현재 upstream main은 지연 동기화로 바뀌어 명시적 pull도 안내한다.
훅이 필요한 도구는 doctor와 해당 도구의 실제 설정/신뢰 상태를 확인한다.

## 기존 참여자의 변경

```bash
teamai roles set frontend --add frontend-common
teamai projects set cmp
teamai pull --force
teamai doctor
```

제품 하나에 하나의 솔루션을 선택한다. 여러 프로젝트를 동시에 선택한 환경에서는
`.aifrica/frontend.json`으로 이 checkout의 단일 솔루션을 명시하고 실제 선택과 충돌하지 않는지 확인한다.

## 받는 파일

| 역할 + 프로젝트 | 스킬 | 문서 namespace |
| --- | --- | --- |
| frontend + frontend-common + cmp | 공용 7종 | common, frontend, cmp |
| frontend + frontend-common + paas | 공용 7종 | common, frontend, paas |
| frontend + frontend-common + agent-hub | 공용 7종 | common, frontend, agent-hub |
| frontend + 각 솔루션, 공용 꺼짐 | 공용 스킬 없음 | common, 선택 솔루션 |
| backend + 각 솔루션 | 현재 backend 전용 스킬 없음 | common, backend, 선택 솔루션 |

기본 docs mirror는 `.teamai/docs/<namespace>/...`다. namespace 폴더를 평탄화하지 않는다.
역할과 프로젝트의 리소스는 합집합이므로 프로젝트에 frontend 스킬 namespace를 넣지 않는다.
프로젝트 규칙은 frontend 작업일 때만 frontend 확장을 읽도록 범위를 제한한다.

처음 연결하기 전에 기존 제품 스킬과 위 공용 7종의 이름 충돌을 확인한다. CLI 0.27.0은 아직 관리 기록이
없는 동명 로컬 스킬을 최초 pull에서 덮어쓸 수 있다. 충돌은 먼저 백업·이름 정리 등 제품 소유의 방식으로
해소한다. 기존 serengeti-cmp의 원본 3종과 새 공용 7종은 이름이 겹치지 않는 것을 확인했다.

TeamAI의 역할/namespace는 배포 선택이며 접근 제어가 아니다. Git 접근권한은 Git 호스트에서 관리한다.
선언되지 않은 docs 최상위 디렉터리는 공유로 취급될 수 있으므로 새 namespace는 manifest와 함께 추가한다.

## 제품에서 채택

공용 묶음을 채택했을 때는 `DOCS_ROOT/frontend/first-use.md`를 읽는다. 독립 모드는 제품 자체 지침을 따른다. 빈 제품은
문서 전달 후에도 테마·자산·실제 public component를 연결/구현해야 한다. 진단 도구는
`DOCS_ROOT/frontend/contracts/check-first-use.mjs`이며 사용자 npm 환경에 패키지를 추가하지 않고 실행한다.

1. [확장 계약](./resolution.md)과 선택 솔루션의 `extension.md`를 읽는다.
2. `.aifrica/frontend.json`을 제품 저장소에 만들고 실제 theme/token/source/public export를 매핑한다.
3. List·Create·Detail의 공통 상태 계약을 유지하면서 필요한 geometry·section·이동 정책만 지정한다.
4. 코드와 검증 근거를 확인한 뒤 해당 채택 설정의 status를 active로 바꾼다.

공통 registry가 `unmapped`인 것은 제품에 컴포넌트가 없다는 뜻이 아니다. 기존 코드를 먼저 검색한다.
TeamAI는 이 extension JSON을 자동 병합하거나 CSS를 생성하지 않는다. 공용 스킬이 적용 순서를 읽어 사용한다.
CMP의 추가 아키텍처·페이지 적용·검증 기준은 `DOCS_ROOT/cmp/frontend-contract.md`에서 읽는다.
고객별 원본 자료를 읽기 위한 별도 역할이나 스킬은 배포하지 않는다.

## 관리

이 저장소에서 공통 문서/스킬/확장을 수정하고 `npm run verify`, `npm test`로 확인한다.
팀에 게시할 때는 요청받은 Git 단계와 [작성 규약](./git-docs/README.md)을 따른다.
이 구성은 `usageReport: false`, recall 비활성으로 시작한다. 지식 검색·학습 공유·사용량 보고를
도입하려면 별도 목적과 기록 범위를 정하고 설정한다.

근거: [TeamAI 배포](https://github.com/Tencent/teamai-cli/blob/40f36f02faf70f393ee3e71bf1a4c017f0106fc2/docs/guide/distribution.md),
[역할 schema](https://github.com/Tencent/teamai-cli/blob/40f36f02faf70f393ee3e71bf1a4c017f0106fc2/src/roles.ts),
[namespace 합성](https://github.com/Tencent/teamai-cli/blob/40f36f02faf70f393ee3e71bf1a4c017f0106fc2/src/resource-namespaces.ts).
