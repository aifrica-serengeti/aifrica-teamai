# AgentHubSearch — 정의와 지원 범위

검색 입력에 돋보기와 조건부 지우기·필터 조작을 조합하는 컴포넌트입니다. 공용 Search가 요구하는 Input의 native 입력·
form semantics·상태 로직을 재사용합니다. 제품 Input의 size·radius·adornment 확장으로 표현 가능한지 먼저 확인하고
외형을 맞추기 위해 별도 입력 상태·border 로직을 복제하지 않습니다.

## 확인한 variant

| size | filtered | 제공된 state |
| --- | --- | --- |
| 48 / 32 | false | enabled, focused, typing, disabled |
| 48 / 32 | true | enabled, focused |

실제 컴포넌트는12개입니다. 속성 옵션의 곱만 보고 `filtered=true`의 typing·disabled까지 구현 근거가 있다고
판단하지 않습니다. filled/unfocused·read-only·invalid·dark나 다른 크기의 새 시각 값도 이 노드에는 없습니다.
이 속성들은 Figma 검증용 구분이며 그대로 제품 props·HTML size·검색 API로 복사하지 않습니다.

## 조합과 표시 조건

- 왼쪽은 search glyph와 텍스트, 오른쪽은 필요한 조작을 담습니다. 돋보기는 입력 목적을 나타내는 장식입니다.
- 입력 중 샘플의 clear 원과 `action/filter`는 모두 Search 내부 **FRAME**입니다.
  독립 AgentHubIconButton·AgentHubAttachIconButton 원본 인스턴스로 취급하거나 그 크기/radius를 강제하지 않습니다.
  제품의 기존 조작 primitive가 정확한 규격을 지원하면 재사용할 수 있습니다.
- 실제 INSTANCE는 search/20(`2106:10483`), search/16(`3018:24956`), x/16(`2311:46284`),
  filter/16(`3016:104216`) glyph입니다. [manifest](../../asset-manifest.json)의 기존 자산을 재사용합니다.
- `filter#3124:0` Boolean은 기본false이며, filtered=false의8개 `action/filter` frame의 `visible`에 연결됩니다.
  이8개는 원본에서 숨겨져 있습니다. 안쪽 glyph의 visible=true나 저장된 trailing 폭을 실제 노출로 해석하지 않습니다.
- filtered=true의4개 filter frame은 보이는 파란 강조 상태이고 위 Boolean의 visible 참조가 없습니다.
  `filter`와 `filtered`를 같은 속성으로 합치거나 Boolean=false가 모든 variant의 필터를 숨긴다고 단정하지 않습니다.
  제품에서 필터 제공 여부·적용 여부·팝업 열림을 각각 실제 API에 연결하고 조합 우선순위를 기록합니다.

`필요한 에이전트를 검색하세요.`, `에이전트 검색`, 입력 중 예시 문자열·disabled 안내는 샘플입니다.
검색 대상·실제 입력 값·번역은 호출자가 정합니다. Label·help text는 이 노드에 없지만 접근성 이름은 유지합니다.
입력 caret을 표현한 사각형은 디자인용이며 실제 native input caret과 중복 렌더링하지 않습니다.
