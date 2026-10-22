# AgentHubDialog — 정의와 적용 범위

이 계약은 작업을 잠시 분리해 수행하는 모달 화면 두 개의 조합입니다. 메뉴·Picker·Flyout·전체 앱 shell이나
단순 확인용 confirmation 화면으로 자동 변환하지 않습니다. 공용을 켠 경우에만 `DOCS_ROOT/frontend/design/components/Dialog/README.md`의
의미·focus·scroll·dismiss 계약을 상속합니다.

| recipe | 실제 원본 | 확인한 구성 |
| --- | --- | --- |
| 예약 작업 편집 | FRAME `3192:27853`,580×554 | header72 + body394 + footer88 |
| 에이전트 찾기 | FRAME `3163:22376`,1296×800 | header68 + body732, rail192 + content1104, footer 없음 |

두 root에는 Dialog size·open·close·onSubmit 같은 COMPONENT 속성이나 SLOT이 없습니다.
모든 prototype reaction은 비어 있습니다. open, 초기 focus, 닫힘 사유, 데이터 조회·저장 API는 실제 제품 owner가 연결합니다.
원본의 캔버스 위치와 샘플 폭·높이를 앱의 고정 modal 위치·전역 size enum으로 만들지 않습니다.

## 실제 하위 source

| 영역 | 실제 source 또는 구조 | 재사용 해석 |
| --- | --- | --- |
| 두 header | `2324:30419` finder/header INSTANCE | 내부 조합 근거이며 새 Header 공개 계약은 만들지 않음 |
| 닫기 | `2611:59907`, ghost/default/32, glyph x24 `2199:23685` | legacy32/r4/glyph24. AHIconButton32/r6/glyph20과 다름 |
| 예약 이름 | `2667:25066` legacy Input, 실제532×64 | 원본 입력 의미는 유지하되 현재 공용 Input의 API·r4를 그대로 적용하지 않음 |
| 예약 지침 | label·textarea·toolbar를 조합한 FRAME | native textarea와 label은 제품 구현 제안이며 Figma Textarea INSTANCE가 아님 |
| toolbar | ghost28 source `3116:14` 세 개, 모델 선택 FRAME | Button은 실제 source, 모델 선택은 독립 FRAME |
| 예약 footer | FRAME + tertiary40 `3025:25006`, disabled primary40 `3074:97439` | AgentHubDialogFooter와 배치 의미를 공유하나 footer COMPONENT 재사용은 아님 |
| 예약 scrollbar | `2019:3708`, thumb r8 | 이전 scrollbar source. AgentHubScrollbar r9999로 치환하지 않음 |
| Finder rail | `2324:30418` finder/rail, 내부 직접 FRAME 행 | NavRail·SNB·Menu·Picker source로 기록하지 않음 |
| Finder Divider | `3155:20478`,168×17·py8·#DDD1px | 공용 Divider와 일치하는 실제 원본. 새 전용 Divider를 만들지 않음 |
| Finder Search | `2304:19755`,48/focused/filtered=false | AgentHubSearch의 실제 source 연결 |
| Finder 카드 | `3095:20` default,15개 | AgentHubItemCard 실제 source. 폭·설명 높이는 이 recipe에서 변경 |
| Finder scrollbar | `3155:20473` | AgentHubScrollbar 실제 source |

Finder header의 `Show icon-button=false`는 뒤로 가기만 숨깁니다. 실제 닫기 버튼은 보입니다.
숨김 자식 일부가 API에서 생략될 수 있으므로 미수집과 실제 visible=false를 구분합니다.
생성 코드의 `icon/plus/24` 같은 이름보다 실제 glyph source·paint·자산 기록을 우선합니다.

두 root의 공통 r16·blue-gray 표면을 다른 Dialog, Header, Footer에 전역 적용하지 않습니다.
실제 제품에 호환 구현이 없으면 [구현 순서](./implementation.md)에 따라 가장 좁은 기능 범위에서 전용 조합 export를 개발합니다.
문서 예제나 읽기 전용 CMP source는 Agent Hub 구현 완료의 증거가 아닙니다.
