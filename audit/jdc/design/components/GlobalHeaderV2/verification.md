# Global Header v2 — 검증과 재현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v2 문서 인덱스](README.md)

## 12. 검증 체크리스트

- [ ] Header 높이가 border 포함 정확히 48px이다.
- [ ] 기본 padding은 좌우 24px이고, viewport ≤599px에서는 16px이다.
- [ ] Sidebar toggle의 touch area는 28×28px, 내부 icon은 16×16px이며 둘의 중심이 일치한다.
- [ ] Header와 toggle, Divider line의 수직 중심이 일치한다.
- [ ] Vertical divider의 line은 1px × **12px**이며 Header 전체 높이를 채우지 않는다.
- [ ] Divider wrapper에는 line 좌우 각 8px 여백이 있다.
- [ ] Breadcrumb이 좁은 폭에서 자체 `...` 축약을 수행하고 Header 밖으로 넘치지 않는다.
- [ ] 라이트 shell은 `#ffffff`, border/divider는 `#dddddd`다.
- [ ] 다크 shell은 `#282828`, border/divider는 `#555555`, icon/current breadcrumb은 `#dddddd`다.
- [ ] SNB toggle 클릭 시 `onSnbCollapsedChange(!snbCollapsed)`가 호출되고 `aria-expanded`도 갱신된다.
- [ ] `snbId`를 제공했으면 실제 SNB의 `id`와 `aria-controls`가 일치한다.
- [ ] App shell에서 SNB v2가 좌측에, Global Header v2가 그 오른쪽 `appContainer`의 상단에 있다.
- [ ] Header가 SNB 위쪽으로 가로지르지 않으며, `appContainer`의 top-left 14px radius와 8px top margin이 유지된다.
- [ ] Toggle 클릭 시 실제 SNB v2 폭이 expanded 240px ↔ collapsed 60px으로 전환되고, Header의 `aria-label`/`aria-expanded`가 함께 바뀐다.
- [ ] Tab, Enter, Space로 토글을 조작할 수 있고 focus-visible outline이 보인다.

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 GlobalHeaderV2을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../../../../docs/frontend/design/foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 상위 application shell이 화면 간 shared state와 frame 배치를 소유하고, 이 컴포넌트는 문서에 적힌 고정 geometry와 내부 interaction만 소유한다. SNB와 Global Header의 v1/v2 조합은 섞지 않는다.
- **변형 금지**: 문서에 없는 viewport 기반 collapse, shell radius 중복, sibling local state 분리는 금지한다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
