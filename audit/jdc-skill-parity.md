> **폐기된 구조의 과거 검증 기록**
> 고객별 전용 역할이 필요 없다는 사용자 정정에 따라 이 문서의 배포 구조는 제거했다.
> 현재 적용 기준은 [공용 frontend + 솔루션 구조](./frontend-solution-cleanup.md)를 따른다.

# JDC 스킬 동등 적용 최종 감사

검사일: 2026-10-20. 요청의 핵심은 TeamAI의 JDC frontend 스킬을 처음 받은 AI가
`project.serengeti-cmp` 내부의 세 스킬과 같은 지침·필수 읽기·판단·검증 절차를 적용할 수 있는지다.
공통 frontend만의 추상 계약, 실제 앱 runtime, 생성 결과의 byte 일치와 이 판정 범위를 구분한다.

## 재감사에서 발견한 누락과 보완

보완 전에는 **JDC 동등 적용 불충족**이었다. 일반 frontend 공통화는 되어 있었지만,
JDC profile은 관찰 자료뿐이어서 원문 의무를 다시 선택하는 배포 경로가 없었다.
또한 TeamAI 0.27.0은 기존 `.agents/skills`의 동명 파일을 덮어쓸 수 있었다.

| 발견한 차이 | 최종 조치 |
| --- | --- |
| JDC 선택과 원문 탐색 경로 없음 | `frontend-jdc` + `cmp`, 전용 namespace와 실행 README, reference profile 추가 |
| React/Vite·vanilla-extract·타입 배치와 인증/메뉴 정책이 공통 참조로 약화 | 원본 architecture와 스킬을 수정 없이 보존하고 JDC에서 그 의무를 직접 읽음 |
| List/Create/Detail의 구체 설정·업무 사례·shell 문서 누락 | 원본 디자인 55종 registry·페이지·shell·업무 사례를 계약 묶음에 포함 |
| 전체 읽기·조건부 검사·sync→guidelines→제품 검사 순서 축약 | 원본 3개 SKILL.md의 필수 읽기·분기·검증 순서를 그대로 적용 |
| 기존 원본 이름과 공통 스킬 이름 충돌 | 고유 이름 `aifrica-jdc-*` 3종만 배포하고 원본은 읽기 전용 임시 경로에서 읽음 |
| common/frontend 문서가 JDC 선택을 다시 관찰-only로 낮춤 | onboarding·resolution·CMP·frontend 진입점을 JDC 분기로 연결 |

일반 frontend 7종과 JDC 3종은 별도 역할이다. JDC의 지원 조합은 CMP뿐이며, 일반 frontend를
추가 역할로 함께 선택하지 않는다. TeamAI manifest 자체는 역할·프로젝트 조합을 제한하지 못하므로
스킬·규칙은 실행 전에 scope와 local adoption을 확인하고 다른 솔루션이면 JDC 적용을 금지한다.

## 원본의 범위와 무결성

- 원본 commit: `3f1da2942839cabf5a5ef56fd1f30d68fde7f4d4`.
- `../docs/jdc/contract-pack.json` (당시 계약 묶음): 원본 591개 파일, 원문 3,215,728 bytes.
- `../docs/jdc/source-manifest.json` (당시 출처 manifest): 파일별 SHA-256·bytes·제외 사유.
- inventory SHA-256: `71be4217275a9285cbf478a8ab1af70396912ee5e5bae85f249eb8a52d47c697`.
- 원본 `.agents` 스킬 3종, AGENTS, 기술 지식, architecture, 디자인 55종 registry와
  List/Create/Detail·GitHub 문서를 모두 포함한다.
- 실행 가능한 제품 도구 7개와 디자인 mockup 5개는 계약 묶음에서 제외한다. 원본 검증 도구의
  명령·조건·순서는 보존하며 실제 명령은 제품 root에서 실행한다. 도구 부재를 통과로 보고하지 않는다.

독립 에이전트가 원본 Git blobs 및 현재 clean working tree와 전수 비교해 불일치 0을 확인했다.
문서 상대 링크 1,657개 중 계약 문서 누락은 0이다. 계약 묶음 밖 151개는 제품의 `src` 148개,
`public` 2개, `Dockerfile` 1개로 실제 제품에서 확인하도록 root 대응을 명시했다.

## 실행 경로와 독립 검토

1. JDC 고유 스킬은 현재 제품과 TeamAI scope의 선택을 확인한다.
2. 배포된 Node.js 표준 라이브러리 `../docs/jdc/load-contract.mjs` (당시 loader)가 pack/manifest와
   모든 원문 checksum을 확인하고 OS 임시 디렉터리에 원래 경로 관계를 복원한다.
3. AI는 복원된 AGENTS와 해당 원본 SKILL.md를 전체 읽고 원문의 작업별 문서로 이동한다.
   cross-skill 참조도 복원된 원본을 직접 읽는다.
4. 계약 문서는 `contractRoot`, 실제 source/export·설정·Git·검증 명령은 `productRoot`에 대응한다.
   원문의 문서 전용 재현 모드에서 금지한 제품 조사 경계도 유지한다.

의미 감사 에이전트가 원본의 필수 읽기·두 모드·금지·cross-skill·검증 순서·실행 root를 재대조했다.
현재 사용자·제품 지침 및 회사 Git 규약의 우선 적용은 명시된 차이다. 이를 숨기고 원문만의 정책과
완전히 같다고 주장하지 않는다. 원문 자체의 오래된 예제나 오류를 무조건 복사하도록 강제하지 않는다.

별도 에이전트가 배포 자산만으로 작업 절차를 찾는 네 시나리오도 확인했다.

| 요청 | target에서 확인한 원문 의무 | 결과 |
| --- | --- | --- |
| JDC List 구현 | registry/source closure, 페이지 geometry·scroll, 300ms debounce·0.6초 loading, Activity·메뉴별 view 보존, 상태·접근성 | 보존 |
| page query/draft 타입 리팩터링 | page-kind의 목적별 `type/*.t.ts`, DTO/domain 분리, colocated Props, 실제 공유 근거·type import 의존 방향 | 보존 |
| 메뉴 권한/API 인증 변경 | AccessKey/Bearer 조건·명시 Authorization, 메뉴 roots adapter·MenuActionPolicy, route CRUD·visibility/permission index·fallback·삭제 복구 | 보존 |
| UI 수정 후 검증·PR | 원본 조건부 검증 순서, 현재 Git/gh/template/ruleset·Issue/Closes·전체 base diff, 요청된 단계의 권한과 증거 | 보존 |

원본 architecture의 Header 음수 margin 설명과 상세 pattern의 금지·1120px wrapper 정렬은
원문 자체에 존재하는 상충 설명이다. snapshot을 임의 수정하지 않았으며 실제 구현 시 상세 pattern과
현재 제품을 대조해 해소해야 한다. 지침 전송의 동등성을 원본 문서 자체의 무오류로 해석하지 않는다.

정적·자동 검증 결과:

- `npm run verify`: 로컬 문서 링크, 공통 컴포넌트 51종, 스킬 10종,
  지원 역할/솔루션 7조합, 확장 schema 4개, 원문 591개와 namespace 격리 통과.
- `npm test`: 12/12 통과. 원문 전수 복원, 변조·경로 탈출·다른 솔루션 거절,
  기존 공통 계약 독립성, 첫 도입의 JDC 55종 registry 진단을 포함한다.
- skill-creator `quick_validate.py`: 공통 7종과 JDC 고유 3종, 총 10종 통과.
- `node docs/jdc/load-contract.mjs --verify-only`: 원문 전체 무결성 통과.

[실제 TeamAI 전달 검사](./jdc-delivery-parity.md)도 통과했다. 격리 HOME·임시 Git 원본으로
8개 case에서 `init → pull → session-start hook`을 실행하고, 최종 안내 수정 후 8개 제품에
다시 pull하여 전체 문서 mirror bytes를 대조했다. 두 JDC 제품에서 loader 6회·원문 591개 전수
검사를 통과했고, Codex·Claude 동시 활성화 중 기존 `.agents`·`.claude`의 원본 3종씩을 보존했다.
일반 frontend/backend 6조합의 namespace 격리와 빈 제품·잘못된 솔루션의 진단도 통과했다.

따라서 **명시한 `frontend-jdc` + `cmp` 조합의 동일 지침·절차 입력 전달은 PASS**다.
이 결과는 로컬 배포 fixture 검증이며 GitHub 원격 게시나 팀원 계정의 접근 권한을 검증한 것은 아니다.

## 적용 기준

처음 받는 사용자는 `../docs/jdc/README.md` (당시 JDC 실행 문서)와
[도입 명령](../docs/common/onboarding.md)의 `frontend-jdc` + `cmp` 조합을 사용한다.
일반 `frontend` + `cmp` 또는 JSON profile만 선택하는 것으로 JDC 스킬까지 전달되지는 않는다.

이 감사는 같은 지침·절차 입력을 전달하는 범위다. 실제 제품의 동작·외형 검증과 동일 AI 산출물의
byte 보장을 뜻하지 않는다. JDC `reference`는 문서 계약 선택이고 제품 `active`는 실제 검증 후의
채택 상태다. 원본 저장소와 실제 사용자 홈에는 설치·수정하지 않았으며 원격 게시도 하지 않았다.
