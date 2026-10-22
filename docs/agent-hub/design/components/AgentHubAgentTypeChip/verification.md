# AgentHubAgentTypeChip — 검증

Figma `agent-types`의 네 variant를 확인한 문서입니다. 실제 제품 렌더링·source/export·상호작용은 미검증입니다.
[실측 기록](../../references/agent-type-chip.figma.json)과 [스타일](./styles.md)을 기준으로 제품에서 확인합니다.

- assistant·workflow·runtime·common-chat이 올바른 유형·라벨·색상으로 연결되는지 확인합니다.
- 네 유형 모두 높이20·radius4·좌우패딩8·최대폭200·12/16/600을 유지하고 테두리·그림자가 없는지 확인합니다.
- assistant·workflow는 HUG이며 현재68px, runtime·common-chat은 고정68px인지 확인합니다.
  네 유형에 일괄 고정 폭을 적용하지 않습니다.
- assistant 글자가 #3B82F6, common-chat 글자가 #1E232E인지 확인합니다.
  공용 blue/default 글자색이 섞이지 않아야 합니다.
- 미지원·누락 유형을 assistant로 조용히 바꾸지 않는지 제품의 데이터 매핑을 확인합니다.
- 긴 라벨·번역·200% 확대에서 한 줄 말줄임과 전체 유형 이름의 접근성을 확인합니다.
- Chip이 Tab 순서나 선택 동작을 만들지 않는지, 유형을 색과 텍스트로 함께 전달하는지 확인합니다.
- assistant 텍스트의 약3.29:1 대비를 포함해 실제 접근성 기준을 검토하고 조정이 필요하면 채택 근거를 기록합니다.
- dark·disabled·선택·닫기·아이콘을 이 네 variant에서 확인한 것으로 표시하지 않습니다.
  추가 채택 시 근거와 상태별 검증을 별도로 남깁니다.
- 기존 제품 Chip의 호환성을 먼저 확인하고 실제 source/public export를 찾은 뒤 로컬 구현 매핑을 채웁니다.

공용 원본 변경 후 `npm run verify`와 `npm test`를 실행합니다. 이 검증은 문서·catalog의 정합성을 확인하며
제품의 시각 일치나 접근성 통과를 대신하지 않습니다.
