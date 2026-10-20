# Segmented Control — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](./README.md)

## 11. 접근성

| 항목        | 스펙                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------ |
| 키보드 탐색 | Radix 기반 — Tab 으로 진입, ←→ 로 옵션 이동(roving tabindex)                                     |
| 포커스 표시 | `:focus-visible` 시 inset 2px `var(--accent-500)` (dark: `var(--accent-400)`) 링. 마우스 클릭 시 미노출              |
| 역할        | Radix ToggleGroup `type="single"` 이 `role="radiogroup"`, 각 item 이 `role="radio"` 로 자동 설정 |
| 라벨        | `aria-label` prop 으로 그룹 라벨 전달. 각 item 은 옵션 라벨로 `aria-label`                       |
| 비활성      | `disabled` prop → Radix 가 `data-disabled` 설정 + `aria-disabled`                                |
| 히트 영역   | small 28×28, medium 32×32, large 36×36 — 최소 히트 영역 확보                                     |
| Info 아이콘 | `aria-label="추가 정보"`, hover 시 Tooltip 으로 설명 제공                                        |

---

