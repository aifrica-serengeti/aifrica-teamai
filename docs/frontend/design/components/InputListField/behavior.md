# Input List Field 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 4. payload와 validation

```ts
const normalizedUris = values.redirectUris
  .map((value) => value.trim())
  .filter((value) => value.length > 0);

if (normalizedUris.length === 0) {
  nextErrors.redirectUris = "Redirect URI를 하나 이상 입력해주세요.";
} else if (normalizedUris.some((value) => value.includes("*"))) {
  nextErrors.redirectUris =
    "Redirect URI에는 전체 와일드카드(*)를 사용할 수 없습니다.";
}
```

- optional list도 UI에 빈 행을 유지할 수 있지만 request에는 빈 값을 보내지 않는다.
- URI와 origin의 allowed scheme/host/wildcard rule은 domain validation에 둔다. component가 URL
  policy를 임의로 가정하지 않는다.
- error는 list 전체의 오류다. 특정 index를 지목해야 하는 domain이라면 `InputListField` API를
  row-level error까지 확장하기 전 별도 설계를 한다. 임시로 모든 row에 같은 error를 찍지 않는다.
- field를 수정하면 page가 해당 field error와 `submitError`를 지운다. component가 error state를
  local로 복제하지 않는다.

