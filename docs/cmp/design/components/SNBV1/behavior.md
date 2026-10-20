# SNB v1 — 상태와 동작

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← SNB v1 문서 인덱스](README.md)

## 7. 상태와 동작

1. child가 있는 1depth/2depth button 클릭은 **openIds만** 추가/제거한다. branch를 여는 행위는
   `activeId`를 바꾸지 않으며, 열린 branch는 선택 배경을 받지 않는다. child가 없는 1/2/3depth
   leaf 클릭만 해당 id를 `activeId`로 만든다.
2. visible active leaf만 `aria-current="page"`를 가진다. active 3depth가 보이는 동안 그 2depth와
   1depth ancestor는 일반 Enabled surface다. 3depth를 감추도록 2depth를 닫으면 **그 2depth만**
   selected surface를 받고 `aria-current`는 없다. 그 뒤 1depth까지 닫으면 1depth가 selected surface를
   받는다. 즉 항상 실제 active leaf 또는 그것을 감춘 가장 가까운 접힌 ancestor 하나만 selected다.
   Collapsed rail/popup은 모든 descendant가 보이지 않으므로 active path의 1depth rail 및 2depth popup
   ancestor surface를 유지한다.
3. 1depth 또는 2depth의 child panel은 닫혔을 때 `aria-hidden`, `inert`로 접근 불가다.
4. favorite은 **leaf에만** 표시한다. expandable item에는 favorite button을 렌더하지 않는다.
   favorite control은 `aria-pressed`로 상태를 전달한다.
5. Expanded favorites가 4개 이상이면 3개 뒤에 pill을 보이고, pill 클릭으로 나머지를 accordion
   형태로 열고 닫는다. 열린 pill은 `chevrons_up`, 닫힌 pill은 `more_horizontal` icon을 사용한다.
6. Collapsed leaf icon은 오른쪽 Tooltip으로 label을 보인다. child가 있는 icon은 label을 header로
   하는 Menu를 오른쪽 8px offset에 표시하며, 3depth는 `MenuSub`로 중첩한다.
7. trigger와 portal menu를 이동하는 동안 flicker가 없도록 Menu는 `modal={false}`로 열고,
   pointer leave 뒤 **250ms** 후 닫는다. trigger/menu pointer enter는 닫기 타이머를 취소한다.
8. Collapsed favorites star는 icon rail 최상단에 두며, popup item에는 leading icon을 표시하지 않는다.

다음 순서를 그대로 사용해 expanded row의 selected state를 계산한다. `itemContainsId`는 모든 하위
depth를 재귀 탐색한다. parent 자체를 active로 저장하거나, `expanded === true`를 selected로 변환하면
안 된다.

```tsx
function renderExpandedItem(item: SNBItemData, depth: 1 | 2 | 3) {
  const hasChildren = Boolean(item.children?.length)
  const expanded = hasChildren && openIds.includes(item.id)
  const currentLeaf = !hasChildren && activeId === item.id
  const hasHiddenActiveDescendant =
    hasChildren && !expanded && item.children!.some((child) => itemContainsId(child, activeId))

  return <SNBItem
    depth={depth}
    expandable={hasChildren}
    expanded={expanded}
    selected={currentLeaf || hasHiddenActiveDescendant}
    current={currentLeaf}
    onSelect={() => hasChildren ? toggleOpen(item.id) : setActiveId(item.id)}
  />
}
```

## 9. 애니메이션

| 대상 | transition |
| --- | --- |
| Shell width/min-width/padding/gap | `0.24s ease` |
| Accordion wrapper | `grid-template-rows 0.24s ease`, `0fr → 1fr` |
| Accordion inner content | opacity `0.16s ease`, translateY `-4px → 0` over `0.24s ease` |
| Chevron | transform `0.2s ease`, open이면 180° 회전 |
| 색상 요소 | `background-color`, `border-color`, `color`, `outline-color` 각각 `0.2s ease` |
| Header divider | `border-color 0.2s ease` |
| Favorite control | color/background/border `0.2s ease`, opacity `0.2s ease` |

### Mode transition의 필수 DOM 규칙

폭 animation은 CSS 값만 같다고 재현되지 않는다. `collapsed`가 바뀔 때 아래 조건을 모두 만족해야 한다.

```tsx
// 올바름: root는 같은 aside node이며 class만 바뀐다.
<aside
  className={cn('snb', collapsed && 'snb--collapsed')}
  aria-label="Side navigation"
>
  {collapsed ? <CollapsedContents /> : <ExpandedContents />}
</aside>

// 금지: React key가 달라 root가 새로 mount되어 transition이 시작될 DOM이 없다.
<aside key={collapsed ? 'collapsed' : 'expanded'} className="snb">...</aside>
```

- root에 `display:none`, `visibility:hidden`, `transform:scale`, route transition을 사용해 폭 motion을
  대체하지 않는다.
- class 변경 직전/직후 root width는 `240px → 60px` 또는 `60px → 240px`이고,
  computed `transition-property`에는 `width`, `min-width`, `padding`, `gap`이 모두 있어야 한다.
- Expanded/Collapsed contents를 조건부로 바꾸더라도, root `aside`의 DOM identity와 class transition은
  유지한다. mode를 별도 component/page로 렌더하거나 root를 unmount하지 않는다.
- child accordion도 `data-open`만 `false ↔ true`로 바꾼다. content를 조건부 mount하여 height를
  순간 전환하지 않는다. 닫힌 panel은 `grid-template-rows:0fr`, 열린 panel은 `1fr`이다.

전역 `transition: all`은 사용하지 않는다. `prefers-reduced-motion: reduce`에서는 transition을
즉시 전환으로 무력화한다.

