# AgentHubThumbnail — 검증

1. 폭322px에서4:3 =241.5px,1:1 =322px,16:9 =181.125px인지 비교합니다.
2. 배경 #F4F4F4, border/radius/shadow 없음, root clip 여부를 확인합니다.
3. parent 폭 변화·zoom·소수점 layout에서 비율을 유지하고 불필요한1px 선이 생기지 않는지 확인합니다.
4. 이미지가 늦게 들어와도 placeholder 영역의 높이가 유지되는지 확인합니다.
5. 실제 사진·작은 이미지·세로 사진·투명 PNG에서 제품이 정한 fit/position이 적절한지 확인합니다.
6. 장식/의미 있는 이미지의 alt, 실패 시 인접 이름, 상위 실행 host의 keyboard 동작을 확인합니다.
7. ThumbnailCard에 연결한 경우 parent의 radius·border·아래 선이 두 겹으로 생기지 않는지 확인합니다.

이번 문서 검증은2026-11-05 생성 context·보드 metadata·해결 변수 대조입니다.
사진 자산·추가 상태·dark·responsive breakpoint·제품 렌더링을 확인한 것은 아닙니다.
제품 source와 public export를 검증하기 전까지 구현 매핑은 `unmapped`로 둡니다.
