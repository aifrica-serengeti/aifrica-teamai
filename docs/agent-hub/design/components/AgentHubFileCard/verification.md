# AgentHubFileCard — 검증

문서가 존재한다는 사실은 제품 구현·브라우저 검증을 의미하지 않습니다. 실제 source/public export를 확인한 뒤
로컬 매핑에 경로를 기록하고 다음을 검증합니다.

## 원본 대조

1. spreadsheet/document/pdf/presentation/code/zip/image × enabled/hovered/selected,21개 조합을 비교합니다.
2. 카드256px·radius24·border1·padding16·gap16, header32px 타일/20px glyph, preview56px 원본을 확인합니다.
3. 사진형은 헤더 없이 표면 전체 사진이고 비사진형은 title/meta/preview가 분리되는지 확인합니다. 사진은 object-fit:cover로 비율을 유지하며256×256 영역에 채우는지 확인합니다. 가로·세로 사진이 늘여 찌그러지지 않아야 하며 독립 Thumbnail의 미확인 fit과 구분합니다.
4. hover dim5%는 카드 안에 clip, 더보기32px top/right16, checkbox20px bottom/right16인지 확인합니다.
5. selected는 외부 inset-3·2px blue·radius26 링과 체크가 있고 카드 밖 링이 잘리지 않는지 확인합니다.
6. 선택 상태에 hover dim/더보기를 무조건 합성하지 않았는지, 이번에 없는 교차 상태의 제품 결정을 기록합니다.
7. 모양만 비슷한44px FileIcon을 확대·축소하여20/56px 원본을 대체하지 않았는지 자산 바이트를 대조합니다.
8. header-content의32px 타일과 title/meta 묶음이 교차축 중앙에 놓이고 details의 세로 중앙 정렬이 유지되는지 확인합니다. showMeta true/false와 각 상태에서 preview56px glyph가 양축 중앙에 있어야 합니다.

## 기능·접근성

- 카드/checkbox/더보기 클릭이 각각 한 가지 동작만 실행하고 keyboard도 동일하게 동작하는지 확인합니다.
- 주 실행 host와 독립 버튼이 유효한 형제 DOM인지, 포인터를 옮겨도 메뉴 조작이 가능한지 확인합니다.
- focus 진입·터치에서 hover 전용 조작을 이용할 수 있는지 확인합니다.
- showMeta=false에서 행/gap이 사라지고 긴 이름·상대시간·파일 없는 사진형 이름이 안전한지 확인합니다.
- 선택·focus·고대비·reduced motion을 구분하고 root/컨테이너 clip이 선택 링을 자르지 않는지 확인합니다.
- 실제 이미지 실패/느린 로딩/삭제·권한 변경·선택 중 데이터 갱신은 제품 시나리오로 검증합니다.

이번 자료는 생성 context·보드 metadata·해결된 변수·원본 export와 스크린샷을 대조한 문서 검증입니다.
네이티브 변수 ID·alias graph·프로토타입 전환 timing·제품 동작은 제공 자료로 확인하지 못했습니다.
