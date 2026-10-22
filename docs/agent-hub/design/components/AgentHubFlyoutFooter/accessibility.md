# AgentHubFlyoutFooter — 접근성

- 설명은 일반 텍스트로 읽을 수 있어야 하며 button·menuitem·kbd·tab stop을 만들지 않습니다.
- 전체 문구를 평문으로 렌더하고 의미 없는 `meta` 샘플이나 제품에 맞지 않는 플랫폼 정책을 실제 안내로 사용하지 않습니다.
- 부모가 필요할 때 설명 id를 `aria-describedby`에 연결합니다. Header meta와 같은 문구를 중복 설명으로 읽지 않게 범위를 정합니다.
- Footer를 별도 `role="alert"`·`status`·자동 live region으로 만들지 않습니다. 공지 필요성과 갱신 빈도는 제품이 정합니다.
- 팝업 내부의 일반 설명에 페이지 전체 `contentinfo` landmark를 무조건 추가하지 않습니다. 비대화형 div/p로 조합할 수 있습니다.
- 문구가 늘어나도 읽기 트리와 시각 화면 모두에서 확인할 수 있어야 합니다.29/33px 고정 높이·부모 clipping으로 설명을 잘라내지 않습니다.
- Footer가 표시되지 않는 제품 구성에서는 제거된 텍스트 id를 부모의 설명 관계에 남기지 않습니다.

Footer는 focus target이 아니지만 부모의 마지막 항목·현재 focus와 겹쳐 조작을 방해하지 않아야 합니다.
원본33px 배치와 shell clipping을 runtime 접근성의 증거로 취급하지 않고 좁은 폭·번역·zoom·surface 대비를 제품에서 검증합니다.
