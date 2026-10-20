# Tooltip — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](./README.md)

## 12. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 색상

- [ ] 라이트: content 배경 `#1c1c1c`, 텍스트 `#ffffff`
- [ ] 다크: content 배경 `#ffffff`, 텍스트 `#1c1c1c`
- [ ] 화살표 색상이 content 배경과 동일 (같은 색으로 자연스럽게 이어짐)
- [ ] 색상 hex 값을 직접 하드코딩하지 않고 `--surface-inverse`/`--text-inverse` 토큰 참조

### 화살표

- [ ] 4방향(top/bottom/left/right) 모두 화살표 표시
- [ ] **뾰족한 끝이 content를 향함** (평평한 면이 트리거 쪽)
- [ ] 화살표가 content와 7px 겹침 (`-4px` offset) — 분리되어 떠 있지 않음
- [ ] 화살표 끝이 트리거와 닿지 않음 (4px 갭, sideOffset=8)
- [ ] left/right일 때 화살표 래퍼가 세로(11×20)로 표시
- [ ] 화살표에 CSS 회전이 사용되지 않음 (방향별 별도 path)
- [ ] **collision detection 시 화살표 방향 동기화** — 트리거가 viewport 가장자리에 있어 content가 flip되면(top→bottom, center→start/end 등) 화살표도 같은 방향으로 전환 (MutationObserver)

### 레이아웃

- [ ] Icon variant: padding `4px 8px`, 단일 줄 (nowrap)
- [ ] Standard variant: padding `8px 12px`, max `320×160`, 다중 줄
- [ ] border-radius `4px`
- [ ] 12가지 position×align 조합이 모두 정상 위치에 표시
- [ ] align=start/end일 때 화살표가 `8px` offset으로 치우침

### 애니메이션

- [ ] 등장 시 fade + slide (0.15s)
- [ ] 퇴장 시 fade + 역 slide (0.15s)
- [ ] 방향별로 slide 방향이 올바름 (top은 위로, bottom은 아래로 등장)
- [ ] 다크/라이트 전환 시 색상이 0.2s로 부드럽게 보간

### 접근성

- [ ] Tab 키로 트리거 focus 시 툴팁 표시
- [ ] Esc 키 또는 포커스 이탈 시 툴팁 닫힘
- [ ] 트리거에 `aria-describedby` 자동 설정 (Radix)
- [ ] 화살표에 `aria-hidden="true"`
- [ ] 한 trigger에 Tooltip root가 하나만 있고 중첩 surface가 나타나지 않음
- [ ] click/pending 전환 중 Tooltip content가 긴 진행 문구로 바뀌거나 remount되어 폭이 튀지 않음
- [ ] icon-only trigger는 Tooltip과 별개로 같은 동작명의 `aria-label`을 가짐

### 다크 모드

- [ ] `.dark` 클래스 토글 시 inverse 토큰이 자동 전환
- [ ] 깜빡임 없이 부드럽게 전환 (0.2s transition)

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 Tooltip을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 portal surface, focus return, Escape와 keyboard interaction, open/close animation을 소유한다. 부모는 문서의 open callback/controlled API로만 연결한다.
- **변형 금지**: 임의 z-index, 다른 overlay primitive, browser 기본 popup, 문서에 없는 viewport 재배치는 사용하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
