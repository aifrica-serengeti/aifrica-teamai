# SNB v2 — 구현 인덱스

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v2 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](css.md)
- [TypeScript와 React 구현](typescript.md)

## 10. 구현 코드

권장 파일 구조:

~~~text
ui/snb-v2/SNBV2.tsx
ui/snb-v2/SNBV2.css.ts
ui/snb-v2/data/snb-v2-icon.data.ts
ui/snb-v2/dependencies.ts
ui/shared/useHoverMenu.ts
~~~

10절에는 의도 설명용 축약 source를 두지 않는다. 축약본은 2depth row와 3depth row의
wrapper·indicator·flex 축을 빠뜨리기 쉽기 때문이다. 다음 다섯 파일은 16절의 canonical source를
그대로 복사한다.

1. `SNBV2.tsx`
2. `SNBV2.css.ts`
3. `data/snb-v2-icon.data.ts`
4. `dependencies.ts`
5. `useHoverMenu.ts`

`useHoverMenu`는 SNB v1/v2가 공유하므로 component 내부에 복제하지 않는다. 공용 컴포넌트의
import path와 token 경로만 새 환경에 맞게 연결할 수 있다. 16절 source의 DOM wrapper,
`data-*` contract, flex/grid direction, padding, gap, indicator, selector 순서는 수정하지 않는다.

## 16. Canonical implementation source — 복사 필수

이 절은 참고 예시가 아니라 이 문서 계약을 구현하는 SNB v2의 **전체 portable source snapshot**이다.
새 환경에서는 설명을 바탕으로 별도 DOM이나 CSS를 작성하지 않고 아래 TSX와 style source를
그대로 옮긴다. 변경 가능한 것은 import alias와 동일 의미 token 경로뿐이다. element 순서,
wrapper, class 연결, selector, 수치, transition, state 계산은 변경하지 않는다.

브랜드용 세 image import는 유일한 asset 예외다. 해당 asset이 새 환경에 없으면 파일을 새로
그리지 말고 14절의 임시 brand slot으로 교체하되, `logo`·`header` geometry는 유지한다.
navigation·utility·chevron은 아래 source처럼 반드시 공용 `Icon`을 사용한다.

React/vanilla-extract를 사용하지 않는 환경에서도 아래 DOM tree와 computed style을 일대일로
번역해야 한다. Framework 관례를 이유로 Card, list row, tree view, generic sidebar primitive로
대체하지 않는다.
