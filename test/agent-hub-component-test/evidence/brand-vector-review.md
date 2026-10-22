# BrandMark 분리 SVG 검증 기록

2026-10-22 사용자 요청으로 브랜드 모션을 제거했습니다. 현재는 원본 PNG만 정적으로 표시하며,
최신 검증은 `brand-static-verification.json`과 `brand-static-only.png`입니다.
아래 wave·광택 관련 파일은 이전 시안의 기록이며 현재 채택 근거로 사용하지 않습니다.

당시 시안은 원본 PNG를 참고해 복원한 세 ellipse의 독립 `wave`였습니다.
원본과 같은 픽셀·가려진 레이어의 정확한 복구를 보장하지 않습니다.
원본 출처와 복원값은 TeamAI의 `brand-mark.reconstruction.json`에 따로 기록합니다.

`brand-vector-verification.json`과 `brand-vector-0.png`, `brand-vector-1900.png`,
`brand-vector-4000.png`는 당시 시안의 브라우저 검증 결과입니다.

- 180·96·32px에서 SVG 그룹 3개와 고유 gradient/mask ID를 확인했습니다.
- 각 그룹의 회전 한도·동일 비율 scale, 기준 ellipse 유지와 고정된 host 크기를 확인했습니다.
- 버튼으로 pause 시 현재 프레임 유지, resume 시 이어 재생을 확인했습니다.
- reduced-motion·forced-colors·print에서 SVG animation 제거와 원본 PNG 표시를 확인했습니다.
- 화면 이탈 시 프레임 유지, 갤러리 unmount 시 남은 브랜드 animation이 없음을 확인했습니다.
- 흰 배경 200px 비교의 색 차이와 alpha>.2 실루엣 겹침률은 수치 참고일 뿐, 원본 동일 판정이나 브랜드 승인이 아닙니다.

이전 `brand-mark-*`는 전체 회전 시안, `brand-preserved-*`는 PNG texture 시안의 기록입니다.
현재 분리 SVG를 검증한 근거로 사용하지 않습니다.
