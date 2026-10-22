# AgentHubIcon — 검증

자산 확인: 208개 Figma 컴포넌트, 중복 2개를 합친 206개 SVG, 이름 72종입니다.
출처·해시·실제 크기는 manifest에 기록했습니다. 코드 source/export·브라우저 렌더링은 아직 미검증입니다.

제품에 연결한 뒤 다음을 확인합니다.

- 사용하는 name/size 조합이 존재하고 SVG viewBox와 표시 크기가 같습니다.
- 16px 선 1px, 20px 선 1.25px, 24px 선 1.5px와 filled/miter 예외가 유지됩니다.
- agent·folder·skill과 like/dislike·more·settings를 원본과 비교합니다.
- 장식/독립 이미지/아이콘 버튼의 이름, keyboard·focus·disabled가 의도대로 동작합니다.
- light/dark·zoom·상태색을 확인하고 SVG 로더가 원본 도형을 손상하지 않는지 봅니다.
- 확인한 source/export만 로컬 구현 mapping에 기록합니다.
