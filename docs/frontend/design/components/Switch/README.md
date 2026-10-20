# Switch

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

Switch는 켜짐/꺼짐(On/Off) 이진 상태를 즉시 토글하는 컨트롤이다. 설정이나 독립형 옵션
조정에 적합하며, 클릭 즉시 효과가 발생해야 한다. 여러 옵션 중 하나를 선택해야 하면
Radio를, 여러 개를 선택해야 하면 Checkbox를 사용한다.

- **기술 기반**: shadcn/ui Switch (Radix UI `Switch` primitive) 커스텀.
- **핵심 구조**: Track(알약형 배경) + Thumb(원형 손잡이). CSS 직접 렌더링.
- **사이즈**: Small / Medium / Large (3단계).
- **상태**: On/Off × Enabled/Disabled/Read-only/Focused.

---

