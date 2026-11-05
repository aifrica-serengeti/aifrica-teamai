# AgentHubFileTab — 검증

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

- default/active 두 조합의24px 높이·radius4·pl8/pr4/gap4·14/20을 비교합니다.
- 선택 trigger와 닫기 버튼의 native DOM이 중첩되지 않고 독립 click·Enter·Space가 한 번씩 실행되는지 확인합니다.
- ←→와 Home/End, 탭 진입·focus-visible·aria-selected·panel 연결을 실제 엔진에서 확인합니다.
- 활성/비활성/마지막 탭 닫기, 동일 이름 파일 두 개, 긴 이름, 좁은 폭/overflow를 확인합니다.
- 키보드로 비활성 탭 닫기에 focus한 뒤 닫아도 현재 파일 선택이 유지되고 focus가 유효한 현재 trigger로 복구되는지 확인합니다. 활성/마지막 탭도 제거된 DOM이나 body에 focus가 남지 않아야 합니다. 외부 갱신으로 다른 탭이 닫히는 경우 현재 focus를 빼앗지 않는지 확인합니다.
- 공용44px·밑줄·최소폭120px가 AH adapter에 남지 않으며 다른 공용 Tab 사용처에는 AH24px가 번지지 않는지 확인합니다.


위 항목은 **소비 제품에서 수행할 검증 목록**이며 이번 문서 작업에서 제품 UI를 통과시켰다는 뜻이 아닙니다.
문서 작업은 실제 자료·asset 경로·내부 링크를 대조하고 저장소의 `npm run verify`·`npm test`로 확인합니다.
제품에서는 lint/typecheck/test/build와 키보드·실제 스크롤·브라우저 동작을 검증한 뒤 로컬 매핑에 source/public export를 기록합니다.
현재 `unmapped`/`draft`를 유지합니다.
