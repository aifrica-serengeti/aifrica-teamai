# Number Input — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 빌드

- [ ] `pnpm lint` 에러 0
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과

### 레이아웃

- [ ] Container 높이: small 28 / medium 32 / large 36 / xlarge 40px
- [ ] 좌측 패딩 12px, 우측 패딩 4px(small 6px)
- [ ] Border radius 4px
- [ ] Icon Button 영역: small 20px(tiny), 나머지 24px(medium)
- [ ] **Icon 사이즈: small 14px(s), 나머지 16px(m)** — IconButton tiny 기본값(12px) 아님
- [ ] **−/+ 버튼 간격: 모든 사이즈 gap 0(붙어있음)** — 버튼이 떨어져 있으면 안 됨
- [ ] field 세로 gap 4px, labelRow 가로 gap 2px
- [ ] page grid에서 root가 cell 100% 폭과 `min-width: 0`을 사용함
- [ ] suffix가 입력칸 내부의 증감 버튼 앞에 표시되고 좁은 너비에서도 값·버튼과 겹치지 않음
- [ ] suffix 생략 시 기존 크기·배치가 유지됨

### 색상 (Figma 원본과 대조)

- [ ] Enabled border `#dddddd`, surface `#ffffff`
- [ ] Focused border 2px(시각적) `var(--accent-500)` — 1px border + 1px inset box-shadow
- [ ] Invalid border 2px(시각적) `#e81919`
- [ ] Disabled surface `#f8f8f8`, text `#aaaaaa`
- [ ] Read-only surface `#f8f8f8`, **text `#1c1c1c`**(disabled 와 다름)
- [ ] Create variant surface `#f8f8f8`, border 없음
- [ ] Error text `#d00a0a`(`--text-error`) — 필수 \* `#e81919`(`--text-danger`) 와 **다름**
- [ ] 다크 모드: primary `var(--accent-400)`, error text `#fec3c3`, 필수 `#fb3e3e`

### 상태

- [ ] Focus 시 콘텐츠 밀림 없음(border-width 고정 + inset box-shadow)
- [ ] Disabled + invalid 동시에 disabled 색이 이김
- [ ] Read-only 는 disabled 표면이지만 값 text 는 enabled 색
- [ ] Create variant focus 시 border + active 표면 전환

### 증감 동작

- [ ] − / + 버튼 클릭 시 step 단위 증감
- [ ] ↑ / ↓ 키 증감, Shift+↑/↓ 시 step × 10
- [ ] min/max 범위 클램프
- [ ] controlled / uncontrolled 모두 정상 동작
- [ ] `textValue=""` 제어 입력을 지우고 다시 입력해도 controlled/uncontrolled 경고 없음
- [ ] 브라우저 기본 number spinner 미노출
- [ ] 숫자 page field가 일반 Input `type="number"`로 우회 구현되지 않음
- [ ] 빈 값·음수 부호·소수점 입력 중간 상태가 허용된 domain에서 `textValue`로 유지됨

### 지수 표기 입력 거부

- [ ] `e`/`E` 키 입력, `1e`/`1e3`/`1E-3` 붙여넣기·드롭이 기존 값을 바꾸지 않음
- [ ] 지수 포함 삽입 전체를 거부하며 `1e3`을 `13`이나 `1000`으로 바꾸지 않음
- [ ] native `beforeinput`의 지수 문자 삽입을 취소하고 조합 중인 이벤트는 중단하지 않음
- [ ] keydown/paste/beforeinput을 우회한 input/change에서도 지수 표기를 복원하고 값 callback 없음
- [ ] 브라우저가 `1e`를 빈 문자열로 정제한 경우에도 이벤트 `data`의 `e`를 감지해 기존 값 유지
- [ ] 거부한 동일 이벤트의 input/change 이중 처리로 기존 값 callback이 다시 호출되지 않음
- [ ] 호출자의 keyboard/paste/drop handler는 한 번 전달되고 `defaultPrevented`를 존중함
- [ ] 호출자 `onInput`은 복원 후 한 번 전달되고 `onBeforeInput` 전달도 유지됨
- [ ] `-2`, `1.5`, `0`, 의도적인 비우기, ↑/↓·Shift 증감과 min/max가 유지됨
- [ ] 외부 `value`/`defaultValue`/`textValue` 업데이트를 지수 차단 정책으로 임의 변경하지 않음
- [ ] controlled·uncontrolled·문자열 draft, disabled/read-only 상태에서 동일 정책 확인

### 접근성

- [ ] Tab 으로 input 포커스 이동
- [ ] 증감 버튼 `aria-label="값 증가/감소"`
- [ ] invalid 시 `aria-invalid="true"`
- [ ] 단위와 help/error의 ID가 `aria-describedby`에 연결되고 호출자의 설명 ID도 보존됨
- [ ] 단위 텍스트는 native 값/숫자 callback에 포함되지 않음
- [ ] read-only/disabled 는 시각적 focus 링 없음

### 다크 모드

- [ ] semantic 토큰 자동 전환
- [ ] 전환 시 깜빡임 없이 0.2s ease 보간
- [ ] 전역 `*` 셀렉터 아닌 개별 요소 transition

### 토큰

- [ ] hex 직접 하드코딩 없음 — 모두 `--form-*` / `--text-*` 변수 참조
- [ ] `--text-error` 토큰 정의됨(`:root` + `.dark`)

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 NumberInput을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
