import { useRef, useState } from "react";
import type { ReactNode } from "react";
import manifest from "../data/icon-manifest.json";
import {
  AgentHubAgentTypeChip,
  AgentHubAttachIconButton,
  AgentHubBrandMark,
  AgentHubBreadcrumb,
  AgentHubBreadcrumbSeparator,
  AgentHubButton,
  AgentHubCheckbox,
  AgentHubFileIcon,
  AgentHubFilterChip,
  AgentHubFilterChipGroup,
  AgentHubIcon,
  AgentHubIconButton,
  AgentHubPillChip,
  AgentHubScrollbar,
  AgentHubSearch,
  AgentHubSwitch,
  AgentHubTextButton,
  type ScrollAreaHandle,
} from "../components/primitives";

function PrimitiveSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-contract={id} className="ah-primitive-section">
      <header>
        <span className="ah-primitive-id">{id}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="ah-primitive-demo">{children}</div>
    </section>
  );
}

const filters = [
  { value: "all", label: "전체" },
  { value: "mine", label: "내 에이전트", count: 3 },
  { value: "team", label: "팀 공유", count: 12 },
  { value: "workflow", label: "워크플로우" },
  { value: "archive", label: "보관함" },
  { value: "blocked", label: "권한 없음", disabled: true },
];

export function PrimitivesGallery() {
  const [clicks, setClicks] = useState(0);
  const [iconSize, setIconSize] = useState(20);
  const [enabled, setEnabled] = useState(true);
  const [checked, setChecked] = useState<boolean | "indeterminate">(
    "indeterminate",
  );
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [pill, setPill] = useState(false);
  const [selected, setSelected] = useState<string[]>(["all"]);
  const [multiple, setMultiple] = useState<string[]>(["mine", "team"]);
  const [active, setActive] = useState(false);
  const scrollArea = useRef<ScrollAreaHandle>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const countClick = () => setClicks((value) => value + 1);
  return (
    <div className="lab-stack ah-primitives-gallery">
      <PrimitiveSection
        id="AgentHubIcon"
        title="정확한 아이콘 자산"
        description="설치 manifest의 이름·크기로 직접 찾습니다. 24px SVG를 축소하지 않고 원본 크기별 자산을 사용합니다."
      >
        <div className="ah-demo-row">
          <label>
            표시 크기{" "}
            <select
              value={iconSize}
              onChange={(event) => setIconSize(Number(event.target.value))}
            >
              {[16, 20, 24].map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </label>
          {["agent", "plus", "x", "search", "chevron-down", "settings"]
            .filter((name) =>
              manifest.icons.some(
                (icon) => icon.name === name && icon.size === iconSize,
              ),
            )
            .map((name) => (
              <span className="ah-icon-example" key={name}>
                <AgentHubIcon name={name} size={iconSize} />
                <small>{name}</small>
              </span>
            ))}
        </div>
        <details>
          <summary>전체 {manifest.icons.length}개 자산 확인</summary>
          <div className="ah-icon-catalog">
            {manifest.icons.map((icon) => (
              <span
                key={`${icon.name}/${icon.size}`}
                title={`${icon.name}/${icon.size}`}
              >
                <AgentHubIcon name={icon.name} size={icon.size} />
                <small>
                  {icon.name}/{icon.size}
                </small>
              </span>
            ))}
          </div>
        </details>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubFileIcon"
        title="파일 형식 아이콘"
        description="44px 전체 타일 안에 sheet·glyph·선이 포함된 원본 SVG입니다."
      >
        <div className="ah-demo-row">
          {manifest.fileIcons.map((file) => (
            <span className="ah-icon-example" key={file.type}>
              <AgentHubFileIcon type={file.type} />
              <small>{file.type}</small>
            </span>
          ))}
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubBrandMark"
        title="Agent Hub 브랜드 마크"
        description="원본 PNG를 애니메이션 없이 표시합니다. 크기별 원본과 참고용 복원 SVG를 비교할 수 있습니다. 복원 SVG의 가려진 영역과 그라데이션은 추정한 값입니다."
      >
        <div className="ah-demo-row">
          {[32, 64, 96, 180].map((size) => (
            <AgentHubBrandMark
              key={size}
              size={size}
              label={`Agent Hub 마크 ${size}px`}
            />
          ))}
        </div>
        <div className="ah-demo-row" aria-label="원본과 복원 SVG 정지 비교">
          <span className="ah-icon-example">
            <AgentHubBrandMark size={180} label="원본 Agent Hub 마크" />
            <small>원본 PNG</small>
          </span>
          <span className="ah-icon-example">
            <img
              src="/agent-hub/assets/brand/agent-hub-mark-layered.svg"
              width={180}
              height={180}
              alt="세 타원을 분리해 복원한 Agent Hub SVG 정지 상태"
            />
            <small>복원 SVG · 정지</small>
          </span>
        </div>
        <p className="ah-demo-note">
          브랜드 마크는 원본 정적 이미지로 사용합니다. 복원 SVG는 비교용
          자료이며 실제 마크를 대체하지 않습니다.
        </p>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubAgentTypeChip"
        title="에이전트 유형 Chip"
        description="assistant·workflow는 HUG, runtime·common-chat은 68px 고정입니다. 정보형 Chip에는 선택 동작을 추가하지 않습니다."
      >
        <div className="ah-demo-row">
          {(["assistant", "workflow", "runtime", "common-chat"] as const).map(
            (type) => (
              <AgentHubAgentTypeChip key={type} type={type} />
            ),
          )}
          <AgentHubAgentTypeChip type="workflow">
            긴 워크플로우 유형 이름의 말줄임을 확인합니다
          </AgentHubAgentTypeChip>
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubButton"
        title="버튼"
        description="primary·secondary·tertiary 40/32/28, ghost 28/24. Hover·누름은 실제 포인터 상태이며 disabled도 직접 차단합니다."
      >
        <div className="ah-button-matrix">
          {(["primary", "secondary", "tertiary", "ghost"] as const).map(
            (variant) => (
              <div className="ah-demo-row" key={variant}>
                <strong>{variant}</strong>
                {(variant === "ghost" ? [28, 24] : [40, 32, 28]).map((size) => (
                  <AgentHubButton
                    key={size}
                    variant={variant}
                    size={size}
                    leadingIcon="plus"
                    trailingIcon="chevron-down"
                    onClick={countClick}
                  >
                    {size}px
                  </AgentHubButton>
                ))}
                <AgentHubButton
                  variant={variant}
                  size={variant === "ghost" ? 28 : 32}
                  disabled
                >
                  사용 불가
                </AgentHubButton>
              </div>
            ),
          )}
        </div>
        <div className="ah-demo-row">
          <AgentHubButton
            variant="tertiary"
            size={28}
            keycaps={["Esc"]}
            onClick={countClick}
          >
            Keycap 예시
          </AgentHubButton>
          <output aria-live="polite">활성화 {clicks}회</output>
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubIconButton"
        title="아이콘 버튼"
        description="32px에는 glyph20, 24/20px에는 glyph16을 사용합니다. Active는 눌리는 순간과 다른 호출부 소유 상태입니다."
      >
        <div className="ah-demo-row">
          {(["ghost", "outlined", "primary"] as const).map((variant) => (
            <div className="ah-demo-row" key={variant}>
              {(variant === "ghost" ? [32, 24, 20] : [32, 24]).map((size) => (
                <AgentHubIconButton
                  key={size}
                  icon="plus"
                  label={`${variant} ${size}px 추가`}
                  variant={variant}
                  size={size}
                  onClick={countClick}
                />
              ))}
              <AgentHubIconButton
                icon="plus"
                label={`${variant} 비활성`}
                variant={variant}
                disabled
              />
            </div>
          ))}
          <AgentHubIconButton
            icon="pin"
            label="고정 전환"
            active={active}
            aria-pressed={active}
            onClick={() => setActive((value) => !value)}
          />
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubAttachIconButton"
        title="원형 첨부 버튼"
        description="32px 원형·glyph24. 파란 state5는 기능 의미가 미확정이라 이 테스트의 강조 표현만 별도로 보여 줍니다."
      >
        <div className="ah-demo-row">
          <AgentHubAttachIconButton
            label="파일 첨부 테스트"
            onClick={countClick}
          />
          <AgentHubAttachIconButton
            label="강조 표현 테스트"
            tone="emphasis"
            onClick={countClick}
          />
          <AgentHubAttachIconButton label="비활성 첨부" disabled />
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubSwitch"
        title="Switch"
        description="40×22 track·18px thumb. 값과 disabled를 독립적으로 제어하고 Space·Enter 한 번에 한 번 전환합니다."
      >
        <div className="ah-demo-row">
          <label className="ah-demo-row">
            <AgentHubSwitch
              label="자동 저장"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
            자동 저장 {enabled ? "켜짐" : "꺼짐"}
          </label>
          <AgentHubSwitch label="비활성 켜짐" checked disabled />
          <AgentHubSwitch label="비활성 꺼짐" checked={false} disabled />
          <AgentHubSwitch label="읽기 전용 설정" checked readOnly />
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubTextButton"
        title="텍스트 버튼"
        description="24px·padding4·gap2·12/16 SemiBold와 정확한 arrow-right16을 조합합니다."
      >
        <div className="ah-demo-row">
          <AgentHubTextButton onClick={countClick}>
            자세히 보기
          </AgentHubTextButton>
          <AgentHubTextButton disabled>비활성 동작</AgentHubTextButton>
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubSearch"
        title="검색 입력"
        description="Controlled 값·clear 후 focus 복귀·IME 조합 Enter 보호. 검색·필터의 실제 데이터 상태는 호출부가 소유합니다."
      >
        <div className="ah-search-demo">
          <AgentHubSearch
            label="에이전트 검색"
            placeholder="필요한 에이전트를 검색하세요."
            value={query}
            onValueChange={setQuery}
            onSearch={setSearchResult}
            filtered={filtered}
            onFilter={() => setFiltered((value) => !value)}
          />
          <AgentHubSearch
            label="작은 검색"
            size={32}
            placeholder="32px 검색"
            defaultValue="문서"
          />
          <AgentHubSearch
            label="읽기 전용 검색"
            size={32}
            value="선택과 복사는 가능합니다"
            readOnly
          />
          <AgentHubSearch
            label="비활성 검색"
            disabled
            placeholder="비활성 검색"
          />
          <output>
            입력값: {query || "(비어 있음)"} · 제출: {searchResult || "(없음)"}
          </output>
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubPillChip"
        title="Pill Chip"
        description="28px·rfull·14/20 SemiBold·inside 선. 기본 정보형과 명시적 토글형을 분리하며 selected는 원본과 같이 흰색입니다."
      >
        <div className="ah-demo-row">
          <AgentHubPillChip>정보 표시</AgentHubPillChip>
          <AgentHubPillChip
            selected={pill}
            onClick={() => setPill((value) => !value)}
          >
            명시적 선택 {pill ? "켜짐" : "꺼짐"}
          </AgentHubPillChip>
          <AgentHubPillChip disabled onClick={countClick}>
            비활성
          </AgentHubPillChip>
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubFilterChip"
        title="Filter Chip"
        description="선택 시 선은 투명해지고 1px 공간은 유지합니다. 원본의 2px 폭 변화 대신 같은 폭을 유지하는 채택 변경입니다."
      >
        <div className="ah-demo-row">
          {(["sm", "md", "lg"] as const).map((size) => (
            <AgentHubFilterChip
              key={size}
              size={size}
              selected={selected.includes(size)}
              count={0}
              onClick={() =>
                setSelected((value) =>
                  value.includes(size)
                    ? value.filter((item) => item !== size)
                    : [...value, size],
                )
              }
            >
              {size} 필터
            </AgentHubFilterChip>
          ))}
          <AgentHubFilterChip selected disabled count={3}>
            선택·비활성
          </AgentHubFilterChip>
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubFilterChipGroup"
        title="필터 그룹"
        description="단일·다중 토글과 wrap·실제 수평 scroll을 제공합니다. Fade는 실제 남은 콘텐츠가 있을 때만 표시합니다."
      >
        <div className="ah-filter-group-demo">
          <AgentHubFilterChipGroup
            label="단일 유형"
            items={filters}
            value={selected}
            onValueChange={setSelected}
          />
          <AgentHubFilterChipGroup
            label="다중 필터"
            layout="wrap"
            selectionMode="multiple"
            items={filters}
            value={multiple}
            onValueChange={setMultiple}
            style={{ width: 280 }}
          />
          <AgentHubFilterChipGroup
            label="가로 스크롤 필터"
            layout="scroll"
            items={filters}
            value={selected}
            onValueChange={setSelected}
            style={{ width: 280 }}
          />
          <output>다중 선택: {multiple.join(", ") || "없음"}</output>
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubCheckbox"
        title="Checkbox"
        description="원본 Mark의 좌표와 크기를 고정하고 opacity만 진입160ms·퇴장120ms로 전환합니다. 체크 표시가 옆으로 밀리지 않으며 reduced-motion에서는 즉시 전환합니다."
      >
        <div className="ah-demo-row">
          <AgentHubCheckbox
            label="하위 항목 전체 선택"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <output>{String(checked)}</output>
          <AgentHubButton
            variant="tertiary"
            size={28}
            onClick={() => setChecked(true)}
          >
            선택
          </AgentHubButton>
          <AgentHubButton
            variant="tertiary"
            size={28}
            onClick={() => setChecked(false)}
          >
            해제
          </AgentHubButton>
          <AgentHubButton
            variant="tertiary"
            size={28}
            onClick={() => setChecked("indeterminate")}
          >
            일부 선택
          </AgentHubButton>
        </div>
        <div className="ah-checkbox-matrix">
          {(["small", "medium", "large"] as const).map((size) => (
            <div key={size} className="ah-demo-row">
              {([false, true, "indeterminate"] as const).map((value) => (
                <AgentHubCheckbox
                  key={String(value)}
                  label={`${size} ${String(value)}`}
                  size={size}
                  defaultChecked={value}
                />
              ))}
              <AgentHubCheckbox
                label={`${size} 선택·비활성`}
                size={size}
                checked
                disabled
              />
              <AgentHubCheckbox
                label={`${size} mixed·비활성`}
                size={size}
                checked="indeterminate"
                disabled
              />
              <AgentHubCheckbox
                label={`${size} 미선택·비활성`}
                size={size}
                checked={false}
                disabled
              />
            </div>
          ))}
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubBreadcrumb"
        title="Breadcrumb"
        description="현재 항목은 텍스트, 이전 경로는 실제 링크입니다. Hover·누름에서 밑줄 색상이200ms ease로 전환하며 reduced-motion에서는 즉시 표시합니다."
      >
        <div className="ah-filter-group-demo">
          <AgentHubBreadcrumb
            items={[
              { label: "홈", href: "#AgentHubBrandMark" },
              { label: "에이전트", href: "#AgentHubAgentTypeChip" },
              { label: "현재 상세" },
            ]}
          />
          <AgentHubBreadcrumb
            separator="arrow"
            items={[
              { label: "프로젝트", href: "#AgentHubFileIcon" },
              { label: "내 문서" },
            ]}
          />
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubBreadcrumbSeparator"
        title="Breadcrumb 구분자"
        description="slash·en dash·정확한 전체 arrow SVG를 사용합니다. Arrow 파일 안에 이미 좌우8px가 들어 있습니다."
      >
        <div className="ah-demo-row">
          <AgentHubBreadcrumbSeparator />
          <AgentHubBreadcrumbSeparator type="dash" />
          <AgentHubBreadcrumbSeparator type="arrow" />
        </div>
      </PrimitiveSection>
      <PrimitiveSection
        id="AgentHubScrollbar"
        title="실제 스크롤과 11px gutter"
        description="4px·rfull·opaque #DDD thumb를 실제 viewport 비율로 계산합니다. Wheel·키보드·pointer drag로 끝까지 이동할 수 있습니다."
      >
        <div className="ah-demo-row">
          <AgentHubButton
            variant="tertiary"
            size={28}
            onClick={() => scrollArea.current?.scrollTo({ top: 0 })}
          >
            맨 위로
          </AgentHubButton>
          <AgentHubButton
            variant="tertiary"
            size={28}
            onClick={() =>
              scrollArea.current?.scrollTo({ top: Number.MAX_SAFE_INTEGER })
            }
          >
            맨 아래로
          </AgentHubButton>
          <output>세로 위치 {Math.round(scrollPosition)}px</output>
        </div>
        <AgentHubScrollbar
          ref={scrollArea}
          height={180}
          label="스크롤 검증 항목"
          className="ah-scroll-demo"
          onScrollMetricsChange={(metrics) =>
            setScrollPosition(metrics.scrollTop)
          }
        >
          {Array.from({ length: 24 }, (_, index) => (
            <p key={index}>
              항목 {index + 1} · 키보드 PageDown/End와 thumb 드래그를
              확인하세요.
            </p>
          ))}
        </AgentHubScrollbar>
        <p>
          가로 방향은 같은 엔진을 사용하는 기능 검증 예시입니다. 세로 Figma
          샘플의 실측 범위를 확장하지 않습니다.
        </p>
        <AgentHubScrollbar
          height={90}
          orientation="horizontal"
          label="가로 스크롤 검증 항목"
          contentStyle={{ width: 960 }}
        >
          <div
            className="ah-demo-row"
            style={{ flexWrap: "nowrap", padding: 12 }}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <AgentHubButton
                variant="tertiary"
                key={index}
                onClick={countClick}
              >
                가로 항목 {index + 1}
              </AgentHubButton>
            ))}
          </div>
        </AgentHubScrollbar>
      </PrimitiveSection>
    </div>
  );
}
