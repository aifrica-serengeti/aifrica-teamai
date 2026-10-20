# Spinner — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 색상 (라이트)

- [ ] Track stroke 가 `var(--accent-100)` (accent-100) — `#bfd8ff` 아님에 주의(유사하지만 다름)
- [ ] Indicator 그라데이션 시작이 `var(--accent-500)` (accent-500, 불투명)
- [ ] Indicator 그라데이션이 bottom 으로 갈수록 투명하게 페이드
- [ ] 색상을 `--spinner-track` / `--spinner-indicator` 토큰으로 참조 (hex 하드코딩 아님)

### 색상 (다크)

- [ ] Track stroke 가 `var(--accent-200)` (accent-200, 옅은 파스텔) 로 전환
- [ ] Indicator 가 `var(--accent-400)` (accent-400, 진한 밝은 파랑) 그라데이션으로 전환
- [ ] **Track 과 Indicator 가 서로 다른 색** — 같은 색이면 동일한 accent 원으로 보임(대비 필수)
- [ ] 다크 전환이 깜빡임 없이 0.2s ease 로 부드럽게

### 그라데이션 형태

- [ ] linearGradient 방향이 **수직**(y 축) — conic(각도별)이 아님
- [ ] 12시(top) 부근이 가장 진함, 6시(bottom) 부근이 가장 투명
- [ ] 그라데이션 stop 이 정확히 0% / 75.52% / 100% (세 점)

### 레이아웃

- [ ] 각 size 박스가 정확히 16/20/24/36/48px
- [ ] r/box 비율이 모든 size 에서 0.375 (원이 박스 안에 일정한 여백)
- [ ] viewBox 가 `0 0 48 48` (단일 마스터 SVG 스케일)
- [ ] `vector-effect: non-scaling-stroke` 로 size 별 stroke 두께가 물리 픽셀로 유지

### stroke 두께

- [ ] Tiny/Small/Medium 이 **2px** (Medium 이 1.5px 아님 — 보정값)
- [ ] Large 가 **3px**
- [ ] X-Large 가 **4px**
- [ ] stroke-linecap 이 `round` (둥근 끝)

### 회전 애니메이션

- [ ] 시계 방향으로 회전 (0° → 360°)
- [ ] 1회전에 **1s** 소요 (`--spinner-speed`)
- [ ] timing function 이 `linear` (일정 속도, ease 아님)
- [ ] 무한 회전 (`infinite`)
- [ ] `transition: all` 을 쓰지 않음 (stroke 속성만)

### 접근성

- [ ] `role="status"` 속성이 있음
- [ ] `aria-label="로딩 중"` 이 있음 (또는 커스텀 메시지)
- [ ] `<svg>` 에 `aria-hidden="true" focusable="false"` 가 있음
- [ ] `prefers-reduced-motion: reduce` 시 회전이 정지함

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Spinner을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
