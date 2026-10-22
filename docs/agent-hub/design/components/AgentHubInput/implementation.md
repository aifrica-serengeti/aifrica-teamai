# AgentHubInput — 구현

공용 Input의 native control·값·IME·필수값·오류·readOnly/disabled 계약을 먼저 확보합니다.
실제 구현이 없으면 재사용 InputControl부터 만든 뒤 AgentHubInput은 label/id·error 연결과40/r8/p12 표면만 조합합니다.
공용 기본 radius4는 보존하고 adapter 범위에서 radius8을 연결합니다. 임시 input을 Dialog 안에 복제하지 않습니다.
현재 fixture의 `src/components/forms.tsx` → `common/controls.tsx`는 소비 예시이며 실제 Agent Hub 구현 증거가 아닙니다.
비밀번호 토글·전체 size/variant·counter 등의 공용 전체 API는 이 부분 구현 범위가 아닙니다.
source/export 확인 후 소비 저장소 registry에 지원 범위를 기록합니다. 공용 off이면 자체 control 계약을 씁니다.
