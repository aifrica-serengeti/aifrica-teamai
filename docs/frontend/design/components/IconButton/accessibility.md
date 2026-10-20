# Icon Button — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](./README.md)

## 10. 접근성

| 항목        | 스펙                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------- |
| 요소        | 네이티브 `<button>`. `type="button"` (기본값, 폼 제출 방지)                                 |
| 키보드      | Tab 이동, Enter/Space 로 활성화                                                             |
| 포커스 표시 | `:focus-visible` 시 1px `var(--accent-500)` outline + 1px gap                                         |
| 비활성      | `disabled` 속성 — 커서 `not-allowed`, 클릭 차단                                             |
| **라벨**    | icon-only 이므로 **`aria-label` 필수**. 시각 아이콘만으로는 스크린 리더가 의미를 전달 못 함 |
| 히트 영역   | 최소 Tiny 20×20. 모바일에서는 Medium(24) 이상 권장                                          |

### Tooltip 과 접근성의 관계

Icon Button 자체는 접근성 라벨을 `aria-label` 로 제공한다. Tooltip 은 **마우스 사용자**를 위한
**보조 시각 안내**일 뿐, 스크린 리더 접근성을 대체하지 않는다. 따라서 Tooltip 유무와 무관하게
`aria-label` 은 항상 제공해야 한다. 자세한 연동 규칙은 아래 "Tooltip 연동 규칙" 참조.

---

