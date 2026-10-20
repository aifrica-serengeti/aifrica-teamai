# SNB v1 — CMP shell 계약

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

공용 component dependency를 조합하는 CMP layout 계약이다. v1/v2는 서로 다른 공개 API와 상태 모델이므로 현재 제품에서 채택한 세대를 확인하고 혼용하지 않는다.

- [정의·구조·Props](./definition.md)
- [상태·이벤트](./behavior.md)
- [접근성](./accessibility.md)
- [제품 token·스타일 adapter](./styles.md)
- [검증 matrix](./verification.md)
- [구현 인덱스·예제](./implementation/README.md)

직접 의존성: `Icon`, `IconButton`, `Menu`, `Divider`, `Scrollbar`, `Tooltip`. 공통 registry와 이 CMP registry의 합집합에서 closure를 찾는다.

현재 제품의 source/public export·호출자를 확인하기 전에는 implemented로 기록하지 않는다. 구현 예제나 과거 source 경로를 실제 매핑으로 취급하지 않는다.
