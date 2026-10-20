# Next.js 설정·Turbopack·Migration

## 설정 변경 원칙

`next.config.*`는 runtime/compiler/cache/security 동작을 넓게 바꾸는 public infrastructure contract다. page
기능 하나를 해결하려고 전역 option을 추가하지 않는다. 설치된 Next type과 official bundled docs에서 exact
option을 확인한다.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

framework default인 option을 불필요하게 재선언하지 않는다. 왜 override하는지와 제거 조건을 기록한다.

## Next.js 16 runtime 기준

스냅샷 기준 주요 요구:

- Node.js `20.9.0` 이상
- TypeScript `5.1.0` 이상
- Chrome/Edge 111+, Firefox 111+, Safari 16.4+ 기본 browser baseline
- `next dev`/`next build` 기본 Turbopack
- async request APIs
- `middleware`에서 `proxy` naming/runtime 전환
- `next lint` 제거

현재 project가 이 기준을 채택했다는 뜻은 아니다. package engine, CI image, hosting runtime와 developer local을
같이 inventory한다.

## Turbopack

Next.js 16에서는 dev/build 기본이다.

Migration 점검:

- custom webpack loader/plugin
- alias/resolve extension
- SVG/CSS-in-JS transform
- monorepo root와 symlink
- native/binary package
- module side effect와 tree shaking
- source map와 error reporting
- test/build script의 명시적 webpack flag

Turbopack config와 webpack config를 동시에 두면 build가 실패하거나 명시적 opt-out이 필요할 수 있다. 과거
webpack workaround를 그대로 옮기지 않고 package가 native 지원하는지 확인한다.

## lint

`next lint` command가 제거된 기준에서는 ESLint 또는 Biome CLI를 실제 script로 둔다.

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "build": "next build"
  }
}
```

예시를 그대로 복사하지 않고 existing flat/legacy config, TypeScript parser와 plugin compatibility를 확인한다.
build가 lint/typecheck를 항상 수행한다고 가정하지 않는다.

## async request API migration

변경 대상:

- Page/Layout/Route/metadata/image의 `params`
- Page `searchParams`
- `cookies()`
- `headers()`
- `draftMode()`

```tsx
// 이전 동기 접근을 남기지 않는다.
const { projectId } = await params;
const cookieStore = await cookies();
```

official codemod를 사용하더라도 diff를 검토한다. helper wrapper, type alias, test mock와 third-party integration은
자동 변환이 누락될 수 있다. temporary unsafe cast/compat helper를 장기 유지하지 않는다.

## `middleware` → `proxy`

```ts
// proxy.ts
export function proxy(request: NextRequest) {
  return NextResponse.next();
}
```

- export/function/file 이름 변경
- matcher 유지 여부
- Node.js runtime dependency
- Edge-only API 제거
- authorization을 Proxy 하나에만 두지 않기
- deployment config와 observability route name

을 확인한다. framework codemod가 business logic/runtime compatibility를 보장하지 않는다.

## Cache Components migration

`cacheComponents: true`는 단순 성능 flag가 아니다. 기존 route rendering, dynamic request API, Suspense, cache
directive와 revalidation model을 바꾼다.

Migration 순서:

1. route별 public/private/request data 분류
2. 기존 fetch/unstable cache/dynamic config inventory
3. static shell과 request subtree 설계
4. 필요한 Suspense fallback 추가
5. cache key/life/tag 명시
6. mutation invalidation 전환
7. multi-user isolation과 production cache test

PPR 관련 과거 experimental option을 현재 Cache Components 모델과 혼용하지 않는다.

## image migration

Next.js 16 점검 항목:

- `priority` → 명확한 `preload`
- `images.qualities` allowlist
- minimum cache TTL 변화
- local image query string과 `localPatterns`
- remote pattern을 broad hostname wildcard로 두지 않기
- legacy Image prop/API 제거 여부

visual regression, LCP와 optimizer source access를 test한다.

## removed/deprecated 기능

version 16 upgrade 시 공식 guide에서 다음 계열을 inventory한다.

- runtime config 대안(env)
- AMP support 제거
- legacy lint command
- synchronous request access
- middleware naming
- 오래된 image/API option
- experimental option의 stable replacement

이 목록만으로 migration을 완료했다고 판단하지 않고 설치 version의 bundled upgrade guide를 읽는다.

## environment와 output

- build-time public env와 runtime server env 구분
- standalone/output mode의 file tracing
- monorepo external package와 output root
- basePath/assetPrefix와 CDN URL
- trailingSlash/i18n rewrites 영향
- Docker user, read-only filesystem와 cache directory
- source map 공개 범위

custom server는 framework optimization/deployment portability를 잃을 수 있으므로 기존 platform으로 해결할 수
없는 요구에만 사용한다.

## package bundling

server dependency가 bundle되어야 하는지 external이어야 하는지 확인한다. native addon, optional dependency,
dynamic require와 monorepo package가 production artifact에 실제 포함되는지 smoke test한다. client bundle에서 Node
polyfill/secret package가 보이면 boundary 오류를 먼저 찾는다.

## codemod 사용 원칙

1. clean comparison 가능한 현재 작업 tree 확보
2. exact target version과 codemod 확인
3. dry run 또는 제한된 path에서 실행
4. generated diff를 수동 검토
5. typecheck/lint/test/build
6. browser/deployment smoke
7. 남은 TODO/unsafe cast 제거

사용자의 dependency/migration 요청 없이 codemod와 package upgrade를 실행하지 않는다.

## 단계적 migration

```text
runtime/CI baseline
  → dependency peer compatibility
  → codemod와 compile errors
  → request/routing behavior
  → cache/render architecture
  → image/metadata/assets
  → tests/build
  → canary deployment/metrics
  → production rollout/rollback
```

한 번에 Cache Components, React Compiler, auth architecture와 CSS pipeline을 모두 바꾸지 않는다. 회귀 원인을
구분할 수 있는 단계로 나눈다.

## AI용 version-matched docs

Next.js 16.2 계열 이후 설치 package가 제공하는 `node_modules/next/dist/docs/`를 먼저 찾는다. 이 문서는
설치 exact version과 구조가 일치하므로 generic web 최신 문서보다 구현 signature에 적합하다.

AI 작업 규칙:

- 관련 bundled doc을 찾아 읽고 코드 작성
- 이 Aifrica 지식 팩으로 architecture/security/state 적용
- package docs가 없으면 로컬 snapshot 사용
- 둘이 다르면 installed API를 우선하고 차이를 보고
- node_modules 문서를 repository source처럼 수정하지 않음

## Migration 검증표

- [ ] Node/React/TypeScript/ESLint/test/hosting 호환성
- [ ] async request API와 generated route type
- [ ] Turbopack/custom webpack 차이
- [ ] Proxy runtime/naming/matcher
- [ ] Cache Components와 user isolation
- [ ] image/font/script/metadata 회귀
- [ ] typecheck, lint, unit/integration/E2E, build
- [ ] production-like start와 smoke
- [ ] observability metric 비교와 rollback plan
