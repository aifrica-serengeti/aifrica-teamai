# Input

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 Input 가족의 primitive와 `InputField` 조합에 필요한 상태·시각·접근성 참조 계약을
보존한다. 실행 가능한 `InputField` wrapper 전체나 완전한 `InputFieldProps` 타입을 제공하지 않으므로
이 묶음의 예제를 복사하는 것만으로 동일 동작이 완성된다고 보지 않는다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)

## 1. 개요

한 줄 텍스트 입력 컴포넌트. 사용자가 데이터를 입력·편집할 때 사용한다. Label · Requirement
indicator · Info icon · Placeholder · Trailing element(counter/suffix/icon button) · Help/Error text
조합으로 구성된다.

> **검색 입력은 별도 컴포넌트**: 검색(leading search icon + close button)은
> [`Search/README.md`](../Search/README.md) 스펙의 **Search 컴포넌트**를 사용한다. Input 은 text/email/
> password/tel/url 등 일반 텍스트 입력 전용.

`reserveDescriptionSpace`는 Help/Error text가 없는 기본 상태에도 한 줄 설명 영역을 유지하는 선택 prop이다.
blur·비동기 검증으로 Error text가 표시되어도 아래 field의 layout shift를 막아야 하는 form에서 사용한다.

비밀번호 input은 `passwordShowLabel`과 `passwordHideLabel`로 표시/숨김 Icon Button의 접근성 문구를
locale별로 주입할 수 있다. 전달하지 않으면 기존 한국어 기본 문구를 사용한다.

`InputField`는 URL·이메일·필수값 등 브라우저 제약 검증의 말풍선을 기존 Error text와 오류 테두리로
대체한다. 유효하지 않은 form 제출 차단은 유지하며, 최초 `invalid` 이벤트 전에는 오류를 노출하지
않는다. `nativeValidationMessage`로 locale별 문구를 제공하고, page의 `errorText`가 있으면 우선한다.
하위 `Input` primitive의 기본 HTML 검증 동작은 바꾸지 않는다.

**기술 기반**: 표준 HTML `<input>` 요소 기반. shadcn `Input` 패턴을 따르되, 스펙
(form semantic 토큰, 상태별 border/surface 전환, focus 시 inset box-shadow 2px 링)으로
완전히 커스텀한다. Radix 는 사용하지 않는다(네이티브 input 의 접근성/폼 제출을 그대로 활용).

---

`InputField.trailingAction`은 복사 등 보조 작업을 입력칸 안 오른쪽에 배치한다. `icon`, `label`,
`onClick`, `disabled`를 전달하며 공용 IconButton의 크기·여백·ghost 스타일은 Input이 관리한다.

## InputField 계약과 구현 제공 범위

- [정의와 구조](./definition.md)는 field anatomy·치수, `trailingAction`의 타입, native validation 관련
  공개 입력의 부분 계약을 명시한다. 모든 `InputFieldProps`를 선언한 완전한 타입 명세는 아니다.
- [상태와 동작](./behavior.md)과 [접근성](./accessibility.md)은 validation·reset·focus·label/error 연결을
  명시한다. [검증](./verification.md)에서 실제 소비 구현이 이를 충족하는지 확인한다.
- [구현 인덱스](./implementation/README.md)의 TSX는 bare `Input` primitive 부분 예제다.
  `InputField` 사용 예시는 소비 솔루션의 검증된 public export가 이미 연결되었다는 전제가 필요하다.
- native validation helper·hook·focus 조정·기본 문구 데이터는 역할과 행동만 설명하며 실행 구현은
  포함하지 않는다. 소비 제품의 source·public Props·export·사용처·검증 결과를 조사하여 매핑한다.

새 환경에 대응 구현이 없으면 위 명시된 계약과 의존성을 기준으로 구현·검증해야 한다. 문서에 없는
prop이나 helper의 동작을 기존 제품의 실제 계약처럼 추정하지 않는다. `InputField`는 공통 registry의
기존 `Input` 가족에 속하며 이 제공 범위 때문에 별도 신규 컴포넌트나 registry id를 요구하지 않는다.
