# Spinner — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](./README.md)

## 7. 상태 (Behavior)

Spinner 는 비활성(disabled)/읽기 전용(read-only) 등의 상태를 가지지 않는다.
항상 회전하며, 표시/비표시 여부는 호출측에서 조건부 렌더링으로 제어한다.

| 동작     | 조건         | 결과                                         |
| -------- | ------------ | -------------------------------------------- |
| **회전** | 렌더 시 항상 | 시계 방향 무한 회전(1회전 1s)                |
| **표시** | 로딩 중일 때 | 호출측에서 `<Spinner />` 렌더                |
| **숨김** | 로딩 완료 시 | 호출측에서 `<Spinner />` 제거(조건부 렌더링) |

> **행동 규칙**: Spinner 는 상태를 내부에 두지 않는다. 표시 여부는 부모가 제어한다.
> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.
> Spinner는 회전을 멈춘 정지 도형으로 남긴다. 부모의 loading 상태가 계속되는 동안 표시나 접근성 의미를 제거하지 않는다.

---

## 9. 애니메이션

### 회전 애니메이션

| 항목            | 값                                   |
| --------------- | ------------------------------------ |
| keyframes       | `rotate(0deg)` → `rotate(360deg)`    |
| 지속 시간       | **1s** (`--spinner-speed` 토큰)      |
| timing function | `linear` (일정 속도)                 |
| iteration       | `infinite` (무한)                    |
| 적용 대상       | Spinner 루트(span) — SVG 전체가 회전 |

> 회전은 linear(일정 속도) 여야 한다. ease/transition 을 쓰면 속도가 들쭉날쭉해져
> 부자연스럽다.

### 다크/라이트 모드 전환

색상 전환을 0.2초에 걸쳐 부드럽게 처리한다. Track/Indicator 의 SVG stroke 속성에
transition 을 건다.

```css
/* Track circle stroke */
transition: stroke 0.2s ease;

/* Indicator path stroke */
transition: stroke 0.2s ease;
```

- **절대 `transition: all` 을 쓰지 않는다.** 색상(stroke) 속성만 지정.
- 전역 `*` 셀렉터는 금지(AGENTS.md "색상 전환 애니메이션" 참조).
- reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
  `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
  전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

