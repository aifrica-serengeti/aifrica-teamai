# Link — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Link 문서 인덱스](./README.md)

## 10. 접근성

| 항목        | 스펙                                                                                 |
| ----------- | ------------------------------------------------------------------------------------ |
| 요소        | 네이티브 `<a href>` (또는 `asChild` 로 react-router-dom `<Link>` 합성)               |
| 키보드      | Tab 이동, Enter 로 이동                                                              |
| 포커스 표시 | `:focus-visible` 시 1px outline + 1px gap                                            |
| 비활성      | `aria-disabled="true"` + `pointer-events: none` + 커서 `not-allowed`                 |
| 라벨        | 텍스트 라벨이 명확한 목적지/동작을 나타내야 함 ("자세히 보기", "문서" 등)            |
| 히트 영역   | 텍스트 영역. 모바일에서는 충분한 여백 권장                                           |
| 외부 링크   | `target="_blank"` 사용 시 `rel="noreferrer"` (또는 `rel="noopener noreferrer"`) 필수 |

---

