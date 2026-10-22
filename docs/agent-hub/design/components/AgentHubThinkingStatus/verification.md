# AgentHubThinkingStatus — 검증

기준일은2026-10-21입니다. [실측](../../references/chat-progress.figma.json),
[변수](../../references/chat-progress.variables.figma.json), [자산](../../references/chat-progress.assets.json)을 함께 확인합니다.
문서·정적 자산 비교와 제품 runtime 검증은 별개입니다. 실제 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- root3016:118106은 FRAME이며 COMPONENT state·props·source export가 없음을 확인합니다.
  실제 BrandMark INSTANCE3016:118107/source2611:74302와 하위 IMAGE RECTANGLE을 구분합니다.
- root136×32 HUG/HUG·gap8·세로CENTER·p0/r0/opacity1·실제 paint/border/shadow 없음·clippingfalse를 비교합니다.
  텍스트96×20·x40/y6·14/20·400·자간0·LEFT/CENTER와 문구 HUG를 확인합니다.
- 텍스트 opacity 원본0.6899999976158142와5개 gradient stop/alpha1/identity transform을 비교합니다.
  위치0/.25/.46963563561439514/.6842105388641357/.9149797558784485와 원본 회색 채널을 보존합니다.
  이 값은 원본 JSON·비교 표의 보존 검사이며 현재 소비 recipe가5-stop 배경을 그려야 한다는 뜻이 아닙니다.
  현재 기본 글자는 균일한 `#000`/opacity0.69이며 root·로고에 opacity를 중복 적용하지 않습니다.
- 같은 PNG imageHash·원본2048×2048·RGBA8·실제 표시32×32를 확인합니다.
  crop·filter·단색 mask·새 glyph·GIF/APNG·logo spin을 추가하지 않습니다.
- ‘생각하는 중 · 4초’는 표본입니다. controlled elapsedSeconds가 유한·0 이상인지 검사하고 Math.floor로 정수 초를 얻습니다.
  undefined·잘못된 값은 시간 suffix를 제외하며0초로 위장하지 않습니다. 기존 시간원을 주입하고 새 timer·4초 주기·자동 종료를 만들지 않습니다.
 1000ms 외부 cadence는 제안값이며, tick++ 대신 실제 경과값/시작 시각에서 다시 계산하는지 확인합니다.
- 현재 request ID/phase·시간·Header motion을 한 owner에서 연결하고 늦은 다른 요청이 현재 표시를 덮지 않는지 확인합니다.
  완료·중단·실패 후 표시 전환과 후속 UI는 제품이 정한 정책으로 검증합니다.
- 기본 로고는 정적이며 static/reduced-motion에서 고정된 밝은 얼룩 없이 균일한 상태 문구가 남는지 확인합니다.
  Header 흐름 요구를 BrandMark 회전으로 확대하지 않습니다. 글자 shimmer는 아래의 별도 사용자 채택으로만 연결합니다.
- text clipping 미지원·forced-colors·읽기 모드에서 단색 텍스트가 보이는지 확인합니다.
  지원 환경도 정적5-stop 배경을 남기지 않는지 확인하고 실제 배경 대비와 제품의 명시적 단색 대안을 함께 검증합니다.
- 상태 안내는 기존 transcript/semantic status 한 owner가 소유하고, 초마다 전체 문구를 live announce하지 않는지 확인합니다.
  장식 이미지 숨김·읽을 수 있는 상태 라벨·필요한 비-live 시간 확인·focus/scroll 보존을 검사합니다.
- 긴 라벨·큰 초 값·locale·200% zoom·협소 폭에서 문구를 고정136×32로 자르지 않습니다.
  dark·반응형 전체 상태·응답 본문·Markdown·streaming·timer 동작은 원본에서 검증되지 않았습니다.
- 빨간 설명/테두리3016:118112/113은 개발 주석이므로 제품 DOM·자산·읽기 순서에 넣지 않습니다.
- [구현 순서](./implementation.md)에 따라 실제 source/public export와 제품 검증 결과를 로컬 mapping에 기록합니다.
  새 스킬·제품 구현·전체 상태 matrix가 완료됐다고 표시하거나 원본 source/Figma를 수정하지 않습니다.

## 사용자 채택 검증

- [모션 채택](../../motion.md)의 주기적 두 띠가 왼쪽→오른쪽으로 흐르는지 중간 프레임을 확인합니다.
  타일50%·띠 폭28%·중심 간격50%·맑은 간격22%를 문구 폭에 비례해 계산하고1800ms/linear 반복 경계에 점프가 없는지 검사합니다.
  position0%→100%가 실제로 한 타일인0.5W를 이동하는지 확인합니다. 경계에 걸친 띠 조각은 허용하며 상시 온전한 봉우리2개를 요구하지 않습니다.
- static·읽기 모드·forced-colors·reduced-motion·print에서 장식층과 animation이 함께 없어지는지 확인합니다.
  기본/static/reduced는 `#000`/opacity0.69, readable/print는 `#1C1C1C`/opacity1, forced는 `CanvasText`/opacity1이며 모두 고정 배경·밝은 얼룩이 없어야 합니다.
  text clipping 미지원에도 균일한 기본 문구와 정적 PNG가 남아야 합니다.
- 로고/글자 레이아웃 흔들림, 초 변경마다 animation 재시작, 중복 AT 문구·내부 timer·이전 요청 시각층 잔존이 없는지 확인합니다.
- 긴 라벨·두 줄 배치·큰 경과값·좁은 폭에서 문구와 장식층의 line-height/줄바꿈을 맞추고 모드 변경 때 이전 띠가 남지 않는지 확인합니다.
- 주기·띠 폭은 Figma 실측이 아닌 채택 제안값으로 보고하며 원본 참조 JSON은 수정하지 않습니다.
