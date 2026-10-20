# 프론트엔드 로컬 스냅샷 갱신 정책

## 실행 원칙

- 갱신은 예약·월간·백그라운드 작업으로 실행하지 않는다.
- 사용자가 최신화·공식 재검증·보안 점검을 명시적으로 요청했을 때만 인터넷을 사용한다.
- 일반 프론트엔드 작업은 현재 스냅샷을 그대로 사용한다. 날짜가 지났다는 이유만으로 작업을
  중단하거나 공식 source를 다시 열지 않는다.
- 스냅샷의 확인일은 자동 만료일이 아니라 마지막으로 공식 내용을 반영한 기준일이다.

## 저장 범위

공식 문서를 그대로 복제하지 않고 Aifrica가 실제 구현 판단에 사용할 수 있도록 충분히 상세한
원문 요약과 운영 규칙을 저장한다.

- 공식 source URL과 확인일
- stable release 또는 living standard 기준
- 현재 프로젝트 채택 버전과의 차이
- breaking change, deprecation, security, runtime 요구사항
- Aifrica 구조·디자인 시스템에 영향을 주는 적용 결정
- 자주 사용하는 API·패턴의 선택 기준과 금지 패턴
- 접근성·상태·성능·보안·검증 체크리스트

새 API·Hook·syntax는 링크나 이름만 기록하지 않고 다음 지식 단위로 저장한다.

- 정확한 export/syntax와 최소 version 또는 web baseline
- 해결하는 문제와 사용하지 않아야 하는 조건
- AI가 변형해 쓸 수 있는 짧은 TypeScript/TSX/HTML/CSS 예제
- argument·return·state·lifecycle과 비직관적인 caveat
- 현재 project version/config/runtime/browser gate와 fallback
- [sources.json](./sources.json)의 `knowledgeTopics` 등록

## 큰 기술 문서의 상세 지식 팩

React·Next.js처럼 API 표면이 큰 기술은 한 guide에 모든 내용을 넣거나 짧은 최신 기능 표로 끝내지 않는다.

- 상위 `{technology}.md`: version gate, 공식 변화와 Aifrica 적용 결정
- `{technology}/README.md`: 작업 신호를 상세 pack으로 연결하는 index
- `{technology}/*.md`: API signature, lifecycle, 실패 조건, 예제, fallback과 검증
- `sources.json`: `knowledgeIndex`, `knowledgePacks`, `knowledgeTopics`

새 기능은 기존 concern pack을 먼저 갱신한다. 별도 lifecycle·runtime·security owner가 있어 기존 pack에 넣으면
탐색성이 나빠질 때만 새 pack을 만든다. 새 pack은 index에 작업 신호와 함께 연결한다. React·Next.js 상세
corpus는 요약 수준으로 다시 축소되지 않도록 검증기가 pack 수, link, topic, 예제와 최소 분량을 확인한다.

공식 문서 전체를 그대로 복사하지 않는다. AI가 독립적으로 구현할 수 있을 만큼 충분히 상세하게
paraphrase하되 tutorial 반복, 긴 원문 quote와 자동 생성 mirror는 저장하지 않는다.

## 공식 source 원칙

| 기술 | 1차 source | 보조 source |
| --- | --- | --- |
| React | `react.dev` reference, versions, blog | npm의 `react` package metadata |
| Next.js | `nextjs.org/docs`, `nextjs.org/blog` | npm의 `next` package metadata |
| HTML | WHATWG HTML Living Standard | MDN HTML reference와 browser compatibility |
| CSS | W3C CSSWG snapshot/module | MDN CSS reference와 browser compatibility |
| JavaScript | ECMA-262, TC39 finished proposal | MDN JavaScript reference |
| TypeScript | TypeScript Handbook와 공식 team blog | npm의 `typescript` package metadata |

검색 결과 요약, 개인 블로그, 생성형 답변만으로 기준을 바꾸지 않는다. 반드시 실제 공식 페이지를
열어 변경 내용을 확인한다.

## 사용자 요청 기반 갱신 절차

1. [sources.json](./sources.json)의 모든 source를 확인한다.
2. package가 있는 기술은 npm `latest`와 프로젝트 `package.json`을 각각 확인한다.
3. stable, RC, beta, canary, LTS/security channel을 섞지 않는다.
4. 지난 `lastChecked` 이후의 release·deprecation·security·browser baseline 변경을 비교한다.
5. 일반 작업에서 인터넷 없이 판단할 수 있도록 기술별 로컬 요약을 갱신한다. 변화가 없으면
   확인일과 확인 결과만 갱신한다.
6. 업그레이드는 자동 수행하지 않고 영향, migration, 필요한 검증을 보고한다.
7. 공용 저장소에서는 공용 원본 저장소의 `npm run verify`를 실행한다. 소비 저장소의 source 검증기가 있으면 실제 지원 옵션을 확인해 추가 실행한다.

## 갱신 결과 형식

```text
확인일: YYYY-MM-DD
기술: React | Next.js | HTML | CSS | JavaScript | TypeScript
공식 변경: 버전·표준·deprecation·security 요약
Aifrica 영향: none | docs | code | migration-review
수정 파일: 경로
업그레이드: 수행하지 않음 | 사용자 요청에 따라 별도 수행
검증: 실행한 명령과 결과
```

## 긴급 점검

사용자가 보안 공지, framework 지원 종료, critical browser baseline을 확인해 달라고 요청하면 일반
갱신보다 우선한다. 문서 갱신과 dependency upgrade·코드 migration·배포는 별도 작업이므로, 후자는
사용자의 명시적 요청 또는 저장소 운영 절차가 있을 때만 수행한다.
