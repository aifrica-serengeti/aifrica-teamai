# AgentHubThumbnail — 구현 연결

이는 **제품 제안 recipe**이며 실제 제품 export를 확인한 구현 예제가 아닙니다.
소비 제품에서 기존 aspect-ratio 이미지 primitive와 public export를 먼저 확인하고 호환된다면 adapter로 연결합니다.
별도 카드가 아니라 이미지만 소유하는 작은 범위로 둡니다.

```css
.hub-thumbnail {
  width: 100%;
  aspect-ratio: var(--hub-thumbnail-ratio);
  overflow: hidden;
  background: #f4f4f4;
}
.hub-thumbnail > img {
  display: block;
  width: 100%;
  height: 100%;
}
```

위 CSS custom property는 recipe 이름이며 실제 Figma/제품 token export가 아닙니다.
ratio 값은4/3,1/1,16/9 중 하나를 제품 API에서 연결합니다.
`object-fit`과 `object-position`은 실제 사진 요구로 결정하고 default를 Figma에서 확인한 값이라고 기록하지 않습니다.

사진/alt/실패는 제품에서 받고, 이미지를 가져오는 fetch·자체 데이터 저장소·카드 선택 상태를 primitive 안에 만들지 않습니다.
[검증](./verification.md) 후 source/public export를 제품 로컬 매핑에 기록합니다.
공유 문서 추가만으로 다른 제품의 구현 완료 여부를 상속하지 않습니다.
