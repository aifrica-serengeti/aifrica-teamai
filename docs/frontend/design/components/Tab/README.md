# Tab

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Tab 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)
- [사용 예제](./implementation/examples.md)
- [기타 구현 참조](./implementation/reference.md)

## 1. 개요

하단선 기반 탭. 동일한 페이지/뷰 내에서 여러 패널 중 **하나**를 전환할 때 사용한다.
주로 콘텐츠 분류, 뷰 전환, 카테고리 이동에 활용한다.

선택된 탭은 하단에 2px primary 인디케이터가 표시되며, 미선택 탭은 1px 회색선이
전체 리스트 하단에 공통으로 깔린다. 항목 수(count)와 선행 아이콘(optional)을
라벨과 함께 표시할 수 있다.

한 줄 너비를 넘는 탭은 양 끝의 이동 버튼으로 탐색한다. 이동 버튼은 하단선과 직각으로
이어지는 평평한 경계, 콘텐츠 방향의 약한 그림자와 0.2초 등장·퇴장 전환을 사용한다.

**기술 기반**: Radix UI `Tabs` (또는 shadcn Tabs)를 기반으로 하되, 스펙
(44px 높이, 하단선 인디케이터, 상태별 색상 매핑)으로 완전히 커스텀한다.

---
