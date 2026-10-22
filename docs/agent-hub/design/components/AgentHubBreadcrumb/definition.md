# AgentHubBreadcrumb — 정의와 재사용 관계

상위 경로 네 개와 현재 위치 한 개로 구성된 두 정적 샘플입니다. `separator` 옵션은 slash·arrow뿐이며
공개 앱 props나 경로 개수 정책을 정의하지 않습니다. sample `Link 1`~`Link 4`, `Current`는 실제 경로·번역으로 연결합니다.

열 개의 Item 인스턴스는 Figma 원본 `2372:36927`의 `BreadcrumbItem`을 재사용합니다.
각 구성의 앞 네 Item은 `.separator?#1673:0` Boolean이 true, 마지막 Item은 false입니다.
마지막 Item 뒤에 구분자나 여백을 추가하지 않습니다. 이 Boolean은 Figma의 구분자 표시 값이며 현재 페이지를 판정하는 앱 API가 아닙니다.

slash 구성의 네 구분자는 원본 `2372:36931`을 참조합니다. 요청한 Separator set의 slash `2427:25424`와
보이는 치수·모양을 대조한 중복 원본이며, 원본 ID를 서로 같은 노드로 바꾸어 기록하지 않습니다.
원본 slash의 외부 semantic 참조와 달리 보이는 인스턴스의 글자는 로컬 semantic으로 override돼 있습니다.
arrow 구성의 네 구분자는 `2427:25428`을 참조합니다. 정확한 source·변수 기록은 [실측](../../references/breadcrumb.figma.json)을 봅니다.

아이템과 구분자의 native 역할은 제품에서 공용 Breadcrumb 계약으로 연결합니다. 이 두 구성에는 TextButton·IconButton
인스턴스나 축약 메뉴가 없습니다. 텍스트가 조작 가능하다는 이유로 TextButton의 padding·radius·배경을 적용하지 않습니다.

직접 의존 계약은 `Breadcrumb`, `AgentHubBreadcrumbSeparator`입니다. Separator 자체에는 dash 유형도 있지만
이 Breadcrumb set에는 dash 구성이 없습니다. primitive의 지원 범위를 상위 구성에서 검증한 것으로 확대하지 않습니다.
실제 source/public export와 router adapter는 소비 저장소에서 확인한 뒤 로컬 매핑에 기록합니다.
