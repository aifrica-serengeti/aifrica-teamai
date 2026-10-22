# Dialog — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](./README.md)

## 5. 스크롤 동작 (핵심)

### 높이 정책

- 콘텐츠가 적으면 다이얼로그 높이가 **auto** 로 맞춰진다(maxHeight 미만).
- 콘텐츠가 maxHeight(640px)를 초과하면 다이얼로그 높이가 640px에서 고정되고,
  **Body 영역만 스크롤**된다. Header / Subheader / Footer 는 고정.

### ScrollArea 컴포넌트 통합

Body 의 스크롤은 공용 **ScrollArea 컴포넌트**에 위임한다. 직접 `overflow: auto` +
`::-webkit-scrollbar`를 쓰지 않는다.

> **flex chain 문제 해결**: ScrollArea 의 내부 `scrollContainer`는 `height: 100%`를
> 사용하는데, flex 컨테이너 내에서 부모 height가 명시적이지 않으면 100%가 무의미해진다.
> 해결책: `dialogBody` → `bodyScrollAreaWrap` → `scrollContainer` 전체에
> `flex: 1 1 auto` + `minHeight: 0`을 적용하여 flex chain을 끊기지 않게 한다.
> `minHeight: 0`이 핵심 — flex item의 기본 `min-height: auto`를 덮어야 스크롤이 발생.

### 스크롤 위치별 border + fade

Body(`dialogBody`)에 `data-scroll-position` 속성으로 스크롤 위치를 추적하여
border 와 fade 를 분기한다.

| `data-scroll-position` | 상단 border   | 하단 border   | 상단 fade | 하단 fade |
| ---------------------- | ------------- | ------------- | --------- | --------- |
| `none` (스크롤 없음)   | ✕ transparent | ✕ transparent | ✕ 숨김    | ✕ 숨김    |
| `top` (맨 위)          | ✕ transparent | ✓ `#dddddd`   | ✕ 숨김    | ✓ 표시    |
| `middle` (중간)        | ✓ `#dddddd`   | ✓ `#dddddd`   | ✓ 표시    | ✓ 표시    |
| `bottom` (맨 아래)     | ✓ `#dddddd`   | ✕ transparent | ✓ 표시    | ✕ 숨김    |

- **border 색상**: `1px solid #dddddd` (`--border-default`). 전체 너비(좌우 패딩 포함).
- **fade**: `::before`(상단) / `::after`(하단) 가상 요소. `linear-gradient`로
  `var(--surface)`에서 투명으로 16px 높이. `opacity` 0.2s 전환.
- **fade tone**: 기본 `default`는 표시 상태 opacity 1, `subtle`은 0.5다. 위치 추적과 border는 동일하다.
- **스크롤 없을 때**: border 도 fade 도 표시하지 않는다(`none` 상태).

### 스크롤 위치 추적 (JS)

Dialog는 ScrollArea의 `onScrollMetricsChange` 콜백으로 실제 scroll container의
`clientHeight`, `scrollHeight`, `scrollTop`을 받아 위치를 계산한다. ScrollArea가
초기 렌더·리사이즈·스크롤마다 측정값을 알리므로, flex 레이아웃 확정 뒤의 값과 콘텐츠
크기 변화를 모두 반영한다.

Dialog 안에서 Select처럼 별도 option layer가 필요한 컴포넌트는 Dialog Content를 portal
경계로 사용한다. 이 layer가 열려 있는 동안에만 Dialog root overflow를 노출해 Body clipping은
유지하면서 nested layer의 wheel을 modal 외부 상호작용으로 차단하지 않는다.

---

## 8. 상태

| 상태            | 동작                       | 시각 변화                                               |
| --------------- | -------------------------- | ------------------------------------------------------- |
| **Closed**      | 다이얼로그 숨김            | scale-out 애니메이션 후 unmount (Radix Dialog)          |
| **Opening**     | trigger 클릭 / `open=true` | scrim fade-in + 본체 scale-in 0.96→1 (0.2s)             |
| **Open**        | 다이얼로그 표시            | Body 포커스 트랩. ESC / scrim 클릭 / 닫기 버튼으로 닫음 |
| **Closing**     | ESC / scrim / 닫기         | scrim fade-out + 본체 scale-out 1→0.96 (0.2s)           |
| **Body scroll** | 콘텐츠가 maxHeight 초과    | Body 영역만 스크롤. Header/Subheader/Footer 고정        |

### Confirmation profile 동작

Confirmation profile은 geometry 계약이며 mutation 종류를 소유하는 별도 Dialog state가 아니다.

1. parent page가 대상 action, open, pending, confirm callback을 소유한다.
2. safe action, 닫기, Escape, backdrop은 확인 대상 action을 실행하지 않고 Dialog만 닫는다.
3. pending 동안 중복 confirm을 막고, 제품 정책상 필요한 경우 dismiss도 막는다.
4. `size="small"`과 confirmation profile은 모두 desktop 너비 400px을 사용한다. action이 생성·수락·거절·삭제·동기화 중
   무엇이든 copy, tone, pending label 때문에 너비를 바꾸지 않는다.
5. 저장·작성 취소는 [Edit Confirmation Dialog](../EditConfirmationDialog/README.md)를 재사용한다. 승인·거절·삭제
   등 다른 의미를 그 컴포넌트의 save/cancel intent에 억지로 넣지 않고, 현재는 Dialog와 Button을 page에서
   조합해 `size="small" profile="confirmation"`으로 같은 geometry를 적용한다.
6. caller는 confirmation의 대상과 영향을 담은 description을 전달한다. 값이 공백 문자열이거나 빈 native
   wrapper이면 공용 안전 설명을 표시해 title 아래 안내가 비어 보이지 않게 한다.

### 닫기 동작 (3가지 방식)

다이얼로그는 세 가지 방식으로 닫을 수 있다. 모두 `onOpenChange(false)` 를 트리거하여
제어형(`open` prop)과 비제어형(`defaultOpen` prop) 모두 동작한다.

| 닫기 방식        | 조건                                          | 비고                                                                                                                           |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **ESC 키**       | `closeOnEscape !== false` (기본 `true`)       | Radix Dialog `onEscapeKeyDown`. 다이얼로그가 열려 있고 포커스가 내부에 있을 때 `Escape` 키 누르면 닫힘                         |
| **Scrim 클릭**   | `closeOnOutsideClick !== false` (기본 `true`) | Radix Dialog `onInteractOutside`. 다이얼로그 본체 외부(scrim 영역) 클릭 시 닫힘                                                |
| **닫기 버튼(×)** | 항상 활성                                     | `DialogPrimitive.Close asChild` → Icon Button 클릭. `closeLabel`이 있으면 해당 locale의 `aria-label`, 없으면 `다이얼로그 닫기` |

> **ESC / scrim 닫기 방지**: 중요한 폼 입력 누락을 방지해야 할 때,
> `closeOnEscape={false}` 또는 `closeOnOutsideClick={false}` 로 설정한다.
>
> ```tsx
> <Dialog closeOnEscape={false} closeOnOutsideClick={false} ... />
> ```

> **모달**: Dialog 는 항상 modal(scrim 필수). `modal` prop 이 없다(Open panel 과 다름).

---

## 10. 애니메이션

### 진입/퇴장 (fade + scale)

| 방향      | 진입                                  | 퇴장                                  |
| --------- | ------------------------------------- | ------------------------------------- |
| **본체**  | `opacity 0→1`, `scale(0.96)→scale(1)` | `opacity 1→0`, `scale(1)→scale(0.96)` |
| **Scrim** | `opacity 0→1` (fade-in)               | `opacity 1→0` (fade-out)              |

- 지속시간: **0.2s**
- 타이밍 함수: `ease`
- `animation-fill-mode: both`
- `data-state="open"` / `data-state="closed"` 로 제어
- 본체의 `transform` 은 `translate(-50%, -50%)` 를 유지한 채 scale 만 변화

### 스크롤 border/fade 전환

- border: `transition: border-color 0.2s ease`
- fade: `transition: opacity 0.2s ease`

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록, **각 색상 요소에 transition 적용** (전역 `*` 금지).

Dialog 에서 transition 이 적용되는 요소:

- 본체 — `background-color`, `color`, `border-color`, `box-shadow`
- Title — `color`
- Description — `color`
- Body — `background-color`, `border-color`

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

## 공용 알림과의 상호작용

`onInteractOutside`는 호출자가 전달한 handler를 실행한 뒤, 원래 event target이 공용 notification viewport 안에 있으면 preventDefault한다. 알림 클릭은 Dialog를 닫지 않으며 일반 scrim·Escape·닫기 동작은 기존 계약을 따른다.

공용 알림 내부 스크롤은 모달 외부 document listener로 전파하지 않는다. 알림 외부의 wheel/touch는 기존 모달 스크롤 잠금에 따른다.
