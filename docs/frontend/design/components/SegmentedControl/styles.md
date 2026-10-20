# Segmented Control — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](./README.md)

## 6. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명(`--text` 등)은 토큰 체계를 따르며,
괄호 안의 hex 값이 실제 색이다.

### Item 상태

| 상태                                   | 배경 (background)                  | 테두리 (border)                          | 텍스트·아이콘 (color)         |
| -------------------------------------- | ---------------------------------- | ---------------------------------------- | ----------------------------- |
| **Selected · Enabled**                 | `#ffffff` (`--action-default`)     | `1px solid #aaaaaa` (`--border-bold`)    | `#1c1c1c` (`--text`)          |
| **Unselected · Enabled**               | 투명 (컨테이너 회색 비침)          | `1px solid transparent`                  | `#555555` (`--text-subtle`)   |
| **Unselected · Hovered**               | 투명 + `rgba(0,0,0,0.05)` 오버레이 | 동일                                     | 동일                          |
| **Unselected · Pressed**               | 투명 + `rgba(0,0,0,0.1)` 오버레이  | 동일                                     | 동일                          |
| **Focused** (selected/unselected 공통) | 유지                               | `transparent`                            | 유지                          |
| **Selected · Disabled**                | `#ffffff` (`--action-default`)     | `1px solid #dddddd` (`--border-default`) | `#aaaaaa` (`--text-disabled`) |
| **Unselected · Disabled**              | 투명                               | `1px solid transparent`                  | `#aaaaaa` (`--text-disabled`) |

**핵심 규칙:**

- **Selected 는 흰 배경 + 회색 테두리(#aaa)**. 솔루션 primary 색상이 아니다. 컨테이너 회색 위에
  흰색이 올라가 selected 를 강조하는 구조다.
- **Hovered/Pressed 오버레이는 unselected 에만** 적용. selected 는 이미 강조 상태이므로
  hover/pressed 시 변화 없다.
- **오버레이 방식**: `box-shadow: inset 0 0 0 9999px <오버레이색>` — base 배경을 보존하면서
  반투명하게 덮는다. 다크 모드에서도 동일 로직이 작동한다.
- **Disabled + Selected**: 배경은 흰색 유지, 테두리만 더 연한 회색(#ddd)으로.

### Focused (Focus-visible)

| 항목      | 스펙                                                                       |
| --------- | -------------------------------------------------------------------------- |
| 표현      | `box-shadow: inset 0 0 0 2px var(--border-primary)` — **inset box-shadow** |
| 색상      | `var(--accent-500)` (`--border-primary`, accent-500)                                   |
| border    | `transparent` (focus 시 회색 border 숨김 — 이중선 방지)                    |
| z-index   | `1` (다른 item 위로)                                                       |
| 배경 변화 | 없음 (pressed 오버레이 미적용)                                             |

> **왜 inset box-shadow 인가**: (1) `border-width` 를 바꾸면 박스 크기가 변해 width 점핑이 발생한다.
> box-shadow 는 레이아웃에 영향 없다. (2) `outline` 은 컨테이너의 `overflow: hidden` /
> `border-radius` 에 잘린다. inset box-shadow 는 요소 내부에 그려지므로 잘리지 않는다.
> (3) border 를 `transparent` 로 바꿔 회색 border 와 focus accent 링의 이중선을 방지한다.

### 컨테이너 / 라벨 / 도움말 색상

| 요소                      | 색상                                                       |
| ------------------------- | ---------------------------------------------------------- |
| Item list 컨테이너 배경   | `#f4f4f4` (`--surface-default-subtler`)                    |
| Item list 컨테이너 테두리 | `#dddddd` (`--border-default`)                             |
| Group Label               | `#1c1c1c` (`--text`)                                       |
| Info 아이콘               | `#555555` (`--icon-subtle`), hover 시 `#1c1c1c` (`--icon`) |
| Help text                 | `#555555` (`--text-subtle`)                                |

---

## 7. 색상 스펙 — 다크 모드

다크 모드는 컨테이너에 `.dark` 클래스 적용 시 전환. semantic 토큰이 자동으로 다크 값으로 매핑된다.

### Item 상태 (Dark)

| 상태                     | 배경 (background)                        | 테두리 (border)                       | 텍스트·아이콘 (color)         |
| ------------------------ | ---------------------------------------- | ------------------------------------- | ----------------------------- |
| **Selected · Enabled**   | `#333333` (`--action-default`)           | `1px solid #555555` (`--border-bold`) | `#dddddd` (`--text`)          |
| **Unselected · Enabled** | 투명                                     | `1px solid transparent`               | `#aaaaaa` (`--text-subtle`)   |
| **Unselected · Hovered** | 투명 + `rgba(255,255,255,0.08)` 오버레이 | 동일                                  | 동일                          |
| **Unselected · Pressed** | 투명 + `rgba(255,255,255,0.2)` 오버레이  | 동일                                  | 동일                          |
| **Focused**              | 유지                                     | `transparent`                         | 유지                          |
| **Selected · Disabled**  | `#333333`                                | `1px solid #555555`                   | `#757575` (`--text-disabled`) |

> 다크에서는 selected 배경이 더 밝은 표면(#333), hover/pressed 오버레이가 흰 알파로 전환되어
> 밝아진다.

### Focused (Dark)

| 항목 | 값                                                            |
| ---- | ------------------------------------------------------------- |
| 색상 | `var(--accent-400)` (`--border-primary`, accent-400 — 라이트보다 더 밝음) |

### 컨테이너 / 라벨 (Dark)

| 요소                      | 색상                                    |
| ------------------------- | --------------------------------------- |
| Item list 컨테이너 배경   | `#333333` (`--surface-default-subtler`) |
| Item list 컨테이너 테두리 | `#555555` (`--border-default`)          |
| Group Label               | `#dddddd` (`--text`)                    |
| Info 아이콘               | `#aaaaaa` (`--icon-subtle`)             |
| Help text                 | `#aaaaaa` (`--text-subtle`)             |

---

## 9. 타이포그래피

폰트 패밀리: **Pretendard** (모든 텍스트)

| 역할                        | 크기 | 행간 | 굵기               |
| --------------------------- | ---- | ---- | ------------------ |
| Group Label                 | 14px | 20px | 600 (SemiBold)     |
| **Item Label — Selected**   | 14px | 20px | **600 (SemiBold)** |
| **Item Label — Unselected** | 14px | 20px | **400 (Regular)**  |
| Help text                   | 12px | 16px | 400 (Regular)      |

### 너비 점핑 방지 (ghost 레이어 기법) — 핵심

Selected 와 Unselected 의 폰트 굵기가 다르므로(600 vs 400), 상태 전환 시 글리프 너비 차이로
아이템 너비가 흔들리는 **width 점핑** 이 발생한다.

**해결**: 각 라벨을 `inline-grid` 컨테이너 안에 두 개의 동일 텍스트로 겹친다:

1. **ghost** — 항상 `600`(SemiBold) 으로 렌더, `visibility: hidden`. **너비만 결정**.
2. **real** — 보이는 텍스트. 굵기는 상태(400/600)에 따라 변함.

아이템 너비는 항상 ghost(SemiBold) 기준으로 고정되므로, real 의 굵기가 변해도 전체 너비가 튀지 않는다.

```html
<span class="itemLabelWrap">
  <!-- inline-grid, grid-area: "label" -->
  <span class="itemLabelGhost">Label</span>
  <!-- SemiBold, hidden, 너비 고정 -->
  <span class="itemLabelReal">Label</span>
  <!-- 보이는 텍스트, 굵기는 상태별 -->
</span>
```

---

## 12. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.
(hex 직접 하드코딩 금지.)

### `:root` (라이트)

```css
:root {
  /* Text */
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-disabled: #aaaaaa;

  /* Surface */
  --surface-default-subtler: #f4f4f4;

  /* Action — selected item 채움색 + hover/pressed 오버레이 */
  --action-default: #ffffff;
  --action-opacity-hovered: rgba(0, 0, 0, 0.05); /* #0000000d */
  --action-opacity-pressed: rgba(0, 0, 0, 0.1); /* #0000001a */

  /* Border */
  --border-default: #dddddd;
  --border-bold: #aaaaaa; /* selected item 테두리 (bolder #1c1c1c 와 다름) */
  --border-primary: var(--accent-500); /* focus 링 */

  /* Icon */
  --icon: #1c1c1c;
  --icon-subtle: #555555;

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Text */
  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-disabled: #757575;

  /* Surface */
  --surface-default-subtler: #333333;

  /* Action */
  --action-default: #333333;
  --action-opacity-hovered: rgba(255, 255, 255, 0.08); /* #ffffff14 */
  --action-opacity-pressed: rgba(255, 255, 255, 0.2); /* #ffffff33 */

  /* Border */
  --border-default: #555555;
  --border-bold: #555555;
  --border-primary: var(--accent-400); /* 다크에서 더 밝은 accent-400 */

  /* Icon */
  --icon: #dddddd;
  --icon-subtle: #aaaaaa;
}
```

---

