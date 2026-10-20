# Search — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Search 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** Container 외형(border/surface/placeholder/text)은 Input
스펙과 동일(form semantic 토큰). Search 가 추가하는 색상은 icon 2종과 close button.

### Container 상태 (Input 과 동일 — Default style)

| 상태         | Border                                    | Surface   | Placeholder | Search text |
| ------------ | ----------------------------------------- | --------- | ----------- | ----------- |
| **Enabled**  | `1px solid #dddddd`                       | `#ffffff` | `#8f8f8f`   | `#1c1c1c`   |
| **Focused**  | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`   |
| **Disabled** | `1px solid #dddddd`                       | `#f8f8f8` | `#aaaaaa`   | `#aaaaaa`   |

> Create style(border 없음, surface `#f8f8f8`)도 Input 스펙과 동일하게 지원.

### Search icon / Close button / Label / Help text

| 요소                    | 색상                         | 비고                         |
| ----------------------- | ---------------------------- | ---------------------------- |
| **Leading search icon** | `#1c1c1c` (`--icon`)         | 돋보기. Container 와 동일 톤 |
| **Close button 배경**   | `#555555` (`--icon-subtle`)  | 회색 원형. gray-700          |
| **Close button X**      | `#ffffff` (`--icon-inverse`) | 흰색 X. 배경과 대비          |
| Label                   | `#1c1c1c` (`--text`)         | 14px SemiBold. Input 과 동일 |
| Help text               | `#555555` (`--text-subtle`)  | 12px                         |

### Close button 상호작용

| 상태          | 변화                                                          |
| ------------- | ------------------------------------------------------------- |
| 기본          | 배경 `#555555`, X `#ffffff`                                   |
| Hover         | `opacity: 0.8`                                                |
| Active        | `opacity: 0.6`                                                |
| Focus-visible | `outline: 2px solid var(--accent-500)` (`--border-primary`), offset 2px |

> Close button 은 값이 있고 disabled 가 아닐 때만 표시. disabled input 에서는 나타나지 않는다.

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시. form semantic 토큰이 재매핑되어 자동 전환. Container 상태는
Input 다크 스펙(`Input/README.md` §6)과 동일.

### Container 상태 (Default style, Dark)

| 상태         | Border                                    | Surface   | Placeholder | Search text |
| ------------ | ----------------------------------------- | --------- | ----------- | ----------- |
| **Enabled**  | `1px solid #555555`                       | `#1c1c1c` | `#8f8f8f`   | `#dddddd`   |
| **Focused**  | `1px solid var(--accent-400)` + `inset 1px var(--accent-400)` | `#1c1c1c` | `#8f8f8f`   | `#dddddd`   |
| **Disabled** | `1px solid #555555`                       | `#333333` | `#757575`   | `#757575`   |

### Search icon / Close button (Dark)

| 요소                    | 색상                         | 비고                                               |
| ----------------------- | ---------------------------- | -------------------------------------------------- |
| **Leading search icon** | `#dddddd` (`--icon`)         | 다크에서 밝은 텍스트 톤                            |
| **Close button 배경**   | `#aaaaaa` (`--icon-subtle`)  | gray-400. 라이트 #555555 → 다크 #aaaaaa            |
| **Close button X**      | `#1c1c1c` (`--icon-inverse`) | 다크에서는 어두운 X. 라이트 #ffffff → 다크 #1c1c1c |
| Label                   | `#dddddd` (`--text`)         |                                                    |
| Help text               | `#aaaaaa` (`--text-subtle`)  |                                                    |

---

## 8. 타이포그래피

모든 텍스트는 Pretendard(`--font-sans`). Container 텍스트는 Input 스펙과 동일.

| 요소                      | 스타일 토큰 | 크기 | 행간 | 굵기          |
| ------------------------- | ----------- | ---- | ---- | ------------- |
| Label                     | Title2      | 14px | 20px | SemiBold(600) |
| Search text / Placeholder | Body2       | 14px | 20px | Regular(400)  |
| Help text                 | Body3       | 12px | 16px | Regular(400)  |

---

## 11. 디자인 토큰 정의 (CSS 변수)

Search 는 Input 의 form semantic 토큰을 그대로 사용한다. 공통 토큰(text/surface/border/
element/icon)과 form 토큰 정의는 `Input/README.md` §11 및 루트 [foundation 문서](../../foundations.md) 참조. 여기서는 Search 가
참조하는 토큰 요약.

### `:root` (라이트) — Search 관련 토큰

```css
:root {
  /* Form 토큰 — Input/README.md §11 참조 */
  --form-text: #1c1c1c;
  --form-surface-active: #ffffff;
  --form-surface-inactive: #f8f8f8;
  --form-border-default: #dddddd;
  --form-border-active: var(--accent-500);
  --form-placeholder-active: #8f8f8f;
  --form-placeholder-inactive: #aaaaaa;

  /* Icon 토큰 — Search icon / close button */
  --icon: #1c1c1c; /* leading search icon */
  --icon-subtle: #555555; /* close button 배경 (gray-700) */
  --icon-inverse: #ffffff; /* close button X */

  /* Text 토큰 — label / help text */
  --text: #1c1c1c;
  --text-subtle: #555555;

  /* Border 토큰 — close button focus outline */
  --border-primary: var(--accent-500);
}
```

### `.dark` (다크) — Search 관련 토큰

```css
.dark {
  /* Form 토큰 */
  --form-text: #dddddd;
  --form-surface-active: #1c1c1c;
  --form-surface-inactive: #333333;
  --form-border-default: #555555;
  --form-border-active: var(--accent-400);
  --form-placeholder-active: #8f8f8f;
  --form-placeholder-inactive: #757575;

  /* Icon 토큰 */
  --icon: #dddddd; /* leading search icon */
  --icon-subtle: #aaaaaa; /* close button 배경 (gray-400) */
  --icon-inverse: #1c1c1c; /* close button X */

  /* Text 토큰 */
  --text: #dddddd;
  --text-subtle: #aaaaaa;

  /* Border 토큰 */
  --border-primary: var(--accent-400);
}
```

---

