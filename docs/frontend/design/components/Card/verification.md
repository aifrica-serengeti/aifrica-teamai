# Card — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](./README.md)

## 13. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 빌드

- [ ] `pnpm lint` 통과 (에러 0)
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과

### 레이아웃

- [ ] standalone 참조 fixture는 392px에서 비교하고, 실제 목록 CardGrid에서는 부모 slot 폭을 채우는지 확인한다. 392px을 page 카드 폭으로 강제하지 않는다.
- [ ] Small padding 16px, Large padding 24px
- [ ] Thumbnail 이미지 높이 220px, `object-fit: cover`
- [ ] Thumbnail 콘텐츠 padding 20px 24px 24px
- [ ] Leading visual: Small/Medium 40px, Large 44px
- [ ] Header gap 8px, Title Row gap 4px, Header Text gap 4px
- [ ] 대표 날짜가 하나인 목록 카드는 Description 다음 SubDescription에 날짜를 표시하고 말줄임 시 `title`을 제공함
- [ ] SubDescription은 항상 한 줄이며 같은 카드에서 ExtendedHeader를 함께 렌더링하지 않음
- [ ] 날짜 외 메타데이터는 Summary의 라벨·값 행으로 표시함
- [ ] Header Group gap 12px (Medium/Large)
- [ ] Extended Header gap 8px, Detail items gap 4px
- [ ] 목록 카드 Summary 행 간격 12px, label 12/16px, value 14/20px
- [ ] Summary value가 우측 정렬되고 좁은 폭에서 한 줄 말줄임 처리됨
- [ ] Card Body 최소 높이 126px, 배경 `#f8f8f8`
- [ ] Footer buttons gap 8px, 균등 분할(`flex: 1 1 0`)

### 색상 (라이트)

- [ ] Enabled: 배경 `#ffffff`, 테두리 `#dddddd`, 그림자 없음
- [ ] Hovered: 배경 `#f8f8f8`, navy Mid 그림자
- [ ] Pressed: 배경 `#f4f4f4`, navy Mid 그림자
- [ ] Selected: 2px accent (`var(--accent-500)`) — border 1px + inset shadow 1px
- [ ] Focused: 테두리 회색 유지 + 바깥 3px offset의 1px focus accent outline (radius 10px)
- [ ] Disabled: 자식 opacity 0.4
- [ ] Title 색상 `#1c1c1c`, Description `#555555`, Detail `#757575`
- [ ] Sub Description 색상 `#757575`, 12px/16px

### 색상 (다크)

- [ ] Enabled: 배경 `#1c1c1c`, 테두리 `#555555`
- [ ] Selected: accent `var(--accent-400)` (더 밝은 accent)
- [ ] Title `#dddddd`, Description `#aaaaaa`
- [ ] 그림자는 라이트와 동일 (navy 알파)

### 상태

- [ ] Selected 클릭 시 콘텐츠 밀림 없음 (border 1px + inset shadow)
- [ ] Selected + hover 시 2px accent + 드롭 그림자 모두 유지
- [ ] Focused outline이 `overflow: clip`에 잘리지 않음
- [ ] Interactive 카드 `:focus-visible` 시에만 focus outline 표시 (마우스 클릭 시 미표시)
- [ ] Thumbnail Selected: 이미지 영역 포함 전체 외곽 2px accent
- [ ] Thumbnail Focused: 이미지 영역 포함 전체 외곽에 outline
- [ ] Thumbnail wrapper가 전체 외곽 border 담당 (콘텐츠 카드 border 없음)
- [ ] Thumbnail 이미지 하단에 border 있음 (밝은 이미지에서도 콘텐츠와 구분)
- [ ] Thumbnail border 이중선 없음
- [ ] 목록 페이지의 카드 보기가 `Card.Summary*`를 사용하고 페이지 전용 summary CSS를 복제하지 않음

### 토큰

- [ ] 색상/그림자가 모드 `globals.css` 변수 또는 `tokens.css.ts`의 `vars`를 참조
- [ ] hex/oklch 직접 하드코딩 없음
- [ ] `--card-shadow` 토큰 정의됨

### 의존 컴포넌트

- [ ] Chip, IconButton, Button, Link, Icon 가이드라인을 먼저 확인하고 재사용
- [ ] 직접 구현하지 않음

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Card을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
