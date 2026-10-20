# Input — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명은 form semantic 토큰 체계를 따르며,
괄호 안의 hex 값이 실제 색이다.

### Default style — Container 상태

| 상태                     | Border                                    | Surface   | Placeholder | Input text                  |
| ------------------------ | ----------------------------------------- | --------- | ----------- | --------------------------- |
| **Enabled**              | `1px solid #dddddd`                       | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Focused**              | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Invalid** (focus 아님) | `1px solid #e81919` + `inset 1px #e81919` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Invalid · focused**    | `1px solid #e81919` + `inset 1px #e81919` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Disabled**             | `1px solid #dddddd`                       | `#f8f8f8` | `#aaaaaa`   | `#aaaaaa`                   |
| **Read-only**            | `1px solid #dddddd`                       | `#f8f8f8` | —           | `#1c1c1c` (enabled 색 유지) |

### Create style — Container 상태

| 상태        | Border                                    | Surface   | Placeholder |
| ----------- | ----------------------------------------- | --------- | ----------- |
| **Enabled** | `1px transparent` (없음)                  | `#f8f8f8` | `#8f8f8f`   |
| **Focused** | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#ffffff` | `#8f8f8f`   |

> Create style 은 생성 폼 전용. 기본은 채워진 표면(border 없음), focus 시에만 border 와
> active 표면으로 전환.

### Label / Help / Error text

| 요소           | 폰트                          | 색상                                        |
| -------------- | ----------------------------- | ------------------------------------------- |
| Label          | Pretendard SemiBold 14px/20px | `#1c1c1c` (`--text`)                        |
| (선택사항)     | Pretendard Regular 12px/16px  | `#757575` (`--text-subtler`)                |
| * 필수 표시    | Pretendard Regular 14px/20px  | `#e81919` (`--text-danger`), opacity 0.8    |
| Help text      | Pretendard Regular 12px/16px  | `#555555` (`--text-subtle`)                 |
| **Error text** | Pretendard Regular 12px/16px  | `#e81919` (`--text-danger`), `role="alert"` |

`reserveDescriptionSpace`의 빈 설명 영역은 Help/Error와 같은 16px line box를 사용하되
`visibility: hidden`으로 보이지 않는다.

### Trailing element

| 요소            | 폰트                         | 색상                                                                                              |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Counter (24/32) | Pretendard Regular 12px/16px | `#757575` (`--text-subtler`)                                                                      |
| Suffix (원)     | Pretendard Regular 14px/20px | `#1c1c1c` (`--text`)                                                                              |
| Icon Button     | —                            | 공용 IconButton 스펙 참조. 치수는 Input size 연동(Small: 20px/icon 14px, Medium+: 24px/icon 16px) |

`passwordShowLabel`과 `passwordHideLabel`은 Icon Button의 accessible name만 바꾸며 Trailing의
치수·색상·정렬에는 영향을 주지 않는다.

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시. form semantic 토큰이 재매핑되어 자동 전환.

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
| * 필수     | `#f52424` (`--text-danger`)  |
| Help text  | `#aaaaaa` (`--text-subtle`)  |
| Error text | `#f52424` (`--text-danger`)  |

---

## 8. 타이포그래피

모든 텍스트는 Pretendard(`--font-sans`).

| 요소                     | 스타일 토큰 | 크기 | 행간 | 굵기          |
| ------------------------ | ----------- | ---- | ---- | ------------- |
| Label                    | Title2      | 14px | 20px | SemiBold(600) |
| (선택사항)               | Body3       | 12px | 16px | Regular(400)  |
| * 필수                   | Body2       | 14px | 20px | Regular(400)  |
| Input text / Placeholder | Body2       | 14px | 20px | Regular(400)  |
| Counter                  | Body3       | 12px | 16px | Regular(400)  |
| Suffix                   | Body2       | 14px | 20px | Regular(400)  |
| Help / Error text        | Body3       | 12px | 16px | Regular(400)  |

---

## 11. 디자인 토큰 정의 (CSS 변수)

Input 전용 form semantic 토큰. 공통 토큰(text/surface/border/element/icon)은
루트 [foundation 문서](../../foundations.md) 참조.

### `:root` (라이트)

```css
:root {
  /* Form — Input/Textarea 등 폼 컨트롤 전용 */
  --form-text: #1c1c1c; /* 입력값 텍스트 */
  --form-surface-active: #ffffff; /* enabled/focused 표면 */
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

---

### 보조 액션 스타일

`trailingAction`은 기존 trailing의 우측 12px, 세로 중앙 정렬과 ghost IconButton을 사용한다.
입력 텍스트의 우측 패딩에 버튼 폭(Small 20px, 나머지 24px)과 4px 여백을 추가한다.
라벨·도움말의 높이가 바뀌어도 버튼은 입력칸 안에 유지된다. 별도 색상이나 page DOM 선택자는 쓰지 않는다.

### 브라우저 검증 오류 스타일

native 제약 오류는 기존 Invalid border와 Error text를 재사용한다. 입력칸 아래 4px 간격,
Pretendard Regular 12px/16px, `--text-danger`(라이트 `#e81919`, 다크 `#f52424`)를 유지한다.
브라우저 경고 말풍선, 별도 Tooltip·Popover·Toast 또는 전용 크기·색상을 추가하지 않는다.
`reserveDescriptionSpace`를 사용하면 이 오류도 기존 16px 설명 영역을 대체한다.
