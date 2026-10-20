# Spinner — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](./README.md)

## 10. 접근성

| 항목           | 스펙                                                                                |
| -------------- | ----------------------------------------------------------------------------------- |
| 요소           | `<span role="status">`                                                              |
| 라벨           | `aria-label="로딩 중"` (기본값). 호출측에서 구체적 메시지로 override 가능           |
| 키보드         | Spinner 자체는 포커스 불가(정보 표시 전용). 포커스는 호스트 요소가 가짐             |
| 포커스 표시    | 없음. 정지된 장식 요소가 아닌 진행 상태 표시                                        |
| 스크린리더     | `role="status"` 로 로딩 진행 상태 전달. `aria-live` 영역에 배치 시 상태 변화가 전달 |
| SVG 숨김       | `<svg aria-hidden="true" focusable="false">` — 시각 정보는 role/aria-label 로 대체  |
| reduced-motion | `prefers-reduced-motion: reduce` 시 회전 정지(globals.css 전역 규칙)                |

> Spinner 는 `role="status"` 로 의미를 전달하며, SVG 자체는 보조 기기에서 무시되도록
> `aria-hidden="true"` 처리한다. 시각 회전과 스크린리더 안내가 분리된다.

---

