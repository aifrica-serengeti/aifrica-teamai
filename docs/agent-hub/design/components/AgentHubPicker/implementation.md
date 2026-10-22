# AgentHubPicker 신규 구현과 연결

이 안내의 API·DOM·CSS는 제품 구현을 위한 제안입니다. 기존 제품 export가 있다는 뜻이 아닙니다.
현재 consuming repository를 조사해 호환 컴포넌트가 있으면 adapter로 조합하고, 없으면 좁은 솔루션 export를 개발하세요.

## 먼저 조사할 항목

1. [PickerItem](../AgentHubPickerItem/implementation.md)과 [PickerFooter](../AgentHubPickerFooter/implementation.md),
   [Search](../AgentHubSearch/README.md), [IconButton](../AgentHubIconButton/README.md)의 실제 제품 구현을 찾습니다.
2. 공용 채택 시 `DOCS_ROOT/frontend/design/components/Select/`, `Menu/`, `Scrollbar/`, `Button/`를
   의미·의존성 후보로 비교합니다. 참조 코드의 키보드 한계나 공용 시각 값을 새 picker에 그대로 복사하지 않습니다.
3. popup primitive의 focus/portal·검색 input·중첩 모델/보조 메뉴가 함께 동작하는지 확인합니다.
   제품의 dialog 또는 popover adapter를 선택하고 modal 여부와 닫힘/복귀 정책을 기록합니다.
4. 실제 source/public export·token·asset 경로를 제품의 로컬 채택 설정에 연결합니다.
   `.teamai/docs`의 자산을 앱의 영구 runtime import 경로로 사용하지 않습니다.

## 제안 API와 상태

```ts
type PickerRecipe = 'agent-recommendations' | 'project-chat-search';

type PickerTarget = {
  kind: 'chat' | 'agent' | 'project';
  id: string;
};

type AgentHubPickerProps = {
  recipe: PickerRecipe;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChoose: (target: PickerTarget) => void;
};
```

이는 두 스냅샷을 구별하는 시작 API입니다. `recipe`나 kind는 Figma property가 아닙니다.
실제 데이터 목록·query/onQueryChange·현재 모델·필터·보조 명령·footer 링크는 제품 소유의 typed adapter로 추가합니다.
오류·pending·disabled 및 선택 후 동작도 제품에 맞게 명시하고 임의의 source 경로나 endpoint를 만들지 않습니다.
같은 open/query를 내부 state와 부모 양쪽에서 따로 관리하지 않습니다.

## 조립 순서

- 추천 조립은 chat PickerItem → 구획 띠 → 추천 header와 목록 → footer입니다.
  assistant는 기본 item, workflow/runtime은 명시한 radius8 recipe로 확장합니다.
- 검색 조립은 Search32 → 구획 띠 → 프로젝트/채팅32px 목록 그룹 → footer입니다.
  navigation 소스에 맞는 행 renderer를 개발하고 PickerItem36으로 일괄 대체하지 않습니다.
- 모델·more·filter는 별도 native target으로 둡니다. main action과 같은 외부 행 wrapper에서 형제 관계로 조립합니다.
  모델 selector를 독립 control로 쓰면서 행 전체를 button/listbox option으로 감싸지 않습니다.
- 기본 모델·제목·공개 범위·고정 목록·route는 fixture를 제품 기본 데이터로 복사하지 않고 adapter에서 전달합니다.

다음은 고정 영역과 **목록만 스크롤하는 영역**을 나눈 채택 구조입니다.
일반 채팅·모델/Search·구획·추천 제목을 전체 overflow wrapper 안에 넣지 않습니다.
원본의 absolute footer와 콘텐츠 겹침을 복사하는 대신 실제 목록 viewport와39px footer를 확보합니다.

```html
<section class="agent-hub-picker" aria-labelledby="picker-title">
  <h2 id="picker-title" class="sr-only">선택할 항목 찾기</h2>
  <div class="agent-hub-picker__body">
    <!-- 고정: 일반 채팅·모델 또는 Search, 구획 띠 -->
    <!-- 추천 조립에만 고정 추천 제목 -->
    <ScrollArea class="agent-hub-picker__list" height="100%">
      <!-- 추천 행 또는 검색 결과 그룹: 실제 native viewport의 콘텐츠 -->
    </ScrollArea>
  </div>
  <div class="agent-hub-picker__footer">
    <!-- PickerFooter: 키보드 힌트, 해당 조립에만 탐색 링크 -->
  </div>
</section>
```

위 fragment는 구조 설명이며 `ScrollArea`는 실제 소비 저장소의 공개 export에 연결합니다.
공용 ScrollArea의 native viewport·형제 thumb·측정·drag·cleanup을 재사용하고
[AgentHubScrollbar](../AgentHubScrollbar/implementation.md)의4px·11px 시각 adapter를 채택합니다.
기존 source2019:3708 기록은 보존하며 이 runtime 채택을 Figma instance source 교체로 기록하지 않습니다.
외부 popup adapter가 dialog 역할을 소유하면 내부 section에 dialog를 다시 중첩하지 않습니다.
focus containment는 modal로 채택한 adapter가 소유합니다.

```css
.agent-hub-picker {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(9, 30, 66, .31),
              0 4px 6px 0 rgba(9, 30, 66, .15);
}
.agent-hub-picker__body {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding-block-start: 20px;
}
.agent-hub-picker__list { flex: 1 1 0%; min-height: 0; min-width: 0; }
.agent-hub-picker__footer {
  min-width: 0;
  margin-inline: -1px;
  margin-bottom: -1px;
}
```

폭·max-height는 제품 popup 배치와 사용 가능한 viewport에 맞는 token으로 정합니다.
fixture776×455·532×536를 모든 화면의 고정 크기로 사용하지 않습니다.
검색·행 간격·구획 띠와 표시 차이는 [styles](./styles.md)에 따라 recipe 내부에서 연결합니다.
footer 자체에 이미 top border가 있으므로 wrapper에 선이나 padding을 다시 더하지 않습니다.
위 margin adapter는 absolute 원본 footer의 전체 폭과 border 하단까지 닿는 위치를 보존합니다.
추천의 chat→구획→추천 제목 사이 간격은12px, 제목→목록은4px,36px 행 사이는0입니다.
목록의 content padding은 기본 ScrollArea의16px를 그대로 남기지 않고 좌우4px와 필요한 끝 여백으로 연결합니다.
추천 제목은 고정 영역이고 검색 결과의 그룹 제목은 결과 목록 안에서 읽습니다. 부모는 목록 내부 DOM을 탐색하지 않습니다.

키보드 focus를 이동할 때는 대상 행의 native button에 `focus({preventScroll:true})`를 호출하고
같은 ScrollArea의 공개 `ensureVisible(element)` 또는 동등한 좁은 handle로 행을 노출합니다.
`scrollIntoView()`로 바깥 페이지까지 움직이거나 각 Picker가 별도 thumb·drag·scroll 상태를 만들지 않습니다.

## 이벤트·자산·검증

실제 native target 한 곳에서만 `onChoose`를 호출합니다. 제품에서 소유하는 target id와 실제 동작을 연결하고,
단일 Enter/Space와 하위 모델/more 조작에서 callback이 중복되지 않게 합니다.
검색 IME 중 Enter를 선택으로 사용하지 않고 closed/disabled/숨김 target의 handler를 차단합니다.
footer 키 안내와 실제 구현 키가 일치하는지도 확인합니다.

[자산 기록](../../references/picker.assets.json)의 정확한 glyph와 공급된 모델 로고 샘플을 사용합니다.
모델 로고는 runtime 모델 데이터의20×20 image slot이며 Qwen 샘플을 Agent Hub의 고정 브랜드로 바꾸지 않습니다.
기존16px 아이콘의 state paint와 native 크기, opacity0 branch와 viewport 밖 branch를 구분합니다.
filter·more의 실제 #757575는 전용 supplied SVG 또는 검증한 색상 adapter로 연결합니다. 기본 #1C1C1C 파일을 그대로 img로 표시하면 다릅니다.
자산을 숨겼을 때 보이지 않는 focus target이나 불필요한 slot을 남기지 않습니다.

[제품 검증](./verification.md)을 실행하고 실제 source·export와 결과를 로컬 mapping에 기록합니다.
이 문서의 fragment·제안 props·정적 조합 match만으로 구현 완료를 기록하지 않습니다.
