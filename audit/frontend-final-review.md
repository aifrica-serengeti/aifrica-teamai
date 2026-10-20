# Frontend 공용 + CMP 최종 독립 점검

검사일: 2026-10-20. 세 서브 에이전트가 원본 대비 계약, 공용 비활성화, 실제 배포를 나누어 점검했다.
원본은 `project.serengeti-cmp` commit `43648689aa3efef214118a69dde5eafdac30a338`이며 읽기 전용으로 사용했다.
추출 기준 `3f1da294` 이후 해당 스킬·기술·디자인·아키텍처 지침에는 변경이 없었다.

## 판정과 적용 조건

- **공용 + CMP:** 원본의 workflow/refactor/GitHub 절차, 기술 pack 읽기 계약, 컴포넌트 55종
  (공용 51 + CMP shell 4), List/Create/Detail의 상태·접근성·CMP 연결 계약을 적용할 수 있다.
  공용 정책이 true일 때 `frontend-common` 기본 역할 + `cmp` 프로젝트만으로 전체 묶음을 받는다.
  `frontend` 기본 역할에 `frontend-common`을 추가하는 방식도 같은 문서·스킬을 받는다.
- **공용 끄기:** 로컬 `inheritCommon: false`와 실제 역할 선택을 맞추고 `pull --force`하면 공용
  스킬·frontend 문서·공용 규칙을 해제한다. 공용 없는 mirror에서 공용 registry·React/Next·디자인·
  아키텍처 절차를 요구하지 않는다. 회사 공통과 제품 자체 지침은 유지한다.
- **제품 결과:** 위 판정은 지침과 배포의 적용 가능성이다. 현재 공유 설정은 draft이며 제품의 실제
  source/export·token·브랜드·locale mapping과 렌더·runtime 검증을 완료했다는 의미가 아니다.

## 발견한 누락과 수정

1. 항상 배포되는 회사 공통 Git 문서 2곳이 공용 frontend workflow를 무조건 요구했다.
   공용 채택 조건을 추가하고 독립 제품은 자체 Git 템플릿·검증 절차를 따르게 했다.
2. CMP 상세 계약·페이지·디자인·개별 shell 문서의 직접 진입 조건을 보완했다.
   새 구현 문서에도 가드를 두고 남은 공용 사본의 작업 헌장·SKILL 초기 opt-out을 확인했다.
3. SNBV2가 필수 canonical source를 요구하면서 전달하지 않았고 SNBV1의 CSS adapter·검증 gate
   참조도 닫히지 않았다. shell 4종의 구현 자료 13개를 복원하고 실제 진입 링크를 연결했다.
   [원본/최종 hash와 대응 경로](./frontend-final-review-implementation-coverage.json)를 기록했다.
4. 복원 과정에서 미정의 SNBV1 helper·controlled state·favorites, 미지원 iconColor prop,
   공용 Menu의 실제 DropdownMenu* export와 ScrollArea metrics API의 차이를 보완했다.
   브랜드·계정·고정 palette는 제품 입력과 semantic adapter로 분리하고 interaction·geometry는 유지했다.
5. SNBV2 utility slot이 팝업을 열면서 route까지 이동할 수 있어 custom trigger의 route handler를
   제거했다. trigger를 그대로 반환하면 기존 선택 동작을 유지하며, 실제 Radix Popover 예제를 연결했다.
6. 원본 DatePicker의 KR·일요일 강조 표시를 재현할 입력을 CMP 호환 계약에 명시했다.
   공용 기본 국가를 만들지 않고 다른 locale은 제품 adapter에서 선택한다.

## 실행 근거

실제 `teamai-cli@0.27.0`의 init·roles·projects·pull·hook을 별도 임시 HOME/TMPDIR/Git 원본·bare에서
실행했다. Git transport만 로컬로 격리했으며 생산 GitHub 인증·게시를 검사한 것은 아니다.

- standalone `frontend-common + cmp`가 공통/CMP 문서 600개와 공용 7종의 전체 파일 hash를 받았다.
- frontend-common 단독 / frontend 기본 / backend / frontend+frontend-common × 기존 솔루션 3개의
  12조합에서 문서 namespace·전체 hash·선택되지 않은 규칙 정리를 확인했다.
- 실제 원본의 `.agents`·`.claude` 기존 스킬 3종씩, 전체 6개 tree를 임시 제품에 복사해 보존했다.
  원본 `sync-agent-skills.mjs --check`도 설치 전·도입 후·공용 해제 후에 통과했다.
- Codex의 생성된 실제 SessionStart command 출력과 Claude 규칙 사본을 확인했다.
  끄면 공용 규칙이 없어지고 공용 관리 스킬도 정리된다. 로컬 수정한 관리 스킬 한 사본은 CLI가
  보존했으며 초기 opt-out을 적용한다. 기존 제품 자체 스킬도 유지한다.

[최종 native 실행 결과](./frontend-final-review-native-results.json)에 snapshot·선택값·hash·보존 결과와
실제 hook/mirror 검사 근거를 기록했다. 실제 Codex/Claude 모델 세션을 통한 제품 UI 실행은 포함하지 않는다.

SNBV2는 문서에서 추출한 TSX·CSS·adapter 6파일과 공용 ScrollArea·Menu 문서 코드 4파일을 함께
strict typecheck했다. React/vanilla-extract와 설치된 개별 Radix DropdownMenu 타입을 사용하고,
aggregate export는 임시 adapter로 연결했다. Icon·IconButton·Tooltip 경계는 선언 stub이다.
실제 React DOM event fixture의 6개 검사는 branch/leaf 분리, utility popup 이동 방지와 fallback,
4가지 scroll boundary, 250ms handoff를 확인했다. primitive와 CSS 경계를 mock했으므로 제품의
portal·keyboard·focus·시각 동일성 검증을 대신하지 않는다.
[코드 검사 결과](./frontend-final-review-code-results.json)에 범위와 한계를 함께 기록했다.

SNBV1 펼침·접힘/favorites, GH1 계정 유무, GH2 Header는 문서 block과 단순 leaf mock으로 SSR했다.
실제 ApplicationShell 실행이나 실제 leaf 구현의 전체 typecheck로 확대하지 않는다.
전체 자산의 `npm run verify`와 자동 테스트 `npm test` 13개가 통과했다.

## 남는 도입 조건

JSON은 선택 계획이며 설치 자원을 자동 변경하지 않는다. 설정과 실제 역할을 맞추고 `pull --force` 후
파일·hook을 확인한다. CLI의 초기 관리 기록이 없는 동명 로컬 스킬은 최초 pull이 덮어쓸 수 있다.
기존 serengeti-cmp의 원본 3종은 새 공용 7종과 이름이 겹치지 않았고 실제 보존 검사도 통과했다.
다른 제품은 도입 전에 이름 충돌을 정리한다. [사용 안내](../docs/common/frontend-bundle.md)를 따른다.

고객 전용 역할·스킬과 Cheetah 등록·디자인 시스템은 만들지 않았다. 원본 저장소·사용자 HOME·생산 원격은
수정하지 않았다.

## 추가: AI의 스킬 탐색 확인

설치된 Codex CLI 0.139.0의 실제 app-server `skills/list`를 임시 HOME·제품 fixture에서 실행했다.
TeamAI 0.27.0의 기본 `.codex/skills`와 공식 문서의 `.agents/skills`를 각각 검사했고, 두 경로 모두
공용 7종이 enabled=true·오류 0개로 조회됐다. 모델 요청·추론은 실행하지 않았다.
[실제 탐색 결과](./skill-discovery-results.json)를 기록했다.

Codex의 현재 공식 권장 repository 경로는 `.agents/skills`다. `.codex/skills`의 호환성은
위 설치 버전에서 직접 확인한 결과이며 모든 미래 버전의 보장은 아니다.
[공식 OpenAI 스킬 문서](https://learn.chatgpt.com/docs/build-skills)를 따른다.

Claude Code는 공식 project 경로 `.claude/skills/<name>/SKILL.md`와 name/description 형식에 맞고
공용 7종의 실제 배포·참조 파일 보존을 확인했다. Claude 모델 세션에서 직접 스킬을 호출한 검사는
포함하지 않는다. [Claude Code 공식 스킬 문서](https://code.claude.com/docs/en/skills)를 대조했다.

Cursor·GitHub Copilot CLI·OpenCode 등은 [TeamAI 0.27.0 지원표](https://github.com/Tencent/teamai-cli/blob/v0.27.0/README.md)의
스킬 배포 지원 대상이다. 각 제품의 실제 스킬 탐색/모델 호출은 별도 실행하지 않았다.
사용 도구를 TeamAI의 --agent로 선택해야 해당 도구 경로로 배포되며, 스킬의 자동 선택은 작업과
description에 따라 달라진다. 항상 실행할 절차가 필요하면 작업 요청에 스킬 이름을 명시한다.
