# AgentHubBrandMark — 구현

현재 소비 저장소의 이미지 컴포넌트와 BrandMark export를 먼저 찾습니다. 원본 PNG의 예약 크기·비율·접근성을
지원하면 재사용합니다. 직접 공용 의존성이 없어 독립 모드에서도 이 솔루션 계약을 연결할 수 있습니다.
공유 registry는 실제 제품에서 확인하기 전까지 `unmapped`를 유지합니다. 테스트 앱의 검증은 해당 fixture의 근거이며
실제 Agent Hub 제품의 source/export 또는 배포 완료를 의미하지 않습니다.

## 공개 입력

```ts
type AgentHubBrandMarkProps = {
  size?: number;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};
```

size는1:1 예약 공간에 연결하고 className/style은 외부 배치에 사용합니다. 검증한 원본 PNG 경로를 사용하며,
배포된 문서의 상대 경로를 실행 URL로 그대로 쓰지 말고 해당 제품의 public 경로나 asset loader로 연결합니다.
label이 비어 있으면 `alt=""`, 의미가 있으면 label을 이미지의 alt로 연결합니다.

브랜드 마크 애니메이션은 사용자 요청으로 제외했습니다. 모션·재생 제어 API, SVG 장식층·회전 field,
관찰자·재생 timer를 추가하지 않습니다. 이전 모션 입력을 전달하던 소비 코드가 있다면 호출도 함께 제거합니다.
ThinkingStatus는 원본 PNG를 정적으로 조합하고 글자 shimmer·녹음·진행률과 마크 표시를 결합하지 않습니다.

로드 실패에서도 예약 공간과 인접 제품명을 유지합니다. 비교용 복원 SVG를 로드 대안이나 원본 자산으로 사용하지 않습니다.
