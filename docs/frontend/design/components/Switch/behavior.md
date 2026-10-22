# Switch — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Switch 문서 인덱스](./README.md)

## 7. 상태

### Enabled

- 토글 가능. 클릭/Space/Enter 로 On/Off 전환.
- 커서: `pointer`.

### Disabled

- 토글 불가. Radix `disabled` prop 사용.
- 시각: 회색 track + 회색/흰 thumb. On/Off에 따라 thumb 색이 다름(§5/§6 참조).
- Off disabled에만 border 외곽선(라이트 `#aaaaaa` / 다크 `#333333`).
- 커서: `not-allowed`.

### Read-only

- 토글 불가(Radix `disabled`로 차단)하되 **시각은 Enabled와 동일**.
- 라벨/thumb가 비활성 색으로 변하지 않음.
- 커서: `default`.
- 구현: `disabled` prop은 쓰되 라벨의 `data-disabled`는 설정하지 않음. Track은 `data-readonly`로 커서만 `default`로 전환.

### Invalid (`aria-invalid="true"`)

- On invalid: track이 primary 대신 danger(`#e81919`)로 채워짐.
- Invalid + Disabled: disabled 색이 우선.

### Focused (`:focus-visible`)

- Track 주변 1px primary outline + 1px gap.

---

## 9. 애니메이션

### 상호작용 (토글, focus, hover)

- Track: `transition: background-color 0.2s ease, border-color 0.2s ease, outline-color 0.2s ease`.
- Thumb: `transition: transform 0.2s ease, background-color 0.2s ease`.
- Thumb 이동 시 `transform` transition으로 부드럽게 슬라이드.

### 다크/라이트 모드 전환

- 색상 전환은 **개별 컴포넌트 요소 레벨**에서 `transition: '<색상속성> 0.2s ease'`로 적용.
- **전역 `*` 셀렉터 사용 금지** / **`transition: all` 금지**.
- 컴포넌트 내 모든 transition 지속시간 **0.2s 통일** (깜빡임 방지).
- reduced-motion은 소비 앱의 실제 스타일에서 적용 여부를 확인한다. 전역 규칙이 있다고 가정하지 않는다.
  `@media (prefers-reduced-motion: reduce)`가 해당 요소에 적용되지 않으면 컴포넌트 범위의 전환·애니메이션을 즉시 완료하는 규칙을 둔다.
  전환을 생략해도 값·focus·표시 여부와 종료·정리 책임은 유지한다.

---

