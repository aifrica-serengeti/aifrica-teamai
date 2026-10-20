# Pagination — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 빌드/구조 (의존 컴포넌트 재사용)

- [ ] 네비게이션 버튼이 **IconButton** 컴포넌트(`size="medium"`, `iconSize="2xl"`, `variant="ghost"`)를 재사용 (직접 `<button>` 생성 아님)
- [ ] 페이지 번호 입력이 **Input** 컴포넌트(`size="medium"`, label 생략)를 재사용
- [ ] 페이지당 항목수가 **Dropdown** 컴포넌트(`size="medium"`, label 생략)를 재사용 (Select 아님)
- [ ] Select를 쓰지 않음 (tertiary button 토큰은 Dropdown이 일치)

### 레이아웃

- [ ] 컨테이너 파트 간 gap이 16px
- [ ] 페이지 입력 영역(input ↔ "/ N") gap이 8px
- [ ] 페이지 번호 Input 폭이 44px
- [ ] 페이지당 항목수 Dropdown 폭이 59px
- [ ] Icon Button 터치영역이 24px, 내부 icon이 24px(2xl)
- [ ] 결과 카운트·총페이지가 Body3(12px/16px)
- [ ] 결과 카운트 강조(N)가 SemiBold(600)
- [ ] 다국어 `rangeTemplate`에서도 `{total}`만 공용 강조색과 SemiBold를 유지
- [ ] `locale` 변경 시 total/start/end 숫자 형식이 해당 locale로 표시

### 색상 (라이트)

- [ ] 결과 카운트 본문이 `#1c1c1c` (gray-900)
- [ ] 총건수(N)가 `var(--accent-500)` (accent-500)
- [ ] "/" 구분자가 `#555555` (gray-700)
- [ ] 총페이지 숫자가 `#1c1c1c` (gray-900)

### 색상 (다크 — 핵심 함정)

- [ ] 총건수(N)가 **`var(--accent-200)` (accent-200)** — 전역 `--text-primary`(accent-400)가 아님
- [ ] `--pg-count-primary` 토큰을 사용 (전역 `--text-primary` 직접 참조 아님)
- [ ] 결과 카운트 본문이 `#dddddd` (gray-200)
- [ ] "/" 구분자가 `#aaaaaa` (gray-400)
- [ ] Input/Dropdown이 각 컴포넌트 다크 스펙으로 자동 전환

### 입력 동작

- [ ] 페이지 번호 input에 **숫자만 입력**됨 (문자·기호·공백 차단)
- [ ] 모바일에서 숫자 키패드 노출 (`inputMode="numeric"`)
- [ ] Enter 키로 페이지 확정
- [ ] blur로 페이지 확정
- [ ] 범위 밖 값(0, totalPages 초과)이 clamp됨
- [ ] 빈 값/NaN이 이전 페이지로 원복

### 상태

- [ ] page=1일 때 « ‹ 가 disabled
- [ ] page=totalPages일 때 › » 가 disabled
- [ ] total=0일 때 모든 nav가 disabled, 카운트 "총 0건 중 0-0건"
- [ ] `disabled` prop 시 모든 상호작용 차단
- [ ] 페이지당 항목수 변경 시 첫 페이지로 리셋
- [ ] `showPageSize` 생략 시 기존 항목 수 Dropdown이 유지됨
- [ ] `showPageSize={false}`이면 Dropdown·빈 wrapper·Tab stop 없이 카운트·페이지 입력·이동 버튼을 유지
- [ ] 숨김 상태에서도 전달한 `pageSize`로 총페이지·범위를 계산하고 페이지 이동 callback을 호출
- [ ] `mode="simple"`은 `showPageSize`와 무관하게 기존 간략 UI를 유지

### 접근성

- [ ] 컨테이너가 `<nav aria-label="페이지네이션">`
- [ ] 네비게이션 버튼 4종이 각각 `aria-label` (처음/이전/다음/마지막)
- [ ] 페이지 번호 input에 `aria-label="현재 페이지, 총 N페이지"`
- [ ] Tab으로 모든 요소 순차 이동 가능
- [ ] 다크/라이트 전환이 깜빡임 없이 부드러움 (0.2s ease, 색상 속성만)
- [ ] `transition: all`을 쓰지 않음

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Pagination을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 navigation semantics, focus/keyboard, selection 및 overflow 규칙을 소유한다. 부모는 공개 controlled API로 값만 전달하고 내부 markup/CSS를 재구현하지 않는다.
- **변형 금지**: 문서에 없는 depth 축약, route 이동, selected indicator 또는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
