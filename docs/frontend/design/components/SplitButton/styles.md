# Split Button — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

Tertiary Button 토큰을 그대로 사용한다. 모든 색상값을 그대로 쓴다. 괄호 안의 hex 가 실제 색.

> Primary action 과 Secondary action 은 **동일한 색상 규칙**을 공유한다. 아래 표는 양쪽 모두에 적용.

### action 공통 — 상태별

| 상태               | 배경 (fill)                    | 텍스트/아이콘        | 테두리                                 |
| ------------------ | ------------------------------ | -------------------- | -------------------------------------- |
| Enabled            | `#ffffff`                      | `#1c1c1c` (gray-900) | `1px solid #dddddd` (gray-300)         |
| Hovered            | `#f8f8f8` (gray-50)            | `#1c1c1c`            | `1px solid #dddddd`                    |
| Pressed            | `#f4f4f4` (gray-100)           | `#1c1c1c`            | `1px solid #dddddd`                    |
| Active (메뉴 열림) | `#f4f4f4` (gray-100)           | `#1c1c1c`            | `1px solid #dddddd`                    |
| Disabled           | `#ffffff`                      | `#aaaaaa` (gray-400) | `1px solid #dddddd`                    |
| **Focused**        | (enabled/hovered/pressed 유지) | —                    | `var(--accent-500)` focus outline (1px, gap 1px) |

> **Active(메뉴 열림) 상태** 는 Secondary action 에만 적용. Radix DropdownMenu 가 trigger
> button 에 `data-state="open"` 을 설정하면 pressed 색상(`#f4f4f4`)을 유지한다.

> **Disabled** 시 아이콘 색상도 `#aaaaaa` 로 전환(`color: inherit` 으로 자동).

### 분할선(Divider)

| 항목 | 값                                                                   |
| ---- | -------------------------------------------------------------------- |
| 두께 | 1px                                                                  |
| 색상 | `#dddddd` (gray-300, `--btn-tertiary-border`) — action 테두리와 동일 |

### 포커스 (Focus-visible) — 양쪽 action 공통

| 항목                 | 스펙                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------ |
| outline 두께         | **1px**                                                                                    |
| outline 색상         | `var(--accent-500)` (`--btn-focus-border`, 다크에서도 동일)                                          |
| outline gap (offset) | **1px** — border-box 에서 outline 시작점까지 빈 공간                                       |
| 시각적 전체 확장     | action 보다 위아래 각 **2px** 큰 outline                                                   |
| z-index              | focus 시 `position: relative; z-index: 1` — 형제 action 위로 올려 outline 이 가려지지 않게 |

> **핵심 구현 주의점**: Primary action 에 focus 하면 우측 outline 이, Secondary action 에
> focus 하면 좌측 outline 이 형제 요소(분할선/반대쪽 action)에 가려 잘릴 수 있다. 이를 막기
> 위해 `:focus-visible` 시 `position: relative; z-index: 1` 로 해당 action 을 위로 올린다.
> 그리고 양쪽 action 이 온전한 border-box(border 4면)를 가져야 outline 이 빈 공간에 그려진다.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `.dark` 클래스 적용 시 semantic 토큰이 자동으로 다크 값으로 매핑된다.

### action 공통 — 상태별 (Dark)

| 상태               | 배경 (fill)                            | 텍스트/아이콘        | 테두리                         |
| ------------------ | -------------------------------------- | -------------------- | ------------------------------ |
| Enabled            | `rgba(255,255,255,0.08)` (`#ffffff14`) | `#dddddd` (gray-200) | `1px solid #555555` (gray-700) |
| Hovered            | `rgba(255,255,255,0.15)` (`#ffffff26`) | `#dddddd`            | `1px solid #555555`            |
| Pressed            | `rgba(255,255,255,0.20)` (`#ffffff33`) | `#dddddd`            | `1px solid #555555`            |
| Active (메뉴 열림) | `rgba(255,255,255,0.20)` (`#ffffff33`) | `#dddddd`            | `1px solid #555555`            |
| Disabled           | `rgba(255,255,255,0.08)`               | `#555555` (gray-700) | `1px solid #555555`            |

> 다크 tertiary 는 fill 이 **반투명 흰색**(gray 가 아님). 배경 위에 살짝 떠 있는 느낌.

### 분할선(Divider) — Dark

| 항목 | 값                                            |
| ---- | --------------------------------------------- |
| 색상 | `#555555` (gray-700, `--btn-tertiary-border`) |

### Focus (Dark)

라이트와 동일 — `var(--accent-500)` 1px outline. 다크에서도 focus 색은 전환하지 않는다.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**

| Size       | 토큰           | 크기 | 행간 | 굵기          |
| ---------- | -------------- | ---- | ---- | ------------- |
| **Tiny**   | `--text-body3` | 12px | 16px | 400 (Regular) |
| **Small**  | `--text-body2` | 14px | 20px | 400 (Regular) |
| **Medium** | `--text-body2` | 14px | 20px | 400 (Regular) |
| **Large**  | `--text-body1` | 16px | 24px | 400 (Regular) |

> letter-spacing: 0. **Regular(400)** — Button(600 SemiBold)과 다름. Split Button 은
> 보조 액션 성격이라 덜 강조된다.

---

## 11. 디자인 토큰 정의 (CSS 변수)

Split Button 은 Tertiary Button 토큰을 재사용한다. 별도 Split Button 전용 토큰은 없다.
새 프로젝트에서 아래 변수를 `:root` 와 `.dark` 에 정의한다.

### `:root` (라이트)

```css
:root {
  /* Tertiary Button 토큰 — Split Button 이 재사용 */
  --btn-tertiary-fill: #ffffff;
  --btn-tertiary-fill-hover: #f8f8f8; /* gray-50 */
  --btn-tertiary-fill-pressed: #f4f4f4; /* gray-100 */
  --btn-tertiary-fill-disabled: #ffffff;
  --btn-tertiary-border: #dddddd; /* gray-300 */
  --btn-on-tertiary: #1c1c1c; /* gray-900 */
  --btn-on-tertiary-disabled: #aaaaaa; /* gray-400 */

  /* Focus (모든 버튼 공통) */
  --btn-focus-border: var(--accent-500); /* 다크에서도 동일 */

  /* Typography */
  --text-body1: 400 16px/24px var(--font-sans);
  --text-body2: 400 14px/20px var(--font-sans);
  --text-body3: 400 12px/16px var(--font-sans);

  /* Font */
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Tertiary Button 토큰 — 다크 */
  --btn-tertiary-fill: rgba(255, 255, 255, 0.08); /* #ffffff14 */
  --btn-tertiary-fill-hover: rgba(255, 255, 255, 0.15); /* #ffffff26 */
  --btn-tertiary-fill-pressed: rgba(255, 255, 255, 0.2); /* #ffffff33 */
  --btn-tertiary-fill-disabled: rgba(255, 255, 255, 0.08);
  --btn-tertiary-border: #555555; /* gray-700 */
  --btn-on-tertiary: #dddddd; /* gray-200 */
  --btn-on-tertiary-disabled: #555555; /* gray-700 */

  /* Focus — 라이트와 동일 */
  --btn-focus-border: var(--accent-500);

  /* Typography — 라이트/다크 공통 */
}
```

> Menu 관련 토큰(`--menu-surface`, `--menu-shadow` 등)은 `Menu/README.md` 의 토큰 정의를 따른다.
> `menuScrollable=false`는 Menu의 콘텐츠 높이 모드만 선택하며 Split Button의 색상·크기·토큰을 변경하지 않는다.

---
