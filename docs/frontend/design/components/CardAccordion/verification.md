# CardAccordion — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 빌드 검증

- [ ] `pnpm lint` 통과 (에러 0)
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과

### 파일 존재 확인 (4개 모두 필요)

- [ ] `accordion.tsx` — shadcn Accordion (`data-slot` 속성 포함: `accordion`, `accordion-item`, `accordion-trigger`, `accordion-content`). **`AccordionHeader` 에 `accordionHeader` 스타일 적용 필수** (`className="flex"` 사용 금지).
- [ ] `accordion.css.ts` — **`accordionHeader`** + Item/Trigger/Content 스타일 + keyframes (accordionDown, accordionUp)
- [ ] `CardAccordion.css.ts` — focus outline, title group, expand button, actions, panel placeholder, globalStyle (data-state/data-interactive 연동)
- [ ] `CardAccordion.tsx` — 메인 컴포넌트 (compound 패턴, Actions + Panel)

### 토큰 정의 확인 (Section 11 참조)

- [ ] `:root` 에 `--ca-*` 토큰 6개 정의 (header-bg, hover, pressed, surface, border, border-subtle)
- [ ] `:root` 에 semantic 토큰 정의 (`--text`, `--text-subtler`, `--text-disabled`, `--icon`, `--icon-subtler`, `--icon-disabled`, `--surface-subtle`, `--border-focused`)
- [ ] `:root` 에 typography 토큰 정의 (`--text-title1`, `--text-body3`, `--text-headline1`, `--font-sans`)
- [ ] `.dark` 에 `--ca-*` 다크 팔레트 정의 (`#282828` 등)
- [ ] `.dark` 에 semantic 다크 토큰 정의
- [ ] Pretendard 폰트가 실제 로드됨 (`@fontsource/pretendard` 또는 CDN)

### Header 래퍼 검증 (가장 흔한 오류 — 비정상적으로 커지는 원인)

- [ ] `AccordionTrigger` 컴포넌트 내부에 `AccordionPrimitive.Header` 래퍼가 존재함
- [ ] Header 래퍼에 `accordionHeader` 스타일(`display: flex`, `margin: 0`, `font: inherit`)이 적용됨 — **`className="flex"` (Tailwind)만으로는 부족함**
- [ ] Header 래퍼(`<h3>`)의 computed `margin` 이 `0px` (브라우저 기본 `0.83em`이 아님)
- [ ] Header 래퍼(`<h3>`)의 computed `font-size` 가 부모와 동일 (브라우저 기본 `1.17em`이 아님)
- [ ] Header 래퍼의 computed `display` 가 `flex` (Trigger 가 `flex: 1 1 0` 으로 전체 너비 차지)
- [ ] Header 래퍼의 높이가 56px (Trigger 높이와 동일 — 여백이 추가되지 않음)
- [ ] Actions가 Trigger의 형제로 렌더되고 `<button>` 안에 Button/IconButton이 중첩되지 않음
- [ ] Title meta가 제목 바로 옆에 렌더되고 Button·Link를 포함하지 않음

### 레이아웃 검증

- [ ] Header 높이 56px (고정)
- [ ] Header padding `12px 24px 12px 14px`
- [ ] Header `font: inherit` 적용됨 (기본 serif 폰트가 아님 — Pretendard 로 렌더)
- [ ] 카드 border `1px`, radius `8px`
- [ ] Expanded 시 Header 하단에 `1px` 구분선 (`--ca-border-subtle`)
- [ ] Collapsed 시 Header 하단 구분선 없음 (transparent)
- [ ] Panel padding `24px 24px 22px`
- [ ] Trigger border-radius: Collapsed `8px` / Expanded `8px 8px 0 0`
- [ ] Content border-radius: `0 0 8px 8px`
- [ ] Title 텍스트가 Pretendard SemiBold 16px (`--text-title1`)
- [ ] Expand icon(triangle_down)이 16px(size="m") 로 렌더
- [ ] Title 그룹 내 요소 간 gap 4px
- [ ] Title 그룹 ↔ Actions 간 gap 24px

### 색상 검증 — 라이트

- [ ] Header 배경(enabled): `#ffffff`
- [ ] Header 배경(hover): `#f8f8f8`
- [ ] Header 배경(pressed): `#f4f4f4`
- [ ] 카드 외곽 border: `#dddddd`
- [ ] Header 하단 구분선: `#eeeeee`
- [ ] Title 텍스트: `#1c1c1c`
- [ ] Optional 텍스트: `#757575`
- [ ] Expand icon: `#1c1c1c`

### 색상 검증 — 다크

- [ ] Header 배경(enabled): `#282828` (semantic `#1c1c1c`가 아님)
- [ ] Header 배경(hover): `#333333`
- [ ] Header 배경(pressed): `#2d2d2d`
- [ ] 카드 외곽 border: `#333333` (semantic `#555555`가 아님)
- [ ] Title 텍스트: `#dddddd`
- [ ] Focus outline: `var(--accent-400)` (accent-400)

### 애니메이션 검증

- [ ] 펼침 시 Panel 이 0.25s ease 로 부드럽게 펼쳐짐 (height 증가)
- [ ] 접힘 시 Panel 이 0.25s ease 로 부드럽게 접힘 (height 감소)
- [ ] Expand icon 이 0.2s ease 로 회전 (collapsed ▶ → expanded ▼)
- [ ] 다크/라이트 전환 시 색상이 0.2s ease 로 부드럽게 전환

### Focus 검증

- [ ] Tab 키로 Trigger 포커스 시 파랑 outline 표시
- [ ] Expanded + focus → outline 이 Header(56px)에만 표시 (패널 영역 제외)
- [ ] Collapsed + focus → outline 이 전체 카드를 감쌈
- [ ] Expanded focus outline 하단은 직각 (border-radius `10px 10px 0 0`)
- [ ] Collapsed focus outline 은 전체 둥글게 (border-radius `10px`)

### 상태 검증

- [ ] Header 클릭 시 Expanded/Collapsed 전환
- [ ] Enter/Space 키로 전환 (키보드 접근성)
- [ ] Disabled 시 hover/pressed 배경 무시, 텍스트 회색
- [ ] Actions 내 Button/IconButton 클릭이 Header 토글 상태를 변경하지 않음
- [ ] Trigger와 각 Actions가 독립적인 Tab stop과 accessible name을 가짐

### 의존 컴포넌트 검증

- [ ] Icon(`triangle_down`)이 회전 애니메이션으로 expand/collapse 표현
- [ ] Button(tertiary/primary)이 Actions 에 정상 렌더
- [ ] IconButton(ghost)이 Actions 에 정상 렌더
- [ ] info 아이콘이 `--icon-subtler` 색상으로 표시
