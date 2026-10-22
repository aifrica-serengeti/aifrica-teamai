# Avatar — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Avatar 문서 인덱스](./README.md)

## 7. 상태

| 상태         | 동작               | 시각 변화                                                             |
| ------------ | ------------------ | --------------------------------------------------------------------- |
| **Enabled**  | 표시만(비상호작용) | color/variant 기본 색상                                               |
| **Disabled** | 의미적 비활성      | `--element-default` 배경 + `--text-disabled` 글자. color/variant 무시 |

> Avatar는 본질적으로 표시용 요소라 hover/pressed/focus 같은 상호작용 상태가 없다.
> "disabled"는 사용자가 비활성 상태임을 나타내는 시각적 신호일 뿐, 클릭 이벤트를 막지는
> 않는다(필요하면 부모 요소에서 처리).

### 구현 주의점: CSS 특이성

disabled 상태는 variant+color 조합 셀렉터보다 **특이성이 높아야** 우선 적용된다.

```css
/* ❌ 안 됨 — 특이성 0-1-0, 아래 variant+color(0-2-0)에 짐 */
&[data-disabled] { ... }

/* ❌ 안 됨 — subtle gray 셀렉터(0-2-0)와 동급이라 무작위로 겹침 */
&[data-disabled] { ... }

/* ✅ 해결 — 특이성 0-3-0으로 격상 */
&[data-disabled][data-variant][data-color] { ... }
&[data-disabled][data-size] { ... } /* size만 있는 기본 상태도 커버 */
```

---

## 9. 애니메이션

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록 색상 transition 을 건다.

```css
transition:
  background-color 0.2s ease,
  color 0.2s ease;
```

- **절대 `transition: all` 을 쓰지 않는다** — 레이아웃 속성에 애니메이션이 걸려 튄다.
  색상 속성(`background-color`, `color`)만 지정.
- **지속시간은 0.2s 로 통일** — 다른 컴포넌트와 타이밍을 맞춘다.
- 전역 `*` 셀렉터는 성능 저하/부작용으로 금지한다(AGENTS.md "색상 전환 애니메이션" 참조).
- reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
  `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
  전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

