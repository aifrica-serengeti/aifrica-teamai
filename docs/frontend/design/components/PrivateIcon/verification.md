# Private Icon — 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Private Icon](./README.md)

## 체크리스트

- [ ] name이 Figma Private icon master 또는 제품 제공 원본 자산과 일대일로 연결되는가?
- [ ] m, 4xl, 7xl에서 root와 img가 동일한 고정 size를 가지는가?
- [ ] SVG/PNG 모두 object-fit contain으로 잘림이나 왜곡 없이 보이는가?
- [ ] crop 자산이 6xl·7xl에서 반복 pattern 경계선 없이 보이는가?
- [ ] label이 있으면 img alt에 전달되고, 없으면 alt 빈 문자열로 장식 처리되는가?
- [ ] 소비 솔루션에 등록된 logical name이 실제 호출부의 원본 자산과 연결되는가?
- [ ] System Icon을 PrivateIcon으로 대체하거나, Private icon에 임의 색상 filter를 적용하지 않았는가?

## 자산 계약 검증

- 솔루션 asset manifest와 실제 파일, license·name type의 일치를 확인한다.
- 지정한 size에서 원본 비율과 shape가 보존되는지 확인한다.
- 자산이 빠진 경우 최종 구현의 누락으로 기록하고 미승인 브랜드로 자동 대체하지 않는다.
- 다른 size에서는 동일 원본을 비율 유지로 렌더한다.
