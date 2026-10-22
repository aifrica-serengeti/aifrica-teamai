# Button — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](./README.md)

## 6. 상태

| 상태         | 동작           | 시각 변화                                                         |
| ------------ | -------------- | ----------------------------------------------------------------- |
| **Enabled**  | 클릭 가능      | variant 기본 색상                                                 |
| **Hovered**  | 마우스 오버    | fill 이 한 단계 진하거나(pressed 방향) 파스텔(secondary/tertiary) |
| **Pressed**  | 마우스 누름 중 | fill 이 더 진해짐 (가장 진한 색)                                  |
| **Disabled** | 클릭 불가      | 흐려진 fill/text. 커서 `not-allowed`. 호버/프레스 효과 없음       |
| **Focused**  | 키보드 포커스  | 1px `var(--accent-500)` outline, 1px gap. fill/hover/pressed 상태 유지      |

> Hovered/Pressed는 native `:disabled`와 공용 `data-disabled`를 모두 제외해 처리한다.
> Disabled 는 가장 우선순위가 높아야 하므로 셀렉터 마지막에 `:disabled` 로 선언.

---

## 8. 애니메이션

### 상호작용 (hover/pressed/disabled)

배경/테두리/텍스트 색상 전환을 0.2초에 걸쳐 부드럽게 처리한다.

```css
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  color 0.2s ease;
```

- **절대 `transition: all` 을 쓰지 않는다** — 레이아웃 속성(width/height/padding)에도 애니메이션이
  걸려 의도치 않은 튐 현상이 생긴다. 색상 속성만 지정.
- focus outline 색상은 outline 자체가 보이고/사라지므로 별도 transition 불필요.

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록 위와 동일한 색상 transition 으로 처리.
전역 `*` 셀렉터는 성능 저하/부작용으로 금지한다(AGENTS.md "색상 전환 애니메이션" 참조).

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---


### asChild 비활성

Native button child는 `disabled`를 전달한다. Anchor child는 disabled 동안 href를 제거하고 `aria-disabled`, `tabIndex=-1`과 click/keyboard guard를 사용한다. Child와 Button 양쪽의 활성화 callback이 실행되지 않으며 `data-disabled`로 같은 visual 상태를 적용한다.
