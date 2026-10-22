# AgentHubOutputViewer — 검증

2026-10-21의 [실측](../../references/output-viewer.figma.json)·[변수](../../references/output-viewer.variables.figma.json)·
[자산](../../references/output-viewer.assets.json)·[조합 대조](../../references/output-viewer-composition.json)를 비교합니다.
단일 정적 COMPONENT의 원본 match는 consuming repository의 Viewer/renderer 동작 검증이 아닙니다.

- `3015:24221`은 단일 COMPONENT이며 title/type TEXT, 표시 Boolean3개 기본true, content SLOT의 실제 속성6개를 확인합니다.
  전체8개 Boolean 조합·Viewer state enum·파일 형식 enum이 제공됐다고 표시하지 않습니다.
- root540×977 FIXED·세로 padding/gap0·radius0·fills/strokes 없음·Mid·clipping false를 확인합니다.
  root의 저장 strokeWeight만 보고 외곽 선을 추가하지 않습니다.
- Header540×34·x0/y0·FILL/HUG·좌우16/상8/하4·사방1px INSIDE #DDD·#F6F7F9,
  TL/TR16·BL/BR0을 비교합니다.34=border2+padding12+콘텐츠20입니다.
- content는 실제 SLOT·children[]·x0/y34·540×943 FILL, 좌우8/상하16·gap24·white,
  top0/left1/right1/bottom1 #DDD·TL/TR0·BL/BR16·clipping true·overflow NONE인지 확인합니다.
  Header 하단 선과 본문 top 선을 중복하지 않습니다.
- Mid의 두 효과0/0/radius1/.31,0/4/radius6/.15·순서·같은 style ID를 확인합니다.
  실제 둥근 표면과 shadow 윤곽을 검사하고 root radius0을 무시한 사각 shadow나 Header/body 중복 shadow가 생기지 않게 합니다.
- title-area x17/y9·506×20·padding-right44, title-group HUG106×20·gap4를 비교합니다.
  title26+gap4+dot3+gap4+type69의 샘플 계산과14/20·600·#1C1C1C·자간0을 확인합니다.
- title/type은 원본 ellipsis·줄 수 제한이 없으며 dot3px/#AAA와 type이 같은 show type Boolean에 연결돼 있는지 확인합니다.
  false를 채택한 제품에서는 dot·type·빈 gap·불필요한 읽기 요소를 함께 제거합니다.
- actions ABSOLUTE·x483/y5·52×24·gap4, border를 포함한 외곽 기준 오른쪽5px와 CSS 안쪽 right4px를 구분합니다.
  show expand/close=false의 별도 완성 배치를 측정한 것으로 표시하지 않습니다.
- expand/close가 실제 ghost/default/24 source `2427:25108`·r4·glyph16/x4y4인지 확인합니다.
  actual maximize `3015:24201`·x `2311:46284`의 native16·선1px·round·#1C1C1C를 유지하며 잘못된 plus24 이름으로 대체하지 않습니다.
- [동작](./behavior.md)·[접근성](./accessibility.md)에 따라 단일 native button callback·각 조작 이름·focus-visible·닫힘 후 focus와
  실제 확대/표시 방식을 제품에서 검증합니다. modal·fullscreen·portal·resize를 원본에서 확인한 기능으로 추가하지 않습니다.
- 실제 파일 ID·조회·형식 표시·권한·내용 renderer·다운로드·편집·실패 처리는 제품 owner에 연결합니다.
  빈 SLOT과 MD/PDF 예시만으로 구현 완료·파일 실행·HTML/Markdown 기능을 선언하지 않습니다.
- 긴 제목/type·번역·좁은 폭·확대·본문 overflow·끝 내용/조작 접근·추가 상태를 검증합니다.
  원본977px에 긴 내용이나 focus를 잘라 넣지 않습니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build·실제 렌더·keyboard 결과를 확인한 뒤 source/public export를 로컬 mapping에 기록합니다.
  검증 전 `unmapped`/`draft`를 유지하고 serengeti 원본을 수정하지 않습니다.

## 채택 scroll 검증

- [채택 안내](../../motion.md)에 따라560px/확대720px에서도 header34px는 고정이고 본문만 움직이는지 확인합니다.
- 긴 본문·넓은 표·끝 링크에서 wheel/keyboard/drag/resize와 동적 thumb 비율·clamp를 확인합니다.
- close/expand false branch·확대 복원·닫기 후 원래 output trigger focus와 읽던 위치 정책을 함께 검증합니다.
