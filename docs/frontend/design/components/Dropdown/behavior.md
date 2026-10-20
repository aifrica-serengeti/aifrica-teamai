# Dropdown — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](./README.md)

## 7. 상태

### 상호작용 상태

| 상태                    | 트리거          | 시각 변화                                       | 메뉴         |
| ----------------------- | --------------- | ----------------------------------------------- | ------------ |
| **Enabled**             | 기본            | border `#ddd`, surface `#fff`                   | 클릭 시 열림 |
| **Hovered**             | 마우스 오버     | surface → `#f8f8f8`                             | —            |
| **Pressed**             | 마우스 다운     | surface → `#f4f4f4`                             | —            |
| **Focused** (메뉴 열림) | 클릭/키보드     | 외곽 outline 링(`var(--accent-500)`), icon 180° 회전      | 열림         |
| **Selected**            | 옵션 선택       | enabled 와 동일 필드, placeholder 대신 선택값   | 닫힘         |
| **Invalid**             | validation 실패 | border 2px `#d00a0a`, error text 표시           | 클릭 시 열림 |
| **Disabled**            | `disabled` prop | surface `#fff`, text `#aaa`, cursor not-allowed | **안 열림**  |
| **Read-only**           | `readOnly` prop | surface `#f8f8f8`, 값 표시, cursor default      | **안 열림**  |

### 핵심 구현 주의점

1. **Read-only / Disabled 는 Menu 를 렌더하지 않는다** — Radix `MenuTrigger` 가 button 에
   이벤트를 직접 바인딩하므로 HTML `disabled` 만으로는 완전 차단이 안 된다. read-only/disabled
   일 때는 `<Menu>` 컴포넌트 자체를 렌더하지 않고 일반 `<div>` 필드를 렌더한다.

2. **Disabled 는 `<div>` 이므로 `:disabled` 의사 클래스가 안 먹는다** — disabled 필드는 div 로
   렌더되므로 hover/pressed 셀렉터에서 `:not(:disabled)` 대신 `:not([data-disabled])` 속성
   셀렉터를 사용해야 한다.

3. **Invalid border 는 실제 2px** — Input 컴포넌트처럼 inset box-shadow 로 2px 를 흉내내지
   않는다. button 은 `box-sizing: border-box` 이므로 실제 `border: 2px` 로 올려도 외형 높이가
   유지된다. Figma 스펙(`border-2`)과 정확히 일치.

4. **Focused = 메뉴 열림** — Radix Trigger 가 button 에 `[data-state="open"]` 을 설정한다.
   이때 focused line(외곽 outline 링)과 icon 회전이 활성화된다. 별도의 focus 상태 관리 불필요.

---

## 9. 애니메이션

### 색상 전환 (다크/라이트 모드 전환 포함)

모든 색상 관련 요소에 `transition: '<색상속성> 0.2s ease'` 적용. **전역 `*` 셀렉터 사용 금지.**

| 요소                                            | transition                                                    |
| ----------------------------------------------- | ------------------------------------------------------------- |
| field                                           | `background-color, border-color, box-shadow, color` 0.2s ease |
| focusedLine                                     | `border-color, opacity` 0.2s ease                             |
| fieldText / placeholderText                     | `color` 0.2s ease                                             |
| dropdownIcon                                    | `transform, color` 0.2s ease                                  |
| labelText / optionalText / helpText / errorText | `color` 0.2s ease                                             |

### Dropdown icon 회전

| 동작          | transform        | transition            |
| ------------- | ---------------- | --------------------- |
| 기본(닫힘)    | `rotate(0deg)`   | `transform 0.2s ease` |
| Focused(열림) | `rotate(180deg)` | 동일                  |

### Menu open/close 애니메이션

Menu 컴포넌트가 담당. fade + slide(6px, 0.15s ease). 상세는 `Menu/README.md` 참조.

---

