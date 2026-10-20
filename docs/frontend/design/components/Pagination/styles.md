# Pagination — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

모든 색상은 semantic 토큰을 참조한다. 괄호 안의 hex가 실제 색.

### 결과 카운트

| 요소                        | 색상                                       | 비고              |
| --------------------------- | ------------------------------------------ | ----------------- |
| 본문 ("총 ", "건 중 a-b건") | `#1c1c1c` (gray-900, `--text`)             | Body3 Regular     |
| 총건수 (N)                  | `var(--accent-500)` (accent-500, `--pg-count-primary`) | **SemiBold 강조** |

`rangeTemplate`을 사용해 문구 순서가 바뀌어도 `{total}`은 Pagination 내부의
`countHighlight`로 렌더링되므로 이 색상과 굵기를 유지한다.

### 페이지 입력 영역

| 요소                     | 색상                                             |
| ------------------------ | ------------------------------------------------ |
| "/" 구분자               | `#555555` (gray-700, `--text-subtle`)            |
| 총페이지 숫자 (N)        | `#1c1c1c` (gray-900, `--text`)                   |
| Input 테두리/배경/텍스트 | **Input 컴포넌트 스펙** (`Input/README.md` 참조) |

### 네비게이션 / 페이지당 항목수

각각 **Icon Button** / **Dropdown** 컴포넌트 스펙을 따른다. Pagination은 색상을 재정의하지 않는다.

`showPageSize={false}`이면 59px Dropdown wrapper도 제거한다. 빈 공간이나 별도 spacer를 남기지 않으며
남은 파트 간 16px gap과 기존 테마 토큰은 유지한다.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 컨테이너에 `.dark` 클래스 적용 시 semantic 토큰이 재매핑되어 자동 전환.

### 결과 카운트 (핵심 — 전역 토큰과 다름)

| 요소       | 라이트               | 다크                     | 비고                                                                                           |
| ---------- | -------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| 본문       | `#1c1c1c`            | `#dddddd` (gray-200)     | `--text` 자동 전환                                                                             |
| 총건수 (N) | `var(--accent-500)` (accent-500) | **`var(--accent-200)` (accent-200)** | `--pg-count-primary` — **주의**: 전역 `--text-primary`는 다크가 `var(--accent-400)`(accent-400)라 **다름** |

> **accent-200 vs accent-400 함정**: Figma 다크 스펙의 `color/text/primary`는 `var(--accent-200)`
> (accent-200)이다. 전역 토큰 `--text-primary`는 다크에서 `var(--accent-400)`(accent-400)로 매핑되어
> 있어 **어긋난다**. 따라서 Pagination은 전용 토큰 `--pg-count-primary`를 사용한다.
> Calendar(`--cal-text-primary`)가 동일한 패턴. 전역 토큰을 바꾸면 Link·Tab 등 다른
> 컴포넌트에 영향을 주므로 절대 전역을 건드리지 않는다.

### 페이지 입력 영역 (다크)

| 요소          | 다크 색상                                      |
| ------------- | ---------------------------------------------- |
| "/" 구분자    | `#aaaaaa` (gray-400, `--text-subtle`)          |
| 총페이지 숫자 | `#dddddd` (gray-200, `--text`)                 |
| Input         | Input 컴포넌트 다크 스펙 (form 토큰 자동 전환) |

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**.

| 요소                | font-size | line-height | weight             |
| ------------------- | --------- | ----------- | ------------------ |
| 결과 카운트 본문    | 12px      | 16px        | 400 (Regular)      |
| 결과 카운트 강조(N) | 12px      | 16px        | **600 (SemiBold)** |
| "/" 구분자          | 12px      | normal      | 400                |
| 총페이지 숫자       | 12px      | normal      | 400                |

> 모든 텍스트는 Body3(12px/16px). Input/Dropdown 내부 텍스트는 각 컴포넌트 스펙(Body2 14px) 참조.

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. Pagination은 이 변수만 참조한다.
나머지 색상(`--text`, `--text-subtle`, `--text-primary`)은 공통 semantic 토큰([foundation 문서](../../foundations.md) 참조).

### `:root` (라이트)

```css
:root {
  /* Pagination — 결과 카운트 강조색.
   * Figma text/primary 라이트 var(--accent-500)(accent-500) = 전역 --text-primary와 동일.
   * 다크 값이 다르므로 별도 토큰으로 분리. */
  --pg-count-primary: var(--accent-500); /* accent-500 */

  /* 공통 토큰 ([foundation 문서](../../foundations.md) 참조) */
  --text: #1c1c1c;
  --text-subtle: #555555;
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Pagination 다크 매핑.
   * Figma text/primary 다크 var(--accent-200)(accent-200).
   * 전역 --text-primary 다크(var(--accent-400) accent-400)와 다름 — 반드시 별도 토큰 사용. */
  --pg-count-primary: var(--accent-200); /* accent-200 */

  /* 공통 토큰 다크 매핑 */
  --text: #dddddd;
  --text-subtle: #aaaaaa;
}
```

> Icon Button / Input / Dropdown이 각자의 토큰을 소비하므로 여기서는 Pagination 고유
> 토큰(`--pg-count-primary`)만 정의한다. Input(form 토큰)과 Dropdown(tertiary button 토큰)의
> 다크 매핑은 각 컴포넌트 가이드라인과 [foundation 문서](../../foundations.md)를 참조.

---
