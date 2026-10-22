# AgentHubNavRail — 제품 배치와 상태 연결

다음은 **제품 API·DOM·CSS 제안**입니다. 실제 export나 Figma root props가 아닙니다.
현재 소비 저장소의 탐색 영역·router/link·설정 Button·사용자 표시·28px 자산을 먼저 확인해 호환되는 부분을 재사용합니다.
없으면 가장 가까운 제품 shell/UI 범위에 새 export를 개발하고 기존 CMP SNB 전체를 복사하지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 실제 host의 관련 계약을 적용합니다.

```ts
// 항목의 링크/action 구분은 NavItem 제안과 같은 의미를 사용합니다.
export type AgentHubNavRailProps = {
  label: string;
  items: readonly AgentHubNavItemProps[];
  settingsLabel: string;
  onSettings: () => void;
  account: { name: string; displayInitial: string };
};
```

`AgentHubNavItemProps`는 [NavItem 제안](../AgentHubNavItem/implementation.md) 또는 실제 제품의 동등한 타입을 연결합니다.
settings를 URL 이동으로 채택했다면 이 action callback 대신 실제 anchor/Link 입력으로 바꿉니다.
위 items/label/callback/account는 모두 제품 제안이며 root에는 실제 props나 native SLOT이 없습니다.
selected/current·panel·검색·설정의 결과·사용자 데이터·권한은 호출부가 공급하고 내부에서 별도 router·auth state를 만들지 않습니다.

```text
제품이 채택한 rail landmark68
├─ 탐색 항목 묶음52: gap8·NavItem 네 개의 비교 샘플
└─ 하단 묶음32: gap16
   ├─ 실제 설정 host32 + glyph20
   └─ 정적 사용자 표시28 + 이름 대체 문자열
```

NavItem은 한 anchor/button을 반환하고 rail wrapper나 glyph에 동일 handler를 더하지 않습니다.
설정 native button은 type=button·접근성 이름·한 click 경로를 사용합니다.
원본 실제 source인 [AgentHubIconButton](../AgentHubIconButton/README.md)의 ghost/default/32 adapter를 우선 연결하되,
원본 settings source의 표시20px·paint를 manifest에 맞춥니다. 이름24를 따라 크기를 바꾸지 않습니다.
avatar는 공용 Avatar 원본 재사용이라고 기록하지 않고28px 원형 FRAME의 제품 표시 adapter로 연결합니다.

```css
.hub-nav-rail {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 68px;
  width: 68px;
  height: 100%;
  min-height: 0;
  padding: 18px 8px 16px;
  gap: 32px;
  border: 0;
  border-radius: 0;
  background: #f6f7f9;
  box-shadow: none;
}
.hub-nav-rail-items {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.hub-nav-rail-footer { display: flex; flex-direction: column; align-items: center; flex: 0 0 auto; gap: 16px; }
.hub-nav-rail-account {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 9999px;
  background: #3235ec;
  color: #fff;
  font: 600 10.5px/14px Pretendard, sans-serif;
  text-align: center;
}
```

원본 이름 TEXT는 ABSOLUTE28×28·가로/세로 CENTER입니다. 위 flex 중앙 배치는 같은 정적 표시를 위한 제품 recipe이며 원본 노드 종류를 바꾸어 기록하지 않습니다.
사용자의 이름을 읽을 수 있게 제공하고 겹치는 시각 initial은 중복 낭독되지 않도록 연결합니다.
계정 메뉴를 제공할지 여부는 별도 제품 결정이며 정적 원을 버튼으로 자동 바꾸지 않습니다.

실측 비교 host만 높이1037px로 둡니다. 실제 제품은 부모가 높이를 공급하며 저장 gap32를 상/하단 사이의 실제695px 간격으로 고정하지 않습니다.
작은 높이에서 내용이 넘치면 상단 영역의 실제 scroll owner·하단 reserve를 제품이 조정해 검증합니다.
그 adapter는 원본에 없는 제품 배치 결정이며 overflow:hidden만으로 action을 지우지 않습니다.
원본은 하나의 rail이며 collapsed/mobile·접힘/너비 애니메이션·전체 shell 간격은 제공하지 않았습니다.

full SNB의 panel 조합은 [상위 제품 recipe](../AgentHubSNB/implementation.md)를 따르며 보드의40px 전시 간격·radius100을 가져오지 않습니다.
실제 route/action·이름·keyboard·focus·권한·추가 상태·좁은 높이와 시각을 검증한 뒤 source/public export를 로컬에 기록하고 unmapped/draft를 유지합니다.
