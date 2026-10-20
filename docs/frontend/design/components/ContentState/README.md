# Content State

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System  
> 구현 컴포넌트: `ContentState`  
> 최종 갱신: 2026-09-22

`ContentState`는 상세 조회 실패, 접근 제한, 찾을 수 없음처럼 페이지 본문을 대체하는 상태의
아이콘·제목·설명·단일 복구 행동을 통일한다. 제목과 설명은 하나의 copy 묶음으로 구성해 서로 4px,
아이콘과 copy 및 copy와 action은 각각 16px 간격을 사용한다.
페이지가 별도 설명을 전달하지 않아도 상태와 사용자 locale에 맞는 기본 안내를 제공하므로 제목만
단독으로 노출하지 않는다.

## 문서

- [정의와 API](./definition.md)
- [시각 규칙](./styles.md)
- [동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)

목록의 empty·filtered·최초 error는 이 컴포넌트를 직접 쓰지 않고 목록 의미와 고정 action profile을
제공하는 [List Content State](../ListContentState/README.md)를 사용한다.
