# Notification — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

### Inline surface와 accent

| State   | surface                                | accent / border                | Status icon                   |
| ------- | -------------------------------------- | ------------------------------ | ----------------------------- |
| Info    | `var(--accent-50)` (`--surface-primary-subtle`) | `var(--accent-500)` (`--border-primary`) | `var(--accent-500)`                     |
| Success | `#e9fbf2` (`--surface-success-subtle`) | `#05a85a` (`--border-success`) | `#05a85a`                     |
| Warning | `#fffaea` (`--surface-warning-subtle`) | `#f0bb00` (`--border-warning`) | `#f0bb00`                     |
| Error   | `#fff0f0` (`--surface-danger-subtle`)  | `#d00a0a` (`--border-error`)   | `#d00a0a`                     |
| Loading | `var(--accent-50)`                              | `var(--accent-500)`                      | Status `inProgress` (Spinner) |

### Floating 타입과 텍스트

| 요소                           | 값                                                                         |
| ------------------------------ | -------------------------------------------------------------------------- |
| Toast/Actionable/Linkable 배경 | `#ffffff` (`--notification-floating-surface`, Figma `surface/default-mid`) |
| Floating 테두리                | `1px solid #eeeeee` (`--border-subtle`)                                    |
| title/Inline 본문              | `#1c1c1c` (`--text`)                                                       |
| floating 본문                  | `#555555` (`--text-subtle`)                                                |
| Link                           | `var(--accent-500)` (`--text-link`)                                                  |
| clear control 배경             | `#ffffff` (`--notification-clear-surface`, Figma `action/default`)         |
| Inline raised shadow           | `0 1px 1px rgba(9,30,66,.1), 0 0 1px rgba(9,30,66,.31)`                    |
| Floating mid shadow            | `0 4px 6px rgba(9,30,66,.15), 0 0 1px rgba(9,30,66,.31)`                   |

## 6. 색상 스펙 — 다크 모드

`.dark`에서 semantic 토큰과 Notification 전용 토큰을 전환한다. 일반 `--surface`
(`#1c1c1c`)를 Toast 배경으로 쓰면 안 된다. Figma의 floating surface는 별도 `#333333`이다.

| State/요소                            | 값                                                               |
| ------------------------------------- | ---------------------------------------------------------------- |
| Inline Info/Loading surface           | `var(--accent-900)` (`--surface-primary-subtle`)                           |
| Inline Success surface                | `#023b20` (`--surface-success-subtle`)                           |
| Inline Warning surface                | `#6f4a01` (`--surface-warning-subtle`)                           |
| Inline Error surface                  | `#730303` (`--surface-danger-subtle` → `--color-red-1000`)       |
| Info accent                           | `var(--accent-400)` (`--border-primary`)                                   |
| Success accent                        | `#05a85a` (`--border-success`)                                   |
| Warning accent                        | `#f0bb00` (`--border-warning`)                                   |
| Error accent                          | `#e81919` (`--border-error`)                                     |
| Toast/Actionable/Linkable 배경·테두리 | `#333333` (`--notification-floating-surface`, `--border-subtle`) |
| title/Inline 본문                     | `#dddddd` (`--text`)                                             |
| floating 본문                         | `#aaaaaa` (`--text-subtle`)                                      |
| Link                                  | `var(--accent-400)` (`--text-link`)                                        |
| clear control 배경                    | `#282828` (`--notification-clear-surface`)                       |

## 10. 디자인 토큰 정의

아래 CSS만으로 이 컴포넌트가 소비하는 색상·그림자 토큰을 재현할 수 있다.

```css
:root {
  --color-white: #ffffff;
  --color-gray-200: #eeeeee;
  --color-gray-700: #555555;
  --color-gray-800: #333333;
  --color-gray-900: #1c1c1c;
  --color-blue-50: #ebf3ff; /* named raw palette baseline */
  --color-blue-400: #3384ff; /* named raw palette baseline */
  --color-blue-500: #0066ff; /* named raw palette baseline */
  --color-blue-900: #00255c; /* named raw palette baseline */
  --color-green-50: #e9fbf2;
  --color-green-500: #06ce6e;
  --color-green-600: #05a85a;
  --color-green-900: #023b20;
  --color-yellow-50: #fffaea;
  --color-yellow-500: #f0bb00;
  --color-yellow-900: #6f4a01;
  --color-red-50: #fff0f0;
  --color-red-600: #e81919;
  --color-red-700: #d00a0a;
  --color-red-1000: #730303;

  --radius-sm: 4px;
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
  --text-title2: 600 14px/20px var(--font-sans);
  --text-body2: 400 14px/20px var(--font-sans);
  --text: var(--color-gray-900);
  --text-subtle: var(--color-gray-700);
  --text-link: var(--accent-500);
  --surface: var(--color-white);
  --surface-primary-subtle: var(--accent-50);
  --surface-success-subtle: var(--color-green-50);
  --surface-warning-subtle: var(--color-yellow-50);
  --surface-danger-subtle: var(--color-red-50);
  --border-subtle: var(--color-gray-200);
  --border-primary: var(--accent-500);
  --border-success: var(--color-green-600);
  --border-warning: var(--color-yellow-500);
  --border-error: var(--color-red-700);

  --notification-floating-surface: var(--color-white);
  --notification-clear-surface: var(--color-white);
  --notification-inline-shadow:
    0 1px 1px 0 rgba(9, 30, 66, 0.1), 0 0 1px 0 rgba(9, 30, 66, 0.31);
  --notification-floating-shadow:
    0 4px 6px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31);
  --notification-clear-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
}

.dark {
  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-link: var(--accent-400);
  --surface: #1c1c1c;
  --surface-primary-subtle: var(--accent-900);
  --surface-success-subtle: var(--color-green-900);
  --surface-warning-subtle: var(--color-yellow-900);
  --surface-danger-subtle: var(--color-red-1000);
  --border-subtle: var(--color-gray-800);
  --border-primary: var(--accent-400);
  --border-success: var(--color-green-600);
  --border-warning: var(--color-yellow-500);
  --border-error: var(--color-red-600);
  --notification-floating-surface: var(--color-gray-800);
  --notification-clear-surface: #282828;
}
```

Actionable 자동 닫기는 기존 floating 배치와 exit animation을 재사용하며 크기·색·간격은 변경하지 않는다.

제목의 기본 스타일은 `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`이다.
root가 `data-title-overflow="wrap"`이면 제목에 `overflow: visible; text-overflow: clip;
white-space: normal; overflow-wrap: anywhere`를 적용한다. 호출부 CSS에서 Notification 내부 element를
직접 선택해 이 계약을 덮어쓰지 않는다. Inline은 같은 opt-in 상태에서 content를
`height: auto; min-height: 40px`로 전환해 root의 `overflow: hidden` 안에서 줄바꿈이 잘리지 않게 한다.

### 제품 공용 viewport

Provider는 `position:fixed; top:0; right:0; z-index:60`으로 Dialog 위에서 오류를 표시한다.
392×500의 기본 스택을 viewport에 맞게 제한하고, 이 범위 안에서만 Notification의 `min-width`를 0으로
덮어쓴다. content padding 16px·gap 12px·light/dark 토큰·motion은 기존 primitive를 재사용한다.
Provider 밖 스펙 전시는 기존 고정 폭이다. 페이지별 toastContainer 스타일은 두지 않는다.

### 공용 스택의 스크롤과 복구

공용 viewport 내부 `[data-slot="scroll-container"]`에 `overscroll-behavior: contain`과 `overflow-anchor: none`을 적용한다. 알림 영역의 스크롤이 배경으로 이어지거나 최신 항목 삽입 때문에 위치가 바뀌지 않게 한다. 독립 ScrollArea의 기본 CSS는 유지한다.
