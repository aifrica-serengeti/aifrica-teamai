# Input — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 레이아웃

- [ ] Container 높이: Small 28 / Medium 32 / Large 36 / X-Large 40px
- [ ] 가로 패딩 12px, radius 4px
- [ ] Label ↔ Container ↔ Help text 간격 모두 4px
- [ ] Trailing 이 input 텍스트와 겹치지 않음(우측 패딩 확보)

### 색상 (Figma 원본과 대조)

- [ ] Enabled border `#dddddd`, surface `#ffffff`, placeholder `#8f8f8f`
- [ ] Focused border 2px `var(--accent-500)`(border 1px + inset shadow 1px)
- [ ] Invalid border `#e81919`
- [ ] Disabled surface `#f8f8f8`, placeholder `#aaaaaa`
- [ ] Read-only surface `#f8f8f8`, **text 는 enabled 색 `#1c1c1c` 유지**
- [ ] Create style: border 없음, surface `#f8f8f8`

### 상태 동작

- [ ] Focus 시 placeholder/입력값이 **1px도 밀리지 않음**(inset shadow 기법)
- [ ] Read-only 에 Tab focus 시 **시각적 focus 링 없음**
- [ ] Disabled + Invalid 겹침 시 disabled 색상이 이김
- [ ] Password 토글 클릭 시 `password` ↔ `text` 전환
- [ ] locale별 `passwordShowLabel` / `passwordHideLabel` 전달 시 토글의 accessible name도 함께 전환

### 다크 모드

- [ ] `.dark` 토글 시 모든 색상이 전환됨(form semantic 토큰 재매핑)
- [ ] 전환 시 깜빡임 없이 0.2s 로 부드럽게 보간

### 접근성

- [ ] `<label htmlFor>` 로 input 연결
- [ ] Error text 에 `role="alert"`
- [ ] Icon Button(clear/password) 에 `aria-label` / `aria-pressed`
- [ ] Invalid 시 `aria-invalid="true"`
- [ ] `reserveDescriptionSpace` 사용 시 기본/Invalid 전환에도 다음 field의 y 좌표가 변하지 않음
- [ ] 빈 예약 영역은 접근성 트리에 노출되거나 `aria-describedby`로 연결되지 않음

### 의존성

- [ ] Icon Button 을 공용 컴포넌트로 재사용(직접 구현하지 않음)
- [ ] Input size=Small 일 때: Icon Button 20×20, icon 14px (Tiny)
- [ ] Input size=Medium 이상일 때: Icon Button 24×24, icon 16px (Medium)
- [ ] Icon Button 이 없으면 `IconButton/README.md` 스펙으로 먼저 구현 후 조합

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Input을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

### 보조 액션 검증

- [ ] 긴 readonly 값에서도 버튼이 input 안 우측 중앙에 있고 텍스트와 겹치지 않는다.
- [ ] 라벨·도움말·오류 표시와 모든 input 크기에서도 버튼 정렬이 유지된다.
- [ ] readOnly 액션은 실행 가능하고 폼 제출을 유발하지 않는다.
- [ ] 필드 또는 액션이 disabled이면 실행되지 않는다.
- [ ] clear/password 토글과 보조 액션이 각각 독립적으로 작동한다.

### 브라우저 제약 검증

- [ ] 잘못된 URL·이메일과 필수값 누락으로 submit하면 browser 말풍선 없이 DS 오류 문구와 테두리가 보이고 submit은 차단된다.
- [ ] 최초 렌더·untouched 타이핑·blur에는 native 오류가 나타나지 않는다.
- [ ] 오류 표시 후 타이핑하면 현재 validity로 갱신되고, 올바른 값으로 고치면 오류가 사라져 정상 제출된다.
- [ ] `errorText`가 native 오류보다 우선하며 `nativeValidationMessage`로 locale별 문구를 바꿀 수 있다.
- [ ] controlled 값과 `type`·`required`·`pattern` 등 제약을 바꾸면 이전 값/제약의 오류가 남지 않는다.
- [ ] disabled/readOnly 전환 시 native 오류만 숨기며 호출자의 명시적 오류는 유지된다.
- [ ] 완료된 form reset은 오류를 지우고 uncontrolled counter를 reset 값으로 갱신하며, 취소된 reset은 유지한다.
- [ ] 여러 필드가 잘못된 form과 native select/textarea가 섞인 form에서 첫 검증 대상에 focus가 유지된다.
- [ ] 한 필드만 `reportValidity()`로 검증하면 다른 invalid 형제 필드로 focus하지 않는다.
- [ ] `form=` 외부 native control, callback에서 교정된 첫 오류, raw-only `checkValidity()`도 focus 정책을 유지한다.
- [ ] 값·검증 조건을 바꿨다가 원래대로 되돌려도 새 검증 없이 과거 오류가 나타나지 않는다.
- [ ] caller의 `setCustomValidity()` 변경·해제를 같은 입력/검증 사이클의 오류 표시와 일치시킨다.
- [ ] `onInvalid`·`onChange`·호출자의 `aria-describedby`와 `noValidate` form 정책이 보존된다.
- [ ] native 오류에도 `aria-invalid`, 연결된 설명 id, `role="alert"`와 light/dark Error text 스타일이 적용된다.
- [ ] bare `Input` primitive의 기본 HTML 검증 UI와 유효 여부는 변경되지 않는다.
