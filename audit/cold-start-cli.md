# TeamAI 0.27.0 실제 CLI 초기 도입 검증

검증일: 2026-10-20. 실행판은 npm `teamai-cli@0.27.0`이다. 별도 임시 디렉터리의 npm prefix에
`--ignore-scripts --package-lock=false --no-audit --no-fund`로 설치했다. 실제 CLI의
`init`, `pull`, `hook-dispatch session-start --tool codex`를 실행했다.
이 문서는 작성 저장소 전용 감사 자료이며 TeamAI docs namespace로 배포하지 않는다.

## 검증 범위와 격리

- 각 조합은 `.git`만 초기화한 빈 제품 디렉터리와 독립된 임시 home/tmp/config/cache에서 시작했다.
  `.codex/skills`나 TeamAI 사용자 설정을 미리 만들지 않았다.
- 대상 자산은 `docs`, `skills`, `rules`, `manifest`, `teamai.yaml`만 임시 저장소로 복사했다.
  `audit`, `.git`, `node_modules`, `.teamai`, `.DS_Store`는 자산 snapshot에서 제외했다.
- 임시 자산 저장소에만 commit하고 임시 bare Git 저장소를 만들었다. 실제 제품·원본·팀 저장소에는
  commit·push·설정 변경을 하지 않았다.
- Git identity와 URL rewrite는 임시 `GIT_CONFIG_GLOBAL`에만 기록했다. 인증 prompt는 차단하고
  production 인증 token을 CLI 환경에 전달하지 않았다.
- 초기화 대상은 synthetic HTTPS 주소이며 Git의 `url.<file://임시bare>.insteadOf`로 모든 Git
  전송을 로컬 bare 저장소에 연결했다. 실제 TeamAI 설정의 `provider: github`와 구분해
  실행 명령에는 `--provider git`를 명시했다.
- 사용자 도구 설정의 생성·신뢰 기록은 전부 각 사례의 임시 home 안에서만 일어났다.

TeamAI의 generic Git parser는 bare 저장소 절대경로를 `init` 입력으로 받지 않았다. 해당 입력은
`Invalid Git repo URL`로 종료했다. 위 URL rewrite 방식은 실제 CLI의 URL 처리·Git clone·등록·동기화를
수행하면서 Git 호스트에 대한 네트워크 쓰기를 피하기 위한 테스트 설정이다.

## 실행 결과

최종 편집 후 다시 검증한 자산 snapshot의 임시 commit은 `813eea9990155a5bc52d7672a1ec0f5120ff1fea`다.
이는 공용 원본 저장소의 commit이나 원격 게시 상태를 뜻하지 않는다.
초기 검증 사례의 제품·home을 재사용하지 않고 6개 사례를 모두 새로운 디렉터리에서 다시 시작했다.

| 역할 | 솔루션 | init / pull / hook | 전달 docs | 팀 공용 skill | 실제 hook context의 rule |
| --- | --- | --- | ---: | ---: | ---: |
| frontend | cmp | 모두 exit 0 | 559 | 7 | 3 |
| frontend | paas | 모두 exit 0 | 557 | 7 | 3 |
| frontend | agent-hub | 모두 exit 0 | 557 | 7 | 3 |
| backend | cmp | 모두 exit 0 | 14 | 0 | 3 |
| backend | paas | 모두 exit 0 | 12 | 0 | 3 |
| backend | agent-hub | 모두 exit 0 | 12 | 0 | 3 |

모든 조합에는 TeamAI 자체 내장 `teamai` skill이 별도로 1개 설치됐다. 따라서 backend의 팀 공용 skill이
0개라는 결과는 설치 디렉터리가 비어 있다는 뜻이 아니라 frontend 스킬을 받지 않았다는 뜻이다.

실제 전달 파일을 다음 기준으로 확인했다.

- docs namespace는 정확히 `common + 해당 역할 + 선택 솔루션`이었다. 전체 상대경로 목록과 각 파일의
  bytes를 임시 자산 snapshot과 대조했다.
- frontend 공용 skill 7종의 설치와 `SKILL.md` bytes를 원본 snapshot과 대조했다.
- Codex SessionStart hook dispatcher의 JSON `additionalContext`에 common·해당 역할·선택 솔루션
  rule 본문이 전부 있고, 다른 역할·솔루션 rule 제목은 없는 것을 확인했다.
- `audit`는 전달되지 않았다. PaaS·Agent Hub에는 CMP namespace, JDC profile 폴더와
  `observed-design.json`이 전달되지 않았다.
- 전달된 6개 mirror의 Markdown 상대링크에서 없는 대상은 모두 0개였다.
- `frontend + paas`, `backend + cmp`는 실제 `teamai doctor`도 exit 0, `All checks passed`였다.

## 첫 사용 준비 상태 진단

새 frontend + PaaS 제품에 실제 배포된 Node 전용 진단 파일을 그대로 실행했다.
제품에는 `.aifrica/frontend.json`, 구현 source·public export, 제품 token·architecture mapping을
추가하지 않은 상태다.

```bash
node <product>/.teamai/docs/frontend/contracts/check-first-use.mjs \
  --solution paas --product-root <product> --components Button --strict
```

진단은 **exit 1**로 끝났고, 최상위 JSON 필드는 다음과 같았다.

```json
{
  "mappingInputsPresent": false,
  "visualParityVerified": false,
  "runtimeParityVerified": false
}
```

`distributed-documents`는 pass였다. 로컬 채택 파일, architecture/componentRegistry/designTokens,
Button과 그 dependency인 Icon의 제품 mapping은 missing으로 판정했다. 문서를 전달받았다는 사실만으로
실제 제품 구현·모양·동작이 준비됐다고 잘못 판정하지 않는 것을 확인한 예상 결과다.
이 결과는 제품 UI 구현 검증 성공을 뜻하지 않는다.

## 실제 설정과 경로

0.27.0의 project scope 로컬 설정은 다음 partition 아래에 생성됐다.

```text
<isolated-home>/.teamai/projects/<canonical-product-path-slug>-<hash>/config.yaml
```

`init`의 첫 안내에 제품 `.teamai/config.yaml`이 표시되더라도, 이번 실행에서 실제 읽고 쓴 설정은
위 partition 파일이다. 사례별로 다음 필드가 명시됐다.

```yaml
provider: git
scope: project
projectRoot: <canonical-product-directory>
primaryRole: frontend
additionalRoles: []
resourceProfileVersion: 1
projects: [paas]
enabledAgents: [codex]
disabledAgents: []
repo:
  localPath: <partition-directory>/team-repo
  remote: https://teamai-sandbox.invalid/aifrica/teamai.git
```

위 YAML은 관찰한 설정 필드를 설명한 것으로 직접 실행하는 설정 파일이 아니다. backend 사례에서는
`primaryRole: backend`, 각 사례에서는 해당 솔루션 하나가 `projects`에 기록됐다.

| 항목 | 실제 위치·처리 |
| --- | --- |
| Skill | `<product>/.codex/skills/<skill-name>/SKILL.md` |
| Docs | `<product>/.teamai/docs/<namespace>/...` |
| Codex project rule | `.codex/rules`에 파일을 쓰는 대신 SessionStart hook의 `additionalContext`에 전달 |
| Codex hook 설정 | `<isolated-home>/.codex/hooks.json` |
| Hook 신뢰 | `<isolated-home>/.codex/config.toml`의 `hooks.state` 아래 event별 `trusted_hash` 8개 |

project scope에서도 Codex hook과 신뢰 설정은 사용자 도구 root에 설치됐다. 테스트에서는 사용자 root가
사례별 임시 home으로 격리됐다. 제품 scope라는 이유만으로 hook 설정까지 제품 디렉터리에만 쓰인다고
설명하지 않는다.

설치된 SessionStart hook command는 `teamai hook-dispatch session-start --tool codex`를 호출한다.
이번 검증은 실제 dispatcher를 CLI로 직접 실행해 출력 계약을 확인했다. Codex 앱을 새로 열어서
자동 hook 호출까지 확인한 테스트는 아니다.

## 원격 게시와 재현 조건

생산 저장소 주소에 대해 인증 prompt를 차단한 read-only `git ls-remote`는 exit 0이었고,
광고된 ref 출력은 0건이었다. 이 관찰 시점에는 참여자가 clone할 게시된 branch/ref가 없었다.
로컬 전달 검증 성공을 생산 원격에 게시됐다는 뜻으로 해석하지 않는다.

재현 harness는 npm 설치와 분리해 작성했다. 이미 준비한 npm 실행판과 임시 Git URL rewrite를 사용하므로
6개 사례 실행 자체는 외부 패키지 다운로드나 Git 호스트 접근을 요구하지 않는다.

```text
<SANDBOX>/run-cases-final.py
<SANDBOX>/final-snapshot.txt
<SANDBOX>/final-six-case-results.json
<SANDBOX>/final-mirror-link-results.json
<SANDBOX>/cases-final/<role>-<solution>/{init,pull,session-start}.{stdout,stderr}.log
<SANDBOX>/cases-final/{frontend-paas,backend-cmp}/doctor.{stdout,stderr}.log
<SANDBOX>/cases-final/frontend-paas/first-use-checker.{stdout,stderr}.log
```

위 경로는 해당 세션의 임시 실행 증거 위치이며 팀 공용 실행 명령이 아니다. 임시 harness는 자산 snapshot,
local bare 저장소, Git URL rewrite와 격리 환경을 먼저 준비해야 한다. 실제 사용자 onboarding은
`docs/common/onboarding.md`의 게시 후 참여 절차를 따른다.
