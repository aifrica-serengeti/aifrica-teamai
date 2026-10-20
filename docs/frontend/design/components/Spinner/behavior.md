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
> `prefers-reduced-motion: reduce` 환경에서는 globals.css 전역 규칙이 animation 을
> 무력화하여 정지 상태로 표시된다.

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
- `globals.css` 의 `@media (prefers-reduced-motion: reduce)` 가 회전 animation 과
  색상 transition 모두를 무력화하므로 컴포넌트는 별도 reduced-motion 처리 불필요.

---

