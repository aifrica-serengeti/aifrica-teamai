# Frontend 공용 묶음 선택 검증

검사일: 2026-10-20. 특정 솔루션을 새로 만들지 않고 공용 묶음을 선택하는 기능만 추가했다.
Cheetah 프로젝트·문서·스킬·디자인 시스템은 등록하지 않았다. 기존 CMP·PaaS·Agent Hub만 유지한다.

## 구성

- `frontend`는 회사 규약과 솔루션 선택 안내만 받는다.
- 선택 가능한 추가 역할 `frontend-common`이 공용 7개 스킬·frontend 문서·공용 작업 규칙을 배포한다.
- 솔루션 `frontend.json` 또는 제품 `.aifrica/frontend.json`의 `inheritCommon`으로 채택 의사를 기록한다.
  제품 로컬 값이 우선하며, 새 구성에서 값이 없으면 false다. 기존 3개 솔루션은 true를 명시했다.
- `frontend:plan`은 선택값·최소 설정 patch·실제 TeamAI 명령을 출력한다. JSON만으로 설치 자원을
  바꾸지 않는다. 켤 때는 추가 역할을 선택하고 끌 때는 해제한 후 `teamai pull --force`를 실행한다.
- 독립 모드는 공용 registry·기술·페이지·아키텍처 절차를 요구하지 않는다. `extendsCommon: true`인
  CMP 추가 catalog도 건너뛰며, 독립 catalog가 존재하면 그 솔루션의 것만 사용한다.

상세 사용법은 [공용 묶음 가이드](../docs/common/frontend-bundle.md)에 있다.

## 실제 CLI 검사

`teamai-cli@0.27.0`과 임시 Git 원본·로컬 bare·격리된 HOME/TMPDIR/Git 설정을 사용했다.
테스트 HTTPS URL은 로컬 bare로만 연결했다. 실제 사용자 홈·제품 원본·생산 원격에는 쓰지 않았다.
실행 당시 배포 snapshot은 `079f735412f13d08043093939f6da1fdb5c2b35e`다.
이후 배포 문서에는 같은 revision에서 `--force`가 필요한 이유만 보충했다.

CMP와 PaaS 각각 Codex·Claude를 함께 선택하고 다음 전환을 실행했다.

| 단계 | Codex 공용 스킬 | Claude 공용 스킬 | frontend 문서·공용 규칙 |
| --- | --- | --- | --- |
| 처음부터 끔 | 0 | 0 | 없음 |
| 켬 | 7 | 7 | 있음 |
| 다시 끔 | 0 | 0 | 없음 |
| 다시 켬 | 7 | 7 | 있음 |

각 단계에서 전체 docs mirror의 파일 집합·SHA-256, 스킬 수, session hook 규칙과 제품 자체 스킬의
보존을 확인했다. 배포된 common 선택 도구도 저자 저장소 의존성 없이 실행했다.
추가 CMP 사례에서 Codex 공용 스킬 하나를 로컬 수정한 뒤 끄자 해당 사본은 보존되고, 나머지 6개와
Claude 공용 7개는 정리됐다. 수정 사본에도 opt-out 가드가 있어 공용 절차를 적용하지 않도록 안내한다.
총 9개 단계의 [실행 결과](./frontend-bundle-toggle-results.json)를 기록했다.

CLI는 같은 원본 revision에서 역할 변경 뒤 일반 pull을 생략할 수 있었다. 따라서 계획과 안내는
`pull --force`를 사용한다. hook의 백그라운드 동기화로 잠긴 경우 완료를 기다려 재실행했으며 잠금을
강제로 지우지 않았다. 종료 코드 0만으로 성공을 판정하지 않고 실제 배포 파일을 대조했다.

## 자동 검사

`npm run verify`는 공용 51 + CMP 4개 계약, 공용 스킬 7종, 공용 선택/해제/backend의 9개 조합,
3개 확장 schema·문서 링크·dependency·namespace 격리를 검사한다. `npm test`는 12개 사례로
선택 계획·제품별 override·공용 없는 mirror·독립 catalog·기존 합성 계약을 검사한다.
원본의 화면·runtime·디자인 시스템 구현을 새로 검증했다는 의미는 아니다.
