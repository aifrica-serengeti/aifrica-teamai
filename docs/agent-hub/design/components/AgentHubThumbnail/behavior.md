# AgentHubThumbnail — 동작과 데이터 소유권

표시 전용 primitive로 자체 click·Tab·조회·선택 상태를 갖지 않습니다.
클릭하면 이동하거나 파일을 열어야 하는 경우 상위 link/button이 의미와 실행을 소유합니다.
이미지와 wrapper 양쪽에 같은 click을 두어 한 번의 입력으로 두 번 실행하지 않습니다.

제품이 실제 이미지 source·설명·권한·대체표현과 요청 실패를 소유합니다.
Figma의 회색 surface는 빈 이미지 placeholder일 뿐 비동기 loading 완료나 실패를 뜻하지 않습니다.
loading/error가 필요하면 제품의 상태를 별도 계약으로 정하고 회색을 무한 로딩의 증거로 사용하지 않습니다.

이미지가 바뀌어도 선택한 ratio 영역은 유지합니다. 원본 설명의 Fill 교체를 그대로 CSS `object-fit: fill`로 번역하여
사진을 늘려 찌그러뜨리지 않습니다. cover/contain과 필요한 focus point는 실제 콘텐츠를 보고 결정합니다.
캡션·다운로드·크게 보기·선택 조작은 상위 컴포넌트가 제공하며 이 primitive의 숨은 제스처로 만들지 않습니다.
