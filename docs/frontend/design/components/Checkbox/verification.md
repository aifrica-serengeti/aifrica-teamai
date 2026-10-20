# Checkbox & Checkbox Group — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](./README.md)

## 14. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

- [ ] Checkbox box가 Small **정사각형 12×12** / Medium **정사각형 16×16**, 상태 불문 동일 (정렬 어긋남 없음)
- [ ] **`box-sizing: border-box`가 명시되어 있어 1px border 포함 시에도 정사각형 유지** (14×14/18×18로 찌그러지지 않음)
- [ ] Box 테두리가 1px (2px 아님), `border-radius: 2px`
- [ ] **Checked 상태에서 체크마크가 확실히 보임** (currentColor 의존 없이 마크에 명시적 색상 `var(--element-on-primary)`)
- [ ] Checked enabled가 채워진 파랑 사각형 `var(--accent-500)` + 흰 체크마크
- [ ] Indeterminate enabled가 채워진 파랑 사각형 `var(--accent-500)` + 흰 대시
- [ ] Checked/Indeterminate disabled가 회색 채워진 박스 `#eeeeee` + 회색 테두리 `#dddddd` + 흰 마크 유지
- [ ] Checked/Indeterminate invalid가 빨강 채워진 박스 `#e81919`
- [ ] Small 히트 영역 24×24, Medium 히트 영역 32×32
- [ ] Read-only일 때 라벨/help가 enabled 색 유지 (회색 안 됨)
- [ ] Read-only일 때 커서가 `default` (disabled는 `not-allowed`)
- [ ] Disabled일 때 box/label 호버 커서가 `not-allowed`
- [ ] Focus 시 box 주변에 **1px gap** 떨어진 1px primary outline (box에 딱 붙지 않음)
- [ ] Focus 진입/이탈 시 outline 색상이 부드럽게 전환 (0.2s)
- [ ] Enabled 항목의 라벨/도움말 hover 시 색상이 변함 (disabled/read-only는 변화 없음)
- [ ] 부모-자식: 자식 일부 선택 시 부모가 Indeterminate, 전체 선택 시 Checked, 0개 시 Unchecked
- [ ] Checkbox Group에서 비제어(defaultValue) 사용 시 선택이 정상 동작
- [ ] 다크 모드에서 primary가 `var(--accent-400)` (accent-400)
- [ ] 다크 모드 checked/indeterminate disabled fill이 `rgba(255,255,255,0.1)`
- [ ] 선택 시 0.2s 색상 전환 애니메이션
- [ ] 키보드 Space로 선택/해제 가능

## 15. 새 프로젝트 재현 잠금 계약

이 계약은 Checkbox을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
