# AgentHubSNBRuntime — 치수와 표면

샘플은 288×1033px, white, 오른쪽 border1px #DDD, 좌우16px·상하24px padding, 주요 gap16px입니다. 실제 높이는 shell viewport가 소유하며1033px를 고정하지 않습니다.

제목은 Pretendard600·24/32px, 설명은400·12/16px·#757575입니다. 세그먼트는 높이32px이고 선택기는 별도40px 계약을 사용합니다. 긴 대화 목록의 scrollbar·상하 경계 fade·끝 여백은 [기존 SNB 계약](../AgentHubSNBPanel/README.md)을 연결합니다.

제목 묶음은 패널의 기본 px16 안에서 다시 px8을 적용하고, 제목 행과 설명 사이 gap은8px입니다. header 안의 제목 묶음과 Divider wrapper 사이는16px입니다. Divider wrapper도 px8이며, 내부 Divider의 py8과1px 선으로 높이17px를 만듭니다. 부모에서 Divider의 위아래8px를 다시 더하지 않습니다.

RuntimeSelect의 wrapper도 px8입니다. 생성 context의 wrapper 폭255px와 자식 `w-full`을 구분하며, 선택기는 wrapper의 내용 폭을 채웁니다. 독립 선택기의238px 샘플 폭을 고정하거나 패널의 전체 내용 폭을 바로 적용해 제목·선·선택기 정렬을 깨뜨리지 않습니다. 이 구조와 여백은 미선택·선택 두 상태에 공통입니다.

새 채팅 버튼은 양쪽 상태에 공통이며 기존 ghost32 인스턴스의 좌우 padding을8px로 재정의합니다. standalone ghost32의 px16을 이 override에 덮어쓰지 않습니다. 미선택에서 버튼을 눌렀을 때 런타임 선택을 유도할지 등의 실행 정책은 제품 owner가 정합니다.

## 모드 선택과 채팅 섹션의 실제 override

모드 그룹의 첫 segment는 투명, 두 번째는 white·1px #DDD·radius6입니다. 두 상태의 실제 인스턴스는 `4023:60009`·`4023:59888`이며, standalone 그룹의 첫 선택과 다른 조합입니다. 그룹 높이32·버튼40×32의 규격은 유지합니다. 런타임 미선택도 두 번째 모드가 선택된 채로 RuntimeSelect 안내만 표시합니다.

| 선택 후 구성 | 원문에서 확인한 값 | 기존 계약과의 연결 |
| --- | --- | --- |
| 채팅 section | `4004:27149`, 세로 gap4 | Header와 행 목록 사이4px |
| Header | `4004:27150`, 높이20·좌우 padding8·space-between | 독립 Header의 left8/right0과 다르게 오른쪽에도8px |
| title/toggle | 제목12/16·400·#656B74, toggle20·glyph16 | 기존 Header part·현재 채택 title/toggle gap2는 별도 유지 |
| 보조 actions | filter·plus 두 개, 각각20×20·p2·r4·glyph16 | direct를 추가하지 않으며 두 glyph는 #656B74·선1px |
| 대화 행 | `4004:27153`~`4004:27161`, 높이32·px8/py6·r6 | 기존 SNBItem의 leading-icon 숨김 |
| 행 label | Pretendard400·14/20·#1C1C1C | label-only이며 standalone의 folder16을 추가하지 않음 |

Header의 filter와 plus는 각각 [기존 filter16](../../assets/snb/section-filter-16.svg)·[plus16](../../assets/snb/section-plus-16.svg)과 exact bytes가 같습니다. 샘플에서 두 버튼이 보인다는 사실을 모든 포인터 상태의 노출 timing으로 확대하지 않습니다. 행9개는 샘플 수이며 실제 배열 길이를 제한하지 않습니다.

## 하단 장식과 제품 경계 fade 구분

원문에는 미선택 `4004:27101`·선택 `4004:27163`의 하단 fade가 공통으로 있습니다. 높이53px·bottom0·left−6/right−10의 absolute 장식이며 레이아웃 gap을 차지하지 않습니다. 상단 fade는 이 두 원문에 없습니다. 상단 추가·실제 overflow 감지·끝 여백·pointer 차단 방지는 [기존 SNB의 제품 채택](../AgentHubSNBPanel/styles.md)으로 구분합니다.

생성 참조의 white alpha0→1·`from-[114.15%]` 표기는 저장하되 유효한 native gradient transform을 이 context에서 확인한 값으로 취급하지 않습니다. 기존 SNB 원본의 음수 stop 환산·alpha 수치를 현재 Runtime 원본에서 새로 실측했다고 기록하거나 양수114.15% 코드를 그대로 붙여 흐림을 없애지 않습니다. 제품은 검증한 기존 fade adapter를 재사용합니다.

### 모드 glyph의 응답 내부 불일치

확보한 미선택 MCP 스크린샷의 오른쪽 선택 항목은 왼쪽 chat과 다른 folder/code 모양입니다. 반면 생성 참조는 두 항목 모두 `segment-icon/chat`·18px·같은 chat SVG를 출력합니다. 두 결과가 달라서 오른쪽 glyph의 native 크기·정확한 source/binding을 이 생성 코드만으로 확정하지 않습니다. RuntimeSelect leading의20px folder/code SVG를 동일 source라고 추정 매핑하거나 양쪽을 chat으로 복제하지 않습니다. 현재 이 부분은 추가 원본 확인이 필요한 범위이며, 두 모드의 선택 위치와 서로 다른 시각을 구분합니다.

시각 대조 근거: [미선택 MCP 스크린샷](../../assets/refresh-20261105/snb-runtime-unselected-reference.png)·[선택 MCP 스크린샷](../../assets/refresh-20261105/snb-runtime-selected-reference.png). 두 이미지는 도구가286×1024로 축소한 응답 증거이며 Figma 원본 외곽288×1033이나 재사용할 아이콘 export가 아닙니다. 이 PNG에서 native glyph 치수를 역산하지 않습니다.
