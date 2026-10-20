# Pagination — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](../README.md)

## 구현 내용

### 테이블 결합 사용 예

```tsx
import { Pagination } from "./Pagination";

function DataTable({ data, total }: { data: Row[]; total: number }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // page/pageSize 변경 시 데이터 fetch.
  useEffect(() => {
    fetchData({ page, pageSize });
  }, [page, pageSize]);

  return (
    <>
      <table>{/* ... rows from data ... */}</table>
      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </>
  );
}

// 영문 카운트 템플릿 (총건수 강조색·SemiBold 유지)
<Pagination
  page={2}
  total={152}
  pageSize={20}
  rangeTemplate="{start}-{end} of {total}"
  locale="en-US"
/>;

// 사용자 초대처럼 20개씩 조회하는 고정 크기 목록. 이동·카운트·페이지 입력은 유지한다.
<Pagination
  page={page}
  total={total}
  pageSize={20}
  showPageSize={false}
  onPageChange={setPage}
/>;
```

> **테이블 확장성**: `page`/`total`/`pageSize`/`onPageChange`/`onPageSizeChange`는 표준
> pagination state 인터페이스다. 테이블 데이터 fetch 로직과 1:1 controlled 연결이 단순하다.
> 일반적인 i18n은 `rangeTemplate`과 `locale`을 사용해야 총건수 전용 강조 토큰을 유지한다.
> 템플릿으로 표현할 수 없는 ReactNode 조합에만 `formatRange`를 사용한다.

---
