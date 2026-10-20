# Icon — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

의존 공용 컴포넌트 없음. `lucide-react`와 문서에 잠긴 custom SVG는 외부 라이브러리·asset
의존성이며 Aifrica 공용 컴포넌트 의존성 등록 대상이 아니다.

## 2. 구조 (Anatomy)

```
Icon (System)
├── <svg> (lucide component 또는 커스텀 SVG)
│   ├── size (픽셀, 사이즈 토큰 매핑)
│   ├── stroke-width (사이즈별 굵기)
│   ├── stroke-linecap="round"
│   ├── stroke-linejoin="round"
│   └── color = var(--icon*) 또는 var(--color-*)
└── name: SystemIconName
    size?: IconSize (기본 m)
    color?: IconColor (기본 default)
```

**컴포넌트:**

| 컴포넌트 | props                     | 비고                        |
| -------- | ------------------------- | --------------------------- |
| `Icon`   | `name`, `size?`, `color?` | System icon. 색상 직접 지정 |

---

## 3. 레이아웃 스펙

모든 수치는 px 단위. 출처: Figma Icon / Size & Grid (node `6705:13323`).

### 그리드

| 항목           | 값            | 비고                                               |
| -------------- | ------------- | -------------------------------------------------- |
| 기본 그리드    | 24×24         | 아이콘 제작 기준 캔버스                            |
| 여백 (padding) | 2px (전 방향) | 24px 그리드 내 상하좌우 2px 제외 공간에 도형 배치  |
| 정렬           | Center        | 스트로크 정렬은 **Center** (내부 모서리 표현 유지) |

### 사이즈 (8단계)

기본(표준) 사이즈는 **m(16px)**.

| 토큰    | 픽셀   | 용도 예                              |
| ------- | ------ | ------------------------------------ |
| `t`     | 12     | 인라인 텍스트 내, 캡션               |
| `s`     | 14     | 소형 라벨, 테이블 셀                 |
| **`m`** | **16** | **표준** — 버튼 내 아이콘, 메뉴 항목 |
| `l`     | 18     | 큰 라벨, 카드 액션                   |
| `xl`    | 20     | 섹션 헤더, 강조 액션                 |
| `2xl`   | 24     | 툴바, 빈 상태 일러스트               |
| `3xl`   | 32     | 카드 썸네일, 알림                    |
| `4xl`   | 36     | 히어로 영역, 온보딩                  |

### 스트로크 굵기 (사이즈별 자동 매핑)

출처: Figma Icon / Stroke — 사이즈별 굵기 적용 테이블 (node `6705:13536`).
호출자가 임의로 굵기를 바꿀 수 없고, 사이즈에 따라 자동 결정된다.

| 아이콘 사이즈 (px) | 스트로크 굵기 (px)                    |
| ------------------ | ------------------------------------- |
| 12, 14, 16, 18, 20 | **1.25** (Figma 원본 1px + 시각 보정) |
| 24                 | **1.5**                               |
| 32, 36             | **2**                                 |

> **시각 보정 노트**: Figma 원본 스펙은 소사이즈 그룹이 1px 이나, lucide 렌더링에서 다소
> 얇아 보여 1.25px 로 미세하게 올렸다. 단계 간 차이(1.25 < 1.5 < 2)는 유지된다.

### Endcap & Join

선 아이콘의 끝모양과 꺾임은 모두 **둥글게(Round)**.

| 속성              | 값      |
| ----------------- | ------- |
| `stroke-linecap`  | `round` |
| `stroke-linejoin` | `round` |

### Corner (모서리 둥글기)

형태가 크게 왜곡되지 않는 선에서 아이콘 의미를 명확히 표현하기 위해 사용.
기본값 **2px**, 옵션 0.5 / 1.5 / 2 / 3px. (lucide 자체 경로에 반영됨)

---

## 6. 아이콘 이름 레지스트리

### System icon 이름 → lucide 컴포넌트 매핑

아이콘 형태는 lucide-react 에서 제공한다. 매핑 제약이 있는 항목은 비고 참조.

| Figma 이름                                                           | lucide 컴포넌트                                                               | 비고                                                                                                        |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `plus`                                                               | `Plus`                                                                        |                                                                                                             |
| `minus`                                                              | `Minus`                                                                       |                                                                                                             |
| `check`                                                              | `Check`                                                                       |                                                                                                             |
| `close`                                                              | `X`                                                                           |                                                                                                             |
| `search`                                                             | `Search`                                                                      |                                                                                                             |
| `save`                                                               | `Save`                                                                        |                                                                                                             |
| `modify`                                                             | `Pencil`                                                                      |                                                                                                             |
| `gears`                                                              | `Settings`                                                                    |                                                                                                             |
| `refresh`                                                            | `RefreshCw`                                                                   |                                                                                                             |
| `sync`                                                               | `ArrowLeftRight`                                                              | refresh와 구분되는 목록 전체 동기화 또는 외부 자원 불러오기 액션                                            |
| `eliminate`                                                          | `Trash2`                                                                      |                                                                                                             |
| `copy`                                                               | `Copy`                                                                        |                                                                                                             |
| `clipboard_paste`                                                    | `ClipboardPaste`                                                              | 클립보드의 내용을 현재 편집 영역에 붙여넣기                                                                 |
| `link`                                                               | `Link`                                                                        |                                                                                                             |
| `link_2`                                                             | `Link2`                                                                       |                                                                                                             |
| `external_link`                                                      | `ExternalLink`                                                                |                                                                                                             |
| `info`                                                               | `Info`                                                                        |                                                                                                             |
| `help`                                                               | `CircleHelp`                                                                  |                                                                                                             |
| `bell`                                                               | `Bell`                                                                        |                                                                                                             |
| `arrow_up` / `arrow_down` / `arrow_left` / `arrow_right`             | `ArrowUp` / `ArrowDown` / `ArrowLeft` / `ArrowRight`                          |                                                                                                             |
| `triangle_up` / `triangle_down` / `triangle_left` / `triangle_right` | 커스텀 SVG (`TriangleUp` / `TriangleDown` / `TriangleLeft` / `TriangleRight`) | Figma 원본이 fill 기반 솔리드 삼각형이라 lucide stroke 기반 Chevron\* 와 형태 다름. 직접 SVG path 로 렌더링 |
| `fore_left` / `fore_right`                                           | `ArrowBigLeft` / `ArrowBigRight`                                              |                                                                                                             |
| `chevrons_left` / `chevrons_right`                                   | `ChevronsLeft` / `ChevronsRight`                                              |                                                                                                             |
| `secret`                                                             | `Lock`                                                                        |                                                                                                             |
| `secret_open`                                                        | `Unlock`                                                                      |                                                                                                             |
| `star`                                                               | `Star`                                                                        |                                                                                                             |
| `table`                                                              | `Table`                                                                       |                                                                                                             |
| `list`                                                               | `List`                                                                        |                                                                                                             |
| `dashboard`                                                          | `LayoutDashboard`                                                             |                                                                                                             |
| `grid` / `grid_off`                                                  | `Grid2X2` / `Grid2x2X`                                                        | 캔버스 격자 표시·숨김 전환                                                                                  |
| `desktop`                                                            | `Monitor`                                                                     |                                                                                                             |
| `desktop_code`                                                       | `MonitorCog`                                                                  | MonitorCode 는 이후 버전                                                                                    |
| `color_picker`                                                       | `Pipette`                                                                     |                                                                                                             |
| `palette`                                                            | `Palette`                                                                     |                                                                                                             |
| `functions`                                                          | `SquareFunction`                                                              |                                                                                                             |
| `layers`                                                             | `Layers`                                                                      |                                                                                                             |
| `github`                                                             | `Code`                                                                        | lucide 브랜드 아이콘 제거 — react-icons/SiGithub 권장                                                       |
| `out`                                                                | `LogOut`                                                                      |                                                                                                             |
| `maximize`                                                           | `Maximize`                                                                    |                                                                                                             |
| `rocket`                                                             | `Rocket`                                                                      |                                                                                                             |
| `globe`                                                              | `Globe`                                                                       |                                                                                                             |
| `map_pin`                                                            | `MapPin`                                                                      |                                                                                                             |
| `branch`                                                             | `GitBranch`                                                                   |                                                                                                             |
| `doc_code`                                                           | `FileCode2`                                                                   |                                                                                                             |
| `cloud`                                                              | `Cloud`                                                                       |                                                                                                             |
| `app_window`                                                         | `AppWindow`                                                                   | POC의 소프트웨어 1depth 메뉴 glyph                                                                          |
| `briefcase_business`                                                 | `BriefcaseBusiness`                                                           | POC의 서비스 관리 1depth 메뉴 glyph                                                                         |
| `shopping_cart`                                                      | `ShoppingCart`                                                                |                                                                                                             |
| `paper_plane`                                                        | `Send`                                                                        |                                                                                                             |
| `clock`                                                              | `Clock`                                                                       | 시간 선택. Timepicker trailing icon button에 사용. `schedule`과 구분해 사용                                 |
| `schedule`                                                           | `CalendarClock`                                                               |                                                                                                             |
| `service`                                                            | `Headset`                                                                     | 시맨틱 매칭 (고객 지원)                                                                                     |
| `theme`                                                              | `Moon`                                                                        |                                                                                                             |
| `tuning`                                                             | `SlidersHorizontal`                                                           |                                                                                                             |
| `warning`                                                            | `TriangleAlert`                                                               | System 영역의 warning                                                                                       |
| `edit`                                                               | `Edit`                                                                        |                                                                                                             |
| `manual`                                                             | `BookOpen`                                                                    |                                                                                                             |
| `plus_circle`                                                        | `PlusCircle`                                                                  |                                                                                                             |
| `check_circle`                                                       | `CircleCheck`                                                                 |                                                                                                             |

> Status icon (error/warning/success/...) 의 매핑은 별도 Status 컴포넌트 가이드라인 참조.

---
