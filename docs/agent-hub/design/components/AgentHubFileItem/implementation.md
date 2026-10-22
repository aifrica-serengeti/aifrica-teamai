# AgentHubFileItem — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS recipe**이며 실제 제품 export·파일 서비스·메뉴 구현이 아닙니다.

아래 시각 recipe에도 [공용 Card 색상 모션](../../cards.md#공용-색상-모션-계승)을 함께 연결합니다.
root의 background-color/border-color/box-shadow/color와 텍스트 color에200ms ease를 적용하고,
pseudo border·상태 표면은 변하는 속성만 지정합니다. reduced motion을 명시적으로 해제하며 geometry·SVG src에는 새 모션을 만들지 않습니다.

## 1. 기존 파일 행을 확인합니다

소비 저장소의 source·public export에서 파일 행·FileIcon·다운로드 Button·메뉴·파일 요청 owner를 찾습니다.
호환되면 adapter로 연결하고 없으면 가장 가까운 출력 기능 범위에 새 export를 만듭니다.
root에 공용 Card의 폭392/r8·hover/selected를 자동 상속하지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 적용합니다.

## 2. 표시 데이터와 다운로드 의도를 받습니다

```ts
export type AgentHubFileItemProps = {
  fileId: string;
  title: string;
  fileTypeText: string;
  extensionText: string;
  iconType: "spreadsheet" | "presentation" | "document" | "pdf" | "code" | "archive";
  showSize?: boolean;
  fileSizeText?: string;
  downloadAction?: {
    label: string;
    disabled?: boolean;
    onRequest: (fileId: string) => void;
  };
};
```

showSize 기본값은 false이며 true일 때 제품에서 형식화한 fileSizeText를 제공합니다.
iconType은 노출된 FileIcon에 연결하는 제품 제안이며 root의 실제 enum prop이 아닙니다.
downloadAction 유무에 따른 숨김도 연결이 미확인인 button Boolean을 제품에서 명시적으로 채택하는 제안입니다.
실제 파일 ID·권한·다운로드 대상·메뉴 항목·open·pending·실패는 제품 owner가 관리합니다.

## 3. 비대화형 행과 단일 다운로드 host를 조합합니다

```text
비대화형 파일 행
├─ 장식 FileIcon44
├─ info: title + meta
│  └─ meta: 그룹 단위 줄바꿈
│     ├─ 표시할 때 size문구 + size-divider (gap4)
│     └─ fileTypeText + Divider + extensionText (gap4)
└─ downloadAction이 있을 때 기존 AgentHubButton tertiary28
   └─ label + 실제 chevron-down16
```

Button의 native click에서 disabled guard 후 onRequest(fileId)를 한 번 호출합니다.
native Enter/Space에 별도 keydown·glyph·wrapper callback을 더하지 않습니다.
실제 메뉴를 연결한 제품은 검증된 popup primitive의 한 trigger/명령 경로를 사용하고 원본에 없는 메뉴 항목을 만들지 않습니다.
숨김 leading/keycap과 showSize=false의 두 노드는 DOM에서도 제거합니다. 문자열은 평문으로 렌더합니다.

## 4. 레이아웃에 포함되지 않는 inside 선을 연결합니다

다음 literal은 Light 비교값이며 제품 token에 연결합니다. 폭512px는 비교 환경에서만 공급하고 실제 부모 폭을 검증합니다.

```css
.hub-file-item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  padding: 12px 16px 12px 12px;
  border: 0;
  border-radius: 12px;
  background: #ffffff;
}
.hub-file-item::after {
  content: "";
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: inherit;
  pointer-events: none;
}
.hub-file-item-tile { flex: 0 0 44px; width: 44px; height: 44px; }
.hub-file-item-info { display: flex; flex-direction: column; flex: 1 1 auto; min-width: 0; gap: 0; }
.hub-file-item-title {
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #1c1c1c;
  font: 600 14px/20px Pretendard, sans-serif;
}
.hub-file-item-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0 4px; min-width: 0; max-width: 100%; width: fit-content; }
.hub-file-item-size-group, .hub-file-item-kind { display: inline-flex; align-items: center; gap: 4px; min-width: 0; max-width: 100%; overflow: hidden; }
.hub-file-item-type, .hub-file-item-extension { margin: 0; flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; font: 400 14px/20px Pretendard, sans-serif; white-space: nowrap; }
.hub-file-item-type { color: #555555; }
.hub-file-item-extension { color: #8f8f8f; }
.hub-file-item-size { margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; color: #555555; font: 400 12px/16px Pretendard, sans-serif; white-space: nowrap; }
.hub-file-item-size-divider { flex: 0 0 1px; width: 1px; height: 10px; }
.hub-file-item-size-divider img { display: block; width: 1px; height: 10px; }
.hub-file-item-divider { display: inline-flex; flex: 0 0 1px; width: 1px; height: 8px; background: #dddddd; }
.hub-file-item-download { flex: 0 0 auto; height: 28px; }
```

root의 pseudo border는 실제 흐름에 공간을 더하지 않는 **CSS adapter**입니다. root shadow가 제공됐다는 뜻이 아닙니다.
완성 FileIcon을 연결하고 타일의 선·sheet를 다시 그리지 않습니다.
Vertical Divider는 실제 선1×8px와 양쪽 gap4px로 연결합니다. 이는 원본의 wrapper17px/padding8px와 두 음수 간격이 만든
최종 텍스트·선 좌표를 유지하는 adapter입니다. 원본 수치는 [실측 문서](./styles.md)에 보존합니다.
size-divider는 실제 흐름 폭1px에 [제공된1×10px SVG](../../assets/cards/file-size-divider-1x10.svg)를 장식 img로 연결합니다.
용량 그룹 안 gap4와 meta 그룹 사이 gap4로 선 양쪽 간격을 확보합니다. 메타 전체에 음수 sibling margin을 적용하지 않습니다.
그룹은 info 폭 안에서 줄바꿈하고, 개별 값은 필요할 때 말줄임합니다. 각 텍스트의 원문을 DOM과 title에 유지하고
줄바꿈으로 늘어난 정보 높이를 고정68px로 잘라내지 않습니다. `size=false`이면 용량 그룹과 그 간격이 함께 제거됩니다.

다운로드는 기존 [AgentHubButton](../AgentHubButton/styles.md)의 inside 선 layout=false·28px·r4·px8/py4/gap4를 유지합니다.
button에 실선 border2px 공간을 추가해87×30px로 만들지 않습니다. chevron16의 실제 선은1px이며 설명의1.25로 덮어쓰지 않습니다.
긴 metadata·좁은 폭에서 그룹 줄바꿈·말줄임과 다운로드 위치를 검증합니다. 화면 폭에 따라 다운로드를 다음 행에 배치하는
소비 앱은 root의 wrap과 info 기준 폭을 함께 연결합니다. 다운로드 버튼 자체를 축소하거나 메타를 그 뒤로 넘기지 않습니다.

## 5. 실제 자산·동작·매핑을 검증합니다

[자산 기록](../../references/card.assets.json)과 [자산 안내](../../assets.md)에 따라 제품 소유 경로를 사용합니다.
임시 Figma URL을 runtime에 두지 않고 외부 SVG img의 부모 color만으로 내부 stroke가 바뀐다고 가정하지 않습니다.
[검증 항목](./verification.md)과 제품 lint/typecheck/test/build·메뉴/다운로드·keyboard·가변 폭 검증 후 실제 source/public export를 기록합니다.
그 전에는 `unmapped`/`draft`를 유지하고 serengeti 원본을 수정하지 않습니다.
