# Scrollbar & ScrollArea — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](./README.md)

## 12. 검증 체크리스트

재현 후 아래 항목을 확인한다.

### 레이아웃

- [ ] thumb 두께가 `thumbWidth` prop과 정확히 일치(4/6/8 등).
- [ ] inset이 `thumbWidth × 0.75`로 자동 계산되는지(4→3px, 8→6px).
- [ ] **양끝 대칭** — 맨 위/아래(또는 좌/우)에서 thumb-컨테이너 경계 간격이 동일.
- [ ] 최소 thumb 길이 24px 보장(콘텐츠가 매우 길어도 thumb가 안 작아짐).
- [ ] thumb가 컨텐츠 위에 overlay로 떠 있고 패딩 영역을 침범하지 않음.
- [ ] Tree 선택 행·connector와 Table sticky header 등 내부 레이어가 thumb를 가리지 않음.
- [ ] `verticalThumbOffset`을 준 경우 수직 thumb가 지정한 고정 header 영역 아래에서 시작하고,
      하단 inset은 기존 inset과 동일한지 확인한다.

### 동작 (버그 방지 핵심)

- [ ] **스크롤 시 thumb가 콘텐츠에 딸려가지 않음** — thumb의 offsetParent가
      wrapper여야 하며, 스크롤 후에도 항상 컨테이너 안에 머물어야 한다.
- [ ] thumb 위치가 스크롤 위치에 정확히 비례하여 이동.
- [ ] ResizeObserver로 컨테이너/콘텐츠 크기 변화 시 thumb 자동 갱신.
- [ ] `onScrollMetricsChange`가 초기 렌더·스크롤·크기 변화마다 실제
      `clientHeight`/`scrollHeight`/`scrollTop`을 전달.
- [ ] `stickToEnd`가 켜진 상태에서는 최하단을 보고 있을 때만 콘텐츠 증가 뒤 새 최하단을 유지하고,
      중간 위치에서는 scrollTop을 바꾸지 않음.
- [ ] `ScrollAreaHandle.scrollTo({ top: 0 })`가 실제 scroll container를 최상단으로 이동시키고,
      thumb와 `onScrollMetricsChange`가 `scrollTop: 0`으로 함께 갱신됨.
- [ ] thumb 드래그로 스크롤 이동 가능(Pointer Events).
- [ ] `verticalThumbOffset`을 준 수직 thumb도 전 구간에서 드래그 이동 가능하며, 실제
      `scrollTop` 비례와 키보드 스크롤 동작이 유지된다.

### 색상 / 투명도

- [ ] thumb가 **반투명**(alpha 30%)으로 뒤 콘텐츠가 비침.
- [ ] thumb hover 시 alpha 30% → 55%로 더 선명해짐.
- [ ] 라이트: 짙은 회색(gray-700 #555) 기반. 다크: 밝은 회색(gray-300 #ddd) 기반.
- [ ] hex/rgba 직접 하드코딩 없이 `--scrollbar-thumb-*` 토큰 참조.

### 노출 타이밍 (type)

- [ ] `hover`: 컨테이너 hover 시 thumb가 0.2s 페이드 인, 이탈 시 페이드 아웃.
- [ ] `always`: 항상 표시.
- [ ] `scroll`: 스크롤 중 표시, 정지 800ms 후 숨김.
- [ ] `auto`: hover 또는 scroll 시 표시.
- [ ] 페이드가 "툭" 튀어나오지 않고 부드럽게 전환(opacity transition).
- [ ] 중첩 ScrollArea에서 바깥 wrapper만 hover·scroll해도 안쪽 thumb는 나타나지 않고,
      안쪽 scroll viewport를 직접 hover하거나 스크롤할 때만 해당 thumb가 표시된다.

### 다크 모드

- [ ] `.dark`에서 thumb 색상이 밝은 회색 반투명으로 전환.
- [ ] 모드 전환 시 깜빡임 없이 부드럽게 보간(0.2s transition).

### 접근성

- [ ] thumb에 `role="scrollbar"`, `aria-orientation` 속성.
- [ ] 키보드(방향키/PageUp/PageDown/Home/End)로 컨테이너 스크롤 가능.
- [ ] 네이티브 스크롤바가 화면에 나타나지 않음(WebKit/Firefox 모두 숨김).
- [ ] imperative 위치 이동이 focus를 훔치지 않고, parent의 action focus 정책이 유지됨.

### 빌드

- [ ] `pnpm typecheck` 통과.
- [ ] `pnpm lint` 통과(에러 0).
- [ ] `pnpm build` 통과.

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 Scrollbar을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
