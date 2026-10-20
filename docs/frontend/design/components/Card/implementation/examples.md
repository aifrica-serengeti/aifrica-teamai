# Card — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](../README.md)

## 구현 내용

### 사용 예

```tsx
{/* Small */}
<Card type="default" size="small" state="enabled">
  <Card.Header>
    <Card.LeadingVisual size="small"><img src="..." /></Card.LeadingVisual>
    <Card.HeaderText>
      <Card.TitleRow>
        <Card.Title cardSize="small">Card Title</Card.Title>
        <Card.NewBadge />
      </Card.TitleRow>
      <Card.Description cardSize="small">Card description</Card.Description>
      <Card.SubDescription>갱신일 2026. 09. 15.</Card.SubDescription>
    </Card.HeaderText>
    <Card.IconButton />
  </Card.Header>
  <Card.Footer variant="link" linkText="더 보기" />
</Card>

{/* Medium */}
<Card type="default" size="medium" state="enabled">
  <Card.HeaderGroup>
    <Card.Header>
      <Card.LeadingVisual size="medium"><img src="..." /></Card.LeadingVisual>
      <Card.HeaderText>
        <Card.TitleRow>
          <Card.Title cardSize="medium">Card Title</Card.Title>
          <Card.NewBadge />
        </Card.TitleRow>
        <Card.Description cardSize="medium">Card description</Card.Description>
      </Card.HeaderText>
      <Card.IconButton />
    </Card.Header>
    <Card.SubDescription title="갱신일 2026. 09. 15.">
      갱신일 2026. 09. 15.
    </Card.SubDescription>
  </Card.HeaderGroup>
  <Card.Summary>
    <Card.SummaryRow>
      <Card.SummaryLabel>분류</Card.SummaryLabel>
      <Card.SummaryValue>Detail Data01</Card.SummaryValue>
    </Card.SummaryRow>
  </Card.Summary>
  <Card.Footer variant="creator" creatorName="sunnyfield123" />
</Card>

{/* Large interactive */}
<Card type="default" size="large" interactive state="selected" onClick={() => {}}>
  <Card.HeaderGroup>
    <Card.Header>
      <Card.LeadingVisual size="large"><img src="..." /></Card.LeadingVisual>
      <Card.HeaderText>
        <Card.TitleRow>
          <Card.Title cardSize="large">Card Title</Card.Title>
          <Card.NewBadge />
        </Card.TitleRow>
        <Card.Description cardSize="large">Card description</Card.Description>
      </Card.HeaderText>
      <Card.IconButton />
    </Card.Header>
    <Card.SubDescription title="갱신일 2026. 09. 15. 오후 2:30">
      갱신일 2026. 09. 15. 오후 2:30
    </Card.SubDescription>
  </Card.HeaderGroup>
  <Card.Summary>
    <Card.SummaryRow>
      <Card.SummaryLabel>분류</Card.SummaryLabel>
      <Card.SummaryValue>Category01</Card.SummaryValue>
    </Card.SummaryRow>
    <Card.SummaryRow>
      <Card.SummaryLabel>요청 사용자</Card.SummaryLabel>
      <Card.SummaryValue title="Administrator">Administrator</Card.SummaryValue>
    </Card.SummaryRow>
  </Card.Summary>
  <Card.Body>Card Body</Card.Body>
  <Card.Footer variant="buttons" buttons={[
    { label: 'Label', variant: 'tertiary' },
    { label: 'Label', variant: 'primary' },
  ]} />
</Card>

{/* Thumbnail */}
<Card type="thumbnail" size="large" state="enabled"
  thumbnailSrc="..." thumbnailAlt="Thumbnail">
  <Card.HeaderGroup>
    <Card.Header>...</Card.Header>
    <Card.ExtendedHeader details={[...]} chips={[...]} />
  </Card.HeaderGroup>
  <Card.Footer variant="buttons" buttons={[...]} />
</Card>
```

---
