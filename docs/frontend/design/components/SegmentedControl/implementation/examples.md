# Segmented Control — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
// Label 형
<SegmentedControl
  label="조회 기간"
  type="label"
  size="medium"
  options={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ]}
  value={period}
  onValueChange={setPeriod}
  helpText="기간 단위를 선택하세요."
/>

// Icon + Label 형 + info Tooltip
<SegmentedControl
  label="보기 모드"
  type="icon-label"
  size="small"
  infoIcon
  infoTooltip="목록 · 표 · 갤러리 보기 전환"
  options={[
    { value: 'list', label: 'List', icon: 'list' },
    { value: 'grid', label: 'Grid', icon: 'table' },
  ]}
  defaultValue="list"
/>

// Icon 형 + Full-width
<SegmentedControl
  type="icon"
  size="medium"
  fullWidth
  options={[
    { value: 'left', icon: 'arrow_left' },
    { value: 'center', icon: 'plus' },
    { value: 'right', icon: 'arrow_right' },
  ]}
  defaultValue="center"
/>
```

---

