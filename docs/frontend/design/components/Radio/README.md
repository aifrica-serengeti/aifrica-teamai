# Radio & Radio Group

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Radio/Radio Group 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

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

## 1. 개요

단일 선택 컴포넌트. 여러 옵션 중 **하나만** 선택할 때 사용한다. Checkbox 가 다중 선택이라면
Radio 는 단일 선택 — 한 그룹 내에서 다른 항목을 선택하면 기존 선택은 해제된다.

**기술 기반**: Radix UI `RadioGroup` (또는 shadcn RadioGroup)을 기반으로 하되, 스펙
(16px 원, 1px 테두리, 상태별 색상 매핑, 1px offset focus border)으로 완전히 커스텀한다.

공개 구현은 `RadioGroupRoot`(group semantics·roving focus), `Radio`(32px hit area의 단일 item),
`RadioGroup`(label·옵션·help/error를 포함한 field 조합)의 세 단계로 제공한다. 일반 form은
`RadioGroup`을 사용하고, Table처럼 item이 서로 떨어진 native 구조에 배치될 때만
`RadioGroupRoot`와 `Radio`를 직접 조합한다.

---

### 의존 컴포넌트

공용 시각 컴포넌트 의존성은 없다. Radix RadioGroup은 roving focus와 group semantics를
제공하는 primitive이며, 16px 원 geometry, 내부 점, 상태별 색상, Group label/help의
레이아웃을 재정의하지 않는다.
