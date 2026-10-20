# Aifrica TeamAI

팀의 공통 규약, frontend 공용 스킬·디자인 시스템·페이지 패턴을 관리하는 TeamAI 자산 저장소다.
CMP·PaaS·Agent Hub는 공통 계약을 복제하지 않고 솔루션별 차이를 추가한다.

```text
회사 공통                     docs/common, rules/common
  ├─ frontend 역할            회사·솔루션 선택, 공용 강제 없음
  │    └─ frontend-common      선택 시 skills/frontend, docs/frontend, rules/frontend-common
  └─ backend 역할             docs/backend, rules/backend (전용 계약 추가 자리)
솔루션 선택                   docs/{cmp,paas,agent-hub}, rules/{cmp,paas,agent-hub}
제품 저장소의 채택 설정       .aifrica/frontend.json
```

## 시작점

- [프론트엔드 문서 허브](./docs/frontend/README.md)
- [첫 제품 적용과 동일 결과 검증](./docs/frontend/first-use.md)
- [디자인 시스템·상세 컴포넌트](./docs/frontend/design/README.md)
- [List·Create·Detail 공통 패턴](./docs/frontend/design/patterns/README.md)
- [문서 탐색과 확장 합성 계약](./docs/common/resolution.md)
- [CMP](./docs/cmp/README.md) · [PaaS](./docs/paas/README.md) · [Agent Hub](./docs/agent-hub/README.md)
- [TeamAI 도입](./docs/common/onboarding.md)
- [Frontend 공용 묶음 켜기·끄기](./docs/common/frontend-bundle.md)
- [추출 근거와 분리 내역](./audit/README.md)
- [공용 + CMP 및 비활성화 최종 점검](./audit/frontend-final-review.md)

공통에는 의미·상태·접근성·컴포넌트 API 계약과 추출한 시각 baseline을 둔다.
primary 색, 고객 테마, shell, 메뉴, 도메인, 실제 구현 경로는 제품별로 확인한다.
원본의 고객별 관찰 자료는 `audit/`에 비교 근거로만 보존한다. 제품에는 frontend 공용 스킬과
선택 솔루션의 확장을 배포한다. 공용 frontend 묶음은 선택 사항이며 독립 제품은 자체 지침을 사용한다.
CMP 추가 계약은 [CMP frontend 계약](./docs/cmp/frontend-contract.md)에 둔다.

## 공용 스킬

원본은 `skills/frontend/<name>/SKILL.md`다. TeamAI에서 frontend-common 추가 역할을 선택했을 때 배포한다.
솔루션 또는 제품의 `inheritCommon: false`로 공용 의존성을 끄고 역할에서도 묶음을 해제할 수 있다.

| 스킬 | 작업 |
| --- | --- |
| `aifrica-frontend-workflow` | 일반 UI 조사·구현·검증 |
| `aifrica-design-system` | 토큰·컴포넌트의 의미·상태·접근성 계약 |
| `aifrica-page-patterns` | List·Create·Detail 조립·상태·검증 |
| `aifrica-ui-architecture-design` | 신규 기능의 경계와 상태 소유권 설계 |
| `aifrica-frontend-architecture-refactor` | 기존 타입·모듈·의존성 정리 |
| `aifrica-frontend-github-workflow` | 요청된 Issue·PR·리뷰·병합 단계 |
| `aifrica-frontend-docs` | 명시적으로 요청한 기술 지식 스냅샷 갱신 |

## 공용 원본 검증

Node.js 20 이상에서 실행한다. 제품 앱을 설치하거나 실행하는 명령이 아니다.

```bash
npm ci
npm run verify
npm test
npm run resolve -- --solution cmp
npm run frontend:plan -- --solution cmp --inherit-common false
```

로컬 채택 파일을 점검할 때는 `npm run resolve -- --local /absolute/path/to/product/.aifrica/frontend.json`을
공용 원본에서 실행한다. 파일을 쓰지 않고 합성 결과를 출력한다. 실제 제품 적용과 채택 상태 판단은
해당 제품의 source/export 및 검증 결과로 결정한다.

이 구성은 로컬에서 준비한 배포 원본이다. 사용자 도구에 설치·초기화하거나 원격 저장소에 게시하는 작업은
별도의 실행 단계다. 기존 serengeti-cmp 원본은 수정하지 않았다.
