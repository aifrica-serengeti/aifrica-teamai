# Search — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Search 문서 인덱스](./README.md)

## 7. 상태

5가지 상태. 상호작용에 따라 시각 변화. Container 상태 전환은 Input 스펙을 상속.

| 상태         | 동작                      | 시각 변화                                                     |
| ------------ | ------------------------- | ------------------------------------------------------------- |
| **Enabled**  | 값 입력 가능한 기본 상태  | border `#ddd`, surface `#fff`, search icon `#1c1c1c`          |
| **Focused**  | 포커스 받아 입력 대기     | border 2px(1px+inset) `var(--accent-500)`, surface 유지                 |
| **Typing**   | 키보드 입력 중            | Focused 와 동일 + close button 표시(값 있음)                  |
| **Filled**   | 값 입력 완료(포커스 아님) | Enabled 와 동일 + close button 표시                           |
| **Disabled** | 모든 상호작용 차단        | surface `#f8f8f8`, text/placeholder 회색, close button 미표시 |

### 구현 주의점

1. **Close button 은 값이 있을 때만 표시**: controlled(`value` prop)와 uncontrolled
   (`defaultValue`) 모두 지원. 컴포넌트가 내부 상태로 입력값을 추적하여, 어느 쪽이든
   값이 있으면 close button 을 보여준다.
2. **Disabled 에서 close button 숨김**: 값이 있어도 disabled 상태에서는 close button 을
   표시하지 않는다(상호작용이 불가하므로).
3. **Close 후 포커스 유지**: close button 클릭 시 값을 비우고 input 에 포커스를 되돌려,
   사용자가 바로 다시 입력할 수 있게 한다.
4. **Focus 밀림 방지**(Input 상속): border-width 변화가 아닌 inset box-shadow 로 2px 표현.

---

## 9. 애니메이션

색상 전환은 **개별 컴포넌트 요소 레벨**에서 `transition: '<색상속성> 0.2s ease'`.
전역 `*` 셀렉터 사용 금지. `transition: all` 금지. 0.2s 통일.

```css
/* Container — Input 상속 */
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  box-shadow 0.2s ease,
  color 0.2s ease;

/* Leading search icon — 색상만 */
transition: color 0.2s ease;

/* Close button — 배경/색/투명도 */
transition:
  background-color 0.2s ease,
  color 0.2s ease,
  opacity 0.2s ease;

/* Placeholder / Label / Help text — 색상만 */
transition: color 0.2s ease;
```

> 다크/라이트 모드 전환 시에도 각 요소의 transition 이 보간되어 깜빡임 없이 부드럽게 전환.
> `@media (prefers-reduced-motion: reduce)` 가 전역으로 transition 을 무력화하므로 컴포넌트는
> 별도 reduced-motion 처리 불필요.

---

