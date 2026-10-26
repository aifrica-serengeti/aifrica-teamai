# AgentHubProgressAlert — 동작과 상태 소유권

이 시안은 ‘응답이 중단되었습니다.’라는 안내와 두 버튼의 정적인 enabled 구성을 제공합니다.
표시 여부·원인·요청 진행·편집 가능 여부·각 동작의 결과는 제품 상태 owner가 정합니다.
Figma 이름 `progress-alert`나 root의 단일 샘플에서 새 요청 상태 enum을 만들지 않습니다.

## 재시도

‘다시시도’는 제품에서 정한 대상 response/request에 대해 하나의 명령 경로를 실행합니다.
click·상위 컨테이너 이벤트·form submit에 같은 명령을 중복 연결하지 않습니다. 버튼은 기본 `type="button"`이며,
재시도를 submit으로 처리할 필요가 있으면 제품이 한 실행 경로와 form owner를 명시합니다.

대상 ID·재시도 조건·idempotency·중복 요청 차단·경쟁 응답의 적용 범위는 요청 owner가 소유합니다.
pending 상태를 컴포넌트 내부에 다시 복제하거나 화면이 다시 렌더됐다는 이유로 재시도를 자동 실행하지 않습니다.
전송 중의 버튼 비활성 조건과 오류·성공 후 안내 유지/제거 시점도 제품이 명시합니다.
재시도는 진행 중 요청 취소나 이 안내를 닫는 동작과 다릅니다.

## 프롬프트 편집

‘프롬프트 편집’은 제품이 소유한 편집기·기존 draft에 연결합니다. 편집을 누르는 것만으로 새 요청을 보내거나
기존 메시지·첨부·선택 에이전트·draft를 지우지 않습니다. 어떤 프롬프트를 편집할지와 보존·복원 정책은 제품 adapter가 정합니다.
사용자가 명시적으로 편집을 요청한 뒤의 focus는 실제 편집기 owner와 연결하며, 안내가 나타나는 순간 자동으로 이동시키지 않습니다.

## 독립적인 동작 조건

재시도 가능 여부와 편집 가능 여부는 독립적으로 전달합니다. 한 요청의 pending이 두 동작을 모두 막아야 하는지는
제품 정책이며, 동일한 Boolean 하나로 조용히 합치지 않습니다. native disabled와 요청 owner의 guard를 함께 유지합니다.
버튼 자체의 hover·pressed·disabled·focus 의미는 [AgentHubButton](../AgentHubButton/behavior.md)을 따릅니다.
Spinner·loading label·새 전환 효과는 추가 근거 없이 붙이지 않습니다.

진행률 bar·퍼센트·남은 시간·취소·닫기·자동 닫기·Toast 등록·HTTP 오류 자동 발행은 제공하지 않습니다.
이 표시 컴포넌트가 API URL·stream 수명·abort·retry timer·상태 저장을 소유하지 않습니다.

## 제품의 선택적 동작

callback을 전달한 동작만 렌더하고 한 동작의 disabled 조건은 해당 버튼에만 적용합니다. 없는 동작의 label이나
disabled Boolean만으로 빈 버튼을 만들지 않습니다. 두 callback이 없으면 동작 그룹도 생략합니다.
기존 두 callback 호출부의 순서·기본 label·실행 경로는 유지합니다.

예약 완료 안내는 제품이 title·schedule glyph·‘작업 편집’ label과 단일 편집 callback을 연결해 조합합니다.
편집은 예약 편집 owner를 열며 예약 재실행·등록·재시도를 함께 호출하지 않습니다. 원래 중단 안내의 성공 상태 enum을
새로 만든 것이 아니며 생성·성공·안내 제거·focus 수명은 해당 페이지가 소유합니다.
