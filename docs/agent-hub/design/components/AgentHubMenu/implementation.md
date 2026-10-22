# AgentHubMenu 구현 연결

이 파일은 기존 구현 비교와 신규 개발을 위한 안내입니다. 예시 API·CSS가 실제 소비 제품 export라는 뜻은 아닙니다.

## 기존 Menu부터 비교하기

공용 채택 시 `DOCS_ROOT/frontend/design/components/Menu/`의 구조·행동·접근성을 읽고
현재 제품의 Menu root/trigger/content/item/submenu·Group/Label/Separator·scroll primitive를 조사합니다.
호환되면 기존 primitive를 유지하고 Agent Hub의 content/item 스타일 adapter로 확장합니다.
지원할 수 없는 항목만 가까운 솔루션 범위에 새 export를 개발하고 source·public export를 로컬 mapping에 기록합니다.

공용 예제의 기본 large·scrollable=true/max296·radius4·우측16px를 이 확장 기본값으로 복사하지 않습니다.
공용 타입에 없는 danger/readOnly/size 이름을 임의 전달하지 말고 실제 API를 확인하세요.
state 그림과 명령 실행·현재 선택 값의 owner는 분리합니다.

## 조립 API와 DOM 경계

다음은 제품 제안 API의 시작점입니다. Figma root에는 scroll bar Boolean만 있습니다.

```ts
type AgentHubMenuEntry = {
  id: string;
  label: string;
  intent?: 'default' | 'destructive';
  disabled?: boolean;
  sectionLabel?: string;
  dividerAfter?: boolean;
  onSelect: () => void;
};

type AgentHubMenuContentProps = {
  entries: AgentHubMenuEntry[];
  scrollable?: boolean;
};
```

label·명령·권한·하위 메뉴·로딩/오류는 실제 제품 데이터로 연결합니다.
value 표시·icon/check·submenu 제안 API는 [MenuItem 구현 안내](../AgentHubMenuItem/implementation.md)와 함께 설계합니다.
`scrollable`은 제품의 실제 viewport 설정이며 원본의 scrollbar 그림 표시와 같은 구현이라고 가정하지 않습니다.

한 item의 Figma 세로 wrapper를 하나의 interactive menuitem으로 복사하지 않습니다.
sectionLabel은 실제 Group/Label, content는 Item 또는 SubTrigger, dividerAfter는 Separator로 나누어 조립합니다.
그룹 경계는 데이터 adapter에서 명시하고 그룹마다 실제 이름을 연결합니다.

```text
Menu Root + Trigger
└─ Portal + Content (Agent Hub panel 표현)
   └─ 실제 scroll viewport 또는 크기에 맞는 일반 흐름
      └─ Group
         ├─ 필요할 때 Label
         ├─ Item 또는 SubTrigger (content 표현)
         └─ 필요할 때 Separator
```

이 트리는 책임을 설명하며 메뉴 primitive를 직접 대체하는 제품 코드가 아닙니다.
header와 divider는 row 명령의 onSelect·tabindex·accessible name에 끼워 넣지 않습니다.
각 명령은 primitive의 onSelect 한 경로에서 호출하고 별도 keydown/click과 중복하지 않습니다.
실제 submenu가 있으면 primitive의 SubTrigger/SubContent를 사용하고 장식 chevron에 별도 handler를 달지 않습니다.

## Content 스타일 adapter

다음 literal은 실측 비교용입니다. 제품의 component/semantic token으로 연결하고
검증된 primitive가 소유하는 위치·portal·keyboard·focus·collision 기능을 유지합니다.

```css
.agent-hub-menu-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 4px 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(9, 30, 66, .31),
              0 4px 6px 0 rgba(9, 30, 66, .15);
  overflow: hidden;
}
```

폭160·높이318은 원본 샘플입니다. 실제 폭은 label과 slot·가용 viewport에 맞추고 높이는 내용에 맞춰 연결합니다.
넘치는 메뉴는 내부 viewport를 실제로 스크롤할 수 있게 하며, overflow:hidden만 적용해 끝 항목을 잘라내지 않습니다.
CSS에 고정 max296나11행 제한을 추가하지 않습니다. 필요하면 제품 최대 높이와 collision 정책을 명시하고 검증하세요.

행 표현은 [MenuItem 스타일과 구현](../AgentHubMenuItem/implementation.md)을 연결합니다.
hover/pressed는 content에만 적용하고 실제 disabled·keyboard focus는 primitive 상태를 기준으로 표시합니다.
공용 inset2 focus token을 연결해 radius12/clipping 안에서도 보이게 합니다.
원본에는 별도 focused/selected/dark palette가 없으므로 접근성 계약을 생략하거나 이 시안에서 측정한 값으로 기록하지 않습니다.

## 자산과 채택 검증

[자산 기록](../../references/menu.assets.json)의8개 상태별 SVG는 현재 숨김 slot의 제공 원본입니다.
표시를 켤 때 source·색·native16/선1을 맞추고 기본 상태에 glyph·빈 슬롯·불필요한 gap을 강제로 만들지 않습니다.
leading/check와 chevron의 색이 다를 수 있으므로 destructive 전체에 일괄 빨강을 적용하지 않습니다.
제품 소유 자산 경로에 연결하며 임시 Figma URL이나 배포 mirror를 영구 runtime import로 쓰지 않습니다.

[검증 항목](./verification.md)을 실제 제품에서 실행하고 source/export·지원 옵션·테스트 근거를 mapping에 기록합니다.
공유 채택 설정은 draft, 미확인 제품 구현은 unmapped를 유지합니다.
