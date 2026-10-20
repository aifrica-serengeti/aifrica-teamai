# Date Picker — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Date Picker 문서 인덱스](./README.md)

월 선택도 동일한 Input 크기·schedule 아이콘·Popover 정렬과 Calendar 4×3 grid를 사용한다.
`YYYY.MM.DD` 표시 폭과 288px Calendar 너비를 유지하며, 월 전용 field 크기나 색상은 추가하지 않는다.

일자 popup은 빈 주 없이 콘텐츠 높이를 사용한다. 솔루션 calendar 정책이 강조하도록 지정한
휴일·일요일의 기본/오늘 텍스트는 Calendar의 `--text-danger`를 재사용하고, 선택된 날짜는
솔루션의 `--cal-selected-fill`·`--text-on-primary`를 유지한다. popup 하단의 기본 padding은 유지한다.

Popover Content는 Select/Timepicker와 같은 공용 floating layer `z-index: 50`을 사용한다.
Dialog 본체(50)보다 뒤에 생성되는 body Portal의 DOM 순서로 본문·scrim(40) 위에 표시한다.
Dialog의 overflow를 해제하거나 페이지 전용 z-index를 덧씌우지 않는다. 기존 8px offset·12px 충돌 여백은 유지한다.

Content에 `box-shadow: var(--menu-shadow)`를 적용하고 팝업 안에서는 `--cal-shadow: none`으로
중복 그림자를 제거한다. 공용 ScrollArea의 overflow가 그림자를 자르지 않도록 바깥 Content가 소유한다.
기존 Calendar 그림자의 1px spread 외곽 링을 Menu의 부드러운 그림자로 바꾸되, Calendar의 1px 기본 border·8px radius·288px 너비와
내부 색상·구분선·focus ring은 유지한다. 독립 Calendar와 전역 `--cal-shadow` 값은 변경하지 않는다.
Menu의 `--menu-shadow` 토큰이 필요하며 light/dark 모두 같은 참조를 사용한다.
Content의 모션은 150ms ease·opacity·세로 6px 이동이며 transform origin은
`--radix-popover-content-transform-origin`이다. 모션 감소 설정에서는 `animation: none`이다.
Content와 공용 ScrollArea viewport는 `--radix-popover-content-available-height`를 최대 높이로
사용한다. ScrollArea의 padding·border는 0, 배경은 transparent이며 기본 4px overlay thumb를 재사용한다.

## 6. 색상 스펙

### Light

| 요소 / 상태                                | 색상                                                |
| ------------------------------------------ | --------------------------------------------------- |
| Enabled surface                            | `#ffffff` (`--form-surface-active`)                 |
| Create surface, Disabled/Read-only surface | `#f8f8f8` (`--form-surface-inactive`)               |
| Create + Read-only surface                 | `#ffffff` (`--form-create-surface-readonly`)        |
| Default border                             | `1px solid #dddddd` (`--form-border-default`)       |
| Focus border / inset ring                  | `var(--accent-500)` (`--form-border-active`)                  |
| Invalid border / inset ring                | `#e81919` (`--form-border-invalid`)                 |
| Input value                                | `#1c1c1c` (`--form-text`)                           |
| Enabled placeholder                        | `#8f8f8f` (`--form-placeholder-active`)             |
| Disabled placeholder                       | `#aaaaaa` (`--form-placeholder-inactive`)           |
| Disabled value / label / help              | `#aaaaaa` (`--text-disabled`)                       |
| Range divider                              | `#555555` (`--border-inverse`)                      |
| Disabled range divider                     | `#aaaaaa` (`--form-placeholder-inactive`)           |
| Error text                                 | `#d00a0a` (`--text-error`)                          |
| Label / optional / required / help         | `#1c1c1c` / `#757575` / `#e81919` / `#555555`       |
| Enabled / disabled calendar icon           | `#1c1c1c` / `#aaaaaa` (`--icon`, `--icon-disabled`) |

Focus와 Invalid는 layout이 밀리지 않게 border width는 1px로 유지하고
`inset 0 0 0 1px` shadow를 추가해 시각적으로 2px로 보이게 한다.

### Dark

| 요소 / 상태                          | 색상                                   |
| ------------------------------------ | -------------------------------------- |
| Enabled/Disabled/Read-only surface   | `rgba(255,255,255,0.08)` = `#ffffff14` |
| Create + Read-only surface           | transparent (`#00000000`)              |
| Default border                       | `#555555`                              |
| Focus border / inset ring            | `var(--accent-400)`                              |
| Invalid border / inset ring          | `#f52424`                              |
| Input value / label                  | `#dddddd`                              |
| Enabled placeholder                  | `#8f8f8f`                              |
| Disabled placeholder / disabled text | `#757575`                              |
| Help / optional / required           | `#aaaaaa` / `#8f8f8f` / `#f52424`      |
| Error text                           | `#fec3c3`                              |
| Range divider                        | `#555555`                              |
| Enabled / disabled calendar icon     | `#dddddd` / `#555555`                  |

## 10. 필요한 토큰 CSS

새 프로젝트에서 아래 semantic token을 정의하면 Date Picker의 light/dark 색상이 동일하게 동작한다.

```css
:root {
  --font-sans: "Pretendard", system-ui, -apple-system, sans-serif;
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-subtler: #757575;
  --text-disabled: #aaaaaa;
  --text-danger: #e81919;
  --text-error: #d00a0a;
  --icon: #1c1c1c;
  --icon-disabled: #aaaaaa;
  --border-inverse: #555555;

  --form-text: #1c1c1c;
  --form-surface-active: #ffffff;
  --form-surface-inactive: #f8f8f8;
  --form-create-surface-readonly: #ffffff;
  --form-border-default: #dddddd;
  --form-border-active: var(--accent-500);
  --form-border-invalid: #e81919;
  --form-placeholder-active: #8f8f8f;
  --form-placeholder-inactive: #aaaaaa;
}

.dark {
  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-subtler: #8f8f8f;
  --text-disabled: #757575;
  --text-danger: #f52424;
  --text-error: #fec3c3;
  --icon: #dddddd;
  --icon-disabled: #555555;
  --border-inverse: #555555;

  --form-text: #dddddd;
  --form-surface-active: rgba(255, 255, 255, 0.08);
  --form-surface-inactive: rgba(255, 255, 255, 0.08);
  --form-create-surface-readonly: transparent;
  --form-border-default: #555555;
  --form-border-active: var(--accent-400);
  --form-border-invalid: #f52424;
  --form-placeholder-active: #8f8f8f;
  --form-placeholder-inactive: #757575;
}
```

Calendar 자체는 [Calendar/README.md](../Calendar/README.md)의 `--cal-*` token과 shadow를 추가로 필요로 한다.
