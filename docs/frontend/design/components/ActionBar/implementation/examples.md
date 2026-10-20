# Action bar — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Check, MoreHorizontal, Play, Trash2 } from 'lucide-react'
import { ActionBar } from './ActionBar'

<ActionBar>
  <ActionBar.Leading
    count="3개 선택됨"
    icon={
      <ActionBar.IconButton aria-label="전체 선택 해제">
        <Check />
      </ActionBar.IconButton>
    }
  />
  <ActionBar.Actions>
    <ActionBar.Group>
      <ActionBar.Action><Play /> 시작</ActionBar.Action>
      <ActionBar.Action>정지</ActionBar.Action>
      <ActionBar.Action>종료</ActionBar.Action>
      <ActionBar.IconButton aria-label="더 보기">
        <MoreHorizontal />
      </ActionBar.IconButton>
    </ActionBar.Group>
    <ActionBar.Divider />
    <ActionBar.Action><Trash2 /> 삭제</ActionBar.Action>
  </ActionBar.Actions>
</ActionBar>
```

### 스펙 시트 전시용 (정적 상태 고정)

`state` prop 으로 정적 시각 상태를 강제할 수 있다. 실제 마우스 조작은
`:hover` / `:active` / `:focus-visible` 이 자동 처리한다.

```tsx
{/* 각 상태를 고정하여 스펙 시트 전시 */}
<ActionBar.Action state="hovered">시작</ActionBar.Action>
<ActionBar.Action state="pressed">시작</ActionBar.Action>
<ActionBar.Action state="disabled">시작</ActionBar.Action>
<ActionBar.IconButton state="active" aria-label="확인"><Check /></ActionBar.IconButton>
```

---

