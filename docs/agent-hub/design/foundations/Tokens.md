# Agent Hub 추가 토큰과 적용 범위

2026-11-05에 [Figma 토큰 변경표](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3478-22777)를 확인했습니다.
변경표의 날짜는2026-10-22~10-30이며, **시맨틱 추가17개와 Primitive 변경1개**입니다.
전체 토큰 컬렉션·dark theme·제품 구현 완료를 뜻하지 않습니다. 적용 조건은 [디자인 확장](../README.md)을 따릅니다.

이름·값·적용 이유와 행/샘플 노드는 [변경 목록](../references/tokens.figma.json),
도구가 반환한 문맥 변수는 [resolved 값](../references/tokens.variables.figma.json),
원문 레이어는 [metadata](../references/tokens.metadata.figma.xml)에 보존합니다.
기존 날짜의 컴포넌트 실측 JSON은 당시 관찰 기록으로 유지합니다. 현재 토큰을 연결할 때 아래 후속 변경을 적용합니다.

## 버튼·선택·Badge

| 토큰 | 변경표의 Primitive 연결 | 관찰된 값 | 적용 범위 |
| --- | --- | --- | --- |
| `color/button/opacity-active` | `alpha/100` | `#0000001a` | 일반 IconButton의 기존 지원 조합: ghost20/24/32·outlined24/32의 active 배경 |
| `color/action/default-disabled` | `Monochrome/white` | `#ffffff` | FilterChip 미선택·disabled 배경,sm/md/lg |
| `color/action/default-selected-hovered` | `blue/100` | `#cce0ff` | FilterChip 선택·hovered 배경,sm/md/lg |
| `color/action/default-selected-pressed` | `blue/200` | `#99c2ff` | FilterChip 선택·pressed 배경,sm/md/lg |
| `color/element/gray-subtler` | `gray/300` | `#dddddd` | SCH-03·UI Guideline의 Badge 요소 |

IconButton active는 이전 실측의 `color/action/default-selected`/`#EBF3FF` 대신 새 버튼 전용 alpha 토큰을 사용합니다.
outlined의 선·glyph·primary 상태나 다른 컴포넌트의 selected 배경을 함께 바꾸지 않습니다.
[IconButton](../components/AgentHubIconButton/styles.md)의 현재 표와 [FilterChip](../components/AgentHubFilterChip/styles.md)의 선택·disabled 범위를 확인합니다.
Badge에 같은 hex가 쓰여도 border나 FilterChip count 전체를 일괄 변경하는 근거가 되지 않습니다.

## 코드 뷰

| 토큰 | 변경표의 Primitive 연결 | 관찰된 값 | 적용 범위 |
| --- | --- | --- | --- |
| `color/code/text` | `gray/900` | `#1c1c1c` | 모든 code-line의 기본 코드 글자,변수명·연산자·구두점 |
| `color/code/line-number` | `gray/700` | `#555555` | enabled 줄 번호 |
| `color/code/line-number-current` | `gray/900` | `#1c1c1c` | current·empty 줄 번호 |
| `color/code/placeholder` | `gray/700` | `#555555` | empty 안내 문구 |
| `color/code/keyword` | `code/red` | `#cf222e` | 예약어 let·const·function·return |
| `color/code/function` | `code/purple` | `#8250df` | 함수·메서드 이름 |
| `color/code/constant` | `code/blue` | `#0550ae` | 숫자·상수 값 |
| `color/code/string` | `code/navy` | `#0a3069` | 문자열 리터럴 |
| `color/code/cursor` | `gray/900` | `#1c1c1c` | empty 캐럿 |
| `color/code/line-fill-current` | `alpha/50` | `#0000000d` | current·empty content 배경,검정5% |
| `color/code/guide` | `gray/200` | `#eeeeee` | 들여쓰기 guide 세로선 |

구문 강조4색은 변경표에서 신규 Primitive `code/red`·`code/purple`·`code/blue`·`code/navy`를 추가했다고 설명합니다.
기본 글자와 같은 값이어도 코드 전용 이름을 유지합니다. 범용 `color/text/default`와 무조건 합치지 않습니다.
이 토큰 표만으로 CodeBlock 전체 컴포넌트·구문 parser·코드 실행·편집 동작이 검증됐다고 기록하지 않습니다.
기존 OutputViewer의 content 슬롯과 코드 renderer의 책임도 구분합니다.

## 리소스와 yellow 변경

| 토큰 | 변경 | 적용 범위 |
| --- | --- | --- |
| `color/element/neutral` | `gray/500` → `#8f8f8f` | 리소스 미터의 정상 상태 bar,세션 리소스 CPU 시안 |
| `yellow/600` | `#d79c04` → `#f2a900` | Primitive 값 교체. 변경표가 연결 대상으로 명시한 시맨틱은 `color/text/yellow-bold` |

정상 상태의 neutral을 경고·위험 색상으로 사용하지 않습니다. yellow는 기존600 단계를 교체한 것이므로
`yellow/550`을 새로 만들지 않습니다. 변경표의 `color/text/yellow-bold` 연결 설명은 보존하지만,
해당 시맨틱의 실제 variable ID·전체 의존 목록·resolved 값은 이 노드의 응답에서 확인하지 못했습니다.

## 제품에 연결하기

1. 제품의 실제 semantic token 선언과 `.aifrica/frontend.json`의 token mapping을 찾습니다. 이 문서의 이름을
   전역 CSS 변수로 자동 생성하거나 같은 값의 새 이름을 중복 추가하지 않습니다.
2. 정확한 상태·선택 여부·size별 배경·글자·선 owner에 연결합니다. active와 pressed,선택 disabled와 미선택 disabled를 구분합니다.
3. `alpha/100`은 검정10%,`alpha/50`은 검정5% 의미를 유지하고 부모 배경과 합성한 회색으로 굳히지 않습니다.
   `#...1a`·`#...0d`는 도구가 반환한8-bit alpha 표현이므로 소수 alpha와의 반올림 차이를 별도 디자인 변경으로 취급하지 않습니다.
4. 원본 모드·ID·alias graph는 이번 도구 응답에 없었습니다. 표의 Primitive 이름은 변경표 텍스트 근거이며,
   native alias·dark 값을 확인한 것으로 확대하지 않습니다. 문맥 변수 응답의36개 전체를 신규 토큰으로 세지 않습니다.
5. 이전 스냅샷은 보존하고 제품에서 영향을 받는 상태·대비·focus·disabled·기존 모션을 검증합니다.
   이후에만 제품의 실제 token/source 경로와 채택 범위를 기록합니다. 공유 `frontend.json`의 빈 map·`draft`는 제품 구현 승인으로 바꾸지 않습니다.

TeamAI는 이 참조와 적용 절차를 전달합니다. 실제 제품의 CSS·component mapping은 해당 제품이 소유합니다.
