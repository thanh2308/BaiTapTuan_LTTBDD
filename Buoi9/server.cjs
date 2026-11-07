// Máy chủ bản web đóng gói: Node.js built-ins, không cần npm install.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const root = path.join(__dirname, "dist");
const dbFile = process.env.BOOKSTORE_DB || path.join(__dirname, "db.json");
const port = Number(process.env.PORT || 8089);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".json": "application/json",
};
const json = (res, code, value) => {
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(value));
};
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname.startsWith("/api/")) {
      const [, resource, id] = url.pathname.slice(4).split("/");
      const db = JSON.parse(fs.readFileSync(dbFile, "utf8"));
      if (
        ![
          "books",
          "categories",
          "users",
          "reviews",
          "orders",
          "notifications",
        ].includes(resource) ||
        !Array.isArray(db[resource])
      )
        return json(res, 404, { error: "Không tìm thấy" });
      if (req.method === "GET") {
        let rows = db[resource].filter(
          (row) =>
            (!id || String(row.id) === id) &&
            [...url.searchParams].every(
              ([k, v]) => k.startsWith("_") || String(row[k]) === v,
            ),
        );
        const sort = url.searchParams.get("_sort");
        if (sort)
          rows.sort(
            (a, b) =>
              (a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0) *
              (url.searchParams.get("_order") === "desc" ? -1 : 1),
          );
        if (id && !rows.length)
          return json(res, 404, { error: "Không tìm thấy" });
        return json(res, 200, id ? rows[0] : rows);
      }
      if (
        req.method === "POST" &&
        ["users", "reviews", "orders"].includes(resource)
      ) {
        let body = "";
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 65536)
            return json(res, 413, { error: "Dữ liệu quá lớn" });
        }
        const value = JSON.parse(body);
        const created = {
          ...value,
          id: Math.max(0, ...db[resource].map((r) => Number(r.id) || 0)) + 1,
        };
        // Đọc và ghi đồng bộ trong cùng lượt event-loop để không làm mất lần ghi khác.
        const current = JSON.parse(fs.readFileSync(dbFile, "utf8"));
        created.id =
          Math.max(0, ...current[resource].map((r) => Number(r.id) || 0)) + 1;
        if (
          resource === "users" &&
          current.users.some((u) => u.email === value.email)
        )
          return json(res, 409, { error: "Email đã tồn tại" });
        current[resource].push(created);
        const tmp = dbFile + ".tmp";
        fs.writeFileSync(tmp, JSON.stringify(current, null, 2));
        fs.renameSync(tmp, dbFile);
        return json(res, 201, created);
      }
      if (
        req.method === "PATCH" &&
        id &&
        ["users", "notifications"].includes(resource)
      ) {
        let body = "";
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 65536)
            return json(res, 413, { error: "Dữ liệu quá lớn" });
        }
        const value = JSON.parse(body);
        const current = JSON.parse(fs.readFileSync(dbFile, "utf8"));
        const index = current[resource].findIndex(
          (row) => String(row.id) === id,
        );
        if (index < 0) return json(res, 404, { error: "Không tìm thấy" });
        const updated = {
          ...current[resource][index],
          ...value,
          id: current[resource][index].id,
        };
        current[resource][index] = updated;
        fs.writeFileSync(dbFile + ".tmp", JSON.stringify(current, null, 2));
        fs.renameSync(dbFile + ".tmp", dbFile);
        return json(res, 200, updated);
      }
      return json(res, 405, { error: "Phương thức không hỗ trợ" });
    }
    if (!["GET", "HEAD"].includes(req.method)) return json(res, 405, {});
    let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep))
      return json(res, 403, {});
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory())
      file = path.join(root, "index.html");
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
    });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).pipe(res);
  } catch (err) {
    console.error(err.message);
    if (!res.headersSent)
      json(res, 500, { error: "Không đọc/ghi được dữ liệu" });
    else res.end();
  }
});
server.on("error", (err) => {
  console.error("Không khởi động được:", err.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${port}`;
  console.log(
    `BookStore đang chạy: ${url}\nGiữ cửa sổ này mở. Nhấn Ctrl+C để dừng.`,
  );
  if (!process.env.NO_OPEN) {
    const cmd =
      process.platform === "win32"
        ? ["cmd", ["/c", "start", "", url]]
        : process.platform === "darwin"
          ? ["open", [url]]
          : ["xdg-open", [url]];
    const child = spawn(cmd[0], cmd[1], { stdio: "ignore" });
    child.on("error", () => {});
    child.unref();
  }
});
