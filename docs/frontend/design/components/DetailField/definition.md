# Detail Field 정의

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 1. 의존 컴포넌트

| 컴포넌트 | 가이드라인 | 구현 상태 | 역할 |
| --- | --- | --- | --- |
| [Input](../Input/README.md) | 있음 | 참조 계약 · 매핑 확인 필요 | `DetailInputField`의 실제 text control. Default/Create, size, read-only 상태를 소유한다. |
| `DetailItem` | 이 문서 | 참조 계약 · 매핑 확인 필요 | 읽기 전용 label/value의 `dt/dd` 또는 `p/p` 구조를 만든다. |
| `DetailInputField` | 이 문서 | 참조 계약 · 매핑 확인 필요 | label·required/optional·Input·help/error를 하나의 field로 조합한다. |
| `DetailTextField` | 이 문서 | 참조 계약 · 매핑 확인 필요 | page의 editing state에 따라 DetailItem/DetailInputField를 전환한다. |

## 2. 역할 분리와 구조

```
DetailPage <dl class="detailGrid">
├─ DetailTextField (editing=false)
│  └─ DetailItem
│     ├─ <dt> label
│     └─ <dd> value / emptyValue
└─ DetailTextField (editing=true)
   └─ DetailInputField
      ├─ <label htmlFor> label · optional / required
      ├─ Input
      └─ help text or error text
```

| 계층 | 소유하는 것 | 소유하지 않는 것 |
| --- | --- | --- |
| Page | `editing`, 원본 값, draft 값, validation error, save/cancel | field 내부 label style, input geometry |
| `DetailTextField` | 읽기/편집 renderer 선택과 value fallback | draft state나 API 요청 |
| `DetailItem` | 읽기 semantics, empty/wrap/ellipsis | form interaction |
| `DetailInputField` | label, Input, help/error 순서 | validation rule, payload normalization |

## 3. `DetailItem` 읽기 상태

### 3.1 API

```tsx
<DetailItem
  label="Client ID"
  value={resource.clientId}
  emptyValue="-"
  wrap={false}
/>

<DetailItem label="Redirect URI" wrap>
  <ul className={styles.valueList}>
    {redirectUris.map((uri) => <li key={uri}>{uri}</li>)}
  </ul>
</DetailItem>
```

`value`와 `children` 중 하나를 전달한다. 둘 다 있으면 `children`이 우선한다. 값이 `undefined`,
`null`, 빈 문자열이면 `emptyValue`를 보여 주며 기본값은 `-`이다. 숫자 `0`과 boolean rendering은
빈 값이 아니므로 그대로 표시한다.

### 3.2 semantics

기본 `presentation="definition"`은 `<dt>` label과 `<dd>` value를 만든다. 반드시 부모가 `<dl>`인
상세 정보 grid 안에서 사용한다. definition list가 아닌 문장형/패널형 문맥에서는
`presentation="text"`로 `<p>`/`<p>`를 사용한다.

`DetailItem` 한 개는 label과 value가 함께 있는 하나의 grid item이다. `dt`와 `dd`를 서로 다른
grid item으로 분리하면 mobile 1열 전환과 screen reader reading order가 깨진다.

### 3.3 layout과 typography

| 요소 | 값 |
| --- | --- |
| field root | `min-width: 0` |
| label margin/color/font | `0`, `--text-subtle`, `--text-body3` (12px/16px) |
| value top margin | `4px` |
| value color/font | `--text`, `--text-title2` (14px/20px semibold) |
| 기본 value overflow | `ellipsis`, `white-space: nowrap`, `overflow: hidden` |
| `wrap` value | `white-space: normal`, `overflow-wrap: anywhere`, ellipsis 제거 |

일반 이름, 상태, 날짜, 짧은 ID는 기본 한 줄로 둔다. URL, Redirect URI, 긴 오류 사유, list처럼
내용을 일부라도 감추면 안 되는 값만 `wrap`을 쓴다. 모든 field에 wrap을 적용하지 않는다.

## 4. `DetailInputField` 편집 상태

### 4.1 API

```tsx
<DetailInputField
  label="솔루션 이름"
  value={draft.name}
  placeholder="예: Cheetah Web Console"
  required
  error={errors.name}
  size="medium"
  variant="default"
  onValueChange={(value) => updateDraft("name", value)}
/>
```

| prop | 규칙 |
| --- | --- |
| `label` | 항상 필수. placeholder로 대체하지 않는다. |
| `value` | `undefined`/`null`/빈 문자열일 때 editable은 `""`, read-only는 `emptyValue ?? "-"`로 보인다. |
| `required` / `optional` | 동시 사용하지 않는다. `optional` 기본 false, `required` 기본 false. |
| `readOnly` | 값이 immutable이지만 edit mode의 grid 위치를 보존해야 할 때 사용한다. |
| `error` | 있을 때 help text 대신 표시하고 Input `aria-invalid`를 true로 전달한다. |
| `size` | detail edit 기본 `medium`, create form은 `large`. |
| `variant` | detail edit은 `default`, create form은 `create`. |

label은 `<label htmlFor={inputId}>`로 actual Input과 연결한다. `*`은 `--text-danger` 색의 시각
표시이며 `required` prop과 함께 써야 한다. optional text는 `(선택사항)`을 12px/16px
`--text-subtler`로 표시한다.

### 4.2 help, error, read-only

- help/error는 Input 아래 4px 간격이다. 둘 다 전달되면 **error만** 보인다.
- error는 `--text-danger` light `#e81919`, dark `#f52424`의 12px/16px이다.
- `readOnly`는 `disabled`가 아니다. 값 선택·복사와 keyboard focus는 가능하며, Input의
  read-only visual contract를 유지한다.
- form action이 pending이라 모든 변경을 차단해야 하면 page가 `submitting` 상태에 맞춰 buttons와
  dialog dismissal을 제어한다. Detail field가 자체적으로 draft를 reset하거나 API를 취소하지 않는다.

