# Global Header v1 — 구현 인덱스

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← Global Header v1 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)

## 12. 구현 코드

아래는 공용 컴포넌트의 공개 API를 조합하는 구현 예시다. `Breadcrumb`, `Search`,
`IconButton`, `Badge`, `Avatar`, `Icon`, `Menu`, `Chip`의 내부 CSS/상태를 복제하지 않는다.


## 원본과 적용 범위

원본 `project.serengeti-cmp` commit `43648689aa3efef214118a69dde5eafdac30a338`의 같은 컴포넌트 구현
문서를 기준으로 복원했다. 제품 브랜드·계정·palette는 입력과 semantic token으로 분리했다.
치수·상태 우선순위·portal·keyboard·focus·검증 gate는 유지한다. 이 예제는 현재 소비 제품의
구현·export 존재 또는 테스트 통과를 의미하지 않는다. 설치 버전·primitive·실제 화면 검증을 수행한다.

## 문서 전용 module 연결

[React 문서](./typescript.md)의 `design-system-components.ts` public 재export와 React block,
[CSS](./css.md)가 로컬 module의 전체 목록이다. 가짜 계정·별도 class 병합 helper·제품 private component는 필요하지 않다.
