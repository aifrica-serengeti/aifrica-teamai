# AgentHubPicker 검증

## 문서와 원본

[실측](../../references/picker.figma.json), [변수](../../references/picker.variables.figma.json),
[자산](../../references/picker.assets.json), [조합 대조](../../references/picker-composition.json)를 대조합니다.
정적인 source/geometry/asset match는 제품 runtime 또는 전체 상태의 일치 증거가 아닙니다.

| 확인할 대상 | 기대 결과 |
| --- | --- |
| 두 shell | white/#DDD1 INSIDE/r24/Mid, 776×455·532×536는 샘플 |
| 추천 조합 | PickerItem6 + 유형 Chip 기반 직접 FRAME4, 후자r8 유지 |
| 검색 조합 | 실제 Search32 focused/filter=true, 14개32px navigation/direct행 |
| hovered 원본 override | source 이름과 실제 fills 구분, 숨은 trailing/gradient 노출 없음 |
| footer | actual source2627:62004, top1만 존재,39px, 추천만 링크 branch |
| 그림자·구획 띠 | Mid 기존 값, 두 조립의 semantic F4/EEE와 raw F2/E3 차이 유지 |
| 이미지·glyph | 정확한 local 파일·native16, 200×200px 모델 샘플 PNG의20×20px 슬롯, source와 해시 확인 |

## 소비 제품에서 확인하기

1. 실제 source/public export·사용 패키지·호출부를 조사하고 기존 컴포넌트와의 차이를 기록합니다.
2. 넓은 화면과 협소 화면, 긴 title/meta/model, 번역 문구에서도 겹침·잘림·레이아웃 손실이 없는지 확인합니다.
3. footer39px 공간을 확보하고 마지막 항목까지 pointer·keyboard로 노출되는지 확인합니다.
   원본 overflowDirection=NONE/absolute overlay를 실제 스크롤 완료 증거로 쓰지 않습니다.
   일반 채팅·모델/Search·구획·추천 제목·footer의 위치를 스크롤 전후 비교하고 목록만 이동하는지 검사합니다.
   기존 ScrollArea/AHScrollbar 한 엔진·thumb4/gutter11과 추천 gap12/제목 gap4/행 gap0을 확인합니다.
   776×455 비교에서는 채팅y21·구획y69·제목y89·목록y109·footer y416..455를 대조합니다.
   검색536px의 footer y497..536, 긴 제목·resize·내용 축소와 끝 행 focus도 확인합니다.
4. 검색 IME·query 수정·결과 변경·빈 결과·오류·늦은 응답을 검증합니다.
   미제공 상태는 제품이 정의한 palette/동작/테스트 근거를 별도로 기록합니다.
5. 행 main action, 모델, filter, more, footer 탐색 각각이 한 번만 동작하는지 확인합니다.
   disabled/숨김 target에 focus·callback이 남거나 하위 조작이 행 선택을 일으키지 않아야 합니다.
6. Tab/Shift+Tab·↑/↓·Enter/Space·Escape·focus 복귀·스크롤 노출과 접근성 이름을 실제 채택 패턴으로 확인합니다.
   footer 힌트가 제품 구현과 맞는지도 확인합니다.
   추천형·검색형 모두 hover 진입/이탈 중간 배경을 확인하고 검색형 프로젝트·채팅 행도200ms로 전환되는지 검사합니다.
   main action의 키보드 focus는 내부 네모 outline 없이 행 전체의 inset2px ring 한 곳에 표시되어야 합니다.
   pointer가 같은 행에 있으면 ring이 사라지고 hover 배경만 남으며, model·more·filter의 독립 focus는 계속 보여야 합니다.
   disabled의 hover/focus 차단·reduced-motion 즉시 전환·forced-colors 시스템색 focus와 마지막 행의 ring 가시성도 검사합니다.
7. 선택만으로 draft·IME·첨부·agent/project가 초기화되거나 요청이 자동 송신되지 않게 제품 명령을 검증합니다.
8. mapping·실행한 lint/typecheck/test/build·시각/보조 기술 결과를 로컬 채택 문서에 기록합니다.
   확인한 source와 public export가 있을 때만 `implemented`로 변경합니다.

이 저장소의 검증은 문서·의존성·정적 Figma 조합·자산·TeamAI 전달을 확인합니다.
제품의 실제 선택·검색 API·모달 상태·focus trap·화면 렌더가 구현됐다고 주장하지 않습니다.
