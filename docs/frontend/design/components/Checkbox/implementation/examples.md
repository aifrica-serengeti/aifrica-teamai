# Checkbox & Checkbox Group — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
// 단일 Checkbox
<CheckboxItem
  label="마케팅 수신 동의"
  helpText="이메일 및 SMS로 수신합니다."
  defaultChecked
/>

// Checkbox Group
<CheckboxGroup
  label="기능 선택"
  options={[
    { value: 'notif', label: '알림', helpText: '푸시 및 이메일 알림' },
    { value: 'sync', label: '자동 동기화', helpText: '백그라운드 동기화' },
    { value: 'beta', label: '베타 기능', helpText: '실험 단계 기능' },
  ]}
  value={selected}
  onValueChange={setSelected}
  required
  infoIcon
  helpText="사용할 기능을 선택하세요."
/>

// 부모-자식 (Indeterminate)
const parentChecked =
  childValues.length === 0 ? false
  : childValues.length === CHILDREN.length ? true
  : 'indeterminate'

<CheckboxItem label="전체 선택" checked={parentChecked} onCheckedChange={handleParentToggle} />
<CheckboxGroup options={children} value={childValues} onValueChange={setChildValues} />
```

---

