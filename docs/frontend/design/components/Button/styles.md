# Button — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](./README.md)

## 4. 색상 스펙 — 라이트 모드

아래는 상태별 baseline 매핑이다. primary는 솔루션 accent scale로 연결하고 중립·status 값도 채택 여부를 기록한다.

### Primary (채움)

| 상태        | 배경 (fill)                    | 텍스트    | 테두리                                 |
| ----------- | ------------------------------ | --------- | -------------------------------------- |
| Enabled     | `var(--accent-600)` (accent-600)           | `#ffffff` | transparent                            |
| Hovered     | `var(--accent-700)` (accent-700)           | `#ffffff` | transparent                            |
| Pressed     | `var(--accent-800)` (accent-800)           | `#ffffff` | transparent                            |
| Disabled    | `var(--accent-200)` (accent-200)           | `#ffffff` | transparent                            |
| **Focused** | (enabled/hovered/pressed 유지) | —         | `var(--accent-500)` focus outline (1px, gap 1px) |

### Secondary (primary 외곽선)

| 상태        | 배경 (fill)                    | 텍스트               | 테두리                                 |
| ----------- | ------------------------------ | -------------------- | -------------------------------------- |
| Enabled     | `#ffffff`                      | `var(--accent-500)` (accent-500) | `1px solid var(--accent-500)`                    |
| Hovered     | `var(--accent-50)` (accent-50)            | `var(--accent-500)`            | `1px solid var(--accent-500)`                    |
| Pressed     | `var(--accent-100)` (accent-100)           | `var(--accent-500)`            | `1px solid var(--accent-500)`                    |
| Disabled    | `#ffffff`                      | `var(--accent-200)` (accent-200) | `1px solid var(--accent-200)`                    |
| **Focused** | (enabled/hovered/pressed 유지) | —                    | `var(--accent-500)` focus outline (1px, gap 1px) |

> Disabled 에서는 외곽선 색이 fill 와 조화되도록 텍스트 색과 동일한 `var(--accent-200)` 로 전환.

### Tertiary (neutral 외곽선)

| 상태        | 배경 (fill)                    | 텍스트               | 테두리                                 |
| ----------- | ------------------------------ | -------------------- | -------------------------------------- |
| Enabled     | `#ffffff`                      | `#1c1c1c` (gray-900) | `1px solid #dddddd` (gray-300)         |
| Hovered     | `#f8f8f8` (gray-50)            | `#1c1c1c`            | `1px solid #dddddd`                    |
| Pressed     | `#f4f4f4` (gray-100)           | `#1c1c1c`            | `1px solid #dddddd`                    |
| Disabled    | `#ffffff`                      | `#aaaaaa` (gray-400) | `1px solid #dddddd`                    |
| **Focused** | (enabled/hovered/pressed 유지) | —                    | `var(--accent-500)` focus outline (1px, gap 1px) |

### Negative (파괴 작업)

| 상태        | 배경 (fill)                    | 텍스트    | 테두리                                 |
| ----------- | ------------------------------ | --------- | -------------------------------------- |
| Enabled     | `#d00a0a` (red-700)            | `#ffffff` | transparent                            |
| Hovered     | `#b50606`                      | `#ffffff` | transparent                            |
| Pressed     | `#920202`                      | `#ffffff` | transparent                            |
| Disabled    | `#fec3c3`                      | `#ffffff` | transparent                            |
| **Focused** | (enabled/hovered/pressed 유지) | —         | `var(--accent-500)` focus outline (1px, gap 1px) |

> Negative 의 hover/pressed/disabled 음영은 palette 단계에 없는 Figma 전용값이다.
> 별도 raw 색을 추가하지 않고 hex 를 토큰에 직접 정의한다(`globals.css` 참조).

### 포커스 (Focus-visible) — 모든 variant 공통

| 항목                 | 스펙                                                             |
| -------------------- | ---------------------------------------------------------------- |
| outline 두께         | **1px** (절대 2px 아님)                                          |
| outline 색상         | `var(--accent-500)` (다크에서도 동일)                                      |
| outline gap (offset) | **1px** — border-box 에서 outline 시작점까지 빈 공간             |
| 시각적 전체 확장     | 버튼보다 위아래 각 **2px** 큰 outline (= 1px gap + 1px 선 두께)  |
| radius               | outline 은 요소의 `border-radius` 자동 따라감 (별도 지정 불필요) |

> **Figma 근거**: 모든 size 의 focus-outline 노드(`10952:25755/57/59/61`)가 버튼보다 4px
> (위아래 합) 크다. 4px = outline 선 1px × 2(상하) + gap 1px × 2. CSS `outline-offset: 1px` 로 재현.
> Radio/Checkbox 의 focus(1px stroke + 1px offset)와 **동일한 패턴**으로 통일.

---

## 5. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환. 모든 variant 가 동일한
토큰을 참조하므로 토큰 재매핑만으로 전환된다.

### Primary (Dark)

| 상태     | 배경                          | 텍스트               |
| -------- | ----------------------------- | -------------------- |
| Enabled  | `var(--accent-400)` (accent-400, 더 밝음) | `#ffffff`            |
| Hovered  | `var(--accent-500)` (accent-500)          | `#ffffff`            |
| Pressed  | `var(--accent-600)` (accent-600)          | `#ffffff`            |
| Disabled | `var(--accent-800)` (accent-800)          | `var(--accent-500)` (accent-500) |

> 라이트에서는 primary 가 `var(--accent-600)` 부터 시작하지만, 다크에서는 더 밝은 `var(--accent-400)` 부터
> 시작해 hover/pressed 로 갈수록 어두워진다(역방향). disabled 텍스트는 라이트와 달리
> 배경 대비를 위해 `var(--accent-500)` accent를 쓴다.

### Secondary (Dark)

| 상태     | 배경                 | 텍스트               | 테두리              |
| -------- | -------------------- | -------------------- | ------------------- |
| Enabled  | `transparent`            | `var(--accent-300)` (accent-300) | `1px solid var(--accent-300)` |
| Hovered  | `var(--accent-800)` (accent-800) | `var(--accent-300)`            | `1px solid var(--accent-300)` |
| Pressed  | `var(--accent-900)` (accent-900) | `var(--accent-300)`            | `1px solid var(--accent-300)` |
| Disabled | `transparent`            | `#555555` (gray-700) | `1px solid var(--accent-300)` |

> 다크에서 secondary 의 hover/pressed fill 이 **선택한 accent 음영**으로 전환된다(라이트는 파스텔).
> 기본·비활성 배경은 투명하여 부모 surface를 유지한다. 외곽선/텍스트는 더 밝은 `var(--accent-300)`.

### Tertiary (Dark)

| 상태     | 배경                                   | 텍스트               | 테두리                         |
| -------- | -------------------------------------- | -------------------- | ------------------------------ |
| Enabled  | `rgba(255,255,255,0.08)` (`#ffffff14`) | `#dddddd` (gray-200) | `1px solid #555555` (gray-700) |
| Hovered  | `rgba(255,255,255,0.15)` (`#ffffff26`) | `#dddddd`            | `1px solid #555555`            |
| Pressed  | `rgba(255,255,255,0.20)` (`#ffffff33`) | `#dddddd`            | `1px solid #555555`            |
| Disabled | `rgba(255,255,255,0.08)`               | `#555555` (gray-700) | `1px solid #555555`            |

> 다크 tertiary 는 fill 이 **반투명 흰색**(gray 가 아님). 배경 위에 살짝 떠 있는 느낌.

### Negative (Dark)

| 상태     | 배경      | 텍스트    |
| -------- | --------- | --------- |
| Enabled  | `#d00a0a` | `#ffffff` |
| Hovered  | `#b50606` | `#ffffff` |
| Pressed  | `#920202` | `#ffffff` |
| Disabled | `#730303` | `#b50606` |

> Negative 다크 disabled 는 라이트보다 더 어두운 `#730303` 을 쓴다. disabled 텍스트도
> 배경 대비를 위해 `#b50606` 빨강.

### Focus (Dark)

라이트와 동일 — `var(--accent-500)` 1px outline. 다크에서도 focus 색은 전환하지 않는다.

---

## 7. 타이포그래피

폰트 패밀리: **Pretendard** (모든 텍스트). 굵기 600 (SemiBold) 고정.

| Size   | font-size | line-height | weight |
| ------ | --------- | ----------- | ------ |
| Tiny   | 12px      | 16px        | 600    |
| Small  | 14px      | 20px        | 600    |
| Medium | 14px      | 20px        | 600    |
| Large  | 16px      | 24px        | 600    |

---

## 10. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Primary */
  --btn-primary-fill: var(--accent-600);
  --btn-primary-fill-hover: var(--accent-700);
  --btn-primary-fill-pressed: var(--accent-800);
  --btn-primary-fill-disabled: var(--accent-200);
  --btn-on-primary: var(--solution-on-primary);
  --btn-on-primary-disabled: var(--solution-on-primary);

  /* Secondary */
  --btn-secondary-fill: #ffffff;
  --btn-secondary-fill-hover: var(--accent-50);
  --btn-secondary-fill-pressed: var(--accent-100);
  --btn-secondary-fill-disabled: #ffffff;
  --btn-secondary-border: var(--accent-500);
  --btn-on-secondary: var(--accent-500);
  --btn-on-secondary-disabled: var(--accent-200);

  /* Tertiary */
  --btn-tertiary-fill: #ffffff;
  --btn-tertiary-fill-hover: #f8f8f8;
  --btn-tertiary-fill-pressed: #f4f4f4;
  --btn-tertiary-fill-disabled: #ffffff;
  --btn-tertiary-border: #dddddd;
  --btn-on-tertiary: #1c1c1c;
  --btn-on-tertiary-disabled: #aaaaaa;

  /* Negative */
  --btn-negative-fill: #d00a0a;
  --btn-negative-fill-hover: #b50606;
  --btn-negative-fill-pressed: #920202;
  --btn-negative-fill-disabled: #fec3c3;
  --btn-on-negative: #ffffff;
  --btn-on-negative-disabled: #ffffff;

  /* Focus (공통) */
  --btn-focus-border: var(--accent-500);

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Primary */
  --btn-primary-fill: var(--accent-400);
  --btn-primary-fill-hover: var(--accent-500);
  --btn-primary-fill-pressed: var(--accent-600);
  --btn-primary-fill-disabled: var(--accent-800);
  --btn-on-primary: var(--solution-on-primary);
  --btn-on-primary-disabled: var(--accent-500);

  /* Secondary */
  --btn-secondary-fill: transparent;
  --btn-secondary-fill-hover: var(--accent-800);
  --btn-secondary-fill-pressed: var(--accent-900);
  --btn-secondary-fill-disabled: transparent;
  --btn-secondary-border: var(--accent-300);
  --btn-on-secondary: var(--accent-300);
  --btn-on-secondary-disabled: #555555;

  /* Tertiary */
  --btn-tertiary-fill: rgba(255, 255, 255, 0.08);
  --btn-tertiary-fill-hover: rgba(255, 255, 255, 0.15);
  --btn-tertiary-fill-pressed: rgba(255, 255, 255, 0.2);
  --btn-tertiary-fill-disabled: rgba(255, 255, 255, 0.08);
  --btn-tertiary-border: #555555;
  --btn-on-tertiary: #dddddd;
  --btn-on-tertiary-disabled: #555555;

  /* Negative */
  --btn-negative-fill: #d00a0a;
  --btn-negative-fill-hover: #b50606;
  --btn-negative-fill-pressed: #920202;
  --btn-negative-fill-disabled: #730303;
  --btn-on-negative: #ffffff;
  --btn-on-negative-disabled: #b50606;

  /* Focus (라이트와 동일) */
  --btn-focus-border: var(--accent-500);
}
```

---

