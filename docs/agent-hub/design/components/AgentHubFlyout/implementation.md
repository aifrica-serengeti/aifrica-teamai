# AgentHubFlyout 신규 개발과 연결

이 안내는 제품 구현을 위한 제안이며 실제 source/export가 있다는 뜻이 아닙니다.
기존 popup·파일 목록·disclosure·ScrollArea를 먼저 찾고 호환 구현이 있으면 adapter로 연결합니다.
없으면 가까운 Agent Hub 기능 범위에 새 export를 개발하세요.

## 조립 책임

[Header](../AgentHubFlyoutHeader/implementation.md)·[Footer](../AgentHubFlyoutFooter/implementation.md)·
[Item](../AgentHubFlyoutItem/implementation.md)을 연결합니다. 내부를 MenuItem14px나 Picker row32/36으로 대체하지 않습니다.
[모션](./motion.md)은 기존 Menu 규칙을 재사용하지만 Menu의 전체 content class·role·첫 focus·min140·max296를 붙이지 않습니다.

```ts
type FlyoutEntry = {
  id: string;
  label: string;
  disabled?: boolean;
  children?: readonly FlyoutEntry[];
  countText?: string;
  metaText?: string;
};

type AgentHubFlyoutProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: readonly FlyoutEntry[];
  selectedId?: string;
  onSelect: (id: string) => void;
  footerVisible?: boolean;
  disclosure?: {
    expandedIds: readonly string[];
    onExpandedChange: (ids: string[]) => void;
  };
};
```

이는 제안 API입니다. 실제 Figma 전체 root props를 읽은 API가 아닙니다.
평면 목록은 `children`과 `disclosure` 없이 그대로 사용합니다. 폴더 데이터가 있으면 `disclosure`를 함께 제공하는 것이 소비 API 계약입니다.
`children`이 존재하면 빈 배열도 폴더이며 부모가 expandedIds를 소유합니다. 누락된 disclosure를 내부 state로 대신 만들지 않고
폴더 조작을 비활성화하여 파일 선택으로 잘못 실행하지 않습니다. `disabled`도 펼침과 선택을 모두 차단합니다.
폴더 클릭은 `onExpandedChange`만, 파일 클릭은 `onSelect`만 한 번 실행합니다. countText/metaText는 표시 정보이며 요청을 소유하지 않습니다.
header title/count/meta·footer 문구·아이콘·권한·로딩/오류는 실제 제품 adapter로 전달합니다.

## 실제 viewport와 배치

위치·포털 wrapper가 좌표 transform을 소유하면 모션은 내부 surface에 적용합니다.
surface는 header/body/footer로 나누고 footer가 마지막 행을 덮지 않도록 합니다.

```text
실제 popup positioning + Presence owner
└─ motion surface (data-state / 실제 data-side / origin)
   ├─ FlyoutHeader(withDivider=true, 고정 구분 영역9px 포함)
   ├─ 기존 ScrollArea + AgentHubScrollbar adapter (flat 또는 optional disclosure Item renderer)
   └─ 표시할 때 FlyoutFooter (pb8·white의 조립 variant)
```

```css
.agent-hub-flyout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 4px 0 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(9, 30, 66, .31),
              0 4px 6px 0 rgba(9, 30, 66, .15);
  overflow: clip;
}
.agent-hub-flyout__header,
.agent-hub-flyout__footer { flex: 0 0 auto; }
.agent-hub-flyout__scroll-area { flex: 1 1 0%; min-height: 0; }
.agent-hub-flyout__footer { margin-bottom: -1px; }
```

제품이 실제 가용 viewport에 맞춘 폭·최대 높이를 설정합니다. 원본 비교값은280×398/max398입니다.
CSS 예시는 원본의 마지막11px 겹침을 안전한 흐름으로 보정한 제안이며 별도 시각·끝 항목 접근 검증이 필요합니다.
footer 조립 variant의pb8/white를 별도로 연결하고 standalonepb4/transparent를 덮어쓴 근거를 기록합니다.
body에 divider를 추가하지 않습니다. [Header adapter](../AgentHubFlyoutHeader/implementation.md)의
`withDivider:true`가 내용54px 뒤9px 구분 영역을 소유하여 스크롤 위치와 독립적으로 선을 고정합니다.
280×398 한 줄 기준으로 Header y5/총63 → body viewport y68..365/297 → Footer y365..398/33을 대조합니다.
위 pb0와 Footer bottom−1 adapter는 기존 CSS border1을 유지하면서 원본의 하단 위치를 보존합니다.
긴 Header/Footer는 HUG로 늘리고 body만 줄입니다. 기본 내용54/33px에 긴 문구를 잘라 맞추지 않습니다.

실제 overflow·thumb geometry·drag·resize·cleanup은 기존 ScrollArea가 한 번만 소유합니다.
body에는 [AgentHubScrollbar](../AgentHubScrollbar/implementation.md)의4px thumb·11px gutter를 명시적으로 채택하고,
content padding을0으로 연결해 기본16px와 행 padding이 중복되지 않게 합니다.
원본 source2019:3708과 다른 runtime 채택이라는 근거를 남기며 정적 refs의 source를 바꾸지 않습니다.
방향키는 focus({preventScroll:true}) 뒤 공개 ensureVisible(element) handle로 현재 행을 노출합니다.
부모가 private viewport DOM을 탐색하거나 native overflow·thumb를 각 Flyout에서 다시 만들지 않습니다.

## 상태·모션·검증

평면 조립은 이름이 있는 목록과 native 파일 action입니다. 폴더 조립은 같은 목록 안의 native disclosure 버튼과 중첩 `ul`을 사용합니다.
file 선택·popup open·expanded를 각각 한 부모 owner에 연결하고 native click/key 실행을 중복시키지 않습니다.
폴더 버튼에는 `aria-expanded`·`aria-controls`를 연결하되 `role=tree`나 Tree 키보드를 자동 부여하지 않습니다.
자식 목록은 Session/SNB와 같은 공유 AnimatedDisclosure helper로 높이250ms ease를 전환합니다.
닫을 때 자식 안의 focus를 폴더 버튼으로 옮기고 즉시 inert/aria-hidden 처리한 뒤 종료 시 제거합니다.
원본 down glyph 한 개만 open0°↔closed−90°로200ms ease 회전하며 hit area와 focus ring은 고정합니다.
재토글·닫는 중 재열기·unmount·reduce 변경에서 이전 완료 callback을 취소합니다. 공용을 쓰지 않는 제품은 같은 접근성 계약을 자체 helper에 연결합니다.
현재5숨김을 자동 노출하거나 16슬롯을 전역 제한으로 고정하지 않습니다.
[정확한 glyph](../../references/flyout.assets.json)를 제품 자산 경로에 연결하고 runtime에 임시 Figma URL을 두지 않습니다.

[motion.md](./motion.md)의 open/closed·side·Presence·pointer guard·reduce fallback을 함께 연결합니다.
동일 Menu 모션을 사용해도 Dialog scale이나 side/transform-origin이 없는 단일 animation으로 대체하지 않습니다.
기존 Menu/전역에는 reduce override가 없으므로 Flyout의 명시적 fallback을 포함합니다.
이는 정적 Figma 애니메이션 실측이나 actual 제품 동작 검증을 의미하지 않습니다.

[검증 항목](./verification.md)대로 제품의 source/export·지원 상태·실행 결과를 로컬 mapping에 기록합니다.
공유 patch는draft, 확인 전 source/export는unmapped를 유지합니다.
