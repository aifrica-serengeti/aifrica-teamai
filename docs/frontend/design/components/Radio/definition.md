# Radio & Radio Group — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Radio & Radio Group 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

의존 공용 컴포넌트 없음. Radio indicator와 roving focus/group semantics는 이 컴포넌트가
소유한다. Radix/shadcn Radio primitive는 외부 기반이며 등록부의 직접 의존성은 아니다.

## 2. 구조 (Anatomy)

```
Radio Group
├── Group Label 행  ── Label + (선택사항) + * 필수 + info 아이콘
├── Radio Items
│   └── Radio Item (label 요소)
│       ├── Radio control  ── 32×32 hit area
│       │   └── Radio 원 (16px) + 내부 점 (7px, 선택 시)
│       └── Text 컬럼
│           ├── Item Label (14px)
│           └── Item Help text (12px, optional)
└── Group Help / Error text (12px)
```

---

## 3. 레이아웃 스펙

모든 수치는 px 단위.

### Radio icon (원)

| 항목              | 값    | 비고                                  |
| ----------------- | ----- | ------------------------------------- |
| 전체 박스         | 16×16 | `width`/`height` 고정. 상태 불문 동일 |
| 테두리 두께       | 1px   | `border-box` 포함. **절대 2px 아님**  |
| 형태              | 원형  | `border-radius: 50%`                  |
| 히트 영역         | 32×32 | radio 양옆 8px 패딩                   |
| 내부 점 (선택 시) | 7×7   | 중앙 정렬, `translate(-50%, -50%)`    |

> **정렬 불변의 원칙**: 모든 상태(checked/unchecked/disabled)에서 16px 박스를 고정한다.
> 상태별로 원의 크기를 바꾸면(예: Figma SVG가 unchecked r=7.5, checked r=8) 정렬이 어긋난다.
> 단일 박스 + 색상 전환으로 해결한다.

### 간격

| 위치                        | 값                              |
| --------------------------- | ------------------------------- |
| Radio control hit area      | 32×32 (16px 원을 중앙 배치)     |
| Radio 원 ↔ Text 컬럼        | 8px (32px hit area의 내부 여백) |
| Item Label ↔ Item Help text | 2px (세로)                      |
| Group Label 행 ↔ Items      | 4px                             |
| Items 간 (Vertical)         | 8px (gap)                       |
| Items 간 (Horizontal)       | 8px (gap), 가로 나열            |

### Alignment

- **Vertical** (기본): 옵션을 세로로 나열. 항목 수가 많거나 라벨이 길 때.
- **Horizontal**: 옵션을 가로로 나열. 항목 수가 적고 라벨이 짧을 때.

### 공개 조합 API

| API              | 역할                                                                                       | 기본 사용처                                          |
| ---------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `RadioGroupRoot` | Radix group semantics, controlled value, roving focus와 방향키 탐색을 소유하는 저수준 root | native Table처럼 item 사이에 별도 구조가 필요한 조합 |
| `Radio`          | 32×32 hit area 안에 16px 원과 7px indicator를 렌더링하는 단일 item                         | 반드시 `RadioGroupRoot` 또는 `RadioGroup` 내부       |
| `RadioGroup`     | 보이는 label, 옵션, help/error와 `RadioGroupRoot`를 조합한 field component                 | 일반 form의 단일 선택 field                          |

`RadioGroupRoot`의 `asChild`는 기존 semantic 구조를 보존해야 할 때만 사용한다. Table에서는
외곽 `div`를 root로 삼고 `<table>`, `<thead>`, `<tbody>`, `<tr>`의 native role을 변경하지 않는다.

---

## 7. Group Label 조합

Group Label 행은 다음 요소를 좌에서 우로 나열한다. 모두 optional이며, 순서가固定되어 있다.

| 순서 | 요소          | 폰트                    | 색상                        | 조건          |
| ---- | ------------- | ----------------------- | --------------------------- | ------------- |
| 1    | Label         | 14px / 600 (SemiBold)   | `#1c1c1c` (dark: `#dddddd`) | label 지정 시 |
| 2    | (선택사항)    | 12px / 400              | `#757575` (dark: `#8f8f8f`) | optional prop |
| 3    | `*` 필수 표시 | 14px / 400, opacity 0.8 | `#e81919` (dark: `#f52424`) | required prop |
| 4    | info 아이콘   | 14px                    | `#555555` (dark: `#aaaaaa`) | infoIcon prop |

---
