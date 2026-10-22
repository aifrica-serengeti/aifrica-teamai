# Agent Hub 자산 사용 안내

확장 적용 조건과 확인 범위는 [디자인 진입점](./README.md)을 먼저 읽어 주세요.
파일 목록의 기준은 [asset-manifest.json](./asset-manifest.json)입니다. 모든 `path`는 이 문서가 있는
`design/` 기준이며, TeamAI mirror에서도 같은 상대 위치를 사용합니다.
Checkbox 전용 시각 자산은 [별도 manifest](./references/checkbox.assets.json)에서 찾습니다.
Breadcrumb arrow SVG1개는 [전용 manifest](./references/breadcrumb.assets.json)에서 찾습니다.
21.5575×24px 전체 separator에 좌우8px이 포함돼 있으므로 추가 padding이나 일반 chevron을 겹치지 않습니다.
장식 구분자로 사용하며 상세 규격은 [BreadcrumbSeparator](./components/AgentHubBreadcrumbSeparator/README.md)를 확인합니다.
ChatComposer는 [전용 manifest](./references/chat-composer.assets.json)에서 기존 plus/arrow24와 프로젝트 folder를 찾습니다.
folder는20px 원본을16px·선1px·#555555로 재정의한 전용SVG1개입니다. 일반 folder20을 임의 축소하는 대신 이 자산을 연결합니다.
UserMessage 예약 상태 아이콘은 [전용 manifest](./references/message-user.assets.json)의
`assets/message-user/schedule-12.svg`를 사용합니다. native20 원본의 실제12px·선0.75px·#555555 재정의를 보존합니다.
ProgressAlert는 [전용 manifest](./references/progress-alert.assets.json)에 연결한 기존
`assets/icons/circle-alert/20.svg`를 재사용합니다. 원본20px·선1.25px·#1C1C1C를 유지합니다.
MessageExample도 [전용 manifest](./references/message-example.assets.json)의 기존
`assets/icons/arrow-right/20.svg`를 재사용합니다. 원본20px·선1.25px·#1C1C1C와 icon Boolean의 표시 조건을 유지합니다.
Picker는 [전용 manifest](./references/picker.assets.json)에서 기존16px glyph5개의 source와 제공된 원본7개를 찾습니다.
제공 원본은 모델 logo 샘플PNG1개·모델/찾기 chevron·다른 폴더·투명도0 대체 more·회색 filter/more SVG6개입니다.
기존 filter/more 파일의 기본색은#1C1C1C이므로 실제#757575에는 기록된 `effectiveAssetPath` 또는 검증한 색상 adapter를 사용합니다.
모델 logo는 동적 제품 데이터의 샘플이며 회사 로고가 아닙니다. 아래 viewport 밖 glyph와 투명도0 glyph도 자산이 있다는 이유로 항상 표시하지 않습니다.
Menu의 optional glyph는 [전용 manifest](./references/menu.assets.json)에서 원본 출처와 표시 범위를 확인합니다.
library16 source geometry3개와 상태별 paint SVG8개를 구분합니다. 제공 SVG는 `assets/menu/*-16.svg`에 있으며
default/destructive의 edit·check, 공통 chevron과 disabled 색을 보존합니다. 기본 icon/check/chevron은 숨겨져 있고 true 조합은 별도 검증합니다.

Flyout은 [전용 자산 기록](./references/flyout.assets.json)의 native16px SVG3개를 사용합니다.
file-text는20px source의 실제16px 재정의이며 선1.25·#757575를 유지합니다.20px 파일을 CSS로 축소하거나
44px FileIcon 타일로 바꾸지 않습니다. folder chevron은16px/선1/#1C1C1C이며 기본 파일 glyph도 실제 데이터에 맞춰 연결합니다.

Session은 [전용 자산 기록](./references/session.assets.json)의 SVG17개를 사용합니다.
Header chevron#757575/plus#1C1C1C, 실제16px 파일·예약 glyph의 선1.25,
done20px 체크선.875/active20px ring4/pending20px circle과 별도 순번/6px unread dot를 구분합니다.
생성 코드의 plus24 이름을 실제 chevron-right 모양과 혼동하지 않습니다. glyph·진행 원형을 다시 그리거나44px 파일 타일로 대체하지 않습니다.

OutputViewer는 [전용 자산 기록](./references/output-viewer.assets.json)의 dot3·maximize16·close16 SVG3개를 사용합니다.
두 control은24px/radius4이고 내부 glyph만16px입니다. 생성 이름 plus24는 실제 source와 다르므로
더하기 모양으로 바꾸지 않습니다. 본문 슬롯은 제품 데이터로 채우며 전체 뷰어 스크린샷을 UI 자산으로 쓰지 않습니다.

Card5종은 [전용 자산 기록](./references/card.assets.json)의22개 항목을 확인합니다.
21개 새 파일과 기존44px spreadsheet 타일1개 참조를 포함하며, 부분 glyph/fragment2개는 근거용입니다.
완성 pin16에는 회전이 이미 들어 있고 원본 로고 PNG2개는 실제 imageHash와 일치합니다.
잘못 내려온 동일32px disabled placeholder는 runtime 자산에서 제외하고 제품 데이터 이미지와 saturation−1 adapter를 연결합니다.
본문 thumbnail은 원본 IMAGE paint가 없어 동적 데이터 API·이미지 정책을 제품에서 별도로 검증합니다.

| 종류 | 위치 | 사용 방법 |
| --- | --- | --- |
| 일반 아이콘 | `assets/icons/<name>/<size>.svg` | manifest의 name과 실제 size로 찾기 |
| 파일 아이콘 | `assets/files/<type>.svg` | spreadsheet, presentation, document, pdf, code, archive |
| 메인 마크 | [assets/brand/agent-hub-mark.png](./assets/brand/agent-hub-mark.png) | 원본 비율·투명도 보존, 기준 표시 크기 180×180 |
| Checkbox indicator | `assets/checkbox/<size>/<type>-<state>.svg` | checked/indeterminate·3크기·2상태의 Box+Mark 전체12개 |
| Composer 프로젝트 folder | `assets/chat-composer/project-folder-16.svg` | 프로젝트 FRAME의 실제16px 재정의 원본·장식 아이콘 |
| 사용자 메시지 예약 상태 | `assets/message-user/schedule-12.svg` | 실제12px clock·선0.75px·장식 아이콘 |
| Card5종 전용 원본 | `assets/cards/*` | dot·다운로드 chevron·상태14/control16·whole pin·동적 로고 샘플, 근거용 fragment 구분 |
| OutputViewer 전용 원본 | `assets/output-viewer/*` | 형식 구분점3px·확대/닫기16px, 실제 source/색상/선 보존 |
| Session 전용 원본 | `assets/session/*` | glyph13종·진행 원형3종·unread dot1종, source와 실제 표시 크기/paint 구분 |
| Flyout 전용 glyph | `assets/flyout/*` | file-text16·chevron-right/down16, 원본 크기와 실제 stroke 유지 |
| Picker 전용 원본 | `assets/picker/*` | 모델 logo sample과 FRAME/재정의 glyph6개·표시/크기는 전용 manifest 참조 |
| Menu optional glyph | `assets/menu/*-16.svg` | 기본 숨김 edit/check/chevron의 상태별 paint SVG8개 |

일반 아이콘은 전체 컴포넌트를 `SVG_STRING`으로 export했습니다. 파일 아이콘도 내부 glyph만 떼지 않고
44px 타일 전체를 보존했습니다. 로고는 업로드 원본의 SHA-1과 Figma `ImagePaint.imageHash`가
같음을 확인했습니다. PNG에 회색 캔버스 배경을 합성하거나 SVG로 다시 그리지 않았습니다.
임시 다운로드 URL은 저장하지 않았고, 각 파일의 SHA-256과 영구 Figma 출처를 manifest에 기록했습니다.
Checkbox SVG는 get_design_context가 제공한 원본 파일을 그대로 다운로드했습니다. 시각 박스12/16/20px를 보존하며
일반 check/minus 아이콘과 구분합니다. 전체 Box+Mark가 포함되므로 배경·border·Mark를 다시 겹치지 않습니다.
native checkbox/검증된 primitive의 장식 indicator로 연결하고 SVG 자체에 입력 의미·별도 focus를 부여하지 않습니다.
unchecked의6종은 별도 SVG가 없으며 [Checkbox 규격](./components/AgentHubCheckbox/styles.md)의 사각형·색·선을 사용합니다.

## 이름과 크기 주의사항

- Figma의 `icon/forder/*`는 제품용 이름 `folder`로 찾습니다. 원본 이름과 노드 ID도 함께 남겼습니다.
- `upload/16`, `upload/20`은 각각 두 컴포넌트가 있지만 export 내용이 완전히 같았습니다.
  파일은 하나씩 공유하고 `sources`에 두 노드를 모두 기록했습니다. 따라서 208개 컴포넌트가 206개 SVG가 됩니다.
- 노드 `3216:79474`는 이름이 `icon/skill/16`이지만 실제 frame은 24×24입니다.
  manifest와 파일은 `skill/24`로 등록했습니다. 이름만 보고 16px로 축소하지 마세요.
- 72개 이름 모두에 16/20/24 세 크기가 있는 것은 아닙니다. 없는 조합을 임의 확대·축소하거나
  같은 뜻의 Lucide 아이콘으로 조용히 교체하지 않고, 제품에서 필요한 추가 규격을 확인합니다.

## 제품으로 가져갈 때

프로젝트에 필요한 파일만 제품 소유 경로에 복사하고 기존 자산 로더에 연결하세요.
`.teamai/docs`를 앱의 영구 런타임 import 경로로 사용하면 역할 변경·pull에 영향을 받을 수 있습니다.
manifest의 출처·크기·해시도 함께 보관하면 이후 교체 여부를 비교하기 쉽습니다.

일반 아이콘은 단색 도형을 보존하면서 제품의 semantic color에 연결할 수 있습니다.
파일 타일과 메인 마크에는 일괄 `currentColor`, CSS mask, grayscale/filter를 적용하지 않습니다.
Checkbox의 전체 SVG도 배경·Mark·disabled 선이 함께 있으므로 단색 mask/currentColor로 일괄 치환하지 않습니다.
상태에 맞는 자산을 선택하거나 기존 구현이 박스·Mark 각각의 semantic token을 정확히 지원하는지 비교합니다.
파일 SVG를 inline으로 여러 번 렌더링하면 gradient·clipPath ID가 충돌하지 않도록 인스턴스별로
ID와 참조를 함께 바꾸거나 `<img>`로 사용합니다. 원본 파일은 그대로 유지합니다.

접근성 label, 버튼·링크 동작, 파일 유형 판별은 이미지 자체에 들어 있지 않습니다.
각 [컴포넌트 문서](./README.md)와 제품의 구현에서 연결해 주세요.


## SNB 전용 자산

[SNB manifest](./references/snb.assets.json)는 전용28px 채움 아이콘과 실제 상태색·설정 glyph·섹션 조작·folder/chat/more를 연결합니다.
제공 SVG38개 중 SHA가 같은7개만 합친31개 원본이며54개 glyph slot 중 실제 표시되는 것은42개입니다.
`assets/snb/`의 파일은 원본 native 크기·paint를 유지합니다. 일반 stroke 아이콘으로 치환하거나28px로 확대하지 않습니다.
source24인 설정 glyph의 실제 표시는20px이며 해당 whole SVG20을 사용합니다. 보이지 않는 trailing plus를 노출하지 않습니다.
gradient6개와 계정 글자는 자산이 아닌 원본 paint/텍스트 계약이며, 전시 보드나 컴포넌트 전체 이미지를 UI로 사용하지 않습니다.


## Global Header 전용 자산

[Global Header manifest](./assets/global-header/manifest.json)에 서비스 마크·플랫폼 바로가기 마크·알림 bell의 공급 SVG3개를 보존했습니다.
원본 FRAME 출처와 native 크기·표시 slot·paint·해시를 따릅니다. 서비스 마크는 약21.7079px, 바로가기 slot은16px, bell은20px/선1.25px입니다.
바로가기 SVG의 viewBox/width16.002×16은 원본대로 두고16px slot과의 차이를 제품 adapter에서 검증합니다.
Poppins600/400 혼합 글자는 live text로 조립합니다. 메인 화면의 다색 BrandMark나 헤더 전체 이미지를 이 자산으로 대체하지 않습니다.


## Chat Header의 기존 자산 재사용

[Chat Header manifest](./references/chat-header.assets.json)는 정확한 기존 pause/file/more16 자산3개를24px ghost 버튼의 가운데16px slot에 연결합니다.
실제 source·paint·1px stroke를 확인하며 slot에 남은 `icon/plus/24`라는 이름을 plus 아이콘으로 해석하지 않습니다.
공급 SVG와 기존 파일의 hash·직렬화 차이는 manifest에서 구분하고 검증한 도형과 출처를 따릅니다.
그라데이션 indicator는 RECTANGLE의 paint이고 label은 live text이므로 전체 헤더나 표시선을 이미지로 대체하지 않습니다.


## Dialog의 기존 자산과 전용 glyph

[Dialog 자산 기록](./references/dialog.assets.json)은 두 recipe에서 보이는 아이콘과 동적 모델·도구 로고를 실제 source·paint·geometry로 연결합니다.
Legacy 닫기 버튼의 glyph24와 Finder rail의 pin16, section-title의 delay20을 기존 기본 아이콘 버튼과 혼동하지 않습니다.
up16은 공급 원본 SVG를 추가하고, rotate-cw-clock16은 도형·paint가 일치하는 기존 원본을 재사용합니다. 숨겨진 info/resize/시간 행의 자산은 기본 화면에 추가하지 않습니다.
Finder fade는 RECTANGLE의 선형 gradient입니다. 공급 raster PNG는 비교 근거로만 보존하고 CSS gradient를 전체 이미지로 대체하지 않습니다.
모델·도구 PNG는 데이터 slot의 샘플이며 제품의 실제 이미지로 연결합니다. Dialog 전체·카드·라벨을 이미지로 만들지 않습니다.


## 생각 중 상태의 기존 자산

[진행 표시 자산 기록](./references/chat-progress.assets.json)은 기존 BrandMark PNG와 Header file/more16 SVG3개를 재사용합니다.
상태 마크는 source2611:74302 INSTANCE 아래의 정적 PNG를32×32로 표시합니다. GIF/APNG·logo spin·새 가공 PNG가 아닙니다.
위 내용은 원본 자산과 기존 ThinkingStatus의 정적 기본 표현입니다. 텍스트5stop과 Header4stop은 live CSS paint이며 이미지 파일로 대체하지 않습니다.
Header 흐름은 별도 제안입니다. ThinkingStatus의32px 호출은 정적 원본 PNG를 유지하며 브랜드 모션을 자동으로 켜지 않습니다.

## 선택적 브랜드 마크의 파생 SVG

사용자가 제공한 `image 14533.svg`는 같은 원본 PNG를 넣은 wrapper여서 분리 벡터 레이어가 없습니다.
사용자 요청으로 [분리 SVG](./assets/brand/agent-hub-mark-layered.svg)를 별도 재구성했습니다. 실제 ellipse 세 개와
linear/radial gradient·투명 mask로 작성했으며 PNG를 다시 임베드한 파일이 아닙니다.
타원 윤곽·큰 기울기·겹침·투명 그라데이션을 참고했고, 가려진 영역은 추정했습니다.
**Figma 벡터 원본이나 픽셀 단위 동일 복구로 표기하지 않습니다.**

원본 PNG·원본 manifest는 보존합니다. 파생 자산의 출처와 범위는 [별도 manifest](./references/brand-mark.reconstruction.json)와
[복원 안내](./components/AgentHubBrandMark/reconstruction.md)에 기록합니다. 원본 아이콘·PNG export 목록에 이 SVG를 원본으로 섞지 않습니다.
브랜드 마크는 사용자 요청에 따라 원본 PNG를 정적으로만 표시합니다. 복원 SVG는 참고·비교 자료로 보존하며,
회전·광택·재생 제어를 적용하는 현재 계약은 없습니다. 별도 요청 없이 모션을 다시 추가하지 않습니다.
