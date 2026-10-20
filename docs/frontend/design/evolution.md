# 공용 컴포넌트 변경·폐기 정책

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

공용 컴포넌트는 여러 솔루션의 계약이다. 시각 수정이라도 DOM, focus, token, 크기, 기본값이 바뀌면
소비 화면에 영향을 줄 수 있으므로 호환성 수준을 먼저 분류한다.

## 변경 분류

| 분류 | 예 | 요구사항 |
| --- | --- | --- |
| 호환 수정 | 문서 오탈자, 동일 계약의 버그 수정, 내부 최적화 | 관련 검증과 변경 기록 |
| 호환 확장 | optional prop·variant 추가, 기존 기본값 유지 | 기존 사용처 회귀 검증, 문서·레지스트리 갱신 |
| breaking change | prop 제거/rename, 기본값·DOM·keyboard 변경, token 의미 변경 | migration, 영향 검색, 버전 또는 release 기록 |
| 폐기 | 더 이상 권장하지 않는 컴포넌트·variant | replacement와 제거 조건을 레지스트리에 명시 |

## 변경 절차

1. 기존 제품 유지보수에서는 레지스트리의 source/export와 실제 사용처를 검색한다. 문서 전용 package는
   component id/alias/docs/dependency와 공개 API 소비 계약을 검색하며 source path를 추정하지 않는다.
2. 변경 전 public props, DOM semantics, 상태, token, dependency closure를 기록한다.
3. 호환 확장으로 해결할 수 있는지 먼저 검토한다. 호출부를 전부 동시에 바꿔야 하면 breaking 가능성이 높다.
4. 코드, 테스트, 컴포넌트 문서, 레지스트리를 같은 변경 단위로 갱신한다.
5. 시각·접근성 회귀와 주요 소비 화면을 검증하고 migration 결과를 기록한다.

## Deprecated 운영

폐기할 때 즉시 삭제하거나 같은 이름의 의미를 바꾸지 않는다. 기존 제품 구현이 연결된 레지스트리는
다음처럼 갱신한다. 문서 전용 package는 source/export 없이 replacement, note, version 계약만 기록한다.

```json
{
  "status": "deprecated",
  "source": null,
  "export": "@aifrica/ui/LegacyThing",
  "replacement": "NewThing",
  "deprecatedSince": "2026-08",
  "removeAfter": "모든 소비처 migration과 다음 major release"
}
```

- replacement가 없으면 이유와 대체 조합을 문서에 적는다.
- alias는 migration 기간 동안 검색 가능하게 유지한다.
- 폐기 경고는 개발 환경에서만 제공하고 사용자 화면에 노출하지 않는다.
- 제거 전 실제 import가 0인지 확인한다. 문서 목록만 보고 사용처가 없다고 판단하지 않는다.

## 버전과 배포

- 독립 UI package가 있으면 semantic versioning을 적용하고 breaking change는 major에 포함한다.
- monorepo 내부 코드라면 PR과 release note에 영향 화면과 migration을 남기고 원자적으로 소비처를 갱신한다.
- token 이름 변경은 CSS 변수 fallback 또는 migration 기간을 제공한다.
- Figma와 코드가 따로 배포되면 어느 쪽이 먼저 적용 가능한지와 혼합 기간의 동작을 기록한다.

## 금지 사항

- 기존 컴포넌트 이름은 유지한 채 전혀 다른 의미와 keyboard 모델로 교체하지 않는다.
- deprecated 컴포넌트를 신규 화면에 사용하지 않는다.
- breaking change를 “리팩터링”으로만 표시하지 않는다.
- 프로젝트별 임시 fork를 공용 컴포넌트와 같은 export 이름으로 만들지 않는다.
