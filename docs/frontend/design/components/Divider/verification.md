# Divider — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Divider 문서 인덱스](./README.md)

## 12. 검증 체크리스트

새 프로젝트에서 재현 후 아래 항목을 확인한다.

- [ ] Horizontal 선 두께가 1px (2px 아님)
- [ ] Horizontal 선 길이가 컨테이너 가로폭 100%
- [ ] Horizontal 선 위/아래에 각각 8px 여백
- [ ] Vertical 선 두께가 1px
- [ ] Vertical 선 양옆에 각각 8px 여백
- [ ] Vertical 사용 시 부모 컨테이너가 높이를 가지면 선이 꽉 채워짐
- [ ] 라이트 모드 선 색상이 `#dddddd` (gray-300)
- [ ] 다크 모드 선 색상이 `#555555` (gray-700)
- [ ] 색상이 `--border-default` 토큰 참조 (hex 하드코딩 없음)
- [ ] 다크 모드 토글 시 선 색상이 240ms ease로 부드럽게 전환
- [ ] Divider 자체만 애니메이션 (페이지 전체 fade 아님)
- [ ] `prefers-reduced-motion: reduce` 시 전환 애니메이션 즉시 처리

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 Divider을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
