# Number Input — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](./README.md)

## 7. 상태

### 상태별 동작

| 상태          | 동작              | 시각                                                  |
| ------------- | ----------------- | ----------------------------------------------------- |
| **Enabled**   | 입력·증감 가능    | border 회색, surface 흰색                             |
| **Focused**   | 포커스 시         | border 2px(시각적) primary, 커서 표시                 |
| **Filled**    | 값이 있는 enabled | enabled 와 동일                                       |
| **Invalid**   | 검증 실패         | border 2px(시각적) red, help text error 색            |
| **Disabled**  | 입력·증감 불가    | surface inactive, text 흐림, 커서 not-allowed         |
| **Read-only** | 선택만 막음       | disabled 와 동일 표면, **값 text 는 enabled 색 유지** |

### 구현 주의점

- **Read-only ≠ Disabled**: read-only 는 시각적으로 disabled 와 같은 surface 를 쓰지만, 값 text 색상은 enabled 와 동일(`#1c1c1c`)하다. "선택만 막고 시각은 enabled" 가 핵심.
- **Disabled 가 시각적 최우선**: disabled + invalid 가 동시에 있을 때 disabled 색이 이긴다. CSS 셀렉터에서 `:not([data-disabled])` 로 invalid 를 제한한다.
- **Focus 링은 read-only/disabled 에 표시하지 않는다**: Tab 으로 focus 는 이동하되(스크린 리더 접근성), 시각적 focus 링은 enabled 상태에서만.
- **2px border 기법**: border-width 가 1→2 로 변하면 `box-sizing: border-box` 때문에 콘텐츠가 1px 밀린다. 대신 `border 1px` 위에 같은 색의 `inset box-shadow 1px` 를 겹쳐 2px 처럼 보이게 한다.

### 증감 로직

- **↑ / ↓ 키**: step 단위 증감. Shift + ↑/↓ 시 step × 10.
- **증감 버튼 클릭**: step 단위. min/max 범위 클램프.
- **직접 입력**: 내부 native type=number의 숫자 keyboard semantics를 사용한다. page가 일반 Input을
  type=number로 바꾸어 이 동작을 복제하지 않는다.
- controlled(`value` prop) / uncontrolled(`defaultValue`) 모두 지원.
- suffix는 값 변경·clamp·증감 계산에 관여하지 않는다. 단위가 있어도 native 값과 callback은 숫자/숫자
  문자열만 사용하며, 필수 label이나 placeholder를 단위로 대체하지 않는다.
- `textValue` 제어 모드에서는 빈 값도 문자열로 유지한다. 직접 입력은 즉시 `onTextValueChange`로 전달하고,
  blur·증감 시 min/max 범위로 정규화한다.
- 사용자가 입력 중인 `-`, 소수점, 빈 문자열을 즉시 `0`으로 바꾸지 않는다. domain이 허용하는 중간
  문자열은 `textValue`에 보존하고 blur/submit boundary에서 형식·min/max를 검증한다.

### 지수 표기 입력 차단

- native `type="number"`와 숫자 입력 의미는 유지하되 사용자 입력의 `e`/`E`는 허용하지 않는다.
  `1e` 같은 미완성 표기와 `1e3`, `1E-3` 같은 완성 표기 모두 대상이다.
- 편집 가능한 상태에서 조합 중이 아니고 Ctrl/Meta/Alt가 없는 `e`/`E` keydown을 취소한다.
  붙여넣기·드롭의 일반 텍스트에 `e`/`E`가 있으면 삽입 전체를 취소하며 기존 값을 유지한다.
- 키보드만으로 우회 차단하지 않는다. native `beforeinput`의 조합 중이 아닌 지수 문자 삽입도
  취소하고 listener는 unmount 시 해제한다. React의 `onBeforeInput` 전달 계약은 유지한다.
- 브라우저가 미완성 `1e`를 DOM 빈 문자열로 정제하더라도 입력 이벤트의 `data`에 `e`/`E`가
  있으면 의도적인 비우기로 처리하지 않는다. input/change 방어 처리에서 직전 표시값으로 복원하고
  같은 거부 이벤트로 `onValueChange`/`onTextValueChange`를 호출하지 않는다.
- 호출자의 keyboard/paste/drop handler는 한 번 전달하고 `defaultPrevented`를 존중한다.
  `onInput`은 안전한 값으로 복원한 뒤 한 번 전달한다. IME 조합을 keydown/beforeinput에서 끊거나
  복사·선택 같은 수정키 단축키를 막지 않는다.
- `-2`, `1.5`, `0`, 의도적인 비우기와 기존 blur·min/max·step·Shift 증감은 유지한다.
  외부 `value`/`defaultValue`/`textValue`를 이 사용자 입력 정책으로 다시 쓰지 않는다.

---

## 9. 애니메이션

### 상호작용 전환

색상 전환은 **개별 컴포넌트 요소 레벨**에서 `transition: '<색상속성> 0.2s ease'` 로 적용.
전역 `*` 셀렉터 사용 금지. `transition: all` 금지. 컴포넌트 내 0.2s 통일.

| 요소                               | transition 속성                                                     |
| ---------------------------------- | ------------------------------------------------------------------- |
| Container                          | `background-color, border-color, box-shadow` 각 `0.2s ease`         |
| Input text                         | `color 0.2s ease`                                                   |
| Placeholder                        | `color 0.2s ease`                                                   |
| Label / optional / required / help | `color 0.2s ease`                                                   |
| Icon Button                        | `background-color, color, opacity` 각 `0.2s ease` (IconButton 스펙) |

### 다크/라이트 모드 전환

전환 시 깜빡임 없이 부드럽게 보간. 각 요소의 색상 transition 이 담당.
reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
`@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---
