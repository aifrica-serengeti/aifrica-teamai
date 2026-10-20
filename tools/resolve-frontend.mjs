import { resolveFrontend } from './lib/config.mjs';

try {
  const args = process.argv.slice(2);
  const options = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    if (!['--solution', '--profile', '--local'].includes(key) || !args[index + 1]) throw new Error('Usage: npm run resolve -- --solution cmp [--profile <profile>] [--local /path/to/product/.aifrica/frontend.json]');
    options[{ '--local': 'localFile', '--solution': 'solution', '--profile': 'profile' }[key]] = args[index + 1];
  }
  console.log(JSON.stringify(resolveFrontend(options), null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
