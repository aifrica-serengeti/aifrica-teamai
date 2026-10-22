# AgentHubFileIcon — 검증

6개 variant의 전체 SVG와 출처·해시를 보존했습니다. 실제 제품의 MIME adapter·렌더링·상호작용은 미검증입니다.

- 6종을 한 화면에서 44px로 표시하고 원본과 비교합니다. 8px sheet offset·radius 6·border 1이 유지돼야 합니다.
- pdf의 fill glyph, archive의 22px glyph와 각 색상이 일반 Icon 규칙으로 바뀌지 않았는지 확인합니다.
- 같은 SVG가 여러 번 나오는 목록에서 gradient·clipPath ID 충돌과 잘림을 확인합니다.
- 제품이 지원하는 확장자·MIME, 불일치·누락·미지원 type과 이미지 실패를 확인합니다.
- 파일 유형 텍스트·label, keyboard·focus·disabled, light/dark·zoom을 확인합니다.
- 제품 source/export를 확인한 뒤 로컬 구현 mapping을 채웁니다.
