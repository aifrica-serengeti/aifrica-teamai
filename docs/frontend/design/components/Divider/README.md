# Divider

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Divider 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

## 1. 개요

콘텐츠 사이를 나누는 구분선. 관련 없는 콘텐츠 블록을 시각적으로 분리하거나, 그룹 내
섹션 경계를 만들 때 사용한다. 단순 선이 아니라 **선 주위의 8px 여백을 포함한 하나의
컴포넌트**라는 것이 핵심이다.

**기술 기반**: Radix UI `Separator` (또는 shadcn Separator)를 재사용하되, Figma 스펙에
맞춰 선 주위 방향별 8px 여백을 가진 래퍼로 감싼다. Separator 자체는 선만 렌더하므로
여백은 별도 래퍼 컴포넌트에서 담당한다.

---

### 의존 컴포넌트

공용 시각 컴포넌트 의존성은 없다. Radix 또는 shadcn Separator primitive는 1px 선의
semantic과 orientation만 제공한다. 8px wrapper 여백, Header 내부의 12px vertical override,
색상과 focus와의 조합은 Divider가 단독으로 소유한다.

