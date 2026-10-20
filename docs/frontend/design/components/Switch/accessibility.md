# Switch — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Switch 문서 인덱스](./README.md)

## 10. 접근성

| 항목        | 구현                                                                  |
| ----------- | --------------------------------------------------------------------- |
| 역할        | Radix Switch가 `role="switch"` 자동 부여                              |
| 키보드      | Tab으로 포커스 이동, Space/Enter로 토글                               |
| 포커스 표시 | `:focus-visible` 시 1px primary outline + 1px gap                     |
| 상태 노출   | `aria-checked` Radix 자동 부여. `aria-invalid`/`aria-disabled`로 보조 |
| 히트 영역   | switchWrap 8px 패딩으로 최소 히트 영역 확보                           |
| 라벨 연결   | `<label>` 요소로 switch를 감싸 클릭 영역 확장                         |

---

