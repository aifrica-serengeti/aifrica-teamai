# Dropdown

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
- [사용 예제](./implementation/examples.md)
- [기타 구현 참조](./implementation/reference.md)

## 1. 개요

Dropdown 은 사용자가 하나의 옵션을 선택할 수 있는 목록을 제공하는 폼 컨트롤이다.
필드(trigger)를 클릭하면 **Menu** 가 아래로 펼쳐지고, 그 중 하나를 선택하면 필드에
선택값이 표시된다. 주로 카테고리 필터링, 목록 정렬, 설정 옵션 선택에 사용된다.

- 필드 외형은 **tertiary button 토큰**(`--btn-tertiary-*`)을 사용한다. Input 의 `--form-*`
  토큰이 아님에 주의(라이트에서는 우연히 색이 같지만 다크에서 다르다).
- 펼쳐지는 목록은 공용 **Menu** 컴포넌트(Radix DropdownMenu 기반)를 재사용한다.
- Dropdown 과 Select 의 구분: Dropdown 은 열린 Menu 항목 자체가 버튼 리스트처럼 동작하여
  선택 즉시 기능을 실행한다. 폼 값 입력이 목적이면 Select 를 사용한다.

---

