# Page Header — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- [ ] 제목 옆 액션은 Fragment·페이지별 묶음 모두 4px 간격이며 각 버튼은 24px, 내부 아이콘은 18px이다.
- [ ] 삭제 아이콘은 danger 색상이며 disabled 시 icon-disabled 색상으로 전환된다.
- [ ] 상세 수정 모드의 취소는 tertiary, 저장은 primary이고 두 버튼 모두 medium(32px)이다.

[← Page Header 문서 인덱스](./README.md)

## 13. 검증 체크리스트

- [ ] Figma light `9026:178355`: shell `#ffffff`, Title `#1c1c1c`, Chip `#eeeeee`, Tab line `#dddddd`
- [ ] Figma dark `11479:54331`: shell `#282828`, Title/Icon/tertiary label `#dddddd`, Chip `#444444`, Tab label `var(--accent-200)`, Tab line `#333333`
- [ ] Title이 400px를 넘으면 ellipsis, 100px 아래로는 축소하지 않음
- [ ] Tooltip은 Title이 실제로 잘릴 때만 열림
- [ ] Detail/Description이 길어도 ellipsis가 없고 header 우측 padding까지 폭을 사용
- [ ] Detail에는 대표 날짜 메타데이터만 있고 작성자·소유자·버전·식별자·소속 정보가 섞이지 않음
- [ ] 날짜 필드가 없는 화면은 Detail을 생략하며 현재 시각이나 임의 날짜를 만들지 않음
- [ ] Description이 없으면 spacer와 그 높이가 사라짐
- [ ] `borderBottom=false` 기본 상태에서는 하단 구분선이 없고, `true`일 때만 semantic border token으로 표시됨
- [ ] Detail과 Description이 모두 없으면 supporting copy 행이 사라짐
- [ ] title만, title+Chip, title+Detail, title+Description, title+Detail+Description loading을 각각
      normal 상태와 비교했을 때 Header 전체 높이가 변하지 않음
- [ ] loading Title/Chip/Detail/Description skeleton 높이가 각각 `32px / 24px / 16px / 20px`이고,
      Detail/Description의 위 여백 `2px / 4px`이 normal text flow와 같음
- [ ] loading placeholder가 local surface/keyframes를 만들지 않고 공용 Skeleton을 사용함
- [ ] loading Header가 `aria-busy="true"`이고 skeleton이 중복 status를 읽지 않음
- [ ] Header 폭이 1,016px이고 action이 `내보내기 · 새 작업 · 설정`처럼 작은 경우, action이 같은 첫 행 우측에 유지됨
- [ ] action의 고유 폭 + Title 최소 폭이 Header content 폭을 넘을 때만 action area가 Description 아래로 이동하고 모든 버튼이 보임
- [ ] 아래 행으로 이동한 action이 다시 들어갈 수 있는 폭이 되면, `buttonGroup`·`trailingElement` 고유 폭을 기준으로 우측 첫 행으로 복귀함
- [ ] 좁은 폭에서 Description→action 16px, action→Tab 영역 8px
- [ ] back, refresh, favorite, edit, delete, more action에 설명 Tooltip과 aria-label이 있음
- [ ] Detail title action이 refresh→edit→delete 순서로 인접하고 delete가 trailing 우측 끝으로 분리되지 않음
- [ ] 반복되는 title action은 `PageHeaderIconAction`을 사용하며 Tooltip root가 하나만 있고 pending 전환에도 Tooltip/accessible label이 바뀌지 않음
- [ ] title action Tooltip은 500ms 뒤 표시되고, `suppressTooltipOnFocusReturn` 액션은 실행부터 후속 Dialog·Popover 종료 후 focus 복원까지 다시 열리지 않음
- [ ] 일반 refresh·mutation title action은 실행 후 다음 hover·focus에서 Tooltip을 다시 표시함
- [ ] `PageHeaderIconAction.label`이 실제 IconButton의 `aria-label`로 변환되고 나머지 event/ref가 전달됨
- [ ] controlled `tabValue`와 `onTabValueChange`, uncontrolled `defaultTabValue`가 공용 Tab에 연결됨
- [ ] `tabsDisabled`가 모든 Tab trigger를 비활성화하며 `tabsAriaLabel`이 실제 tablist에 전달됨
- [ ] Header의 `showContent=false` 조립에서 page 본문과 중복된 Tab panel이 렌더되지 않음
- [ ] Header와 본문은 같은 솔루션 narrow breakpoint와 inset을 사용함
- [ ] medium title action Icon이 18px/1.25px rounded stroke이며 Header/page CSS가 SVG stroke를 override하지 않음
- [ ] List/Detail refresh는 page가 최소 600ms disabled + `.8s linear infinite` icon 회전을 소유하고 reduced-motion에서 회전을 제거함
- [ ] `pnpm typecheck`, `pnpm lint` 통과

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 PageHeader을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 상위 application shell이 화면 간 shared state와 frame 배치를 소유한다. PageHeader는 선택한 profile의 page title·action·tab slot과 내부 interaction만 소유하며 특정 navigation/header 세대 조합을 요구하지 않는다.
- **변형 금지**: shell과 page slot의 geometry·radius·clip을 중복 소유하지 않는다. 함께 움직이는 상태는 같은 parent에서 제어하며 breakpoint·navigation collapse 정책은 솔루션 확장에서 결정한다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

## Shell 배경 정합성

Header 배경은 솔루션이 매핑한 `--surface-shell`을 사용해 주변 page shell과 정렬한다. 카드용 `--surface`를 무심코 적용해 제목 뒤에 의도하지 않은 패널을 만들지 않는다. light/dark의 실제 색은 솔루션 theme 입력이다.
