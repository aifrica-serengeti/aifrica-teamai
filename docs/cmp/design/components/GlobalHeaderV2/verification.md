# Global Header v2 — 검증과 재현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← Global Header v2 문서 인덱스](README.md)

## 12. 검증 체크리스트

- [ ] Header 높이가 border 포함 정확히 48px이다.
- [ ] 기본 padding은 좌우 24px이고, viewport ≤599px에서는 16px이다.
- [ ] Sidebar toggle의 touch area는 28×28px, 내부 icon은 16×16px이며 둘의 중심이 일치한다.
- [ ] Header와 toggle, Divider line의 수직 중심이 일치한다.
- [ ] Vertical divider의 line은 1px × **12px**이며 Header 전체 높이를 채우지 않는다.
- [ ] Divider wrapper에는 line 좌우 각 8px 여백이 있다.
- [ ] Breadcrumb이 좁은 폭에서 자체 `...` 축약을 수행하고 Header 밖으로 넘치지 않는다.
- [ ] 라이트 shell은 `var(--surface-shell)`, border/divider는 `var(--border-default)`다.
- [ ] 다크 shell은 `var(--surface-shell)`, border/divider는 `var(--text-subtler)`, icon/current breadcrumb은 `var(--border-default)`다.
- [ ] SNB toggle 클릭 시 `onSnbCollapsedChange(!snbCollapsed)`가 호출되고 `aria-expanded`도 갱신된다.
- [ ] `snbId`를 제공했으면 실제 SNB의 `id`와 `aria-controls`가 일치한다.
- [ ] App shell에서 SNB v2가 좌측에, Global Header v2가 그 오른쪽 `appContainer`의 상단에 있다.
- [ ] Header가 SNB 위쪽으로 가로지르지 않으며, `appContainer`의 top-left 14px radius와 8px top margin이 유지된다.
- [ ] Toggle 클릭 시 실제 SNB v2 폭이 expanded 240px ↔ collapsed 60px으로 전환되고, Header의 `aria-label`/`aria-expanded`가 함께 바뀐다.
- [ ] Tab, Enter, Space로 토글을 조작할 수 있고 focus-visible outline이 보인다.

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 GlobalHeaderV2을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: foundation 문서 (`DOCS_ROOT/frontend/design/foundations.md`), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 상위 application shell이 화면 간 shared state와 frame 배치를 소유하고, 이 컴포넌트는 문서에 적힌 고정 geometry와 내부 interaction만 소유한다. SNB와 Global Header의 v1/v2 조합은 섞지 않는다.
- **변형 금지**: 문서에 없는 viewport 기반 collapse, shell radius 중복, sibling local state 분리는 금지한다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

[React 조립](./implementation/typescript.md)과 [CSS](./implementation/css.md)를 public API·실제 primitive에
연결한 뒤 이 matrix를 실행한다. 공용을 켠 경우 `DOCS_ROOT/frontend/design/reproduction.md`의 재현 상태 matrix도 적용한다. 예제 파일이 존재한다는 사실은 렌더·상호작용 검증 통과 기록이 아니다.
