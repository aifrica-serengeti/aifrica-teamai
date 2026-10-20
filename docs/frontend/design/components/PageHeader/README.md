# Page Header

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 애플리케이션 페이지의 제목·보조 정보·우측 작업·하단 탭을 조립하는 Page Header를
동일하게 재현하기 위한 완전한 스펙이다. 하위 버튼, 아이콘 버튼, 칩, 탭, 툴팁, Skeleton을 다시 구현하지
않고 각 공용 컴포넌트의 공개 API를 조합한다.

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

Page Header는 페이지 최상단에 놓인다.

- 좌측: optional back Icon Button, optional thumbnail, 제목, Chip, 제목 옆 action
- 제목 아래: optional lifecycle date Detail text, optional Description
- 제목 옆 액션은 Header가 소유하는 4px 간격으로 배치한다. 페이지의 추가 묶음은 `gap: inherit`로 같은 간격을 사용한다.
- 우측: optional Button group과 trailing action
- 하단: optional Tab navigation (`showContent=false`, 공용 44px trigger)
- loading: 전달된 제목·Chip·Detail·Description을 공용 Skeleton으로 각각 같은 line-height에 대체해
  Header 높이를 유지

Title은 한 줄만 허용한다. 가용 폭이 부족할 때만 ellipsis 처리하고, 실제로 잘린 경우에만
전체 제목 Tooltip을 노출한다. Detail text와 Description은 ellipsis를 사용하지 않으며, 폭이
부족하면 여러 줄로 확장한다.

Detail text에는 생성일·수정일·등록일·요청일·발생 시각처럼 페이지 대상을 대표하는 날짜
메타데이터만 배치한다. 작성자·소유자·버전·식별자·클라우드·리전 같은 일반 정보는 Detail
text에 섞지 않고 본문 정보 영역에 둔다. 날짜 필드가 없는 생성 화면이나 설정 화면은 Detail
text를 생략하며, 표시를 위해 현재 시각이나 임의 날짜를 만들지 않는다.

---
