# 가이드 기반 구현 범위

## 입력과 선택

- 실제 TeamAI CLI 0.27.0으로 frontend-common + agent-hub를 수신했습니다. 전달된 문서·자산과 두 도구의 공용 스킬7종을 검증했습니다.
- 설치본의 workflow/design-system 스킬, common resolution, frontend architecture/component workflow/quality, React state-and-events·effects-refs-external-store·dom-forms-resources pack을 적용했습니다.
- 구현 기준은 설치된 Agent Hub component guide59종, Figma 실측 JSON·변수·원본 자산입니다. 제품 구현 source는 재사용하지 않았습니다. 공용 의미·접근성을 유지하면서 solution 전용 시각과 조합을 새 컴포넌트로 개발했습니다.
- 실제 source/export는 이 앱의 component-registry와 .aifrica/frontend.json에만 연결했습니다. 공용 원본 registry의 unmapped/draft는 유지합니다.

## 실측과 제품 adapter의 구분

- 측정된 Light 컴포넌트와 제공된 조합만 시각 기준으로 사용합니다. 미제공 dark·전체 상태 조합·제품 서버 정책이 검증됐다고 간주하지 않습니다.
- native dialog의 scrim, viewport max-size, 모바일 대응, 긴 제목 말줄임과 focus 가시성은 이 앱의 접근성·반응형 adapter입니다. root 원본에 없는 variant로 소개하지 않습니다.
- SNB panel의 viewport와 내용 폭 FILL은 가이드의 런타임 보완 제안을 채택했습니다. 원본 255px 내부/259px 행 차이는 설치 가이드에 그대로 남아 있습니다. 상위의 대화 선택 값에 aria-pressed를 연결하며 실제 route API를 가정하지 않습니다.
- Nav book/search의 selected paint는 원본28px glyph의 geometry를 유지한 CSS mask adapter입니다. 원본에 전체 glyph×상태가 측정된 것으로 확장하지 않습니다.
- Header 기본은 static입니다. thinking은 명시적으로 선택한 request key에서만 생성하며 숨김·교체 시 observer를 해제합니다. 1800ms·linear·물리적 좌→우·infinite·delay0·협소 폭 clamp는 Figma 실측이 아닌 제안값입니다.
- ThinkingStatus 로고와 글자 위치는 정적이며 글자 안 밝은 띠만 shimmer로 전환합니다. 숫자는 상위 갤러리에서 전달합니다. 1초 업데이트 예시는 제품 제안이며 assistive technology에 매초 중복 공지하지 않습니다.
- Gallery의 전송·재시도·저장·파일·탐색은 로컬 데모 callback입니다. 네트워크·인증·제품의 업무 정책을 만들지 않습니다.
- Dialog의 예약 이름/지침/빈도는 로컬 form입니다. Toolbar·모델·고급 선택은 로컬 명령 callback을 표시하며, 원본에 없는 모델 목록·고급 본문·서버 업무 정책을 생성하지 않습니다.

## 확인 범위

CLI의 doc/asset byte 비교와 native 스킬 수신, 59개 export·직접 의존성, TypeScript/build, 대표 mouse·keyboard·focus·Escape·reduced-motion·좁은 폭을 검사합니다. 별도 Figma 라이브 연결 없이 수신 가이드로 구현 가능함을 확인하는 앱이며, 전체 Figma state matrix에 대한 pixel diff 승인이나 실제 Agent Hub 제품의 출시 검증을 의미하지 않습니다.

## 이번 채택과 공용 구현 경계

원본 측정 JSON은 보존하며 `.teamai/docs/agent-hub/design/motion.md`의 채택값을 구현했습니다.
Search 단일 외곽 focus·Composer 추가 입력 focus 선 생략, Secondary currentColor, Filter1px 투명 border, Mark-only SVG,
Breadcrumb/Calendar/Card 상태200ms, 내부 scroll engine, disclosure와 native Dialog exit를 적용합니다.

`component-registry.json`의 `commonAdapters`는 실제 source/export와 **부분 구현 범위**를 기록합니다.
InputControl·TextareaControl·SingleSelect·ScrollArea의 현재 조합에 필요한 기능을 구현했으며
공용51종 전체나 Select 검색/다중 선택/비동기 API 구현을 완료로 표시하지 않습니다.
공용 radius4는 control 기본이며 AgentHubInput adapter가 radius8을 채택합니다.
단일 Select의 미제공 popup은 공용 단일 선택 엔진에 Agent Hub Menu의r12/행28px·150ms를 조합하고 native popover top-layer로 modal body clipping을 피합니다. 짧은 빈도 목록은 추가 scrollbar gutter를 예약하지 않습니다.
Read-only toolbar는 disabled fieldset으로 keyboard/pointer를 함께 차단합니다.

Picker/Menu/Flyout 행 focus는 공용 Menu와 같은 inset2px ring이며 hover에서는 ring을 숨깁니다. 첫/마지막 행도 scroll viewport에서 잘리지 않게 합니다.
행의 기본 outline 제거는 나중에 로드되는 전역 focus CSS보다 우선합니다. 빈도 Select는 탐색 index와 키보드 표시 여부를 분리해 마우스로 열기·hover 후 이탈 시 ring을 남기지 않고 키보드 탐색에서만 가상 focus를 연결합니다.
원본은 Picker body가 Footer에 겹치고 Flyout content가 Footer에 겹치는 정적 조합이므로
고정 Footer의 실제 위치를 보존하고 content viewport만 줄이는 runtime adapter를 채택합니다.

## 외부 텍스트와 최신 상호작용

`TextReveal`은 원문을 즉시 반영한 뒤 새 부분만400ms로 드러내는 표시 계층입니다. Composer는 `externalTextRevision`, UserMessage는 `textMotion`·`textRevision`으로 외부 주입을 명시합니다. 입력·요청·stream은 계속 부모가 소유하며 직접 편집/IME는 효과를 취소합니다. 전체 assistant renderer를 새로 구현한 것으로 표시하지 않습니다.

Checkbox는 원본 좌표·크기를 고정한 opacity fade만 사용합니다. ThinkingStatus는 두 띠 폭28%/중심 간격50%, active halo는 투명→.6→투명으로 반복합니다. SNB more는 행 끝에서2px 안쪽입니다. [점검표](./INTERACTION-CHECKLIST.md)에서 재현 경로를 확인합니다.

브랜드 마크는 사용자 요청으로 애니메이션을 제거하고 원본 PNG만 정적으로 표시합니다. 모션 renderer·광택 합성·재생 제어와 motion/paused API는 제공하지 않습니다. 복원 SVG는 비교 자료로 보존합니다. ThinkingStatus의 글자 shimmer 등 다른 컴포넌트 모션은 이 변경과 별개입니다.
