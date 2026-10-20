# Avatar — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Avatar 문서 인덱스](../README.md)

## 구현 내용

### shadcn primitive (`avatar.tsx`)

Radix Avatar 를 감싸는 shadcn 스타일 wrapper. 색상/레이아웃은 `avatar.css.ts` 로 위임.

```tsx
import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui"; // 또는 @radix-ui/react-avatar
import { cn } from "./utils"; // clsx + tailwind-merge
import { avatarRoot, avatarFallback } from "./avatar.css";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarRoot, className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(avatarFallback, className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
```

### 친화적 API 래퍼 (`Avatar.tsx`)

shadcn primitive 에 `color/variant/size/disabled/src` props 를 추가한 사용하기 쉬운 API.
`data-*` 속성으로 CSS 가 색상/크기를 제어한다.

```tsx
import * as React from "react";
import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
} from "./shadcn/avatar"; // 위 primitive

export type AvatarColor =
  | "indigo"
  | "primary"
  | "green"
  | "cyan"
  | "purple"
  | "fuchsia"
  | "gray";
export type AvatarSize = "16" | "20" | "24" | "28" | "32" | "36" | "40" | "48";
export type AvatarVariant = "solid" | "subtle";

export interface AvatarProps extends React.ComponentProps<
  typeof AvatarPrimitive
> {
  color?: AvatarColor; // 기본 'indigo'
  size?: AvatarSize; // 기본 '24'(표준)
  variant?: AvatarVariant; // 기본 'solid'
  disabled?: boolean; // 기본 false
  src?: string; // 이미지 URL
  alt?: string; // 이미지 대체 텍스트
  children?: React.ReactNode; // 이니셜(fallback)
}

function Avatar({
  className,
  color = "indigo",
  size = "24",
  variant = "solid",
  disabled = false,
  src,
  alt,
  children,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive
      data-color={color}
      data-size={size}
      data-variant={variant}
      data-disabled={disabled || undefined}
      className={className}
      {...props}
    >
      {src && <AvatarImagePrimitive src={src} alt={alt} />}
      <AvatarFallbackPrimitive>{children}</AvatarFallbackPrimitive>
    </AvatarPrimitive>
  );
}

export { Avatar };
```

