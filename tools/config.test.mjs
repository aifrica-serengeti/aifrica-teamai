import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ROOT, SOLUTIONS, merge, resolveFrontend, safePath, selectedResources, validateExtension, frontendPlan } from './lib/config.mjs';

test('frontend/backend remain isolated for each solution and unrelated solutions are absent', () => {
  for (const solution of SOLUTIONS) {
    const plan = frontendPlan({ solution });
    const frontend = selectedResources(ROOT, plan.roles, solution);
    const backend = selectedResources(ROOT, 'backend', solution);
    assert.deepEqual([...frontend.skills], plan.inheritCommon ? ['frontend'] : []);
    assert.equal(backend.skills.size, 0);
    assert.deepEqual([...frontend.docs], plan.inheritCommon ? ['common', 'frontend', solution] : ['common', solution]);
    assert.deepEqual([...backend.docs], ['common', 'backend', solution]);
  }
});

test('shared frontend is optional and can be disabled per product', () => {
  const base = selectedResources(ROOT, 'frontend', 'cmp');
  assert.equal(base.skills.size, 0);
  assert.equal(base.docs.has('frontend'), false);
  assert.deepEqual(frontendPlan({ solution: 'cmp' }).roles, ['frontend', 'frontend-common']);
  const disabled = frontendPlan({ solution: 'cmp', local: { solution: 'cmp', inheritCommon: false } });
  assert.equal(disabled.inheritCommon, false);
  assert.deepEqual(disabled.roles, ['frontend']);
  assert.equal(disabled.commands[0], 'teamai roles set frontend');
  assert.equal(disabled.commands.at(-1), 'teamai pull --force');
  assert.throws(() => frontendPlan({ solution: 'cmp', local: { solution: 'paas' } }), /conflicts/);
  assert.throws(() => frontendPlan({ solution: 'cmp', inheritCommon: 'false' }), /boolean/);
});

test('frontend-common as the primary role delivers the complete CMP shared bundle', () => {
  const standalone = selectedResources(ROOT, 'frontend-common', 'cmp');
  const additional = selectedResources(ROOT, ['frontend', 'frontend-common'], 'cmp');
  assert.deepEqual([...standalone.skills], ['frontend']);
  assert.deepEqual([...standalone.docs], ['common', 'frontend', 'cmp']);
  assert.deepEqual(standalone.skills, additional.skills);
  assert.deepEqual(standalone.docs, additional.docs);
  for (const namespace of ['common', 'frontend-common', 'cmp']) assert(standalone.knowledge.has(namespace));
  for (const solution of ['paas', 'agent-hub']) assert.equal(standalone.docs.has(solution), false);
});

test('each solution resolves without adopting a brand or another solution profile', () => {
  for (const solution of SOLUTIONS) {
    const { effective, layers } = resolveFrontend({ solution });
    assert.equal(effective.solution, solution);
    assert.equal(effective.status, 'draft');
    assert.equal(effective.profile, undefined);
    assert.deepEqual(effective.components, {});
    assert.deepEqual(effective.tokens.brand, {});
    assert.deepEqual(layers, [`docs/${solution}/frontend.json`]);
  }
});

test('nested maps merge, arrays replace and source values stay immutable', () => {
  const base = { tokens: { color: { text: 'neutral', border: 'thin' } }, options: [20, 40] };
  const result = merge(base, { tokens: { color: { border: 'strong' } }, options: [10] });
  assert.deepEqual(result, { tokens: { color: { text: 'neutral', border: 'strong' } }, options: [10] });
  assert.equal(base.tokens.color.border, 'thin');
  assert.deepEqual(base.options, [20, 40]);
  assert.throws(() => merge({}, JSON.parse('{"__proto__":{"polluted":true}}')), /Invalid extension key/);
});

test('reject invalid solution, typo keys, nonpositive page size and false implementation claims', () => {
  const base = { schemaVersion: 1, solution: 'cmp' };
  assert.throws(() => validateExtension({ ...base, solution: 'jdc' }));
  assert.throws(() => validateExtension({ ...base, colours: {} }));
  assert.throws(() => validateExtension({ ...base, pagePatterns: { list: { pageSize: 0 } } }));
  assert.throws(() => validateExtension({ ...base, components: { Button: { status: 'implemented' } } }));
  assert.throws(() => validateExtension({ ...base, paths: { architecture: '../other/architecture.md' } }));
  validateExtension({ ...base, pagePatterns: { list: { defaultViewMode: 'card', tablePageSize: 30, cardPageSize: 12, tablePageSizeOptions: [30, 60], cardPageSizeOptions: [12, 24], searchDebounceMs: 250 } } });
  assert.throws(() => validateExtension({ ...base, pagePatterns: { list: { defaultViewMode: 'grid' } } }));
});

test('local product adoption merges safely, checks files and rejects cross-solution or unknown profiles', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-adoption-'));
  try {
    fs.mkdirSync(path.join(directory, '.aifrica'));
    fs.mkdirSync(path.join(directory, 'src'));
    fs.writeFileSync(path.join(directory, 'src/Button.tsx'), 'export function Button() {}');
    const localFile = path.join(directory, '.aifrica/frontend.json');
    const adoption = { schemaVersion: 1, solution: 'paas', status: 'active', tokens: { brand: { primary: 'var(--product-primary)' } }, components: { Button: { status: 'implemented', source: 'src/Button.tsx', export: 'Button' } }, pagePatterns: { list: { maxWidth: '72rem', pageSize: 30 } } };
    fs.writeFileSync(localFile, JSON.stringify(adoption));
    const { effective, layers } = resolveFrontend({ localFile });
    assert.equal(effective.tokens.brand.primary, 'var(--product-primary)');
    assert.equal(effective.pagePatterns.list.pageSize, 30);
    assert.equal(effective.components.Button.source, 'src/Button.tsx');
    assert.equal(layers.at(-1), '.aifrica/frontend.json');
    assert.throws(() => resolveFrontend({ solution: 'cmp', localFile }), /Solution mismatch/);
    fs.writeFileSync(localFile, JSON.stringify({ ...adoption, documentOverrides: ['docs/missing.md'] }));
    assert.throws(() => resolveFrontend({ localFile }), /Missing local path/);
    fs.writeFileSync(localFile, JSON.stringify({ schemaVersion: 1, solution: 'cmp', profile: 'unknown' }));
    assert.throws(() => resolveFrontend({ localFile }), /ENOENT/);
    assert.throws(() => safePath(directory, '../outside.md'), /Repository-relative/);
    assert.throws(() => safePath(directory, '/etc/passwd'), /Repository-relative/);
    fs.symlinkSync(os.tmpdir(), path.join(directory, 'escape'));
    assert.throws(() => safePath(directory, 'escape', true), /Symlink escapes/);
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});
