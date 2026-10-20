# CMP frontend 추가 계약

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

이 문서는 `frontend-common` 역할과 `cmp` 프로젝트를 선택한 UI 작업에 적용한다.
공용 스킬 7종을 그대로 사용하며 CMP의 구조·업무 경계를 이 문서에서 보충한다.
공통 컴포넌트·타이포그래피·border·상태·접근성·List/Create/Detail 계약은
`DOCS_ROOT/frontend`에서 읽는다. backend 작업에 frontend 구조를 강제하지 않는다.

기존 CMP 저장소의 지침을 참고해 정리한 기준이다. 현재 제품의 AGENTS·architecture·실제
package/lockfile·source/export를 먼저 대조한다. 제품이 명시적으로 다른 구조를 채택했다면
그 차이와 근거를 로컬 채택 문서에 기록한다. 특정 고객의 브랜드·메뉴·자산·API payload는
CMP 공통 계약에 포함하지 않는다. 공유 `frontend.json`은 실제 제품 mapping이 연결되기 전까지 `draft`다.

컴포넌트는 공통 51종과 [CMP shell 확장 4종](./design/README.md)을 함께 검색한다.
공용 스킬의 registry 탐색·dependency closure에 [CMP registry](./design/component-registry.json)를 추가한다.
추가 계약은 현재 제품에서 구현됐다고 선언하는 자료가 아니며 source/export는 별도로 검증한다.

## 기술과 아키텍처

기존 CMP의 React·TypeScript·Vite SPA 구조와 설치된 의존성을 기준으로 작업한다.
스타일은 shadcn primitive·디자인 시스템 자체 수정 경계를 구분하고 일반 앱 UI에는
vanilla-extract를 사용한다. 이 기준을 PaaS·Agent Hub에 전파하거나 의존성 업그레이드로 해석하지 않는다.

| 소유 위치 | 책임 |
| --- | --- |
| `src/app` | bootstrap·provider·최상위 router·application shell 조립 |
| `src/core` | 특정 메뉴에 종속되지 않는 API client·config·public component·hook·유틸리티 |
| `src/domains/{group?}/{menu}` | service·요청 DTO·응답 모델·도메인 상태·해당 메뉴 mock |
| `src/pages/{group?}/{menu}/{page-kind}` | route page·markup·page store·query/draft/mutation/view 타입 |
| 메뉴 또는 그룹 `shared` | 같은 의미·수명의 실제 공유가 확인된 UI·hook·router·type |
| `src/styles`, `src/assets`, `public` | 실제 theme/token·import 자산·배포 정적 자산 |

업무·navigation 경계가 있을 때만 group을 만들고 빈 그룹을 추가하지 않는다. page 파일은
`list`·`create`·`detail` 같은 page-kind 안에 두고 `Page` 접미사를 사용한다.
가까운 page `markup` → 메뉴 `shared/ui` → 전역 `core` 순으로 실제 재사용 범위를 판단한다.
`core`가 page·menu domain을 역참조하지 않게 하며 type-only import도 의존 방향에 포함한다.

| 타입 | 위치와 naming |
| --- | --- |
| 요청 DTO | domain `model/dto/{resource}.{action}.dto.ts`, `Dto{Resource}{Action}` interface |
| 응답 모델 | domain `model/interface/{resource}.i.ts`, `I{Resource}` |
| 도메인 상태·제한된 union | domain `model/type/{resource}.{purpose}.t.ts`, `T{Resource}{Purpose}` |
| page query·route·draft·mutation·view model | page-kind `type/{resource}.{purpose}.t.ts` |
| 여러 page kind의 동일 계약 | 메뉴 `shared/type`, 형제 메뉴까지 공유할 때 그룹 `shared/type` |
| 컴포넌트 공개 Props | 해당 `.tsx`에 colocate |

`types.ts`·`interfaces.ts` 같은 포괄 파일에 page workflow 타입을 누적하지 않는다.
API 계약을 page type으로 옮기거나 page 전용 draft를 domain에 중앙화하지 않는다.
타입·모듈 이동에는 공용 architecture-refactor의 inventory·caller/export·동작 보존 검사를 함께 적용한다.

## API·runtime·메뉴 권한

- API service는 domain이 소유하며 page가 axios를 직접 조립하지 않는다. HTTP 공통 처리는
  `core/api`, URL·serialization·DTO 변환은 domain service/adapter가 담당한다.
- runtime JSON은 app bootstrap에서 읽고 core config에서 검증한다. API endpoint 타입과
  getter·validator의 의존을 분리한다. 실제 파일·환경별 우선순위는 제품 runtime 계약에서 확인한다.
- 인증 변경은 현재 제품의 HTTP 계약을 확인한다. 기존 CMP의 AccessKey 호환 경로에서는
  요청에 AccessKey가 있고 Authorization이 없을 때만 Bearer를 보완한다. 명시 Authorization은
  보존하고 공개·외부 요청에 저장된 세션을 임의 주입하지 않는다. JSON·binary 요청을 함께 검사한다.
- 메뉴 API·AbortSignal·응답 검증은 domain service/adapter, navigation 조립은 app shell이
  소유한다. 공용 SNB·Header가 raw 메뉴 응답이나 시스템 코드 정책을 해석하지 않는다.
  기존 CMP의 `/menu/roots/` 요청은 menu service, depth·표시·route index·section 변환은
  navigation adapter가 소유한다. section을 권한 배열의 개수·순서로 추정하지 않는다.
- leaf 메뉴를 List/Create/Detail의 공통 권한 주체로 사용하고 route action별 Read/Create/Modify/Delete를
  연결한다. 화면 표시용 route index와 숨김 메뉴를 포함하는 권한 index를 분리한다.
- MenuActionPolicy를 사용하는 제품에서는 domain 공개 모델·service에서 정책·역할·사용자 ACL을
  검증·결합한다. 미저장 정책의 호환 동작과 정책 조회 실패를 구분하며, 실패 시 mutation을
  허용하지 않는 read-only 경로를 검증한다. Root·Include·Exclude와 명시 route 예외는 제품 정책으로 확인한다.
  기존 호환 정책은 미저장 메뉴의 선택 역할에 CRUD를 허용하지만 조회 실패는 read-only다.
  Root는 전체 권한, 일반 역할은 합집합을 만든 뒤 Include/Exclude를 적용한다. 신규 생성
  launch/wizard/restore는 Create, edit/update는 Modify, list/detail은 Read로 분류한다.
  메뉴에 연결되지 않은 route는 read-only이며 utility 예외는 app shell의 명시 allowlist에서만 선언한다.
- 메뉴 삭제와 정책 삭제·실패 복구·cache 무효화를 함께 검증한다. UI 표시 제어를 서버 권한 검증으로
  대신하지 않는다. 실제 endpoint·메뉴 목록·고객별 정책 데이터는 제품 로컬 계약이 소유한다.

## List · Create · Detail 적용

먼저 `DOCS_ROOT/frontend/design/patterns/README.md`, 해당 패턴과 page-policies를 읽는다.
공통 문서의 컴포넌트 API·상태 matrix를 재작성하지 않고 다음 CMP 연결을 추가한다.
원본의 page geometry·pagination·작업 수명 baseline은 [CMP 페이지 적용](./page-patterns.md)을 읽는다.

- **List:** domain query/response adapter와 page query·filter·pagination·selection·view state를
  연결한다. 화면 유지 수명과 메뉴별 view 선호 저장 범위를 분리한다. Activity 같은 기능은 실제
  React 버전과 lifecycle 제약을 확인한다. table/card page size·검색 debounce·loading 정책은
  `pagePatterns.list` 또는 제품 문서에 명시하고 현재 화면 동작과 비교한다.
- **Create:** domain DTO와 page draft/validation/payload 정규화를 분리한다. 중복 확인·파일 upload 등
  후속 작업이 있는 경우 생성 mutation과 후속 mutation을 분리하고 재시도로 자원이 중복 생성되지 않게 한다.
  성공 결과·민감 값·서버 오류·중복 submit·이탈 보호를 검증한다.
- **Detail:** route/resource 식별자 검증과 조회를 page가 소유한다. original/draft를 분리하고
  dirty guard·저장/취소·refresh 충돌·not-found·권한·파괴적 작업을 검증한다.
- Create/Detail 사이의 반복 UI는 의미·공개 API가 실제 같을 때 메뉴 shared로 승격한다.
  이름이나 DTO shape가 비슷하다는 이유만으로 묶지 않는다.
- content/Header 정렬·maxWidth·inset·breakpoint·scroll/overlay owner는 실제 제품 shell 기준으로
  명시한다. Header 내부 padding과 page wrapper의 소유권을 구분하고 음수 margin으로 정렬을 보정하지 않는다.

특정 색상·폰트·shell 치수·페이지 route·폼 필드·application 등록 사례를 모든 CMP의 기본값으로
복사하지 않는다. 실제 값은 `pagePatterns`·token/component mapping·제품 `documentOverrides`에서 연결한다.

## 날짜·휴일 호환 입력

공용 DatePicker는 국가·일요일 강조를 제품 locale/calendar adapter에 위임한다. 기존 serengeti-cmp의
기본 표시를 재현할 때는 DatePicker/Calendar에 `holidayCountry="KR"`, `highlightSundays={true}`를
명시한다. 수동 `holidays`는 추가 날짜이며 국가 null은 자동 공휴일 계산만 끈다.
이 입력은 공용 기본 국가를 만들지 않는다. 다른 locale 정책을 채택한 CMP는 제품에서 값을 바꾸고
로컬 `documentOverrides`에 정책과 근거를 기록한다. 공용을 끈 제품에는 이 호환 입력을 요구하지 않는다.

## 동기화·검증·GitHub

관련 코드·공개 계약을 바꿀 때 다음 순서로 확인한다. 명령의 cwd는 실제 제품 root다.

1. 제품에 있으면 `node docs/tools/sync-agent-skills.mjs --check`.
2. 제품에 있으면 `node docs/tools/verify-guidelines.mjs`.
3. registry가 완전히 연결된 제품에서만 strict implementation 검사. strict source 검사는 명시적인
   frontend 기술 문서 갱신 요청에서만 수행한다.
4. 실제 package scripts의 typecheck → lint → 관련 test. public export·경계·bundle 영향이 있으면 build.
5. 변경한 컴포넌트·페이지의 상태·keyboard/focus·권한·오류 복구·light/dark·반응형을 검사한다.

검증 도구·script가 없으면 미실행 이유를 기록한다. 문서 구조 검사를 제품 실행 검증으로 대신하지 않는다.
이 자산 저장소를 바꿀 때는 별도로 `npm run verify`와 `npm test`를 실행한다.
GitHub 단계에는 공용 GitHub 스킬과 회사 Git 규약·현재 제품 지침·사용자가 허용한 단계를 적용한다.

정리 근거: `project.serengeti-cmp` commit `3f1da2942839cabf5a5ef56fd1f30d68fde7f4d4`의
architecture·원본 frontend 스킬·페이지 패턴. 원본은 읽기 전용 참고 자료이며 제품에 별도 고객 스킬로 설치하지 않는다.
