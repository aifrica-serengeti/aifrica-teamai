# Open panel — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { OpenPanel } from './OpenPanel'
import { Button } from './Button'

// 기본 — Overlay Right
<OpenPanel
  side="right"
  type="overlay"
  icon="info"
  title="상세 정보"
  trigger={<Button variant="tertiary" size="small">열기</Button>}
>
  <p>Some contents...</p>
</OpenPanel>

// Header actions + 닫기
<OpenPanel
  side="left"
  type="inline"
  icon="gears"
  title="설정"
  headerActions={
    <>
      <Button size="small">Save</Button>
      <Button variant="tertiary" size="small">Cancel</Button>
    </>
  }
  trigger={<Button variant="tertiary" size="small">설정 열기</Button>}
>
  <p>설정 콘텐츠...</p>
</OpenPanel>

// Resizable
<OpenPanel
  side="right"
  type="overlay"
  resizable
  icon="gears"
  title="Resizable panel"
  trigger={<Button variant="tertiary" size="small">열기</Button>}
>
  <p>패널 테두리의 캡슐 그립을 드래그해 너비를 조절하세요.</p>
</OpenPanel>
```

---

