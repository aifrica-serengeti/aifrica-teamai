# AgentHubDataCard — 접근성

- 정보 표시만 제공하면 비대화형 표면과 일반 텍스트를 사용합니다. 실제 단일 action을 제품이 채택했을 때만 native button type=button·Tab·Enter/Space를 연결합니다.
- title과 description, 유형 라벨을 읽을 수 있게 제공하고 샘플 문구를 고정 접근성 이름으로 사용하지 않습니다.
  실제 action 이름과 설명 관계는 제품 문맥에 맞춥니다.
- Chip은 일반 정보이며 별도 Tab·click·aria-pressed를 주지 않습니다. Pill 모양이나 카드 pressed만으로 선택/토글 상태를 만들지 않습니다.
- 단일 action 안에 메뉴·Link·Checkbox·다른 button을 중첩하지 않습니다. 추가 조작은 별도 형제 host와 제품 계약으로 검증합니다.
- Figma에 focus가 없어도 실제 action의 focus-visible은 필수입니다. 공용을 켠 UI 작업에서만
  `DOCS_ROOT/frontend/design/components/Card/accessibility.md`의 관련 의미·focus 의무를 연결합니다.
  카드·grid clipping이 focus를 가리거나 선택색만으로 focus를 대신하지 않게 합니다.
- 추가 disabled는 native 속성 또는 채택한 primitive의 상태와 handler guard를 함께 연결합니다. 흐린 색만으로 입력을 허용하지 않습니다.
- title/description은 원본에 ellipsis·줄 수 제한이 없습니다. 긴 문구·10px 설명·번역·확대·좁은 폭에서 전체 정보·대비·배치를 검증합니다.
  제품이 말줄임/높이 변경을 채택하면 별도 확장으로 기록하며120px 정사각형에 내용을 버리지 않습니다.
- 데이터 조회·선택 결과가 바뀔 때 모든 카드를 live region으로 만들지 않습니다. 안내가 필요하면 부모의 한 owner가 관리합니다.
