# Spinner — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](./README.md)

## 5. 색상 스펙 — 라이트 모드

Spinner 는 2개 색상만 사용한다. Track(배경) 은 균일한 밝은 blue, Indicator(아크) 는
브랜드 blue 의 수직 그라데이션이다.

| 요소                            | 색상                               | 토큰                  |
| ------------------------------- | ---------------------------------- | --------------------- |
| Track stroke                    | `var(--accent-100)` (accent-100)               | `--spinner-track`     |
| Indicator gradient 시작(0%)     | `var(--accent-500)` (accent-500, 불투명)       | `--spinner-indicator` |
| Indicator gradient 중간(75.52%) | `var(--accent-500)` opacity 0.01 (거의 투명) | `--spinner-indicator` |
| Indicator gradient 끝(100%)     | `var(--accent-500)` opacity 0 (완전 투명)    | `--spinner-indicator` |

> **Figma 근거**: 원본 SVG 의 `<circle stroke="var(--stroke-0, #BFD8FF)">` 와
> `<linearGradient><stop stop-color="var(--accent-500)">` 를 교차 검증.
> `#BFD8FF` 는 accent-100(`var(--accent-100)`)에 해당하는 Figma 변수값이다.

### 그라데이션 형태 (수직 선형)

```
        12시 (top)
        ┌──●  ← stop 0%:   var(--accent-500) 불투명 (가장 진함)
        │    │
   ◯──┤    ├──◯     Indicator arc (270°)
        │    │
        └──○  ← stop 75.52%: opacity 0.01 (거의 사라짐)
             stop 100%:  opacity 0    (완전 투명)
        6시 (bottom)
```

- linearGradient 방향: `x1=24 y1=6 → x2=24 y2=42` (수직, top → bottom)
- 그라데이션은 **각도가 아닌 y 좌표** 기준 선형 분포. 12시 부근이 가장 진하고
  6시 부근으로 갈수록 투명해진다. 회전하면 진한 부분이 항상 "진행 선두"가 된다.

---

## 6. 색상 스펙 — 다크 모드

다크 모드는 `.dark` 클래스 적용 시 전환. Spinner 가 참조하는 `--spinner-*` 토큰만
재매핑하면 자동 전환된다. 어두운 배경 위에서 시인성을 확보하기 위해 더 밝은 blue 사용.

| 요소               | 라이트               | 다크                                 | 토큰                  |
| ------------------ | -------------------- | ------------------------------------ | --------------------- |
| Track stroke       | `var(--accent-100)` (accent-100) | `var(--accent-200)` (accent-200, 옅은 파스텔)    | `--spinner-track`     |
| Indicator gradient | `var(--accent-500)` (accent-500) | `var(--accent-400)` (accent-400, 진한 밝은 파랑) | `--spinner-indicator` |

> **대비 유지 원칙 (핵심)**: 다크 모드에서도 라이트와 동일하게 **Track 이 옅고
> Indicator 가 진한** 대비 패턴을 유지해야 한다. Track(accent-200) 은 Indicator(accent-400)
> 보다 2단계 옅어 회전하는 아크가 배경에서 명확히 구분된다.
>
> **주의**: Track 과 Indicator 를 같은 색(예: 둘 다 accent-400)으로 두면 대비가 사라져
> 동일한 accent 원처럼 보이는 버그가 발생한다. 반드시 다른 음영을 사용할 것.

---

## 8. 타이포그래피

**해당 없음.** Spinner 는 텍스트를 포함하지 않는다.

---

## 11. 디자인 토큰 정의 (CSS 변수)

새 프로젝트에서 아래 변수를 `:root`와 `.dark`에 정의한다. 컴포넌트는 이 변수만 참조한다.

### `:root` (라이트)

```css
:root {
  /* Spinner — Figma color/element 기반. */
  --spinner-track: var(--accent-100); /* accent-100 — Track 배경 원 링 */
  --spinner-indicator: var(--accent-500); /* accent-500 — Indicator 그라데이션 기준색 */
  --spinner-speed: 1s; /* 1회전 소요 시간 */
}
```

### `.dark` (다크)

```css
.dark {
  /* Spinner — 다크에서 더 밝은 blue 로 시인성 확보.
   * Track 은 Indicator 보다 2단계 옅게(200 vs 400) 하여 대비 유지. */
  --spinner-track: var(--accent-200); /* accent-200 — 옅은 파스텔 */
  --spinner-indicator: var(--accent-400); /* accent-400 — 진한 밝은 파랑 */
  /* --spinner-speed 는 다크/라이트 공통 (1s) */
}
```

---

