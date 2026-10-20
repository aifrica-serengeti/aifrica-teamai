# Next.js 16.3 App Router 상세 지식 팩

이 디렉터리는 [Next.js 로컬 적용 기준](../nextjs.md)을 보완하는 상세 레퍼런스다. 상위 문서는 버전 gate와
Aifrica 적용 원칙을 제공하고, 이 지식 팩은 App Router의 directive, component, file convention, function과
production guide를 작업별로 복원한다.

공식 문서를 그대로 저장한 mirror가 아니다. Next.js 16.3 stable 문서를 Aifrica 구현 판단에 맞게
paraphrase한 로컬 지식베이스다. experimental/canary 기능은 별도로 표시한다.

## 가장 먼저 할 일

실제 solution에 Next.js가 설치되어 있으면 다음 순서를 따른다.

1. `package.json`, lockfile에서 정확한 Next/React/Node 버전을 확인한다.
2. Next.js 16.2 계열 이후 package에 `node_modules/next/dist/docs/`가 있으면 해당 설치 버전 문서를 최우선
   API signature 근거로 사용한다.
3. 이 Aifrica 지식 팩에서 architecture, security, state와 component 적용 결정을 가져온다.
4. 설치 package 문서와 이 snapshot이 다르면 설치 버전의 API가 우선이며 차이를 보고한다.

이 저장소처럼 실제 `next` package가 없는 디자인·가이드 저장소에서는 이 지식 팩만으로 판단한다.

## 작업별 선택 로딩

| 작업 신호 | 필수 지식 팩 |
| --- | --- |
| app directory, segment, layout/page/loading/error, modal route | [라우팅과 파일 규약](./routing-file-conventions.md) |
| Server/Client Component, streaming, Suspense, runtime | [렌더링과 경계](./rendering-boundaries.md) |
| fetch, cache, PPR/Cache Components, invalidation | [데이터와 캐시](./data-cache-revalidation.md) |
| form, Server Action/Function, optimistic, redirect | [Mutation과 Form](./mutations-forms-actions.md) |
| API, webhook, Request/Response, cookies/headers | [Route Handler와 요청 API](./route-handlers-request-apis.md) |
| Link, router, URL query, prefetch, navigation pending | [Navigation과 URL 상태](./navigation-url-state.md) |
| metadata, image, font, script, sitemap, robots | [Metadata와 자산](./metadata-assets-seo.md) |
| auth, authorization, CSP, secret, taint, multi-tenant | [보안과 인증](./security-auth-data.md) |
| tests, instrumentation, Web Vitals, deployment | [테스트와 Production](./testing-observability-production.md) |
| next.config, env, Turbopack, migration, codemod | [설정과 Migration](./configuration-migration.md) |

## API 영역 커버리지

### Directives

- `'use client'`
- `'use server'`
- `'use cache'`
- `'use cache: private'`
- `'use cache: remote'`

### Framework components

- `next/link`
- `next/image`
- `next/font`
- `next/script`
- `next/form`

### 주요 file conventions

- `layout`, `template`, `page`, `loading`, `error`, `global-error`
- `not-found`, `forbidden`, `unauthorized`, `default`
- `route`, `proxy`, `instrumentation`, `instrumentation-client`
- dynamic/catch-all segment, route group, private folder
- parallel/intercepting route
- metadata files: icon, manifest, OG image, robots, sitemap

### 주요 server functions와 request APIs

- async `params`, `searchParams`, `cookies`, `headers`, `draftMode`
- `after`, `connection`, `cacheLife`, `cacheTag`
- `updateTag`, `revalidateTag`, `revalidatePath`, `refresh`
- `redirect`, `permanentRedirect`, `notFound`
- `NextRequest`, `NextResponse`, `userAgent`
- `generateStaticParams`, `generateMetadata`, `generateViewport`
- `ImageResponse`, sitemap/image metadata generation

### 주요 client Hooks

- `useRouter`, `usePathname`, `useSearchParams`, `useParams`
- `useSelectedLayoutSegment`, `useSelectedLayoutSegments`
- `useLinkStatus`, `useReportWebVitals`

## stable/experimental 구분

- `unauthorized()`/`forbidden()`과 대응 file convention은 현재 설정 gate인 `authInterrupts` 상태를 확인한다.
- unstable prefix API는 stable 대안과 설치 버전 문서를 먼저 확인한다.
- canary guide의 새 agent/tooling 기능을 production runtime 기능처럼 사용하지 않는다.
- hosting provider 전용 cache/observability 동작을 Next.js core 보장으로 일반화하지 않는다.

## 지식 카드 판정 항목

1. Server/Client/Proxy 중 어디서 실행되는가?
2. static build, request time, client navigation 중 언제 평가되는가?
3. cache key와 freshness owner는 누구인가?
4. argument/return이 직렬화 가능한가?
5. authentication과 resource authorization을 어디서 다시 확인하는가?
6. loading/error/not-found/forbidden과 focus owner는 어디인가?
7. Node/browser/deployment/config gate가 무엇인가?

## 공식 근거

- [App Router API Reference](https://nextjs.org/docs/app/api-reference)
- [App Router Guides](https://nextjs.org/docs/app/guides)
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [AI coding agents guide](https://nextjs.org/docs/app/guides/ai-agents)

일반 구현에서는 위 링크를 다시 열지 않고 설치 package 문서와 이 로컬 지식 팩을 사용한다.
