# AgentHubSessionContextItem — 검증

2026-10-21의 [실측](../../references/session.figma.json)과 [조합 대조](../../references/session-composition.json)를 비교합니다.
원본·문자열·자산 match는 실제 컨텍스트 조회·변경·팝업 구현의 검증이 아닙니다.

- `2987:22151`의 네 state, label/value/count TEXT와 icon INSTANCE_SWAP 기본 book-open/16을 확인합니다.
- 282×32·px4/py8·r6·root gap4/CENTER·clipping false·border/shadow 없음을 비교합니다.
- content262px/gap8·label-group66px/gap4·icon16·label12/16/600·value12/16/400·count12/16/400을 확인합니다.
  value는 FILL/ENDING/maxLines1, label/count는 말줄임 제한 없는 HUG이며 저장 clipping과 제품의 정보 접근 정책을 구분합니다.
- label/count/icon #757575·value #1C1C1C, default 투명·hover 검정5%·pressed 검정10%·selected #EBF3FF를 확인합니다.
- 실제 Panel의 첨부파일/볼륨/지식/도구/스킬 다섯 default source 재사용과 count5/2/5/5/3을 구분합니다.
  두 번째 실제 label ‘볼륨’을 설명 문구의 ‘작업 폴더’로 강제 교체하지 않습니다.
- 기본 book-open `2833:17122` 및 실제 file-text `2762:73887`, folder `2037:4537`, wrench `2833:16795`, scroll-text `2986:22091`을 확인합니다.
  [자산 기록](../../references/session.assets.json)의 native16 export·paint·선1/1.25와 원본별 파일을 연결합니다.
- 대표 value와 count를 실제 선택 ID·전체 목록·개수 제한·권한으로 추정하지 않습니다.
- 실제 FILL 폭·긴 value/label/count·번역·zoom·focus-visible·전체 읽기 이름·단일 callback·disabled guard를 검사합니다.
- 제품이 후속 팝업을 채택했다면 별도 trigger·ARIA·focus 복귀를 검증합니다. Flyout 자동 열기나 고정 route를 원본 기능으로 주장하지 않습니다.
- 추가 focus/disabled/loading/read-only/dark/mobile·교차 상태는 별도 채택 범위로 남깁니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build를 마친 뒤 실제 source/public export만 로컬 mapping에 기록합니다.
  검증 전 `unmapped`/`draft`를 유지합니다.

## 긴 대표 value 표시 회귀

- 짧은/긴/빈 value, 한국어·영문·확장자, 큰 count·selected·좁은 폭·value 교체·resize·폰트 로드 후 실제 overflow를 확인합니다.
- [현재 채택](../../title-overflow.md)의36px/s linear·대기100ms·복귀200ms ease·흐림24px를 확인합니다. 짧거나 긴 overflow 모두 같은 속도이며 재진입에도 남은 거리로 시간을 계산하고 최소 시간을 두지 않습니다.
- 기본 오른쪽 흐림·이동 중 양끝·끝의 마지막 글자 표시를 확인하고 icon·label66px·count·행·focus ring 좌표가 고정되는지 비교합니다.
- 행의 hover와 keyboard focus가 같은 value 이동을 제공하고 별도 Tab 정지점·중복 원문·title 기본 툴팁이 생기지 않아야 합니다.
- 빠른 재진입·focus 중 pointer 이탈·disabled·unmount·reduced-motion 변경에서 잔상·지연 완료·남은 listener가 없어야 합니다. forced-colors·print에서는 이동과 mask를 제거합니다.
- click·Enter·Space 활성화가 한 번만 발생하고 count·선택·컨텍스트 popup·focus 복귀·Panel scroll과 충돌하지 않아야 합니다.
- 원본 ENDING/maxLines1과 신규 채택값·실제 브라우저 결과를 구분하며 공개 props와 공유 unmapped/draft 상태를 바꾸지 않습니다.
