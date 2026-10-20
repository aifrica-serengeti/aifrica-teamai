# Scrollbar & ScrollArea — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](./README.md)

## 9. 접근성

- thumb 요소에 `role="scrollbar"`, `aria-orientation` 속성 부여.
- 컨테이너는 네이티브 스크롤을 사용하므로 키보드(방향키/PageUp/PageDown/Home/End)와
  마우스 휠이 기본 동작으로 작동한다.
- `verticalThumbOffset`은 thumb의 시각적·드래그 트랙만 조정한다. native scroll container의
  크기나 keyboard navigation을 바꾸지 않는다.
- thumb **드래그 지원** — Pointer Events로 thumb를 잡아끌어 스크롤 이동 가능.
  `setPointerCapture`로 드래그 안정성 확보.
- 최소 thumb 길이 24px로 가시성/조작성 보장(콘텐츠가 매우 길어도 thumb가 너무 작아지지 않음).
- `ScrollAreaHandle.scrollTo()`는 focus를 임의로 옮기지 않는다. 호출 action의 focus 복원과 위치 변경 결과
  안내가 필요하면 parent workflow가 소유하며, 자동 위치 이동은 사용자가 요청한 action에만 연결한다.

### 드래그 스크롤 계산

thumb 이동량을 실제 스크롤 위치로 변환:

```
deltaScroll = (deltaPointer / thumbTrack) × (scrollSize − clientSize)
// thumbTrack = clientSize − thumbSize
```

---
