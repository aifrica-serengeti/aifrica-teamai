# Number Input — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명은 form semantic 토큰 체계를 따르며,
괄호 안의 hex 값이 실제 색이다.

### Default style — Container 상태

| 상태                     | Border                                    | Surface   | Placeholder | Input text                  |
| ------------------------ | ----------------------------------------- | --------- | ----------- | --------------------------- |
| **Enabled**              | `1px solid #dddddd`                       | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Focused**              | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Filled**               | `1px solid #dddddd`                       | `#ffffff` | —           | `#1c1c1c`                   |
| **Invalid** (focus 아님) | `1px solid #e81919` + `inset 1px #e81919` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Invalid · focused**    | `1px solid #e81919` + `inset 1px #e81919` | `#ffffff` | `#8f8f8f`   | `#1c1c1c`                   |
| **Disabled**             | `1px solid #dddddd`                       | `#f8f8f8` | `#aaaaaa`   | `#aaaaaa`                   |
| **Read-only**            | `1px solid #dddddd`                       | `#f8f8f8` | —           | `#1c1c1c` (enabled 색 유지) |

> Filled 는 enabled 와 시각적으로 동일(값이 들어있는 enabled 상태).

빈 `textValue`는 placeholder 상태와 같은 text 영역만 비운다. container, label, focus와 invalid 스타일은
숫자 `value` 제어 모드와 동일하다.

지수 표기 입력 거부는 기존 값과 focus를 유지하는 동작이며 새로운 외형·토큰·크기 variant를 추가하지
않는다. 별도의 browser 말풍선이나 레이아웃을 밀어내는 안내 영역을 만들지 않는다.

단위 suffix는 14px/20px Regular, `--text-subtle`을 사용한다. 좌우 간격 8px,
`flex-shrink: 0; white-space: nowrap`으로 입력·증감 버튼 사이에 배치한다. disabled는
`--text-disabled`, read-only는 정상 단위 색을 유지한다. suffix 유무와 무관하게 container 높이와
증감 버튼 사이 간격 0은 유지하며 입력 영역은 `min-width: 0`으로 남은 너비를 차지한다.

### Create style — Container 상태

| 상태         | Border                                    | Surface   | Placeholder |
| ------------ | ----------------------------------------- | --------- | ----------- |
| **Enabled**  | `1px transparent` (없음)                  | `#f8f8f8` | `#8f8f8f`   |
| **Focused**  | `1px solid var(--accent-500)` + `inset 1px var(--accent-500)` | `#ffffff` | `#8f8f8f`   |
| **Disabled** | `1px transparent`                         | `#f8f8f8` | `#aaaaaa`   |

> Create style 은 생성 폼 전용. 기본은 채워진 표면(border 없음), focus 시에만 border 와 active 표면으로 전환.

### Label / Help / Error text

| 요소                        | 폰트                          | 색상                                            |
| --------------------------- | ----------------------------- | ----------------------------------------------- |
| Label                       | Pretendard SemiBold 14px/20px | `#1c1c1c` (`--text`)                            |
| (선택사항)                  | Pretendard Regular 12px/16px  | `#757575` (`--text-subtler`)                    |
| \* 필수 표시                | Pretendard Regular 14px/20px  | `#e81919` (`--text-danger`)                     |
| Help text                   | Pretendard Regular 12px/16px  | `#555555` (`--text-subtle`)                     |
| **Error text** (invalid 시) | Pretendard Regular 12px/16px  | `#d00a0a` (`--text-error`), `role="alert"` 권장 |

> **주의**: Error text 색상은 `#d00a0a`(`--text-error`) 이다. 필수 표시 \* 의 `#e81919`(`--text-danger`) 와 **다른 색**이다.
> 두 색이 시각적으로 비슷해 보이지만 hex 값이 다르므로 토큰을 구분해서 사용해야 한다.

### 증감 버튼 (Icon Button)

공용 [`IconButton/README.md`](../IconButton/README.md) 스펙을 따른다. ghost variant:

| 상태     | 배경                            | Icon 색상                     |
| -------- | ------------------------------- | ----------------------------- |
| Enabled  | transparent                     | `#1c1c1c` (`--icon`)          |
| Hover    | `#f8f8f8` (`--surface-hover`)   | `#1c1c1c` (`--icon`)          |
| Pressed  | `#f4f4f4` (`--surface-pressed`) | `#1c1c1c` (`--icon`)          |
| Disabled | transparent                     | `#aaaaaa` (`--icon-disabled`) |

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시. semantic 토큰이 다크 값으로 자동 전환된다.

### Default style — Container 상태

| 상태          | Border                                    | Surface                  | Placeholder | Input text                  |
| ------------- | ----------------------------------------- | ------------------------ | ----------- | --------------------------- |
| **Enabled**   | `1px solid #555555`                       | `rgba(255,255,255,0.08)` | `#8f8f8f`   | `#dddddd`                   |
| **Focused**   | `1px solid var(--accent-400)` + `inset 1px var(--accent-400)` | `rgba(255,255,255,0.08)` | `#8f8f8f`   | `#dddddd`                   |
| **Invalid**   | `1px solid #e81919` + `inset 1px #e81919` | `rgba(255,255,255,0.08)` | `#8f8f8f`   | `#dddddd`                   |
| **Disabled**  | `1px solid #555555`                       | `rgba(255,255,255,0.08)` | `#757575`   | `#757575`                   |
| **Read-only** | `1px solid #555555`                       | `rgba(255,255,255,0.08)` | —           | `#dddddd` (enabled 색 유지) |

### Label / Help / Error text (다크)

| 요소           | 색상                                              |
| -------------- | ------------------------------------------------- |
| Label          | `#dddddd` (`--text`)                              |
| (선택사항)     | `#8f8f8f` (`--text-subtler`)                      |
| \* 필수 표시   | `#fb3e3e` (`--text-danger`, 다크에서 더 밝은 red) |
| Help text      | `#aaaaaa` (`--text-subtle`)                       |
| **Error text** | `#fec3c3` (`--text-error`, 다크에서 더 밝은 red)  |

> 다크 모드에서 primary 는 `var(--accent-400)`(accent-400, 라이트 `var(--accent-500)`보다 밝음).
> error text `#fec3c3`, 필수 `*` `#fb3e3e` — 라이트보다 채도/명도가 높은 붉은 색.

---

## 8. 타이포그래피

| 요소              | 폰트 패밀리 | 크기 | 행간 | 굵기           |
| ----------------- | ----------- | ---- | ---- | -------------- |
| Label             | Pretendard  | 14px | 20px | 600 (SemiBold) |
| (선택사항)        | Pretendard  | 12px | 16px | 400 (Regular)  |
| \* 필수 표시      | Pretendard  | 14px | 20px | 400 (Regular)  |
| Input value       | Pretendard  | 14px | 20px | 400 (Regular)  |
| Placeholder       | Pretendard  | 14px | 20px | 400 (Regular)  |
| Help / Error text | Pretendard  | 12px | 16px | 400 (Regular)  |

> Code 폰트(IBM Plex Mono)는 사용하지 않는다. 숫자도 Pretendard Regular 로 표시.

---

## 11. 디자인 토큰 정의 (CSS 변수)

Number Input 이 사용하는 토큰. `:root`(라이트) 와 `.dark`(다크) 에 정의.
나머지 form 토큰은 `Input/README.md` 의 토큰 정의와 동일하므로 여기서는 Number Input 고유 토큰만.

```css
:root {
  /* Text error — Figma color/text/error.
     invalid help text. 라이트 #d00a0a. --text-danger(#e81919)와 다름. */
  --text-error: var(--color-red-700); /* #d00a0a */
}

.dark {
  /* Text error — 다크 Figma color/text/error = #fec3c3.
   * red palette 범위 밖(ffa3a3(red-200)에 가장 근접)이나 Figma 값 정확 반영 위해
   * color-mix 로 red-200 을 살짝 조정. */
  --text-error: color-mix(in srgb, var(--color-red-200) 98%, white);
}
```

### 공유 form 토큰 (Input/README.md 참조)

아래 토큰들은 Input 과 공유. 전체 정의는 [`Input/README.md`](../Input/README.md) 의 토큰 섹션 참조.

| 토큰                          | 라이트    | 다크                     | 용도                           |
| ----------------------------- | --------- | ------------------------ | ------------------------------ |
| `--form-text`                 | `#1c1c1c` | `#dddddd`                | input 값 text                  |
| `--form-surface-active`       | `#ffffff` | `rgba(255,255,255,0.08)` | enabled/focused 표면           |
| `--form-surface-inactive`     | `#f8f8f8` | `rgba(255,255,255,0.08)` | disabled/read-only/create 표면 |
| `--form-border-default`       | `#dddddd` | `#555555`                | 기본 테두리                    |
| `--form-border-active`        | `var(--accent-500)` | `var(--accent-400)`                | focus 테두리                   |
| `--form-border-invalid`       | `#e81919` | `#e81919`                | invalid 테두리                 |
| `--form-placeholder-active`   | `#8f8f8f` | `#8f8f8f`                | enabled placeholder            |
| `--form-placeholder-inactive` | `#aaaaaa` | `#757575`                | disabled placeholder           |
| `--text`                      | `#1c1c1c` | `#dddddd`                | label                          |
| `--text-subtle`               | `#555555` | `#aaaaaa`                | help text                      |
| `--text-subtler`              | `#757575` | `#8f8f8f`                | (선택사항)                     |
| `--text-danger`               | `#e81919` | `#fb3e3e`                | 필수 \* 표시                   |
| `--text-disabled`             | `#aaaaaa` | `#757575`                | disabled 값 text               |
| `--text-error`                | `#d00a0a` | `#fec3c3`                | invalid help text (위 정의)    |

---
