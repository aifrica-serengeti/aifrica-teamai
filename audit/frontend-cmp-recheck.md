# frontend + cmp 적용 재검증

이 기록은 공용 묶음을 채택한 CMP의 원본 대비 검증이다. 현재는 frontend 기본 역할에 공용을
강제하지 않으며, 동일 구성을 받으려면 `frontend` + 추가 역할 `frontend-common` + 프로젝트 `cmp`를
선택한다. 현재 켜기·끄기 동작은 [공용 묶음 검증](./frontend-bundle-toggle.md)과
[선택 안내](../docs/common/frontend-bundle.md)를 따른다. 아래 수치와 로그는 당시 snapshot의 기록이다.
추가로 발견한 shell 구현 문서 누락과 직접 진입 조건은 [서브 에이전트 최종 점검](./frontend-final-review.md)에서
보완했으며 현재 판정은 해당 기록을 따른다.

검사일: 2026-10-20. 읽기 전용 원본 commit은
`3f1da2942839cabf5a5ef56fd1f30d68fde7f4d4`다.
대상은 `frontend` 역할 + `cmp` 프로젝트의 배포 자산이며 고객 전용 역할·스킬·profile·원문 loader를 사용하지 않는다.

## 발견한 문제와 보완

1. 공용 UI 스킬에서 작업 헌장·React/Next index·선택 pack의 전체 읽기 의무가 축약돼 있었다.
   전체 읽기·선택 경로 기록을 복원했다. 선택 솔루션의 추가 계약과 검증 순서도 명시적으로 적용한다.
2. standalone refactor/design에서 공통의 참조 배치를 CMP의 선택 규칙으로 해석할 여지가 있었다.
   배치 결정 전에 CMP 계약을 읽고 page-kind `type/*.t.ts`·Dto/I/T·colocated Props·의존 방향을 적용하도록 연결했다.
3. 원본 55종 중 shell 4종이 배포 문서에서 빠져 있었다. 공통 51종에 CMP의 SNBV1·SNBV2·GlobalHeaderV1·
   GlobalHeaderV2를 더하고 6개 필수 문서·Props·상태·접근성·스타일 adapter·검증 matrix를 연결했다.
4. 첫 도입 진단은 공통 registry만 읽었다. 선택 솔루션 registry를 합성해 CMP에서 55종의 dependency closure를
   찾고 PaaS·Agent Hub에는 추가 4종이 적용되지 않도록 보완했다. 중복 id·존재하지 않는 dependency는 오류다.
5. 공용 스킬 3종이 원본과 같은 이름이었다. TeamAI가 기존 `.agents`를 덮어써 `.claude`와의 동기화 검사를
   깨뜨리는 문제를 피하도록 frontend 공용 이름으로 바꿨다. 역할·프로젝트는 그대로다.
6. 모든 공용 스킬의 위치 안내가 모드 선택 전 실제 source 조사를 요구할 수 있었다. 유지보수와 문서 전용
   재현을 먼저 구분하고 문서 전용 모드의 source/export/기존 화면 조사 금지 경계를 유지하도록 고쳤다.

## 원본 절차의 적용 위치

| 원본 스킬 | 배포되는 공용 스킬 | 추가 기준 |
| --- | --- | --- |
| `aifrica-ui-workflow` | `aifrica-frontend-workflow` | 공통 헌장·기술·디자인 + CMP frontend/page 계약 |
| `aifrica-ui-architecture-refactor` | `aifrica-frontend-architecture-refactor` | 공통 상세 inventory·배치·경계 절차 + CMP 타입·모듈 규칙 |
| `aifrica-ui-github-workflow` | `aifrica-frontend-github-workflow` | 원본 기반 상세 lifecycle·workflow 문서 + 회사·현재 제품 Git 규약 |

디자인·페이지 패턴·신규 설계·기술 갱신의 나머지 공용 4종을 합쳐 frontend 스킬은 총 7종이다.
제품 원본 이름은 그대로 두며 공용 스킬의 cross-skill 참조와 hook 안내는 새 이름을 사용한다.

- [CMP 추가 계약](../docs/cmp/frontend-contract.md): stack·Dto/I/T·page-kind·runtime·API·메뉴 권한·검증 순서.
- [CMP 페이지 적용](../docs/cmp/page-patterns.md): 1072/1120px 정렬·breakpoint·table/card pagination·
  300ms debounce·목록 수명·0.6초 loading baseline·Create 후속 upload·Detail original/draft.
- [CMP 디자인 확장](../docs/cmp/design/README.md): 4종 shell 계약과 공통 dependency 연결.
- [기계 판독 coverage](./frontend-cmp-source-coverage.json): 원본 55개 id가 공통 51 + CMP 4로 모두 연결되고
  각 6개 필수 문서와 declared dependency가 존재한다. Header v1은 실제 사용하는 Avatar/Icon/Chip도 명시했다.
- 기술 지식 31파일에 대응 경로가 존재한다. 상세 기술 pack 등을 포함한 25파일은 원본과 같은 bytes다.
  나머지 6파일은 허브/헌장·CSS adapter·import 경로·sources metadata·갱신 정책의 공통화/경로 변경을 포함한다.

## 작업 시나리오 대조

| 요청 | 원본에서 유지해야 할 판단 | frontend + cmp에서의 경로 |
| --- | --- | --- |
| List 추가 | 버전/관련 pack 전체 읽기, registry preflight, state owner, query·scroll 수명, 상태 matrix | workflow → 공통 패턴 → CMP page adapter |
| query/draft 타입 이동 | 모든 caller/export/type import 조사, page kind type·DTO 분리, 실제 공유 근거, 동작 보존 | refactor 상세 절차 → CMP 타입 표·실제 제품 architecture |
| 인증·메뉴 권한 수정 | 명시 Authorization 보존, AccessKey 조건, menu adapter, visibility/permission 분리, read-only 실패 경로 | CMP API/runtime/메뉴 계약 + 실제 제품 source |
| Header/SNB 변경 | 같은 부모 collapsed state, branch-open/active leaf 구분, portal/focus/scroll, 실제 Props 확인 | 공통 + CMP registry → shell 정의·행동·접근성·검증 |
| UI 수정 후 PR | 조건부 sync→guidelines→제품 검사, 전체 base diff·현재 HEAD·review/CI·권한 단계 | CMP 검증 순서 + 공용 GitHub lifecycle·회사 규약 |
| 문서 전용 구현 | 기존 source·export·화면을 열람하지 않고 문서 API/closure로 구현 | 공용 docs-only-build + 선택 CMP 문서, 별도 원문 실행기 없음 |

## 실제 배포 검사

`teamai-cli@0.27.0` 실행판과 별도 임시 Git 원본·로컬 bare·HOME/TMPDIR/Git 설정으로 검증했다.
테스트 HTTPS URL은 그 로컬 bare로만 연결하며 실제 사용자 홈·제품 원본·생산 원격에는 설치하거나 쓰지 않았다.

일반 역할/솔루션 6조합과 원본 `.agents`/`.claude` 스킬을 가진 CMP fixture 2개(Codex 단독,
Codex·Claude 동시)를 사용했다. 각각 `init → pull → session-start hook`을 실행하고 모든 mirror 파일의
집합·SHA-256, 배포 스킬 전체 파일·hook 규칙을 대조했다. CMP first-use 진단은 원본 source나 npm 의존성
없이 배포된 파일만으로 55종 catalog와 SNB/Header의 공통 dependency를 읽었다.

기존 스킬 fixture는 원본 3종씩, 두 host 합계 6개 파일과 파일 집합을 보존했다.
원본 `sync-agent-skills.mjs --check`를 복사해 설치 전후 실행했고 양쪽 모두 종료 코드 0이었다.
고객 전용 namespace·고유 스킬·audit 원문은 전달되지 않았다. PaaS·Agent Hub의 진단은 CMP shell id를 거절했다.

[실행 결과 JSON](./frontend-cmp-delivery-results.json): 8사례 모두 init/pull/hook 종료 코드 0.
마지막 상태 token adapter 설명을 반영한 snapshot
`a07e6d14d0112884b17dc1fa26b553bd20b54da2`로 8개 제품을 다시 pull하고 전체 mirror SHA를 재대조했다.
CMP는 문서 585파일·공용 스킬 7종·55종 catalog를 받았다. 신규 제품 진단의 구현/runtime/외형 상태는
검증되지 않았다고 표시하며 과거 구현 상태를 성공으로 바꾸지 않았다.

추가로 [원본 public export 관찰](./cmp-source-export-observation.json)을 읽기 전용 TypeScript API로 확인했다.
원본 registry가 implemented로 기록한 32종은 source 파일과 public entry의 해당 export가 모두 존재했다.
AsyncContentState·Notification은 단일 파일만 보면 모든 export가 나오지 않으므로 실제 public entry까지
따라가야 한다. emit·캐시·source 수정 없이 검사했으며 Props/runtime/build 검증을 대신하지 않는다.

자동 검사 결과는 `npm run verify` 통과(공통 51 + CMP 4 계약, 스킬 7종, 역할/솔루션 6조합,
extension schema 3개, 문서 링크·dependency graph·namespace 격리), `npm test` 10/10 통과,
skill-creator frontmatter 검증 7/7 통과다.

## 의도적으로 동일하게 만들지 않은 범위

- 고객 브랜드·로고 checksum·메뉴/계정 fixture·도메인 payload를 기본값으로 배포하지 않는다.
  shell의 상태·Props·접근성은 보존하고 색은 제품 semantic token으로 연결한다.
- 공통 API와 CMP shell의 치수는 참조 baseline이다. 제품이 다른 값을 채택하면 실제 구현·검증과 함께 기록한다.
- 과거 registry의 `implemented`·source 경로를 상속하지 않는다. 현재 구현은 실제 제품에서 확인한다.
  shared extension은 `draft`이며 제품 채택의 `active`·런타임 검증과 구분한다.
- GitHub 절차는 회사 PR base/본문/Issue 연결과 현재 사용자·제품 규약을 우선한다. 원본의 portable
  fallback branch/일률적 Issue gate/외부 답변 권한과 차이가 있으며 현재 제품의 명시 규칙은 계속 적용한다.
- 복사한 원문 pack을 실행하는 동등성 검사가 아니다. 공통 및 CMP 계약의 발견·적용 경로와
  유지해야 할 절차를 대조한 결과다. 실제 제품 UI/네트워크/렌더 또는 생성 코드 byte 동일성은 판정하지 않았다.

위 범위에서 `frontend + cmp`만으로 공용 절차와 필요한 CMP 가이드라인을 찾고 적용할 수 있다.
