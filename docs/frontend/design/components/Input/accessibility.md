# Input — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](./README.md)

## 10. 접근성

| 항목                 | 구현                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Label 연결**       | `<label htmlFor={id}>` 로 input 과 명시적 연결. id 필수                                                                                                    |
| **키보드**           | Tab 으로 focus 이동. Disabled 는 focus 불가(HTML 표준). Read-only 는 focus 이동 가능(값 읽기)                                                              |
| **Focus 표시**       | 2px 파란 링(enabled/invalid). Read-only/Disabled 는 focus 링 없음                                                                                          |
| **aria-invalid**     | invalid 상태 시 `aria-invalid="true"` 설정                                                                                                                 |
| **Error 알림**       | Error text 에 `role="alert"` — 스크린 리더가 즉시 읽음                                                                                                     |
| **필수 표시**        | `*` 는 `aria-hidden`(시각용). 필수 여부는 `required` prop 으로 전달                                                                                        |
| **Icon Button 라벨** | clear / password 토글 버튼에 `aria-label` 필수(의존 컴포넌트 스펙)                                                                                         |
| **Password 토글**    | `aria-pressed` 로 토글 상태 알림. `aria-label`은 `passwordShowLabel` / `passwordHideLabel`을 우선 사용하고, 생략 시 "비밀번호 표시/숨기기" 기본값으로 전환 |
| **자동완성**         | `type` 에 맞춰 `autoComplete` 권장(email/current-password/new-password 등)                                                                                 |

`reserveDescriptionSpace`만으로 생성된 빈 영역은 `aria-hidden`이며 `aria-describedby`에 연결하지 않는다.
실제 Help/Error가 있을 때만 설명 id를 input에 연결한다.

---

### 보조 액션 접근성

`trailingAction.label`은 필수이며 “리소스 ID 복사”처럼 대상과 동작을 함께 설명한다.
readOnly 입력과 액션 버튼 모두 Tab 순서에 남고 버튼은 Enter/Space로 실행한다. disabled 액션은
Tab 순서에서 제외된다. label/htmlFor와 Help/Error의 aria-describedby 연결은 그대로 유지한다.

### 브라우저 오류의 대체 피드백

native 오류도 다른 Error text와 동일하게 `role="alert"`로 표시하고 input의 `aria-invalid`와
`aria-describedby`에 연결한다. 호출자가 전달한 기존 `aria-describedby` id는 제거하지 않고 함께
연결한다. 색상이나 브라우저 전용 말풍선에만 오류 정보를 의존하지 않는다.

기본 말풍선을 취소한 뒤 해당 검증 사이클에서 실제 invalid 이벤트가 발생한 첫 control에 focus를
제공한다. form에 InputField 외의 native input/select/textarea가 섞이거나 `form=`으로 외부에 연결되어
있어도 이벤트 순서와 최신 `willValidate`·validity를 확인한다. 개별 필드만 검증했다면 그 필드가 대상이다.
InputField가 피드백을 표시한 검증 요청에는 `checkValidity()`도 같은 DS focus 정책을 적용하지만,
raw-only 오류의 focus 정책은 바꾸지 않는다.
초기 렌더·untouched 입력·blur마다 alert를 만들지 않으며, 입력을 올바르게 수정하면 오래된 오류 연결을
제거한다. 다국어 화면은 `nativeValidationMessage`도 locale resource에서 제공한다.
