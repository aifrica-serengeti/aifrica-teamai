# AgentHubPickerFooter — 치수와 스타일

## Surface와 배치

| 항목 | 확인한 값 |
| --- | --- |
| standalone frame | 768×39px, 폭 FIXED·높이 HUG |
| 화면 내부 footer | 776×39px / 532×39px |
| 배경 | `#F8F8F8` |
| 선 | 위쪽만 inside 1px `#EEEEEE`, 나머지 0 |
| radius / shadow | 0 / 없음 |
| surface padding | 좌우12px·상하10px |
| footer-content | 가로 FILL·높이18px HUG·좌우 padding4px |
| 실제 좌우 여백 | surface12 + content4 = 16px |
| 정렬 | horizontal, space-between, 교차축 중앙 |

위쪽 border가 layout에 포함되므로 콘텐츠 y는 11px이고, 높이는 1 + 10 + 18 + 10 = 39px입니다.
border를 네 면에 그리거나39px 안에 다시 상하 border를 더하지 않습니다.
footer-content는 standalone에서744px이며 높이는18px입니다. 기록된 `itemSpacing: 399`를 고정 간격으로 구현하지 않고
space-between 분배를 유지합니다. 바깥 root의 gap10도 자식 하나에서 추가 여백을 만드는 값이 아닙니다.
768px는 standalone 샘플 폭이며 부모에 맞게776/532px로 달라집니다.

## 키보드 안내

| 항목 | 값 |
| --- | --- |
| keycap | 18×18px·radius4·transparent·inside 1px `#DDDDDD` |
| keycap 글자 | Pretendard Regular12/16·400·`#757575`, 중앙 |
| ↑와 ↓ 사이 | 2px |
| 키 묶음과 설명 사이 | 4px |
| “이동”·“선택” | Pretendard Medium12/16·500·`#1C1C1C` |
| key-hints 전체 | 123×18px, 추가 gap0 |
| Divider 전체 / 선 | 17×14px / 1×14px `#DDDDDD` |
| Divider 여백 | 선 좌우8px, 별도 margin 추가 없음 |

이동 안내는63px, 선택 안내는43px이며 Divider17px를 합해123px가 됩니다.
keycap의 내부 label은16×16px이며 1px 선을 포함한 전체가18px입니다. 기본 `<kbd>`의 monospace·padding·그림자를 그대로 쓰지 않습니다.
힌트 FRAME에 기록된 radius8은 fill·stroke가 없는 래퍼 값이며18px keycap의 radius4를 바꾸지 않습니다.

## 찾기 동작과 하단 고정

찾기 label은 Pretendard Regular12/16·400·`#1C1C1C`이며 chevron16과 gap2px로 연결됩니다.
샘플 폭84px는 label66 + gap2 + glyph16의 합입니다. 실제 라벨 번역을 고정84px에 가두지 않습니다.
glyph는16px FRAME 안의 x6/y4·4×8px vector, 선1px·`#1C1C1C`입니다. [자산 기록](../../references/picker.assets.json)의 exact FRAME export를 사용합니다.

두 화면에서 footer는 absolute bottom이며 y416/497, 부모 높이는455/536입니다. footer 높이39px를
리스트의 가용 영역과 분리해 확보합니다. 부모의 `clipsContent: true`와 겹침이 실제 스크롤·focus 가시성을 보장하지 않습니다.
하단 행·outline이 footer 아래에 가려지지 않도록 제품의 리스트 viewport·scroll 여백을 검증합니다.
dark·hover/focus·좁은 폭·줄바꿈 시각 값은 측정하지 않았습니다.
