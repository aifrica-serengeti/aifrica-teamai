# AgentHubBrandMark — 검증

원본 PNG2048×2048의 SHA-1은 Figma image hash `9ad483e40603da8c651c65af6fb5bace9c698cdd`와 같습니다.
원본 자산 확인과 소비 앱의 source/export·접근성·레이아웃 검증은 구분합니다. 실제 제품 구현은 해당 제품에서 확인합니다.

- 원본 PNG와 asset-manifest의 hash·bytes가 바뀌지 않았는지 확인합니다.
- 실제 src가 원본 PNG인지,180·96·32px 등 표시 크기에서도1:1 비율·투명도·방향과 예약 공간이 유지되는지 봅니다.
- 사용자 요청에 따라 브랜드 마크 animation·회전·장식 광택·재생 제어가 없고 공개 입력이 size·label·className·style인지 확인합니다.
- ThinkingStatus의32px 마크도 정적 원본을 사용하며 글자 shimmer나 실제 요청 상태가 마크를 움직이지 않는지 봅니다.
- 의미 있는 label은 한 번만 읽히고 장식 이미지에는 빈 alt를 사용하는지 확인합니다. 마크에 불필요한 Tab 정지점이나 live 안내를 추가하지 않습니다.
- 동작 줄이기·강제 색상·인쇄·밝고 어두운 배경에서도 원본과 이름·레이아웃이 유지되는지 확인합니다.
- [복원 SVG](../../assets/brand/agent-hub-mark-layered.svg)와 [파생 manifest](../../references/brand-mark.reconstruction.json)는 비교 기록으로 보존합니다.
  출처·추정 범위·hash가 유지되는지 확인하고 원본 벡터·정확한 레이어 복구·현재 실행 자산으로 표시하지 않습니다.
- TeamAI CLI 재수신 후 문서·원본·비교 자산의 일치를 확인합니다. fixture의 export 검증을 실제 제품 배포 완료로 보고하지 않습니다.
