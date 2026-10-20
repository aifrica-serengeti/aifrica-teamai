# Global Header v2 — 정의와 구조

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← Global Header v2 문서 인덱스](README.md)

## 2. 의존 컴포넌트

직접 의존성의 동작·접근성·다크 모드 규칙을 Header에서 재구현하지 않는다.

| 구분 | 컴포넌트 | 가이드라인 | 구현 상태 | 역할 |
| --- | --- | --- | --- | --- |
| 직접 | Icon Button | IconButton/README.md (`DOCS_ROOT/frontend/design/components/IconButton/README.md`) | 제품에서 확인 | `ghost` 토글 버튼. Header 안에서만 28×28px touch area로 보정 |
| 직접 | Divider | Divider/README.md (`DOCS_ROOT/frontend/design/components/Divider/README.md`) | 제품에서 확인 | 1px vertical line + 좌우 각 8px 여백 |
| 직접 | Breadcrumb | Breadcrumb/README.md (`DOCS_ROOT/frontend/design/components/Breadcrumb/README.md`) | 제품에서 확인 | 현재 위치와 좁은 폭에서의 자동 축약 |
| 조립 | [SNB v2](../SNBV2/README.md) | [SNBV2/README.md](../SNBV2/README.md) | 제품에서 확인 | Header와 같은 부모 state를 받는 좌측 240px / 60px navigation landmark |
| 간접 | Icon | Icon/README.md (`DOCS_ROOT/frontend/design/components/Icon/README.md`) | 제품에서 확인 | Icon Button이 `sidebar` System icon을 16px로 렌더 |
| 간접 | Menu | Menu/README.md (`DOCS_ROOT/frontend/design/components/Menu/README.md`) | 제품에서 확인 | Breadcrumb이 축약될 때 `...` 항목을 노출 |

```
Global Header v2
├── Icon Button (ghost, 28×28 override)
│   └── Icon (sidebar, 16px)
├── Divider (vertical)
└── Breadcrumb (optional)
    ├── Icon Button + Icon (축약 시)
    └── Menu (축약 시)
```

SNB v2는 Header의 내부 자식이나 Header의 의존성을 대체하는 컴포넌트가 아니다. 두 컴포넌트는
부모 application shell에서 나란히 조립한다.

## 3. 구조 (Anatomy)

```text
header[Global Header v2]
├── IconButton
│   ├── icon="sidebar"
│   ├── aria-controls={snbId}
│   └── aria-expanded={!snbCollapsed}
├── Divider[orientation="vertical"]
└── Breadcrumb slot (optional)
    └── Breadcrumb[items]
```

`breadcrumbs`가 비어 있으면 Breadcrumb slot만 생략한다. Figma 기본 예시는 현재 위치 하나인
`모델/에이전트`다. Divider는 Figma 기본 구조를 유지하기 위해 계속 렌더한다.

### 검증된 application shell 구조

```text
div[application shell]
├── aside[SNB v2]                         ← 좌측 240px / collapsed 60px
└── div[appContainer]                     ← SNB 오른쪽, 위쪽 8px 여백
    └── header[Global Header v2]           ← appContainer의 첫 번째 48px 행
        ├── IconButton → shared collapsed state 변경 요청
        ├── Divider
        └── Breadcrumb
```

`Global Header v2`를 shell의 첫 자식으로 두면 Header가 SNB 위쪽까지 가로지르게 된다. 이 구조는
사용하지 않는다.

## 4. 레이아웃 스펙

### Header shell

| 항목 | 값 |
| --- | --- |
| 너비 | `100%` |
| 높이 | `48px` (`border-box` 포함) |
| 좌우 padding | 24px; viewport ≤599px에서는 16px |
| 자식 gap | 8px |
| 정렬 | `display:flex; align-items:center` |
| 하단선 | `1px solid --border-default` |
| overflow | `hidden` |
| 모서리 | 없음 (`border-radius: 0`) |

### Application shell

| 영역 | 라이트 값 / Token | 다크 값 / Token | 레이아웃 규칙 |
| --- | --- | --- | --- |
| Shell 배경 | `var(--surface-primary-subtle)` (`--surface-primary-subtle`) | `var(--surface-primary-subtle)` (`--surface-primary-subtle`) | `display:flex; width:100%; height:100%; min-width:0; overflow:hidden` |
| SNB v2 | 240px / 60px collapsed | 240px / 60px collapsed | 좌측 첫 번째 자식. `height:100%` |
| `appContainer` | `var(--surface-shell)` (`--surface-shell`) | `var(--surface-shell)` (`--surface-shell`) | `flex:1 1 0; min-width:0; height:calc(100% - 8px); margin-top:8px; flex-direction:column` |
| `appContainer` radius | 14px | 14px | `border-top-left-radius:14px; overflow:hidden`. **Header가 아닌 container가 소유** |
| Global Header v2 | 48px | 48px | `flex-shrink:0`; appContainer의 맨 위 |

### 좌측 조합의 정확한 수평 배치

기본 padding 24px 기준의 좌표다.

| 요소 | 시작 위치 | 크기/규칙 |
| --- | --- | --- |
| SNB toggle | 24px | 28×28px |
| 첫 gap | 52px | 8px |
| Divider wrapper | 60px | 폭 17px = 좌우 padding 8px + line 1px |
| Divider line | 68px | 1px × **12px**, Header 정중앙 |
| 두 번째 gap | 77px | 8px |
| Breadcrumb slot | 85px | `flex: 1 1 auto; min-width: 0` |

### Divider의 핵심 규칙

공용 Divider의 vertical 기본값은 부모 높이(`height:100%`)를 채운다. 이 Header에서는 그 규칙보다
높은 CSS 특이도로 wrapper 높이를 **12px**로 덮어야 한다. 그렇지 않으면 separator가 Header의 48px
전체 높이를 차지해 Figma와 달라진다.

### 아이콘 버튼

| 항목 | 값 |
| --- | --- |
| variant | `ghost` |
| 버튼 영역 | 28×28px |
| 내부 System icon | `sidebar`, 16×16px (`Icon size="m"`) |
| 아이콘/버튼 정렬 | 둘 다 flex center. icon과 button 중심은 Header content center와 일치 |
| radius | 4px (공용 Icon Button) |
| focus | 1px outline + 1px offset (공용 Icon Button) |


## 공개 Props 계약

React의 `ComponentProps`와 공용 Breadcrumb의 실제 타입을 사용한다. 아래는 공개 API이며 제품 구현의 export 존재를 뜻하지 않는다.

```ts
export interface GlobalHeaderV2Props
  extends Omit<ComponentProps<'header'>, 'children'> {
  breadcrumbs?: BreadcrumbItemData[]
  snbCollapsed?: boolean
  snbId?: string
  onSnbCollapsedChange?: (collapsed: boolean) => void
}
```
