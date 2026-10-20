> **폐기된 구조의 과거 검증 기록**
> 고객별 전용 역할이 필요 없다는 사용자 정정에 따라 이 문서의 배포 구조는 제거했다.
> 현재 적용 기준은 [공용 frontend + 솔루션 구조](./frontend-solution-cleanup.md)를 따른다.

# JDC 원본 계약 전달 검증

확인일: 2026-10-20. 실제 npm 배포본 `teamai-cli@0.27.0`으로 `init → pull → session-start hook`을
실행하고, 배포된 loader로 원본 스킬·문서의 무결성과 경로 관계를 확인했다.
검증 대상은 같은 지침·절차 입력의 전달이다. 완성 UI나 AI 산출물의 byte 일치를 검증한 기록은 아니다.

## 입력과 실행 범위

- 원본 commit: `3f1da2942839cabf5a5ef56fd1f30d68fde7f4d4`.
- 원문 inventory SHA-256: `71be4217275a9285cbf478a8ab1af70396912ee5e5bae85f249eb8a52d47c697`.
- 최종 로컬 배포 snapshot: `330c35a2f08045a50c0029e8bf39c4dccf914c00`.
- `../docs/jdc/contract-pack.json` (당시 원문 pack), `../docs/jdc/source-manifest.json` (당시 source manifest),
  `../docs/jdc/load-contract.mjs` (당시 Node 전용 loader)를 사용했다.

별도의 임시 Git 원본·bare 저장소와 case별 HOME·TMPDIR·Git 설정을 만들었다. CLI의 테스트 URL은
그 로컬 bare에만 연결했다. 기존 제품 fixture에는 실제 원본의 `.agents/skills`와 `.claude/skills`에 있는
세 스킬만 복사했다. 원본 제품, 사용자 HOME, 실제 원격 저장소를 변경하지 않았다.

초기 snapshot 검증 후 `cmp/README.md`의 reference 선택 설명 한 곳이 보완됐다. 해당 파일만
로컬 snapshot에 추가하고 여덟 제품에서 다시 `pull`하여 전체 문서 mirror를 최종 자산과 대조했다.
Finder의 `.DS_Store`는 CLI의 hidden 파일 제외 정책에 따라 배포 기대 집합에서 제외했다.

## 실제 CLI 결과

각 case에서 init·pull·Codex session-start hook의 종료 코드는 모두 0이었다. 선택한 문서 namespace의
전체 파일명과 bytes, 배포 스킬의 bytes, hook의 회사·역할·솔루션 규칙을 확인했다.

| 제품 fixture | 역할 | 프로젝트 | 배포 문서 | 팀 스킬 | 결과 |
| --- | --- | --- | ---: | ---: | --- |
| 빈 제품 | frontend-jdc | cmp | 564 | 고유 JDC 3종 | 통과 |
| 기존 원본 스킬 보유 제품 | frontend-jdc | cmp | 564 | 고유 JDC 3종 | 통과 |
| 빈 제품 | frontend | cmp | 560 | 공통 7종 | 통과 |
| 빈 제품 | frontend | paas | 557 | 공통 7종 | 통과 |
| 빈 제품 | frontend | agent-hub | 557 | 공통 7종 | 통과 |
| 빈 제품 | backend | cmp | 15 | 0 | 통과 |
| 빈 제품 | backend | paas | 12 | 0 | 통과 |
| 빈 제품 | backend | agent-hub | 12 | 0 | 통과 |

각 도구의 기본 `teamai` 스킬은 팀 스킬 수에서 제외했다. JDC는 `common`, `frontend`, `jdc`, `cmp`
문서와 `common`, `jdc`, `cmp` 규칙을 받았다. 공통 `frontend` 스킬이나 규칙을 함께 배포하지 않았다.
일반 frontend와 backend 여섯 조합에는 새 `docs/jdc` 원문 pack·JDC 고유 스킬·JDC 규칙이 전달되지 않았다.
기존 `cmp/profiles/jdc` 관찰·reference 설명은 CMP 문서의 일부로 남는다.

기존 스킬 fixture에서는 `--agent codex,claude`를 동시에 사용했다. 두 도구에 JDC 고유 스킬 3종이
실제 배포되는 동안 `.agents`와 `.claude`의 원본 3종, 합계 6개 `SKILL.md`와 각 원본 디렉터리의
파일 집합·SHA-256이 유지됐다. 최종 README 갱신 pull 이후에도 같은 보존 검사를 통과했다.

## 원문 복원과 탐색 관계

두 JDC 제품에서 배포된 loader의 `--verify-only`와 원본 스킬 3종 각각의 load를 실행했다.
총 여섯 번의 복원마다 591개 파일을 실제 원본 파일·pack·manifest와 전수 대조했다.
모든 경로·content bytes·SHA-256·inventory hash가 일치했다.

- 선택한 `skillPath`와 원본 3종은 복원한 `.agents/skills`의 해당 원문을 가리켰다.
- 모든 `contractRoot`는 격리 TMPDIR 안이면서 제품 밖에 생성됐다.
- `productRoot`와 `executionRoot`는 실제 fixture 제품을 가리켰다.
- loader 실행 전후 제품 파일 집합과 bytes가 같았다. 제품이나 개인 홈에 원본 스킬을 설치하지 않았다.
- snapshot에는 제품 `src`나 실행할 `.mjs` 도구가 없었다. 원문 검증 명령은 현재 제품에서
  실제 존재하는 도구로 실행하도록 README·wrapper·loader가 경계를 명시한다.

원문 Markdown의 상대 링크 1,657건도 대조했다. `docs`·`.agents` 계약 문서 링크의 pack 누락은 0건이다.
pack 밖의 151건은 현재 제품으로 해석해야 하는 `src` 148건, `public` 2건, `Dockerfile` 1건이다.
`../docs/jdc/README.md` (당시 JDC README)의 두 root 대응이 이 경계를 설명한다.

## 빈 제품과 적용 경계

실제 배포된 first-use 진단 도구를 source가 없는 빈 제품에서 `cmp`, `jdc`, `SNBV2`로 실행했다.
원문 catalog 55종을 읽었으며 `SNBV2`의 현재 제품 source mapping은 `missing`이었다.
`mappingInputsPresent`, `runtimeParityVerified`, `visualParityVerified`는 모두 false였다.
과거 registry의 `implemented`를 현재 제품 구현의 증거로 바꾸지 않았다.

배포된 loader가 명시적인 `--solution paas`, 로컬 채택 파일의 다른 solution, 다른 profile을 각각
종료 코드 1로 거절하는 것도 확인했다. 이 진단 과정에서 제품 파일은 바뀌지 않았다.

읽기 전용 시나리오 감사에서는 원문 UI 헌장·docs-only-build와 wrapper·규칙을 대조했다.
문서 전용 재현은 현재 제품 directory·source·export·기존 화면을 열람하지 않는 원래 경계를 유지한다.
유지보수는 실제 제품 source/export를 확인한다. 두 모드 모두 원문 전체 읽기, task별 기술 pack,
컴포넌트 판단, 상태 소유권과 검증 순서를 유지하며 공통 요약이나 wrapper 재귀 호출로 대체하지 않는다.

TeamAI의 role/project namespace는 합집합 배포 필터다. `frontend-jdc`와 다른 솔루션을 잘못 조합하는
것을 manifest가 접근 제어로 막지는 못한다. wrapper·규칙은 적용 전에 CMP 선택을 확인하고 타 솔루션에
적용하지 않도록 요구하며, loader는 명시적 solution과 로컬 채택 충돌을 거절한다.

원문 GitHub 계약에는 현재 사용자·제품 지침과 회사 Git 규약이 우선하는 차이를 명시했다.
설치된 스킬이나 원문 읽기는 원격 생성·push·댓글·병합·삭제 권한을 추가하지 않는다.

## 판정 범위

`frontend-jdc` + `cmp`는 기존 원본 스킬을 보존하면서 같은 원문 스킬·문서와 탐색 관계를 전달한다.
일반 frontend 배포는 공통 계약을 유지한다. 실제 제품 source/export·자산·API·UI 렌더와 상태별 동작의
채택 검증은 이 전달 검사와 별개의 작업이며, 이 기록에서 제품 `active`나 runtime·외형 동등성을 선언하지 않는다.
