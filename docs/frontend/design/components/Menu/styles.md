# Menu — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

### MenuContent

| 요소   | 색상                                                                             |
| ------ | -------------------------------------------------------------------------------- |
| 배경   | `#ffffff` (`--menu-surface`)                                                     |
| 테두리 | `1px solid #dddddd` (`--border-default`)                                         |
| 그림자 | `0 4px 6px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)` (`--menu-shadow`) |

### MenuItem — 상태별 (★ 상태 우선순위 및 상호배제 규칙)

| 상태         | 배경                                  | 텍스트                        | 비고                                                |
| ------------ | ------------------------------------- | ----------------------------- | --------------------------------------------------- |
| **Enabled**  | `#ffffff` (`--menu-surface`)          | `#1c1c1c` (`--text`)          | 기본                                                |
| **Hovered**  | `#f8f8f8` (`--menu-item-hovered`)     | `#1c1c1c` (`--text`)          | 마우스 hover. **focus 링 없음**                     |
| **Pressed**  | `#f4f4f4` (`--menu-item-pressed`)     | `#1c1c1c` (`--text`)          | 마우스 down                                         |
| **Focused**  | `#ffffff` (`--menu-surface`) **유지** | `#1c1c1c` (`--text`)          | **배경 변화 없음** + `inset 0 0 0 2px var(--accent-500)` 링만 |
| **Selected** | `var(--accent-50)` (`--menu-item-selected`)    | `var(--accent-500)` (`--text-primary`)  | + trailing check 아이콘 자동                        |
| **Disabled** | `transparent`                         | `#aaaaaa` (`--text-disabled`) | `cursor: not-allowed`. **최우선**                   |

### ★ 상태 셀렉터 작성 규칙 (버그 방지)

가장 많이 발생하는 버그: **hover 시 focus 링이 같이 보이는 문제**.

**올바른 셀렉터 구성** (vanilla-extract `selectors`):

```js
selectors: {
  // 1. Hovered — 마우스 hover. focus 링 없음.
  '&:hover': { background: 'var(--menu-item-hovered)' },

  // 2. Pressed
  '&:active': { background: 'var(--menu-item-pressed)' },

  // 3. Focused — 키보드 포커스(Radix data-highlighted).
  //    ★ 핵심: :not(:hover) 를 붙여야 hover 시 링이 사라진다.
  //    배경은 바꾸지 않는다(기본 surface 유지).
  '&[data-highlighted]:not(:hover)': {
    boxShadow: 'inset 0 0 0 2px var(--border-primary)',
    zIndex: 1,
  },

  // 4. Selected — 배경 + 텍스트 색상 변경.
  '&[data-selected="true"]': {
    background: 'var(--menu-item-selected)',
    color: 'var(--text-primary)',
  },
  // selected + hover — selected 배경 유지(덮어쓰기 방지)
  '&[data-selected="true"]:hover': {
    background: 'var(--menu-item-selected)',
  },

  // 5. Disabled — 최우선. boxShadow: none 으로 focus 링도 제거.
  '&[data-disabled], &:disabled': {
    color: 'var(--text-disabled)',
    background: 'transparent',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  // selected + disabled — disabled 우선 (명시도 높임: &&)
  '&&[data-selected="true"][data-disabled]': {
    background: 'transparent',
    color: 'var(--text-disabled)',
  },
}
```

> **주의사항**:
>
> - focus 링은 `outline`이 아닌 **inset box-shadow**를 사용한다.
>   `overflow: hidden`이 적용된 item에서 `outline-offset: -2px`는 잘려 보이지 않는다.
> - `&:focus-visible`이 아닌 `&[data-highlighted]`를 사용한다.
>   Radix DropdownMenu는 마우스 클릭으로도 `data-highlighted`를 설정한다.
> - `:not(:hover)`를 반드시 붙인다. 그렇지 않으면 hover 시 focus 링이 잔류한다.
> - selected + hover 시 배경이 hovered 색으로 덮어쓰지 않도록 별도 셀렉터로 방어한다.

### Item 내부 요소 색상

| 요소            | 색상                           | 비고                               |
| --------------- | ------------------------------ | ---------------------------------- |
| Label 텍스트    | `#1c1c1c` (`--text`)           | 상속                               |
| Description     | `#757575` (`--text-subtler`)   | Body3 12px                         |
| Shortcut        | `#757575` (`--text-subtler`)   | Body2 14px, **검정 아님**          |
| Selected check  | `var(--accent-500)` (`--text-primary`)   | 16px                               |
| Submenu chevron | `#1c1c1c` (`--text`)           | 폰트 색상과 동일. **primary 아님** |
| Section header  | `#555555` (`--text-subtle`)    | Title3 12px                        |
| Divider         | `#dddddd` (`--border-default`) |                                    |
| Focus 링        | `var(--accent-500)` (`--border-primary`) | inset box-shadow                   |

### Disabled 내부 요소 (globalStyle로 처리)

| 요소        | 색상                          |
| ----------- | ----------------------------- |
| Description | `#aaaaaa` (`--text-disabled`) |
| Shortcut    | `#aaaaaa` (`--text-disabled`) |

> disabled 내부 요소 색상은 vanilla-extract `selectors`로 부모 상태를 참조할 수 없으므로
> `globalStyle`으로 처리: `globalStyle('[data-disabled] .itemDescription', { color: 'var(--text-disabled)' })`

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `.dark` 클래스 적용 시 자동 전환.

### MenuContent (Dark)

| 요소   | 색상                                     |
| ------ | ---------------------------------------- |
| 배경   | `#333333` (`--menu-surface`)             |
| 테두리 | `1px solid #555555` (`--border-default`) |
| 그림자 | 동일 (navy 알파, 라이트/다크 공통)       |

### MenuItem (Dark)

| 상태         | 배경               | 텍스트                                |
| ------------ | ------------------ | ------------------------------------- |
| **Enabled**  | `#333333`          | `#dddddd`                             |
| **Hovered**  | `#444444`          | `#dddddd`                             |
| **Pressed**  | `#3c3c3c`          | `#dddddd`                             |
| **Focused**  | `#333333` **유지** | `#dddddd` + `inset 0 0 0 2px var(--accent-400)` |
| **Selected** | `var(--accent-900)`          | `var(--accent-200)`                             |
| **Disabled** | `transparent`      | `#757575`                             |

### Item 내부 요소 (Dark)

| 요소                   | 색상                           |
| ---------------------- | ------------------------------ |
| Description / Shortcut | `#8f8f8f` (`--text-subtler`)   |
| Selected check         | `var(--accent-400)` (`--text-primary`)   |
| Submenu chevron        | `#dddddd` (`--text`)           |
| Section header         | `#aaaaaa` (`--text-subtle`)    |
| Divider                | `#555555` (`--border-default`) |
| Focus 링               | `var(--accent-400)` (`--border-primary`) |

---

## 9. 타이포그래피

폰트: **Pretendard** (`var(--font-sans)`)

| 역할               | 토큰            | 크기 | 행간 | 굵기           |
| ------------------ | --------------- | ---- | ---- | -------------- |
| **Label**          | `--text-body2`  | 14px | 20px | 400 (Regular)  |
| **Description**    | `--text-body3`  | 12px | 16px | 400 (Regular)  |
| **Shortcut**       | `--text-body2`  | 14px | 20px | 400 (Regular)  |
| **Section header** | `--text-title3` | 12px | 16px | 600 (SemiBold) |

> letter-spacing: 0 (모든 스타일 공통)

---

## 12. 디자인 토큰 정의 (CSS 변수)

### `:root` (라이트)

```css
:root {
  /* Menu 전용 */
  --menu-surface: #ffffff;
  --menu-item-hovered: #f8f8f8;
  --menu-item-pressed: #f4f4f4;
  --menu-item-selected: var(--accent-50);
  --menu-shadow:
    0 4px 6px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31);

  /* Semantic */
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-subtler: #757575;
  --text-disabled: #aaaaaa;
  --text-primary: var(--accent-500);
  --border-default: #dddddd;
  --border-primary: var(--accent-500);

  /* Typography */
  --text-body2: 400 14px/20px var(--font-sans);
  --text-body3: 400 12px/16px var(--font-sans);
  --text-title3: 600 12px/16px var(--font-sans);

  /* Scrollbar */
  --scrollbar-thumb-fill: color-mix(in srgb, #555555 30%, transparent);
  --scrollbar-thumb-hover: color-mix(in srgb, #555555 55%, transparent);

  /* Font */
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  --menu-surface: #333333;
  --menu-item-hovered: #444444;
  --menu-item-pressed: #3c3c3c;
  --menu-item-selected: var(--accent-900);
  /* --menu-shadow: navy 알파, 공통(재정의 불필요) */

  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-subtler: #8f8f8f;
  --text-disabled: #757575;
  --text-primary: var(--accent-400);
  --border-default: #555555;
  --border-primary: var(--accent-400);

  --scrollbar-thumb-fill: color-mix(in srgb, #dddddd 30%, transparent);
  --scrollbar-thumb-hover: color-mix(in srgb, #dddddd 55%, transparent);

  /* Typography — 공통 */
}
```

---

