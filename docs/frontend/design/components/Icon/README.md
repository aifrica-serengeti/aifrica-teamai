# Icon

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Icon 컴포넌트를 상세 상태·시각 계약을 구현하기 위한 완전한 스펙이다.
이 파일만 있어도 사이즈·스트로크·색상·상태·코드를 모두 복원할 수 있다.

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

아이콘 컴포넌트. 특정 액션, 상태, 개념을 간결하게 전달하는 시각 요소.

**3가지 유형:**

| 유형            | 용도                                                       | 범위                                                 |
| --------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| **System icon** | 생성·수정·삭제·격자 전환 등 일반 작업 (plus, edit, grid …) | **본 가이드 대상** — `Icon` 컴포넌트                 |
| Status icon     | 객체 상태 보조 (error, warning, success …)                 | 별도 Status 컴포넌트에서 구성 → 해당 가이드라인 참조 |
| Private icon    | 타사 서비스 (Azure, Node.js …). MIT 라이선스 별도 관리     | 본 가이드 범위 외                                    |

> 본 문서는 **System icon** 만 다룬다. Status icon (이름별 자동 색상 매핑)은 별도의
> Status 컴포넌트 가이드라인에서 다룬다.

**기술 기반**: [lucide-react](https://lucide.dev/) 를 기본 렌더링 백엔드로 사용하되, 스펙
(사이즈 8단계, 사이즈별 스트로크 굵기, semantic 색상 토큰, 둥근 endcap/join)을 강제 적용하는
래퍼 컴포넌트. lucide 의 24px 그리드 + 둥근 cap/join 디자인 언어가 호환된다.
일부 아이콘(triangle\_\* 등)은 Figma 원본이 fill 기반 솔리드 형태라 lucide 의 stroke 기반
아이콘과 다르며, 이 경우 커스텀 SVG 컴포넌트로 직접 렌더링한다.

> **참조 구현의 선택**: 이 baseline은 lucide를 백엔드로 사용하므로 원본 Figma와 도형이 다를 수 있다.
> 선택 솔루션에 검증된 SVG와 자산 계약이 있으면 해당 도형·규격을 우선 확인한다. Figma MCP의
> SVG export나 원본 내보내기로 자산을 확보할 수 있으며, baseline의 lucide 매핑을 모든 솔루션에 강제하지 않는다.

---
