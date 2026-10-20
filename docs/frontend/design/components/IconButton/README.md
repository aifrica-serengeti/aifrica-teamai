# Icon Button

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Icon Button 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
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

텍스트 대신 아이콘을 사용해 한 번의 클릭/탭으로 작업을 수행하거나 선택할 수 있는 버튼.
Icon + 충분한 터치 영역(Touch area)으로 구성된다. 주로 Form, Dialog, Toolbar 에서 쓰인다.

**매트릭스:** 2 variant(Outlined/Ghost) × 3 size(Tiny/Medium/XLarge)
× 5 state(Enabled/Hovered/Pressed/Disabled/Focused).

**기술 기반:** 네이티브 `<button>` 요소에 Icon Button 스펙을 vanilla-extract `.css.ts`
로 직접 렌더한다. 아이콘은 **공용 Icon 컴포넌트**(`Icon` / `StatusIcon`)를 재사용한다 —
별도의 SVG 렌더링 로직을 두지 않는다.

### Variant 역할 (사용 가이드)

| Variant      | 용도                                                                                | 외형                                   |
| ------------ | ----------------------------------------------------------------------------------- | -------------------------------------- |
| **Outlined** | Icon button 의 영역을 명확히 드러내야 할 때. Tertiary button 과 함께 배치할 때 적합 | 1px 테두리 + hover/pressed 배경        |
| **Ghost**    | 메인 인터랙션이 아닌 보조 기능(설정, 더보기 등). 가장 미니멀                        | 테두리·배경 없음, hover/pressed 배경만 |

### Size 역할

| Size       | 터치 영역 | 권장 icon size |
| ---------- | --------- | -------------- |
| **Tiny**   | 20×20px   | t(12px)        |
| **Medium** | 24×24px   | m(16px)        |
| **XLarge** | 32×32px   | xl(20px)       |

> Figma 스펙에는 Small/Large 도 정의되어 있으나 주요 사이즈 간 구분력이 떨어져 사용을 지양한다.
> 권장 icon size 는 기본값일 뿐, 터치 영역 내에서 icon size 를 유연하게 바꿀 수 있다.

---

