# AgentHubThumbnailCard — 정의

원본 `3100:114430`은 `thumbnail-card` COMPONENT_SET입니다.

| 실제 속성 | 타입 / 기본값 | 연결 |
| --- | --- | --- |
| `thumbnail#3100:3` | BOOLEAN / true | thumbnail FRAME 표시 |
| `dot#3100:4` | BOOLEAN / true | 제목 옆8px 점 표시 |
| `description#3100:5` | BOOLEAN / true | 설명 TEXT 표시 |
| `state` | VARIANT / default | default·hovered·pressed·selected·disabled |

title·meta·description 문자열과 이미지 src/alt는 실제 TEXT·IMAGE 속성으로 노출되지 않았습니다.
제품의 동적 표시 API는 별도 제안이며 기존 Figma 속성이나 검증된 제품 export로 기록하지 않습니다.

| state | 원본 |
| --- | --- |
| default | `3100:114393` |
| hovered | `3100:114394` |
| pressed | `3100:114403` |
| selected | `3100:114412` |
| disabled | `3100:114421` |

```text
외곽 Card: border1·radius24·전체 clipping
├─ thumbnail=true: 이미지 없는4:3 FRAME, 아래 선1
└─ content: padding16·gap4
   ├─ title-row: title + dot=true일 때 점8
   ├─ meta
   └─ description=true일 때 설명
```

원본 thumbnail은 #F4F4F4 FRAME이며 image fill·다운로드할 대표 이미지가 없습니다.
실제 thumbnail 데이터를 받는 기능·이미지 자르기·실패 fallback은 제품에서 채택하고 검증합니다.
점은 ELLIPSE이고 Button·Chip·읽지 않음·온라인 상태로 확정된 표시가 아닙니다.
selected와 dot 표시도 서로 독립이며 blue 점을 selected 상태의 원인으로 사용하지 않습니다.

표시 Boolean의 false branch를 조립할 수 있지만 전체8조합×5state의 완성 화면을 측정한 것은 아닙니다.
카드 외곽은 공용 Card의 의미를 참고하는 전용 조합이며 실제 하위 컴포넌트 INSTANCE는 없습니다.
선택·단일/다중 선택·탐색·dot 의미와 목록의 keyboard 패턴은 제품이 명시적으로 채택합니다.
