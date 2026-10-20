# Aifrica TeamAI

팀에서 사용하는 AI 스킬과 개발 가이드라인을 프로젝트에 연결하는 저장소예요.
필요한 공용 스킬과 솔루션을 선택해서 Codex·Claude Code에서 사용할 수 있어요.

## 1. 처음 한 번만 준비해 주세요

Node.js 20 이상, Git, GitHub CLI(`gh`)가 설치된 환경에서 진행해 주세요.
아래 안내는 `teamai-cli@0.27.0` 기준이에요.

```bash
# TeamAI CLI를 설치합니다. 이미 같은 버전이 설치돼 있다면 생략하세요.
npm install -g teamai-cli@0.27.0

# GitHub 로그인 상태를 확인합니다.
gh auth status
```

로그인이 안 되어 있다면 아래 명령으로 인증해 주세요. 이미 로그인돼 있다면 생략하셔도 돼요.

```bash
# TeamAI가 GitHub 저장소에 접근할 수 있도록 로그인합니다.
gh auth login
```

## 2. 내 프로젝트에 적용해 보세요

**스킬을 사용할 제품 프로젝트의 Git 저장소 루트**에서 아래 명령을 실행해 주세요.
이 `aifrica-teamai` 저장소가 아니라, 실제 작업할 CMP 앱 등의 디렉터리에서 실행하시면 돼요.
같은 이름의 기존 스킬은 최초 설치 때 덮어쓸 수 있으니, 설치 전 이름을 확인해 주세요.

```bash
# Frontend 공용 스킬과 CMP 가이드를 현재 프로젝트의 Codex·Claude Code에 연결합니다.
teamai init https://github.com/aifrica-serengeti/aifrica-teamai.git \
  --role frontend-common \
  --project cmp \
  --agent codex,claude

# 선택한 스킬·규칙·문서를 프로젝트에 동기화합니다.
teamai pull --force

# 설치 경로, 스킬 전달 상태와 hook 설정을 점검합니다.
teamai doctor
```

필요에 따라 다음 옵션만 바꿔서 사용해 주세요.

| 옵션 | 의미와 선택 방법 |
| --- | --- |
| `--role frontend-common` | Frontend 공용 스킬 7종을 받습니다. 공용 없이 사용하려면 아래 해제 안내를 참고해 주세요. |
| `--project cmp` | CMP 가이드를 받습니다. PaaS는 `paas`, Agent Hub는 `agent-hub`로 바꿔 주세요. |
| `--agent codex,claude` | 두 도구에 설치합니다. 하나만 쓰면 `codex` 또는 `claude`, Cursor는 `cursor`를 지정해 주세요. |

`frontend-common`만 선택해도 공용 스킬을 받을 수 있어요. `frontend` 역할을 따로 추가할 필요는 없어요.

## 3. AI에게 작업을 요청해 보세요

설치가 끝나면 해당 프로젝트에서 새 AI 세션을 시작해 주세요.
스킬은 작업에 따라 자동으로 선택되며, 사용할 스킬을 직접 지정할 수도 있어요.

| 도구 | 스킬을 직접 지정하는 방법 |
| --- | --- |
| Codex | 메시지 앞에 `$aifrica-frontend-workflow` 입력 |
| Claude Code | 메시지 앞에 `/aifrica-frontend-workflow` 입력 |

그 뒤에 “CMP 기준으로 인스턴스 목록 화면을 구현해 줘. 기존 컴포넌트와 List 가이드를 먼저 확인해 줘.”처럼
원하는 작업을 적어 주세요.

| 스킬 | 이런 작업에 사용해요 |
| --- | --- |
| `aifrica-frontend-workflow` | 일반 UI 조사·구현·검증 |
| `aifrica-design-system` | 색상·타이포그래피·border·토큰과 컴포넌트 사용 |
| `aifrica-page-patterns` | List·Create·Detail 페이지 구현 |
| `aifrica-ui-architecture-design` | 신규 기능의 구조와 상태 소유권 설계 |
| `aifrica-frontend-architecture-refactor` | 기존 타입·모듈·의존성 리팩터링 |
| `aifrica-frontend-github-workflow` | 요청한 Issue·PR·리뷰·병합 작업 |
| `aifrica-frontend-docs` | 요청한 기술 가이드 문서 갱신 |

스킬은 기본적으로 Codex의 `.codex/skills/`, Claude Code의 `.claude/skills/`에 설치돼요.
상세 가이드는 제품의 `.teamai/docs/`에서 확인할 수 있어요.

설치되는 것은 스킬과 가이드라인이에요. 제품의 테마나 컴포넌트 코드는 실제 프로젝트에 맞춰 연결해 주세요.
처음 적용한다면 [제품 적용 안내](./docs/frontend/first-use.md)를 참고하시면 돼요.

## 4. 최신 내용 받기와 솔루션 변경

팀에서 스킬이나 가이드를 업데이트하면 **제품 프로젝트 루트**에서 실행해 주세요.

```bash
# 원격 저장소의 최신 스킬과 가이드를 다시 받습니다.
teamai pull --force

# 업데이트 후 설치 상태를 확인합니다.
teamai doctor
```

다른 솔루션으로 바꾸고 싶다면 다음처럼 변경할 수 있어요.

```bash
# 현재 프로젝트에서 받을 솔루션을 PaaS로 바꿉니다. CMP는 cmp, Agent Hub는 agent-hub를 사용하세요.
teamai projects set paas

# 변경한 솔루션의 가이드를 반영합니다.
teamai pull --force
```

제품에 `.aifrica/frontend.json`이 있다면 `solution` 값과 제품별 설정도 함께 맞춰 주세요.
역할이나 솔루션을 바꾼 뒤에는 `--force`로 전체 자원을 동기화해 주세요.

## 5. 공용 스킬 없이 사용하고 싶다면

공용 묶음을 끄면 제품 자체의 기술·스킬·디자인 지침을 사용할 수 있어요.
**설정 파일과 실제 역할 선택을 모두 바꿔 주세요.** JSON만 바꾸면 설치된 공용 스킬이 자동으로 제거되지는 않아요.

먼저 제품의 `.aifrica/frontend.json`에 다음 값을 반영해 주세요.
기존 파일이 있다면 다른 설정은 유지하고 필요한 항목만 바꿔 주세요.
`solution`에는 현재 선택한 솔루션을 넣어 주세요.

```json
{
  "schemaVersion": 1,
  "solution": "cmp",
  "inheritCommon": false
}
```

이어서 제품 루트에서 실행해 주세요.

```bash
# 공용 묶음이 없는 frontend 기본 역할로 바꿉니다.
teamai roles set frontend

# 공용 스킬·문서·규칙의 배포 선택을 반영합니다.
teamai pull --force
```

처음부터 공용을 쓰지 않으려면 init에서 `--role frontend`를 선택하고 위 설정도 false로 맞춰 주세요.
회사 공통과 선택 솔루션 문서는 유지되지만, 공용 Frontend 지침은 요구하지 않아요.
직접 수정한 스킬 사본은 CLI가 보존할 수 있으니 동기화 로그도 확인해 주세요.

다시 사용하려면 `inheritCommon`을 true로 바꾼 뒤 실행해 주세요.

```bash
# Frontend 공용 묶음을 다시 선택합니다.
teamai roles set frontend-common

# 공용 스킬과 가이드를 다시 받습니다.
teamai pull --force
```

## 6. 가이드는 어디에서 관리하나요?

팀 공통 변경은 이 저장소에서 수정·검증한 뒤 Git으로 게시해요.
팀원은 제품에서 `teamai pull --force`로 받으면 돼요. 제품에 설치된 사본을 수정해도 원본에 자동 반영되지는 않아요.

| 바꾸고 싶은 내용 | 관리 위치 |
| --- | --- |
| 공용 스킬의 작업 절차 | `skills/frontend/` |
| 공용 디자인 시스템·페이지·아키텍처 가이드 | `docs/frontend/` |
| CMP·PaaS·Agent Hub별 추가 기준 | `docs/cmp/`, `docs/paas/`, `docs/agent-hub/` |
| 역할·솔루션별 배포 범위 | `manifest/roles.yaml`, `manifest/projects.yaml` |
| 제품 하나의 테마·컴포넌트 연결·공용 사용 여부 | 제품의 `.aifrica/frontend.json`과 제품 문서 |

더 자세한 내용이 필요할 때는 아래 문서를 확인해 주세요.

- [설치·배포와 문제 확인](./docs/common/onboarding.md)
- [공용 묶음 선택·해제](./docs/common/frontend-bundle.md)
- [제품별 설정과 가이드 적용 순서](./docs/common/resolution.md)
