# AgentHubDialogFooter — 기존 footer 연결과 새 구현

아래는 **제품 API 제안과 DOM·CSS recipe**입니다. 실제 Agent Hub export·Dialog 서비스 API·Figma root 속성이 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/components/Dialog/README.md`를 함께 읽습니다.

## 1. 기존 footer와 Button adapter를 먼저 확인합니다

1. 현재 소비 저장소의 Dialog content/footer DOM·public export와 Button의40px adapter를 찾습니다.
   호환되면 기존 기능을 재사용하고 이 footer의 시각·노출·호출부 상태만 연결합니다.
2. 기존 footer가 이미 padding24·gap8·우측 정렬을 소유하면 **두 action만** 그 입력으로 전달합니다.
   다시 padding24인 footer wrapper를 중첩하거나 footer 안에 또 footer landmark를 만들지 않습니다.
3. footer 영역이나 호환 export가 없을 때만 가까운 제품 UI 범위에 새 전용 export를 개발합니다.
   Dialog의 포털·모달·focus·dismiss·scroll 엔진은 기존 계약을 사용하고 footer에서 다시 만들지 않습니다.
4. 실제 DOM·입력·시각·요청·실패·닫힘 검증 후 소비 저장소의 source/public export와 adapter를 로컬 mapping에 기록합니다.
   검증 전에는 `unmapped`/`draft`를 유지하고 serengeti 원본이나 공용 Dialog를 수정하지 않습니다.

읽기 전용 CMP에서는 `src/core/components/layout/dialog/Dialog.tsx`의 `footer?: ReactNode`가
이미 `<footer data-slot="dialog-footer">`에 렌더되며 그 영역이 padding24를 소유합니다.
공용 문서 예제의 독립 `DialogFooter` export와 실제 CMP API가 같다고 가정하지 않습니다.
이 source 존재도 Agent Hub 소비 저장소의 구현 완료나 새 export의 증거는 아닙니다.

## 2. 제품 API는 표시와 동작을 구분합니다

```ts
// 실제 export가 아닌 제안이며 기존 제품의 공개 API에 맞춰 연결합니다.
export type AgentHubDialogFooterProps = {
  cancelLabel: string;
  confirmLabel: string;
  showCancel?: boolean; // 기본 true이며 실제 cancel Boolean에 대응합니다.
  cancelDisabled?: boolean; // 제품이 채택하는 추가 상태입니다.
  confirmDisabled?: boolean; // 제품이 채택하는 추가 상태입니다.
  onCancel: () => void;
  confirmAction:
    | { kind: "button"; onConfirm: () => void }
    | { kind: "submit"; formId?: string };
};
```

root의 실제 Figma 속성은 cancel 표시 Boolean 하나입니다. label과 disabled·callback·formId·confirmAction은 모두 제품 제안입니다.
pending·권한·검증 상태는 호출부가 관리해 disabled와 label에 명시적으로 연결하고 footer 내부에 같은 요청 상태를 복제하지 않습니다.
취소와 확정이 실제로 무엇을 수행하는지, 성공 후 언제 닫는지는 호출부가 정합니다.
cancelLabel/confirmLabel은 제품 데이터와 locale로 공급하며 샘플 문구·폭을 고정하지 않습니다.

`kind="button"`은 native `type="button"`의 click 한 곳에서 실제 disabled를 검사하고 onConfirm을 한 번 호출합니다.
`kind="submit"`은 native `type="submit"`과 필요한 `form` 연결을 사용하고 요청은 기존 form의 onSubmit 한 곳이 소유합니다.
이 경로에는 같은 mutation을 호출하는 별도 button onClick을 추가하지 않습니다.
기존 form을 중첩하지 않으며 명시적 submit adapter가 필요하면 해당 form owner의 `requestSubmit()` 한 경로로 연결합니다.
취소도 하나의 callback 또는 채택한 Dialog 닫기 경로로만 처리하고 둘을 중복 실행하지 않습니다.

## 3. padding은 한 영역만 소유합니다

```text
기존 Dialog footer가 배치를 소유할 때
└─ 기존 footer: padding24·gap8·우측 정렬
   ├─ showCancel일 때 tertiary40 native Button
   └─ primary40 native Button

별도 footer 영역이 필요할 때
└─ 전용 footer root: padding24·gap8·우측 정렬
   ├─ showCancel일 때 tertiary40 native Button
   └─ primary40 native Button
```

첫 경로는 Fragment 또는 검증한 동등한 조합으로 action만 반환합니다. `AgentHubDialogFooter`라는 이름 때문에
기존 footer 입력에 padding이 있는 root를 반드시 한 겹 추가하지 않습니다.
두 번째 경로에만 다음 root 스타일을 적용하며 폭은 부모 Dialog가 공급합니다.

```css
.hub-dialog-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 8px;
  width: 100%;
  padding: 24px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.hub-dialog-footer-action {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 4px;
  height: 40px;
  padding: 4px 16px;
  border: 0;
  border-radius: 8px;
  font: 600 16px/24px Pretendard, sans-serif;
  letter-spacing: 0;
  white-space: nowrap;
}
.hub-dialog-footer-cancel { background: #fff; color: #1c1c1c; }
.hub-dialog-footer-cancel::after {
  position: absolute;
  inset: 0;
  border: 1px solid #ddd;
  border-radius: inherit;
  pointer-events: none;
  content: "";
}
.hub-dialog-footer-confirm { background: #3b82f6; color: #fff; }
```

이 CSS는 표시 중인 enabled 샘플의 배치/inside 선을 설명합니다. 실제 Button을 복제하는 새 전역 variant가 아닙니다.
가능하면 [AgentHubButton](../AgentHubButton/styles.md)의 기존40px adapter로 같은 결과를 얻고 선 레이어를 중복하지 않습니다.
사용하는 public size 이름은 실제 구현에서 확인합니다. 공용의 medium32를 같은 이름 그대로 연결해 높이를 줄이지 않습니다.
이40px 예외를 채택할 때는 제품의 로컬 `exceptions`에 대상 계약·Figma 근거·AgentHubDialogFooter 적용 범위를 기록합니다.
40px 고정 높이와 세로 중앙 정렬을 보존해 label y8을 재현합니다. 높이를24+8=32로 다시 계산하지 않습니다.
cancel 선은 레이아웃을 차지하지 않으므로 label x16과 폭81=49+32를 보존합니다.
root는 실제 strokes가 없으므로 border2px를 더해 높이90이나 내부 시작26px를 만들지 않습니다.

## 4. 실제 입력과 추가 상태를 연결합니다

showCancel=false이면 취소 DOM과 해당 gap을 제거합니다. 기존 footer에 gap8이 있어도 한 Button에는 빈 간격이 생기지 않아야 합니다.
cancel 숨김을 dismiss 잠금이나 전체 footer disabled로 사용하지 않습니다.
두 Button의 실제 disabled·handler guard·focus-visible·Enter/Space는 [행동](./behavior.md)과 [접근성](./accessibility.md)에 맞춰 연결합니다.
위 기본 CSS만으로 disabled에서 hover/pressed를 다시 활성화하지 않도록 기존 Button의 상태 selector를 유지하고 검증합니다.

숨김 plus20 네 개는 렌더하지 않습니다. keycap Boolean이 true여도40px 자식이 없으므로 새 keycap·아이콘 공간·단축키를 만들지 않습니다.
추가 visible 아이콘이나 negative·loading·dark가 필요하면 해당 근거와 제품 요구를 별도로 확인합니다.
이 작업에는 새 보이는 아이콘·SVG 자산이 없습니다.

580px fixture와 영어 label로 기본 geometry를 비교한 뒤 긴 번역·협소 화면·zoom·Body 스크롤에서도 실제 action 접근을 검사합니다.
원본의 NO_WRAP을 좁은 화면 잘림으로 복사하지 않고, wrap/세로 배치가 필요하면 제품 제안으로 명시해 검증합니다.
전체 Dialog 테마·shell width·취소 정책을 footer 하나로 변경하지 않습니다.
[검증](./verification.md)을 마친 뒤 실제 source·export와 적용 범위만 로컬에 기록합니다.
