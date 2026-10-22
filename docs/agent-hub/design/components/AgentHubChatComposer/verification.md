# AgentHubChatComposer — 검증

- [외부 텍스트 reveal 검증](./external-text-motion.md)의 예시 주입·같은 값 재주입·빠른 교체·IME 중 취소·media 대안을 확인합니다.
 400ms는 시각 효과에만 쓰며 첫 프레임부터 textarea.value와 전송 payload가 원문 전체여야 합니다.

Figma 네 구성의 구조·원본 인스턴스·실제 override·변수 mode·자산을 확인했습니다.
[조합 대조](../../references/chat-composer-composition.json)는 하위 원본·치수·glyph·override의 정적 비교이며 실제 앱 동작 검증이 아닙니다.

- 네 surface가768×58px·radius9999·white·1px INSIDE #DDDDDD이며 typing만 HUG인지 확인합니다.
  padding L8/R20/T12/B12와 layout 포함 border로 내부 x9/y13·738×32px가 유지돼야 합니다.
- 동일 navy Overflow 두 shadow의 순서·blur1/8·alpha.12/.16·offset0·spread0를 비교합니다.
  후속 채택에 따라 입력 focus에서도 기본1px 선·shadow가 같고 추가 파란 border·ring이 없는지 확인합니다.
- native textarea는16/24px·400, placeholder#757575·값#1C1C1C입니다. 공용84px·radius4·border·padding을 중복 적용하지 않습니다.
  caret 사각형·focus 전후4px 추가 밀림·가짜 입력이 없는지 확인합니다.
- 첨부4개는 `3104:20`과 plus/24, 전송4개는 `3104:21`과 arrow-up/24 source인지 확인합니다.
  모두32px 원형·glyph24/선1.5이며 전송의 중립·파랑 override를 독립 Attach `state5`로 바꾸지 않습니다.
- 유형 Chip은 일반 Chip `2079:11964`의 보라색 override이며 AgentTypeChip 원본이 아닙니다.
  Chip leading/trailing은 없고 description은 숨겨져 있으며 제목·Divider 외곽17×12px와 내부 여백을 정확히 조합합니다.
- 프로젝트 FRAME은 x9/y62·102×28px 샘플입니다. 원본 folder20→실제16/선1/#555 전용 export와 라벨12/16px를 비교합니다.
  surface58px 밖의 프로젝트 행까지 최소90px 배치 공간이 확보되고 다음 콘텐츠와 겹치지 않아야 합니다.
- 실제 value 변경·IME·Enter/Shift+Enter 정책·단일 submit·pending 중복 차단·disabled/read-only·파일 선택 취소·실패 복구를 제품 계약으로 검증합니다.
- label·버튼 이름·Tab·native 키보드·focus-visible·팝업을 채택한 경우 Escape/복원·확대에서의 clipping을 확인합니다.
- 긴 입력·다중 줄·긴 agent/project 이름·mobile·dark·파일 미리보기·업로드·stream·새 상태는 추가 제품 검증 대상입니다.
  이번 네 정적 샘플의 검증 범위를 확대하지 않습니다.
- [구현 순서](./implementation.md)에 따라 실제 source/public export를 확인하거나 새로 개발한 뒤 로컬 mapping을 채웁니다.
  문서·SVG 전달만으로 `implemented`로 기록하지 않습니다.

## 입력 adapter 채택 검증

- [focus 채택](../../motion.md) 후 마우스 클릭·Tab 진입 모두 textarea의 안쪽 사각 ring과 바깥 pill의 추가 ring이 없는지 확인합니다.
  기본1px #DDDDDD 선·두 shadow·입력 높이·caret는 유지하며, 전역 textarea focus CSS가 안쪽 ring을 다시 만들지 않아야 합니다.
- 버튼 Tab focus는 독립 유지하고 textarea label/id/ref·값·선택·복사·readOnly/disabled·IME·Enter/ShiftEnter·단일 submit을 다시 확인합니다.
- Composer58px/내부32px/프로젝트28px·원형32/glyph24와 두 원본 shadow가 adapter로 변하지 않는지 비교합니다.
