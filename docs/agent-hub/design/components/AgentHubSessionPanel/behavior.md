# AgentHubSessionPanel — 상태와 동작 소유권

Figma는 시각과 하위 인스턴스 조합을 제공합니다. 다음은 이를 제품에 연결할 때 지킬 책임 분리입니다.
열림·요청·자동 저장·대화 전송·파일 열기·읽음 처리까지 구현됐다는 뜻은 아닙니다.

| 상태/동작 | 소유자 | 연결 원칙 |
| --- | --- | --- |
| empty/filled 표시 | 제품의 Session 데이터 owner | 빈 데이터와 요청 중/실패를 구분 |
| 각 섹션 expanded | 패널 owner, section별 | section toggle만 해당 panel 표시를 변경 |
| 기록 expanded | history owner | 예약 섹션 전체 펼침과 분리 |
| 현재 실행 selected | 실행 조회 owner | 활성화된 실행의 자료를 조회하며 새 실행을 자동 시작하지 않음 |
| 실행 unread dot | 읽음 정책 owner | selected와 별도 값, dot만 보고 성공/실패 판단하지 않음 |
| progress status | 작업 진행 데이터 owner | done/active/pending은 표시 값, 클릭으로 작업 수행하지 않음 |
| 예약/출력/컨텍스트 활성화 | 각 제품 action owner | 한 입력에 한 intent, 실제 업무/API·권한·실패 처리는 owner가 연결 |
| 각 + action | 출력/컨텍스트 추가 owner | 섹션 접기를 함께 실행하지 않음 |

Figma empty는 출력·컨텍스트 빈 안내만 있는 완료된 빈 표시입니다. 네트워크 요청이 진행 중인 화면을
무조건 empty로 보여 주지 않습니다. loading/error/retry/권한 없음이 필요하면 제품 계약으로 추가하고 근거를 기록합니다.
예약·진행만 존재하거나 출력만 비어 있는 부분 조합은 두 패널 원본으로 전부 검증한 상태가 아닙니다.

SectionHeader의 toggle·+는 독립 형제 button으로 둡니다. 제목까지 펼침 trigger로 확장하는 경우
같은 toggle 경로를 사용하고 trigger 안에 +를 중첩하지 않습니다. 기록 toggle도 별도 경로로 연결합니다.
native button은 click에서 callback을 한 번 호출하고 Enter/Space keydown으로 같은 callback을 다시 실행하지 않습니다.
행의 glyph/label/wrapper에 동일 callback을 중복 등록하지 않습니다.

접은 영역의 콘텐츠는 focus와 보조기술 탐색에서도 숨깁니다. 단순 opacity0·height0으로 focusable 자식을 남기지 않습니다.
접기 전에 내부 focus가 있다면 해당 trigger로 옮기는 정책을 정하고, async 자료 변경 때
현재 focus를 이유 없이 첫 행으로 되돌리지 않습니다.

현재 실행 전환과 미확인 점 제거는 별도 이벤트입니다. 클릭 시 즉시 읽음, 조회 성공 후 읽음, 다시 읽지 않음 등은
제품이 정하는 정책이며 이 시안만으로 하나를 채택하지 않습니다. 실행 ID를 기준으로 상태를 저장하고
샘플 상대 시간 문자열을 key·정렬·날짜 파서로 사용하지 않습니다.

진행 목록은 읽기 전용 표시입니다. active를 Spinner로 돌리거나 진행률%, 단계 이동, 완료 Notification,
ProgressAlert 재시도, ChatComposer 전송을 자동 추가하지 않습니다.
자료 조회 변경·stream·실행 요청 수명은 제품 서비스가 소유하고 Session이 별도 경쟁 상태를 만들지 않습니다.

Panel은 overflowDirection=NONE·세로 HUG입니다. 그림만 받은 상태에서 스크롤 동작이 있다고 판단하지 않습니다.
제품 shell의 가용 높이가934px보다 작으면 접근 가능한 실제 scroll viewport를 연결하고 마지막 자료와 focus가 보이게 합니다.
Session의 접기 모션은 제공되지 않았습니다. Menu150ms나 CardAccordion250ms를 자동 적용하지 않습니다.

## 이번 요청의 명시적 채택

[모션 계약](../../motion.md)에 따라 공용 CardAccordion의250ms ease height와200ms ease glyph 회전을 명시적으로 채택합니다.
CardAccordion의56px Header·radius8·padding24·역할/단일 선택 API는 상속하지 않습니다. 각 section·history expanded는 기존 부모가 소유합니다.
공통 disclosure는 현재 본문 높이를 측정하고 closing subtree를 즉시 inert/aria-hidden 처리한 뒤 종료 시 제거합니다.
닫힐 영역에 focus가 있으면 유효 trigger로 먼저 복귀하고, 빠른 재토글·resize·reduced-motion에서도 이전 종료 처리가 새 상태를 덮지 않게 합니다.
height/maxHeight는 제품 shell 입력입니다. 기본 제한 없음과560px 소비 데모를 구분하고 외부 Gallery scroll로 내부 스크롤을 대신하지 않습니다.
제한한 패널의 track은 [곡면 회피 조립](./styles.md#사용자-채택-둥근-모서리를-피하는-scroll-track)으로 위아래16px 안쪽에서만 이동합니다.
고정 shell의12px와 content의4px를 분리하므로 스크롤 중에도 track이 곡면에 진입하지 않습니다.
wheel·키보드·track 클릭·thumb drag는 같은 실제 viewport 범위를 사용하며 마지막 항목과 focus의 접근 범위를 줄이지 않습니다.

### 대화 화면 첫 진입과 그림자 보존

제품의 대화 shell은 Session 내용과 바깥 reveal의 폭을 분리합니다. 내용은 첫 프레임부터 최종 가용 폭으로 배치하고, 바깥 shell만0→324px로 전환합니다.
일반 가용 폭에서는 내용320px를 유지하며, 더 좁은 main에서는 main 폭에서 오른쪽4px를 뺀 폭까지만 사용합니다. reveal의 중간 폭 때문에 빈 안내가 여러 줄이 됐다가 줄어드는 동작을 만들지 않습니다.
내용의 높이는 계속 HUG이며 기존 height/maxHeight·내부 scroll 계약을 유지합니다. empty154px는 원본 샘플이고 고정 높이·별도 측정 timer·업무 state를 추가할 근거가 아닙니다.
바깥 shell의 `overflow:clip`과8px `overflow-clip-margin`으로 reveal을 유지하면서 Mid shadow가 왼쪽에서 잘리지 않게 합니다.8px는 layout padding이 아닌 새 runtime paint 여유입니다.
폭 전환250ms ease는 신규 제품 제안값이며 내용의 진입·퇴장150ms ease/6px는 기존 popup 모션의 명시적 채택입니다. Figma의 Session 모션 실측으로 기록하지 않습니다.
열림·퇴장 presence·focus는 기존 부모 owner에 두고 공용 Disclosure·ScrollArea·Panel API나 section expanded 소유권을 변경하지 않습니다.
