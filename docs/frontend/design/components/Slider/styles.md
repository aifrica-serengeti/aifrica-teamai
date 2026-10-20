# Slider — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Slider 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** raw palette 직접 참조 금지, semantic 토큰만 참조.

### Track / Range / Thumb

| 상태         | Track                          | Range(Fill)                      | Thumb                                          | Thumb border                           |
| ------------ | ------------------------------ | -------------------------------- | ---------------------------------------------- | -------------------------------------- |
| **Enabled**  | `#dddddd` (`--border-default`) | `var(--accent-500)` (`--element-primary`)  | `var(--accent-500)` (`--element-primary`)                | `var(--accent-500)` (`--element-primary`)        |
| **Hover**    | `#dddddd`                      | `var(--accent-500)`                        | `var(--accent-500)`                                      | `var(--accent-500)` + outline 2px `var(--accent-500)`      |
| **Focus**    | `#dddddd`                      | `var(--accent-500)`                        | `var(--accent-500)` + outline 2px `var(--accent-500)` (offset 2px) | `var(--accent-500)`                              |
| **Disabled** | `#dddddd` (`--border-default`) | `#eeeeee` (`--element-disabled`) | `#eeeeee` (`--element-disabled`)               | `#aaaaaa` (`--border-disabled-subtle`) |

> Hover 시 Thumb 주변에 primary 색상 outline 이 나타난다(2px, offset 2px).
> Disabled 시 Range 와 Thumb 가 모두 회색으로 전환. Track 은 회색 유지.

### Label / Info 아이콘 / Steps

| 요소             | 색상                           | 비고           |
| ---------------- | ------------------------------ | -------------- |
| **Label 텍스트** | `#1c1c1c` (`--text`)           | 14px SemiBold  |
| **(선택사항)**   | `#757575` (`--text-subtler`)   | 12px Regular   |
| **필수 `*`**     | `--text-danger`                | 14px Regular   |
| **Info 아이콘**  | `#555555` (`--icon-subtle`)    | 14px, gray-700 |
| **Help text**    | `--text-subtle`                | 12px Regular   |
| **Error text**   | `--text-danger`                | 12px Regular   |
| **Step tick**    | `#dddddd` (`--border-default`) | 1×4px          |
| **Step 라벨**    | `#757575` (`--text-subtler`)   | 12px, gray-600 |

### Input (공용 Input 컴포넌트 상속)

| 상태         | Border                          | Surface   | Text      |
| ------------ | ------------------------------- | --------- | --------- |
| **Enabled**  | `1px solid #dddddd`             | `#ffffff` | `#1c1c1c` |
| **Focused**  | `1px solid var(--accent-500)` + inset 1px | `#ffffff` | `#1c1c1c` |
| **Disabled** | `1px solid #dddddd`             | `#f8f8f8` | `#aaaaaa` |

> Input 의 상세 색상 스펙은 [`Input/README.md`](../Input/README.md) §5 참조.

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시. semantic 토큰이 재매핑되어 자동 전환.

### Track / Range / Thumb (Dark)

| 상태         | Track                          | Range(Fill)                     | Thumb                             | Thumb border                      |
| ------------ | ------------------------------ | ------------------------------- | --------------------------------- | --------------------------------- |
| **Enabled**  | `#555555` (`--border-default`) | `var(--accent-400)` (`--element-primary`) | `var(--accent-400)` (`--element-primary`)   | `var(--accent-400)`                         |
| **Hover**    | `#555555`                      | `var(--accent-400)`                       | `var(--accent-400)` + outline 2px `var(--accent-400)` | `var(--accent-400)`                         |
| **Focus**    | `#555555`                      | `var(--accent-400)`                       | `var(--accent-400)` + outline 2px `var(--accent-400)` | `var(--accent-400)`                         |
| **Disabled** | `#555555`                      | 회색 (`--element-disabled`)     | 회색 (`--element-disabled`)       | 회색 (`--border-disabled-subtle`) |

> primary 색상이 라이트 `var(--accent-500)`(accent-500) → 다크 `var(--accent-400)`(accent-400, 더 밝음)로 전환.

### Label / Info 아이콘 / Steps (Dark)

| 요소                      | 색상                           | 비고           |
| ------------------------- | ------------------------------ | -------------- |
| **Label 텍스트**          | `#dddddd` (`--text`)           |                |
| **(선택사항)**            | `#8f8f8f` (`--text-subtler`)   | 토큰 자동 전환 |
| **필수 `*` / Error text** | `--text-danger`                | 토큰 자동 전환 |
| **Info 아이콘**           | `#aaaaaa` (`--icon-subtle`)    | 토큰 자동 전환 |
| **Help text**             | `--text-subtle`                | 토큰 자동 전환 |
| **Step ticks**            | `#555555` (`--border-default`) |                |
| **Step 라벨**             | `#757575` (`--text-subtler`)   | 라이트와 동일  |

### Input (Dark)

| 상태         | Border                          | Surface   | Text      |
| ------------ | ------------------------------- | --------- | --------- |
| **Enabled**  | `1px solid #555555`             | `#1c1c1c` | `#dddddd` |
| **Focused**  | `1px solid var(--accent-400)` + inset 1px | `#1c1c1c` | `#dddddd` |
| **Disabled** | `1px solid #555555`             | `#333333` | `#757575` |

> Tooltip 은 inverse 토큰(라이트: 검정 배경 `#1c1c1c` + 흰 글씨 / 다크: 흰 배경 `#ffffff` + 검정 글씨).
> 상세는 [`Tooltip/README.md`](../Tooltip/README.md) §6 참조.

---

## 8. 타이포그래피

모든 텍스트는 Pretendard(`--font-sans`).

| 요소                      | 스타일 토큰 | 크기 | 행간 | 굵기          |
| ------------------------- | ----------- | ---- | ---- | ------------- |
| Label                     | Title2      | 14px | 20px | SemiBold(600) |
| (선택사항) / Help / Error | Body3       | 12px | 16px | Regular(400)  |
| 필수 `*`                  | Body2       | 14px | 20px | Regular(400)  |
| Step 라벨                 | Body3       | 12px | 14px | Regular(400)  |
| Input 값                  | Body2       | 14px | 20px | Regular(400)  |
| Tooltip 값                | Body2       | 14px | 20px | Regular(400)  |

---

## 11. 디자인 토큰 정의 (CSS 변수)

Slider 가 참조하는 semantic 토큰. 공통 토큰 정의는 루트 [foundation 문서](../../foundations.md) Color 섹션 참조.

### `:root` (라이트) — Slider 관련 토큰

```css
:root {
  /* Text 토큰 — label / requirement / help / step 라벨 */
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-subtler: #757575;
  --text-danger: #e81919;

  /* Border 토큰 — Track / tick */
  --border-default: #dddddd;
  --border-disabled-subtle: #aaaaaa;

  /* Element 토큰 — Range / Thumb */
  --element-primary: var(--accent-500);
  --element-disabled: #eeeeee;

  /* Icon 토큰 — Info 아이콘 */
  --icon-subtle: #555555;

  /* Form 토큰 — Input (Input/README.md §11 참조) */
  --form-text: #1c1c1c;
  --form-surface-active: #ffffff;
  --form-surface-inactive: #f8f8f8;
  --form-border-default: #dddddd;
  --form-border-active: var(--accent-500);

  /* Tooltip inverse 토큰 (Tooltip/README.md §11 참조) */
  --surface-inverse: #1c1c1c;
  --text-inverse: #ffffff;
}
```

### `.dark` (다크) — Slider 관련 토큰

```css
.dark {
  /* Text 토큰 */
  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-subtler: #8f8f8f;
  --text-danger: #ff5a5a;

  /* Border 토큰 */
  --border-default: #555555;
  --border-disabled-subtle: #aaaaaa;

  /* Element 토큰 — primary 가 accent-400(더 밝음)로 전환 */
  --element-primary: var(--accent-400);
  --element-disabled: #333333;

  /* Icon 토큰 */
  --icon-subtle: #aaaaaa;

  /* Form 토큰 */
  --form-text: #dddddd;
  --form-surface-active: #1c1c1c;
  --form-surface-inactive: #333333;
  --form-border-default: #555555;
  --form-border-active: var(--accent-400);

  /* Tooltip inverse 토큰 — 다크에서는 흰 배경 + 검정 글씨 */
  --surface-inverse: #ffffff;
  --text-inverse: #1c1c1c;
}
```

---


## 문구 없는 오류 상태

문구 없는 `invalid` 상태도 공용 Input의 기존 오류 테두리를 사용한다. 추가 여백이나 오류 문구 영역은 만들지 않는다.


## 사용자 지정 표시 눈금

사용자 지정 눈금도 기존 tick(1×4px), stepLabel(12px), track 아래 간격(6px)을 그대로 사용한다. 눈금 위치는 `(value - min) / (max - min)`으로 계산한다.

## 보조 문구 배치

`helpTextPlacement`는 `below`(기본값) 또는 `label-end`를 받는다. `label-end`는 라벨 줄의 오른쪽에 기존 보조 문구를 표시한다. 라벨이 없으면 하단 표시를 유지하며 오류는 항상 하단에 표시한다. 배치와 관계없이 보조 문구는 하나만 렌더하고 thumb의 `aria-describedby` 연결을 유지한다. 페이지는 Slider 내부 태그를 선택하는 CSS 대신 이 옵션을 사용한다.

라벨 옆 문구는 기존 helpText의 12px/16px·보조 색상을 재사용한다. `margin-top: 0`, `margin-inline-start: auto`, `padding-inline-start: 8px`, `text-align: end`를 적용해 라벨과 같은 줄 오른쪽에 정렬한다.
