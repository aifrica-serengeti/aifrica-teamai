# Design 추출 감사 기록

관찰·작성일: 2026-10-20 (Asia/Seoul). 원본 저장소는 읽기 전용으로 조사했다. 이 기록은 TeamAI 배포용 `docs/` 밖에 두어 일반 팀 지침으로 자동 유통하지 않는다.

## 출처와 변경 범위

- 원본: `project.serengeti-cmp`, commit `77255b90832ca1c6114dd32c02631c44e345522c`. 원본 working tree: `clean`.
- 입력 계약으로 원본 `AGENTS.md`와 `docs/frontend/ai-prompt.md`를 읽었다. 기존 frontend 스킬을 이번 추출 작업의 제품 전용 실행 규칙으로 적용한 것이 아니라, 공용화할 작업 계약을 조사했다.
- `docs/design` 전체 543개 파일을 inventory·SHA-256 기준으로 조사·분류했다. 컴포넌트 55개와 source registry metadata, `src/styles/theme.css.ts`, `global.css.ts`, `serengeti-cmp-theme.css.ts`, `list-page.css.ts`, 실제 registry source 경로의 존재를 대조했다.
- 출력: [공통 디자인 가이드](../docs/frontend/design/README.md), [공통 registry](../docs/frontend/design/component-registry.json), [미채택 관찰값](./jdc/observed-design.json).
- 원본 파일은 수정하지 않았다. 원본 commit·문서 checksum은 추출 근거이며 소비 솔루션 구현 존재의 증거가 아니다.

## 보존·분리 결정

| 항목 | 결정 | 근거 |
| --- | --- | --- |
| 51개 공용 컴포넌트 | 필수 6문서와 기존 구현 snippets를 상세 보존 | 의미·public API·state·keyboard/focus·token·verification을 한 문단 요약으로 대체하지 않음 |
| SNBV1·SNBV2·GlobalHeaderV1·GlobalHeaderV2 | 공통 registry에서 제외, 저자 저장소 audit/JDC 관찰 자료로 보존 | 제품 navigation/header geometry·자산·세대 조합은 솔루션 UX |
| PageHeader | 공통 참조 계약 유지 | page title·action·tab 역할은 재사용 가능, 배치·크기는 선택 profile |
| PrivateIcon | 공통 size·alt·렌더링 계약 유지, vendor 목록·특정 SVG 요구 제거 | 브랜드·name type·asset manifest는 솔루션 소유 |
| Color·Elevation·Typography·Layout | 상세 표·token·코드를 추출 baseline으로 보존 | 회사 승인 규격이라는 주장 없이 채택 여부·override 기록 필요 |
| primary | 특정 색 기본값 제거 | `--solution-primary/on-primary/primary-subtle`, `--accent-*`를 솔루션 light/dark 입력으로 받음 |
| neutral·border·type | 역할과 baseline 보존 | 중립 palette·font family·radius 역시 별도 승인/채택 근거 없이 회사 표준으로 단정하지 않음 |
| List/Create/Detail | 상세 조립·상태 전이·a11y·검증 공용 유지 | 사용자 요구에 따라 세 페이지 가이드를 공용화; 숫자 geometry·List defaults·도메인 적용 사례 분리 |
| API 피드백 | 공통 수명·단일 owner·retry·복구 정책으로 재작성 | 제품별 호출 수·line number·승인 gate·poll interval을 공통 규칙에서 제거 |
| registry implementation | 51개 모두 `unmapped`, `source:null`, `export:null` | 원본 source/export를 새 솔루션 구현으로 오인하지 않음; docs 경로는 registry 기준 상대경로 |
| 재현 프로토콜 | source tree·alias·asset에 독립적인 mapping/검증 절차로 재작성 | font·binary·runtime 미포함 상태의 100% 재현 주장 제거 |
| dashboard mockups 5개 | 공통 배포 제외, 원본 SHA만 inventory에 기록 | 제품 dashboard 요구·브랜드·이미지 구성을 공통 규칙으로 사용하지 않음 |

## 실제 관찰과 공통 규칙의 차이

원본 공통 theme의 primary는 light `#0066ff`, dark `#3384ff`다. 보라색은 제품 SNB 전용 override에서 관찰되었다. 이를 “회사 전체 primary는 보라색”으로 승격하지 않았다. 공통 문서의 blue/purple 이름은 raw·categorical palette로 남을 수 있으나 primary의 자동 기본값이 아니다.

원본의 1072px 업무폭, 1120px band, 320px Card 최소폭, 899/699px 전환, List table 20·card 24개 및 options·300ms debounce, shell 240/60px rail 등은 `observed-design.json`과 저자 저장소의 `audit/jdc/design/` 원문 관찰 자료에 보존했다. 공통 페이지는 역할 변수·profile 입력을 사용한다. JDC는 `observed-unadopted`, `isDefault:false`, `adoption.enabled:false`이며 CMP 전체·PaaS·Agent Hub에 자동 적용하지 않는다.

## 보존량과 독립 검증

- 공통 Markdown 501개, registry JSON 1개. 컴포넌트 Markdown 480개, 그중 `implementation/` snippets 173개. 컴포넌트 51개 × 필수 6개 = 306개 필수 문서 모두 존재.
- 공통 컴포넌트 문서 입력 1,945,770 bytes → 출력 2,148,428 bytes. 상세 계약을 보존하고 참조 수준·mapping 경계를 추가했다.
- 미배포 감사 자료 `audit/jdc/design/`의 Markdown 44개: 전용 shell 원문 37개, 원본 page 3개·foundation 4개. 관찰값 JSON은 `audit/jdc/observed-design.json`에 별도 유지한다. Backend+CMP 배포에서도 frontend 문서에 대한 의존성을 만들지 않도록 상세 원문은 감사 자료로 분리했다.
- registry 51개 상대 docs 경로, 모든 direct dependency id, null/unmapped metadata, 소유 문서 전체 상대링크 검사: 통과.
- 공통 Markdown의 제품명·원본 source 전용 경로·`@/` alias·전용 shell id 잔존 검사: 통과.
- 공통 page pattern의 1072/1120/320px/899px/699px·table/card 고정 개수 잔존 검사: 통과.
- 소비 제품 구현의 typecheck/lint/build·브라우저 시각·접근성 실행 검증은 수행 범위가 아니다. 이 작업은 문서·참조 스킬 배포이며 실행 UI를 제공하지 않는다. 저장소 전체 `npm run verify`·`npm test` 결과는 상위 작업에서 별도로 확인한다.

## 남은 한계

- reference API·snippets는 원본의 계약을 유지한다. 모든 예제를 독립 패키지로 컴파일한 결과가 아니므로 소비 솔루션 package/config/public mapping을 확인한 뒤 사용한다.
- Calendar/DatePicker의 국가·날짜 표기와 Dialog/Notification의 크기·수명, 폼의 option viewport 등 수치는 채택 가능한 baseline이다. 솔루션 locale/interaction profile에 차이를 기록하고 public API를 바꾸면 migration·검증을 추가한다.
- 원본 Figma node·출처 링크는 provenance이며 이번 작업에서 네트워크로 재검증하지 않았다. 실제 font·logo·private icon binary는 번들하지 않았다.
- 전체 design 원문은 세부 API·동작을 유지했지만 제품 domain·원본 경로·구현됨 주장·고정 primary는 추상 계약으로 수정했다. 원문 자체의 정확성을 새 제품에서 자동 보증하지 않는다.
- JDC profile 관찰 자료에 남은 원본 경로·제품명·checksum은 감사 근거이며 그 profile을 채택해도 실제 export·자산 검증을 대신하지 않는다.

## 원본 component implementation metadata 조사

원본 status 분포: `implemented` 32개, `unmapped` 23개. source 파일 존재 확인은 관찰 시점만 뜻한다. 공통 registry의 값은 모두 초기화했다.

| id | 원본 status | 원본 source | source 존재 | 출력 분류 |
| --- | --- | --- | --- | --- |
| ActionBar | implemented | `src/core/components/common/action-bar/ActionBar.tsx` | yes | common-reference-contract |
| AsyncContentState | implemented | `src/core/components/common/refresh-content-overlay/RefreshContentOverlay.tsx` | yes | common-reference-contract |
| ContentState | implemented | `src/core/components/common/content-state/ContentState.tsx` | yes | common-reference-contract |
| Avatar | unmapped | `null` | no/unmapped | common-reference-contract |
| Badge | unmapped | `null` | no/unmapped | common-reference-contract |
| Breadcrumb | unmapped | `null` | no/unmapped | common-reference-contract |
| Button | implemented | `src/core/components/common/button/Button.tsx` | yes | common-reference-contract |
| Calendar | implemented | `src/core/components/layout/calendar/Calendar.tsx` | yes | common-reference-contract |
| Card | implemented | `src/core/components/layout/card/Card.tsx` | yes | common-reference-contract |
| CardAccordion | implemented | `src/core/components/layout/card-accordion/CardAccordion.tsx` | yes | common-reference-contract |
| Checkbox | unmapped | `null` | no/unmapped | common-reference-contract |
| Chip | unmapped | `null` | no/unmapped | common-reference-contract |
| DatePicker | implemented | `src/core/components/shadcn/date-picker/DatePicker.tsx` | yes | common-reference-contract |
| DetailField | unmapped | `null` | no/unmapped | common-reference-contract |
| DetailSection | implemented | `src/core/components/layout/detail-section/DetailSection.tsx` | yes | common-reference-contract |
| Dialog | implemented | `src/core/components/layout/dialog/Dialog.tsx` | yes | common-reference-contract |
| Divider | unmapped | `null` | no/unmapped | common-reference-contract |
| Dropdown | unmapped | `null` | no/unmapped | common-reference-contract |
| EditConfirmationDialog | implemented | `src/core/components/common/edit-confirmation-dialog/EditConfirmationDialog.tsx` | yes | common-reference-contract |
| GlobalHeaderV1 | unmapped | `null` | no/unmapped | observed-shell |
| GlobalHeaderV2 | unmapped | `null` | no/unmapped | observed-shell |
| Icon | implemented | `src/core/components/common/icon/Icon.tsx` | yes | common-reference-contract |
| PrivateIcon | implemented | `src/core/components/common/private-icon/PrivateIcon.tsx` | yes | common-reference-contract |
| IconButton | unmapped | `null` | no/unmapped | common-reference-contract |
| Input | implemented | `src/core/components/shadcn/input/Input.tsx` | yes | common-reference-contract |
| InputListField | unmapped | `null` | no/unmapped | common-reference-contract |
| Link | unmapped | `null` | no/unmapped | common-reference-contract |
| Menu | unmapped | `null` | no/unmapped | common-reference-contract |
| ListContentState | implemented | `src/core/components/common/list-content-state/ListContentState.tsx` | yes | common-reference-contract |
| Notification | implemented | `src/core/components/common/notification/Notification.tsx` | yes | common-reference-contract |
| NumberInput | implemented | `src/core/components/shadcn/number-input/NumberInput.tsx` | yes | common-reference-contract |
| OpenPanel | implemented | `src/core/components/layout/open-panel/OpenPanel.tsx` | yes | common-reference-contract |
| PageHeader | implemented | `src/core/components/layout/page-header/PageHeader.tsx` | yes | common-reference-contract |
| Pagination | implemented | `src/core/components/layout/pagination/Pagination.tsx` | yes | common-reference-contract |
| Radio | implemented | `src/core/components/shadcn/radio/Radio.tsx` | yes | common-reference-contract |
| SNBV1 | unmapped | `null` | no/unmapped | observed-shell |
| SNBV2 | implemented | `src/core/components/layout/snb-v2/SNBV2.tsx` | yes | observed-shell |
| Scrollbar | implemented | `src/core/components/layout/scrollbar/ScrollArea.tsx` | yes | common-reference-contract |
| Search | unmapped | `null` | no/unmapped | common-reference-contract |
| SegmentedControl | implemented | `src/core/components/shadcn/segmented-control/SegmentedControl.tsx` | yes | common-reference-contract |
| Select | implemented | `src/core/components/shadcn/select/Select.tsx` | yes | common-reference-contract |
| Slider | implemented | `src/core/components/shadcn/slider/Slider.tsx` | yes | common-reference-contract |
| Skeleton | implemented | `src/core/components/shadcn/skeleton/Skeleton.tsx` | yes | common-reference-contract |
| Spinner | implemented | `src/core/components/common/spinner/Spinner.tsx` | yes | common-reference-contract |
| SplitButton | implemented | `src/core/components/common/split-button/SplitButton.tsx` | yes | common-reference-contract |
| Status | unmapped | `null` | no/unmapped | common-reference-contract |
| Stepper | implemented | `src/core/components/layout/stepper/Stepper.tsx` | yes | common-reference-contract |
| Switch | unmapped | `null` | no/unmapped | common-reference-contract |
| Tab | implemented | `src/core/components/layout/tab/Tab.tsx` | yes | common-reference-contract |
| Table | implemented | `src/core/components/layout/table/Table.tsx` | yes | common-reference-contract |
| TextButton | unmapped | `null` | no/unmapped | common-reference-contract |
| Textarea | unmapped | `null` | no/unmapped | common-reference-contract |
| Timepicker | unmapped | `null` | no/unmapped | common-reference-contract |
| Tooltip | unmapped | `null` | no/unmapped | common-reference-contract |
| Tree | unmapped | `null` | no/unmapped | common-reference-contract |

## 전체 원본 파일 inventory

`source` 경로는 원본 저장소 기준이다. SHA-256은 추출 당시 파일 byte 기준이며 출력 파일 hash가 아니다. `target`은 저자 저장소 기준이며 `audit/`는 TeamAI 배포에서 제외한다.

| source | target | 분류/처리 | SHA-256 |
| --- | --- | --- | --- |
| `docs/design/README.md` | `docs/frontend/design/README.md` | rewritten-common-policy | `e1aec0b37cc5d76ac8a7155ab00d0a8b2a17f823aff9a9fdad1d5b547192dd55` |
| `docs/design/api-error-notifications.md` | `docs/frontend/design/api-error-notifications.md` | rewritten-common-policy | `fa6be92e05f26275fe7225a0f15302bbcd6105ece166c53cbf07a4d88ab23b26` |
| `docs/design/authoring.md` | `docs/frontend/design/authoring.md` | generalized-reference-contract | `c8da8edd159c1b5fd48d0389550a7b986cc8ed09f02bea2b66c403429d14b488` |
| `docs/design/component-registry.json` | `docs/frontend/design/component-registry.json` | registry-implementation-metadata-reset | `164a8652479a3d3a870a965aa5ca71685b600eb770bd5639ec0910b0e4de217d` |
| `docs/design/component-workflow.md` | `docs/frontend/design/component-workflow.md` | generalized-reference-contract | `3b766677e9ce67f21173b0680f265cb9dbdc0686c6d93925ae6ab962c0022dfb` |
| `docs/design/components/ActionBar/README.md` | `docs/frontend/design/components/ActionBar/README.md` | generalized-reference-contract | `c174a94b5502bed84bcfaf3e3db7648286ae1cac2d87067b7bf960efd8b19af0` |
| `docs/design/components/ActionBar/accessibility.md` | `docs/frontend/design/components/ActionBar/accessibility.md` | generalized-reference-contract | `34592fe035c44c3bd87dd50ca1c25a1ef90c9df59bbbb751096c5132900acb6f` |
| `docs/design/components/ActionBar/behavior.md` | `docs/frontend/design/components/ActionBar/behavior.md` | generalized-reference-contract | `db1e041132731a98b077ed6cfaa5cb086f8d56b09e5f8bfbab8d6aa497663fbc` |
| `docs/design/components/ActionBar/definition.md` | `docs/frontend/design/components/ActionBar/definition.md` | generalized-reference-contract | `d9c9d044832486473f4b38da037facc0644236421bfc13f353063fb93c1c03cf` |
| `docs/design/components/ActionBar/implementation/README.md` | `docs/frontend/design/components/ActionBar/implementation/README.md` | generalized-reference-contract | `177fac348b898567c1410865d2bc202f4cf2c3fbb7bddd6a5db0e1f4466e860b` |
| `docs/design/components/ActionBar/implementation/css.md` | `docs/frontend/design/components/ActionBar/implementation/css.md` | generalized-reference-contract | `c0a4a6b03d1607557b4fae795f781aa67e5c15e9440a735eab161256e504be68` |
| `docs/design/components/ActionBar/implementation/examples.md` | `docs/frontend/design/components/ActionBar/implementation/examples.md` | generalized-reference-contract | `10e39d6d5f50fbd10077146ed6b7f57946f3091f5dc089c56195d285a823d7d1` |
| `docs/design/components/ActionBar/implementation/typescript.md` | `docs/frontend/design/components/ActionBar/implementation/typescript.md` | generalized-reference-contract | `f3ccdf345872e0fcd9abd197daccb6912e075280f55829ff883b4bde46439dfb` |
| `docs/design/components/ActionBar/styles.md` | `docs/frontend/design/components/ActionBar/styles.md` | generalized-reference-contract | `f1e3754ab290e00131e3e2be1eddfa34511a015a5e3781a2890e50bce7d3c6e8` |
| `docs/design/components/ActionBar/verification.md` | `docs/frontend/design/components/ActionBar/verification.md` | generalized-reference-contract | `3d687281cd1839e659ce3d21de8c7180ac9181cd1c626d519ad39d4c54255fe1` |
| `docs/design/components/AsyncContentState/README.md` | `docs/frontend/design/components/AsyncContentState/README.md` | generalized-reference-contract | `c255b8c3c49b755fa98db29c69de0566b6c322cc5341d771379ff84840edde0a` |
| `docs/design/components/AsyncContentState/accessibility.md` | `docs/frontend/design/components/AsyncContentState/accessibility.md` | generalized-reference-contract | `8e589ea8c3cb1fedcbcbecdafedce6bf3cf0f32e05df8b0ca9d974085e25055c` |
| `docs/design/components/AsyncContentState/behavior.md` | `docs/frontend/design/components/AsyncContentState/behavior.md` | generalized-reference-contract | `4b96853f096787c6f1d1df2f8feb1471487625ceb9c69e2882c9b2ac106877cc` |
| `docs/design/components/AsyncContentState/definition.md` | `docs/frontend/design/components/AsyncContentState/definition.md` | generalized-reference-contract | `c573e8f2f42173e503d00c0a719a276fc8a9303073c8bf27073b198ef81e42dd` |
| `docs/design/components/AsyncContentState/implementation/README.md` | `docs/frontend/design/components/AsyncContentState/implementation/README.md` | generalized-reference-contract | `7246025558a820d8fb36fbfdb66e131728a9b5320641374b341c2802d7e76dfc` |
| `docs/design/components/AsyncContentState/implementation/css.md` | `docs/frontend/design/components/AsyncContentState/implementation/css.md` | generalized-reference-contract | `10e0ba693985a24f878a642b572fd6249788f55d0fe0f47b64b06b3e95ed77b7` |
| `docs/design/components/AsyncContentState/implementation/examples.md` | `docs/frontend/design/components/AsyncContentState/implementation/examples.md` | generalized-reference-contract | `da1ed45a51711b74100325b619d35d658327be6d4dfc63cd32a30cc81c0ed1a4` |
| `docs/design/components/AsyncContentState/implementation/reference.md` | `docs/frontend/design/components/AsyncContentState/implementation/reference.md` | generalized-reference-contract | `7ea37ef2cb2dcfb78ac3161cb03ce025218e9fb0c1ce32529f2d774efd65aab3` |
| `docs/design/components/AsyncContentState/styles.md` | `docs/frontend/design/components/AsyncContentState/styles.md` | generalized-reference-contract | `fc4f454260c97db8c0acb05b2ff9c79f1531834f36da07493c304065d5e57bef` |
| `docs/design/components/AsyncContentState/verification.md` | `docs/frontend/design/components/AsyncContentState/verification.md` | generalized-reference-contract | `8358f50f51eadc9e0beeed1269f0a3662867d016a4cbfa493a181850688da03b` |
| `docs/design/components/Avatar/README.md` | `docs/frontend/design/components/Avatar/README.md` | generalized-reference-contract | `04d788c5b8d8c15ef45b005a81f1f1d17580c8c3d2724363333ed77cbf7b44e4` |
| `docs/design/components/Avatar/accessibility.md` | `docs/frontend/design/components/Avatar/accessibility.md` | generalized-reference-contract | `9107ec0e8a3a0cb7f40be470442378a291b4f783a83802b729b49473eb0821d4` |
| `docs/design/components/Avatar/behavior.md` | `docs/frontend/design/components/Avatar/behavior.md` | generalized-reference-contract | `c5b6a38dbefd77ce65d2a65d95ee6742a15c484b42be602bd4343bb814306271` |
| `docs/design/components/Avatar/definition.md` | `docs/frontend/design/components/Avatar/definition.md` | generalized-reference-contract | `42ab76cf361d0e2a8fa1a49fe86bd22e2a7077db56a2b5381a0de59d621fe602` |
| `docs/design/components/Avatar/implementation/README.md` | `docs/frontend/design/components/Avatar/implementation/README.md` | generalized-reference-contract | `9cde22a16fd48bbe557d649d7a3455df984939262081abbfebd0410d9b50143a` |
| `docs/design/components/Avatar/implementation/css.md` | `docs/frontend/design/components/Avatar/implementation/css.md` | generalized-reference-contract | `2a87c222015becdfd82ff4cd374937d9f4e17c97a8bd5c4a16e75a24c8ebf6ba` |
| `docs/design/components/Avatar/implementation/examples.md` | `docs/frontend/design/components/Avatar/implementation/examples.md` | generalized-reference-contract | `e3a8a55f238451c06943b8cc24dfccbcc786ceedf06dccbdbc44d1140eaa310a` |
| `docs/design/components/Avatar/implementation/typescript.md` | `docs/frontend/design/components/Avatar/implementation/typescript.md` | generalized-reference-contract | `28cbb3b4986b5754cf2216f3a2916efd059977249e5e671e358a0fa910c8003e` |
| `docs/design/components/Avatar/styles.md` | `docs/frontend/design/components/Avatar/styles.md` | generalized-reference-contract | `9a9ad97ca11eeb7a2526b58010b13cab370d746cc400fc1d560ca831ba11ada3` |
| `docs/design/components/Avatar/verification.md` | `docs/frontend/design/components/Avatar/verification.md` | generalized-reference-contract | `a7b46e5341bbf42d266f1ea52678992980d10ff3765518d921ab29fca9ac52bc` |
| `docs/design/components/Badge/README.md` | `docs/frontend/design/components/Badge/README.md` | generalized-reference-contract | `4eb193356dbf10bdea143ae30225061a88425b44cd2e184f0d5f8d52a949c9cb` |
| `docs/design/components/Badge/accessibility.md` | `docs/frontend/design/components/Badge/accessibility.md` | generalized-reference-contract | `8eecd83da623e66776df54e9d7ce729084447aebbcb8678bf77c0ec84ab93e72` |
| `docs/design/components/Badge/behavior.md` | `docs/frontend/design/components/Badge/behavior.md` | generalized-reference-contract | `6f8a4441dc7dd0ca6bdcbad3f164881db3d22bb6cea1299a70ddd3679ffe8f52` |
| `docs/design/components/Badge/definition.md` | `docs/frontend/design/components/Badge/definition.md` | generalized-reference-contract | `9bc4f1134b1d32123aa0a7600ec9a0d684be8b1a7fb1fb85b4e4e13ceb1748c4` |
| `docs/design/components/Badge/implementation/README.md` | `docs/frontend/design/components/Badge/implementation/README.md` | generalized-reference-contract | `56c69d61827ff02ce989e2af339fe93f1ef5987bba3cbddc539f9b897ecc442c` |
| `docs/design/components/Badge/implementation/css.md` | `docs/frontend/design/components/Badge/implementation/css.md` | generalized-reference-contract | `0ab008fdd23bc196fa5f9ac66c8ea9bd0db3080cba47fbfc61f569abc3b81971` |
| `docs/design/components/Badge/implementation/examples.md` | `docs/frontend/design/components/Badge/implementation/examples.md` | generalized-reference-contract | `6f08e99565eaa40b88ee2f020145842073894c916c92cb8e4c3f1e0a8dbfd505` |
| `docs/design/components/Badge/implementation/typescript.md` | `docs/frontend/design/components/Badge/implementation/typescript.md` | generalized-reference-contract | `b8563cf23d0919d1c11b88280765fd58a7dc589c069511e3a0b984302cdcdd13` |
| `docs/design/components/Badge/styles.md` | `docs/frontend/design/components/Badge/styles.md` | generalized-reference-contract | `d75877a7e046dbd3936fbc25d9f29edfa21e31709148e21d42ef16ef72167b9e` |
| `docs/design/components/Badge/verification.md` | `docs/frontend/design/components/Badge/verification.md` | generalized-reference-contract | `ed36795bb0f0e1ee63280e8d83cd8a3bab73300ae8f39633615a5531400c567a` |
| `docs/design/components/Breadcrumb/README.md` | `docs/frontend/design/components/Breadcrumb/README.md` | generalized-reference-contract | `52ee3d8ea4a6b4d237438c87b2dc1ec908addb1bc98fadbd853865995c20fb5f` |
| `docs/design/components/Breadcrumb/accessibility.md` | `docs/frontend/design/components/Breadcrumb/accessibility.md` | generalized-reference-contract | `236bae5e0ca690cdcb4470901775134ddeede1b809b591b7ce3dda890283f721` |
| `docs/design/components/Breadcrumb/behavior.md` | `docs/frontend/design/components/Breadcrumb/behavior.md` | generalized-reference-contract | `0bd5e9a3c42d63fe05ccaec3c8873da8e6dfa6ab36d655080e6f1283ffbbc8b6` |
| `docs/design/components/Breadcrumb/definition.md` | `docs/frontend/design/components/Breadcrumb/definition.md` | generalized-reference-contract | `ad43614d210e3c22d16f33e5633eb630fa473218be164fd8e693aafdb395c0d0` |
| `docs/design/components/Breadcrumb/implementation/README.md` | `docs/frontend/design/components/Breadcrumb/implementation/README.md` | generalized-reference-contract | `672f4a941f7803e9a0c76227dc8d96e7cdb80606ccf4bff7ed7436cd5009d0da` |
| `docs/design/components/Breadcrumb/implementation/css.md` | `docs/frontend/design/components/Breadcrumb/implementation/css.md` | generalized-reference-contract | `9e2d065ebb50ad25437e5f5562bb9d7fad457bd01669dacf56094d800dd5da2a` |
| `docs/design/components/Breadcrumb/implementation/examples.md` | `docs/frontend/design/components/Breadcrumb/implementation/examples.md` | generalized-reference-contract | `f5b248425dbc19bb1352cd730cb8e7900bd6e151b25a6eb63ed4c3538d734023` |
| `docs/design/components/Breadcrumb/implementation/typescript.md` | `docs/frontend/design/components/Breadcrumb/implementation/typescript.md` | generalized-reference-contract | `23ba8a10fdf5d8fa1ac28518303e9c113ecac18f3f2738312113e792115f7b59` |
| `docs/design/components/Breadcrumb/styles.md` | `docs/frontend/design/components/Breadcrumb/styles.md` | generalized-reference-contract | `3ee4a5a0565c0bfb7c6983be6459b51b6547fbf82e6ba12e7efad1b3238dca82` |
| `docs/design/components/Breadcrumb/verification.md` | `docs/frontend/design/components/Breadcrumb/verification.md` | generalized-reference-contract | `5aa44ac908b5a8407a837a4689ccf0e49467e5791fee67dc9839d61034f0fa9b` |
| `docs/design/components/Button/README.md` | `docs/frontend/design/components/Button/README.md` | generalized-reference-contract | `19e6afb1428b1c6fcf05eb92749ee4853f9361982865d77c679623c4733ee3f6` |
| `docs/design/components/Button/accessibility.md` | `docs/frontend/design/components/Button/accessibility.md` | generalized-reference-contract | `f12359ddf6ab60de1ffa54d178b0ab2cc670b5594c729bcd6a9d756259539ffa` |
| `docs/design/components/Button/behavior.md` | `docs/frontend/design/components/Button/behavior.md` | generalized-reference-contract | `b3427ab2681d9ad590c60fca03eae8e443baa6354b608c2a74bfd9d467850d96` |
| `docs/design/components/Button/definition.md` | `docs/frontend/design/components/Button/definition.md` | generalized-reference-contract | `96c69a7f04d1b59afa4ff3d9b88187d7fb14e96da5425d230bee848cdf29312b` |
| `docs/design/components/Button/implementation/README.md` | `docs/frontend/design/components/Button/implementation/README.md` | generalized-reference-contract | `a0f849dc92dda20734186ac481ebc6853a996e1c38eb97d11f124a6e94570eb1` |
| `docs/design/components/Button/implementation/css.md` | `docs/frontend/design/components/Button/implementation/css.md` | generalized-reference-contract | `14b160c63554f4c4c3dcfe3300f4c774fe061bd2d1c97f583bfb1c2ac9aed72d` |
| `docs/design/components/Button/implementation/examples.md` | `docs/frontend/design/components/Button/implementation/examples.md` | generalized-reference-contract | `0a7402c2c63074683deceec48744b245e10e5ba16ca2a87642489b0e53ef1466` |
| `docs/design/components/Button/implementation/typescript.md` | `docs/frontend/design/components/Button/implementation/typescript.md` | generalized-reference-contract | `7562fd2fad0ad434c9beb19c3e16b1363c448dce197af91af6d9c0bdc1448ca6` |
| `docs/design/components/Button/styles.md` | `docs/frontend/design/components/Button/styles.md` | generalized-reference-contract | `806e45eef837966b503e23b43b213f482eef9fcf1ebdb8bd1903405520841c27` |
| `docs/design/components/Button/verification.md` | `docs/frontend/design/components/Button/verification.md` | generalized-reference-contract | `995ffafe8588190d23a108125dfff8f3eb0eb968d4c201b1e63ba20762e47524` |
| `docs/design/components/Calendar/README.md` | `docs/frontend/design/components/Calendar/README.md` | generalized-reference-contract | `b7e0e3b70a06de5e1250865f7c1ca4ff8f1e5c188bc157865c5afb78573549ab` |
| `docs/design/components/Calendar/accessibility.md` | `docs/frontend/design/components/Calendar/accessibility.md` | generalized-reference-contract | `f939af0b3a502034a8077f5c51875ae0fbefbb506d985665f4e6768074d068d9` |
| `docs/design/components/Calendar/behavior.md` | `docs/frontend/design/components/Calendar/behavior.md` | generalized-reference-contract | `8806acd42c1ec8f1b1fbef0832b1ecf9e45cc7bd2a189ab41e28b9115321a43f` |
| `docs/design/components/Calendar/definition.md` | `docs/frontend/design/components/Calendar/definition.md` | generalized-reference-contract | `2736d2ca13e16139071f6b9e1bd1176acc4c0052f05f2b5eda313cf3a22a2fed` |
| `docs/design/components/Calendar/implementation/README.md` | `docs/frontend/design/components/Calendar/implementation/README.md` | generalized-reference-contract | `a44e5f73a9b84740ab4caf5471c2a5a53536c91885380f4aea888f2db32fcc01` |
| `docs/design/components/Calendar/implementation/css.md` | `docs/frontend/design/components/Calendar/implementation/css.md` | generalized-reference-contract | `d04f0b50a73b4614139955308594b246865fa43567a7f11a4571fb1f452abe44` |
| `docs/design/components/Calendar/implementation/typescript.md` | `docs/frontend/design/components/Calendar/implementation/typescript.md` | generalized-reference-contract | `08c0dc2642ec1f4661aec7f89b3e6f4598cd1455a8698c177389645b0c0aaf1b` |
| `docs/design/components/Calendar/styles.md` | `docs/frontend/design/components/Calendar/styles.md` | generalized-reference-contract | `5ce95365690dfc0b8f58236762bd4fea6147bb81fdf05f64dbbaa8b22eeb2d91` |
| `docs/design/components/Calendar/verification.md` | `docs/frontend/design/components/Calendar/verification.md` | generalized-reference-contract | `91569bc71f1c4a02b70fc13029425781b5e147c37bbd2071d5a28b74154f8ff4` |
| `docs/design/components/Card/README.md` | `docs/frontend/design/components/Card/README.md` | generalized-reference-contract | `e9e93c2a344d39b52f1f0049a7ba5d0ad5b925d91532c3765093203c084bb349` |
| `docs/design/components/Card/accessibility.md` | `docs/frontend/design/components/Card/accessibility.md` | generalized-reference-contract | `d14faa5998014da07ecb54b26615ac4b26787658054aa171c5574c062605e5be` |
| `docs/design/components/Card/behavior.md` | `docs/frontend/design/components/Card/behavior.md` | generalized-reference-contract | `5bae84af58d4e39bd50de204e8feb07064f0551b2cc0f51fdc5a1a6a892c46fc` |
| `docs/design/components/Card/definition.md` | `docs/frontend/design/components/Card/definition.md` | generalized-reference-contract | `9c4e247ac597ad4b8152cd6340fff5c5c0d586da061362fae207c12ecadf525e` |
| `docs/design/components/Card/implementation/README.md` | `docs/frontend/design/components/Card/implementation/README.md` | generalized-reference-contract | `1d7ff0119d01b8d8b0c9c4a0c6199c5f22b32addf28980915d78f4603b1d86ea` |
| `docs/design/components/Card/implementation/css.md` | `docs/frontend/design/components/Card/implementation/css.md` | generalized-reference-contract | `9a137656131b5b56955ba336ed25e4398853c41e28f3473f99fcdb8b69632552` |
| `docs/design/components/Card/implementation/examples.md` | `docs/frontend/design/components/Card/implementation/examples.md` | generalized-reference-contract | `3420bf0d280b85530510361fc63ffedf313bb7b375f3e3c928cb5e3deff0485e` |
| `docs/design/components/Card/implementation/reference.md` | `docs/frontend/design/components/Card/implementation/reference.md` | generalized-reference-contract | `76e351cb6a99b189e39c1c87de24652ef7326b64be8332ab1c7b34f057f400fc` |
| `docs/design/components/Card/implementation/typescript.md` | `docs/frontend/design/components/Card/implementation/typescript.md` | generalized-reference-contract | `f3bdfa1fcaf51b477768904cf483e5c5cb616b852bcc11e98c10ba3080ba2223` |
| `docs/design/components/Card/styles.md` | `docs/frontend/design/components/Card/styles.md` | generalized-reference-contract | `c00187f0b5e124af318b370861eba83475d5dc98ebd9669d4694d910503d5342` |
| `docs/design/components/Card/verification.md` | `docs/frontend/design/components/Card/verification.md` | generalized-reference-contract | `3da4449207b06650d0a9c917a43595d642161f0a28aca3bcca8cdd090546a9f4` |
| `docs/design/components/CardAccordion/README.md` | `docs/frontend/design/components/CardAccordion/README.md` | generalized-reference-contract | `2d28934aa58e220e29c740d87ce33c1179230bf7496a4b8ee551a13591632b6b` |
| `docs/design/components/CardAccordion/accessibility.md` | `docs/frontend/design/components/CardAccordion/accessibility.md` | generalized-reference-contract | `e4739d341c00cd595b9a8bc75d5c51502a4054c78d1f6d3070f3d2ca4f4c2a71` |
| `docs/design/components/CardAccordion/behavior.md` | `docs/frontend/design/components/CardAccordion/behavior.md` | generalized-reference-contract | `73e93fa2bd806325396eed9aab8748fa572ea117c50b42a39d9298b51150f5d7` |
| `docs/design/components/CardAccordion/definition.md` | `docs/frontend/design/components/CardAccordion/definition.md` | generalized-reference-contract | `a865773af2b2d0634718f66f71d0c7e070380d0a721e74352b2e5c94ab0de4ca` |
| `docs/design/components/CardAccordion/implementation/README.md` | `docs/frontend/design/components/CardAccordion/implementation/README.md` | generalized-reference-contract | `ccd909fe409f15aef6f8cd081b34e00a82ee4f3a2a42a3efbfff64d6553d11b3` |
| `docs/design/components/CardAccordion/implementation/css.md` | `docs/frontend/design/components/CardAccordion/implementation/css.md` | generalized-reference-contract | `3fdc6503c67b3e6ec417d27a5bb21548594c36412a3d1d1a161cc16e19800cec` |
| `docs/design/components/CardAccordion/implementation/examples.md` | `docs/frontend/design/components/CardAccordion/implementation/examples.md` | generalized-reference-contract | `3754ec6a67dab4a8c59cc451fdaef4724210503e7994b17c9ed90adb417fa379` |
| `docs/design/components/CardAccordion/implementation/reference.md` | `docs/frontend/design/components/CardAccordion/implementation/reference.md` | generalized-reference-contract | `3531693bf503d5cb399c0d7a0a4bf1da43a514780233c86353535a91691cf950` |
| `docs/design/components/CardAccordion/implementation/typescript.md` | `docs/frontend/design/components/CardAccordion/implementation/typescript.md` | generalized-reference-contract | `893ad27d60dbc5c283ea4e1bdd5eefbe5457c9e30dbaa120301a2730734eb875` |
| `docs/design/components/CardAccordion/styles.md` | `docs/frontend/design/components/CardAccordion/styles.md` | generalized-reference-contract | `36968134ed843a4beb56d610f5d0be7a026d81086689b84891a39faadbc19483` |
| `docs/design/components/CardAccordion/verification.md` | `docs/frontend/design/components/CardAccordion/verification.md` | generalized-reference-contract | `5b32fe30ed1ada9e6bfb61814fc525269b79957ce6d80e153962304a6c7e5b28` |
| `docs/design/components/Checkbox/README.md` | `docs/frontend/design/components/Checkbox/README.md` | generalized-reference-contract | `fa017b6cb9c6dd7c3df19970bf9edbf741732391243b055672feea20ffc0136e` |
| `docs/design/components/Checkbox/accessibility.md` | `docs/frontend/design/components/Checkbox/accessibility.md` | generalized-reference-contract | `c662d48d340e22dbbd1177ba3d1ef8b57dd7a8c4e940a77ae3b309973e1fddc6` |
| `docs/design/components/Checkbox/behavior.md` | `docs/frontend/design/components/Checkbox/behavior.md` | generalized-reference-contract | `392bdc9f0663f5e4067b7b64e630e9f79d2945696881fae5a48b3a0930cb5438` |
| `docs/design/components/Checkbox/definition.md` | `docs/frontend/design/components/Checkbox/definition.md` | generalized-reference-contract | `d33906b4394eb44fb3b198fb79675c00ce02032fe5a2196f2ae66ce5d9fcf7f9` |
| `docs/design/components/Checkbox/implementation/README.md` | `docs/frontend/design/components/Checkbox/implementation/README.md` | generalized-reference-contract | `77abe5ffb4c87d03890e4a1fbb48a5b7c054e1aa2f2940e2abae53c84950285d` |
| `docs/design/components/Checkbox/implementation/css.md` | `docs/frontend/design/components/Checkbox/implementation/css.md` | generalized-reference-contract | `0b2df9d947a8b1408cd223fa72aa30c827c982bc2885b7aef190cac1215c6ffe` |
| `docs/design/components/Checkbox/implementation/examples.md` | `docs/frontend/design/components/Checkbox/implementation/examples.md` | generalized-reference-contract | `9d93e6c85df0f97e581960f36a9e510f170e8981ad75524f18e0be893d1780fb` |
| `docs/design/components/Checkbox/implementation/typescript.md` | `docs/frontend/design/components/Checkbox/implementation/typescript.md` | generalized-reference-contract | `223d38951afd5b8df58d776486d0ee045fed532d9de0a16aa945e498aaf7461f` |
| `docs/design/components/Checkbox/styles.md` | `docs/frontend/design/components/Checkbox/styles.md` | generalized-reference-contract | `8a89242091129cfb9190cc7ec442a51c92f24e0a33976e89c7d7c8405f8333f4` |
| `docs/design/components/Checkbox/verification.md` | `docs/frontend/design/components/Checkbox/verification.md` | generalized-reference-contract | `876f1d94bf2e0819b8c8cb529e397d997fdf604d95d48685059033a4e88276f9` |
| `docs/design/components/Chip/README.md` | `docs/frontend/design/components/Chip/README.md` | generalized-reference-contract | `53fd8b2cc60cce224c152b3b2c242a69588e271428d760c25d9eb6bcf0ce6692` |
| `docs/design/components/Chip/accessibility.md` | `docs/frontend/design/components/Chip/accessibility.md` | generalized-reference-contract | `c48b7d3a0774eccc0b0936f8f1bf8e2021ce293b46e8ec43875b940bef556a6d` |
| `docs/design/components/Chip/behavior.md` | `docs/frontend/design/components/Chip/behavior.md` | generalized-reference-contract | `c0d202bff8ea7c92a9b6523f4447e4389ba3f02a7aedcec7fe2e2157a80bb9e2` |
| `docs/design/components/Chip/definition.md` | `docs/frontend/design/components/Chip/definition.md` | generalized-reference-contract | `c1e99108f086846bd7a4d6391e42adb648213c920b65d1c2525834fc6f910d0e` |
| `docs/design/components/Chip/implementation/README.md` | `docs/frontend/design/components/Chip/implementation/README.md` | generalized-reference-contract | `f75dfb5d336bab47ef72580c46ac5e01f7ecea061978fa359684a0c835c4d41d` |
| `docs/design/components/Chip/implementation/css.md` | `docs/frontend/design/components/Chip/implementation/css.md` | generalized-reference-contract | `e0d455e74f8a2f8678d7dd9d64392cc5a64e7efac876fc566bd3ac41e0fd4479` |
| `docs/design/components/Chip/implementation/examples.md` | `docs/frontend/design/components/Chip/implementation/examples.md` | generalized-reference-contract | `098db2280f5f24ef35a0a3d8b511f3395de5e90c936cb51acf0283a693328937` |
| `docs/design/components/Chip/implementation/typescript.md` | `docs/frontend/design/components/Chip/implementation/typescript.md` | generalized-reference-contract | `0adba5fc86dc1587127a42f2c09e57e2f02024535c36b8b85c861339f176b610` |
| `docs/design/components/Chip/styles.md` | `docs/frontend/design/components/Chip/styles.md` | generalized-reference-contract | `802aa57b79681177a88c8cf892ca8a00412612fc10f3db2c8ac59091e323de0c` |
| `docs/design/components/Chip/verification.md` | `docs/frontend/design/components/Chip/verification.md` | generalized-reference-contract | `b8c9a5eed2e3c73091f27c46a677770c898c5f11fd16b9c07ba541cbfd8ca07a` |
| `docs/design/components/ContentState/README.md` | `docs/frontend/design/components/ContentState/README.md` | generalized-reference-contract | `c858ae581efeb8b504016067f90dd1625c8113ba5cc01b8a9031f68285b2d1ab` |
| `docs/design/components/ContentState/accessibility.md` | `docs/frontend/design/components/ContentState/accessibility.md` | generalized-reference-contract | `024878623a0043c99f9a21321967c10ae82ad6eb0e587aef9143e13a63f33365` |
| `docs/design/components/ContentState/behavior.md` | `docs/frontend/design/components/ContentState/behavior.md` | generalized-reference-contract | `3311a1374848d9f8358e5643cb97961f30e377fa81e602b22623749907fe9c81` |
| `docs/design/components/ContentState/definition.md` | `docs/frontend/design/components/ContentState/definition.md` | generalized-reference-contract | `dc07fb0e3d59041de0e7fa5d00343d3e22660dc618b15c08399fefd13f7149fd` |
| `docs/design/components/ContentState/styles.md` | `docs/frontend/design/components/ContentState/styles.md` | generalized-reference-contract | `db9b2931d7f6a11f25eb4ce5d579656cdac29a7c39f49f8bd045cbe84b3364bd` |
| `docs/design/components/ContentState/verification.md` | `docs/frontend/design/components/ContentState/verification.md` | generalized-reference-contract | `4ac859457553de794d229f08a33618b78eb37905db48d022def1e20b0437b524` |
| `docs/design/components/DatePicker/README.md` | `docs/frontend/design/components/DatePicker/README.md` | generalized-reference-contract | `0b628cc378c8e0c62c13eafd1ead506f68dd88de64bdd6698c01d777231cb4fa` |
| `docs/design/components/DatePicker/accessibility.md` | `docs/frontend/design/components/DatePicker/accessibility.md` | generalized-reference-contract | `03bc1b8c88d8c6ba53cb94a3aabda5fb80d5d202d00789c2f95d0f7d03967b91` |
| `docs/design/components/DatePicker/behavior.md` | `docs/frontend/design/components/DatePicker/behavior.md` | generalized-reference-contract | `c2da3b6039a31d031fd376c2922b1de5412fa534080faf59ae56b449eadd61c8` |
| `docs/design/components/DatePicker/definition.md` | `docs/frontend/design/components/DatePicker/definition.md` | generalized-reference-contract | `88f8084cf7dbff8fc20067adde6276c8ca0d49d814dfb9fca921a2f756ea882a` |
| `docs/design/components/DatePicker/implementation/README.md` | `docs/frontend/design/components/DatePicker/implementation/README.md` | generalized-reference-contract | `6a288decc52b42c6e8fe1e2c1b39d07e29ec284a803e72936f8ddd17511d5c1d` |
| `docs/design/components/DatePicker/implementation/css.md` | `docs/frontend/design/components/DatePicker/implementation/css.md` | generalized-reference-contract | `303cd4ea0f89100f18971d3043347143b2647d319e1cddea8f613b4e70a2c4ee` |
| `docs/design/components/DatePicker/styles.md` | `docs/frontend/design/components/DatePicker/styles.md` | generalized-reference-contract | `f51ebaf7be24f74f57902bfae44ecc4491f1626949aff5a7d5b697d2a959dccc` |
| `docs/design/components/DatePicker/verification.md` | `docs/frontend/design/components/DatePicker/verification.md` | generalized-reference-contract | `29681c907735b19696274582cd65aad9f5f3caab57bb50738684c913cf82166f` |
| `docs/design/components/DetailField/README.md` | `docs/frontend/design/components/DetailField/README.md` | generalized-reference-contract | `aef38442f43a9ea4d1f2d26a739fbfd79a8c254efe2ef2a297f31a5a6fb5ec69` |
| `docs/design/components/DetailField/accessibility.md` | `docs/frontend/design/components/DetailField/accessibility.md` | generalized-reference-contract | `c7970258001fc3713cead9e8f9f8f0d1ee49714caed21111e57db9e6cef66365` |
| `docs/design/components/DetailField/behavior.md` | `docs/frontend/design/components/DetailField/behavior.md` | generalized-reference-contract | `30f8ffdb50d7941e82bd8a80cf8df30408a3cf6f3d160a8745fdaa2a7d910497` |
| `docs/design/components/DetailField/definition.md` | `docs/frontend/design/components/DetailField/definition.md` | generalized-reference-contract | `36f2b7a0e0cb3c6f70ecc9907a555ba2e780c919b38ca1cd4e2bac02a14909b0` |
| `docs/design/components/DetailField/implementation/README.md` | `docs/frontend/design/components/DetailField/implementation/README.md` | generalized-reference-contract | `484f86c960b79b25473fed3befc36a672211241038c04baf5737f26c27f639ff` |
| `docs/design/components/DetailField/implementation/examples.md` | `docs/frontend/design/components/DetailField/implementation/examples.md` | generalized-reference-contract | `b1535aaa21a7523617af212f32071f1be5b2d504a885a01f2e597b2b03b73ad4` |
| `docs/design/components/DetailField/styles.md` | `docs/frontend/design/components/DetailField/styles.md` | generalized-reference-contract | `db16a5c66faf09ae5fb905aea334be49def73a672281315c202913090f755bb7` |
| `docs/design/components/DetailField/verification.md` | `docs/frontend/design/components/DetailField/verification.md` | generalized-reference-contract | `055169ba874d590b339dbc91e502d7c3bcac6b6be1411bac3f23a80989e1b98f` |
| `docs/design/components/DetailSection/README.md` | `docs/frontend/design/components/DetailSection/README.md` | generalized-reference-contract | `26d7b5bc152b6586d790c1d58cd4a35bb93d7ec6ed4416e60b4f6aca6d70eb71` |
| `docs/design/components/DetailSection/accessibility.md` | `docs/frontend/design/components/DetailSection/accessibility.md` | generalized-reference-contract | `93079e75a6f474500fa7c07ebf7f06192398aac5b947b78fe66fd05e03a1bd51` |
| `docs/design/components/DetailSection/behavior.md` | `docs/frontend/design/components/DetailSection/behavior.md` | generalized-reference-contract | `f33420b2fce8dec01bab1707824c5f7a57f7ce84800ee28a10741898d6687a30` |
| `docs/design/components/DetailSection/definition.md` | `docs/frontend/design/components/DetailSection/definition.md` | generalized-reference-contract | `b8e12965d8f0635a53f3e77950335df3fecc84350dab1ee22a2d65a75aaeb9a8` |
| `docs/design/components/DetailSection/styles.md` | `docs/frontend/design/components/DetailSection/styles.md` | generalized-reference-contract | `a382ca4a5f2f83686661e486e82c660b8bf3e9944881306dc5c1f5e26efa4cc6` |
| `docs/design/components/DetailSection/verification.md` | `docs/frontend/design/components/DetailSection/verification.md` | generalized-reference-contract | `50acce908edc621a1a9f6417ea69195bb3bcbfa58dfef2201c74662d33820c7d` |
| `docs/design/components/Dialog/README.md` | `docs/frontend/design/components/Dialog/README.md` | generalized-reference-contract | `47eb7bdb719abccb5317c7971f55afe900007f91f11ddf5e83b9422bc836747f` |
| `docs/design/components/Dialog/accessibility.md` | `docs/frontend/design/components/Dialog/accessibility.md` | generalized-reference-contract | `851f090d64522835bff845e62bc30704dad2b0fdcd69129f969dbe6f476a523e` |
| `docs/design/components/Dialog/behavior.md` | `docs/frontend/design/components/Dialog/behavior.md` | generalized-reference-contract | `bc5c85be6511e6c5a3502ea1426de641e38b3dbac3f109f692194102eaeb8165` |
| `docs/design/components/Dialog/definition.md` | `docs/frontend/design/components/Dialog/definition.md` | generalized-reference-contract | `6578a990edba193b946aca7c4d62e0587773cefffcc7c33a438cbd631a70d39f` |
| `docs/design/components/Dialog/implementation/README.md` | `docs/frontend/design/components/Dialog/implementation/README.md` | generalized-reference-contract | `4d39d0d6a7d491473a6e909ed087fc1592ab441b2db2b2a43b0fd02d5aa1863c` |
| `docs/design/components/Dialog/implementation/css.md` | `docs/frontend/design/components/Dialog/implementation/css.md` | generalized-reference-contract | `29a0d3e7f283751a5c5a1e23fc0695557f9de35e8da8c1033b1549a752dee354` |
| `docs/design/components/Dialog/implementation/examples.md` | `docs/frontend/design/components/Dialog/implementation/examples.md` | generalized-reference-contract | `e681253927af589e0f6998dd2dd9b020e6df4d02e7826f54702415fdaf06f186` |
| `docs/design/components/Dialog/implementation/typescript.md` | `docs/frontend/design/components/Dialog/implementation/typescript.md` | generalized-reference-contract | `cfab0b2e3bbc5c21b66b01e9b20fc218fbbff3ec5330f9ad6353ac17a798fd86` |
| `docs/design/components/Dialog/styles.md` | `docs/frontend/design/components/Dialog/styles.md` | generalized-reference-contract | `f7f4c863ed8d01422d02eefaaf5ac86912232103e4dcf844d7bd6080ccf14a6a` |
| `docs/design/components/Dialog/verification.md` | `docs/frontend/design/components/Dialog/verification.md` | generalized-reference-contract | `e598f9ddc43235ea39e3cc906b24556d54c9f695d73a24756c95384fe00e0032` |
| `docs/design/components/Divider/README.md` | `docs/frontend/design/components/Divider/README.md` | generalized-reference-contract | `ca046b1f2ce61174d3a264d6269851c22ce4743c4552958c9596ace0992c7e41` |
| `docs/design/components/Divider/accessibility.md` | `docs/frontend/design/components/Divider/accessibility.md` | generalized-reference-contract | `8afe2a8994c1d9cbd290abad026ef870a644cf06820444e3c8882622b116d574` |
| `docs/design/components/Divider/behavior.md` | `docs/frontend/design/components/Divider/behavior.md` | generalized-reference-contract | `c71573f6b8cb46c3b1569a2d88e1fbcae3114811e9a9d01effc2e2ef233ef0e3` |
| `docs/design/components/Divider/definition.md` | `docs/frontend/design/components/Divider/definition.md` | generalized-reference-contract | `ba9644ae16f88975ef6aab55675a3c3901f818ad872fecef653a68e51c186088` |
| `docs/design/components/Divider/implementation/README.md` | `docs/frontend/design/components/Divider/implementation/README.md` | generalized-reference-contract | `730c684d1d6e42306a8a9a6b0ecb649bb965e5b519c67e4240feebe3885c50e4` |
| `docs/design/components/Divider/implementation/css.md` | `docs/frontend/design/components/Divider/implementation/css.md` | generalized-reference-contract | `2d865c97b82f3251e2a4d1356c587b4412ed0a705d0166c5dfec60f4be285c9f` |
| `docs/design/components/Divider/implementation/examples.md` | `docs/frontend/design/components/Divider/implementation/examples.md` | generalized-reference-contract | `def0365106862bffff986fef18710d10cae6873f959fc967f1d95eb42711cdf2` |
| `docs/design/components/Divider/implementation/typescript.md` | `docs/frontend/design/components/Divider/implementation/typescript.md` | generalized-reference-contract | `e99e7e973c2da5e7fbe0902bda18cfea0c3f9935cddc76ff62dbc98c3b81a2c6` |
| `docs/design/components/Divider/styles.md` | `docs/frontend/design/components/Divider/styles.md` | generalized-reference-contract | `a97c80901f65ed90f1bd47bc10e087c94aa5947ec7d5c9bde98c27297c507c85` |
| `docs/design/components/Divider/verification.md` | `docs/frontend/design/components/Divider/verification.md` | generalized-reference-contract | `007c159e0dbfd6e4c8dd65fa259ddc2f72a99f2fe87378bd7a96b745771b36a1` |
| `docs/design/components/Dropdown/README.md` | `docs/frontend/design/components/Dropdown/README.md` | generalized-reference-contract | `a429d25e257708dc02616dc52f3e36052d0b0729f0bb963d235519e9665cb16f` |
| `docs/design/components/Dropdown/accessibility.md` | `docs/frontend/design/components/Dropdown/accessibility.md` | generalized-reference-contract | `10f3364a210d28984e9b05d9cfe13659353fa085a8055059822ac0d2326acf5a` |
| `docs/design/components/Dropdown/behavior.md` | `docs/frontend/design/components/Dropdown/behavior.md` | generalized-reference-contract | `d30a1f3a49891bbf9ef7d471cf2dae689067df60b23bb6fd3a49890b24315816` |
| `docs/design/components/Dropdown/definition.md` | `docs/frontend/design/components/Dropdown/definition.md` | generalized-reference-contract | `7805f1a5bfd506f760739b584c3dcf66c95f67a7bbad0699a62f1cbe3ab65490` |
| `docs/design/components/Dropdown/implementation/README.md` | `docs/frontend/design/components/Dropdown/implementation/README.md` | generalized-reference-contract | `cc00052a4b3dfd48a6dcc70f7613828812dc61451657c42fba062afc5a46e129` |
| `docs/design/components/Dropdown/implementation/css.md` | `docs/frontend/design/components/Dropdown/implementation/css.md` | generalized-reference-contract | `a744337149bf67e742f60d7fbb00325852db5e267caeb13b108419b2909fed74` |
| `docs/design/components/Dropdown/implementation/examples.md` | `docs/frontend/design/components/Dropdown/implementation/examples.md` | generalized-reference-contract | `f6beaa423a7ade55fcb61400234b79468fec048b71b07b8f01adff449427981a` |
| `docs/design/components/Dropdown/implementation/reference.md` | `docs/frontend/design/components/Dropdown/implementation/reference.md` | generalized-reference-contract | `7794cb10b9647eb2c4c50af3d294a51b339daa17e9746faa9714c88cd5bf9024` |
| `docs/design/components/Dropdown/implementation/typescript.md` | `docs/frontend/design/components/Dropdown/implementation/typescript.md` | generalized-reference-contract | `c069b3681a26123aca2f0e1361ab041fd0510e71cc5856c33ce65dd69ffe4816` |
| `docs/design/components/Dropdown/styles.md` | `docs/frontend/design/components/Dropdown/styles.md` | generalized-reference-contract | `0802de4829c2d475e8220704752ade27d55518a311f3ee4b23377fb3ef992521` |
| `docs/design/components/Dropdown/verification.md` | `docs/frontend/design/components/Dropdown/verification.md` | generalized-reference-contract | `d625799b129ac7ead6824e2ebc7402ee429ef7d933af771cce526926f29e4c7d` |
| `docs/design/components/EditConfirmationDialog/README.md` | `docs/frontend/design/components/EditConfirmationDialog/README.md` | generalized-reference-contract | `22931e590dc9d344ce5ba3a022fb3e5457ad04913208994dd5fc146cabee937b` |
| `docs/design/components/EditConfirmationDialog/accessibility.md` | `docs/frontend/design/components/EditConfirmationDialog/accessibility.md` | generalized-reference-contract | `c198f50a7a7353d0e16abb02987ab29c5feb9bd168f2656eb5c239ddf01e78f5` |
| `docs/design/components/EditConfirmationDialog/behavior.md` | `docs/frontend/design/components/EditConfirmationDialog/behavior.md` | generalized-reference-contract | `6fbb9d92790edaebb7595ad3daba15c4687e857fbc19dbf20bf08648678c0cc1` |
| `docs/design/components/EditConfirmationDialog/definition.md` | `docs/frontend/design/components/EditConfirmationDialog/definition.md` | generalized-reference-contract | `eb1d35bee75d6b23481b065112b2c37781cba3084b18506ceedee1748b7e5341` |
| `docs/design/components/EditConfirmationDialog/implementation/README.md` | `docs/frontend/design/components/EditConfirmationDialog/implementation/README.md` | generalized-reference-contract | `3834649ee2050f7d66f451b47363b7c4695bb638b6fec5790a2df77ba44c527b` |
| `docs/design/components/EditConfirmationDialog/implementation/typescript.md` | `docs/frontend/design/components/EditConfirmationDialog/implementation/typescript.md` | generalized-reference-contract | `f6a233495d081a683f395ade8e8b42169f4aac695c5cd466705ea88f2b2a8999` |
| `docs/design/components/EditConfirmationDialog/styles.md` | `docs/frontend/design/components/EditConfirmationDialog/styles.md` | generalized-reference-contract | `372b6150e26b192dfbf2f1910e30ce91facbdea035575066b5541f77cf8ea36b` |
| `docs/design/components/EditConfirmationDialog/verification.md` | `docs/frontend/design/components/EditConfirmationDialog/verification.md` | generalized-reference-contract | `3084191a81301e774a100cd88eece2a5edca7f78dcdede00bee976be1b8ccf8b` |
| `docs/design/components/GlobalHeaderV1/README.md` | `audit/jdc/design/components/GlobalHeaderV1/README.md` | observed-jdc-shell-only | `04e2ba4cb8861f750c21c62929e3fd77fa0b1e90a43fec1a7a432c8dbc5be45e` |
| `docs/design/components/GlobalHeaderV1/accessibility.md` | `audit/jdc/design/components/GlobalHeaderV1/accessibility.md` | observed-jdc-shell-only | `dfabc72c6f9fa6d4e252cfc69b902beb29fa3cee9a5a4d7f23aae700b1e4aa86` |
| `docs/design/components/GlobalHeaderV1/behavior.md` | `audit/jdc/design/components/GlobalHeaderV1/behavior.md` | observed-jdc-shell-only | `e9e1dc3de38b96f73a6f369a40aec23086a6b9cb3d42bfe0ab89bcd7b8f6cfaa` |
| `docs/design/components/GlobalHeaderV1/definition.md` | `audit/jdc/design/components/GlobalHeaderV1/definition.md` | observed-jdc-shell-only | `67c9b6d5eb42c4d7d6cc7f6ed0c641712b114f9ecb3ad5b433928c67a5cc562a` |
| `docs/design/components/GlobalHeaderV1/implementation/README.md` | `audit/jdc/design/components/GlobalHeaderV1/implementation/README.md` | observed-jdc-shell-only | `f5d2db7a65522bbf09931f67a88461bee7a1d4df8eea267bc864e74f6b3e5c9e` |
| `docs/design/components/GlobalHeaderV1/implementation/css.md` | `audit/jdc/design/components/GlobalHeaderV1/implementation/css.md` | observed-jdc-shell-only | `dfe6c096e0c6f5c0f1e8344fa1b0b2590c53fb73c26dde5309cca19c252ab4fb` |
| `docs/design/components/GlobalHeaderV1/implementation/typescript.md` | `audit/jdc/design/components/GlobalHeaderV1/implementation/typescript.md` | observed-jdc-shell-only | `387738335036e050a8e3bfe9ad5798976c4dc95eaa37b0497e57ad43caa2f73f` |
| `docs/design/components/GlobalHeaderV1/styles.md` | `audit/jdc/design/components/GlobalHeaderV1/styles.md` | observed-jdc-shell-only | `eb277101315bec7dedae5af09a4cad1884c773a3dac525bf9ffd175e0f4e15aa` |
| `docs/design/components/GlobalHeaderV1/verification.md` | `audit/jdc/design/components/GlobalHeaderV1/verification.md` | observed-jdc-shell-only | `53e84874fee50e370a8b9da4f92ab1705a429589c758ba570b338b8916a5a560` |
| `docs/design/components/GlobalHeaderV2/README.md` | `audit/jdc/design/components/GlobalHeaderV2/README.md` | observed-jdc-shell-only | `9571fbcb8081f7e58c0d19318676bc8d80025dee51bb41df90a9a020d4a47472` |
| `docs/design/components/GlobalHeaderV2/accessibility.md` | `audit/jdc/design/components/GlobalHeaderV2/accessibility.md` | observed-jdc-shell-only | `2bd875fbeae5ace386243350a316f9925659180c34475b826738593808047c7e` |
| `docs/design/components/GlobalHeaderV2/behavior.md` | `audit/jdc/design/components/GlobalHeaderV2/behavior.md` | observed-jdc-shell-only | `0b13ba5842e3872880520502417b85b0e0c76ac12db08a71120d8c443e623a13` |
| `docs/design/components/GlobalHeaderV2/definition.md` | `audit/jdc/design/components/GlobalHeaderV2/definition.md` | observed-jdc-shell-only | `9037a4f3b81d1bcdb84a26f03cb028356622662c53375be78e68c94025323f19` |
| `docs/design/components/GlobalHeaderV2/implementation/README.md` | `audit/jdc/design/components/GlobalHeaderV2/implementation/README.md` | observed-jdc-shell-only | `2bf9d79bfa694b24b96bb549f7e21d6252d06ce9d094000bf7127d9d82d0fa1e` |
| `docs/design/components/GlobalHeaderV2/implementation/css.md` | `audit/jdc/design/components/GlobalHeaderV2/implementation/css.md` | observed-jdc-shell-only | `3e3c571766e8567318250a50ad28f4cfe33db35cf8f63a20368a3260c77a1f07` |
| `docs/design/components/GlobalHeaderV2/implementation/typescript.md` | `audit/jdc/design/components/GlobalHeaderV2/implementation/typescript.md` | observed-jdc-shell-only | `33c23d23242eb306966bedc692e91e3eb149ffc6e6dfd31cfca746214bf4996e` |
| `docs/design/components/GlobalHeaderV2/styles.md` | `audit/jdc/design/components/GlobalHeaderV2/styles.md` | observed-jdc-shell-only | `8d395ffb2b81de563c36f4fdd3fb8cb7dd6ac5e4e4e413512f2101332297ab0b` |
| `docs/design/components/GlobalHeaderV2/verification.md` | `audit/jdc/design/components/GlobalHeaderV2/verification.md` | observed-jdc-shell-only | `b5b944622e2faf3db8c037bb86e76be95962f91c5abbd82beab56edc95486d6e` |
| `docs/design/components/Icon/README.md` | `docs/frontend/design/components/Icon/README.md` | generalized-reference-contract | `aaa567da0274215fd0c39e3524764685a37e988cc047be73207f27fd08895bda` |
| `docs/design/components/Icon/accessibility.md` | `docs/frontend/design/components/Icon/accessibility.md` | generalized-reference-contract | `1fbf36549090e18f00a159de8b236c08a0c278468b2ec86880df15bbdd22d8e6` |
| `docs/design/components/Icon/behavior.md` | `docs/frontend/design/components/Icon/behavior.md` | generalized-reference-contract | `55fc10fa633c17f904564e27f867563a64bbc0e5ef94e13fc3725ba8800ed1d4` |
| `docs/design/components/Icon/definition.md` | `docs/frontend/design/components/Icon/definition.md` | generalized-reference-contract | `a1bc92416c1763b9ab90ff11c0e6442004810d1b5119953f9235e5bdb8241a04` |
| `docs/design/components/Icon/implementation/README.md` | `docs/frontend/design/components/Icon/implementation/README.md` | generalized-reference-contract | `315c0dd031f17edc4170d18837b3b4e96e66ed5265e82e7d7fd62a825adbda90` |
| `docs/design/components/Icon/implementation/css.md` | `docs/frontend/design/components/Icon/implementation/css.md` | generalized-reference-contract | `a67a606829154a1b796ca2a37f5a0538b732d213bca5faf2ab49db8679018c5c` |
| `docs/design/components/Icon/implementation/examples.md` | `docs/frontend/design/components/Icon/implementation/examples.md` | generalized-reference-contract | `6aa1b0deb1e667bd490d5cb80de3b7f97eb5bad56dd59fc91691e8b20a974da2` |
| `docs/design/components/Icon/implementation/typescript.md` | `docs/frontend/design/components/Icon/implementation/typescript.md` | generalized-reference-contract | `b58ac473647ad7e174d3ef5457ff3c82d6b64682fbfc495fe5221b22f8dbb461` |
| `docs/design/components/Icon/styles.md` | `docs/frontend/design/components/Icon/styles.md` | generalized-reference-contract | `0345ad0443731deb9fa145e86a3c95e787b1d88fa3b7f9b29f938f4745a985e7` |
| `docs/design/components/Icon/verification.md` | `docs/frontend/design/components/Icon/verification.md` | generalized-reference-contract | `c5a8f6b937c77a9dfb7e24fa405ce4021faf0986f12b7cda8e3e67a121137a16` |
| `docs/design/components/IconButton/README.md` | `docs/frontend/design/components/IconButton/README.md` | generalized-reference-contract | `0e4dcebaef7dcf29b8f056d443f7e205f7b9ed38bbd9531ca4a7f9b585b1ceb8` |
| `docs/design/components/IconButton/accessibility.md` | `docs/frontend/design/components/IconButton/accessibility.md` | generalized-reference-contract | `4bf8f147b41a0191ca07f24093b8177019770e0e35975f8e58ae0a955fccd53b` |
| `docs/design/components/IconButton/behavior.md` | `docs/frontend/design/components/IconButton/behavior.md` | generalized-reference-contract | `83c9fa8f88939207545619d1986948cb615606daf665a24fa7219e757883cdc8` |
| `docs/design/components/IconButton/definition.md` | `docs/frontend/design/components/IconButton/definition.md` | generalized-reference-contract | `ec122ef56573cacd0ddafad86598ae449d0de8da9d1367c3e72dceeadb9985a8` |
| `docs/design/components/IconButton/implementation/README.md` | `docs/frontend/design/components/IconButton/implementation/README.md` | generalized-reference-contract | `8f9ed08ef653d041bcd9863fe74b9060a13b75104285540075d95c8da44a50e0` |
| `docs/design/components/IconButton/implementation/css.md` | `docs/frontend/design/components/IconButton/implementation/css.md` | generalized-reference-contract | `ede3a2d60634f8a779b5ebc144160dadad39296aeb469cbe6b3411973a98bea4` |
| `docs/design/components/IconButton/implementation/examples.md` | `docs/frontend/design/components/IconButton/implementation/examples.md` | generalized-reference-contract | `be6203caca3fb182efb0e1a13b0b9ea7a3da38ac1ccc47c6cae6430422af95fd` |
| `docs/design/components/IconButton/implementation/typescript.md` | `docs/frontend/design/components/IconButton/implementation/typescript.md` | generalized-reference-contract | `b2530cdf9c2b352b4e1486eab3aba43e9f420369ac9057c3de3fda214f85bb58` |
| `docs/design/components/IconButton/styles.md` | `docs/frontend/design/components/IconButton/styles.md` | generalized-reference-contract | `0267daefd682142352983341d481099db7b95d87a4e961ab24b369f72c38143f` |
| `docs/design/components/IconButton/verification.md` | `docs/frontend/design/components/IconButton/verification.md` | generalized-reference-contract | `0a5f67f93c7ab1790ba221b54fb7e8b2d376483e55cce1647318941a5c764dd5` |
| `docs/design/components/Input/README.md` | `docs/frontend/design/components/Input/README.md` | generalized-reference-contract | `9daf422d39f259911012c65c7a0659007ff3df9ca3e779a8a0073c175afcf4c4` |
| `docs/design/components/Input/accessibility.md` | `docs/frontend/design/components/Input/accessibility.md` | generalized-reference-contract | `7e6eedade0c5d34ae44f66dba1cc4c802557144294cc08554f25515a31f6534d` |
| `docs/design/components/Input/behavior.md` | `docs/frontend/design/components/Input/behavior.md` | generalized-reference-contract | `b29044a53b6c38896b422e75194d0ca797abb1affb9e48dcd3dfb933e67fa116` |
| `docs/design/components/Input/definition.md` | `docs/frontend/design/components/Input/definition.md` | generalized-reference-contract | `924dbc49527fd7bbe4b1c773bc49ff3f634861994e53bff3e0444b87f436a724` |
| `docs/design/components/Input/implementation/README.md` | `docs/frontend/design/components/Input/implementation/README.md` | generalized-reference-contract | `1b92e19247652a8b01c5dde7ce15555d244480ede6abf86b8ef6e1d2bf25b908` |
| `docs/design/components/Input/implementation/css.md` | `docs/frontend/design/components/Input/implementation/css.md` | generalized-reference-contract | `19678aac2809a8f922ffcecc864904410b6ae2ff0789cc5d70077d4685e6a228` |
| `docs/design/components/Input/implementation/typescript.md` | `docs/frontend/design/components/Input/implementation/typescript.md` | generalized-reference-contract | `7bc7f7b4830bed253305dadb4178940f7761e7ee78a911af9fcfa3490181c24c` |
| `docs/design/components/Input/styles.md` | `docs/frontend/design/components/Input/styles.md` | generalized-reference-contract | `1b2c145b58c23819e626218cb2acd5a2402b5bd7e26becc7325727455dedebcd` |
| `docs/design/components/Input/verification.md` | `docs/frontend/design/components/Input/verification.md` | generalized-reference-contract | `247ec91c4490579a3963aba3b8aecae1e05d8cb1479a180a7af7513092cbb681` |
| `docs/design/components/InputListField/README.md` | `docs/frontend/design/components/InputListField/README.md` | generalized-reference-contract | `bc6bba520b9585e709e634af503a87e6c822265d20a1f705b8904a42e0aae1aa` |
| `docs/design/components/InputListField/accessibility.md` | `docs/frontend/design/components/InputListField/accessibility.md` | generalized-reference-contract | `5c8fc046501ed296d317e95513d2ac7e35edeb293b77d265a219e5686bbeb519` |
| `docs/design/components/InputListField/behavior.md` | `docs/frontend/design/components/InputListField/behavior.md` | generalized-reference-contract | `51a6eb99cfb55addf91d615242c86a271b7d5c26d94fa7c2e913d95d8c5b8604` |
| `docs/design/components/InputListField/definition.md` | `docs/frontend/design/components/InputListField/definition.md` | generalized-reference-contract | `8d3d46a8f594fd6a07ad4d5ba83bd670788ac77aed78f22b7c5bfde659ac2e65` |
| `docs/design/components/InputListField/implementation/README.md` | `docs/frontend/design/components/InputListField/implementation/README.md` | generalized-reference-contract | `18fb56bc77518d2eaab3445ad737a0b266e36b826fbac1a2a14ac3c19b2980b4` |
| `docs/design/components/InputListField/implementation/typescript.md` | `docs/frontend/design/components/InputListField/implementation/typescript.md` | generalized-reference-contract | `142b1961d31d12539d10258389c050f7f307b2f06e6b3fb6ed6f617b2bfa18aa` |
| `docs/design/components/InputListField/styles.md` | `docs/frontend/design/components/InputListField/styles.md` | generalized-reference-contract | `2ffe55bc591524b7cd28bc8890a03a72f49d894d23941fcbe2541cf47f26f544` |
| `docs/design/components/InputListField/verification.md` | `docs/frontend/design/components/InputListField/verification.md` | generalized-reference-contract | `e14a6f3218ae7e81c047181242881b3be545b153daba379c6e4683a1e14102e6` |
| `docs/design/components/Link/README.md` | `docs/frontend/design/components/Link/README.md` | generalized-reference-contract | `e9fcc39a88b5b12a4217df543c67e739d6fa6de509ffa9b40d8bab05c1e863c1` |
| `docs/design/components/Link/accessibility.md` | `docs/frontend/design/components/Link/accessibility.md` | generalized-reference-contract | `f3609b3e4e894e9812181d8bb14cedb2fada8f09f46c938b4f5145fd18771752` |
| `docs/design/components/Link/behavior.md` | `docs/frontend/design/components/Link/behavior.md` | generalized-reference-contract | `2e480bcf3b198c0c9946eb8d33a2c78170206df78e0cbbd5650db3202cf12008` |
| `docs/design/components/Link/definition.md` | `docs/frontend/design/components/Link/definition.md` | generalized-reference-contract | `37e5ca48011a16dea675c9d136a69a2274bcafbe28a8098bdc38cf793613394c` |
| `docs/design/components/Link/implementation/README.md` | `docs/frontend/design/components/Link/implementation/README.md` | generalized-reference-contract | `279078af2ad80567bec29f75357ec24b535302df93f91a3064044396783c549a` |
| `docs/design/components/Link/implementation/css.md` | `docs/frontend/design/components/Link/implementation/css.md` | generalized-reference-contract | `08a274bc36d335a2358dc99ddeb07e3f4259a120ea6e7e5f98b55fcaedc7ce43` |
| `docs/design/components/Link/implementation/examples.md` | `docs/frontend/design/components/Link/implementation/examples.md` | generalized-reference-contract | `149878e9e7096eb29b49aa54eee717cc887acd2843f6fc0316447d90c3c3991b` |
| `docs/design/components/Link/implementation/typescript.md` | `docs/frontend/design/components/Link/implementation/typescript.md` | generalized-reference-contract | `fd35c1aba8e23573807460a92a9f4a423a6254e754917a83df13ff6db21e6675` |
| `docs/design/components/Link/styles.md` | `docs/frontend/design/components/Link/styles.md` | generalized-reference-contract | `ad9e5f273e9608a07e6e90800f3ed82aeefafe73f090e1cf5c795cebb93f5b9e` |
| `docs/design/components/Link/verification.md` | `docs/frontend/design/components/Link/verification.md` | generalized-reference-contract | `0e1df4ba8352fe247faf0033c0c216476c5118d8480a410630b8d644a2c4b8dc` |
| `docs/design/components/ListContentState/README.md` | `docs/frontend/design/components/ListContentState/README.md` | generalized-reference-contract | `d28c8c2ec504ba75ee415a69cc2169368167582de245dcf6175f1174ae3ba085` |
| `docs/design/components/ListContentState/accessibility.md` | `docs/frontend/design/components/ListContentState/accessibility.md` | generalized-reference-contract | `de297a3f494cb11e6a6ecef707fd5c810292aa62b2da252d8f78231da750848e` |
| `docs/design/components/ListContentState/behavior.md` | `docs/frontend/design/components/ListContentState/behavior.md` | generalized-reference-contract | `dee7cb00201bc67071247c25f74d92a2d13aa41b5c759142753bb82da64943ba` |
| `docs/design/components/ListContentState/definition.md` | `docs/frontend/design/components/ListContentState/definition.md` | generalized-reference-contract | `7965caa938eaa68bc56cb1c6c1055b19d0cf4b2f0668160a1049e9be1723c0e2` |
| `docs/design/components/ListContentState/styles.md` | `docs/frontend/design/components/ListContentState/styles.md` | generalized-reference-contract | `8821efd64aa7ab8be0353204693474dd11e56baa960ae25720807435c2ad038a` |
| `docs/design/components/ListContentState/verification.md` | `docs/frontend/design/components/ListContentState/verification.md` | generalized-reference-contract | `1641cd8eef88f6de85dfb071bab04ca8e65e8e588f6a61083a6269a55a27c872` |
| `docs/design/components/Menu/README.md` | `docs/frontend/design/components/Menu/README.md` | generalized-reference-contract | `f282cb059cdf05a63089ea50e41e97dad5da932e2c53387e4894f265604b4b35` |
| `docs/design/components/Menu/accessibility.md` | `docs/frontend/design/components/Menu/accessibility.md` | generalized-reference-contract | `2bba42d7d0384ac42d05d86b83302f81fe1a37affb0dfa1bd80fce6b402fe094` |
| `docs/design/components/Menu/behavior.md` | `docs/frontend/design/components/Menu/behavior.md` | generalized-reference-contract | `70daf324d72f9358f27bdcd6e228a38500e4982d8eb03e52f549525051959728` |
| `docs/design/components/Menu/definition.md` | `docs/frontend/design/components/Menu/definition.md` | generalized-reference-contract | `0abe380be84fb98ee353a821f8e13da693522ba03c5658269a9c7e28678041e1` |
| `docs/design/components/Menu/implementation/README.md` | `docs/frontend/design/components/Menu/implementation/README.md` | generalized-reference-contract | `615a3984cfa7b864865192465bdf3122c2826fe654a8c194f257c2ac53c61247` |
| `docs/design/components/Menu/implementation/css.md` | `docs/frontend/design/components/Menu/implementation/css.md` | generalized-reference-contract | `25571099b75ce2811ecbfe5cc25aa124cfe978d018f179c31461a6e337d53f85` |
| `docs/design/components/Menu/implementation/examples.md` | `docs/frontend/design/components/Menu/implementation/examples.md` | generalized-reference-contract | `72fca15f4c76e688dfcea9a2d8911c4aaff1f8f5b3a93308eef9800f152a1383` |
| `docs/design/components/Menu/implementation/typescript.md` | `docs/frontend/design/components/Menu/implementation/typescript.md` | generalized-reference-contract | `c9d1af9769fef8a4aacccf54c4d830f86388430aac4e64e87459dc551d8ff15e` |
| `docs/design/components/Menu/styles.md` | `docs/frontend/design/components/Menu/styles.md` | generalized-reference-contract | `360c864a7fb56f9ed42cbb5acbbaef47030d916531acdb1b54f914d9541d799b` |
| `docs/design/components/Menu/verification.md` | `docs/frontend/design/components/Menu/verification.md` | generalized-reference-contract | `75ee7fc4114819c1a3db450b263bb0ed2a7426d455733460fe1887d9ac392d9e` |
| `docs/design/components/Notification/README.md` | `docs/frontend/design/components/Notification/README.md` | generalized-reference-contract | `fdcdcc12b42eff5bf81817548740a5201fc1450775d6cc905cc0b87d9c9e5b44` |
| `docs/design/components/Notification/accessibility.md` | `docs/frontend/design/components/Notification/accessibility.md` | generalized-reference-contract | `7c0642e81237e1089ead08d803a4b993b53fa87400747cb64837373918c77f39` |
| `docs/design/components/Notification/behavior.md` | `docs/frontend/design/components/Notification/behavior.md` | generalized-reference-contract | `80360ae0033bc8d8e944b4692ed3392e4c5632ea21783714864f544520400262` |
| `docs/design/components/Notification/definition.md` | `docs/frontend/design/components/Notification/definition.md` | generalized-reference-contract | `889b201ad0133546793282a60f916298b43dcf25f9ea6d187d3a098fc3981e36` |
| `docs/design/components/Notification/implementation/README.md` | `docs/frontend/design/components/Notification/implementation/README.md` | generalized-reference-contract | `260231352c671497e96104b8e962eebcd6e401f965e9cb4753fc16b1d8bb9127` |
| `docs/design/components/Notification/implementation/css.md` | `docs/frontend/design/components/Notification/implementation/css.md` | generalized-reference-contract | `7cf57ff33f4ac825e0c720afec9e107f6e9609330bee09ae310efe004f105da2` |
| `docs/design/components/Notification/implementation/examples.md` | `docs/frontend/design/components/Notification/implementation/examples.md` | generalized-reference-contract | `4743558c40e2a365941b70fed5180b17662e6bc0d30f7efd6288937addd0cc29` |
| `docs/design/components/Notification/implementation/typescript.md` | `docs/frontend/design/components/Notification/implementation/typescript.md` | generalized-reference-contract | `c352d2876960fe09fa3ff0a00839c9b1559cfb05913f76766f6d973f88073366` |
| `docs/design/components/Notification/styles.md` | `docs/frontend/design/components/Notification/styles.md` | generalized-reference-contract | `d5d453bd1e4c5a701ac2008d70a20ca813d5ea0707fa69f35c7f7c8f69fc7be2` |
| `docs/design/components/Notification/verification.md` | `docs/frontend/design/components/Notification/verification.md` | generalized-reference-contract | `f78654975db4c8a273cfd764675f2cf0e72ea791bf1fa0f4e4cff4d3b6d459ff` |
| `docs/design/components/NumberInput/README.md` | `docs/frontend/design/components/NumberInput/README.md` | generalized-reference-contract | `da4809ca28027d9f97c3f7aeb3c3670a1bff8625165ab74edde590e4a57ea907` |
| `docs/design/components/NumberInput/accessibility.md` | `docs/frontend/design/components/NumberInput/accessibility.md` | generalized-reference-contract | `65ddcf323d37a1667b7d733baab43ce2a43f885d4d69f0b9c1bd90dd0b4d57fe` |
| `docs/design/components/NumberInput/behavior.md` | `docs/frontend/design/components/NumberInput/behavior.md` | generalized-reference-contract | `59185ac4b3eda258a787ff00a65de0b93893caeb4b6d61e36438c8d9272419df` |
| `docs/design/components/NumberInput/definition.md` | `docs/frontend/design/components/NumberInput/definition.md` | generalized-reference-contract | `be5923c30e66d95b19516764658c2acc8745a0607690286bd3d1649c29b9efc9` |
| `docs/design/components/NumberInput/implementation/README.md` | `docs/frontend/design/components/NumberInput/implementation/README.md` | generalized-reference-contract | `53421a4bd4f2d0d8d88aa30e774ce996860313ab6d09b554d643c00e1d51bbb8` |
| `docs/design/components/NumberInput/implementation/css.md` | `docs/frontend/design/components/NumberInput/implementation/css.md` | generalized-reference-contract | `417d42688d026a668a4f12d6dd3176d38f85fb4bcb58679941eb8ba4a312d5a2` |
| `docs/design/components/NumberInput/implementation/typescript.md` | `docs/frontend/design/components/NumberInput/implementation/typescript.md` | generalized-reference-contract | `fa5f791ac5f74c9091c459debdf241aa40af2658aac0f8febfa437a6f1258329` |
| `docs/design/components/NumberInput/styles.md` | `docs/frontend/design/components/NumberInput/styles.md` | generalized-reference-contract | `5d96f19955c8ee19c96df120bd8819b30d4e947e550dd3accc965ff2ae746576` |
| `docs/design/components/NumberInput/verification.md` | `docs/frontend/design/components/NumberInput/verification.md` | generalized-reference-contract | `2e52603adf0fe5bbceaf3b4f8afa4600032d7048f3a71bd2e10245c2d9aae454` |
| `docs/design/components/OpenPanel/README.md` | `docs/frontend/design/components/OpenPanel/README.md` | generalized-reference-contract | `9a8fea03a3b5321c4b1f4f9576f12d72fc2b1ce0cbbb72dce63bef0e7b97ddcb` |
| `docs/design/components/OpenPanel/accessibility.md` | `docs/frontend/design/components/OpenPanel/accessibility.md` | generalized-reference-contract | `0029cae440928c4bab39e635c40f4a25a3d42c58f746ab8b0cb4165654355afc` |
| `docs/design/components/OpenPanel/behavior.md` | `docs/frontend/design/components/OpenPanel/behavior.md` | generalized-reference-contract | `b8ebe9a6c0b39b6137c6223c7acb55573bd8e44e0436bbe8bf340764ac6f9efd` |
| `docs/design/components/OpenPanel/definition.md` | `docs/frontend/design/components/OpenPanel/definition.md` | generalized-reference-contract | `0bbeaeb83049a60288528214e1457467461ff007835bf22e1f38e1898cc62869` |
| `docs/design/components/OpenPanel/implementation/README.md` | `docs/frontend/design/components/OpenPanel/implementation/README.md` | generalized-reference-contract | `df250646080e0091783540c389b894c15da9a8514e12d95e0b8548ed8121b702` |
| `docs/design/components/OpenPanel/implementation/css.md` | `docs/frontend/design/components/OpenPanel/implementation/css.md` | generalized-reference-contract | `1d17ef583894d5657bf4421ac6cec1388122aecd95f68089132f303b89fde359` |
| `docs/design/components/OpenPanel/implementation/examples.md` | `docs/frontend/design/components/OpenPanel/implementation/examples.md` | generalized-reference-contract | `58e66daa2efde165cc3d185a02855897092011086a06d15f0425ff51a432f40a` |
| `docs/design/components/OpenPanel/implementation/typescript.md` | `docs/frontend/design/components/OpenPanel/implementation/typescript.md` | generalized-reference-contract | `bf7ee59910bdd9712dd71f5a0f38c7242a24044c93f3d9e546a4d0e6dd075a8a` |
| `docs/design/components/OpenPanel/styles.md` | `docs/frontend/design/components/OpenPanel/styles.md` | generalized-reference-contract | `16965302435c02bfba27846f62397766ff1f9c127c442edeff88617833f05507` |
| `docs/design/components/OpenPanel/verification.md` | `docs/frontend/design/components/OpenPanel/verification.md` | generalized-reference-contract | `91ba64839ae86a9d9aa01667dac72abd95698d4ad7a4d1c6c6a2e8e99e6f94fc` |
| `docs/design/components/PageHeader/README.md` | `docs/frontend/design/components/PageHeader/README.md` | generalized-reference-contract | `10d0798b80938b7df361b710b463ede91daa9470bdf0f891699de35999f90258` |
| `docs/design/components/PageHeader/accessibility.md` | `docs/frontend/design/components/PageHeader/accessibility.md` | generalized-reference-contract | `a20b6b8ab4965beb25dd8a912f6940d43c4d79c266c0caefd65fad2b758f3c81` |
| `docs/design/components/PageHeader/behavior.md` | `docs/frontend/design/components/PageHeader/behavior.md` | generalized-reference-contract | `497b83a94804fc78e986b392d778a049320c9aed4b8c5ddff53b557f44b7300c` |
| `docs/design/components/PageHeader/definition.md` | `docs/frontend/design/components/PageHeader/definition.md` | generalized-reference-contract | `3d3d80c84e65ed760b0931d3fe54c0e08c12075b3f4a16b37c27ea6f466a6e2d` |
| `docs/design/components/PageHeader/implementation/README.md` | `docs/frontend/design/components/PageHeader/implementation/README.md` | generalized-reference-contract | `d91be23dd3096425967bb411ba4b2d9bdf68926f23b498ac8d39771bc052367f` |
| `docs/design/components/PageHeader/implementation/css.md` | `docs/frontend/design/components/PageHeader/implementation/css.md` | generalized-reference-contract | `793d743d0d2da684846bd1ad6ecdff25ae6c0b755d2ce83be9ee6a54e505f7dd` |
| `docs/design/components/PageHeader/implementation/typescript.md` | `docs/frontend/design/components/PageHeader/implementation/typescript.md` | generalized-reference-contract | `bcc994b2bd243377cf5c52e27be9917da31d8b6e15f7b9b17764a8ef046ecd86` |
| `docs/design/components/PageHeader/styles.md` | `docs/frontend/design/components/PageHeader/styles.md` | generalized-reference-contract | `116168e1c66ecf6a228e92fb6b798e1d795e8f6d1a8afd44e5f42cb79e3273b3` |
| `docs/design/components/PageHeader/verification.md` | `docs/frontend/design/components/PageHeader/verification.md` | generalized-reference-contract | `d536ed6c3d30a9fe38cac403ddcd010bec795f5f90f205a7d2fd51d582fd8c79` |
| `docs/design/components/Pagination/README.md` | `docs/frontend/design/components/Pagination/README.md` | generalized-reference-contract | `592ad213ec79648736e234a3bd8658f9367d37caea020c2587a2fbec2b3a07b0` |
| `docs/design/components/Pagination/accessibility.md` | `docs/frontend/design/components/Pagination/accessibility.md` | generalized-reference-contract | `795c391ed39005684bb84ee29741cce179880759cefa1f30888638d7b0e963eb` |
| `docs/design/components/Pagination/behavior.md` | `docs/frontend/design/components/Pagination/behavior.md` | generalized-reference-contract | `d0f3bc7c0c543aafa2bef45283b9c36acac5750bcdb12acea876912d1cbba4b5` |
| `docs/design/components/Pagination/definition.md` | `docs/frontend/design/components/Pagination/definition.md` | generalized-reference-contract | `71949fbd89db7fb64e3bb059f50d9cf47ec18ea40f31537656b83540415534b5` |
| `docs/design/components/Pagination/implementation/README.md` | `docs/frontend/design/components/Pagination/implementation/README.md` | generalized-reference-contract | `ce0e69fe4f02b4e93695bce696f051243203f762ba9d64e5ce5353b1ef8031e9` |
| `docs/design/components/Pagination/implementation/css.md` | `docs/frontend/design/components/Pagination/implementation/css.md` | generalized-reference-contract | `f82a3dc08246c3021e2654f8a88a0e59a901482249c331781ef4ab1ea556d85b` |
| `docs/design/components/Pagination/implementation/examples.md` | `docs/frontend/design/components/Pagination/implementation/examples.md` | generalized-reference-contract | `6d377d5691a9096e881d11db2415e0924c631a6235b3d0c1c60be3185af70886` |
| `docs/design/components/Pagination/implementation/typescript.md` | `docs/frontend/design/components/Pagination/implementation/typescript.md` | generalized-reference-contract | `0fc8bfc1293fb45f485e8934c0ff662b232c904045331fca281af3d4b75323ad` |
| `docs/design/components/Pagination/styles.md` | `docs/frontend/design/components/Pagination/styles.md` | generalized-reference-contract | `360c2dfd5dbacce9c1e45b1d8bb9ae75a4c50b50ce79ce870f5432652b5b5439` |
| `docs/design/components/Pagination/verification.md` | `docs/frontend/design/components/Pagination/verification.md` | generalized-reference-contract | `362bb7687a68b32c2d7ce108819483ba8b39dc32f42b7fb71514b785deaf6a08` |
| `docs/design/components/PrivateIcon/README.md` | `docs/frontend/design/components/PrivateIcon/README.md` | generalized-reference-contract | `9c932206e4f458e6bff46e49dbd87c9f18998bd10154e94869e006290367e48f` |
| `docs/design/components/PrivateIcon/accessibility.md` | `docs/frontend/design/components/PrivateIcon/accessibility.md` | generalized-reference-contract | `1ca8b9402c7ca98ede558ce0e302a6b6d64431d5cae16afc41154ecdc006b7cc` |
| `docs/design/components/PrivateIcon/behavior.md` | `docs/frontend/design/components/PrivateIcon/behavior.md` | generalized-reference-contract | `53b6e9abc00984b8e92fe777b112b36ae0534150f6c5f9e9bbfd0a728c2188dc` |
| `docs/design/components/PrivateIcon/definition.md` | `docs/frontend/design/components/PrivateIcon/definition.md` | generalized-reference-contract | `33035870fa4bf00575945e5790fc0aa9d0c0cdcf46708e1f78384c851a130f11` |
| `docs/design/components/PrivateIcon/implementation/README.md` | `docs/frontend/design/components/PrivateIcon/implementation/README.md` | generalized-reference-contract | `26cf8ed5d020df0b14c535a40114a36cdf65db3589027d426654c9fa39964bef` |
| `docs/design/components/PrivateIcon/implementation/css.md` | `docs/frontend/design/components/PrivateIcon/implementation/css.md` | generalized-reference-contract | `4784308a2cdfa996e1ed899a604002bcfc775f7fa174e9bbcc6f4925131908d3` |
| `docs/design/components/PrivateIcon/implementation/examples.md` | `docs/frontend/design/components/PrivateIcon/implementation/examples.md` | generalized-reference-contract | `a6051c204259a1d39455c0bd766a51128fa03095a237213b8be1938d6625d901` |
| `docs/design/components/PrivateIcon/implementation/typescript.md` | `docs/frontend/design/components/PrivateIcon/implementation/typescript.md` | generalized-reference-contract | `485c26af4ce12d807ba8c3abc4f0206e5697d2ddc7758faf20cdd5dc9ac7b631` |
| `docs/design/components/PrivateIcon/styles.md` | `docs/frontend/design/components/PrivateIcon/styles.md` | generalized-reference-contract | `2a311a39df55742edf522816bc118e6fb14268e6685a302ead34d403948f2e5b` |
| `docs/design/components/PrivateIcon/verification.md` | `docs/frontend/design/components/PrivateIcon/verification.md` | generalized-reference-contract | `8e71e303cab73f989f7cc5ee54b5244429a7928d6163d11b0cdf0ad4e7fbb2cb` |
| `docs/design/components/Radio/README.md` | `docs/frontend/design/components/Radio/README.md` | generalized-reference-contract | `3a962cf957bd217ef178e27780764fe2300c41c9c87a6d63ea205564540bdd7e` |
| `docs/design/components/Radio/accessibility.md` | `docs/frontend/design/components/Radio/accessibility.md` | generalized-reference-contract | `2bf3c79c665cc751361790d3bd937164c8457b33f908250c87dc9cff3a6e5aba` |
| `docs/design/components/Radio/behavior.md` | `docs/frontend/design/components/Radio/behavior.md` | generalized-reference-contract | `442e5108152feb220f9741866e64bf22e0d4723079496b2a274526e0b0dedbc3` |
| `docs/design/components/Radio/definition.md` | `docs/frontend/design/components/Radio/definition.md` | generalized-reference-contract | `ffed0614971949bdc3e4cdca4a68a0b91cf7fcd7166f564914f2939cc2ed1a95` |
| `docs/design/components/Radio/implementation/README.md` | `docs/frontend/design/components/Radio/implementation/README.md` | generalized-reference-contract | `6ee7b2116adf58438306a7488db3f6dc8452e48b4dae9d9629253b009b0a1756` |
| `docs/design/components/Radio/implementation/css.md` | `docs/frontend/design/components/Radio/implementation/css.md` | generalized-reference-contract | `797cdc9612b90bfa1dc191ca2a5c6eb0fd048a06e878cb81b0c0a7ad84b5c437` |
| `docs/design/components/Radio/implementation/examples.md` | `docs/frontend/design/components/Radio/implementation/examples.md` | generalized-reference-contract | `c2943715a0c15f1ea4b897ea044601a90d6122a1c5ff08d2f1b63cc23e2652bd` |
| `docs/design/components/Radio/implementation/typescript.md` | `docs/frontend/design/components/Radio/implementation/typescript.md` | generalized-reference-contract | `19055a28abed4ee98d4215d4b80e9ac629b753bf9fea982bee69527336009159` |
| `docs/design/components/Radio/styles.md` | `docs/frontend/design/components/Radio/styles.md` | generalized-reference-contract | `852a894ff0b95cb7853aeab69e5a8aed96877564b3e4c463ea04a6368951f489` |
| `docs/design/components/Radio/verification.md` | `docs/frontend/design/components/Radio/verification.md` | generalized-reference-contract | `4c3c7a2345b19e7dc8dc093b70705444d571fd833ca4b50c595d1786f8a95658` |
| `docs/design/components/SNBV1/README.md` | `audit/jdc/design/components/SNBV1/README.md` | observed-jdc-shell-only | `ccd048c6245088e2fd60e0e40bc8caafcfa1fd9b1099d2e7eb1c78eb2d01bb85` |
| `docs/design/components/SNBV1/accessibility.md` | `audit/jdc/design/components/SNBV1/accessibility.md` | observed-jdc-shell-only | `422c3a2f5e1af1ff099ec341bf5a152c80ada9b530ef5f0a8a396047f182b495` |
| `docs/design/components/SNBV1/behavior.md` | `audit/jdc/design/components/SNBV1/behavior.md` | observed-jdc-shell-only | `b30d8594f331aaca6302bf3a6a0725b9b1c43a06acea182bf41f707f39c6310f` |
| `docs/design/components/SNBV1/definition.md` | `audit/jdc/design/components/SNBV1/definition.md` | observed-jdc-shell-only | `c1a871b9fd2966c88eb2dc0f2dfe2a5575a2f23e3624915a24bae1524d9ce7dd` |
| `docs/design/components/SNBV1/implementation/README.md` | `audit/jdc/design/components/SNBV1/implementation/README.md` | observed-jdc-shell-only | `10c52307e9c294c1f8344c9f2424b209207ade4df4648dd9e827364660016331` |
| `docs/design/components/SNBV1/implementation/css.md` | `audit/jdc/design/components/SNBV1/implementation/css.md` | observed-jdc-shell-only | `502de778d33d2603ad0e39d5e90d91bda2c14750e5278f6e6e59297972d527fa` |
| `docs/design/components/SNBV1/implementation/reference.md` | `audit/jdc/design/components/SNBV1/implementation/reference.md` | observed-jdc-shell-only | `d5d89c2c436b1ec9fa2bf7fb7b5212963449d18089b7d5964a23be883b9018e8` |
| `docs/design/components/SNBV1/implementation/typescript.md` | `audit/jdc/design/components/SNBV1/implementation/typescript.md` | observed-jdc-shell-only | `703c5b1ab920e3f9a6dde2d143c8a243b4c3b4637fb2b870d012cdc5f97661b3` |
| `docs/design/components/SNBV1/styles.md` | `audit/jdc/design/components/SNBV1/styles.md` | observed-jdc-shell-only | `1caee93693d0ee2d5f0c99a33bea647749235c6f406268249f188827d50a1454` |
| `docs/design/components/SNBV1/verification.md` | `audit/jdc/design/components/SNBV1/verification.md` | observed-jdc-shell-only | `b22d970453b06a1085efd0c179ea9bec3208c29ba046c422668a8dbc139a1299` |
| `docs/design/components/SNBV2/README.md` | `audit/jdc/design/components/SNBV2/README.md` | observed-jdc-shell-only | `2e239eec5edafdbdfc5169250cffd7e0e027172ba3351fd284d3a4c0f28a8a87` |
| `docs/design/components/SNBV2/accessibility.md` | `audit/jdc/design/components/SNBV2/accessibility.md` | observed-jdc-shell-only | `44bf7c23b2eb35f33639ab7d6ffa9e733424e2371cdc23f3b1d0b0728cb72d35` |
| `docs/design/components/SNBV2/behavior.md` | `audit/jdc/design/components/SNBV2/behavior.md` | observed-jdc-shell-only | `028fcb42e90890d0383ed1874be3064f3d057636a2914f7db459fdf9f2565059` |
| `docs/design/components/SNBV2/definition.md` | `audit/jdc/design/components/SNBV2/definition.md` | observed-jdc-shell-only | `7f833eb1b312d9b559f0712514816fc3c24ee00cdd6b80e5a3f27852321989a0` |
| `docs/design/components/SNBV2/implementation/README.md` | `audit/jdc/design/components/SNBV2/implementation/README.md` | observed-jdc-shell-only | `f0f9e9f543b09966698b26808ade515ec11625bda0c91a5612eecdf31ac6ec41` |
| `docs/design/components/SNBV2/implementation/css.md` | `audit/jdc/design/components/SNBV2/implementation/css.md` | observed-jdc-shell-only | `fdcaa5ec457c3580eb51c64c8505c2121268b6d260e8558f87b60f270bd34b0d` |
| `docs/design/components/SNBV2/implementation/typescript.md` | `audit/jdc/design/components/SNBV2/implementation/typescript.md` | observed-jdc-shell-only | `bc4a647836e2443284b45448233bfe1522e4a083d27c779aac96e4f49cf31cf6` |
| `docs/design/components/SNBV2/styles.md` | `audit/jdc/design/components/SNBV2/styles.md` | observed-jdc-shell-only | `21d40c67f0cc29ffdfe35badb7afb05becc423d5bfce25961d923c6486c28b25` |
| `docs/design/components/SNBV2/verification.md` | `audit/jdc/design/components/SNBV2/verification.md` | observed-jdc-shell-only | `7410506901934d0a154cced780ac9d8dadc06a8fff998d6c4722ccd374696660` |
| `docs/design/components/Scrollbar/README.md` | `docs/frontend/design/components/Scrollbar/README.md` | generalized-reference-contract | `c9422899560f0bc24544c418697f9b19268501ad0d592da4c69882c83fd6fa7f` |
| `docs/design/components/Scrollbar/accessibility.md` | `docs/frontend/design/components/Scrollbar/accessibility.md` | generalized-reference-contract | `97a9e47f85e7a42b6adbdde3c96e8c13782471ab89389fa0c70e8212e56904ec` |
| `docs/design/components/Scrollbar/behavior.md` | `docs/frontend/design/components/Scrollbar/behavior.md` | generalized-reference-contract | `2354c8985784cd6c5aff045dfeb30ed6959882795f175b071485baace01a1414` |
| `docs/design/components/Scrollbar/definition.md` | `docs/frontend/design/components/Scrollbar/definition.md` | generalized-reference-contract | `3038946fafc83a3cb991b2728bb60ec44f659436997c98dffdc47b8c5d3fdf6d` |
| `docs/design/components/Scrollbar/implementation/README.md` | `docs/frontend/design/components/Scrollbar/implementation/README.md` | generalized-reference-contract | `bbac34d589522350daa09eaf41f84a7a50e4b7dde6be7709c8862371a2c5f6bc` |
| `docs/design/components/Scrollbar/implementation/css.md` | `docs/frontend/design/components/Scrollbar/implementation/css.md` | generalized-reference-contract | `d32881ee77c86bda38e83ac9409418f305c620d31fbc8e54bc7a54155cd00e8a` |
| `docs/design/components/Scrollbar/implementation/examples.md` | `docs/frontend/design/components/Scrollbar/implementation/examples.md` | generalized-reference-contract | `4e2d3967c8098e77242c30c8669f33089b87a1662295d7063dcd4ad8eb944b97` |
| `docs/design/components/Scrollbar/implementation/reference.md` | `docs/frontend/design/components/Scrollbar/implementation/reference.md` | generalized-reference-contract | `40a02cf1cc711f23fc970e1d00feb536bb43c78b185737946e319842d66da413` |
| `docs/design/components/Scrollbar/implementation/typescript.md` | `docs/frontend/design/components/Scrollbar/implementation/typescript.md` | generalized-reference-contract | `dac786b64117cfd65fd0ade013e36af66569dec53b4faee45f24bb4618b883a1` |
| `docs/design/components/Scrollbar/styles.md` | `docs/frontend/design/components/Scrollbar/styles.md` | generalized-reference-contract | `446f74efd4a6d97634d3b2fdb7d4bdcb1d30d4fd78c0035af0ca07bfd2f3b612` |
| `docs/design/components/Scrollbar/verification.md` | `docs/frontend/design/components/Scrollbar/verification.md` | generalized-reference-contract | `d0db2846d629c4fbfe4271c27904e656cdbdb75ed56b9264605ceb4a81033881` |
| `docs/design/components/Search/README.md` | `docs/frontend/design/components/Search/README.md` | generalized-reference-contract | `46334be0f052fb7c2f0b5305c47d15c36564db0af00d1d38098a8596d99f738d` |
| `docs/design/components/Search/accessibility.md` | `docs/frontend/design/components/Search/accessibility.md` | generalized-reference-contract | `11e1e6c7a7743f7a127a7f13d1b2e108141dcf2957d295543c2b02f075edfa43` |
| `docs/design/components/Search/behavior.md` | `docs/frontend/design/components/Search/behavior.md` | generalized-reference-contract | `6a2728b54b682009930d031af191d0274e2095e361f92f7ffdec128d6a8dde25` |
| `docs/design/components/Search/definition.md` | `docs/frontend/design/components/Search/definition.md` | generalized-reference-contract | `c185c293178dc321e980e9d9da561d42786ea10c01b0b020bd8d4b55084817b2` |
| `docs/design/components/Search/implementation/README.md` | `docs/frontend/design/components/Search/implementation/README.md` | generalized-reference-contract | `315ee9f7339923cc2c01caa17333aebb41c38a2873d4c6b258d05dd06490b03d` |
| `docs/design/components/Search/implementation/css.md` | `docs/frontend/design/components/Search/implementation/css.md` | generalized-reference-contract | `caea6a84f26b795fdab04d3f339de16e7d6811582f6f9f1359f55dd137519c7c` |
| `docs/design/components/Search/implementation/typescript.md` | `docs/frontend/design/components/Search/implementation/typescript.md` | generalized-reference-contract | `aa2880bcb26194791d8c8dcad4f3ce37467222568513ecb0dfe641f7b0712873` |
| `docs/design/components/Search/styles.md` | `docs/frontend/design/components/Search/styles.md` | generalized-reference-contract | `8faea47431b39f2be3e65b533956640b13069c415b8a8ebb56b72a8b2185c571` |
| `docs/design/components/Search/verification.md` | `docs/frontend/design/components/Search/verification.md` | generalized-reference-contract | `9cce76e2d890867a76b2ec67bbbe2e0d4a94f7caf5e6c3bd04a7e9e148a982db` |
| `docs/design/components/SegmentedControl/README.md` | `docs/frontend/design/components/SegmentedControl/README.md` | generalized-reference-contract | `ac6e9f4ea7620e325c5a0607db8827d31e0e0470e08d007152e788b9b513eed7` |
| `docs/design/components/SegmentedControl/accessibility.md` | `docs/frontend/design/components/SegmentedControl/accessibility.md` | generalized-reference-contract | `e047a5d7302486b2e58a37e67e1f497c7e812dddca1363d6939399f9120aa410` |
| `docs/design/components/SegmentedControl/behavior.md` | `docs/frontend/design/components/SegmentedControl/behavior.md` | generalized-reference-contract | `8df8513aa9e1cb1ab36e877de5bceac7e93d8512ec1d6ca754a0b8d7ee6df44f` |
| `docs/design/components/SegmentedControl/definition.md` | `docs/frontend/design/components/SegmentedControl/definition.md` | generalized-reference-contract | `7c2471089fff5f8445f2021113696dbd8c430189da34be0742bf515129d89e31` |
| `docs/design/components/SegmentedControl/implementation/README.md` | `docs/frontend/design/components/SegmentedControl/implementation/README.md` | generalized-reference-contract | `13fc0a0f4ea5440b4893c624ad028dad2d1395688d62890c0a81d392d08e42e7` |
| `docs/design/components/SegmentedControl/implementation/css.md` | `docs/frontend/design/components/SegmentedControl/implementation/css.md` | generalized-reference-contract | `af0b50c24c994775ef866c5d278ee55de1fb6f606391049903c50a6377371ab7` |
| `docs/design/components/SegmentedControl/implementation/examples.md` | `docs/frontend/design/components/SegmentedControl/implementation/examples.md` | generalized-reference-contract | `4630285f5aaf46f82ab299dd1cc8ec2dab3db43726014f75cc74aaa5508aa39e` |
| `docs/design/components/SegmentedControl/implementation/typescript.md` | `docs/frontend/design/components/SegmentedControl/implementation/typescript.md` | generalized-reference-contract | `82348061e3be0a8eb94f2090190c257eb76d7410c6310e7233ac0d63420bed1e` |
| `docs/design/components/SegmentedControl/styles.md` | `docs/frontend/design/components/SegmentedControl/styles.md` | generalized-reference-contract | `ef99eca7ee5f1fdbd8434917b7e1f38eb67c322f77002a7a82ccd525139057ff` |
| `docs/design/components/SegmentedControl/verification.md` | `docs/frontend/design/components/SegmentedControl/verification.md` | generalized-reference-contract | `87899987c704c1b6ff9cb4315bc2cfbb7d74548d5bbb0ff3fb26e8c85fc0a394` |
| `docs/design/components/Select/README.md` | `docs/frontend/design/components/Select/README.md` | generalized-reference-contract | `166505c8adbc130cacb3b06c11d5fa194c29b34039866d44fd20adbac22b6bd1` |
| `docs/design/components/Select/accessibility.md` | `docs/frontend/design/components/Select/accessibility.md` | generalized-reference-contract | `10aeaef1ff389db0817dedbee9ed0fcbb33d959926c9ff7411dcded359c09dc5` |
| `docs/design/components/Select/behavior.md` | `docs/frontend/design/components/Select/behavior.md` | generalized-reference-contract | `cac1e5c1237650b03128a690c38dd5e4b523a63a8c6c31b9395d0111ac919b79` |
| `docs/design/components/Select/definition.md` | `docs/frontend/design/components/Select/definition.md` | generalized-reference-contract | `0c506962436b453abaae82918df4d0712029f8f32a8f933baf499f03f669b32d` |
| `docs/design/components/Select/implementation/README.md` | `docs/frontend/design/components/Select/implementation/README.md` | generalized-reference-contract | `d9756f1379e991101c93a9c6478b6a6fe4b865d1d4f52c0cf5afa6add93b3742` |
| `docs/design/components/Select/implementation/css.md` | `docs/frontend/design/components/Select/implementation/css.md` | generalized-reference-contract | `4117c7ada855245adac3bff7160adcb7e9d0925069c03c1915bd075ff2c65371` |
| `docs/design/components/Select/implementation/examples.md` | `docs/frontend/design/components/Select/implementation/examples.md` | generalized-reference-contract | `939efe9ea38cd2e51c22c25247daeaa6af151211c131debb5e96e4b7edd5ae20` |
| `docs/design/components/Select/implementation/typescript.md` | `docs/frontend/design/components/Select/implementation/typescript.md` | generalized-reference-contract | `5896714730a99bcb051fcb1e4d775dbec08b7e66d0896ef63853adf0377b128e` |
| `docs/design/components/Select/styles.md` | `docs/frontend/design/components/Select/styles.md` | generalized-reference-contract | `5f513ab0d2c9efaaa38164b838a5e9bc8d387b5c348054f3b20a259767be572d` |
| `docs/design/components/Select/verification.md` | `docs/frontend/design/components/Select/verification.md` | generalized-reference-contract | `fad7c8f10a13b69daf51d98cbdd90c54ee4684f161c07dcfb70d1dfa49f26299` |
| `docs/design/components/Skeleton/README.md` | `docs/frontend/design/components/Skeleton/README.md` | generalized-reference-contract | `8531b52ce54178c0e1e2f44bfe567a925fa6e75bab2c86ebf2df6fcf81a15bf9` |
| `docs/design/components/Skeleton/accessibility.md` | `docs/frontend/design/components/Skeleton/accessibility.md` | generalized-reference-contract | `50afd6e248fffff265eaf9db8f1c055f9990593affa89d842827c17c9825c980` |
| `docs/design/components/Skeleton/behavior.md` | `docs/frontend/design/components/Skeleton/behavior.md` | generalized-reference-contract | `8fde6cbeb4dd6de3a4bc9303ac9a7d747f2a0503a9834ae77df98627dfbde0cd` |
| `docs/design/components/Skeleton/definition.md` | `docs/frontend/design/components/Skeleton/definition.md` | generalized-reference-contract | `418cdea488803a1af7d210ff84f667b768ada6cb3ca6baafc2981aab98a1779c` |
| `docs/design/components/Skeleton/styles.md` | `docs/frontend/design/components/Skeleton/styles.md` | generalized-reference-contract | `6a8e18ddbdf33a0d5184c874836d2d764080ada8024be29b632ed08cdcc06323` |
| `docs/design/components/Skeleton/verification.md` | `docs/frontend/design/components/Skeleton/verification.md` | generalized-reference-contract | `909ceff72928e0f1aefd614014d819d5b9c9770399c011bb4cdda1e49534d89c` |
| `docs/design/components/Slider/README.md` | `docs/frontend/design/components/Slider/README.md` | generalized-reference-contract | `256dd05d6a2dc8f106ae5beb6db51122871ababd2214d719d914eecb85c630cf` |
| `docs/design/components/Slider/accessibility.md` | `docs/frontend/design/components/Slider/accessibility.md` | generalized-reference-contract | `4a2caf61308ccbb39bc977afeede9751ed98b4f05127014213a0152d57a8deae` |
| `docs/design/components/Slider/behavior.md` | `docs/frontend/design/components/Slider/behavior.md` | generalized-reference-contract | `0d934af2c820f7bd903953a4317c155daf93f1a061d2be423daa1a29637e31f3` |
| `docs/design/components/Slider/definition.md` | `docs/frontend/design/components/Slider/definition.md` | generalized-reference-contract | `a1be33d19dfb0c6669819ed7811f867bebee25f4ab182878d11e2cfc7df31d49` |
| `docs/design/components/Slider/implementation/README.md` | `docs/frontend/design/components/Slider/implementation/README.md` | generalized-reference-contract | `e31dcbb603f8a08cf58720d527c0d15bc4a4d5f2f5b0f6ce954845bc430307cf` |
| `docs/design/components/Slider/implementation/css.md` | `docs/frontend/design/components/Slider/implementation/css.md` | generalized-reference-contract | `8526603e9a0bc71cadd6e1054811c50e3c420bf67ce75de3623eef57ed8bc9ec` |
| `docs/design/components/Slider/implementation/typescript.md` | `docs/frontend/design/components/Slider/implementation/typescript.md` | generalized-reference-contract | `4aed001f2716b97c6314b06d680addc31d3c31320140eae97d4f73305194e674` |
| `docs/design/components/Slider/styles.md` | `docs/frontend/design/components/Slider/styles.md` | generalized-reference-contract | `bdf1dfd70b59436aa68e5a403cd9d1cbc7b785c1868c140f02133f900524d4c7` |
| `docs/design/components/Slider/verification.md` | `docs/frontend/design/components/Slider/verification.md` | generalized-reference-contract | `efbd9c2a91ae854642bc79fe2ae22e1eb54883f059c12621afaa885400390ca4` |
| `docs/design/components/Spinner/README.md` | `docs/frontend/design/components/Spinner/README.md` | generalized-reference-contract | `1eb3dd4596b84e236a55fed3d224613ee7da7cb2e84113eea67cd1f172f29959` |
| `docs/design/components/Spinner/accessibility.md` | `docs/frontend/design/components/Spinner/accessibility.md` | generalized-reference-contract | `869f480d5e6dc178d2c153fa3fd9cb3c33dc1396f3c1dff42a52e93057c116ce` |
| `docs/design/components/Spinner/behavior.md` | `docs/frontend/design/components/Spinner/behavior.md` | generalized-reference-contract | `82319f6cd3f21e59f4b2f89dacc0aac42d2d4be23018ccd1dca7089e3ec86e4c` |
| `docs/design/components/Spinner/definition.md` | `docs/frontend/design/components/Spinner/definition.md` | generalized-reference-contract | `237d251b8f6e78a1864e259317386eb736453696c95dadb138b7d82ae1555590` |
| `docs/design/components/Spinner/implementation/README.md` | `docs/frontend/design/components/Spinner/implementation/README.md` | generalized-reference-contract | `135cb9390c9d74e422a5c22cdfcdd174fbb618e464ee236427ecea6a7588c1d7` |
| `docs/design/components/Spinner/implementation/css.md` | `docs/frontend/design/components/Spinner/implementation/css.md` | generalized-reference-contract | `2827cff1082b024889eca3db6af6c7a93f240b7a4bd8eb58b72bae87cb0b1e49` |
| `docs/design/components/Spinner/implementation/examples.md` | `docs/frontend/design/components/Spinner/implementation/examples.md` | generalized-reference-contract | `67de7433662d6ebc66aeede3d00b1965c21e3124b375fb99c94e125993d4c4b3` |
| `docs/design/components/Spinner/implementation/typescript.md` | `docs/frontend/design/components/Spinner/implementation/typescript.md` | generalized-reference-contract | `991ec048b671764b2e1a6391dd1f586eb815c3d50e37574b23676398895885b5` |
| `docs/design/components/Spinner/styles.md` | `docs/frontend/design/components/Spinner/styles.md` | generalized-reference-contract | `f8166ea27bf152f23ac09d327ea04bf111f475000c412eeb1b08d388270d2ba7` |
| `docs/design/components/Spinner/verification.md` | `docs/frontend/design/components/Spinner/verification.md` | generalized-reference-contract | `d269bff9d5548e95910a215d438f5fd9a5af51ac8359119abc1301d29b16751a` |
| `docs/design/components/SplitButton/README.md` | `docs/frontend/design/components/SplitButton/README.md` | generalized-reference-contract | `a6946445bd290878885058e6c7cced7c27bcc2452741c3d821f4fa95c74ca62c` |
| `docs/design/components/SplitButton/accessibility.md` | `docs/frontend/design/components/SplitButton/accessibility.md` | generalized-reference-contract | `c6949bc42770527934bbfdf3b76333b34ecd8ab4d44751c5ba0882ebf640d8fc` |
| `docs/design/components/SplitButton/behavior.md` | `docs/frontend/design/components/SplitButton/behavior.md` | generalized-reference-contract | `a13ba55327b7d9e528715a1b97bffdfd38ef117c95128e795552ed9a8244bb31` |
| `docs/design/components/SplitButton/definition.md` | `docs/frontend/design/components/SplitButton/definition.md` | generalized-reference-contract | `34d2619e11113c75886bcdd402823e74362b2bc6450dfac675e023ba76b2ce28` |
| `docs/design/components/SplitButton/implementation/README.md` | `docs/frontend/design/components/SplitButton/implementation/README.md` | generalized-reference-contract | `6e3401c382af25f23a63180f65ea2551129b12dc90728b6972069195836249f7` |
| `docs/design/components/SplitButton/implementation/css.md` | `docs/frontend/design/components/SplitButton/implementation/css.md` | generalized-reference-contract | `2f73ed3b520c35dd7e408e6e01d339a40a2f42e9a0021a618500b61879578143` |
| `docs/design/components/SplitButton/implementation/examples.md` | `docs/frontend/design/components/SplitButton/implementation/examples.md` | generalized-reference-contract | `93df654cac58105bf2bab8e5680becf7461e1fc731bb0219be8360014ad812b6` |
| `docs/design/components/SplitButton/implementation/typescript.md` | `docs/frontend/design/components/SplitButton/implementation/typescript.md` | generalized-reference-contract | `9485f8c247347d22ace8f0deeaf67eae627d78aac3b72e373180fab731b278da` |
| `docs/design/components/SplitButton/styles.md` | `docs/frontend/design/components/SplitButton/styles.md` | generalized-reference-contract | `b57846b432d30be0964935cde2a08457b2c50cb4aa1af52d2c887ddaf3dd5247` |
| `docs/design/components/SplitButton/verification.md` | `docs/frontend/design/components/SplitButton/verification.md` | generalized-reference-contract | `3f34ccf9c1661450dfff00f96f348245551701c93be4547df92839918fa193a1` |
| `docs/design/components/Status/README.md` | `docs/frontend/design/components/Status/README.md` | generalized-reference-contract | `9e72e89ec9fc796f33653f326b742d33fb8c8493a9edf7ed869705b6e4648a52` |
| `docs/design/components/Status/accessibility.md` | `docs/frontend/design/components/Status/accessibility.md` | generalized-reference-contract | `98aeb465011ff98c8acda5cb79ed227efc0c8da58994abf62604a0e5be1d31e9` |
| `docs/design/components/Status/behavior.md` | `docs/frontend/design/components/Status/behavior.md` | generalized-reference-contract | `5bbe900083eadd6bdd4273d36c05832800a4cd5961c87554263aaec036ae0b16` |
| `docs/design/components/Status/definition.md` | `docs/frontend/design/components/Status/definition.md` | generalized-reference-contract | `e7440a2794e6884876caecc1a9c6001284be246282fe66cb1c1ac5f84272e8bb` |
| `docs/design/components/Status/implementation/README.md` | `docs/frontend/design/components/Status/implementation/README.md` | generalized-reference-contract | `4bb57a652762d85769cebb72f424e61aa77bd8d4a17c354ef647c75c0fa3df41` |
| `docs/design/components/Status/implementation/css.md` | `docs/frontend/design/components/Status/implementation/css.md` | generalized-reference-contract | `b332b3436361459c2f0cfe2a989b96f02b77ea451f4e05e41243f024ff69851f` |
| `docs/design/components/Status/implementation/examples.md` | `docs/frontend/design/components/Status/implementation/examples.md` | generalized-reference-contract | `53e937601d31fb3482df4f1064f290454819ee527559012041af98c55e6051aa` |
| `docs/design/components/Status/implementation/typescript.md` | `docs/frontend/design/components/Status/implementation/typescript.md` | generalized-reference-contract | `33e0bb43089be78cb4a0778d6a520b9cb0f20956efd52a4f639cd0521748d826` |
| `docs/design/components/Status/styles.md` | `docs/frontend/design/components/Status/styles.md` | generalized-reference-contract | `9b72c2aed4c7740fa8b39b77d40ba20e965ef5521685a706998c3c8dbaba1218` |
| `docs/design/components/Status/verification.md` | `docs/frontend/design/components/Status/verification.md` | generalized-reference-contract | `6d93be5668eb5f321c334cee3d57c9a4b52c30faf19b8b20db47bf21741d5f7a` |
| `docs/design/components/Stepper/README.md` | `docs/frontend/design/components/Stepper/README.md` | generalized-reference-contract | `15e62ffb9f564878a4ba74259a83ce8af1fdbc6fb6f0c6e243d47890786feb7b` |
| `docs/design/components/Stepper/accessibility.md` | `docs/frontend/design/components/Stepper/accessibility.md` | generalized-reference-contract | `afbe176f33d310c5d8c72c1186f79606547deaed1b228f7a1b197fb5edfe7554` |
| `docs/design/components/Stepper/behavior.md` | `docs/frontend/design/components/Stepper/behavior.md` | generalized-reference-contract | `84d35e2d253a9f7c4a1836d4d8ad67a0427ff678dd27e718b090d04ee9b49e6f` |
| `docs/design/components/Stepper/definition.md` | `docs/frontend/design/components/Stepper/definition.md` | generalized-reference-contract | `d3d5743ebfb471bdc6db0646852e8cf9a7c7534bc0fac3089872da612b3743e1` |
| `docs/design/components/Stepper/implementation/README.md` | `docs/frontend/design/components/Stepper/implementation/README.md` | generalized-reference-contract | `a129ab3fc2b51537b77f75b82a79a84d582604991d00c012fbeb104d89d4715a` |
| `docs/design/components/Stepper/implementation/css.md` | `docs/frontend/design/components/Stepper/implementation/css.md` | generalized-reference-contract | `62c9b714fcaf9ac79522115a74e3d16503d8e12babc73c9a6491f42cc6405fef` |
| `docs/design/components/Stepper/implementation/examples.md` | `docs/frontend/design/components/Stepper/implementation/examples.md` | generalized-reference-contract | `083c84f585f9ed04e8d5c07f32674f2fa4e0931eea5a0037c225405f3ecd29aa` |
| `docs/design/components/Stepper/implementation/typescript.md` | `docs/frontend/design/components/Stepper/implementation/typescript.md` | generalized-reference-contract | `8f0f9b526aa3b8bf9c1d8c6a663c0da981a1a196d3af7bb878ffe4f530375176` |
| `docs/design/components/Stepper/styles.md` | `docs/frontend/design/components/Stepper/styles.md` | generalized-reference-contract | `b6dd650598abfb9dc5da796453f832d76ecaa93db1fc4ea0149547e9c6ef87bd` |
| `docs/design/components/Stepper/verification.md` | `docs/frontend/design/components/Stepper/verification.md` | generalized-reference-contract | `ed742cfca918720437aec597cdb663bfc176316eccd42ac03880737e24f2c3dd` |
| `docs/design/components/Switch/README.md` | `docs/frontend/design/components/Switch/README.md` | generalized-reference-contract | `e353ce7dde96df956750507ca76287dfc4588eb1802bc40fd2f5b5137e387ce8` |
| `docs/design/components/Switch/accessibility.md` | `docs/frontend/design/components/Switch/accessibility.md` | generalized-reference-contract | `0d862d66e7000d4e7f501160b9b73b4bf7a48275925c33208a10dfb5df4ac1a5` |
| `docs/design/components/Switch/behavior.md` | `docs/frontend/design/components/Switch/behavior.md` | generalized-reference-contract | `7fc355c91e6ae1f4a483c5713a6fe7f149b117019b4deef239afee980aa81d4f` |
| `docs/design/components/Switch/definition.md` | `docs/frontend/design/components/Switch/definition.md` | generalized-reference-contract | `85cfc8c7a4c7e5ebcb224ee4dea1eca1dea6b03e3c37d719e77cf3273194cffb` |
| `docs/design/components/Switch/implementation/README.md` | `docs/frontend/design/components/Switch/implementation/README.md` | generalized-reference-contract | `409b70a519ce9de69daee7c6da063911b50ff5c0bb2e43b5c3f5c2fae7e34b00` |
| `docs/design/components/Switch/implementation/css.md` | `docs/frontend/design/components/Switch/implementation/css.md` | generalized-reference-contract | `10f62e0358ca13c90d05995df1bad488c2ec329775967bbb13e66e923234e70d` |
| `docs/design/components/Switch/implementation/examples.md` | `docs/frontend/design/components/Switch/implementation/examples.md` | generalized-reference-contract | `6e2b3cdedd0e8d56d20fc4704473b50a90a80d02f1f5ea7eadd451c841c35154` |
| `docs/design/components/Switch/implementation/reference.md` | `docs/frontend/design/components/Switch/implementation/reference.md` | generalized-reference-contract | `e2dcae2f6df30994185f4f63446f58939fa04d6b24bf88d47e7f0956cc8ffdee` |
| `docs/design/components/Switch/implementation/typescript.md` | `docs/frontend/design/components/Switch/implementation/typescript.md` | generalized-reference-contract | `e7bb7c45eee369a198bd17bbf9f935c1042ef9d3bdb191f0812ecd6386363886` |
| `docs/design/components/Switch/styles.md` | `docs/frontend/design/components/Switch/styles.md` | generalized-reference-contract | `1909f0371ae013ae1a242fd89f43d6111910c1a17db6f7d97c609aa2fcfba724` |
| `docs/design/components/Switch/verification.md` | `docs/frontend/design/components/Switch/verification.md` | generalized-reference-contract | `effd8be72c48d2e1828213bc820fab18be6fb3f7aa4f990601d622aa7a5e6026` |
| `docs/design/components/Tab/README.md` | `docs/frontend/design/components/Tab/README.md` | generalized-reference-contract | `32322935139ae6c49c63503d0d2778bbbf69aa9466b4294d7921280b976cb33c` |
| `docs/design/components/Tab/accessibility.md` | `docs/frontend/design/components/Tab/accessibility.md` | generalized-reference-contract | `92a5dd8311df53beb9e646bf9336c10d1e361e1a7cef27b154dc64e49c53e77f` |
| `docs/design/components/Tab/behavior.md` | `docs/frontend/design/components/Tab/behavior.md` | generalized-reference-contract | `bb998be58b98e25f7de7c58f2e33b0c6a1db41a44cccfe843e8f9a3ede0a7bfd` |
| `docs/design/components/Tab/definition.md` | `docs/frontend/design/components/Tab/definition.md` | generalized-reference-contract | `51ac54647aae41ef845c46d2366b5757f80b69adfc144fb5eabfdb18c67f31b7` |
| `docs/design/components/Tab/implementation/README.md` | `docs/frontend/design/components/Tab/implementation/README.md` | generalized-reference-contract | `36cbd9116f442d2ed4b70e54caad50bbb52ab761a006adaeedfdea1daedd6be2` |
| `docs/design/components/Tab/implementation/css.md` | `docs/frontend/design/components/Tab/implementation/css.md` | generalized-reference-contract | `d9f3d81c35a9fe4341401ea45f92a741b8e061b599d65e06f06d58253587e6fe` |
| `docs/design/components/Tab/implementation/examples.md` | `docs/frontend/design/components/Tab/implementation/examples.md` | generalized-reference-contract | `a70f600bfb8cb917c5f632af389e268bf452246406c7d736e1b6195dde1d75fb` |
| `docs/design/components/Tab/implementation/reference.md` | `docs/frontend/design/components/Tab/implementation/reference.md` | generalized-reference-contract | `e6f4a8ddf9299b7d2ef9524e612b72a292eb0bd130c965415356ba0c89db5b8b` |
| `docs/design/components/Tab/implementation/typescript.md` | `docs/frontend/design/components/Tab/implementation/typescript.md` | generalized-reference-contract | `d7bb2cd5e6a6a3d0f3ea136e789c4010498164ac636584be026adbc923bc591b` |
| `docs/design/components/Tab/styles.md` | `docs/frontend/design/components/Tab/styles.md` | generalized-reference-contract | `e785f99575e1914f4754da3bbae24edfe9f9a1fe6df331c3b9a6e5e2c38ce4cf` |
| `docs/design/components/Tab/verification.md` | `docs/frontend/design/components/Tab/verification.md` | generalized-reference-contract | `1bc2930600c2e43f0b988fba473dc04a5a93d8803dee728c36fbc3dc44a66ae4` |
| `docs/design/components/Table/README.md` | `docs/frontend/design/components/Table/README.md` | generalized-reference-contract | `33dc96fac6247775212d1a598302abdfcb75e4503f92663d404a4c5815486934` |
| `docs/design/components/Table/accessibility.md` | `docs/frontend/design/components/Table/accessibility.md` | generalized-reference-contract | `6bc143fccf0462969851e0a27e2c0864e7ae9e0e791c94cc01eb8f4faf7fe878` |
| `docs/design/components/Table/behavior.md` | `docs/frontend/design/components/Table/behavior.md` | generalized-reference-contract | `f1e9d82d4c4d0f8017cff1e185106ddcc02be30f96c499571cad3103a19120fe` |
| `docs/design/components/Table/definition.md` | `docs/frontend/design/components/Table/definition.md` | generalized-reference-contract | `5147d09b4a31c816e109f50f17c017e4671f8295bb6093935321ebe30f46ccd8` |
| `docs/design/components/Table/implementation/README.md` | `docs/frontend/design/components/Table/implementation/README.md` | generalized-reference-contract | `13438a7b067ca6952830b44dddfef657b7091b5a03af944dd58f23765691c20e` |
| `docs/design/components/Table/implementation/typescript.md` | `docs/frontend/design/components/Table/implementation/typescript.md` | generalized-reference-contract | `7d33ffd7d85996d244cd297dc5a39683ce513e8b8278ce1761e73227ec0d2b1e` |
| `docs/design/components/Table/styles.md` | `docs/frontend/design/components/Table/styles.md` | generalized-reference-contract | `905410ac8727ff98f7f3542c0a9bae4a41f6b2910daf5b89a08db1cc6639be36` |
| `docs/design/components/Table/verification.md` | `docs/frontend/design/components/Table/verification.md` | generalized-reference-contract | `37523976d0118781057427fdaa1d1a5fc4563b63e87a83b132bc1f78a151f0f4` |
| `docs/design/components/TextButton/README.md` | `docs/frontend/design/components/TextButton/README.md` | generalized-reference-contract | `9dee605b757449756ac1b271c19fea5612a1c1c0f7871bfa38934a703cc7d026` |
| `docs/design/components/TextButton/accessibility.md` | `docs/frontend/design/components/TextButton/accessibility.md` | generalized-reference-contract | `2ce7c3a71bb381de05178fef15cf88f342a5de9289b64142530510ffa5896c41` |
| `docs/design/components/TextButton/behavior.md` | `docs/frontend/design/components/TextButton/behavior.md` | generalized-reference-contract | `555205758e2b4a5134f6107538bd49fcf067f6afd0a2e3e7068c768b993f63a3` |
| `docs/design/components/TextButton/definition.md` | `docs/frontend/design/components/TextButton/definition.md` | generalized-reference-contract | `ecfc07f3bdabd3e583ca362b218e7a4fea07ef1de099ff5f07f66de36e77ab67` |
| `docs/design/components/TextButton/implementation/README.md` | `docs/frontend/design/components/TextButton/implementation/README.md` | generalized-reference-contract | `43c13bb713ee973affafd1e931e525c64d11743b6bcbb791954f9dd8e41fcaaf` |
| `docs/design/components/TextButton/implementation/css.md` | `docs/frontend/design/components/TextButton/implementation/css.md` | generalized-reference-contract | `292203221e40b0bc11a58becdbd5c6d6f18b3e9707c87c86139ef8f827484b42` |
| `docs/design/components/TextButton/implementation/examples.md` | `docs/frontend/design/components/TextButton/implementation/examples.md` | generalized-reference-contract | `10ab5555bcc779b623f86f648fae6484389cd51fa8efabcad274b423ef9b0b47` |
| `docs/design/components/TextButton/implementation/typescript.md` | `docs/frontend/design/components/TextButton/implementation/typescript.md` | generalized-reference-contract | `a56f7d5f1e2618509bb0c89b395d9b3ff004a979dfb830b376e3b737dddd5a74` |
| `docs/design/components/TextButton/styles.md` | `docs/frontend/design/components/TextButton/styles.md` | generalized-reference-contract | `1339d47af4e4dc070d49e2431dc80366ef533353b2603ad4dc7b07e4e657c2dc` |
| `docs/design/components/TextButton/verification.md` | `docs/frontend/design/components/TextButton/verification.md` | generalized-reference-contract | `a00405c49a729af90722bbb0e5d5bd904f267d55d3d5224217d4d1e53b2d4d06` |
| `docs/design/components/Textarea/README.md` | `docs/frontend/design/components/Textarea/README.md` | generalized-reference-contract | `5bbcd67ab1eee510cb58261f963274570f7606ee7e557c2f1a4c67499306fcc9` |
| `docs/design/components/Textarea/accessibility.md` | `docs/frontend/design/components/Textarea/accessibility.md` | generalized-reference-contract | `1b165232475bd97412aeccf704d6f5291a1ee8911fc2f3ef562cdcc7fe036a37` |
| `docs/design/components/Textarea/behavior.md` | `docs/frontend/design/components/Textarea/behavior.md` | generalized-reference-contract | `90086be946c6c9a920bc5ef0a7425673614fd5f196c960d95e021514affbd5e5` |
| `docs/design/components/Textarea/definition.md` | `docs/frontend/design/components/Textarea/definition.md` | generalized-reference-contract | `bdc756718853737267ab32d42e68a3c9ad58c0e5d55bb81906cc4262ed222e33` |
| `docs/design/components/Textarea/implementation/README.md` | `docs/frontend/design/components/Textarea/implementation/README.md` | generalized-reference-contract | `b6084150acb678dca63e740e5013cc79e92bd51a4484e97b7430e36c73c694b3` |
| `docs/design/components/Textarea/implementation/css.md` | `docs/frontend/design/components/Textarea/implementation/css.md` | generalized-reference-contract | `866d1dc39205eac9775cbcdc41a728da207ab9d3c2e7dff97703357aa80129a1` |
| `docs/design/components/Textarea/implementation/typescript.md` | `docs/frontend/design/components/Textarea/implementation/typescript.md` | generalized-reference-contract | `3a2c7328d48520ded5a84b82ceab0f2a98ce56b17be74d1ac58ef58c81a7d8a1` |
| `docs/design/components/Textarea/styles.md` | `docs/frontend/design/components/Textarea/styles.md` | generalized-reference-contract | `a4e27158af6cf88f227f9093ec06937b7696a4100d43cb8fbf073ea5a820adf4` |
| `docs/design/components/Textarea/verification.md` | `docs/frontend/design/components/Textarea/verification.md` | generalized-reference-contract | `a4aed64fcaea6fc6de06aab05a55570a69162a2aa185d2963bd43f94da2029e7` |
| `docs/design/components/Timepicker/README.md` | `docs/frontend/design/components/Timepicker/README.md` | generalized-reference-contract | `3f74a3e5dc413819cd75801b6a91d6eda3d8135715e8ebfd05a80e26bc913019` |
| `docs/design/components/Timepicker/accessibility.md` | `docs/frontend/design/components/Timepicker/accessibility.md` | generalized-reference-contract | `46ff61195e5ba152704630c754bc9a4e981005286f2bb97b48d280bdf3c12ba2` |
| `docs/design/components/Timepicker/behavior.md` | `docs/frontend/design/components/Timepicker/behavior.md` | generalized-reference-contract | `221c8018c963a2b6e283652f5ee5cca11b6bfca11539152ec069ab0893491fcc` |
| `docs/design/components/Timepicker/definition.md` | `docs/frontend/design/components/Timepicker/definition.md` | generalized-reference-contract | `32c441cd00ef711b26f010dd51bc0497df7e29b6c08f57c0314843ab6d8987cd` |
| `docs/design/components/Timepicker/styles.md` | `docs/frontend/design/components/Timepicker/styles.md` | generalized-reference-contract | `b026911a4a0eefa62dd59bece32f68ffebe4b293a6a7370896d99248d5207510` |
| `docs/design/components/Timepicker/verification.md` | `docs/frontend/design/components/Timepicker/verification.md` | generalized-reference-contract | `f36d93c454fca27fe225b88fed7982b78df4673931bbec7f39a856bba4e36525` |
| `docs/design/components/Tooltip/README.md` | `docs/frontend/design/components/Tooltip/README.md` | generalized-reference-contract | `8edc71283552f9a7e9deeb4eb2e7d69544b1e0714101ee8b276da877e78aaaf8` |
| `docs/design/components/Tooltip/accessibility.md` | `docs/frontend/design/components/Tooltip/accessibility.md` | generalized-reference-contract | `0dc938d8ddd7407ed85158e2a3ea39dc852621c3648a05fb6486af351a60d675` |
| `docs/design/components/Tooltip/behavior.md` | `docs/frontend/design/components/Tooltip/behavior.md` | generalized-reference-contract | `d458aaeac5aeef925edef28a318a68138356363309c053ca73194e5a8a173440` |
| `docs/design/components/Tooltip/definition.md` | `docs/frontend/design/components/Tooltip/definition.md` | generalized-reference-contract | `230d2f96fb93d783f9cc000e4d3b9a5dbd818dd776282cbe64ffd242dc269425` |
| `docs/design/components/Tooltip/implementation/README.md` | `docs/frontend/design/components/Tooltip/implementation/README.md` | generalized-reference-contract | `02c44a0a5365d75fa64c4993f722ebfcb04cf5fe29614bd3934fbc25e40b097f` |
| `docs/design/components/Tooltip/implementation/css.md` | `docs/frontend/design/components/Tooltip/implementation/css.md` | generalized-reference-contract | `4b60434fb7c6d8ebfe4f329bc0458574a9808a41e8ea424d1cf4448424f99a32` |
| `docs/design/components/Tooltip/implementation/examples.md` | `docs/frontend/design/components/Tooltip/implementation/examples.md` | generalized-reference-contract | `ebafd0a2917b0527de3e8c0d22c93bcdce3bdc3926a8e4479267857377951d5c` |
| `docs/design/components/Tooltip/implementation/reference.md` | `docs/frontend/design/components/Tooltip/implementation/reference.md` | generalized-reference-contract | `0f7e4eb37bb39a5f4a1f9a269fb6424fdecd6662f3946b9b4743e3f95e5e3b3b` |
| `docs/design/components/Tooltip/implementation/typescript.md` | `docs/frontend/design/components/Tooltip/implementation/typescript.md` | generalized-reference-contract | `81d085c9033ea655aca0c9f846b5940457d7cb14a12a10554f93aeae098b1a19` |
| `docs/design/components/Tooltip/styles.md` | `docs/frontend/design/components/Tooltip/styles.md` | generalized-reference-contract | `874ec58739bc41c11bbf2603e4b99c7ed0dc2f1087f18137dd86b90bc255ffaa` |
| `docs/design/components/Tooltip/verification.md` | `docs/frontend/design/components/Tooltip/verification.md` | generalized-reference-contract | `2d7527db22f7c277b440ab8af6b5fdf421bb9e1504cb26f19e90b46c3b1ffd92` |
| `docs/design/components/Tree/README.md` | `docs/frontend/design/components/Tree/README.md` | generalized-reference-contract | `b9b64b62e16ac73e079f8140708bb0f97945e18fae5c4dbac9f2a016de9314a6` |
| `docs/design/components/Tree/accessibility.md` | `docs/frontend/design/components/Tree/accessibility.md` | generalized-reference-contract | `a36330137ee4d93adf9b7c714a09eae724300b8ab05ee4b2e72e7af5ab6de7c3` |
| `docs/design/components/Tree/behavior.md` | `docs/frontend/design/components/Tree/behavior.md` | generalized-reference-contract | `6788a3ec1d976737912b864cfc9460b8b9e4b2dc0d541da3ee6fdcfd54cb006d` |
| `docs/design/components/Tree/definition.md` | `docs/frontend/design/components/Tree/definition.md` | generalized-reference-contract | `52428f8a6f24ffead39989c4b72d8fdbb0b57d706411e1ee1bed118d0614e268` |
| `docs/design/components/Tree/implementation/README.md` | `docs/frontend/design/components/Tree/implementation/README.md` | generalized-reference-contract | `4ce77466f377b390118d993a85e36849fb4afbd53807b5354ca67991d6289cf8` |
| `docs/design/components/Tree/implementation/css.md` | `docs/frontend/design/components/Tree/implementation/css.md` | generalized-reference-contract | `654e7a6c608b07a1aae883a9cd3474a39d885139901e10ac9c390106434a321a` |
| `docs/design/components/Tree/implementation/typescript.md` | `docs/frontend/design/components/Tree/implementation/typescript.md` | generalized-reference-contract | `0a749333e4ef66ef2e1520271a81c087319a7b4b32f8bd30ef02c7e159100575` |
| `docs/design/components/Tree/styles.md` | `docs/frontend/design/components/Tree/styles.md` | generalized-reference-contract | `5766bdfcd2dd274eb70debe3e830b5a4ae469b95dac8f102ca5db3d45cd7e278` |
| `docs/design/components/Tree/verification.md` | `docs/frontend/design/components/Tree/verification.md` | generalized-reference-contract | `24530bfc31427d3855d1ebeadcf0c5e23d188f432caa9603c6585f7d93995c15` |
| `docs/design/components/index.md` | `docs/frontend/design/components/index.md` | generalized-reference-contract | `a74268b01a782af66882d1bddc3f4aeb932934654791948606da71c0ca99524f` |
| `docs/design/content-i18n.md` | `docs/frontend/design/content-i18n.md` | generalized-reference-contract | `b55e0f14b773c1901ce1137aac72c0ace951d820e75b0b0ba876ef87a8ba7e42` |
| `docs/design/docs-only-build.md` | `docs/frontend/design/docs-only-build.md` | rewritten-common-policy | `014690341edf4887a98bcbd01348b19b29ce5202a0ade6c5c60969485a8fd53a` |
| `docs/design/evolution.md` | `docs/frontend/design/evolution.md` | generalized-reference-contract | `a1f4f33abf875e242ab1d418ea522907d89d30baae0fd193dc4f8f9550f544c2` |
| `docs/design/foundations/Color.md` | `docs/frontend/design/foundations/Color.md + audit/jdc/design/foundations/Color.md` | generalized-reference-contract + observed-original-preserved | `e44f2c83896978614034ed29fd829dea76d628ecd9149ff2b2f7d91e4654f8ef` |
| `docs/design/foundations/Elevation.md` | `docs/frontend/design/foundations/Elevation.md + audit/jdc/design/foundations/Elevation.md` | generalized-reference-contract + observed-original-preserved | `71baf2f93e7ea1864e631413484814f1aeca602bb0e29ce5a8d52ca9b46f10a2` |
| `docs/design/foundations/Layout.md` | `docs/frontend/design/foundations/Layout.md + audit/jdc/design/foundations/Layout.md` | generalized-reference-contract + observed-original-preserved | `a74d5bad3d249a9038f927ebf94f77757b8bcc307f4aef36ab93d34ac408d9cd` |
| `docs/design/foundations/Typography.md` | `docs/frontend/design/foundations/Typography.md + audit/jdc/design/foundations/Typography.md` | generalized-reference-contract + observed-original-preserved | `decad4fd90d44c194cddfc4e9682be1c6c65304ad447a0c33effe36cd7616f6a` |
| `docs/design/foundations.md` | `docs/frontend/design/foundations.md` | generalized-reference-contract | `42a23fc2b1769819d894fb4da7a2a6e263a3c0ed8cc80ae139e6747b1aff1bfb` |
| `docs/design/mockups/dashboard-api-concept-v2.png` | `제외 (원본 checksum만 기록)` | excluded-product-dashboard-images-and-prompts | `0a8632e02e155bae7eb0dd0fd27f905e472eb0da3baff65d8041d87867defed5` |
| `docs/design/mockups/dashboard-api-concept-v2.prompt.md` | `제외 (원본 checksum만 기록)` | excluded-product-dashboard-images-and-prompts | `24725a992ae5ff6c0682f1781196c13f64a8f587c654cf825daa396f03ea1fbd` |
| `docs/design/mockups/dashboard-api-concept-v3.png` | `제외 (원본 checksum만 기록)` | excluded-product-dashboard-images-and-prompts | `ae7c43d1b1bcdfe4e5d188cbac643355a8bfcfd8174b1b941abf5f532bdcad90` |
| `docs/design/mockups/dashboard-api-concept-v3.prompt.md` | `제외 (원본 checksum만 기록)` | excluded-product-dashboard-images-and-prompts | `3413afa007a97866350e05e361465af58d0d6718dec915617b53057d93a6471f` |
| `docs/design/mockups/dashboard-api-concept.png` | `제외 (원본 checksum만 기록)` | excluded-product-dashboard-images-and-prompts | `ca908b6f8507bcdb2e78d4cd8f6809869e5a10d6f1b639e0cdd81d42f4926d68` |
| `docs/design/overview.md` | `docs/frontend/design/overview.md` | rewritten-common-policy | `8057ba9e8d78ee0fc2de0f51452adb789e507859e70e215d8057729dad4e0cc8` |
| `docs/design/page-policies.md` | `docs/frontend/design/page-policies.md` | generalized-reference-contract | `50ae1d227d3a312ef1d1df77ca7fb4943c116de922e931ce9d74da540fab1f8c` |
| `docs/design/patterns/CreatePage.md` | `docs/frontend/design/patterns/CreatePage.md + audit/jdc/design/patterns/CreatePage.md` | generalized-reference-contract; product-case-moved-to-observed + observed-original-preserved | `c0a22cdb4ac6b9d95bddda7ed347661edcfae8d89078d339db0ec358fe970060` |
| `docs/design/patterns/DetailPage.md` | `docs/frontend/design/patterns/DetailPage.md + audit/jdc/design/patterns/DetailPage.md` | generalized-reference-contract + observed-original-preserved | `3011138e3ff181fdc325596aa646692a6a53fa7b30bc7e5243dc38e9bbae6533` |
| `docs/design/patterns/ListPage.md` | `docs/frontend/design/patterns/ListPage.md + audit/jdc/design/patterns/ListPage.md` | generalized-reference-contract + observed-original-preserved | `283f1213839a37c616d8d2b1afbaf011f0da9f5415e0e1533a4ae3abc8212273` |
| `docs/design/patterns/README.md` | `docs/frontend/design/patterns/README.md` | generalized-reference-contract | `a39b7a084a0fe76cb3cb9bcfdb352424666fa90530f021b9249d4de65d7b508f` |
| `docs/design/quality.md` | `docs/frontend/design/quality.md` | generalized-reference-contract | `26daa8579e73dd1838e0d04325fe65faab4b046ee89137cd4956c956ea8b00e9` |
| `docs/design/reproduction.md` | `docs/frontend/design/reproduction.md` | rewritten-common-policy | `a9ef28c1e4dde367f827653a2f2ba09cdc5732ae06f6018193f175900e002130` |

## 독립 리뷰 반영

- 공통 문서에서 미배포 `audit/` 링크를 제거하고 저자 저장소 자료임을 일반 경로로 설명했다.
- 제품 shell·원본 page·foundation 자료 44개를 `audit/jdc/design/`로 이동하고 모든 상대링크를 다시 계산했다.
- Calendar/SegmentedControl의 primary를 특정 파란색으로 설명하던 문구·주석을 accent 역할로 정리했다.
- List 첫 진입을 `profile.defaultViewMode`와 명시적인 fallback policy로 통일했다.
- DatePicker/Calendar는 공휴일 국가·일요일 강조·수동 휴일을 솔루션 locale/calendar adapter 입력으로 받는다. KR 공휴일 지원 능력과 검증 fixture는 선택 기능으로 보존한다.

- 추가 검토: PageHeader의 제품 shell 세대 조합 요구를 제거하고 slot/state/geometry 소유권으로 정리했다. 강조 역할의 blue 음영 설명은 accent scale로 바꿨으며, Icon의 명명된 raw `blue.500`은 primary와 독립적인 categorical 색으로 보존했다.
- Card의 392px은 standalone 시각 fixture로 명시했다. page에서는 `--card-width:100%`로 부모 slot을 채우며 `--layout-card-min`은 grid track 최소폭을 담당한다.
