# Badge — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Badge 문서 인덱스](./README.md)

## 10. 접근성

| 항목        | 스펙                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------- |
| 요소        | `<span role="status">`. `aria-live="polite"` 영역에 배치 시 알림 수 변화가 스크린리더에 전달 |
| 라벨        | `aria-label` 필수. Dot 은 "새 알림", Counter 는 "{count}개의 알림"                           |
| 키보드      | Badge 자체는 포커스 불가(정보 표시 전용). 포커스는 호스트 요소(Icon Button)가 가짐           |
| 포커스 표시 | Badge 자체는 focus 표시 없음. 호스트 요소의 focus 링 사용                                    |
| 대비        | 흰색 텍스트 `#ffffff` on `#d00a0a`(라이트) / `#e81919`(다크) — WCAG AA 충족                  |
| 숨김 처리   | `count <= 0` 일 때 DOM 에서 완전히 제거(`null`). `aria-hidden` 처리 아님                     |

> Badge 는 의미(semantics)를 가진 정보 요소이므로 장식용 `aria-hidden="true"` 가 아닌
> `role="status"` 로 의미를 전달한다. 단, 시각적으로만 장식 용도일 때는 호출측에서
> `aria-hidden="true"` 를 override 할 수 있다(props 확장).

---

