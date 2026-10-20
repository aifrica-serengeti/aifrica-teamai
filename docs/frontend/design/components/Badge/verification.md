# Badge — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Badge 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 색상 (라이트)

- [ ] Dot 배경이 `#d00a0a` (red-700, **`#e81919` 아님** — 이건 다크값)
- [ ] Counter 배경이 동일하게 `#d00a0a`
- [ ] Counter 숫자 텍스트가 `#ffffff` (흰색)
- [ ] point 색상을 `--element-point` 토큰으로 참조 (hex 하드코딩 아님)

### 색상 (다크)

- [ ] Dot/Counter 배경이 `#e81919` (red-600, 더 밝음) 으로 전환
- [ ] 숫자 텍스트가 다크에서도 `#ffffff` 유지
- [ ] 다크 전환이 깜빡임 없이 0.2s ease 로 부드럽게

### 레이아웃

- [ ] Dot 이 정확히 **6×6px** 원형 (`border-radius: 50%`)
- [ ] Counter height 가 **16px**
- [ ] Counter min-width 가 **16px** (1자리 숫자일 때 정사각형)
- [ ] Counter padding-x 가 **4px**
- [ ] Counter radius 가 **8px** (50% 아님)
- [ ] "99+" 일 때 박스가 **28px** (콘텐츠 + 패딩) 로 확장
- [ ] 숫자가 가로·세로 중앙 정렬

### 타이포그래피

- [ ] 폰트가 **Pretendard SemiBold(600)** (Bold/700 아님)
- [ ] font-size 가 **10px**, line-height 가 **12px**
- [ ] letter-spacing 이 0

### 동작

- [ ] `count > 99` 일 때 "99+" 로 캡핑
- [ ] `count = 0` 일 때 Badge 가 렌더되지 않음 (DOM 에 없음)
- [ ] `max` prop 조정 시 캡핑 임계값이 변경 (예: max=999 → "999+")
- [ ] `transition: all` 을 쓰지 않음 (색상 속성만)
- [ ] Dot variant 에서 count prop 이 무시됨

### 접근성

- [ ] `role="status"` 속성이 있음
- [ ] Dot 에 `aria-label="새 알림"` 이 있음
- [ ] Counter 에 `aria-label="{count}개의 알림"` 이 있음
- [ ] 호스트 요소(Icon Button 등)와 조합 시 호스트가 포커스를 가짐

### 배치 (Position)

- [ ] 호스트 요소 우상단에 `translate(50%, -50%)` 로 걸치듯 배치
- [ ] 호스트가 `position: relative`, Badge 가 `position: absolute`

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Badge을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
