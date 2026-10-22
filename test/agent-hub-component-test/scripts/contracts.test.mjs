import test from "node:test";
import assert from "node:assert/strict";
import { verifyContracts } from "./verify-contracts.mjs";
test("installed contracts resolve to React exports and byte-exact original and derived assets", () => {
  const result = verifyContracts();
  assert.equal(result.contracts, 59);
  assert.ok(result.assetFiles > 250);
  assert.equal(result.reconstructedBrandAssets, 1);
  assert.equal(result.partialCommonAdapters, 4);
  assert.deepEqual(result.nativeSkills, { ".codex": 7, ".claude": 7 });
});
