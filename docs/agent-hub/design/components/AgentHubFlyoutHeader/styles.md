# AgentHubFlyoutHeader — 스타일

| 항목 | 확인한 값 |
| --- | --- |
| standalone | 280×54px, 폭 FIXED·높이 HUG |
| Flyout 내부 | 278×54px, 폭 FILL·높이 HUG, 부모 내부 x1/y5 |
| 배치 | 세로·시작 정렬·gap2px·사방 padding8px |
| 배경·선·그림자 | 없음·없음·없음, opacity1 |
| radius / root clipping | 0 / false |
| title-group | 가로 HUG·교차축 중앙·gap6px·padding0·현재68×20px |
| 제목 | Pretendard SemiBold14/20·600·#1C1C1C |
| count | Pretendard Regular14/20·400·#757575 |
| meta | Pretendard Regular12/16·400·#757575 |
| 텍스트 공통 | 자간0·왼쪽 정렬·truncation DISABLED·maxLines 없음 |

단일 줄 높이는8 + title-group20 + gap2 + meta16 + 8 =54px입니다.
meta는 폭 FILL·높이 HUG이며 standalone264px, 내부262px입니다. 고정54px 안에서 긴 설명을 잘라내지 않습니다.
줄 수가 늘면 Header와 상위 리스트의 가용 높이도 함께 검증합니다.

기본 제목49px + gap6 + count13px로68px이고, 인스턴스의 `title`26px + gap6 + `count`36px도68px입니다.
이 우연한 같은 폭을 모든 제목·개수의 고정68px로 사용하지 않습니다.
title-group의 원본 `clipsContent: true`는 저장된 배치 속성입니다. 긴 제목·개수를 읽을 수 없게 잘라내는 제품 정책을 뜻하지 않습니다.

색상은 title의 `color/text/default`, count/meta의 `color/text/default-subtler`에 연결됩니다.
`strokeWeight: 1`이 저장돼 있어도 strokes가 없으므로 standalone 기본 Header에 원본 border가 있었다고 기록하지 않습니다.
공용 Typography 의미를 참고하되 다른 Header·MenuLabel의 padding·높이·상태색을 자동 상속하지 않습니다.
dark·disabled·hover·focus 시각 상태는 이 부품에서 측정하지 않았습니다.

## Shell에서 고정 구분선을 소유합니다

후속 사용자 요청의 runtime 채택으로 `withDivider`를 추가합니다. 기본false는 위 standalone54px을 유지합니다.
Flyout shell은 true로 전달하여 내용54px 뒤에 **4px + 선1px #DDD + 4px =9px**를 고정합니다.
단일 줄일 때 총높이63px이며 Header y5..68, 선 y63..64, body 시작 y68입니다.
이는 원본 items 안의 divider9를 Header로 옮기는 조립 변경이며 실측 JSON은 보존합니다.

Header에 `position:relative; padding-bottom:17px`를 연결하고 선을 `::after`의 `bottom:4px; height:1px`로 그립니다.
원래 bottom padding8px에9px만 더하는 방식입니다. 선을 세 번째 flex 자식으로 넣어 gap2px를 추가하거나,
body content에 같은 divider를 중복하지 않습니다. 긴 meta는 HUG로 늘고 선도 Header 아래에 남습니다.
구분 영역은 스크롤 viewport 밖이므로 목록을 끝까지 스크롤해도 사라지지 않습니다.
