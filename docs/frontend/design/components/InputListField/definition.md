# Input List Field 정의

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 1. 의존 컴포넌트

| 컴포넌트                       | 가이드라인 | 구현 상태 | 역할                                                       |
| ------------------------------ | ---------- | --------- | ---------------------------------------------------------- |
| [Input](../Input/README.md)            | 있음       | 참조 계약 · 매핑 확인 필요    | 각 list row의 controlled input, size/variant/invalid state |
| [Icon Button](../IconButton/README.md) | 있음       | 참조 계약 · 매핑 확인 필요    | row delete action (`eliminate`)                            |
| [Button](../Button/README.md)          | 있음       | 참조 계약 · 매핑 확인 필요    | `항목 추가` tertiary action                                |
| `InputListField`               | 이 문서    | 참조 계약 · 매핑 확인 필요    | list state callback과 label/help/error arrangement         |

## 2. 구조

```
InputListField
├─ label paragraph
│  ├─ label text
│  ├─ optional text (선택사항) OR required marker *
├─ row list
│  └─ row × n
│     ├─ Input (aria-label="{label} {index + 1}")
│     └─ delete IconButton
├─ tertiary small "항목 추가" Button
└─ help text OR error text
```

## 3. controlled API와 배열 규칙

```tsx
const [redirectUris, setRedirectUris] = useState([""]);

<InputListField
  label="Redirect URI"
  placeholder="https://service.example.com/callback"
  required
  size="large"
  type="url"
  variant="create"
  values={redirectUris}
  error={errors.redirectUris}
  onValueChange={setRedirectUris}
/>;
```

`values`와 `onValueChange`는 parent가 소유한다. component는 API request, trim, URL parsing,
server error mapping을 하지 않는다.

| 사용자 action       | 다음 values                             |
| ------------------- | --------------------------------------- |
| n번째 행 수정       | 기존 배열의 같은 index만 새 값으로 교체 |
| 항목 추가           | `[...values, ""]`                       |
| 항목 삭제, n > 1    | 해당 index를 제외한 새 배열             |
| 마지막 남은 행 삭제 | 값은 유지하고 delete button disabled    |

배열은 최소 한 항목을 보장한다. 빈 문자열 한 줄은 “아직 입력하지 않음”을 의미하며 payload에는
포함하지 않는다. required validation은 UI row의 존재가 아니라 **trim 후 비어 있지 않은 값이 하나
이상인지**를 검사한다.

