# AgentHubDataCard — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS recipe**이며 실제 제품 export나 데이터 서비스가 아닙니다.

아래 시각 recipe에도 [공용 Card 색상 모션](../../cards.md#공용-색상-모션-계승)을 함께 연결합니다.
root의 background-color/border-color/box-shadow/color와 텍스트 color에200ms ease를 적용하고,
pseudo border·상태 표면은 변하는 속성만 지정합니다. reduced motion을 명시적으로 해제하며 geometry·SVG src에는 새 모션을 만들지 않습니다.

## 1. 호환 카드와 Chip을 확인합니다

소비 저장소의 source·registry·public export에서 compact 데이터 카드와 Pill/Small Chip을 찾습니다.
호환되면 geometry/paint adapter를 연결하고, 없으면 가까운 기능 범위에 새 DataCard export를 만듭니다.
공용 Card의 의미·focus는 유지하되392/r8·기본 무그림자·Mid·선택 선·Header/footer 조합을 덧붙이지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 적용합니다.

## 2. 표시 문구와 선택적인 활성화를 받습니다

```ts
export type AgentHubDataCardProps = {
  id: string;
  title: string;
  description: string;
  typeLabel: string;
  disabled?: boolean;
  onActivate?: (id: string) => void;
};
```

문구 props는 실제 root TEXT property가 아닌 **제품 제안**입니다. ‘data-name’·‘volume’·‘Type’을 기본 데이터로 고정하지 않습니다.
ID·데이터·권한·조회·실제 활성화 의미·중복 요청·실패는 제품 owner가 소유합니다.
Figma state를 별도 요청 enum으로 저장하지 않으며 selected prop은 이 최소 제안에 추가하지 않습니다.

## 3. 실제 기능에 맞는 한 host를 고릅니다

```text
정보 표시이면 비대화형 표면 / 단일 action이면 native button type=button
├─ text-group: title + description
└─ 일반 Chip adapter: Pill·Small·Enabled·아이콘/삭제 조작 없음
```

onActivate가 제공된 실제 action host의 click에서 disabled guard 후 onActivate(id)를 한 번 호출합니다.
Enter/Space는 native 동작을 사용하고 title·Chip·wrapper·별도 keydown에서 재실행하지 않습니다.
표시 전용이면 버튼·Tab·핸들러를 만들지 않습니다. 독립 control이 필요하면 비대화형 표면 안의 형제 host로 새 구성을 설계합니다.
문구는 평문으로 렌더하고 HTML로 주입하지 않습니다.

## 4. 120px 비교 배치와 Raised를 연결합니다

아래는 원본의120px 단일 줄 비교 환경입니다. literal은 제품 token에 연결하며 가변 grid·긴 문구는 별도 검증합니다.

```css
.hub-data-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 120px;
  height: 120px;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 1px 1px 0 rgb(9 30 66 / 10%);
  text-align: left;
}
.hub-data-card[data-action]:hover:not(:disabled) { background: #f8f8f8; }
.hub-data-card[data-action]:active:not(:disabled) { background: #f4f4f4; }
.hub-data-card[data-action]:focus-visible { outline: 1px solid var(--hub-data-card-focus); outline-offset: 3px; }
.hub-data-card-text { display: flex; flex-direction: column; gap: 4px; align-self: stretch; min-width: 0; }
.hub-data-card-title { margin: 0; color: #1c1c1c; font: 400 14px/20px Pretendard, sans-serif; }
.hub-data-card-description { margin: 0; color: #757575; font: 400 10px/12px Pretendard, sans-serif; }
.hub-data-card-chip {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 20px;
  height: 20px;
  max-width: 200px;
  padding: 0 8px;
  border: 0;
  border-radius: 10px;
  background: #ffffff;
}
.hub-data-card-chip::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid #dddddd;
  border-radius: inherit;
  pointer-events: none;
}
.hub-data-card-chip-label {
  min-width: 0;
  color: #1c1c1c;
  font: 600 12px/16px Pretendard, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

Chip selector는 기존 Chip의 검증된 slot/style adapter에 연결하는 비교 recipe입니다. 새 전역 Chip을 복제하거나 정보 라벨을 button으로 만들지 않습니다.
Chip pseudo border는20px 높이·44px 샘플 폭에 선 공간을 더하지 않는 adapter이며 원본에 그림자가 있다는 뜻이 아닙니다.
SPACE_BETWEEN이 text-group과Chip 사이를 배치하므로 저장 gap18을 따로 추가하지 않습니다.

data-action은 실제 action일 때만 주고 focus token은 제품에서 채택합니다. focus/disabled의 시각은 원본에서 측정하지 않았습니다.
다른 primitive를 채택하면 aria-disabled/data-disabled selector와 실제 handler 차단도 연결합니다.
긴 title/description/Chip은 원본의120px와 maxWidth200만으로 안전하게 배치되지 않습니다.
제품이 전체 정보 접근·유형 최대폭·줄바꿈·카드 높이/폭 정책을 명시해 검증하고 새 responsive 시각을 실측값과 구분합니다.

## 5. 제품 검증과 매핑을 남깁니다

[검증 항목](./verification.md)과 제품 lint/typecheck/test/build·가변 문구·단일 활성화·keyboard/focus·disabled를 확인합니다.
실제 source/public export·지원 조합·결과를 로컬 mapping에 기록하며 그 전에는 `unmapped`/`draft`를 유지합니다.
공용 문서·Chip source의 재사용만으로 실제 데이터 서비스 구현을 선언하거나 serengeti 원본을 수정하지 않습니다.
