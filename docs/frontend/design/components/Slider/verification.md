# Slider — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Slider 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 레이아웃

- [ ] Track 높이 4px, radius 2px
- [ ] Range/Fill 높이 4px (Track 과 동일)
- [ ] Handle(Thumb) 16×16 원형(radius 50%)
- [ ] Thumb 가 Track 세로 중앙에 정렬(Slider Root 높이 16px)
- [ ] Range 모드 Input 이 `[min | Track | max]` 양쪽 배치
- [ ] 단일 모드 Input 이 Track 오른쪽 1개
- [ ] Track ↔ Input 간격 20px
- [ ] Label 행 ↔ Body 행 4px, Label 내부 요소 간 2px
- [ ] Label은 14px SemiBold, optional/required/info는 공용 InputField와 동일한 외형
- [ ] Help/Error text가 Body 행 아래 4px 간격으로 표시되고, Error가 Help보다 우선
- [ ] Step tick 1×4px, 라벨은 짝수 step 마다(0/20/40/60/80/100)
- [ ] Steps ↔ Track 간격 6px
- [ ] Input 너비 56px, 숫자 스피너 제거

### 색상 (Figma 원본과 대조)

- [ ] Track `#dddddd` (`--border-default`)
- [ ] Range/Thumb `var(--accent-500)` (`--element-primary`)
- [ ] Hover 시 Thumb outline 2px `var(--accent-500)` (primary)
- [ ] Focus-visible 시 Thumb outline 2px `var(--accent-500)` (offset 2px)
- [ ] Disabled Range/Thumb `#eeeeee` (`--element-disabled`), border `#aaaaaa`
- [ ] Step tick `#dddddd`, 라벨 `#757575`
- [ ] Info 아이콘 `#555555` (`--icon-subtle`)

### 상태 동작

- [ ] Thumb 드래그로 값 변경 가능
- [ ] Hover 시 primary outline 표시
- [ ] Tooltip 이 hover + 드래그 + 키보드 포커스 시 Thumb 위에 표시
- [ ] Tooltip 이 Thumb 와 함께 이동(Track 중앙 고정이 아님)
- [ ] Input 에 숫자만 입력 가능(문자 필터링)
- [ ] Input blur 시 min/max clamp 로 값 확정
- [ ] Input ↔ Slider 양방향 동기화
- [ ] Range 모드 min Input ≤ max Input (clamp 보장)
- [ ] Disabled 시 모든 상호작용 차단, 회색 표시

### 다크 모드

- [ ] `.dark` 토글 시 모든 색상 전환(semantic 토큰 재매핑)
- [ ] Range/Thumb `var(--accent-500)` → `var(--accent-400)` (accent-500 → accent-400)
- [ ] Track `#dddddd` → `#555555`
- [ ] Label `#1c1c1c` → `#dddddd`
- [ ] Tooltip inverse 전환(검정 배경 → 흰 배경)
- [ ] 전환 시 깜빡임 없이 0.2s 로 부드럽게 보간

### 접근성

- [ ] Tab 으로 Thumb focus 이동
- [ ] ←/→ 키로 1 step 이동, Home/End 로 최소/최대
- [ ] Focus 시 2px primary outline 표시
- [ ] ARIA(`role="slider"`, `aria-valuenow/min/max`) 자동 설정
- [ ] Thumb `aria-label` 부여(단일: label, Range: "{label} 최솟값"/"{label} 최댓값")
- [ ] Help/Error를 Thumb의 `aria-describedby`로 연결하고, Error에 `role="alert"` 부여
- [ ] Input `aria-label` 부여(단일: "슬라이더 값", Range: "최솟값"/"최댓값")

### 의존성

- [ ] Input 컴포넌트를 공용 컴포넌트로 재사용(직접 구현하지 않음)
- [ ] Tooltip 컴포넌트를 공용 컴포넌트로 재사용(직접 구현하지 않음)
- [ ] Input/Tooltip 이 없으면 각 가이드라인 스펙으로 먼저 구현 후 조합
- [ ] Tooltip 이 Thumb 위에 위치하도록 `TooltipTrigger(asChild)` 로 Thumb 감쌈

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Slider을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 field geometry와 enabled, focused, invalid, read-only, disabled 시각 상태를 소유한다. 부모는 공개 controlled value와 validation 결과만 전달한다.
- **변형 금지**: read-only를 disabled로 치환하거나, 상태별 border/focus ring과 hit area를 기본 browser style로 되돌리지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

## 문구 없는 오류 상태

- [ ] `invalid=true`, `errorText` 생략 시 오류 테두리·ARIA를 유지하고 오류 문구와 빈 alert를 만들지 않는다.
- [ ] `invalid` 생략 시 기존 `errorText` 동작을 유지한다.


## 사용자 지정 표시 눈금

- [ ] `marks` 미지정 시 기존 step 기반 눈금과 짝수 인덱스 라벨을 유지한다.
- [ ] 사용자 지정 라벨·선의 위치가 실제 값에 대응하고 키보드는 원래 step만큼 이동한다.
- [ ] 표시 범위 밖 눈금은 제외하며 `showSteps=false`이면 큰 범위에서도 배열을 생성하지 않는다.
- [ ] 좁은 팝오버에서 숫자가 겹치지 않고 끝 눈금 의미가 설명에 포함된다.

## 보조 문구 배치

`helpTextPlacement`는 `below`(기본값) 또는 `label-end`를 받는다. `label-end`는 라벨 줄의 오른쪽에 기존 보조 문구를 표시한다. 라벨이 없으면 하단 표시를 유지하며 오류는 항상 하단에 표시한다. 배치와 관계없이 보조 문구는 하나만 렌더하고 thumb의 `aria-describedby` 연결을 유지한다. 페이지는 Slider 내부 태그를 선택하는 CSS 대신 이 옵션을 사용한다.
