# Input — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Input 의 Trailing element(clear 버튼, password 표시 토글)은 공용 Icon Button 을 사용한다.
재현자는 아래 컴포넌트를 먼저 확보한 뒤 조합해야 한다. 상세 절차는 루트 [foundation 문서](../../foundations.md) 의
"공용 컴포넌트 조합 규칙" 참조.

| 컴포넌트        | 가이드라인                                           | 구현 상태              | 용도                                                                            |
| --------------- | ---------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| **Icon Button** | [`IconButton/README.md`](../IconButton/README.md) ✅ | 참조 계약 · 매핑 확인 필요 ✅ → **재사용** | Trailing 의 clear / password 표시 토글. Input size 에 연동된 치수 사용(아래 표) |

> Icon Button 은 Input 컨테이너 우측 trailing 영역에 절대 배치된다. Input 이 Icon Button 의
> 마크업/상태/hover 로직을 **직접 구현하지 않고** 공용 컴포넌트를 재사용한다.
>
> **size 연동 치수(핵심)**: Icon Button 의 히트 영역/icon 사이즈는 Input size 에 따라 전환된다.
>
> | Input size                            | Icon Button 영역 | icon size | Icon Button 분류 |
> | ------------------------------------- | ---------------- | --------- | ---------------- |
> | **Small**                             | 20×20px          | 14px      | Tiny             |
> | **Medium 이상**(Medium/Large/X-Large) | 24×24px          | 16px      | Medium           |
>
> IconButton 의 `buttonSize` prop(`"small"`/`"medium"`)으로 영역을, icon `size` prop 으로
> icon px 를 각각 전달한다. IconButton Tiny 기본 icon(12px)과 다르므로 반드시 override.
>
> **Icon Button 이 구현되어 있지 않은 경우**: `IconButton/README.md` 스펙으로 먼저 공용 Icon Button
> 컴포넌트를 만든 뒤, 그것을 조합해 Input 의 trailing 을 구성한다.
>
> password 토글의 accessible name은 `passwordShowLabel` / `passwordHideLabel` prop으로 page가 제공할 수
> 있다. 기본 한국어 문구는 하위 호환용이며, 다국어 page는 해당 locale의 문구를 전달한다.

---

## 3. 구조 (Anatomy)

```
Input Field
├── Label 행  ── Label · (선택사항) · * 필수 · info 아이콘
├── Text input
│   ├── Input wrap (relative) ── trailing 절대배치 기준
│   │   ├── <input> Container ── 너비 100%, 높이 size 별
│   │   │   ├── Placeholder / Input text
│   │   │   └── Trailing element (absolute, 우측)
│   │   │       ├── Counter (현재/최대)
│   │   │       ├── Suffix (단위 등)
│   │   │       └── Icon Button ── 공용 컴포넌트(clear / password 토글)
└── Help text / Error text (12px)
```

### 구성 요소

| #   | 요소                             | 필수      | 설명                                                |
| --- | -------------------------------- | --------- | --------------------------------------------------- |
| 1   | **Label**                        | 기본 필수 | Input 에 요구되는 정보 종류 표시. 14px SemiBold     |
| 2   | Requirement indicator (optional) | 선택      | 필수(`*`) 또는 `(선택사항)` 표시                    |
| 3   | Info icon (optional)             | 선택      | Label 옆 보조 아이콘, hover 시 Tooltip              |
| 4   | **Container**                    | 필수      | 사용자가 데이터를 입력하는 영역(`<input>`)          |
| 5   | Placeholder (optional)           | 선택      | 임시 텍스트. 접근성 한계로 기본 표시 아님           |
| 6   | **Input text**                   | —         | 사용자가 입력한 텍스트                              |
| 7   | Trailing element (optional)      | 선택      | Counter · Suffix · Icon Button(clear/password 토글) |
| 8   | Help text (optional)             | 선택      | 추가 정보. Error text 우선                          |

`reserveDescriptionSpace`가 true이면 Help/Error text가 없는 경우에도 12px/16px 한 줄 영역을 보이지
않게 유지한다. Error가 표시되면 같은 영역을 사용하므로 부모 form이 재배치되지 않는다.

---

## 4. 레이아웃 스펙

모든 수치는 px 단위.

### Container (`<input>`)

| 항목        | 값                                | 비고                                               |
| ----------- | --------------------------------- | -------------------------------------------------- |
| 너비        | 100% (부모 기준)                  | 기본 가변. 고정 시 부모에서 제어                   |
| 가로 패딩   | 12px (좌우)                       | trailing 있을 때 우측은 동적 확장                  |
| Radius      | 4px                               | `border-radius: 4px`                               |
| 폰트        | Pretendard Regular 14px / LH 20px | `--font-sans`                                      |
| Border 두께 | 1px (기본) / 2px (focus)          | focus 는 border 1px + inset shadow 1px (밀림 방지) |

### Size 치수 (Figma 교차 검증)

symbol 매트릭스(node `7021:24103`)에서 각 size 의 전체 높이로 추출.

| Size              | Container height |
| ----------------- | ---------------- |
| **Small**         | 28px             |
| **Medium (기본)** | 32px             |
| **Large**         | 36px             |
| **X-Large**       | 40px             |

### 간격

| 위치                        | 값                                          |
| --------------------------- | ------------------------------------------- |
| Label 행 ↔ Container        | 4px (세로)                                  |
| Container ↔ Help/Error text | 4px (세로)                                  |
| Label 행 내부 간격          | 2px (Label · optional · required · info 간) |
| Trailing 내부 간격          | 4px (counter · suffix · icon button 간)     |
| Trailing 우측 offset        | 12px (Container 우측 padding 과 정렬)       |

### Trailing Icon Button 치수 (Input size 연동)

Icon Button 의 히트 영역과 icon 사이즈는 **Input size 에 따라 전환**된다.

| Input size  | Icon Button 영역 | icon size | icon stroke | Icon Button 분류 |
| ----------- | ---------------- | --------- | ----------- | ---------------- |
| **Small**   | 20×20px          | 14px      | 2px         | Tiny             |
| **Medium**  | 24×24px          | 16px      | 2px         | Medium           |
| **Large**   | 24×24px          | 16px      | 2px         | Medium           |
| **X-Large** | 24×24px          | 16px      | 2px         | Medium           |

> Small 만 Tiny(20px)를 사용하고, Medium 이상은 Medium(24px)으로 고정한다.
> IconButton Tiny 의 기본 icon size 는 12px(t) 이나 Input Small 은 14px 을 사용하므로 override 필요.

> **정렬 불변의 원칙**: focus 시 border 가 1px → 2px 로 변하면 `box-sizing: border-box`
> 때문에 콘텐츠(placeholder/입력값)가 1px 밀린다. 따라서 **border 는 1px 고정**하고,
> 두 번째 1px 은 같은 색의 `box-shadow: inset 0 0 0 1px` 로 그린다. 시각적으로 2px 와
> 동일하되 레이아웃 시프트가 없다.

---

## 입력칸 내부 보조 액션

`InputField.trailingAction`의 타입은 `Pick<IconButtonProps, "icon" | "label" | "onClick" | "disabled">`이다.
기존 trailing 영역 끝에 공용 IconButton 하나를 렌더한다. Small은 tiny/14px 아이콘, Medium 이상은
medium/16px 아이콘을 사용한다. 도움말이나 라벨이 아니라 input wrap을 배치 기준으로 삼는다.
직접 의존성은 IconButton, 정보 아이콘용 Icon, 보조 설명용 Tooltip이다.

## 브라우저 제약 검증 피드백

| 공개 계약                          | 역할                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `nativeValidationMessage?: string` | native 제약 오류의 locale별 안내. 생략하거나 공백이면 제약 종류별 기본 문구를 사용한다.                   |
| `errorText?: string`               | page가 소유하는 업무·서버 검증 결과. native 오류보다 먼저 표시한다.                                       |
| HTML 제약 prop                     | `type`, `required`, `pattern`, `minLength`, `maxLength`, `min`, `max`, `step` 등은 실제 input에 전달한다. |
| native 이벤트                      | 호출자의 `onInvalid`와 `onChange`는 보존한다. `onInvalid`에서는 브라우저 말풍선을 막은 뒤 호출한다.       |

이 확장은 `InputField`에만 적용한다. form의 `noValidate`를 변경하거나 URL을 HTTP/HTTPS 전용 정규식으로
재정의하지 않는다. 유효 여부는 실제 input의 `ValidityState`를 사용하며 업무 규칙과 API validation은
호출자가 계속 소유한다. 오류는 새로운 overlay가 아니라 기존 Help/Error 영역에 표시한다.
