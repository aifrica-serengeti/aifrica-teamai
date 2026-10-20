# 첫 제품 적용과 동일 결과 검증

TeamAI 첫 실행은 공용 스킬·문서·규칙을 배포한다. 이 저장소의 기본 솔루션 설정은 `draft`이며
테마·실제 컴포넌트·페이지 설정을 자동 생성하지 않는다. 공용 계약을 읽을 수 있는 상태와 제품의
구현·외형이 검증된 상태를 구분해 기록한다.

## 시작 시 실제로 받는 것

frontend-common 묶음을 선택하면 공용 스킬 7종, 공통 문서, 선택 솔루션 문서를 받는다. 디자인 계약 51종과
List/Create/Detail의 상태·조립·접근성 기준이 포함된다. 스킬 파일은 도구별 경로에 설치된다.
선택 솔루션이 추가 registry를 제공하면 함께 탐색한다. CMP는 shell 4종을 더해 55종 계약을 읽는다.
Codex에서 확인한 위치는 제품의 `.codex/skills/<name>/SKILL.md`다.

frontend 기본 역할만 선택한 독립 모드에서는 이 묶음을 받지 않는다. inheritCommon과 실제 역할을
`DOCS_ROOT/common/frontend-bundle.md`로 확인하고, 공용을 끈 경우 제품 자체 스킬·가이드를 사용한다.

기본 문서 root는 `.teamai/docs`이며 이 문서의 다른 상대링크도 mirror에서 유지된다.
실제 TeamAI 프로젝트 설정은 사용자 scope의 `~/.teamai/projects/<partition>/config.yaml`에 있을 수 있다.
제품의 `.teamai/config.yaml`이 반드시 존재한다고 가정하지 않는다. `primaryRole`, `projects`,
`projectRoot`를 확인하고 다른 checkout의 설정을 읽지 않는다.

설치 순서는 [회사 공통 onboarding](../common/onboarding.md), 합성 순서는
[확장 계약](../common/resolution.md)을 따른다.

## 기존 제품에서 사용하는 경우

1. 제품의 실제 framework/version, theme, public component export, architecture와 기존 화면을 찾는다.
2. [공용 registry](./design/component-registry.json)의 id·alias로 기존 구현을 비교한다.
3. 기존 코드가 계약을 충족하면 reuse하고 `.aifrica/frontend.json`에 검증한 source/export와
   제품 문서·token 경로를 연결한다. 공용 registry를 구현됨으로 바꾸지 않는다.
4. 이번 작업에 필요한 public API와 dependency만 검증한다. 문서 예시의 경로를 만들기 위해
   정상 작동하는 제품 구조를 재배치하지 않는다.
5. 기존 화면의 동일 조건에서 변경 전후를 비교한다. 사용자 흐름·API payload·권한·오류·키보드·focus가
   보존되는지 확인하고 light/dark 및 반응형 캡처를 비교한다.

## 빈 제품에서 사용하는 경우

1. 솔루션을 선택한다. 브랜드·primary·shell이 미정이면 그 미정을 명시한다. 다른 솔루션의 값을
   임의로 가져오지 않는다. 원본의 고객별 관찰 값을 CMP 전체 기본값으로 쓰지 않는다.
2. [계약 수준](./design/contract-levels.md)의 추출 baseline 채택 범위를 정한다. baseline과 다른 값은
   솔루션 설정·제품 문서에 기록한다. font·weight·아이콘·locale/calendar·light/dark 토큰을 연결한다.
3. [문서 기반 구현](./design/docs-only-build.md)의 dependency 순서로 leaf부터 한 번씩 구현한다.
   소스 예제의 alias와 primitive/style adapter를 제품에 맞게 연결한다.
4. [List](./design/patterns/ListPage.md)·[Create](./design/patterns/CreatePage.md)·
   [Detail](./design/patterns/DetailPage.md)을 조립한다. page가 query/draft/mutation/permission을 소유한다.
5. 아래 검증을 수행한 후에만 해당 구현·설정의 채택 상태를 `active`로 기록한다.

솔루션의 추가 계약은 선택 솔루션 문서에서 읽는다. CMP는 `DOCS_ROOT/cmp/frontend-contract.md`를
적용하며, 고객별 메뉴·인증·브랜드·자산·shell과 실제 구현 연결은 해당 제품이 소유한다.

## 배포된 파일만으로 입력 점검

이 [진단 스크립트](./contracts/check-first-use.mjs)는 Node.js 표준 라이브러리만 사용한다.
공용 원본 저장소나 npm dependencies 없이 TeamAI mirror에서 실행할 수 있다.
현재 작업에서 사용할 컴포넌트를 지정하면 direct dependency closure까지 매핑을 확인한다.

```bash
node .teamai/docs/frontend/contracts/check-first-use.mjs --solution paas --product-root . --components Button,Input,PageHeader
```

JSON의 `mappingInputsPresent`는 선언된 입력 파일·매핑의 존재를 뜻한다. 이 값이 true여도 export의
정확성, 완전한 schema 적합성, 실제 동작이나 화면 일치가 검증된 것은 아니다.
새 제품은 정상적으로 missing 항목이 나온다. `--strict`는 입력이 없을 때 종료 코드 1을 반환한다.
잘못된 입력·해석 오류는 코드 2다. 누락을 감추기 위해 placeholder export나 빈 token 파일을 만들지 않는다.
공용 원본에서는 `npm run verify`와 `npm test`로 정식 schema·문서 계약도 확인한다.

## 동일 결과의 완료 기준

| 검증 대상 | 필요한 증거 |
| --- | --- |
| 공통 규칙 전달 | 선택 역할/솔루션의 실제 skill·문서·rule과 hook 전달 결과 |
| API 호환 | 실제 컴포넌트 export·Props·controlled 값/callback 전달과 현재 버전의 타입검사 |
| 동작 | 해당 상태 matrix, validation·mutation, disabled, keyboard·focus·권한·오류/복구 테스트 |
| 외형 | 채택 token·font·asset·layout·locale와 같은 viewport/DPR/zoom/theme의 실제 렌더 비교 |
| 제품 통합 | 해당 제품의 실제 typecheck/lint/test/build와 네트워크·routing 동작 |

문서·링크 검사나 정적 screenshot 하나로 모든 항목을 통과로 표시하지 않는다.
현재 공용 저장소의 예제 일부에 대한 재현 검증도 모든 컴포넌트·제품의 실행 보증을 뜻하지 않는다.
작업 결과에는 검사한 범위와 미검증 항목을 구분해 남긴다.
