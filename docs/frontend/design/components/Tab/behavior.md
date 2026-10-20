# Tab — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](./README.md)

## 7. 상태

| 상태                      | 동작          | 시각 변화                                    |
| ------------------------- | ------------- | -------------------------------------------- |
| **Selected (active)**     | 패널 전환     | 파랑 텍스트 + SemiBold + 2px accent 인디케이터 |
| **Unselected (inactive)** | 클릭 가능     | 회색 텍스트 + Regular                        |
| **Hovered**               | unselected 만 | 하단선 진해짐 + 회색 배경                    |
| **Pressed**               | unselected 만 | 하단선 더 진해짐 + 더 진한 회색 배경         |
| **Focused**               | 모든 trigger  | 2px accent 직사각형 outline (내부)             |
| **Disabled**              | 클릭 불가     | 회색 텍스트, 인디케이터 없음                 |

### 개별 vs 그룹 비활성

- **개별 비활성**: 특정 탭만 `disabled`. 다른 탭은 정상 동작.
- **그룹 비활성**: 전체 `disabled` prop. 모든 탭이 비활성.

---

## 9. 애니메이션

### 상호작용 (선택/hover/pressed/focus)

색상 전환은 0.2초에 걸쳐 서서히 전환된다.

```css
transition:
  color 0.2s ease,
  background-color 0.2s ease,
  box-shadow 0.2s ease;
```

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록, **각 색상 요소에 transition 적용** (전역 `*` 금지).

Tab 컴포넌트에서 transition 이 적용되는 요소:

- `tabsTrigger` — `color`, `background-color`, `box-shadow`
- `triggerLabel` — `color`
- `triggerIcon` — `color`
- Chip (globalStyle) — `background-color`, `color`

> `transition: all` 금지. 색상 속성만 지정.
> `globals.css` 의 `@media (prefers-reduced-motion: reduce)` 가 모든 transition 을 무력화.

### 오버플로우 이동 버튼

- 버튼은 스크롤 가능 방향이 바뀌어도 mount/unmount하지 않고 `data-visible` 상태만 바꾼다.
- 표시될 때 바깥쪽 4px에서 제자리로 이동하며 opacity가 0→1로 0.2초간 전환된다.
- 사라질 때 opacity가 1→0으로 전환된 뒤 visibility가 hidden으로 바뀐다.
- 숨김 상태에서는 `disabled`, `aria-hidden="true"`, `pointer-events: none`으로 동작하지 않는다.
- 스크롤 시작점에서는 다음 버튼만, 중간에서는 양쪽 버튼, 끝에서는 이전 버튼만 표시한다.

---

---

## 동적 탭 제거 (Remove action)

아래는 closable Tab adapter가 충족해야 하는 의도된 계약이다. 제공된
[일반·controlled 예제](./implementation/typescript.md)의 `TabItem`과 markup에는 `onRemove`·`removeLabel`이
없으며, 별도 adapter 구현을 제공하지 않는다. 일반 예제를 복사한 것만으로 제거 동작이 생기지 않는다.

closable adapter에서 `TabItem.onRemove`를 지정하면 label 옆에 닫기 버튼(`close` icon, 18px)이 노출되어야 한다.

- 버튼은 `type="button"`이며 클릭·Enter·Space에서 탭 전환을 막고(`stopPropagation`) `onRemove`만 호출한다.
- 접근성 이름은 `removeLabel`, 없으면 `{label} 탭 닫기`를 사용한다.
- 닫기 동작 자체(활성 탭 전환, 스택 정리)는 소유 page가 결정한다. Tab은 표시와 callback만 담당한다.

## 별도 page panel과의 연결

`showContent=false` 조립은 내부 `TabsContent`를 렌더하지 않는다. 외부 page panel 연결까지 완료했다는
뜻이 아니다. 실제 제품 adapter가 trigger의 `aria-controls`와 panel id, panel의 `aria-labelledby`와
trigger id를 연결하고 활성 panel·선택값을 같은 page state에서 갱신해야 한다. 실제 Radix runtime에서
존재하지 않는 panel 참조·중복 id·잘못된 focus 이동이 없는지 검증한다.
