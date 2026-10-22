# Segmented Control — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](./README.md)

## 8. 상태

| 상태         | 동작                        | 시각 변화                                                         |
| ------------ | --------------------------- | ----------------------------------------------------------------- |
| **Enabled**  | 클릭하여 선택 가능          | 기본색 (위 표 참조)                                               |
| **Hovered**  | 마우스 오버 (unselected 만) | 검정 5% 오버레이. selected 는 변화 없음                           |
| **Pressed**  | 마우스 다운 (unselected 만) | 검정 10% 오버레이. selected 는 변화 없음                          |
| **Focused**  | 키보드 Tab 진입             | inset 2px 파란 링, border 투명화. 배경 변화 없음                  |
| **Disabled** | 클릭 불가                   | 텍스트/아이콘 회색(#aaa). selected 는 배경 유지, 테두리 연한 회색 |

> **개별 아이템 비활성**: `option.disabled` prop 으로 특정 아이템만 비활성 가능.
> **그룹 전체 비활성**: `disabled` prop 으로 모든 아이템 비활성.

---

## 10. 애니메이션

### 상호작용 (hover/pressed/focus/선택 전환)

모든 색상 전환은 0.2초에 걸쳐 서서히 진행된다.

```css
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  color 0.2s ease,
  box-shadow 0.2s ease;
```

- `box-shadow` 포함 → hover/pressed 오버레이 및 focus 링 진입/이탈이 부드럽게.
- `color` 포함 → selected/unselected 텍스트 색상 전환 부드럽게.
- **절대 `transition: all` 사용 금지** — 레이아웃 애니메이션이 튄다.

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록, **각 색상 요소에 transition 적용** (전역 `*` 금지).

Segmented Control 에서 transition 이 적용되는 요소:

- `item` — `background-color`, `border-color`, `color`, `box-shadow`
- `group`(컨테이너) — `background-color`, `border-color`
- `divider` — `background-color`
- `label`, `helpText`, `infoIconTrigger` — `color`

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

