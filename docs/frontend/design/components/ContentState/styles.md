# Content State 시각 규칙

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- detail surface의 최소 높이는 280px, list layout은 360px이다.
- surface는 `--surface`, `--border-default`, 8px radius와 32px padding을 사용한다.
- embedded는 부모 frame을 사용하므로 자체 border·surface·padding을 만들지 않는다. 부모가 높이까지
  소유하는 Table body 조합은 `layout="none"`으로 최소 높이를 제거한다.
- regular은 32px icon, 18/28px semibold title, 14/20px subtle description을 사용한다.
- compact는 24px icon, 14/20px title, 12/16px description을 사용한다.
- 아이콘 → copy → action 간격은 16px이며 compact는 12px이다.
- title과 description은 같은 copy 묶음 안에서 4px 간격을 사용한다.
- copy 최대 폭은 480px이며 긴 문자열을 줄바꿈한다.
