# AgentHubAttachIconButton — 검증

Figma Light mode 5개 variant의 치수·상태색·변수·아이콘 원본을 확인했습니다.
실제 Agent Hub 앱의 source/export·브라우저 동작은 아직 미검증입니다.

- 5종 모두 32×32px, radius 9999px, padding/gap 0, 중앙 정렬인지 확인합니다.
- 모든 상태의 border·shadow가 없고 전체 opacity가 1인지 확인합니다.
- 24px `AgentHubIcon`의 원본 plus와 1.5px round stroke를 보존하고 공용 xlarge 기본 20px로 돌아가지 않는지 확인합니다.
- transparent·검정 5%·검정 10% 배경을 실제 surface에서 비교합니다. 기본 아이콘 `#1C1C1C`, disabled `#AAAAAA`를 확인합니다.
- `state5`만 배경 `#3B82F6`·아이콘 `#FFFFFF`인지 확인하고, 이를 일반 pressed나 모든 원형 버튼에 확장하지 않습니다.
- `state5`를 채택하면 의미·상태 owner·진입/해제·disabled 우선순위·접근성 mapping이 제품 문서에 있는지 확인합니다.
- label·Tab·Enter/Space·실제 disabled 차단·폼 제출 방지·focus-visible·Tooltip 한 개 조합을 확인합니다.
- 파일 선택/메뉴의 실제 동작, 취소 이후 focus, 권한·검증·중복 요청 차단을 제품에서 확인합니다.
- 타깃 크기·간격·zoom·대비와 focus 잘림을 검사합니다. dark/focus/loading의 미확인 시각 값은 근거와 함께 정합니다.
- 검증한 source/export만 로컬 mapping에 기록합니다. 문서·디자인 snapshot의 전달을 구현 완료의 증거로 취급하지 않습니다.
