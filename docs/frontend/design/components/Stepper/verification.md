# Stepper — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 구조

- [ ] Stepper-icon이 **항상 20px** (size prop Small/Medium 무관)
- [ ] Horizontal: Icon+Label(가로행) → Divider(가로선) 반복
- [ ] Vertical: Icon+Label(가로행) → Divider(세로선) 반복
- [ ] **마지막 step에 Divider 없음** (H: 가로선 없음, V: 세로선 없음)
- [ ] Horizontal 마지막 item은 콘텐츠 너비로 끝나며 라벨 오른쪽에 빈 flex 영역이 없음
- [ ] **Invalid(에러) step에도 Divider 있음** — 마지막이 아닌 이상 모든 step이 divider를 가짐
- [ ] Horizontal 라벨이 icon **오른쪽** (아래가 아님)
- [ ] Vertical help text가 icon 아래, label과 **동일 시작점**(left: 28px)
- [ ] Divider가 Icon+Label 그룹(label 끝 아님) 뒤에 **gap 16px** 후 시작

### 체크/X SVG 모양

- [ ] **체크마크(Completed)**: 우상→좌하→좌중앙 V자. `fill="none"`, stroke 렌더.
      Small: `M7.97 0.5 L2.83 5.63 L0.5 3.3` (viewBox 8.47×6.13, stroke 1px).
      Medium: `M10.08 0.75 L3.67 7.17 L0.75 4.25` (viewBox 10.83×7.92, stroke 1.5px).
- [ ] **X 마크(Invalid)**: 두 대각선 교차 X자. **`fill` 렌더** (stroke 아님!).
      닫힌 Union path 사용 — 단순 선분 2개 금지.
      Small: viewBox 6.6×6.6. Medium: viewBox 8.5×8.5.
      fill: 라이트 `#ffffff` / 다크 `#1c1c1c`.

### 색상 (라이트)

- [ ] Completed: 흰 원 + 파랑(var(--accent-500)) 테두리 + 파랑 체크
- [ ] Active: 파랑(var(--accent-500)) 원 + 흰 숫자 + 라벨 파랑
- [ ] Incomplete: 흰 원 + 회색(#aaaaaa) 테두리 + 진(#1c1c1c) 숫자
- [ ] Invalid: 빨강(#d00a0a) 원 + 흰색 X
- [ ] Disabled: 흰 원 + 옅은 회색(#dddddd) 테두리 + 회색(#aaaaaa) 숫자
- [ ] Divider completed 구간 = 파랑(var(--accent-500)), 미완료 = #1c1c1c

### 색상 (다크) — REST API 실제값 기준

- [ ] Completed: **#1c1c1c** 배경 + var(--accent-400) 테두리 + var(--accent-400) 체크 (흰 배경이 아님)
- [ ] Active: var(--accent-400) 배경 + 흰 숫자 + 라벨 var(--accent-200)
- [ ] Incomplete: **rgba(0,0,0,0.2)** 반투명 검정 배경 (불투명 #000000이 아님)
- [ ] Incomplete 테두리: #555555 (gray-700)
- [ ] Invalid: **#e81919** 배경 + **#1c1c1c 검정 X** (흰색 X가 아님!)
- [ ] Disabled: **#282828** 배경 + #555555 테두리 + #555555 숫자
- [ ] Divider completed = var(--accent-400), 미완료 = **#555555** (gray-700)

### 정렬

- [ ] Horizontal Divider가 icon 수직 중심에 위치
- [ ] Vertical Divider가 icon 수평 중심에 위치 (paddingLeft 9.5px)
- [ ] Vertical label과 help text 시작점 동일 (left: 28px)

### Divider 가시성 (핵심 — 이 항목을 놓치면 선이 안 보임)

- [ ] **Vertical 세로선이 실제로 보임** — `vDividerWrap` 이 `align-items: stretch` 이고
      `vDivider` 에 `height` 속성이 없는지 확인. `height: 100%` 나 `align-items: center` 를
      쓰면 세로선 height 가 0px 이 되어 보이지 않음 (§4 경고 참조).
- [ ] **Horizontal 가로선이 충분한 너비를 가짐** — Stepper 컨테이너가 부모 폭을
      100% 사용하는지 확인. `width: 100%` 가 없으면 Stepper 가 좁아져 divider 가
      `min-width: 8px` 로 압축됨 (§4 경고 참조).
- [ ] invalid step 우측/하단에도 divider 가 있음 (마지막 step만 제외)
- [ ] Vertical 세로선 색상: completed 구간 = 파랑, 그 외 = 회색(라이트 #1c1c1c / 다크 #555555)
- [ ] Horizontal 가로선 색상: completed 구간 = 파랑, 그 외 = 회색(라이트 #1c1c1c / 다크 #555555)

### 타이포그래피

- [ ] Small 라벨: Pretendard SemiBold 14px/20px
- [ ] Medium 라벨: Pretendard SemiBold 16px/24px
- [ ] Small 숫자: Pretendard **Bold(700)** 10px/15px
- [ ] Medium 숫자: Pretendard **SemiBold(600)** 12px/20px
- [ ] Help text: Pretendard Regular 12px/16px
- [ ] clickable label button이 span과 **동일한 폰트**(14px/600/20px) — 브라우저 기본값(16px/400)이 아님

### 인터랙션

- [ ] `clickable=true` 시 라벨이 버튼으로 동작 (클릭 → step 이동)
- [ ] `steps[index].clickable=false`인 라벨은 전체 clickable 상태에서도 버튼이 되지 않음
- [ ] 라벨 hover 시 primary 색상 변화
- [ ] 라벨 focus-visible 시 2px primary 포커스 링
- [ ] disabled step은 클릭 불가

### 다크 모드 전환

- [ ] icon 배경이 라이트(흰) → 다크(#1c1c1c / rgba(0,0,0,0.2))로 전환
- [ ] Invalid X 마크가 라이트(흰) → 다크(검정 #1c1c1c)로 전환
- [ ] 모든 색상 전환이 0.2s ease로 부드럽게

### 접근성

- [ ] `role="list"` / `role="listitem"` 적용
- [ ] active step에 `aria-current="step"`
- [ ] disabled 시 `aria-disabled="true"`
- [ ] 클릭 가능 라벨이 키보드 Tab으로 포커스 가능

### 토큰 규칙

- [ ] 모든 색상이 `--stepper-*` semantic 토큰 참조 (raw palette 직접 참조 금지)
- [ ] `.dark`에서 모든 `--stepper-*` 토큰이 재매핑됨
- [ ] labelButton에 `font` 속성 설정 없음 (baseSmall/baseMedium 폰트 유지)

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Stepper을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 navigation semantics, focus/keyboard, selection 및 overflow 규칙을 소유한다. 부모는 공개 controlled API로 값만 전달하고 내부 markup/CSS를 재구현하지 않는다.
- **변형 금지**: 문서에 없는 depth 축약, route 이동, selected indicator 또는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
