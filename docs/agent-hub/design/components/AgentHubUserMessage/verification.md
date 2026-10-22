# AgentHubUserMessage — 검증

Figma message/user의 chat·agent·schedule 세 표시 구성을 확인했습니다.
[조합 대조](../../references/message-user-composition.json)는 실제 원본과 시각 일치 범위를 기록하며 앱 동작 검증이 아닙니다.

- 대상이 사용자 발화이며 세 kind를 assistant·sending/failed·retry·feedback 상태로 바꾸지 않는지 확인합니다.
- 일반·에이전트·schedule 안쪽 버블은 p10/16·radius12·#F4F4F4, 실제 border·shadow 없음인지 확인합니다.
  본문16/24px·400·#1C1C1C, 샘플 높이44px와 HUG 폭211/346px를 비교합니다.
- 원본 clipping은 기록으로 보존하되 긴 메시지·줄바꿈·URL을44px에서 숨기거나 삭제하지 않습니다.
  제품이 채택한 높이 증가·긴 토큰·좁은 폭 정책과 전체 텍스트 선택·복사를 검사합니다.
- agent Chip 원본은 일반 Chip `2079:11964`이며 h20/max200/px8/r4/12·16·600·#FAF5FF/#9333EA입니다.
  실제 라벨 ‘에이전트’를 workflow로 매핑하거나 AgentTypeChip 원본 재사용으로 표시하지 않습니다.
- 제목14/20px·600, Chip과 gap8, 메타118px·Divider 외곽17×12px·본문 x135는 샘플과 비교합니다.
  Chip leading/trailing은 없고 description은 숨김 상태입니다. 원본 없는 여백이나 transparent border를 더하지 않습니다.
- 숨김 arrow 세 개는 이름24·원본16·저장 box19.2px를 구분해 기록하고 실제 렌더링·action·추가 glyph 의존성으로 만들지 않습니다.
- schedule 외곽은 투명/r0/세로gap8/오른쪽 정렬이며16px 상태 행과44px 버블로 샘플68px 높이가 되는지 확인합니다.
  안쪽 버블은 FRAME의 스타일 일치이며 chat 인스턴스 재사용이 아닙니다.
- schedule 시계는 원본20→실제12px·선0.75·round·#555555의 전용 자산, 상태 문구는12/16px·400·#555555인지 확인합니다.
  원본20px 아이콘을 강제로 CSS 축소하거나 문구를 예약 실행 성공으로 바꾸지 않습니다.
- 세 텍스트 속성의 연결과 실제 제품의 본문·에이전트 이름·예약 문구를 확인합니다. 예시 라벨·길이를 고정하지 않습니다.
- 발화자 이름·본문 읽기·장식 숨김·중복 live 안내 방지·동적 갱신 시 focus 보존을 실제 제품에서 확인합니다.
- timestamp·avatar·복사 조작·Markdown·assistant 응답·dark/mobile·송신 lifecycle은 미제공 범위입니다.
- [구현 가이드](./implementation.md)에 따라 기존 구현을 연결하거나 새 export를 개발한 후 실제 source/public export만 로컬 mapping에 기록합니다.
  문서·자산 전달만으로 `implemented`를 선언하지 않습니다.

## 외부 텍스트 모션 검증

- [공통 reveal 검증](../AgentHubChatComposer/external-text-motion.md)의 새 본문·청크 추가·빠른 대체·감소 모션을 수행합니다.
- textContent·복사 결과가 첫 프레임부터 원문 전체이며, 기존 prefix가 재생되지 않고 bubble·metadata·글자 위치가 이동하지 않아야 합니다.
- 같은 메시지를 짧은 본문·빈 값·새 revision으로 바꿔 이전 조각·mask·완료 handler가 남지 않는지 확인합니다.
- 기존 plain text·sender·kind·한 곳의 공지 owner를 유지하며 별도 assistant renderer 완료로 표시하지 않습니다.
