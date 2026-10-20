# Status — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Status 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

상태별 State icon 색상. Figma `get_variable_defs` 로 추출한 정확한 값이다.

| 상태            | 아이콘 색상            | 토큰               | Figma 변수             |
| --------------- | ---------------------- | ------------------ | ---------------------- |
| **Error**       | `#d00a0a` (red-700)    | `--status-error`   | color/icon/error       |
| **Warning**     | `#f0bb00` (yellow-500) | `--status-warning` | color/icon/warning     |
| **Success**     | `#05a85a` (green-600)  | `--status-success` | color/icon/success     |
| **Normal**      | `var(--solution-primary)` (solution primary)   | `--status-primary` | color/icon/primary     |
| **In progress** | `var(--solution-primary)` (solution primary)   | `--status-primary` | color/icon/primary     |
| **Incomplete**  | `var(--solution-primary)` (solution primary)   | `--status-primary` | color/icon/primary     |
| **Not started** | `#757575` (gray-600)   | `--status-neutral` | color/icon/neutral     |
| **Pending**     | `#757575` (gray-600)   | `--status-neutral` | color/icon/neutral     |
| **Info**        | `var(--solution-primary)` (solution primary)   | `--status-primary` | color/icon/information |

채워진 원(error/warning/success/pending/info) 내부 마크(X/!/✓/점·3/i) 색상:

| 요소          | 색상             | 토큰               |
| ------------- | ---------------- | ------------------ |
| 마크(fill 위) | `#ffffff` (흰색) | `--status-on-fill` |

| 요소         | 색상                 | 토큰     |
| ------------ | -------------------- | -------- |
| Label 텍스트 | `#1c1c1c` (gray-900) | `--text` |

> **주의 — 색상 매핑 함정.** Figma 검증 결과:
>
> - **Normal** 의 테두리/체크는 **primary(파랑, var(--solution-primary))** 이다 (neutral 아님).
> - **Pending** 은 **neutral(진회색, #757575)** 이다 (primary 파랑이 아님).
> - notStarted 도 neutral(회색), incomplete 는 primary(파랑).
>   같은 계열로 보여도 실제 Figma 변수를 확인해야 정확하다.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `:root` 또는 컨테이너에 `.dark` 클래스 적용 시 전환. Status 가 참조하는
`--status-*` 토큰만 재매핑하면 자동 전환된다. 컴포넌트 코드 수정 불필요.

| 상태            | 라이트                 | 다크                           | 토큰               |
| --------------- | ---------------------- | ------------------------------ | ------------------ |
| **Error**       | `#d00a0a` (red-700)    | `#e81919` (red-600, 더 밝음)   | `--status-error`   |
| **Warning**     | `#f0bb00` (yellow-500) | `#f0bb00` (동일)               | `--status-warning` |
| **Success**     | `#05a85a` (green-600)  | `#06ce6e` (green-500, 더 밝음) | `--status-success` |
| **Normal**      | `var(--solution-primary)` (solution primary)   | `var(--solution-primary)` (solution dark primary, 더 밝음)  | `--status-primary` |
| **In progress** | `var(--solution-primary)` (solution primary)   | `var(--solution-primary)` (solution dark primary)           | `--status-primary` |
| **Incomplete**  | `var(--solution-primary)` (solution primary)   | `var(--solution-primary)` (solution dark primary)           | `--status-primary` |
| **Not started** | `#757575` (gray-600)   | `#757575` (동일)               | `--status-neutral` |
| **Pending**     | `#757575` (gray-600)   | `#757575` (동일)               | `--status-neutral` |
| **Info**        | `var(--solution-primary)` (solution primary)   | `var(--solution-primary)` (solution dark primary)           | `--status-primary` |
| Label 텍스트    | `#1c1c1c`              | `#dddddd`                      | `--text`           |

> 어두운 배경 위에서 대비를 유지하기 위해 error/success/primary 가 한 단계씩 밝아진다.
> warning/neutral/gray 계열은 라이트와 동일하다.

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**. 굵기 400 (Regular). Label 에만 적용.

| 항목           | 값                           |
| -------------- | ---------------------------- |
| font-family    | `Pretendard` (`--font-sans`) |
| font-size      | **14px**                     |
| line-height    | **20px**                     |
| font-weight    | **400** (Regular)            |
| letter-spacing | 0                            |

> **Figma 근거**: Body2 텍스트 스타일. 원본 Figma code 의
> `font-['Pretendard:Regular'] leading-[20px] text-[14px]` 와 일치.

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Status — Figma color/icon/* 변수 매핑.
   * 기존 --icon-* 토큰은 값이 달라(error: red-700 vs --icon-danger red-600)
   * 별도 토큰으로 정의한다. */
  --status-error: #d00a0a; /* red-700, color/icon/error */
  --status-warning: #f0bb00; /* yellow-500, color/icon/warning */
  --status-success: #05a85a; /* green-600, color/icon/success */
  --status-neutral: #757575; /* gray-600, color/icon/neutral */
  --status-primary: var(--solution-primary); /* solution primary, color/icon/primary */
  --status-on-fill: #ffffff; /* 채워진 원 위 마크 색 */

  /* Text — Label 텍스트 색상 */
  --text: #1c1c1c; /* gray-900 */

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Status — 다크에서 더 밝은 색으로 전환(error/success/primary).
   * warning/neutral/gray 계열은 라이트와 동일. */
  --status-error: #e81919; /* red-600, 더 밝음 */
  --status-warning: #f0bb00; /* 동일 */
  --status-success: #06ce6e; /* green-500, 더 밝음 */
  --status-neutral: #757575; /* 동일 */
  --status-primary: var(--solution-primary); /* solution dark primary, 더 밝음 */
  --status-on-fill: #ffffff; /* 동일 */

  /* Text */
  --text: #dddddd; /* gray-200 */
}
```

> Status 는 공용 semantic 토큰 체계에 통합되어 있다. `--status-*` 접두사 토큰은
> Status icon 전용이며, Label 은 공용 `--text` 토큰을 재사용한다.

---

