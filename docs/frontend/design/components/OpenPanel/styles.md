# Open panel — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명은 토큰 체계를 따르며, 괄호 안의
hex 값이 실제 색이다.

### 패널 본체

| 요소            | 색상                                                  |
| --------------- | ----------------------------------------------------- |
| 배경            | `#ffffff` (`--surface`)                               |
| 본문 텍스트     | `#1c1c1c` (`--text`)                                  |
| 테두리(해당 변) | `1px solid #dddddd` (`--border-default`)              |
| 그림자(Overlay) | `0 8px 24px rgba(0,0,0,0.08)` (`--elevation-overlay`) |

### Scrim (Overlay 타입만)

| 요소 | 색상                                               |
| ---- | -------------------------------------------------- |
| 배경 | `rgba(0, 0, 0, 0.25)` — 고정값(semantic 토큰 아님) |

### Header

| 요소         | 색상                                                   |
| ------------ | ------------------------------------------------------ |
| 배경         | `#ffffff` (`--surface`) — 본체와 동일                  |
| 하단 테두리  | `1px solid #eeeeee` (`--border-subtle`)                |
| Title 텍스트 | `#1c1c1c` (`--text`)                                   |
| Leading icon | `#1c1c1c` (`--icon`) — Icon 컴포넌트 `color="default"` |
| 닫기 icon    | `#1c1c1c` (`--icon`) — Icon Button 기본색              |

### Resize line

| 상태              | 색상                           |
| ----------------- | ------------------------------ |
| 기본              | `#dddddd` (`--border-default`) |
| Hover             | `#aaaaaa` (`--border-bold`)    |
| Active(드래그 중) | `#1c1c1c` (`--icon`)           |

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 컨테이너에 `.dark` 클래스 적용 시 전환. semantic 토큰이 자동으로 다크 값으로
매핑된다.

### 패널 본체 (Dark)

| 요소            | 색상                                              |
| --------------- | ------------------------------------------------- |
| 배경            | `#1c1c1c` (`--surface`)                           |
| 본문 텍스트     | `#dddddd` (`--text`)                              |
| 테두리(해당 변) | `1px solid #555555` (`--border-default`)          |
| 그림자(Overlay) | `0 8px 24px rgba(0,0,0,0.08)` (동일 — alpha 기반) |

### Scrim (Dark)

| 요소 | 색상                                 |
| ---- | ------------------------------------ |
| 배경 | `rgba(0, 0, 0, 0.25)` — 고정값(동일) |

### Header (Dark)

| 요소         | 색상                                    |
| ------------ | --------------------------------------- |
| 하단 테두리  | `1px solid #333333` (`--border-subtle`) |
| Title 텍스트 | `#dddddd` (`--text`)                    |
| Leading icon | `#dddddd` (`--icon`)                    |
| 닫기 icon    | `#dddddd` (`--icon`)                    |

### Resize line (Dark)

| 상태   | 색상                           |
| ------ | ------------------------------ |
| 기본   | `#555555` (`--border-default`) |
| Hover  | `#555555` (`--border-bold`)    |
| Active | `#dddddd` (`--icon`)           |

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**

| 역할               | 크기                      | 행간 | 굵기                       |
| ------------------ | ------------------------- | ---- | -------------------------- |
| **Title** (Header) | 20px                      | 24px | 600 (SemiBold) — Headline3 |
| Body 콘텐츠        | 상속 (기본 16px/24px/400) | —    | —                          |

> Title 은 `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap` 으로
> 길면 말줄임 처리한다.

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.
(hex 직접 하드코딩 금지.)

### `:root` (라이트)

```css
:root {
  /* Text */
  --text: #1c1c1c;

  /* Surface */
  --surface: #ffffff;

  /* Border */
  --border-default: #dddddd;
  --border-subtle: #eeeeee;
  --border-bold: #aaaaaa;

  /* Icon */
  --icon: #1c1c1c;

  /* Elevation */
  --elevation-overlay: 0 8px 24px 0 rgba(0, 0, 0, 0.08);

  /* Scrollbar */
  --scrollbar-thumb-fill: color-mix(in srgb, #555555 30%, transparent);
  --scrollbar-thumb-hover: color-mix(in srgb, #555555 55%, transparent);

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  /* Text */
  --text: #dddddd;

  /* Surface */
  --surface: #1c1c1c;

  /* Border */
  --border-default: #555555;
  --border-subtle: #333333;
  --border-bold: #555555;

  /* Icon */
  --icon: #dddddd;

  /* Elevation — alpha 기반이므로 동일 */
  --elevation-overlay: 0 8px 24px 0 rgba(0, 0, 0, 0.08);

  /* Scrollbar */
  --scrollbar-thumb-fill: color-mix(in srgb, #dddddd 30%, transparent);
  --scrollbar-thumb-hover: color-mix(in srgb, #dddddd 55%, transparent);
}
```

> Scrim(`rgba(0,0,0,0.25)`)은 라이트/다크 공통 고정값이다 — semantic 토큰으로 매핑하지 않는다.

---

