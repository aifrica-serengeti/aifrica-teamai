# 검증 기록

확인일: 2026-10-20 (Asia/Seoul).

이 문서는 최초 구성 시점의 기록이다. 이후 실시한 실행·첫 사용자 재검증은
[첫 사용자 재검증](./first-use-recheck.md)과 [실제 CLI 기록](./cold-start-cli.md)을 확인한다.

## 실행 결과

- `npm run verify`: 상대링크 2,056개, 컴포넌트 참조 계약 51개와 dependency graph,
  필수 문서 306개, 공용 스킬 7종, 역할×솔루션 6조합, 확장 JSON 3개 및 docs namespace 격리 통과.
  저자 원본에서만 존재하는 파일을 TeamAI mirror에 링크하지 않는지도 확인한다.
- `npm test`: 5개 테스트 통과. 역할 격리, 솔루션 분리, 선택하지 않은 테마/profile 비적용,
  nested merge/배열 교체, schema 오타/잘못된 구현 선언 거부, PaaS 로컬 채택과 경로 확인을 검증했다.
- 스킬 7종에 skill-creator `quick_validate.py`를 실행해 통과했다.
- 실제 npm `teamai-cli@0.27.0` 번들의 schema로 teamai.yaml, roles.yaml, projects.yaml을 파싱해 모두 통과했다.
  운영 CLI init/pull, 원격 게시, 사용자 도구 설치는 실행하지 않았다.
- 임시 PaaS 제품에서 authoring docs와 `.teamai/docs/{common,frontend,paas}` mirror를 각각 읽고
  primary mapping·List/Create 폭·실제 Button source/export 경로를 합성했다. 두 결과가 일치하고
  작업에 필요한 논리 문서 13개의 경로가 모두 존재했다. 임시 제품은 실제 서비스 구현이 아니다.

이 작업의 분류는 frontend 문서/스킬 공용화다. 소비 제품의 source·배포·브라우저 동작은 변경하지
않았으므로 제품 typecheck/build나 화면 검증을 수행한 것으로 보고하지 않는다.

## 원본 동시 변경 관찰

이 작업의 파일 쓰기는 aifrica-teamai와 임시 검증 디렉터리에 한정했다. serengeti-cmp에 쓰기,
checkout, pull, commit 명령을 실행하지 않았다.

최초 inventory의 HEAD는 `29f7019c33b7c8b9e66d6c3253bad7428b722049`이며 609개 파일의 SHA-256을
캡처했다. 디자인 조사 기록에는 조사 당시 `77255b90832ca1c6114dd32c02631c44e345522c`도 관찰된다.
종료 전 확인에서는 HEAD가 `f7585a400a8847e72d0716a5860bc47246248d8d`로 바뀌었고 working tree는 clean이었다.
최초 hash와 비교한 609개 중 `docs/design/api-error-notifications.md` 1개가 달랐다.
Git 기록에는 해당 HEAD가 PR #585 병합 커밋으로 나타났다. 이 동시 변경을 되돌리거나 제품에
이 공용화를 역으로 적용하지 않았다. 원본 전체가 작업 내내 같은 commit이었다고 주장하지 않는다.

현재 추출물의 근거는 개별 감사 기록과 파일 hash다. 이후 원본 변경을 자동 동기화하거나
미확인 JDC 설정을 CMP 공통 기본값으로 승격하지 않는다.
