# Card — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트는 5개의 공용 컴포넌트를 조합하여 사용한다. 재현 시 이 컴포넌트들을 먼저
확보해야 한다. 직접 구현하지 않는다.

| 의존 컴포넌트   | 용도                                               | 가이드라인             | 조합 방식                                                                                         |
| --------------- | -------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| **Chip**        | "new" 배지(title 옞), 카테고리 칩(extended header) | `Chip/README.md`       | new = `color="blue" variant="subtle" shape="pill" size="small"`. 카테고리 칩 = `shape="rounded"`. |
| **Icon Button** | kebab(more-vertical) 메뉴 버튼                     | `IconButton/README.md` | `icon="more_vertical" variant="ghost" size="medium"`. 우상단 배치.                                |
| **Button**      | footer 액션 버튼(Large/Thumbnail)                  | `Button/README.md`     | 2개 균등 분할: `variant="tertiary" size="small"` + `variant="primary" size="small"`.              |
| **Link**        | "더 보기" 링크(Small footer)                       | `Link/README.md`       | `size="small"`. 밑줄, 파랑 텍스트.                                                                |
| **Icon**        | detail item 아이콘(clock/database/cpu)             | `Icon/README.md`       | `size="t"`(12px), `color="subtler"`. detail item 앞 아이콘.                                       |

```
Card
├── Chip          — 의존 컴포넌트. components/Chip/README.md 확인 → 재사용
├── Icon Button   — 의존 컴포넌트. components/IconButton/README.md 확인 → 재사용
├── Button        — 의존 컴포넌트. components/Button/README.md 확인 → 재사용
├── Link          — 의존 컴포넌트. components/Link/README.md 확인 → 재사용
└── Icon          — 의존 컴포넌트. components/Icon/README.md 확인 → 재사용
```

> 닫기 버튼이나 메뉴를 직접 구현하지 않고, IconButton 컴포넌트로 위임한다.
> "new" 배지를 직접 만들지 않고 Chip 컴포넌트로 위임한다.

---

## 3. 구조 (Anatomy)

### Default type

```
Card (root — div 또는 button)
├── Focus outline (optional — Focused 상태 시 absolute span, -3px offset)
├── Header Group (optional — Medium/Large)
│   ├── Main Header
│   │   ├── Leading visual (40px / 44px — 아이콘/이미지/아바타)
│   │   ├── Header Text
│   │   │   ├── Title Row
│   │   │   │   ├── Title (Title2 14px / Title1 16px)
│   │   │   │   └── New Badge (Chip — optional)
│   │   │   ├── Description (Body3 12px / Body2 14px)
│   │   └── Icon Button (kebab — more_vertical)
│   ├── Sub Description (Body3 12px, 대표 날짜 한 줄 — optional)
│   └── Extended Header (optional — Sub Description이 없을 때만 사용)
│       ├── Detail Items (icon + text • icon + text ...)
│       └── Chip Container (Chip01 Chip02 ...)
├── Summary (optional — 목록 카드의 주요 정보)
│   └── Summary Row (반복)
│       ├── Summary Label
│       └── Summary Value
├── Card Body (optional — Large only, 126px 높이, 회색 배경)
└── Footer
    ├── Small → Link ("더 보기")
    ├── Medium → Creator info ("by sunnyfield123")
    └── Large/Thumbnail → Button group (Tertiary + Primary)
```

### Thumbnail type

```
Card (wrapper — div, 전체 외곽 border 보유)
├── Focus outline (optional — Focused 상태 시 absolute span, -3px offset)
├── Thumbnail Image (220px 고정 높이, object-fit: cover, 하단 border)
└── Content (이미지 아래, border 없음 — wrapper 가 외곽 border 담당)
    └── (Default type 의 내부 구조와 동일)
```

> **Thumbnail 구조 핵심**: wrapper가 이미지 + 콘텐츠 전체를 감싸는 단일 외곽
> border(1px)를 가진다. 콘텐츠 카드는 별도 border 없이 wrapper border 안쪽에
> 위치한다. 이미지 하단에도 border가 있어 밝은 이미지에서도 콘텐츠와 경계가 구분된다.
> Selected/Focused 상태도 wrapper에 적용되어 이미지 영역을 포함한 전체 외곽에 파란
> border/outline이 표시된다.

> **목록 보조 정보 규칙**: 대표 날짜가 있는 목록 카드는 `SubDescription` 한 줄만 사용한다.
> 같은 `HeaderGroup`에 `ExtendedHeader`를 함께 두지 않으며, 그 밖의 메타데이터는 `Summary`로 내린다.

```
┌──────────────────────────────────────────┐  ← wrapper border (1px)
│                                           │
│              Thumbnail Image (220px)      │
│                                           │
├──────────────────────────────────────────┤  ← 이미지 하단 border (1px)
│ [icon] Card Title  [new]           [⋮]   │
│        Card description                    │
│        갱신일 2026. 09. 15.                │
├──────────────────────────────────────────┤
│  분류                         Category01  │
│  위치                         서울 · 판교 │
└──────────────────────────────────────────┘
```

Default type (참고):

```
┌──────────────────────────────────────────┐  ← root border (1px)
│ [icon] Card Title  [new]           [⋮]   │  ← Main Header
│        Card description                    │
│        갱신일 2026. 09. 15.                │  ← Sub Description
├──────────────────────────────────────────┤
│  분류                         Category01  │  ← Summary
│  위치                         서울 · 판교 │
├──────────────────────────────────────────┤
│                                            │
│              Card Body                     │  ← Large only
│                                            │
├──────────────────────────────────────────┤
│  [  Label  ]      [  Label  ]             │  ← Footer (Button group)
└──────────────────────────────────────────┘
```

---

## 4. 레이아웃 스펙

모든 수치는 px 단위. Figma 원본 노드에서 직접 추출.

### 루트 컨테이너 (Default type)

| 항목                | Small                                    | Medium | Large             |
| ------------------- | ---------------------------------------- | ------ | ----------------- |
| **너비**            | 392px (standalone 참조 fixture)                             | 392px  | 392px             |
| **padding**         | 16px                                     | 16px   | 24px              |
| **gap(자식 간)**    | 24px                                     | 24px   | 24px              |
| **border**          | 1px solid `#dddddd` (`--border-default`) | 동일   | 동일              |
| **border-radius**   | 8px                                      | 8px    | 8px               |
| **min-height**      | 80px                                     | 80px   | 80px              |
| **justify-content** | center                                   | center | (기본 flex-start) |
| **box-shadow**      | 없음 (Enabled)                           | 없음   | 없음              |
| **overflow**        | clip                                     | clip   | clip              |

### Thumbnail wrapper

| 항목                    | 값                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **너비**                | 392px                                                                                                                      |
| **border**              | `1px solid #dddddd` (`--border-default`) — wrapper 가 전체 외곽 border 담당                                                |
| **background**          | `#ffffff` (`--surface`)                                                                                                    |
| **border-radius**       | 8px (전체)                                                                                                                 |
| **overflow**            | clip                                                                                                                       |
| **position**            | relative                                                                                                                   |
| **Thumbnail 이미지**    | 높이 220px (고정), `object-fit: cover`, 너비 100%, 하단 `border-bottom: 1px solid #dddddd` (밝은 이미지에서 콘텐츠와 구분) |
| **콘텐츠 영역 padding** | 20px 24px 24px (top 20px, 좌우 24px, bottom 24px)                                                                          |
| **콘텐츠 영역 border**  | 없음 (wrapper 가 외곽 border 담당)                                                                                         |
| **콘텐츠 영역 gap**     | 24px                                                                                                                       |

> **구조 변경 이유**: 기존에는 콘텐츠 카드가 자체 border를 가졌으나, wrapper가 전체
> 외곽 border를 담당하도록 통일했다. 이렇게 하면: (1) 이미지 영역(상단/좌/우)에도
> border가 표시되어 밝은 썸네일에서도 경계가 보이고, (2) border 이중선이 발생하지 않는다.

### Header

| 항목                      | 값                                              |
| ------------------------- | ----------------------------------------------- |
| 배치                      | flex 행, `justify-content: space-between`       |
| gap                       | 8px (leading visual ↔ header text)              |
| Leading visual 크기       | Small/Medium: 40×40px, Large: 44×44px           |
| Title Row gap             | 4px (title ↔ new badge)                         |
| Header Text gap           | 4px (title row ↔ description ↔ sub description) |
| Header Text padding-right | 8px                                             |

### Header Group (Medium/Large)

| 항목 | 값                                   |
| ---- | ------------------------------------ |
| 배치 | flex 열                              |
| gap  | 12px (main header ↔ extended header) |

### Extended Header

| 항목               | 값                                  |
| ------------------ | ----------------------------------- |
| 배치               | flex 열                             |
| gap                | 8px (detail items ↔ chip container) |
| Detail items gap   | 4px (item 간, dot 포함)             |
| Detail item gap    | 4px (icon ↔ text)                   |
| Detail icon 크기   | 12px (`Icon size="t"`)              |
| Chip container gap | 4px                                 |

### Card Body (Large only)

| 항목          | 값                             |
| ------------- | ------------------------------ |
| 너비          | 100%                           |
| 최소 높이     | 126px                          |
| 배경          | `#f8f8f8` (`--surface-subtle`) |
| border-radius | 4px                            |
| 배치          | flex, 중앙 정렬                |

### Summary (목록 카드)

| 항목          | 값                                        |
| ------------- | ----------------------------------------- |
| 배치          | 세로 flex, 너비 100%, `min-width: 0`      |
| 행 간격       | 12px                                      |
| Summary Row   | 가로 flex, 중앙 정렬, 양끝 배치, gap 12px |
| Summary Label | 12px/16px, `--text-subtle`, 줄어들지 않음 |
| Summary Value | 14px/20px, 우측 정렬, 한 줄 말줄임        |

카드마다 대표 생성일·갱신일이 하나라면 `SubDescription`에 `생성일 {날짜}` 또는
`갱신일 {날짜}`로 표시하며, 보조 설명은 이 한 줄만 허용한다. 이때 분류·유형·위치·사용자·수량·주소
등 나머지 사실 정보는 `ExtendedHeader`를 추가하지 않고 `Summary`의 라벨·값 행으로 표시한다.
대표 날짜가 없는 카드만 짧은 taxonomy를 `ExtendedHeader`에 둘 수 있다. 여러 날짜가 각각 독립적인
업무 의미를 가지는 경우에는 날짜도 `Summary`의 개별 행으로 유지한다.

### Footer

| 타입                          | 배치    | gap | 비고                                                           |
| ----------------------------- | ------- | --- | -------------------------------------------------------------- |
| **Link** (Small)              | flex 행 | —   | Link 컴포넌트 `size="small"`                                   |
| **Creator** (Medium)          | flex 행 | 4px | "by" + creator name + avatar(16px). creator name 내부 gap 2px. |
| **Buttons** (Large/Thumbnail) | flex 행 | 8px | Button 2개 `flex: 1 1 0` 균등 분할                             |

---

## Card 폭의 소유권

392px은 standalone 컴포넌트의 참조 fixture 폭이다. page 목록에서는 CardGrid가 열·최소폭을 소유하며
Card는 할당된 slot 폭을 채운다. 참조 CSS를 채택할 때 page 조립의 root mapping에서
`--card-width: 100%`를 전달한다. page의 `--layout-card-min`은 grid track 최소폭이며 Card 내부 padding·
선택 border·focus geometry와 별개다. 두 값을 같은 고정 page 폭으로 사용하지 않는다.
