# AgentHubInput — 접근성

공용 Input의 native semantics·label/id·키보드·IME·선택/복사·오류 연결을 유지합니다.
기존 aria-invalid를 보존하고 aria-describedby는 도움말과 오류ID를 병합합니다. 오류 문장은 읽을 수 있게 제공합니다.
Input 표면이 자체 focus를 표시합니다. 상위 control이 focus를 소유할 때만 내부 중복 outline을 scoped 제거합니다.
read-only는 Tab·읽기·복사를 허용하면서 값 변경을 차단하고 disabled는 native disabled로 조작과 Tab 진입을 막습니다.
입력·오류 상태가 바뀔 때 native input을 교체하거나 focus·selection을 잃지 않습니다.
상태 색상 전환은200ms 공용 계승이며 reduced-motion에서는 즉시 표시합니다.
