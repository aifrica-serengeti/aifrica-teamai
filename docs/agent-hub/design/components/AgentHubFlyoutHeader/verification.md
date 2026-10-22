# AgentHubFlyoutHeader — 검증

- standalone280×54, 내부278×54와 동일 원본 `3005:23089` 재사용을 비교합니다.
- padding8·세로 gap2·title/count gap6·title-group HUG와 배경/선/shadow 없음을 확인합니다.
- 제목14/20·600·#1C1C1C, count14/20·400·#757575, meta12/16·400·#757575를 확인합니다.
- 실제 TEXT 속성3개와 기본 문구, 내부 인스턴스의 `title`/`count`/`meta` override를 구분합니다.
- meta FILL264/262·HUG 높이·truncation 비활성과 title-group clipping의 원본 값을 보존하되 고정68/54px에 긴 정보를 버리지 않습니다.
- count11을 실제 데이터·페이지 크기·상한으로 복사하지 않고 집계 의미·locale·갱신 owner를 제품에서 확인합니다.
- 제목/설명 id와 상위 패널의 실제 이름·설명, Tab 제외·불필요한 live region 없음·읽기 순서를 확인합니다.
- 긴 제목·설명·큰 count·번역·zoom과 부모 리스트/focus 가시성을 실제 제품에서 검증합니다.
- 상위 property getter 제한을 속성 없음·빈 객체의 증거로 기록하지 않습니다.
- [구현 안내](./implementation.md)에 따라 제품 lint/typecheck/test/build·렌더링·접근성을 확인하고 검증한 source/export만 매핑합니다.

정적 원본과 조합 비교는 실제 제품의 runtime·dark·모든 문구 검증이 아닙니다. 미확인 mapping은 `unmapped`로 유지합니다.

- 소비 조립에서는 [부모 배치](../AgentHubFlyout/implementation.md)를 따라 Header y5/내용54+구분9=총63과 Footer y365..398/33을 대조하고,
  Header/Footer를 body ScrollArea 안에 넣거나 shell 하단 여백을 중복하지 않습니다. 긴 문구는 HUG 높이를 유지합니다.
- withDivider의 기본false는 standalone54px·선 없음, shell의true는63px·선1px#DDD인지 확인합니다.
  구분선은 flex 자식이 아닌 장식 레이어이며 gap2가 중복되지 않아야 합니다. body 시작 y68과 선 y63..64를 확인합니다.
  스크롤 시작·중간·끝, 폴더 펼침·접힘, resize 중에도 선이 Header에 남고 body divider와 중복되지 않아야 합니다.
