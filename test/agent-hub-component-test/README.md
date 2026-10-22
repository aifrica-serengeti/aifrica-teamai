# Agent Hub Component Lab

TeamAI로 받은 가이드라인을 읽고 만든 React 컴포넌트 테스트 앱입니다. Agent Hub 전용 계약 **59종**을 네 그룹으로 나눠 직접 눌러볼 수 있습니다. 폼 adapter3종도 포함합니다.

## 실행하기

이 폴더에서 실행해 주세요.

```bash
# 테스트 앱의 패키지를 설치합니다.
npm ci

# 현재 aifrica-teamai의 최신 문서·스킬을 TeamAI CLI로 받고 자산을 준비합니다.
# 처음 실행하거나 원본 가이드를 수정했을 때 실행해 주세요.
# teamai-cli@0.27.0이 필요합니다: npm install -g teamai-cli@0.27.0
npm run teamai:sync

# 바뀐 계약에 맞춰 실제 export 매핑을 다시 만듭니다.
node scripts/create-mapping.mjs

# 로컬 테스트 화면을 엽니다. 터미널에 표시된 Local 주소로 접속해 주세요.
npm run dev
```

`teamai:sync`는 이 저장소의 **현재 작업본**을 임시 Git 저장소로 복제한 다음 실제 `teamai init → pull --force → doctor`를 실행합니다. 아직 push하지 않은 가이드도 이 방식으로 확인할 수 있습니다. 역할은 `frontend-common`, 솔루션은 `agent-hub`, 도구는 `codex,claude`입니다.

수신한 문서는 `.teamai/docs/`, 스킬은 `.codex/skills/`·`.claude/skills/`에서 확인할 수 있습니다. CLI의 사용자 설정·캐시·등록은 임시 HOME과 임시 Git 저장소에만 저장합니다. 실제 원격 저장소로 게시하지 않습니다. 받은 사본은 Git에서 제외하며 다시 생성할 수 있습니다.

## 화면에서 확인하기

| 메뉴              | 확인할 내용                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| 입력과 기본 요소  | 버튼, 아이콘 버튼, 칩, 검색, 체크박스, 스위치, 경로, 스크롤바와 원본 아이콘 전체 목록     |
| 탐색과 콘텐츠     | 캘린더, Picker, Menu, Flyout, 파일 행과 Card 5종                                          |
| 대화와 세션       | Composer, 사용자 메시지, 중단 안내, 예시 프롬프트, ThinkingStatus, Session과 OutputViewer |
| 헤더와 내비게이션 | Global/Chat Header, SNB, 예약 편집·에이전트 찾기 Dialog와 Footer                          |
| 컴포넌트 목록     | 수신한 59개 계약과 직접 의존 계약 검색                                                    |

선택·입력·열기·닫기·재시도는 이 앱의 로컬 예제 상태를 변경합니다. 실제 Agent Hub API에는 연결하지 않습니다.

최근 보완한 체크박스·Picker·Flyout·메시지 모션은 [상호작용 점검표](./INTERACTION-CHECKLIST.md)의 순서로 확인할 수 있습니다.

헤더 흐름은 **1800ms·linear·왼쪽→오른쪽·무한 반복이라는 제안값**을 사용합니다. 체크박스로 정적 표시와 비교할 수 있고, 운영체제의 동작 줄이기 설정에서는 정지합니다. ThinkingStatus는 경과 시간을 전달받고 글자 안의 밝은 띠만 움직입니다. Mark160/120ms·shimmer1800ms·halo1600ms는 Figma 실측과 구분한 제안값입니다.

브랜드 마크는 원본 PNG를 애니메이션 없이 표시합니다. 원본과 참고용 복원 SVG를 나란히 비교할 수 있으며, 복원 SVG의 가려진 영역과 그라데이션은 추정한 값입니다. 재생·일시정지 기능은 제공하지 않습니다.

## 코드 찾기와 검증

재사용할 컴포넌트는 `src/components/index.ts`에서 가져옵니다. [로컬 매핑](./component-registry.json)은 각 계약의 실제 source와 export를 연결하며 공용 원본의 registry는 변경하지 않습니다.

```bash
# 실제 React export 59개, 직접 의존 계약과 원본·복원 자산의 일치를 확인합니다.
npm run verify:contracts

# 계약·자산·전달 경로 자동 검사를 실행합니다.
npm test

# TypeScript와 프로덕션 번들을 검사합니다.
npm run build
```

이 앱의 채택 범위와 가이드 해석은 [구현 기록](./IMPLEMENTATION-NOTES.md), 파일별 책임은 [구조 안내](./ARCHITECTURE.md)에 정리했습니다. 원본 문서가 변경돼도 컴포넌트 코드가 자동으로 바뀌지는 않습니다. 다시 수신한 가이드와 구현을 비교해 주세요.
