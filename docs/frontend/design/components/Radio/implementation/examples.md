# Radio & Radio Group — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Radio & Radio Group 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
<RadioGroup
  label="배포 환경"
  options={[
    { value: "dev", label: "Development", helpText: "개발 환경" },
    { value: "stg", label: "Staging", helpText: "스테이징 환경" },
    { value: "prod", label: "Production", helpText: "운영 환경" },
  ]}
  value={value}
  onValueChange={setValue}
  alignment="vertical"
  required
  infoIcon
  helpText="배포할 환경을 선택하세요."
/>
```

### Table 행 선택 조합

```tsx
<RadioGroupRoot
  asChild
  value={selectedValue}
  onValueChange={selectRow}
  aria-label="실행 스크립트 선택"
>
  <div className="table-frame">
    <table>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              <Radio value={row.id} aria-label={`${row.name} 선택`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</RadioGroupRoot>
```

---
