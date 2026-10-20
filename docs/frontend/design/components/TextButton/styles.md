# Text Button — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Text Button 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

테두리가 없는 단일 스타일. 배경은 Enabled 가 투명, Hovered/Pressed 만 회색 오버레이.

| 상태        | 배경 (fill)                    | 텍스트               | 테두리                                 |
| ----------- | ------------------------------ | -------------------- | -------------------------------------- |
| Enabled     | `transparent`                  | `#1c1c1c` (gray-900) | 없음                                   |
| Hovered     | `#f8f8f8` (gray-50)            | `#1c1c1c`            | 없음                                   |
| Pressed     | `#f4f4f4` (gray-100)           | `#1c1c1c`            | 없음                                   |
| Disabled    | `transparent`                  | `#aaaaaa` (gray-400) | 없음                                   |
| **Focused** | (enabled/hovered/pressed 유지) | `#1c1c1c`            | `var(--accent-500)` focus outline (1px, gap 1px) |

> 색상값은 Tertiary Button 의 label/hover/pressed/disabled 와 동일하다. 차이점은 **테두리가 없고
> Enabled 배경이 흰색(#ffffff)이 아닌 투명**이라는 점.

### 포커스 (Focus-visible)

| 항목                 | 스펙                                                             |
| -------------------- | ---------------------------------------------------------------- |
| outline 두께         | **1px** (절대 2px 아님)                                          |
| outline 색상         | `var(--accent-500)` (다크에서는 `var(--accent-400)`)                                 |
| outline gap (offset) | **1px** — border-box 에서 outline 시작점까지 빈 공간             |
| 시각적 전체 확장     | 버튼보다 위아래 각 **2px** 큰 outline (= 1px gap + 1px 선 두께)  |
| radius               | outline 은 요소의 `border-radius` 자동 따라감 (별도 지정 불필요) |

> Button/Radio/Checkbox 의 focus(1px stroke + 1px offset)와 **동일한 패턴**으로 통일.
> Figma focus-line 노드(`10224:76307/312/314/316`)가 버튼보다 위아래 합 4px 크다.
> 4px = outline 선 1px × 2(상하) + gap 1px × 2. CSS `outline-offset: 1px` 로 재현.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컴포넌터에 `.dark` 클래스 적용 시 전환. 토큰 재매핑만으로 전환된다.

| 상태        | 배경                                   | 텍스트               | 테두리                                            |
| ----------- | -------------------------------------- | -------------------- | ------------------------------------------------- |
| Enabled     | `transparent`                          | `#dddddd` (gray-200) | 없음                                              |
| Hovered     | `rgba(255,255,255,0.15)` (`#ffffff26`) | `#dddddd`            | 없음                                              |
| Pressed     | `rgba(255,255,255,0.20)` (`#ffffff33`) | `#dddddd`            | 없음                                              |
| Disabled    | `transparent`                          | `#555555` (gray-700) | 없음                                              |
| **Focused** | (enabled/hovered/pressed 유지)         | `#dddddd`            | `var(--accent-400)` (accent-400) focus outline (1px, gap 1px) |

> 다크에서 hover/pressed 배경이 **반투명 흰색 오버레이**로 반전된다(라이트는 회색 음영).
> Tertiary Button 다크의 hover/pressed 패턴과 동일.
> focus 색상만 라이트 `var(--accent-500)` → 다크 `var(--accent-400)`(더 밝은 accent)로 전환.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard** (모든 텍스트). 굵기 600 (SemiBold) 고정.

| Size   | font-size | line-height | weight |
| ------ | --------- | ----------- | ------ |
| Tiny   | 12px      | 16px        | 600    |
| Small  | 14px      | 20px        | 600    |
| Medium | 14px      | 20px        | 600    |
| Large  | 16px      | 24px        | 600    |

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  --text-btn-fill: transparent;
  --text-btn-fill-hover: #f8f8f8; /* gray-50 */
  --text-btn-fill-pressed: #f4f4f4; /* gray-100 */
  --text-btn-label: #1c1c1c; /* gray-900 */
  --text-btn-label-disabled: #aaaaaa; /* gray-400 */
  --text-btn-focus-border: var(--accent-500); /* accent-500 */

  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  --text-btn-fill: transparent;
  --text-btn-fill-hover: rgba(255, 255, 255, 0.15); /* #ffffff26 */
  --text-btn-fill-pressed: rgba(255, 255, 255, 0.2); /* #ffffff33 */
  --text-btn-label: #dddddd; /* gray-200 */
  --text-btn-label-disabled: #555555; /* gray-700 */
  --text-btn-focus-border: var(--accent-400); /* accent-400 (다크에서 더 밝은 accent) */
}
```

---

