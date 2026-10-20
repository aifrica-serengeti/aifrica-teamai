# Textarea — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Textarea 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Textarea 의 Label · Counter · Help text 는 자체 마크업으로 구현한다. 별도 의존 컴포넌트가
없다(Info icon 만 `lucide-react` 의 `Info` 사용). 상세 절차는 루트 [foundation 문서](../../foundations.md) 의
"공용 컴포넌트 조합 규칙" 참조.

| 컴포넌트              | 가이드라인                  | 구현 상태   | 용도                                                                                                                         |
| --------------------- | --------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Input** (토큰 공유) | [`Input/README.md`](../Input/README.md) ✅ | 토큰만 참고 | `--form-*` semantic 토큰 체계를 공유. Textarea 는 Input 과 동일 토큰을 사용하되 `<textarea>` 특성(height/resize/rows)을 반영 |

> Textarea 는 Input 의 `size` 프롭이 없다(단일 높이 84px). 대신 `rows` attribute 와
> `resize: vertical` 로 높이를 제어한다.

---

## 3. 구조 (Anatomy)

```
Textarea Field
├── Label 행  ── [Label · (선택사항) · * · info]  ←좌·→ [Counter]  (space-between)
│   ├── Label 그룹(좌) ── Label · (선택사항) · * 필수 · info 아이콘
│   └── Counter (우) ── 현재/최대 글자 수
├── Container (<textarea>)
│   ├── Placeholder / Input text
│   └── Resize handle (우하단, 세로 드래그)
└── Help text / Error text (box 아래)
```

### 구성 요소 (Figma 가이드라인 node 7608:3188)

| #   | 요소                             | 필수      | 설명                                                                          |
| --- | -------------------------------- | --------- | ----------------------------------------------------------------------------- |
| 1   | **Label**                        | 기본 필수 | Textarea 에 요구되는 정보 종류 표시. 14px SemiBold                            |
| 2   | Requirement indicator (optional) | 선택      | 필수(`*`) 또는 `(선택사항)` 표시                                              |
| 3   | Info icon (optional)             | 선택      | Label 옆 보조 아이콘, hover 시 Tooltip                                        |
| 4   | **Counter (optional)**           | 선택      | label 행 **우측 끝**. 현재 입력 글자 수 / 최대. maxLength 설정 시 자동 활성화 |
| 5   | **Container**                    | 필수      | 사용자가 여러 줄 데이터를 입력하는 영역(`<textarea>`)                         |
| 6   | Placeholder (optional)           | 선택      | 임시 텍스트. 접근성 한계로 기본 표시 아님                                     |
| 7   | **Resize handle**                | 기본 제공 | 세로 드래그로 높이 조절(`resize: vertical`). disabled/read-only 시 차단       |
| 8   | **Input text**                   | —         | 사용자가 입력한 텍스트                                                        |
| 9   | **Help text (optional)**         | 선택      | box 아래. 추가 정보. Error text 우선                                          |

> **Counter 위치 주의**: Input 의 trailing 은 box **내부** 우측이지만, Textarea 의 counter 는
> **label 행 우측 끝**(box 외부)이다. 이것은 Input 과 Textarea 의 핵심 차이점 중 하나.

---

## 4. 레이아웃 스펙

모든 수치는 px 단위.

### Container (`<textarea>`)

| 항목        | 값                                | 비고                                                                                                       |
| ----------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 너비        | 100% (부모 기준)                  | 기본 가변                                                                                                  |
| 높이        | **84px** (기본)                   | `height: 84px` 명시. lineHeight 20px × 3줄 + 상하 패딩 24px. `resize: vertical` 로 사용자가 세로 확장 가능 |
| 패딩        | 12px (상하좌우)                   | 모든 방향 동일                                                                                             |
| Radius      | **4px**                           | `border-radius: 4px`                                                                                       |
| 폰트        | Pretendard Regular 14px / LH 20px | `--font-sans`                                                                                              |
| Border 두께 | 1px (기본) / 시각 2px (focus)     | focus 는 border 1px + inset shadow 1px (밀림 방지)                                                         |
| rows        | 3 (기본)                          | 브라우저 기본 rows=2 가 인라인 height 를 주입하는 것을 방지                                                |

> **height 명시 이유**: 브라우저 `<textarea>`는 기본 `rows=2`로 자체 height(~44px)를
> 계산해 인라인 `style="height: 44px"` 를 주입한다. CSS `minHeight` 만으로는 이를 무시하지
> 못해 감싼 div 보다 textarea 가 낮아져 빈 공간이 생긴다. 따라서 **`height: 84px` 명시 +
> `rows={3}` 속성**으로 고정한다.

### 간격

| 위치                        | 값                                          |
| --------------------------- | ------------------------------------------- |
| Label 행 ↔ Container        | 4px (세로, `field` 의 gap)                  |
| Container ↔ Help/Error text | 4px (세로, `field` 의 gap)                  |
| Label 그룹 내부 간격        | 2px (Label · optional · required · info 간) |
| Label 그룹 ↔ Counter        | 8px (labelRow 의 gap, space-between)        |

> **정렬 불변의 원칙**: focus 시 border 가 1px → 2px 로 변하면 `box-sizing: border-box`
> 때문에 콘텐츠(placeholder/입력값)가 1px 밀린다. 따라서 **border 는 1px 고정**하고,
> 두 번째 1px 은 같은 색의 `box-shadow: inset 0 0 0 1px` 로 그린다. Input 과 동일 기법.

---

