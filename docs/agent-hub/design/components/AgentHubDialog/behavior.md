# AgentHubDialog — 상태와 동작의 책임

공용을 켠 UI에서는 `DOCS_ROOT/frontend/design/components/Dialog/behavior.md`의 모달·focus·scroll 계약을 유지합니다.
공용을 끈 환경에서는 제품이 채택한 동등한 계약을 확인합니다. 시각 recipe가 open·저장·검색·닫힘 상태를 새로 소유하지 않습니다.

## 한 owner가 열림과 닫힘을 제어합니다

제품이 controlled open, 유효 trigger, 닫힘 사유와 작성 중 변경 확인을 관리합니다.
닫기 버튼·취소·Escape·외부 상호작용은 같은 닫힘 정책으로 연결하며 별도의 내부 open 상태를 복제하지 않습니다.
취소 버튼이 보이지 않는 것을 dismiss 잠금으로 해석하거나 저장 성공 후 자동 닫힘을 추정하지 않습니다.
진행 중 요청에서 취소·닫힘을 허용할지와 요청 취소 여부도 제품이 별도로 정합니다.

공용 문서의 `closeOnEscape`·`closeOnOutsideClick` 이름을 실제 CMP 공개 API로 단정하지 않습니다.
읽기 전용 CMP의 Root는 primitive 직접 alias이며 실제 Content 이벤트는 `onEscapeKeyDown`·`onInteractOutside`입니다.
소비 저장소의 실제 API를 확인한 뒤 필요한 제품 adapter에서 정책을 연결합니다.
기존 notification viewport 외부 상호작용 보호·portal 생명주기·focus 복귀를 시각 변경으로 제거하지 않습니다.

## 예약 작업 편집

이름·지침·주기·고급 설정·모델·연결 context와 기존 draft는 제품 form owner가 관리합니다.
샘플 ‘매시간’과 지침의 ‘오전9시’ 문장만으로 실제 시간대·cron·예약 API를 만들지 않습니다.
고급 행의 up glyph는 추가 설정 본문·펼침 동작이 구현됐다는 근거가 아닙니다.
Toolbar의 세 Button과 모델 FRAME도 제품이 채택한 선택 UI·허용 데이터에 연결하며 기존 Picker를 자동 호출하지 않습니다.

확인은 form의 submit 한 경로가 소유합니다. 요청 전 유효성·권한·중복 제출 guard를 확인하고,
실패 시 draft와 입력 focus를 보존하며 성공 후 상태 갱신·닫힘은 제품이 명시합니다.
실제 저장 Button은 disabled 표본이지만 이유와 활성 전환 규칙은 미제공입니다. dirty·validation·pending과 임의로 등치하지 않습니다.
취소·닫기는 저장 요청을 실행하지 않습니다. 별도 onClick과 form onSubmit에서 같은 mutation을 중복 실행하지 않습니다.

## 에이전트 찾기

제품이 query, 공개 범위·최근 사용 등 필터 값, 결과·권한·현재 선택, 요청 상태를 관리합니다.
Search의 focused 외형은 autofocus 명령이 아니며 filtered=false는 모든 제품 필터가 해제됐다는 뜻이 아닙니다.
검색은 기존 Search의 controlled 값·clear·submit·IME 계약으로 연결하고 debounce 지연·조회 API·캐시는 실제 제품 정책으로 정합니다.
IME 조합 중 Enter로 요청이나 카드 실행을 오발하지 않습니다.

Rail은 직접 FRAME 행들입니다. 제품 의미가 필터이면 단일 활성화 button, 실제 이동이면 link 등으로 연결합니다.
메뉴·Tree·SNB 역할이나 router 경로를 source 이름만으로 추가하지 않습니다.
카드 활성화가 선택·상세 열기·대화 시작 중 무엇인지는 제품이 결정하며 샘플 pin/tools로 실제 API를 추정하지 않습니다.
각 ItemCard의 주 동작과 보조 동작은 [기존 계약](../AgentHubItemCard/behavior.md)에 따라 분리하고 중첩 버튼을 만들지 않습니다.
loading·empty·error·pagination·가상화·필터 전환 후 선택 보존은 이 단일 화면에서 측정되지 않았습니다.

## scroll과 motion

두 Figma recipe의 overflowDirection은 NONE입니다. clipping이나 장식 thumb를 실제 scroll 구현으로 취급하지 않습니다.
실제 viewport·wheel·touch·keyboard scroll은 기존 엔진 한 곳이 소유하고 내용 끝·focus 대상에 접근할 수 있어야 합니다.
Finder에는914px 결과가732px body보다 길므로 단순 clipping 복사는 허용하지 않습니다.
fade는 장식이며 pointer-events:none·접근성 제외로 연결하고 실제 canScrollMore에 맞춰 표시합니다.

읽기 전용 CMP의 열림·닫힘은200ms/ease overlay fade와 scale .96↔1이며 기존 portal 생명주기를 유지합니다.
이번 Figma에서 새 motion은 측정되지 않았습니다. CMP source에는 reduced-motion 대체 구현이 확인되지 않았으므로
이미 제공된 기능이라고 단정하지 않고 소비 제품에서 감소 동작·생명주기를 확인해 채택합니다.

## 2026-10-21 채택 보강

Dialog는 기존 소비 제품의 단일 modal 엔진에 공용200ms ease / opacity0↔1 / scale.96↔1을 연결합니다.
이번 fixture의 native adapter는 exit 후 실제 close·focus 복귀를 한 번 수행합니다. 기존 Radix 제품은 그 엔진의 presence/unmount에 같은 종료 의미를 연결하며 native로 교체하지 않습니다.
빠른 재열기는 이전 완료 처리를 취소하고 reduced-motion 변경 시 즉시 현재 상태로 완료합니다.
X32/r4/glyph24에 IconButton hover/pressed/focus 동작을 연결합니다.
폼은 AgentHubInput·AgentHubTextarea·AgentHubSelect를 조합하고 직접 임시 control을 생성하지 않습니다.
