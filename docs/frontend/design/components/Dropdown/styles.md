# Dropdown — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

필드는 **tertiary button 토큰**을 사용한다. 모든 색에 hex 값을 명시.

### Field 상태

| 상태                    | Border                                             | Surface                                    | Text / Placeholder                                                              |
| ----------------------- | -------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------- |
| **Enabled**             | `1px solid #dddddd` (`--btn-tertiary-border`)      | `#ffffff` (`--btn-tertiary-fill`)          | text `#1c1c1c` (`--btn-on-tertiary`) · placeholder `#757575` (`--text-subtler`) |
| **Hovered**             | `1px solid #dddddd`                                | `#f8f8f8` (`--btn-tertiary-fill-hover`)    | 동일                                                                            |
| **Pressed**             | `1px solid #dddddd`                                | `#f4f4f4` (`--btn-tertiary-fill-pressed`)  | 동일                                                                            |
| **Focused** (메뉴 열림) | `1px solid #dddddd` (유지) + 외곽 outline 링       | `#ffffff`                                  | 동일                                                                            |
| **Invalid**             | `2px solid #d00a0a` (`--border-error`)             | `#ffffff`                                  | 동일                                                                            |
| **Invalid · Focused**   | `2px solid #d00a0a` + 외곽 outline 링(offset -4px) | `#ffffff`                                  | 동일                                                                            |
| **Disabled**            | `1px solid #dddddd`                                | `#ffffff` (`--btn-tertiary-fill-disabled`) | text/placeholder `#aaaaaa` (`--btn-on-tertiary-disabled`)                       |
| **Read-only**           | `1px solid #dddddd`                                | `#f8f8f8` (`--btn-tertiary-fill-readonly`) | text `#1c1c1c` (enabled 색 유지) · placeholder `#757575`                        |
| **Selected**            | `1px solid #dddddd`                                | `#ffffff`                                  | 선택값 text `#1c1c1c` (placeholder 아님)                                        |

> **Selected** 는 enabled 와 시각적으로 동일한 필드. placeholder 대신 선택값이 표시된다.

### Focus 링 (외곽 outline)

| 속성   | 값                                       |
| ------ | ---------------------------------------- |
| border | `1px solid var(--accent-500)` (`--border-focused`) |
| offset | -3px (enabled), -4px (invalid)           |
| 높이   | field 높이 + 4px                         |
| radius | 6px                                      |
| 색상   | `var(--accent-500)` (라이트/다크에서 다름)         |

### Label / Help / Error text

| 요소       | 폰트                 | 색상(enabled)                | 색상(disabled)                |
| ---------- | -------------------- | ---------------------------- | ----------------------------- |
| Label      | Title2 14px SemiBold | `#1c1c1c` (`--text`)         | `#aaaaaa` (`--text-disabled`) |
| (선택사항) | Body3 12px Regular   | `#757575` (`--text-subtler`) | `#aaaaaa`                     |
| \* (필수)  | Body2 14px Regular   | `#e81919` (`--text-danger`)  | `#e81919` (유지)              |
| info icon  | 14px                 | `#757575` (`--icon-subtler`) | `#aaaaaa` (`--icon-disabled`) |
| Help text  | Body3 12px Regular   | `#555555` (`--text-subtle`)  | `#aaaaaa`                     |
| Error text | Body3 12px Regular   | `#d00a0a` (`--text-error`)   | —                             |

### Dropdown icon

아이콘 색상은 field 의 `color` 를 **상속(inherit)** 한다. Icon 컴포넌트에 `style={{ color: 'inherit' }}` 을
전달하여 currentColor 를 강제한다.

| 상태                                                       | 색상      | 비고                                          |
| ---------------------------------------------------------- | --------- | --------------------------------------------- |
| Enabled / Hovered / Pressed / Focused / Invalid / Selected | `#1c1c1c` | field 의 `--btn-on-tertiary` 상속             |
| Disabled                                                   | `#aaaaaa` | field 의 `--btn-on-tertiary-disabled` 상속    |
| Read-only                                                  | `#1c1c1c` | field 의 `--btn-on-tertiary`(enabled 색) 상속 |

> Focused(메뉴 열림) 시 icon 이 180° 회전(위쪽 향함).
> Disabled 시 **값 텍스트와 아이콘이 모두** 흐린 색(`#aaaaaa`)으로 전환된다.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `.dark` 클래스로 전환. primary 가 더 밝은 blue(var(--accent-400))로, 표면이 어두운 회색으로 바뀐다.

### Field 상태

| 상태          | Border                                        | Surface                                                   | Text / Placeholder                                        |
| ------------- | --------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| **Enabled**   | `1px solid #555555` (`--btn-tertiary-border`) | `rgba(255,255,255,0.08)` (`--btn-tertiary-fill`)          | text `#dddddd` · placeholder `#8f8f8f` (`--text-subtler`) |
| **Hovered**   | `1px solid #555555`                           | `rgba(255,255,255,0.15)` (`--btn-tertiary-fill-hover`)    | 동일                                                      |
| **Pressed**   | `1px solid #555555`                           | `rgba(255,255,255,0.20)` (`--btn-tertiary-fill-pressed`)  | 동일                                                      |
| **Focused**   | `1px solid #555555` + 외곽 outline 링         | `rgba(255,255,255,0.08)`                                  | 동일                                                      |
| **Invalid**   | `2px solid #e81919` (`--border-error`)        | `rgba(255,255,255,0.08)`                                  | 동일                                                      |
| **Disabled**  | `1px solid #555555`                           | `rgba(255,255,255,0.08)` (`--btn-tertiary-fill-disabled`) | text/placeholder `#555555` (`--btn-on-tertiary-disabled`) |
| **Read-only** | `1px solid #555555`                           | `rgba(255,255,255,0.10)` (`--btn-tertiary-fill-readonly`) | text `#dddddd`                                            |

### Focus 링

| 속성 | 값                                           |
| ---- | -------------------------------------------- |
| 색상 | `var(--accent-400)` (`--border-focused`, 더 밝은 blue) |

### Label / Help / Error text (다크)

| 요소       | 색상(enabled)                | 색상(disabled)                |
| ---------- | ---------------------------- | ----------------------------- |
| Label      | `#dddddd` (`--text`)         | `#757575` (`--text-disabled`) |
| (선택사항) | `#8f8f8f` (`--text-subtler`) | `#757575`                     |
| \* (필수)  | `#f52424` (`--text-danger`)  | `#f52424`                     |
| Help text  | `#aaaaaa` (`--text-subtle`)  | `#757575`                     |
| Error text | `#fec3c3` (`--text-error`)   | —                             |

---

## 8. 타이포그래피

Pretendard 폰트 사용. 모든 텍스트는 `--font-sans` 참조.

| 요소                        | 스타일 토큰     | 폰트                | 크기/행간/굵기    |
| --------------------------- | --------------- | ------------------- | ----------------- |
| Label                       | `--text-title2` | Pretendard SemiBold | 14px / 20px / 600 |
| Placeholder / Selected text | `--text-body2`  | Pretendard Regular  | 14px / 20px / 400 |
| (선택사항)                  | `--text-body3`  | Pretendard Regular  | 12px / 16px / 400 |
| \* (필수)                   | `--text-body2`  | Pretendard Regular  | 14px / 20px / 400 |
| Help text / Error text      | `--text-body3`  | Pretendard Regular  | 12px / 16px / 400 |

---

## 11. 디자인 토큰 정의 (CSS 변수)

Dropdown 이 사용하는 tertiary button 토큰과 전용 토큰. 전역 `globals.css` 에 정의한다.

### `:root` (라이트)

```css
:root {
  /* Tertiary button 토큰 — Dropdown field 가 사용 */
  --btn-tertiary-fill: #ffffff;
  --btn-tertiary-fill-hover: #f8f8f8;
  --btn-tertiary-fill-pressed: #f4f4f4;
  --btn-tertiary-fill-readonly: #f8f8f8;
  --btn-tertiary-fill-disabled: #ffffff;
  --btn-tertiary-border: #dddddd;
  --btn-on-tertiary: #1c1c1c;
  --btn-on-tertiary-disabled: #aaaaaa;

  /* Focus / Invalid */
  --border-focused: var(--accent-500);
  --border-error: #d00a0a;
  --text-error: #d00a0a;
}
```

### `.dark` (다크)

```css
.dark {
  /* Tertiary button 토큰 — 다크 */
  --btn-tertiary-fill: color-mix(
    in srgb,
    #ffffff 8%,
    transparent
  ); /* rgba(255,255,255,0.08) */
  --btn-tertiary-fill-hover: color-mix(in srgb, #ffffff 15%, transparent);
  --btn-tertiary-fill-pressed: color-mix(in srgb, #ffffff 20%, transparent);
  --btn-tertiary-fill-readonly: color-mix(in srgb, #ffffff 10%, transparent);
  --btn-tertiary-fill-disabled: color-mix(in srgb, #ffffff 8%, transparent);
  --btn-tertiary-border: #555555;
  --btn-on-tertiary: #dddddd;
  --btn-on-tertiary-disabled: #555555;

  /* Focus / Invalid — 다크에서 더 밝은 색 */
  --border-focused: var(--accent-400);
  --border-error: #e81919;
  --text-error: #fec3c3;
}
```

> 공통 semantic 토큰(`--text`, `--text-subtler`, `--text-subtle`, `--text-disabled`,
> `--text-danger`, `--icon`, `--icon-subtler`, `--icon-disabled`)은 [foundation 문서](../../foundations.md) 의
> Color 섹션에 정의된 값을 그대로 사용한다.

---

