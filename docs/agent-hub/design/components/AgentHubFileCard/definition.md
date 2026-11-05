# AgentHubFileCard — 정의와 범위

파일을 격자로 탐색하고 개별 실행·다중 선택할 때 사용하는 Agent Hub 전용 카드입니다.
공용 `Card`의 의미 계약을 따르되256px 정사각형·radius24·외부 선택 링을 별도 시각 계약으로 둡니다.

## 확인한 원본 속성

아래는 생성 design context와 보드 metadata에서 확인한 값입니다. 제품 TypeScript API를 확인한 것은 아닙니다.

| 속성 | 확인값 | 해석 |
| --- | --- | --- |
| type | spreadsheet, document, pdf, presentation, code, zip, image | 실제21개 variant에7종이 있음 |
| state | enabled, hovered, selected | 설명의 default와 달리 실제 property는 enabled |
| title | `Cheetah_Agent Hub_IA.xlsx` | 비교용 문자열이며 실제 파일명은 제품 데이터 |
| meta | `1일 전` | 비교용 상대시간이며 locale·기준시각은 제품 소유 |
| showMeta | true가 기본 | false이면 meta 행과 그 gap을 제거 |

원본 설명은 spreadsheet/document/pdf/presentation/image 다섯 유형만 열거하지만 실제 code/zip variant도 있습니다.
설명보다 관찰된7종을 기준으로 하며 유형을 확장자 하나와 무조건 일대일 대응시키지 않습니다.
원본 props에 title/meta가 공통으로 있어도 image variant의 실제 레이어에는 헤더·제목·메타가 없습니다.

## 레이어 구성

```text
root: 256×256, 외곽 선택 링을 자르지 않음
├─ card: inset0, radius24, border1, overflow clip
│  ├─ 일반 파일: header + preview
│  │  ├─ header: leading-icon32 + details(title, 선택적 meta)
│  │  └─ preview: 남은 높이, radius12, 유형별56px glyph
│  ├─ image: 카드 전체 cover 사진, 별도 header 없음
│  └─ 상태별 dim / 더보기 / 선택 checkbox
└─ selected selection-ring: inset-3, border2, radius26
```

## 기존 계약과 구분

| 기존 계약 | 차이와 연결 기준 |
| --- | --- |
| 공용 Card | 의미·focus를 계승하고 공용 폭392/radius8·내부 선택 선·일반 그림자를 복사하지 않음 |
| AgentHubThumbnailCard | 324px 폭·4:3 이미지와 제목/설명을 가진 카드. FileCard 사진형과 별개 |
| AgentHubDataCard | 120px 정사각형과 Chip을 가진 데이터 카드. FileCard의256px 파일 preview와 별개 |
| AgentHubFileItem | 512×68px 가로 출력 행과 미리보기 명령. FileCard의 축소판으로 만들지 않음 |
| AgentHubItemCard | 에이전트 설명·도구·대화 명령을 가진324×146px 카드. 파일 선택 상태와 합치지 않음 |
| AgentHubFileIcon | 기존44px 타일과 이번20/56px glyph는 다른 원본이므로 이름만 보고 치환하지 않음 |

같은 파일 모델을 각 화면 표현이 받을 수는 있지만 모델 공유가 시각 컴포넌트 합병을 뜻하지 않습니다.
