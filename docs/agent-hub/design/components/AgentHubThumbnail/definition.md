# AgentHubThumbnail — 정의

독립적인 이미지 프레임입니다. 제목·설명·메타·메뉴·선택·링크·file glyph는 이 primitive의 책임이 아닙니다.
이를 조합한 카드는 상위 카드 계약을 함께 적용합니다.

| 원본 ratio | variant ID | image 레이어 | 관찰 크기 |
| --- | --- | --- | --- |
| 4:3 | 3475:22916 | 3475:22941 | 322×241.5px |
| 1:1 | 3475:22917 | 3475:22942 | 322×322px |
| 16:9 | 3475:22918 | 3475:22943 | 322×181.125px |

실제 생성 property는 `ratio`이며 세 비율 중 하나를 고릅니다. 원본 설명은 image의 Fill을 실제 이미지로 교체하도록
안내하지만 이번 snapshot은 세 가지 모두 #F4F4F4 단색입니다. 실제 사진, 배치 초점, loading/error state는 없습니다.
`src`, `alt`, `objectFit`, `objectPosition`은 제품에서 정할 수 있는 제안 API이지 확인된 원본 property가 아닙니다.

기존 ThumbnailCard 안 thumbnail도322×241.5px이지만 부모 카드의 외곽 border/radius24·아래 #EEE 선은
상위 조합이 소유합니다. 이번 독립 Thumbnail에는 그 선·radius·카드 그림자를 추가하지 않습니다.
FileCard의 사진형은256px 정사각형 카드 자체에 selection/menu가 있는 별도 구성입니다.
