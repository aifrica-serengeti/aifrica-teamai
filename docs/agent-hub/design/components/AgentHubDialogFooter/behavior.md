# AgentHubDialogFooter — 취소와 결과 action의 책임

Dialog의 open·대상 데이터·입력 draft·검증·권한·pending·실제 요청·결과 적용·닫힘은 호출한 제품 owner가 관리합니다.
footer는 두 action의 배치와 표시를 연결하며 독립된 요청 상태나 Dialog open 상태를 만들지 않습니다.
Figma에 prototype reactions가 없으므로 버튼의 이름만으로 자동 실행·닫힘을 확인했다고 기록하지 않습니다.

cancel Boolean은 버튼의 노출만 제어합니다. false이면 해당 DOM·Tab target·빈 gap을 제거하고 결과 버튼은 우측 정렬을 유지합니다.
cancel을 숨겼다고 Escape·scrim·header 닫기를 함께 막거나 pending으로 처리하지 않습니다.
그러한 dismiss 정책은 공용 Dialog의 실제 공개 API와 제품 상태에 연결합니다. 별도 false 조립 화면은 미측정입니다.

취소 버튼의 실제 의미는 제품이 정합니다. 단순 닫기·작성 포기·이전 단계·요청 중단을 같은 동작으로 자동 취급하지 않습니다.
일반 취소는 결과 mutation을 실행하지 않고, 확인이 필요한 draft나 진행 중 요청이 있으면 기존 제품 정책을 적용합니다.
결과 버튼도 저장·생성·수락·삭제 등을 샘플 ‘confirm’에서 추정하지 않습니다.

한 action은 한 native host의 한 경로에서만 실행합니다. label·wrapper·glyph·추가 keydown에서 같은 callback을 중복 호출하지 않습니다.
일반 action은 `type="button"`과 한 callback을 사용합니다.
폼 제출을 채택하면 form의 한 submit owner에 연결하고, button onClick과 form onSubmit에서 같은 요청을 두 번 보내지 않습니다.
Enter/Space의 native 동작을 유지하고 기존 form을 중첩하지 않습니다.

confirm 활성화가 곧 Dialog 닫힘은 아닙니다. 성공 후 닫기·화면 갱신·오류 유지·낙관적 반영은 제품 owner가 명시적으로 결정합니다.
pending 중 중복 실행·권한 변화·요청 실패·취소 가능 여부는 같은 owner가 제어하며 실제 disabled와 handler guard를 연결합니다.
제공된 footer는 enabled 두 버튼뿐입니다. 추가 상태 시각은 하위 Button 계약과 제품 채택 근거를 따라 검증합니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Dialog/behavior.md`의 관련 focus·dismiss·스크롤 책임을 유지합니다.
Body만 스크롤하고 footer를 안정적으로 노출하는 기존 레이아웃을 보존합니다. footer의 높이 변경이 마지막 본문·focus를 가리지 않게 확인합니다.
이 원본으로 Dialog의 confirmation 정책·닫기/포털·모달 여부·전체 테마를 새로 정의하지 않습니다.

숨김 plus와 존재하지 않는40px keycap은 action·단축키가 아닙니다. Escape/Enter 전역 handler를 footer에서 자동 등록하지 않습니다.
단축키가 필요하면 해당 command와 Dialog의 실제 keyboard owner가 한 번 처리하고 입력·IME·다른 팝업과의 충돌을 검증합니다.
ProgressAlert의 재시도·Picker의 키 안내·Flyout의 설명 표시는 이 취소/결과 action과 다른 계약입니다.
