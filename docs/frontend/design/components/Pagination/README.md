# Pagination

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Pagination 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 파일만 있어도 색상·레이아웃·상태·로직·코드를 모두 복원할 수 있다.

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

대용량 목록/테이블 데이터를 페이지 단위로 분할하여 탐색하는 컴포넌트. 사용자는 **페이지
번호 입력**, **이전/다음 네비게이션 버튼**, **페이지당 항목 수 선택** 세 가지 방법으로
페이지를 전환한다. 결과 카운트("총 N건 중 a-b건")로 현재 범위를 즉시 파악할 수 있다.

페이지 크기가 고정된 목록에서는 `showPageSize={false}`로 항목 수 Dropdown만 생략한다.
결과 카운트, 페이지 입력, 처음·이전·다음·마지막 이동은 유지한다. 기본값은 `true`다.

**기술 기반:** vanilla-extract `.css.ts` 로 스펙을 직접 렌더. **직접 만들지 않고
3개 공용 컴포넌트를 조합**한다 — Icon Button(네비게이션), Input(페이지 번호 입력),
Dropdown(페이지당 항목 수). 이 조합 원칙이 중복 코드를 막는다(아래 "의존 컴포넌트" 참조).

### 세 가지 핵심 설계 결정

1. **Controlled 단일 컴포넌트** — compound 패턴이 아닌 단일 API(`page`/`total`/`pageSize`/
   `onPageChange`/`onPageSizeChange`)로, 테이블의 데이터 fetch 로직과 1:1로 연결된다.
2. **토큰 기반 파트 매핑** — 각 파트가 Figma의 서로 다른 토큰 그룹을 사용하므로, 그 토큰과
   일치하는 기존 컴포넌트를 정확히 매핑한다(직접 구현 금지).
3. **i18n 템플릿에서도 강조 유지** — `rangeTemplate`의 `{total}`은 Pagination이 직접
   `--pg-count-primary` 토큰으로 렌더링한다. 호출부가 다국어 문구를 조립하기 위해 내부 색상
   markup을 복제하지 않는다.

페이지당 항목 수가 고정된 목록은 `showPageSize={false}`로 항목 수 Dropdown만 숨긴다.
결과 카운트·처음/이전/다음/마지막 이동·페이지 번호 입력은 유지하며, 기본값 `true`는 기존 UI를 보존한다.

---
