# AgentHubFlyout 구조

공용 registry에 같은 Flyout 계약은 없었습니다. [Menu](../AgentHubMenu/README.md)의 명령 목록,
[Picker](../AgentHubPicker/README.md)의 검색·모델 선택과 구별하며 새로운 내부 구조를 정의합니다.

| 부분 | 실제 원본과 구성 |
| --- | --- |
| Shell | 단일 COMPONENT3010:23522, 고정280×398·maxHeight398 |
| Header | INSTANCE2975:76707 →3005:23089, title/count/meta를 실제 문자열로 override |
| items | divider FRAME9 + Item 원본16개 + Scrollbar instance |
| Item | 모두3005:23096 item/default source,11개 표시·5개 숨김 |
| Footer | INSTANCE3010:23520 →3005:23094, pb8/white/absolute override |
| Scrollbar | INSTANCE2975:76722 →2019:3708, 실제 표시11×95 |

원본 설명의16행은 준비된 슬롯 수입니다. 제품 최대 개수·페이지 크기·항상16개 렌더 정책이 아닙니다.
원본에 없는17번째 항목이나 다른 kind를 추가한다면 동적 데이터·성능·viewport 계약을 제품에서 검증합니다.
현재5개 숨김 행을 기본 상태에 노출하지 않습니다.

## 내부는 별도 규격

Item은 item/folder/folder-open/child 네 kind지만 실제 variant는10개입니다.
item은 default/pressed/selected/hovered, 나머지는 default/hovered만 있습니다.
kind4×state4 전체16종이나 disabled·focused를 제공한다고 판단하지 않습니다.
행28px·font12/16·padding과 들여쓰기는 [Item](../AgentHubFlyoutItem/styles.md)에서 소유합니다.

독립 Item set의 folder/folder-open/child는 닫힘·열림·들여쓰기의 **정적 시각**을 제공합니다.
완성 Flyout shell의 실제16행은 모두 item/default 원본이며 중첩 child 목록이나 펼침 동작이 확인된 조립이 아닙니다.
평면 runtime은 그대로 지원합니다. 후속 사용자 요청에 따라 `children`이 있는 폴더와 부모 소유 펼침 상태를
선택적으로 조합하는 disclosure 목록을 채택했습니다. `children: []`도 폴더이며 파일 선택과 확장을 분리합니다.
이 채택은 원본 prototype reaction·Figma 모션 실측이 아닙니다. Menu 서브메뉴도 자동 연결하지 않습니다.
파일 glyph 기본 원본은 file-text이며 폴더 kind에도 같은 원본을 사용합니다.
폴더 그림·44px 파일 타일로 임의 교체하지 않고 실제 제품 데이터와 검증한 icon-swap을 연결합니다.

Header/Footer는 MenuLabel·Tooltip·Button 인스턴스가 아닌 전용 텍스트 구성입니다.
Footer 원본29px와 실제33px override, Header의 한국어 기본값과 실제 title/count/meta 문자열을 구분합니다.
원본의 안내 문구로 실제 권한·관리 기능·플랫폼 연결 API를 확정하지 않습니다.

## 의미·의존성과 모션

기본 flat 파일 목록은 제품의 단일 action/값 선택 의미에 맞춥니다.
Tree 의존은 별도 Tree 패턴을 채택할 때 비교할 의미 참고입니다. 이번 폴더 목록은 native 버튼과 중첩 목록의 disclosure이며
계층 데이터만으로 Tree 역할·roving focus·Tree 키보드를 자동 적용하지 않습니다.
Button·Tree 의존은 의미 참고이며 실제 Figma Button/Tree source 재사용을 뜻하지 않습니다.
공용 채택 시 `DOCS_ROOT/frontend/design/components/Tree/README.md`,
`DOCS_ROOT/frontend/design/components/Button/README.md`,
`DOCS_ROOT/frontend/design/components/Scrollbar/README.md`를 현재 제품 구현과 함께 확인합니다.

Menu의 **모션만** [motion](./motion.md)으로 연결합니다. registry의 직접 의존에는 Menu를 넣지 않았습니다.
Tree의 전이 의존으로 공용 Menu가 catalog closure에 포함되지만 Flyout을 명령 메뉴로 조립하라는 뜻은 아닙니다.
같은 fade/slide를 사용한다고 role=menu·첫 menuitem focus·닫힘 정책·portal 구현까지 같다고 가정하지 않습니다.
