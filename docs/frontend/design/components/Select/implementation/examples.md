# Select — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Select 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Select } from './Select'

// Single — 기본
<Select label="런타임" options={opts} defaultValue="Node.js 18" />

// Pagination처럼 짧은 numeric option은 패널만 내용 폭으로 축소
<Select contentWidth="content" options={[{ value: '12' }, { value: '24' }]} value="12" />

// Create/Detail의 긴 option 목록은 6개 행까지만 보이고 내부에서 스크롤
<Select maxVisibleOptions={6} options={vendors} />

// Dialog 안에서는 modal scroll lock 경계 안에 option layer를 유지
<Select fullWidth maxVisibleOptions={6} portalMode="dialog" options={applicationVersions} />

// Single — 검색 가능
<Select label="런타임" searchable options={opts} />

// Single — Create variant, invalid
<Select label="런타임" variant="create" invalid options={opts} helpText="필수 항목입니다." />

// Multi — 기본
<Select multiple label="런타임" options={opts} defaultValues={['Node.js 18', 'Python 3.11']} />

// Multi — 검색 가능
<Select multiple searchable label="런타임" options={opts} />

// Loading 상태 (API 호출 중)
<Select label="런타임" loading helpText="데이터를 불러오는 중입니다." />

// Error 상태 (API 호출 실패)
<Select label="런타임" error helpText="데이터 불러오기에 실패했습니다." />

// 옵션 없음
<Select label="런타임" options={[]} helpText="사용 가능한 옵션이 없습니다." />

// Controlled
<Select
  label="런타임"
  options={opts}
  value={selected}
  onValueChange={setSelected}
/>
<Select
  multiple
  label="런타임"
  options={opts}
  values={selectedValues}
  onValuesChange={setSelectedValues}
/>
```

---
