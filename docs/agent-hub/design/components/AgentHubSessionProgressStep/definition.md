# AgentHubSessionProgressStep — 정의

원본 `2987:22132`는 `session/progress-step` COMPONENT_SET입니다.

| 실제 속성 | 타입 / 기본값 | 의미 |
| --- | --- | --- |
| `label#2987:0` | TEXT / 단계 이름 | 단계 문구 |
| `index#2987:4` | TEXT / 3 | pending 원 안에 표시하는 순번 문자열 |
| `connector#2987:8` | BOOLEAN / true | 아래 연결선 표시 |
| `status` | VARIANT / done | done·active·pending 세 원본 |

done `2987:22103`, active `2987:22114`, pending `2987:22122`를 확인했습니다.
원본 기본 done은 서버 요청의 기본 성공 상태가 아닙니다. status와 index는 제품의 실제 작업 단계에 명시적으로 연결합니다.
index는 TEXT이며 숫자 파싱·단계 개수·백분율·자동 완료 규칙이 아닙니다. done/active에서는 표시하지 않습니다.

| 부모의 실제 단계 | source status | index 문자열 | connector |
| --- | --- | --- | --- |
| 첨부 자료 분석 `2975:68163` | done | 1 | true |
| 부서별 실적 집계 `2975:68164` | active | 2 | true |
| 보고서 초안 작성 `2975:68165` | pending | 3 | true |
| 출력물 검증 `2975:68166` | pending | 4 | false |

이 네 단계 이름·순서·개수는 샘플이며 모든 업무의 고정 workflow가 아닙니다.
connector는 마지막 단계에서 끄는 표시 계약입니다. 마지막의 false는 실제 부모에서20px 높이로 확인했습니다.
원형 indicator는 전용 도형이며 클릭·되돌리기·이동 가능한 Stepper가 아닙니다.
