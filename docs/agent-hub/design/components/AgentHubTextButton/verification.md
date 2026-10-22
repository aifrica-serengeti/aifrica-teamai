# AgentHubTextButton — 검증

Figma 네 상태의 geometry·glyph source·상태색을 확인한 참조 계약입니다.
실제 제품의 구현·브라우저 렌더링·상호작용은 아직 미검증입니다.

- 높이24/radius4/패딩4/gap2/font12·16·600이 유지되는지 확인합니다.
- 보이는 trailing 아이콘이16px·선1px이며 공용 tiny의14px·선1.25로 바뀌지 않았는지 봅니다.
- 숨겨진14px leading instance가 UI나 레이아웃에 나타나지 않는지 확인합니다.
- 투명/#F8F8F8/#F4F4F4/투명 배경과 기본#1C1C1C·disabled#AAAAAA를 확인합니다.
- 모든 상태에서 실제 외곽선이 없고, 예시 폭48이나 label `text`가 고정되지 않았는지 봅니다.
- label·keyboard·focus-visible·disabled·폼 type·중복 요청 방지를 제품 동작과 대조합니다.
- 긴 label·번역·zoom·타깃 크기와 미제공 dark/focus/loading 정책을 제품에서 확인합니다.
- 검증한 source/export만 로컬 mapping에 기록합니다. 문서 배포와 실제 구현 완료를 구분합니다.
