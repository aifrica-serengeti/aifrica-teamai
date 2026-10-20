# Stepper — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](./README.md)

## 7. 상태

상태는 `current` index 기반으로 자동 계산된다.

| 상태           | 조건                                | 시각                                                            |
| -------------- | ----------------------------------- | --------------------------------------------------------------- |
| **Completed**  | `index < current`                   | 흰 원 + 파랑 테두리 + 파랑 체크 SVG. 라벨 기본색. Divider 파랑. |
| **Active**     | `index === current` (invalid 아님)  | 파랑 원 + 흰 숫자. 라벨 파랑. Divider 기본색.                   |
| **Incomplete** | `index > current`                   | 흰 원 + 회색 테두리 + 진 숫자. 라벨 기본색. Divider 기본색.     |
| **Invalid**    | `index === current && step.invalid` | 빨강 원 + X SVG(라이트: 흰색/다크: 검정). 라벨 빨강.            |
| **Disabled**   | `disabled` prop                     | 흰 원 + 옅은 회색 테두리 + 회 숫자. 라벨 회색.                  |

### 클릭 가능한 라벨 (clickable + onStepClick)

`clickable=true`면 기본적으로 각 라벨이 `<button>`으로 렌더되어 클릭 시 해당 step으로 이동할 수 있다.
특정 단계의 `StepperStep.clickable=false`를 지정하면 그 라벨만 텍스트로 렌더되어 탐색 대상에서
제외된다. 전체 `disabled` 상태도 클릭 불가다. 도달한 단계만 다시 방문하게 하는 마법사는
전체 `clickable`과 단계별 `clickable`을 함께 사용한다.

| 상호작용      | 효과                                                |
| ------------- | --------------------------------------------------- |
| hover         | 라벨 색상 → primary(active 색상과 동일)             |
| focus-visible | `outline: 2px solid primary`, `outline-offset: 2px` |
| 키보드        | Tab으로 포커스, Enter/Space로 클릭                  |

> **구현 주의**: label button은 `baseSmall`/`baseMedium` 폰트 클래스를 그대로 상속받아야 한다.
> `labelButton` 클래스에 `font: 'inherit'`이나 `fontSize: 'inherit'`을 넣으면
> vanilla-extract에서 후순위 클래스가 폰트 값을 덮어써 버튼이 브라우저 기본 폰트(16px/400)로
> 렌더된다. `labelButton`에는 font 속성을 **전혀 설정하지 않는다**.

---

## 9. 애니메이션

### 색상 전환 (다크/라이트 모드)

다크/라이트 전환 시 깜빡임 없이 부르럽게 보간. **개별 요소 레벨**에서 `transition` 적용.

| 요소                         | transition 속성                  | 지속시간    |
| ---------------------------- | -------------------------------- | ----------- |
| Stepper-icon (배경/테두리)   | `background-color, border-color` | `0.2s ease` |
| 내부 콘텐츠 (숫자/마크 색상) | `color`                          | `0.2s ease` |
| Divider (연결선)             | `background-color`               | `0.2s ease` |
| Stepper-base (라벨)          | `color`                          | `0.2s ease` |
| Help Text                    | `color`                          | `0.2s ease` |

> **규칙**: `transition: all` 금지. 색상 속성만 지정. 지속시간 0.2s로 통일.
> `prefers-reduced-motion: reduce` 시 전역 규칙이 무력화.

### 클릭 가능한 라벨

| 상호작용      | 효과                                                |
| ------------- | --------------------------------------------------- |
| hover         | 라벨 색상 → primary. `transition: color 0.2s ease`  |
| focus-visible | `outline: 2px solid primary`, `outline-offset: 2px` |

---
