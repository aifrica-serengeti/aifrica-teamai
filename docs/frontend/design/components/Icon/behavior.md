# Icon — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon 문서 인덱스](./README.md)

## 8. 애니메이션

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록, **아이콘 래퍼 요소에 transition 적용** (전역 `*` 금지).

```css
/* 아이콘 래퍼 — 색상만, 0.2s */
transition: color 0.2s ease;
```

- `transition: all` 사용 금지 (레이아웃 애니메이션 튐).
- 색상 속성(`color`)만 지정.
- 지속시간은 컴포넌트 내에서 **0.2s 로 통일**.

격자 표시처럼 상태가 전환되는 액션에서는 `grid`와 `grid_off`를 현재 가능한 액션에 맞춰 교체한다.
아이콘 자체에 별도 상태를 저장하지 않고 상태 소유자가 `name`을 선택한다.

> `globals.css` 의 `@media (prefers-reduced-motion: reduce)` 가 모든 transition 을 무력화하므로
> 컴포넌트는 별도 reduced-motion 처리 불필요.

---
