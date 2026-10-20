# Number Input

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 의존 문서·솔루션 mapping과 함께 컴포넌트를 상세 상태·시각 계약을 구현하기 위한 완전한 스펙이다.

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

Number Input 은 사용자가 **정확한 수치를 입력**하거나, **빠르게 값을 조정**할 때 사용하는 폼 컨트롤이다.
일반 텍스트 입력(`<input type="number">`)에 **증감(stepper) 버튼(−/+)** 을 결합한 형태.

- 입력 영역(container, border, surface, 상태 전환)은 공용 **Input** 과 동일한 `--form-*` 토큰을 공유한다.
- 증감 버튼은 공용 **Icon Button**(ghost variant)을 재사용한다.
- 입력값은 항상 숫자. 브라우저 기본 spinner 는 제거하고 커스텀 증감 버튼으로 대체.
- `suffix?: string`으로 입력칸 내부, 증감 버튼 앞에 '시', '분', '개' 같은 단위를 표시한다.
  단위는 숫자 값에 포함되지 않으며 외부 label과 함께 사용한다.
- `textValue`/`onTextValueChange` 쌍은 포트처럼 빈 값도 유효한 form draft에서 원시 문자열을 제어할 때만
  사용한다. 숫자로 해석 가능한 입력은 기존 `onValueChange`로도 전달한다.
- 직접 입력·붙여넣기·드롭에서는 `1e`, `1e3`, `1E-3` 같은 지수 표기를 차단한다. 거부한 입력은
  직전 표시값을 유지하며 숫자/문자열 값 callback으로 전달하지 않는다. 음수·소수·0·의도적인 빈 값은
  기존 계약을 유지한다. 외부 `value`/`defaultValue`/`textValue`를 임의로 바꾸는 정책은 아니다.
- **사용 경계:** page나 form field가 숫자를 받는다면 일반 Input에 `type="number"`를 전달하지 않고
  이 공용 Number Input을 사용한다. 이 컴포넌트 내부의 native `input[type="number"]`는 keyboard와
  mobile input semantics를 위한 구현 세부이며 browser spinner는 숨긴다.
- page grid 안에서는 root가 `width: 100%; min-width: 0`으로 cell을 채운다. standalone 기본 폭은
  각 field 문서의 기본값을 따르지만 page가 더 작은 고정 폭으로 축소하지 않는다.

---
