# AgentHubButton — 접근성

공용 Button의 native semantics·keyboard·focus·disabled 기준은 시각 확장 후에도 유지합니다.

- 버튼은 label로 동작을 알 수 있어야 합니다. leading/trailing SVG는 label과 의미가 겹치면 장식 처리합니다.
- keycap은 실제 단축키 힌트로만 사용하고 label이 중복 낭독되지 않게 합니다. 실제 등록된 단축키만 접근성 메타데이터에 연결합니다.
- Enter/Space 활성화와 실제 `disabled`를 유지합니다. disabled 색상만 바꾸거나 `aria-disabled`만 붙여 동작을 남기지 않습니다.
- 링크로 표현해야 하면 링크 의미와 목적을 유지하고 공용 Button의 disabled anchor 처리도 적용합니다.
- Figma에 focused variant가 없더라도 focus 표시를 제거하지 않습니다. 공용의 1px outline·1px offset 기준과
  focus 이동을 유지하고, 제품 surface에 맞는 semantic 색상으로 검증합니다.
- 24/28px 시각 높이만으로 hit area를 충족했다고 간주하지 않습니다. 주변 간격·타깃 크기·zoom을 제품에서 확인합니다.

이 문서는 Figma의 실제 색상을 보존하며 대비 통과를 보증하지 않습니다.
작은 글자, primary의 흰 글자, secondary pressed의 흰 아이콘, ghost overlay와 keycap 대비를 실제 surface에서
검사하고 필요한 조정은 명시적인 제품 디자인 변경으로 기록합니다. 원본 수치를 조용히 변경하지 않습니다.
