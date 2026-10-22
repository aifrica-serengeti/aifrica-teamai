# AgentHubDialog — 검증

기준일은2026-10-21입니다. [Figma 실측](../../references/dialog.figma.json),
[변수](../../references/dialog.variables.figma.json), [자산](../../references/dialog.assets.json)을 기준으로 비교합니다.
공용을 켠 환경에서만 `DOCS_ROOT/frontend/design/components/Dialog/verification.md`를 함께 적용합니다.
현재 문서 검증과 실제 consuming repository의 구현 검증을 구분하며 source/export는 `unmapped`, 설정은 `draft`입니다.

## 원본과 source 확인

- 원본은 두 FRAME이며 COMPONENT variant·open API·Header export·SLOT을 생성하지 않았는지 확인합니다.
- 예약580×554=header72+body394+footer88, Finder1296×800=header68+body732가 맞는지 비교합니다.
- r16/#F6F7F9/Overlay 두 겹과 예약 root·header의 실제 strokes=[]를 확인합니다.
  Finder root #EEE1·header bottom #DDD1은 layout 밖 선이며 내부 폭·시작 위치를 줄이지 않습니다.
- 닫기는 두 화면 모두 legacy32/r4/glyph24·선1.5px `2611:59907`/`2199:23685`입니다.
  AHIconButton32/r6/glyph20으로 source identity를 바꾸거나 stale plus 이름을 쓰지 않습니다.
- Finder Show icon-button=false는 BACK만 숨기고 CLOSE는 보입니다. 생략된 숨김 subtree와 실제 visible=false를 구분합니다.
- 새 시안의 scrim·동작·dark·confirmation·전체 state matrix를 측정했다고 주장하지 않습니다.

## 예약 작업 편집

- 532px 내부·gap24·name64·textarea164·frequency74·advanced20과 각 y0/88/276/374를 확인합니다.
- textarea140·r8·toolbar y103/h37·layout 포함 top1·content y5를 비교합니다.
  세 ghost28의12/16·600·leading/trailing glyph16과 모델 FRAME을 구분합니다.
- 빈도 card50=24+24+2·r12·내부 x13/y13/506×24를 확인합니다.
  숨겨진 시간 두 번째 행·info·resize·inner scrollbar·body fade는 표시하지 않습니다.
- count wrapper31×20은 비어 있고 `0/100`은 숨김입니다. 없는 검증 기준이나 제한값을 추가하지 않습니다.
- footer FRAME과 실제 Button 두 source를 구분합니다. 취소60/저장88·40/r8/16·24·600을 비교하고
  disabled 저장 #99C2FF의 이유를 임의로 dirty·pending으로 단정하지 않습니다.
- 기존 footer p24에 p24 wrapper를 다시 넣지 않습니다. 취소 type=button·저장 submit 한 경로·native disabled를 검증합니다.
- legacy scrollbar11/4/r8을 Finder의 r9999와 구분하며 샘플160/180을 실제 비율로 고정하지 않습니다.
- 지침의 default·focus·invalid·read-only에서 전체140px/r8의 외곽선이 toolbar 아래까지 연속하는지 확인합니다.
  toolbar 위 #EEE1px·37px 높이와 본문103px는 유지하고 내부 사각형 ring·경계 중복·focus 전후 위치 이동이 없어야 합니다.
  toolbar 버튼에는 독립 focus를 표시하며 그 버튼 focus만으로 입력 외곽2px을 켜지 않습니다.
- 빈도 popup은 실제 AgentHubMenu 패널·MenuItem content를 조합해야 합니다.
  r12/py4px0/#DDD1px/Mid·28px option·pL16R12Y4와 hover #F8F8F8/pressed #F4F4F4의200ms 전환을 확인합니다.
  선택16px check와 `aria-selected`·단일 Select 키보드 의미를 유지하고 공용 파란 selected 면이 남지 않아야 합니다.
  150ms fade/slide6px·popup 자체 ScrollArea와 Escape 취소·상위 Dialog 보존·trigger 복귀를 검증합니다.

## 에이전트 찾기

- rail192/content1104·body732·p24를 비교합니다. rail168×32/r6·14/20·500·gap12를 확인하고
  직접 FRAME을 Menu·SNB source로 기록하지 않습니다.
- Search1064 FIXED/우측16과 결과1056/우측24를 각각 비교합니다. focused/r8/2px blue·filtered=false와
  숨김 filter/help text를 확인합니다. 실제 caret·accessible label을 장식 선·placeholder로 대체하지 않습니다.
- 카드15개가 source3095:20 default·344×166인지 확인합니다. 설명310×40/maxHeight40/HEIGHT/ENDING/maxLines null을 유지합니다.
  샘플 pin·tool·count·문구를 실제 서버 값이나 자동 실행 기능으로 고정하지 않습니다.
- fade는 IMAGE가 아닌 GRADIENT_LINEAR·1137×48/x−19/y684입니다. 원본 transform·opacity와 제품 변환을 구분합니다.
- Finder scrollbar3155:20473·gutter11/thumb4/r9999/opaque#DDD를 비교합니다.
  결과914px가 body732px 안에서 clipping으로 사라지지 않고 마지막 카드까지 실제 scroll이 가능한지 확인합니다.
- 바깥 Dialog body는 비스크롤 layout이며 rail과 header 좌표가 고정되는지 확인합니다.
  오른쪽 Search와 결과 콘텐츠를 함께 담은 AgentHubScrollbar만 실제 scrollTop이 변해야 합니다.
  안쪽 native overflow·바깥 scrollbar 이중 처리가 없어야 하며4px/#DDD thumb가 실제 viewport metrics를 따라야 합니다.
  wheel·PageDown·thumb drag·resize·마지막 카드 action focus에서 끝 항목과 focus가 보이는지 확인합니다.

## 실제 제품에서 검증할 항목

- 실제 public export·Content API·close adapter와 footer padding owner를 조사한 뒤 연결합니다.
  공용 문서의 예시 API를 CMP 실제 export로 사용하지 않습니다.
- 모달 이름·focus trap·초기 focus·Escape/외부 상호작용 정책·닫힘 후 trigger 복귀·background scroll lock을 확인합니다.
- controlled input/textarea·required/error 연결·IME·선택/복사·readOnly/disabled를 검사합니다.
  저장·취소·필터·카드·보조 action은 각 한 경로만 호출합니다.
- 요청 실패·응답 지연·중복 submit·stale 검색 응답·draft 보존과 닫힘 정책을 검증합니다.
  동적 알림을 여러 live region에서 중복 읽지 않습니다.
- 200% zoom·협소 viewport·긴 label·긴 지침·마지막 focus 대상·모바일 키보드·scroll/fade를 검증합니다.
  fixed sample·clipping을 콘텐츠 손실로 복사하지 않습니다.
- 기존 motion·Presence와 reduced-motion 대체를 실제 제품에서 확인합니다. CMP source에 없는 전역 reset을 이미 제공됐다고 기록하지 않습니다.
- 제품 lint/typecheck/test/build와 실제 브라우저 검증을 통과한 뒤 source/public export·token·예외 범위를 로컬 mapping에 기록합니다.
  이 문서 작업 자체로 실행 컴포넌트·제품 기능이 완성됐다고 표시하지 않으며 serengeti 원본은 수정하지 않습니다.

## 추가 회귀 검사

진입/퇴장 중간 opacity·scale, 닫힘 완료 후 trigger focus, 닫는 중 재열기와 reduced-motion 변경을 확인합니다.
폼3종의label·오류·필수값·read-only/disabled·IME·단일선택 취소/Escape/focus를 검사합니다.
전용 이름을 지정하지 않은 예약 Dialog 요청도 공용 registry fallback 탐색으로 이어져야 합니다.
