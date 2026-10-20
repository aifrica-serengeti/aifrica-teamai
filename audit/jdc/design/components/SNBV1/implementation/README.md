# SNB v1 — 구현 인덱스

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v1 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](css.md)
- [TypeScript와 React 구현](typescript.md)
- [기타 구현 참조](reference.md)

## 12. 구현 코드

의존 컴포넌트를 준비한 뒤, 아래 구조로 조합한다. 실제 Icon/Menu/ScrollArea의 props와
portal 처리는 해당 공용 컴포넌트 가이드라인을 그대로 따른다.

