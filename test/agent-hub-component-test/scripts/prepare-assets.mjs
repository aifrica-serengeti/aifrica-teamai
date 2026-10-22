import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
const app = fileURLToPath(new URL("../", import.meta.url));
const design = join(app, ".teamai/docs/agent-hub/design");
if (!existsSync(design)) throw new Error("Run npm run teamai:sync first");
mkdirSync(join(app, "public/agent-hub"), { recursive: true });
cpSync(join(design, "assets"), join(app, "public/agent-hub/assets"), {
  recursive: true,
});
mkdirSync(join(app, "src/data"), { recursive: true });
cpSync(
  join(design, "asset-manifest.json"),
  join(app, "src/data/icon-manifest.json"),
);
// The vector is a user-approved derivative, separate from original Figma assets.
cpSync(
  join(design, "assets/brand/agent-hub-mark-layered.svg"),
  join(app, "src/data/brand-mark-layered.svg"),
);
cpSync(
  join(design, "references/checkbox-marks.assets.json"),
  join(app, "src/data/checkbox-marks.json"),
);
cpSync(
  join(design, "references/interaction.motion.proposal.json"),
  join(app, "src/data/interaction-motion.json"),
);
const registry = JSON.parse(
  readFileSync(join(design, "component-registry.json")),
);
writeFileSync(
  join(app, "src/data/contracts.json"),
  JSON.stringify(
    registry.components.map(({ id, name, category, dependencies, docs }) => ({
      id,
      name,
      category,
      dependencies,
      guide: docs,
    })),
    null,
    2,
  ) + "\n",
);
// Preserve measured references for numeric comparisons without a live Figma connection.
cpSync(
  join(design, "references/chat-progress.motion.proposal.json"),
  join(app, "src/data/motion-proposal.json"),
);
console.log(
  `Prepared Agent Hub assets and ${registry.components.length} contracts.`,
);
