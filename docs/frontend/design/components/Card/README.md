# Card

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Card 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

카드(Card)는 그리드 레이아웃 내에서 정보를 담은 콘텐츠를 보여줄 때 사용한다. 높은
자유도를 제공하여 콘텐츠를 유연하게 구성할 수 있으며, 다양한 크기와 타입으로 제공된다.

**2 Type × 3 Size × 6 State:**

- **Type**: Default(일반 카드) / Thumbnail(이미지 + 콘텐츠 카드)
- **Size**: Small(120px) / Medium(168px) / Large(346px) — Thumbnail은 Large만 지원
- **State**: Enabled / Hovered / Pressed / Selected / Disabled / Focused

**기술 기반**: 순수 React + vanilla-extract. shadcn/Radix를 사용하지 않는 독립 컴포넌트.
compound component 패턴으로 서브 요소를 조합한다. 내부 하위 요소는 공용 컴포넌트를 재사용한다.

목록 페이지에서 카드 보기를 제공할 때는 `Card.Summary`의 라벨·값 행을 사용한다.
페이지마다 동일한 글자 크기, 12px 행 간격, 우측 정렬과 말줄임을 다시 구현하지 않는다.
카드에 대표 생성일·갱신일처럼 날짜가 하나 있으면 `Card.SubDescription`에 배치하고,
항상 한 줄 말줄임으로 표시한다. `SubDescription`을 사용하는 목록 카드에는
`ExtendedHeader`를 이어 붙이지 않고, 날짜 외 메타데이터를 `Card.Summary`의 개별 행으로 옮긴다.
여러 날짜가 서로 다른 업무 의미를 가지면 날짜도 `Card.Summary`의 개별 행으로 유지한다.

---
