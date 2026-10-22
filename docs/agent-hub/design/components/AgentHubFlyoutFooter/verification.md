# AgentHubFlyoutFooter — 검증

- 독립 원본 `3005:23094`와 실제 인스턴스 `3010:23520`의 source 연결 및 TEXT 참조를 확인합니다.
- standalone280×29·투명·bottom4와 shell278×33·white·bottom8 override를 구분합니다.
- 좌우8·top8·위쪽만 inside1 #DDD·radius0·shadow 없음·opacity1과 meta y9를 확인합니다.
- meta12/16·400·#757575·FILL264/262·HUG 높이·truncation 비활성을 대조합니다.
- 1+8+16+4=29 / 1+8+16+8=33의 한 줄 산식과 shell x1/y365·끝398을 확인하고 제품의 고정 좌표로 일반화하지 않습니다.
- 원본의 치타 플랫폼 문구와 인스턴스 `meta`를 제품 정책·권한·route로 하드코딩하지 않습니다.
- child visible 참조와 footer=true 표현을 전체 shell API로 확대하지 않고 property getter 제한을 문서에 유지합니다.
  footer=false 별도 화면은 미검증입니다.
- Footer에 독립 action·Tab target·키 handler·live region이 없는지, 부모의 실제 설명 id 관계가 맞는지 확인합니다.
- 긴 설명·번역·zoom·가변 높이·상위 border/clip·끝 항목 focus 가시성을 브라우저에서 확인합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build를 검증한 뒤 source/export를 로컬 mapping에 기록합니다.

정적 문서·원본 비교·기본 표시 관찰만으로 실제 권한·scroll/focus·모든 표시 상태가 완료됐다고 선언하지 않습니다.

- 소비 조립에서는 [부모 배치](../AgentHubFlyout/implementation.md)를 따라 Header y5/54와 Footer y365..398/33을 대조하고,
  Header/Footer를 body ScrollArea 안에 넣거나 shell 하단 여백을 중복하지 않습니다. 긴 문구는 HUG 높이를 유지합니다.
