# Text Button — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Text Button 문서 인덱스](./README.md)

## 7. 상태

| 상태         | 동작           | 시각 변화                                                                             |
| ------------ | -------------- | ------------------------------------------------------------------------------------- |
| **Enabled**  | 클릭 가능      | 투명 배경, 기본 텍스트 색상                                                           |
| **Hovered**  | 마우스 오버    | 회색 오버레이 배경(라이트 `#f8f8f8` / 다크 흰 알파 15%)                               |
| **Pressed**  | 마우스 누름 중 | 더 진한 오버레이 배경(라이트 `#f4f4f4` / 다크 흰 알파 20%)                            |
| **Disabled** | 클릭 불가      | 텍스트/아이콘 회색 전환(라이트 `#aaa` / 다크 `#555`). 배경 투명. 커서 `not-allowed`   |
| **Focused**  | 키보드 포커스  | 1px outline(라이트 `var(--accent-500)` / 다크 `var(--accent-400)`), 1px gap. 배경/hover/pressed 상태 유지 |

> Hovered/Pressed 는 CSS `:hover:not(:disabled)` / `:active:not(:disabled)` 로 처리.
> Disabled 는 가장 우선순위가 높아야 하므로 셀렉터 마지막에 `:disabled` 로 선언.

---

## 9. 애니메이션

### 상호작용 (hover/pressed/disabled)

배경/텍스트 색상 전환을 0.2초에 걸쳐 부드럽게 처리한다.

```css
transition:
  background-color 0.2s ease,
  color 0.2s ease;
```

- **절대 `transition: all` 을 쓰지 않는다** — 레이아웃 속성(width/height/padding)에도 애니메이션이
  걸려 의도치 않은 튐 현상이 생긴다. 색상 속성만 지정.
- Text Button 은 테두리가 없으므로 `border-color` 는 transition 에서 생략(Button 과의 차이).
- focus outline 색상은 outline 자체가 보이고/사라지므로 별도 transition 불필요.

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록 위와 동일한 색상 transition 으로 처리.
전역 `*` 셀렉터는 성능 저하/부작용으로 금지한다(AGENTS.md "색상 전환 애니메이션" 참조).

> `globals.css` 의 `@media (prefers-reduced-motion: reduce)` 가 모든 transition 을 무력화하므로
> 컴포넌트는 별도 reduced-motion 처리 불필요.

---

