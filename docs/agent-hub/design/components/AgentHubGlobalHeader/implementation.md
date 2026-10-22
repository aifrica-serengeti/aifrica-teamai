# AgentHubGlobalHeader — 기존 header 연결과 새 구현

아래는 **제품 API 제안과 배치 recipe**이며 실제 Agent Hub export나 Figma root props가 아닙니다.
root props는 비어 있습니다. 공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와
`DOCS_ROOT/frontend/design/components/Button/README.md`, `DOCS_ROOT/frontend/design/components/Link/README.md`,
`DOCS_ROOT/frontend/design/components/IconButton/README.md`를 함께 읽습니다.

## 1. 소비 저장소에서 먼저 찾습니다

1. 현재 제품의 shell header·브랜드 자산·Button/Link/IconButton adapter·public export를 검색합니다.
   같은 역할을 맡는 header가 있으면 표시 시각과 action만 연결하며 landmark·router·popup 엔진을 복제하지 않습니다.
2. 호환 구현이 없을 때만 가까운 제품 UI 범위에 가장 좁은 새 export를 개발합니다. 공용 PageHeader나 CMP Header를 수정하거나
   계정·tenant·SNB 접기 props를 복사하지 않습니다. 기존 AHButton/IconButton의 채택 여부도 실제 API와 기본 시각을 대조한 뒤 정합니다.
3. [자산 안내](../../assets.md)와 [전용 목록](../../assets/global-header/manifest.json)에 따라
   `service-logo-mark.svg`, `platform-shortcut-mark-16.svg`, `notification-bell-20.svg`를 제품 소유 경로에 연결합니다.
   이 세 파일은 심볼/glyph만 포함합니다. 서비스명과 바로가기 label은 별도 텍스트입니다.
   임시 Figma URL을 runtime src로 사용하거나 기존16/20/24 아이콘을 임의 확대해 로고를 만들지 않습니다.
4. 시각·입력·접근성·제품 동작을 검증한 뒤 실제 source/public export와 adapter를 로컬 mapping에 기록합니다.
   그 전에는 `unmapped`/`draft`를 유지합니다. CMP source나 이 저장소 문서를 제품 구현 완료의 증거로 쓰지 않습니다.

## 2. 이동과 명령을 구분한 API 제안

```ts
// 실제 export가 아닌 제안입니다. 기존 제품 API와 실제 목적지에 맞춰 채택합니다.
type HeaderTarget =
  | { kind: "link"; href: string }
  | { kind: "action"; onActivate: () => void };

export type AgentHubGlobalHeaderProps = {
  brandHref?: string; // 실제 home 목적지가 있을 때만 링크로 만듭니다.
  brandLabel?: string;
  shortcut: { label: string; target: HeaderTarget };
  notification: {
    label: string;
    onActivate: () => void;
    expanded?: boolean; // 실제 열 대상을 채택했을 때만 사용합니다.
    controlsId?: string;
  };
};
```

`kind="link"`는 실제 href를 가진 anchor 한 개로, `kind="action"`과 알림은 `type="button"`의 click 한 곳으로 연결합니다.
같은 action을 keydown·wrapper·아이콘 click에 다시 달지 않습니다. href가 없는 브랜드는 정적 요소로 렌더합니다.
popup 종류·open owner·권한·pending·disabled·새 창 정책은 제품에서 별도로 연결하고 Figma 속성으로 소개하지 않습니다.
visible label과 접근성 이름은 제품 locale로 공급하며 샘플 문구가 실제 목적과 맞는지 확인합니다.

## 3. 기본 DOM과 로고 좌표를 유지합니다

```text
기존 shell header 또는 새 header 한 개
├─ 브랜드: 실제 목적지에 따라 anchor 또는 정적 요소
│  ├─ 장식 심볼21.70786476135254
│  └─ Cheetah[600] + Agent Hub[400] 텍스트
└─ actions
   ├─ 바로가기 anchor 또는 button 한 개
   │  ├─ 장식 심볼16
   │  └─ 보이는 label
   └─ 이름 있는 알림 button 한 개 + 장식 bell20
```

다음은774px fixture의 원본 배치를 설명하는 CSS입니다. 색상 literal은 실측값이며 실제 제품에서는 같은 의미의 로컬 token에 매핑합니다.
focus-visible·추가 disabled·hover 정책은 기존 제품 adapter로 연결하고 아래 CSS만으로 모든 상태를 구현했다고 판단하지 않습니다.

```css
.hub-global-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 8px;
  width: 100%;
  height: 43px;
  padding: 0 16px;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #f6f7f9;
  box-shadow: none;
}
.hub-header-brand {
  position: relative;
  flex: 0 0 138px;
  width: 138px;
  height: 21.70786476135254px;
  overflow: visible;
  color: #1c1c1c;
  text-decoration: none;
}
.hub-header-brand-symbol { display: block; width: 21.70786476135254px; height: 21.70786476135254px; }
.hub-header-brand-text {
  position: absolute;
  left: 27.91015625px;
  top: 1.55078125px;
  width: 154px;
  height: 19px;
  font: 400 15.50561809539795px/18.606740951538086px Poppins, sans-serif;
  letter-spacing: 0;
  white-space: nowrap;
}
.hub-header-brand-text-cheetah { font-weight: 600; }
.hub-header-actions { display: flex; align-items: center; flex-shrink: 0; gap: 8px; }
.hub-header-shortcut {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 24px;
  padding: 4px 8px;
  border: 0;
  border-radius: 4px;
  background: #fff;
  color: #1c1c1c;
  font: 600 12px/16px Pretendard, sans-serif;
  letter-spacing: 0;
  white-space: nowrap;
  text-decoration: none;
}
.hub-header-shortcut::after {
  position: absolute;
  inset: 0;
  border: 1px solid #ddd;
  border-radius: inherit;
  pointer-events: none;
  content: "";
}
.hub-header-shortcut-symbol { flex: 0 0 16px; width: 16px; height: 16px; }
.hub-header-notification {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
}
.hub-header-bell { flex: 0 0 20px; width: 20px; height: 20px; }
```

제공된 service-logo-mark.svg는 심볼만 포함하며 전체 로고 텍스트는 위 구조로 별도 조립합니다.
layout 폭을181.91015625px HUG로 바꾸거나 전체 로고를138px 안으로 축소하면 원본과 다릅니다.
텍스트로 재현할 때는 `Cheetah `와 `Agent Hub`의 글꼴 범위·공백·font weight를 유지합니다.
심볼·bell은 제공 자산의 fill/stroke를 보존하며 외부 SVG `<img>`에 CSS color만 바꾸면 내부 paint가 자동 변경된다고 가정하지 않습니다.
공급 SVG의 원본 크기는 service mark21.7079 square·shortcut16.002×16·bell20×20입니다.
위 CSS의 실제 layout slot21.70786476135254/16/20과 원본 export 크기는 구분합니다.
특히 shortcut SVG의 width/viewBox16.002와 vector x=-0.001953125를 파일에서 고치지 않으며16px display adapter의 pixel 결과를 제품에서 검증합니다.

## 4. 기본 fixture 이후 제품 환경을 검증합니다

바로가기 안의 label100px와 전체136px, actions176px는 샘플 문구의 HUG 결과입니다. label·actions 폭을 전역 상수로 고정하지 않습니다.
원본 logo138px 박스의 넘침은 유지한 fixture에서 먼저 비교한 뒤 실제 가용 폭·zoom·글꼴·locale에서 충돌을 점검합니다.
협소 폭의 최소 폭·별도 배치·높이 증가 등은 제품에서 채택하고 근거와 검증 범위를 기록합니다. 고정43px에 action을 잘라 숨기지 않습니다.
root overflow로 focus가 잘리면 focus-visible을 보존하는 제품 adapter를 검증하고 원본 geometry와 변경 이유를 구분합니다.

숨김 Divider·Breadcrumb·chip은 렌더하지 않으며 빈 wrapper·margin·접근성 이름·Tab 정지를 남기지 않습니다.
hover·pressed·disabled·loading·dark·badge·sticky·scroll 정책을 이 기본 CSS에 임의 추가하지 않습니다.
[검증](./verification.md)을 마친 뒤 해당 제품에서 확인한 source와 public export만 로컬에 기록합니다.
