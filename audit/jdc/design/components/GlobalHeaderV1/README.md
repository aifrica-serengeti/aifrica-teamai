# Global Header v1

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


이 문서는 Side navigation 오른쪽 상단에 놓이는 기존 **Global Header v1**을 동일하게 재현하기 위한
완전한 스펙이다. 공통 하위 컴포넌트의 외형·상태·접근성 로직을 다시 만들지 않고 조합한다.

> 새 프로젝트에서는 [reproduction.md](../../../../../docs/frontend/design/reproduction.md)의 shell
> geometry, 단일 state 소유, exact asset, screenshot gate를 이 문서와 함께 적용한다.

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

## 1. 개요

Global Header v1은 현재 위치(Breadcrumb), 메뉴 검색, 전역 액션(알림·도움말·추가 메뉴),
계정 메뉴를 한 줄에 배치하는 application shell 헤더다.

- 기본 높이: **56px**
- 좌측: optional Breadcrumb
- 우측: Search(large) → 전역 Icon Button 3개 → Account Menu
- 다크 모드: `.dark`의 semantic token 재매핑만으로 전환
- 계정 메뉴: Radix 기반 공용 Menu로 열고 닫는다. 트리거가 열린 상태면 pressed 배경과 위 방향
  chevron을 표시한다.
- Header v1은 SNB v1 오른쪽 application container 안에만 둔다. Header 자체에 shell radius나
  SNB 폭을 소유시키지 않으며, v2의 48px/header toggle 규칙과 혼합하지 않는다.

> **중복 구현 금지:** Search 입력, 아이콘 버튼, badge, avatar, menu, chip을 이 컴포넌트 안에서
> 새로 만들지 않는다. 아래 의존 컴포넌트를 먼저 구현한 뒤 그 공개 API를 조합한다.

---

