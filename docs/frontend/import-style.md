# Import 정돈 가이드

아래 `@/core`, `@/pages`, `@/domains` 경로는 참조 아키텍처 예시다. 소비 저장소의 실제 alias와
공개 entrypoint mapping을 먼저 확인한다. import 정돈을 이유로 directory 체계를 이식하지 않는다.

TypeScript·JavaScript·TSX·JSX 파일의 import 블록을 읽기 쉽고 일관되게 유지하기 위한
Aifrica 기본 규칙이다. AI는 파일을 생성하거나 수정한 뒤 작업을 끝내기 전에 이 규칙으로
해당 파일의 import 블록을 정리한다.

정렬은 의존성 규칙을 대신하지 않는다. 잘못된 계층 import, 순환 의존, 공개 API 우회를
발견하면 줄 위치만 바꾸지 말고 [UI 아키텍처](./architecture.md)의 소유권을 먼저 바로잡는다.

## 우선순위

1. 현재 파일의 실행과 CSS cascade에 영향을 주는 side-effect import 순서
2. 저장소에 설정된 ESLint, Biome, Prettier, import sorter 규칙
3. 이 문서의 Aifrica 기능 그룹·표시 길이 정렬 규칙
4. 인접 코드의 관례

저장소에 자동 정렬 설정이 있으면 이 문서와 중복되는 수동 정렬을 추가하지 않고 그 설정을
실행한다. 단, formatter가 아키텍처 위반이나 실행 순서에 의미가 있는 side effect를 수정해
주는 것은 아니므로 별도로 확인한다. 설정된 sorter가 Aifrica 길이 정렬과 충돌하면 코드를
매번 수동으로 뒤집지 말고 저장소 설정을 따른 뒤 충돌을 보고한다. sorter 설정 변경은
작업 범위에 포함될 때만 진행한다.

## 기능 그룹 순서

directive가 있다면 `"use client"`, `"use server"`같은 directive를 파일 최상단에 두고 한 줄을
비운다. 그 다음 import는 module path 종류가 아니라 파일에서 담당하는 기능을 기준으로
아래 순서로 묶는다.

1. 프레임워크·runtime: React, Next.js, Node built-in, 전역 initialization
2. type: `import type`으로 가져오는 type·interface·generic 계약
3. component: page shell, 공용 UI, field, dialog, icon과 같은 렌더링 컴포넌트
4. hook·state: Hook, store, context, selector, state adapter
5. service·data: API client, service, repository, session, query·mutation function
6. model·validation: model, schema, validation, constant, domain mapper
7. utility·integration: navigation, router, formatter, helper, configuration, third-party adapter
8. style·asset: CSS module, vanilla-extract style binding, image, font, SVG와 같은 정적 asset

그룹 사이는 빈 줄 하나로 구분하고 같은 그룹 안에는 빈 줄을 넣지 않는다. 그룹 주석은
경계가 모호해서 설명이 필요할 때만 사용하고 `// Components`처럼 내용을 반복하는 장식성
주석은 남기지 않는다.

그룹은 path 문자열만 보고 결정하지 않는다. export 이름, module 역할, 실제 사용 방식을 함께
확인한다. 하나의 module에서 value와 type을 함께 가져오면 그룹을 나누기 위해 같은 path를
중복하지 않고 runtime value의 주요 역할 그룹에 둔다.

## 표시 길이 정렬

- 설정된 import sorter가 없으면 같은 기능 그룹의 import statement를 한 줄로 정규화했을 때의
  표시 문자 수가 짧은 순서로 정렬한다. 공백은 하나로 축약하고 indentation과 줄바꿈은 길이에서
  제외한다.
- named specifier는 각 줄에 보이는 표기의 문자 수가 짧은 순서로 정렬한다. indentation과 끝의
  comma는 길이에서 제외하고 `type`, `as`와 alias는 표기 길이에 포함한다.
- 표시 길이가 같으면 PascalCase·camelCase를 나눈 단어 수가 적은 표기를 먼저 둔다. 그래도
  같으면 대소문자를 구분하지 않는 사전순으로 정렬한다.
- 한 module path는 원칙적으로 import statement 하나로 합친다.
- 해당 module에서 type만 가져오면 `import type`을 사용한다.
- value와 type을 함께 가져오면 설정이 허용하는 한 `import` 안에 `type` modifier를 두어 중복 경로를
  만들지 않는다.
- unused import, 중복 import, 주석 처리된 임시 import를 남기지 않는다.
- multiline 전환, trailing comma, quote, semicolon은 formatter에 맡긴다. 포매터와 싸우기 위한 수동 배치를
  만들지 않는다.

```ts
import { useState, type FormEvent } from "react";
```

`FormEvent`만 사용한다면 다음이 더 정확하다.

```ts
import type { FormEvent } from "react";
```

길이가 같은 `Notification`과 `CheckboxItem`은 단어 수가 적은 표기를 먼저 두므로 다음 순서가 된다.

```ts
import {
  Link,
  Button,
  InputField,
  Notification,
  CheckboxItem,
} from "@/core/components";
```

## side-effect import

`import "server-only"`, polyfill, global CSS처럼 binding이 없는 import는 실행 순서를 바꿀 수 있다.

- 기존 side-effect import는 예쁘게 보이게 하려는 이유만으로 움직이지 않는다.
- 순서가 의도라면 인접 주석이나 entrypoint 문서로 이유를 남긴다.
- 새 파일에서 `server-only`·polyfill marker는 directive 다음의 명시적 side-effect 블록에 두고, global CSS는
  framework가 허용하는 entrypoint의 스타일 블록에 둔다.
- 자동 정렬 후에도 initialization, polyfill, CSS cascade 순서가 유지되는지 확인한다.

## 공개 API와 의존 방향

- package·계층의 공개 export가 있으면 private file deep import보다 공개 entrypoint를 사용한다.
- 표시 길이 정렬은 잘못된 의존성을 허용하지 않는다. 현재 아키텍처에서 `pages` 코드가 `@/app`을
  import하는 것은 역방향 의존이므로 정렬 대상이 아니라 소유권 수정 대상이다.
- 서로 다른 menu의 private page를 직접 연결하지 않는다. 공통 계약은 `domains/common`, 메뉴 `shared`,
  또는 `core`의 적절한 소유자로 옮긴다.
- barrel import는 공개 API를 명확히 하는 장점과 순환 의존·bundle 비용을 같이 확인한다. 언제나
  짧아 보인다는 이유만으로 barrel을 새로 만들지 않는다.

## 전체 예시

질문의 import 블록에 기능 그룹·표시 길이·type·style 규칙만 적용하면 다음과 같다.

```ts
import type { FormEvent } from "react";

import {
  Link,
  Button,
  InputField,
  Notification,
  CheckboxItem,
} from "@/core/components";
import { PublicAuthShell } from "@/pages/common/auth/shared/ui/public-auth-shell/PublicAuthShell";

import { useLoginForm } from "./hooks/use-login-form";

import { persistLoginSession } from "@/domains/auth/service/auth-session.service";

import {
  USER_ID_PATTERN,
  PASSWORD_PATTERN,
} from "@/domains/auth/model/type/auth-validation.t";

import { navigateTo } from "@/app/router/navigation";

import * as styles from "./LoginPage.css";
import * as formStyles from "@/pages/common/auth/shared/ui/auth-form-layout/AuthFormLayout.css";
import * as shellStyles from "@/pages/common/auth/shared/ui/public-auth-shell/PublicAuthShell.css";
```

단, 이 배치는 정렬 결과만 보여 준다. `LoginPage`가 `pages` 계층에 있다면
`@/app/router/navigation`은 현재 의존 방향에 어긋나므로 최종 코드에 그대로 남겨 두지 않는다.
인접한 검증된 navigation 경계를 재사용하거나, 적합한 page·core 계약을 만들거나, 조립 소유자가
callback으로 주입하는 방식 중 저장소 구조에 맞는 것을 선택한다.

## AI 완료 체크리스트

- [ ] 새로 생성하거나 수정한 모든 TS·JS·TSX·JSX 파일의 import 블록을 확인했다.
- [ ] unused·중복 import를 제거하고 type-only dependency에 `import type`을 적용했다.
- [ ] type·component·hook/state·service/data·model/validation·utility/integration·style/asset을 기능별로 묶었다.
- [ ] 각 기능 그룹과 named specifier를 표시 길이가 짧은 순서로 정렬했다.
- [ ] formatter/import sorter를 실행하고 수동 정렬이 다시 흐트러지지 않는지 확인했다.
- [ ] side-effect import의 순서와 CSS cascade를 바꾸지 않았다.
- [ ] 공개 export, 의존 방향, 순환 의존을 확인했다.
- [ ] 실제 `package.json`의 lint·typecheck·format 명령 중 해당하는 검증을 실행했다.

코드 정리 요청이 아닌 기능 작업에서는 변경한 파일만 대상으로 한다. import 정돈을 이유로
저장소 전체를 무관한 diff로 바꾸지 않는다.
