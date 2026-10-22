# AgentHubGlobalHeader — 동작과 상태의 책임

실제 Figma에는 단일 기본 배치만 있고 route·click reaction·상태 enum이 없습니다.
‘치타 플랫폼 바로가기’ 문구와 bell 모양은 제품 동작을 연결할 단서이며 목적지·popup 종류·새 창 정책을 확정하지 않습니다.

| 대상 | 제품 owner가 정할 사항 |
| --- | --- |
| 서비스 로고 | 정적 식별자인지 실제 home 링크인지, 이동 목적지와 현재 route |
| 바로가기 | 실제 href 또는 한 action callback, 같은 창/새 창, 권한과 실패 처리 |
| 알림 | 열 대상, open 상태·실제 controls ID, unread 데이터와 갱신 정책 |
| shell | header 위치·가용 폭·scroll·sticky·반응형·다른 landmark와의 관계 |

실제 URL로 이동할 때는 native anchor를, 상태를 바꾸거나 패널을 열 때는 native `button type="button"`을 사용합니다.
단순 브랜드 식별자에 빈 href·`href="#"`·임의 home route·불필요한 Tab 정지를 만들지 않습니다.
각 action은 하나의 host와 하나의 경로로 실행합니다. wrapper와 내부 아이콘에 같은 callback을 중복 등록하거나
native button의 click과 keydown에서 같은 작업을 다시 호출하지 않습니다.

알림이 메뉴·dialog·popover 중 무엇을 여는지 확인한 뒤 그 계약으로 focus·Escape·닫힘·복귀를 연결합니다.
실제 팝업이 없는데 `aria-haspopup`를 정하거나 임의 계정 메뉴·알림 drawer를 만들지 않습니다.
열림 상태는 해당 제품 owner 하나가 소유하고 header에 같은 상태를 복제하지 않습니다.
바로가기와 알림의 pending·disabled·권한 차단은 제품 추가 상태이며 채택 시 native 상태와 handler guard를 함께 검증합니다.
원본에 badge가 없으므로 미확인 알림 dot·숫자를 기본으로 표시하지 않습니다.

숨겨진 Divider·Breadcrumb·chip은 기본 렌더에서 제거합니다. 노출 옵션이 필요하면 제품 요구·추가 Figma 근거와
각 요소의 의미·실제 source를 확인한 뒤 로컬 계약으로 추가합니다. 숨김 자식의 좌표를 현재 기본 header의 여백으로 사용하지 않습니다.

774×43은 기본 fixture입니다. 협소 폭에서 로고를 임의로 줄이거나 텍스트를 잘라 문제를 숨기지 않습니다.
기존 로고 박스의 넘침과 두 action의 접근성을 함께 점검하고, wrap·높이 증가·축약·별도 메뉴는 제품에서 명시적으로 채택합니다.
계정·tenant·검색·SNB collapse·route API·세션 API는 이 헤더가 소유하지 않습니다.
