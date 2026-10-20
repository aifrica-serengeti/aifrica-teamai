# Dropdown — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
const [value, setValue] = useState<string | undefined>()

<Dropdown
  size="medium"
  label="카테고리"
  required
  placeholder="카테고리를 선택해주세요"
  helpText="콘텐츠의 카테고리를 설정합니다"
  value={value}
  onValueChange={setValue}
  options={[
    { value: 'tech', label: '기술' },
    { value: 'design', label: '디자인' },
    { value: 'business', label: '비즈니스' },
  ]}
/>
```

---

