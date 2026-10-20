# Global Header v1 — 검증과 재현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← Global Header v1 문서 인덱스](README.md)

## 13. 검증 체크리스트

### 디자인 / 반응형

- [ ] Header 높이 56px, desktop 좌우 padding 32px, 하단선 1px
- [ ] Search가 400×36px이고, ≤899px에서는 280px 기준으로 축소, ≤679px에서는 숨김
- [ ] 전역 아이콘 버튼은 32×32px, 서로 8px gap
- [ ] unread dot은 6px이고 bell의 `top: 2px; left: 24px`에 겹침
- [ ] Account trigger는 8px radius, 6×10px padding, Avatar↔이름 8px gap
- [ ] Account 이름이 어떤 길이에서도 `...`로 잘리지 않음
- [ ] 메뉴는 216px, 우측 정렬, 36px Avatar·이름·역할·email·두 메뉴 항목을 표시
- [ ] 라이트와 다크에서 shell이 각각 `var(--surface-shell)` / `var(--surface-shell)`로 전환

### 상호작용 / 접근성

- [ ] Search 입력/clear callback이 올바른 값을 전달
- [ ] 알림·도움말·추가 메뉴 버튼이 각각 label과 click callback을 가짐
- [ ] Account click으로 메뉴가 열리고, open 동안 pressed 배경과 up chevron이 보임
- [ ] ESC, 바깥 클릭, MenuItem 선택으로 메뉴가 닫힘
- [ ] Tab으로 모든 버튼에 도달하고 focus-visible outline이 보임
- [ ] ≤519px에서 account 이름·chevron이 숨고 44×44px Avatar trigger만 남음

### 중복 방지

- [ ] Breadcrumb/Search/IconButton/Badge/Avatar/Icon/Menu/Chip을 새로 구현하지 않고 재사용
- [ ] 각 의존 컴포넌트의 상태·토큰·접근성은 해당 가이드라인을 따름
- [ ] Global Header v1 자체 CSS에는 hex/oklch 직접 하드코딩 없이 semantic token만 사용

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 GlobalHeaderV1을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: foundation 문서 (`DOCS_ROOT/frontend/design/foundations.md`), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 상위 application shell이 화면 간 shared state와 frame 배치를 소유하고, 이 컴포넌트는 문서에 적힌 고정 geometry와 내부 interaction만 소유한다. SNB와 Global Header의 v1/v2 조합은 섞지 않는다.
- **변형 금지**: 문서에 없는 viewport 기반 collapse, shell radius 중복, sibling local state 분리는 금지한다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

[React 조립](./implementation/typescript.md)과 [CSS](./implementation/css.md)를 public API·실제 primitive에
연결한 뒤 이 matrix를 실행한다. 공용을 켠 경우 `DOCS_ROOT/frontend/design/reproduction.md`의 재현 상태 matrix도 적용한다. 예제 파일이 존재한다는 사실은 렌더·상호작용 검증 통과 기록이 아니다.

- [ ] 제품 계정이 없을 때 가짜 이름·이메일·계정 메뉴를 표시하지 않는다.
- [ ] unread 입력이 없을 때 미확인 알림 dot을 생성하지 않는다.
