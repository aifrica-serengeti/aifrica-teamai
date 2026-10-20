# Textarea — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Textarea 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명은 form semantic 토큰 체계를 따르며,
괄호 안의 hex 값이 실제 색이다. Figma 변수 교차 검증(node `4138:5564`, `4138:5625`,
`get_variable_defs`):

### Default style — Container 상태

| 상태                     | Border                                    | Surface   | Placeholder | Input text                  |
| ------------------------ | ----------------------------------------- | --------- | ----------- | --------------------------- |
| **Enabled**              | `1px solid #dddddd`                       | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Focused**              | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Typing**               | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#ffffff` | —           | `#1c1c1c` (커서 표시)       |
| **Filled**               | `1px solid #dddddd`                       | `#ffffff` | —           | `#1c1c1c`                   |
| **Invalid** (focus 아님) | `1px solid #e81919` + `inset 1px #e81919` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Invalid · focused**    | `1px solid #e81919` + `inset 1px #e81919` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Disabled**             | `1px solid #dddddd`                       | `#f8f8f8` | `#aaaaaa`   | `#aaaaaa`                   |
| **Read-only**            | `1px solid #dddddd`                       | `#f8f8f8` | —           | `#1c1c1c` (enabled 색 유지) |

### Create style — Container 상태

| 상태        | Border                                    | Surface          | Placeholder |
| ----------- | ----------------------------------------- | ---------------- | ----------- |
| **Enabled** | `1px transparent` (없음)                  | `#f8f8f8`        | `#8f8f8f`   |
| **Focused** | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#f8f8f8` (유지) | `#8f8f8f`   |

> **Create style 핵심**: Create variant 는 focus 되어도 **배경색이 #f8f8f8 으로 유지**된다.
> Default variant 처럼 #ffffff 로 전환하지 않는다. focus 시 border 2px(1px+inset) var(--accent-500) 만
> 추가된다. Figma 변수 `color/form/create/surface/active` = #f8f8f8.

### Label / Help / Counter / Error text

| 요소           | 폰트                          | 색상                                        |
| -------------- | ----------------------------- | ------------------------------------------- |
| Label          | Pretendard SemiBold 14px/20px | `#1c1c1c` (`--text`)                        |
| (선택사항)     | Pretendard Regular 12px/16px  | `#757575` (`--text-subtler`)                |
| \* 필수 표시   | Pretendard Regular 14px/20px  | `#e81919` (`--text-danger`), opacity 0.8    |
| Counter        | Pretendard Regular 12px/20px  | `#757575` (`--text-subtler`)                |
| Help text      | Pretendard Regular 12px/16px  | `#555555` (`--text-subtle`)                 |
| **Error text** | Pretendard Regular 12px/16px  | `#e81919` (`--text-danger`), `role="alert"` |

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시. form semantic 토큰이 재매핑되어 자동 전환.
Figma 다크 매트릭스(node `11472:150821`, `get_variable_defs`).

### Default style — Container 상태 (Dark)

| 상태          | Border                                    | Surface   | Placeholder | Input text |
| ------------- | ----------------------------------------- | --------- | ----------- | ---------- |
| **Enabled**   | `1px solid #555555`                       | `#1c1c1c` | `#8f8f8f`   | `#dddddd`  |
| **Focused**   | `1px solid var(--accent-400)` + `inset 1px var(--accent-400)` | `#1c1c1c` | `#8f8f8f`   | `#dddddd`  |
| **Invalid**   | `1px solid #f52424` + `inset 1px #f52424` | `#1c1c1c` | `#8f8f8f`   | `#dddddd`  |
| **Disabled**  | `1px solid #555555`                       | `#333333` | `#757575`   | `#757575`  |
| **Read-only** | `1px solid #555555`                       | `#333333` | —           | `#dddddd`  |

### Label / text (Dark)

| 요소       | 색상                         |
| ---------- | ---------------------------- |
| Label      | `#dddddd` (`--text`)         |
| (선택사항) | `#8f8f8f` (`--text-subtler`) |
| \* 필수    | `#f52424` (`--text-danger`)  |
| Counter    | `#8f8f8f` (`--text-subtler`) |
| Help text  | `#aaaaaa` (`--text-subtle`)  |
| Error text | `#f52424` (`--text-danger`)  |

---

## 8. 타이포그래피

모든 텍스트는 Pretendard(`--font-sans`).

| 요소                     | 스타일 토큰 | 크기 | 행간 | 군기          |
| ------------------------ | ----------- | ---- | ---- | ------------- |
| Label                    | Title2      | 14px | 20px | SemiBold(600) |
| (선택사항)               | Body3       | 12px | 16px | Regular(400)  |
| \* 필수                  | Body2       | 14px | 20px | Regular(400)  |
| Input text / Placeholder | Body2       | 14px | 20px | Regular(400)  |
| Counter                  | Body3       | 12px | 20px | Regular(400)  |
| Help / Error text        | Body3       | 12px | 16px | Regular(400)  |

---

## 11. 디자인 토큰 정의 (CSS 변수)

Textarea 전용 토큰은 없다. Input 과 동일한 form semantic 토큰을 공유한다.
공통 토큰(text/surface/border/element/icon)은 루트 [foundation 문서](../../foundations.md) 참조.

### `:root` (라이트)

```css
:root {
  /* Form — Input/Textarea 공유 폼 컨트롤 토큰 */
  --form-text: #1c1c1c; /* 입력값 텍스트 */
  --form-surface-active: #ffffff; /* enabled/focused 표면 (default variant) */
  --form-surface-inactive: #f8f8f8; /* disabled/read-only/Create 표면 */
  --form-border-default: #dddddd; /* enabled/disabled 테두리 */
  --form-border-active: var(--accent-500); /* focus 테두리 (accent-500) */
  --form-border-invalid: #e81919; /* invalid 테두리 (red-600) */
  --form-placeholder-active: #8f8f8f; /* enabled placeholder (gray-500) */
  --form-placeholder-inactive: #aaaaaa; /* disabled placeholder (gray-400) */
}
```

### `.dark` (다크)

```css
.dark {
  --form-text: #dddddd; /* 입력값 텍스트 (gray-200) */
  --form-surface-active: #1c1c1c; /* 다크 표면 (gray-900) */
  --form-surface-inactive: #333333; /* (gray-800) */
  --form-border-default: #555555; /* (gray-700) */
  --form-border-active: var(--accent-400); /* 다크에서 더 밝은 primary (accent-400) */
  --form-border-invalid: #f52424; /* (red-500) */
  --form-placeholder-active: #8f8f8f; /* (gray-500) */
  --form-placeholder-inactive: #757575; /* (gray-600) */
}
```

### 스크롤바 토큰 (Textarea 내장 스크롤바)

```css
:root {
  --scrollbar-thumb: var(--color-gray-300); /* #dddddd — Figma 원본 */
  --scrollbar-thumb-fill: color-mix(
    in srgb,
    var(--color-gray-700) 30%,
    transparent
  ); /* 반투명 */
  --scrollbar-thumb-hover: color-mix(
    in srgb,
    var(--color-gray-700) 55%,
    transparent
  );
}
```

---

