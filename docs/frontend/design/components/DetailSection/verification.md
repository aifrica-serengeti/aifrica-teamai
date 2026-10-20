# Detail Section — 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- [ ] 모든 의미 있는 상세 정보 card에 보이는 title과 한 문장 description이 있다.
- [ ] root의 `aria-labelledby`/`aria-describedby`가 각각 보이는 heading과 description id를 가리킨다.
- [ ] header divider와 body inset이 read/edit/loading에서 유지된다.
- [ ] header action 유무로 title 시작선이나 body 시작선이 바뀌지 않는다.
- [ ] title accessory가 제목 바로 뒤에 있으며 긴 번역과 좁은 폭에서 겹치지 않는다.
- [ ] title accessory에 상호작용 요소를 넣어 heading과 focus 순서를 혼동시키지 않는다.
- [ ] 긴 한글·영문, 좁은 폭, 200% zoom에서 title/description/action이 겹치지 않는다.
- [ ] light/dark에서 surface, border, text 대비가 유지된다.
- [ ] state/error/dialog/list item에 정보 card 규칙을 잘못 적용하지 않는다.
- [ ] 공용 component test와 소비 page의 대표 read/edit/loading test가 통과한다.

## 재현 잠금

제목과 설명은 필수이며 header는 20px×24px(좁은 화면 20px), body는 24px(좁은 화면 20px), divider는 1px다. page별 임의 header spacing이나 aria-only 제목으로 이 계약을 우회하지 않는다.
