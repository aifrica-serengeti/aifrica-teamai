# Dialog — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](./README.md)

## 14. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 구조 / 레이아웃

- [ ] Small 너비 **400px**, Medium **580px**, Large **720px**, X-Large **920px**
- [ ] Medium/Large 의 `height`가 아닌 `maxHeight: 640px` — 콘텐츠 적으면 auto, 많으면 640px 고정
- [ ] X-Large의 `maxHeight: min(760px, calc(100vh - 32px))` — 상하 16px 여백 보호 유지
- [ ] 중앙 정렬: `translate(-50%, -50%)` — `transform` 유지한 채 scale 애니메이션
- [ ] 모서리 반경 **8px**, 테두리 `1px solid #dddddd`
- [ ] Header padding `24px 24px 18px`, Subheader padding `12px 24px 16px`, Footer padding `24px`
- [ ] Footer gap **8px**, 우측 정렬(`justify-content: flex-end`)
- [ ] 긴 제목은 닫기 버튼의 32px hit area와 8px 텍스트 간격을 침범하지 않고 한 줄 말줄임되며, 전체 접근성 이름은 유지
- [ ] generic Small과 `size="small" profile="confirmation"`은 모두 400px이며 좁은 화면에서 좌우 16px max-width를 유지
- [ ] 생성·저장·수락·승인·거절·취소·삭제·동기화 confirmation이 모두 같은 400px geometry를 사용
- [ ] 모든 confirmation이 대상과 영향을 설명하는 description을 표시하고 빈 문자열·공백·빈 native wrapper는 공용 안전 설명으로 대체
- [ ] confirmation의 action/tone/pending label이 바뀌어도 너비가 변하지 않음
- [ ] 입력·선택·목록·표가 필요한 workflow를 400px confirmation profile에 넣지 않음

### 의존성 컴포넌트

- [ ] 닫기 버튼이 **Icon Button**(ghost, xlarge, close icon)으로 렌더 — 일반 `<button>` 아님
- [ ] 닫기 버튼 클릭 시 다이얼로그 닫힘 (Radix `Dialog.Close asChild`)
- [ ] 닫기 버튼이 Header 우측 절대 위치(`right: 24px`, `top: 50%`, `translateY(-50%)`)
- [ ] Footer 버튼이 **Button** 컴포넌트 — `size="medium"` 고정
- [ ] Subheader 의 Segmented Control 이 **SegmentedControl** 컴포넌트 — `fullWidth`, `size="medium"`
- [ ] Body 의 입력 필드가 **Input** 컴포넌트로 렌더
- [ ] Dialog 내부 Select는 Dialog portal 경계를 사용하고 긴 option 목록의 wheel이 정상 동작
- [ ] Select option layer가 Dialog Body에 잘리지 않고 trigger 폭으로 표시

### 스크롤

- [ ] Body 스크롤이 공용 **ScrollArea** 컴포넌트로 처리 — raw `::-webkit-scrollbar` 아님
- [ ] ScrollArea `type="always"` — thumb 가 항상 표시
- [ ] 스크롤 thumb 가 dialog **우측 끝**에 위치 (패딩 안쪽이 아님)
- [ ] `flex: 1 1 auto` + `minHeight: 0` flex chain 이 Body → ScrollArea → scrollContainer 까지 이어짐
- [ ] 콘텐츠가 적으면 스크롤 없음 → border 도 fade 도 없음(`data-scroll-position="none"`)
- [ ] 콘텐츠가 많으면 스크롤 발생 → border 와 fade 가 위치에 따라 분기
- [ ] border 가 **전체 너비**(좌우 패딩 영역까지 쭉 이어짐)
- [ ] 맨 위 → 하단 border + 하단 fade 만
- [ ] 중간 → 상하 border + 상하 fade 둘 다
- [ ] 맨 아래 → 상단 border + 상단 fade 만
- [ ] border 색상 `#dddddd`(`--border-default`), fade 가 `--surface`에서 transparent 로 16px
- [ ] `scrollFadeTone="subtle"`에서도 같은 위치 분기와 16px 높이를 유지하고 표시 opacity만 50%로 낮아짐

### 그림자 / 색상

- [ ] 그림자가 navy 톤 `0 8px 12px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)`(`--dialog-shadow`)
- [ ] Scrim `rgba(0, 0, 0, 0.25)`
- [ ] Title `#1c1c1c`(`--text`), 20px/600/24px (Headline3)
- [ ] Description `#555555`(`--text-subtle`), 16px/400/24px (Body1)

### 애니메이션

- [ ] 진입/퇴장이 **0.2s** fade+scale 애니메이션
- [ ] Scrim 이 동시 fade-in/out (0.2s)
- [ ] `transform: translate(-50%, -50%)` 유지한 채 scale 만 변화
- [ ] border/fade 전환이 0.2s ease
- [ ] 색상 전환이 색상 속성만 0.2s (`transition: all` 아님)

### 다크 모드

- [ ] 본체 배경 `#1c1c1c`, 텍스트 `#dddddd`, 테두리 `#555555`
- [ ] Description `#aaaaaa`(`--text-subtle` 다크)
- [ ] 스크롤 border `#555555`, thumb 반투명 `#dddddd`
- [ ] fade gradient 가 `#1c1c1c`에서 transparent 로
- [ ] 그림자는 동일(navy alpha 기반)
- [ ] 다크/라이트 전환 시 깜빡임 없이 부드럽게

### 접근성 / 닫기 동작

- [ ] ESC 키로 다이얼로그 닫힘 (`closeOnEscape` 기본 true)
- [ ] `closeOnEscape={false}` 시 ESC 로 닫히지 않음
- [ ] Scrim 클릭으로 닫힘 (`closeOnOutsideClick` 기본 true)
- [ ] `closeOnOutsideClick={false}` 시 scrim 클릭으로 닫히지 않음
- [ ] 닫기 버튼(×) 클릭으로 항상 닫힘 (`DialogPrimitive.Close asChild`)
- [ ] 열림 시 포커스가 내부로 이동, 닫힘 시 trigger 로 복원
- [ ] Tab/Shift+Tab 이 다이얼로그 내부에 갇힘(focus trap)
- [ ] `closeLabel`이 없을 때 닫기 버튼에 `aria-label="다이얼로그 닫기"`
- [ ] `closeLabel`을 전달했을 때 닫기 버튼이 전달된 locale별 `aria-label`을 사용
- [ ] confirmation open 시 안전한 footer action에 focus가 있고, 결과 Button이 구체적인 결과 동사를 사용
- [ ] 200% zoom과 432px 미만 viewport에서 confirmation이 viewport를 넘지 않고 좌우 16px 여백을 유지

## 15. 새 프로젝트 재현 잠금 계약

이 계약은 Dialog을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 portal surface, focus return, Escape와 keyboard interaction, open/close animation을 소유한다. 부모는 문서의 open callback/controlled API로만 연결한다.
- **변형 금지**: 임의 z-index, 다른 overlay primitive, browser 기본 popup, 문서에 없는 viewport 재배치는 사용하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

## 공용 알림과의 상호작용

- [ ] Dialog가 열린 뒤 공용 API 오류가 live region에 표시된다.
- [ ] 토스트 개별/전체 닫기와 action 클릭으로 Dialog가 닫히거나 draft가 사라지지 않는다.
- [ ] 기존 onInteractOutside handler, scrim·Escape 닫기는 유지된다.
- [ ] Alt+Shift+N은 알림만 닫고 Dialog 입력 포커스를 유지한다.

- [ ] 모달을 연 채 넘치는 공용 알림 스택을 스크롤할 수 있다. 배경 스크롤은 잠겨 있고 입력·포커스는 유지된다.
