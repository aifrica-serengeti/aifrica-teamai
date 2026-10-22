# Checkbox & Checkbox Group — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](./README.md)

## 6. Group 상태

| 상태          | 동작                             | 라벨/설명 색상                           | 커서 (label/box 공통) |
| ------------- | -------------------------------- | ---------------------------------------- | --------------------- |
| **Enabled**   | 선택 가능                        | 기본색 (위 표 참조)                      | `pointer`             |
| **Invalid**   | 선택 가능, 하단 에러 메시지 표시 | 라벨은 기본색 유지, 에러 텍스트만 danger | `pointer`             |
| **Disabled**  | 선택 불가, 흐려짐                | disabled 색 (위 표 참조)                 | `not-allowed`         |
| **Read-only** | 선택 불가, 값 유지               | **enabled 색 유지** (회색 안 됨)         | `default`             |

### Read-only 핵심 규칙 (중요)

Read-only는 **"선택만 막고 시각은 enabled와 동일"** 하게 처리한다. disabled와 시각적으로 구분된다.

**구현상 주의점 (3가지 분리):**

1. **선택 제어**: Radix UI는 readOnly prop을 직접 지원하지 않으므로 `disabled` prop으로 선택을 막는다.
2. **라벨 색상**: 라벨 요소의 `data-disabled` 속성은 **진짜 disabled일 때만** 설정.
   - 절대 `[data-disabled] &` (descendant combinator)를 쓰면 안 된다 — Radix가 내부적으로
     `data-disabled`를 설정하므로 read-only일 때도 라벨이 회색으로 변한다.
3. **커서 분리**: box와 label에 `data-readonly` 속성을 별도 전달하여 disabled(`not-allowed`)와
   read-only(`default`) 커서를 구분한다.

---

## 9. 애니메이션

### 상호작용 (선택/해제, focus, hover)

라벨/도움말 색상, box 색상, focus border 모두 0.2초에 걸쳐 서서히 전환된다.

```css
/* checkbox box — 배경·테두리·focus border·마크 색상 */
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  outline-color 0.2s ease,
  color 0.2s ease;

/* 텍스트 — hover/disabled/다크모드 전환 */
transition: color 0.2s ease;
```

- box의 `outline-color` 도 transition 에 포함 → focus 진입/이탈 시 부드럽게.
- 마크(체크/대시)는 Radix Indicator로 즉시 표시/숨김 (fade 아님).

### 다크/라이트 모드 전환

깜빡임 없이 부드럽게 전환되도록, **각 색상 요소에 transition 적용** (전역 `*` 금지).

> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

## 11. 부모-자식 관계 (Indeterminate)

Checkbox의 핵심 사용 패턴. Table/Tree 등에서 상위 항목이 하위 항목을 일괄 제어할 때 사용한다.

### 동작 규칙

| 상황           | 부모 Checkbox                 |
| -------------- | ----------------------------- |
| 자식 0개 선택  | **Unchecked**                 |
| 자식 일부 선택 | **Indeterminate** (대시 표시) |
| 자식 전체 선택 | **Checked** (체크마크)        |

- 부모를 **Checked**로 클릭 → 모든 자식 Checked
- 부모를 **Unchecked**로 클릭 → 모든 자식 Unchecked
- 부모가 Indeterminate 상태에서 클릭 → 전체 선택(Checked)으로 전환

### 구현

개별 Checkbox의 `checked` prop에 `true | false | 'indeterminate'` 중 하나를 전달한다.
Radix Checkbox는 `checked="indeterminate"`를 네이티브 지원하며, `data-state="indeterminate"`를 설정한다.

---

