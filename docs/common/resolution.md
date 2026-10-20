# 문서 탐색과 확장 적용

## 세 가지 위치

| 상황 | 문서 root |
| --- | --- |
| 이 공용 원본 저장소를 편집 | 저장소의 `docs/` |
| 제품 저장소에 TeamAI project/workspace scope 배포 | 제품의 `.teamai/docs/` |
| TeamAI user scope 배포 | 사용자 scope에서 설정한 `sharing.docs.localDir` |

TeamAI의 `sharing.docs.localDir`를 바꿨다면 실제 scope 설정을 확인한다. 사용자 홈 경로나
다른 프로젝트 mirror를 임의로 선택하지 않는다. 경로를 찾을 때 현재 checkout의 root와
상위 workspace root를 구분하고, 같은 팀/선택 솔루션의 문서인지 확인한다. 코드 경로는 항상
현재 consuming repository 기준이다. mirror나 공용 원본의 `src/`를 제품 source로 착각하지 않는다.

`DOCS_ROOT/common`, `DOCS_ROOT/frontend`, `DOCS_ROOT/<solution>`이 각 namespace다.
문서 간 상대링크는 공용 원본과 기본 mirror 모두에서 같은 namespace 관계를 유지한다.
운영·감사 문서는 공용 원본 전용이며 제품에 배포하지 않는다.

## 선택과 우선순위

회사 공통 규약은 모든 역할에 적용한다. 아래 frontend 확장 절차는 frontend 작업에만 적용한다.
backend 작업은 `backend/README.md`와 제품의 backend 계약을 읽고 frontend 문서를 요구하지 않는다.

1. 사용자의 명시적 요청·제약과 적용되는 저장소 지침을 확인한다.
2. TeamAI 역할을 확인한다. `frontend`는 업무 역할이고, 공용 묶음은 `frontend-common` 추가 역할이다.
3. 로컬 `.aifrica/frontend.json`의 `solution`, 또는 TeamAI에서 이 checkout이 선택한 단일
   프로젝트 `cmp`, `paas`, `agent-hub`로 솔루션을 식별한다. 둘이 다르면 조용히 합치지 말고 원인을 확인한다.
4. `common/README.md`와 솔루션 `README.md`, `extension.md`, `frontend.json`을 먼저 읽는다.
   로컬 `inheritCommon`이 있으면 솔루션 기본값보다 우선한다. [묶음 선택](./frontend-bundle.md)으로 실제 역할도 맞춘다.
5. 공용을 켜고 frontend-common 역할을 선택한 경우에만 `frontend/README.md`, `frontend/ai-prompt.md`를 읽는다.
   공용을 끄면 현재 제품의 자체 스킬·기술·디자인·아키텍처 지침을 따르며 frontend 문서 존재를 요구하지 않는다.
6. 로컬에서 명시적으로 선택한 profile과 `.aifrica/frontend.json`, `documentOverrides`를 읽는다.

공용을 켠 경우 선택 솔루션의 `design/component-registry.json`을 공통 registry에 추가해 탐색한다.
`docs`는 각 registry가 있는 디렉터리 기준이며 dependency id는 공통과 선택 솔루션의 합집합에서 찾는다.
솔루션이 정한 아키텍처·검증 의무를 공통의 참조 예시 표현으로 약화하지 않는다. 다른 솔루션의
추가 컴포넌트나 정책은 합성하지 않는다.
공용을 끈 경우 공통 registry를 읽지 않고 `extendsCommon: true`인 추가 catalog도 제외한다.

공용을 켠 경우 합성 순서는 **공통 의미 계약 → 솔루션 extension → 명시 선택 profile → 로컬 채택 설정**이다.
공용을 끈 경우 공용 계약을 상속하지 않고 솔루션·제품 자체 계약을 사용한다.
공통에서 추출한 수치 baseline은 회사 승인 테마를 의미하지 않는다. brand primary와 shell은
공통이 정하지 않는다. 선택하지 않은 솔루션이나 고객 profile의 값을 기본값으로 가져오지 않는다.

공용 컴포넌트 의미·접근성·focus·상태 소유권을 시각적 override로 무효화하지 않는다.
공개 계약을 바꿀 필요가 있다면 근거와 영향 범위를 `exceptions`에 기록하고 공통 계약 변경인지,
솔루션 한정 변형인지 판단한다. 문서와 코드가 다르면 차이를 드러내고 사용자의 작업 의도로 해소한다.

## 확장 파일 계약

공용 원본의 Schema는 `docs/frontend/contracts/frontend-extension.schema.json`이다.
공용을 선택한 소비 환경에는 `DOCS_ROOT/frontend/contracts/`로 배포된다. 독립 모드에서 이 문서의 존재를 요구하지 않는다.
`docs/<solution>/frontend.json`은 공유 patch다. `.aifrica/frontend.json`은 제품 저장소가 소유하는 patch다.

- `schemaVersion: 1`, `solution`은 필수다. `status: draft`는 미채택, `reference`는 참조 계약,
  `active`는 해당 저장소에서 검증하여 채택한 상태다.
- `inheritCommon`은 공용 묶음 선택값이다. 솔루션 기본값 → 제품 로컬 값 순으로 결정하며
  `common/frontend-policy.mjs`가 실제 TeamAI 역할 변경 계획을 출력한다. 시각 profile에서는 바꾸지 않는다.
- `profile`은 향후 필요한 제품별 확장을 명시적으로 선택하는 기능이다. 실제 제품에서 검증한
  `profiles/<id>/frontend.json`을 추가한 뒤 선택한다. 현재 고객 전용 profile은 제공하지 않는다.
- `tokens`에는 `brand`, `color`, `typography`, `border`, `spacing`, `radius`, `elevation`, `motion`을
  의미 이름으로 매핑한다. 제품 token 이름/값은 구현과 함께 확인한다. 빈 map은 결정되지 않았다는 뜻이다.
- `paths`의 architecture/componentRegistry/designTokens는 consuming repository 상대경로다.
- `components`는 공통 registry id로 실제 source와 export를 연결한다. `implemented`는 둘 다 필요하며
  해당 제품에서 확인한 경우에만 쓴다. 다른 제품의 구현 여부를 상속하지 않는다.
- `pagePatterns`의 list/create/detail은 폭, page size, section, 이동 정책 등 제품 구성을 추가한다.
  공통 page state와 접근성 계약은 `DOCS_ROOT/frontend/design/patterns/README.md`에 남는다.
  List 예시의 `profile.defaultViewMode`, `tablePageSize`, `cardPageSize`, 두 `*PageSizeOptions`,
  `searchDebounceMs`는 `pagePatterns.list`의 같은 이름 key로 대응한다.
  그 밖의 CSS geometry·locale·calendar·제품 API adapter는 제품 설정에서 연결하고
  설정 경로와 근거를 `documentOverrides`로 기록한다. schema에 없는 key를 임의 추가하지 않는다.
- `documentOverrides`는 제품 상대 문서 경로의 목록이다. 객체는 재귀 병합하고 배열은 전체 교체한다.
  명시적 `null`은 허용된 경로에서 미매핑을 의미한다. 누락된 key만 상속하며 오타 key는 오류다.
- `exceptions`는 contract/reason/scope를 반드시 기록한다. 추적이 필요한 경우 owner/reviewAfter도 적는다.

## 검증 도구

공용 원본에서 `npm ci` 후 다음 명령으로 실제 합성 결과를 읽기 전용 출력한다.

```bash
npm run resolve -- --solution cmp
npm run resolve -- --local /absolute/path/to/product/.aifrica/frontend.json
```

로컬 파일 명령은 파일 위치에서 제품 root를 얻고 경로가 그 root 밖으로 나가지 않는지,
선언한 문서·source가 실제로 존재하는지 확인한다. 실행 환경의 절대경로는 출력에 포함될 수 있으나
공유 설정에 저장하지 않는다. 도구가 공통 문서를 제품 코드로 복사하거나 token을 자동 적용하지 않는다.
공통 registry의 API 계약과 로컬 export의 의미·동작 일치 여부는 담당 스킬의 source 조사로 검증한다.

TeamAI는 파일을 배포한다. 이 합성 계약은 Aifrica가 정의한 작업 절차이며 TeamAI의 자동 JSON merge
기능이나 namespace override 기능이 아니다. 같은 이름의 스킬을 두 namespace에 두어 덮어쓰지 않는다.
