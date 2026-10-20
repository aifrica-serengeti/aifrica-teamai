# Next.js 테스트·관측·Production

## 테스트 층위

| 종류 | 주 대상 |
| --- | --- |
| unit | parser, validator, adapter, cache key builder, authorization policy |
| component | Client Component의 semantic UI와 interaction |
| integration | Server Function/Route Handler + DAL + test database |
| E2E | route, async Server Component, streaming, hydration, auth, browser history |
| production smoke | build artifact, env, headers, image/font/script, runtime/cache |

async Server Component는 모든 unit/component runner가 완전히 지원하지 않을 수 있으므로 중요한 flow는 E2E를
우선한다. server data layer와 pure view component를 분리하면 각 층을 독립 test하기 쉽다.

## route state matrix

각 page는 적용되는 상태를 검증한다.

- loading / streaming fallback
- ready data
- empty / filtered empty
- recoverable error / retry
- not-found
- unauthenticated / forbidden
- background refresh
- mutation pending/success/error/conflict
- navigation back/forward/direct reload
- mobile/zoom/keyboard/focus

## Server Function test

- malformed unknown/FormData
- authentication 없음/만료
- 다른 tenant/resource id
- permission별 허용/거절
- duplicate/idempotency
- validation field mapping
- transaction failure
- cache tag/path invalidation 호출
- redirect throw 성격과 destination
- serializable 최소 result

action을 UI에서만 click test하지 말고 server boundary를 직접 호출하는 integration test를 둔다.

## Route Handler test

Web Request를 구성해 method, query, header, body를 검증한다.

```ts
const request = new Request("http://localhost/api/projects?q=test", {
  headers: { authorization: `Bearer ${token}` },
});
const response = await GET(request);
expect(response.status).toBe(200);
```

NextRequest 전용 behavior, runtime/stream/cookie는 production-like integration 또는 E2E로 보완한다.

## cache test

- 같은 key hit와 다른 key isolation
- tenant/user dimension 누락 여부
- stale/revalidate/expire timing
- mutation 뒤 updateTag/revalidateTag 결과
- path와 tag가 다른 page에 미치는 범위
- cache handler outage
- multi-instance/self-host invalidation
- 404/permission/error cache 정책

시간 기반 test는 fake timer만 믿지 않고 실제 provider/handler integration도 확인한다.

## E2E

browser에서 확인할 것:

- soft navigation과 direct URL/hard reload
- loading/error/not-found file
- streaming content reveal
- Server Action progressive/hydrated submit
- Link prefetch와 pending
- browser back/forward, scroll/focus restore
- intercepted modal route
- hydration console error
- image responsive source/font/layout shift
- CSP와 third-party script

## `instrumentation.ts`

server observability 초기화를 한 곳에 둔다.

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node");
  }
}

export function onRequestError(error: unknown, request: RequestInfo, context: RequestContext) {
  reportRequestError(error, request, context);
}
```

지원 hook/signature는 설치 Next 버전 문서를 따른다.

- import-time side effect와 runtime mismatch를 줄인다.
- observability library가 client bundle에 포함되지 않게 한다.
- error를 중복 보고하지 않는다.
- route/path/user context에서 PII를 redaction한다.
- instrumentation failure가 app startup을 막을지 정책을 정한다.

## `instrumentation-client.ts`

hydration 전 client monitoring 초기화 같은 제한된 용도다. browser bundle/initial execution 비용에 직접 영향을
준다. 큰 analytics SDK와 blocking work를 넣지 않는다. consent와 session replay privacy를 확인한다.

## `useReportWebVitals`

Client Component에서 Web Vitals를 analytics로 보낸다.

```tsx
"use client";

export function WebVitals() {
  useReportWebVitals((metric) => {
    sendMetric({ name: metric.name, value: metric.value, id: metric.id });
  });
  return null;
}
```

callback identity가 매 render 바뀌지 않게 module scope/stable function을 검토한다. field data를 primary로 보고
Lighthouse는 lab signal로 사용한다. metric과 user/session 식별 결합은 privacy 정책을 따른다.

## production checklist

### Routing/rendering

- layout/page/error/not-found 경계가 완성됨
- Server/Client boundary 최소화
- dynamic/static/cache 의도가 설명됨
- request waterfall과 streaming boundary 검토

### Data/cache

- public/private/tenant isolation
- freshness와 invalidation owner
- database connection/pool/region
- cache handler multi-instance behavior
- timeout/retry/idempotency

### UI/accessibility

- semantic HTML와 label
- keyboard/focus/route transition
- loading/error/empty/permission
- responsive, zoom, reduced motion

### Security

- env/secret exposure
- DAL authorization
- Server Action/Route Handler validation
- CSP/security headers
- redirect/upload/image remote patterns
- logs/source maps/PII

### Metadata/assets

- title/description/canonical/robots
- Image sizes/allowlist
- font subset/weight
- script consent/strategy
- sitemap/OG endpoint

## `next build`와 start

production build는 type generation, static/dynamic route analysis와 bundle/runtime 오류를 발견한다. build 성공만으로
runtime env, database/cache, authorization과 browser behavior가 검증되지는 않는다.

가능하면 production-like 환경에서:

```sh
npm run build
npm run start
```

실제 `package.json` script를 사용한다. framework command를 문서에서 추측해 새 script처럼 보고하지 않는다.

## bundle 분석

Next.js 16의 Turbopack analyzer/trace와 설치된 analyzer integration을 확인한다.

- route별 client JS transfer
- accidental client boundary
- heavy barrel import
- duplicate library/version
- locale/editor/chart의 optional split
- server package externalization

크기만 보고 기능을 제거하지 않고 interaction latency와 load sequence를 함께 측정한다.

## deployment

- Node 최소 version과 runtime 일치
- reverse proxy의 host/proto/cookie/stream buffering
- static asset cache header와 build id
- graceful shutdown과 connection pool
- cache invalidation이 모든 instance에 전달됨
- image optimizer storage/network 요구
- writable filesystem 가정 없음
- region과 data source latency
- health/readiness가 핵심 dependency 상태를 올바르게 표현

## 검증 결과 기록

```text
Next 기준: installed exact version / local snapshot
Routes: 검증한 page, handler, proxy
State: loading/empty/error/auth/mutation
Cache: key, freshness, invalidation, isolation
Security: auth/authorization/input/secret
Commands: typecheck, lint, test, build
Browser: E2E/manual 결과
미실행: 이유와 남은 위험
```

실행하지 않은 명령과 production smoke를 통과했다고 보고하지 않는다.
