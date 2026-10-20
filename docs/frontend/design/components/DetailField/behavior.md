# Detail Field 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 5. `DetailTextField`의 읽기/편집 전환

`DetailTextField`는 Page의 `editing` boolean만 받아 같은 위치에서 renderer를 바꾼다.

```tsx
<DetailTextField
  editing={isEditing}
  label="설명"
  value={resource.description}
  editingValue={draft?.description}
  optional
  wrap
  placeholder="리소스의 용도나 운영 정보를 입력해주세요."
  onValueChange={(value) => updateDraft("description", value)}
/>
```

`editingValue`가 `undefined`면 `value`를 fallback으로 사용한다. 따라서 edit 시작 시 draft가 아직
만들어지지 않은 중간 render에서도 uncontrolled Input이 되지 않는다. 하지만 이는 fallback일 뿐이며,
편집 가능 resource는 `beginEdit` 시점에 draft를 완전히 생성해야 한다.

immutable field는 아래처럼 `editing`을 전달하더라도 `readOnly`로 둔다. field를 숨겨 두 화면의
정보 밀도를 다르게 만들지 않는다.

```tsx
<DetailTextField editing={isEditing} label="Client ID" readOnly value={resource.clientId} />
```

