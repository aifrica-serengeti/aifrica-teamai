# Textarea — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Textarea 문서 인덱스](./README.md)

## 10. 접근성

| 항목              | 구현                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **Label 연결**    | `<label htmlFor={id}>` 로 textarea 와 명시적 연결. id 필수                                    |
| **키보드**        | Tab 으로 focus 이동. Disabled 는 focus 불가(HTML 표준). Read-only 는 focus 이동 가능(값 읽기) |
| **Focus 표시**    | 2px 파란 링(enabled/invalid). Read-only/Disabled 는 focus 링 없음                             |
| **aria-invalid**  | invalid 상태 시 `aria-invalid="true"` 설정                                                    |
| **Error 알림**    | Error text 에 `role="alert"` — 스크린 리더가 즉시 읽음                                        |
| **필수 표시**     | `*` 는 `aria-hidden`(시각용). 필수 여부는 `required` prop 으로 전달                           |
| **Counter**       | `aria-hidden`(시각용 보조). 스크린 리더는 maxLength 제한으로 자동 인지                        |
| **Resize 접근성** | `resize: vertical` 로 세로 크기 조절 가능. disabled/read-only 시 `resize: none`               |

---

