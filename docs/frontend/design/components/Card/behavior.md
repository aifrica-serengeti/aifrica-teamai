# Card — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](./README.md)

## 7. 상태

### 상태별 동작

| 상태         | 트리거          | 시각 변화                                       |
| ------------ | --------------- | ----------------------------------------------- |
| **Enabled**  | 기본            | 회색 테두리, 흰 배경, 그림자 없음               |
| **Hovered**  | 마우스 오버     | 배경 `#f8f8f8`, navy Mid 그림자                 |
| **Pressed**  | 마우스 다운     | 배경 `#f4f4f4`, navy Mid 그림자                 |
| **Selected** | 클릭(토글)      | 2px accent 테두리 (border 1px + inset shadow 1px) |
| **Disabled** | `disabled` prop | 자식 요소 `opacity: 0.4`, `cursor: not-allowed` |
| **Focused**  | 키보드 Tab      | 카드 바깥 3px offset의 1px focus accent outline 링      |

### Interactive 카드 (Live 패턴)

`interactive` prop을 주면 루트가 `<button>`으로 렌더된다. CSS 의사 클래스로 실제 상호작용:

| 의사 클래스      | 효과                                         |
| ---------------- | -------------------------------------------- |
| `:hover`         | 배경 `#f8f8f8` + 그림자                      |
| `:active`        | 배경 `#f4f4f4` + 그림자                      |
| `:focus-visible` | focus outline span 표시 (키보드 포커스 시만) |

> **Selected + hover/active 조합**: Selected 상태에서 hover/active 시 드롭 그림자와
> inset 파랑 테두리를 모두 유지해야 한다. `box-shadow: var(--card-shadow), inset 0 0 0 1px var(--border-focused)`.

### 구현 주의점

1. **Selected 밀림 방지**: `border-width`를 2px로 바꾸면 콘텐츠가 1px 밀린다.
   border는 1px 고정 + `inset box-shadow`로 2번째 픽셀을 그린다.
2. **Focused outline 잘림 방지**: `overflow: clip`이 focus outline의 `-3px`을 잘라낸다.
   Focused 상태에서만 `overflow: visible`로 변경.
3. **Selected + hover 그림자 덮어쓰기 방지**: `:hover`의 `boxShadow`가 Selected의
   `inset`을 덮어쓰지 않도록 `[data-state="selected"]:hover` 셀렉터로 두 box-shadow를 모두 유지.
4. **Thumbnail wrapper가 전체 외곽 border 담당**: Thumbnail type에서 wrapper가
   이미지 + 콘텐츠 전체를 감싸는 단일 border를 가진다. 콘텐츠 영역은 별도 border 없음.
   Selected/Focused 상태도 wrapper에 적용되어 이미지 영역을 포함한 전체 외곽에 파란
   border/outline이 표시된다. 이미지 하단에도 border를 주어 밝은 이미지에서 콘텐츠와
   경계가 구분되도록 한다.
5. **Disabled 자식 opacity**: vanilla-extract의 `style()`은 `& > *` 자식 선택자를
   허용하지 않으므로 `globalStyle`로 처리.

---

## 9. 애니메이션

### 색상 전환 (다크/라이트 모드 전환)

색상 관련 요소에 `transition` 적용. 전역 `*` 셀렉터 사용 금지.

```css
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  box-shadow 0.2s ease,
  color 0.2s ease;
```

- 루트 컨테이너: `background-color, border-color, box-shadow, color` 각 0.2s
- Title 텍스트: `color 0.2s ease`
- Description 텍스트: `color 0.2s ease`
- Sub Description 텍스트: `color 0.2s ease`
- Detail text: `color 0.2s ease`
- Creator name: `color 0.2s ease`
- Card Body: `background-color 0.2s ease`

> `transition: all` 금지. 색상 속성만 지정. 지속시간 0.2s 통일.
> `globals.css`의 `@media (prefers-reduced-motion: reduce)`가 모든 transition을 무력화.

---
