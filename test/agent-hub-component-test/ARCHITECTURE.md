# 컴포넌트 테스트 앱 구조

이 패키지는 제품 source 없이 수신 가이드로 구현한 소비 앱입니다. React 19.2.8·TypeScript 5.9.3·Vite 8.3.4와 일반 CSS를 사용합니다.

| 위치                              | 책임                                                                        |
| --------------------------------- | --------------------------------------------------------------------------- |
| `src/components/primitives.tsx`   | 공통 leaf 역할과 Agent Hub 시각 계약17종                                    |
| `src/components/collections.tsx`  | Calendar, Picker, Menu, Flyout, Card16종과 overlay 키보드·focus             |
| `src/components/conversation.tsx` | 대화와 세션의 표시 계약12종. 요청·경과시간·선택은 입력으로 받음             |
| `src/components/shell.tsx`        | Agent Hub shell과 dialog11종, 측정 observer와 native modal adapter          |
| `src/components/TextReveal.tsx`   | 외부 문자열·새 메시지 청크의 공통 표시 모션. 원문·요청 상태는 소유하지 않음 |
| `src/components/forms.tsx`        | 공용 control 위의 Input/Textarea/단일 Select adapter3종                     |
| `src/components/common/`          | native control·단일 Select·ScrollArea·측정 높이 disclosure 공용 엔진        |
| `src/gallery/`                    | 사용자 입력, 예제 데이터, draft·query·선택·실행 상태의 로컬 owner           |
| `src/App.tsx`                     | 그룹 전환과 계약 검색, lab 자체의 탐색                                      |
| `src/styles.css`                  | 서체·semantic tokens와 lab 전시 레이아웃                                    |
| `public/agent-hub/assets/`        | TeamAI 수신 자산의 byte-exact 로컬 사본                                     |
| `.aifrica/frontend.json`          | 이 테스트 앱에 한정한 실제 구현 매핑. 전체 제품 채택은 draft                |
| `scripts/`                        | 격리 CLI 수신, 자산 준비, source/export·자산 검증                           |

단순 표시 props에서 값을 파생하고 API·route·인증을 표현 컴포넌트에 넣지 않습니다. 메뉴와 modal의 focus/escape는 한 owner가 관리합니다. Header·viewport의 ResizeObserver와 overlay의 motion listener는 수명 종료 시 해제합니다. 동일 의미의 버튼과 glyph는 한 primitive를 공유하고, Figma에서 다른 실제 자산을 쓰는 부분은 별도 exact asset adapter로 보존합니다.
