# TypeScript 로컬 적용 기준

> 마지막 공식 확인: 2026-08-12  
> 스냅샷 기준: TypeScript 7.0 · npm latest 관찰 `7.0.2`  
> 일반 작업: 이 문서만 사용하며 최신성 확인을 위한 인터넷 검색 금지

## 버전과 compiler 정책

작업 전 `package.json`, lockfile, `tsconfig*`, framework/build/test/lint tool의 TypeScript 지원 범위를
확인한다. 이 문서의 7.0 기준은 최신 관찰 스냅샷이며 현재 solution의 업그레이드 선언이 아니다.

- `strict`를 유지한다.
- project reference, module/moduleResolution, target, lib, JSX, paths 설정을 임의로 바꾸지 않는다.
- type error를 `any`, 넓은 assertion, `@ts-ignore`, non-null assertion으로 숨기지 않는다.
- generated config나 framework plugin이 소유한 compiler option은 해당 toolchain과 함께 검토한다.
- dependency upgrade와 TypeScript major migration은 별도 요청으로 처리한다.

## 최신 지식 주입: TypeScript 7.0

TypeScript 7.0의 핵심은 새 type syntax보다 compiler와 language server가 Go 기반 native toolchain으로
교체된 것이다. TypeScript 6.0과 type-checking/CLI 동작의 호환을 목표로 하지만, 6.0에서 deprecated된
option과 construct는 7.0에서 hard error가 될 수 있다.

### AI가 기억해야 할 7.0 사실

| 항목 | TypeScript 7.0 기준 |
| --- | --- |
| compiler | native Go port, multi-threaded type checking |
| package | `typescript`의 `tsc`; npm latest 관찰 `7.0.2` |
| programmatic API | 7.0에는 제공되지 않음; 7.1에서 새 API 계획 |
| editor | LSP 기반 language server; editor의 TS7 지원 확인 |
| type semantics | TS 6.0 호환이 목표, `stableTypeOrdering` 전제 |
| embedded language | Vue/MDX/Astro/Svelte/Angular 등은 7.0 API 부재로 TS6 병행 가능성 큼 |
| lint/tool | typescript-eslint, custom transformer, compiler API consumer는 TS6 compatibility 필요 |

따라서 “React/Vite/Next app이므로 TS7로 바로 변경”하지 않는다. `typescript` package를 compiler API로
import하는 모든 tool, editor, framework plugin과 generated type pipeline을 먼저 inventory한다.

### TypeScript 6/7 기본값 변화와 명시적 config

새 config 또는 명시하지 않은 option의 기본값 변화를 의식한다. 아래는 migration 때 비교할 명시적 config
예시이며 `types: ["node"]`처럼 project runtime에 따라 선택하는 값도 포함하므로 그대로 복사하지 않는다.

```json
{
  "compilerOptions": {
    "strict": true,
    "module": "esnext",
    "noUncheckedSideEffectImports": true,
    "libReplacement": false,
    "stableTypeOrdering": true,
    "rootDir": "./",
    "types": ["node"]
  }
}
```

위 block을 그대로 복사하지 않는다. 실제 framework config의 `moduleResolution`, DOM lib, JSX, noEmit과
include/exclude를 유지하면서 변화만 비교한다.

- `strict`가 기본 true여도 repository config에 명시해 의도를 드러내는 것이 좋다.
- `module` 기본은 `esnext`, `target` 기본은 `esnext` 직전 stable ECMAScript가 된다.
- side-effect-only import의 type resolution 오류가 기본적으로 드러날 수 있다.
- `stableTypeOrdering`은 7.0에서 끌 수 없는 기준이므로 snapshot/type error ordering에 의존한 test를 점검한다.
- `rootDir` 추론 변화로 output이 `dist/src`처럼 달라질 수 있어 library/build path를 확인한다.
- ambient type 자동 포함이 달라질 수 있으므로 Node/test runtime type을 `types`에 명시한다.
- TypeScript 6의 deprecated option을 `ignoreDeprecations`로 장기간 숨기지 않는다. 7.0에서는 제거될 수 있다.

### TS7과 TS6 side-by-side

compiler API를 요구하는 tool이 있으면 official compatibility package를 검토한다.

```json
{
  "devDependencies": {
    "@typescript/native": "npm:typescript@^7.0.2",
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

이 구조에서 `typescript` import는 TS6 API를, `@typescript/native`가 제공하는 `tsc`는 TS7 compiler를
담당하게 구성할 수 있다. package manager, binary resolution과 CI command를 실제로 확인해야 하므로 사용자의
migration 요청 없이 적용하지 않는다.

### 최근 TypeScript 지식: `NoInfer<T>`

한 argument가 generic inference 후보가 되는 것을 막고 다른 source에서 추론된 type만 검증하게 한다.

```ts
function createSelect<const T extends string>(options: {
  values: readonly T[];
  defaultValue?: NoInfer<T>;
}) {
  return options;
}

createSelect({ values: ["list", "card"] as const, defaultValue: "list" });
// defaultValue: "grid"는 values에서 추론된 union에 없으므로 오류
```

generic inference가 실제로 너무 넓어지는 API에만 사용한다. 단순 prop union을 generic으로 바꾸기 위한 기능이
아니다.

### 최근 TypeScript 지식: inferred type predicate

조건이 명확하면 filter callback의 predicate를 compiler가 추론할 수 있다.

```ts
const values: Array<string | undefined> = ["a", undefined, "b"];
const definedValues = values.filter((value) => value !== undefined);
// string[]로 추론 가능한 최신 compiler
```

callback이 parameter를 mutate하거나 모호한 truthiness를 사용하면 predicate 추론이 되지 않거나 의도와 달라질
수 있다. `filter(Boolean)`이 모든 falsy domain value를 제거한다는 문제는 여전히 남는다.

### 최근 TypeScript 지식: `satisfies` + const type parameter

```ts
const statusTone = {
  ready: "neutral",
  running: "info",
  failed: "danger",
} as const satisfies Record<Status, BadgeTone>;

function defineColumns<const T extends readonly ColumnDefinition[]>(columns: T): T {
  return columns;
}
```

- `satisfies`는 shape를 검사하면서 expression의 좁은 literal type을 보존한다.
- `as SomeType`처럼 값을 해당 type으로 강제 변환하지 않는다.
- const type parameter는 호출부 literal inference를 보존해야 하는 factory/config API에 사용한다.

### 최근 compiler 기능: `--isolatedDeclarations`

각 파일의 declaration emit이 다른 source의 type inference에 과도하게 의존하지 않게 검사한다. library와
병렬 declaration emit 도구에 유용하다.

```ts
// public export는 명시적 반환 타입을 제공한다.
export function getProject(id: string): ProjectSummary {
  return projectStore.get(id);
}
```

application code에 무조건 켜지 않는다. public library boundary와 declaration build 성능 요구가 있을 때
`declaration` toolchain과 함께 검토한다.

### 최근 compiler 기능: `--noCheck`

type checking 없이 emit만 수행하는 compiler mode다. build pipeline에서 emit과 typecheck를 분리할 수 있지만
검증을 생략하는 option으로 사용하면 안 된다.

```json
{
  "scripts": {
    "build:emit": "tsc --noCheck",
    "typecheck": "tsc --noEmit"
  }
}
```

CI에서 별도 `typecheck`가 반드시 성공해야 하며 framework build가 typecheck를 대신한다고 가정하지 않는다.

### 최근 module 기능: relative extension rewrite

TypeScript source가 `.ts` extension으로 상대 import할 때 emit 결과를 `.js`로 rewrite하는 option을 사용할 수
있는 toolchain이 있다.

```ts
import { parseProject } from "./parse-project.ts";
```

`rewriteRelativeImportExtensions` 사용 여부는 Node ESM, bundler, declaration 소비자와 package export 정책을
함께 확인한다. path alias, package import와 dynamic string import를 모두 해결하는 기능은 아니다.

### 최근 module syntax: `import defer`

module을 link하되 실제 evaluation을 namespace를 처음 사용할 때까지 지연하는 syntax를 TypeScript가 이해할 수
있는 환경이 있다.

```ts
import defer * as analytics from "./analytics.js";

export function trackOpen() {
  analytics.track("open"); // 이 시점에 module evaluation
}
```

- namespace import 형태만 사용한다.
- runtime/bundler가 syntax와 semantics를 실제 지원해야 한다.
- side effect 순서에 의존하는 module에는 사용하지 않는다.
- 일반 dynamic `import()`와 loading/error/Promise contract가 다르다.

### `erasableSyntaxOnly`

type 제거만으로 JavaScript가 되는 syntax만 허용해 runtime transform이 필요한 TypeScript syntax를 막는 설정이다.
Node의 type stripping 같은 실행 모델과 맞출 때 유용하다.

```json
{
  "compilerOptions": {
    "erasableSyntaxOnly": true
  }
}
```

enum, parameter property, namespace 등 emit transform이 필요한 syntax가 제한될 수 있다. 기존 codebase에
무단 적용하지 않고 runtime execution 전략과 migration 범위를 먼저 확인한다.

## 타입 설계 원칙

- 타입은 가능한 값과 불가능한 값을 명확히 표현해야 한다.
- 구현 편의보다 호출부의 잘못된 사용을 막는 public contract를 우선한다.
- data shape가 같아도 API DTO, domain model, form draft, view model의 책임이 다르면 별도 type과 adapter를 둔다.
- 넓은 object type보다 실제로 필요한 property를 명시한다.
- optional property는 “없을 수 있음”이라는 domain 의미가 있을 때만 사용한다.
- `null`, `undefined`, 누락과 empty value의 의미를 섞지 않는다.
- type alias와 interface는 codebase 관례를 따르되 확장 계약과 union 표현 목적을 구분한다.

## `unknown`, `any`와 assertion

- network, URL, storage, form, third-party 값은 `unknown`으로 받고 runtime validation 후 좁힌다.
- `any`는 점진 migration 또는 타입이 없는 외부 경계에 국소적으로 격리하고 즉시 typed adapter로 변환한다.
- `as SomeType`은 runtime 변환이 아니다. 실제 validation 없이 신뢰 경계를 넘지 않는다.
- `as const`와 `satisfies`는 literal 보존과 shape 검증 목적을 구분해 사용한다.
- non-null assertion은 lifecycle/invariant가 코드로 보장되고 더 안전한 구조가 없을 때만 제한한다.
- `@ts-expect-error`는 예상 오류와 이유를 기록하고 compiler upgrade에서 불필요해지면 검출되게 한다.

## Union과 narrowing

서로 배타적인 상태는 discriminated union으로 모델링한다.

```ts
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; data: T; refreshing: boolean }
  | { status: "empty" }
  | { status: "error"; error: AppError; canRetry: boolean };
```

- 공통 discriminator를 사용해 control flow narrowing이 동작하게 한다.
- `in`, `typeof`, `instanceof`, user-defined guard를 실제 runtime 사실과 맞게 사용한다.
- exhaustive `switch`와 `never` check로 새 상태 누락을 compile time에 검출한다.
- 여러 boolean(`isLoading`, `isError`, `hasData`)이 불가능한 조합을 만들면 union으로 바꾼다.
- type predicate가 실제 validation보다 넓은 값을 참으로 반환하지 않게 test한다.

## API, DTO와 adapter

- 요청 payload DTO와 응답 model을 분리한다.
- generated API type이 있으면 원본을 복제하지 않고 adapter에서 domain/view model로 변환한다.
- snake_case, nullable, enum-like server 값을 component에 직접 전파하지 않는다.
- adapter는 default, unknown enum, 날짜·숫자 parsing과 validation failure 정책을 명시한다.
- pagination, response envelope, error contract는 `domains/common` 등 실제 공통 경계에서 재사용한다.
- component가 domain DTO를 prop으로 받아 API 변경에 끌려가지 않게 한다.

## React component type

- prop은 rendering과 interaction에 필요한 최소 계약으로 정의한다.
- variant는 string union, event는 의미 있는 callback signature로 표현한다.
- controlled prop과 default/uncontrolled prop의 조합에서 불가능한 상태를 union으로 막는 방식을 검토한다.
- native element prop을 확장할 때 충돌하는 name/value/onChange 계약을 명시적으로 omit·재정의한다.
- polymorphic `as` generic은 실제 design system 요구가 있고 ref/event 추론까지 검증할 수 있을 때만 사용한다.
- `children`이 필수가 아니면 자동으로 모든 component에 추가하지 않는다.
- `React.FC` 사용 여부는 project 관례를 따르되 반환과 generic 추론을 흐리지 않는다.
- ref type은 노출할 실제 element/imperative handle과 일치시킨다.

## Generic 사용

- generic은 여러 호출부에서 타입 관계를 보존하고 추론을 개선할 때 사용한다.
- 한 타입만 받거나 union으로 충분한 API를 과도하게 generic으로 만들지 않는다.
- type parameter 이름과 constraint로 관계를 드러낸다.
- conditional/mapped type은 public error message와 compiler 성능을 해치지 않는 범위에서 사용한다.
- default generic이 중요한 오류를 숨기지 않게 한다.
- generic table/form component가 domain rule, column state, validation owner를 가져가지 않게 한다.

## Function과 event 타입

- callback input, output, sync/async 계약을 정확히 표현한다.
- `() => void`에 async callback을 넘겨 Promise 오류가 유실되는 경계를 확인한다.
- DOM/React event type과 domain value callback을 분리해 하위 구현을 호출부에 노출하지 않는다.
- overload는 호출 signature가 명확히 다를 때 사용하고 union parameter로 충분한 경우 복잡도를 늘리지 않는다.
- optional callback 호출과 오류 처리를 implementation에서 명확히 한다.

## Error와 Result 모델

- 예상 가능한 domain failure는 code/discriminator와 필요한 metadata를 가진 type으로 표현한다.
- programming error와 validation/auth/not-found/conflict를 같은 string error로 평탄화하지 않는다.
- Result type은 실제 codebase가 일관되게 소비할 때 사용한다. Promise rejection과 Result를 무질서하게 섞지 않는다.
- catch value는 `unknown`으로 취급하고 Error/domain error로 좁힌다.
- user message, log context와 원본 cause의 책임을 분리한다.

## Module과 public boundary

- `import type`/`export type`으로 type dependency와 runtime dependency를 구분한다.
- public barrel은 안정된 export만 노출하고 내부 구현 type을 새 계약처럼 퍼뜨리지 않는다.
- 순환 import와 runtime enum import를 확인한다.
- enum은 project 정책과 runtime 필요를 확인한다. 제한 문자열은 union + typed mapping이 더 단순한지 검토한다.
- declaration merging, global augmentation은 framework integration처럼 소유 범위가 명확할 때만 사용한다.

## Utility type 사용

- `Pick`/`Omit`은 원본 모델 변화가 파생 계약에 자동 전파되어도 안전할 때만 사용한다.
- form draft를 `Partial<ApiDto>`로 대체해 invalid state를 숨기지 않는다.
- `Record`는 key 집합이 완전해야 할 때 유용하며 unknown string map과 구분한다.
- `Readonly`는 compile-time mutation 방지이며 deep runtime immutability가 아님을 이해한다.
- custom deep utility는 compiler 성능과 error readability를 확인한다.

## Type test와 검증

- typecheck는 emit/build와 별도로 실행될 수 있으므로 실제 package script를 확인한다.
- public generic, overload, discriminated union에는 필요하면 compile-time type test를 둔다.
- runtime validator와 inferred type이 같은 source에서 나오거나 서로 일치하는지 test한다.
- `skipLibCheck`로 application error를 숨기지 않는다. 설정 변경은 dependency/toolchain 영향과 함께 검토한다.
- IDE에서만 성공하고 CI compiler에서 실패하지 않도록 같은 config와 version을 사용한다.

## TypeScript 7 migration 주의

이 스냅샷 기준 TypeScript 7은 native toolchain 전환을 포함하며 7.0에 기존과 동일한 programmatic API가
없다. 다음 의존성이 있으면 단순 compiler 교체로 취급하지 않는다.

- TypeScript compiler API를 직접 호출하는 script/tool
- typescript-eslint와 custom lint rule
- framework compiler/plugin과 code generator
- MDX, Vue, Astro, Svelte 등 embedded language tooling
- editor extension, language service plugin과 custom transformer
- test runner, coverage, path resolver와 declaration bundler

Migration 절차:

1. 모든 TypeScript 연동 tool과 peer dependency를 inventory한다.
2. 현재 typecheck/lint/test/build/editor 결과를 baseline으로 저장한다.
3. compiler option·module resolution·declaration output 변화를 비교한다.
4. generated code와 compiler API consumer를 별도로 검증한다.
5. 전체 repository와 CI, editor, production build를 통과한 뒤 채택한다.

## 금지 패턴

- 외부 입력에 type assertion만 적용
- application type error를 `any`/`@ts-ignore`로 숨김
- 모든 form state를 `Partial<Dto>`로 표현
- 여러 boolean으로 불가능한 UI 상태 허용
- domain DTO 전체를 공용 component prop으로 전달
- 오류를 `string` 하나로 평탄화
- 이점이 없는 복잡한 generic/conditional type
- official latest라는 이유만으로 TypeScript major upgrade

## 구현 체크리스트

- [ ] 실제 TypeScript와 toolchain version/config를 확인했다.
- [ ] 외부 입력은 `unknown`에서 validation한다.
- [ ] DTO/domain/form/view model 책임이 분리되어 있다.
- [ ] 배타 상태는 discriminated union으로 표현했다.
- [ ] public prop과 generic이 최소이고 추론 가능하다.
- [ ] exhaustive check로 상태 추가 누락을 막는다.
- [ ] any/assertion/suppression의 이유와 범위가 명확하다.
- [ ] typecheck, lint, test, build를 실제 script로 실행했다.

## 공식 source 기록

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript team release blog](https://devblogs.microsoft.com/typescript/)
- [TypeScript 7.0 release](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)

이 링크는 스냅샷의 출처다. 일반 작업 중 다시 열지 않으며 사용자가 업데이트를 요청한 경우에만
`$aifrica-frontend-docs`로 확인한다.
