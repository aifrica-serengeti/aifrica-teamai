# AgentHubSessionPanel — 구성과 상태

Session 패널은 대화 입력·사용자 메시지와 별도로 예약 실행 및 관련 자료를 보여 줍니다.
공용 Card의 선택형 카드, Tree의 계층 탐색, Stepper의 단계 이동, Menu의 명령 목록으로 바꾸지 않습니다.
공용의 시각을 복제해 맞추기보다 확인한 Session 하위 원본을 조합합니다.

## 확인한 두 패널

| state | 원본 | 외곽 크기 | 표시 구성 |
| --- | --- | --- | --- |
| filled | `2975:69459` | 320×934, 세로 HUG | 예약 → 진행 상황 → 출력 → 컨텍스트 |
| empty | `2975:69458` | 320×154, 세로 HUG | 출력·컨텍스트 빈 안내, 각 + action |

생성 context의 state 기본값은 empty입니다. 전체 `componentPropertyDefinitions` getter는 read-only 오류로
미수집됐으므로 null로 보존했습니다. 실제 두 variant와 생성 props를 확인한 범위를 뜻하며 다른 속성이 없다는 주장은 아닙니다.
set의718×974 캔버스는 두 패널을 전시하는 보드 크기입니다.

filled의 섹션은 다음 실제 조합입니다.

| 섹션 | 높이 | 내부 구성 |
| --- | --- | --- |
| 예약 | 276 | Header24 + gap4 + 예약 Item36 + gap8 + history204 |
| 진행 상황 | 148 | Header24 + gap8 + 진행 목록116 |
| 출력 | 208 | Header24 + gap4 + Item36×5 |
| 컨텍스트 | 196 | Header24 + gap4 + context-list168 |

각 높이는 샘플 데이터의 결과입니다.934px를 고정 height로 지정하거나 항목 수를5개로 제한하지 않습니다.
empty는 Header24 + gap4 + 안내20의48px 섹션 두 개입니다. 예약·진행·기록 subtree는 없고,
각 Header의 toggle/count는 숨겨져도 + action은 표시됩니다.

## 실제 데이터와 하위 원본

예약 행은 `AgentHubSessionItem`의 default 원본을 재사용하며 schedule glyph, title와 meta=true를 재정의합니다.
샘플은 ‘전일 수신 업무메일 요약’·‘매시간’입니다. 아래 white history 카드에는 제목 ‘기록’, 독립 toggle,
HistoryItem 다섯 개가 있습니다. 첫 행 ‘오늘 오후 3:00’만 selected이며 다음 두 행만 unread dot=true입니다.

진행 목록은 done ‘첨부 자료 분석’, active ‘부서별 실적 집계’, pending3 ‘보고서 초안 작성’,
pending4 ‘출력물 검증’의 네 Step입니다. 마지막만 connector=false여서20px, 앞의 세 행은32px입니다.
이는 진행을 표시하는 조합이며 단계 이동 버튼은 없습니다.

출력은 SessionItem5개이며 glyph는 file-text/table/code/code/image입니다.
44px FileIcon 타일을 쓰는 시안이 아니고 white28px icon-box 안에16px glyph를 넣습니다.
확장자·파일 열기·다운로드·권한은 제품 데이터와 동작 owner가 정합니다.

| 컨텍스트의 실제 label | 대표 값 | count text | glyph |
| --- | --- | --- | --- |
| 첨부파일 | 회계_조직도_근무조회계_9월_업무일지.docx | 5 | file-text16 |
| 볼륨 | 회사 업무일지 | 2 | folder16 |
| 지식 | 사내 보고서 작성 가이드 | 5 | book-open16 |
| 도구 | 그룹웨어 메일 | 5 | wrench16 |
| 스킬 | report-writer | 3 | scroll-text16 |

Figma 설명의 ‘작업 폴더’와 실제 패널의 ‘볼륨’ label을 구분합니다.
위 문자열·count는 비교용 샘플이고 제품의 실제 데이터를 고정하는 계약이 아닙니다.

## 역할 경계

Header의 count/toggle/action Boolean과 count TEXT는 다른 속성입니다.
각 하위 문서에서 실제 property ID와 의미를 확인합니다. 문자열 count를 권한·요청 수·배열 길이로 자동 파싱하지 않습니다.
Session은 ChatComposer의 편집 draft, UserMessage의 발송 내용, ProgressAlert의 재시도/편집 상태를 소유하지 않습니다.
컨텍스트 행이 Flyout을 여는 실제 연결이나 메뉴·파일 선택 API는 이 여섯 노드에 없습니다.
그 연결이 필요한 제품은 해당 컴포넌트와 별도 동작 계약을 채택하고 검증합니다.
