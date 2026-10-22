# AgentHubSessionSectionHeader — 동작

섹션별 collapsed·내용·count·명령은 SessionPanel 또는 해당 섹션 owner가 관리합니다.
Header 안에 별도의 펼침 상태를 두어 표시된 본문과 aria-expanded가 어긋나게 하지 않습니다.
toggle은 한 활성화 경로에서 접기/펼치기를 요청하며 title·wrapper에도 같은 callback을 중복 등록하지 않습니다.

collapsed=false는 펼친 본문, true는 접힌 본문에 명시적으로 연결합니다. 방향은 down/right 원본을 사용합니다.
접기 시 focus가 제거되는 본문 안에 있다면 부모가 유효한 위치로 복귀시킵니다.
empty 예시의 toggle=false는 버튼 부재이며 disabled 버튼이나 collapsed=true와 같은 뜻이 아닙니다.

action plus는 보조 명령의 표시입니다. 추가·새로 만들기·Picker 열기 중 무엇인지는 실제 제품의 한 명령에 연결합니다.
action이 toggle을 함께 실행하거나 Header 전체 선택·탭 이동·메뉴 열기를 자동 수행하지 않습니다.
count Boolean이 false여도 숨겨진 문자열 값은 존재할 수 있습니다. 제품 adapter가 실제 집계 의미와 표시 여부를 따로 제공합니다.
문구·개수 변경마다 live region·focus 이동을 자동 만들지 않습니다.

Boolean false branch는 컨트롤·glyph·Tab target·불필요한 gap까지 제거합니다.
원본의 기본값·filled/empty 예시는 화면 조립의 근거이며 서버 상태·권한·실제 명령 API를 정하지 않습니다.
접기 모션·추가 로딩/오류 상태가 필요하면 제품에서 채택하고 검증한 근거를 남깁니다.

## 채택한 회전과 본문 presence

[모션 채택](../../motion.md)에서는 동일 down glyph를 회전하여 최종 down/right 형상을 유지합니다.
collapsed의 단일 부모 값이 aria-expanded·glyph 회전·본문 표시를 함께 제어하고 + action은 별도 명령을 유지합니다.
본문 열기/닫기는 부모의 공통 disclosure helper가250ms ease로 처리합니다. Header에 별도의 expanded state나 timer를 만들지 않습니다.
