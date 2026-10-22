# AgentHubDialog — 기존 엔진 연결과 새 구현

아래 내용은 **제품 API 제안과 DOM·CSS recipe**입니다. 실제 Agent Hub export·예약 API·Finder 서비스가 있다는 뜻이 아닙니다.
공용을 켠 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/components/Dialog/README.md`를 함께 읽습니다.

## 1. 실제 API와 배치 owner부터 확인합니다

1. 소비 저장소의 Dialog Root/Content·public export·focus/scroll 엔진과 두 workflow 화면을 찾습니다.
   호환되면 기존 기능에 scoped adapter를 연결하고 전역 Dialog size·색·close geometry를 변경하지 않습니다.
2. 읽기 전용 CMP의 `Dialog.tsx`는 `Dialog = RadixDialog.Root`, `DialogContent`는 title·description·footer·subheader 등을 받는 구조입니다.
   공용 문서의 독립 Header/Body/Footer 조합 예제를 실제 export로 취급하지 않습니다.
   `closeOnEscape`·`closeOnOutsideClick` 이름도 실제 source에 있는 것으로 복사하지 않습니다.
3. CMP Content에는 닫기 glyph/배치가 내장돼 있습니다. className 하나로32/r4/glyph24와 제목24/32를 모두 바꿀 수 있다고 가정하지 않습니다.
   필요한 경우 제품 기능 범위의 Content adapter로 기존 modal primitive·focus·dismiss·portal을 재사용합니다.
   별도 `AgentHubDialogHeader` 공개 API나 두 번째 modal engine을 만들지 않습니다.
4. 기존 footer가 이미 p24를 소유하면 action 두 개만 Fragment 등으로 전달합니다.
   p24인 AgentHubDialogFooter root를 다시 중첩하지 않습니다. footer가 없을 때는 null/undefined로 전달해 빈 여백을 제거합니다.
5. CMP Body의 상하1px transparent border는 가시 선이 없어도 공간2px를 예약하고, 기본 scroll fade는16px입니다.
   이번 두 body의 strokes=[]와 자동으로 일치하지 않습니다. 전용 body에서 경계 공간을 제거하고 필요한 경계/fade를 layout 밖 장식으로 연결하는 scoped adapter를 검증합니다.
   기본 size/profile selector가 전용 width/max-height보다 우선하지 않는지도 확인합니다. Finder1296을 맞추려고 공용 xlarge920을 바꾸지 않습니다.
6. 호환 export가 없을 때만 가장 좁은 제품 UI 범위에 새 조합 export를 개발합니다.
   실제 소스·공개 export·입력·요청·focus·scroll 검증 뒤 로컬 mapping을 기록하며 그전에는 `unmapped`/`draft`를 유지합니다.

## 2. 표시와 요청 API를 구분합니다

```ts
import type { ReactNode } from "react";

// 제품 제안입니다. Figma FRAME 속성이나 확인된 공개 export가 아닙니다.
export type AgentHubDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: "scheduled-task" | "agent-finder";
  title: string;
  closeLabel: string;
  content: ReactNode;
  footerActions?: ReactNode; // 기존 footer가 padding을 소유하면 action만 전달합니다.
};
```

recipe는 제품의 조합 선택값이며 Figma variant나 공용 Dialog size enum이 아닙니다.
content와 footerActions도 Figma SLOT의 추출값이 아닙니다. 실제 모달 라이브러리에 맞춰 입력을 조정합니다.
닫힘 허용·dirty 확인·요청 중 처리·초기 focus와 trigger 복귀는 한 제품 owner가 관리합니다.
취소·닫기·Escape의 별도 handler에서 독립 open을 만들지 않습니다.

```text
기존 modal Root / Portal / Overlay / Content 엔진
└─ scoped content 표면 (recipe별 폭·높이 adapter)
   ├─ 내부 header 조합: 제목 + legacy32/r4/glyph24 닫기
   ├─ recipe 본문: 기존 viewport 또는 제품 소유 viewport 한 곳
   └─ 예약 편집만 기존 footer 영역: tertiary40 취소 + primary40 저장
```

## 3. 표면과 header를 scoped CSS로 연결합니다

다음 값은 제품 token과 연결할 recipe입니다. fixture 확인 때 예약580×554, Finder1296×800을 비교하되
실제 런타임에서는 viewport 제한과 내부 scroll로 조정합니다. Figma clipping을 사용자 콘텐츠 삭제로 재현하지 않습니다.

```css
.hub-dialog-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: var(--hub-dialog-width);
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  min-width: 0;
  min-height: 0;
  border: 0;
  border-radius: 16px;
  background: #f6f7f9;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 8px 12px 0 rgb(9 30 66 / 15%);
  overflow: hidden;
}
.hub-dialog-content[data-recipe="scheduled-task"] { --hub-dialog-width: 580px; }
.hub-dialog-content[data-recipe="agent-finder"] {
  --hub-dialog-width: 1296px;
  height: min(800px, calc(100dvh - 32px));
}
.hub-dialog-content[data-recipe="agent-finder"]::after {
  position: absolute;
  inset: 0;
  border: 1px solid #eee;
  border-radius: inherit;
  pointer-events: none;
  content: "";
}
.hub-dialog-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  gap: 12px;
  padding: 24px 24px 12px;
}
[data-recipe="scheduled-task"] .hub-dialog-header { padding-bottom: 16px; }
[data-recipe="agent-finder"] .hub-dialog-header::after {
  position: absolute;
  inset: auto 0 0;
  height: 1px;
  background: #ddd;
  pointer-events: none;
  content: "";
}
.hub-dialog-title {
  min-width: 0;
  margin: 0;
  color: #1c1c1c;
  font: 600 24px/32px Pretendard, sans-serif;
  letter-spacing: 0;
}
.hub-dialog-close {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  padding: 4px;
  border: 0;
  border-radius: 4px;
  background: transparent;
}
.hub-dialog-close-glyph { display: block; flex: 0 0 24px; width: 24px; height: 24px; }
.hub-dialog-body { position: relative; flex: 1 1 auto; min-width: 0; min-height: 0; }
```

위 .hub-dialog-content는 기존 modal Content에 연결하는 시각 adapter입니다. position·top/left·중앙 배치 translate·z-index·전환 transform은 기존 primitive가 소유하므로 덮어쓰지 않습니다.
내부 wrapper에 연결하는 제품은 기존 Content의 배경·padding·border·크기를 먼저 조정해 두 shell이 겹치지 않게 검증합니다.
root와 Finder header의 선은 layout을 차지하지 않는 레이어입니다. 기존 adapter가 선을 소유하면 위 레이어를 추가하지 않습니다.
예약 root와 header에는 phantom border를 만들지 않습니다. 닫기는 [자산 기록](../../references/dialog.assets.json)의 실제 x24를 연결하고
생성 코드의 stale plus 이름이나 AHIconButton32의 glyph20으로 대체하지 않습니다.
외부 SVG img에 color만 주면 내부 stroke가 바뀐다고 가정하지 않습니다.
위 CSS는 hover·disabled·focus 스타일을 완성한 Button 구현이 아니므로 제품의 native Button·focus-visible 계약을 별도로 연결합니다.

## 4. recipe별 실제 콘텐츠와 scroll을 연결합니다

[예약 편집 recipe](./scheduled-task-recipe.md)는 form의 label·controlled 입력·toolbar·주기·footer를,
[Finder recipe](./agent-finder-recipe.md)는 필터 rail·Search·15개 카드 표본과 동적 결과 영역을 설명합니다.
기존 scroll engine이 있으면 그 viewport 한 곳에 `min-height:0`·flex 높이·content padding을 연결합니다.
없으면 AgentHubScrollbar의 실제 엔진을 확보하고 recipe의 실제 overflow owner에 연결합니다.
다음은 engine을 배치할 layout 경계이며, overflow NONE인 Figma의 동작 실측이 아닌 **구현 채택**입니다.

```css
.hub-dialog-scroll-area {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
```

위 클래스는 ScrollArea root의 예시이며 native `overflow:auto`는 기존 엔진의 실제 viewport 한 곳만 소유합니다.
예약 편집은 본문에 AgentHubScrollbar를 연결하고 header/footer는 고정합니다.
Finder는 바깥 Dialog body를 비스크롤 flex layout으로 두고 rail을 고정하며,
오른쪽 Search와 결과 콘텐츠를 묶은 AgentHubScrollbar 한 곳만 스크롤합니다. Search는 그 콘텐츠와 함께 움직입니다.
Search를 추가 sticky 영역으로 바꾸거나 rail까지 함께 움직이는 새 scroll 범위를 만들지 않습니다.
안쪽 콘텐츠에 `overflow:auto`를 남긴 채 바깥 Dialog에만 AgentHubScrollbar를 놓으면 실제 scrollbar는 native로 남으므로 허용하지 않습니다.
기존 viewport 위에 스크롤 가능한 중첩 wrapper를 무조건 추가하지 않고 header·rail 고정 좌표와 focus 가시성을 검사합니다.
두 scrollbar의 장식적160/180px와 서로 다른 r8/r9999를 기록하되 native scroll metrics로 thumb를 계산합니다.
스크롤 끝과 thumb 비율을 샘플 길이로 고정하지 않습니다.

기존 CMP의200ms/ease motion을 채택하면 portal/Presence 생명주기를 유지하고 원본과 다른 새 모션을 추정하지 않습니다.
reduced-motion 대체는 실제 제품에서 구현·검증할 항목이며 원본에 전역 reset이 이미 있다고 가정하지 않습니다.
좁은 폭·zoom·키보드·긴 문구·오류·비동기 상태를 [검증](./verification.md)한 뒤 실제 mapping을 기록합니다.

## 5. 하위 form 표현을 기존 컴포넌트로 연결합니다

지침은 [AgentHubTextarea](../AgentHubTextarea/implementation.md)의140px 표면과 toolbar를 조합합니다.
toolbar 배경 위에 연속 외곽 경계층을 두어 기본1px #DDD·입력 focus2px blue·invalid 경계가
좌우·하단 r8에서 가려지지 않게 합니다. 내부 textarea 사각형 outline은 제거하되 toolbar 버튼 focus는 유지합니다.
원본103px 본문·37px toolbar·위 #EEE1px divider와 label gap4는 바꾸지 않습니다.

빈도는 [AgentHubSelect](../AgentHubSelect/implementation.md)의 공용 단일 값·combobox/listbox 엔진을 유지하고,
기존 AgentHubMenu 패널과 AgentHubMenuItem content를 표현 adapter로 조합합니다.
popup r12·상하4/좌우0·Mid, option28px·좌16/우12·hover #F8F8F8/pressed #F4F4F4·배경200ms,
열림/닫힘150ms fade/slide6px을 공유하고 원본에 없는 빈도 popup 실측으로 주장하지 않습니다.
현재 선택은 제품 채택16px check와 `aria-selected`로 표시하며 공용의 파란 selected 면을 이 adapter에서 사용하지 않습니다.
Select의 popup viewport도 AgentHubScrollbar skin을 사용하며 Escape는 popup만 닫습니다.

## 공용 control 우선 조합

Input·Textarea·단일 Select의 실제 source/export를 먼저 확보하고 얇은 Agent Hub adapter를 조합합니다.
공용 계약만 있을 때는 reusable common control부터 구현하고 source를 확인한 뒤 local registry를 기록합니다.
native dialog의 showModal/close를 시각 상태와 분리해 exit200ms 후 close하며 timer/rAF/unmount를 취소합니다.
입력값·요청·빈도는 부모 form owner가 소유하고 미구현 검색/다중선택 API는 노출하지 않습니다.

## 첫 사용 modal 엔진 선택과 recipe 범위

기존 소비 제품은 확인한 단일 modal 엔진을 유지합니다. 공용의 Radix 예시는 reference이며 강제 교체 대상이 아닙니다.
이번 React 테스트 앱은 처음부터 native dialog를 선택한 소비 adapter이므로 showModal/close 지연 규칙을 사용합니다.
Radix 제품에서는 같은200ms exit presence와 focus 복귀 의미를 기존 primitive 생명주기에 연결하며 native dialog를 중첩하지 않습니다.

registry 의존성은 두 recipe 및 공용 참조의 합집합입니다. 모두 읽어 충돌을 확인하되 실제 구현은 선택 recipe의 보이는 기능부터 합니다.
예약 작업은 폼3 adapter·Button·Footer·Icon·modal·scroll을 구현하고 Finder 전용 Search·ItemCard는 이번 구현 범위에서 제외합니다.
공용 Dialog가 참조하는 SegmentedControl 등 미사용 slot도 자동으로 렌더하거나 전체 API 완료로 표시하지 않습니다.
fixture의commonAdapters는 필요한 control/단일선택/스크롤 부분범위이며 공용51종 전체 구현 증거가 아닙니다.

테스트 앱은 기존 body viewport를 공용 ScrollArea로 교체하고 Header/Footer를 고정합니다. body의 px24 안에 thumb가 들어가도록 viewport 추가 gutter를 중복 적용하지 않습니다. legacy r8 관찰값은 보존하되 runtime thumb는 AH4px/r9999 채택값입니다.
