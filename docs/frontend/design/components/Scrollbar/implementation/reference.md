# Scrollbar & ScrollArea — 기타 구현 참조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](../README.md)

## 구현 내용

### 의존성

- React 19+
- vanilla-extract (`@vanilla-extract/css`)
- `cn()` 유틸리티 (clsx + tailwind-merge, 새 프로젝트에서는 @design/cn 또는 동등한 local helper)
- radix-ui **불필요** (순수 구현)

