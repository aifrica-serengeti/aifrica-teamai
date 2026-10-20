# Dropdown — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Dropdown 의 펼쳐지는 옵션 목록은 공용 **Menu** 를 사용한다. 재현자는 아래 컴포넌트를
먼저 확보한 뒤 조합해야 한다. 상세 절차는 [컴포넌트 카탈로그](../index.md)의 "공용 컴포넌트 조합 규칙" 참조.

| 컴포넌트 | 가이드라인                | 구현 상태           | 용도                                                                                                                                                      |
| -------- | ------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Menu** | [`Menu/README.md`](../Menu/README.md)    | 참조 계약 · 매핑 확인 필요 → **재사용** | 필드 클릭 시 펼쳐지는 옵션 목록. Radix DropdownMenu 기반. size 매핑: `dropdown small → menu small`, `medium → medium`, `large 이상 → large`               |
| **Icon** | [`Icon/README.md`](../Icon/README.md) ✅ | 참조 계약 · 매핑 확인 필요 → **재사용** | label 의 info icon(`info`, 14px) · field 의 dropdown icon(`chevron_down`, 16px). icon 색상은 `style={{ color: 'inherit' }}` 로 field 의 currentColor 상속 |

> Dropdown 은 Menu 의 마크업/상태/포지셔닝/애니메이션 로직을 **직접 구현하지 않고** 공용 컴포넌트를
> 재사용한다. Menu 가 담당하는 부분: content 컨테이너(border/shadow/animation), item 상태(hover/pressed/
> selected/disabled), section/divider/leading/trailing, submenu, 포지셔닝(collision detection).
>
> Dropdown 이 담당하는 부분: **field(trigger) 외형**(tertiary button 토큰, 상태별 색상, focus 링),
> label 행(optional/required/info), placeholder/selected text, help/error text, read-only/disabled
> 비활성 처리, 옵션 선택 로직(value/onValueChange).

---

## 3. 구조 (Anatomy)

```
Dropdown (세로 flex, gap 4px)
├─ labelRow (가로 flex, gap 2px, align center)
│   ├─ Label                  — "Label" (14px SemiBold)
│   ├─ (선택사항)             — 12px Regular (optional 일 때)
│   ├─ *                      — 14px Regular (required 일 때, #e81919)
│   └─ info icon              — 14px (infoIcon 일 때)
├─ container (세로 flex, gap 4px)
│   ├─ field (trigger — 가로 flex, align center, justify between, px 12/6)
│   │   ├─ Placeholder/Selected text — 14px Regular
│   │   ├─ Dropdown icon             — chevron_down 16px (Icon 컴포넌트, focused 시 180° 회전)
│   │   └─ Focused line              — absolute, 1px outline, -3px offset (open 시 노출)
│   └─ helpText / errorText  — 12px Regular
└─ [Menu — field 클릭 시 펼쳐짐, Radix DropdownMenu, sideOffset 4px]
```

---

## 4. 레이아웃 스펙

### Size 별 Field 높이

| Size          | Field 높이 | Menu size | 비고 |
| ------------- | ---------- | --------- | ---- |
| Small         | 28px       | `small`   |      |
| Medium (기본) | 32px       | `medium`  |      |
| Large         | 36px       | `large`   |      |
| X-Large       | 40px       | `large`   |      |

### Field 패딩/형태

| 속성                | 값                                                      | 비고                             |
| ------------------- | ------------------------------------------------------- | -------------------------------- |
| 좌측 패딩           | 12px                                                    | placeholder/selected text 시작점 |
| 우측 패딩           | 6px                                                     | dropdown icon 우측 여백          |
| Border radius       | 4px                                                     |                                  |
| 내부 정렬           | `align-items: center`, `justify-content: space-between` | text 좌측, icon 우측             |
| text 와 icon 간 gap | 8px (field 의 `gap: 8px`)                               |                                  |

### Focused line (포커스 링)

| 속성          | 값(enabled field)                        | 값(invalid field)                            |
| ------------- | ---------------------------------------- | -------------------------------------------- |
| position      | absolute, top 50%, translateY(-50%)      | 동일                                         |
| 좌/우 offset  | -3px                                     | **-4px** (2px border 밖으로 튀어나오기 위해) |
| 높이          | field 높이 + 4px                         | 동일                                         |
| border        | 1px solid `var(--accent-500)` (`--border-focused`) | 동일                                         |
| border radius | 6px                                      | 동일                                         |
| 노출 조건     | field `[data-state="open"]` (메뉴 열림)  | 동일                                         |

> **invalid + focused**: field border 가 2px 이므로 focused line offset 을 -4px 로 넓혀
> focus ring 이 두꺼운 border 바깥으로 충분히 튀어나오게 한다.

### Root / labelRow / 간격

| 요소             | gap | 비고                                |
| ---------------- | --- | ----------------------------------- |
| Root (세로)      | 4px | labelRow ↔ container                |
| Container (세로) | 4px | field ↔ helpText/errorText          |
| labelRow (가로)  | 2px | label ↔ (선택사항) ↔ \* ↔ info icon |

### 정렬 불변의 원칙

- Field 높이는 size 고정값. **상태(hover/pressed/focus)에 따라 높이가 변하지 않는다.**
- Invalid 시 border-width 가 1px→2px 로 변한다. button 은 `box-sizing: border-box` 이므로
  border 가 두꺼워져도 외형 높이는 유지된다(내부 콘텐츠가 1px 밀리지만 button 텍스트는
  수직 중앙 정렬이므로 시각적 영향 최소).
- Dropdown icon 은 항상 16px 고정, 우측 끝에 배치.

### Field 너비 자동 조정 규칙

- Field 는 `width: 100%` + `minWidth: fit-content` 로 설정.
- **부모가 고정 너비** → field 가 부모 너비에 맞춤. 이때 텍스트가 길면 `text-overflow: ellipsis` 로 잘림.
- **부모가 auto/fit-content** → field 가 콘텐츠(텍스트 + 아이콘) 너비에 맞춰 자동 조정. 텍스트가 잘리지 않음.
- `fieldText` 는 `flex: '0 1 auto'` 로 강제 축소를 방지. 부모가 고정 너비일 때만 축소.

### Menu 너비 규칙

- 기본적으로 **field 너비에 맞춤** — `minWidth: var(--radix-dropdown-menu-trigger-width)`.
- Menu item 이 field 보다 길면 자동으로 넓어짐(content 의 `width: max-content`).
- Menu item 이 짧아도 최소한 field 너비는 보장.

---

