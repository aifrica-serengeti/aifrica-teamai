# AgentHubSNBItem — 기존 구현과 새 구현 연결

다음은 **제품 API·DOM/CSS 제안**입니다. Figma root API나 검증된 제품 export가 아닙니다.
기존 SNB의 목록·router link·disclosure·더보기 primitive를 먼저 찾고 호환되면 adapter로 연결합니다.
없으면 가까운 기능 범위에 새 export를 만들며 공용 Menu/Tree 엔진을 이름만 보고 가져오지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 적용합니다.

```ts
export type AgentHubSNBItemProps = {
  id: string;
  title: string;
  depth: 1 | 2;
  showLeadingIcon?: boolean;
  current?: boolean;
  target:
    | { kind: "link"; href: string }
    | { kind: "action"; onActivate: () => void }
    | { kind: "disclosure"; expanded: boolean; contentId: string; onExpandedChange: (value: boolean) => void };
  moreAction?: { label: string; onActivate: () => void };
};
```

root의 실제 TEXT/URL/expanded/callback은 없습니다. depth1/2는 Figma1depth/2depth에 명시적으로 대응하는 제안입니다.
current는 실제 route를 나타낼 때만 link의 aria-current에 연결하고 selected 색상이나 pressed에서 만들지 않습니다.
목록·권한·expanded·route·명령과 요청 수명은 Panel/제품이 소유합니다.

```text
비대화형 li/row
├─ main native link / action button / disclosure button
│  └─ 1depth 선택적 glyph16 + 실제 제목
├─ 2depth의 장식 connector
└─ 채택한 노출 정책의 투명 trailing slot20 + 형제 more button20
```

main과 more는 한 button/link 안에 중첩하지 않습니다. 각각 native 한 경로에서 대응 명령만 한 번 실행합니다.
이동은 유효한 href를 사용하고 새 탭/수정키 등 native link 동작을 임의의 root click으로 덮지 않습니다.
disclosure는 expanded/controls와 onExpandedChange(!expanded)를 연결하고 실제 자식 목록과 focus를 관리합니다.

```css
.hub-snb-item {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 6px 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
}
.hub-snb-item[data-depth="2"] { padding-left: 36px; }
.hub-snb-item[data-visual="hovered"] { background: #f8f8f8; }
.hub-snb-item[data-visual="pressed"], .hub-snb-item[data-visual="selected"] { background: #f4f4f4; }
.hub-snb-item-main { display: flex; align-items: center; gap: 8px; width: 100%; min-width: 0; padding: 0; border: 0; background: transparent; color: #1c1c1c; font: inherit; text-align: left; text-decoration: none; }
.hub-snb-item[data-has-more="true"] .hub-snb-item-main { padding-right: 20px; }
.hub-snb-item-leading { display: block; flex: 0 0 16px; width: 16px; height: 16px; }
.hub-snb-item-title { margin: 0; font: 400 14px/20px Pretendard, sans-serif; white-space: nowrap; }
.hub-snb-item-trailing { position: absolute; right: 2px; top: 50%; display: flex; align-items: center; width: 20px; height: 20px; padding: 0; background: transparent; box-sizing: border-box; transform: translateY(-50%); }
.hub-snb-item-more { display: grid; place-items: center; flex: 0 0 20px; width: 20px; height: 20px; padding: 0; border: 0; border-radius: 4px; background: transparent; transition: background-color 200ms ease; }
.hub-snb-item-more:hover:not(:disabled) { background: #eee; }
.hub-snb-item-more:active:not(:disabled) { background: #ddd; }
```

width256px는 비교 host에서 공급합니다. data-visual은 비교용 파생 상태이며 입력/current/selected가 겹칠 때의 우선순위는 제품이 채택합니다.
실제 토큰에는 state별 서로 다른 alias를 유지합니다. 위 투명20px slot과 main의 상시20px 예약은 후속 사용자 채택입니다.
원본36px gradient의 raw stop/생성 CSS와 Panel의 hovered source+selected fill·hidden more·남은 F8 gradient는 실측 비교 기록으로 보존합니다.
일반 프로젝트 runtime에 원본의 특수 pinned override를 자동 적용하지 않습니다.

2depth connector는 raw180도 변환을 포함해 연결합니다. CSS로 등가 표현한다면 row 왼쪽8/top0의20px slot 안에
1px #DDD 선을 가운데 놓는 adapter를 비교하고 이미 반영한 회전을 다시 더하지 않습니다. 이는 장식 primitive이며 Tree 구현이 아닙니다.
1depth glyph는 [정확한 자산](../../references/snb.assets.json)의 실제 folder/chat swap을 사용합니다.
more는 같은 기록의16px/#757575/선1을 연결하고 기존 ghost20 adapter를 재사용합니다.
1depth pressed의 FRAME은 native control로 구현할 수 있지만 Figma에서 IconButton source를 재사용했다고 기록하지 않습니다.

leading=false이면 glyph와 gap8을 함께 없애고 2depth에는 없는 glyph를 추가하지 않습니다.
more가 없는 branch에서는 예약 공간/제어/Tab target을 제거하되 Panel의 실제 hidden-more 예외와 혼동하지 않습니다.
hover 전용 동작은 focus-within·touch 등의 접근 가능한 정책을 제품 확장으로 검증합니다.
긴 제목은 [현재 채택](../../title-overflow.md)의 끝 흐림·hover/focus 이동을 조합합니다. 기존 ellipsis는 이 채택으로 대체하고 전체 이름·control 접근을 보존합니다.
제어는 hover·focus-within에서 노출하고 focus된 버튼을 숨기지 않습니다. 숨김 중 opacity만0으로 두어 Tab target을 잃지 않으며,
포인터 hit 여부와 키보드/touch의 실제 접근을 검증합니다. reduced-motion에서는 행·버튼·노출 전환을 즉시 반영합니다.

Panel의 content255/row256와 clip/overflow NONE은 스크롤 실행의 증거가 아닙니다.
목록 마지막 항목·긴 내용·resize·focus 가시성을 실제 native viewport와 함께 검증합니다.
[검증](./verification.md)과 실제 제품 render/input·검사를 마친 뒤 source/public export·asset/token adapter를 기록하며 unmapped/draft를 유지합니다.


## 긴 제목 helper 연결

기존 native main host 안의 제목 span만 재사용 helper(예: `OverflowText`)로 교체합니다. helper는 원문 span을 한 개만 갖고 closest native button/link의 상호작용에 연결합니다.
현재 `title`·선택·onActivate·more·triggerRef 등 공개 입력은 그대로입니다. 새 페이지 상태나 항목별 타이머를 소비처에 복제하지 않습니다.
모든 `.main span`에 ellipsis·overflow를 주는 selector를 제거하고 전용 제목 viewport class에만 flex/min-width0를 연결합니다.
more의 상시20px 예약·right2px·depth2 left36과 leading16/gap8은 유지합니다. [공유 수명·검증](../../title-overflow.md)을 확인합니다.
