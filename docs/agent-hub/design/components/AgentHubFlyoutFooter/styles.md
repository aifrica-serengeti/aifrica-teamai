# AgentHubFlyoutFooter — 스타일

| 항목 | 독립 원본 | 실제 shell 내부 |
| --- | --- | --- |
| 크기 | 280×29px | 278×33px |
| 폭 / 높이 | FIXED / HUG | FIXED / HUG |
| padding 좌·우·상·하 | 8 / 8 / 8 / 4px | 8 / 8 / 8 / 8px |
| 배경 | 없음 | #FFFFFF, color/surface/default |
| border | 위쪽만 inside 1px #DDDDDD | 동일 |
| radius / shadow / opacity | 0 / 없음 / 1 | 동일 |
| 배치 / clipping | vertical 시작 정렬·gap0 / false | 동일, ABSOLUTE |
| meta 폭 | 264px FILL | 262px FILL |
| meta | Pretendard Regular12/16·400·#757575 | 동일, 표시값은 `meta` override |

meta는 왼쪽 정렬·자간0·높이 HUG·textAutoResize HEIGHT·truncation DISABLED·maxLines 없음입니다.
위쪽 border가 layout에 포함돼 meta의 y는9px입니다. 단일 줄 높이는 독립 원본1+8+16+4=29px,
실제 shell1+8+16+8=33px입니다. 두 값을 하나의 전역 Footer 높이로 통합하지 않습니다.

shell 안의 위치는 x1/y365이며33px 높이로 shell 바닥 y398까지 닿습니다.
border-box398px의 하단 border 영역까지 이어지는 원본 좌표이며, 소비 제품의 absolute inset을 확인 없이 같은 숫자로 고정하지 않습니다.
부모는 배경·하단 선·radius clipping과 리스트 가용 높이·끝 항목 가시성을 함께 검증합니다.

Footer 표면의 white override와 bottom8은 실제 인스턴스 차이입니다. 독립 원본을 무조건 white·33px로 바꾸지 않고,
반대로 shell에 독립 원본의29px·투명 배경을 강제로 적용하지 않습니다.
meta는 길어지면 줄바꿈과 HUG 높이를 검증하고29/33px 고정 clipping으로 문구를 버리지 않습니다.
top 선 외 다른 border·shadow나 hover/disabled/dark 상태는 추가로 확인하지 않았습니다.
