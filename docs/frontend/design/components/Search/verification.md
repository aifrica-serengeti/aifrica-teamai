# Search — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Search 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 레이아웃

- [ ] Container 높이: Small 28 / Medium 32 / Large 36 / X-Large 40px (Input 스펙)
- [ ] Leading search icon 이 좌측 12px 에 세로 중앙 정렬
- [ ] Close button 이 우측 8px 에 세로 중앙 정렬, 원형(border-radius 50%)
- [ ] Close button 지름: 모든 size 16px 고정 (search icon 과 동일)
- [ ] Label ↔ Container ↔ Help text 간격 모두 4px
- [ ] Leading icon / close button 이 input 텍스트와 겹치지 않음(패딩 재계산)

### 색상 (Figma 원본과 대조)

- [ ] Leading search icon `#1c1c1c` (--icon)
- [ ] Close button 배경 `#555555` (--icon-subtle)
- [ ] Close button X `#ffffff` (--icon-inverse)
- [ ] Container border/surface 는 Input 스펙과 동일

### 상태 동작

- [ ] **값이 있으면 close button 이 무조건 표시** (controlled / uncontrolled 모두)
- [ ] 값이 비어 있으면 close button 미표시
- [ ] Disabled 상태에서는 close button 미표시
- [ ] Close button 클릭 시 값 지워지고 input 에 포커스 복귀
- [ ] Focus 시 placeholder/입력값이 1px도 밀리지 않음(Input inset shadow 기법)

### 다크 모드

- [ ] `.dark` 토글 시 모든 색상 전환(form + icon 토큰 재매핑)
- [ ] Leading search icon `#1c1c1c` → `#dddddd`
- [ ] Close button 배경 `#555555` → `#aaaaaa`
- [ ] Close button X `#ffffff` → `#1c1c1c`
- [ ] 전환 시 깜빡임 없이 0.2s 로 부드럽게 보간

### 접근성

- [ ] `<label htmlFor>` 로 input 연결
- [ ] Close button 에 `aria-label="검색어 지우기"`
- [ ] Close button `tabIndex={-1}` (Tab 순서에서 제외, 마우스/터치로만)
- [ ] Search icon `aria-hidden`

### 의존성

- [ ] Input 컴포넌트를 공용 컴포넌트로 재사용(container 직접 구현하지 않음)
- [ ] Input 이 `forwardRef` 로 ref 를 받을 수 있는지 확인
- [ ] Input 이 없으면 `Input/README.md` 스펙으로 먼저 구현 후 조합
- [ ] Close button 을 공용 Icon Button 으로 구현하지 않음(Search 전용 원형 디자인)

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Search을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
