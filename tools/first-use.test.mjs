import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { ROOT } from './lib/config.mjs';
import { inspectFirstUse, loadComponentCatalogs } from '../docs/frontend/contracts/check-first-use.mjs';

test('CMP shell contracts join common dependencies and remain isolated from other solutions', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-cmp-catalog-'));
  try {
    const report = inspectFirstUse({ productRoot: directory, solution: 'cmp', components: ['SNBV2', 'GlobalHeaderV1'] });
    assert.equal(report.catalogComponents, 55);
    assert.deepEqual(report.componentCatalogs, ['frontend/design/component-registry.json', 'cmp/design/component-registry.json']);
    for (const id of ['SNBV2', 'GlobalHeaderV1', 'Icon', 'Menu', 'Scrollbar', 'Avatar', 'Chip']) assert.equal(report.checks.find(check => check.id === `component:${id}`).status, 'missing', id);
    assert.equal(report.mappingInputsPresent, false);
    for (const solution of ['paas', 'agent-hub']) {
      assert.equal(loadComponentCatalogs(path.join(ROOT, 'docs'), solution).components.length, 51);
      assert.throws(() => inspectFirstUse({ productRoot: directory, solution, components: ['SNBV2'] }), /Unknown selected component ID/);
    }
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});

test('solution catalogs reject duplicate common IDs and missing dependencies', () => {
  const docsRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-catalog-conflict-'));
  try {
    for (const namespace of ['frontend', 'cmp']) fs.mkdirSync(path.join(docsRoot, namespace, 'design'), { recursive: true });
    fs.writeFileSync(path.join(docsRoot, 'frontend/design/component-registry.json'), JSON.stringify({ components: [{ id: 'Leaf', dependencies: [] }] }));
    fs.writeFileSync(path.join(docsRoot, 'cmp/frontend.json'), JSON.stringify({ schemaVersion: 1, solution: 'cmp', inheritCommon: true }));
    const file = path.join(docsRoot, 'cmp/design/component-registry.json');
    const write = components => fs.writeFileSync(file, JSON.stringify({ schemaVersion: 1, solution: 'cmp', components }));
    write([{ id: 'Parent', dependencies: ['Leaf'] }]);
    assert.equal(loadComponentCatalogs(docsRoot, 'cmp').components.length, 2);
    write([{ id: 'Leaf', dependencies: [] }]);
    assert.throws(() => loadComponentCatalogs(docsRoot, 'cmp'), /Duplicate/);
    write([{ id: 'Parent', dependencies: ['Absent'] }]);
    assert.throws(() => loadComponentCatalogs(docsRoot, 'cmp'), /Unknown dependency/);
  } finally { fs.rmSync(docsRoot, { recursive: true, force: true }); }
});

test('disabled common inheritance works without frontend documents or its catalog', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-independent-'));
  try {
    const docsRoot = path.join(root, '.teamai/docs');
    for (const namespace of ['common', 'cmp']) fs.cpSync(path.join(ROOT, 'docs', namespace), path.join(docsRoot, namespace), { recursive: true });
    fs.mkdirSync(path.join(root, '.aifrica'));
    fs.writeFileSync(path.join(root, '.aifrica/frontend.json'), JSON.stringify({ schemaVersion: 1, solution: 'cmp', inheritCommon: false }));
    const report = inspectFirstUse({ docsRoot, productRoot: root, solution: 'cmp' });
    assert.equal(report.inheritance.inheritCommon, false);
    assert.deepEqual(report.inheritance.roles, ['frontend']);
    assert.equal(report.catalogComponents, 0);
    assert.deepEqual(report.componentCatalogs, []);
    assert.equal(report.checks.find(check => check.id === 'distributed-documents').status, 'pass');
    assert.equal(fs.existsSync(path.join(docsRoot, 'frontend')), false);
    assert.throws(() => inspectFirstUse({ docsRoot, productRoot: root, solution: 'cmp', components: ['Button'] }), /Unknown selected component ID/);
    const catalog = path.join(docsRoot, 'cmp/design/component-registry.json');
    fs.writeFileSync(catalog, JSON.stringify({ schemaVersion: 1, solution: 'cmp', extendsCommon: false, components: [{ id: 'LocalControl', dependencies: [] }] }));
    assert.deepEqual(loadComponentCatalogs(docsRoot, 'cmp', { inheritCommon: false }).components.map(component => component.id), ['LocalControl']);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('a blank first-use product gets contracts, never a false parity claim', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-first-use-'));
  try {
    const result = inspectFirstUse({ productRoot: root, solution: 'paas', components: ['Button'] });
    assert.equal(result.checks.find(check => check.id === 'distributed-documents').status, 'pass');
    assert.equal(result.mappingInputsPresent, false);
    assert.equal(result.runtimeParityVerified, false);
    assert.equal(result.visualParityVerified, false);
    assert.equal(result.checks.find(check => check.id === 'component:Button').status, 'missing');
    assert.equal(result.checks.find(check => check.id === 'component:Icon').status, 'missing');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('delivered checker runs from a mirror without the authoring repository or npm dependencies', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-first-use-mirror-'));
  try {
    const docsRoot = path.join(root, '.teamai/docs');
    for (const namespace of ['common', 'frontend', 'paas']) fs.cpSync(path.join(ROOT, 'docs', namespace), path.join(docsRoot, namespace), { recursive: true });
    const script = path.join(docsRoot, 'frontend/contracts/check-first-use.mjs');
    const coldRun = spawnSync(process.execPath, [script, '--solution', 'paas', '--product-root', root, '--components', 'Button', '--strict'], { cwd: root, encoding: 'utf8', env: { ...process.env, NODE_PATH: '' } });
    assert.equal(coldRun.status, 1);
    assert.equal(JSON.parse(coldRun.stdout).mappingInputsPresent, false);
    const before = inspectFirstUse({ productRoot: root, docsRoot, solution: 'paas', components: ['Button'] });
    assert.equal(before.mappingInputsPresent, false);
    fs.mkdirSync(path.join(root, '.aifrica'));
    fs.mkdirSync(path.join(root, 'src'));
    fs.writeFileSync(path.join(root, 'src/ui.tsx'), 'export const Button = () => null; export const Icon = () => null;');
    fs.writeFileSync(path.join(root, 'architecture.md'), '# Actual product architecture');
    fs.writeFileSync(path.join(root, 'registry.json'), '{}');
    fs.writeFileSync(path.join(root, 'tokens.css'), ':root {}');
    const config = { schemaVersion: 1, solution: 'paas', status: 'active', paths: { architecture: 'architecture.md', componentRegistry: 'registry.json', designTokens: 'tokens.css' }, components: { Button: { status: 'implemented', source: 'src/ui.tsx', export: 'Button' }, Icon: { status: 'implemented', source: 'src/ui.tsx', export: 'Icon' } } };
    fs.writeFileSync(path.join(root, '.aifrica/frontend.json'), JSON.stringify(config));
    const result = inspectFirstUse({ productRoot: root, docsRoot, components: ['Button'] });
    assert.equal(result.mappingInputsPresent, true);
    assert.equal(result.visualParityVerified, false);
    assert.equal(result.runtimeParityVerified, false);
    const mappedRun = spawnSync(process.execPath, [script, '--product-root', root, '--components', 'Button', '--strict'], { cwd: root, encoding: 'utf8', env: { ...process.env, NODE_PATH: '' } });
    assert.equal(mappedRun.status, 0, mappedRun.stderr);
    assert.equal(JSON.parse(mappedRun.stdout).visualParityVerified, false);
    assert.throws(() => inspectFirstUse({ productRoot: root, docsRoot, solution: 'cmp' }), /conflicts/);
    config.documentOverrides = ['../outside.md'];
    fs.writeFileSync(path.join(root, '.aifrica/frontend.json'), JSON.stringify(config));
    assert.throws(() => inspectFirstUse({ productRoot: root, docsRoot, components: ['Button'] }), /Product-relative/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
