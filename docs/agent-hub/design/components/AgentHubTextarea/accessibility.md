# AgentHubTextarea — 접근성

공용 Textarea의 native semantics·label/id·키보드·IME·줄바꿈·선택/복사를 유지합니다.
외부 aria-invalid를 보존하고 도움말과 오류ID를 aria-describedby에 함께 연결합니다.
표면 한 곳이 입력 focus를 표시하도록 내부 outline만 scoped 제거하며 toolbar button의 독립 focus는 보존합니다.
read-only는 읽기·복사를 허용하면서 값 변경을 차단하고 disabled는 native disabled로 Tab·조작을 막습니다.
Toolbar는 fieldset disabled 또는 동등한 native 처리로 keyboard/pointer를 함께 차단합니다.
본문의 긴 입력과 커서가 toolbar 뒤에 숨지 않아야 하며 popup/listbox는 Textarea 책임이 아닙니다.
reduced-motion에서는 색상·경계 상태를 즉시 표시합니다.
