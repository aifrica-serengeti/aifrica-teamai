# Global Header v2

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


이 문서는 application shell 최상단의 **Global Header v2**와 검증된 SNB v2 조립을 재현하기 위한 완전한 스펙이다.
좌측 SNB toggle, 중앙의 짧은 vertical divider, 현재 위치 Breadcrumb을 기존 공용 컴포넌트로
조합한다. Header는 SNB의 상태를 직접 갖지 않고 부모 shell의 controlled state에 연결한다. 실제
application shell에서는 **좌측에 SNB v2**, 그 오른쪽 컨테이너의 **상단에만 Header**를 둔다.

> 새 프로젝트에서는 [reproduction.md](../../../../../docs/frontend/design/reproduction.md)의 shell
> geometry, 단일 state 소유, exact asset, screenshot gate를 이 문서와 함께 적용한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](implementation/README.md)
- [정의와 구조](definition.md)
- [스타일과 토큰](styles.md)
- [상태와 동작](behavior.md)
- [접근성](accessibility.md)
- [검증과 재현](verification.md)
- [CSS와 스타일 구현](implementation/css.md)
- [TypeScript와 React 구현](implementation/typescript.md)

## 1. 개요

- 고정 높이: **48px**
- 좌측부터: Sidebar Icon Button → Vertical Divider → optional Breadcrumb
- Header 자체 모서리: **없음**. 화면 폭 전체를 잇는 shell이므로 radius를 주지 않는다.
- Icon Button의 radius는 공용 컴포넌트의 **4px**을 그대로 사용한다.
- 다크 모드: v1과 같은 `--surface-shell`을 사용한다. 라이트 `#ffffff`, 다크 `#282828`.
- SNB 연결: `snbCollapsed`, `onSnbCollapsedChange`, `snbId`를 부모 shell과 SNB v2가 공유한다.
- Application shell: SNB v2는 좌측 **240px**(expanded) / **60px**(collapsed) rail이다. Header는
  SNB 위가 아니라, SNB 오른쪽 `appContainer` 내부의 첫 행에 위치한다.
- `appContainer`만 좌상단 radius **14px**와 clip을 소유한다. Header에 radius를 추가하지 않는다.

- viewport 폭은 SNB collapse를 결정하지 않는다. Header의 599px media rule은 horizontal
  padding만 24px에서 16px로 바꾸며, rail 240px/60px과 selected path는 유지한다.
- Header와 SNB는 각자 local collapsed state를 만들지 않는다. 같은 부모 state와 같은
  SNB id/aria-controls pair를 사용한다.

