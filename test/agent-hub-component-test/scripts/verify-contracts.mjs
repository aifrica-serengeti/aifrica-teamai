import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import ts from "typescript";
const app = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => JSON.parse(readFileSync(join(app, p), "utf8"));
export function verifyContracts() {
  const contracts = read("src/data/contracts.json");
  const mappings = read("component-registry.json");
  const exports = new Map();
  for (const file of [
    "primitives",
    "collections",
    "conversation",
    "shell",
    "forms",
  ]) {
    const path = `src/components/${file}.tsx`;
    const ast = ts.createSourceFile(
      path,
      readFileSync(join(app, path), "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    for (const node of ast.statements) {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      )
        exports.set(node.name.text, path);
    }
  }
  assert.equal(contracts.length, 59);
  assert.equal(new Set(contracts.map((c) => c.id)).size, 59);
  assert.equal(mappings.components.length, 59);
  const commonIds = new Set(
    read(".teamai/docs/frontend/design/component-registry.json").components.map(
      (c) => c.id,
    ),
  );
  for (const adapter of mappings.commonAdapters ?? []) {
    assert(
      commonIds.has(adapter.contract),
      `Unknown common contract ${adapter.contract}`,
    );
    assert.equal(adapter.status, "partial-contract");
    assert(
      adapter.scope.length > 0,
      `Missing supported scope for ${adapter.contract}`,
    );
    const source = readFileSync(join(app, adapter.source), "utf8");
    const ast = ts.createSourceFile(
      adapter.source,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    assert(
      ast.statements.some(
        (node) =>
          ts.isFunctionDeclaration(node) &&
          node.name?.text === adapter.export &&
          node.modifiers?.some(
            (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
          ),
      ),
      `Missing actual common adapter export ${adapter.export}`,
    );
  }
  for (const c of contracts) {
    assert(exports.has(c.id), `Missing actual export ${c.id}`);
    const mapping = mappings.components.find((m) => m.id === c.id);
    assert.equal(mapping?.source, exports.get(c.id));
    assert.equal(mapping?.export, c.id);
    for (const dependency of c.dependencies)
      assert(
        contracts.some((x) => x.id === dependency) || commonIds.has(dependency),
        `Missing ${dependency}`,
      );
  }
  const mirror = join(app, ".teamai/docs/agent-hub/design/assets");
  function files(root) {
    return readdirSync(root, { withFileTypes: true })
      .filter((e) => e.name !== ".DS_Store")
      .flatMap((e) =>
        e.isDirectory() ? files(join(root, e.name)) : [join(root, e.name)],
      );
  }
  let assets = 0;
  for (const source of files(mirror)) {
    const local = join(
      app,
      "public/agent-hub/assets",
      source.slice(mirror.length + 1),
    );
    assert(existsSync(local), `Missing downloaded asset ${local}`);
    assert(statSync(local).size > 0);
    const hash = (p) =>
      createHash("sha256").update(readFileSync(p)).digest("hex");
    assert.equal(hash(local), hash(source));
    assets++;
  }
  const nativeSkills = {};
  const reconstructed = read(
    ".teamai/docs/agent-hub/design/references/brand-mark.reconstruction.json",
  );
  const original = read("src/data/icon-manifest.json").brandMark;
  assert.equal(reconstructed.source.sha256, original.sha256);
  assert.equal(reconstructed.originalVector, false);
  const deliveredVector = readFileSync(
    join(app, ".teamai/docs/agent-hub/design", reconstructed.asset.path),
  );
  assert.equal(
    createHash("sha256").update(deliveredVector).digest("hex"),
    reconstructed.asset.sha256,
  );
  assert.deepEqual(
    readFileSync(join(app, "src/data/brand-mark-layered.svg")),
    deliveredVector,
    "The inline vector must be the exact derivative delivered by TeamAI",
  );
  for (const host of [".codex", ".claude"]) {
    const installed = readdirSync(join(app, host, "skills")).filter((n) =>
      n.startsWith("aifrica-"),
    );
    assert.equal(installed.length, 7);
    nativeSkills[host] = installed.length;
  }
  return {
    contracts: contracts.length,
    actualExports: 59,
    partialCommonAdapters: mappings.commonAdapters?.length ?? 0,
    assetFiles: assets,
    reconstructedBrandAssets: 1,
    nativeSkills,
  };
}
if (process.argv[1] === fileURLToPath(import.meta.url))
  console.log(JSON.stringify(verifyContracts(), null, 2));
