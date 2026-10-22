# AgentHubPillChip — 정의와 지원 범위

한 개의 텍스트 라벨을 흰색 계열 배경과 중립색 테두리로 감싸는 pill 형태입니다.
Figma component set `2427:25194`의 `state` 옵션은 enabled·hovered·pressed·selected·`disalbed`입니다.
단어 `disalbed`는 원본 추적용으로 보존합니다. 오타를 제품 API에 전파하지 않고, 실제 비활성 의미를 채택할 때 정상적인 `disabled`에 명시적으로 매핑합니다.

원본의 모든 variant는 컨테이너와 TEXT 하나뿐이며 아이콘·제거 버튼·다른 컴포넌트 인스턴스가 없습니다.
`Show icon#2320:0` Boolean은 기본값 true로 남아 있지만 이를 참조하는 자식이나 표시 아이콘은 없습니다.
이 속성만 보고 leading icon을 추가하거나 Icon·IconButton 의존성을 새로 만들지 않습니다.

공용 Chip의 정보 표시 의미를 기본으로 읽되, 이 노드가 제공한 hover·pressed·selected는 정적 시각 샘플로 구분합니다.
실제 클릭 여부·선택 방식·선택 값 소유권·페이지 동작은 아직 확인되지 않았습니다.
단일 선택·다중 선택·필터 토글을 이름만으로 정하거나 검증된 앱 API처럼 등록하지 않습니다.

이 계약은 기존 `AgentHubAgentTypeChip`의 네 업무 유형과 별개입니다. 해당 계약의 assistant·workflow·runtime·common-chat
색상이나 고정68px 폭을 pill Chip에 적용하지 않습니다. 기존 `AgentHubChip` 검색 별칭도 AgentTypeChip에 남습니다.

직접 의존 계약은 `Chip`입니다. 제품의 기존 구현과 공개 export를 확인한 후 로컬 매핑에 연결합니다.
공용을 채택했더라도 28px pill을 기존 small20px·medium24px 중 하나로 자동 치환하지 않습니다.
