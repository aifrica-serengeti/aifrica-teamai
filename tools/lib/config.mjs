import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import { parse } from 'yaml';
import { merge } from '../../docs/frontend/contracts/check-first-use.mjs';
import { SOLUTIONS, frontendPolicy, frontendPlan } from '../../docs/common/frontend-policy.mjs';

export { merge };

export const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
export { SOLUTIONS, frontendPolicy, frontendPlan };
const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/frontend/contracts/frontend-extension.schema.json'), 'utf8'));
const checkExtension = new Ajv({ allErrors: true, strict: false }).compile(schema);

export function readData(file) {
  return parse(fs.readFileSync(file, 'utf8'));
}

export function validateExtension(data, label = 'extension') {
  if (!checkExtension(data)) {
    throw new Error(`${label}: ${checkExtension.errors.map(e => `${e.instancePath || '/'} ${e.message}`).join('; ')}`);
  }
  return data;
}

export function safePath(root, relative, mustExist = false) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative) || relative.startsWith('~') || /^[A-Za-z]:/.test(relative) || relative.includes('\\') || relative.split('/').includes('..')) {
    throw new Error(`Repository-relative path required: ${relative}`);
  }
  const resolved = path.resolve(root, relative);
  const within = candidate => candidate === path.resolve(root) || candidate.startsWith(`${path.resolve(root)}${path.sep}`);
  if (!within(resolved)) throw new Error(`Path escapes repository: ${relative}`);
  if (fs.existsSync(resolved)) {
    const actualRoot = fs.realpathSync(root);
    const actual = fs.realpathSync(resolved);
    if (actual !== actualRoot && !actual.startsWith(`${actualRoot}${path.sep}`)) throw new Error(`Symlink escapes repository: ${relative}`);
  } else if (mustExist) throw new Error(`Missing local path: ${relative}`);
  return resolved;
}

export function resolveFrontend({ solution, profile: requestedProfile, localFile, root = ROOT } = {}) {
  if (localFile && (path.basename(localFile) !== 'frontend.json' || path.basename(path.dirname(localFile)) !== '.aifrica')) {
    throw new Error('Local adoption must be <product>/.aifrica/frontend.json');
  }
  const local = localFile ? validateExtension(readData(localFile), localFile) : null;
  if (local && solution && local.solution !== solution) throw new Error(`Solution mismatch: ${solution} vs ${local.solution}`);
  const selected = solution || local?.solution;
  if (!SOLUTIONS.includes(selected)) throw new Error(`Select one solution: ${SOLUTIONS.join(', ')}`);
  const sharedFile = path.join(root, 'docs', selected, 'frontend.json');
  const shared = validateExtension(readData(sharedFile), sharedFile);
  if (shared.solution !== selected) throw new Error(`Solution mismatch in ${sharedFile}`);
  const policy = frontendPolicy({ docsRoot: path.join(root, 'docs'), solution: selected, local });
  let effective = merge({ schemaVersion: 1, solution: selected, tokens: {}, components: {}, pagePatterns: { list: {}, create: {}, detail: {} }, documentOverrides: [], exceptions: [] }, shared);
  const layers = [`docs/${selected}/frontend.json`];
  if (requestedProfile && local?.profile && requestedProfile !== local.profile) throw new Error('Profile selection conflicts with local adoption');
  const selectedProfile = requestedProfile || local?.profile;
  if (selectedProfile) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(selectedProfile)) throw new Error('Invalid profile name');
    const profileFile = path.join(root, 'docs', selected, 'profiles', selectedProfile, 'frontend.json');
    const profile = validateExtension(readData(profileFile), profileFile);
    if (profile.solution !== selected) throw new Error('Profile belongs to another solution');
    if ('inheritCommon' in profile) throw new Error('Set inheritCommon in the solution or local adoption, not a visual profile');
    if (profile.status !== 'active') throw new Error('Select a verified active product profile');
    effective = merge(effective, profile);
    layers.push(`docs/${selected}/profiles/${selectedProfile}/frontend.json`);
  }
  if (local) {
    effective = merge(effective, local);
    layers.push('.aifrica/frontend.json');
    const productRoot = path.resolve(path.dirname(localFile), '..');
    for (const relative of Object.values(effective.paths || {})) if (relative) safePath(productRoot, relative, true);
    for (const relative of effective.documentOverrides) safePath(productRoot, relative, true);
    for (const [id, mapping] of Object.entries(effective.components)) {
      if (mapping.source) safePath(productRoot, mapping.source, true);
      if (mapping.status === 'implemented' && !mapping.export) throw new Error(`Missing export for ${id}`);
    }
  }
  validateExtension(effective, 'effective extension');
  return { layers, effective, policy };
}

export function selectedResources(root, roleIds, projectId) {
  const roles = readData(path.join(root, 'manifest/roles.yaml')).roles;
  const projects = readData(path.join(root, 'manifest/projects.yaml')).projects;
  roleIds = Array.isArray(roleIds) ? roleIds : [roleIds];
  const selectedRoles = roleIds.map(id => roles.find(entry => entry.id === id));
  const project = projects.find(entry => entry.id === projectId);
  if (selectedRoles.some(role => !role) || !project) throw new Error(`Unknown role/project: ${roleIds.join(',')}/${projectId}`);
  const namespaces = type => new Set([...selectedRoles.flatMap(role => role.resources[type] || []), ...(project.resources[type] || [])]);
  return { knowledge: namespaces('knowledge'), skills: namespaces('skills'), docs: namespaces('docs') };
}
