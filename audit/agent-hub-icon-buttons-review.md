# Agent Hub IconButton 확장 검증

검증일: 2026-10-20. 대상은 Figma file `cUKHT2PdHjAKRXZlzulnO5`의
일반 IconButton `2427:25105`와 원형 첨부 IconButton `3104:27`이다.
get_design_context 렌더링과 읽기 전용 Plugin API로 구조·geometry·paint·binding·glyph 원본을 확인했다.

## 보존한 차이

| 대상 | 공용 대비 확인한 차이 |
| --- | --- |
| 일반 32px | radius4 → 6. 아이콘20px·선1.25는 유지 |
| 일반 24px | radius4·아이콘16 유지, 선은 공용1.25 → Agent Hub1 |
| 일반 20px ghost | 공용 tiny 아이콘12/패딩0 → 아이콘16/사방패딩2·선1 |
| 일반 primary | 공용에 없는 추가 variant. 배경 #3B82F6/#0066FF/#0056D6/#99C2FF, disabled glyph는 #AAAAAA |
| 일반 active | ghost/outlined의 별도 #EBF3FF 배경, glyph #1C1C1C. pressed와 구분 |
| 첨부 버튼 | frame32·radius9999·glyph24/선1.5, 외곽선 없음 |
| 첨부 state5 | 파랑 #3B82F6/흰 glyph의 시각 값만 확인. 실제 의미·진입/해제·ARIA는 미정 |

일반은33개, 첨부는5개 조합이다. 미제공 primary active·20px outlined/primary, dark/focus/loading 색상을 추정하지 않았다.
alpha overlay는 검정5%/10%, outlined 선은 inside1px 검정10%이며 부모 회색 surface를 합성하지 않았다.
focus·keyboard·native button·disabled·명확한 label·Tooltip의 공용 의미 계약은 유지한다.

## 결과와 배포 경계

- [추가 catalog](../docs/agent-hub/design/component-registry.json)의 두 고유 id로 등록했다.
  공용51 + Agent Hub7 = 58이며 실제 source/export는 모두 `unmapped`다.
- `aifrica-design-system` 스킬은 솔루션 실측 기록에서 radius·실제 border·glyph·alpha·지원 조합을 읽고
  의미 미정 상태를 제품 mapping 전에 단정하지 않도록 연결했다. 중복 솔루션 스킬·새 역할을 만들지 않았다.
- [실측 기록](../docs/agent-hub/design/references/README.md)에38개 variant와 변수33개의 alias/mode를 보존했다.
  raw와 node id·geometry·radius·paint 및112개 색상 token 바인딩이 일치했다.
- glyph source `2365:15015`, `3018:24932`, `2308:44299`는 이미 전달하는 plus16/20/24 SVG와 연결된다.
  임시 Figma asset URL을 제품 런타임 경로로 사용하지 않는다.
- `npm run verify`, `npm test` 15개, 변경한 SKILL의 `quick_validate.py`, `git diff --check`가 통과했다.
  신규 dependency closure·CMP/PaaS 격리·공용 해제 시 catalog 제외도 검사했다.
- 실제 TeamAI CLI0.27.0의 격리 init/pull에서 문서825파일 byte hash 일치,
  Codex·Claude 공용 스킬 각7개를 확인했다. 해제 후 각0개·공용 hook 제외·솔루션/회사 문서279파일 유지·자체 스킬 보존.
- 원본 `project.serengeti-cmp`는 clean이며 실제 사용자 홈 설정·제품 코드·Figma를 수정하지 않았다.

실제 앱의 렌더링·상호작용·접근성 통과는 별도 제품 검증 대상이다. 현재 로컬 자료의 임시 Git snapshot으로
배포를 검사했으며 원격 게시나 실제 Agent Hub 앱 구현 완료를 뜻하지 않는다.
