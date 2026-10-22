# AgentHubSNBSectionHeader — 기존 구현과 새 구현 연결

다음은 **제품 API·DOM/CSS 제안**입니다. Figma root 속성이나 확인된 제품 export가 아닙니다.
기존 SNB section heading·펼침·보조 control을 먼저 조사하고 호환되면 adapter로 연결하며 없으면 가까운 기능 범위에 새 export를 만듭니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 적용합니다.

```ts
export type AgentHubSNBSectionHeaderProps = {
  title: string;
  titleId?: string;
  disclosure?: {
    expanded: boolean;
    contentId: string;
    label: string;
    onExpandedChange: (nextExpanded: boolean) => void;
  };
  actions?: readonly {
    id: string;
    label: string;
    onActivate: () => void;
  }[];
};
```

문자열·disclosure·actions는 제품 제안입니다. 실제 state는 enabled/hovered 하나이며 접힘값이나 명령 정의가 아닙니다.
펼침과 목록·필터·추가·route 상태는 호출부가 소유합니다. 실제 세 보조 glyph와 순서를 채택한 adapter에서 연결합니다.
원본 제목/보조 명령 수를 임의의 API 한계나 특정 업무 handler로 확정하지 않습니다.

```text
비대화형 Header20
├─ title-group: 실제 heading + 채택한 disclosure button20
└─ 별도 actions: ghost20 direct/filter/plus
```

disclosure의 native click은 onExpandedChange(!expanded)를 한 번 요청합니다.
각 action은 자신의 callback만 한 번 실행하며 root·제목·glyph·추가 keydown에 같은 명령을 중복 등록하지 않습니다.
실제 이동이라면 해당 동작을 유효한 native link로 연결합니다. popup은 별도로 검증한 primitive와 owner를 사용합니다.

```css
.hub-snb-section-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  height: 20px;
  padding: 0 0 0 8px;
  border: 0;
  background: transparent;
}
.hub-snb-section-title-group { display: flex; align-items: center; gap: 2px; min-width: 0; }
.hub-snb-section-title { margin: 0; color: #656b74; font: 400 12px/16px Pretendard, sans-serif; white-space: nowrap; }
.hub-snb-section-actions { display: flex; flex: 0 0 auto; gap: 0; }
.hub-snb-section-toggle { display: grid; place-items: center; flex: 0 0 20px; width: 20px; height: 20px; padding: 0; border: 0; border-radius: 4px; background: transparent; }
```

폭256px는 비교 host가 공급합니다. 저장 gap10 대신 SPACE_BETWEEN을 표현했으며 root surface·set 외곽선은 추가하지 않습니다.
title-group의 gap2는 후속 사용자 채택값이며 원본 gap0을 바꿔 측정했다고 기록하지 않습니다.
제목은 원본에서 HUG/ellipsis 없음입니다. 긴 문구의 말줄임·줄바꿈·높이 변화는 제품 확장으로 검증합니다.

보조3개는 기존 AgentHubIconButton ghost20·p2·r4/glyph16을 재사용합니다.
접기 FRAME에는 native button 의미를 연결하되 실제 IconButton source 재사용으로 기록하지 않습니다.
[정확한 자산](../../references/snb.assets.json)의 down/direct/filter/plus16·#656B74를 연결하고 부모 color로 외부 SVG stroke가 바뀐다고 가정하지 않습니다.
collapsed glyph나 회전 모션은 원본에 없으므로 별도 채택·검증하며 down 하나로 접힘 상태까지 확인했다고 쓰지 않습니다.
현재 채택은 동일 down glyph만 open0°↔closed−90°/200ms ease로 회전하고 버튼 hit area·focus ring은 고정합니다.
버튼의 hover/pressed 색상도200ms ease를 적용하며 reduced-motion에서는 색·방향을 즉시 반영합니다.

원본 enabled/hovered의 subtree 차이를 재현하는 동시에 기능이 필요하면 focus-within·touch 등 접근 가능한 노출 정책을 명시합니다.
이 정책은 제품 제안이며 원본 focus 상태가 아닙니다. focus가 있는 조작을 숨기지 않고 disabled와 popup 복귀를 실제 host에 연결합니다.
[검증](./verification.md)과 제품 검사를 마친 뒤 source/public export·자산/token adapter를 기록하며 unmapped/draft를 유지합니다.
