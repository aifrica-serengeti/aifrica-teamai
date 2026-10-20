# 콘텐츠·국제화 가이드

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 Aifrica 솔루션에서 사용자 문구, 날짜·숫자, 상태명, 접근성 문구를 일관되게 표현하는
기준이다. 제품별 전문 용어 사전이 있으면 그 사전을 우선하고, 공통 표현은 이 문서를 따른다.

## 브랜드와 명칭

- 회사명은 `Aifrica`, 디자인 시스템명은 `Aifrica Design System`으로 표기한다.
- 레거시 asset 파일명은 기술 식별자로 유지할 수 있지만 현재 브랜드나 디자인 시스템 이름처럼 설명하지 않는다.
- 같은 개념에 화면마다 다른 한국어·영어 명칭을 만들지 않고 domain의 용어 매핑을 한 곳에서 관리한다.

## 번역 리소스

- 사용자에게 보이는 문구는 feature locale resource 또는 전역 common locale resource에 둔다.
  directory 이름은 소비 프로젝트가 정하며 component/page에 translation key 문자열을 직접 표시하지 않는다.
- key는 원문 전체가 아니라 의미를 사용한다. 예: `user.create.actions.submit`, `common.errors.network`.
- 공통이라고 확정되지 않은 domain 문구를 `common` namespace에 넣지 않는다.
- 기본 locale과 fallback locale을 명시하고 번역 key 누락을 production에서 key 문자열 그대로 노출하지 않는다.
- 변수는 문자열 결합 대신 interpolation과 복수형 규칙을 사용한다.

## UI 문구 원칙

- Button은 결과가 드러나는 동사로 쓴다: `등록`, `저장`, `삭제`, `다시 시도`.
- title은 대상과 상태를 포함한다: `사용자 등록`, `모델 상세 정보`.
- 오류는 무엇이 실패했는지와 다음 행동을 함께 안내하고 사용자를 탓하지 않는다.
- placeholder는 label을 대신하지 않는다. label 없이 placeholder만 제공하지 않는다.
- Tooltip은 accessible name의 유일한 출처로 사용하지 않는다. icon-only action에는 `aria-label`도 제공한다.
- 동일 action의 Button, Tooltip, Dialog 용어를 통일한다.
- Select의 option label·description·selected value·loading/empty/error와 `aria-label`도 번역 대상이다.
  번역 누락 시 key/API enum을 그대로 내보내지 않고 검토된 safe fallback을 사용한다.
- field description은 사용자가 선택 전에 알아야 할 핵심 용도·영향 한 문장으로 작성한다. API 문서 전체나
  반복 설명을 그대로 노출하지 않고 좁은 폭에서 자연스럽게 wrap한다.

## 날짜·시간·숫자

- 화면 표시에는 `Intl.DateTimeFormat`, `Intl.NumberFormat` 또는 이를 감싼 공용 formatter를 사용한다.
- API timestamp의 timezone과 화면에 표시할 timezone을 명시한다. timezone이 불명확한 값을 local time으로 추측하지 않는다.
- 정렬·필터·API payload에는 locale 표시 문자열이 아닌 원본 값 또는 표준 형식을 사용한다.
- 날짜 범위는 시작·종료 의미와 포함 여부를 명확히 한다.
- count와 pagination은 locale 숫자 형식을 사용하되 input/edit 값은 domain validation 규칙을 따른다.
- byte, duration, percent, currency는 단위와 반올림 정책을 공용 formatter에 고정한다.

## 상태와 오류 매핑

백엔드 enum을 컴포넌트에 그대로 출력하지 않는다. domain model에서 label, tone, i18n key를 함께 매핑한다.

```ts
export const statusPresentation: Record<TStatus, {
  labelKey: string;
  tone: "neutral" | "info" | "success" | "warning" | "danger";
}> = {
  READY: { labelKey: "job.status.ready", tone: "neutral" },
  RUNNING: { labelKey: "job.status.running", tone: "info" },
  FAILED: { labelKey: "job.status.failed", tone: "danger" },
  COMPLETED: { labelKey: "job.status.completed", tone: "success" },
};
```

알 수 없는 서버 값은 빈 문자열로 숨기지 않고 안전한 fallback과 관측 가능한 로그 정책을 사용한다.

## 레이아웃 검증

- 한국어, 영문, 숫자·ID가 섞인 문구를 확인한다.
- Button과 Tab은 기준 문구 대비 약 30% 긴 번역에서도 기능을 잃지 않아야 한다.
- URL, secret, ID는 `overflow-wrap: anywhere` 또는 명시적인 ellipsis+copy action을 사용한다.
- 문장을 임의 `<br>`로 고정하지 않는다. 디자인이 잠근 line break만 locale별로 검토한다.
- RTL locale을 지원하는 솔루션은 left/right 대신 inline start/end layout과 방향별 아이콘 의미를 검증한다.

## 접근성 문구

- `aria-label`, live region, validation error도 번역 대상이다.
- 동일한 icon button이 여러 행에 반복되면 대상 이름을 포함한다. 예: `홍길동 사용자 더보기`.
- loading 문구에는 대상과 진행 중임을 포함한다. 완료되지 않은 상태를 성공처럼 읽지 않는다.
- 화면에 보이지 않는 접근성 문구도 사용자에게 노출되는 제품 콘텐츠로 리뷰한다.
