# Split Button — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](./README.md)

## 7. 상태

| 상태         | 트리거                            | 시각 변화                                                      | 비고                                                   |
| ------------ | --------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------ |
| **Enabled**  | 기본                              | tertiary 기본 색상(`#ffffff` / 다크 반투명 흰)                 | —                                                      |
| **Hovered**  | 마우스 hover (각 action 독립)     | fill 이 한 단계 회색으로 전환                                  | 한쪽을 hover 해도 다른쪽은 변화 없음                   |
| **Pressed**  | 마우스 누름 중 (각 action 독립)   | fill 이 더 진한 회색                                           | —                                                      |
| **Active**   | Secondary action 클릭 → Menu 열림 | Secondary fill 이 pressed 색상 유지 + chevron 180° 회전        | Radix `data-state="open"`. Primary 는 Active 상태 없음 |
| **Focused**  | 키보드 Tab                        | `1px var(--accent-500)` outline, 1px gap + `z-index: 1`                  | 양쪽 action 각각 독립 focus. 마우스 hover 시에는 숨김  |
| **Disabled** | `disabled` prop                   | 흐려진 텍스트(`#aaaaaa`/다크 `#555555`). 호버/프레스 효과 없음 | 양쪽 action 동시 disabled. `cursor: not-allowed`       |

### 상태 독립성 (핵심)

Primary action 과 Secondary action 은 **각각 독립적으로** 상태가 변한다:

- Primary action 에 마우스를 올려도 Secondary action 배경은 변하지 않는다(역도 동일).
- Secondary action 의 메뉴가 열려있어도(Active) Primary action 은 기본 색상을 유지한다.

### 상태 우선순위 (각 action 내부)

1. **Disabled** (최우선) — hover/pressed 무시
2. **Active**(Secondary 만) — pressed 색상 유지. hover 중에도 Active 유지
3. **Hovered / Pressed** — `:hover` / `:active` CSS 의사 클래스
4. **Focused** — `:focus-visible` 시 outline 추가(fill/hover/pressed 상태와 중첩 가능)
5. **Enabled** (기본)

---

## 9. 애니메이션

### Chevron 회전 (메뉴 열림/닫힘)

| 항목        | 스펙                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| 변화        | `chevron_down` 아이콘이 0° → **180°** 회전 (down chevron → up chevron) |
| 트리거      | Radix `data-state="open"` (trigger button 에 설정됨)                   |
| 지속시간    | **0.15s**                                                              |
| 타이밍 함수 | `ease`                                                                 |
| CSS         | `transform: rotate(180deg)`, `transition: transform 0.15s ease`        |

> Dropdown / Select 와 동일한 down→up 전환 패턴. 메뉴가 닫힐 때는 180° → 0° 로 되돌아간다.

### 색상 전환 (hover/pressed/다크 모드)

깜빡임 없이 부드럽게 전환되도록 **각 색상 요소에 transition 적용** (전역 `*` 금지).

Split Button 에서 transition 이 적용되는 요소:

- Primary/Secondary action — `background-color`, `border-color`, `color`
- Label 텍스트 — `color`
- 분할선(border 겹침) — `border-color`

> 모든 색상 transition 은 **0.2s ease** 로 통일. `transition: all` 금지.
> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

### Menu 진입/퇴장

Menu(Radix DropdownMenu) 자체의 fade+slide 애니메이션(0.15s). 상세는 `Menu/README.md` 참조.

### Menu 높이 선택

- `menuScrollable=true`는 옵션이 많을 때 최대 296px 안에서 공용 ScrollArea를 사용한다.
- `menuScrollable=false`는 짧은 메뉴를 실제 항목 높이로 표시해 불필요한 하단 여백을 만들지 않는다.
- 기본값은 기존 사용처와 호환되는 `true`다.

---
