# Global Header v2 — 구현 인덱스

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← Global Header v2 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)

## 11. 구현 코드

의존성: React, TypeScript, vanilla-extract, 그리고 위 표의 공용 Icon Button / Divider / Breadcrumb.
`cn`은 클래스 병합 유틸리티다.


## 원본과 적용 범위

원본 `project.serengeti-cmp` commit `43648689aa3efef214118a69dde5eafdac30a338`의 같은 컴포넌트 구현
문서를 기준으로 복원했다. 제품 브랜드·계정·palette는 입력과 semantic token으로 분리했다.
치수·상태 우선순위·portal·keyboard·focus·검증 gate는 유지한다. 이 예제는 현재 소비 제품의
구현·export 존재 또는 테스트 통과를 의미하지 않는다. 설치 버전·primitive·실제 화면 검증을 수행한다.

## 문서 전용 module 연결

[React 문서](./typescript.md)의 public leaf 재export, Header·ApplicationShell block과
[CSS](./css.md)를 함께 전달한다. class 병합은 해당 block에 있으며 별도 `cn` module을 요구하지 않는다.
SNBV2는 선택한 CMP shell 구현 문서의 완전한 module로 연결한다.
