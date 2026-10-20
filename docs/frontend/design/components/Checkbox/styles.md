# Checkbox & Checkbox Group — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](./README.md)

## 4. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명(`--text` 등)은 토큰 체계를 따르며,
괄호 안의 hex 값이 실제 색이다.

### Checkbox box 상태

| 상태                         | 테두리 (border)     | 배경 (fill) | 마크 (체크/대시) |
| ---------------------------- | ------------------- | ----------- | ---------------- |
| Unchecked · enabled          | `1px solid #1c1c1c` | `#ffffff`   | —                |
| **Checked · enabled**        | `1px solid var(--accent-500)` | `var(--accent-500)`   | `#ffffff`        |
| **Indeterminate · enabled**  | `1px solid var(--accent-500)` | `var(--accent-500)`   | `#ffffff`        |
| Unchecked · disabled         | `1px solid #aaaaaa` | `#eeeeee`   | —                |
| **Checked · disabled**       | `1px solid #dddddd` | `#eeeeee`   | `#ffffff`        |
| **Indeterminate · disabled** | `1px solid #dddddd` | `#eeeeee`   | `#ffffff`        |
| Unchecked · invalid          | `1px solid #e81919` | `#ffffff`   | —                |
| **Checked · invalid**        | `1px solid #e81919` | `#e81919`   | `#ffffff`        |
| **Indeterminate · invalid**  | `1px solid #e81919` | `#e81919`   | `#ffffff`        |

**핵심 규칙:**

- Checked/Indeterminate enabled: 박스 전체가 `var(--accent-500)`로 **채워짐** + 흰 마크. (테두리에만 accent 적용이 아님)
- Checked/Indeterminate disabled: 회색(`#eeeeee`) 채워진 박스 + 회색 테두리(`#dddddd`) + **흰 마크 유지**.
- Checked/Indeterminate invalid: 빨강(`#e81919`) 채워진 박스 + 흰 마크.
- Unchecked 는 항상 `#ffffff` 배경(단 disabled는 `#eeeeee`). 테두리 색만 상태에 따라 변함.
- 마크 색상은 disabled 여부와 무관하게 항상 흰색(`#ffffff`). disabled checked가 저대비인 것은 의도.

> **마크 색상 구현 주의 (중요)**: 마크(CheckIcon / 대시) 색상을 `currentColor` 상속에만 의존하지 마라.
> Radix `Checkbox.Indicator`의 `asChild` 합성 컨텍스트에서 상위 color가 누락되거나 새 환경에서
> reset이 다르면 체크 표시가 아예 안 보일 수 있다. **반드시 마크 요소 자체에 명시적으로
> `color: var(--element-on-primary)` (또는 배경색)를 부여**해야 한다.

### 텍스트 색상

| 요소                    | Enabled / Read-only     | Disabled  | Hover (enabled만)        |
| ----------------------- | ----------------------- | --------- | ------------------------ |
| Item Label (Medium)     | `#1c1c1c`               | `#8f8f8f` | `#555555` (text-subtle)  |
| Item Label (Small)      | `#1c1c1c`               | `#8f8f8f` | `#555555`                |
| Item Help text (Medium) | `#555555`               | `#aaaaaa` | `#757575` (text-subtler) |
| Item Help text (Small)  | `#555555`               | `#aaaaaa` | `#757575`                |
| Group Label             | `#1c1c1c` (SemiBold)    | —         | —                        |
| Group Help text         | `#555555`               | —         | —                        |
| Error text (Invalid)    | `#e81919`               | —         | —                        |
| (선택사항) 텍스트       | `#757575`               | —         | —                        |
| 필수 `*` 표시           | `#e81919` (opacity 0.8) | —         | —                        |
| info 아이콘             | `#555555`               | —         | —                        |

> **Hover 색상 효과**는 Item Label / Item Help text 에만 적용. **disabled / read-only에서는
> hover 효과가 적용되지 않는다.**

### 포커스 (Focus-visible)

| 상태                   | 스펙                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Focus-visible (Small)  | **1px `var(--accent-500)` outline**, border 바깥 **1px gap**(offset) — `border-radius: 4px`. 시각적 16px |
| Focus-visible (Medium) | 동일, 시각적 20px                                                                              |

> Box + 1px gap + 1px outline. Small: 12px+1+1+1+1=16px(Figma `size-[16px]`). Medium: 16px+1+1+1+1=20px(Figma `size-[20px]`).
> **주의**: `box-shadow: 0 0 0 1px transparent, 0 0 0 2px primary` 방식은 배경색이 투명 gap을 비춰
> gap이 사라져 보이므로 사용 금지. 반드시 `outline` + `outline-offset`으로 구현한다.

---

## 5. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환.

### Checkbox box 상태 (Dark)

| 상태                         | 테두리 (border)               | 배경 (fill)                           | 마크      |
| ---------------------------- | ----------------------------- | ------------------------------------- | --------- |
| Unchecked · enabled          | `1px solid #555555`           | `rgba(0,0,0,0.2)` (`#00000033`)       | —         |
| **Checked · enabled**        | `1px solid var(--accent-400)`           | `var(--accent-400)`                             | `#ffffff` |
| **Indeterminate · enabled**  | `1px solid var(--accent-400)`           | `var(--accent-400)`                             | `#ffffff` |
| Unchecked · disabled         | `1px solid #333333`           | `rgba(255,255,255,0.1)` (`#ffffff1a`) | —         |
| **Checked · disabled**       | `1px solid #555555`           | `rgba(255,255,255,0.1)`               | `#ffffff` |
| **Indeterminate · disabled** | `1px solid #555555`           | `rgba(255,255,255,0.1)`               | `#ffffff` |
| Unchecked · invalid          | `1px solid #f52424` (red-500) | `rgba(0,0,0,0.2)`                     | —         |
| **Checked · invalid**        | `1px solid #f52424`           | `#f52424`                             | `#ffffff` |
| **Indeterminate · invalid**  | `1px solid #f52424`           | `#f52424`                             | `#ffffff` |

> 다크에서 primary 는 `var(--accent-400)` (accent-400)로 더 밝다. unchecked fill은 반투명 검정,
> disabled fill은 반투명 흰색이다.

### 텍스트 색상 (Dark)

| 요소                 | Enabled / Read-only     | Disabled  |
| -------------------- | ----------------------- | --------- |
| Item Label           | `#dddddd`               | `#757575` |
| Item Help text       | `#aaaaaa`               | `#555555` |
| Group Label          | `#dddddd` (SemiBold)    | —         |
| Group Help text      | `#aaaaaa`               | —         |
| Error text (Invalid) | `#f52424` (red-500)     | —         |
| (선택사항) 텍스트    | `#8f8f8f`               | —         |
| 필수 `*` 표시        | `#f52424` (opacity 0.8) | —         |
| info 아이콘          | `#aaaaaa`               | —         |

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard** (모든 텍스트)

| 역할                  | Small       | Medium      | 군기           |
| --------------------- | ----------- | ----------- | -------------- |
| Item Label            | 12px / 16px | 14px / 20px | 400 (Regular)  |
| Item Help text        | 10px / 12px | 12px / 16px | 400 (Regular)  |
| Group Label           | —           | 14px / 20px | 600 (SemiBold) |
| (선택사항)            | —           | 12px / 16px | 400 (Regular)  |
| Group Help/Error text | —           | 12px / 16px | 400 (Regular)  |

> Group Label/help는 사이즈와 무관하게 Medium 폰트 크기를 사용한다.

---

## 12. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.
(Radio와 동일한 토큰을 공유한다.)

### `:root` (라이트)

```css
:root {
  /* Text */
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-subtler: #757575;
  --text-disabled: #aaaaaa;
  --text-disabled-bold: #8f8f8f;
  --text-on-primary: var(--solution-on-primary);
  --text-danger: #e81919;

  /* Element */
  --element-default: #ffffff;
  --element-primary: var(--accent-500);
  --element-on-primary: var(--solution-on-primary);
  --element-disabled: #eeeeee;

  /* Border */
  --border-bolder: #1c1c1c;
  --border-danger: #e81919;
  --border-disabled-subtle: #aaaaaa;
  --border-disabled-fill: #dddddd;

  /* Icon */
  --icon-subtle: #555555;

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
  --text-subtler: #8f8f8f;
  --text-disabled: #555555;
  --text-disabled-bold: #757575;
  --text-on-primary: var(--solution-on-primary);
  --text-danger: #f52424;

  /* Element */
  --element-default: rgba(0, 0, 0, 0.2);
  --element-primary: var(--accent-400);
  --element-on-primary: var(--solution-on-primary);
  --element-disabled: rgba(255, 255, 255, 0.1);

  /* Border */
  --border-bolder: #555555;
  --border-danger: #f52424;
  --border-disabled-subtle: #333333;
  --border-disabled-fill: #555555;

  /* Icon */
  --icon-subtle: #aaaaaa;
}
```

---

