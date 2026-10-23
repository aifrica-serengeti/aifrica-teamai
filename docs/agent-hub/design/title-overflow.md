# SNB·Session 긴 제목 표시 채택

2026-10-23 사용자 요청으로 SNB 항목과 Session의 예약·출력 제목·컨텍스트 대표 값에 적용하는 runtime 보완입니다.
기존 JSON·SVG·원본 치수는 보존합니다. SNB 원본은 HUG/ellipsis 없음, SessionItem 제목과 SessionContextItem value 원본은 ENDING/maxLines1이며,
아래 흐림·이동·시간은 Figma 실측이나 ChatGPT 내부 구현의 측정값이 아닙니다.
공용을 켠 경우 기존 Button·Link·focus 의미를 유지하고, 공용 off에서는 같은 표시 계약을 제품 엔진으로 연결합니다.

## 범위와 구조

적용 대상은 [AgentHubSNBItem](./components/AgentHubSNBItem/README.md)의1·2depth 제목,
[AgentHubSessionItem](./components/AgentHubSessionItem/README.md)의 예약·출력 제목과
[AgentHubSessionContextItem](./components/AgentHubSessionContextItem/README.md)의 대표 value입니다.
컨텍스트 행은 icon·고정66px label-group·count를 유지하고 value만 같은 helper로 이동합니다.
페이지의 데이터·선택·펼침·파일 열기·더보기 명령은 변경하지 않습니다.
단순한 긴 제목 표시를 새 Agent Hub 컴포넌트·스킬·Menu 역할로 등록하지 않고 제품의 가까운 공용 텍스트 helper 한 곳에서 재사용합니다.

```text
기존 native button/link: hover·keyboard focus·활성화 소유
├─ 고정 glyph / icon-box
├─ 제목 viewport: flex1/min-width0·single line·overflow clip
│  └─ 원문 텍스트 한 개: 실제 넘친 길이만큼 이동
└─ 고정 meta / count / 형제 more button
```

제목에 button·tabIndex·live region을 추가하지 않습니다. 원문을 잘라 상태에 저장하거나 자막·복제 문자열을 겹쳐 읽게 하지 않습니다.
텍스트 helper의 장식 mask는 글자에만 적용하고 행 배경·focus ring·아이콘·분류 label·count·더보기·meta에는 적용하지 않습니다.

## 상태와 시간 제안값

| 상태 | 채택 동작 |
| --- | --- |
| 실제 글자가 폭 안에 들어감 | 흐림·이동 없음 |
| 긴 제목 기본 | 한 줄을 유지하고 오른쪽24px에서 점차 사라짐. `…` 문자를 붙이지 않음 |
| native 주 동작 hover / focus 진입 | 100ms 뒤 숨은 끝부분을 볼 수 있도록 글자만 왼쪽으로 이동 |
| 이동 중 | 왼쪽·오른쪽 가장자리 흐림으로 잘리는 경계를 표현 |
| 끝 도달 | 오른쪽 흐림을 해제해 마지막 글자·파일 확장자를 선명하게 표시하고 머묾 |
| hover·focus 모두 벗어남 | 현재 위치에서200ms ease로 처음으로 복귀. 돌아간 뒤 오른쪽 흐림만 표시 |
| 짧은 제목으로 변경·더 넓어짐 | 기존 이동을 취소하고 즉시 정렬·흐림 상태 재측정 |

이동 속도36px/s linear·진입 대기100ms·가장자리24px·이탈 복귀200ms ease는 **신규 제안값**입니다.
짧게 넘친 제목과 길게 넘친 제목 모두 같은36px/s로 이동합니다. hover/focus 이동 시간은 `abs(목표X − 현재X) / 36 × 1000`ms이며 최소 시간을 두지 않습니다.
이탈 중 재진입해도 현재 위치부터 남은 거리로 계산하고, 남은 거리가0이면 즉시 끝 상태를 유지합니다.
반복 ticker·무한 왕복·글자 입력 효과가 아닙니다. 계속 hover/focus하고 있으면 끝에서 유지하고 재진입하면 현재 위치에서 자연스럽게 이어갑니다.
native 주 동작이 disabled이면 이동을 시작하지 않습니다. 더보기 버튼의 hover·click은 행의 주 동작을 대신 실행하지 않습니다.

## 측정과 수명

이동 거리는 제목 원문 폭과 제목 viewport의 실제 폭 차이 `max(0, textWidth − viewportWidth)`로 계산합니다.
브라우저의 소수점 CSS 폭을 보존하고 이동 거리만 올림해 마지막 글자의 일부가 잘리지 않게 합니다. 정수 scrollWidth만으로 동일 폭의 짧은 제목을 넘침으로 판정하지 않습니다.
현재 행의 padding·아이콘 gap·상시 예약된 more·meta·컨텍스트 label-group66px·count의 폭을 제외한 가용 폭을 측정하며 문자열 글자 수로 추정하지 않습니다.
동일 helper가 viewport·원문 크기 변경, 웹폰트 로드, 제목 변경을 처리하고 각 행에 다른 marquee 엔진을 복제하지 않습니다.
제목 이동이 가로 스크롤·행 너비·높이·형제 위치를 바꾸지 않아야 합니다.

빠른 hover 이탈/재진입, focus와 pointer의 중첩, 제목 변경·resize·unmount에서는 이전 animation·완료 callback을 취소합니다.
예전 완료가 새 제목의 mask나 transform을 바꾸지 않게 하고, observer·font/media listener·animation은 owner 해제 때 정리합니다.
숨겨진 subtree가 다시 열리면 실제 폭으로 갱신하며 선택·expanded 상태를 표시 helper에 복사하지 않습니다.

## 접근성과 대안

전체 제목은 원문 DOM과 기존 native control의 접근성 이름에 남깁니다. 브라우저 기본 툴팁을 만드는 title 속성은 제목과 상위 행에서 제거합니다.
키보드로 주 동작에 focus하면 hover와 같은 표시를 제공하며 추가 Tab 정지점을 만들지 않습니다.
전체 이름에 대한 보조기술 접근은 툴팁에 의존하지 않습니다. 원문은 이름 계산에 한 번 포함합니다.
touch에 hover를 강제하거나 자동으로 전체 행을 움직이지 않습니다. 기존 상세·항목 명령·원문 접근 경로를 보존합니다.

reduced-motion에서는 대기·보간·mask를 끄고 정적인 시작 표시와 원문 이름을 유지합니다. title 기반 기본 툴팁은 표시하지 않습니다. forced-colors에서도 이동·mask를 제거합니다.
인쇄에서는 이동 효과를 제거합니다. 어떤 대안에서도32/36px 행 안에서 줄바꿈을 강제해 옆 항목이나 meta를 겹치게 하지 않습니다.
설정이 실행 중 바뀌어도 이전 애니메이션이 남지 않게 합니다. 미제공 dark·읽기 모드의 시각은 별도 제품 검증 범위입니다.

## 조합과 검증

- SNB의 기존 `.item-main span`처럼 모든 자손 span을 ellipsis 처리하는 selector는 전용 제목 viewport에 한정합니다.
  more 공간20px·right2px·1depth gap8·2depth left36과 폴더 glyph·connector는 유지합니다.
- Session의 icon-box28·glyph16·content gap4·meta12/16과 title14/20을 유지합니다.
  공용 Button의 wrapper `display:contents` 규칙이 제목 viewport까지 평탄화하지 않게 확인합니다.
- SessionContextItem의 label-group66px·icon16·content gap8·root gap4·value12/16·count를 유지합니다.
  value만 같은 helper로 표시하고 title 기반 기본 툴팁을 제거합니다. 클릭·선택·후속 popup과 count는 기존 부모 owner에 남깁니다.
- 짧은/긴/빈 제목, 한국어·영문·확장자, meta 표시·more 유무·1/2depth, 제목 교체·resize·폰트 로드 후 overflow를 확인합니다.
- 중간 프레임과 끝을 확인해 글자만 이동하고 마지막 글자가 흐림에 가리지 않는지 검사합니다.
  host의 focus ring·클릭 영역·행 배경·glyph·label·count·meta·more의 좌표는 일정해야 합니다.
- 빠른 재진입·focus 중 pointer 이탈·disabled·unmount·읽기 설정 변경에서 잔상·중복 animation·남은 listener가 없어야 합니다.
- 주 동작·더보기 callback은 한 번만 실행되고, 메뉴 복귀·파일 열기·Session 접기·스크롤 처리와 충돌하지 않아야 합니다.
- 같은 helper를 사용하는 소비 구현의 lint·계약·타입·동작 테스트·빌드와 실제 브라우저의 모션·레이아웃을 확인합니다.
