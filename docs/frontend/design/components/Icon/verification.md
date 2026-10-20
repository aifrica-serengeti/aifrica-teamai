# Icon — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon 문서 인덱스](./README.md)

## 12. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

- [ ] 사이즈 8단계(t/s/m/l/xl/2xl/3xl/4xl)가 각각 12/14/16/18/20/24/32/36px 로 렌더
- [ ] 기본 사이즈가 m(16px)
- [ ] 소사이즈(t~xl) 스트로크 굵기가 1.25px
- [ ] 2xl(24px) 스트로크 굵기가 1.5px
- [ ] 3xl/4xl(32/36px) 스트로크 굵기가 2px
- [ ] 사이즈가 커질수록 선이 굵어지는 그라데이션 확인
- [ ] `stroke-linecap`, `stroke-linejoin` 모두 `round`
- [ ] System icon 색상이 `color` prop 에 따라 전환 (default/subtle/primary/success/warning/danger/disabled)
- [ ] raw palette dot 표기법(`color="blue.500"`)이 올바른 색상으로 렌더
- [ ] raw palette 색상이 semantic 과 동일한 값일 때 일치 (예: `blue.500` ≡ `primary` → `var(--accent-500)`)
- [ ] 다크 모드에서 primary 가 `var(--accent-400)` (accent-400, 더 밝음)
- [ ] 다크 모드에서 danger 가 `#f52424` (red-500, 더 밝음)
- [ ] raw palette 색상은 다크 모드에서 전환되지 않음(고정값)
- [ ] 다크 모드 전환 시 semantic 색상이 0.2s 로 부드럽게 보간 (깜빡임 없음)
- [ ] hex 값이 컴포넌트 코드에 직접 하드코딩되지 않음 (모두 토큰 참조)
- [ ] `github` / `desktop_code` 등 대체 매핑 아이콘이 의도치 않게 다르게 보이지 않는지 확인
- [ ] `briefcase_business`와 `app_window`가 각각 서비스 관리와 소프트웨어 메뉴 glyph로 구분되어 렌더
- [ ] `triangle_down` 이 채워진(fill) 솔리드 삼각형 ▼ 으로 렌더 (lucide Chevron\* 꺾쇠가 아님)
- [ ] `triangle_up/down/left/right` 4방향 모두 올바른 방향으로 렌더
- [ ] triangle 아이콘의 색상이 `color` prop / `currentColor` 를 따르는지 확인
- [ ] `grid`와 `grid_off`가 각각 일반 격자와 X가 포함된 격자 형태로 구분되어 렌더

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 Icon을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
