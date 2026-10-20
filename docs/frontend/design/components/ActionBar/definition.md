# Action bar — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

의존 공용 컴포넌트 없음. `Action`, `IconButton`, `Divider`는 Action Bar의 inverse surface와
상태 계약을 공유하는 내부 compound part이며, 카탈로그의 동명 컴포넌트를 import하는 구조가
아니다. 아이콘 glyph가 필요하면 호출자가 공용 `Icon`을 children으로 전달한다.

`Slot`은 외부 Radix primitive이며 공용 컴포넌트 의존성 등록 대상이 아니다.

## 2. 구조 (Anatomy)

```
ActionBar (컨테이너, inverse surface + Mid elevation)
├── Leading 컨테이너 (gap 8)
│   ├── Icon button         ── 32×32, 선택 표시/해제
│   └── Count text          ── "N개 선택됨"
│
└── Actions 컨테이너 (gap 4)
    ├── Action group (gap 4) ── 연관 액션 묶음
    │   ├── Action           ── 텍스트 버튼 (h32, px16)
    │   ├── Action
    │   ├── Action
    │   └── Icon button      ── 더 보기(more), 32×32
    │
    ├── Divider              ── 1px 세로선, h16, 좌우 px8
    │
    └── Action               ── 구분선 뒤의 주요 액션(예: 삭제)
```

- **Leading** (왼쪽): 선택 카운트. 아이콘 버튼 + "N개 선택됨" 텍스트.
- **Actions** (오른쪽): 실제 액션들. 연관 액션끼리 Group 으로 묶고, Divider 로
  구분한 뒤 파괴적 액션(삭제)을 배치한다.
- Leading ↔ Actions 사이는 **gap 24px** 로 넓게 띄운다.

---

## 3. 레이아웃 스펙

모든 수치는 px 단위.

### ActionBar 컨테이너

| 항목 | 값 | 비고 |
| --- | --- | --- |
| 높이 | 48px | 고정 |
| 좌우 패딩 | 12px | `padding-inline` |
| 내부 gap | 24px | Leading ↔ Actions 사이 |
| Border radius | 4px | `--radius` 미사용, 직접 4px |
| 배경 | inverse surface (라이트 `#1c1c1c` / 다크 `#ffffff`) | |
| 그림자 | Mid elevation (아래 "Elevation" 참조) | |
| 표시 방식 | `inline-flex` | 콘텐츠 너비에 맞춤 |
| 배치 | **화면 중앙 하단** 오버레이 | `position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%)` 로 뷰포트 하단 중앙에 레이어됨. `z-index: 10` 은 table sticky header(2)·refresh overlay(4)보다 크고 dialog(40)보다 작음. 선택·해제 시 콘텐츠가 밀리지 않음 |

### Action (텍스트 버튼)

| 항목 | 값 |
| --- | --- |
| 높이 | 32px |
| 좌우 패딩 | 16px |
| 상하 패딩 | 4px |
| Border radius | 4px |
| gap (아이콘↔텍스트) | 4px |
| 내부 아이콘 크기 | 18px (선택적 leading icon) |

### Icon button

| 항목 | 값 |
| --- | --- |
| 크기 | 32×32 (정사각) |
| 좌우 패딩 | 6px |
| 상하 패딩 | 4px |
| Border radius | 4px |
| 아이콘 크기 | 20px |

### Divider (내부 구분선)

| 항목 | 값 |
| --- | --- |
| 선 두께 | 1px |
| 선 높이 | 16px |
| 좌우 패딩 | 8px |
| 방향 | 세로(vertical) |
| 색상 | `#555555` (라이트/다크 공통) |

### 컨테이너 간 gap 요약

| 위치 | gap |
| --- | --- |
| Leading 내부 (Icon ↔ Count) | 8px |
| Leading ↔ Actions | 24px |
| Actions 내부 (Group ↔ Divider ↔ Action) | 4px |
| Group 내부 (Action ↔ Action ↔ IconButton) | 4px |

---
