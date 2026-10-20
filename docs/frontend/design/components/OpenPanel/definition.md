# Open panel — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트는 세 개의 공용 컴포넌트를 조합하여 사용한다. 재현 시 이 컴포넌트들을 먼저
확보해야 한다.

| 의존 컴포넌트   | 용도                                                | 가이드라인      | 비고                                                                                                       |
| --------------- | --------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| **Button**      | 패널을 여는 trigger, Header 의 object level buttons | `Button/README.md`     | 4 variant(Primary/Secondary/Tertiary/Negative) × 4 size. Header actions 은 보통 `size="small"`.            |
| **Icon Button** | Header 좌측 닫기 버튼(×)                            | `IconButton/README.md` | 2 variant(Outlined/Ghost) × 4 size. 닫기 버튼은 `variant="ghost"`, `size="xlarge"`(32×32), `icon="close"`. |
| **Icon**        | Header 의 leading 아이콘                            | `Icon/README.md`       | Figma System icon. `size="l"`(18px), `color="default"`.                                                    |

> 닫기 버튼은 Radix `Dialog.Close asChild` 로 감싸 Icon Button 에 위임한다 — 클릭 시
> 패널이 자동으로 닫힌다.

---

## 3. 구조 (Anatomy)

```
Open panel
├── Trigger (Button — 외부, 패널을 여는 버튼)
├── Scrim (Overlay 타입만 — 반투명 검정 rgba(0,0,0,0.25))
├── Panel 본체 (SheetContent)
│   ├── Resize handle (optional — 패널 테두리 안쪽 10px 의 캡슐 그립)
│   │   └── Resize line (4×20px 캡슐, border-radius 1000px)
│   ├── Header (56px)
│   │   ├── Close button (Icon Button, ghost, xlarge — 가장 좌측)
│   │   ├── Header Main (flex: 1)
│   │   │   ├── Leading icon (Icon, 18px — optional)
│   │   │   └── Title (Headline3, 20px SemiBold)
│   │   └── Header Actions (optional — object level buttons)
│   └── Body (24px padding, 스크롤 가능)
│       └── 콘텐츠...
└── (ESC / scrim 클릭 / 닫기 버튼 → 패널 닫힘)
```

```
┌─────────────────────────────────────────────┐
│ Header(56px)                                 │
│ [×]  [icon] Title          [Save] [Cancel]   │
├─────────────────────────────────────────────┤
│ Body(24px padding)                           │
│                                              │
│   Some contents...                           │
│   Some contents...                           │
│                                              │
└─────────────────────────────────────────────┘
▲ resize line (4×20px, 테두리 안쪽 10px)
```

---

## 4. 레이아웃 스펙

모든 수치는 px 단위.

### 패널 본체 — 위치·치수

| 위치       | 치수                      | 배치                      | 테두리                | 모서리 반경 |
| ---------- | ------------------------- | ------------------------- | --------------------- | ----------- |
| **Top**    | 높이 **386px**, 폭 full   | 상단(`top: 0`, 좌우 0)    | 하단 `1px solid #ddd` | 하단 8px    |
| **Right**  | 너비 **424px**, 높이 full | 우측(`right: 0`, 상하 0)  | 좌측 `1px solid #ddd` | 좌측 8px    |
| **Bottom** | 높이 **386px**, 폭 full   | 하단(`bottom: 0`, 좌우 0) | 상단 `1px solid #ddd` | 상단 8px    |
| **Left**   | 너비 **424px**, 높이 full | 좌측(`left: 0`, 상하 0)   | 우측 `1px solid #ddd` | 우측 8px    |

> **위치는 타입(Overlay/Inline)과 무관하게 동일**하다. type 은 그림자/scrim 유무만 결정한다.

### 타입별 차이

| 항목        | Overlay                                             | Inline           |
| ----------- | --------------------------------------------------- | ---------------- |
| Scrim       | ✓ (rgba(0,0,0,0.25))                                | ✗                |
| box-shadow  | `--elevation-overlay` (0 8px 24px rgba(0,0,0,0.08)) | `none` (평면)    |
| 메인 콘텐츠 | 위에 덮음                                           | 나란히(밀어내기) |

### Header

| 항목         | 값                                                              |
| ------------ | --------------------------------------------------------------- |
| 높이         | **56px** (고정)                                                 |
| padding      | `0 24px`                                                        |
| gap(요소 간) | 8px                                                             |
| 하단 테두리  | `1px solid #eeeeee` (`--border-subtle`)                         |
| 배치         | flex 행, 수직 중앙 정렬                                         |
| 좌→우 순서   | [Close Icon Button] [Leading icon + Title ...] [Header Actions] |

### Body

| 항목     | 값                                   |
| -------- | ------------------------------------ |
| padding  | **24px** (사방)                      |
| overflow | `auto` (콘텐츠 초과 시 스크롤)       |
| 스크롤바 | 4px thin overlay thumb (반투명 회색) |
| flex     | `1 1 auto` (남은 공간 채움)          |

### Resize handle (optional)

| 항목            | 값                                                                        |
| --------------- | ------------------------------------------------------------------------- |
| 히트 영역       | **20px** (좌우: full-height × 20px 폭 / 상하: 20px 높이 × full-width)     |
| 시각적 선(line) | **4×20px** 캡슐                                                           |
| 모서리          | `border-radius: 1000px` (완전 캡슐)                                       |
| 위치            | 패널 테두리에서 **안쪽 10px** (히트 영역 중앙)                            |
| 방향            | 좌우 패널 → 세로 그립(4×20) / 상하 패널 → 가로 그립(20×4, 90도 회전 형태) |
| 커서            | 좌우: `col-resize` / 상하: `row-resize`                                   |
| 크기 범위       | 최소 280px ~ 뷰포트 90%                                                   |
| 기본 크기       | side 패널 424px / top·bottom 386px                                        |

---

