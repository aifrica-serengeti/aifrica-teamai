# Link — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Link 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

아래는 상태별 baseline 매핑이다. primary는 솔루션 accent scale로 연결하고 중립·status 값도 채택 여부를 기록한다.

### 텍스트/아이콘 색상 (상태별)

| 상태         | 색상                                  | 밑줄  |
| ------------ | ------------------------------------- | ----- |
| **Enabled**  | `var(--accent-500)` (accent-500)                  | O     |
| **Hovered**  | `var(--accent-600)` (accent-600)                  | O     |
| **Pressed**  | `var(--accent-700)` (accent-700)                  | O     |
| **Disabled** | `#8f8f8f` (gray-500)                  | **X** |
| **Focused**  | `var(--accent-500)` (accent-500, enabled 와 동일) | O     |

> 텍스트와 trailing 아이콘은 **동일 색상**을 공유한다. 아이콘은 `color: inherit` 로
> Link 텍스트 색을 따라가므로 상태 전환에 자동 대응한다.

### Focus (Focus-visible)

| 항목                 | 스펙                                                            |
| -------------------- | --------------------------------------------------------------- |
| outline 두께         | **1px**                                                         |
| outline 색상         | `var(--accent-500)` (`--link-default`)                                    |
| outline gap (offset) | **1px** — border-box 에서 outline 시작점까지 빈 공간            |
| 시각적 전체 확장     | 링크보다 위아래 각 **2px** 큰 outline (= 1px gap + 1px 선 두께) |
| radius               | outline 은 요소의 형태를 자동 따라감                            |

> Button/Radio/Checkbox 의 focus(1px stroke + 1px offset)와 **동일한 패턴**으로 통일.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 컨테이너에 `.dark` 클래스 적용 시 전환. Link 가 참조하는 `--link-*` 토큰이
재매핑되어 자동 전환된다.

### 텍스트/아이콘 색상 (상태별)

| 상태         | 색상                                  | 밑줄  |
| ------------ | ------------------------------------- | ----- |
| **Enabled**  | `var(--accent-400)` (accent-400, 더 밝음)         | O     |
| **Hovered**  | `var(--accent-500)` (accent-500)                  | O     |
| **Pressed**  | `var(--accent-600)` (accent-600)                  | O     |
| **Disabled** | `#555555` (gray-700)                  | **X** |
| **Focused**  | `var(--accent-400)` (accent-400, enabled 와 동일) | O     |

> 라이트에서는 enabled 가 `var(--accent-500)` 부터 시작하지만, 다크에서는 더 밝은 `var(--accent-400)` 부터
> 시작해 hover/pressed 로 갈수록 어두워진다(역방향). disabled 는 라이트(gray-500)보다
> 더 어두운 gray-700 으로 전환된다.

### Focus (Dark)

다크에서도 focus outline 색상은 `--link-default`(`var(--accent-400)`)를 따른다. 라이트의 `var(--accent-500)`와 다름.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard** (모든 텍스트). 굵기 400 (Regular) 고정.

| Size   | font-size | line-height | weight |
| ------ | --------- | ----------- | ------ |
| Small  | 12px      | 16px        | 400    |
| Medium | 14px      | 20px        | 400    |
| Large  | 16px      | 24px        | 400    |

> Link 는 Regular(400) 이다 — Button(SemiBold 600)과 다르다. 이는 Link 가 본문 텍스트와
> 함께 쓰이므로 주변 텍스트의 굵기를 따라가기 위함이다.

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Link — Figma color/link/{default,hovered,pressed,disabeld} collection */
  --link-default: var(--accent-500); /* accent-500 */
  --link-hovered: var(--accent-600); /* accent-600 */
  --link-pressed: var(--accent-700); /* accent-700 */
  --link-disabled: #8f8f8f; /* gray-500 */

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Link 다크 매핑 — Figma Link dark node 10704:30979 기준 */
  --link-default: var(--accent-400); /* accent-400 — 더 밝음 */
  --link-hovered: var(--accent-500); /* accent-500 */
  --link-pressed: var(--accent-600); /* accent-600 */
  --link-disabled: #555555; /* gray-700 — 라이트(gray-500)보다 어두움 */
}
```

> 참고: 기존 `--text-link` 토큰이 `--link-default` 와 동일 값이지만, 상태별 전환을
> 명시적으로 관리하기 위해 별도 `--link-*` 토큰 세트로 정의한다.

---

