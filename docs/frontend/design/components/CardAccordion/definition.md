# CardAccordion — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Card Accordion의 Header 우측 Actions 영역과 내부 아이콘은 공용 컴포넌트를 조합하여
사용한다. **재현 시 이 컴포넌트들을 먼저 확보한 뒤 조합해야 한다.**
각 하위 컴포넌트를 직접 구현하지 않는다 — 가이드라인을 따라 재사용한다.

| 의존 컴포넌트       | 용도                                                                    | 가이드라인             | 구현 확인 | 비고                                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------- | ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Radix Accordion** | 펼침/접힘 상태 관리 + `data-state` + `--radix-accordion-content-height` | shadcn `accordion`     | ✅        | `type="single"`, `collapsible`. Trigger/Content 에 `data-state="open"\|"closed"` 자동 설정. Content 에 `--radix-accordion-content-height` CSS 변수 자동 주입. |
| **Icon**            | Expand/Collapse chevron(triangle_down 회전), info 아이콘                | `Icon/README.md`       | ✅        | Figma System icon. expand: `name="triangle_down"`, `size="m"`(16px). info: `name="info"`, `size="s"`(14px). 색상 semantic: `default`/`disabled`/`subtler`.    |
| **Button**          | Header 우측 Actions 영역의 액션 버튼                                    | `Button/README.md`     | ✅        | `variant="tertiary"` 또는 `"primary"`, `size="medium"`. disabled prop 으로 상태 전파.                                                                         |
| **IconButton**      | Header 우측 Actions 영역의 아이콘 버튼(kebab, copy, refresh 등)         | `IconButton/README.md` | ✅        | `variant="ghost"`, `size="medium"`. icon prop 으로 `more_vertical`/`copy`/`refresh`/`edit` 등 지정. `aria-label` 필수.                                        |

### 의존 컴포넌트 조합 구조

```
CardAccordion
├── Radix Accordion (Root + Item)        — 펼침/접힘 상태 관리
│   ├── AccordionHeader (<h3> 래퍼)      — Radix 필수 래퍼, display:flex (스타일 리셋 필요)
│   │   ├── AccordionTrigger             — 제목 토글 영역, 56px, <button>
│   │   │   ├── Icon (triangle_down)      — expand/collapse chevron (회전)
│   │   │   ├── Title 텍스트              — "타이틀"
│   │   │   ├── Title meta (선택)          — 개수·상태 Chip 같은 비상호작용 요약
│   │   │   ├── Optional 텍스트 (선택)     — "(선택항목)"
│   │   │   └── Icon (info) (선택)        — 정보 아이콘
│   │   └── CardAccordion.Actions (선택)  — Trigger의 형제인 우측 버튼 그룹
│   │       ├── Button                    — 의존 컴포넌트 재사용
│   │       └── IconButton                — 의존 컴포넌트 재사용
│   └── AccordionContent (Panel)          — 본문, 펼침/접힘 애니메이션
│       └── CardAccordion.Panel           — 사용자 콘텐츠
```

> **구조 주의 (매우 중요)**: Radix Accordion 은 `AccordionTrigger` 앞에 반드시
> `AccordionHeader` 래퍼가 필요하다. 이 래퍼는 `<h3>` 요소로 렌더된다.
> 브라우저 기본 `<h3>` 스타일(margin, font-size: ~1.17em, font-weight: bold)을
> 리셋하지 않으면 header 가 비정상적으로 커진다.
> 또한 `display: flex` 로 설정해야 자식 Trigger 가 `flex: 1 1 0` 으로
> 전체 너비를 차지한다. 자세한 스타일은 Section 4 와 Section 12 참조.

> **주의**: Radix Accordion의 Trigger는 `<button>` 요소다. 따라서 Button과 IconButton을
> 주입받는 `<CardAccordion.Actions>`는 Trigger 내부가 아니라 같은 Header의 **형제 영역**으로
> 렌더한다. 이렇게 해야 중첩 button 없이 각 action이 독립적인 포커스·키보드 동작을 갖고,
> action 클릭도 accordion 토글로 전파되지 않는다.
> `titleMeta`는 Trigger 내부에 있으므로 Button·Link를 넣지 않고 비상호작용 Chip·텍스트만 사용한다.

---

## 3. 구조 (Anatomy)

```
┌─────────────────────────────────────────────────────┐
│  Card Accordion (AccordionItem)                      │
│  border 1px var(--ca-border), radius 8px             │
├─────────────────────────────────────────────────────┤
│  [▶] Title (선택항목) ℹ              [Button][⋮][⋮]  │  ← Header (Trigger, 56px)
│   ↑ expand icon  ↑ optional    ↑ info  ↑ Actions     │     padding: 12px 24px 12px 14px
├─────────────────────────────────────────────────────┤
│                                                       │  ← border-bottom 1px (Expanded 시에만)
│  ┌─────────────────────────────────────────────────┐ │
│  │  Panel (본문 콘텐츠)                              │ │  ← padding: 24px 24px 22px
│  │                                                    │ │     background: var(--ca-surface)
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Header 내부 구조

```
┌───────────────────────────────────────────────────────────┐
│ [▶]  Title  (선택항목)  ℹ              [Button] [⋮] [⋮]    │
│  ↑    ↑      ↑           ↑                    ↑           │
│  24px 16px    12px        14px              gap:8px        │
│  expand title  optional   info              actions        │
│                                                              │
│  gap:4px (title group)              gap:24px (title↔actions)│
└───────────────────────────────────────────────────────────┘
  padding: 12px 24px 12px 14px (top right bottom left)
  height: 56px
```

---

## 4. 레이아웃 스펙

모든 수치는 px 단위.

### AccordionItem (카드 컨테이너)

| 항목          | 값                                               |
| ------------- | ------------------------------------------------ |
| 너비          | `100%` (부모 컨테이너에 맞춤. Figma 기본 460px)  |
| border        | `1px solid var(--ca-border)`                     |
| border-radius | `8px`                                            |
| overflow      | `visible` (focus outline `-3px`이 잘리지 않도록) |
| position      | `relative`                                       |

### AccordionHeader (Radix `<h3>` 래퍼) — 필수

> **재현자 주의 (가장 흔한 오류)**: Radix Accordion 은 `AccordionTrigger` 바깥에
> 반드시 `AccordionHeader` 래퍼를 요구한다. 이 래퍼는 브라우저에서 `<h3>` 요소로 렌더된다.
> `<h3>` 의 브라우저 기본 스타일을 **반드시 리셋**해야 한다. 리셋하지 않으면:
>
> - 기본 `margin: 0.83em 0` 이 추가되어 header 위아래에 여백이 생김 → **header 가 비정상적으로 커짐**
> - 기본 `font-size: 1.17em` 이 적용되어 폰트 크기가 틀어짐
> - 기본 `font-weight: bold` 가 적용되어 의도치 않은 굵기가 됨
> - `display: block` 이 되어 자식 Trigger 의 `flex: 1 1 0` 가 작동하지 않음
>
> 아래 스타일을 **반드시** `AccordionHeader` 에 적용해야 한다.

| 항목      | 값        | 비고                                                             |
| --------- | --------- | ---------------------------------------------------------------- |
| display   | `flex`    | **필수** — 자식 Trigger 가 `flex: 1 1 0` 으로 전체 너비 차지     |
| margin    | `0`       | **필수 리셋** — `<h3>` 기본 margin 제거                          |
| padding   | `0`       | 리셋                                                             |
| font      | `inherit` | **필수 리셋** — `<h3>` 기본 font-size/weight 제거, 부모에서 상속 |
| width     | `100%`    | Item 전체 너비 차지                                              |
| min-width | `0`       | flex 오버플로우 방지                                             |

### AccordionTrigger (Header 버튼)

> Trigger 는 `AccordionHeader` 내부의 `<button>` 요소이다.
> `flex: 1 1 0` 으로 Header 의 전체 너비를 차지한다.

| 항목                        | 값                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------ |
| 높이                        | **56px** (고정)                                                                      |
| padding                     | `12px 24px 12px 14px` (top right bottom left)                                        |
| gap (title group ↔ actions) | `24px`                                                                               |
| flex                        | `1 1 0` (Header flex 컨텍스트에서 전체 너비 차지)                                    |
| border-radius               | Collapsed: `8px` / Expanded: `8px 8px 0 0` (상단만 둥글게)                           |
| border-bottom               | `1px solid var(--ca-border-subtle)` — **Expanded 시에만**. Collapsed 시 transparent. |
| **font**                    | `inherit` (**필수** — 없으면 button 기본 serif 폰트로 렌더됨)                        |
| color                       | `var(--text)`                                                                        |
| background                  | `var(--ca-header-bg)`                                                                |
| cursor                      | `pointer`                                                                            |
| outline                     | `none` (focus ring 은 별도 span 으로 처리)                                           |

### Header 내부 요소

| 요소                   | 크기                          | 간격                   | 비고                                    |
| ---------------------- | ----------------------------- | ---------------------- | --------------------------------------- |
| Expand icon 컨테이너   | 24×24px                       | —                      | `triangle_down` 아이콘 16px 중앙 정렬   |
| Title 텍스트           | Title1 (16px SemiBold)        | title group 내 gap 4px | `white-space: nowrap`, ellipsis         |
| Title meta             | 비상호작용 Chip·텍스트        | 내부 gap 6px           | 제목 바로 옆, 좁은 폭에서 wrap          |
| Optional 텍스트        | Body3 (12px Regular)          | Title 옆               | 예: "(선택항목)". `white-space: nowrap` |
| Info icon              | 14px (Icon size="s")          | Optional 옆            | `info` 아이콘. 색상 `--icon-subtler`    |
| Actions (Button Group) | Button 32px / IconButton 32px | gap 8px                | `flex-shrink: 0`, 우측 정렬             |

### AccordionContent (Panel)

| 항목            | 값                                       |
| --------------- | ---------------------------------------- |
| padding         | `24px 24px 22px` (top right+left bottom) |
| border-radius   | `0 0 8px 8px` (하단만 둥글게)            |
| overflow        | `hidden`                                 |
| 펼침 애니메이션 | CSS keyframes, 0.25s ease                |

---
