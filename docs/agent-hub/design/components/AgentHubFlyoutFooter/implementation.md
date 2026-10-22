# AgentHubFlyoutFooter — 구현 연결

소비 저장소의 설명 Footer를 먼저 확인하고 호환되면 스타일·데이터 adapter로 연결합니다.
없으면 Flyout 기능의 가까운 범위에 새 export를 만들 수 있습니다. 다른 MenuLabel·TooltipFooter 원본 재사용을 주장하지 않습니다.
공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`의 절차를 함께 적용합니다.

다음은 **제안 API**입니다. 원본이 가진 meta TEXT와 상위에서 관찰한 인스턴스 override를 연결하는 제품 시작점입니다.

```ts
export type AgentHubFlyoutFooterProps = {
  meta: string;
  descriptionId?: string;
  appearance: "standalone-reference" | "shell-instance";
};
```

appearance는 두 관찰값을 구분하는 제안이며 Figma variant가 아닙니다. 부모가 해당 조합을 명시합니다.
실제 Footer 표시 여부는 [Flyout](../AgentHubFlyout/implementation.md)이 소유합니다. 상위 getter 제한 때문에
전체 Footer Boolean API·기본값을 확인한 것으로 취급하지 않습니다.

```text
비대화형 div.footer, data-appearance=appearance
└─ p.meta, id=descriptionId, 평문 meta
```

```css
.flyout-footer {
  box-sizing: border-box;
  padding: 8px 8px 4px;
  border: 0;
  border-top: 1px solid #dddddd;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.flyout-footer[data-appearance="shell-instance"] {
  padding-bottom: 8px;
  background: #ffffff;
}
.flyout-footer-meta {
  margin: 0;
  font: 400 12px/16px Pretendard, sans-serif;
  color: #757575;
  white-space: normal;
}
```

literal은 Light 비교용이며 제품 token으로 연결합니다. 폭은 부모가 공급하고 한 줄29/33px를 고정 height로 강제하지 않습니다.
meta를 HTML로 주입하거나 치타 플랫폼 문구를 정책 상수로 가져오지 않습니다. 실제 문구·권한·locale은 제품 adapter가 제공합니다.

원본의 shell 안 absolute 배치와 소비 제품의 안전한 일반 흐름 adapter를 구분합니다. 원본은 내부 x1/y365·폭278·높이33으로 shell 바닥398까지 이어집니다.
이를 복사한 고정 y값으로 viewport를 구현하지 말고 border·padding 기준과 실제 Footer 높이를 함께 검증합니다.
[부모 조립 안내](../AgentHubFlyout/implementation.md)의 shell bottom padding0·Footer bottom margin−1px는
CSS border1을 유지하며33px Footer가 y365..398에 닿게 하는 adapter입니다. Footer 자체의 p8을 바꾸거나 하단에4px를 다시 더하지 않습니다.
문구가 여러 줄이면 부모가 Footer·Header·목록 공간을 함께 조정하고 마지막 항목·focus를 가리지 않게 합니다.
제거되는 제품 구성에서는 mount와 설명 id 연결을 함께 갱신합니다. footer=false의 원본 렌더를 확인한 것은 아닙니다.

[검증 항목](./verification.md)과 제품 검사를 마친 뒤 실제 source/public export를 로컬 mapping에 기록합니다.
독립 action·키 handler·별도 권한 요청을 이 부품에 넣지 않고 공유 설정의 `draft`와 미검증 mapping의 `unmapped`를 유지합니다.
