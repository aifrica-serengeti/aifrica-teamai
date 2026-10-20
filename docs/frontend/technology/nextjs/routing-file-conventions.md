# Next.js 라우팅과 파일 규약

## segment tree의 기본

`app` 아래 folder는 URL segment 또는 route organization을 표현한다. public URL이 만들어지려면 해당 branch에
`page` 또는 `route`가 있어야 한다. layout은 하위 segment를 감싸며 navigation 사이에 state를 보존한다.

```text
app/
  layout.tsx
  page.tsx
  projects/
    layout.tsx
    loading.tsx
    error.tsx
    page.tsx
    [projectId]/
      page.tsx
      edit/
        page.tsx
```

## `layout.tsx`

```tsx
export default function ProjectsLayout({ children }: LayoutProps<"/projects">) {
  return (
    <section>
      <ProjectNavigation />
      {children}
    </section>
  );
}
```

- navigation 사이에 재사용되고 일반적으로 다시 mount되지 않는다.
- request마다 반드시 최신이어야 하는 auth check를 layout에만 두지 않는다.
- `params`는 async이며 현재 segment와 상위 dynamic params를 포함한다.
- root layout은 `html`과 `body`를 렌더한다.
- metadata/head owner와 provider scope를 과도하게 크게 잡지 않는다.

## `template.tsx`

layout과 비슷하지만 navigation마다 새 instance를 만든다. Effect 재실행, state reset 또는 fallback 재표시가
실제 요구일 때만 사용한다. 단순 wrapper를 template으로 바꾸어 state 보존 문제를 우회하지 않는다.

## `page.tsx`

route의 UI 진입점이다. Next.js 16에서 `params`와 `searchParams`는 Promise다.

```tsx
export default async function Page({ params, searchParams }: PageProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  const query = await searchParams;
  const tab = parseProjectTab(query.tab);
  const project = await getProject(projectId);
  return <ProjectDetail project={project} activeTab={tab} />;
}
```

generated `PageProps`/`LayoutProps`는 `next dev`, `next build`, `next typegen`으로 만들어진다. package script와
generated type path를 CI에서도 일치시킨다.

## dynamic segments

| folder | params shape |
| --- | --- |
| `[slug]` | `{ slug: string }` |
| `[...slug]` | `{ slug: string[] }` |
| `[[...slug]]` | `{ slug?: string[] }` |

```tsx
export async function generateStaticParams() {
  const projects = await listPublicProjects();
  return projects.map((project) => ({ projectId: project.id }));
}
```

- URL parameter는 신뢰할 수 없는 입력이다. format과 resource existence를 검사한다.
- `generateStaticParams`가 모든 값을 반환한다고 runtime authorization을 생략하지 않는다.
- Cache Components와 dynamic segment의 prerender 요구는 설치 버전 문서를 확인한다.

## route group과 private folder

- `(group)`은 URL에 포함되지 않고 layout/organization 경계를 만든다.
- `_folder`는 routing에서 제외되는 private implementation convention이다.
- 다른 root layout 사이 navigation은 full page load가 될 수 있다.
- 같은 URL을 서로 다른 route group에서 중복 생성하지 않는다.

```text
app/
  (authenticated)/
    layout.tsx
    projects/page.tsx
  (public)/
    login/page.tsx
  _components/
    Shell.tsx
```

project architecture가 `src/pages`를 별도 소유한다면 Next app route는 composition/adaptation만 담당하고 domain
UI ownership을 중복하지 않는다.

## `loading.tsx`

segment의 Suspense fallback을 자동으로 만든다.

- 최초 route transition fallback에 사용한다.
- 기존 content의 background refresh를 모두 loading file로 보내지 않는다.
- skeleton은 실제 interactive control처럼 focus되지 않아야 한다.
- layout shift를 줄이되 가짜 값과 과도한 shimmer를 만들지 않는다.
- navigation이 즉시 취소/교체될 수 있음을 고려한다.

## `error.tsx`와 `global-error.tsx`

`error.tsx`는 Client Component이며 하위 segment의 예상 밖 오류를 처리한다.

```tsx
"use client";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section aria-labelledby="error-title">
      <h2 id="error-title">프로젝트를 표시하지 못했습니다.</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </section>
  );
}
```

- 예상 가능한 validation/not-found/forbidden을 모두 throw하지 않는다.
- error message/stack을 client에 노출하지 않는다.
- `reset`이 안전한 idempotent retry인지 확인한다.
- global error는 root layout을 대체하므로 자체 `html/body` 요구를 설치 버전 문서에서 확인한다.

## `not-found.tsx`와 `notFound()`

```tsx
import { notFound } from "next/navigation";

const project = await getProject(projectId);
if (!project) notFound();
```

resource absence에 사용하고 권한 없음과 구분한다. `notFound()`는 제어 흐름을 종료하는 throw 성격이므로 broad
`try/catch`로 삼키지 않는다. root not-found 처리 범위는 설치 minor의 convention을 확인한다.

## forbidden/unauthorized

`forbidden()`과 `unauthorized()` 및 대응 file은 `authInterrupts` experimental gate 상태를 확인한다.
production 기본 정책으로 자동 채택하지 않는다. stable custom forbidden page/redirect/typed state가 현재
solution contract면 그대로 사용한다.

401은 authentication 필요, 403은 authenticated actor의 권한 부족이다. 메뉴 숨김과 route redirect만으로
data authorization을 대체하지 않는다.

## parallel routes

`@slot` folder로 같은 layout에 독립 slot을 제공한다.

```tsx
export default function Layout({ children, analytics }: {
  children: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return <DashboardShell main={children} side={analytics} />;
}
```

- slot별 loading/error와 active state가 필요할 때 사용한다.
- hard reload에서 매치되지 않는 slot은 `default.tsx` fallback이 필요할 수 있다.
- 단순 two-column CSS layout을 위해 routing 복잡도를 추가하지 않는다.

## intercepting routes

현재 route 위에 다른 route content를 modal처럼 표시하면서 direct URL에서는 full page를 제공할 때 사용한다.
soft navigation과 hard navigation 결과를 모두 설계한다.

- browser back으로 modal이 닫히는가?
- direct URL 새로고침에서 full page가 유효한가?
- modal focus trap/restore와 background inert가 완전한가?
- close action이 `router.back()`만 믿어 외부 history로 빠지지 않는가?

단순 local Dialog open을 intercepting route로 만들지 않는다.

## `default.tsx`

parallel slot이 현재 URL에 직접 매치되지 않고 full reload로 active state를 복원할 수 없을 때 fallback을
제공한다. `null`을 반환할지 not-found를 보여 줄지는 slot 의미에 따라 결정한다.

## route와 page 충돌

같은 segment level에 `page.tsx`와 `route.ts`를 두어 같은 URL을 동시에 소유하지 않는다. UI route와 HTTP API
path를 명확히 분리한다.

## 점검표

- layout state 보존과 template reset이 의도적인가?
- async params/searchParams를 await하고 validation했는가?
- route group이 URL이나 root layout navigation에 예상 밖 영향을 주지 않는가?
- loading/error/not-found/forbidden owner가 중복되지 않는가?
- parallel/intercepting route가 hard/soft navigation 모두 동작하는가?
- modal route keyboard/focus/history가 완전한가?
