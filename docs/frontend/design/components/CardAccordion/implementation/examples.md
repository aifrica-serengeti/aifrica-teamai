# CardAccordion — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](../README.md)

## 구현 내용

### 사용 예시

```tsx
import { Button } from './Button'        // 의존 컴포넌트 (Button/README.md)
import { IconButton } from './IconButton' // 의존 컴포넌트 (IconButton/README.md)
import { CardAccordion } from './CardAccordion'

// 비제어 모드 (내부 상태 관리)
<CardAccordion title="클라우드 선택" optionalLabel="(선택항목)" showInfoIcon defaultExpanded>
  <CardAccordion.Actions>
    <Button variant="tertiary" size="medium">편집</Button>
    <IconButton icon="more_vertical" variant="ghost" size="medium" aria-label="더 보기" />
  </CardAccordion.Actions>
  <CardAccordion.Panel>
    <p>본문 콘텐츠</p>
  </CardAccordion.Panel>
</CardAccordion>

// 제어 모드 (외부 상태 관리)
const [open, setOpen] = useState(true)
<CardAccordion title="설정" expanded={open} onExpandedChange={setOpen}>
  <CardAccordion.Panel placeholder />
</CardAccordion>

// 정적 데모 (상태 고정)
<CardAccordion title="Title" interactiveState="hovered" expanded>
  <CardAccordion.Panel placeholder />
</CardAccordion>
```

---
