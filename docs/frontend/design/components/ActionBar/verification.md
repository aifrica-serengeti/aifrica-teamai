# Action bar — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](./README.md)

## 12. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

- [ ] 컨테이너 높이가 48px, 좌우 패딩 12px, 내부 gap 24px
- [ ] 컨테이너 border-radius 가 4px
- [ ] 라이트 모드에서 배경이 검정 `#1c1c1c`, 글씨가 흰색 `#ffffff` (inverse)
- [ ] 다크 모드에서 배경이 흰색 `#ffffff`, 글씨가 검정 `#1c1c1c` (반전)
- [ ] 라이트 hover 가 `rgba(255,255,255,0.08)` — 미세하게 밝아짐
- [ ] 라이트 pressed 가 `rgba(255,255,255,0.2)` — hover 보다 뚜렷하게 밝아짐
- [ ] 다크 hover 가 `rgba(0,0,0,0.08)`, pressed 가 `rgba(0,0,0,0.2)` — 어두워짐
- [ ] hover 와 pressed 가 **시각적으로 구분됨** (동일 색이 아님)
- [ ] Action 높이 32px, 좌우 패딩 16px, Pretendard SemiBold 14px/20px
- [ ] Icon button 이 32×32 정사각, 아이콘 20px
- [ ] Action 내 leading 아이콘이 18px
- [ ] Divider 가 1px 세로선, 높이 16px, 좌우 8px 패딩, 색상 `#555555`
- [ ] Focus 시 1px `var(--accent-500)`(dark: `var(--accent-400)`) outline + 1px gap (offset)
- [ ] Disabled 시 글씨가 `#8f8f8f`(dark: `#757575`), `pointer-events: none`
- [ ] Mid elevation 그림자(2단)가 표시됨
- [ ] Icon button 에 `aria-label` 부여됨
- [ ] Divider 에 `role="separator"` + `aria-orientation="vertical"`
- [ ] 색상 전환 애니메이션이 0.2s (transition: all 아님)
- [ ] 다크 모드 토글 시 깜빡임 없이 부드럽게 전환

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 ActionBar을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
