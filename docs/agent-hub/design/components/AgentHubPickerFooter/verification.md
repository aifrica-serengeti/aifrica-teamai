# AgentHubPickerFooter — 검증

Standalone footer와 두 Picker의 실제 footer 인스턴스를 확인했습니다.
실제 앱의 route·키 이벤트·선택·스크롤·focus·dark·좁은 폭 동작은 아직 미검증입니다.

- standalone768×39·부모776/532×39와 HUG 높이, top1px만 있는 선·#F8F8F8·radius0·shadow 없음을 대조합니다.
- px12 + content px4의 유효 좌우16px, py10 + top1 + content18 =39px를 확인합니다.
- space-between을 유지하고 기록된 gap399를 고정값으로 사용하지 않습니다.
- keycap18×18/radius4/선1 #DDD, 글자12/16·400·#757575, key gap2·hint gap4를 확인합니다.
- 안내 label12/16·500·#1C1C1C와 Divider17×14/선1·px8을 확인하고 Divider 여백을 다시 추가하지 않습니다.
- keycap 원본 `2627:6196`의 ↑·↓·↵와 Divider 원본 `2019:118` 재사용을 확인합니다.
- 찾기 label12/16·400, gap2·chevron16 FRAME을 대조합니다. 일반 Button/TextButton/Icon 인스턴스 재사용으로 기록하지 않습니다.
- standalone과 `3016:104832`의 찾기 표시, `2978:58170`의 링크 subtree 부재를 구분합니다.
  링크 부재를 visible=false 노드나 root Boolean 속성이 있는 것으로 바꾸지 않습니다.
- `<kbd>` 비대화형·장식 Divider/glyph·실제 link/button의 단일 활성화·읽을 수 있는 이름과 focus를 확인합니다.
- Footer에 별도 전역 keydown이 없고 실제 Picker의 방향키/Enter 안내가 동작·IME 정책과 일치하는지 확인합니다.
- 하단39px 공간 확보와 마지막 행·outline 가시성, resize·긴 라벨·zoom·찾기 링크 유무를 실제 브라우저에서 확인합니다.
- 검증한 source/public export만 로컬 mapping에 기록합니다. 문서·자산 수신이나 정적 조합 match를 실제 런타임 완료로 취급하지 않습니다.
