# Aifrica frontend 참조 아키텍처

공용 계약은 책임의 소유권과 의존 방향이다. 아래 directory와 파일명은 출발점이 되는 참조 mapping이다.
소비 저장소의 기존 architecture, package 경계, framework file convention을 조사하고
`.aifrica/frontend.json`의 `paths.architecture`와 선택한 솔루션 확장으로 실제 mapping을 읽는다.
React SPA, Next.js App Router 또는 다른 frontend 구조를 한 directory 체계로 강제하지 않는다.
원본 앱의 인증 헤더·메뉴 API·고객 역할 정책은 이 공통 계약에 포함하지 않는다.

## 1. Stack와 경계 먼저 확인

- 현재 `package.json`, lockfile, package manager, browser/runtime, bundler, router, test tooling을 읽는다.
- 기존 의존성으로 해결할 수 있는지 먼저 판단한다. 새 dependency와 업그레이드는 요청 범위에서만 수행한다.
- 스타일은 소비 저장소가 채택한 도구를 따른다. semantic token과 component ownership은 도구와 무관하다.
- 실제 public export·호출자·test를 확인하고 문서와 source 차이를 명시한다.
- 도메인·page·shared 역할이 같더라도 디렉터리 이름이 다르면 기존 mapping을 따른다.

## 2. 소유권 mapping

| 역할 | 참조 위치 | 소유하는 책임 | 포함하지 않는 책임 |
| --- | --- | --- | --- |
| application assembly | `src/app` | bootstrap, provider, 전역 layout, route 조립 | page draft, domain model |
| domain-free infrastructure/UI | `src/core` | HTTP 공통 설정, public UI, 공용 hook/config/i18n/utility | 특정 resource나 menu의 업무 규칙 |
| domain contract/adapter | `src/domains` | request DTO, validated model, adapter, service, domain mock | page component, URL convenience state |
| route workflow/presentation | `src/pages` | query/route/draft/mutation, page UI 조립 | 앱 bootstrap, 전역 transport 설정 |
| source-imported asset | `src/assets` | import되는 image/font/icon | runtime state |
| global presentation | `src/styles` | global token, font face, reset | domain rule, component-local state |
| directly served file | `public` | 배포 중 직접 제공하는 정적 asset | source module, secret |

`Next.js app/`처럼 framework가 같은 이름을 예약하는 경우 framework entry는 route assembly와
server/client boundary를 맡고 feature/domain/UI 구현은 로컬 구조에 매핑한다. 파일명만 보고
application 역할을 판단하지 않는다. 배포 시 덮어쓰는 설정은 해당 솔루션의 별도 runtime 계약이다.

## 3. 단방향 의존

runtime import와 `import type` 모두 적용한다.

```text
application assembly → route workflow → domain adapter → domain-free infrastructure
application assembly → public UI
route workflow → public UI
```

- application은 page·public UI를 조립하고 필요한 domain 계약을 연결할 수 있다.
- page는 domain·public UI·asset·style에 의존할 수 있으나 app bootstrap을 역참조하지 않는다.
- domain은 domain-free HTTP/config/utility를 사용할 수 있으나 page와 UI component에 의존하지 않는다.
- public UI와 공용 infrastructure는 특정 menu/page/domain 구현을 import하지 않는다.
- 다른 업무의 private page module을 직접 import하지 않는다. 동일한 계약을 공유하는 최소 공통 owner로 이동한다.
- package의 공개 entrypoint를 사용하며 barrel 추가 시 runtime cycle, tree shaking, private 노출을 확인한다.

두 caller가 있다는 사실만으로 전역 shared로 승격하지 않는다. 같은 의미·수명·변경 이유를 공유하는지 확인한다.
router callback이나 permission 값은 상위 owner가 주입할 수 있으며 core component가 domain을 숨겨 읽지 않는다.

## 4. 타입 배치 기준

| 책임 | 참조 위치 | 네이밍 예시와 판단 |
| --- | --- | --- |
| backend request payload | `domains/{group?}/{resource}/model/dto` | `{resource}.{action}.dto.ts`, `DtoResourceAction`; wire 계약 |
| response/normalized domain model | `domains/{group?}/{resource}/model/interface` | `{resource}.i.ts`, `IResource`; 응집된 하위 구조는 함께 유지 |
| domain enum-like union·state mapping | `domains/{group?}/{resource}/model/type` | `{resource}.{purpose}.t.ts`, `TResourcePurpose`; exhaustive mapping |
| cross-domain envelope/pagination | domain 공통 경계 | 실제 domain 의미가 같을 때만 공유 |
| query·route·draft·touched/errors·mutation·tab·view mode | page kind의 `type` 또는 기존 동등 경계 | `{resource}.{purpose}.t.ts`; page 수명·변경 이유를 소유 |
| 여러 page kind의 동일한 page 계약 | menu `shared/type` | 검증된 List/Create/Detail 공유가 있을 때 승격 |
| 형제 menu의 같은 page 표현 계약 | group `shared/type` | backend 계약은 해당 domain 경계를 유지 |
| component public Props | component `.tsx` | `{Component}Props`; 최소 렌더링·상호작용 계약 |
| component-private helper type | component 또는 focused helper | 실제 응집도 기준; page workflow type과 혼동하지 않음 |
| trust boundary input | 받는 계층의 validator/adapter | `unknown` → runtime validation → owned type |

`Dto`, `I`, `T`, `*.dto.ts`, `*.i.ts`, `*.t.ts`는 참조 naming이며 consuming repository의 naming이
확정되어 있으면 그 규칙을 따른다. type/interface syntax 자체가 owner를 결정하지 않는다.
이름 있는 page workflow 타입은 component/hook에 계속 쌓지 않고 가장 가까운 목적별 type module로
분리한다. `types.ts`, `interfaces.ts`, `utils.ts`처럼 소유권을 지우는 catch-all을 새로 만들지 않는다.

동일 shape가 동일 책임을 뜻하지 않는다. API DTO·domain model·form draft·view model을 구분하고
필요한 adapter에서 변환한다. form에 `Partial<Dto>`를 자동 채택하지 않는다. `any`, 넓은 assertion,
non-null assertion, `@ts-ignore`, tsconfig 완화로 소유권·type 오류를 숨기지 않는다.
배타 상태는 discriminated union과 exhaustive check로 표현한다.

## 5. 참조 directory 예시

아래는 새 기능에 유용한 한 mapping이다. 불필요한 빈 폴더를 만들지 않는다.

```text
src/
  app/
    bootstrap/
    providers/
    layout/
    router/
  core/
    api/
    components/
    hooks/
    config/
    i18n/
    lib/
    stores/
  domains/{group?}/{resource}/
    service/
    model/{dto,interface,type}/
    mock-data/
  pages/{group?}/{resource}/
    shared/{hooks,i18n,router,type,ui,data}/
    list/
      ResourceListPage.tsx
      markup/
      hooks/
      stores/
      type/
      data/
    create/
      ResourceCreatePage.tsx
    detail/
      ResourceDetailPage.tsx
```

group은 실제 업무·내비게이션·계약 경계를 나타낸다. 메뉴 수만으로 빈 group을 만들지 않는다.
형제 menu가 같은 page 표현·query hook을 쓰면 group shared, 같은 menu의 여러 page kind면 menu shared,
한 page만 쓰면 page 내부 owner를 유지한다. domain DTO를 page shared에 옮기지 않는다.
login·not-found 등은 consuming repository의 공통 route 영역을 따른다.

## 6. 컴포넌트 응집도와 표현 데이터

컴포넌트별 directory를 기본 참조로 사용한다. component·style·작은 helper·불변 표현 데이터가 함께
변하면 가까이 둔다. 서로 무관한 여러 component와 style을 같은 parent에 평평하게 늘어놓지 않는다.

```text
markup/filter-bar/
  FilterBar.tsx
  FilterBar.css.ts
  data/filter-bar.options.data.ts
```

위 style 확장자는 예시이며 실제 styling 도구를 따른다. 작은 private Props/helper는 component에,
page query/draft/tab 등 workflow 타입은 가까운 목적별 type module에 둔다. label 목록·chart series·SVG path
같은 불변 presentation data는 component/page `data`에, backend enum과 domain mapping은 domain model에,
개발·test mock은 domain mock 또는 기존 test fixture 경계에 둔다. 실제 공유가 확인될 때만 승격한다.

공용 UI는 값과 callback을 받는다. API 호출·router·domain DTO·page store를 내부에서 몰래 읽지 않는다.
공용 leaf(Icon, focus, keyboard, portal, overlay, loading, scroll, formatter)를 복제하지 않는다.

## 7. API·보안·비동기 소유권

- resource service는 endpoint 조합, query serialization, DTO와 domain 변환을 소유한다.
- 공통 HTTP 경계는 transport·공통 에러·timeout/cancellation을 소유한다. 인증 방식은 solution contract를 따른다.
- page가 axios/fetch client를 직접 구성해 기존 공용 transport를 우회하지 않는다.
- 외부 응답·URL·storage·form 값은 trust boundary에서 검증한다. server에서도 auth·authorization·validation을 수행한다.
- 명시된 인증 헤더를 존중하고 공개·외부 요청에 session secret을 자동 전파하지 않는다.
- `AbortSignal`, stale response, retry, cancellation, timeout, duplicate mutation, optimistic rollback을 필요한 범위에서 모델링한다.
- visibility와 authorization은 다른 책임이다. 메뉴가 보이지 않는다는 사실을 API 권한 검증으로 대체하지 않는다.
- 특정 IdP, 역할 이름, menu API, action code, token refresh는 solution 또는 consuming backend 계약이 정한다.

## 8. List · Create · Detail 공용 ownership

세 page kind는 [패턴 가이드](./design/patterns/README.md)의 공용 계약을 적용한다.

| kind | page/workflow owner | reusable UI owner |
| --- | --- | --- |
| List | query/filter/sort/pagination/view mode, request, permission, selection scope | toolbar/table/card/pagination 표현과 interaction |
| Create | initial values/draft/touched/errors, submit/cancel/confirmation/result | field/form section/actions 표현 |
| Detail | route 검증, original/draft/tab, save/cancel/refresh/conflict/permission | detail section/card/read/edit control 표현 |

구체 shell geometry, list 컬럼, form 필드, detail 탭, route·payload는 solution/local adoption이 소유한다.
page 상태는 page 전용 hook/store와 함께 소유할 수 있다. 공유 수명이 맞을 때만 context/global store로 올린다.

## 9. 설계·리팩터링과 검증

설계에서는 사용자 흐름 → 상태·수명 → owner → dependency → public contract → failure·validation을 연결한다.
리팩터링은 current symbol/path → target owner/path → 근거를 기록하고 한 책임씩 이동한다. 타입만 같다고
합치거나 공개 export·runtime 평가 순서를 바꾸지 않는다. staged migration이 필요한 verified caller에만
compat export를 유지하고 제거 조건을 기록한다.

관련 `package.json`과 CI에 실제로 존재하는 typecheck/lint/test/build를 실행한다. 오래된 path·symbol,
역방향 import·cycle·private deep import·orphan을 검색하고 [import 기준](./import-style.md)을 적용한다.
문서 변경은 공용 저장소에서 공용 원본 저장소의 `npm run verify`로 검사한다. 실제 실행 결과와 미실행 이유를 구분한다.
