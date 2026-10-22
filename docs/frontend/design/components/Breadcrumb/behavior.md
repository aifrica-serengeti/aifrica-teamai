# Breadcrumb — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](./README.md)

## 7. 상태

| 상태         | 동작                 | 시각 변화                                |
| ------------ | -------------------- | ---------------------------------------- |
| **Enabled**  | 상위 depth 클릭 가능 | 회색 텍스트, 밑줄 없음                   |
| **Hovered**  | 마우스 오버          | 한 단계 진한 회색 + **밑줄**             |
| **Pressed**  | 누름 중              | 더 진한 회색 + 밑줄 유지                 |
| **Focused**  | 키보드 포커스        | enabled 색상 유지 + 1px outline, 1px gap |
| **Selected** | 현재 페이지(마지막)  | 본문 텍스트 색, 비상호작용, 밑줄 없음    |

> - Hovered/Pressed 는 CSS `:hover` / `:active` 로 처리.
> - 현재 페이지는 `<span aria-current="page">` 로 렌더. 링크가 아님.
> - Separator 는 상호작용 요소가 아니므로 상태 전환 없음.

### Focus (Focus-visible)

| 항목                 | 스펙                                                            |
| -------------------- | --------------------------------------------------------------- |
| outline 두께         | **1px**                                                         |
| outline 색상         | 라이트 `var(--accent-500)` / 다크 `var(--accent-400)` (`--breadcrumb-focus-border`) |
| outline gap (offset) | **1px**                                                         |
| 적용 대상            | 상위 depth 링크(Item)와 축약 `...` 버튼(IconButton) 양쪽        |

> Link/Button/Radio/Checkbox 의 focus(1px stroke + 1px offset)와 **동일한 패턴**으로 통일.

---

## 8. 밑줄 애니메이션 (핵심 구현 디테일)

상위 depth 의 밑줄은 hover/pressed 시 나타난다. 이때 **`text-decoration-line`(none↔underline)
자체는 브라우저가 transition 하지 않아** 값이 바뀌는 순간 밑줄이 깜빡 나타난다.

**해결책:** 밑줄을 항상 `underline` 으로 켜두고, 대신 **밑줄 색상(`text-decoration-color`)을
`transparent → currentColor`** 로 전환한다. `text-decoration-color` 는 transition 이 지원되어
텍스트 색상과 함께 밑줄이 부드럽게 페이드인된다.

```css
/* 항상 underline — 색상으로 노출 제어 */
text-decoration-line: underline;
text-decoration-color: transparent; /* Enabled: 투명 → 안 보임 */

&:hover {
  text-decoration-color: currentColor;
} /* 밑줄 서서히 나타남 */
&:active {
  text-decoration-color: currentColor;
}

transition:
  color 0.2s ease,
  text-decoration-color 0.2s ease;
```

> 현재 페이지(Selected)는 밑줄 자체가 없다(비상호작용 텍스트).

---

## 9. 자동 축약 로직 (items prop 모드)

컨테이너 너비에 맞춰 중간 depth 를 `...` 으로 축약한다.

### 축약 패턴 — 루트 + 끝쪽 우선 보존

너비가 좁아질수록 **루트(첫 항목)와 끝쪽(current 방향) 항목을 우선 보존**하고,
루트 다음 중간부터 순차적으로 축약한다.

```
visible=total → 1 / 2 / 3 / 4 / 5         (축약 없음)
visible=4     → 1 / ... / 3 / 4 / 5       (... 클릭 → {2} 메뉴)
visible=3     → 1 / ... / 4 / 5           (... 클릭 → {2,3} 메뉴)
visible=2     → 1 / ... / 5               (... 클릭 → {2,3,4} 메뉴)
```

- **최소 표시 항목**: 2개 (루트 + 현재 페이지). 이보다 더 줄지 않는다.
- 축약된 중간 항목은 `...` 버튼 클릭 시 **small 사이즈 Menu**에 원래 순서대로 노출.
- Menu 의 각 MenuItem 은 `onSelect` 콜백으로 해당 depth 로의 이동을 지원한다.

### 측정 원리 (플리커 없음)

1. **ResizeObserver** 로 컨테이너 가용 너비(`clientWidth`)를 실시간 추적.
2. 화면에 보이지 않는 **측정 레이어**(`position:absolute; left:-9999px; visibility:hidden`)에
   모든 Item label 을 동일 폰트/간격으로 렌더하여 각 `offsetWidth` 를 측정.
3. 측정된 너비들로 가용 너비에 들어가는 최대 표시 개수를 계산.
4. 표시 개수가 total 보다 작으면 중간을 `...` 으로 교체.

> 측정 레이어는 렌더는 되지만 보이지 않으므로, 너비 측정이 가능하면서도 플리커가 없다.

---

## 11. 애니메이션

### 색상 전환 (hover/pressed/다크모드)

```css
transition:
  color 0.2s ease,
  text-decoration-color 0.2s ease;
```

- 색상 속성만 지정. **절대 `transition: all` 을 쓰지 않는다.**
- 다크/라이트 전환 시에도 동일 transition 으로 깜빡임 없이 부드럽게.
- 전역 `*` 셀렉터는 성능 저하/부작용으로 금지(개별 요소에만 transition).

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

