# AgentHubCheckbox — 정의와 지원 범위

Figma `Checkbox-icon`은 시각 박스와 체크/가로 마크의 묶음입니다. 실제 입력·label·클릭 영역·group은 포함하지 않습니다.
native checkbox 또는 현재 제품에서 검증한 Checkbox primitive의 상태와 이 시각 값을 연결합니다.
장식 SVG나 click을 단 div만으로 공용 Checkbox의 입력 의미를 대체하지 않습니다.

| Figma 속성 | 실제 정의 | 제품 의미 연결 |
| --- | --- | --- |
| type | unchecked / checked / indeterminate | false / true / 일부 선택 |
| size | small / medium / large | 시각 박스12 / 16 / 20px |
| state | enabled / disabled | 편집 가능 여부, 선택 값과 독립 |

3×3×2 = 실제18종입니다. 생성된 prototype의 `state=true/false`는 실제 Figma enum 정의나 앱 props가 아닙니다.
HTML input type은 checkbox이며 Figma의 type 문자열을 HTML type으로 복사하지 않습니다.
기본 정의는 unchecked·small·enabled이고, 공용 Checkbox의 medium 기본과 구분해 제품 채택 크기를 명시합니다.

각 variant는 같은 크기의 Box 사각형 하나와, checked/indeterminate에서만 Mark VECTOR 하나를 담습니다.
공용 Icon·AgentHubIcon 인스턴스나 별도 체크 아이콘 라이브러리의 glyph가 아닙니다. mark의 좌표·1px 선·round cap/join과
정확한 도형을 [실측 기록](../../references/checkbox.figma.json)에 보존했습니다.

[원본 SVG12개](../../references/checkbox.assets.json)는 Figma가 제공한 checked/indeterminate × 크기3 × state2의
**박스와 마크 전체**입니다. native12/16/20px 크기와 상태별 색을 포함합니다.
기존 구현이 정확히 일치하면 그대로 재사용하고, 자산을 사용할 때는 native 입력의 장식 indicator로 연결합니다.
전체 SVG 위에 Box·border·Mark를 다시 그리지 않습니다. unchecked는 실측한 사각형·색·선으로 표현할 수 있습니다.
이 자료를 제품 소유 자산 경로로 가져오는 기준은 [자산 안내](../../assets.md)를 따릅니다.

hover·pressed·focus-visible·read-only·invalid·dark·label·group의 새 시각 값은 이 노드에 없습니다.
공용의 해당 의미·접근성·상태 우선순위와 small/medium 라벨·hit area는 유지하고 제품에서 연결합니다.
large는 시각20px만 확인했으므로 라벨 글꼴·간격·hit area를 비례 확대해 Figma 확인값으로 만들지 않습니다.

2026-10-21 Mark 모션 채택을 위한 [Mark 전용 자산6종](../../references/checkbox-marks.assets.json)은
원본 Mark node만 read-only SVG export한 자료입니다. 기존12개 전체 SVG를 대체하거나 수정한 것이 아닙니다.
체크/대시 × 크기3이며 enabled/disabled 모두 같은 흰 Mark를 사용합니다.
독립 export의 viewBox와 폭·높이는 stroke를 포함한 render bounds와 export 반올림을 포함하므로
전체 Box12/16/20px로 확대하지 않습니다. manifest의 x/y·native width/height로 Box 안에 배치합니다.
Box를 따로 유지하는 채택 구현은 Mark 전용 파일만 얹고 전체 SVG를 다시 겹치지 않습니다.
