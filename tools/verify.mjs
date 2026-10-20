import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SOLUTIONS, readData, resolveFrontend, selectedResources, validateExtension, frontendPlan } from './lib/config.mjs';
import { loadComponentCatalogs } from '../docs/frontend/contracts/check-first-use.mjs';

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const exists = relative => fs.existsSync(path.join(ROOT, relative));
function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.name === 'node_modules' || entry.name === '.git' ? [] : entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
}
const allFiles = files(ROOT);
const markdownLinks = [];
let linkCount = 0;
for (const file of allFiles.filter(file => file.endsWith('.md'))) {
  const relative = path.relative(ROOT, file);
  const source = fs.readFileSync(file, 'utf8');
  // Examples inside fenced blocks are not navigable document links.
  const prose = source.replace(/^(```|~~~)[\s\S]*?^\1.*$/gm, '');
  for (const match of prose.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    const target = match[1].trim().replace(/^<([^>]+)>.*$/, '$1').split(/\s+["']/)[0];
    if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(target)) continue;
    const pathname = decodeURIComponent(target.split(/[?#]/)[0]);
    if (!pathname) continue;
    linkCount++;
    const resolved = path.resolve(path.dirname(file), pathname);
    markdownLinks.push({ file, resolved, target });
    assert(resolved.startsWith(`${ROOT}${path.sep}`) || resolved === ROOT, `${relative}: link escapes repository: ${target}`);
    assert(fs.existsSync(resolved), `${relative}: missing link: ${target}`);
  }
  if (relative.startsWith('skills/') || relative.startsWith('docs/frontend/')) {
    assert(!/\/Users\/|C:\\\\Users\\\\|node docs\/tools\//.test(source), `${relative}: machine/source-only instruction remains`);
  }
}

const config = readData(path.join(ROOT, 'teamai.yaml'));
assert(config.team === 'aifrica' && config.provider === 'github' && /^https:\/\/github\.com\/.+\.git$/.test(config.repo), 'teamai.yaml: invalid team/repo/provider');
assert(config.sharing?.docs?.localDir === './.teamai/docs', 'teamai.yaml: docs mirror contract drift');
const roles = readData(path.join(ROOT, 'manifest/roles.yaml'));
const projects = readData(path.join(ROOT, 'manifest/projects.yaml'));
assert(roles.version === 1 && projects.version === 1, 'Manifest version must be 1');
assert(new Set(roles.roles.map(r => r.id)).size === roles.roles.length, 'Duplicate roles');
assert(new Set(projects.projects.map(p => p.id)).size === projects.projects.length, 'Duplicate projects');
const knownNamespaces = new Set();
for (const entry of [...roles.roles, ...projects.projects]) {
  for (const [kind, namespaces] of Object.entries(entry.resources)) {
    assert(['knowledge', 'skills', 'docs', 'agents', 'env', 'hooks', 'mcp', 'models', 'wiki', 'learnings'].includes(kind), `${entry.id}: unknown resource kind ${kind}`);
    assert(Array.isArray(namespaces), `${entry.id}/${kind}: namespaces must be an array`);
    for (const namespace of namespaces) {
      if (kind === 'docs') { knownNamespaces.add(namespace); assert(exists(`docs/${namespace}`), `${entry.id}: missing docs namespace ${namespace}`); }
      if (kind === 'skills') assert(exists(`skills/${namespace}`), `${entry.id}: missing skill namespace ${namespace}`);
      if (kind === 'knowledge') assert(exists(`rules/${namespace}`), `${entry.id}: missing rules namespace ${namespace}`);
    }
  }
}
for (const entry of fs.readdirSync(path.join(ROOT, 'docs'), { withFileTypes: true })) {
  // TeamAI excludes hidden metadata; Finder may create .DS_Store after opening docs.
  if (entry.name.startsWith('.')) continue;
  assert(entry.isDirectory() && knownNamespaces.has(entry.name), `docs/${entry.name}: undeclared directory/file would be shared by TeamAI`);
}
let combinationCount = 0;
let extensionCount = 0;
function validateDeliveredLinks(role, solution, resources) {
  combinationCount++;
  for (const link of markdownLinks) {
    const from = path.relative(path.join(ROOT, 'docs'), link.file).split(path.sep);
    if (!resources.docs.has(from[0])) continue;
    const to = path.relative(path.join(ROOT, 'docs'), link.resolved).split(path.sep);
    assert(resources.docs.has(to[0]), `${role}+${solution}: undelivered link in ${path.relative(ROOT, link.file)} -> ${link.target}`);
  }
}
for (const solution of SOLUTIONS) {
  const plan = frontendPlan({ solution });
  const frontend = selectedResources(ROOT, plan.roles, solution);
  const base = selectedResources(ROOT, 'frontend', solution);
  const backend = selectedResources(ROOT, 'backend', solution);
  assert(base.skills.size === 0 && !base.docs.has('frontend'), `${solution}: frontend base must not imply the shared bundle`);
  assert(frontend.skills.has('frontend') === plan.inheritCommon && frontend.docs.has('frontend') === plan.inheritCommon, `${solution}: shared opt-in selection mismatch`);
  assert(!backend.skills.has('frontend') && !backend.knowledge.has('frontend') && !backend.docs.has('frontend'), `${solution}: frontend namespace leaks to backend`);
  for (const other of SOLUTIONS.filter(value => value !== solution)) assert(!frontend.docs.has(other) && !backend.docs.has(other), `${solution}: receives unrelated solution ${other}`);
  for (const [role, resources] of [['frontend', frontend], ['backend', backend]]) validateDeliveredLinks(role, solution, resources);
  if (plan.inheritCommon) validateDeliveredLinks('frontend-without-common', solution, base);
  try { validateExtension(readData(path.join(ROOT, `docs/${solution}/frontend.json`))); resolveFrontend({ solution }); extensionCount++; } catch (error) { errors.push(error.message); }
}

const registryFile = path.join(ROOT, 'docs/frontend/design/component-registry.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const ids = new Set(registry.components.map(component => component.id));
assert(ids.size === registry.components.length, 'Duplicate component registry IDs');
const requiredDocuments = ['README.md', 'definition.md', 'styles.md', 'behavior.md', 'accessibility.md', 'verification.md'];
for (const component of registry.components) {
  assert(component.implementation?.status === 'unmapped' && component.implementation?.source === null && component.implementation?.export === null, `${component.id}: common registry must not claim product implementation`);
  const document = path.resolve(path.dirname(registryFile), component.docs);
  assert(fs.existsSync(document), `${component.id}: invalid registry-relative docs entry ${component.docs}`);
  for (const name of requiredDocuments) assert(fs.existsSync(path.join(path.dirname(document), name)), `${component.id}: missing ${name}`);
  for (const dependency of component.dependencies) assert(ids.has(dependency), `${component.id}: unresolved dependency ${dependency}`);
}
const visited = new Set();
function visit(id, stack = []) {
  if (stack.includes(id)) { errors.push(`Component dependency cycle: ${[...stack, id].join(' -> ')}`); return; }
  if (visited.has(id)) return;
  const entry = registry.components.find(component => component.id === id);
  for (const dependency of entry?.dependencies || []) visit(dependency, [...stack, id]);
  visited.add(id);
}
for (const id of ids) visit(id);
let solutionComponentCount = 0;
for (const solution of SOLUTIONS) {
  try {
    const catalog = loadComponentCatalogs(path.join(ROOT, 'docs'), solution);
    const byId = new Map(catalog.components.map(component => [component.id, component]));
    function checkCycle(id, ancestors = []) {
      assert(!ancestors.includes(id), `${solution}: component dependency cycle ${[...ancestors, id].join(' -> ')}`);
      if (ancestors.includes(id)) return;
      for (const dependency of byId.get(id).dependencies || []) checkCycle(dependency, [...ancestors, id]);
    }
    for (const component of catalog.components) checkCycle(component.id);
    for (const entry of catalog.registries.filter(entry => entry.namespace !== 'frontend')) {
      for (const component of entry.data.components) {
        solutionComponentCount++;
        assert(component.implementation?.status === 'unmapped' && component.implementation?.source === null && component.implementation?.export === null, `${solution}/${component.id}: product implementation must be verified locally`);
        const document = path.resolve(path.dirname(entry.file), component.docs);
        assert(document.startsWith(`${path.dirname(entry.file)}${path.sep}`), `${solution}/${component.id}: docs leaves solution catalog`);
        for (const name of requiredDocuments) assert(fs.existsSync(path.join(path.dirname(document), name)), `${solution}/${component.id}: missing ${name}`);
      }
    }
  } catch (error) { errors.push(error.message); }
}
for (const name of ['ListPage', 'CreatePage', 'DetailPage']) assert(exists(`docs/frontend/design/patterns/${name}.md`), `${name}: missing common page pattern`);

const skillFiles = allFiles.filter(file => file.endsWith('/SKILL.md') && file.includes('/skills/'));
const skillNames = new Set();
for (const file of skillFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert(Boolean(frontmatter), `${path.relative(ROOT, file)}: missing YAML frontmatter`);
  if (!frontmatter) continue;
  const metadata = readDataText(frontmatter[1]);
  assert(metadata.name === path.basename(path.dirname(file)) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.name), `${file}: invalid skill name`);
  assert(typeof metadata.description === 'string' && metadata.description.trim().length > 10, `${metadata.name}: missing meaningful description`);
  assert(!skillNames.has(metadata.name), `${metadata.name}: duplicate skill name across namespaces`);
  skillNames.add(metadata.name);
}

function readDataText(text) {
  // Reuse the same YAML parser without writing temporary files.
  return parseYaml(text);
}
import { parse as parseYaml } from 'yaml';

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`FAILED: ${errors.length} issue(s)`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${linkCount} local links; ${registry.components.length} common + ${solutionComponentCount} solution component contracts and dependency graphs; ${skillFiles.length} skills; ${combinationCount} role/solution combinations; ${extensionCount} extension schemas; docs namespace isolation`);
}
