# SNBV1 — 스타일과 제품 token 연결

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[문서 인덱스](./README.md) · [정의·치수](./definition.md) · [상태 matrix](./behavior.md)

색·폰트·브랜드는 선택 제품의 light/dark token을 연결한다. 기존 source 예제의 특정 palette를 기본값으로 복사하지 않는다. `--surface-shell`, `--surface-primary-subtle`, `--text`, `--text-subtler`, `--text-disabled`, `--border-default`, `--solution-primary`는 공통 의미 계약이다. 다음 역할은 shell adapter에서 명시적으로 매핑한다. 서로 다른 상태를 같은 값으로 뭉개지 않는다.

- `--cmp-nav-surface`: navigation root 배경 (portal panel과 구분)
- `--cmp-nav-text`: 기본 label·icon
- `--cmp-nav-hover`: hover 배경
- `--cmp-nav-pressed`: pressed 배경
- `--cmp-nav-selected`: selected 배경
- `--cmp-nav-selected-hover`: selected hover 배경
- `--cmp-nav-selected-pressed`: selected pressed 배경
- `--cmp-nav-selected-text`: 선택된 label·icon
- `--cmp-nav-border`: navigation 경계
- `--cmp-nav-subtle`: 보조 surface
- `--cmp-nav-disabled`: 비활성 상태
- `--cmp-nav-favorite`: 즐겨찾기 표시
- `--cmp-on-nav`: navigation의 대비 텍스트
- `--cmp-account-avatar`: 계정 Avatar fill

## 구현 시 지킬 경계

- 값이 제품에서 연결되기 전에는 테마 채택 완료로 보고하지 않는다. style 문서는 실행 CSS가 아니므로 실제 styling 도구로 구현하고 검증한다.
- 아이콘은 공용 Icon/IconButton을 사용하고 parent의 상태 색을 명시적으로 상속한다. 기존 primitive의 default 색이 selected/hover를 덮지 않는지 확인한다.
- Menu/MenuSub가 body로 portal되면 root의 CSS 변수 상속만으로 충분하지 않다. 해당 content에 같은 token scope·class를 전달한다.
- branch-open, active leaf, active-descendant와 disabled의 selector 우선순위를 behavior matrix대로 유지한다. selected hover/pressed를 일반 hover 뒤에 둔다.
- ScrollArea의 가용 높이·내부 padding·thumb 위치·scroll owner를 확인한다. 중첩 overflow로 두 scroll 영역을 만들지 않는다.
- Header/SNB는 하나의 부모 collapsed state를 공유한다. radius·clip·top offset은 application container 한 곳만 소유한다.
- 폰트는 제품에서 실제 로드한 `--font-sans`를 사용한다. 긴 번역·200% zoom에서 overflow와 focus 가림을 확인한다.
- transition은 필요한 속성에만 적용하고 reduced-motion을 존중한다. focus outline은 제거하지 않는다.

[구현 인덱스](./implementation/README.md)의 TypeScript·CSS 참조를 함께 읽는다. 예제의 상대 import·primitive는
제품의 실제 public mapping으로 연결하고 유지보수는 source/export와 대조한다. 문서 전용 구현은
현재 제품 source를 열람하지 않고 정의·행동·접근성·leaf 계약과 아래 구현 gate로 검증한다.

## 11. SNB 토큰 adapter

제품은 다음 역할의 실제 light/dark 값을 먼저 제공한다. `--cmp-nav-panel`은 child panel·portal 배경,
`--cmp-nav-collapsed-selected`는 collapsed rail·popup의 선택 배경이며 expanded selected와 구분한다.
`--cmp-nav-focus-surface`, shell border, toggle border, tree border, section text, scrollbar thumb도
아래의 별도 역할로 연결한다. 서로 다른 역할에 같은 실제 값을 선택할 수 있지만 역할 자체를 합치지 않는다.

```css
.snb-theme {
  --text-title2: 600 14px/20px var(--font-sans);
  --text-body2: 400 14px/20px var(--font-sans);
  --text-body3: 400 12px/16px var(--font-sans);
  --snb-bg: var(--cmp-nav-surface);
  --snb-shell-border: var(--cmp-nav-shell-border);
  --snb-surface: var(--cmp-nav-panel);
  --snb-fill-hovered: var(--cmp-nav-hover);
  --snb-fill-pressed: var(--cmp-nav-pressed);
  --snb-fill-selected: var(--cmp-nav-selected);
  --snb-focus-surface: var(--cmp-nav-focus-surface);
  --snb-on-default: var(--cmp-nav-text);
  --snb-on-active: var(--cmp-on-nav);
  --snb-3depth-on-selected: var(--cmp-nav-selected-text);
  --snb-focus-border: var(--solution-primary);
  --snb-toggle-border: var(--cmp-nav-toggle-border);
  --snb-toggle-icon: var(--cmp-on-nav);
  --snb-favorite-inactive: var(--cmp-nav-subtle);
  --snb-favorite-border: var(--cmp-nav-disabled);
  --snb-favorite-active: var(--cmp-nav-favorite);
  --snb-collapsed-selected: var(--cmp-nav-collapsed-selected);
  --snb-tree-border: var(--cmp-nav-tree-border);
  --snb-divider: var(--cmp-nav-border);
  --snb-section-title: var(--cmp-nav-section-text);
  --snb-scrollbar-thumb: var(--cmp-nav-scrollbar-thumb);
  --snb-scrollbar-thumb-hover: var(--cmp-nav-scrollbar-thumb-hover);
}
```

`.snb-theme`을 root와 body portal content 양쪽에 연결한다. root 조상에만 scope를 두면 portal은
상속하지 못한다. 다크 모드에서 무엇을 바꾸고 유지할지도 제품 theme이 명시하며 고객의 과거 palette를
자동 채택하지 않는다. [adapter CSS](./implementation/css.md)와 [computed-style gate](./implementation/css.md#124-구현-실패를-즉시-잡는-computed-style-gate)를
함께 적용한다. 채택한 token이 누락되면 검사를 실패시키며 기본 검정·흰색으로 대체하지 않는다.
