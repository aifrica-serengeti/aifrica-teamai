# Scrollbar & ScrollArea — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
// 기본 — hover 시 표시, 수직, 4px
<ScrollArea>
  <p>긴 콘텐츠...</p>
</ScrollArea>

// 커스텀 — 항상 표시, 양방향, 8px 굵기
<ScrollArea
  type="always"
  orientation="both"
  thumbWidth={8}
  className="h-[300px] w-[400px]"
>
  <div style={{ width: 800, height: 800 }}>큰 콘텐츠</div>
</ScrollArea>

// sticky header가 있는 Table — vertical thumb를 header 아래에서 시작
<ScrollArea
  orientation="both"
  verticalThumbOffset={38}
  contentClassName="table-scroll-content"
>
  <table>{/* sticky thead + body */}</table>
</ScrollArea>

// form 초기화 같은 명시적 action 뒤 최상단으로 복원
const scrollAreaRef = useRef<ScrollAreaHandle>(null);

<ScrollArea ref={scrollAreaRef}>{/* 긴 form */}</ScrollArea>

<Button onClick={() => scrollAreaRef.current?.scrollTo({ top: 0 })}>
  초기화
</Button>
```

---
