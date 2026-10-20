# Chip — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Chip 문서 인덱스](./README.md)

## 10. 접근성

| 항목            | 스펙                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| 요소            | `<span aria-disabled>` (정보 표시 전용). disabled 시 `aria-disabled="true"`                                     |
| Trailing button | `<button type="button" aria-label="제거">`. disabled 시 `tabIndex={-1}` + `disabled`                            |
| 키보드          | Chip 자체는 포커스 불가(정보 표시). trailing button 은 Tab/Enter/Space 동작                                     |
| 포커스 표시     | trailing IconButton 의 `:focus-visible` 링 (`1px solid var(--icon-btn-focus-border)`)                           |
| Leading icon    | `aria-hidden="true"` (장식용, 스크린리더 무시)                                                                  |
| 대비            | filled: 흰 글자 `#ffffff` on 진한 배경 — WCAG AA 충족. subtle/outlined: 동색 글자 on pastel/투명 배경 — AA 충족 |

---

