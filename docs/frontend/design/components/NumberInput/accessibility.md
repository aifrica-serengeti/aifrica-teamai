# Number Input — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](./README.md)

## 10. 접근성

| 항목             | 구현                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| **키보드 입력**  | Tab 으로 input 포커스 이동. ↑/↓ 증감, Shift+↑/↓ ×10. 직접 숫자 입력.                               |
| **증감 버튼**    | `tabIndex={-1}` (input 이 주 포커스). `aria-label="값 증가/감소"`.                                 |
| **aria-invalid** | invalid 상태 시 `aria-invalid="true"`. 스크린 리더가 에러 인식.                                    |
| **Label 연결**   | `<label htmlFor={id}>` 로 input 과 연결.                                                           |
| **필수 표시**    | `required` prop 시 \* 마크 + (필요 시 `aria-required="true"`).                                     |
| **Error text**   | `role="alert"` 권장. invalid 시 스크린 리더가 즉시 인식.                                           |
| **Focus 링**     | input focus 시 container 에 2px primary 링. read-only/disabled 는 시각적 링 없음(Tab 이동은 가능). |
| **히트 영역**    | Icon Button 최소 20×20px(small) / 24×24px(나머지).                                                 |

`textValue` 제어 모드에서도 실제 input에는 항상 string value를 전달해 빈 값으로 control 모드가 바뀌지 않게 한다.

지수 문자 입력을 막아도 native `type="number"`의 spinbutton 의미와 숫자 keyboard는 유지한다.
keydown/beforeinput에서 IME 조합을 중단하거나 Ctrl/Meta/Alt 단축키를 차단하지 않는다. 붙여넣기·드롭도
지수 문자가 있는 삽입만 전체 거부하며 포커스와 기존 값을 보존한다. 이 거부만으로 별도 오류 말풍선이나
매 키 입력마다 live region을 만들지 않는다. 업무상 범위·필수 오류는 기존 label/help/error 연결로 알린다.

suffix에는 `${inputId}-suffix` ID를, help/error에는 `${inputId}-help` ID를 부여하고 input의
`aria-describedby`에 연결한다. 호출자가 전달한 기존 설명 ID도 함께 유지한다. 단위는 별도 Tab 정지점이
아니며 외부 label의 accessible name을 바꾸지 않는다. 시·분처럼 같은 화면에 여러 NumberInput이 있으면
`increaseLabel`/`decreaseLabel`로 '시 증가', '분 감소'처럼 제어 대상을 구분한다.

---

호출자가 `aria-invalid={true}` 또는 `"true"`를 전달하면 오류 문구 없이도 input과 container의 오류 상태를 유지한다. `errorText`를 제공하면 기존 오류 문구를 함께 표시한다.
