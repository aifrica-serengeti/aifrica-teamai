# Tab — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명(`--text-primary` 등)은 Aifrica Design System
토큰 체계를 따르며, 괄호 안의 hex 값이 실제 색이다.

### 트리거 상태

| 상태                 | 텍스트 색                     | 굵기           | 하단 인디케이터                            | 배경                                      |
| -------------------- | ----------------------------- | -------------- | ------------------------------------------ | ----------------------------------------- |
| **Selected**         | `var(--accent-500)` (`--text-primary`)  | 600 (SemiBold) | 2px `var(--accent-500)` (`--border-primary`)         | transparent                               |
| Unselected           | `#555555` (`--text-subtle`)   | 400 (Regular)  | 1px `#dddddd` (리스트 공통선)              | transparent                               |
| Unselected · Hovered | `#555555`                     | 400            | 2px `#aaaaaa` (`--border-default-hovered`) | `#f8f8f8` (`--surface-hover`)             |
| Unselected · Pressed | `#555555`                     | 400            | 2px `#8f8f8f` (`--border-default-pressed`) | `#f4f4f4` (`--surface-pressed`)           |
| Focused              | 상동                          | 상동           | 상동                                       | 상동 + **2px `var(--accent-500)` outline 직사각형** |
| Disabled             | `#aaaaaa` (`--text-disabled`) | 400            | 1px `#dddddd`                              | transparent                               |

**핵심 규칙:**

- Selected 텍스트는 `var(--accent-500)` (accent 색). 검은색(`#1c1c1c`)이 아님에 주의.
- Selected 하단 인디케이터는 2px accent. 리스트의 1px 회색선 위를 덮는다.
- Hover/Pressed 는 unselected 에만 적용. Selected 는 hover/pressed 시 변화 없음.
- Focus 는 selected/unselected 무관하게 모든 트리거에 2px primary 직사각형 outline.

### 오버플로우 이동 버튼

| 항목        | 값                                                     |
| ----------- | ------------------------------------------------------ |
| 너비 / 높이 | 24px / TabsList 전체 높이                              |
| 모서리      | 0px — 하단선과 안쪽 경계가 직각으로 만남               |
| 하단선      | `1px --border-default`                                 |
| 안쪽 경계   | 시작 버튼 right, 끝 버튼 left에 `1px --border-default` |
| 시작 그림자 | `--tab-overflow-shadow-start` — 오른쪽으로만 6px 확산  |
| 끝 그림자   | `--tab-overflow-shadow-end` — 왼쪽으로만 6px 확산      |
| 숨김        | opacity 0 + visibility hidden + pointer-events none    |
| 표시 전환   | opacity·transform 0.2s ease                            |

그림자는 버튼의 상하로 번지는 `box-shadow`가 아니라 버튼 안쪽 가장자리 밖에 배치한 6px 수평
그라데이션 레이어로 표현한다. 상·하단 6px에서는 세로 마스크로 투명하게 페이드해 그림자가 잘린 듯한
직선 끝을 만들지 않으며, 버튼 범위 밖의 위·아래 번짐은 허용하지 않는다.

### 포커스 (Focus-visible)

| 상태          | 스펙                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Focus-visible | **2px `var(--accent-500)` (`--border-focused`) outline**, 내부 배치(`outline-offset: -2px`), `border-radius: 2px` 직사각형 |

> outline 은 box-shadow 인디케이터와 독립적으로 동작하므로 selected 인디케이터와 충돌하지 않는다.

### Chip(카운터) 색상

| 상태         | 배경                             | 텍스트                                    |
| ------------ | -------------------------------- | ----------------------------------------- |
| Unselected   | `#eeeeee` (`--chip-subtle-gray`) | `#1c1c1c` (`--chip-text-gray` = `--text`) |
| **Selected** | `var(--accent-50)` (`--tab-count-selected-surface`) | `var(--accent-500)` (`--tab-count-selected-text`)            |
| Disabled     | `#eeeeee` (`--element-disabled`) | `#aaaaaa` (`--text-disabled`)             |

> Selected 시 Chip은 gray-subtle에서 솔루션 accent로 전환된다.
> **토큰 주의**: selected Chip 에 `--element-primary-subtle` 을 쓰면 안 됨 —
> 이 토큰은 다크 모드에서 너무 옅은 반투명 값으로 매핑된다.
> 반드시 `--tab-count-selected-surface` / `--tab-count-selected-text` 를 사용할 것.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환.
semantic 토큰이 자동으로 다크 값으로 재매핑된다.

### 트리거 상태 (Dark)

| 상태                 | 텍스트 색                     | 하단 인디케이터                            | 배경                                           |
| -------------------- | ----------------------------- | ------------------------------------------ | ---------------------------------------------- |
| **Selected**         | `var(--accent-400)` (`--text-primary`)  | 2px `var(--accent-400)` (`--border-primary`)         | transparent                                    |
| Unselected           | `#aaaaaa` (`--text-subtle`)   | 1px `#555555` (리스트 공통선)              | transparent                                    |
| Unselected · Hovered | `#aaaaaa`                     | 2px `#8f8f8f` (`--border-default-hovered`) | `#333333` (`--surface-hover`)                  |
| Unselected · Pressed | `#aaaaaa`                     | 2px `#aaaaaa` (`--border-default-pressed`) | `#555555` (`--surface-pressed`)                |
| Focused              | 상동                          | 상동                                       | **2px `var(--accent-400)` (`--border-focused`) outline** |
| Disabled             | `#757575` (`--text-disabled`) | 1px `#555555`                              | transparent                                    |

### Chip(카운터) 색상 (Dark)

| 상태         | 배경                                           | 텍스트                                    |
| ------------ | ---------------------------------------------- | ----------------------------------------- |
| Unselected   | `#333333` (`--chip-subtle-gray`)               | `#dddddd` (`--chip-text-gray` = `--text`) |
| **Selected** | `var(--accent-800)` (`--tab-count-selected-surface`)               | `var(--accent-200)` (`--tab-count-selected-text`)            |
| Disabled     | `rgba(255,255,255,0.1)` (`--element-disabled`) | `#757575` (`--text-disabled`)             |

> 다크 selected Chip 배경은 솔루션의 진한 강조 scale인 `var(--accent-800)`이다.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**

| 역할                   | 크기 | 행간 | 굵기           | 비고   |
| ---------------------- | ---- | ---- | -------------- | ------ |
| Tab Label (Unselected) | 14px | 20px | 400 (Regular)  | Body2  |
| Tab Label (Selected)   | 14px | 20px | 600 (SemiBold) | Title2 |
| Chip 텍스트            | 12px | 16px | 600 (SemiBold) | Title3 |

> Selected/Unselected 굵기 차이(400↔600)로 인한 너비 점핑을 방지하려면,
> ghost 레이어(항상 SemiBold, `visibility: hidden`)를 깔고 그 위에 실제 텍스트를
> 겹치는 기법을 사용한다(Segmented Control 패턴 참조).

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Text */
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-disabled: #aaaaaa;
  --text-primary: var(--accent-500);

  /* Surface (hover/pressed 배경) */
  --surface-hover: #f8f8f8;
  --surface-pressed: #f4f4f4;

  /* Border */
  --border-default: #dddddd;
  --border-primary: var(--accent-500);
  --border-focused: var(--accent-500);
  --border-default-hovered: #aaaaaa; /* Tab 전용 — hover 시 하단선 */
  --border-default-pressed: #8f8f8f; /* Tab 전용 — pressed 시 하단선 */

  /* Element */
  --element-disabled: #eeeeee;

  /* Tab에서 선택한 카운터만 사용하는 의미 token */
  --chip-subtle-gray: #eeeeee;
  --chip-text-gray: #1c1c1c;
  --tab-count-selected-surface: var(--accent-50);
  --tab-count-selected-text: var(--accent-500);

  /* Tab overflow */
  --tab-overflow-shadow-start: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.05),
    transparent
  );
  --tab-overflow-shadow-end: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.05)
  );

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Text */
  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-disabled: #757575;
  --text-primary: var(--accent-400);

  /* Surface */
  --surface-hover: #333333;
  --surface-pressed: #555555;

  /* Border */
  --border-default: #555555;
  --border-primary: var(--accent-400);
  --border-focused: var(--accent-400);
  --border-default-hovered: #8f8f8f;
  --border-default-pressed: #aaaaaa;

  /* Element */
  --element-disabled: rgba(255, 255, 255, 0.1);

  /* Tab에서 선택한 카운터만 사용하는 의미 token */
  --chip-subtle-gray: #333333;
  --chip-text-gray: #dddddd;
  --tab-count-selected-surface: var(--accent-800);
  --tab-count-selected-text: var(--accent-200);
}
```

`--tab-count-selected-surface`와 `--tab-count-selected-text`는 selected Tab의 count만 바꾼다.
일반 `Chip color="blue"`의 categorical palette인 `--chip-subtle-blue`와 `--chip-text-blue`를
재정의하지 않는다. 따라서 솔루션 accent가 purple이어도 일반 blue Chip의 색은 CSS 로드 순서와
무관하게 blue로 유지된다.

---
