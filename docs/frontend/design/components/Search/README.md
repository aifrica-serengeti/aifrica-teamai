# Search

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Search 컴포넌트를 상세 상태·시각 계약을 구현하기 위한 완전한
스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

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

## 1. 개요

검색어 입력 컴포넌트. 사용자가 정보를 손쉽게 검색·필터링할 수 있도록 한다. Leading search
icon(돋보기) · Placeholder · Close button(원형 + X) 조합으로 구성된다. 입력값이 있을 때만
Close button 이 표시되며, 클릭 시 값을 즉시 지운다.

**기술 기반**: 표준 HTML `<input>` 요소 기반의 **Input 컴포넌트**를 의존성으로 사용한다.
Input 의 form semantic 토큰, 상태별 border/surface 전환, focus 시 inset box-shadow 2px 링을
그대로 상속하되, Search 는 여기에 leading icon 과 trailing close button 을 추가한다.
Radix 는 사용하지 않는다(네이티브 input 의 접근성/폼 제출을 그대로 활용).

---

