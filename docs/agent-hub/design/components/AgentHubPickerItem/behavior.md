# AgentHubPickerItem — 선택·모델 조작과 상태 소유권

`kind`는 행의 표시 종류이고 `state=hovered`는 포인터 상호작용입니다.
hover를 현재 선택 값·실행 중·선택 확정 상태로 저장하지 않습니다. 행은 선택 의도를 한 번 통지하고,
선택 값·검색 결과·열림·확정·닫힘·요청은 [부모 Picker](../AgentHubPicker/behavior.md)와 제품 owner가 관리합니다.

title·meta·모델 ID/label/logo·유형은 제품 데이터로 연결합니다. ‘회의록 작성 도우미’·‘전체 공개’·‘Qwen 3.8’을
실제 기본 항목·권한·고정 모델로 사용하지 않습니다. meta는 표시 문구이며 권한 판정을 대체하지 않습니다.
chat도 같은 title property를 사용하므로 종류 이름으로 실제 제목을 덮어쓰지 않습니다.

## 모델 표시와 모델 조작을 구분합니다

model-selector는 FRAME이므로 그 이름과 chevron만으로 실제 팝업·route·모델 변경 API를 확정하지 않습니다.
단순 정보이면 행 선택과 같은 하나의 조작 안에서 장식/텍스트로 남깁니다.
제품에서 독립적인 모델 변경을 제공하면 행 선택과 모델 조작을 형제 control로 나눕니다.
모델 button을 눌렀을 때 행 선택·확정·전송도 함께 실행되지 않아야 합니다.

이 구조를 `role=option` 또는 button 안에 다른 button을 중첩한 뒤 click 전파 차단만으로 해결하지 않습니다.
독립 모델 조작이 있는 경우 Picker의 dialog 구성과 실제 focus·popup owner를 연결합니다.

## 변경과 추가 상태

실제 항목 ID·선택 가능 여부·중복 실행 방지와 disabled는 호출자가 소유합니다.
native button을 사용하면 type=button과 Enter/Space를 유지하고, pointer click·keydown·상위 행에 같은 callback을 중복 연결하지 않습니다.
listbox option으로 사용할 때는 부모의 선택·keyboard 경로를 사용하고 내부 조작을 추가하지 않습니다.

description은 기본 숨김입니다. Boolean true가 가능한 속성이라는 사실과 보이는 배치를 검증했다는 주장을 구분합니다.
설명을 켠 제품은 행 높이·읽기 순서·긴 내용 처리까지 별도 채택해 검사합니다.
disabled/loading/read-only를 추가하면 실제 변경을 차단하고 기존 값·메타데이터를 임의로 지우지 않습니다.
추가 상태의 색상·Spinner·선택 마크는 원본에 없는 것으로 남기고 제품 근거를 기록합니다.

항목 선택이 제품의 draft·대화·agent/model을 바꾼다면 기존 작성 내용·IME·첨부·프로젝트 보존 정책을 먼저 연결합니다.
이 행이 API·자동 송신·모델 호출·검색 debounce·전송 후 초기화를 새로 소유하지 않습니다.
