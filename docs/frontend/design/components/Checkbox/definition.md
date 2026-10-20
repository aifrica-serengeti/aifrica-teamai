# Checkbox & Checkbox Group — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](./README.md)

## 1. 의존 컴포넌트

의존 공용 컴포넌트 없음. Checkbox mark와 group semantics는 이 컴포넌트가 소유한다.
Radix/shadcn Checkbox primitive는 외부 기반이며 공용 컴포넌트 등록부의 직접 의존성은 아니다.

## 2. 구조 (Anatomy)

```
Checkbox Group
├── Group Label 행  ── Label + (선택사항) + * 필수 + info 아이콘
├── Checkbox Items
│   └── Checkbox Item (label 요소)
│       ├── Checkbox box 래퍼  ── Small 6px / Medium 8px 패딩 (히트 영역 24/32px)
│       │   └── Checkbox box (Small 12px / Medium 16px) + 마크 (체크마크/대시)
│       └── Label (Small 12px / Medium 14px)
│       └── Help text (optional, item 단위)
└── Group Help / Error text (12px)
```

단일 Checkbox(Item)는 Group 없이도 독립적으로 사용 가능하다.

---

## 3. 레이아웃 스펙

모든 수치는 px 단위. 사이즈별로 두 세트가 있다.

### Checkbox box (사각형)

| 항목                | Small              | Medium              | 비고                                                                          |
| ------------------- | ------------------ | ------------------- | ----------------------------------------------------------------------------- |
| 전체 박스           | 12×12              | 16×16               | `width`/`height` 고정. 상태 불문 동일                                         |
| box-sizing          | `border-box`       | `border-box`        | **필수**. 명시하지 않으면 1px border 가 바깥으로 빠져 14×14/18×18 로 찌그러짐 |
| 테두리 두께         | 1px                | 1px                 | `border-box` 포함. **절대 2px 아님**                                          |
| 형태                | 사각형             | 사각형              | `border-radius: 2px`                                                          |
| 히트 영역           | 24×24              | 32×32               | box 양옆 패딩(6px/8px)                                                        |
| 체크마크(Checked)   | 9px, strokeWidth 3 | 12px, strokeWidth 3 | 중앙 정렬, 인라인 SVG                                                         |
| 대시(Indeterminate) | 6×1.5px            | 8×2px               | 중앙 정렬, `translate(-50%, -50%)`                                            |

> **정렬 불변의 원칙 (두 가지)**:
>
> 1. 모든 상태(checked/unchecked/indeterminate/disabled)에서 박스 크기를 사이즈별로 고정한다.
>    상태별로 마크 SVG를 교체하면 정렬이 어긋나므로(Radio 교훈), 단일 박스 + 색상 전환 + 고정 마크로 해결한다.
> 2. **반드시 `box-sizing: border-box`를 명시**한다. 글로벌 reset에 의존하지 말고 컴포넌트
>    레벨에서 직접 지정한다. reset이 없는 환경에서는 1px border가 width/height 바깥으로 빠져나가
>    Small(12px)이 14×14, Medium(16px)이 18×18로 찌그어져 정사각형이 깨진다.

### 간격

| 위치                               | Small        | Medium              |
| ---------------------------------- | ------------ | ------------------- |
| Checkbox box 래퍼 패딩             | 6px          | 8px                 |
| Box ↔ Label (gap)                  | 2px          | 0 (box 직접 인접)   |
| Label 우측 패딩                    | 6px          | 8px                 |
| Item Label ↔ Item Help text (세로) | —            | 2px                 |
| Group Label 행 ↔ Items             | 4px          | 4px                 |
| Help text 좌측 인덴트              | 26px (=24+2) | 32px (=box 래퍼 폭) |
| Items 간 (Vertical)                | 0            | 0                   |
| Items 간 (Horizontal)              | 16px         | 16px                |

### Size

- **Medium** (기본): 16px box, 32px 히트 영역. 일반적인 폼.
- **Small**: 12px box, 24px 히트 영역. 밀집된 영역(테이블 셀 등).

### Alignment (Checkbox Group)

- **Vertical** (기본): 옵션을 세로로 나열.
- **Horizontal**: 옵션을 가로로 나열, item 간 16px.

---

## 7. Group Label 조합

Group Label 행은 다음 요소를 좌에서 우로 나열한다. 모두 optional이며, 순서가固定되어 있다.
Radio Group과 동일하다.

| 순서 | 요소          | 폰트                    | 색상                        | 조건          |
| ---- | ------------- | ----------------------- | --------------------------- | ------------- |
| 1    | Label         | 14px / 600 (SemiBold)   | `#1c1c1c` (dark: `#dddddd`) | label 지정 시 |
| 2    | (선택사항)    | 12px / 400              | `#757575` (dark: `#8f8f8f`) | optional prop |
| 3    | `*` 필수 표시 | 14px / 400, opacity 0.8 | `#e81919` (dark: `#f52424`) | required prop |
| 4    | info 아이콘   | 14px                    | `#555555` (dark: `#aaaaaa`) | infoIcon prop |

---
