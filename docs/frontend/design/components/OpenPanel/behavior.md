# Open panel — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](./README.md)

## 7. 상태

| 상태         | 동작                       | 시각 변화                                               |
| ------------ | -------------------------- | ------------------------------------------------------- |
| **Closed**   | 패널 숨김                  | slide-out 애니메이션 후 unmount (Radix Dialog)          |
| **Opening**  | trigger 클릭 / `open=true` | scrim fade-in + 패널 방향별 slide-in (0.25s)            |
| **Open**     | 패널 표시                  | Body 포커스 트랩. ESC / scrim 클릭 / 닫기 버튼으로 닫음 |
| **Closing**  | ESC / scrim / 닫기         | scrim fade-out + 패널 slide-out (0.25s)                 |
| **Resizing** | resize line 드래그         | 패널 너비/높이 실시간 변경. line 색 `--icon` 으로 강조  |

> **모달/비모달**: `modal` prop(기본 `true`). `modal=false` 시 scrim 클릭으로 닫기
> 방지(Inline 타입에서 유용). ESC 닫기는 Radix 기본 동작.

---

## 9. 애니메이션

### 패널 진입/퇴장 (방향별 slide + fade)

| 위치       | 진입                                  | 퇴장   |
| ---------- | ------------------------------------- | ------ |
| **Top**    | `translateY(-100%)` → `translateY(0)` | 역방향 |
| **Right**  | `translateX(100%)` → `translateX(0)`  | 역방향 |
| **Bottom** | `translateY(100%)` → `translateY(0)`  | 역방향 |
| **Left**   | `translateX(-100%)` → `translateX(0)` | 역방향 |

- 지속시간: **0.25s**
- 타이밍 함수: `ease`
- `animation-fill-mode: both` (진입 전/후 상태 유지)
- `data-state="open"` / `data-state="closed"` 로 제어
- Scrim: 동시 `opacity 0→1` fade (0.25s)

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록, **각 색상 요소에 transition 적용** (전역 `*` 금지).

Open panel 에서 transition 이 적용되는 요소:

- Panel 본체 — `background-color`, `color`, `box-shadow`
- Header — `border-color`, `background-color`
- Title — `color`
- Resize line — `background-color`
- Scrim — `background-color`

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

