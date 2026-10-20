# Table — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Table 문서 인덱스](../README.md)

## 구현 문서

- [TypeScript와 React 구현](./typescript.md)

## 11. 구현 참조

내장 `selection` 외에 `TableColumn.kind="selection"`으로 호출부가 제공하는 선택 control에도
중앙 정렬을 적용한다. 내장 및 커스텀 선택은 40/48px 열 + 다음 data 열의 시작 padding 0으로 같은
크기 규격을 사용한다. 선택 정책 자체는 호출부에 유지한다. 클릭 가능한 행의 focus-visible은 개별 cell이 아니라
행의 2px inset outline 하나로 렌더한다.
Radio selection의 root group에는 `aria-label={selectionLabels?.selectionColumn ?? `${ariaLabel} 행 단일 선택`}`을 부여해
개별 행 이름과 별개로 단일 선택 집합의 목적을 전달한다.

Radio selection은 [Radio 구현](../../Radio/implementation/README.md)의 `RadioGroupRoot`와 `Radio`를
사용하며, group root는 native table role을 덮어쓰지 않는 외곽 frame에 조합한다.

행 작업은 실제 작업 개수에 따라 공용 컴포넌트를 조합한다. 1개면 `Button size="small"
variant="tertiary"`, 2개 이상이면 `IconButton(more_vertical) → Menu`를 사용한다.
