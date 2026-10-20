# Menu — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import {
  DropdownMenu as Menu, DropdownMenuTrigger as MenuTrigger,
  DropdownMenuContent as MenuContent, DropdownMenuItem as MenuItem,
  DropdownMenuSeparator as MenuDivider, DropdownMenuGroup as MenuSection,
  DropdownMenuLabel as MenuSectionHeader, DropdownMenuSub as MenuSub,
  DropdownMenuSubTrigger as MenuSubTrigger, DropdownMenuSubContent as MenuSubContent,
} from './dropdown-menu'
import { Button } from './Button'
import { Icon } from './Icon'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Checkbox } from './Checkbox'
import { Switch } from './Switch'

// 기본 메뉴
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">Open menu</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem>Menu item</MenuItem>
    <MenuItem>Menu item</MenuItem>
  </MenuContent>
</Menu>

// Leading icon + trailing shortcut
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">Edit</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem leading={<Icon name="copy" size="m" />} trailing="Ctrl+C">복사</MenuItem>
    <MenuItem leading={<Icon name="modify" size="m" />} trailing="Ctrl+V">붙여넣기</MenuItem>
    <MenuDivider />
    <MenuItem leading={<Icon name="eliminate" size="m" />} trailing="Del">삭제</MenuItem>
  </MenuContent>
</Menu>

// Selected
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">View</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem selected>List view</MenuItem>
    <MenuItem>Grid view</MenuItem>
  </MenuContent>
</Menu>

// Section + Section header + Divider
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">File</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuSection>
      <MenuSectionHeader>파일</MenuSectionHeader>
      <MenuItem trailing="Ctrl+N">새 파일</MenuItem>
      <MenuItem trailing="Ctrl+O">열기</MenuItem>
    </MenuSection>
    <MenuDivider />
    <MenuSection>
      <MenuSectionHeader>편집</MenuSectionHeader>
      <MenuItem trailing="Ctrl+Z">실행 취소</MenuItem>
    </MenuSection>
  </MenuContent>
</Menu>

// Submenu (2-depth)
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">More</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem>Menu item</MenuItem>
    <MenuSub>
      <MenuSubTrigger>More options</MenuSubTrigger>
      <MenuSubContent size="small">
        <MenuItem>Sub item 1</MenuItem>
        <MenuItem>Sub item 2</MenuItem>
      </MenuSubContent>
    </MenuSub>
  </MenuContent>
</Menu>

// Checkbox leading (메뉴 유지하며 토글)
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">View options</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem
      onSelect={(e) => { e.preventDefault(); /* toggle */ }}
      leading={<Checkbox checked={true} />}
    >
      그리드 표시
    </MenuItem>
  </MenuContent>
</Menu>

// Switch trailing
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">Settings</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem
      onSelect={(e) => e.preventDefault()}
      trailing={<Switch size="small" checked={true} />}
    >
      자동 저장
    </MenuItem>
  </MenuContent>
</Menu>

// Description
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">File</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem description="현재 페이지를 복제합니다" trailing="Ctrl+D">페이지 복제</MenuItem>
  </MenuContent>
</Menu>

// Medium 사이즈
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">Options</Button>
  </MenuTrigger>
  <MenuContent size="medium">
    <MenuItem>Menu item</MenuItem>
    <MenuItem>Menu item</MenuItem>
  </MenuContent>
</Menu>

// No scroll (scrollable=false)
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">12 items</Button>
  </MenuTrigger>
  <MenuContent size="large" scrollable={false}>
    {Array.from({ length: 12 }, (_, i) => <MenuItem key={i}>Menu item {i + 1}</MenuItem>)}
  </MenuContent>
</Menu>

// Avatar leading + Badge trailing
<Menu>
  <MenuTrigger asChild>
    <Button variant="secondary" size="sm">Members</Button>
  </MenuTrigger>
  <MenuContent size="large">
    <MenuItem
      leading={<Avatar color="primary" size="20">팀</Avatar>}
      trailing={<Badge variant="counter" count={5} />}
    >
      프론트엔드팀
    </MenuItem>
  </MenuContent>
</Menu>
```

---

