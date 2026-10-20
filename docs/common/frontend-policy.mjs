import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SOLUTIONS = ['cmp', 'paas', 'agent-hub'];
const defaultDocsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function frontendPolicy({ docsRoot = defaultDocsRoot, solution, local = null, inheritCommon } = {}) {
  const selected = solution || local?.solution;
  if (!SOLUTIONS.includes(selected)) throw new Error(`Select one solution: ${SOLUTIONS.join(', ')}`);
  if (local && local.solution !== selected) throw new Error('Local solution conflicts with selected solution');
  const shared = JSON.parse(fs.readFileSync(path.join(docsRoot, selected, 'frontend.json'), 'utf8'));
  if (shared.schemaVersion !== 1 || shared.solution !== selected) throw new Error('Invalid solution frontend identity');
  for (const value of [shared.inheritCommon, local?.inheritCommon, inheritCommon]) {
    if (value !== undefined && typeof value !== 'boolean') throw new Error('inheritCommon must be a boolean');
  }
  const enabled = inheritCommon ?? local?.inheritCommon ?? shared.inheritCommon ?? false;
  return {
    solution: selected,
    inheritCommon: enabled,
    roles: enabled ? ['frontend', 'frontend-common'] : ['frontend'],
    mode: enabled ? 'shared' : 'independent'
  };
}

export function frontendPlan(options = {}) {
  const policy = frontendPolicy(options);
  const commands = [
    policy.inheritCommon ? 'teamai roles set frontend --add frontend-common' : 'teamai roles set frontend',
    `teamai projects set ${policy.solution}`,
    'teamai pull --force'
  ];
  return {
    ...policy,
    localAdoptionPatch: { schemaVersion: 1, solution: policy.solution, inheritCommon: policy.inheritCommon },
    commands,
    note: 'Aifrica selection plan. Persist the chosen inheritCommon value in the solution or merge localAdoptionPatch into product adoption, then run these native TeamAI commands. JSON alone does not update installed resources.'
  };
}

if (process.argv[1] && fs.existsSync(process.argv[1]) && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const options = {};
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
      const flag = args[i];
      if (!['--solution', '--local', '--inherit-common'].includes(flag) || !args[i + 1]) throw new Error('Usage: node frontend-policy.mjs --solution cmp|paas|agent-hub [--local <product>/.aifrica/frontend.json] [--inherit-common true|false]');
      const value = args[++i];
      if (flag === '--solution') options.solution = value;
      if (flag === '--local') options.local = JSON.parse(fs.readFileSync(value, 'utf8'));
      if (flag === '--inherit-common') {
        if (!['true', 'false'].includes(value)) throw new Error('--inherit-common must be true or false');
        options.inheritCommon = value === 'true';
      }
    }
    console.log(JSON.stringify(frontendPlan(options), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
