# Stepper — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](../README.md)

## 구현 내용

### 12.5 사용 예

```tsx
import { Stepper } from './Stepper'

// 기본 horizontal
<Stepper steps={[{label: '이메일'}, {label: '인증'}, {label: '완료'}]} current={1} />

// vertical, no label
<Stepper direction="vertical" showLabel={false} steps={steps} current={2} />

// 클릭 가능 (라벨 클릭으로 step 이동)
<Stepper steps={steps} current={current} clickable onStepClick={(i) => setCurrent(i)} />

// invalid (현재 step 에러)
<Stepper steps={[{label:'1'}, {label:'2'}, {label:'3', invalid:true}]} current={2} />

// help text
<Stepper steps={[{label:'Step 1', helpText:'이메일 입력'}, ...]} current={1} />
```

---

