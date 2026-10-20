# SNB v2

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


이 문서는 Side Navigation SNB v2를 동일하게 재현하기 위한 완전한 스펙이다. SNB v1의 navy shell과 혼용하지 않는다. Expanded 240px panel, collapsed 60px rail, 최대 3depth, scroll boundary, utility/footer 및 Global Header v2 조합을 포함한다.

> **필수:** 설명만 보고 새로 조립하지 않는다. 16절 canonical source를 먼저 그대로 옮긴 뒤,
> 1~15절을 dependency mapping과 검증에 사용한다.
>
> **외부 디자인 파일·링크·도구를 열거나 참고하지 않는다.** 이 문서의 수치·상태 계약,
> 14절 Icon mapping, 15절 fixture, 16절 canonical source만 사용한다. 필수 값이나 공용 의존성이 없으면 추정 구현하지
> 말고 작업을 중단한다.
>
> **구현 순서 고정:** `Card`, `Panel`, `Surface`, 범용 sidebar template을 먼저 배치한 뒤
> SNB를 끼워 넣지 않는다. `aside > header container + nav + utility + footer` 네 영역을
> 이 문서의 순서로 직접 만든다. expanded SNB의 어느 자식에도 흰 navigation card가 보이면
> 즉시 실패이며, 이후의 menu item 스타일 작업을 진행하지 않는다.

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

- Expanded: 240px blue-50 (#ebf3ff) navigation panel에 1·2·3depth를 인라인 accordion으로 표시한다.
- Collapsed: 60px rail에 1depth icon만 표시한다. leaf는 Tooltip, children이 있는 item은 우측 Menu/MenuSub popup으로 탐색한다.
- 선택과 펼침은 별개다. children이 있는 1·2depth는 route가 아닌 disclosure control이므로, parent를 열거나 닫아도 선택된 leaf의 activeId를 바꾸지 않는다.
- collapsed는 SNB나 Global Header가 소유하지 않는다. 부모 application shell이 단일 state로 제어한다.
- hover 및 pressed에는 gray surface 대신 blue 계열 상태 토큰을 사용한다.
- viewport 폭은 collapsed state를 결정하지 않는다. expanded 240px과 collapsed 60px은
  부모가 전달한 collapsed state로만 전환하며, Header와 SNB root는 같은 state snapshot을
  사용한다.
- SNB root와 shell slot은 같은 rail width를 flex-basis/min-width로 사용한다. rail은
  flex-shrink하지 않으며, content 영역만 min-width: 0으로 shrink할 수 있다.


## 보조 메뉴 trigger 조합

보조 메뉴의 native button을 조합하는 선택적 `renderUtilityTrigger(item, trigger)` slot을 지원한다. API·알림 상태·라우팅은 shell/page가 소유한다.


## 계정 메뉴 슬롯

계정 메뉴 연결은 `renderUserMenu(trigger)` 슬롯과 `userMenuLabel`을 사용한다. 인증·언어·테마 상태는 앱 소유이며 SNBV2는 트리거 표현만 제공한다.
