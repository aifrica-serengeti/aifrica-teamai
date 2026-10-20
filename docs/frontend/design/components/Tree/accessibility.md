# Tree — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](./README.md)

## 11. 접근성

재현 구현이 제공해야 하는 접근성 계약은 다음과 같다.

```text
Tree root: role="tree"
각 행: role="treeitem", aria-level={depth + 1}
부모 행: aria-expanded={expanded}
선택 행: aria-selected={selected}
비활성 행: aria-disabled="true"
children wrapper: role="group", aria-hidden={!expanded}
chevron: aria-label="펼치기" | "접기"
```

- IconButton은 실제 `<button>`이므로 Enter/Space로 동작한다.
- Checkbox는 공용 Radix Checkbox의 keyboard/ARIA 동작을 사용한다.
- `showLeafActions={false}`면 leaf의 더 보기 버튼과 메뉴 항목은 렌더하지 않아 Tab 순서에도 포함되지 않는다.
- 연결선 SVG, spacer, marker에는 `aria-hidden`을 준다.
- Row 자체는 `tabIndex={-1}`이다. 화살표 키 roving focus, Home/End, typeahead가 필요한
  제품에서는 consumer가 별도 focus manager를 제공해야 한다. 이 동작이 없는 상태에서
  `tabIndex=0`을 모든 행에 부여하면 키보드 Tab 순서가 과도하게 길어지므로 금지한다.
