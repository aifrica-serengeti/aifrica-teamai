# Radio & Radio Group — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Radio & Radio Group 문서 인덱스](./README.md)

## 10. 접근성

| 항목         | 스펙                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| 키보드 탐색  | Radix 기반 — Tab으로 진입, ↑↓←→로 옵션 이동                                             |
| 포커스 표시  | `:focus-visible` 시 box 주변 **1px gap** 떨어진 1px `var(--accent-500)` outline (dark: `var(--accent-400)`) |
| 에러 알림    | 에러 텍스트에 `role="alert"` (스크린 리더 즉시 알림)                                    |
| Invalid 상태 | `aria-invalid="true"`                                                                   |
| 필수 표시    | `*`는 `aria-hidden` (시각용). 의미는 별도 라벨/마크업으로 전달 권장                     |
| 히트 영역    | 32×32 button 중앙에 16×16 radio 원을 배치                                               |

- 보이는 group label은 `aria-labelledby`, help/error는 `aria-describedby`로 `radiogroup`에 연결한다.
- 보이는 label이 없는 저수준 `RadioGroupRoot` 조합은 사용처가 구체적인 `aria-label` 또는
  `aria-labelledby`를 제공해야 한다.
- Table 조합은 `radiogroup`을 table 외곽 frame에 적용하고 native table role을 덮어쓰지 않는다.
- 한 group은 Tab stop 하나만 제공하며, ↑↓←→ 이동과 선택은 Radix roving focus에 위임한다.

---
