# AgentHubActionBar — 구현 연결

다음은 **제품 제안 recipe**입니다. 실제 consuming repository의 source/public export는 확인하지 않았습니다.
공용을 켠 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 함께 적용합니다.

## 기존 공용 의미를 보존합니다

소비 제품의 ActionBar와 public export를 찾아 선택 owner·실행·keyboard가 호환되는지 확인합니다.
시각 차이를 theme/adapter로 연결할 수 있으면 연결하고, 불가능하면 Agent Hub 범위의 wrapper를 만듭니다.
공용 전체 ActionBar의 inverse 배경·치수를 일괄 수정하지 않습니다.

외부의 선택 개수/문구, 명령 배열, 명령별 enabled, onClearSelection을 받는 것은 가능한 제품 API 제안입니다.
Figma의 action1~5 Boolean과 제품의 실제 action model을 혼동하지 않습니다.
내부 Action/IconAction 부품은 부모 모듈에 응집하고 소비 제품 architecture 규칙에 맞춰 types를 분리합니다.

```text
목록 owner: selection, permissions, pending, command handlers
└─ AgentHubActionBar: size48/40, count 표시, 슬롯 조립
   ├─ Action: size32/28, leading16 + label
   ├─ IconAction: size32, glyph20
   └─ Divider: h16, 선1, 좌우8
```

실제 버튼에는 native disabled를 연결하고 시각 disabled enum만 전달하지 않습니다.
고유 명령 id를 key로 유지하여 count/권한 변경 중 focus가 불필요하게 remount되지 않게 합니다.
파일 삭제나 채팅 열기를 part 안에 하드코딩하지 않습니다.

## geometry와 자산을 연결합니다

일반 action은 size32에서 explicit height32와 중앙 정렬을 사용합니다. 생성 padding4+line20만으로 높이를
계산하면28px가 되므로 metadata와 [parts](./parts.md)의 차이를 보존합니다.
bar40에서 일반 action만28px이며 more/close는32px입니다.
bar가 clip되면 focus outline이 잘리므로 inverse 표면·부품 focus의 clip 소유권을 별도로 확인합니다.

원본 glyph는 [자산 대조](../../references/components-refresh.assets.json)의 `sourceAsset`으로 찾고
[실측 JSON](../../references/cards-actions-refresh.figma.json)의 `actionBar.assetSlots`에서 실제 로컬 경로를 확인합니다.
원본16px inverse/stroke1px와20px/stroke1.25 아이콘을 일반 AgentHubIcon/다른색 SVG로 임의 대체하지 않습니다.
icon-action의 token 이름24와 표시20px 차이를 지워서도 안 됩니다. 문맥의1.25 값을16px SVG에 추가해 두껍게 만들지 않습니다. 조합 action2와 size48 more의 paint 예외는 [parts](./parts.md)의 원본 파일을 연결하고, 전역 currentColor로 덮어 지우지 않습니다.

색상200ms ease·reduced motion은 [동작](./behavior.md)을 적용합니다.
hug/fill960·fixed 배치·overflow 정책·등장/퇴장 timing은 원본 설명과 제품 선택을 구분해 로컬 문서에 기록합니다.
실제 source와 export 검증 전에는 공유 매핑을 구현 완료로 바꾸지 않습니다.
