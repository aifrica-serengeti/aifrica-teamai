# List Content State 시각 규칙

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- Card 결과의 surface presentation은 결과 영역 전체 너비와 남은 세로 공간을 사용하며 최소 높이는
  360px이다. ScrollArea content → page content → result region은 `min-height: 100%`와 flex grow를 끊지 않는다.
- `var(--surface)`, `var(--border-default)`, 8px radius로 Card 결과 frame을 유지한다.
- `embedded`는 border·surface·padding을 만들지 않고 부모 Table frame의 body viewport를 사용한다.
- 내용은 중앙 정렬하고 regular density의 icon, copy, action 사이 간격은 16px이다.
- regular density는 32px icon, 18/28px semibold title, 14/20px subtle description을 사용한다.
  Card와 Medium Table이 이 규격을 사용한다.
- compact density는 24px icon, 14/20px semibold title, 12/16px subtle description과 12px 간격을
  사용한다. Small Table에만 사용하며 action control의 크기와 클릭 영역은 바꾸지 않는다.
- 두 density 모두 copy 최대 폭은 480px이다.
- action은 `Button size="small" variant="tertiary"`를 사용한다.
- 로딩 placeholder도 같은 frame과 최소 높이를 유지해 layout shift를 막는다.
