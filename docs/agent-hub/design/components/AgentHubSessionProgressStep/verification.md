# AgentHubSessionProgressStep — 검증

- 실제 done/active/pending 세 원본과 label/index TEXT·connector Boolean·기본 done/3/true를 확인합니다.
- standalone286×32·indicator20·gap8·label x28과 마지막 connector=false의20px 높이를 대조합니다.
- connector wrapper20×12/py4와 실제 Divider17×4/px8/선1×4 #DDD를 구분합니다.
- label14/20·400·done/active #1C1C1C와 pending #8F8F8F, 실제 TRUNCATE/ENDING·maxLines null을 확인합니다.
- 원본 관찰값으로 done circle1C/흰 check0.875, active fill3B82F6/inside4 CCE0FF, pending EEE/index8F8F8F를 비교합니다.
  현재 active 표시에는 아래 채택 검사를 적용하며 원본의 정적 하늘색 테두리를 다시 노출하지 않습니다.
  저장된 strokeWeight만 보고 done/pending circle에 border를 추가하지 않습니다.
- 부모의 done1/active2/pending3/pending4와 마지막 connector=false를 실제 인스턴스·source와 비교합니다.
- index를 표시하는 것은 pending뿐이며 기본 문자열이나 샘플 단계 수를 업무 규칙으로 고정하지 않습니다.
- active에 임의 회전·펄스·timer가 없고 pending이 disabled 컨트롤로 바뀌지 않는지 확인합니다.
- 읽을 수 있는 단계 상태·전체 label·장식 숨김·선택적 aria-current·상위 공지 owner를 실제 제품에서 검증합니다.
- 여러 자리 index·긴 label·번역·zoom·재정렬·상태 전환과 제품 lint/typecheck/test/build를 확인합니다.
- 검증한 source/public export만 로컬 mapping에 기록합니다. 정적 그림·조합 match는 실제 작업 실행 완료의 증거가 아닙니다.

## 채택 halo 검증

- [모션 제안값](../../motion.md)의1600ms/ease-out/scale1→1.08→1.6/opacity0→.6→0과 파란 중심12px 고정을 확인합니다.
- active 이미지·wrapper가20×20px이고 해당 이미지에만 `circle(6px at 50% 50%)` clip이 적용되는지 확인합니다.
  원본 SVG·manifest·실측 JSON은 그대로이며 done/pending의 그림·치수는 바뀌지 않아야 합니다.
- 파동층을 일시 숨긴 비교에서 중앙 반지름6px 밖의 고정 하늘색 annulus가 남지 않아야 합니다.
  배경·border·shadow나 또 다른 이미지 레이어로 정적 테두리를 복제하지 않았는지 함께 검사합니다.
- 최대 overlay32px에도 행32/마지막20·glyph 위치·label·connector가 이동하지 않고 중첩 가림이 없는지 확인합니다.
- done/pending 전환·unmount에서 파동이 남지 않는지 확인합니다.
- reduced-motion·forced-colors·print에서는 파동이 없고 active clip이 유지되어 파란 중심만 남아야 합니다.
  중간 프레임·루프 경계·동작 줄이기 전환에서도 중심·label·상태 설명이 사라지지 않는지 확인합니다.

- 0/160/352/1200/1599ms와 다음 cycle0ms를 확인해 시작·끝의 opacity가0이고22%까지 점차 나타나는지 확인합니다.
  반복 경계에서 지름이 돌아가도 보이는 ring이 순간 생성되지 않고, 파란 중심12px와 행 배치가 계속 고정이어야 합니다.
