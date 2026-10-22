# Agent Hub 최종 구현·전달 검증

2026-10-22의 사용자 요청을 기준으로 공용 계약·Agent Hub 확장·React 테스트 앱을 대조했습니다.
실제 Agent Hub 제품 배포나 모든 Figma 상태의 픽셀 단위 승인 기록은 아닙니다.

## 독립 검토와 보정

문서 계약, 실행 코드, TeamAI 전달·게시 구성을 각각 읽기 전용으로 검토했습니다.
Textarea toolbar가 예약 Dialog의 조상 selector에 의존하는 차이를 발견해, 배경 #F4F4F4·padding4/8·위 #EEE1px을
Textarea 자체 스타일로 옮겼습니다. Dialog 밖 단독 조합에서도37px 높이와 같은 paint를 확인했습니다.
갤러리의 계약 개수는 고정 숫자 대신 실제 수신 registry 길이를 사용합니다.

최종 사용자 결정에 따라 브랜드 마크는 정적 원본 PNG만 사용하며, 모션 renderer·광택·재생 제어는 없습니다.
Menu의 hover 우선 focus 정책은 유지하고 전역 focus outline의 중복만 제거합니다.

## 실행 검증

- 원본 `npm run verify`: 문서 링크,51개 공용·63개 솔루션 계약과 의존성,7개 스킬,9개 역할·솔루션 조합,3개 schema를 검사합니다.
- 원본 `npm test`:57개 테스트를 통과했습니다. 공용 묶음 해제와 backend·다른 솔루션 namespace 격리를 포함합니다.
- 변경한 design-system·frontend-workflow 스킬은 frontmatter 검사도 통과했습니다.
- 실제 TeamAI CLI0.27.0으로 격리 Git snapshot에서 init/pull/doctor를 실행했습니다.
  문서1,404개·규칙3개와 Codex/Claude 각각7개 스킬의 수신 및 문서·자산 byte 일치를 확인했습니다.
- fixture의59개 실제 export·4개 부분 공용 adapter·331개 원본 자산·1개 복원 SVG를 검사했습니다.
  타입·포맷·계약 테스트·프로덕션 빌드도 통과했습니다.

## 브라우저 회귀 경로

[최종 관찰값](../test/agent-hub-component-test/evidence/final-publication-review.json)에서 실제 조작 결과를 확인할 수 있습니다.

- Search·Composer 내부 outline 제거, Filter Chip의 선택 전후 폭·인접 좌표 고정, count 배경 전환,
  Checkbox native 선택과 Mark transform 고정, 정적 브랜드 마크를 확인했습니다.
- Menu keyboard focus+hover의 바깥 outline 제거와 기존 hover 우선 정책을 확인했습니다.
- Flyout 폴더 빠른 접기·펼치기, 마지막 항목 focus·스크롤, Header/Footer 고정과 Header 소유 구분선을 확인했습니다.
- 예시 선택은 원문 전체를 Composer에 채우고 focus를 복귀합니다. Session track은 둥근 모서리를 피한 상하16px 안쪽이며
  Session·OutputViewer는 공용 ScrollArea 엔진을 사용합니다.
- 빈도 Select는 pointer open에서 keyboard active가 없고, Tab·Shift+Tab에서 popup만 닫히며 Dialog는 유지됩니다.
  read-only와 disabled의 입력·toolbar·Select 차단을 구분해 확인했습니다.
- 에이전트 찾기 Dialog는 native scrollbar를 숨기고4px thumb를 사용합니다.

중간 프레임·reveal·shimmer·halo·반복 조작의 이전 검증과 제품 적용 후 점검은
[상호작용 점검표](../test/agent-hub-component-test/INTERACTION-CHECKLIST.md)를 함께 확인합니다.
브랜드 모션 관련 과거 evidence는 이전 시안이며 현재 정적 계약의 근거로 사용하지 않습니다.

TeamAI 원본 문서 갱신은 소비 프로젝트의 구현 코드를 자동 수정하지 않습니다. 제품에서는 최신 지침을 받은 뒤
해당 source/export·상태·접근성 계약을 연결해 검증해야 합니다. `serengeti-cmp`는 읽기 전용 비교 근거로 유지했습니다.
