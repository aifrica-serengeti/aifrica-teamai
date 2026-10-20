# Checkbox & Checkbox Group — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](./README.md)

## 10. 접근성

| 항목         | 스펙                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------- |
| 키보드 탐색  | Radix 기반 — Tab으로 진입, **Space**로 선택/해제                                                    |
| 포커스 표시  | `:focus-visible` 시 box 주변 **1px gap** 떨어진 1px `var(--accent-500)` outline (dark: `var(--accent-400)`), radius 4px |
| 에러 알림    | 에러 텍스트에 `role="alert"` (스크린 리더 즉시 알림)                                                |
| Invalid 상태 | `aria-invalid="true"`                                                                               |
| 필수 표시    | `*`는 `aria-hidden` (시각용). 의미는 별도 라벨/마크업으로 전달 권장                                 |
| 히트 영역    | Small 24×24 / Medium 32×32 최소 히트 영역 확보                                                      |
| 라벨 클릭    | `<label>`로 box를 감싸 라벨 클릭 시에도 토글                                                        |
| Group 역할   | Checkbox Group 루트에 `role="group"`                                                                |

---

