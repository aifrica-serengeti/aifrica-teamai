# AgentHubAgentTypeChip — 정의

에이전트 유형을 텍스트와 색상으로 표시합니다. 선택 상태나 실행 상태는 호출부가 별도로 관리합니다.
직접 의존하는 공용 계약은 Chip입니다. 공용을 켠 UI 작업에서만
`DOCS_ROOT/frontend/design/components/Chip/README.md`를 읽습니다.

| 유형 | 표시 텍스트 | Figma component |
| --- | --- | --- |
| assistant | 어시스턴트 | 3016:102467 |
| workflow | 워크플로우 | 3016:102466 |
| runtime | 런타임 | 3016:102465 |
| common-chat | 일반 채팅 | 3016:102480 |

Figma component set `3016:102468`의 variant 속성 이름은 `agent-types`이고 기본값은
`assistant`입니다. 이 기본값은 제품 데이터의 누락·미지원 유형을 assistant로 분류하는 규칙이 아닙니다.
제품의 실제 유형 필드와 위 네 값을 명시적으로 연결하고 미지원 값의 처리는 제품에서 정합니다.

구조는 컨테이너와 텍스트 한 개입니다. 이 노드에는 leading icon·닫기 버튼이 없습니다.
권장 입력은 유형이며 실제 prop 이름은 제품 API에 맞춥니다. Figma 속성을 검증된 앱 API로 취급하지 않습니다.
같은 유형은 같은 라벨과 색상으로 연결하고 제품 source/public export를 확인한 뒤 로컬 매핑에 기록합니다.
