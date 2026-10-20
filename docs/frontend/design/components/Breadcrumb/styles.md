# Breadcrumb — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

아래는 상태별 baseline 매핑이다. primary는 솔루션 accent scale로 연결하고 중립·status 값도 채택 여부를 기록한다.

### Item 색상 (상태별)

| 상태                | 대상                      | 색상                                   | 밑줄 |
| ------------------- | ------------------------- | -------------------------------------- | ---- |
| **Enabled**         | 상위 depth (기본)         | `#757575` (gray-600)                   | X    |
| **Hovered**         | 상위 depth, 마우스 오버   | `#555555` (gray-700)                   | O    |
| **Pressed**         | 상위 depth, 누름 중       | `#333333` (gray-800)                   | O    |
| **Focused**         | 상위 depth, 키보드 포커스 | `#757575` (enabled 유지) + 1px outline | X    |
| **Selected (현재)** | 마지막 depth              | `#1c1c1c` (gray-900, `--text` 동일)    | X    |

### Separator / 기타

| 항목          | 색상                                  |
| ------------- | ------------------------------------- |
| Separator `/` | `#8f8f8f` (gray-500) — 상태 전환 없음 |
| Focus outline | `var(--accent-500)` (accent-500)                  |

> 상위 depth 는 회색 계열(default `#757575`)이고, 현재 페이지는 본문 텍스트 색(`#1c1c1c`)
> 이다. 이 구분이 "현재 위치"를 시각적으로 전달한다.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 컨테이너에 `.dark` 클래스 적용 시 전환. `--breadcrumb-*` 토큰이 재매핑되어
자동 전환된다.

### Item 색상 (상태별)

| 상태                | 색상                                     | 밑줄 |
| ------------------- | ---------------------------------------- | ---- |
| **Enabled**         | `#8f8f8f` (gray-500)                     | X    |
| **Hovered**         | `#757575` (gray-600)                     | O    |
| **Pressed**         | `#555555` (gray-700)                     | O    |
| **Focused**         | `#8f8f8f` + 1px outline                  | X    |
| **Selected (현재)** | `#dddddd` (gray-200, `--text` 다크 동일) | X    |

### Separator / 기타

| 항목          | 색상                                 |
| ------------- | ------------------------------------ |
| Separator `/` | `#8f8f8f` (gray-500) — 라이트와 동일 |
| Focus outline | `var(--accent-400)` (accent-400, 더 밝음)        |

> 라이트에서 회색 계열이 어두운 방향(hover `#555` → pressed `#333`)으로 진해지지만,
> 다크에서는 더 밝은 방향(hover `#757575` → pressed `#555555`)으로 전환된다.
> Separator 와 focus outline 색상은 각각 라이트와 다르다.

---

## 10. 타이포그래피

폰트 패밀리: **Pretendard**. 굽기 400 (Regular) 고정.

| 요소             | font-size | line-height | weight |
| ---------------- | --------- | ----------- | ------ |
| Item (상위/현재) | 14px      | 20px        | 400    |
| Separator `/`    | 14px      | 20px        | 400    |

> 모든 텍스트는 Body2(14px/20px)로 동일하다. size 변형이 없다 — Breadcrumb 은 단일 크기.

---

## 13. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Breadcrumb — Figma color/breadcrumb/{default,active,hovered,pressed,border} collection */
  --breadcrumb-default: #757575; /* gray-600 — 상위 depth 기본 */
  --breadcrumb-active: #1c1c1c; /* gray-900 — 현재 페이지 (= --text) */
  --breadcrumb-hovered: #555555; /* gray-700 */
  --breadcrumb-pressed: #333333; /* gray-800 */
  --breadcrumb-border: #8f8f8f; /* gray-500 — "/" 구분자 */
  --breadcrumb-focus-border: var(--accent-500); /* accent-500 */

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Breadcrumb 다크 매핑 — Figma Breadcrumb dark node 11007:2861 기준 */
  --breadcrumb-default: #8f8f8f; /* gray-500 — 라이트(gray-600)보다 밝음 */
  --breadcrumb-active: #dddddd; /* gray-200 — (= --text 다크) */
  --breadcrumb-hovered: #757575; /* gray-600 */
  --breadcrumb-pressed: #555555; /* gray-700 */
  --breadcrumb-border: #8f8f8f; /* gray-500 — 라이트와 동일 */
  --breadcrumb-focus-border: var(--accent-400); /* accent-400 — 더 밝음 */
}
```

> Icon Button / Menu 가 각자의 토큰(`--icon-btn-*`, Menu 토큰)을 소비하므로 여기서는
> Breadcrumb 고유 토큰만 정의한다. 색상 hex 를 컴포넌트에 직접 하드코딩하지 않는다.

---

