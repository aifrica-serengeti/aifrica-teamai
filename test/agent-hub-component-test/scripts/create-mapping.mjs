import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const contracts = JSON.parse(
  readFileSync(new URL("../src/data/contracts.json", import.meta.url)),
);
const modules = ["primitives", "collections", "conversation", "shell", "forms"];
const components = contracts.map(({ id, guide }) => {
  const module = modules.find((name) =>
    new RegExp(`export function ${id}\\b`).test(
      readFileSync(
        new URL(`../src/components/${name}.tsx`, import.meta.url),
        "utf8",
      ),
    ),
  );
  if (!module) throw new Error(`Missing ${id}`);
  return {
    id,
    source: `src/components/${module}.tsx`,
    export: id,
    guide: `.teamai/docs/agent-hub/design/${guide}`,
  };
});
writeFileSync(
  new URL("../component-registry.json", import.meta.url),
  JSON.stringify(
    {
      schemaVersion: 1,
      solution: "agent-hub",
      scope: "guide-only React component lab; not production adoption",
      components,
    },
    null,
    2,
  ) + "\n",
);
const commonAdapters = [
  {
    contract: "Input",
    source: "src/components/common/controls.tsx",
    export: "InputControl",
    status: "partial-contract",
    scope:
      "Native single-line control, focus owner, required/invalid/readOnly/disabled; no full Input field API",
  },
  {
    contract: "Textarea",
    source: "src/components/common/controls.tsx",
    export: "TextareaControl",
    status: "partial-contract",
    scope:
      "Native multiline control, IME/focus/state; toolbar and solution geometry are adapters",
  },
  {
    contract: "Select",
    source: "src/components/common/Select.tsx",
    export: "SingleSelect",
    status: "partial-contract",
    scope:
      "Single selection, keyboard, cancel/focus, popup150ms/scroll; no search or multi-select",
  },
  {
    contract: "Scrollbar",
    source: "src/components/common/ScrollArea.tsx",
    export: "ScrollArea",
    status: "partial-contract",
    scope:
      "One native viewport with measured bars, pointer/wheel/keyboard/resize; not every public baseline prop",
  },
];
// A subset is recorded separately instead of claiming the entire common public API.
const fixtureRegistry = JSON.parse(
  readFileSync(new URL("../component-registry.json", import.meta.url)),
);
fixtureRegistry.commonAdapters = commonAdapters;
writeFileSync(
  new URL("../component-registry.json", import.meta.url),
  JSON.stringify(fixtureRegistry, null, 2) + "\n",
);
const config = {
  schemaVersion: 1,
  solution: "agent-hub",
  inheritCommon: true,
  status: "draft",
  paths: {
    architecture: "ARCHITECTURE.md",
    componentRegistry: "component-registry.json",
    designTokens: "src/styles.css",
  },
  components: Object.fromEntries(
    components.map(({ id, source, export: publicExport }) => [
      id,
      { status: "implemented", source, export: publicExport },
    ]),
  ),
  documentOverrides: ["IMPLEMENTATION-NOTES.md"],
};
mkdirSync(new URL("../.aifrica", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../.aifrica/frontend.json", import.meta.url),
  JSON.stringify(config, null, 2) + "\n",
);
writeFileSync(
  new URL("../src/components/index.ts", import.meta.url),
  modules.map((n) => `export * from './${n}';`).join("\n") + "\n",
);
console.log(
  `Mapped ${components.length} actual named component exports in this fixture only.`,
);
