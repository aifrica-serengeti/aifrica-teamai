# 페이지 공통 상태와 안전 정책

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 List, Create, Detail에 공통으로 발생하는 권한, 없음, 오류, 파괴적 작업, 저장하지 않은
변경사항을 다룬다. 도메인의 권한명과 API 응답은 각 솔루션이 소유하지만 사용자에게 드러나는
상태 구분과 책임 경계는 통일한다.

## 공통 상태 모델

| 상태            | 판단 주체         | 기본 표현                   | 허용 action                        |
| --------------- | ----------------- | --------------------------- | ---------------------------------- |
| invalid route   | page boundary     | 잘못된 접근 안내            | 안전한 목록·홈 이동                |
| initial loading | query/page        | content 영역의 status       | 중복 조회 차단                     |
| ready           | page              | 정상 content                | 권한과 resource 상태에 따른 action |
| empty           | page              | 목적을 설명하는 empty state | 권한이 있으면 create action        |
| filtered empty  | page              | 조건에 맞는 결과 없음       | filter 초기화·수정                 |
| forbidden       | route/page policy | 접근 권한 없음              | 안전한 이전 위치 이동              |
| not found       | query/page        | 존재하지 않음               | 목록 이동·필요 시 재조회           |
| initial error   | query/page        | 오류와 retry                | retry·안전한 이동                  |
| revalidating    | query/page        | 기존 content 유지 + overlay | 중복 refresh 차단                  |

`empty`, `forbidden`, `not found`, `error`를 같은 “데이터 없음” 화면으로 합치지 않는다. 단, resource
존재 여부 자체가 민감한 제품은 보안 정책에 따라 forbidden과 not found 문구를 동일하게 만들 수
있으며, 이 결정은 page가 임의로 하지 않고 인증·API 정책을 따른다.

## 화면별 Table 크기

- 상세 페이지의 본문·탭·연결 자원 목록과 Dialog 내부의 표는 공용 `Table size="small"`을 명시한다.
- 별도 목록 페이지의 주 Table은 `size="medium"`을 유지한다.
- Table 크기는 사용하는 화면이 지정한다. Dialog shell의 size와 내부 Table의 size는 독립적으로 선택하며,
  공용 Table의 기본값이나 cell padding을 CSS로 바꿔 간접 적용하지 않는다.
- 새 화면과 이후 수정하는 상세·Dialog에 이 기준을 적용한다. 기존 전체 메뉴의 일괄 변경은 별도 범위다.

## 권한

1. route 접근 권한은 router 또는 page boundary에서 확인한다. 하위 Button에만 권한 처리를 맡기지 않는다.
2. 사용자가 역할상 수행할 수 없는 action은 숨긴다. 일시적으로 불가능한 action은 disabled로 두고
   Tooltip 또는 주변 문구로 이유를 설명한다.
3. 권한 확인 전 destructive/mutation action을 잠깐 노출하지 않는다.
4. 프론트 권한은 UX 제어이며 보안 경계가 아니다. API가 같은 권한을 다시 검증해야 한다.
5. 권한 오류 후에는 원래 content나 민감 값을 stale cache로 계속 노출하지 않는다.

### 메뉴 CRUD action 표기

- 메뉴 권한으로 제어할 실제 action trigger에는 `data-menu-action="Create|Modify|Delete"`를 지정한다.
  `Read`는 route/page boundary가 담당하며 조회 UI마다 속성을 반복하지 않는다.
- 목록의 등록·추가와 상세의 하위 자원 추가는 `Create`, 상세 편집 진입·저장과 변경 action은 `Modify`,
  삭제 trigger·삭제 확인 action은 `Delete`로 표기한다.
- 아이콘 이름이나 버튼 문구만으로 권한을 추론하지 않는다. 새 action을 추가할 때 의미에 맞는 속성을
  명시하고, 권한이 없는 action은 app shell policy가 portal을 포함해 숨긴다.
- 가이드 검증은 negative action의 권한 표기 누락과 취소·닫기 같은 안전 action의 잘못된 표기를 실패로
  처리한다. 확인 Dialog에서는 결과 action에만 `data-menu-action`을 지정한다.
- 버튼을 숨기는 처리는 UX 보조 수단이다. create/edit route 차단과 API의 서버 권한 검증을 함께 유지한다.

## Empty와 검색 결과 없음

- 최초 데이터가 없으면 무엇이 비어 있는지와 다음 행동을 설명한다. create 권한이 있을 때만 CTA를 둔다.
- filter/search 결과가 없으면 “등록된 데이터 없음”으로 오해하지 않게 현재 조건을 포함하고 초기화 action을 제공한다.
- Table의 행을 가짜 placeholder 데이터로 채우지 않는다. table header 유지 여부는 List pattern을 따른다.
- empty state를 error처럼 `role="alert"`로 읽지 않는다. 비동기 결과 갱신 안내가 필요하면 적절한 live region을 사용한다.

## 오류와 retry

- 사용자 문구에는 수행 중이던 작업, 실패 결과, 다시 할 수 있는 행동을 포함한다.
- 서버 원문, stack, request ID 전체를 일반 사용자에게 그대로 출력하지 않는다. 운영 추적 ID가 필요하면 별도 copy 가능한 값으로 제공한다.
- mutation 실패 시 사용자가 입력한 draft를 보존하고 같은 요청을 자동으로 반복하지 않는다.
- retry는 동일 요청을 새로 시작하며 pending 동안 중복 실행을 막는다.
- 인증 만료, 권한 없음, validation, conflict, network failure를 모두 일반 오류 하나로 처리하지 않는다.

## 확인 다이얼로그 공통 프로필

생성·저장·수락·승인·거절·취소·삭제·권한 변경·동기화·재실행처럼 action을 실행하기 전에 사용자의
명시적 의사결정이 필요한 Dialog는 공용 [Dialog](./components/Dialog/README.md)의 **Confirmation
profile**을 사용한다.

- geometry는 **400px**인 `size="small"` shell이다. Confirmation은 새 Dialog size가 아니며, 좁은 화면에서는
  공용 `max-width: calc(100vw - 32px)`로 좌우 16px 여백을 유지한다.
- title과 한 줄 권장·최대 두 줄 description, medium footer action으로 구성한다. 입력·선택·목록·표 또는
  긴 영향 설명이 필요하면 Medium 이상의 Workflow Dialog를 사용한다.
- description에는 대상과 영향을 설명하는 실제 문구를 항상 제공한다. 공용 Dialog는 빈 문자열·공백·빈
  native wrapper를 안전 문구로 대체하지만, 이를 도메인 문구 대신 사용하지 않는다.
- 화면별 copy나 Button 개수에 맞추려고 360px, 420px 같은 임의 너비를 만들지 않는다. 긴 번역은 먼저
  의미를 보존해 줄이고, confirmation 구조를 벗어나면 적절한 Dialog size로 재분류한다.
- 안전한 action은 tertiary이고 최초 focus를 받는다. 일반 결과는 primary, 되돌리기 어렵거나 위험한 결과는
  negative를 사용한다. 결과 Button은 `확인`이 아니라 `생성하기`, `승인`, `거절`, `삭제`, `동기화`처럼
  실행 결과를 나타낸다.
- page가 action intent, open, pending, mutation과 dismiss 정책을 소유한다. 닫기, Escape, backdrop은 결과
  action을 실행하지 않는다.
- 저장·작성 취소는 [Edit Confirmation Dialog](./components/EditConfirmationDialog/README.md)를 재사용한다.
  승인·거절·삭제처럼 의미가 다른 action은 save/cancel intent로 변환하지 않고 Dialog와 Button을 조합하되
  같은 400px geometry를 사용한다.

단순 완료 알림이나 단일 닫기만 있는 짧은 정보도 generic Small 400px을 사용한다. Confirmation profile은
명시적 결과 action이 있는 경우에만 적용한다.

## 파괴적 작업

삭제, 강제 종료, 권한 박탈, 복구 불가능한 초기화는 일반 저장 확인과 구분한다.

- 현재는 공용 [Dialog](./components/Dialog/README.md)와 negative [Button](./components/Button/README.md)을
  page에서 조합한다. 동일 계약이 둘 이상의 domain에서 검증되면 별도 공용 destructive dialog로 승격한다.
- title에 구체적인 action, 설명에 대상 이름·영향·복구 가능 여부를 적는다.
- 기본 focus는 안전한 취소 action에 둔다. 닫기, Escape, backdrop은 확인으로 처리하지 않는다.
- pending 동안 confirm 중복 실행과 임의 dismiss를 막고 진행 상태를 문구로 드러낸다.
- destructive confirmation도 위 공통 Confirmation profile의 400px 폭과 좁은 화면 좌우 16px 여백을
  그대로 사용한다.
- detail의 delete preflight/mutation 실패는 본문 inline error를 추가하지 않고 viewport 우상단 error Toast로
  알린다. Toast wrapper의 투명 영역은 pointer event를 받지 않고 error는 기본 5초 auto-close/개별 닫기를 가진다.
- 대량·고위험 작업의 대상 재입력은 제품 정책이 요구할 때만 사용한다. 단순 삭제마다 습관적으로 요구하지 않는다.
- 성공 후 목록·상세 cache를 갱신하고 대상이 사라졌다면 stale 상세 화면을 유지하지 않는다.

## 저장하지 않은 변경사항

`dirty`는 화면에 입력 이벤트가 있었다는 뜻이 아니라 정규화된 원본과 현재 draft가 다르다는 뜻이다.

1. page가 original과 draft, `dirty`, submitting을 소유한다.
2. footer cancel, Header back, 앱 내부 route 이동은 같은 discard confirmation 정책을 사용한다.
3. browser 새로고침·탭 닫기는 `beforeunload`의 browser 기본 경고를 사용한다. custom 문구 표시를 가정하지 않는다.
4. 저장 성공, 명시적 discard, 초기값으로 완전히 되돌린 경우 guard를 해제한다.
5. submitting 중에는 이중 navigation을 막고, 요청 실패 시 draft와 guard를 유지한다.
6. navigation guard hook은 여러 menu에서 재사용할 수 있지만 Dialog open state와 실제 이동 intent는 page가 소유한다.

## 공통 상태를 컴포넌트로 승격하는 기준

문구만 같은 화면을 즉시 공용 컴포넌트로 만들지 않는다. layout, action slot, semantics, 상태 API가 둘
이상의 domain에서 동일하게 검증되었을 때 가장 가까운 shared 계층으로 승격한다. 권한명, route,
API error type은 공용 UI prop에 직접 넣지 않고 page가 사용자용 상태로 변환해 전달한다.

## API 성공·실패의 공용 알림

참여 요청·계정 변경·저장 성공과 조회 옵션·재조회·저장 실패 같은 일시적 API 결과는 앱 NotificationProvider의
NotificationToast로 전달한다. 기존 floating 목록은 NotificationToastGroup으로 같은 스택에 연결한다.
공용 layer는 Dialog(50) 위인 60이며 새 알림 때문에 포커스를 이동하지 않는다. 모든 메뉴에 중복 fixed
wrapper를 만들지 않는다. 재시도 버튼은 페이지/다이얼로그에 남겨 알림 종료 후에도 복구할 수 있게 한다.
최초 로딩의 오류 화면·권한/없음/빈 상태·필드 검증·작성 중 draft·기존 결과와 중복 요청 방지는 유지한다.
가입 완료 같은 전용 결과 화면과 작업 ID에 연결된 장기 실행·부분 반영·중복 실행 방지 안내는 유지한다.
토스트 소스는 탭/보기 방식/dialog 개폐가 아니라 해당 요청 상태를 소유하는 페이지 수명에 맞춘다.
재요청 시작 시 이전 피드백을 해제해 같은 문구의 새 결과도 알리되, 단순 재렌더는 닫힌 알림을 되살리지 않는다.
API 원문·비밀번호를 알리지 않으며 HTTP client에서 성공/실패를 일괄 발행하지 않는다.
[전체 호출 조사와 유지 기준](./api-error-notifications.md)에 분류 근거를 기록한다.
