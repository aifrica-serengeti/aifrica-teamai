# Button — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](./README.md)

## 12. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

### 빌드/구조

- [ ] `type="button"` 이 기본값(폼 제출 방지)
- [ ] `asChild` 시 `type` 이 전달되지 않음(Slot 합성 시 의미 없음)

### 색상 (라이트)

- [ ] Primary enabled fill 이 `var(--accent-600)` (accent-600, **`var(--accent-500)` 아님**)
- [ ] Primary hover 가 `var(--accent-700)`, pressed 가 `var(--accent-800)` 로 진해짐
- [ ] Primary disabled fill 이 흐린 파랑 `var(--accent-200)`
- [ ] Secondary 가 흰 배경 + `var(--accent-500)` 외곽선 + 파랑 텍스트
- [ ] Secondary hover fill 이 파스텔 파랑 `var(--accent-50)`
- [ ] Secondary disabled 외곽선 색이 `var(--accent-200)` 로 전환(파랑 유지)
- [ ] Tertiary 외곽선이 `#dddddd` (neutral), 텍스트가 `#1c1c1c`
- [ ] Tertiary hover fill 이 살짝 회색 `#f8f8f8`
- [ ] Tertiary disabled 텍스트만 `#aaaaaa` 로 회색 (fill 은 흰색 유지)
- [ ] Negative enabled 가 `#d00a0a` 진한 빨강

### 색상 (다크)

- [ ] Primary enabled fill 이 `var(--accent-400)` (더 밝은 accent, 라이트와 역방향)
- [ ] Tertiary fill 이 **반투명 흰색** `rgba(255,255,255,0.08)` (gray 아님)
- [ ] Secondary 다크 hover fill 이 선택한 accent 음영 `var(--accent-800)` (파스텔 아님)
- [ ] Tertiary 다크 외곽선/텍스트가 각각 `#555555` / `#dddddd`

### Focus (핵심)

- [ ] Focus outline 이 **1px** 두께 (2px 아님)
- [ ] Focus outline gap 이 **1px** (outline-offset)
- [ ] 버튼보다 outline 이 위아래 각 2px 더 큼 (총 4px 확장)
- [ ] Focus 색상이 라이트/다크 모두 `var(--accent-500)` (전환 없음)
- [ ] Radio/Checkbox focus 와 동일한 1px + 1px 패턴

### 레이아웃

- [ ] border-radius 가 4px (6px 아님)
- [ ] 4 사이즈 height 가 정확 (24/28/32/40px)
- [ ] Tiny padding-x 가 8px, Small 도 8px, Medium/Large 는 16px
- [ ] font-weight 가 항상 600 (SemiBold)
- [ ] 아이콘 크기가 size 별로 자동 스케일 (tiny 14 / small 16 / medium 18 / large 20px)
- [ ] 아이콘이 Icon 컴포넌트로 위임됨 (lucide 직접 import 아님)
- [ ] 아이콘 stroke-width 가 Figma 스펙(1.25~1.5px) — lucide 기본(2px)보다 얇음
- [ ] 아이콘 색상이 **버튼 텍스트 색상과 동일** (Primary=흰, Secondary=파랑, Negative=흰)
- [ ] disabled 시 아이콘 색상이 텍스트와 함께 disabled 토큰으로 자동 전환 (inherit)

### 동작

- [ ] Hover/Pressed/disabled 색상 전환이 0.2s ease 로 부드럽게
- [ ] Disabled 시 커서가 `not-allowed`, 호버/프레스 효과 없음
- [ ] `transition: all` 을 쓰지 않음 (색상 속성만)
- [ ] Full-width 적용 시 부모 폭을 채움

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 Button을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

## 다크 모드 Secondary 배경

- 기본·비활성 상태는 투명 배경으로 부모 surface를 유지하며 흰색 면이 나타나지 않는다.
- hover/pressed의 파란 음영과 파란 텍스트·테두리는 유지한다.

## asChild 회귀 검증

- [ ] native button, asChild button, asChild anchor가 label만/leading/trailing/both icon에서 단일 host를 렌더한다.
- [ ] asChild button disabled가 실제 DOM disabled이며 child/Button 활성화 callback을 호출하지 않는다.
- [ ] asChild anchor disabled는 href 없음·aria-disabled=true·tabIndex=-1이며 click·keyboard로 이동/활성화하지 않는다.
- [ ] enabled 상태에서 child/Button callback은 Slot 계약대로 실행되고 icon과 label 순서가 유지된다.
- [ ] 실제 CSS의 disabled visual과 hover/pressed 억제가 native/asChild에서 일치하는지 브라우저로 검증한다.
