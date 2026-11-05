# AgentHubThumbnail — 비율과 시각 값

| 항목 | 확인값 |
| --- | --- |
| 샘플 폭 | 세 variant 모두322px |
| root | 세로 layout·가로 MIN·padding/gap0·overflow clip |
| image | 폭 전체·ratio로 높이 결정 |
| placeholder 배경 | `color/surface/default-subtler` = #F4F4F4 |
| border / radius / shadow | 이번 원본에서 지정된 표현 없음 |
| 비율 | 4:3 / 1:1 / 16:9 |

원본4:3 높이241.5px,16:9 높이181.125px의 소수점을 유지합니다.
322px는 비교용 fixture이며 모든 부모에서 반드시322px 고정이라는 뜻이 아닙니다.
부모가 공급한 실제 폭과 `aspect-ratio`로 높이를 계산하고 사진의 intrinsic 크기 때문에 layout이 뒤늦게 늘어나지 않게 합니다.

원본의 clip은 지정 비율 밖의 표시를 막는 것입니다. card radius를 여기에도 중복 적용하거나
ThumbnailCard 하단1px #EEE 선을 standalone 기본 스타일로 옮기지 않습니다.
사진 삽입 후 cover/contain·초점·투명 PNG의 바탕은 제품이 정하며 회색 샘플만으로 crop 정책을 확정할 수 없습니다.

원본에 hover·selected·disabled·focus·dark·motion은 없습니다. 상위 카드 상태를 표현하려고 이 이미지만 무조건
opacity로 흐리게 하거나 사진에 독립 hover transform을 추가하지 않습니다.
