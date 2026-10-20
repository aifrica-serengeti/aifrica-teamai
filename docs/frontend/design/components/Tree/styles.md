# Tree — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](./README.md)

## 7. 색상 스펙

모든 색상은 semantic token으로만 구현한다. 아래 hex/rgba는 재현을 위한 실제 값이며,
컴포넌트 CSS에는 hex를 직접 넣지 않는다.

`transparent`는 토큰이 아닌 CSS 키워드이며 기본 행 배경에만 사용한다. `--action-default`는
Tree의 기본 상태 의존성이 아니다. hover/pressed overlay는 아래 action opacity 토큰을 사용한다.

### Light

| 요소/상태                      | 토큰                       | 실제 값                          |
| ------------------------------ | -------------------------- | -------------------------------- |
| Enabled 행 배경                | —                          | `transparent`                    |
| Hover 행 배경                  | `--action-opacity-hovered` | `rgba(0,0,0,0.05)` (`#0000000d`) |
| Pressed 행 배경                | `--action-opacity-pressed` | `rgba(0,0,0,0.1)` (`#0000001a`)  |
| Selected 행 배경               | `--surface-primary-subtle` | `var(--accent-50)`                        |
| Selected 좌측 2px 막대 / focus | `--border-primary`         | `var(--accent-500)`                        |
| 기본 text                      | `--text`                   | `#1c1c1c`                        |
| Disabled text                  | `--text-disabled`          | `#aaaaaa`                        |
| Connector                      | `--tree-connector`         | `#d5d5d5`                        |
| 기본 icon / marker             | `--icon`                   | `#1c1c1c`                        |
| Disabled icon / marker         | `--icon-disabled`          | `#aaaaaa`                        |

### Dark (`.dark`)

| 요소/상태                      | 토큰                       | 실제 값                                |
| ------------------------------ | -------------------------- | -------------------------------------- |
| Enabled 행 배경                | —                          | `transparent`                          |
| Hover 행 배경                  | `--action-opacity-hovered` | `rgba(255,255,255,0.08)` (`#ffffff14`) |
| Pressed 행 배경                | `--action-opacity-pressed` | `rgba(255,255,255,0.2)` (`#ffffff33`)  |
| Selected 행 배경               | `--surface-primary-subtle` | `var(--accent-900)`                              |
| Selected 좌측 2px 막대 / focus | `--border-primary`         | `var(--accent-400)`                              |
| 기본 text                      | `--text`                   | `#dddddd`                              |
| Disabled text                  | `--text-disabled`          | `#757575`                              |
| Connector                      | `--tree-connector`         | `#626262`                              |
| 기본 icon / marker             | `--icon`                   | `#dddddd`                              |
| Disabled icon / marker         | `--icon-disabled`          | `#555555`                              |

## 9. 타이포그래피

| 역할       | 토큰           | 실제 값                                            |
| ---------- | -------------- | -------------------------------------------------- |
| Node label | `--text-body2` | Pretendard 400, 14px / 20px                        |
| 기본 폰트  | `--font-sans`  | `Pretendard, system-ui, -apple-system, sans-serif` |

label은 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`다. 긴 파일명은 한 줄 말줄임으로
처리하고, 행 높이 또는 connector 위치를 바꾸지 않는다.

## 13. 디자인 토큰 정의

Tree 재현에 필요한 최소 토큰이다. 기존 design system이 있다면 같은 semantic 이름에 아래 값으로
매핑한다. Tree CSS에는 아래 변수만 사용한다.

```css
:root {
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
  --text-body2: 400 14px/20px var(--font-sans);

  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-subtler: #757575;
  --text-disabled: #aaaaaa;
  --color-gray-400: #aaaaaa;
  --surface: #ffffff;
  --surface-hover: #f8f8f8;
  --surface-pressed: #f4f4f4;
  --surface-primary-subtle: var(--accent-50);
  --border-default: #dddddd;
  --border-subtle: #eeeeee;
  --border-bolder: #1c1c1c;
  --border-primary: var(--accent-500);
  --border-disabled-subtle: #aaaaaa;
  --border-disabled-fill: #dddddd;
  --tree-connector: color-mix(
    in srgb,
    var(--border-default) 85%,
    var(--color-gray-400)
  ); /* #d5d5d5 */
  --element-default: #ffffff;
  --element-primary: var(--accent-500);
  --element-on-primary: var(--solution-on-primary);
  --element-disabled: #eeeeee;
  --action-opacity-hovered: rgba(0, 0, 0, 0.05);
  --action-opacity-pressed: rgba(0, 0, 0, 0.1);
  --icon: #1c1c1c;
  --icon-disabled: #aaaaaa;
  --icon-btn-outlined-border: rgba(0, 0, 0, 0.1);
  --icon-btn-hover-bg: rgba(0, 0, 0, 0.05);
  --icon-btn-pressed-bg: rgba(0, 0, 0, 0.1);
  --icon-btn-focus-border: var(--accent-500);
}

.dark {
  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-subtler: #8f8f8f;
  --text-disabled: #757575;
  --surface: #1c1c1c;
  --surface-hover: #333333;
  --surface-pressed: #555555;
  --surface-primary-subtle: var(--accent-900);
  --border-default: #555555;
  --border-subtle: #333333;
  --border-bolder: #555555;
  --border-primary: var(--accent-400);
  --border-disabled-subtle: #333333;
  --border-disabled-fill: #555555;
  --tree-connector: color-mix(
    in srgb,
    var(--border-default) 85%,
    var(--color-gray-400)
  ); /* #626262 */
  --element-default: color-mix(in srgb, #000000 20%, transparent);
  --element-primary: var(--accent-400);
  --element-on-primary: var(--solution-on-primary);
  --element-disabled: color-mix(in srgb, #ffffff 10%, transparent);
  --action-opacity-hovered: rgba(255, 255, 255, 0.08);
  --action-opacity-pressed: rgba(255, 255, 255, 0.2);
  --icon: #dddddd;
  --icon-disabled: #555555;
  --icon-btn-outlined-border: rgba(255, 255, 255, 0.1);
  --icon-btn-hover-bg: rgba(255, 255, 255, 0.05);
  --icon-btn-pressed-bg: rgba(255, 255, 255, 0.1);
  --icon-btn-focus-border: var(--accent-500);
}
```

