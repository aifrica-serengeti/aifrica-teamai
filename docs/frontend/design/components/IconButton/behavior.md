# Icon Button — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](./README.md)

## 7. 상태

| 상태         | 동작           | 시각 변화                                                                      |
| ------------ | -------------- | ------------------------------------------------------------------------------ |
| **Enabled**  | 클릭 가능      | variant 기본(Outlined: 테두리만 / Ghost: 투명)                                 |
| **Hovered**  | 마우스 오버    | 반투명 overlay 배경 `rgba(0,0,0,0.05)`                                         |
| **Pressed**  | 마우스 누름 중 | 더 진한 overlay 배경 `rgba(0,0,0,0.1)`                                         |
| **Disabled** | 클릭 불가      | icon 색상 `--icon-disabled` 로 전환. 커서 `not-allowed`, 호버/프레스 효과 없음 |
| **Focused**  | 키보드 포커스  | 1px `var(--accent-500)` outline, 1px gap. 배경/hover/pressed 상태 유지                   |

> Hovered/Pressed 는 CSS `:hover:not(:disabled)` / `:active:not(:disabled)` 로 처리.
> Disabled 는 시각적으로 최우선이므로 icon 색상 전환 + `pointer-events: none` 으로 처리.

---

## 9. 애니메이션

### 상호작용 (hover/pressed/disabled)

배경/테두리 색상 전환을 0.2초에 걸쳐 부드럽게 처리한다.

```css
transition:
  background-color 0.2s ease,
  border-color 0.2s ease;
```

- **절대 `transition: all` 을 쓰지 않는다** — 레이아웃 속성에 애니메이션이 걸려 튄다. 색상 속성만 지정.
- icon 색상은 Icon 컴포넌트가 자체적으로 `transition: color 0.2s ease` 를 가지므로
  Icon Button 쪽에서 별도 처리하지 않아도 다크 모드 전환이 부드럽다.

### 다크/라이트 모드 전환

전역 `*` 셀렉터는 성능 저하/부작용으로 금지한다. 위와 같이 개별 요소의 색상 transition 으로 처리.
`globals.css` 의 `@media (prefers-reduced-motion: reduce)` 가 모든 transition 을 무력화하므로
컴포넌트는 별도 reduced-motion 처리 불필요.

---

