# Tree — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)

## 14. 완전 재현용 구현 전달 규칙

이 절의 목표는 “비슷하게 구현”이 아니라 이 문서의 Tree 재현 잠금 기준과 **DOM, CSS, connector
계산, 애니메이션 및 상호작용이 동일한 결과를 내는 것**이다. 아래 원칙을 지키지 않으면
특히 중첩 connector, 접힘 애니메이션, leaf marker 위치가 달라진다.

1. 이 문서의 **부록 A/B 전체 파일을 한 글자도 생략하지 않고 복사**한다. import path만
   새 프로젝트의 파일 구조에 맞춰 바꿀 수 있고, 나머지 로직·class 순서·data attribute·숫자는 바꾸지 않는다.
2. 데이터 API에서는 부록 B의 SVG overlay만 connector로 사용한다.
   CSS spacer branch는 `TreeParent`/`TreeItem`을 직접 조립하는 프리미티브 API에서만 사용한다.
   두 방식을 동시에 켜면 선이 중복되므로 금지한다.
3. 행별 border 조각, `<div>` 기반 connector, `max-height` accordion, 매 렌더의
   전체 connector 측정으로 대체하지 않는다. 이들은 아래 형제의 선 이동·절단·성능 저하를 만든다.
4. 새 환경에서는 부록의 SHA-256이 일치하는지 반드시 확인한다. 해시가 다르면 같은 구현이 아니다.

### 14.1 런타임과 도구 체인

| 항목                           | 재현에 필요한 기준                                   |
| ------------------------------ | ---------------------------------------------------- |
| React / React DOM              | 19.2.7                                               |
| TypeScript                     | 6.0.2                                                |
| `@vanilla-extract/css`         | 1.21.1                                               |
| `@vanilla-extract/vite-plugin` | 5.2.4                                                |
| `lucide-react`                 | 1.23.0                                               |
| `radix-ui`                     | 1.6.1                                                |
| class merge                    | `clsx` 2.1.1 + `tailwind-merge` 3.6.0                |
| CSS runtime                    | vanilla-extract가 `.css.ts`를 처리하도록 Vite에 등록 |

`cn`은 아래 구현과 동등해야 한다.

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 14.2 의존성 호환 계약

부록 B는 아래 컴포넌트를 직접 import한다. 이름만 같은 다른 컴포넌트로 바꾸면
행의 x좌표와 입력 동작이 달라질 수 있으므로, 기존 디자인 시스템의 구현을 **그대로 복사**하거나
다음 계약을 모두 충족해야 한다.

| 의존성         | Tree가 고정적으로 요구하는 계약                                                                                                                                                                                                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Icon`         | `folder`, `folder_open`, `doc_code`, `cloud`, `more_horizontal`은 lucide-react의 `Folder`, `FolderOpen`, `FileCode2`, `Cloud`, `Ellipsis`여야 한다. `size="m"`은 정확히 16px, stroke-width는 1.25px, `round` linecap/linejoin, 기본 색은 `var(--icon)`이다.                                                                                      |
| triangle icon  | lucide chevron으로 대체 금지. 20×20 viewBox의 **filled** SVG를 쓴다. down path: `M5 7.63147L10 12.7165L15 7.63147`; right path: `M7.63147 5L12.7165 10L7.63147 15`; 모두 `fill="currentColor"`이다.                                                                                                                                              |
| `IconButton`   | Tree는 `variant="ghost"`, `size="medium"`, `iconSize="m"`만 사용한다. 버튼 box는 24×24px, padding 0, border-radius 4px, 투명 border/background, hover `rgba(0,0,0,0.05)`/dark `rgba(255,255,255,0.08)`, pressed `rgba(0,0,0,0.1)`/dark `rgba(255,255,255,0.2)`이다. focused는 1px `--icon-btn-focus-border` outline + 1px offset이다.            |
| `Checkbox`     | Radix Checkbox Root를 사용한다. Tree slot은 24×24px지만 Checkbox 자체는 Medium 16×16px이다. box-sizing border-box, radius 2px, unchecked 1px `--border-bolder` border, checked/indeterminate `--element-primary` fill, check 12px `CheckIcon` stroke-width 3 또는 8×2px dash를 사용한다. checkbox click은 반드시 row click propagation을 멈춘다. |
| `DropdownMenu` | selected이고 disabled가 아닌 leaf에만 표시한다. trigger는 24×24 ghost IconButton이고, `DropdownMenuTrigger asChild` + portal content로 Escape·focus 복귀·outside click을 Radix에 맡긴다. 메뉴 trigger click은 row click propagation을 멈춘다.                                                                                                    |
| semantic token | 13절의 light/dark 값을 모두 정의한다. `transparent` 기본 행, alpha hover/pressed, selected surface를 다른 토큰으로 치환하지 않는다.                                                                                                                                                                                                              |

### 14.3 전달해야 하는 의존 문서 closure

새 프로젝트에 Tree 문서만 단독으로 전달하면 100% 재현 조건을 만족하지 않는다. 아래 문서와
Pretendard 400/600/700 폰트를 한 묶음으로 전달한다. 각 문서에는 Tree가 재구현하면 안 되는
공용 UI·asset·focus/portal 동작이 들어 있다.

| 전달 파일                 | 이유                                               | 현재 SHA-256                                                       |
| ------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| [foundation 문서](../../../foundations.md)               | 전체 color/typography semantic token과 다크 매핑   | `f0d613aa848d1aad8a0cc44983ea115af724364b9b96d5c54b0749ecf68ca965` |
| `reproduction.md` | 전역 reset, viewport, 폰트 로드와 재현 절차        | `671cb2c7fdfd54843deed52beed62eabdfbcdf6051bcabc2189306e0063796fe` |
| `Icon/README.md`                 | custom filled triangle 및 lucide icon 렌더 규칙    | `ca478180f3eaea9b37926b92ec9e8bd1dacee9e42bb8dfbcb3ec79dbfb9a0e6c` |
| `IconButton/README.md`           | 24px ghost trigger의 상태·focus ring               | `ed0482fb2954dd6c9693bf8d244f4214f276d7e28d7d3918ef2c4255ea133c82` |
| `Checkbox/README.md`             | 16px Radix checkbox의 상태·마크 정렬               | `85163f0d1fa31f378607b8bc51603fa53be070d080d3347f47018af4da98a578` |
| `Menu/README.md`                 | selected leaf trailing menu의 portal·keyboard 동작 | `b0818ec6a688238682e2e3c36773c7f5d2d76c3ce64fd4c2abe3f853402b19c2` |
| `Scrollbar/README.md`            | Menu가 사용하는 ScrollArea 구현                    | `452e904a3ff1e4bee3b655fc3b88720d26f973e2792baa736b5e105e3115e436` |

하나라도 누락됐거나 해시가 다르면 해당 의존성의 문서/자산을 먼저 맞춘다. 독자적인
대체 구현으로 진행하는 것은 “동일한 Tree” 재현이 아니라 별도 변형을 만드는 일이다.

### 14.4 새 환경에서의 파일 배치

```text
implementation-root/
├── components/tree/
│   ├── Tree.tsx         ← 부록 B 전체
│   └── Tree.css.ts      ← 부록 A 전체
├── components/icon/…    ← 14.2 계약의 Icon 및 custom triangle
├── components/icon-button/…
├── components/checkbox/…
├── components/menu/…
└── styles/tokens.css    ← 13절의 CSS custom properties
```

파일을 복사한 뒤 다음 명령의 해시가 부록의 값과 같아야 한다.

```bash
shasum -a 256 <mapped-tree-style> <mapped-tree-source>
```

## 16. 검증 가능한 원본 스냅샷

이 절은 설명용 코드가 아니라 문서에 포함된 **portable canonical source**다. 새 환경에서
동일한 Tree를 만들 때 부록 A/B를 각각 Tree.css.ts와 Tree.tsx로 복사한다. import path는
프로젝트 구조에 맞게 바꿔도 되지만, import 대상을 14.2의 동일한 의존성으로 유지해야 한다.

| 파일        | SHA-256                                                          |
| ----------- | ---------------------------------------------------------------- |
| Tree.css.ts | 45594078d2156d70a5b014a3b724fa132837caa0f05b961aaf4dfd8db2d4d0a1 |
| Tree.tsx    | 0913bc6a9dd4c506d409ba377c88e829fc0c7d5bc8d61d1712e36251ef9ab204 |

> 해시는 줄바꿈까지 포함한 파일 기준이다. formatter가 코드를 바꿨다면 의미상 동작이 같더라도
> 해시는 달라진다. 이 경우에는 15절의 시각·상호작용 체크를 모두 다시 통과시켜야 한다.
