# AgentHubProgressAlert — 검증

2026-10-21의 Figma 단일 COMPONENT와 하위 인스턴스를 기준으로 합니다.
[조합 대조](../../references/progress-alert-composition.json)는 원본·수치·자산의 일치를 기록하며 실제 요청 동작 검증이 아닙니다.

- root `3016:102212`의 properties가 `{}`이고 별도 state enum이 없음을 확인합니다.
  ‘응답이 중단되었습니다.’와 두 enabled 버튼을 진행률·Spinner·취소·dismiss·Toast 상태로 바꾸지 않습니다.
- surface640×46px·r8·#F4F4F4·1px INSIDE #DDDDDD·shadow 없음·padding8/12·SPACE_BETWEEN·CENTER·최소 gap12를 비교합니다.
  root border가 레이아웃에 포함되어 안내 x13/y13, 버튼 그룹 x462/y9가 되는지 확인합니다.
- 안내 그룹153×20px·gap4, circle-alert20·stroke1.25·round·#1C1C1C,
  제목14/20px·600·#1C1C1C·샘플 폭129px와 실제 원본 `2898:23788`을 확인합니다.
- 두 버튼 원본은 모두 `3109:144` tertiary·28·enabled이며 radius4·white·1px inside #DDDDDD입니다.
  좌우 padding8·상하4·14/20px·600·#1C1C1C, 라벨49/76px와 버튼65/92px·그룹gap8을 비교합니다.
- 버튼의 `strokesIncludedInLayout: false`를 유지합니다. 레이아웃 border를 잘못 추가해 버튼67/94px·높이30px로 만들거나
  root의 레이아웃 border를 없애 높이를44px로 만들지 않습니다. inside 선이 중복 렌더되지 않는지도 확인합니다.
- 버튼 label TEXT property `label#3025:0` 연결과 leading/trailing/keycap false를 확인합니다.
  실제 label 외에 생성 코드의 숨김 slot을 내려받거나 렌더하지 않습니다. root 제목을 기존 TEXT property로 오인하지 않습니다.
- [기존 manifest](../../asset-manifest.json)의 circle-alert20 SVG를 그대로 연결합니다. 크기·선·도형·색상을 유지하며 새 SVG는 추가하지 않습니다.
- 640px와 라벨 폭은 샘플입니다. 긴 제목·번역·좁은 폭에서 제목이나 동작이 잘리지 않고,
  제품이 채택한 줄바꿈/다음 행 배치와 버튼28px·shrink0가 유지되는지 확인합니다.
- 클릭 한 번당 요청 경로 한 번, 대상 response/request의 일치·idempotency·pending guard·독립적인 disabled 조건,
  편집 시 draft 보존·실제 편집기 focus를 소비 저장소에서 검사합니다.
- native keyboard·보이는 focus·장식 아이콘 숨김·안내 한 번 읽기·상태 등장 시 focus 보존을 실제 문맥에서 검증합니다.
- 재시도/편집 요청 상태·추가 loading/disabled 조합·응답 stream·dark·반응형 완성 배치는 미검증 범위로 남깁니다.
- [구현 안내](./implementation.md)에 따라 실제 source/public export와 제품 검증 결과를 로컬 mapping에 기록합니다.
  문서·자산 수신만으로 `implemented`를 선언하지 않습니다.
