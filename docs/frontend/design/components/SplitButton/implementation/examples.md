# Split Button — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { SplitButton } from './SplitButton'
import { MenuItem } from './Menu'

// 기본 (Medium, leading icon + label)
<SplitButton
  size="medium"
  primaryIcon="check"
  primaryAriaLabel="저장"
  label="Save"
  leadingIcon="save"
  onPrimaryClick={() => handleSave()}
>
  <MenuItem onSelect={handleSaveAs}>다른 이름으로 저장</MenuItem>
  <MenuItem onSelect={handleDuplicate}>복제</MenuItem>
</SplitButton>

// leading icon 없이 (Label + chevron 만)
<SplitButton
  size="large"
  primaryIcon="external_link"
  primaryAriaLabel="내보내기"
  label="Export"
>
  <MenuItem>Export as PDF</MenuItem>
  <MenuItem>Export as PNG</MenuItem>
  <MenuItem>Export as SVG</MenuItem>
</SplitButton>

// Disabled (양쪽 action 모두 비활성)
<SplitButton
  size="small"
  primaryIcon="plus"
  primaryAriaLabel="생성"
  label="Create"
  leadingIcon="plus"
  disabled
>
  <MenuItem>Create project</MenuItem>
</SplitButton>

// Tiny 사이즈
<SplitButton
  size="tiny"
  primaryIcon="save"
  primaryAriaLabel="저장"
  label="Save"
>
  <MenuItem>Save</MenuItem>
  <MenuItem>Save as…</MenuItem>
</SplitButton>

// 짧은 메뉴 — 실제 항목 높이만 사용
<SplitButton
  size="medium"
  primaryIcon="refresh"
  primaryAriaLabel="새로고침"
  label="해제"
  menuScrollable={false}
>
  <MenuItem>사용 안 함</MenuItem>
  <MenuItem>5분마다</MenuItem>
</SplitButton>
```

---
