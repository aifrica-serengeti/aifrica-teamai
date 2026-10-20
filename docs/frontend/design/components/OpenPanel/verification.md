# Open panel — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](./README.md)

## 13. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 구조 / 레이아웃

- [ ] Header 높이가 정확히 **56px** (고정, `minHeight: 56px`)
- [ ] Body padding 이 **24px** (사방)
- [ ] Header 내 요소 순서: [닫기] [icon+Title] [Actions] (좌→우)
- [ ] Title 이 길면 말줄임 처리(`text-overflow: ellipsis`)
- [ ] Top/Bottom 패널 높이 **386px**, Left/Right 패널 너비 **424px**

### 타입 / 위치

- [ ] Overlay 에 scrim(rgba(0,0,0,0.25)) 표시, Inline 은 scrim 없음
- [ ] Overlay 에 `--elevation-overlay` 그림자, Inline 은 평면(box-shadow none)
- [ ] 위치(T/R/B/L)가 type(Overlay/Inline)과 무관하게 동일하게 적용 — **Inline 도 보여야 함**
- [ ] 패널이 해당 변에서 반대 방향으로 슬라이드(top은 아래로, right는 좌로...)

### Header / 의존성

- [ ] 닫기 버튼이 **Icon Button**(ghost, xlarge, close icon)으로 렌더 — 일반 `<button>` 아님
- [ ] 닫기 버튼 클릭 시 패널 닫힘 (Radix Dialog.Close)
- [ ] Leading icon 이 **Icon** 컴포넌트로 렌더(size="l", color="default")
- [ ] Header actions 의 버튼이 **Button** 컴포넌트 — shadcn Button 아님

### Resize

- [ ] Resize line 이 **4×20px 캡슐**(border-radius 1000px) — 풀 높이 선이 아님
- [ ] Line 이 패널 테두리에서 **안쪽 10px** 에 배치
- [ ] 좌우 패널은 세로 그립(4×20), 상하 패널은 가로 그립(20×4)
- [ ] 드래그 시 패널 크기 실시간 변경 (280px ~ 뷰포트 90%)
- [ ] Hover 시 line 색 `#aaa`, 드래그 중 `#1c1c1c`

### 애니메이션

- [ ] 패널 진입/퇴장이 **0.25s** slide 애니메이션
- [ ] Scrim 이 동시 fade-in/out (0.25s)
- [ ] 색상 전환이 색상 속성만 0.2s (`transition: all` 아님)

### 다크 모드

- [ ] 패널 배경 `#1c1c1c`, 텍스트 `#dddddd`, 테두리 `#555555`
- [ ] Header 하단선 `#333333` (subtle)
- [ ] Resize line 기본 `#555555`, hover `#555555`, active `#dddddd`
- [ ] 다크/라이트 전환 시 깜빡임 없이 부드럽게

### 접근성

- [ ] ESC 키로 패널 닫힘
- [ ] Overlay 에서 scrim 클릭으로 닫힘
- [ ] 패널 열림 시 포커스가 내부로 이동, 닫힘 시 trigger 로 복원
- [ ] 닫기 버튼에 `aria-label="패널 닫기"`
- [ ] Resize handle 에 `role="separator"`, `aria-label`, `tabIndex`

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 OpenPanel을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 portal surface, focus return, Escape와 keyboard interaction, open/close animation을 소유한다. 부모는 문서의 open callback/controlled API로만 연결한다.
- **변형 금지**: 임의 z-index, 다른 overlay primitive, browser 기본 popup, 문서에 없는 viewport 재배치는 사용하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
