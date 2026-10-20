# Create 실행 가이드

논리 경로 `docs/frontend/design/patterns/CreatePage.md`와 `page-policies.md`를 읽고 solution/local create 확장을 합성한다.

1. page가 initial values, draft, touched, field/form error, submitting, confirmation과 success result를 소유한다.
2. initialization·draft·validated value·API DTO를 구분하고 submit 직전 adapter에서 trim/normalize/validate한다.
3. field·form section은 value/error/disabled/callback을 받고 route/service/page store를 몰래 읽지 않는다.
4. label/help/error association, required, readOnly/disabled, autocomplete, button type과 focus 이동을 설계한다.
5. 중복 submit을 막고 실패 시 입력을 보존한다. field error와 server/form error, 권한/충돌/네트워크 실패를 구분한다.
6. 성공 후 route 이동·초기화·현재 값 유지 정책과 성공 결과를 명시한다. step/wizard는 실제 업무 요구일 때 확장한다.
7. cancel·route 이탈은 dirty/unsaved-change 정책을 적용한다. confirm은 모든 단순 submit에 무조건 추가하지 않는다.
8. section/action 영역의 공용 역할을 유지하고 폼 필드·업무 payload·정확한 폭/색상은 solution에서 정한다.

검증에는 initial/draft와 payload 분리, invalid/valid 제출, server 실패와 입력 보존, double submit,
permission, dirty cancel/이탈, 성공 후 상태, keyboard/error focus와 실제 package checks를 포함한다.
