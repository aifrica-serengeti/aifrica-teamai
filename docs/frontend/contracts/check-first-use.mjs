import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SOLUTIONS, frontendPolicy } from '../../common/frontend-policy.mjs';

const defaultDocsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function merge(base, patch) {
  const result = structuredClone(base);
  for (const [key, value] of Object.entries(patch)) {
    if (['__proto__', 'prototype', 'constructor'].includes(key)) throw new Error(`Invalid extension key: ${key}`);
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = merge(result[key] && typeof result[key] === 'object' && !Array.isArray(result[key]) ? result[key] : {}, value);
    } else result[key] = structuredClone(value);
  }
  return result;
}

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }

export function loadComponentCatalogs(docsRoot, solution, { inheritCommon = frontendPolicy({ docsRoot, solution }).inheritCommon } = {}) {
  if (!SOLUTIONS.includes(solution)) throw new Error('Select one supported solution');
  const commonFile = path.join(docsRoot, 'frontend/design/component-registry.json');
  const solutionFile = path.join(docsRoot, solution, 'design/component-registry.json');
  const registries = inheritCommon ? [{ file: commonFile, namespace: 'frontend', data: readJson(commonFile) }] : [];
  if (fs.existsSync(solutionFile)) {
    const data = readJson(solutionFile);
    if (data.schemaVersion !== 1 || data.solution !== solution) throw new Error('Invalid solution component catalog identity');
    if (inheritCommon || data.extendsCommon !== true) registries.push({ file: solutionFile, namespace: solution, data });
  }
  const components = [];
  const ids = new Set();
  for (const registry of registries) {
    for (const component of registry.data.components) {
      if (!component.id || ids.has(component.id)) throw new Error(`Duplicate or invalid component ID: ${component.id}`);
      ids.add(component.id);
      components.push(component);
    }
  }
  for (const component of components) for (const dependency of component.dependencies || []) {
    if (!ids.has(dependency)) throw new Error(`Unknown dependency ${dependency} of ${component.id}`);
  }
  return { registries, components };
}

function productFile(root, relative) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative) || /^[A-Za-z]:|^~/.test(relative) || relative.includes('\\') || relative.split('/').includes('..')) {
    throw new Error(`Product-relative file required: ${relative}`);
  }
  const target = path.resolve(root, relative);
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) return false;
  const realRoot = fs.realpathSync(root);
  const realTarget = fs.realpathSync(target);
  if (!realTarget.startsWith(`${realRoot}${path.sep}`)) throw new Error(`File leaves product root: ${relative}`);
  return true;
}

export function inspectFirstUse({ docsRoot = defaultDocsRoot, productRoot = process.cwd(), solution, profile: requestedProfile, components = [] } = {}) {
  productRoot = path.resolve(productRoot);
  docsRoot = path.resolve(docsRoot);
  const localFile = path.join(productRoot, '.aifrica/frontend.json');
  const local = fs.existsSync(localFile) ? readJson(localFile) : null;
  const selected = solution || local?.solution;
  if (!SOLUTIONS.includes(selected)) throw new Error(`Select --solution ${SOLUTIONS.join('|')}, or declare it in .aifrica/frontend.json`);
  if (local && (local.schemaVersion !== 1 || local.solution !== selected)) throw new Error('Local schemaVersion/solution conflicts with the selected solution');
  const sharedFile = path.join(docsRoot, selected, 'frontend.json');
  const shared = readJson(sharedFile);
  if (shared.schemaVersion !== 1 || shared.solution !== selected) throw new Error('Invalid shared extension identity');
  const policy = frontendPolicy({ docsRoot, solution: selected, local });
  let effective = structuredClone(shared);
  const layers = [`${selected}/frontend.json`];
  if (requestedProfile && local?.profile && requestedProfile !== local.profile) throw new Error('Profile selection conflicts with local adoption');
  const selectedProfile = requestedProfile || local?.profile;
  if (selectedProfile) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(selectedProfile)) throw new Error('Invalid profile name');
    const profile = readJson(path.join(docsRoot, selected, 'profiles', selectedProfile, 'frontend.json'));
    if (profile.solution !== selected || profile.status !== 'active') throw new Error('Select a verified active product profile');
    if ('inheritCommon' in profile) throw new Error('Set inheritCommon in the solution or local adoption, not a visual profile');
    effective = merge(effective, profile);
    layers.push(`${selected}/profiles/${selectedProfile}/frontend.json`);
  }
  if (local) { effective = merge(effective, local); layers.push('.aifrica/frontend.json'); }
  const checks = [];
  const add = (id, passed, detail) => checks.push({ id, status: passed ? 'pass' : 'missing', detail });
  const requiredDocs = ['common/resolution.md', `${selected}/README.md`, `${selected}/extension.md`];
  if (policy.inheritCommon) requiredDocs.push('frontend/README.md', 'frontend/ai-prompt.md', 'frontend/design/component-registry.json', 'frontend/design/patterns/README.md');
  const absentDocs = requiredDocs.filter(relative => !fs.existsSync(path.join(docsRoot, relative)));
  add('distributed-documents', absentDocs.length === 0, absentDocs);
  add('local-adoption', Boolean(local) && local.status === 'active', local ? `status=${local.status || 'unset'}` : '.aifrica/frontend.json is absent');
  for (const name of ['architecture', 'componentRegistry', 'designTokens']) {
    const relative = effective.paths?.[name];
    add(`product-${name}`, Boolean(relative) && productFile(productRoot, relative), relative || 'not mapped');
  }
  const catalog = loadComponentCatalogs(docsRoot, selected, { inheritCommon: policy.inheritCommon });
  const byId = new Map(catalog.components.map(entry => [entry.id, entry]));
  const required = new Set();
  function visit(id, stack = []) {
    if (!byId.has(id)) throw new Error(`Unknown selected component ID: ${id}`);
    if (stack.includes(id)) throw new Error(`Component dependency cycle: ${[...stack, id].join(' -> ')}`);
    if (required.has(id)) return;
    required.add(id);
    for (const dependency of byId.get(id).dependencies || []) visit(dependency, [...stack, id]);
  }
  for (const id of components) visit(id);
  add('component-selection', components.length > 0 || (!policy.inheritCommon && catalog.components.length === 0), components.length ? components : policy.inheritCommon ? 'Select the components used by this task with --components' : 'Independent solution: use its own product registry and checks');
  for (const id of required) {
    const mapping = effective.components?.[id];
    const valid = mapping?.status === 'implemented' && Boolean(mapping.export) && Boolean(mapping.source) && productFile(productRoot, mapping.source);
    add(`component:${id}`, valid, mapping || 'no verified product mapping');
  }
  for (const relative of effective.documentOverrides || []) add(`override:${relative}`, productFile(productRoot, relative), relative);
  return {
    solution: selected,
    profile: selectedProfile || null,
    inheritance: policy,
    componentCatalogs: catalog.registries.map(registry => path.relative(docsRoot, registry.file).split(path.sep).join('/')),
    catalogComponents: catalog.components.length,
    layers,
    checks,
    mappingInputsPresent: checks.every(check => check.status === 'pass'),
    visualParityVerified: false,
    runtimeParityVerified: false,
    limits: [
      'This inspects supplied metadata and files; it does not validate every JSON Schema rule or the correctness of an export.',
      'A new product may implement the reference contracts instead of reusing components; missing mappings describe unfinished adoption, not missing common documentation.',
      'Matching appearance requires adopted light/dark tokens, fonts/assets, layout and locale plus actual render comparison.',
      'Matching behavior requires type/build checks and the documented state, keyboard, focus and interaction tests.'
    ]
  };
}

if (process.argv[1] && fs.existsSync(process.argv[1]) && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const options = {};
    let strict = false;
    const args = process.argv.slice(2);
    for (let index = 0; index < args.length; index++) {
      const flag = args[index];
      if (flag === '--strict') { strict = true; continue; }
      if (!['--solution', '--profile', '--product-root', '--docs-root', '--components'].includes(flag) || !args[index + 1]) throw new Error('Usage: node check-first-use.mjs --solution cmp [--profile <profile>] --product-root <product> [--components Button,Input,Table] [--strict]');
      const value = args[++index];
      if (flag === '--components') options.components = value.split(',').map(value => value.trim()).filter(Boolean);
      else options[{ '--solution': 'solution', '--profile': 'profile', '--product-root': 'productRoot', '--docs-root': 'docsRoot' }[flag]] = value;
    }
    const result = inspectFirstUse(options);
    console.log(JSON.stringify(result, null, 2));
    if (strict && !result.mappingInputsPresent) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
  }
}
