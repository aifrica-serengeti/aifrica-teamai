# Input List Field 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 8. 검증 체크리스트

- [ ] 첫 render가 최소 한 empty input을 가지는가?
- [ ] add/update/delete가 새 배열을 전달하며 마지막 행은 삭제되지 않는가?
- [ ] optional blank row가 payload에서 제거되고 required list는 trim 후 최소 하나를 요구하는가?
- [ ] create/detail size·variant가 정확히 전달되는가?
- [ ] label, 순번 aria-label, delete label/disabled, invalid state가 있는가?
- [ ] 긴 URL에서 input과 delete button이 overflow하지 않는가?
- [ ] light/dark, help/error, 1개/여러 개 행 상태를 확인했는가?

## 9. 재현 잠금 계약

- **State:** values/error/payload rule은 parent page 소유. InputListField는 immutable array callback만 수행한다.
- **Minimum row:** UI 배열은 항상 1개 이상. 빈 row와 valid list item을 혼동하지 않는다.
- **Policy:** URL/Origin 형식과 보안 제약은 domain validation 소유이며 UI component에 하드코딩하지 않는다.
- **Geometry:** 각 row의 input이 남은 너비를 소유하고 xlarge delete button은 고정; parent form은 field의 열 폭만 소유한다.

