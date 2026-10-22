# Agent Hub Figma 자산 확장 검증

검증일: 2026-10-20. 대상은 [디자인 진입점](../docs/agent-hub/design/README.md)의 Figma 3개 노드다.
Figma는 읽기·export만 수행했고 제품 원본은 수정하지 않았다.

## 공용과 비교한 차이

| 대상 | 확인한 차이와 처리 |
| --- | --- |
| 일반 아이콘 | 공용의 16px 선 1.25px와 달리 1px. 20px=1.25px, 24px=1.5px는 동일. 정확한 size별 SVG를 유지 |
| 도형·이름 | filled·mixed 도형과 일부 miter join 보존. forder→folder alias, 실제 24px인 skill/16 이름 오류 기록 |
| 중복 | upload/16·upload/20의 중복 노드는 각각 SVG SHA-256이 같아 파일 공유. 208개 컴포넌트→206개 파일, 이름 72종 |
| 파일 유형 | 44px 타일 6종, radius 6·border 1, x/y=8 sheet offset·gradient·색상 보존. archive glyph는 22px |
| 메인 마크 | 180px frame, 2048px 투명 PNG 원본. 원본 SHA-1과 Figma image hash 일치. 회색 부모 surface 제외 |

수치·유형은 Figma 관찰이며 adapter 입력·fallback은 제품 적용을 위한 문서 계약으로 구분했다.
공용 51종 id를 바꾸지 않고 Agent Hub catalog 3종을 추가했다. 실제 구현은 모두 `unmapped`다.
전체 테마·페이지·다크 모드·실제 앱의 시각/동작 일치는 검증 범위에 포함하지 않는다.

## 수행한 검증

- `npm run verify`: 링크 2292개, 공용 51 + 솔루션 7개 계약, 스킬 7개, 역할/솔루션 9조합, schema 3개 통과.
- `npm test`: 15개 통과. 자산의 경로·SHA-256·SVG viewBox/선·내부 참조·PNG 원본 해시와 catalog 선택/해제 확인.
- skill-creator의 `quick_validate.py`: 변경한 `aifrica-design-system` frontmatter 통과.
- `npm run resolve -- --solution agent-hub`: 제품 설정은 draft, source/export·전체 brand token을 추정하지 않음.
- 실제 TeamAI CLI 0.27.0: 로컬 작업본의 격리 Git snapshot에서 Codex·Claude 두 도구로 init/pull.
  문서와 SVG/PNG 전체 파일을 byte hash로 비교해 일치 확인. 공용 켜기 794파일·스킬 각 7개,
  끄기 248파일·공용 스킬 각 0개·공용 hook 제외. 로컬 자체 스킬 보존.
- 공용 해제 후 Agent Hub 문서·자산은 솔루션 자료로 남지만 `extendsCommon: true` catalog는 합성하지 않음.
  frontend 문서가 없는 mirror에서도 독립 모드 검사 통과. CMP·PaaS에는 Agent Hub catalog가 유입되지 않음.
- `git diff --check` 통과. 읽기 전용 원본 `project.serengeti-cmp`는 clean 상태이며 HEAD는
  `43648689aa3efef214118a69dde5eafdac30a338`이다.

CLI 검증은 실제 사용자 홈·제품 설정과 원격 저장소에 적용하지 않은 격리 테스트다.
원격에 이 변경을 게시하거나 실제 Agent Hub 앱에 UI를 구현했다는 의미는 아니다.
