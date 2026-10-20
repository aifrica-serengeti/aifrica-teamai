# Icon Button — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

icon 색상은 공용 `--icon` / `--icon-disabled` 토큰을 그대로 사용한다.
버튼 자체의 배경/테두리는 반투명 검정(overlay) 기반이다.

### Outlined (테두리 있음)

| 상태        | 배경 (fill)                    | 테두리                      | icon 색상                     |
| ----------- | ------------------------------ | --------------------------- | ----------------------------- |
| Enabled     | transparent                    | `1px solid rgba(0,0,0,0.1)` | `#1c1c1c` (`--icon`)          |
| Hovered     | `rgba(0,0,0,0.05)`             | `1px solid rgba(0,0,0,0.1)` | `#1c1c1c`                     |
| Pressed     | `rgba(0,0,0,0.1)`              | `1px solid rgba(0,0,0,0.1)` | `#1c1c1c`                     |
| Disabled    | transparent                    | `1px solid rgba(0,0,0,0.1)` | `#aaaaaa` (`--icon-disabled`) |
| **Focused** | (enabled/hovered/pressed 유지) | (enabled 유지)              | —                             |

### Ghost (테두리 없음)

| 상태        | 배경 (fill)                    | 테두리      | icon 색상                     |
| ----------- | ------------------------------ | ----------- | ----------------------------- |
| Enabled     | transparent                    | transparent | `#1c1c1c` (`--icon`)          |
| Hovered     | `rgba(0,0,0,0.05)`             | transparent | `#1c1c1c`                     |
| Pressed     | `rgba(0,0,0,0.1)`              | transparent | `#1c1c1c`                     |
| Disabled    | transparent                    | transparent | `#aaaaaa` (`--icon-disabled`) |
| **Focused** | (enabled/hovered/pressed 유지) | —           | —                             |

> Outlined 와 Ghost 의 차이는 **테두리 유무만**이다. hover/pressed 배경(반투명 overlay)과
> icon 색상 로직은 완전히 동일하다.

### 포커스 (Focus-visible) — 양 variant 공통

| 항목                 | 스펙                                                            |
| -------------------- | --------------------------------------------------------------- |
| outline 두께         | **1px**                                                         |
| outline 색상         | `var(--accent-500)` (다크에서도 동일)                                     |
| outline gap (offset) | **1px** — border-box 에서 outline 시작점까지 빈 공간            |
| 시각적 전체 확장     | 버튼보다 위아래 각 **2px** 큰 outline (= 1px gap + 1px 선 두께) |
| radius               | outline 은 요소의 `border-radius` 자동 따라감                   |

> Button / Radio / Checkbox 의 focus(1px stroke + 1px offset)와 **동일한 패턴**으로 통일.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환된다.
반투명 overlay 를 **검정 → 흰색** 기반으로 반전하고, icon 색상은 semantic 토큰이 자동 전환된다.

### Outlined (Dark)

| 상태     | 배경 (fill)              | 테두리                            | icon 색상                     |
| -------- | ------------------------ | --------------------------------- | ----------------------------- |
| Enabled  | transparent              | `1px solid rgba(255,255,255,0.1)` | `#dddddd` (`--icon`)          |
| Hovered  | `rgba(255,255,255,0.05)` | `1px solid rgba(255,255,255,0.1)` | `#dddddd`                     |
| Pressed  | `rgba(255,255,255,0.1)`  | `1px solid rgba(255,255,255,0.1)` | `#dddddd`                     |
| Disabled | transparent              | `1px solid rgba(255,255,255,0.1)` | `#555555` (`--icon-disabled`) |

### Ghost (Dark)

| 상태     | 배경 (fill)              | icon 색상 |
| -------- | ------------------------ | --------- |
| Enabled  | transparent              | `#dddddd` |
| Hovered  | `rgba(255,255,255,0.05)` | `#dddddd` |
| Pressed  | `rgba(255,255,255,0.1)`  | `#dddddd` |
| Disabled | transparent              | `#555555` |

> 다크에서 overlay 가 흰색 기반이므로 어두운 배경 위에 밝게 떠 있는 느낌이 된다.
> icon 색상은 `--icon`(`#dddddd`)/`--icon-disabled`(`#555555`) 토큰이 자동 전환되므로
> 컴포넌트 코드 수정 없이 전환된다.

---

## 8. 타이포그래피

Icon Button 은 텍스트를 가지지 않는다. 아이콘만 렌더하므로 폰트 스펙은 해당 없음.
아이콘의 stroke 굵기는 공용 Icon 컴포넌트의 사이즈별 매핑을 따른다(t~xl: 1.25px, 2xl: 1.5px, 3xl: 2px).

---

## 12. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.
icon 색상(`--icon`, `--icon-disabled`)은 공용 semantic 토큰이므로 별도 정의가 필요하다
(Icon 가이드라인 / [foundation 문서](../../foundations.md) Color 섹션 참조).

### `:root` (라이트)

```css
:root {
  /* Icon Button — 반투명 검정 overlay */
  --icon-btn-outlined-border: rgba(0, 0, 0, 0.1); /* #0000001a */
  --icon-btn-hover-bg: rgba(0, 0, 0, 0.05); /* #0000000d */
  --icon-btn-pressed-bg: rgba(0, 0, 0, 0.1); /* #0000001a */
  --icon-btn-focus-border: var(--accent-500); /* accent-500 */

  /* icon 색상 (공용 semantic) */
  --icon: #1c1c1c; /* gray-900 */
  --icon-disabled: #aaaaaa; /* gray-400 */

  /* Font (Icon Button 자체는 사용 안 함, icon stroke 용 참고) */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Icon Button — 반투명 흰색 overlay (어두운 배경 위 밝게) */
  --icon-btn-outlined-border: rgba(255, 255, 255, 0.1);
  --icon-btn-hover-bg: rgba(255, 255, 255, 0.05);
  --icon-btn-pressed-bg: rgba(255, 255, 255, 0.1);
  --icon-btn-focus-border: var(--accent-500);

  /* icon 색상 (공용 semantic) */
  --icon: #dddddd; /* gray-200 */
  --icon-disabled: #555555; /* gray-700 */
}
```

---

