# Create Page

> **미채택 JDC 관찰 자료**: 아래 색·치수·도메인·경로는 원본 관찰 시점의 근거입니다. 솔루션 공통 기본값으로 적용하지 않습니다.

> Design System: Aifrica Design System
> 적용 범위: 새 리소스·연결 정보·공급자별 설정을 등록하는 모든 페이지
> 최종 갱신: 2026-09-14

등록 페이지는 새 리소스의 입력값, validation, 등록 확인, 서버 오류와 민감한 1회성 결과를
안전하게 처리하는 form page 규칙이다. 이 문서와 링크된 공용 컴포넌트 계약만으로 새 React
프로젝트에서도 같은 화면·상태·접근성을 재현할 수 있어야 한다.

편집 페이지의 original/draft와 달리 create 입력값은 처음부터 page-owned form state다. 등록 전
confirmation은 유지하되, 생성 성공 뒤에는 두 번째 선택 dialog를 열지 않고 생성된 상세 화면으로
즉시 이동한다. API가 안정적인 생성 식별자를 반환하지 않는 흐름만 목록 화면으로 이동한다.

---

## 1. 의존 컴포넌트

| 컴포넌트                                                                                                                                    | 역할                                       | Create Page 조합 규칙                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| [Page Header](../../../../docs/frontend/design/components/PageHeader/README.md)                                                                                           | 뒤로가기, 제목, 설명, 상단 action          | back은 목록으로 돌아가는 page intent를 호출한다. 생성 화면은 `borderBottom={false}`로 두고 page shell이 스크롤 경계를 표시한다. |
| [Scrollbar & ScrollArea](../../../../docs/frontend/design/components/Scrollbar/README.md)                                                                                 | page 내부 수직 스크롤과 우측 overlay thumb | page 폭 전체를 소유한다. parent는 `onScrollMetricsChange`로 border 상태만 읽으며 DOM 구조를 조회하지 않는다.                    |
| [Detail Field](../../../../docs/frontend/design/components/DetailField/README.md) / [Input](../../../../docs/frontend/design/components/Input/README.md) / [Textarea](../../../../docs/frontend/design/components/Textarea/README.md) | label, 입력, help/error                    | field는 controlled이며 create variant와 required/error semantics를 연결한다.                                                    |
| [Number Input](../../../../docs/frontend/design/components/NumberInput/README.md)                                                                                         | port·수량·기간 등 숫자 입력                | 일반 Input의 `type="number"` 대체다. blank draft는 `textValue`로 보존한다.                                                      |
| [Input List Field](../../../../docs/frontend/design/components/InputListField/README.md)                                                                                  | 반복 문자열·주소 목록                      | add/remove와 항목별 오류는 controlled list로 연결한다.                                                                          |
| [Dropdown](../../../../docs/frontend/design/components/Dropdown/README.md) / [Select](../../../../docs/frontend/design/components/Select/README.md)                                                     | enum·관계·공급자 선택                      | 선택값은 page가 domain 값으로 변환한다. form grid 안에서는 해당 column 폭을 100% 사용한다.                                      |
| [Switch](../../../../docs/frontend/design/components/Switch/README.md)                                                                                                    | boolean 입력                               | label은 위, control row는 아래다. label과 switch를 한 행의 양끝에 두지 않는다.                                                  |
| [Button](../../../../docs/frontend/design/components/Button/README.md)                                                                                                    | 취소·생성·재시도                           | form 하단 우측에 tertiary → primary 순서로 둔다. submit action은 실제 `type="submit"`이다.                                      |
| [Notification](../../../../docs/frontend/design/components/Notification/README.md)                                                                                        | metadata/submit 오류                       | 오류 원인을 사용자가 조치할 수 있는 문구로 바꾸고 retry를 가까이 둔다.                                                          |
| `EditConfirmationDialog`                                                                                                                    | 취소·생성의 최종 확인                      | validation 성공 뒤에만 save confirmation을 열고, dismiss는 confirm으로 취급하지 않는다.                                         |
| [Dialog](../../../../docs/frontend/design/components/Dialog/README.md)                                                                                                    | 생성 성공과 1회성 민감 결과                | success result가 open state의 단일 진실이며, 닫기 후에만 목적지로 이동한다.                                                     |

페이지는 위 컴포넌트의 hover, focus, keyboard, portal, scrollbar thumb, loading skeleton을
재구현하지 않는다. page의 책임은 **shell geometry, form state, query/mutation, route intent,
공용 컴포넌트 조립**으로 제한한다.

---

## 2. 화면 구조와 scroll shell

### 2.1 Anatomy

```text
CreatePage
├─ pageRoot                         (application shell 안의 고정 높이 영역)
│  └─ columnContainer
│     ├─ headerArea                 (스크롤하지 않음, border transition owner)
│     │  └─ headerContent 1120px
│     │     └─ PageHeader            (Back · title · description · optional action)
│     └─ contentViewport             (남은 높이)
│        └─ ScrollArea               (page 폭 전체, 우측 끝 overlay thumb)
│           └─ scrollContent 1120px  (24px inset)
│              └─ form 1072px
│                 ├─ metadata/error Notification (optional)
│                 ├─ FormSection Card one or more
│                 │  ├─ section heading / description (optional)
│                 │  └─ one-column 또는 two-column field grid
│                 └─ actions [취소] [생성]
└─ confirmation Dialog / one-time result Dialog      (portal, latter is exceptional)
```

수직 스크롤의 소유자는 **반드시 하나**다. 이 패턴에서는 `ScrollArea`가 소유한다. form이나
card에 별도 `overflow-y: auto`를 주지 않는다. 따라서 thumb는 content column의 오른쪽이 아니라
application content 영역의 우측 끝에 overlay로 표시되며, form의 좌우 여백을 침범하지 않는다.

### 2.2 고정 geometry

| 요소            | Desktop                                                                                     | `≤899px`             | 규칙                                                                           |
| --------------- | ------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------ |
| pageRoot        | `width/height: 100%`, `min-width/min-height: 0`                                             | 동일                 | 앱 shell 안에서 `overflow: hidden`으로 내부 scroll owner를 보호한다.           |
| columnContainer | `display: flex; flex-direction: column; height: 100%; min-height: 0`                        | 동일                 | header는 고정, viewport만 축소 가능해야 한다.                                  |
| headerContent   | `width: 100%; max-width: 1120px; margin: 0 auto`                                            | 동일                 | PageHeader의 자체 24px/16px padding과 결합해 실제 제목 시작선이 form과 맞는다. |
| ScrollArea      | `width/height: 100%`, border/radius 없음                                                    | 동일                 | page shell 표면을 사용하고 vertical `thumbWidth={6}`을 권장한다.               |
| scrollContent   | `width: 100%; max-width: 1120px; min-height: 100%; margin: 0 auto; padding: 24px 24px 40px` | `padding: 24px 16px` | Header 다음 첫 업무 영역은 정확히 24px 아래에서 시작한다.                      |
| form            | `width: 100%; max-width: 1072px; margin: 0 auto`                                            | 동일                 | Header title·form card·actions의 시작선이 같다.                                |
| card            | 1px semantic border, radius 8px, surface                                                    | 동일                 | card 내부 padding은 24px, 좁은 화면에서는 20px이다.                            |
| form/action gap | section 사이 24px, actions 위 8px, action 사이 8px                                          | 동일                 | actions는 우측 정렬한다.                                                       |

`headerContent 1120px - PageHeader horizontal padding 24px × 2 = form 1072px`의 관계를 유지한다.
Header의 내부 padding을 page CSS로 덮어써 맞추지 않는다. 이는 mobile에서 PageHeader가 16px
padding으로 전환될 때도 같은 기준선을 유지하기 위한 계약이다.

### 2.3 Header scroll boundary

생성 form이 위로 스크롤되면 header 하단에 `--border-default` 1px 선이 나타난다. 최상단에서는
같은 1px 공간을 투명 border로 보존한다. 그러므로 scroll 시작·복귀 때 header 높이와 form 위치가
1px씩 흔들리지 않는다.

```tsx
const [hasScrolledContent, setHasScrolledContent] = useState(false);

const handleScrollMetricsChange = useCallback(
  ({ scrollTop }: ScrollAreaScrollMetrics) => {
    const next = scrollTop > 0;
    setHasScrolledContent((current) => (current === next ? current : next));
  },
  [],
);

return (
  <main className={styles.pageRoot}>
    <div className={styles.columnContainer}>
      <div
        className={styles.headerArea}
        data-scrolled={hasScrolledContent || undefined}
      >
        <div className={styles.headerContent}>
          <PageHeader
            title="리소스 생성"
            description="새 리소스의 접속 정보와 설정을 등록합니다."
            borderBottom={false}
            onBackClick={requestLeave}
          />
        </div>
      </div>
      <div className={styles.contentViewport}>
        <ScrollArea
          className={styles.scrollArea}
          contentClassName={styles.scrollContent}
          type="auto"
          thumbWidth={6}
          onScrollMetricsChange={handleScrollMetricsChange}
        >
          <form className={styles.form}>{/* section · actions */}</form>
        </ScrollArea>
      </div>
    </div>
  </main>
);
```

```ts
export const headerArea = style({
  boxSizing: "border-box",
  width: "100%",
  flex: "0 0 auto",
  borderBottom: "1px solid transparent",
  transition: "border-color .2s ease",
  selectors: {
    '&[data-scrolled="true"]': { borderBottomColor: "var(--border-default)" },
  },
});
```

- `scrollTop > 0` 여부는 **presentation state**일 뿐 query, draft, payload에 저장하지 않는다.
- `onScrollMetricsChange`는 최초 렌더, scroll, resize를 모두 전달하므로 `ref.current.scrollTop`를
  직접 읽는 effect나 document scroll listener를 추가하지 않는다.
- `transition: all`을 사용하지 않는다. border-color만 0.2초 전환해 깜빡임과 layout animation을 막는다.
- tabs가 없는 Create Header의 divider는 `headerArea`가 소유한다. PageHeader의 `borderBottom`과
  동시에 켜 중복 2px 선을 만들지 않는다.

### 2.4 Form column 선택

입력 field를 viewport 폭만 보고 자동으로 열 수를 바꾸지 않는다. 업무의 읽기·입력 순서에 따라
아래 둘 중 하나를 명시적으로 선택한다.

| 형식              | 사용 시점                                         | Desktop                                                    | 좁은 화면       |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------- | --------------- |
| 단일 열           | 짧은 생성 form, field 간 선후 관계가 강함         | field 열 최대 520px                                        | 100%            |
| 2열 configuration | 연결 정보, 공급자 설정처럼 독립 field 쌍이 반복됨 | `repeat(2, minmax(0, 1fr))`, row gap 24px, column gap 48px | 한 열, gap 20px |

설명, 다중 행 입력, 동적 속성 묶음, 행동 버튼은 `grid-column: 1 / -1`으로 전체 폭을 사용한다.
2열을 선택했어도 각 field wrapper와 Dropdown/Input은 `width: 100%; min-width: 0`이어야 긴 값이
grid를 밀어내지 않는다.

---

## 3. Form section과 입력 배치

```text
FormSection Card
├─ sectionHeading (선택)
│  ├─ h2 16px / 24px
│  └─ description 13px / 20px, heading과 4px gap
└─ fields
   ├─ Field = label → control → help/error
   ├─ Field = label → control → help/error
   └─ wideField = label → textarea / dynamic properties
```

- 서로 다른 업무 경계가 있을 때만 section을 나눈다. 단순히 여백을 만들기 위해 card를 중첩하지 않는다.
- section heading이 있으면 card 위쪽 `20px 24px`, fields와 구분선 후 `24px` padding을 쓴다.
- heading 없는 section은 card 내부 전체 `24px` padding으로 시작한다.
- label은 control 위에 둔다. label과 control의 수평 배치로 value 영역을 줄이지 않는다.
- switch/boolean field는 `label → 4px gap → min-height: 32px control row` 순서다. control row는
  `align-items: center`로 두어 switch가 label 쪽으로 떠 보이지 않게 한다.
- Select, Multi Select, Textarea, InputList는 grid cell 폭을 채운다. option overlay의 폭을 외부 field의
  고정 폭으로 제한하지 않는다.
- field의 기본 세로 흐름은 `label → 4px → control → 4px → help/error`다. 이름 입력과 중복 확인처럼
  control이 여러 개 묶인 경우에도 help text는 개별 Input이 아니라 **control row 전체 아래 4px**에 둔다.
  margin을 field 종류마다 임의로 추가하지 않는다.

### 3.1 control row와 연관 field 배치

- `Input + 중복 확인 Button`, `read-only file name + 파일 선택 Button`은 한 control row다. row는
  `display: flex; align-items: center; gap: 8px; min-width: 0`이고 주 control만 `flex: 1 1 0`이다.
- 한 field가 desktop form 폭의 절반이어야 하면 2열 grid의 **한 cell**을 사용한다. field 안에 임의
  `width: 50%`를 중첩해 절반보다 작게 만들지 않는다.
- 서로 종속된 짧은 field 쌍은 같은 grid row에서 왼쪽→오른쪽 순서로 둔다. 예를 들어 상위 위치
  선택 뒤 하위 위치를 고르는 경우 첫 cell은 상위, 둘째 cell은 하위다. 하위 field만 전체 행으로
  떨어뜨리지 않는다.
- 두 field의 help text 길이가 달라도 다음 row의 시작선은 grid row의 가장 큰 높이 뒤에 놓인다.

### 3.2 공급자·스키마 기반 동적 필드

생성 대상이 공급자, resource kind, 배포 모델 같은 선택에 따라 입력 스키마를 바꾸는 경우가 있다.
이때도 page는 form state owner이고 field markup은 presentation-only다.

1. page가 선택 후보 metadata query와 선택된 schema를 소유한다.
2. 선택을 바꾸면 그 선택에 종속된 option 값을 새 schema의 default로 명시적으로 전환한다.
3. 새 schema에 없는 field error도 함께 제거한다. 다른 기본 입력값은 도메인 정책이 허용할 때만 보존한다.
4. metadata 초기 loading 동안 header/form shell 높이를 없애지 않는다. disabled control 또는 skeleton으로
   같은 geometry를 유지한다.
5. metadata 실패는 공용 NotificationToast로 알리고 retry action은 section에 남긴다. raw API 오류를 노출하지 않는다.
6. schema가 준비되지 않았으면 submit은 disabled하고, 준비 뒤에만 정상 validation을 실행한다.

동적 field component에는 `values`, `errors`, `disabled`, `onChange`만 전달한다. API request,
navigation, confirmation state를 markup component가 직접 소유하지 않는다.

---

## 4. 상태 소유권

구현에서 form draft·field error·metadata query·mutation·confirmation처럼 이름 있는 create workflow
타입은 create page의 `type/{resource}.{purpose}.t.ts`에 둔다. create와 detail이 같은 의미로 공유하는
form draft처럼 검증된 page 계약만 menu `shared/type`으로 올린다. API DTO·domain model은 domain
adapter가 계속 소유하고, 컴포넌트 공개 Props는 해당 `.tsx`에 둔다.

```ts
type CreateState<TValues, TErrors> = {
  values: TValues;
  initialValues: TValues;
  errors: TErrors;
  submitError?: string;
  submitting: boolean;
  confirmationAction?: "save" | "cancel";
  hasScrolledContent: boolean;
};
```

| 상태                     | 소유자                         | 규칙                                                                                                    |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| reference/metadata query | CreatePage 또는 page 전용 hook | 후보·schema 요청, loading/error/retry를 소유한다. query 결과를 form state로 무분별하게 복제하지 않는다. |
| values / initialValues   | CreatePage                     | controlled field의 단일 진실이다. `initialValues`는 discard guard와 changed 비교에 사용한다.            |
| errors                   | CreatePage                     | 변경한 field의 오류만 제거한다. validation 오류와 allowlist된 server field 오류를 함께 표현한다.        |
| submitError              | CreatePage                     | 새 입력 또는 재제출 시작 시 제거한다. field에 특정할 수 없는 실패만 둔다.                               |
| submitting               | CreatePage                     | mutation 시작~종료 동안 action, dialog dismiss, 중복 navigation을 제어한다.                             |
| confirmationAction       | CreatePage                     | `save`/`cancel` 의도만 보관한다. backdrop/Escape close는 `undefined`로 되돌린다.                        |
| hasScrolledContent       | CreatePage                     | header divider용 local presentation state다. `ScrollArea` metric에서만 갱신한다.                        |

`changed`는 별도 mutable state가 아니라 `initialValues`와 정규화된 현재 values 비교에서 파생한다.
form markup은 API, route, dialog state를 import하지 않고 controlled prop/callback만 받는다.

---

## 5. 입력·validation·request pipeline

### 5.1 field 선택

- 일반 문자열: `DetailInputField size="medium" variant="create"` 또는 공용 Input을 사용한다.
  Create form의 일반 Input·Select·Number Input 높이는 32px로 통일한다.
- 긴 설명, PEM, secret 등 여러 줄 값: 공용 Textarea를 사용한다. secret 입력의 변경 효과는 help text로
  명시하고, 읽기 화면의 masked 값과 새 secret 입력값을 같은 상태로 합치지 않는다.
- enum/관계 선택: Dropdown/Select에 create variant와 field error를 연결한다.
- 숫자 값: Number Input을 사용한다. 일반 Input에 `type="number"`만 전달해 browser spinner와 서로 다른
  keyboard/invalid UI를 만들지 않는다. API number 변환은 request 직전에 한다.
- boolean: 공용 Switch를 사용한다. API가 boolean 문자열을 요구하더라도 UI state에는 boolean을 보관하고
  request 직전에 API 계약에 맞춰 변환한다.
- required marker는 보이는 `*`와 HTML `required` semantics를 함께 제공한다. placeholder는 label 대체가 아니다.
- optional field에는 `(선택사항)` 또는 적절한 예시를 표시한다. help text에는 형식, 보안, 되돌릴 수 없는
  영향처럼 입력 전에 알아야 할 규칙만 둔다.

### 5.2 Select와 dependent option

1. create/detail form의 Select는 field wrapper와 trigger 모두 `width: 100%; min-width: 0`으로 grid cell을
   채운다. 공용 Select의 standalone 320px 기본 폭이 page grid에서 field 폭을 제한하게 두지 않는다.
2. option viewport에는 `maxVisibleOptions={6}`을 전달한다. 0~6개면 실제 option 높이, 7개 이상이면
   6행 높이와 공용 ScrollArea thumb를 사용한다.
3. 선택된 값은 현재 option의 localized label로 trigger에 표시한다. translation key, API enum, provider
   internal key를 placeholder나 선택값 fallback으로 노출하지 않는다.
4. option label·description·loading·empty·error·accessible name을 같은 locale source에서 만든다.
   description은 핵심 용도/영향 한 문장으로 줄이고 field 폭에서 자연스럽게 wrap한다.
5. 상위 선택 전 또는 후보가 0개라 실제 선택이 불가능하면 하위 Select를 disabled하고 help text에
   `먼저 …을 선택해 주세요` 또는 `선택 가능한 …이 없습니다`를 표시한다. 클릭해 option box는 열리지
   않는데 chevron만 회전하는 상태는 허용하지 않는다.

### 5.3 file·credential 조건부 입력

- native file input의 `File` 객체는 uncontrolled source로 유지하고 선택 결과만 page state에 둔다.
- 파일명이 곧 제출 이름이면 별도의 editable 이름 field를 만들지 않는다. 선택된 파일명을 read-only
  control에 표시하고 `파일 선택` Button을 같은 row에 둔다.
- 업무상 별도 표시 이름이 정말 필요한 경우에만 독립 field로 제공하고, 파일명과 다른 값임을 label/help로
  설명한다.
- 연결된 리소스에서 가져오는 Select가 비었으면 disabled + empty reason을 제공한다.
- 새 credential 이름의 중복 확인은 trim한 값이 형식 validation을 통과하고 마지막 확인 값과 달라졌을
  때 enabled한다. 확인 성공 뒤 이름이 바뀌면 검증 결과를 무효화한다.
- private key/secret 원문 입력이 API 계약상 필요한 흐름에만 Textarea 또는 secure upload를 표시한다.
  서버가 생성해 success 결과로만 반환하는 흐름이면 빈 입력란을 임의로 추가하지 않는다.

### 5.4 상태 전이

```text
field change
  └─ values update + 해당 field error clear + submitError clear

submit button / Enter
  └─ validate
       ├─ invalid: form 유지 + 첫 invalid field focus
       └─ valid: save confirmation open

confirmation save
  └─ validate again → normalize payload → submitting=true → API request
       ├─ success: 생성 ID 있음 → 상세 route로 replace 이동
       │           생성 ID 없음 → 목록 route로 replace 이동
       └─ failure: field errors 또는 submitError → values 보존
```

### 5.5 validation과 normalization

1. validation은 UI values를 유지한 채 `trim()`한 값으로 판단한다.
2. Enter submit과 confirm submit은 모두 같은 `validate()`를 호출한다.
3. API 직전, optional blank string은 `undefined`로, Select의 UI string은 domain enum/boolean/number로,
   list는 trim 뒤 빈값 제거로 변환한다.
4. server field error는 allowlist된 form key에만 map한다. 중복 이름처럼 명확한 오류는 해당 field에 둔다.
5. field를 특정할 수 없는 network/permission/conflict 오류는 사용자 조치가 가능한 `submitError`로
   바꿔 공용 NotificationToast로 알린다. raw HTTP message, stack, secret은 화면·toast·log에 노출하지 않는다.
6. 실패해도 values, schema selection, dirty guard를 초기화하지 않는다.

---

## 6. 취소·생성 confirmation과 성공 이동

| action             | dialog 내용                                            | confirm 결과                                        |
| ------------------ | ------------------------------------------------------ | --------------------------------------------------- |
| Header back / 취소 | 저장하지 않은 입력이 초기화되고 목록으로 이동함을 명시 | 목록 route로 이동                                   |
| 생성               | 생성 대상과 보안·운영 영향을 두 줄 이내로 설명         | API submit 시작                                     |
| 생성 성공          | 일반 성공 dialog를 표시하지 않음                       | 생성 ID가 있으면 상세, 없으면 목록으로 replace 이동 |

- 값이 변경되지 않았으면 Header back/취소는 즉시 목록으로 이동할 수 있다. 변경되었으면 둘 다 같은
  discard confirmation을 사용한다.
- browser 새로고침·탭 닫기는 dirty 상태에서 `beforeunload`의 browser 기본 guard를 쓴다. custom 문구를
  보장하지 않는다.
- `submitting` 중 Button은 disabled, dialog dismiss와 route 이동은 무시한다. 실패한 뒤에는 다시 편집할 수 있다.
- confirmation의 안전 action은 `계속하기`, 이탈 action은 `나가기`처럼 행위를 명확히 적는다.
- password, key, secret처럼 다시 조회할 수 없는 값이 생성 응답에만 존재하는 예외에서는 그 값을
  안전하게 전달할 별도 1회성 결과 화면을 사용한다. 일반 성공 선택 dialog로 목록/상세 이동을 다시
  묻지 않으며, 값 자체를 URL·local storage·toast에 쓰지 않는다.

---

## 7. 접근성·반응형·loading

### 접근성

- 실제 `<form onSubmit>`을 쓰고 primary action은 `type="submit"`이다.
- 모든 control은 보이는 `<label>`과 연결되며, 오류 field는 `aria-invalid`와 error text 관계를 가진다.
- form-level error는 `role="alert"`를 사용한다. empty metadata는 error alert로 오용하지 않는다.
- Back, retry, copy 등 아이콘만 있는 action은 Tooltip과 aria-label을 제공한다.
- success/confirmation dialog의 backdrop/Escape는 확인 action이 아니며, focus는 안전한 dismiss action으로
  시작한다.

### 반응형

- `≤899px`에서는 header와 scroll content의 좌우 inset만 24px에서 16px로 줄인다.
- single-column form은 100%를 유지한다. two-column configuration grid는 한 열로 전환하고 gap을 20px로 줄인다.
- header action은 공용 PageHeader가 실제 intrinsic width를 기준으로 다음 행에 배치한다. page가 임의의
  breakpoint로 action을 숨기거나 축소하지 않는다.
- 긴 label, secret, URL, option value는 `min-width: 0`, line wrap/overflow rules로 card 밖을 밀지 않는다.

### loading

- header data가 필요한 초기 loading에는 PageHeader `isLoading`을 사용한다. 공용 skeleton은 normal title,
  chip, detail, description과 같은 높이를 유지하므로 header가 수축하지 않는다.
- metadata 초기 loading은 form shell·card·actions를 제거하지 않는다. field를 disabled하거나 같은 geometry의
  placeholder를 두어 content jump를 막는다.
- 생성 mutation은 화면 전체 skeleton으로 바꾸지 않는다. 현재 values를 유지하고 submit action과 dialog
  dismiss만 disabled로 바꾼다.

---

## 8. 독립 조립 예시

아래 예시는 page shell과 상태 경계를 보이는 최소 조립이다. 실제 domain validation, API client,
route adapter는 프로젝트의 계약으로 대체한다.

```tsx
type Values = { name: string; enabled: boolean; description: string };
type Errors = Partial<Record<keyof Values, string>>;

const INITIAL_VALUES: Values = { name: "", enabled: true, description: "" };

function ResourceCreatePage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "save" | "cancel"
  >();
  const [hasScrolledContent, setHasScrolledContent] = useState(false);

  const changed =
    values.name !== INITIAL_VALUES.name ||
    values.enabled !== INITIAL_VALUES.enabled ||
    values.description !== INITIAL_VALUES.description;

  const onScrollMetricsChange = useCallback(
    ({ scrollTop }: ScrollAreaScrollMetrics) => {
      const next = scrollTop > 0;
      setHasScrolledContent((current) => (current === next ? current : next));
    },
    [],
  );

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError(undefined);
  }

  function requestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setConfirmationAction("save");
  }

  function requestLeave() {
    if (submitting) return;
    if (changed) setConfirmationAction("cancel");
    else navigateToList();
  }

  return (
    <main className={styles.pageRoot} aria-busy={submitting || undefined}>
      <div className={styles.columnContainer}>
        <div
          className={styles.headerArea}
          data-scrolled={hasScrolledContent || undefined}
        >
          <div className={styles.headerContent}>
            <PageHeader
              title="리소스 생성"
              description="새 리소스의 정보를 등록합니다."
              borderBottom={false}
              onBackClick={requestLeave}
            />
          </div>
        </div>
        <div className={styles.contentViewport}>
          <ScrollArea
            className={styles.scrollArea}
            contentClassName={styles.scrollContent}
            type="auto"
            thumbWidth={6}
            onScrollMetricsChange={onScrollMetricsChange}
          >
            <form className={styles.form} noValidate onSubmit={requestSubmit}>
              {submitError ? (
                <NotificationToast
                  state="error"
                  role="alert"
                  message={submitError}
                />
              ) : null}
              <section
                className={styles.sectionCard}
                aria-labelledby="basic-information-title"
              >
                <div className={styles.sectionHeading}>
                  <h2 id="basic-information-title">기본 정보</h2>
                  <p>리소스를 식별하고 관리할 정보를 입력해 주세요.</p>
                </div>
                <div className={styles.formGrid}>
                  <DetailInputField
                    label="이름"
                    required
                    size="medium"
                    variant="create"
                    value={values.name}
                    invalid={Boolean(errors.name)}
                    errorText={errors.name}
                    onValueChange={(value) => update("name", value)}
                  />
                  <div className={styles.switchField}>
                    <span className={styles.fieldLabel}>사용 여부</span>
                    <div className={styles.switchControlRow}>
                      <Switch
                        checked={values.enabled}
                        onCheckedChange={(value) => update("enabled", value)}
                      />
                    </div>
                  </div>
                  <div className={styles.wideField}>
                    <Textarea
                      label="설명"
                      value={values.description}
                      onValueChange={(value) => update("description", value)}
                    />
                  </div>
                </div>
              </section>
              <div className={styles.formActions}>
                <Button
                  type="button"
                  size="medium"
                  variant="tertiary"
                  disabled={submitting}
                  onClick={requestLeave}
                >
                  취소
                </Button>
                <Button type="submit" size="medium" disabled={submitting}>
                  {submitting ? "생성 중" : "생성"}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </div>
      </div>
      <EditConfirmationDialog
        action={confirmationAction}
        onConfirm={confirm}
        onOpenChange={handleDialogOpen}
      />
    </main>
  );
}
```

---

## 9. 검증 체크리스트

### Geometry·scroll

- [ ] Header title, form card, actions의 business content 시작선이 desktop 1072px 열에 맞는가?
- [ ] Header outer/content 및 ScrollArea content는 1120px이며, PageHeader 자체 padding을 덮어쓰지 않는가?
- [ ] form만 scroll되고 Header는 고정되는가? thumb가 page 우측 끝에 overlay로 표시되는가?
- [ ] scrollTop `0`에서는 투명 1px border 공간을 유지하고, `>0`에서는 `--border-default`가 0.2초로 전환되는가?
- [ ] header divider와 PageHeader border를 동시에 켜 2px 선이 생기지 않는가?
- [ ] `≤899px`에서 16px inset, 2열→1열, card 20px padding이 적용되고 가로 overflow가 없는가?

### Form·state

- [ ] 모든 field가 controlled이며, 바꾼 field의 error만 제거되는가?
- [ ] field help/error가 control 또는 control row 아래 정확히 4px이고 서로 겹치거나 붙지 않는가?
- [ ] 2열 grid의 field·Input·Select가 cell 전체 폭을 쓰며, 종속된 field 쌍이 같은 행에 배치되는가?
- [ ] 숫자 field가 일반 Input `type="number"`가 아니라 Number Input이고 blank draft도 안전하게 유지되는가?
- [ ] Select는 localized selected label을 표시하고 최대 6개 option 이후 내부 scroll되며, 후보가 없을 때
      disabled와 이유를 함께 제공하는가?
- [ ] option label/description/empty/loading/error와 accessible name에 translation key/API enum이 노출되지 않는가?
- [ ] file 선택 흐름이 불필요한 editable 파일명 입력을 요구하지 않고, credential 중복 확인의 enabled·무효화 조건이 맞는가?
- [ ] large Switch가 label 아래 최소 32px control row에서 수직 중앙 정렬되는가?
- [ ] dynamic schema/metadata가 바뀔 때 종속 values·errors가 의도적으로 초기화되는가?
- [ ] metadata loading/error/retry가 shell geometry를 없애거나 submit 가능 상태를 잘못 만들지 않는가?
- [ ] Enter submit, required/optional label, help/error, invalid style이 동작하는가?
- [ ] trim, empty optional 제거, UI string→domain type 변환이 API 직전에 수행되는가?
- [ ] invalid submit은 confirmation을 열지 않고 첫 invalid field에 focus하는가?
- [ ] server field error, duplicate error, form error가 올바른 위치에 남고 values가 보존되는가?

### Safety·accessibility

- [ ] dirty 상태에서 Header back, 취소, 내부 이동은 같은 discard confirmation을 여는가?
- [ ] confirmation 버튼 문구와 문장 줄바꿈이 action을 명확히 설명하는가?
- [ ] submitting 중 중복 submit, dialog dismiss, 목록 이동이 차단되는가?
- [ ] 성공 뒤 두 번째 선택 dialog 없이 생성 상세로 replace 이동하며, ID가 없는 API만 목록으로 이동하는가?
- [ ] 다시 조회할 수 없는 민감 결과가 있다면 일반 성공 dialog와 분리된 1회성 결과 화면에서만 표시되는가?
- [ ] icon-only action의 aria-label/Tooltip, dialog focus, keyboard submit이 검증되었는가?
- [ ] light/dark token, focus ring, disabled/error state, normal/loading header 높이를 함께 비교했는가?

---

## 10. 재현 잠금 계약

- **Geometry 소유자:** CreatePage는 fixed header, page ScrollArea, 1120px outer column, 1072px form
  column, 24px/16px inset, section/action gap을 소유한다. leaf field와 PageHeader의 내부 geometry는
  덮어쓰지 않는다.
- **Scroll 소유자:** page에는 하나의 vertical ScrollArea만 둔다. header divider는 metric callback의
  `scrollTop > 0`으로만 제어하며 transparent border 공간을 항상 유지한다.
- **State 소유자:** query/metadata, form values, validation, mutation, dirty guard, dialog intent,
  success result, scroll presentation state는 page가 소유한다. markup은 controlled props/callback만 받는다.
- **Security:** secret/password/key와 raw server 오류는 persistence, URL, toast, generic log에 남기지 않는다.
- **Field contract:** field는 label/control/help 4px rhythm, page grid에서는 control 100% 폭, 일반
  Input·Select·Number Input은 `size="medium"` 32px create variant, form Select는 최대 6행 option viewport,
  numeric input은 Number Input, boolean은 large centered Switch를 사용한다.
- **Content contract:** option·description·empty/error와 accessible copy는 locale source에서 해석하며 i18n/API
  key를 사용자 UI에 노출하지 않는다.
- **Responsive:** desktop에서 선택한 form column 구성을 좁은 화면에서 의미가 보존되는 한 열로 바꾼다.
  action을 숨기거나 page nested scroll을 추가하지 않는다.
- **기준 상태:** metadata loading/ready/error, blank/filled/invalid, server error, save/cancel confirmation,
  submitting, success/no-secret success, scroll top/scrolled, light/dark, desktop/mobile을 모두 검증한다.

### 어플리케이션 등록 적용 사례

- 구현: `src/pages/software/application/create/ApplicationCreatePage.tsx`.
- 기본 정보는 2열 form, 소개·설명은 전체 폭이며 별칭은 중복 확인 후 등록한다.
- 설명 다음 줄에 아이콘을 두며 왼쪽 절반에 파일 선택, 오른쪽 절반에 고정 높이 이미지 미리보기를 배치한다.
  미선택 시 안내 문구를 제공하며 좁은 화면에서는 세로로 배치한다.
- 실행 스크립트(Monaco·REST·MMC·Protocol Buffer·모듈), 바이너리 디렉터리/파일,
  파라미터와 실행 이벤트 참조는 같은 메뉴의 `shared/ui`를 상세 화면과 함께 사용한다.
- 등록 전에는 현재 버전의 ID가 없으므로 실행 참조에 가짜 자기 참조 행이나 ID를 만들지 않는다.
- 등록 화면은 실행 스크립트와 참조 목록 편집만 제공한다. 선택용 라디오, 읽기 전용 실행 구성·참조 이벤트
  미리보기와 해당 조회는 생략하고, 상세 화면의 미리보기 및 작성 Dialog의 코드 편집은 유지한다.
- 메타데이터 등록과 후속 파일 업로드는 상태를 분리한다. 파일 실패 시 등록 POST를 반복하지 않고
  남은 파일만 재시도한다. 업로드를 마치거나 사용자가 중단을 확인하기 전에는 이탈을 보호한다.
- API/UX 근거: old `serengeti.ui.app/.../application/detail`, new의 설치된
  `@serengeti/serengeti-app` 모듈, poc `software-api.ts`의 `POST /app/`,
  `appVersion`/선택적 `icon` multipart 및 `GET /app/checkAlias` 계약을 비교했다.
