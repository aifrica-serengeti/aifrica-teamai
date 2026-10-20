# Button — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](./README.md)

## 9. 접근성

| 항목        | 스펙                                                                               |
| ----------- | ---------------------------------------------------------------------------------- |
| 요소        | 네이티브 `<button>`. `type="button"` (기본값, 폼 제출 방지)                        |
| 키보드      | Tab 이동, Enter/Space 로 활성화                                                    |
| 포커스 표시 | `:focus-visible` 시 1px `var(--accent-500)` outline + 1px gap                                |
| 비활성      | `disabled` 속성 — 커서 `not-allowed`, 클릭 차단, 스크린리더 "사용 불가"            |
| 라벨        | 텍스트 라벨이 명확한 동사("생성", "삭제")여야 함. 아이콘-only 는 `aria-label` 필수 |
| 히트 영역   | 최소 Tiny 24×24 (테두리/패딩 포함). 모바일에서는 Small(28) 이상 권장               |

---


`asChild`의 anchor는 native disabled가 없으므로 비활성 시 href 제거·aria-disabled·Tab 제외·활성화 차단을 함께 적용한다. Native button에는 disabled 속성을 유지한다. Icon 조합에서도 단일 host와 읽기 가능한 label을 보존한다.
