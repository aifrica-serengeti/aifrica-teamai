# AgentHubFilterChip — 정의와 지원 범위

필터 조건의 선택 여부를 표현하고 변경하는 조작 컴포넌트입니다. 공용 Chip 본체는 정보 표시용이며 selected/onToggle 계약이 없습니다.
이 확장은 별도 id로 선택 의미를 정의합니다. 기존 공용 Chip·AgentHubAgentTypeChip을 클릭 가능한 span으로 바꾸거나
업무 유형4종의 색상·폭을 여기에 상속하지 않습니다.

| 속성 | 실제 Figma 정의와 관찰 |
| --- | --- |
| size | sm28 / md32 / lg36px. 정의의 기본값은 **sm** |
| selected | false / true. 순간 pressed와 별도 |
| state | enabled / hovered / pressed / disabled |
| label | TEXT, 예시 ‘전체’ |
| leading/trailing icon | 각각 Boolean 기본false와 INSTANCE_SWAP 참조 |
| count / count label | Boolean 기본false, TEXT 예시 ‘3’ |

3크기×선택2×state4 = 실제24종입니다. Figma 설명에는 focused와 md 기본값이 언급되지만
실제 속성 정의·컴포넌트에는 focused가 없고 기본값은 sm입니다. 제품의 기본 크기는 채택 시 명시합니다.
원본 설명의 focused를 확인한 색상·effect로 기록하거나 focus 의무를 생략하지 않습니다.

기본24종은 label만 보입니다. leading·count·trailing은 모두 숨겨져 있으며 count 아래 text의 visible=true도
부모가 숨겨져 있으므로 실제 노출이 아닙니다. Boolean 표시·label/count 문자·icon swap의 참조는
[실측 JSON](../../references/filter-chip.figma.json)에 보존했습니다. 숨겨진 자식의 저장 좌표를 켠 조합의 완성된 배치로 쓰지 않습니다.

기본 glyph 원본은 filter/16(`3016:104216`)과 chevron-down/16(`2372:37015`)이며
[기존 manifest](../../asset-manifest.json)의 자산을 재사용합니다. 이 원본에서 보이는 별도 IconButton은 없습니다.
Figma 설명의 x 제거형은 실제 swap·제품 동작을 확인한 뒤 연결하고, chevron과 같은 의미로 취급하지 않습니다.
count는 내부 표시 frame이며 일반 Button·IconButton이나 독립 공용 Chip이 아닙니다.

표시 문자열·count·조건 id·단일/다중 선택·팝업/제거 동작·결과 조회는 호출자가 소유합니다.
group 조합은 [AgentHubFilterChipGroup](../AgentHubFilterChipGroup/README.md)을 사용합니다.
