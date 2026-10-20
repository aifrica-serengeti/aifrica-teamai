# Stepper — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](./README.md)

## 10. 접근성

| 항목           | 구현                                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| 컨테이너 role  | `role="list"`                                                                     |
| 각 step        | `role="listitem"`                                                                 |
| 현재 step      | `aria-current="step"` (active 상태일 때만)                                        |
| 전체 비활성    | `aria-disabled="true"` (disabled prop)                                            |
| 클릭 가능 라벨 | `<button type="button">` — 키보드 Enter/Space 동작, focus-visible 포커스 링       |
| 키보드 탭      | 전체·단계별 clickable이 모두 허용한 라벨만 포커스 가능. 비활성 라벨은 포커스 제외 |
| 스크린 리더    | icon SVG에 `aria-hidden="true"`. 라벨 텍스트로 step 식별                          |

---
