# AgentHubBreadcrumbSeparator — 정의와 지원 범위

경로 항목 사이의 방향·구분을 나타내는 장식입니다. 원본의 variant 속성은 `.type`이며
slash·dash·arrow 세 가지입니다. 이 이름을 검증된 제품 props로 그대로 복사하지 않습니다.

| 유형 | 원본 | 보이는 내용 |
| --- | --- | --- |
| slash | 2427:25424 | `/` 텍스트 |
| dash | 2427:25426 | en dash `–` 텍스트 |
| arrow | 2427:25428 | 직접 그린 VECTOR 한 개 |

dash는 ASCII 하이픈 `-`나 minus 기호가 아닙니다. arrow도 글자 `>`나 임의의 lucide chevron으로 대체하지 않습니다.
arrow는 [원본 SVG](../../assets/breadcrumb/separator-arrow.svg)와 [자산 출처](../../references/breadcrumb.assets.json)를 사용합니다.

직접 의존하는 UI primitive는 없고 Icon·IconButton·TextButton 인스턴스도 없습니다.
slash·dash는 텍스트 하나, arrow는 vector 하나를 가진 컨테이너입니다. 독립 클릭·선택·focus·제거 기능을 제공하지 않습니다.

전체 Breadcrumb의 slash 인스턴스는 중복 원본 `2372:36931`을 사용합니다. 보이는 치수·내용을 요청한 slash와 비교하되
원본 ID와 로컬 semantic override를 구분합니다. Breadcrumb set 자체의 `separator` 옵션은 slash·arrow 두 개뿐입니다.
제품에서 dash 조합을 채택하려면 별도의 조합 근거와 검증을 남깁니다.
