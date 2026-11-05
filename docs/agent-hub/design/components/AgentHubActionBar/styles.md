# AgentHubActionBar — 외곽 치수와 시각 값

[실측](../../references/cards-actions-refresh.figma.json)의 Light 기준입니다.

| 항목 | size48 | size40 |
| --- | --- | --- |
| 샘플 node | 3610:24484 | 3610:24500 |
| 샘플 크기 | 656×48px | 538×40px |
| padding left/right | 20/12px | 16/8px |
| count와 actions gap | 24px | 16px |
| 일반 action 높이 | 32px | 28px |
| more/close 크기 | 32×32px | 32×32px |

두 bar의 공통값은 radius8 (`radius/surface-xs`), #1C1C1C (`color/surface/default-inverse`),
border 없음, 가로 flex 배치와 교차축 중앙 정렬(`items-center`)입니다. 가로축 `justify-center`가 관찰됐다는 뜻은 아닙니다. actions gap8·main gap4·primary-actions gap4를 구분합니다.
count는 양쪽 크기 모두 Pretendard600 14/20·자간0·white입니다.
작은 bar라고 count까지12px로 줄이지 않습니다.

divider는 높이16px의 wrapper에 좌우8px 여백, 안쪽1px #555555 선입니다.
wrapper 총 가로 영역은17px이며 주변 main gap4는 별도입니다.
위험 명령은 같은 action 치수를 사용하며 red glyph/text를 추가하지 않습니다.

## 변수와 그림자

원본 count 변수명은 오탈자를 포함한 **`color/text/defult-inverse`**이고 해결값은 #FFFFFF입니다.
명령 label은 `color/text/default-static`, glyph는 `color/icon/default-static`입니다.
이름을 임의로 바로잡아 네이티브 alias 연결이 검증된 것처럼 기록하지 않습니다.
정확한 해결 변수와 원본 spelling은 실측 JSON에 보존합니다. native 변수 ID/alias graph는 이번 도구 자료에 없습니다.

bar의 Mid는 [Agent Hub Elevation](../../foundations/Elevation.md)의 두 겹 shadow와 일치합니다.
Figma effect는 `0 0 1 0 / #091E424F` + `0 4 6 0 / #091E4226`입니다.
CSS 연결은 `0 0 1px 0 rgba(9,30,66,.31), 0 4px 6px 0 rgba(9,30,66,.15)`를 사용합니다.
생성 context의 `drop-shadow` blur 번역을 box-shadow의3px/.5px로 복사하지 않습니다.
여러 레이어에 Mid를 중복 적용하지 않으며 내부 action에는 별도 elevation을 추가하지 않습니다.

## 폭과 미확인 상태

656/538px는 관찰 문자열·기본 슬롯 조합의 결과입니다. 고정 제품 폭으로 강제하지 않습니다.
원본 설명은 hug 또는 fill960·닫기 우측 정렬을 안내하지만 실제 `width` property/별도 variant로 확인되지는 않았습니다.
fill 레이아웃이 필요하면 남는 공간과 정렬을 제품에서 정하고 로컬 매핑에 기록합니다.
보드의 x/y는 문서 배치이며 화면의 fixed bottom 좌표가 아닙니다.

[part별 상태](./parts.md)의 색상 전환에는 공용 ActionBar의200ms ease를 element별로 계승합니다.
Figma가 새 등장·퇴장 easing/duration을 제공한 것은 아닙니다. `transition: all`을 쓰지 않고 reduced motion에서는 해제합니다.
focus·active toggle·dark·큰 글자·좁은 폭·동적 count의 교차 상태는 별도 제품 검증 범위입니다.
