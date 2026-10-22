// Receive this checkout (including unpublished contracts) through the real TeamAI CLI.
// All Git identity, cache and HOME writes stay inside a temporary sandbox.
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
  rmSync,
  readdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
const app = fileURLToPath(new URL("../", import.meta.url));
const source = resolve(app, "../..");
const sandbox = mkdtempSync(join(tmpdir(), "agent-hub-component-cli-"));
const snapshot = join(sandbox, "snapshot");
const home = join(sandbox, "home");
mkdirSync(snapshot);
mkdirSync(home);
const gitconfig = join(sandbox, "gitconfig");
const url = "https://teamai-local-snapshot.invalid/aifrica/teamai.git";
writeFileSync(
  gitconfig,
  `[user]\n name = Component test snapshot\n email = fixture@example.invalid\n[url "file://${join(sandbox, "remote.git")}"]\n insteadOf = ${url}\n[protocol "file"]\n allow = always\n`,
);
const env = {
  ...process.env,
  HOME: home,
  XDG_CONFIG_HOME: join(home, ".config"),
  XDG_CACHE_HOME: join(home, ".cache"),
  GIT_CONFIG_GLOBAL: gitconfig,
};
function run(command, args, cwd = app) {
  const p = spawnSync(command, args, {
    cwd,
    env,
    encoding: "utf8",
    timeout: 55000,
  });
  if (p.status !== 0)
    throw new Error(`${command} ${args.join(" ")}\n${p.stdout}\n${p.stderr}`);
  return p.stdout;
}
const version = run("teamai", ["--version"]).trim();
if (version !== "0.27.0")
  throw new Error(`Use teamai-cli@0.27.0; installed ${version}`);
for (const top of ["docs", "rules", "skills", "manifest"])
  cpSync(join(source, top), join(snapshot, top), {
    recursive: true,
    filter: (p) => !p.endsWith(".DS_Store"),
  });
cpSync(join(source, "teamai.yaml"), join(snapshot, "teamai.yaml"));
run("git", ["init", "-b", "main"], snapshot);
run("git", ["add", "."], snapshot);
run(
  "git",
  ["commit", "-m", "Add local component test contract snapshot"],
  snapshot,
);
const snapshotCommit = run("git", ["rev-parse", "HEAD"], snapshot).trim();
run(
  "git",
  ["clone", "--bare", "--no-local", snapshot, join(sandbox, "remote.git")],
  sandbox,
);
// Anchor the consumer here so TeamAI cannot select the containing source repository.
const anchor = join(app, ".git");
const createdAnchor = !existsSync(anchor);
if (createdAnchor)
  run("git", [
    "init",
    "-b",
    "main",
    `--separate-git-dir=${join(sandbox, "consumer.git")}`,
  ]);
try {
  console.log(
    run("teamai", [
      "init",
      url,
      "--provider",
      "git",
      "--role",
      "frontend-common",
      "--project",
      "agent-hub",
      "--agent",
      "codex,claude",
    ]),
  );
  console.log(run("teamai", ["pull", "--force"]));
  console.log(run("teamai", ["doctor"]));
  const mirror = join(app, ".teamai/docs");
  const digest = (p) =>
    createHash("sha256").update(readFileSync(p)).digest("hex");
  function files(root, prefix = "") {
    return readdirSync(root, { withFileTypes: true }).flatMap((e) =>
      e.name.startsWith(".")
        ? []
        : e.isDirectory()
          ? files(join(root, e.name), prefix + e.name + "/")
          : [prefix + e.name],
    );
  }
  const namespaces = ["common", "frontend", "agent-hub"];
  const checks = namespaces.map((namespace) => {
    const expected = files(join(source, "docs", namespace));
    const actual = files(join(mirror, namespace));
    const byteExact =
      expected.length === actual.length &&
      expected.every(
        (p) =>
          actual.includes(p) &&
          digest(join(source, "docs", namespace, p)) ===
            digest(join(mirror, namespace, p)),
      );
    if (!byteExact) throw new Error(`Mirror differs: ${namespace}`);
    return { namespace, files: actual.length, byteExact };
  });
  const skills = {};
  for (const host of [".codex", ".claude"]) {
    skills[host] = readdirSync(join(app, host, "skills")).filter((n) =>
      n.startsWith("aifrica-"),
    );
    if (skills[host].length !== 7)
      throw new Error(`${host}: expected seven shared skills`);
  }
  const configRoot = join(home, ".teamai/projects");
  const actualConfigPath = readdirSync(configRoot)
    .map((name) => join(configRoot, name, "config.yaml"))
    .find((path) => existsSync(path));
  if (!actualConfigPath)
    throw new Error("Missing actual isolated CLI selection");
  const actualConfig = readFileSync(actualConfigPath, "utf8");
  if (
    !/^primaryRole: frontend-common$/m.test(actualConfig) ||
    !/^additionalRoles: \[\]$/m.test(actualConfig) ||
    !/^  - agent-hub$/m.test(actualConfig)
  )
    throw new Error("Actual CLI role/solution differs");
  const actualSelection = {
    primaryRole: "frontend-common",
    additionalRoles: [],
    projects: ["agent-hub"],
    verifiedFrom: actualConfigPath,
  };
  mkdirSync(join(app, "evidence"), { recursive: true });
  writeFileSync(
    join(app, "evidence/teamai-delivery.json"),
    JSON.stringify(
      {
        cliVersion: version,
        source:
          "current aifrica-teamai checkout, delivered through isolated Git snapshot",
        snapshotCommit,
        role: "frontend-common",
        project: "agent-hub",
        namespaces: checks,
        actualSelection,
        skills,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    "Verified: exact document/asset delivery and seven native skills per tool.",
  );
} finally {
  if (createdAnchor) rmSync(anchor, { force: true });
}
