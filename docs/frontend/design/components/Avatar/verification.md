# Avatar — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Avatar 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 빌드/구조

- [ ] Radix Avatar 가 정상 임포트됨(`radix-ui` 통합 또는 `@radix-ui/react-avatar`)
- [ ] `data-slot="avatar"` / `data-slot="avatar-fallback"` 속성이 렌더됨
- [ ] 이미지 제공 시 `Avatar.Image` 가, 실패/미제공 시 `Avatar.Fallback` 이 보임

### 색상 (라이트)

- [ ] 기본(indigo solid) 배경이 `#3235ec` (indigo-600)
- [ ] solid 글자가 모든 색상에서 `#ffffff` (흰색)
- [ ] subtle indigo 배경이 `#f1edff` + 글자가 `#3235ec`
- [ ] **gray subtle 배경이 `#eeeeee` + 글자가 `#1c1c1c` (어두운 글자 — 핵심)**
- [ ] disabled 배경이 `#ffffff` + 글자가 `#aaaaaa`

### 색상 (다크) — 핵심 검증

- [ ] solid 배경/글자가 라이트와 동일(전환 없음)
- [ ] subtle 글자가 -500 음영으로 더 밝게 전환(indigo `#6366f1` 등)
- [ ] **gray subtle 글자가 다크에서도 `#555555`(어두움 유지) — 밝은 글자면 안 보임**
- [ ] disabled 배경이 `rgba(0,0,0,0.2)` + 글자가 `#757575`

### CSS 특이성 (disabled)

- [ ] disabled subtle gray 가 enabled subtle gray 색상을 이김
- [ ] `[data-disabled]` 단독이 아니라 `[data-disabled][data-variant][data-color]` 로 선언됨
- [ ] 모든 색상 × variant 조합에서 disabled 색상이 동일하게 적용됨

### 레이아웃

- [ ] border-radius 가 50% (원형)
- [ ] 8 사이즈 크기가 정확 (16/20/24/28/32/36/40/48px)
- [ ] 각 size 의 font-size 가 비례 (16→10px, 24→14px, 48→26px)
- [ ] font-weight 가 항상 600 (SemiBold)
- [ ] 이니셜이 원의 정중앙에 위치 (flex 중앙 정렬)

### 동작

- [ ] 다크/라이트 전환 시 색상이 0.2s ease 로 부드럽게 전환
- [ ] `transition: all` 을 쓰지 않음 (`background-color`, `color` 만)
- [ ] 전역 `*` transition 없음 (컴포넌트 요소에만)

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Avatar을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
