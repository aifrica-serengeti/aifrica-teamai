# Split Button — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Split Button 은 단독으로 동작하지 않고 공용 컴포넌트와 조합된다. 재현 시 아래 컴포넌트가
선행되어야 한다.

| 의존 컴포넌트 | 용도                                                                                       | 가이드라인       | 비고                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------ | ---------------- | --------------------------------------------------------------------------------------------------- |
| **Menu**      | Secondary action 클릭 시 펼쳐지는 옵션 목록                                                | `Menu/README.md` | Radix `DropdownMenu` 기반. `MenuContent`, `MenuItem` 을 직접 조립. `size` prop 으로 item 높이 제어. |
| **Icon**      | Primary action 아이콘 · Secondary action leading 아이콘 · trailing chevron(`chevron_down`) | `Icon/README.md` | Figma System icon. 색상은 부모 action 의 `color` 를 상속(`style={{ color: 'inherit' }}`).           |

> 재현자는 먼저 [Menu/README.md](../Menu/README.md) 와 [Icon/README.md](../Icon/README.md) 를 따라 두 컴포넌트를 구현한 뒤,
> 이 가이드라인으로 조립한다. Menu 의 trigger(Button/Icon Button) 역할을 Secondary action
> `<button>` 이 `asChild` 로 수행한다.

> Split Button 고유의 Button 컴포넌트를 새로 만들지 않는다. Tertiary Button 토큰을 직접 참조하는
> `<button>` 요소 2개를 쓴다(Button 컴포넌트 래핑 없이). 그래야 두 action 의 border 겹침(분할선)
> 과 focus outline 동작을 정확히 제어할 수 있다.

---

## 3. 구조 (Anatomy)

```
SplitButton (root — inline-flex 컨테이너)
├── Primary action (<button>)        ── 아이콘만 있는 정사각 버튼. 메인 동작.
│   └── Icon                          ── Figma System icon. 색상 = action 텍스트 색상 상속.
├── 분할선 (Divider 1px)             ── 별도 요소가 아님. 두 action 의 border 가 margin:-1px 로 겹쳐 생성.
└── Secondary action (<button>)      ── leading icon + Label + chevron. Menu trigger.
    ├── (optional) Icon (leading)
    ├── Label text                    ── Pretendard Regular
    └── Icon (trailing chevron)       ── chevron_down. 메뉴 열림 시 180° 회전.
    │
    └── Menu (Radix DropdownMenu)     ── 클릭 시 펼쳐짐. 공용 컴포넌트.
        └── MenuItem × N              ── 사용처에서 children 으로 전달.
```

```
┌─────────┬──────────────────────┐
│  [icon] │ [icon] Label    ⌄    │
│         │                      │
│ Primary │  Secondary action    │
│ action  │  (Menu trigger)      │
└─────────┴──────────────────────┘
     ▲              ▲
     │              │
  좌측만         우측만
  radius 4px     radius 4px

  ↑ 두 action 의 맞닿은 면 border 가 1px 겹쳐 분할선이 됨 (margin-right: -1px).
```

### Primary action (아이콘-only)

- 정사각 버튼. 아이콘을 중앙에 배치.
- `border-radius: 4px 0 0 4px` (좌측만 둥글게, 우측은 Secondary 와 맞닿아 직각).
- `margin-right: -1px` 으로 Secondary 의 좌측 border 와 겹쳐 1px 분할선 생성.
- 아이콘 색상은 action 의 텍스트 색상(`color`)을 상속(`color: inherit`).

### Secondary action (leading icon + Label + chevron)

- `border-radius: 0 4px 4px 0` (우측만 둥글게, 좌측은 Primary 와 맞닿아 직각).
- leading icon 은 optional. 생략 시 Label + chevron 만.
- trailing chevron(`chevron_down`)은 항상 표시. 메뉴 열림 시 `rotate(180deg)`.

### 분할선 (Divider)

- **별도 DOM 요소가 아니다.** Primary 와 Secondary 양쪽 모두 4면 1px border 를 가지되,
  Primary 에 `margin-right: -1px` 을 줘서 두 border 가 1px 겹친다. 색상이 같으므로
  겹친 부분이 1px 선으로 보인다.
- **왜 별도 Divider 요소를 쓰지 않는가:** 별도 요소를 두면 맞닿은 면의 focus outline 이
  Divider 요소에 가려 잘린다. 양쪽 action 이 온전한 border-box 를 가져야 focus outline 이
  사방에 정상 그려진다.

---

## 4. 레이아웃 스펙

모든 수치는 px 단위. Figma 노드 교차 검증 완료.

### Size 치수

| Size       | 전체 높이 | Primary action | Secondary padding-x | Secondary gap | font / line         | icon size (자동 매핑) |
| ---------- | --------- | -------------- | ------------------- | ------------- | ------------------- | --------------------- |
| **Tiny**   | 24px      | 24×24px        | 8px                 | 2px           | 12px / 16px (Body3) | 14px (Icon `s`)       |
| **Small**  | 28px      | 28×28px        | 8px                 | 4px           | 14px / 20px (Body2) | 16px (Icon `m`)       |
| **Medium** | 32px      | 32×32px        | 12px                | 4px           | 14px / 20px (Body2) | 16px (Icon `m`)       |
| **Large**  | 40px      | 40×40px        | 16px                | 4px           | 16px / 24px (Body1) | 20px (Icon `xl`)      |

> 두 action은 `box-sizing: border-box`와 size별 고정 높이를 사용한다. Primary action은 고정된 정사각형
> 안에서 아이콘을 중앙 정렬하고, Secondary action은 고정 높이 안에서 label과 아이콘을 수직 중앙 정렬한다.
> 따라서 1px 상하 border가 전체 높이에 추가되지 않는다.

### 공통 레이아웃

| 항목             | 값                                                             |
| ---------------- | -------------------------------------------------------------- |
| border-radius    | **4px** (Primary 좌측, Secondary 우측만 적용)                  |
| 분할선(Divider)  | 1px — 두 action 의 border 가 `margin-right: -1px` 로 겹쳐 생성 |
| border 두께      | 1px (양쪽 action 모두 4면)                                     |
| font-weight      | **400 (Regular)** — Button(600)과 다름                         |
| white-space      | `nowrap` (라벨 줄바꿈 방지)                                    |
| 기본 배치        | `inline-flex`, `align-items: stretch`, 가로 중앙 정렬          |
| Icon flex-shrink | 0 (chevron/아이콘 잘림 방지)                                   |

### SplitButton size → Menu size 매핑

| SplitButton size | Menu size | Menu item 높이 |
| ---------------- | --------- | -------------- |
| tiny / small     | small     | 28px           |
| medium           | medium    | 32px           |
| large            | large     | 36px           |

> Menu 의 item 높이가 SplitButton 액션 높이와 시각적으로 조화되도록 매핑.

### Menu 높이 모드

- `menuScrollable=true`(기본): 공용 Menu의 최대 296px ScrollArea를 사용한다.
- `menuScrollable=false`: 옵션 수가 적은 메뉴에서 MenuItem의 실제 콘텐츠 높이만 사용한다.
- 이 옵션은 메뉴의 키보드 탐색, 선택, 닫힘과 포커스 복원 동작을 바꾸지 않는다.

---
