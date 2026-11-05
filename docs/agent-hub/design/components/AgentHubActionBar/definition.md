# AgentHubActionBar — 정의와 공용 차이

선택 집합을 가진 목록·테이블 위에 일괄 작업을 모으는 표면입니다.
선택 ID/실행/권한은 목록 owner가 소유하며 ActionBar가 목록과 별개 선택 집합을 만들지 않습니다.

## 실제 관찰 속성과 조합

| 원본 속성 | 기본값/종류 | 의미 |
| --- | --- | --- |
| size | 48 / 40, 기본48 | bar 높이와 내부 action 규격 |
| count | `2개 선택됨` | 비교 문자열, 실제 개수와 복수형/locale은 제품 소유 |
| showCount | true | leading 개수 문구 표시 |
| action1, action2, action3 | true | 주요 작업1~3 슬롯 표시 |
| action4, action5 | false | 추가 주요 작업 슬롯 표시 |
| actionDanger | true | 구분선 뒤 위험 명령 슬롯 표시 |
| divider | true | 위험 명령 앞 세로 구분선 표시 |
| more | false | overflow 메뉴 조작 표시 |
| close | true | 선택 해제 조작 표시 |

생성 property는 표시 제어입니다. Boolean을 권한 판정·요청 상태·자동 responsive 계산으로 취급하지 않습니다.
주요 action의 라벨·leading icon·state를 instance panel에서 바꾸도록 노출한다는 원본 설명을 보존합니다.
관찰 sample의 두 번째 명령 ‘원본 채팅 보기’는 disabled이며 실제 glyph도 label과 같은 #8F8F8F입니다. 독립 action disabled의 glyph #AAAAAA와 다른 인스턴스 override입니다. ‘삭제’는 red가 아닌 흰 foreground를 사용합니다.
실제 명령 내용과 enabled 조건은 제품이 결정합니다.

```text
root inverse surface
├─ leading: 선택 개수 문구 (showCount)
└─ actions
   ├─ main
   │  ├─ primary-actions: action1…5, more
   │  ├─ divider
   │  └─ action-danger
   └─ close
```

## 공용에서 계승하고 바꾸는 범위

| 항목 | 공용 baseline | Agent Hub 관찰 |
| --- | --- | --- |
| 의미 | 다중 선택 일괄 작업·외부 상태 소유 | 유지 |
| bar 크기 | h48, radius4, 좌우12 | h48/40, radius8, 좌우20/12 또는16/8 |
| leading | 선택 아이콘32 + count | count만, 왼쪽 선택해제 아이콘 없음 |
| 일반 action glyph | 18px | 16px 원본, SVG 실제 stroke1px |
| 일반 action | h32/radius4 | h32/radius6 또는 h28/radius4 |
| icon-action | 32/radius4 | 32/radius6,20px 원본 |
| hover/pressed | inverse alpha 기반 구분 | 두 상태 모두 solid #333333 |
| 비활성 | 실행 차단과 상태 전달 | 유지. label #8F8F8F, glyph #AAAAAA로 별도 처리 |
| focus | 키보드 focus-visible 필수 | 유지. 이번 Figma에 독립 focus variant는 없음 |

공용 dark/alpha recipe를 그대로 적용하여 관찰된 #333을 바꾸지 않습니다.
기존 AgentHubIconButton이나 다른 inverse 버튼과 모든 값이 같다는 뜻은 아닙니다. AgentHubIconButton에 inverse variant가 확인됐다는 의미도 아닙니다.
이 bar의 특화 part로 연결하고 실제 호환되는 source가 있는지 제품에서 확인합니다.
