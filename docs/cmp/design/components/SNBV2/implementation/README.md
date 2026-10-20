# SNB v2 — 구현 인덱스

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← SNB v2 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)

## 10. 구현 코드

권장 파일 구조:

~~~text
ui/snb-v2/SNBV2.tsx
ui/snb-v2/SNBV2.css.ts
ui/snb-v2/data/snb-v2-icon.data.ts
ui/snb-v2/dependencies.ts
ui/snb-v2/snb-v2-tokens.ts
ui/shared/useHoverMenu.ts
~~~

10절에는 의도 설명용 축약 source를 두지 않는다. 축약본은 2depth row와 3depth row의
wrapper·indicator·flex 축을 빠뜨리기 쉽기 때문이다. 다음 여섯 파일은 16절의 canonical source를
그대로 복사한다.

1. `SNBV2.tsx`
2. `SNBV2.css.ts`
3. `data/snb-v2-icon.data.ts`
4. `dependencies.ts`
5. `useHoverMenu.ts`
6. `snb-v2-tokens.ts` — 같은 의미의 제품 token 입력

`useHoverMenu`는 SNB v1/v2가 공유하므로 component 내부에 복제하지 않는다. 공용 컴포넌트의
import path와 token 경로만 새 환경에 맞게 연결할 수 있다. 16절 source의 DOM wrapper,
`data-*` contract, flex/grid direction, padding, gap, indicator, selector 순서는 수정하지 않는다.

## 16. Canonical implementation source — 복사 필수

이 절은 참고 예시가 아니라 이 문서 계약을 구현하는 SNB v2의 **전체 portable source snapshot**이다.
새 환경에서는 설명을 바탕으로 별도 DOM이나 CSS를 작성하지 않고 아래 TSX와 style source를
그대로 옮긴다. 변경 가능한 것은 import alias와 동일 의미 token 경로뿐이다. element 순서,
wrapper, class 연결, selector, 수치, transition, state 계산은 변경하지 않는다.

브랜드는 `renderBrand(collapsed)`로 제품 자산과 접근 가능한 이름을 제공한다. 자산이 없으면
빈 slot을 유지하되 `logo`·`header` geometry는 유지한다. 계정은 제품 `user` 입력을 사용하고
기본 사용자·메일은 제공하지 않는다. navigation·utility·chevron은 반드시 공용 `Icon`을 사용한다.

이 배포본은 원본의 브랜드 image import·계정 fixture·고정 palette를 제거한 portable adapter다.
원본의 DOM wrapper·재귀·상태·hover timer·selector·치수는 유지하고, 현재 제품에 필요한
utility/user-menu/brand slot을 같은 trigger 계약으로 연결했다. TSX는 typescript.md에, 전체 style과
semantic token adapter는 css.md에 있다. 실제 제품에서 state·keyboard·light/dark 검증 후 채택한다.
원본의 이전 ScrollArea state callback은 현재 공용 문서 API인 `onScrollMetricsChange`로 연결하고,
metrics를 none/top/middle/bottom으로 변환한다. scroll divider의 상태 의미는 유지한다.
공용 Menu 문서의 실제 export는 DropdownMenu*다. dependencies.ts가 이를 내부 Menu* 이름으로
재export하므로 공용 primitive의 공개 API 이름을 바꾸지 않는다.

React/vanilla-extract를 사용하지 않는 환경에서도 아래 DOM tree와 computed style을 일대일로
번역해야 한다. Framework 관례를 이유로 Card, list row, tree view, generic sidebar primitive로
대체하지 않는다.
