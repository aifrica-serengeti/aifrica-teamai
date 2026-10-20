# Dialog — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
import { Dialog } from './Dialog'
import { Button } from './Button'
import { SegmentedControl } from './SegmentedControl'
import { InputField } from './Input'

// Small — 단순 알림·짧은 정보
<Dialog
  size="small"
  title="Title"
  description="Description 1line"
  footer={
    <>
      <Button variant="tertiary" size="medium">취소</Button>
      <Button size="medium">확인</Button>
    </>
  }
  trigger={<Button variant="tertiary" size="small">열기</Button>}
/>

// Confirmation profile — action 종류와 관계없이 Small과 같은 400px
<Dialog
  size="small"
  profile="confirmation"
  title="참여 요청을 승인할까요?"
  description="승인하면 사용자가 그룹에 참여합니다."
  footer={
    <>
      <Button variant="tertiary" size="medium">취소</Button>
      <Button size="medium">승인</Button>
    </>
  }
  trigger={<Button variant="tertiary" size="small">승인</Button>}
/>

// Medium — 폼 + Subheader
<Dialog
  size="medium"
  title="볼륨 생성"
  description="새 볼륨 정보를 입력하세요."
  subheader={
    <SegmentedControl
      fullWidth size="medium" type="label"
      options={[
        { value: 'new', label: '새로운 볼륨 생성' },
        { value: 'existing', label: '기존 볼륨 선택' },
      ]}
    />
  }
  footer={
    <>
      <Button variant="tertiary" size="medium">취소</Button>
      <Button size="medium">재배포하기</Button>
    </>
  }
  trigger={<Button variant="tertiary" size="small">열기</Button>}
>
  <InputField label="볼륨 이름" placeholder="이름을 입력하세요." />
  <InputField label="크기" suffix="GB" placeholder="100" />
</Dialog>

// X-Large — 표·탐색 결과처럼 넓은 본문을 담는 workflow dialog
<Dialog
  size="xlarge"
  scrollFadeTone="subtle"
  title="클라우드 자원 동기화"
  description="제공자에서 발견된 항목을 선택해 자원으로 가져옵니다."
  footer={
    <>
      <Button variant="tertiary" size="medium">취소</Button>
      <Button size="medium">동기화</Button>
    </>
  }
  trigger={<Button variant="tertiary" size="small">열기</Button>}
>
  {/* Table 등 넓은 콘텐츠. 높이 상한 760px에서 Body가 스크롤된다. */}
</Dialog>
```

---
