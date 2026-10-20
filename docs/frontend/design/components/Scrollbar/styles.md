# Scrollbar & ScrollArea — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](./README.md)

## 4. 색상 스펙 — 라이트 모드

thumb는 반투명(alpha 30%)으로 뒤 컨텐츠가 비친다. Figma 원본값(`#dddddd`)은 너무 밝아
반투명 시 시인성이 떨어지므로, 더 짙은 회색(gray-700 `#555555`)에 alpha를 섞어 사용한다.

### Thumb 색상

| 상태          | 색상                                | 토큰                      | 비고                                   |
| ------------- | ----------------------------------- | ------------------------- | -------------------------------------- |
| 기본(표시 중) | `rgba(85,85,85,0.30)` (`#5555554d`) | `--scrollbar-thumb-fill`  | alpha 30%, 뒤 비침                     |
| Hover         | `rgba(85,85,85,0.55)` (`#5555558c`) | `--scrollbar-thumb-hover` | alpha 55%, 더 선명                     |
| 숨김(미노출)  | —                                   | opacity 0                 | type=hover 미호버 / scroll 미스크롤 시 |
| 참고(원본)    | `#dddddd`                           | `--scrollbar-thumb`       | Figma 원본. 호환/참고용                |

### 컨테이너 색상

| 요소          | 색상                | 토큰               |
| ------------- | ------------------- | ------------------ |
| 배경          | `#ffffff`           | `--surface`        |
| 테두리        | `1px solid #e4e4e4` | `--border-default` |
| 콘텐츠 텍스트 | `#1c1c1c`           | `--text`           |

---

## 5. 색상 스펙 — 다크 모드

다크에서는 명암 방향이 반대: 어두운 배경 위에 **밝은** thumb를 반투명으로 렌더.
gray-300(`#dddddd`)에 alpha를 섞는다.

### Thumb 색상 (다크)

| 상태          | 색상                                   | 토큰                      | 비고        |
| ------------- | -------------------------------------- | ------------------------- | ----------- |
| 기본(표시 중) | `rgba(221,221,221,0.30)` (`#dddddd4d`) | `--scrollbar-thumb-fill`  | alpha 30%   |
| Hover         | `rgba(221,221,221,0.55)` (`#dddddd8c`) | `--scrollbar-thumb-hover` | alpha 55%   |
| 참고(원본)    | `#555555`                              | `--scrollbar-thumb`       | 다크 참고용 |

### 컨테이너 색상 (다크)

| 요소          | 색상                | 토큰               |
| ------------- | ------------------- | ------------------ |
| 배경          | `#1c1c1c`           | `--surface`        |
| 테두리        | `1px solid #555555` | `--border-default` |
| 콘텐츠 텍스트 | `#dddddd`           | `--text`           |

---

## 7. 타이포그래피

ScrollArea 자체는 타이포그래피를 정의하지 않는다(콘텐츠는 사용자가 제공). 검증 예제의
본문 텍스트는 `var(--text)` 색상과 Pretendard 폰트를 사용한다.

`verticalThumbOffset`은 색상이나 CSS token을 추가하지 않는 geometry prop이다. Table 같은
sticky header 조합에서는 해당 높이만큼 수직 thumb의 시작점이 아래로 이동해 header surface를
가리지 않아야 한다.

`ScrollAreaHandle.scrollTo()`는 위치만 변경하는 동작 API이므로 별도 색상·간격·타이포그래피를
추가하지 않는다. 위치 이동 뒤 thumb는 기존 geometry와 노출 timing 규칙으로 다시 계산된다.

---

## 10. 디자인 토큰 정의 (CSS 변수)

복사-붙여넣기로 새 프로젝트에 그대로 정의 가능한 토큰 블록. 의존하는 raw palette
(`--color-gray-300`, `--color-gray-700`)은 프로젝트의 palette 토큰을 사용한다.

```css
:root {
  /* Scrollbar — Figma node 5282:27347.
   * thumb 는 반투명(naive-ui 스타일). Figma 원본 #ddd 는 너무 밝아 반투명 시
   * 시인성이 떨어지므로 더 짙은 회색에 alpha 를 섞는다. */
  --scrollbar-thumb: var(--color-gray-300); /* #dddddd — Figma 원본(참고용) */
  --scrollbar-thumb-fill: color-mix(
    in srgb,
    var(--color-gray-700) 30%,
    transparent
  ); /* #5555554d */
  --scrollbar-thumb-hover: color-mix(
    in srgb,
    var(--color-gray-700) 55%,
    transparent
  ); /* #5555558c */
}

.dark {
  /* Scrollbar — 다크에서는 밝은 thumb(gray-300)를 반투명으로. 어두운 배경 위에 표시. */
  --scrollbar-thumb: var(--color-gray-700); /* #555555 — 참고용 다크 원본값 */
  --scrollbar-thumb-fill: color-mix(
    in srgb,
    var(--color-gray-300) 30%,
    transparent
  ); /* #dddddd4d */
  --scrollbar-thumb-hover: color-mix(
    in srgb,
    var(--color-gray-300) 55%,
    transparent
  ); /* #dddddd8c */
}
```

> **참고**: `color-mix()`는 현대 브라우저(Chrome 111+, Safari 16.2+, Firefox 113+)에서 지원.
> 구형 브라우저 지원이 필요하면 rgba 하드코딩으로 대체(주석의 값 참조).

---
