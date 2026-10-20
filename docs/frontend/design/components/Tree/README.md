# Tree

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

계층 데이터를 펼치고 접는 Tree 컴포넌트다. 이 문서는 토큰, 레이아웃, 상태, 연결선,
접근성, 대용량 렌더링 방식과 구현 코드를 함께 정의한다. 다른 프로젝트에서 동일하게
재현할 때에도 이 문서의 규칙과 코드를 기준으로 한다.

> **기본 행 배경 규칙**: enabled/disabled 기본 행은 항상 CSS `transparent`다. 다크 모드에서도
> `--action-default` 같은 불투명 surface 토큰을 기본값으로 사용하지 않는다. 배경색은 hover,
> pressed, selected 상태에서만 표시한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [구현 인덱스](./implementation/README.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)

## 1. 개요

Tree는 파일/폴더, 조직도, 분류 체계처럼 부모-자식 관계를 행 단위로 표시한다.

- **Type**: `default`(folder/icon 기반), `symbol`(24px symbol icon 기반)
- **Size**: `small`(행 32px), `medium`(행 40px)
- **상태**: enabled, hovered, pressed, selected, focused, disabled, expanded/collapsed
- **선택 요소**: checkbox, leading icon, trailing menu. 정보 탐색 Tree는
  `showLeafActions={false}`로 선택 leaf의 기본 더 보기 메뉴를 생략할 수 있다.
- **리프 표식**: 펼칠 수 없는 모든 노드는 depth와 관계없이 chevron 슬롯 중앙에 5×5px 원형 marker를 둔다. 최상위 리프도 marker를 생략하지 않는다.
- **연결선**: 데이터 API는 루트 SVG 오버레이로 부모-자식 선을 한 좌표계에서 그린다. overlay는 행보다 위 레이어에 있어 selected 배경이 선을 가리지 않는다.
  프리미티브 조립 API는 spacer 내부 CSS branch를 사용할 수 있다.

`Tree`는 expanded/selected/checked 상태를 강제 소유하지 않는 controlled 렌더링 API다.
호출자는 `renderNode`에서 각 상태와 이벤트를 주입한다.
