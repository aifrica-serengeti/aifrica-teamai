# List Content State 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- [ ] Card 빈 결과 frame이 최소 360px을 유지하면서 결과 viewport의 남은 세로 공간을 끝까지 채우는가?
- [ ] title과 description이 각각 한 번만 노출되는가?
- [ ] filtered와 empty가 `data-kind`로 구분되는가?
- [ ] error만 `role="alert"`를 사용하는가?
- [ ] 일반 빈 결과에 PageHeader 등록 CTA가 중복되지 않는가?
- [ ] filtered reset과 error retry가 small tertiary Button인가?
- [ ] error retry pending 중 Button이 disabled이고 `aria-busy="true"`인가?
- [ ] Table은 헤더를 유지하고 `Table.emptyState`로 같은 icon·title·description·action을 embedded
      presentation에 전달하는가?
- [ ] Card와 Medium Table은 regular의 32px icon, 18/28px title, 14/20px description을 사용하는가?
- [ ] Small Table은 compact의 24px icon, 14/20px title, 12/16px description을 사용하면서 action
      클릭 영역과 상태 의미를 유지하는가?
