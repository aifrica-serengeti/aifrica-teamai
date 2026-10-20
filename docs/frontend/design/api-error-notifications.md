# API 성공·실패 피드백 계약

이 문서는 원본의 제품별 호출 목록과 line audit를 제거하고 재사용 가능한 알림 수명·복구 원칙을 추출했다.
구체적인 domain·승인 상태·polling 주기·배치·알림 정책은 솔루션에서 매핑한다.

## 피드백의 의미

| 상황 | 표현 | 유지할 상태 |
| --- | --- | --- |
| 최초 조회 실패 | ContentState 또는 ListContentState + retry | shell·접근 가능한 복구 action |
| background refresh 실패 | 마지막 성공 content + 하나의 알림 | 기존 결과·query·selection·사용자 입력 |
| mutation 성공/실패 | 공용 Notification 계약으로 결과 안내 | submitting 종료·field/server error·후속 정책 |
| field 검증 실패 | control과 연결된 field error | draft·첫 오류 focus·입력 보존 |
| 권한/없음/선택 불가 | 지속되는 ContentState/help | 원인과 다음 행동 |
| 장기 실행·부분 성공·충돌 | page-owned 작업 상태 | 중복 실행 차단·재시도/rollback·결과 확인 |

일시적인 요청 결과와 지속 업무 상태를 같은 toast 수명으로 처리하지 않는다. 같은 오류를 inline과 toast에서
동시에 live announce하지 않는다. 성공 알림의 필요성과 위치는 솔루션 정책으로 정하고 컴포넌트 내부에서
API 결과를 추측하지 않는다.

## 수명과 단일 owner

- page/query/mutation owner가 알림 event identity와 revision을 결정한다. 탭·Accordion·Dialog의 재마운트가
  기존 실패를 새 사건으로 등록하지 않도록 conditional subtree보다 안정적인 위치에 owner를 둔다.
- 알림 닫기는 query·draft·작업 guard를 지우지 않는다. 새 요청 실패와 기존 메시지의 단순 rerender를 구분한다.
- Provider는 렌더링·개별 닫기·timeout·callback cleanup을 소유하고 도메인 상태·polling을 소유하지 않는다.
- 사용자가 retry했을 때 중복 요청을 막고 pending state와 `aria-busy`를 전달한다. 닫힌 trigger·이동한 route에
  포커스를 강제로 돌리지 않는다.
- modal에서 알림을 클릭할 수 있어도 dialog focus·dismiss 계약이 깨지지 않아야 한다. pointer-events와
  z-index·portal layer는 소비 솔루션의 overlay mapping을 따른다.
- timeout·auto-close·stack 최대높이·위치는 baseline으로 채택한 경우에만 사용하며 접근성·작업 중요도에 맞춰 검증한다.

## 비동기 작업

실행 접수·승인 대기·실제 실행·완료·실패를 별도 상태로 모델링한다. status 조회 실패를 완료로 추정하지 않는다.
route/session을 벗어나면 timer/request를 정리한다. 과거 완료 이력을 매 진입마다 새로운 성공 알림으로
반복하지 않는다. Polling 주기는 솔루션 API·부하·업무 요구를 근거로 정한다.

## 보안·접근성·검증

사용자에게 복구 가능한 문구를 보여 주되 raw server message·stack·token·secret을 노출하지 않는다.
필드 오류는 control의 `aria-describedby`와 연결하고, 오류 announcement는 한 owner가 담당한다.
실패→retry pending→성공, route 변경·late response, dismiss, conditional remount, 장기 실행의 부분 실패,
keyboard·screen reader·reduced motion을 확인한다.

상세 API와 pointer/focus 동작은 [Notification](./components/Notification/README.md),
confirmation은 [Dialog](./components/Dialog/README.md), 페이지별 복구는 [페이지 정책](./page-policies.md)을 따른다.
