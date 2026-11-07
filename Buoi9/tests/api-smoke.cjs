const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bookstore9-api-"));
const db = path.join(dir, "db.json");
fs.copyFileSync(path.join(__dirname, "../db.seed.json"), db);
const cli = path.join(
  path.dirname(require.resolve("json-server/package.json")),
  "lib/cli/bin.js",
);
const child = spawn(
  process.execPath,
  [cli, "--watch", db, "--port", "13009", "--host", "127.0.0.1"],
  { stdio: "ignore" },
);
const base = "http://127.0.0.1:13009";
async function get(p) {
  const r = await fetch(base + p);
  assert.ok(r.ok);
  return r.json();
}
async function send(p, method, payload) {
  const r = await fetch(base + p, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  assert.ok(r.ok);
  return r.json();
}
(async () => {
  let up = false;
  for (let i = 0; i < 100; i++) {
    try {
      await get("/books");
      up = true;
      break;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  assert.ok(up, "json-server startup");
  const orders = await get("/orders?userId=1&_sort=createdAt&_order=desc");
  assert.equal(orders.length, 3);
  assert.equal(orders[0].id, 3);
  const seed = JSON.parse(fs.readFileSync(db, "utf8"));
  const payload = {
    ...seed.orders[0],
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  delete payload.id;
  const created = await send("/orders", "POST", payload);
  assert.ok(created.id > 3);
  assert.equal(
    (await get("/orders?userId=1&_sort=createdAt&_order=desc"))[0].id,
    created.id,
  );
  assert.equal((await get("/orders?userId=2")).length, 0);
  const user = await send("/users/1", "PATCH", {
    name: "Smoke API",
    phone: "0987654321",
  });
  assert.equal(user.name, "Smoke API");
  assert.equal(user.email, "demo@bookstore.vn");
  assert.equal(user.password, "123456");
  const notifications = await get(
    "/notifications?userId=1&_sort=createdAt&_order=desc",
  );
  assert.equal(notifications.length, 5);
  assert.equal(notifications[0].id, 1);
  assert.equal(
    (await send("/notifications/1", "PATCH", { read: true })).read,
    true,
  );
  console.log(
    "PASS json-server: order filtering/sorting, POST order, new order first, empty user orders, partial profile PATCH, notifications GET/PATCH",
  );
})()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => {
    child.kill();
    fs.rmSync(dir, { recursive: true, force: true });
  });
