# JavaScript 로컬 적용 기준

> 마지막 공식 확인: 2026-08-12  
> 스냅샷 기준: ECMAScript 2026 stable snapshot + ECMAScript 2027 current draft preview  
> 일반 작업: 이 문서만 사용하며 최신성 확인을 위한 인터넷 검색 금지

## 적용 기준

production 언어 기준은 stable yearly snapshot과 프로젝트의 TypeScript target, bundler, Node.js, browser
지원 범위의 교집합이다. current draft와 TC39 proposal은 사전 영향 검토용이며 stable 채택으로 간주하지
않는다. transpiler가 syntax를 처리한다는 사실과 runtime API가 존재한다는 사실을 구분한다.

## 최신 지식 주입: ECMAScript 2026

ECMAScript 2026에 실제 포함된 기능군은 다음과 같다. TypeScript `lib`에 type이 있다는 사실만으로 runtime
지원이 보장되지 않으므로 target Node/browser와 feature availability를 확인한다. 지원을 알 수 없으면 기존
표현을 사용하거나 작은 adapter에서 feature detection한다.

### `Math.sumPrecise(iterable)`

크기가 크게 다른 Number들을 합할 때 일반 `reduce((a, b) => a + b, 0)`보다 부동소수점 정밀도 손실을
줄인다.

```ts
const values = [1e20, 0.1, -1e20];

const naive = values.reduce((sum, value) => sum + value, 0); // 0일 수 있음
const precise = Math.sumPrecise(values); // 작은 항의 기여를 더 정확히 보존
```

- iterable의 모든 값이 Number여야 하며 다른 type이면 `TypeError`가 발생한다.
- Decimal/통화의 정확한 소수 산술을 제공하는 API가 아니다. 금액은 minor unit 또는 검증된 decimal 정책을
  계속 사용한다.
- 매우 큰 collection의 business rounding policy는 별도로 적용한다.

### `Iterator.concat(...iterables)`

여러 sync iterable을 중간 Array 복사 없이 lazy sequence로 연결한다.

```ts
const allIds = Iterator.concat(activeIds, archivedIds, generatedIds());

for (const id of allIds) {
  processId(id);
}
```

Iterator helper와 조합할 수 있다.

```ts
const visibleNames = Iterator
  .concat(primaryUsers, invitedUsers)
  .filter((user) => user.visible)
  .map((user) => user.name)
  .toArray();
```

- iterator는 일반적으로 one-shot이다. 같은 instance를 다시 순회할 수 있다고 가정하지 않는다.
- lazy pipeline 안의 callback side effect와 throw 시 iterator cleanup을 고려한다.
- 반복 재사용·random access가 필요하면 Array로 materialize한다.

### `Array.fromAsync(source, mapper?)`

async iterable, sync iterable 또는 array-like source를 순서대로 소비해 Array를 만든다.

```ts
async function* pages() {
  yield await fetchPage(1);
  yield await fetchPage(2);
}

const rows = await Array.fromAsync(
  pages(),
  async (page) => normalizeRows(page),
);
```

- `Promise.all(Array.from(source, mapper))`와 달리 async iterable을 직접 지원하고 값을 순서대로 await한다.
- mapper 병렬성이 필요한 작업에는 자동 병렬화를 기대하지 말고 concurrency limit을 명시한 별도 utility를
  사용한다.
- 무한 stream을 Array로 만들지 않는다. abort/backpressure가 필요한 stream은 iterator/stream 상태로 처리한다.

### `Error.isError(value)`

다른 realm(iframe/worker 등)의 Error까지 판별하기 위한 표준 brand check다.

```ts
function toAppError(value: unknown): AppError {
  if (Error.isError(value)) {
    return { code: "UNEXPECTED", message: value.message, cause: value };
  }
  return { code: "UNEXPECTED", message: "알 수 없는 오류", cause: value };
}
```

`instanceof Error`보다 cross-realm에 강하지만 domain error code validation을 대신하지 않는다. runtime
미지원 환경에서는 기존 guard fallback이 필요하다.

### `Map` / `WeakMap`의 `getOrInsert` 계열

값이 없을 때 기본값을 넣고 반환하는 반복 코드를 줄인다.

```ts
const groups = new Map<string, User[]>();

for (const user of users) {
  groups.getOrInsertComputed(user.teamId, () => []).push(user);
}
```

- `getOrInsert(key, value)`: key가 없으면 이미 계산된 value를 삽입
- `getOrInsertComputed(key, callback)`: key가 없을 때만 callback으로 값을 계산
- 값이 `undefined`인 entry도 “key가 있음”으로 취급되는지 API 계약을 유지하며 `has` 의미와 혼동하지 않는다.
- callback이 throw하면 부분 초기화가 남는지 호출부 invariant를 test한다.
- WeakMap 버전은 object/symbol key 수명에 결합된 metadata cache에 사용한다.

### `Uint8Array` Base64·Hex 변환

binary data를 `btoa`/`atob`와 binary string으로 우회하지 않고 직접 변환한다.

```ts
const bytes = Uint8Array.fromHex("deadbeef");
const hex = bytes.toHex();

const tokenBytes = Uint8Array.fromBase64(encoded, {
  alphabet: "base64url",
  lastChunkHandling: "strict",
});

const encodedAgain = tokenBytes.toBase64({
  alphabet: "base64url",
  omitPadding: true,
});
```

사용 가능한 API:

- `Uint8Array.fromBase64(string, options?)`
- `Uint8Array.fromHex(string)`
- `bytes.setFromBase64(string, options?)`
- `bytes.setFromHex(string)`
- `bytes.toBase64(options?)`
- `bytes.toHex()`

입력 길이·형식 오류를 사용자 validation error로 변환하고, secret 값을 log에 출력하지 않는다. 대형 file은
전체 문자열 변환보다 stream 처리 비용을 검토한다.

### `JSON.parse` reviver의 source context

reviver의 세 번째 인자가 원본 JSON token text를 제공하므로 Number 변환 전에 정밀한 값을 복원할 수 있다.

```ts
const payload = JSON.parse(
  '{"invoiceId": 12345678901234567890}',
  (key, value, context) => {
    if (key === "invoiceId") return BigInt(context.source);
    return value;
  },
);
```

- `value`는 이미 Number parsing으로 정밀도를 잃었을 수 있으므로 정밀 복원에는 `context.source`를 사용한다.
- source context는 primitive reviver call에서 사용하는 범위로 제한한다.
- schema validation과 허용 크기 제한 없이 임의 BigInt/Number를 만들지 않는다.

### `JSON.rawJSON()` / `JSON.isRawJSON()`

검증된 JSON primitive text를 `JSON.stringify` 결과에 문자열 escaping 없이 삽입한다.

```ts
const body = JSON.stringify({
  invoiceId: JSON.rawJSON("12345678901234567890"),
});

// {"invoiceId":12345678901234567890}
```

- `JSON.rawJSON(text)`는 유효한 JSON primitive text만 허용한다.
- object/array serialization을 우회해 임의 JSON fragment를 주입하는 escape hatch로 사용하지 않는다.
- 외부 입력을 그대로 전달하지 않고 schema·형식·범위를 먼저 검증한다.
- `JSON.isRawJSON(value)`로 raw wrapper 여부를 확인할 수 있다.

## 함께 알아야 할 ECMAScript 2025 지식

2026 runtime은 보통 다음 2025 기능도 제공할 가능성이 높지만 project runtime을 확인한다.

```ts
// Iterator helpers: lazy map/filter/take/drop/flatMap + terminal toArray/reduce 등
const firstThreeNames = users.values().filter(isActive).map(getName).take(3).toArray();

// Set methods
const visible = allowedIds.intersection(selectedIds);
const missing = requiredIds.difference(receivedIds);

// dynamic RegExp literal input escaping
const pattern = new RegExp(`^${RegExp.escape(userInput)}$`, "u");

// sync throw 또는 value/Promise를 항상 Promise로 정규화
const result = await Promise.try(() => plugin.run());

// JSON module import attribute
import config from "./config.json" with { type: "json" };

// half precision data
const weights = new Float16Array(1024);
const rounded = Math.f16round(0.1);
```

- Iterator helper는 lazy이며 Array method와 반환·평가 시점이 다르다.
- Set method argument는 set-like contract를 따르므로 무조건 Array를 넘기지 않는다.
- `RegExp.escape`는 사용자 문자열을 literal pattern 조각으로 만들며 전체 regex validation을 대신하지 않는다.
- JSON module syntax는 bundler/Node/browser와 TypeScript module 설정을 함께 확인한다.
- Float16은 memory/GPU/data format 요구가 있을 때 사용하며 일반 business number precision 개선 API가 아니다.

## Module과 binding

- ESM `import`/`export`를 기본으로 사용한다.
- `const`를 기본으로 하고 binding 자체를 다시 할당해야 할 때만 `let`을 사용한다.
- module top-level side effect를 줄이고 import 순서에 의존하는 초기화를 피한다.
- type-only dependency는 TypeScript `import type`으로 runtime graph와 분리한다.
- barrel export는 public boundary가 명확할 때 사용하고 순환 dependency와 불필요한 bundle 포함을 확인한다.
- dynamic import는 실제 code splitting 또는 optional capability가 필요할 때 사용하고 loading/error를 설계한다.

## 값, identity와 mutation

- primitive value와 object identity의 차이를 의식한다.
- 전달받은 object, array, Map/Set을 소유권 없이 mutate하지 않는다.
- React state와 cache update는 변경 경로에 새 identity를 만든다.
- 깊은 clone으로 소유권 문제를 덮지 않는다. 입력 경계의 adapter와 immutable update 범위를 명확히 한다.
- equality가 domain identity인지 reference identity인지 정하고 comparison을 구현한다.
- `null`, `undefined`, 누락 field, 빈 문자열과 0을 `||`로 동일 취급하지 않는다. 기본값은 필요하면 `??`를
  사용하고 계약을 명시한다.
- optional chaining으로 필수 데이터 누락을 조용히 삼키지 않는다.

## Collection과 반복

- transformation은 `map`, 선택은 `filter`, 단일 결과 축약은 의미가 분명할 때 `reduce`를 사용한다.
- side effect만 필요하면 `forEach` 또는 명시적 loop를 사용하고 `map` 결과를 버리지 않는다.
- early exit, async 순서, 성능이 중요하면 `for...of` 등 명시적 loop를 선택한다.
- `Promise` callback에 `forEach`를 사용해 await가 무시되지 않게 한다.
- Map은 임의 string key object보다 key identity와 size/iteration 계약이 필요한 경우 사용한다.
- Set은 중복 제거와 membership에 사용하며 결과 순서 요구를 확인한다.
- sort는 원본 mutation 여부, stable comparison, locale, 숫자·날짜 정렬을 확인한다.
- 큰 collection에서 여러 pass가 실제 병목인지 측정하기 전에 복잡한 단일 loop로 바꾸지 않는다.

## 함수와 API 설계

- 함수는 한 수준의 책임을 갖고 입력·출력·오류 계약을 명확히 한다.
- positional boolean argument보다 명시적 options object나 별도 함수를 선택한다.
- callback이 sync인지 async인지 계약을 드러내고 반환 Promise를 잃지 않는다.
- default parameter는 누락/undefined에만 적용된다는 점을 고려한다.
- pure transformation과 side effect를 분리해 test 가능성을 높인다.
- utility가 domain rule을 숨기면 generic core가 아니라 해당 domain에 둔다.

## 비동기 작업

- Promise chain과 `async`/`await` 중 codebase 관례를 따르되 오류 흐름을 잃지 않는다.
- 독립 작업은 `Promise.all`, 부분 성공이 유효하면 `Promise.allSettled`를 검토한다.
- 순차 실행은 이전 결과 또는 rate/order requirement가 실제로 필요할 때만 사용한다.
- 취소 가능한 fetch/API에는 `AbortSignal`을 전달한다.
- component unmount, query 변경, 새 요청 시작 시 이전 결과가 최신 state를 덮지 않게 한다.
- timeout은 단순 reject뿐 아니라 실제 작업 취소와 cleanup을 포함한다.
- 중복 submit과 retry는 idempotency와 server 영향까지 고려한다.
- fire-and-forget Promise는 오류 owner와 lifecycle이 명확한 경우에만 의도적으로 표시한다.

비동기 UI는 최소한 다음 상태를 구분한다.

- idle 또는 initial
- pending initial load
- existing data refresh
- success with data
- success empty
- recoverable error와 retry
- cancelled/superseded
- mutation pending/success/failure/rollback

## 오류 처리

- 오류를 빈 catch로 삼키지 않는다.
- 예상 가능한 validation/auth/not-found/conflict와 예상하지 못한 programming/infrastructure error를 구분한다.
- low-level error를 page가 이해할 수 있는 typed/domain error로 변환하되 원인을 잃지 않는다.
- 사용자 메시지에 stack, token, internal endpoint와 개인 정보를 노출하지 않는다.
- logging은 중복 보고, 민감 정보, sampling과 correlation id를 고려한다.
- `throw` 값은 Error 또는 명시적 typed error 계약으로 통일한다.
- retry는 안전한 작업과 일시적 오류에만 제한하고 backoff/cancellation을 고려한다.

## 외부 입력과 runtime validation

다음 값은 TypeScript type annotation이 있어도 신뢰하지 않는다.

- network response와 webhook data
- URL path/query/hash
- form data와 file metadata
- local/session storage
- `postMessage`, third-party SDK와 embedded content
- environment/runtime configuration

입력 경계에서 schema 또는 명시적 guard로 검증하고 domain model로 변환한다. validation 실패는 가능한
field/path 정보와 복구 정책을 제공한다. client validation은 server validation을 대체하지 않는다.

## 날짜, 숫자와 국제화

- locale 표시에는 공용 `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat`,
  `Intl.Collator`를 사용한다.
- formatter를 반복 생성하지 말고 locale/options 기준으로 공용화한다.
- timestamp의 timezone, date-only 값, server serialization 계약을 구분한다.
- ISO string을 locale 날짜처럼 잘라 쓰지 않는다.
- 금액은 currency와 minor unit/rounding 정책을 명확히 한다.
- user-facing sort/search는 단순 code point comparison과 locale comparison의 차이를 고려한다.

## DOM과 browser lifecycle

- event listener, observer, timer, animation frame, subscription을 owner가 정리한다.
- event delegation은 dynamic list와 성능에 도움이 될 때 사용하고 target/currentTarget을 구분한다.
- passive listener, capture, preventDefault가 scroll/gesture와 accessibility에 미치는 영향을 확인한다.
- layout read와 write를 반복해 forced layout을 만들지 않는다.
- browser API는 SSR에서 존재하지 않을 수 있으므로 client boundary에서 접근한다.
- visibility, online/offline, storage event는 보조 신호이며 business truth로 사용하지 않는다.

## 보안

- `eval`, dynamic Function, 검증되지 않은 script/HTML 삽입을 사용하지 않는다.
- URL protocol과 redirect target을 allowlist한다.
- object key를 외부 입력으로 합칠 때 prototype pollution과 reserved key를 고려한다.
- local storage를 secret 저장소로 사용하지 않는다.
- random id와 security token은 목적에 맞는 cryptographic API를 구분한다.
- client-side permission check와 숨긴 UI를 authorization으로 간주하지 않는다.
- 로그, analytics, error context에 credential과 개인 정보를 포함하지 않는다.

## 성능

- network, parse/evaluate, long task, memory, layout과 render 중 실제 병목을 먼저 측정한다.
- 불필요한 serialization, deep clone, 중복 parsing과 거대한 object retention을 경계한다.
- worker는 CPU-bound 작업이 사용자 interaction을 막는 경우에만 message 비용과 cancellation을 포함해 검토한다.
- debounce와 throttle은 사용자 의도, 마지막 값 보장, cancellation과 accessibility feedback을 설계한다.
- micro-optimization보다 algorithm, request 수, payload와 DOM 크기를 먼저 개선한다.

## stable과 draft 구분

- stable ECMAScript snapshot에 포함된 syntax도 project target/runtime에서 지원되는지 확인한다.
- ECMAScript 2027 current draft 내용은 다음 yearly snapshot 전까지 바뀔 수 있다.
- Stage 0~3 proposal을 production Aifrica 기준으로 문서화하지 않는다.
- Stage 4라도 project toolchain이 아직 지원하지 않으면 사용하지 않는다.
- polyfill은 global mutation, bundle size와 지원 browser 범위를 검토한 뒤 추가한다.

## 금지 패턴

- 빈 catch와 unhandled Promise
- async `forEach`
- 외부 입력을 type assertion만으로 신뢰
- `||`로 0/빈 문자열과 누락 값을 혼동
- 공유 object/React state의 직접 mutation
- import-time network/DOM side effect
- 검증되지 않은 HTML, URL, storage 값 사용
- proposal 또는 draft 기능을 stable로 간주
- 성능 근거 없이 복잡한 micro-optimization 추가

## 구현 체크리스트

- [ ] project target, Node/browser, bundler 지원을 확인했다.
- [ ] 값의 소유권과 mutation 범위가 명확하다.
- [ ] async 성공·실패·취소·중복·stale response를 처리한다.
- [ ] 외부 입력을 runtime validation한다.
- [ ] error owner와 사용자 복구 경로가 있다.
- [ ] 날짜·숫자·정렬은 공용 locale formatter를 사용한다.
- [ ] listener/timer/request cleanup을 확인했다.
- [ ] typecheck, lint, test를 실행했다.

## 공식 source 기록

- [ECMAScript 2026 specification](https://tc39.es/ecma262/2026/)
- [Current ECMA-262 draft](https://tc39.es/ecma262/)
- [MDN JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

이 링크는 스냅샷의 출처다. 일반 작업 중 다시 열지 않으며 사용자가 업데이트를 요청한 경우에만
`$aifrica-frontend-docs`로 확인한다.
