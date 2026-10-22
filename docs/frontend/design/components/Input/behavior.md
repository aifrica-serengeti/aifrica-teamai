# Input — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](./README.md)

## 7. 상태

7가지 상태. 상호작용에 따라 시각 변화.

| 상태          | 동작                         | 시각 변화                                                       |
| ------------- | ---------------------------- | --------------------------------------------------------------- |
| **Enabled**   | 값 입력 가능한 기본 상태     | border `#ddd`, surface `#fff`                                   |
| **Focused**   | 포커스 받아 입력 대기        | border 2px(1px+inset) `var(--accent-500)`, surface 유지                   |
| **Typing**    | 키보드 입력 중               | Focused 와 동일(커서 표시)                                      |
| **Filled**    | 값 입력 완료                 | Enabled 와 동일(값 채워짐)                                      |
| **Invalid**   | 유효성 검사 실패             | border 2px(1px+inset) `#e81919`, Error text 표시                |
| **Disabled**  | 모든 상호작용 차단           | surface `#f8f8f8`, text/placeholder 회색, `cursor: not-allowed` |
| **Read-only** | 수정 불가, 값 표시·복사 가능 | surface `#f8f8f8`, text 는 **enabled 색 유지**, focus 링 없음   |

### 구현 주의점

1. **Read-only ≠ Disabled**: Read-only 는 값을 보여주되 수정만 막는다. 시각은 surface 만
   inactive 로, 텍스트 색상은 enabled 와 동일하게 유지. Figma 스펙.
2. **Read-only focus 억제**: Tab 으로 focus 는 이동해야(스크린 리더 값 읽기) 하지만,
   **시각적 focus 링은 표시하지 않는다.** `:focus:not([data-readonly]):not(:disabled)` 셀렉터로
   focus 스타일을 enabled/invalid 에만 적용.
3. **Disabled 최우선**: disabled + invalid 가 겹치면 disabled 가 시각적으로 이긴다. invalid
   표현에 `:not(:disabled)` 추가.
4. **Focus 밀림 방지**: border-width 변화가 아닌 inset box-shadow 로 2px 표현(§4 참조).
5. **검증 layout shift 방지**: `reserveDescriptionSpace`가 true이면 Error text의 16px 설명 영역을
   기본 상태부터 확보한다. Error는 새 영역을 추가하지 않고 예약된 영역을 대체한다.

6. **Password 토글 문구**: `passwordShowLabel` / `passwordHideLabel`을 받으면 표시 상태에 맞는
   Icon Button label로 사용한다. 생략 시 기존 한국어 기본값을 유지해 기존 화면의 계약을 바꾸지 않는다.

---

## 9. 애니메이션

색상 전환은 **개별 컴포넌트 요소 레벨**에서 `transition: '<색상속성> 0.2s ease'`.
전역 `*` 셀렉터 사용 금지. `transition: all` 금지. 0.2s 통일.

```css
/* Container — border/bg/shadow 색상만 보간 */
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  box-shadow 0.2s ease,
  color 0.2s ease;

/* Placeholder / Label / Help text — 색상만 */
transition: color 0.2s ease;
```

> 다크/라이트 모드 전환 시에도 각 요소의 transition 이 보간되어 깜빡임 없이 부드럽게 전환.
> reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
> `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
> 전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

### 보조 액션 동작

`trailingAction`은 readOnly에서도 사용할 수 있다. 값 복사처럼 값을 변경하지 않는 동작을 page에서
주입하며 API 호출·클립보드 처리·결과 알림은 page가 소유한다. Input의 disabled 또는 액션의 disabled가
true이면 버튼을 비활성화한다. type=button으로 폼 제출을 유발하지 않으며 clear/password 토글과 함께 사용할 수 있다.

### 브라우저 제약 검증

- `invalid` 이벤트에서 `preventDefault()`로 브라우저 기본 말풍선만 숨긴다. native validity와 잘못된
  form 제출 차단은 그대로 유지한다. 정상 입력에 대한 submit과 호출자의 이벤트 처리도 보존한다.
- 최초 렌더, 아직 검증하지 않은 입력 중, 단순 blur에는 native 오류를 표시하지 않는다. 제출이나
  `checkValidity()` / `reportValidity()`로 `invalid`가 발생하면 기존 Error text 영역을 사용한다.
- native 오류가 표시된 동안에는 다음 입력에서 다시 검사한다. 올바른 값으로 고치면 오류를 지운다.
  controlled 값이나 검증 제약이 외부에서 바뀌면 이전 조건의 오류를 재사용하지 않는다.
  이전 값·제약으로 다시 돌아오더라도 새 검증 없이 과거 오류를 되살리지 않는다.
- `errorText`가 있으면 native 오류보다 우선한다. `disabled` / `readOnly`에서는 native 유래 오류를
  숨기되 호출자가 명시한 `errorText`를 임의로 지우지 않는다.
- form reset이 완료되면 native 오류를 지우고 uncontrolled counter를 실제 reset 값에 맞춘다.
  `preventDefault()`로 취소된 reset에서는 오류와 입력 상태를 유지한다.
- 호출자의 `onChange`/`onInvalid`가 `setCustomValidity()`로 오류를 변경할 수 있으므로 callback 이후의
  실제 validity와 문구를 표시한다. callback에서 정상화한 값에는 오류를 남기지 않는다.
- 취소된 기본 검증 UI를 대신해 같은 동기 검증 사이클에서 실제 `invalid` 이벤트를 발생시킨 control만
  순서대로 모은다. native 이벤트 사이의 microtask checkpoint가 끝난 다음 task에서 연결 상태·
  `willValidate`·현재 오류를 다시 확인하고 첫 오류에 focus한다.
  개별 필드의 `reportValidity()`는 검증하지 않은 다른 필드로 이동하지 않는다. `form=` 외부 control과
  native input/select/textarea도 같은 순서에 포함하며 raw-only 오류에는 새 focus 동작을 추가하지 않는다.

`InputField` 오류 피드백을 요청하는 `checkValidity()`에도 위 DS focus 정책을 적용한다. native
`checkValidity()` 자체는 focus하지 않지만 `invalid` 이벤트로는 제출·`reportValidity()`와 구분할 수
없으므로, native 메서드를 교체하지 않고 오류 표시 요청을 일관되게 다룬다.

`noValidate` form은 자동 native 검증을 시작하지 않는다. 이 컴포넌트가 page의 validation 정책을 변경하거나
native 제약을 업무 검증으로 대체하지 않는다.
