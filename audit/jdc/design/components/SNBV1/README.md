# SNB v1

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


이 문서는 기존(Old) Side Navigation **SNB v1**을 동일하게 재현하기 위한 완전한 스펙이다.
확장(240px)과 축소(60px) 모드, 1·2·3 depth, 즐겨찾기, 접힌 상태의 hover menu 및
공용 ScrollArea를 함께 정의한다. SNB v2와 혼용하지 않는다.

> **구현 시작 전 경고 — 일반적인 sidebar를 만들면 안 된다.** SNB v1은 흰색 card/menu
> 안에 아이콘을 나열하는 컴포넌트가 아니다. root·inline child panel·collapsed portal menu까지
> 모두 navy palette를 갖는 하나의 navigation shell이다. 이 문서의 **토큰 CSS, SNB adapter
> CSS, brand asset, Icon component, DOM 구조**를 한 묶음으로 적용하지 않은 구현은 미완성이다.

> 이 문서는 standalone 재현 문서다. 여기에 적힌 shell geometry, state 소유, asset,
> screenshot gate만 적용하며 별도 디자인 문서를 참조하지 않는다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](implementation/README.md)
- [정의와 구조](definition.md)
- [스타일과 토큰](styles.md)
- [상태와 동작](behavior.md)
- [접근성](accessibility.md)
- [검증과 재현](verification.md)
- [CSS와 스타일 구현](implementation/css.md)
- [TypeScript와 React 구현](implementation/typescript.md)
- [기타 구현 참조](implementation/reference.md)

## 1. 개요

SNB v1은 일반 앱 surface와 분리된 navy navigation shell이다. 메뉴 데이터는 최대 3 depth까지
지원하며, 부모 item은 accordion으로 하위 항목을 열고 닫는다. 넓은 모드에서는 모든 계층을
인라인으로 표시하고, 좁은 모드에서는 1depth의 아이콘 rail과 우측 hover menu로 전환한다.

- **Expanded**: 240px 폭, 브랜드 헤더 78px, 인라인 tree navigation.
- **Collapsed**: 60px 폭, 32px icon button rail, 하위 depth는 오른쪽 Menu popup.
- **즐겨찾기**: leaf item에만 설정 가능. Expanded에서는 상단 shortcut section, Collapsed에서는
  star Icon Button의 hover menu로 노출한다.
- **상태 소유**: `collapsed`, `openIds`, `activeId` 모두 controlled/uncontrolled 양쪽을 지원한다.

- 상태 전환 잠금: breakpoint는 v1 rail의 240px/60px state를 바꾸지 않는다. 접힘은
  명시적 collapsed API 또는 v1 shell이 정한 동일한 controlled state에서만 전환한다.

