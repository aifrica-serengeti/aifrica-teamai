# Next.js Metadata·Image·Font·Script·SEO

## Metadata owner

static `metadata` export 또는 `generateMetadata`를 route segment에서 사용한다. 같은 segment에 둘 다 두지 않는다.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "Aifrica 프로젝트를 관리합니다.",
};
```

dynamic data:

```tsx
export async function generateMetadata(
  { params }: PageProps<"/projects/[projectId]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProjectMetadata(projectId);
  if (!project) return { title: "프로젝트를 찾을 수 없음" };

  const previousImages = (await parent).openGraph?.images ?? [];
  return {
    title: project.name,
    description: project.summary,
    openGraph: { images: [project.ogImage, ...previousImages] },
  };
}
```

fetch가 page와 중복되면 framework/React memoization 계약을 확인한다. metadata 생성이 실패하거나 느릴 때
streaming/head 결과와 bot behavior를 설치 버전에서 확인한다.

## title template와 canonical

root/section layout이 title template를 소유하고 page는 구체 title을 제공한다. canonical, alternate locale,
robots와 pagination URL을 실제 product/SEO 정책으로 정한다. 내부 admin page를 무조건 indexable하게 만들지
않는다.

## Metadata files

file convention으로 관리할 수 있는 항목:

- `favicon.ico`, `icon.*`, `apple-icon.*`
- `manifest.json` 또는 `manifest.ts`
- `opengraph-image.*`, `twitter-image.*`
- `robots.txt` 또는 `robots.ts`
- `sitemap.xml` 또는 `sitemap.ts`

static file과 generated function 중 하나의 owner를 선택한다. user input이 XML/image metadata에 들어갈 때 escaping,
URL allowlist와 size를 검증한다.

## `generateSitemaps`

대량 URL을 여러 sitemap으로 나눌 때 사용한다. 공개 canonical resource만 포함하고 tenant-private/admin URL과
secret query를 넣지 않는다. DB 전체를 build memory에 올리지 않고 pagination을 설계한다.

## `generateViewport`

theme color와 viewport metadata를 route data에 따라 생성할 수 있다. 일반 responsive behavior를 fixed viewport
설정으로 막지 않는다. user zoom을 비활성화하지 않는다.

## `ImageResponse`

Open Graph/social image를 JSX 기반으로 생성한다.

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await getPublicProject(projectId);
  return new ImageResponse(
    <div style={{ display: "flex", padding: 64 }}>{project.name}</div>,
    size,
  );
}
```

지원 CSS/font/asset와 bundle size 제한을 설치 문서에서 확인한다. private data를 public OG endpoint에 노출하지
않는다. 긴 다국어 text와 font fallback을 test한다.

## `next/image`

```tsx
import Image from "next/image";

<Image
  src={project.thumbnailUrl}
  alt=""
  width={320}
  height={180}
  sizes="(width < 48rem) 100vw, 320px"
/>;
```

- 정보 이미지는 맥락에 맞는 alt, 장식 이미지는 빈 alt를 사용한다.
- intrinsic width/height 또는 fill parent geometry로 CLS를 막는다.
- `sizes` 없이 fill/responsive image를 사용하면 필요 이상 큰 source를 받을 수 있다.
- remote source는 `remotePatterns` allowlist를 좁게 설정한다.
- default optimizer는 remote source fetch에 auth header를 전달하지 않는다. 보호 image는 별도 authenticated
  delivery/loader를 설계한다.
- Next.js 16에서는 `priority`보다 `preload` prop을 사용한다. 모든 above-fold image를 preload하지 않는다.

Next.js 16 migration에서 local image query string pattern, image quality allowlist와 cache TTL default 변화를
확인한다.

## `next/font`

```tsx
import { Noto_Sans_KR } from "next/font/google";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
```

font를 self-host하고 layout shift를 줄이는 integration이다.

- 실제 사용하는 weight/subset만 선택한다.
- CJK font file 크기와 subset 지원을 확인한다.
- font instance를 필요한 layout/module scope에서 재사용한다.
- CSS variable을 design token typography owner와 연결한다.
- preload가 route마다 중복되지 않는지 확인한다.
- local font license와 asset path를 검증한다.

## `next/script`

```tsx
import Script from "next/script";

<Script
  src="https://analytics.example.com/sdk.js"
  strategy="afterInteractive"
  onError={reportScriptFailure}
/>;
```

주요 strategy는 `beforeInteractive`, `afterInteractive`, `lazyOnload`, 제한된 worker integration 등이다.

- 기능에 필요한 earliest 시점만 선택한다.
- consent 전 analytics/marketing script를 실행하지 않는다.
- CSP nonce/hash와 vendor origin allowlist를 맞춘다.
- third-party failure가 핵심 UI를 막지 않게 한다.
- inline script에 user data를 문자열 결합하지 않는다.
- route transition에서 중복 init/cleanup contract를 확인한다.

## manifest, robots와 sitemap

- manifest icon/start URL/scope/theme color가 배포 base path와 맞는가?
- robots가 staging/private app을 실수로 노출하지 않는가?
- sitemap `lastModified`를 매 build 현재 시각으로 만들어 모든 URL을 변경시키지 않는가?
- canonical host/protocol이 reverse proxy 환경에서 정확한가?
- multi-tenant host가 서로 다른 tenant URL을 섞지 않는가?

## 검증

- page마다 고유하고 의미 있는 title/description이 있는가?
- canonical/robots가 환경과 권한 정책에 맞는가?
- image geometry, sizes, remote allowlist와 alt가 올바른가?
- font weight/subset와 layout shift를 측정했는가?
- third-party script consent/CSP/failure가 검증되는가?
- OG/manifest/sitemap endpoint에 private data가 없는가?
