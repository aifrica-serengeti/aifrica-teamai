# CMP 페이지 적용 기준

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

공통 List/Create/Detail의 상태·컴포넌트 API·접근성 위에 CMP의 page adapter를 연결한다.
원본 CMP의 다음 수치는 참조 baseline이며 제품에서 달리 채택한 값은 실제 화면·서버 계약과
함께 로컬 `.aifrica/frontend.json`과 제품 문서에 기록한다. 브랜드·고객명·route·폼 필드는 고정하지 않는다.

## Layout과 목록 설정

| 입력 | CMP baseline |
| --- | --- |
| 업무 content max | 1072px |
| Header outer band max | 1120px |
| 기본 좌우 inset | 24px |
| ≤899px inset | 16px |
| Detail compact 전환 | ≤699px |
| Card 최소 가독 폭 | 320px, content max에서 최대 3열 |
| 기본 보기 | table |
| table page size / options | 20 / 10·20·50·100 |
| card page size / options | 24 / 12·24·48 |
| 검색 debounce | 300ms |

frontend.json의 `pagePatterns`로 표현한 값은 합성 도구와 공용 page 예제의 같은 이름 입력으로
연결한다. 나머지 geometry·시간·CSS breakpoint는 제품 layout adapter와 문서에 연결한다.
Header의 자체 padding과 outer band로 title·본문의 시작선을 정렬한다. 음수 margin이나
Header 내부 padding override로 보정하지 않는다. Card는 남는 track·긴 제목·좁은 폭을 함께 확인한다.

## List 수명과 피드백

- page query/filter/pagination/selection/view mode를 Table/Card의 local state로 분산하지 않는다.
- 같은 메뉴의 작업 탭 안에서 목록 query·scroll·view state를 보존하고 메뉴를 떠나는 수명과 구분한다.
  원본의 Activity 기반 보존을 사용하려면 설치 React의 지원 버전·Effect 재연결·focus·DOM 수명을 확인한다.
- localStorage에는 메뉴 scope의 보기 선호만 저장한다. 임시 검색·민감 query·전체 draft를 보기 선호와
  함께 영구 저장하지 않는다. 저장소 오류가 조회를 막지 않게 한다.
- 조회 loading을 최소 0.6초 보여주는 원본 피드백 baseline과 300ms 검색 debounce를 구분한다.
  이전 요청 취소·stale 응답·timer cleanup을 처리하고 이미 있는 결과의 refresh를 최초 loading과 구분한다.
- overlay owner는 하나다. page overlay와 Table loading을 중복 표시하지 않는다. 서버 총 개수 변경과
  filter 변경 후 page를 유효 범위로 정규화하고 table/card의 개수 설정을 섞지 않는다.

## Create와 후속 작업

공통 form·confirmation·dirty guard를 적용한다. 생성 API 이후 별도 upload가 필요한 업무에서는
생성 결과 metadata와 upload 상태를 분리한다. upload 실패 재시도는 upload만 수행하며 이미 성공한
생성 POST를 다시 보내지 않는다. 중복 이름·별칭 확인은 domain validation과 page field error로
연결하고, 실패해도 입력값·생성된 resource 식별자를 보존한다. 해당 업무가 없으면 upload 단계를 추가하지 않는다.

## Detail과 편집

route 검증 → 조회 → original/draft 분리 → 편집/저장/취소/refresh의 순서와 page permission을 유지한다.
저장 성공 전 원본을 draft로 덮어쓰지 않는다. background refresh 중 dirty draft를 조용히 교체하지 않는다.
compact layout과 desktop의 action 위치·tab·scroll/refresh overlay owner를 함께 검증한다.
Create/Detail의 반복 표현은 의미가 같을 때 메뉴 shared에 두고 query·draft·mutation 타입은 각 page kind가 소유한다.

## 검증

공통 패턴의 loading·empty·filter-empty·error/retry·forbidden/not-found·dirty·mutation 실패 matrix를
실행한다. query/scroll 보존, 취소된 요청, 짧고 긴 응답, timer cleanup, 이중 submit/upload 재시도,
keyboard·focus·긴 번역·light/dark·좁은 폭·200% zoom을 확인한다. 실제 제품 검증과 공유 문서 검사를 구분한다.
