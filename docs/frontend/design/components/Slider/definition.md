# Slider — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Slider 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Slider 의 입력 박스(숫자 입력)는 공용 **Input** 컴포넌트를, 핸들 위 값 표시는 공용
**Tooltip** 컴포넌트를 사용한다. 재현자는 아래 컴포넌트를 먼저 확보한 뒤 조합해야 한다.
상세 절차는 [컴포넌트 카탈로그](../index.md)의 "공용 컴포넌트 조합 규칙" 참조.

| 컴포넌트    | 가이드라인                      | 구현 상태              | 용도                                                                                                                                                                                             |
| ----------- | ------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Input**   | [`Input/README.md`](../Input/README.md) ✅     | 참조 계약 · 매핑 확인 필요 ✅ → **재사용** | Track 옆 숫자 입력 박스. `type="text"` + `inputMode="numeric"` 으로 숫자만 허용, blur 시 min/max clamp. Input 의 form semantic 토큰·상태(border/focus/disabled)·size(medium 32px) 를 그대로 상속 |
| **Tooltip** | [`Tooltip/README.md`](../Tooltip/README.md) ✅ | 참조 계약 · 매핑 확인 필요 ✅ → **재사용** | 핸들(Thumb) 위에 현재 값을 표시. inverse surface(라이트 검정/다크 흰)·화살표 포함·`variant="icon"`. hover + 드래그 + 키보드 포커스 시 표시                                                       |

> Slider 는 Input 의 외형을 **직접 재구현하지 않고** 공용 Input 을 재사용한다.
> Input 이 담당하는 부분: 입력 박스 높이(medium 32px), 가로 패딩 12px, radius 4px,
> focus/disabled 상태 전환, form semantic 토큰 참조.
>
> Tooltip 도 마찬가지로 직접 구현하지 않고 공용 Tooltip 컴포넌트를 재사용한다.
> 각 Thumb 를 `TooltipTrigger(asChild)` 로 감싸면, Radix Slider 가 Thumb 를 절대위치로
> 이동시킬 때 Tooltip 도 함께 이동한다(Track 중앙이 아닌 Thumb 바로 위에 표시).
>
> **Input/Tooltip 이 구현되어 있지 않은 경우**: 각 가이드라인 스펙으로 먼저 공용 컴포넌트를
> 만든 뒤, 그것을 조합해 Slider 를 구성한다.

---

## 3. 구조 (Anatomy)

```
Slider Field
├── Label 행 (선택) ── Label · (선택사항) · * · Info 아이콘(14×14)
├── Body 행 ── [Input(min)?] Track 영역 [Input(max)?]
│   ├── Input — Range 모드 min (선택, Range 일 때 Track 왼쪽)
│   ├── Track 영역
│   │   ├── Slider Root (Radix)
│   │   │   ├── Track (4px 회색 바)
│   │   │   │   └── Range / Fill (4px primary 색상, 선택된 구간)
│   │   │   └── Thumb(×1 또는 ×2) ── 16×16 primary 원
│   │   │       └── Tooltip ── 핸들 위 값 표시 (hover/드래그/focus 시)
│   │   └── Steps (선택) ── tick(1×4px) + 라벨(0/20/40/60/80/100)
│   └── Input ── 단일 모드: Track 오른쪽 / Range 모드: max (Track 오른쪽)
└── Help text / Error text (선택) ── Body3 12px. Error가 Help보다 우선
```

### 구성 요소

| #   | 요소                  | 필수   | 설명                                                                           |
| --- | --------------------- | ------ | ------------------------------------------------------------------------------ |
| 1   | **Label**             | 선택   | 공용 InputField와 동일한 필드 라벨. 14px SemiBold                              |
| 2   | Requirement indicator | 선택   | `(선택사항)` 또는 필수 `*`. 공용 InputField 패턴                               |
| 3   | Info icon             | 선택   | Label 옆 보조 아이콘. 14px. `infoIcon` prop으로 제어                           |
| 4   | **Track**             | 필수   | 값의 범위를 나타내는 4px 회색 바. `--border-default` (#dddddd)                 |
| 5   | **Fill / Range**      | 필수   | 선택된 구간을 채우는 4px primary 바. `--element-primary` (var(--accent-500))             |
| 6   | **Step**              | 선택   | Track 아래 tick 마커(1×4px) + 숫자 라벨. `showSteps` prop 으로 제어(기본 true) |
| 7   | **Handle (Thumb)**    | 필수   | 16×16 primary 원. 드래그하여 값 변경. Range 모드는 2개                         |
| 8   | **Tooltip**           | 조건부 | 핸들 위 현재 값 표시. hover + 드래그 + 키보드 포커스 시. 공용 Tooltip 컴포넌트 |
| 9   | **Input**             | 선택   | 숫자 입력 박스. `showInput` prop 으로 제어(기본 true). 공용 Input 컴포넌트     |
| 10  | Help / Error text     | 선택   | Slider 아래 보조 설명 또는 오류. Error text가 Help text보다 우선               |

---

## 4. 레이아웃 스펙

모든 수치는 px 단위.

### 핵심 치수

| 요소                 | 값          | 비고                                                   |
| -------------------- | ----------- | ------------------------------------------------------ |
| **Track 높이**       | 4px         | radius 2px                                             |
| **Track 너비**       | flexible    | 부모 컨테이너에 맞춰 신축                              |
| **Range/Fill 높이**  | 4px         | Track 과 동일                                          |
| **Handle(Thumb)**    | 16×16       | 원형(radius 50%). Track 세로 중앙 정렬                 |
| **Thumb hit 영역**   | Radix 기본  | Thumb 16px + Radix 포인터 캡처                         |
| **Slider Root 높이** | 16px        | Thumb(16px) 가 중앙 정렬되도록 충분한 높이             |
| **Input 박스**       | medium 32px | 공용 Input size="medium". 너비 56px(숫자 2자리 + 패딩) |
| **Info 아이콘**      | 14×14       | lucide `Info`, strokeWidth 2. `infoIcon`일 때만 표시   |

### Body 행 배치

| 모드              | 배치                                           | 간격               |
| ----------------- | ---------------------------------------------- | ------------------ |
| **단일(Default)** | `[ Track 영역 ] [ Input ]`                     | Track ↔ Input 20px |
| **범위(Range)**   | `[ Input(min) ] [ Track 영역 ] [ Input(max) ]` | 양쪽 20px          |

> Range 모드에서 Input 이 Track 양쪽에 배치된다. 단일 모드는 Track 오른쪽에 1개.

### Steps 배치

| 항목               | 값                                                                  |
| ------------------ | ------------------------------------------------------------------- |
| Tick 높이          | 4px (Track 하단)                                                    |
| Tick 너비          | 1px                                                                 |
| Tick ↔ 라벨 간격   | 4px                                                                 |
| 라벨               | 짝수 step 마다 표시 (0/20/40/60/80/100, 기본 min=0/max=100/step=10) |
| Steps ↔ Track 간격 | 6px (세로)                                                          |

### 간격 요약

| 위치                       | 값                                                              |
| -------------------------- | --------------------------------------------------------------- |
| Label 행 ↔ Body 행         | 4px (세로, 공용 InputField와 동일)                              |
| Label 행 내부              | 2px (Label · optional · required · info)                        |
| Body 행 ↔ Help/Error text  | 8px (세로). 기본 field gap 4px에 설명 영역 상단 여백 4px을 추가 |
| Track 영역 내 Root ↔ Steps | 6px (세로)                                                      |
| Body 행 내 요소 간         | 20px (가로)                                                     |

> **정렬 불변의 원칙**: Track(4px) 은 고정 높이이고 Thumb(16px) 는 절대위치로 Radix 가
> 배치한다. Thumb 의 `outline`(hover/focus ring)은 `outline-offset` 으로 표현하여
> 박스 크기에 영향을 주지 않는다(레이아웃 밀림 없음).

---


## 문구 없는 오류 상태

`invalid?: boolean`(기본 `false`)은 오류 상태만 제어한다. 실제 오류 상태는 `invalid || Boolean(errorText)`이며 검증 결과는 호출자가 소유한다.


## 사용자 지정 표시 눈금

선택적 `marks`는 각 눈금의 실제 값과 표시 라벨을 받는다. `label`을 생략하면 선만 표시한다. 호출자는 고유한 값을 제공하고 라벨이 겹치지 않는 개수를 선택한다.

## 보조 문구 배치

`helpTextPlacement`는 `below`(기본값) 또는 `label-end`를 받는다. `label-end`는 라벨 줄의 오른쪽에 기존 보조 문구를 표시한다. 라벨이 없으면 하단 표시를 유지하며 오류는 항상 하단에 표시한다. 배치와 관계없이 보조 문구는 하나만 렌더하고 thumb의 `aria-describedby` 연결을 유지한다. 페이지는 Slider 내부 태그를 선택하는 CSS 대신 이 옵션을 사용한다.
