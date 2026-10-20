# Status — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Status 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 색상 (라이트)

- [ ] Error 아이콘이 `#d00a0a` (red-700)
- [ ] Warning 아이콘이 `#f0bb00` (yellow-500)
- [ ] Success 아이콘이 `#05a85a` (green-600)
- [ ] **Normal 아이콘이 `var(--solution-primary)` (solution primary, primary) — 회색(neutral)이 아님**
- [ ] Incomplete 아이콘이 `var(--solution-primary)` (solution primary, primary)
- [ ] **Not started 아이콘이 `#757575` (gray-600, neutral) — Normal 과 색상 다름**
- [ ] Pending/Not started 아이콘이 `#757575` (gray-600, neutral)
- [ ] Info/In progress 아이콘이 `var(--solution-primary)` (solution primary)
- [ ] 채워진 원 위 마크(X/!/✓/점·3/i)가 `#ffffff` (흰색)
- [ ] Label 텍스트가 `#1c1c1c` (gray-900)
- [ ] 모든 색상을 `--status-*` 토큰으로 참조 (hex 하드코딩 아님)

### 색상 (다크)

- [ ] Error 가 `#e81919` (red-600) 로 전환
- [ ] Success 가 `#06ce6e` (green-500) 로 전환
- [ ] primary 계열(Normal/InProgress/Incomplete/Info)이 `var(--solution-primary)` (solution dark primary) 로 전환
- [ ] neutral(Not started/Pending)이 라이트와 동일 `#757575` 유지
- [ ] Label 텍스트가 `#dddddd` 로 전환

### 아이콘 형태 — 핵심 검증

- [ ] **채워진 원(error/warning/success/pending/info)** 반경이 **r=8.335** (r=7.708 아님)
- [ ] **Error X** 가 원 중앙 정렬(path: `M13.334 6.666 L6.666 13.334 M6.666 6.666 L13.334 13.334`)
- [ ] **Success/Normal 체크** 가 원 중앙(path: `M13.89 7.08 L8.55 12.43 L6.11 10.00`, 좌측 치우침 없음)
- [ ] **Normal** 이 **실선 원**(점선 아님) + primary(파랑) 색 + **투명 fill**(흰색이 아님)
- [ ] **Not started** 가 **점선 원**(실선 아님) + neutral(회색)
- [ ] **점선 원** 의 `stroke-dasharray` 가 `1.6177 3.2256` (Figma 원본 `1.67 3.33` 아님 — 겹침 발생)
- [ ] **점선 원 3시 방향(우측)** 에서 두 대시가 겹쳐 보이지 않음(10개 대시로 균등 분할)
- [ ] **Incomplete 좌측 반원** 이 **점선을 완전히 덮음**(반원이 위에 렌더, r=8.333 으로 stroke 외곽까지 확장)
- [ ] **Info** 의 dot 이 곡선 path(단순 `<circle>` 아님)
- [ ] **Info** 의 stem 이 ⌐형(path: `M9.03125 9.22461H10.194V13.4882`)
- [ ] **Info** 의 foot(하단 가로 발) 이 별도 path(`M8.45117 13.876H11.9395`, `stroke-miterlimit="10"`)
- [ ] **Pending** 점 3개가 x=5.83/10/14.17 (간격 4.17px), 원 색상이 **neutral(진회색)** (파랑 아님)
- [ ] **In progress** 는 `Spinner size="small"`을 유지하면서, `statusSpinner` 래퍼가 **20×20px** 영역만 차지함(별도 스케일업 없음)

### 레이아웃

- [ ] State icon 박스가 **20×20px** (단일 사이즈, 별도 size prop 없음)
- [ ] **In progress** 의 Spinner 래퍼도 **20×20px** 이며, Label 시작 위치가 다른 상태와 일치
- [ ] icon ↔ Label 간 gap 이 **4px**
- [ ] 아이콘과 라벨이 세로 중앙 정렬
- [ ] Label 이 줄바꿈 없음(`white-space: nowrap`)

### 타이포그래피

- [ ] 폰트가 **Pretendard Regular(400)**
- [ ] font-size **14px**, line-height **20px**, letter-spacing **0**

### 의존성

- [ ] In progress 상태가 공용 **Spinner** 컴포넌트를 사용함(인라인 구현 아님)
- [ ] Spinner size 가 **"small"**(20px) 로 Status icon 박스와 일치
- [ ] Spinner 에 `aria-hidden="true"` 가 전달됨(부모 Status 의 aria 중복 방지)

### 접근성

- [ ] `role="status"` 속성이 있음
- [ ] 상태별 `aria-label` 이 있음
- [ ] `showLabel={false}` 시에도 `aria-label` 이 유지됨
- [ ] In progress 의 Spinner 가 `aria-hidden="true"` 처리됨

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Status을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
