# AgentHubMessageExample — 선택 동작과 제품 연결

예시 하나는 단일 action host입니다. `hovered`는 hover, `pressed`는 누르는 순간에 연결하고,
선택됨·전송 중·송신 완료 상태로 바꾸지 않습니다. 토글의 `aria-pressed`를 자동 부여하지 않습니다.

기본 구현은 native `button`과 `type="button"`을 사용합니다. label이나 화살표에 별도 click을 달거나
버튼과 wrapper·키보드 handler에서 같은 callback을 중복 실행하지 않습니다. native Enter/Space 활성화를 유지합니다.

## 선택 결과의 소유권

예시 ID·표시 라벨·실제 prompt payload는 제품이 소유합니다. 라벨이 짧거나 번역됐다는 이유로 이를 곧바로 서버 요청 본문으로 사용하지 않습니다.
선택 결과는 다음 중 제품이 명시한 **한 명령 경로**에 연결합니다. 이 시안은 어느 경로를 사용하는지 확정하지 않습니다.

- 현재 draft를 예시 내용으로 바꾸기
- 기존 draft에 예시 내용을 추가하기
- 제품이 별도로 승인한 명령을 실행하기

예시를 클릭했다고 즉시 채팅을 전송하거나 기존 draft·IME 조합·첨부·선택 에이전트·프로젝트를 자동으로 초기화하지 않습니다.
대체/추가 정책과 편집기 focus·커서 위치·조합 중 처리·기존 작성 내용의 보존 여부는 입력기 owner와 연결합니다.
실제 요청을 실행하는 제품이라면 대상·권한·중복 요청 차단·성공/실패·stream·재시도도 요청 owner가 관리합니다.

## 추가 상태를 채택할 때

disabled를 제공하면 native disabled와 실행 handler의 guard를 함께 연결하고 hover/active 스타일도 차단합니다.
disabled 색상·포커스·동작을 제품이 명시적으로 채택해 검증하며, 세 Figma 상태에 이미 포함된 것으로 표시하지 않습니다.
loading Spinner·성공 배지·자동 숨김·알림·화면 이동은 추가 근거 없이 붙이지 않습니다.

아이콘을 숨기는 것은 표현 선택입니다. action·접근성 이름·callback은 유지하고, 화살표 자체를 별도 조작 대상으로 만들지 않습니다.
예시 목록의 배열·노출 조건·선택 후 유지/제거·API 조회와 요청 수명은 이 단일 컴포넌트의 책임이 아닙니다.

## 선택 후 입력의 표시

현재 사용자 채택은 draft를 한 번에 채우고 [공용 외부 텍스트 reveal](../AgentHubChatComposer/external-text-motion.md)을 재생하는 방식입니다.
예시 callback은 값과 외부 주입 revision을 같은 부모 명령에서 갱신합니다. 글자별 타이머로 draft를 나누거나 완료 후 자동 전송하지 않습니다.
직접 타이핑·IME에는 재생하지 않고, 조합 중 예시 선택의 보존 정책과 편집 focus는 여전히 입력 owner가 정합니다.
