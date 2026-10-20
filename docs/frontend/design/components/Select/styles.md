# Select — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

Multi 칩 영역은 한 줄의 가용 폭에 맞춰 앞쪽 칩과 `+N`을 표시한다. 검색 가능한 filled Multi는
검색 input에 64px을 남겨 칩이 입력 영역을 밀어내지 않게 한다. ResizeObserver로 폭·측정 행 변화를 감지한다.
option과 고정 전체 선택 행/divider는 축소되지 않고, 부족한 높이는 option ScrollArea만 줄어든다.
Multi는 size별 min-height와 auto height를 사용하며 readonly 값 색상은 일반 값 색상을 유지한다.

[← Select 문서 인덱스](./README.md)

Label/help/error의 ID와 ARIA 연결은 geometry와 token을 바꾸지 않는다. 오류 문구의 기존 invalid 색상과
4px field rhythm을 유지하면서 접근성 관계만 추가한다.

searchable Single의 선택 label은 placeholder 색을 사용하지 않는다. 실제 input `value`로 렌더링해
`--text`를 사용하며, 선택값이 없는 placeholder에만 `--form-placeholder-active` 또는 disabled 상태의
`--form-placeholder-inactive`를 적용한다.

`fullWidth`가 있으면 field의 standalone 320px을 `width: 100%; min-width: 0`으로 덮어 부모 grid cell을 채운다.

Dialog용 `portalMode="dialog"`도 Content 폭과 Menu 토큰을 바꾸지 않는다. Dialog Content는 nested
Select Content가 열려 있을 때만 root overflow를 노출하고, Header/Body/Footer의 기존 clipping과
scroll surface는 유지한다. 따라서 option layer는 trigger 폭을 유지한 채 Dialog card 밖으로 필요한 만큼 펼쳐진다.

## Content 폭 변형

기본 Content는 최소 140px 및 트리거 폭을 사용한다. `contentWidth="content"`일 때만
`width: max-content; min-width: 0`으로 전환해 숫자 option selector가 불필요하게 넓어지지 않게 한다.
Popover의 available-width 제한과 기존 border·shadow·token은 그대로 유지한다.

## Option viewport 높이 변형

`maxVisibleOptions`가 있으면 option viewport 높이는 Select size별 option 행 높이와
지정 개수의 곱으로 계산한다. `ScrollArea` root와 content는 각각 border/radius 및 기본 16px
padding을 제거해 Select Content의 border, shadow, available-height 계약을 유지한다. native
scrollbar는 숨기고 공용 overlay thumb만 사용한다.
Multi의 “모두 선택”과 Divider는 별도 고정 영역이며 viewport 높이에 포함하지 않는다. 실제 option이
지정 개수 이하이면 viewport를 실제 행 높이에 맞추고 thumb를 렌더하지 않는다. option이 지정 개수를
초과하거나 available height가 부족할 때만 실제 option 영역이 줄어들며 overlay thumb가 나타난다.

## 6. 색상 스펙 — 라이트 모드

### Form 토큰 (Trigger)

| 토큰                          | 값        | 용도                                         |
| ----------------------------- | --------- | -------------------------------------------- |
| `--form-surface-active`       | `#ffffff` | enabled/focused 표면                         |
| `--form-surface-inactive`     | `#f8f8f8` | disabled/read-only 표면, Create variant 표면 |
| `--form-border-default`       | `#dddddd` | enabled 테두리                               |
| `--form-border-active`        | `var(--accent-500)` | focus 테두리                                 |
| `--form-border-invalid`       | `#e81919` | invalid 테두리                               |
| `--form-placeholder-active`   | `#8f8f8f` | enabled placeholder                          |
| `--form-placeholder-inactive` | `#aaaaaa` | disabled placeholder                         |

### Menu 토큰 (드롭다운)

| 토큰                   | 값                                                             | 용도               |
| ---------------------- | -------------------------------------------------------------- | ------------------ |
| `--menu-surface`       | `#ffffff`                                                      | 드롭다운 배경      |
| `--menu-shadow`        | `0 4px 6px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)` | 드롭다운 그림자    |
| `--menu-item-hovered`  | `#f8f8f8`                                                      | item hover 배경    |
| `--menu-item-pressed`  | `#f4f4f4`                                                      | item pressed 배경  |
| `--menu-item-selected` | `var(--accent-50)`                                                      | selected item 배경 |

### 기타 토큰

| 토큰                       | 값        | 용도                              |
| -------------------------- | --------- | --------------------------------- |
| `--text`                   | `#1c1c1c` | 값 텍스트, item 라벨              |
| `--text-subtle`            | `#555555` | help text, empty message          |
| `--text-subtler`           | `#757575` | (선택사항) 라벨                   |
| `--text-disabled`          | `#aaaaaa` | disabled 텍스트                   |
| `--text-primary`           | `var(--accent-500)` | selected item 텍스트, chip 텍스트 |
| `--text-danger`            | `#e81919` | required(\*) 마크                 |
| `--text-error`             | `#d00a0a` | invalid help text                 |
| `--icon`                   | `#1c1c1c` | chevron 아이콘                    |
| `--icon-subtle`            | `#555555` | clear button 배경                 |
| `--icon-inverse`           | `#ffffff` | clear button 아이콘(흰 X)         |
| `--icon-disabled`          | `#aaaaaa` | disabled chevron                  |
| `--element-primary-subtle` | `var(--accent-50)` | chip 배경, overflow chip 배경     |
| `--border-default`         | `#dddddd` | 드롭다운 테두리                   |
| `--border-subtle`          | `#eeeeee` | divider                           |
| `--border-primary`         | `var(--accent-500)` | item focus 링                     |

---

## 7. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시 semantic 토큰이 자동 재매핑된다. 컴포넌트 코드 수정 불필요.

| 토큰                          | 라이트    | 다크                                   |
| ----------------------------- | --------- | -------------------------------------- |
| `--form-surface-active`       | `#ffffff` | `#1c1c1c`                              |
| `--form-surface-inactive`     | `#f8f8f8` | `#333333`                              |
| `--form-border-default`       | `#dddddd` | `#555555`                              |
| `--form-border-active`        | `var(--accent-500)` | `var(--accent-400)` (더 밝음)                    |
| `--form-border-invalid`       | `#e81919` | `#f52424`                              |
| `--form-placeholder-active`   | `#8f8f8f` | `#8f8f8f`                              |
| `--form-placeholder-inactive` | `#aaaaaa` | `#757575`                              |
| `--menu-surface`              | `#ffffff` | `#1c1c1c`                              |
| `--menu-item-hovered`         | `#f8f8f8` | `#333333`                              |
| `--menu-item-selected`        | `var(--accent-50)` | `color-mix(accent-400 12%, transparent)` |
| `--text`                      | `#1c1c1c` | `#dddddd`                              |
| `--text-primary`              | `var(--accent-500)` | `var(--accent-400)`                              |
| `--icon`                      | `#1c1c1c` | `#dddddd`                              |
| `--element-primary-subtle`    | `var(--accent-50)` | `color-mix(accent-400 12%, transparent)` |
| `--border-default`            | `#dddddd` | `#555555`                              |
| `--border-subtle`             | `#eeeeee` | `#333333`                              |

---

## 8. 타이포그래피

폰트 패밀리: **Pretendard**.

| 요소                              | font-size | font-weight    | line-height | 토큰            |
| --------------------------------- | --------- | -------------- | ----------- | --------------- |
| Trigger 값/placeholder/검색 input | 14px      | 400 (Regular)  | 20px        | `--text-body2`  |
| Label                             | 14px      | 600 (SemiBold) | 20px        | `--text-title2` |
| (선택사항)                        | 12px      | 400            | 16px        | `--text-body3`  |
| required(\*)                      | 14px      | 400            | 20px        | —               |
| Help text                         | 12px      | 400            | 16px        | `--text-body3`  |
| Item 라벨                         | 14px      | 400            | 20px        | `--text-body2`  |
| Overflow chip (+N)                | 12px      | 600 (SemiBold) | 16px        | `--text-title3` |
| Empty message                     | 14px      | 400            | 20px        | `--text-body2`  |

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Form — Input/Select 트리거 공용 */
  --form-surface-active: #ffffff;
  --form-surface-inactive: #f8f8f8;
  --form-border-default: #dddddd;
  --form-border-active: var(--accent-500);
  --form-border-invalid: #e81919;
  --form-placeholder-active: #8f8f8f;
  --form-placeholder-inactive: #aaaaaa;

  /* Menu — 드롭다운 패널/옵션 */
  --menu-surface: #ffffff;
  --menu-shadow:
    0 4px 6px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31);
  --menu-item-hovered: #f8f8f8;
  --menu-item-pressed: #f4f4f4;
  --menu-item-selected: var(--accent-50);

  /* Text */
  --text: #1c1c1c;
  --text-subtle: #555555;
  --text-subtler: #757575;
  --text-disabled: #aaaaaa;
  --text-primary: var(--accent-500);
  --text-danger: #e81919;
  --text-error: #d00a0a;

  /* Icon */
  --icon: #1c1c1c;
  --icon-subtle: #555555;
  --icon-inverse: #ffffff;
  --icon-disabled: #aaaaaa;

  /* Element */
  --element-primary-subtle: var(--accent-50);

  /* Border */
  --border-default: #dddddd;
  --border-subtle: #eeeeee;
  --border-primary: var(--accent-500);

  /* Font */
  --font-sans: "Pretendard", system-ui, sans-serif;
}
```

### `.dark` (다크)

```css
.dark {
  --form-surface-active: #1c1c1c;
  --form-surface-inactive: #333333;
  --form-border-default: #555555;
  --form-border-active: var(--accent-400);
  --form-border-invalid: #f52424;
  --form-placeholder-active: #8f8f8f;
  --form-placeholder-inactive: #757575;

  --menu-surface: #1c1c1c;
  --menu-item-hovered: #333333;
  --menu-item-pressed: #555555;
  --menu-item-selected: color-mix(
    in srgb,
    var(--accent-400) 12%,
    transparent
  );

  --text: #dddddd;
  --text-subtle: #aaaaaa;
  --text-subtler: #8f8f8f;
  --text-disabled: #757575;
  --text-primary: var(--accent-400);

  --icon: #dddddd;
  --icon-subtle: #aaaaaa;
  --icon-inverse: #ffffff;
  --icon-disabled: #757575;

  --element-primary-subtle: color-mix(
    in srgb,
    var(--accent-400) 12%,
    transparent
  );

  --border-default: #555555;
  --border-subtle: #333333;
  --border-primary: var(--accent-400);
}
```

---

### 입력창 로딩 배치

로딩 Spinner는 16×16px, `flex-shrink: 0`이며 trigger의 기존 4px gap과 수직 중앙 정렬을 사용한다. 별도 패널이나 최소 높이를 추가하지 않고 기존 size별 입력창 높이를 유지한다.
