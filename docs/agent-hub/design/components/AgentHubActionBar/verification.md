# AgentHubActionBar — 검증

## 시각 대조

1. 두 bar를 관찰 sample656×48/538×40으로 대조하고 실제 제품에서는 내용/부모 폭과 분리합니다.
2. 외곽 radius8·inverse #1C1C1C·Mid 두 shadow, 좌우20/12 또는16/8·count/actions gap24/16을 확인합니다.
3. count가 두 크기 모두14/20·600·white이고 왼쪽 icon32가 임의 추가되지 않았는지 확인합니다.
4. actions/main/primary gap8/4/4, divider16px·1px #555·좌우8px을 각각 확인합니다.
5. [parts](./parts.md)의 action8개와 icon-action4개를 비교합니다. action32가 생성 padding만 따라28px가 되지 않게 합니다.
6. hover/pressed가 모두 solid #333이고 독립 part의 disabled label #8F/glyph #AAA가 전체 opacity와 별개인지 확인합니다.
7. 작은 bar의 more/close도32px·glyph20·radius6인지 확인합니다.
8. 실제16px inverse glyph/stroke1px와20px glyph/stroke1.25가 일반 아이콘으로 교체되지 않았는지 자산을 대조합니다.

## 조합·기능·접근성

- showCount와 각 action/more/divider/close Boolean의 표시·자리 제거를 확인합니다. 허용된 조합에서 홀로 남는 divider를 제품이 처리하는지 확인합니다.
- 선택 개수 변경·선택 해제·목록 갱신·다중 선택·권한 변경 시 목록 owner의 값과 일치하는지 확인합니다.
- 주요 명령/더보기/선택 해제가 포인터·keyboard에서 각각 한 번 실행되는지 확인합니다.
- disabled pointer/Enter/Space가 막히고 메뉴 닫기 후 focus가 원래 조작으로 돌아오는지 확인합니다.
- dark·고대비·focus outline·200% 확대·좁은 폭·긴 번역에서 모든 명령에 접근할 수 있는지 확인합니다.
- fill/hug·fixed/sticky는 제품 결정값으로 검증하고 Figma width property가 확인됐다고 기록하지 않습니다.
- 200ms 색상 모션이 label/glyph에도 적용되고 reduced motion에서 즉시 완료되는지 확인합니다.

이 문서의 확인 범위는2026-11-05 metadata·생성 context·해결 변수·원본 export·스크린샷 대조입니다.
제품 source/export·browser·API·prototype timing·native 변수 ID/alias graph는 미검증입니다.
공유 매핑은 `unmapped`/`draft`를 유지하고 소비 제품에서 검증된 경로만 로컬에 기록합니다.

- 실제 bar의 action2 disabled glyph가 두 크기 모두 #8F8F8F이며 독립 part의 #AAAAAA와 구분되는지 확인합니다.
- 기본 숨김인 size48 more의 검정 fill·혼합 stroke와 size40 more의 white 단색을 exact SVG와 대조합니다. 원본 관찰과 제품의 변경 채택을 구분하며 숨김 slot을 임의 노출하지 않습니다.
- 외곽의 가로 flex/교차축 중앙 정렬을 가로축 justify-center로 오독하지 않습니다.
