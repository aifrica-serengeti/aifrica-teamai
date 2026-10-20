# 계약 수준과 솔루션 매핑

이 공통 묶음의 원본과 추출 범위는 저자 저장소의 `audit/design-extraction.md`에 기록했다. 원본의 유용한 세부 계약을 유지하면서
제품 전용 조건을 분리한 시작점이며, 회사 승인 상태나 실행 라이브러리를 의미하지 않는다.

## 세 가지 수준

| 수준 | 공통에서 유지하는 것 | 솔루션에서 결정하는 것 |
| --- | --- | --- |
| 의미·행동 계약 | native semantics, controlled API, state owner, keyboard/focus, error 복구, 중복 실행 방지 | 도메인 label·route·권한·server 정책과의 adapter |
| 추출 visual baseline | 크기/간격/중립색/typography/border/elevation와 상세 예제 | 채택 여부, 접근성 검증, 변경값과 근거 |
| 제품 profile | 공통이 강제하지 않음 | primary/brand, header/navigation, asset, locale, page width·breakpoint·grid·page size |

컴포넌트 문서의 “고정”, “필수”, “동일”, “기본”이라는 표현은 **그 참조 API와 해당 baseline을
채택한 범위**에 적용한다. 모든 Aifrica 솔루션에 동일한 픽셀값을 강제하지 않는다. Profile 차이는
침묵하는 CSS override 대신 명시적인 mapping/override와 검증 근거로 기록한다. 색으로만 상태를 전달하거나
keyboard 조작·focus 복원을 없애는 변경은 테마 차이로 처리하지 않는다.

## 적용 순서

현재 사용자 요청과 대상 저장소 지침을 먼저 적용하고, 회사 공통 → frontend 공통 → 선택한 솔루션 →
선택한 profile 순서로 더 구체적인 계약을 합성한다. 솔루션이 profile을 명시하지 않으면 관찰 profile의 색·치수나
자산을 자동 상속하지 않는다. 값이 필요한 구현에서는 대상 저장소의 확인된 기존 값 또는 명시적으로
채택한 profile을 사용한다. 미정인 브랜드 값을 임의의 보라색·파란색으로 채우지 않는다.

## Color·typography·border 계약

- 소비 컴포넌트는 `--text-*`, `--surface-*`, `--border-*`, `--element-*`, `--icon-*` 의미를 사용한다.
- `--accent-50`~`--accent-900`은 솔루션이 제공하는 강조 scale이다. 이름의 숫자가 특정 blue 또는 purple을 뜻하지 않는다.
- `--solution-primary`, `--solution-on-primary`, `--solution-primary-subtle`은 light/dark 각각 매핑한다.
  `--text-primary`와 focus가 같은 색이어야 하는지도 대비·배경에 따라 검증한다.
- gray·navy·status raw palette와 중립 border 값은 추출 baseline이다. status 의미를 유지하며 조정할 수 있다.
  named categorical Chip/Avatar의 `blue`·`purple`은 브랜드 primary 지정이 아니다.
- `--font-sans`, `--font-mono` 역할과 텍스트 위계는 공유한다. Pretendard·IBM Plex Mono는 추출 baseline이다.
  소비 솔루션이 font 파일·라이선스·glyph·weight를 연결하고 대체 font의 줄바꿈·측정·확대 결과를 검증한다.
- border 두께·radius·focus offset은 서로 다른 역할이다. `bordered` 유무만으로 selected/focus/error를 합치지 않는다.

## 페이지 geometry 입력

List/Create/Detail의 state·a11y 흐름은 공통 계약이다. 아래 geometry와 기본 선택은 솔루션 입력이다.

| 입력 | 의미 | 요구 관계 |
| --- | --- | --- |
| `--layout-content-max` | 업무 콘텐츠 최대폭 | Header title·본문·action의 시작선 정렬 |
| `--layout-band-max` | inset 포함 외곽 band | `content + 양쪽 inset` 관계를 유지 |
| `--layout-card-min` | Card 최소 가독 폭 | 내용이 안전할 때만 다열, 빈 track 보존 여부는 profile |
| page inset·narrow breakpoint | 반응형 여백·전환 | CSS media/container 조건은 build 시 실제 값으로 생성 |
| defaultViewMode·tablePageSize·cardPageSize·options | 목록의 기본 보기·개수 | 서버 지원 범위와 일치, 변경 시 page 정규화 |
| dialog size·option viewport·motion duration | 컴포넌트 profile | focus, overflow, reduced-motion·pending 계약 유지 |

문서 예시의 `profile`은 위 입력을 가진 page/layout adapter를 뜻한다. 실행 파일이나 강제 디렉터리 이름이
아니다. `solution narrow breakpoint` 표기는 유효한 CSS 문법이 아니므로 솔루션 설정으로 생성한다.

## 구현 연결

1. registry id·alias·dependency로 계약을 찾는다. `docs`는 registry 파일이 있는 디렉터리 기준 상대경로다.
2. 솔루션 실제 source·public export·package/config·호출부·test를 읽는다.
3. id별 mapping에 source·export·지원 variant·미지원 API·확인 근거를 기록한다.
4. 차이는 reuse/extend/compose/create로 판단하고 버전·migration을 명시한다.
5. code·문서·mapping·해당 상태 matrix를 함께 검증한다.

공통 registry에 특정 솔루션의 `implemented`를 다시 기록하지 않는다. 원본 source 경로·과거 export 존재는
별도 감사 근거이며 소비 솔루션의 구현 증거가 아니다. snippets는 standalone package가 아니므로 import
alias, primitive, locale formatter, font·asset, style 도구를 소비 환경에 맞춰 연결한 뒤 검증한다.
