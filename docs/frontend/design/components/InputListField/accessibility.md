# Input List Field 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 6. 접근성

- group label은 화면에 보이며 각 input에는 `aria-label="{label} {순번}"`을 준다. 같은 placeholder를
  여러 input의 유일한 이름으로 쓰지 않는다.
- 삭제 button은 `aria-label="{label} 항목 삭제"`이고 마지막 행에서는 disabled다.
- invalid가 있으면 모든 visible row Input에 `aria-invalid`가 전달된다. page는 제출 오류가
  발생한 뒤 오류가 보이도록 form-level `role="alert"`도 함께 둔다.
- `항목 추가`는 `<form>` 안에 있으므로 Button의 type contract를 확인한다. submit이
  발생하지 않게 공용 Button의 default type 또는 명시적 `type="button"`을 보장한다.
- item order가 의미 있을 수 있으므로 단순 삭제 외 drag reorder를 이 component에 임의로 추가하지 않는다.
