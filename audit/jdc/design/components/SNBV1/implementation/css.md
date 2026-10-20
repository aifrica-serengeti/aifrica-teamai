# SNB v1 — CSS와 스타일 구현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v1 문서 인덱스](../README.md)

## 구현 내용

### 12.1 새 환경에서 반드시 적용할 SNB adapter CSS

이 블록은 별도 `SNB.css`에 그대로 넣는다. 공용 primitive의 class 이름이 다르면 이 문서에 적은
`data-slot` 역할로 매핑하되, 색상을 일반 Menu 토큰으로 되돌리지 않는다. `MenuContent`와
`MenuSubContent` 모두에 `className="snb-menu"`을 적용한다.

```css
/* ─── shell / header ─────────────────────────────────────────────── */
.snb,
.snb *,
.snb *::before,
.snb *::after { box-sizing: border-box; }

.snb {
  display: flex;
  width: 240px;
  min-width: 240px;
  height: 100%;
  min-height: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  padding: 0;
  overflow: hidden;
  border-right: 1px solid var(--snb-shell-border);
  background: var(--snb-bg);
  color: var(--snb-on-default);
  font-family: var(--font-sans);
  transition: width .24s ease, min-width .24s ease, padding .24s ease, gap .24s ease,
    background-color .2s ease, border-color .2s ease, color .2s ease;
}

.snb--collapsed {
  width: 60px;
  min-width: 60px;
  align-items: center;
  gap: 12px;
  padding: 28px 12px;
}

.snb-expanded-header {
  position: relative;
  width: 100%;
  height: 78px;
  flex: 0 0 78px;
  border-bottom: 1px solid transparent;
  transition: border-color .2s ease;
}
.snb-expanded-header[data-scrolled="true"] { border-bottom-color: var(--snb-divider); }
.snb-expanded-logo { position: absolute; top: 19.5px; left: 19.5px; width: 129px; height: 39px; }
.snb-expanded-logo__symbol { position: absolute; top: .32px; left: .16px; width: 38.361px; height: 38.361px; }
.snb-expanded-logo__wordmark { position: absolute; top: 7.21px; left: 48.99px; width: 79.524px; height: 18.246px; }
.snb-expanded-logo__subtitle { position: absolute; top: 25.89px; left: 50.26px; width: 66.139px; height: 11.312px; }

.snb-toggle {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid var(--snb-toggle-border);
  border-radius: 4px;
  background: transparent;
  color: var(--snb-toggle-icon);
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}
.snb-expanded-header > .snb-toggle { position: absolute; top: 25px; right: 9px; }
.snb-toggle > svg {
  width: 12px;
  height: 12px;
  color: var(--snb-toggle-icon);
  stroke: var(--snb-toggle-icon);
}
.snb-toggle:hover > svg,
.snb-toggle:active > svg { color: var(--snb-toggle-icon); stroke: var(--snb-toggle-icon); }
.snb-toggle:hover { background: var(--snb-fill-hovered); }
.snb-toggle:focus-visible { outline: 2px solid var(--snb-focus-border); outline-offset: 1px; }

/* ─── expanded scroll / sections ────────────────────────────────── */
.snb-scroll {
  width: 100%;
  min-height: 0;
  flex: 1 1 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}
/* 공용 ScrollArea가 주는 content padding(예: 16px)을 SNB에서 제거한다. */
.snb-scroll .scroll-content,
.snb-scroll [data-slot="scroll-area-content"] { padding: 0; }
.snb-scroll [role="scrollbar"],
.snb-collapsed-scroll [role="scrollbar"],
.snb-menu [role="scrollbar"] { background: var(--snb-scrollbar-thumb); }
.snb-scroll [role="scrollbar"]:hover,
.snb-collapsed-scroll [role="scrollbar"]:hover,
.snb-menu [role="scrollbar"]:hover { background: var(--snb-scrollbar-thumb-hover); }

.snb-nav { display: flex; width: 100%; flex-direction: column; padding-bottom: 20px; }
.snb-section { position: relative; display: flex; width: 100%; flex-direction: column; gap: 4px; }
.snb-section + .snb-section { margin-top: 32px; }
.snb-section-title { margin: 0; padding-left: 12px; color: var(--snb-section-title); font: var(--text-body3); }
.snb-section-items { display: flex; width: 100%; flex-direction: column; }

/* ─── expanded 1 / 2 / 3 depth ─────────────────────────────────── */
.snb-item-root { position: relative; display: flex; width: 100%; min-width: 0; align-items: center; }
.snb-item {
  display: flex;
  width: 100%;
  min-width: 0;
  height: 44px;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid transparent;
  background: transparent;
  color: var(--snb-on-default);
  cursor: pointer;
  font: var(--text-body2);
  text-align: left;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}
.snb-item[data-depth="1"] { gap: 4px; padding: 0 8px; font: var(--text-title2); }
.snb-item[data-depth="2"] { height: 40px; padding: 0 8px 0 36px; }
.snb-item[data-depth="3"] { height: 36px; padding: 0 8px 0 36px; border: 0; }
.snb-item[data-has-favorite="true"] { padding-right: 56px; }
.snb-item:hover:not(:disabled),
.snb-item[data-state="hovered"],
.snb-item[data-state="pressed"] { background: var(--snb-fill-hovered); color: var(--snb-on-active); }
.snb-item:active:not(:disabled) { background: var(--snb-fill-pressed); color: var(--snb-on-active); }
.snb-item[data-state="selected"] { background: var(--snb-fill-selected); color: var(--snb-3depth-on-selected); }
.snb-item.snb-item[data-state="selected"]:hover:not(:disabled),
.snb-item.snb-item[data-state="selected"]:active:not(:disabled) {
  background: var(--snb-fill-selected);
  color: var(--snb-3depth-on-selected);
}
.snb-item[data-depth="3"][data-state="selected"] { color: var(--snb-3depth-on-selected); font: var(--text-title2); }
.snb-item[data-state="selected"] .snb-label { color: var(--snb-3depth-on-selected); }
.snb-item:focus-visible:not([data-state="selected"]),
.snb-item[data-state="focused"]:not([data-state="selected"]) {
  background: var(--snb-focus-surface);
  border-color: var(--snb-focus-border);
  color: var(--snb-on-default);
  outline: 0;
}
.snb-item[data-state="selected"]:focus-visible { border-color: var(--snb-focus-border); outline: 0; }
.snb-item[data-depth="3"]:focus-visible { outline: 2px solid var(--snb-focus-border); outline-offset: -2px; }
.snb-item:disabled { cursor: not-allowed; opacity: .5; }
.snb-leading, .snb-trailing { display: inline-flex; width: 24px; height: 24px; flex: 0 0 auto; align-items: center; justify-content: center; }
.snb-leading > svg, .snb-trailing > svg { width: 16px; height: 16px; }
.snb-label { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.snb-tree { position: relative; display: inline-flex; width: 16px; height: 100%; flex: 0 0 auto; padding-right: 8px; }
.snb-tree::before { position: absolute; top: 0; bottom: 0; left: 4px; width: 1px; background: var(--snb-tree-border); content: ''; }
.snb-item:hover .snb-tree::before,
.snb-item[data-state="selected"] .snb-tree::before { background: var(--snb-favorite-border); }

.snb-favorite {
  position: absolute;
  right: 32px;
  z-index: 1;
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
  background: transparent;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, opacity .2s ease;
}
.snb-favorite[data-visible="true"], .snb-item-root:hover .snb-favorite { opacity: 1; pointer-events: auto; }
.snb-favorite { color: var(--snb-favorite-border); }
.snb-favorite[data-starred="true"] { color: var(--snb-favorite-active); }
.snb-favorite > svg { display: block; width: 16px; height: 16.272px; fill: var(--snb-favorite-inactive); stroke: currentColor; transition: fill .2s ease, stroke .2s ease; }
.snb-favorite[data-starred="true"] > svg { fill: var(--snb-favorite-active); }
.snb-favorite:hover { background: var(--snb-fill-hovered); }
.snb-favorite:focus-visible { outline: 2px solid var(--snb-focus-border); outline-offset: 1px; }

.snb-panel { display: grid; grid-template-rows: 0fr; overflow: hidden; transition: grid-template-rows .24s ease; }
.snb-panel[data-open="true"] { grid-template-rows: 1fr; }
.snb-panel__inner { display: flex; width: 100%; min-height: 0; flex-direction: column; overflow: hidden; opacity: 0; transform: translateY(-4px); background: var(--snb-surface); transition: background-color .2s ease, opacity .16s ease, transform .24s ease; }
.snb-panel[data-open="true"] > .snb-panel__inner { opacity: 1; transform: translateY(0); }
.snb-panel__inner--from-depth-1 { padding-top: 4px; }
/* 2→3 panel에는 top/bottom padding, gap, connector pseudo-element를 두지 않는다. */
.snb-panel__inner--favorites { background: transparent; }

/* 즐겨찾기 overflow pill은 다음 section과의 32px gap 안에 겹친다. */
.snb-favorites-toggle { position: absolute; bottom: -26px; left: 50%; display: inline-flex; width: 32px; height: 20px; align-items: center; justify-content: center; padding: 0; border: 0; border-radius: 999px; background: var(--snb-fill-hovered); color: var(--snb-on-active); transform: translateX(-50%); }
.snb-favorites-toggle:hover { background: var(--snb-fill-pressed); }
.snb-favorites-toggle:focus-visible { outline: 2px solid var(--snb-focus-border); outline-offset: 1px; }

/* ─── collapsed rail ─────────────────────────────────────────────── */
.snb-collapsed-header { display: flex; flex: 0 0 auto; flex-direction: column; align-items: center; gap: 12px; }
.snb-collapsed-logo { width: 32px; height: 32px; }
.snb-collapsed-header .snb-toggle { position: static; }
.snb-collapsed-header__separator { width: 32px; height: 1px; margin-top: 8px; background: var(--snb-divider); }
.snb-collapsed-scroll { width: 60px; min-width: 60px; min-height: 0; flex: 1 1 0; align-self: center; border: 0; border-radius: 0; background: transparent; }
.snb-collapsed-scroll .scroll-content,
.snb-collapsed-scroll [data-slot="scroll-area-content"] { padding: 0; }
.snb-collapsed-groups { display: flex; width: 32px; margin: 0 auto; flex-direction: column; align-items: center; gap: 12px; }
.snb-collapsed-group { display: flex; width: 32px; flex-direction: column; gap: 4px; }
.snb-collapsed-divider { width: 100%; height: 1px; margin: 8px 0; background: var(--snb-divider); }
.snb-collapsed-favorite { margin-top: 8px; }
.snb-collapsed-item {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--snb-on-default);
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}
.snb-collapsed-item > svg { width: 16px; height: 16px; color: currentColor; stroke: currentColor; }
.snb-collapsed-item:hover, .snb-collapsed-item[data-state="hovered"] { background: var(--snb-fill-hovered); color: var(--snb-on-active); }
.snb-collapsed-item:active, .snb-collapsed-item[data-state="pressed"] { background: var(--snb-fill-pressed); color: var(--snb-on-active); }
.snb-collapsed-item[data-state="selected"],
.snb-collapsed-item[data-state="selected"]:hover,
.snb-collapsed-item[data-state="selected"]:active { background: var(--snb-collapsed-selected); color: var(--snb-on-active); }
.snb-collapsed-item:focus-visible:not([data-state="selected"]),
.snb-collapsed-item[data-state="focused"]:not([data-state="selected"]) { background: var(--snb-focus-surface); border-color: var(--snb-focus-border); color: var(--snb-on-default); outline: 0; }
.snb-collapsed-item[data-state="selected"]:focus-visible { border-color: var(--snb-focus-border); outline: 0; }

/* ─── portal Menu: 반드시 MenuContent와 MenuSubContent 모두에 적용 ─ */
.snb-menu {
  --menu-surface: var(--snb-surface);
  --menu-item-hovered: var(--snb-fill-hovered);
  --menu-item-pressed: var(--snb-fill-pressed);
  --menu-item-selected: var(--snb-collapsed-selected);
  --text: var(--snb-on-default);
  --text-primary: var(--snb-on-active);
  --text-subtle: var(--snb-on-default);
  --text-subtler: var(--snb-on-default);
  --border-default: var(--snb-divider);
  --border-primary: var(--snb-focus-border);
  background: var(--snb-surface);
  border-color: var(--snb-divider);
  color: var(--snb-on-default);
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}
/* Menu layout/min-height/focus는 공용 Menu가 소유한다.
 * root MenuContent는 size="large"(min-height 36), MenuSubContent는 size="small"(min-height 28)다.
 * SNB는 아래처럼 palette와 active-path만 국소 오버라이드한다. */
.snb-menu [data-slot="dropdown-menu-label"] { color: var(--snb-on-default); }
.snb-menu [data-slot="dropdown-menu-item"],
.snb-menu [data-slot="dropdown-menu-sub-trigger"] { color: var(--snb-on-default); }
.snb-menu [data-slot="dropdown-menu-item"]:hover,
.snb-menu [data-slot="dropdown-menu-sub-trigger"]:hover { background: var(--snb-fill-hovered); color: var(--snb-on-active); }
.snb-menu [data-slot="dropdown-menu-item"][data-selected="true"] { background: var(--snb-collapsed-selected); color: var(--snb-on-active); }
.snb-menu [data-slot="dropdown-menu-sub-trigger"][data-snb-ancestor-selected="true"] { background: var(--snb-fill-hovered); color: var(--snb-on-active); }
.snb-menu [data-slot="dropdown-menu-item"][data-highlighted]:not(:hover),
.snb-menu [data-slot="dropdown-menu-sub-trigger"][data-highlighted]:not(:hover) { box-shadow: inset 0 0 0 2px var(--snb-focus-border); }
.snb-menu [data-slot="dropdown-menu-item"] svg,
.snb-menu [data-slot="dropdown-menu-sub-trigger"] svg { color: currentColor; stroke: currentColor; }
.snb-menu--favorites [data-slot="scroll-area"],
.snb-menu--favorites [data-slot="scroll-area"] > div { max-height: 212px; }
```

### 12.4 구현 실패를 즉시 잡는 computed-style gate

아래 검사는 실제 DOM에 CSS가 적용됐는지 판단한다. 첨부 화면처럼 shell이 흰색이거나 items가
수평으로 흩어지는 경우는 spacing 문제가 아니라 **이 gate 실패**다. 값이 하나라도 다르면
실제 서비스 데이터·상호작용 작업을 멈추고 className, CSS import, token CSS import를 고친다.

```ts
function assertSNBV1VisualContract(root: HTMLElement) {
  const shell = getComputedStyle(root)
  console.assert(root.matches('aside.snb'), 'SNB root must be <aside class="snb">')
  console.assert(shell.width === '240px', `expanded width: ${shell.width}`)
  console.assert(shell.minWidth === '240px', `expanded min-width: ${shell.minWidth}`)
  console.assert(shell.backgroundColor === 'rgb(30, 35, 46)', `shell background: ${shell.backgroundColor}`)
  console.assert(shell.borderRightColor === 'rgb(221, 221, 221)', `shell border: ${shell.borderRightColor}`)
  console.assert(shell.borderTopLeftRadius === '0px', 'SNB root must not be a rounded card')

  const item = root.querySelector<HTMLElement>('.snb-item[data-depth="1"]')!
  const itemStyle = getComputedStyle(item)
  console.assert(itemStyle.height === '44px', `1depth height: ${itemStyle.height}`)
  console.assert(itemStyle.color === 'rgb(114, 120, 133)', `1depth color: ${itemStyle.color}`)

  const leading = root.querySelector<HTMLElement>('.snb-leading')!
  const leadingStyle = getComputedStyle(leading)
  console.assert(leadingStyle.width === '24px' && leadingStyle.height === '24px', 'leading box must be 24×24')

  const toggle = root.querySelector<HTMLElement>('.snb-toggle')!
  console.assert(getComputedStyle(toggle).color === 'rgb(255, 255, 255)', 'toggle icon color must be white')

  const selected = root.querySelector<HTMLElement>('.snb-item[data-state="selected"]')!
  const selectedStyle = getComputedStyle(selected)
  console.assert(selectedStyle.backgroundColor === 'rgb(43, 50, 68)', 'selected item fill must be #2b3244')
  console.assert(selectedStyle.color === 'rgb(102, 163, 255)', 'selected text/icon color must be #66a3ff')
  const selectedGlyph = selected.querySelector<HTMLElement>('svg')!
  console.assert(getComputedStyle(selectedGlyph).color === 'rgb(102, 163, 255)', 'selected glyph must inherit #66a3ff')

  console.assert(
    ['width', 'min-width', 'padding', 'gap'].every((property) => shell.transitionProperty.includes(property)),
    `root mode transition is incomplete: ${shell.transitionProperty}`,
  )
}
```

Collapsed reference에서도 같은 검사를 수행하되 root width/min-width는 `60px`, `.snb-collapsed-item`
width/height는 `32px`, selected fill은 `rgb(0, 86, 214)`이어야 한다. Portal menu를 연 상태에서는
`.snb-menu` computed `backgroundColor`가 `rgb(36, 42, 54)`인지 확인한다. 또한 idle collapsed
item과 내부 `svg`의 computed `color`는 모두 `rgb(114, 120, 133)`, selected rail은 모두
`rgb(255, 255, 255)`여야 한다. 이 검사를 통과하지 못하면 color inheritance 또는 SNB adapter CSS가
누락된 것이므로 기능 구현을 진행하지 않는다.

모드 animation은 root가 실제로 유지되는지도 검사한다. 다음 검사는 component test 또는 browser
test에서 실행한다. `setCollapsed`는 같은 root의 class만 바꾸는 action이어야 한다.

```ts
async function assertSNBV1ModeMotion(root: HTMLElement, setCollapsed: (next: boolean) => void) {
  const beforeNode = root
  const beforeWidth = root.getBoundingClientRect().width
  setCollapsed(beforeWidth === 240)
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

  console.assert(root.isConnected && root === beforeNode, 'mode change must not replace the SNB root')
  console.assert(root.getAnimations().some((animation) => animation.effect?.target === root),
    'root width transition did not start')
}
```

