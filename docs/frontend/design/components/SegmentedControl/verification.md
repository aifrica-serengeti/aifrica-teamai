# Segmented Control — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](./README.md)

## 14. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 구조 / 레이아웃

- [ ] 컨테이너에 padding 없음 — 아이템이 컨테이너를 꽉 채움 (회색 여백 띠 없음)
- [ ] 컨테이너 배경 `#f4f4f4`, 테두리 `1px solid #ddd`
- [ ] Small 높이 28px, Medium 32px, Large 36px
- [ ] Icon 형 아이템이 정사각형(28/32/36×28/32/36)
- [ ] Icon ↔ Label 간격 4px
- [ ] 마지막 아이템에 divider 없음

### 색상

- [ ] Selected 배경이 `#ffffff`(흰색) — 컨테이너 회색과 명확한 대비
- [ ] Selected 테두리 `1px solid #aaa`(`--border-bold`) — `--border-bolder`(#1c1c1c)가 아님
- [ ] Unselected 텍스트/아이콘이 `#555`(`--text-subtle`)
- [ ] Selected 텍스트/아이콘이 `#1c1c1c`(`--text`)
- [ ] Disabled 텍스트/아이콘이 `#aaa`(`--text-disabled`)

### 상태

- [ ] **Selected 에 hover/pressed 시 변화 없음** (오버레이 미적용)
- [ ] Unselected 에 hover 시 검정 5% 오버레이, pressed 시 검정 10% 오버레이
- [ ] Focus 시 inset 2px `var(--accent-500)` 링, **배경 어두워지지 않음**
- [ ] Focus 시 회색 border 숨김(transparent) — 이중선 아님
- [ ] Focus 시 둥근 모서리에서 링이 잘리지 않음 (inset box-shadow 사용)
- [ ] Focus 시 divider 가 focus 링 위로 올라오지 않음

### 폰트 / 너비 점핑

- [ ] Selected 만 `font-weight: 600`, Unselected 는 `400`
- [ ] 선택 전환 시 아이템 너비가 흔들리지 않음 (ghost 레이어로 고정)
- [ ] Focus 시 border 굵기 변화로 너비가 튀지 않음 (inset box-shadow 사용)

### 다크 모드

- [ ] Selected 배경 `#333`, 테두리 `#555`
- [ ] Unselected hover/pressed 오버레이가 흰 알파(밝아짐)
- [ ] Focus 링 `var(--accent-400)` (accent-400, 라이트보다 밝음)
- [ ] 다크/라이트 전환 시 깜빡임 없이 0.2s 부드럽게

### 접근성 / 의존성

- [ ] 키보드 Tab 진입, ←→ 로 옵션 이동 가능
- [ ] Info 아이콘 hover 시 Tooltip 표시 (Tooltip 의존 컴포넌트)
- [ ] Icon 형 아이콘이 Icon 컴포넌트로 렌더 (stroke-width, semantic 색상 적용)
- [ ] 색상 전환 애니메이션이 색상 속성만 0.2s (`transition: all` 아님)

## 15. 새 프로젝트 재현 잠금 계약

이 계약은 SegmentedControl을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
