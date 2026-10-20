# SNB v2 — 검증과 재현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v2 문서 인덱스](README.md)

## 12. 검증 체크리스트

- [x] Expanded 240px, collapsed 60px, header 48px geometry를 이 문서의 재현 잠금 기준과 비교했다.
- [x] 1·2·3depth leaf selection, active-descendant text, branch close 뒤 selection 보존을 확인했다.
- [x] 1→2 및 2→3 branch가 0fr→1fr animation과 4px start gap으로 열린다.
- [x] Collapsed leaf Tooltip, branch Menu, nested MenuSub의 3depth selection을 확인했다.
- [x] 첫 collapsed group 앞 divider가 없고 divider가 36px이며, utility icons가 footer avatar 바로 위에 고정된다.
- [x] Collapsed ScrollArea가 header 바로 아래에서 시작하고 thumb가 rail right edge에 위치한다.
- [x] Scroll top/middle/bottom마다 header/frame divider가 한 줄씩만 표시되고 0.2s color transition을 확인했다.
- [x] Global Header v2와 collapsed state를 공유하고 radius가 content wrapper에만 적용됨을 확인했다.
- [x] Tab, Enter, Space, focus-visible, aria-expanded, aria-current, disabled, Menu/Tooltip keyboard 동작을 확인했다.
- [x] Light/dark semantic token과 각 color transition을 확인했다.
- [x] pnpm typecheck, pnpm lint, pnpm build를 통과했다.

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 SNBV2을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: 이 문서의 레이아웃·상태·14절 Icon contract·15절 fixture·16절 canonical source와 의존 컴포넌트 closure, 폰트를 함께 확보한 뒤 구현한다. 메뉴 icon asset은 전달물에 포함하지 않는다.
- **소유권**: 상위 application shell이 화면 간 shared state와 frame 배치를 소유하고, 이 컴포넌트는 문서에 적힌 고정 geometry와 내부 interaction만 소유한다. SNB와 Global Header의 v1/v2 조합은 섞지 않는다.
- **변형 금지**: 문서에 없는 viewport 기반 collapse, shell radius 중복, sibling local state 분리는 금지한다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트를 기준 viewport에서 수행한다. 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.

## 15. 필수 검증 fixture

새 환경의 첫 화면은 임의의 Functions·관리·사용자 관리 data가 아니라 아래 fixture로 렌더한다.
이 fixture가 정확히 보인 뒤에만 실제 제품 menu data를 연결한다. fixture의 배열을 줄여서
1depth leaf만 남기거나, 독자적인 section 이름으로 바꾸면 1·2·3depth, scroll, branch 상태를
검증할 수 없으므로 실패다. `user`도 생략하지 않고 아래 값을 명시한다.

~~~tsx
import { useState } from 'react'

import { SNBV2, type SNBV2ItemData, type SNBV2SectionData } from './SNBV2'

const referenceAssetItems: readonly SNBV2ItemData[] = [
  { id: 'model-agent', label: '모델/에이전트', icon: 'model-agent' },
  { id: 'dataset', label: '데이터셋', icon: 'dataset' },
  { id: 'volume', label: '볼륨', icon: 'volume' },
  { id: 'annotation', label: '어노테이션/라벨링', icon: 'annotation' },
  { id: 'user-image', label: '사용자 이미지', icon: 'user-image' },
  {
    id: 'asset-model-management', label: '모델 관리', icon: 'model-agent',
    children: [
      { id: 'asset-model-registry', label: '모델 레지스트리' },
      {
        id: 'asset-model-version', label: '모델 버전',
        children: [
          { id: 'asset-model-version-draft', label: '초안' },
          { id: 'asset-model-version-review', label: '검토 요청' },
          { id: 'asset-model-version-release', label: '릴리스' },
        ],
      },
      { id: 'asset-model-deployment', label: '배포 이력' },
      { id: 'asset-model-archive', label: '보관 모델' },
    ],
  },
  {
    id: 'asset-data-management', label: '데이터 관리', icon: 'dataset',
    children: [
      { id: 'asset-data-source', label: '데이터 소스' },
      {
        id: 'asset-dataset-version', label: '데이터셋 버전',
        children: [
          { id: 'asset-dataset-version-current', label: '현재 버전' },
          { id: 'asset-dataset-version-history', label: '변경 이력' },
        ],
      },
      { id: 'asset-data-quality', label: '품질 규칙' },
      { id: 'asset-data-retention', label: '보관 정책' },
    ],
  },
  {
    id: 'asset-image-management', label: '이미지 관리', icon: 'user-image',
    children: [
      {
        id: 'asset-image-collection', label: '이미지 컬렉션',
        children: [
          { id: 'asset-image-public', label: '공개 이미지' },
          { id: 'asset-image-private', label: '비공개 이미지' },
        ],
      },
      { id: 'asset-image-tag', label: '태그 관리' },
      { id: 'asset-image-usage', label: '사용 현황' },
    ],
  },
  { id: 'asset-feature-store', label: '피처 스토어', icon: 'dataset' },
  { id: 'asset-prompt-library', label: '프롬프트 라이브러리', icon: 'annotation' },
  { id: 'asset-embedding', label: '임베딩 저장소', icon: 'volume' },
  { id: 'asset-evaluation', label: '평가 결과', icon: 'reports' },
  { id: 'asset-export', label: '내보내기', icon: 'schedule' },
]

export const snbV2ReferenceSections: readonly SNBV2SectionData[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    items: [
      { id: 'dashboard', label: '대시보드', icon: 'dashboard' },
      { id: 'monitoring', label: '모니터링', icon: 'monitoring' },
      { id: 'usage-monitoring', label: '사용량 모니터링', icon: 'usage-monitoring' },
      { id: 'reports', label: '보고서', icon: 'reports' },
    ],
  },
  {
    id: 'workspaces',
    title: 'Workspaces',
    items: [
      { id: 'workspace', label: '워크스페이스', icon: 'workspace' },
      { id: 'workflow', label: '워크플로우', icon: 'workflow' },
      { id: 'job-scheduling', label: '잡스케쥴링', icon: 'job-scheduling' },
      { id: 'schedule', label: '스케쥴', icon: 'schedule' },
    ],
  },
  { id: 'assets', title: 'Assets', items: referenceAssetItems },
]

const referenceDefaultExpandedIds = [
  'asset-model-management',
  'asset-model-version',
  'asset-data-management',
  'asset-dataset-version',
  'asset-image-management',
  'asset-image-collection',
] as const

export const snbV2UtilityItems: readonly SNBV2ItemData[] = [
  { id: 'settings', label: '설정', icon: 'settings' },
  { id: 'support', label: '고객지원', icon: 'support' },
  { id: 'notification', label: '알림', icon: 'notification' },
]

export function SNBV2ReferenceFixture() {
  const [activeId, setActiveId] = useState('model-agent')
  return (
    <div style={{ height: 640 }}>
      <SNBV2
        sections={snbV2ReferenceSections}
        utilityItems={snbV2UtilityItems}
        activeId={activeId}
        onActiveChange={setActiveId}
        defaultExpandedIds={referenceDefaultExpandedIds}
        user={{ initials: 'TA', name: 'Tami admin', email: 'm@example.com' }}
      />
    </div>
  )
}
~~~

검증 fixture에서 다음이 하나라도 다르면 실패다.

- 240px expanded root와 60px collapsed root가 blue shell 하나로 보인다.
- `aside`, header, nav, ScrollArea, section 어느 곳에도 흰 card, border, outer radius, shadow가 없다. 흰색은 collapsed popup portal에만 있다.
- Dashboard, Workspaces, Assets의 세 section과 설정, 고객지원, 알림 utility가 모두 있다. 관리/사용자 관리/그룹 관리처럼 fixture에 없는 메뉴가 보이면 실패다.
- 기본 activeId인 모델/에이전트는 Assets 안에서 leaf selected surface와 4×24 indicator를 가진다. Assets의 모델 관리·데이터 관리·이미지 관리는 열린 1→2→3depth를 보이며 nav overflow가 발생한다.
- 모든 1depth/utility glyph은 공용 Icon으로 렌더하며 raw SVG import가 없다.
- 서비스 관리와 소프트웨어의 POC 의미 아이콘이 expanded/collapsed 상태에서 각각 briefcase와 application window로 구분된다.
- footer는 `TA` initials, `Tami admin` / `m@example.com`, indigo 32px rounded avatar, CSS online dot으로 보인다.

## 보조 메뉴 trigger 조합

expanded/collapsed utility leaf의 slot 적용, 기본 trigger의 label/disabled 보존, 일반 branch 미적용을 확인한다. Popover 조합은 닫힘·focus 복귀·클릭 시 route 비이동과 내부 전체 목록 이동을 검증한다.


## 계정 메뉴 슬롯

계정 메뉴 슬롯을 연결해 펼친 more 버튼과 접힌 아바타에서 메뉴 열기·Escape 닫기·트리거 포커스 복귀를 확인한다. 메뉴의 다국어 accessible name, pending/disabled 및 light/dark 표현을 검증한다.
