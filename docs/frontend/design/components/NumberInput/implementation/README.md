# Number Input — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)

## 12. 구현 코드

제품 구현은 `대상 솔루션의 public UI mapping` 및 같은 폴더의 CSS/test다.
`suffix?: string`은 기존 NumberInput에 추가한 하위 호환 옵션이며 입력 영역과 stepper 사이에 배치한다.
단위와 help/error의 ID는 외부 `aria-describedby`와 합쳐 전달한다. 페이지는 단위/숫자 범위/validation을
지정하고 공용 컴포넌트는 숫자 입력·표시·증감을 소유한다.
