# CardAccordion — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](./README.md)

## 7. 상태

### Structural states (펼침/접힘)

| 상태          | data-state | Header 하단 border                  | Panel                  | Expand icon        |
| ------------- | ---------- | ----------------------------------- | ---------------------- | ------------------ |
| **Expanded**  | `"open"`   | `1px solid var(--ca-border-subtle)` | 표시 (애니메이션 펼침) | `rotate(0deg)` ▼   |
| **Collapsed** | `"closed"` | `transparent` (제거)                | 숨김 (애니메이션 접힘) | `rotate(-90deg)` ▶ |

### Interactive states

| 상태         | 시각 변화                                                             | 비고                                               |
| ------------ | --------------------------------------------------------------------- | -------------------------------------------------- |
| **Enabled**  | Header 배경 `--ca-header-bg`                                          | 기본 상태                                          |
| **Hovered**  | Header 배경 `--ca-header-bg-hover`                                    | 마우스 오버 시                                     |
| **Pressed**  | Header 배경 `--ca-header-bg-pressed`                                  | 마우스 다운 시                                     |
| **Focused**  | 파랑 outline 표시 (Trigger 영역만)                                    | 키보드 Tab 또는 클릭 시 `:focus-visible`           |
| **Disabled** | 텍스트·아이콘 `--text-disabled`/`--icon-disabled`, hover/pressed 무시 | `disabled` prop 또는 `interactiveState="disabled"` |

Header 우측 Actions는 Trigger의 형제 영역이므로 Button/IconButton을 조작해도 펼침 상태가 바뀌지 않는다.
각 action은 Trigger와 별도의 Tab stop을 가지며 자체 disabled와 accessible name을 유지한다.
개수·상태처럼 제목을 보충하는 정보는 `titleMeta`로 Trigger 안에 표시하며 별도 조작 상태를 갖지 않는다.

### Focus outline 형태 (중요)

Focus outline은 **Trigger(Header 56px) 내부**에 배치된다:

- **Expanded**: Header 영역만 감쌈 → 패널 영역은 focus outline에서 제외.
  상단 border-radius `10px`, 하단 `0px` (직각 — 패널과 연결).
- **Collapsed**: Header = 전체 카드 → 결과적으로 전체를 감쌈.
  전체 border-radius `10px`.

---

## 9. 애니메이션

### 펼침/접힘 (Panel)

CSS **keyframes animation**으로 구현. Radix가 제공하는
`--radix-accordion-content-height` 변수를 사용하여 실제 콘텐츠 높이에 맞춰 애니메이션.

```css
@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}
@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}

/* data-state="open" → accordion-down 0.25s ease */
/* data-state="closed" → accordion-up 0.25s ease */
```

> **주의**: `transition: height` 방식이나 `grid-template-rows: 0fr→1fr` 방식은
> 이 프로젝트 환경에서 애니메이션이 생략되므로 사용하지 않는다. 반드시 keyframes를 사용.

### Expand icon 회전

단일 `triangle_down` 아이콘을 회전시켜 표현:

| 상태      | transform        | 의미            |
| --------- | ---------------- | --------------- |
| Collapsed | `rotate(-90deg)` | 오른쪽 화살표 ▶ |
| Expanded  | `rotate(0deg)`   | 아래 화살표 ▼   |

```
transition: transform 0.2s ease
```

> 회전은 Radix Trigger의 `data-state="open"` 속성을 CSS 부모 셀렉터로 참조한다.
> `globalStyle`로 `[data-slot="accordion-trigger"][data-state="open"] .expandButton { transform: rotate(0deg) }` 처리.

### 색상 전환 (다크/라이트 모드)

각 컴포넌트 요소 레벨에서 색상 속성만 `0.2s ease`로 전환.
전역 `*` 셀렉터 사용 금지. `transition: all` 금지.

| 요소        | transition 속성                                           |
| ----------- | --------------------------------------------------------- |
| Item        | `background-color, border-color, box-shadow` 0.2s ease    |
| Header      | `background-color, border-color, border-radius` 0.2s ease |
| Trigger     | `color` 0.2s ease                                         |
| Content     | `background-color` 0.2s ease                              |
| Expand icon | `transform, background-color, color` 0.2s ease            |
| Title       | `color` 0.2s ease                                         |

---
