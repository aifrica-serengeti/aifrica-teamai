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
      assert.equal(loadComponentCatalogs(path.join(ROOT, 'docs'), solution).components.length, solution === 'agent-hub' ? 110 : 51);
      assert.throws(() => inspectFirstUse({ productRoot: directory, solution, components: ['SNBV2'] }), /Unknown selected component ID/);
    }
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});

test('Agent Hub extensions are discoverable only in its selected common bundle and never claim implementation', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'aifrica-agent-hub-catalog-'));
  try {
    const ids = ['AgentHubIcon', 'AgentHubFileIcon', 'AgentHubBrandMark', 'AgentHubAgentTypeChip', 'AgentHubButton', 'AgentHubIconButton', 'AgentHubAttachIconButton', 'AgentHubSwitch', 'AgentHubTextButton', 'AgentHubCalendar', 'AgentHubCalendarDate', 'AgentHubSearch', 'AgentHubPillChip', 'AgentHubFilterChip', 'AgentHubFilterChipGroup', 'AgentHubCheckbox', 'AgentHubBreadcrumb', 'AgentHubBreadcrumbSeparator', 'AgentHubChatComposer', 'AgentHubUserMessage', 'AgentHubProgressAlert', 'AgentHubMessageExample', 'AgentHubPickerItem', 'AgentHubPickerFooter', 'AgentHubPicker', 'AgentHubMenuItem', 'AgentHubMenu', 'AgentHubFlyoutHeader', 'AgentHubFlyoutFooter', 'AgentHubFlyoutItem', 'AgentHubFlyout', 'AgentHubSessionPanel', 'AgentHubSessionItem', 'AgentHubSessionProgressStep', 'AgentHubSessionContextItem', 'AgentHubSessionSectionHeader', 'AgentHubSessionHistoryItem', 'AgentHubOutputViewer', 'AgentHubFileItem', 'AgentHubDataCard', 'AgentHubThumbnailCard', 'AgentHubScheduleCard', 'AgentHubItemCard', 'AgentHubScrollbar', 'AgentHubDialogFooter', 'AgentHubNavIcon', 'AgentHubNavItem', 'AgentHubNavRail', 'AgentHubSNBSectionHeader', 'AgentHubSNBItem', 'AgentHubSNBPanel', 'AgentHubSNB', 'AgentHubGlobalHeader', 'AgentHubChatHeader', 'AgentHubDialog', 'AgentHubThinkingStatus', 'AgentHubInput', 'AgentHubTextarea', 'AgentHubSelect'];
    const report = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ids });
    assert.equal(report.catalogComponents, 110);
    assert.deepEqual(report.componentCatalogs, ['frontend/design/component-registry.json', 'agent-hub/design/component-registry.json']);
    for (const id of ids) assert.equal(report.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['Chip', 'Button', 'Icon', 'IconButton', 'Switch', 'TextButton', 'Calendar', 'Search', 'Input', 'Checkbox', 'Breadcrumb', 'Textarea', 'Divider', 'Scrollbar', 'Menu', 'Avatar', 'Badge']) assert.equal(report.checks.find(check => check.id === `component:${id}`).status, 'missing');
    assert.equal(report.mappingInputsPresent, false);
    assert.equal(report.visualParityVerified, false);
    const userMessage = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubUserMessage'] });
    for (const id of ['AgentHubUserMessage', 'Chip', 'Divider', 'AgentHubIcon']) assert.equal(userMessage.checks.find(check => check.id === `component:${id}`).status, 'missing');
    const progressAlert = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubProgressAlert'] });
    for (const id of ['AgentHubProgressAlert', 'AgentHubButton', 'AgentHubIcon', 'Button', 'Icon']) assert.equal(progressAlert.checks.find(check => check.id === `component:${id}`).status, 'missing');
    const messageExample = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubMessageExample'] });
    for (const id of ['AgentHubMessageExample', 'Button', 'Icon', 'AgentHubIcon']) assert.equal(messageExample.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['AgentHubButton', 'AgentHubUserMessage', 'Card']) assert.equal(messageExample.checks.some(check => check.id === `component:${id}`), false);
    const picker = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubPicker'] });
    for (const id of ['AgentHubPicker', 'AgentHubPickerItem', 'AgentHubPickerFooter', 'AgentHubSearch', 'AgentHubIconButton', 'AgentHubAgentTypeChip', 'AgentHubIcon', 'Scrollbar', 'Button', 'Divider', 'Search', 'Input', 'Chip', 'IconButton']) assert.equal(picker.checks.find(check => check.id === `component:${id}`).status, 'missing');
    const menu = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubMenu'] });
    for (const id of ['AgentHubMenu', 'AgentHubMenuItem', 'Menu', 'AgentHubIcon', 'Scrollbar', 'Icon', 'Divider']) assert.equal(menu.checks.find(check => check.id === `component:${id}`).status, 'missing');
    assert.equal(menu.checks.some(check => check.id === 'component:AgentHubPicker'), false);
    const flyout = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubFlyout'] });
    for (const id of ['AgentHubFlyout', 'AgentHubFlyoutHeader', 'AgentHubFlyoutFooter', 'AgentHubFlyoutItem', 'Scrollbar', 'Button', 'AgentHubIcon']) assert.equal(flyout.checks.find(check => check.id === `component:${id}`).status, 'missing');
    // Standalone folder/child source references do not require a Tree in the flat runtime.
    assert.equal(flyout.checks.some(check => check.id === 'component:Tree'), false);
    assert.equal(flyout.checks.some(check => check.id === 'component:Menu'), false);
    for (const id of ['AgentHubMenu', 'AgentHubMenuItem', 'AgentHubPicker']) assert.equal(flyout.checks.some(check => check.id === `component:${id}`), false);

    const session = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubSessionPanel'] });
    for (const id of ['AgentHubSessionPanel', 'AgentHubSessionItem', 'AgentHubSessionProgressStep', 'AgentHubSessionContextItem', 'AgentHubSessionSectionHeader', 'AgentHubSessionHistoryItem', 'AgentHubIconButton', 'AgentHubIcon', 'IconButton', 'Button', 'Divider']) assert.equal(session.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['AgentHubMenu', 'AgentHubMenuItem', 'AgentHubFlyout', 'AgentHubPicker', 'Tree', 'Checkbox', 'Stepper', 'CardAccordion', 'AgentHubProgressAlert']) assert.equal(session.checks.some(check => check.id === `component:${id}`), false);


    const outputViewer = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubOutputViewer'] });
    for (const id of ['AgentHubOutputViewer', 'AgentHubIconButton', 'AgentHubIcon', 'IconButton']) assert.equal(outputViewer.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['AgentHubSessionPanel', 'AgentHubMenu', 'AgentHubPicker', 'AgentHubFlyout', 'AgentHubFileIcon', 'Dialog', 'OpenPanel', 'Tab']) assert.equal(outputViewer.checks.some(check => check.id === `component:${id}`), false);


    const card = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubFileItem', 'AgentHubDataCard', 'AgentHubThumbnailCard', 'AgentHubScheduleCard', 'AgentHubItemCard'] });
    for (const id of ['AgentHubFileItem', 'AgentHubDataCard', 'AgentHubThumbnailCard', 'AgentHubScheduleCard', 'AgentHubItemCard', 'Card', 'Chip', 'Divider', 'AgentHubButton', 'AgentHubFileIcon', 'AgentHubIconButton', 'AgentHubIcon', 'Button']) assert.equal(card.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['AgentHubPillChip', 'AgentHubAgentTypeChip', 'AgentHubMenu', 'AgentHubSessionPanel', 'AgentHubOutputViewer', 'CardAccordion']) assert.equal(card.checks.some(check => check.id === `component:${id}`), false);

    const scrollbar = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubScrollbar'] });
    for (const id of ['AgentHubScrollbar', 'Scrollbar']) assert.equal(scrollbar.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['AgentHubMenu', 'AgentHubPicker', 'AgentHubIcon', 'Card', 'Menu']) assert.equal(scrollbar.checks.some(check => check.id === `component:${id}`), false);
    for (const container of [menu, card]) assert.equal(container.checks.some(check => check.id === 'component:AgentHubScrollbar'), false);
    for (const container of [picker, flyout, session, outputViewer]) assert.equal(container.checks.find(check => check.id === 'component:AgentHubScrollbar').status, 'missing');

    const dialogFooter = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubDialogFooter'] });
    for (const id of ['AgentHubDialogFooter', 'Dialog', 'AgentHubButton', 'Button', 'IconButton', 'SegmentedControl', 'Input', 'Scrollbar', 'AgentHubIcon']) assert.equal(dialogFooter.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['AgentHubIconButton', 'AgentHubScrollbar', 'AgentHubMenu', 'AgentHubPickerFooter', 'AgentHubFlyoutFooter', 'AgentHubProgressAlert', 'AgentHubCalendar']) assert.equal(dialogFooter.checks.some(check => check.id === `component:${id}`), false);
    for (const container of [menu, picker, flyout, session, outputViewer, card, scrollbar]) assert.equal(container.checks.some(check => check.id === 'component:AgentHubDialogFooter'), false);

    const snb = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubSNB'] });
    for (const id of ['AgentHubSNB', 'AgentHubNavRail', 'AgentHubNavIcon', 'AgentHubNavItem', 'AgentHubSNBPanel', 'AgentHubSNBSectionHeader', 'AgentHubSNBItem', 'AgentHubButton', 'AgentHubIconButton', 'AgentHubIcon', 'AgentHubScrollbar', 'Avatar', 'Button', 'Link', 'Divider', 'Scrollbar']) assert.equal(snb.checks.find(check => check.id === `component:${id}`).status, 'missing');
    for (const id of ['SNBV1', 'SNBV2', 'AgentHubMenu', 'AgentHubMenuItem', 'AgentHubSearch', 'AgentHubPicker', 'AgentHubSessionPanel', 'AgentHubDialogFooter', 'Tree', 'Search']) assert.equal(snb.checks.some(check => check.id === `component:${id}`), false);
    for (const container of [menu, picker, flyout, session, outputViewer, card, scrollbar, dialogFooter]) assert.equal(container.checks.some(check => check.id === 'component:AgentHubSNB'), false);

    const globalHeader = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubGlobalHeader'] });
    for (const id of ['AgentHubGlobalHeader', 'Button', 'Link', 'IconButton', 'Icon']) assert.equal(globalHeader.checks.find(check => check.id === 'component:' + id).status, 'missing');
    for (const id of ['GlobalHeaderV1', 'GlobalHeaderV2', 'PageHeader', 'AgentHubSNB', 'AgentHubButton', 'AgentHubIconButton', 'AgentHubBrandMark', 'AgentHubBreadcrumb', 'Breadcrumb', 'Chip', 'Divider', 'AgentHubSearch']) assert.equal(globalHeader.checks.some(check => check.id === 'component:' + id), false);
    for (const container of [menu, picker, flyout, session, outputViewer, card, scrollbar, dialogFooter, snb]) assert.equal(container.checks.some(check => check.id === 'component:AgentHubGlobalHeader'), false);

    const chatHeader = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubChatHeader'] });
    for (const id of ['AgentHubChatHeader', 'AgentHubBreadcrumb', 'AgentHubBreadcrumbSeparator', 'AgentHubIconButton', 'AgentHubIcon', 'Breadcrumb', 'IconButton', 'Icon']) assert.equal(chatHeader.checks.find(check => check.id === 'component:' + id).status, 'missing');
    // Common Breadcrumb reaches Menu transitively; this does not mean a visible more-menu was supplied.
    assert.equal(chatHeader.checks.find(check => check.id === 'component:Menu').status, 'missing');
    for (const id of ['AgentHubGlobalHeader', 'GlobalHeaderV1', 'GlobalHeaderV2', 'PageHeader', 'AgentHubSNB', 'AgentHubButton', 'AgentHubMenu', 'AgentHubSessionPanel', 'AgentHubOutputViewer', 'AgentHubFileIcon', 'Table', 'Scrollbar']) assert.equal(chatHeader.checks.some(check => check.id === 'component:' + id), false);
    for (const container of [menu, picker, flyout, session, outputViewer, card, scrollbar, dialogFooter, snb, globalHeader]) assert.equal(container.checks.some(check => check.id === 'component:AgentHubChatHeader'), false);

    const dialog = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubDialog'] });
    for (const id of ['AgentHubDialog', 'AgentHubInput', 'AgentHubTextarea', 'AgentHubSelect', 'Select', 'Dialog', 'Textarea', 'Divider', 'AgentHubDialogFooter', 'AgentHubButton', 'AgentHubSearch', 'AgentHubItemCard', 'AgentHubMenu', 'AgentHubMenuItem', 'AgentHubScrollbar', 'Button', 'Input', 'IconButton', 'Scrollbar']) assert.equal(dialog.checks.find(check => check.id === 'component:' + id).status, 'missing');
    for (const id of ['AgentHubSNB', 'AgentHubNavItem', 'AgentHubGlobalHeader', 'AgentHubChatHeader', 'AgentHubPicker', 'AgentHubSessionPanel', 'AgentHubOutputViewer']) assert.equal(dialog.checks.some(check => check.id === 'component:' + id), false);
    for (const container of [menu, picker, flyout, session, outputViewer, card, scrollbar, dialogFooter, snb, globalHeader, chatHeader]) assert.equal(container.checks.some(check => check.id === 'component:AgentHubDialog'), false);

    const thinkingStatus = inspectFirstUse({ productRoot: directory, solution: 'agent-hub', components: ['AgentHubThinkingStatus'] });
    assert.deepEqual(thinkingStatus.checks.filter(check => check.id.startsWith('component:')).map(check => check.id).sort(), ['component:AgentHubBrandMark', 'component:AgentHubThinkingStatus']);
    for (const container of [menu, picker, flyout, session, outputViewer, card, scrollbar, dialogFooter, snb, globalHeader, chatHeader, dialog]) assert.equal(container.checks.some(check => check.id === 'component:AgentHubThinkingStatus'), false);

    for (const solution of ['cmp', 'paas']) {
      const catalog = loadComponentCatalogs(path.join(ROOT, 'docs'), solution);
      assert.equal(catalog.components.some(component => ids.includes(component.id)), false);
    }
    // Independent mode can read its own solution docs with no common catalog on disk.
    const docsRoot = path.join(directory, '.teamai/docs');
    for (const namespace of ['common', 'agent-hub']) fs.cpSync(path.join(ROOT, 'docs', namespace), path.join(docsRoot, namespace), { recursive: true });
    fs.mkdirSync(path.join(directory, '.aifrica'));
    fs.writeFileSync(path.join(directory, '.aifrica/frontend.json'), JSON.stringify({ schemaVersion: 1, solution: 'agent-hub', inheritCommon: false }));
    const independent = inspectFirstUse({ docsRoot, productRoot: directory, solution: 'agent-hub' });
    assert.equal(independent.catalogComponents, 0);
    assert.deepEqual(independent.componentCatalogs, []);
    assert.equal(independent.checks.find(check => check.id === 'distributed-documents').status, 'pass');
    assert.equal(fs.existsSync(path.join(docsRoot, 'frontend')), false);
    for (const id of ids) assert.throws(() => inspectFirstUse({ docsRoot, productRoot: directory, solution: 'agent-hub', components: [id] }), /Unknown selected component ID/);
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
