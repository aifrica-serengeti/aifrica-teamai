# Agent Hub Card 선택과 적용

표시하려는 항목에 맞는 전용 계약을 먼저 고른 뒤, 해당 문서의 원본·크기·상태·하위 컴포넌트를 확인해 주세요.
다섯 유형은 공용 Card를 같은 이름으로 덮어쓰는 구조가 아닙니다. 실제 공용 Card 인스턴스를 재사용했다고 확인한 것도 아닙니다.
공용의 관련 의미·접근성 계약을 참고하고, Agent Hub의 시각과 제품 동작을 명시적으로 연결합니다.

## 어떤 유형을 사용하나요?

| 표시할 대상 | 선택할 계약 | 독립 샘플의 크기·모서리 |
| --- | --- | --- |
| 파일 한 항목 | [AgentHubFileItem](./components/AgentHubFileItem/README.md) | 폭512px·radius12px |
| 작은 정사각형 데이터 항목 | [AgentHubDataCard](./components/AgentHubDataCard/README.md) | 120×120px·radius12px |
| 썸네일을 중심으로 보여 주는 항목 | [AgentHubThumbnailCard](./components/AgentHubThumbnailCard/README.md) | 폭324px·radius24px |
| 예약 작업 항목 | [AgentHubScheduleCard](./components/AgentHubScheduleCard/README.md) | 폭324px·radius24px |
| 일반 항목 카드 | [AgentHubItemCard](./components/AgentHubItemCard/README.md) | 폭324px·radius24px |

이 수치는 원본 비교용입니다. 페이지의 grid·목록·부모 컨테이너가 실제 폭을 공급하며 샘플 폭을 모든 화면에 고정하지 않습니다.
본문·숨김 요소·지원 상태·실제 인스턴스 재사용 범위는 각 상세 문서에서 확인합니다.
카드 이름만 보고 클릭·선택·편집·다운로드·예약 실행을 함께 추가하지 않습니다.

## 공용 Card와 무엇이 다른가요?

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Card/README.md`와
`DOCS_ROOT/frontend/design/components/CardAccordion/README.md`를 비교 기준으로 읽습니다.

| 비교 항목 | 공용 참조 기준 | Agent Hub 적용 기준 |
| --- | --- | --- |
| 폭·radius | Card의392px 샘플·radius8px | 위 다섯 계약의512/120/324px 샘플과 radius12/24px를 구분 |
| 내부 배치 | 기본 Card padding16/24px·gap24px·leading40/44px | 각 원본의 실제 padding·gap·slot을 적용하며 공용 수치를 일괄 상속하지 않음 |
| 표면·상태 | 기본 white/선1px #DDD, hover #F8F8F8·pressed #F4F4F4와 Mid | 각 상세 문서가 확인한 fill·실제 선·효과·상태를 적용 |
| 선택과 focus | 선택은 border1+inset1의 accent, focus는 바깥3px 간격의1px 링 | 전용 선택 시각과 실제 선택 owner를 연결하고 focus를 선택색만으로 대체하지 않음 |
| 썸네일 | 전체 wrapper가 선1px/r8을 소유하고 이미지220px·하단 선, 내부 content는 무테두리 | ThumbnailCard의 별도 크기·크롭·모서리·표면 경계를 확인하고 공용 wrapper 선을 중복하지 않음 |
| 부가 콘텐츠 | new Chip·대표 날짜·Summary·footer를 조합하는 공용 구조 | 전용 원본에 없는 Chip·Summary·footer를 자동 추가하지 않음 |
| 펼침 | CardAccordion의56px Trigger·별도 Panel·250ms 높이 모션 | 실제 접기 기능을 채택할 때만 의미를 연결하며 모든 Card를 Accordion으로 바꾸지 않음 |

공용 Card의 일반 `children` 예시는 콘텐츠를 조합하는 방법입니다. 그것만으로 새 Figma에 native SLOT이 있거나,
파일 미리보기·업로드·편집기가 구현됐다고 판단하지 않습니다. 레이어 종류·Boolean·TEXT·실제 nested source는 상세 문서의 근거를 따릅니다.

## 카드 안의 조작은 어떻게 나누나요?

카드 하나의 활성화와 Checkbox·더보기·닫기·첨부·링크 같은 보조 조작은 서로 다른 책임입니다.
독립 control이 있는 카드 전체를 하나의 button으로 감싸지 않습니다.
비대화형 표면 안에 주 action과 보조 control을 형제로 두거나, 제품에서 검증한 동등한 구조를 사용합니다.
click 전파 차단만으로 중첩 button·Link를 해결했다고 판단하지 않습니다.

- 한 action은 하나의 실제 host에서 한 번 통지합니다. native button은 `type="button"`과 Enter/Space를 유지하고,
  wrapper·glyph·별도 keydown에서 같은 callback을 중복 실행하지 않습니다.
- 카드 선택과 Checkbox의 checked/mixed는 명시적으로 연결합니다. 같은 모양이라는 이유로 같은 상태 owner로 합치지 않습니다.
  실제 입력·label·Space·disabled/read-only·집계는 제품이 채택한 Checkbox 계약으로 연결합니다.
- 더보기 아이콘은 실제 Menu의 존재·명령 목록·삭제 권한을 확정하지 않습니다. 메뉴를 채택하면 별도 open/명령 owner와 keyboard·focus 복귀를 연결합니다.
- Avatar는 사용자 식별 표시, FileIcon은 파일 유형의 완성 타일, AttachIconButton은 독립적인 첨부 action입니다.
  원형·파일 모양이 비슷하다는 이유로 서로 대체하거나 정적 glyph에 별도 클릭을 붙이지 않습니다.
- 썸네일·아이콘·아바타는 실제 source·표시 크기·paint와 장식/설명 역할을 확인합니다.
  완성 SVG 위에 같은 배경·테두리·도형을 다시 그리지 않습니다.

## 동작과 상태는 누가 관리하나요?

| 책임 | 제품에서 연결할 owner |
| --- | --- |
| 항목 ID·목록·제목·설명·이미지·파일 정보 | 데이터와 표시 adapter |
| 현재 항목·선택·체크·다중 선택 집계 | 페이지 또는 목록의 선택 owner |
| 상세 보기·파일 열기·다운로드·예약 편집/실행 | 실제 명령·권한·요청 owner |
| 더보기·첨부·닫기·추가·팝업 표시 | 해당 조작과 popup owner |
| loading·실패·재시도·중복 요청·결과 적용 | 기존 비동기 상태 owner |
| focus·키보드·닫힘 복귀·긴 문구·반응형 배치 | 해당 control과 페이지 조립 owner |

hover/pressed는 순간 상호작용이며 selected·요청 성공·업로드 완료·예약 실행 상태가 아닙니다.
파일·예약 이름이나 샘플 문자열에서 API·route·자동 전송·삭제·읽음 정책을 만들지 않습니다.
데이터가 바뀌어도 기존 대화·draft·첨부·선택을 임의로 초기화하지 않습니다.

기존 제품의 호환 컴포넌트와 public export를 먼저 확인해 재사용합니다. 없으면 각 문서의 구현 절차에 따라 가장 가까운 기능 범위에 새 export를 만들 수 있습니다.
실제 source·자산·상태·keyboard·시각 결과를 검증한 뒤 로컬 mapping을 기록하며, 그 전에는 `unmapped`와 공유 설정의 `draft`를 유지합니다.
공용 문서의 예시나 Figma 도형만으로 consuming repository의 구현 완료를 선언하지 않습니다.

## 공용 색상 모션 계승

다섯 Card 계약은 공용을 채택한 경우 [색상 모션](./motion.md)의 **200ms·ease**를 유지합니다.
이는 Figma의 정적 상태 사이에서 측정한 duration이 아니라 공용 Card와 비교 source에서 확인한 전환을 채택한 규칙입니다.
root에는 `background-color, border-color, box-shadow, color`, 제목·설명·meta 같은 텍스트에는 `color`를 각각 지정합니다.
변하는 썸네일/상태 표면은 background-color·border-color, pseudo inside 선은 border-color만 연결합니다.
`transition:all`이나 전역 `*` 규칙, 크기·위치·높이·scale 전환을 추가하지 않습니다.

소비 제품의 `--ah-motion-color-duration`·`--ah-motion-color-easing` 또는 동등한 공용 token에 연결합니다.
`prefers-reduced-motion:reduce`에서는 해당 요소의 transition을 명시적으로 해제합니다.
과거 CMP global 스타일에 이 해제가 이미 있다는 가정만으로 소비 구현을 생략하지 않습니다.

원본이 제공한 상태와 paint는 그대로 유지합니다. FileItem에 없는 hover/selected 표면을 만들거나,
DataCard에 없는 selected/disabled 색상을 새 Figma 규격으로 추가하지 않습니다.
Thumbnail/Schedule/ItemCard의 disabled는 #AAA와 root opacity1을 유지하고 공용 자식 opacity0.4를 가져오지 않습니다.
원본 로고의 grayscale와 정확한 disabled SVG 교체도 보존합니다. 외부 SVG의 `src` 교체가 CSS color transition으로
보간된다고 설명하거나 별도 crossfade를 임의 추가하지 않습니다. 입력 차단은 transition 종료를 기다리지 않고 즉시 적용합니다.

hover 진입/이탈·누름/해제·선택·disabled 전환과 reduced motion을 실제 브라우저에서 검사하고,
모션 채택이 각 카드의 기본/hover shadow·border 포함 여부·선택 의미를 바꾸지 않는지 확인합니다.

## 공용 묶음을 끈 경우

[상위 적용 조건](./README.md)에 따라 `frontend-common`과 Agent Hub를 함께 채택한 UI 작업에서 이 catalog를 사용합니다.
`inheritCommon: false`이면 공용 문서·스킬과 `extendsCommon: true`인 Agent Hub 추가 catalog를 자동 적용하지 않습니다.
제품 자체의 스킬·컴포넌트·디자인·접근성 지침을 따르며, 이 문서의 공용 참조 경로가 설치돼 있다고 요구하지 않습니다.
