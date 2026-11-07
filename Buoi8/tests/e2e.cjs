const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { spawn } = require("node:child_process");
const project = path.join(__dirname, "..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "bookstore-e2e-"));
const testDb = path.join(temp, "db.json");
fs.copyFileSync(path.join(project, "db.seed.json"), testDb);
const server = spawn(process.execPath, [path.join(project, "server.cjs")], {
  env: { ...process.env, PORT: "18080", NO_OPEN: "1", BOOKSTORE_DB: testDb },
  stdio: "pipe",
});
server.on("error", (e) => console.error(e));
const base = "http://127.0.0.1:18080";
async function ready() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(base + "/api/books");
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw Error("Máy chủ kiểm thử không khởi động");
}

(async () => {
  await ready();
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    headless: true,
    args: ["--no-sandbox"],
  });
  const p = await b.newPage({ viewport: { width: 430, height: 932 } });
  let count = 0;
  const errors = [];
  p.setDefaultTimeout(8000);
  p.on("pageerror", (e) => errors.push(e.message));
  const text = () => p.locator("body").innerText();
  const click = async (t) =>
    p.getByText(t, { exact: true }).filter({ visible: true }).last().click();
  const check = async (t, fn) => {
    await fn();
    console.log("PASS", ++count, t);
  };
  const wait = () => p.waitForTimeout(500);
  const field = (name) =>
    p.getByRole("textbox", { name, exact: true }).filter({ visible: true });
  try {
    await p.goto(base);
    await p.getByText("Clean Code", { exact: true }).waitFor();
    await check("Home tải sách", async () =>
      assert.ok((await text()).includes("Nhà Giả Kim")),
    );
    await p
      .getByLabel("Yêu thích", { exact: true })
      .filter({ visible: true })
      .first()
      .click();
    await wait();
    await click("Tài khoản");
    await p.route("**/api/books", route => route.abort());
    await click("Danh sách yêu thích");
    await p.getByText("Thử lại", { exact: true }).filter({visible:true}).waitFor();
    await check("Yêu thích có trạng thái lỗi API", async () => assert.ok((await text()).includes("Không kết nối được máy chủ")));
    await p.unroute("**/api/books");
    await click("Thử lại");
    await wait();
    await check("Yêu thích dùng chung store", async () =>
      assert.ok((await text()).includes("Dế Mèn Phiêu Lưu Ký")),
    );
    await p.reload();
    await wait();
    await click("Tài khoản");
    await click("Danh sách yêu thích");
    await wait();
    await check("Yêu thích còn sau reload", async () =>
      assert.ok((await text()).includes("Dế Mèn Phiêu Lưu Ký")),
    );
    await p
      .getByLabel("Bỏ yêu thích", { exact: true })
      .filter({ visible: true })
      .click();
    await wait();
    await check("Bỏ tim hiện empty state", async () =>
      assert.ok((await text()).includes("Chưa có sách yêu thích")),
    );
    await click("Khám phá sách");
    await click("Clean Code");
    await wait();
    await check("Điểm trung bình và sách liên quan", async () => {
      assert.ok((await text()).includes("4.5 (2 đánh giá)"));
      assert.ok((await text()).includes("Sách liên quan"));
    });
    await check("Chưa đăng nhập không hiện form đánh giá", async () => {
      assert.ok((await text()).includes("Đăng nhập để viết đánh giá"));
      assert.equal(await p.getByText("Gửi đánh giá", {exact:true}).filter({visible:true}).count(), 0);
    });
    await click("TypeScript Handbook");
    await wait();
    await check("Mở sách liên quan bằng push", async () => {
      const seed = JSON.parse(fs.readFileSync(path.join(project,"db.seed.json"),"utf8"));
      const related = seed.books.find(b => b.title === "TypeScript Handbook");
      assert.ok((await text()).includes(related.description));
    });
    await p.reload(); await wait(); await click("Clean Code"); await wait();
    await click("Thêm vào giỏ");
    await p.reload();
    await wait();
    // React Navigation may not register browser history: return via header when needed.
    if (!(await text()).includes("Tài khoản")) {
      const back = p.getByRole("button", { name: /back|quay/i });
      if (await back.count()) await back.first().click();
    }
    await click("Giỏ hàng");
    await wait();
    await check("Chặn giảm dưới 1", async () => assert.equal(await p.getByLabel("Giảm",{exact:true}).filter({visible:true}).getAttribute("aria-disabled"), "true"));
    await p
      .getByLabel("Tăng", { exact: true })
      .filter({ visible: true })
      .click();
    await p
      .getByLabel("Tăng", { exact: true })
      .filter({ visible: true })
      .click();
    await wait();
    await check("Tăng số lượng debounce và tổng", async () =>
      assert.ok((await text()).includes("1.167.000")),
    );
    await p.getByLabel("Giảm", {exact:true}).filter({visible:true}).click(); await wait();
    await check("Giảm số lượng cập nhật tổng", async () => assert.ok((await text()).includes("778.000")));
    await p.getByLabel("Tăng", {exact:true}).filter({visible:true}).click(); await wait();
    await field("Mã giảm giá").fill("sai");
    await click("Áp dụng");
    await check("Mã sai", async () =>
      assert.ok((await text()).includes("Mã giảm giá không hợp lệ")),
    );
    await field("Mã giảm giá").fill("SALE10");
    await click("Áp dụng");
    await check("SALE10", async () =>
      assert.ok((await text()).includes("1.050.300")),
    );
    await field("Mã giảm giá").fill("GIAM50K");
    await click("Áp dụng");
    await check("GIAM50K", async () =>
      assert.ok((await text()).includes("1.117.000")),
    );
    await click("Thanh toán");
    await wait();
    await click("Đăng nhập");
    await check("Login lỗi rỗng dưới ô", async () => {
      assert.ok((await text()).includes("Vui lòng nhập email"));
      assert.ok((await text()).includes("Vui lòng nhập mật khẩu"));
    });
    await field("Email").fill("abc");
    await p
      .getByLabel("Mật khẩu", { exact: true })
      .filter({ visible: true })
      .fill("123");
    await click("Đăng nhập");
    await check("Login lỗi định dạng", async () =>
      assert.ok((await text()).includes("Email không đúng định dạng")),
    );
    await field("Email").fill("demo@bookstore.vn");
    await p
      .getByLabel("Mật khẩu", { exact: true })
      .filter({ visible: true })
      .fill("saimatkhau");
    await click("Đăng nhập");
    await wait();
    await check("Login sai mật khẩu", async () =>
      assert.ok((await text()).includes("Email hoặc mật khẩu không đúng")),
    );
    await p
      .getByLabel("Hiện mật khẩu", { exact: true })
      .filter({ visible: true })
      .click();
    await check("Hiện mật khẩu", async () =>
      assert.equal(
        await p
          .getByLabel("Mật khẩu", { exact: true })
          .filter({ visible: true })
          .evaluate((el) => el.type),
        "text",
      ),
    );
    fs.mkdirSync(path.join(project, "docs/screenshots"), { recursive: true });
    await p.screenshot({
      path: path.join(project, "docs/screenshots/01-hien-mat-khau.png"),
      fullPage: true,
    });
    await p
      .getByLabel("Mật khẩu", { exact: true })
      .filter({ visible: true })
      .fill("123456");
    await click("Đăng nhập");
    await wait();
    await check("Đăng nhập trở về Checkout đúng tổng", async () =>
      assert.ok((await text()).includes("1.117.000")),
    );
    await p.reload();
    await wait();
    await click("Tài khoản");
    await check("Giữ phiên", async () =>
      assert.ok((await text()).includes("demo@bookstore.vn")),
    );
    await click("Home");
    await click("Clean Code");
    await wait();
    await click("Gửi đánh giá");
    await check("Chưa chọn sao", async () =>
      assert.ok((await text()).includes("Vui lòng chọn số sao")),
    );
    await p
      .getByLabel("5 sao", { exact: true })
      .filter({ visible: true })
      .click();
    await click("Gửi đánh giá");
    await check("Thiếu bình luận", async () =>
      assert.ok((await text()).includes("Vui lòng nhập bình luận")),
    );
    await field("Bình luận").fill("Sách rất hữu ích - kiểm thử Buổi 8");
    await click("Gửi đánh giá");
    await wait();
    await check("POST đánh giá, cập nhật trung bình", async () => {
      assert.ok((await text()).includes("4.7 (3 đánh giá)"));
      assert.ok((await text()).includes("Sách rất hữu ích - kiểm thử Buổi 8"));
    });
    await p.screenshot({
      path: path.join(project, "docs/screenshots/02-danh-gia.png"),
      fullPage: true,
    });
    await p.reload();
    await wait();
    await click("Giỏ hàng");
    await check("Giỏ lưu sau reload", async () =>
      assert.ok((await text()).includes("1.167.000")),
    );
    for (let i = 0; i < 8; i++)
      await p
        .getByLabel("Tăng", { exact: true })
        .filter({ visible: true })
        .click();
    await wait();
    await check("Chặn vượt tồn kho", async () =>
      assert.equal(
        await p
          .getByLabel("Tăng", { exact: true })
          .filter({ visible: true })
          .getAttribute("aria-disabled"),
        "true",
      ),
    );
    p.once("dialog", (d) => d.dismiss());
    await p.getByLabel("Xóa khỏi giỏ").filter({ visible: true }).click();
    await check("Hủy xóa giữ sản phẩm", async () =>
      assert.ok((await text()).includes("Clean Code")),
    );
    p.once("dialog", (d) => d.accept());
    await p.getByLabel("Xóa khỏi giỏ").filter({ visible: true }).click();
    await check("Xác nhận xóa", async () =>
      assert.ok((await text()).includes("Giỏ hàng trống")),
    );
    await click("Tài khoản");
    await click("Đăng xuất");
    await wait();
    await p.reload();
    await wait();
    await click("Tài khoản");
    await check("Đăng xuất xóa phiên", async () =>
      assert.ok((await text()).includes("Bạn chưa đăng nhập")),
    );
    await click("Đăng ký");
    await click("Đăng ký");
    await check("Đăng ký lỗi từng ô", async () => {
      assert.ok((await text()).includes("Vui lòng nhập họ tên"));
      assert.ok((await text()).includes("Vui lòng nhập lại mật khẩu"));
    });
    await field("Họ tên").fill("Người dùng kiểm thử");
    await field("Email").fill("demo@bookstore.vn");
    await p
      .getByLabel("Mật khẩu", { exact: true })
      .filter({ visible: true })
      .fill("123456");
    await p
      .getByLabel("Nhập lại mật khẩu", { exact: true })
      .filter({ visible: true })
      .fill("khongkhop");
    await click("Đăng ký");
    await check("Mật khẩu nhập lại", async () =>
      assert.ok((await text()).includes("Mật khẩu nhập lại không khớp")),
    );
    await p
      .getByLabel("Nhập lại mật khẩu", { exact: true })
      .filter({ visible: true })
      .fill("123456");
    await click("Đăng ký");
    await wait();
    await check("Email trùng", async () =>
      assert.ok((await text()).includes("Email này đã được đăng ký")),
    );
    await field("Email").fill("test" + Date.now() + "@bookstore.vn");
    await click("Đăng ký");
    await wait();
    await click("Tài khoản");
    await check("Đăng ký tự đăng nhập", async () =>
      assert.ok((await text()).includes("Người dùng kiểm thử")),
    );
    assert.deepEqual(errors, []);
    console.log("TOTAL", count, "PASS; no browser errors");
  } catch (e) {
    console.log("BODY", await text());
    throw e;
  } finally {
    await b.close();
    server.kill();
    fs.rmSync(temp, { recursive: true, force: true });
  }
})().catch((e) => {
  server.kill();
  fs.rmSync(temp, { recursive: true, force: true });
  console.error(e);
  process.exitCode = 1;
});
