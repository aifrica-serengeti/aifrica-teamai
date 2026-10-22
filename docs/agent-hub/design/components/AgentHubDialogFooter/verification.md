# AgentHubDialogFooter — 검증

- [실측](../../references/dialog-footer.figma.json)의 COMPONENT `3151:20373`와 root 속성 `cancel#3151:0` BOOLEAN/true를 확인합니다.
  cancel visible 참조를 실제 노출에 연결하고, root에 label·pending·callback·SLOT이 있다고 기록하지 않습니다.
- root580×88·폭 FIXED/높이 HUG·HORIZONTAL·MAX/MIN·NO_WRAP·padding24·gap8을 대조합니다.
  fill/stroke/effect 없음·radius0·opacity1·clipping false와 실제 선 없는 border-layout metadata를 구분합니다.
- cancel x378/y24·81×40, confirm x467/y24·89×40과 오른쪽24px를 확인합니다.
  81+8+89=178px·높이24+40+24=88px를 대조하고580/81/89px를 모든 제품 데이터의 고정 폭으로 쓰지 않습니다.
- 실제 source는 cancel `3025:25006` tertiary40 enabled, confirm `3025:24940` primary40 enabled입니다.
  공용 Dialog 자체의 Figma 인스턴스나32px 버튼으로 대체해 기록하지 않습니다.
- 두 Button의 radius8·높이40·px16/py4·gap4, label16/24·600·자간0·x16/y8을 확인합니다.
  label49/57px는 샘플이며 실제 textAutoResize/truncation metadata와 긴 문구의 제품 정책을 구분합니다.
- cancel white/#1C/inside1px #DDD, confirm #3B82F6/white·실제 stroke 없음과 두 버튼의 border-layout false를 확인합니다.
  선을 레이아웃에 더해 cancel 폭83px·label x17로 바꾸거나 root에 phantom border를 추가하지 않습니다.
- [변수 기록](../../references/dialog-footer.variables.figma.json)의 radius·button fill/border/text binding과 실제 paint를 비교합니다.
- 숨김 leading/trailing plus20 INSTANCE4개의 source `3018:24932`와 visible=false를 확인합니다.
  자식 Vector visible=true를 이유로 다시 표시하지 않습니다. keycap=true 속성값과40px keycap 자식 부재도 구분합니다.
- 기존 Dialog footer가 이미 padding24/gap8/우측 정렬을 소유하면 action만 전달합니다.
  footer 안의 padding24 wrapper·중첩 footer·중복 inside 선을 추가하지 않습니다.
- cancel=false의 DOM·Tab·gap 제거와 남은 결과 Button 정렬을 실제 제품에서 검사합니다.
  취소 숨김은 dismiss 잠금·pending·요청 취소가 아니며 별도 false 시안은 미측정입니다.
- 한 action당 한 native host·한 callback을 확인하고 폼 submit 경로와 button onClick이 같은 요청을 중복 실행하지 않는지 검사합니다.
  실제 disabled·권한·pending·실패·결과 적용·닫힘·draft 보존은 제품 owner의 정책으로 검증합니다.
- 실제 Dialog 이름/설명·초기 focus·Tab/Shift+Tab·Enter/Space·Escape·scrim/header 닫힘·닫힌 뒤 복귀를 확인합니다.
  footer 하나가 전체 Dialog의 modal·portal·focus trap·닫힘 정책을 새로 소유하지 않습니다.
- 긴 문구·번역·큰 글자·좁은 폭·zoom·Body 스크롤에서 두 action과 focus outline이 잘리지 않는지 검사합니다.
  hover/pressed·disabled·focus·loading·negative·dark·취소 숨김 조합·단축키·모션은 채택한 근거로 추가 검증합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build·실제 render/API·입력 검증 후 source/public export를 로컬에 기록합니다.
  검증 전에는 `unmapped`/`draft`를 유지하고 공용 Dialog·ProgressAlert·PickerFooter·FlyoutFooter와 serengeti 원본을 일괄 변경하지 않습니다.

이 검증은 단일 Light footer와 실제 Button 재사용을 출발점으로 합니다.
정적 geometry·원본 존재는 실제 제품의 비동기 요청·form 제출·접근성·닫힘 완료를 증명하지 않습니다.
