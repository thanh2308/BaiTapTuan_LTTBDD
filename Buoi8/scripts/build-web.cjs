const { spawnSync } = require("node:child_process");
const path = require("node:path");
const cli = path.join(
  path.dirname(require.resolve("expo/package.json")),
  "bin",
  "cli",
);
const result = spawnSync(
  process.execPath,
  [cli, "export", "--platform", "web"],
  {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
    env: {
      ...process.env,
      CI: "1",
      EXPO_NO_TELEMETRY: "1",
      EXPO_PUBLIC_API_URL: "/api",
    },
  },
);
if (result.error) console.error(result.error);
process.exit(result.status ?? 1);
