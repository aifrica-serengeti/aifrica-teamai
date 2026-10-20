# Tooltip — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

의존 공용 컴포넌트 없음. Radix Tooltip은 외부 primitive이며, trigger로 전달되는 Button이나
Icon Button은 Tooltip의 내부 의존성이 아니라 사용 측 조합이다.

## 2. 구조 (Anatomy)

```
TooltipProvider (Radix — delayDuration 등 전역 설정)
└── Tooltip (Radix Root — open 상태 관리)
    ├── TooltipTrigger (asChild — 트리거 요소를 직접 래핑)
    │   └── <button|icon|text> (사용자 제공 트리거)
    └── TooltipContent (Portal 렌더 — data-side/data-align 자동 설정)
        ├── children (툴팁 텍스트/노드)
        └── 화살표 span[data-side][data-align]
            └── <svg> (Figma 삼각형 path — 방향별 별도 path)
```

**구성 요소:**

| 요소           | 역할                                | Radix 속성                                    |
| -------------- | ----------------------------------- | --------------------------------------------- |
| Provider       | 전역 지연 시간, hoverableContent 등 | `delayDuration`                               |
| Tooltip        | open/close 상태 관리                | —                                             |
| TooltipTrigger | 트리거 요소 (asChild 권장)          | —                                             |
| TooltipContent | 툴팁 박스 + 화살표                  | `side`, `align`, `sideOffset`, `data-variant` |
| 화살표 SVG     | Figma 삼각형                        | `data-side`, `data-align` (JS로 복사)         |

---

## 3. 레이아웃 스펙

### 3.1 Content 박스

| 속성          | Icon variant       | Standard variant             |
| ------------- | ------------------ | ---------------------------- |
| padding       | `4px 8px` (py/px)  | `8px 12px`                   |
| max-width     | — (내용에 맞춤)    | `320px`                      |
| max-height    | —                  | `160px`                      |
| white-space   | `nowrap` (단일 줄) | `normal` (다중 줄, 최대 3줄) |
| word-break    | —                  | `break-word`                 |
| border-radius | `4px`              | `4px`                        |
| text-align    | `center`           | `center`                     |

### 3.2 화살표 (Tip)

| 속성           | top/bottom              | left/right              |
| -------------- | ----------------------- | ----------------------- |
| 래퍼 크기      | `20px × 11px` (가로)    | `11px × 20px` (세로)    |
| SVG viewBox    | `0 0 14.3255 7.86888`   | `0 0 7.86888 14.3255`   |
| content와 겹침 | **7px** (offset `-4px`) | **7px** (offset `-4px`) |
| 바깥 튀어나옴  | **4px**                 | **4px**                 |

**핵심 배치 규칙 (Figma `bottom-[-4px]`):**

- 화살표(11px) 중 **7px이 content 안쪽으로 겹치고 4px이 바깥으로 튀어나옴**.
- content와 같은 색(`--surface-inverse`)이므로 겹친 부분은 보이지 않고 자연스럽게 하나의 형태로 이어짐.
- `sideOffset: 8px` — 화살표가 튀어나온 4px + 트리거와의 갭 4px. 화살표 끝이 트리거에 닿지 않음.

### 3.3 화살표 방향별 위치

**뾰족한 끝은 항상 content(툴팁 박스)를 향한다.** 평평한 둥근 면이 트리거 쪽(바깥)으로 향한다.

| side     | align=center 위치                           | align=start 위치 | align=end 위치 |
| -------- | ------------------------------------------- | ---------------- | -------------- |
| `top`    | `bottom: -4px; left: 50%; translateX(-50%)` | `left: 8px`      | `right: 8px`   |
| `bottom` | `top: -4px; left: 50%; translateX(-50%)`    | `left: 8px`      | `right: 8px`   |
| `left`   | `right: -4px; top: 50%; translateY(-50%)`   | `top: 8px`       | `bottom: 8px`  |
| `right`  | `left: -4px; top: 50%; translateY(-50%)`    | `top: 8px`       | `bottom: 8px`  |

> align=start/end일 때는 transform 없이 고정 offset(`8px`)으로 배치.

### 3.4 전체 위치 조합 (12가지)

|            | start | center   | end |
| ---------- | ----- | -------- | --- |
| **top**    | ✓     | ✓ (기본) | ✓   |
| **bottom** | ✓     | ✓        | ✓   |
| **left**   | ✓     | ✓        | ✓   |
| **right**  | ✓     | ✓        | ✓   |

---

## 6. 타입 (Variant)

### Icon Type

- **용도**: 트리거 위 짧은 라벨 (1-3단어).
- **padding**: `4px 8px`
- **줄바꿈**: `white-space: nowrap` (단일 줄 고정)
- **예**: "복사", "삭제", "Top start"

### Standard Type

- **용도**: 보충 설명 (1-3줄 문장).
- **padding**: `8px 12px`
- **최대 크기**: `320px × 160px`
- **줄바꿈**: `white-space: normal`, `word-break: break-word`
- **예**: "표준 툴팁은 간단한 보충 설명을 제공합니다. 최대 3줄까지 가능합니다."

---
