# Dialog — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트는 다섯 개의 공용 컴포넌트를 조합하여 사용한다. 재현 시 이 컴포넌트들을
먼저 확보해야 한다.

| 의존 컴포넌트         | 용도                               | 가이드라인                   | 비고                                                                                                                                                                    |
| --------------------- | ---------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Icon Button**       | Header 우측 닫기 버튼(×)           | `IconButton/README.md`       | 2 variant(Outlined/Ghost) × 4 size. 닫기 버튼은 `variant="ghost"`, `size="xlarge"`(32×32), `icon="close"`.                                                              |
| **Button**            | Footer 액션 버튼(취소/결과)        | `Button/README.md`           | 4 variant(Primary/Secondary/Tertiary/Negative) × 4 size. Footer 버튼은 **`size="medium"`** 고정. 안전한 action은 tertiary, 일반 결과는 primary, 위험한 결과는 negative. |
| **Segmented Control** | Subheader 의 보기 전환 컨트롤      | `SegmentedControl/README.md` | 3형태 × 3사이즈 × 5상태. `type="label"`, `size="medium"`, `fullWidth`. optional — Subheader 가 없을 수 있음.                                                            |
| **Input**             | Body 내 폼 입력 필드               | `Input/README.md`            | 2 style × 4 size × 7 state. Body 콘텐츠로 사용.                                                                                                                         |
| **ScrollArea**        | Body 의 스크롤 영역(overlay thumb) | `Scrollbar/README.md`        | 4px thin overlay thumb. `type="always"`. Dialog Body 가 이 컴포넌트로 스크롤을 위임.                                                                                    |

> 닫기 버튼은 Radix `Dialog.Close asChild` 로 감싸 Icon Button 에 위임한다 — 클릭 시
> 다이얼로그가 자동으로 닫힌다.
> `DialogContent`의 선택 `closeLabel` prop으로 닫기 Icon Button의 locale별 accessible name을
> 전달하며, 생략하면 `다이얼로그 닫기`를 사용한다.
>
> **Body 안의 표:** Dialog에 Table을 조합하면 `size="small"`을 명시한다. Dialog shell은 내용에
> 맞는 크기를 선택한다. shell 크기가 Medium 이상이어도 내부 Table 크기는 Small이다.
> [공통 크기 정책](../../page-policies.md#화면별-table-크기)을 따른다.

> Footer 버튼의 `size` 는 **반드시 `medium`** 이어야 한다(Figma 스펙).

---

## 3. 구조 (Anatomy)

```
Dialog
├── Trigger (Button — 외부, 다이얼로그를 여는 버튼)
├── Scrim (반투명 검정 rgba(0,0,0,0.25))
└── Dialog 본체 (DialogContent — 중앙 정렬 카드)
    ├── Header (pt24 pb18 px24)
    │   ├── Title (Headline3, 20px SemiBold)
    │   └── Close button (Icon Button, ghost, xlarge — 우측 절대 위치)
    ├── Subheader (optional — pt12 pb16 px24)
    │   └── Segmented Control (fullWidth, medium)
    ├── Body (스크롤 영역 — ScrollArea 컴포넌트)
    │   ├── Description (Body1, 16px Regular, subtle — optional)
    │   └── 콘텐츠 (Input 필드들 등)
    │   ※ 스크롤 시:
    │     - 상단 border + 상단 fade (콘텐츠가 위에 더 있을 때)
    │     - 하단 border + 하단 fade (콘텐츠가 아래에 더 있을 때)
    └── Footer (pt24 px24 gap8)
        └── [안전한 Button(tertiary, medium)] [결과 Button(primary/negative, medium)]
```

```
┌─────────────────────────────────────────────┐
│ Header                                       │
│ Title                              [×]       │  pt24 pb18 px24
├─────────────────────────────────────────────┤
│ Subheader (optional)                         │  pt12 pb16 px24
│ [ 새로운 볼륨 생성 ][ 기존 볼륨 선택 ]        │  Segmented Control
├═════════════════════════════════════════════╡  ← border (스크롤 시)
│ Body (scroll via ScrollArea)          ▲ fade│  px24, overflow auto
│   Description 1line                    ▼ fade│
│   [볼륨 이름 입력 필드]             ║      │
│   [설명 입력 필드]                  ║thumb ║
│   [크기 입력 필드]                         │
│                                       ║      ║
├═════════════════════════════════════════════╡  ← border (스크롤 시)
│ Footer                                       │  pt24 px24 gap8
│                    [취소] [재배포하기]        │  Button medium
└─────────────────────────────────────────────┘
```

> border 와 fade 는 스크롤이 존재할 때만 나타난다. 스크롤이 없으면(콘텐츠가
> maxHeight 미만) border 도 fade 도 없다.
> `scrollFadeTone="subtle"`은 같은 16px 경계와 위치 분기를 유지하면서 fade opacity만 50%로 낮춘다.

---

## 4. 레이아웃 스펙

모든 수치는 px 단위. Figma `get_variable_defs` 검증 완료.

### Dialog 본체 — 사이즈별 치수

| 사이즈      | 너비      | 높이 정책            | 모서리 반경 | 테두리                                   |
| ----------- | --------- | -------------------- | ----------- | ---------------------------------------- |
| **Small**   | **400px** | auto (콘텐츠 맞춤)   | 8px         | `1px solid #dddddd` (`--border-default`) |
| **Medium**  | **580px** | auto ~ **max 640px** | 8px         | `1px solid #dddddd` (`--border-default`) |
| **Large**   | **720px** | auto ~ **max 640px** | 8px         | `1px solid #dddddd` (`--border-default`) |
| **X-Large** | **920px** | auto ~ **max 760px** | 8px         | `1px solid #dddddd` (`--border-default`) |

> X-Large는 표, 탐색 결과, 비교 목록처럼 넓은 본문을 담는 workflow dialog다.
> Medium/Large보다 높이 상한도 760px로 넉넉하지만 `calc(100vh - 32px)` 상하
> 여백 보호는 같은 규칙을 따른다.

> **높이 정책 핵심**: `height` 가 아닌 `maxHeight` 만 지정한다. 콘텐츠가 적으면
> auto 로 맞춰지고, 많으면 maxHeight(640px)에서 고정되어 Body 가 스크롤된다.
> Small 은 maxHeight 미지정(auto).

### Confirmation profile — 공통 너비 기준

Small은 단순 알림과 짧은 정보, 사용자의 명시적 의사결정에 충분한 **400px**을 공통으로 사용한다.
Confirmation은 같은 Small geometry 위에 action 의미와 footer 정책을 추가하는 semantic profile이다.

| 프로필        | 적용 예                                                            | 너비        | 본문 기준                                                      |
| ------------- | ------------------------------------------------------------------ | ----------- | -------------------------------------------------------------- |
| Generic Small | 완료 알림, 짧은 정보, 단일 닫기                                    | **400px**   | 명시적 결과 action이 필요 없는 짧은 정보                       |
| Confirmation  | 생성, 저장, 수락, 승인, 거절, 취소, 삭제, 권한 변경, 동기화·재실행 | **400px**   | 짧은 title + 한 줄 권장·최대 두 줄 description + footer action |
| Workflow      | 입력, 선택, 목록, 표, 긴 영향 설명                                 | Medium 이상 | 해당 content에 맞는 정식 Dialog size                           |

Confirmation은 다섯 번째 `DialogSize`가 아니라 compound component 또는 page가 소유하는 semantic
profile이다. Header/Body/Footer padding, radius, focus, portal과 400px width는 Small과 동일하게 유지하고
`max-width: calc(100vw - 32px)`보다 넓어지지 않는다. 화면마다 360px, 420px 같은 임의 너비를 만들지 않는다.

실제 구현에서는 `DialogContent size="small" profile="confirmation"`을 사용한다. `profile`의 기본값은
`default`이며, 완료 안내나 짧은 정보 Dialog에는 `confirmation`을 지정하지 않는다.

Confirmation의 `description`은 필수다. caller는 대상과 영향을 설명하는 한 문장 이상을 전달해야 한다.
비동기 닫힘 전환이나 nullable 대상 때문에 값이 빈 문자열·공백·빈 DOM wrapper가 되면 Dialog는
`작업 대상과 영향을 확인한 후 진행해 주세요.`를 표시한다. 이 fallback은 누락을 숨기는 주 문구가 아니라
전환 중 빈 안내가 노출되지 않게 하는 마지막 안전망이다.

문구가 길다는 이유만으로 confirmation 너비를 늘리지 않는다. 먼저 결과 중심으로 copy를 줄이고,
번역을 포함해 두 줄을 넘어가거나 입력·선택·목록이 필요하면 Confirmation이 아니라 Workflow Dialog로
분류한다. 일반 action은 primary, 되돌리기 어렵거나 위험한 action은 negative Button을 사용하되 너비는
같은 400px을 유지한다.

### 중앙 정렬

| 항목       | 값                                    |
| ---------- | ------------------------------------- |
| position   | `fixed`                               |
| top / left | `50%` / `50%`                         |
| transform  | `translate(-50%, -50%)`               |
| maxWidth   | `calc(100vw - 32px)` (좌우 16px 여백) |
| maxHeight  | `calc(100vh - 32px)` (상하 16px 여백) |

### Scrim

| 항목     | 값                                                 |
| -------- | -------------------------------------------------- |
| 배경     | `rgba(0, 0, 0, 0.25)` — 고정값(semantic 토큰 아님) |
| position | `fixed`, `inset: 0`                                |
| zIndex   | 40 (Dialog 본체는 50)                              |

### Header

| 항목       | 값                                                            |
| ---------- | ------------------------------------------------------------- |
| padding    | `24px 24px 18px` (pt24 pb18 px24)                             |
| position   | `relative` (close 버튼 절대 위치 기준)                        |
| 배치       | flex 행, 수직 중앙 정렬                                       |
| Close 버튼 | 우측 절대 위치: `right: 24px`, `top: 50%`, `translateY(-50%)` |

Title은 `flex: 1 1 0; min-width: 0`으로 남은 폭 안에서 줄어든다. 우측 margin 32px으로
xlarge 닫기 버튼의 hit area를 예약하고, title의 우측 padding 8px으로 텍스트와 버튼 사이를
띄운다. 긴 제목은 이 경계 안에서 한 줄 말줄임하며 닫기 버튼 아래로 흘러들지 않는다.

### Subheader (optional)

| 항목              | 값                                           |
| ----------------- | -------------------------------------------- |
| padding           | `12px 24px 16px` (pt12 pb16 px24)            |
| 배치              | flex column, 좌측 정렬                       |
| Segmented Control | `fullWidth`, `size="medium"`, `type="label"` |

### Body

| 항목        | 값                                                           |
| ----------- | ------------------------------------------------------------ |
| padding     | **좌우 24px** (상하는 0, ScrollArea content 에서 관리)       |
| flex        | `1 1 auto`, `minHeight: 0` (flex chain — 스크롤을 위해 필수) |
| overflow    | `hidden` (스크롤은 ScrollArea 가 처리)                       |
| ScrollArea  | `type="always"` (thumb 항상 표시)                            |
| content gap | `24px` (입력 필드 간 간격)                                   |
| fade tone   | `default`(100%) 또는 `subtle`(50%)                           |

> **padding 위치 핵심**: `dialogBody` 자체는 padding 없이 전체 너비를 가진다.
> 좌우 24px 패딩은 ScrollArea 의 `contentClassName` 에서 적용한다. 이렇게 해야
> border 와 스크롤 thumb 가 dialog 전체 너비(우측 끝)까지 이어진다.

### Footer

| 항목       | 값                                              |
| ---------- | ----------------------------------------------- |
| padding    | `24px` (pt24 px24)                              |
| gap        | `8px` (버튼 간)                                 |
| 배치       | flex 행, 우측 정렬(`justify-content: flex-end`) |
| flexShrink | `0` (Footer 는 줄어들지 않음)                   |

---

## 공용 알림과의 상호작용

공용 알림 viewport(`data-slot="notification-viewport"`)는 앱 root 소유다. Dialog는 해당 surface의 외부 상호작용에 한해 dismiss를 막는다. Notification을 import하거나 별도 stack을 만들지 않는다.

알림 viewport는 자체 wheel/touchmove의 전파만 관리한다. Dialog의 scroll-lock 소유권이나 공개 Props는 변경하지 않는다.
