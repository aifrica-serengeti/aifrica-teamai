# Scrollbar & ScrollArea — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](./README.md)

## 6. 상태

### 노출 타이밍 (`type` prop)

thumb는 opacity transition으로 부드럽게 페이드 인/아웃한다.

| type           | 동작                                       | 구현                                                      |
| -------------- | ------------------------------------------ | --------------------------------------------------------- |
| `hover` (기본) | 컨테이너 hover 시 thumb 표시, 이탈 시 숨김 | `wrapper[data-type="hover"]:hover > thumb { opacity: 1 }` |
| `always`       | 항상 표시                                  | `wrapper[data-type="always"] > thumb { opacity: 1 }`      |
| `scroll`       | 스크롤 중에만 표시(800ms 디바운스 후 숨김) | JS로 wrapper에 `.is-scrolling` 클래스 토글                |
| `auto`         | hover **또는** scroll 시 표시              | hover + is-scrolling 규칙 결합                            |

> naive-ui의 기본 동작(`hover`)을 프로젝트 기본값으로 채택했다.

### 명시도 관리 (구현 주의)

thumb 기본 `opacity: 0` 규칙보다 노출 규칙(hover/scroll/always)이 더 **높은 CSS 명시도**를
가져야 한다. 기본 규칙은 `.wrapper > .thumb`(클래스 2개), 노출 규칙은
`.wrapper[data-type="..."]:hover > .thumb`(속성+클래스 조합)로 더 구체적으로 작성한다.
기본 opacity를 `thumbBase` style 내부에 두면 합성 클래스와 명시도 충돌로 노출 규칙이
덮어쓰지 못하므로, `globalStyle`로 분리한다.

thumb selector는 반드시 직계 자식 결합자(`>`)를 사용한다. Page ScrollArea 안에 Table ScrollArea가
중첩된 경우 바깥 wrapper의 hover·scroll 상태가 안쪽 thumb까지 노출해서는 안 되며, 각 wrapper는
자신이 직접 소유한 thumb의 표시 상태만 제어한다.

### 방향 (`orientation` prop)

| orientation       | 렌더되는 thumb        | scrollContainer overflow               |
| ----------------- | --------------------- | -------------------------------------- |
| `vertical` (기본) | thumbVertical(우측)   | `overflow-y: auto; overflow-x: hidden` |
| `horizontal`      | thumbHorizontal(하단) | `overflow-x: auto; overflow-y: hidden` |
| `both`            | 둘 다                 | `overflow: auto`                       |

### 수직 thumb 시작 여백 (`verticalThumbOffset`)

- 기본값은 `0`이다.
- 양수 px를 전달하면 수직 thumb의 시작점과 드래그 트랙만 그만큼 아래로 이동한다.
- sticky header가 있는 Table은 `small`에서 `30`, `medium`에서 `38`을 전달해 thumb가 header
  영역을 침범하지 않게 한다.
- 콘텐츠의 스크롤 위치·휠·키보드 동작과 `onScrollMetricsChange` 측정값은 바꾸지 않는다.

### 스크롤 측정 콜백 (`onScrollMetricsChange`)

Dialog처럼 스크롤 위치를 별도 시각 상태로 표현하는 부모는 이 콜백을 사용한다.
콜백은 `{ clientHeight, scrollHeight, scrollTop }`을 전달하며, 초기 렌더·스크롤·크기
변화에서 같은 측정 경로로 호출된다. 부모가 DOM child 순서나 class name을 직접 조회해서는 안 된다.

### 명시적 위치 제어 (`ScrollAreaHandle.scrollTo`)

초기화, 탭 전환, 새 결과의 기준 위치 복원처럼 사용자 action과 직접 연결된 위치 변경은 `ref`로 받은
`scrollTo(options)`을 사용한다. 이 method는 native `Element.scrollTo(ScrollToOptions)`와 같은 `top`,
`left`, `behavior` 값을 실제 scroll container에 전달한다. 위치 변경으로 발생한 native scroll event가
thumb geometry와 `onScrollMetricsChange`를 같은 경로로 갱신한다.

- render나 파생 state Effect에서 매번 호출하지 않는다.
- 사용자 action과 무관하게 읽던 위치를 강제로 바꾸지 않는다.
- 부모가 `[data-slot="scroll-container"]`를 query하거나 내부 DOM 순서에 의존하지 않는다.

### 최하단 유지 (`stickToEnd`)

`stickToEnd`는 기본 `false`다. `true`일 때에는 **콘텐츠 높이가 증가한 순간**, 직전 측정값이
수직 최하단이었던 경우에만 새 최하단으로 이동한다. 따라서 최신 Toast를 읽는 사용자는 계속
최하단을 보지만, 과거 Toast를 읽는 사용자의 위치를 강제로 바꾸지 않는다.

### 수직 thumb 드래그 트랙

`verticalThumbOffset`이 없는 기본 수직 thumb는 양끝 inset을 예약한다. offset을 지정하면 상단
트랙에만 추가 여백을 반영한다.

```
thumbTrack = clientSize − thumbSize − (inset + verticalThumbOffset) − inset
```

---

## 8. 애니메이션

### Thumb 페이드 인/아웃

thumb는 `opacity`와 `background-color`에 transition을 건다. 색상 속성만 지정하며
**절대 `transition: all`을 쓰지 않는다**(레이아웃 애니메이션 튐 방지).

```css
transition:
  opacity 0.2s ease,
  background-color 0.2s ease;
```

- **opacity**: hover/scroll 시 thumb 페이드 인/아웃(naive-ui 효과).
- **background-color**: thumb hover 시 fill(30%) → hover(55%) alpha 전환, 그리고
  라이트/다크 모드 전환 시 부드러운 색상 보간.

### 다크/라이트 모드 전환

wrapper 자체도 색상 transition을 가진다:

```css
transition:
  background-color 0.2s ease,
  border-color 0.2s ease;
```

> 전역 `*` 셀렉터가 아닌 개별 요소에만 transition 적용. 지속시간 0.2s로 통일.
> `@media (prefers-reduced-motion: reduce)`가 전역에서 모든 transition을 무력화한다.

### 스크롤 타이밍 (`type="scroll"`)

스크롤停止 후 **800ms** 뒤 thumb 페이드 아웃. 디바운스 타이머로 구현.

---
