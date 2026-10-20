# Select

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Select 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)
- [사용 예제](./implementation/examples.md)

## 1. 개요

옵션 목록에서 값을 선택하는 폼 컨트롤. 트리거(버튼/입력필드)를 클릭하면 드롭다운
메뉴가 펼쳐지고, 그 안에서 옵션을 선택한다. **Single**(단일 선택)과 **Multi**(다중
선택) 두 모드를 지원하며, `searchable` 옵션으로 트리거 안에서 옵션을 검색해 필터링할
수 있다(combobox 패턴).

**매트릭스:**

- **Type**: Single / Multi
- **Style**: Default(외곽선) / Create(채움, 생성 폼 전용)
- **Size**: Small(28px) / Medium(32px, 기본) / Large(36px) / X-Large(40px)
- **State**: Enabled / Focused(Open) / Filled / Invalid / Disabled / Read-only
- **Searchable**: true 시 트리거가 검색 input 이 됨. Single의 선택 label은 placeholder가 아니라 실제
  input value이며, panel이 열리면 label을 전체 선택해 첫 검색 입력으로 즉시 교체할 수 있음
- **Content width**: 기본 `trigger`; 숫자 selector처럼 짧은 옵션만 제공할 때 `content`로 option 폭에 맞춤
- **Field width**: standalone 기본 320px, Create/Detail grid에서는 `fullWidth`로 부모 cell을 채움
- **Option viewport**: `maxVisibleOptions`로 실제 option 표시 행 수를 제한하고 초과할 때만 공용 `ScrollArea`의 overlay thumb로 내부 스크롤. Multi의 “모두 선택”은 스크롤 밖 최상단에 고정
- **Portal mode**: 기본 `dialog`; 가장 가까운 Dialog 경계를 자동으로 찾아 option layer를 두며 Dialog 밖에서는 body로 fallback. `body`를 명시하면 body portal을 사용
- **Accessible field**: 보이는 label과 help/error를 trigger·검색 input에 ID로 연결하며, label이 없으면 `ariaLabel`을 필수로 전달
- **Popup relationship**: 열린 trigger와 searchable input의 `aria-controls`가 실제 listbox ID를 가리키고 `aria-expanded`가 같은 open 상태를 전달
- **Multi completeness**: 실제 폭을 측정한 `+N` 칩, 개별 제거/전체 해제, `showSelectAll`(기본 true), 부분 선택,
  비활성 선택값 보존(전체 선택/해제·칩 제거·전체 해제 모두)을 지원한다. `messages.remove`와 `messages.noResults`로 제거·검색 결과 문구를 지정한다.

**기술 기반:** Radix **Popover**(radix-ui 통합 패키지). DropdownMenu 가 아닌 Popover 를
사용하는 이유: DropdownMenu 는 메뉴 오픈 시 포커스를 콘텐츠로 강제 이동시켜 트리거 내
검색 input 타이핑이 불가능하기 때문이다. Popover 는 포커스 트랩을 하지 않아 트리거
안의 input 에 자유롭게 타이핑할 수 있다.

> **Menu 와의 관계**: 드롭다운 패널(content)과 옵션 행(item)의 시각은 Menu 컴포넌트
> (dropdown-menu.css.ts)와 동일 토큰(`--menu-surface`, `--menu-shadow`,
> `--menu-item-*`)을 공유한다. 단, Radix DropdownMenu primitive 를 직접 import 하지는
> 않는다. 시각 토큰만 공유하고 Popover 기반으로 자체 구현한다.

---

`loading`이면 닫힌 입력창에도 placeholder/선택값 앞에 공용 Spinner(tiny)를 표시한다. 최초 조회와 재조회에서 field를 유지하며 기존 값은 보존한다.
