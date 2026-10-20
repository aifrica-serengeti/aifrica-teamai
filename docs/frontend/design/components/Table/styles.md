# Table — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Table 문서 인덱스](./README.md)

## 6. 색상 스펙

### 라이트 모드

| 요소 / 상태                    | 값                   | 토큰                                 |
| ------------------------------ | -------------------- | ------------------------------------ |
| Frame / body                   | `#ffffff`            | `--table-surface`                    |
| Header                         | `#f8f8f8`            | `--table-header-surface`             |
| Border / row divider           | `#dddddd`            | `--table-border`                     |
| 기본 text                      | `#1c1c1c`            | `--table-text`                       |
| Header / 보조 text / sort icon | `#757575`            | `--text-subtler`, `--icon-subtler`   |
| Header bottom divider          | `#dddddd`            | `--table-border`, 기본 상태부터 표시 |
| Disabled row text              | `#aaaaaa`            | `--table-text-disabled`              |
| Hover row                      | `#f8f8f8`            | `--table-hover-surface`              |
| Pressed row                    | `#f4f4f4`            | `--table-pressed-surface`            |
| Selected row                   | `var(--accent-50)`            | `--table-selected-surface`           |
| 선택 활성 행 좌측 accent       | `var(--accent-500)`, inset 3px | `--border-primary`                   |
| Sort focus outline             | `var(--accent-500)`, 1px       | `--border-primary`                   |

### 다크 모드

| 요소 / 상태              | 값                   | 토큰                       |
| ------------------------ | -------------------- | -------------------------- |
| Frame / body             | `#282828`            | `--table-surface`          |
| Header                   | `#222222`            | `--table-header-surface`   |
| Border / row divider     | `#333333`            | `--table-border`           |
| 기본 text                | `#dddddd`            | `--table-text`             |
| Disabled row text        | `#555555`            | `--table-text-disabled`    |
| Hover row                | `#333333`            | `--table-hover-surface`    |
| Pressed row              | `#2d2d2d`            | `--table-pressed-surface`  |
| Selected row             | `var(--accent-900)`            | `--table-selected-surface` |
| 선택 활성 행 좌측 accent | `var(--accent-400)`, inset 3px | `--border-primary`         |

## 10. 디자인 토큰 정의

아래 Table 전용 token을 전역 CSS에 정의한다. 다른 일반 semantic token(`--text`, `--border-primary` 등)은 [foundation 문서](../../foundations.md)의 공통 토큰을 사용한다.

```css
:root {
  --table-focus-border: var(--border-primary);
  --table-surface: #ffffff;
  --table-header-surface: #f8f8f8;
  --table-hover-surface: #f8f8f8;
  --table-pressed-surface: #f4f4f4;
  --table-selected-surface: var(--accent-50);
  --table-border: #dddddd;
  --table-text: #1c1c1c;
  --table-text-disabled: #aaaaaa;
  --elevation-default: none;
  --elevation-overlay: 0 8px 24px 0 rgba(0, 0, 0, 0.08);
}

.dark {
  --table-focus-border: var(--border-primary);
  --table-surface: #282828;
  --table-header-surface: #222222;
  --table-hover-surface: #333333;
  --table-pressed-surface: #2d2d2d;
  --table-selected-surface: var(--accent-900);
  --table-border: #333333;
  --table-text: #dddddd;
  --table-text-disabled: #555555;
}
```

## 클릭 가능한 행

`onRowClick` 행은 `cursor: pointer`를 사용하며, keyboard focus는 `tr`에
`--table-focus-border`는 foundation의 `--border-primary`로 연결한 Table 로컬 역할 토큰이다. 솔루션의 light/dark primary/focus 매핑과 실제 배경 대비를 확인한다.
`2px solid var(--table-focus-border)`와 `outline-offset: -2px`로 표시한다. 각 `td`에 사방 inset ring을
반복하면 열 경계가 포커스 경계처럼 보이므로 사용하지 않는다.

## 내장 선택 열의 균형 간격

내장 Checkbox/Radio 선택 열은 Small 40px, Medium 48px를 유지하고 바로 다음 data cell의 시작 padding을
0으로 한다. 16px Checkbox 기준으로 Small은 frame→control과 control→data가 각각 12px, Medium은 각각
16px다. Radio는 보이는 원이 16px이고 공용 컴포넌트가 32px hit area를 소유하므로, 이 hit area를 40/48px
선택 열 가운데 둔다. 두 control 모두 다음 data cell의 기본 12px padding을 다시 더하지 않는다.
선택 `col`과 header/body cell은 같은 width·min-width·max-width를 사용해 fixed layout 및 남는 폭이
있는 Table에서도 선택 열이 확장되지 않게 한다.
모든 data column에 width가 지정된 fixed Table에서는 첫 일반 data column의 width를 유동 폭으로 해석해
남는 공간을 전담시킨다. width가 없는 data column이 있으면 그 열을 우선 사용한다. 따라서 남는 폭이
선택 열에 비례 배분되지 않고 40/48px geometry가 실제 `col/th/td`에서도 유지된다.

## 커스텀 선택 열

`TableColumn.kind="selection"`은 기존 selection header/body 스타일을 재사용한다.
padding 0, Small 40px·Medium 48px 폭, header 수평 중앙·body flex 중앙 정렬이며
일반 data 열의 외곽 24px padding을 적용하지 않는다. 바로 다음 data 열의 시작 padding은 0이다.
따라서 16px Checkbox의 양옆 간격은 Small 12px·Medium 16px로 대칭이다.
선택 열만 중앙 정렬한 뒤 다음 열의 12px padding을 그대로 더하면 앞뒤 간격이 달라지므로 함께 조정한다.
선택 `col`과 header/body cell에는 같은 size 규격을 적용한다. 다음 data cell의 중복 시작 padding 제거는
내장 checkbox/radio와 custom 선택 열에 공통 적용한다. 별도 색상·간격 토큰이나 페이지
CSS override는 없다.

## 행 작업 색상 소유권

- `TableRowActions`의 래퍼는 inline-flex·수직 중앙 정렬만 소유한다. 버튼·메뉴의 크기와 상태는
  leaf 컴포넌트에 위임한다. 사용자 정의 작업 컬럼은 긴 단일 label과 셀 padding을 합친 폭을 예약한다.
  `renderRowAction`의 기본 열 폭은 112px이며 다국어 label에 따라 `rowActionWidth`로 조절한다.

- 단일 작업은 Button의 tertiary token과 상태 스타일을 그대로 사용한다. Table이 fill, border, text color를
  덮어쓰지 않는다.
- 복수 작업 trigger는 IconButton의 ghost token, 목록은 Menu token에 위임한다.
- `triggerMode="menu"`의 단일 작업도 같은 medium ghost IconButton과 small Menu를 사용한다.
  별도 페이지별 아이콘·색상·focus 스타일을 추가하지 않는다.
- 위험한 MenuItem은 `--text-danger`와 `--icon-danger`를 사용하고 disabled에서는 각각 공용 disabled
  semantic token으로 전환한다. Table 전용 raw color를 추가하지 않는다.

## 빈 상태 viewport

- 구조 보존용 spacer cell은 높이 160px, padding 0이다.
- 실제 빈 상태 layer는 frame 기준 absolute이며 header 높이(Medium 40px, Small 32px) 아래 body를 채운다.
- layer 자체는 `pointer-events: none`, 내부 문구와 optional action만 `pointer-events: auto`다. 따라서
  가로·세로 ScrollArea thumb 동작을 막지 않는다.
- `ListContentState`의 embedded presentation이 border·surface·padding을 추가하지 않고 Table frame을
  사용한다. title은 `--text`, description은 `--text-subtle`을 사용한다.
- Medium 상태는 regular의 32px icon·18/28px title·14/20px description, Small 상태는 compact의
  24px icon·14/20px title·12/16px description을 사용한다. icon은 장식 요소다. empty/filtered는 subtle,
  error는 danger icon token을 사용하고 임의의 별도 danger panel은 만들지 않는다.
- Loading은 별도 profile을 사용한다. Medium은 medium Spinner·14/20px regular 문구·12px gap,
  Small은 small Spinner·12/16px regular 문구·8px gap이다. empty/error의 semibold title을 상속하지 않는다.
- Small body의 상속 타이포는 14/20px이다. Checkbox, Button, Status처럼 크기 계약을 가진 leaf
  컴포넌트와 조작 hit area는 Table이 축소하지 않는다.
