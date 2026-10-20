# Status — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Status 문서 인덱스](./README.md)

## 10. 접근성

| 항목        | 스펙                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 요소        | `<span role="status">`. 상태 변화가 스크린리더에 전달                                                                          |
| 라벨        | `aria-label` 필수. 상태 이름(Error/Success/...) 또는 커스텀 라벨                                                               |
| 키보드      | Status 자체는 포커스 불가(정보 표시 전용, 읽기 전용). 포커스는 호스트(테이블 행 등)가 가짐                                     |
| 포커스 표시 | Status 자체는 focus 표시 없음                                                                                                  |
| 대비        | 흰색 마크 `#ffffff` on error `#d00a0a`/warning `#f0bb00`/success `#05a85a`/primary `var(--solution-primary)` — WCAG AA 충족                    |
| In progress | Spinner 컴포넌트가 자체 `role="status"` + `aria-label="로딩 중"` 을 가짐. 부모 Status 와 중복을 피해 `aria-hidden="true"` 전달 |
| Icon only   | `showLabel={false}` 시에도 `aria-label` 은 유지(시각 라벨만 숨김)                                                              |

> Status 는 의미(semantics)를 가진 정보 요소이므로 장식용 `aria-hidden="true"` 가 아닌
> `role="status"` 로 의미를 전달한다. 단, inProgress 상태에서 내부 Spinner 는
> 부모 Status 의 `aria-label` 이 중복 읽히는 것을 막기 위해 `aria-hidden="true"` 처리한다.

---

