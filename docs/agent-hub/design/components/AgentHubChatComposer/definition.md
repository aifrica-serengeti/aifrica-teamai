# AgentHubChatComposer — 정의와 재사용 관계

구조는 요청 입력을 감싼 pill surface와 그 아래의 프로젝트 선택 조작입니다.
surface 안에는 첨부 버튼, native 편집 영역, 전송 버튼이 있고 agent-selected 샘플에만 유형 Chip·에이전트 제목·Divider가 있습니다.
placeholder와 입력 중 예시 문구, 에이전트·프로젝트 이름은 제품 데이터로 연결하며 고정하지 않습니다.

| 위치 | 실제 Figma 원본·구조 | 연결할 계약 |
| --- | --- | --- |
| 왼쪽 첨부 ×4 | `3104:20` default 원형 버튼 + plus/24 `2308:44299` | AgentHubAttachIconButton |
| 오른쪽 전송 ×4 | `3104:21` hovered 원형 버튼 + arrow-up/24 `2199:23680` swap | 같은 원형 버튼의 Composer 한정 조합·override |
| 유형 Chip ×1 | 일반 Chip `2079:11964`, Rounded/Small/Enabled, leading/trailing false | 공용 Chip의 보라색 시각 매핑 |
| Divider ×1 | `2019:118` Vertical, 사용 인스턴스 높이12px | 공용 Divider |
| 프로젝트 선택 ×4 | `chip/project-select` FRAME + folder instance + label | Composer의 로컬 조작 |

유형 Chip은 `#FAF5FF/#9333EA`로 override돼 있습니다. `AgentHubAgentTypeChip`의 workflow와 모양이 같지만
그 원본을 사용한 인스턴스는 아닙니다. 독립 AgentTypeChip이나 PillChip 재사용으로 표시하지 않습니다.
에이전트 description은 원본에서 숨겨져 있으므로 보이는 행이나 높이로 추가하지 않습니다.

전송 버튼은 네 구성 모두 hovered 원본을 참조합니다. typing·agent-selected에서만 배경·glyph 색상이 override됩니다.
원본의 hovered를 Composer 전체 상태나 독립 Attach 버튼의 미정 `state5` 의미로 바꾸지 않습니다.
실제 송신 가능·요청 진행·선택 상태는 제품이 따로 결정합니다.

프로젝트 선택은 Chip·PillChip·Button 인스턴스가 아닙니다. folder의 원본 이름은 오타 `icon/forder/20`(`2037:4537`)이며
16px로 축소된 실제 인스턴스를 사용합니다. [전용 export](../../assets/chat-composer/project-folder-16.svg)는
이 실측을 보존합니다. 다른 folder/16 자산과 이름만으로 교체하지 않습니다.

직접 의존 계약은 `Textarea`, `Chip`, `Divider`, `AgentHubAttachIconButton`, `AgentHubIcon`입니다.
Figma의 편집 영역이 TEXT/FRAME이라는 사실은 실행 입력 구현을 뜻하지 않습니다. 실제로는 기존 또는 새 native textarea를 연결합니다.
