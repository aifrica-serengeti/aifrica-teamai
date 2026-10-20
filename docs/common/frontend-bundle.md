# Frontend 공용 묶음 선택

frontend 소속이라는 이유만으로 공용 스킬·디자인 시스템·기술·아키텍처를 상속하지 않는다.
현재 솔루션의 `frontend.json` 또는 제품 `.aifrica/frontend.json`에서 `inheritCommon`을 선택한다.
명시하지 않은 새 구성은 기본적으로 꺼짐이다. 기존 CMP·PaaS·Agent Hub는 기존 동작을 유지하도록 true다.

| 선택 | 실제 TeamAI 역할 | 공용 스킬·frontend 문서 |
| --- | --- | --- |
| 공용 켜기 | frontend + 추가 역할 frontend-common | 7종과 상세 가이드 배포 |
| 공용 끄기 | frontend, 추가 역할 없음 | 배포하지 않음 |

`frontend-common`을 기본 역할로 직접 선택해도 같은 공용 묶음을 받는다. frontend를 기본 역할로
유지하는 팀원에게는 위의 추가 역할 방식을 사용한다.

회사 공통 규약과 선택 솔루션 문서는 두 모드 모두 유지한다. 독립 모드는 제품 자체의 스킬·기술·
디자인 시스템을 사용한다. 특정 솔루션을 새로 등록하거나 독립 디자인 시스템을 생성하는 기능은 아니다.

## 설정과 실행

솔루션 전체의 기본값은 `docs/<solution>/frontend.json`에 둔다. 특정 제품만 끄려면 그 제품의
`.aifrica/frontend.json`에 다음 내용을 기존 설정과 병합한다. 기존 token·component mapping을 덮어쓰지 않는다.

```json
{
  "schemaVersion": 1,
  "solution": "cmp",
  "inheritCommon": false
}
```

공용 저자 저장소에서 선택 계획을 확인한다.

```bash
npm run frontend:plan -- --solution cmp --inherit-common false
npm run frontend:plan -- --local /absolute/path/to/product/.aifrica/frontend.json
```

배포된 파일만 사용할 때는 `node <DOCS_ROOT>/common/frontend-policy.mjs`에 같은 인수를 전달한다.
도구는 설정을 쓰거나 설치하지 않고 선택값·역할·필요한 명령을 출력한다.

기존 제품에서 끌 때:

```bash
teamai roles set frontend
teamai pull --force
```

다시 켤 때는 설정의 inheritCommon을 true로 바꾸고 다음을 실행한다.

```bash
teamai roles set frontend --add frontend-common
teamai pull --force
```

TeamAI 0.27.0의 `init --role`은 역할 하나만 받는다. 최초에는 frontend로 init하고, 공용을 쓰는 경우
`roles set ... --add frontend-common`을 실행한다. `--role frontend,frontend-common`을 쓰지 않는다.
역할·프로젝트 namespace는 합집합이므로 JSON에 false만 쓰는 것으로 이미 설치된 묶음이 제거되지는 않는다.
같은 원본 revision에서 역할만 바꾸면 일반 pull이 동기화를 생략할 수 있어 `--force`로 전체 자원을 다시
동기화한다. 이 옵션도 로컬 수정 파일의 보존 정책을 우회하지 않는다. 다른 동기화가 진행 중이라는
로그가 나오면 완료 후 다시 실행하고, 종료 코드만으로 적용 성공을 판단하지 않는다.

## 비활성화의 범위

공용을 끄면 frontend namespace의 registry·React/Next snapshot·페이지·아키텍처·스킬을 읽도록
요구하지 않는다. 공용을 전제로 하는 solution catalog(`extendsCommon: true`)도 합성하지 않는다.
독립 컴포넌트 catalog가 있으면 해당 솔루션의 것만 사용하고, 없으면 제품 자체 계약을 따른다.
공용 스킬에도 초기 opt-out 확인을 두어 남은 사본을 임의 적용하지 않게 한다.

pull은 변경되지 않은 TeamAI 관리 스킬과 비활성 문서를 정리한다. 로컬에서 수정한 파일은 TeamAI가
보존할 수 있으므로 pull 로그·도구별 SKILL·docs mirror·session hook을 확인한다. 사용자 자체 스킬이나
수정 파일을 이 기능이 강제로 삭제하지 않는다. 설정과 역할이 다르면 적용 완료로 보고하지 않는다.
기존 고유명 스킬 보존과 최초 설치의 동명 충돌은 다르다. 관리 기록이 없는 동명 스킬은 초기 pull이
덮어쓸 수 있으므로 도입 전에 공용 7종의 이름과 대조한다. 자세한 도입 조건은 onboarding.md를 따른다.
