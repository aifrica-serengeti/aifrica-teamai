# Input — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](../README.md)

## 구현 내용

### 12.2 Input primitive — `input.tsx`

```tsx
"use client";

import * as React from "react";
import { cn } from "@design/cn";
import { inputRoot } from "./input.css";

export type InputSize = "small" | "medium" | "large" | "xlarge";
export type InputVariant = "default" | "create";

function Input({
  className,
  type = "text",
  size = "medium",
  variant = "default",
  readOnly,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & {
  size?: InputSize;
  variant?: InputVariant;
  readOnly?: boolean;
}) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      data-variant={variant}
      data-readonly={readOnly || undefined}
      className={cn(inputRoot, className)}
      readOnly={readOnly}
      {...props}
    />
  );
}

export { Input };
```

### 12.3 InputField 조합과 native 검증

> **부분 예제의 경계:** 앞 TSX는 `Input` primitive만 제공한다. 아래는 `InputField`의 공개 입력 일부와
> 행동 계약이며 wrapper·helper의 완전한 실행 소스나 전체 Props 선언이 아니다. 사용 예시의
> `InputField` import는 소비 솔루션의 실제 public mapping을 조사해 연결한 경우에만 성립한다.
> `InputFieldValidationProps`를 `InputFieldProps` 전체로 해석하지 않는다.

참조 계약에서 사용하는 역할은
`Input.tsx`(참조 모듈 역할)의 `InputField`와
`input-validation.ts`(참조 모듈 역할)를 기준으로 한다.
native 오류의 수명·form reset 구독은 컴포넌트 전용
`use-input-native-validation.ts`(참조 모듈 역할)에
응집한다. 기본 문구는 컴포넌트의 `data/input-validation.data.ts`가 소유하며, 이 내부 hook/helper는
공개 barrel로 노출하거나 page draft·업무 검증을 소유하지 않는다.
오류 문구 결정과 분리된
`input-validation-focus.ts`(참조 모듈 역할)는 실제
invalid 이벤트 batch의 순서와 지연 focus만 관리한다.
공개 export는 대상 솔루션의 검증된 public entrypoint로 연결한다. wrapper 전체를 별도 스냅샷으로 복제하지 않고
[정의](../definition.md), [동작](../behavior.md), [접근성](../accessibility.md)의 계약을 함께 적용한다.
Trailing은 공용 IconButton, 정보 표시는 Icon·Tooltip을 재사용한다.

`InputFieldProps`는 native input prop에 다음 검증 표현 계약을 추가한다.

```ts
type InputFieldValidationProps = {
  errorText?: string;
  nativeValidationMessage?: string;
  reserveDescriptionSpace?: boolean;
};
```

- `errorText`는 page의 업무·서버 오류이며 native 피드백보다 우선한다.
- `nativeValidationMessage`는 native 오류가 있을 때 표시할 locale별 문구다. 새 검증 조건을 만들거나
  `setCustomValidity()`를 호출하는 prop이 아니다.
- `invalid`와 `aria-invalid`의 명시적 시각 상태, 호출자의 `aria-describedby`와 native 이벤트도 유지한다.

아래 `@components/input/Input`는 문서 전용 재현에서 소비 프로젝트가 연결하는 예제 별칭이다.
소비 솔루션에서는 검증된 public mapping으로 연결한다.

```tsx
import { InputField } from "@components/input/Input";

export function ServiceUrlForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <InputField
        id="service-url"
        name="serviceUrl"
        label="서비스 접속 URL"
        type="url"
        maxLength={255}
        nativeValidationMessage="올바른 URL을 입력해 주세요."
        reserveDescriptionSpace
      />
      <button type="submit">등록</button>
      <button type="reset">초기화</button>
    </form>
  );
}
```

선택 URL은 빈 값으로 제출할 수 있다. `https://`처럼 불완전한 값을 입력해 제출하면 native 제약이
submit을 차단하고 입력칸 아래 DS Error text가 표시된다. `https://example.com`으로 고치면 오류가
사라진다. HTTP/HTTPS만 허용하는 별도 규칙은 이 공용 컴포넌트가 추가하지 않는다.

외부 프로젝트에서 wrapper를 재현할 때도 다음 이벤트 계약을 빠뜨리지 않는다.

1. `invalid`에서 `preventDefault()`로 기본 말풍선만 숨기고, 실제 `ValidityState`를 오류 슬롯으로
   변환한다. 호출자의 `onInvalid` 이후의 validity를 읽고, 실제 발생한 invalid 이벤트 batch의 첫 오류에
   focus한다. DOM 분리·callback 교정·raw-only 오류를 확인하며 native 검증 메서드는 교체하지 않는다.
2. 최초 렌더·untouched 입력·blur에는 native 오류를 만들지 않는다. 이미 오류를 표시한 뒤 입력할 때만
   다시 검사하며, 유효해지면 지운다. 호출자의 `onChange` 이후의 custom validity를 반영하고
   controlled/uncontrolled 계약을 유지한다.
3. 값·제약 변경은 이전 오류의 유효 범위를 벗어난다. disabled/readOnly에는 native 오류를 숨기지만
   명시적 `errorText`는 숨기지 않는다. 이전 값·제약으로 돌아와도 과거 피드백을 되살리지 않는다.
4. form reset listener는 기본 reset이 끝난 후 취소 여부를 확인해 native 오류와 uncontrolled counter를
   갱신하고 cleanup한다. 취소된 reset과 controlled 값 owner는 침범하지 않는다.
5. 오류 문구는 기존 description id, `aria-invalid`, `role="alert"`와 12px/16px Error text를 사용한다.
   form의 `noValidate` 정책과 하위 `Input` primitive는 바꾸지 않는다.

---

### Readonly 값 복사 액션

소비 솔루션의 구현·공개 export는 mapping과 `대상 솔루션의 public UI mapping`의 `Input` / `InputField`,
`대상 솔루션의 public UI mapping`에서 확인한다.

```tsx
<InputField
  label="리소스 ID"
  value={resource.id}
  readOnly
  trailingAction={{
    icon: "copy",
    label: "리소스 ID 복사",
    onClick: () => onCopyValue(resource.id, "리소스 ID"),
    disabled: saving,
  }}
/>
```
