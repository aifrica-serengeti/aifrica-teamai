# AgentHubNavItem — 원본과 상태

`2611:62032`는 `nav-item` COMPONENT_SET이며 root 실제 속성은 `state` VARIANT 하나입니다. 기본값은 enabled입니다.

| state | COMPONENT | 실제 nested icon |
| --- | --- | --- |
| enabled | `2611:62030` | `2611:62008` → clock `2611:62004` |
| hovered | `2611:62029` | `2611:62012` → clock `2611:62004` |
| pressed | `2611:62028` | `2611:62016` → clock `2611:62004` |
| selected | `2611:62031` | `2611:62024` → clock `2611:62004` |

네 실제 icon은 propertySets의 icon=clock을 참조합니다. root에 icon swap·TEXT·href·callback·현재 route 속성이 노출됐다는 뜻은 아닙니다.
제품의 icon/label/링크·action API는 별도 제안이며 [NavRail](../AgentHubNavRail/definition.md)의 home/search/book swap도 실제 인스턴스 override로 구분합니다.

```text
52px NavItem 표면
└─ 중앙28px AgentHubNavIcon
```

각 원본은 glyph 하나이며 label·tooltip·badge·submenu·새 채팅 버튼을 포함하지 않습니다. reactions는 비어 있습니다.
pressed는 누르는 동안의 시각 상태이고 selected·요청 성공·현재 route와 같은 값이 아닙니다.
공용 IconButton이나 CMP SNB row를 실제로 재사용한 원본도 아닙니다.
focus·disabled·dark·selected+hover·모든 glyph 조합·모바일·접힘 variant는 미제공입니다.
