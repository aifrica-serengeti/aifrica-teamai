# Edit Confirmation Dialog 스타일

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 4. copy와 layout

| 요소                 | 규칙                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| Dialog size          | `size="small" profile="confirmation"`의 `400px` width                                                |
| description          | 최대 두 줄, 넘치면 ellipsis/clamp. 의도한 `\n`은 의미 단위 줄바꿈으로 표시                           |
| footer 순서          | 왼쪽 tertiary safe action, 오른쪽 primary confirm                                                    |
| button size          | 모두 `medium`                                                                                        |
| save default copy    | 제목: caller 필수, confirm: `저장하기`                                                               |
| cancel default copy  | 제목: `수정을 취소할까요?`, confirm: `나가기`                                                        |
| description fallback | save: `변경 내용을 확인한 후 저장해 주세요.`, cancel: `저장하지 않은 변경 내용은 유지되지 않습니다.` |
| create cancel copy   | 등록 문맥에서는 `등록 취소`로 override                                                               |

safe action copy는 저장 확인에서 `돌아가기`, 수정 취소·화면 이탈 확인에서 `계속하기`를 사용한다.
`확인`, `예`처럼 결과가 모호한 문구나 모든 intent에 하나의 문구를 고정하지 않는다.

400px은 Edit Confirmation Dialog만의 임의 너비가 아니라 [Dialog](../Dialog/README.md)의 공통
Confirmation profile이다. 승인·거절·삭제 등 다른 의미의 확인창도 같은 geometry를 사용하되 이
컴포넌트의 save/cancel intent로 변환하지 않는다.

description wrapper는 다음 스타일로 두 줄 이상을 차지하지 않는다.

```ts
export const description = style({
  display: "-webkit-box",
  overflow: "hidden",
  whiteSpace: "pre-line",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
});
```

caller가 두 줄을 고정해야 하는 확인 문구는 번역별 의미 단위를 검토한 뒤 `\n`을 전달한다. 일반 문장은
브라우저의 자연스러운 줄바꿈을 사용하고, 레이아웃만 맞추기 위한 임의 줄바꿈은 추가하지 않는다.

`returnFocusRef` target 확장은 focus 동작 계약이며 Dialog geometry, spacing, color에는 변화를 주지 않는다.
