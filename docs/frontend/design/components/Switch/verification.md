# Switch — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Switch 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 치수

- [ ] Track: Small 32×18 / Medium 40×22 / Large 48×26 (border 포함).
- [ ] Track border-radius = height / 2 (완전 알약).
- [ ] Thumb: Small 14 / Medium 18 / Large 22.
- [ ] Thumb 위치 `top: 1px; left: 1px` (border-box 기준, 절대 2px gap).
- [ ] Checked 시 thumb 이동거리 = thumb 지름 (14/18/22px).

### 색상 — 라이트

- [ ] On enabled track `var(--accent-500)`, thumb `#ffffff`.
- [ ] Off enabled track `#8f8f8f` (gray-500), thumb `#ffffff`.
- [ ] On disabled track `#eeeeee`, thumb `#ffffff`.
- [ ] Off disabled track `#eeeeee` + border `#aaaaaa`, thumb `#8f8f8f`.
- [ ] On invalid track `#e81919`.

### 색상 — 다크

- [ ] On enabled track `var(--accent-400)`, thumb `#ffffff`.
- [ ] Off enabled track `#ffffff14` (반투명 흰 8%), thumb `#ffffff`.
- [ ] On disabled track `#ffffff1a`, thumb `#555555`.
- [ ] Off disabled track `#ffffff1a` + border `#333333`, thumb `#555555`.
- [ ] **On/Off disabled thumb가 다크에서 동일한 `#555555`** (핵심).

### 그림자

- [ ] Thumb에 dual-layer navy 그림자(`rgba(9,30,66,...)`) 적용.
- [ ] 일반 검정 그림자가 아님.

### 레이아웃 안정성

- [ ] Enabled ↔ Disabled 전환 시 track 외형 크기 변화 없음 (border 자리 예약).
- [ ] Thumb가 상태 전환 시 흔들리지 않음.
- [ ] Create/Detail form에서는 14px/20px semibold label 아래 4px, 최소 32px control row 안에
  Large 48×26 Switch가 세로 중앙 배치됨.
- [ ] form field에서 label을 switch 오른쪽에 붙이거나 한 행 양끝으로 벌리지 않음.

### Focus

- [ ] `:focus-visible` 시 1px primary outline + 1px gap (pill radius 유지).

### 다크 모드 전환

- [ ] 토글 시 깜빡임 없이 부드럽게 전환 (각 요소 0.2s transition).
- [ ] 전역 `*` 셀렉터 미사용, `transition: all` 미사용.

### 접근성

- [ ] Tab으로 포커스 이동, Space/Enter로 토글.
- [ ] 포커스 링 표시.
- [ ] `role="switch"`, `aria-checked` 자동 부여.

### 토큰 규칙

- [ ] 색상/그림자가 모두 CSS 변수 참조 (hex 직접 하드코딩 없음).
- [ ] thumb에 `--element-default` 미사용 (다크에서 반투명 검정이 되므로).

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Switch을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
