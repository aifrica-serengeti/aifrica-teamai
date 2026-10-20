# SNB v1 — 구현 인덱스

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← SNB v1 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)
- [기타 구현 참조](./reference.md)

## 12. 구현 코드

의존 컴포넌트를 준비한 뒤, 아래 구조로 조합한다. 실제 Icon/Menu/ScrollArea의 props와
portal 처리는 해당 공용 컴포넌트 가이드라인을 그대로 따른다.


## 원본과 적용 범위

원본 `project.serengeti-cmp` commit `43648689aa3efef214118a69dde5eafdac30a338`의 같은 컴포넌트 구현
문서를 기준으로 복원했다. 제품 브랜드·계정·palette는 입력과 semantic token으로 분리했다.
치수·상태 우선순위·portal·keyboard·focus·검증 gate는 유지한다. 이 예제는 현재 소비 제품의
구현·export 존재 또는 테스트 통과를 의미하지 않는다. 설치 버전·primitive·실제 화면 검증을 수행한다.

## 문서 전용 module 연결

[React 문서](./typescript.md)는 모든 내부 helper·재귀·controlled/default state와 public dependency
adapter를 포함한다. `ExpandedSNBMenu`·`CollapsedSNBMenu` 또는 제품 private source를 추가 입력으로
요구하지 않는다. 공용 Menu의 `DropdownMenu*` export를 역할 alias로 연결하고 ScrollArea의
`onScrollMetricsChange`를 사용한다. 공용 IconButton에 없는 `iconColor` 대신 [CSS adapter](./css.md)를 적용한다.
