# Action bar — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](./README.md)

## 8. 애니메이션

### 상호작용 (hover/pressed/focus)

배경색·글씨색·outline 색상이 0.2초에 걸쳐 서서히 전환된다.

```css
transition: background-color 0.2s ease, color 0.2s ease, outline-color 0.2s ease;
```

> **절대 `transition: all` 을 쓰지 않는다** — 레이아웃 속성까지 애니메이션되어 튄다.
> 색상 관련 속성만 지정한다.

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록, **각 색상 요소에 transition 적용** (전역 `*` 금지).

Action bar 컴포넌트에서 transition 이 적용되는 요소:
- `actionBar` (컨테이너) — `background-color`, `box-shadow`
- `action` — `background-color`, `color`, `outline-color`
- `iconButton` — `background-color`, `color`, `outline-color`
- `countText` — `color`
- `dividerLine` — `background-color`

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

