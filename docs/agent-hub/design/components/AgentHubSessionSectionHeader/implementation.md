# AgentHubSessionSectionHeader — 구현 연결

기존 섹션 heading·펼침·보조 버튼을 먼저 비교하고 호환되면 adapter로 연결합니다. 없으면 SessionPanel 기능에 새 export를 만들 수 있습니다.
공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`의 재사용·검증 절차를 적용합니다.

다음은 **제안 API**이며 기존 제품 export나 Figma의 실제 prop 이름과 동일하다는 주장이 아닙니다.

```ts
export type AgentHubSessionSectionHeaderProps = {
  title: string;
  titleId?: string;
  showCount: boolean;
  countText: string;
  toggle?: {
    collapsed: boolean;
    contentId: string;
    label: string;
    onCollapsedChange: (collapsed: boolean) => void;
  };
  action?: { label: string; onActivate: () => void };
};
```

toggle/action의 유무를 원본 표시 Boolean에 연결합니다. countText는 제품에서 형식을 정한 표시 문자열입니다.
toggle은 `onCollapsedChange(!collapsed)` 한 경로에, action은 별도의 `onActivate` 한 경로에 연결합니다.
Figma의 collapsed 문자열 false/true는 제품 Boolean으로 명시적으로 변환합니다.

```text
비대화형 Header root
├─ heading wrapper
│  ├─ title-group: heading title + 표시할 때 countText
│  └─ toggle이 있을 때 native IconButton
└─ action이 있을 때 별도 native IconButton
```

두 IconButton은 [기존 계약](../AgentHubIconButton/README.md)의 ghost24에 연결합니다.
toggle glyph는 collapsed에 따라 right16/down16을 선택하고 실제 paint #757575를 유지합니다.
action은 plus16/#1C1C1C입니다. 자산은 [Session manifest](../../references/session.assets.json)의 실제 source와 연결합니다.
다른 크기의 glyph나 잘못된 plus24 이름으로 대체하지 않습니다.

```css
.session-section-header { display: flex; align-items: center; justify-content: space-between; gap: 0; }
.session-section-heading { display: flex; align-items: center; padding: 0 4px; gap: 0; }
.session-section-title-group { display: flex; align-items: center; gap: 8px; }
.session-section-title { margin: 0; font: 600 14px/20px Pretendard, sans-serif; color: #1c1c1c; }
.session-section-count { font: 400 14px/20px Pretendard, sans-serif; color: #1c1c1c; }
```

이 CSS는 비교용 배치이며 표면 border·shadow를 만들지 않습니다. 폭294는 부모의 샘플 폭이고 실제 폭·긴 문구는 제품에서 검증합니다.
toggle의 expanded/controls와 이름, action 이름·type=button·단일 활성화·focus·비활성을 기존 컨트롤에 연결합니다.
없는 branch는 렌더하지 않고 독립 collapsed state·전역 keydown·자동 count 요청을 만들지 않습니다.

[SessionPanel](../AgentHubSessionPanel/implementation.md)에서 데이터·본문·focus·접기 정책을 연결하고
[검증 항목](./verification.md)과 제품 검사를 마친 뒤 실제 source/export를 매핑합니다. 현재 `unmapped`와 공유 설정의 `draft`는 유지합니다.

## 사용자 채택 adapter

[모션 계약](../../motion.md)에 따라 heading gap2를 적용하고 down16 원본을 유지한 채 glyph만0↔−90deg 회전합니다.
제안 toggle API에 `triggerRef?: RefObject<HTMLButtonElement | null>`를 추가하면 부모의 disclosure가 닫힘 시 유효 trigger로 focus를 복귀시킬 수 있습니다.
24px 버튼과 기록용 actual16 adapter의 크기는 바꾸지 않습니다. data/ARIA 상태 한 곳에서 회전을 파생하며 SVG 파일을 수정하거나 새 glyph를 그리지 않습니다.
