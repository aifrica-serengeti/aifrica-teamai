# Textarea — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Textarea 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 레이아웃

- [ ] Container 높이 **84px**(height 명시 + rows=3). 감싼 div 와 빈 공간 없음
- [ ] 패딩 12px(상하좌우), radius **4px**, 폰트 14px/LH 20px
- [ ] Label 행 ↔ Container ↔ Help text 간격 모두 4px(field gap)
- [ ] resize handle 로 세로 크기 조절 가능(disabled/read-only 시 차단)

### Counter 위치

- [ ] Counter 가 **label 행 우측 끝**에 표시(space-between)
- [ ] Counter 가 box 내부가 아님(Input 의 trailing 과 다름)
- [ ] maxLength 설정 시 자동 표시. count prop 으로도 강제 가능

### 색상 (Figma 원본과 대조)

- [ ] Default Enabled border `#dddddd`, surface `#ffffff`, placeholder `#8f8f8f`
- [ ] Default Focused border 2px `var(--accent-500)`(border 1px + inset shadow 1px), surface `#ffffff`
- [ ] **Create Focused surface `#f8f8f8` 유지**(흰색으로 전환되지 않음)
- [ ] Invalid border `#e81919`
- [ ] Disabled surface `#f8f8f8`, placeholder `#aaaaaa`, text `#aaaaaa`
- [ ] Read-only surface `#f8f8f8`, **text 는 enabled 색 `#1c1c1c` 유지**

### 상태 동작

- [ ] Focus 시 placeholder/입력값이 **1px도 밀리지 않음**(inset shadow 기법)
- [ ] Read-only 에 Tab focus 시 **시각적 focus 링 없음**
- [ ] Disabled + Invalid 겹침 시 disabled 색상이 이김
- [ ] Create variant focus 시 **배경색 #f8f8f8 유지, border 2px var(--accent-500) 만 추가**

### 다크 모드

- [ ] `.dark` 토글 시 모든 색상이 전환됨(form semantic 토큰 재매핑)
- [ ] 전환 시 깜빡임 없이 0.2s 로 부드럽게 보간

### 접근성

- [ ] `<label htmlFor>` 로 textarea 연결
- [ ] Error text 에 `role="alert"`
- [ ] Invalid 시 `aria-invalid="true"`
- [ ] Counter 에 `aria-hidden`(시각용 보조)

### 의존성

- [ ] Input 과 동일한 `--form-*` 토큰 사용(별도 토큰 정의 없음)
- [ ] raw palette 직접 참조 없음(semantic 토큰만)

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Textarea을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
