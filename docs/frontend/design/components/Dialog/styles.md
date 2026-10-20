# Dialog — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](./README.md)

## 6. 색상 스펙 — 라이트 모드

**모든 색상값을 그대로 사용한다.** 토큰 변수명은 토큰 체계를 따르며, 괄호 안의
hex 값이 실제 색이다. Figma `get_variable_defs` 검증 완료.

### Dialog 본체

| 요소        | 색상                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| 배경        | `#ffffff` (`--surface`)                                                             |
| 본문 텍스트 | `#1c1c1c` (`--text`)                                                                |
| 테두리      | `1px solid #dddddd` (`--border-default`)                                            |
| 그림자      | `0 8px 12px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)` (`--dialog-shadow`) |

Nested Select Content가 Dialog Content를 portal container로 사용할 때만 root `overflow`를
노출한다. Body와 공용 ScrollArea의 clipping은 그대로 유지해 card geometry는 변하지 않는다.

### Scrim

| 요소 | 색상                                               |
| ---- | -------------------------------------------------- |
| 배경 | `rgba(0, 0, 0, 0.25)` — 고정값(semantic 토큰 아님) |

### Header

| 요소         | 색상                                      |
| ------------ | ----------------------------------------- |
| 배경         | `#ffffff` (`--surface`) — 본체와 동일     |
| Title 텍스트 | `#1c1c1c` (`--text`)                      |
| 닫기 icon    | `#1c1c1c` (`--icon`) — Icon Button 기본색 |

### Body

| 요소               | 색상                                                                       |
| ------------------ | -------------------------------------------------------------------------- |
| Description 텍스트 | `#555555` (`--text-subtle`)                                                |
| 스크롤 border      | `#dddddd` (`--border-default`)                                             |
| 스크롤 thumb       | `color-mix(in srgb, #555555 30%, transparent)` (`--scrollbar-thumb-fill`)  |
| 스크롤 thumb hover | `color-mix(in srgb, #555555 55%, transparent)` (`--scrollbar-thumb-hover`) |
| fade gradient      | `--surface`(#ffffff) → transparent                                         |
| subtle fade        | 동일 gradient, 표시 상태 opacity 50%                                       |

### Footer

| 요소             | 색상                                  |
| ---------------- | ------------------------------------- |
| 배경             | `#ffffff` (`--surface`) — 본체와 동일 |
| 취소 버튼 텍스트 | `#1c1c1c` (`--btn-on-tertiary`)       |
| 확인 버튼 배경   | `var(--accent-600)` (`--btn-primary-fill`)      |
| 확인 버튼 텍스트 | `#ffffff` (`--btn-on-primary`)        |

### Confirmation profile

- Small과 `profile="confirmation"`은 모두 400px geometry와 같은 surface, border, shadow, padding token을 사용한다. 별도 색상이나
  더 강한 그림자를 추가하지 않는다.
- 생성·저장·수락·승인·동기화처럼 일반 결과 action은 primary Button을 사용한다.
- 삭제·권한 박탈처럼 되돌리기 어렵거나 위험한 결과 action은 negative Button을 사용한다. 거절·취소는
  실제 영향과 복구 가능성에 따라 page policy가 tone을 결정하며, 단어만으로 danger를 추측하지 않는다.
- description은 한 줄 권장·최대 두 줄이며 빈 문자열이나 빈 native wrapper를 렌더하지 않는다.
- tone이나 pending 상태가 바뀌어도 Dialog 너비는 **400px**로 유지한다.

---

## 7. 색상 스펙 — 다크 모드

다크 모드는 컨테이너에 `.dark` 클래스 적용 시 전환. semantic 토큰이 자동으로 다크 값으로
매핑된다.

### Dialog 본체 (Dark)

| 요소        | 색상                                          |
| ----------- | --------------------------------------------- |
| 배경        | `#1c1c1c` (`--surface`)                       |
| 본문 텍스트 | `#dddddd` (`--text`)                          |
| 테두리      | `1px solid #555555` (`--border-default`)      |
| 그림자      | 동일 — navy alpha 기반이므로 라이트/다크 공통 |

### Scrim (Dark)

| 요소 | 색상                                 |
| ---- | ------------------------------------ |
| 배경 | `rgba(0, 0, 0, 0.25)` — 고정값(동일) |

### Header (Dark)

| 요소         | 색상                 |
| ------------ | -------------------- |
| Title 텍스트 | `#dddddd` (`--text`) |
| 닫기 icon    | `#dddddd` (`--icon`) |

### Body (Dark)

| 요소               | 색상                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| Description 텍스트 | `#aaaaaa` (`--text-subtle`)                                               |
| 스크롤 border      | `#555555` (`--border-default`)                                            |
| 스크롤 thumb       | `color-mix(in srgb, #dddddd 30%, transparent)` (`--scrollbar-thumb-fill`) |
| fade gradient      | `--surface`(#1c1c1c) → transparent                                        |
| subtle fade        | 동일 gradient, 표시 상태 opacity 50%                                      |

### Footer (Dark)

| 요소             | 색상                                             |
| ---------------- | ------------------------------------------------ |
| 취소 버튼 텍스트 | `#dddddd` (`--btn-on-tertiary`)                  |
| 확인 버튼 배경   | `var(--accent-600)` (`--btn-primary-fill`) — 라이트와 동일 |
| 확인 버튼 텍스트 | `#ffffff` (`--btn-on-primary`)                   |

Confirmation profile도 같은 semantic token을 사용한다. negative 결과 action의 다크 모드 색상은
[Button](../Button/README.md)의 negative 계약에 위임한다.

---

## 9. 타이포그래피

폰트 패밀리: **Pretendard** (`--font-sans`)

| 역할                   | 토큰      | 크기 | 행간 | 굵기           |
| ---------------------- | --------- | ---- | ---- | -------------- |
| **Title** (Header)     | Headline3 | 20px | 24px | 600 (SemiBold) |
| **Description** (Body) | Body1     | 16px | 24px | 400 (Regular)  |
| Body 콘텐츠(Input 등)  | 상속      | —    | —    | —              |

> Title 은 `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap` 으로
> 길면 말줄임 처리한다. `flex: 1 1 0`, `min-width: 0`, `margin-right: 32px`로
> 닫기 버튼 공간을 먼저 확보하고 `padding-right: 8px`로 텍스트 간격을 유지한다.

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

  /* Surface */
  --surface: #ffffff;

  /* Border */
  --border-default: #dddddd;

  /* Icon */
  --icon: #1c1c1c;

  /* Dialog shadow — Figma "Overlay" effect. navy 톤 2단 드롭섀도우. */
  --dialog-shadow:
    0 8px 12px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31);

  /* Scrollbar — ScrollArea 컴포넌트와 공유 */
  --scrollbar-thumb-fill: color-mix(in srgb, #555555 30%, transparent);
  --scrollbar-thumb-hover: color-mix(in srgb, #555555 55%, transparent);

  /* Button — Footer 버튼 토큰 */
  --btn-primary-fill: var(--accent-600);
  --btn-on-primary: var(--solution-on-primary);
  --btn-on-tertiary: #1c1c1c;

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

  /* Surface */
  --surface: #1c1c1c;

  /* Border */
  --border-default: #555555;

  /* Icon */
  --icon: #dddddd;

  /* Dialog shadow — navy alpha 기반이므로 라이트/다크 공통 */
  --dialog-shadow:
    0 8px 12px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31);

  /* Scrollbar */
  --scrollbar-thumb-fill: color-mix(in srgb, #dddddd 30%, transparent);
  --scrollbar-thumb-hover: color-mix(in srgb, #dddddd 55%, transparent);

  /* Button — 다크에서도 동일(navy alpha 기반) */
  --btn-primary-fill: var(--accent-600);
  --btn-on-primary: var(--solution-on-primary);
  --btn-on-tertiary: #dddddd;
}
```

> Scrim(`rgba(0,0,0,0.25)`)은 라이트/다크 공통 고정값이다 — semantic 토큰으로 매핑하지 않는다.

---

## 공용 알림과의 상호작용

앱 공용 알림 layer는 60이다. Dialog scrim(40)·content(50)의 geometry와 색상은 바꾸지 않는다. 토스트는 Dialog transform/overflow 안에 넣지 않는다.

알림의 overscroll containment는 NotificationProvider 스타일이 소유한다. Dialog의 ScrollArea와 scrim 스타일에 알림 전용 규칙을 추가하지 않는다.
