# Checkbox & Checkbox Group

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Checkbox/Checkbox Group 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

다중 선택 컴포넌트. 여러 옵션 중 **0개 이상**을 선택할 때 사용한다. Radio 가 단일 선택이라면
Checkbox 는 다중 선택 — 한 그룹 내에서 여러 항목을 동시에 선택할 수 있다.

**세 가지 type(시각 상태):**

- **Unchecked** — 선택되지 않은 빈 사각형
- **Checked** — 선택된 상태, 체크마크 표시
- **Indeterminate** — 하위 항목 중 일부만 선택된 상태, 대시(−) 표시. 주로 부모-자식 관계(Table/Tree)에서 사용

**기술 기반**: Radix UI `Checkbox` (또는 shadcn Checkbox)을 기반으로 하되, 스펙
(Small 12px / Medium 16px 사각형, 1px 테두리, 상태별 색상 매핑, 1px offset focus border)으로
완전히 커스텀한다.

> **Radio와의 차이점**: Radio는 원형 16px 고정 단일 사이즈. Checkbox는 **Small(12px) / Medium(16px)
> 두 사이즈**와 **Indeterminate 상태**를 추가로 가진다. 그 외 상태 색상 매핑·focus border·hover·
> 커서 처리는 Radio와 동일하다.

---

### 의존 컴포넌트

공용 시각 컴포넌트 의존성은 없다. Radix Checkbox는 접근성과 상태를 위한 primitive일 뿐,
Checkbox의 12px/16px geometry, mark SVG, 색상, focus ring을 대체하지 않는다. Group과
Table/Tree의 indeterminate 계산은 이 문서의 공개 state 계약으로만 연결한다.

