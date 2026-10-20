# Segmented Control

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Segmented Control 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)
- [TypeScript와 React 구현](./implementation/typescript.md)
- [사용 예제](./implementation/examples.md)

## 1. 개요

동일 범주의 여러 옵션 중 **하나**를 선택해 즉시 반영할 때 사용하는 컴포넌트다.
주로 보기 전환, 필터, 정렬에 활용한다. Tab 이 전체 화면 전환에 쓰인다면, Segmented Control 은
**화면 일부만** 바뀌는 상황에 적합하다.

**Multi 옵션 미지원**: Figma 에 Multi(다중 선택) 옵션이 있으나 "사용 빈도가 낮아 컴포넌트화 대상에서
제외" 되었다. Multi 가 필요하면 Single 컴포넌트를 깨서 사용한다. 본 스펙은 **Single(단일 선택)** 만 다룬다.

**기술 기반**: Radix UI `ToggleGroup`(`type="single"`)을 기반으로, 스펙(회색 컨테이너 +
흰 selected item, 상태별 오버레이, inset focus 링)으로 완전히 커스텀한다.

---

