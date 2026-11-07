const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { spawn } = require("node:child_process");
const project = path.join(__dirname, "..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "bookstore9-"));
const dbFile = path.join(temp, "db.json");
fs.copyFileSync(path.join(project, "db.seed.json"), dbFile);
const base = "http://127.0.0.1:18090";
const server = spawn(process.execPath, [path.join(project, "server.cjs")], {
  cwd: project,
  env: { ...process.env, PORT: "18090", BOOKSTORE_DB: dbFile, NO_OPEN: "1" },
  stdio: "pipe",
});
const db = () => JSON.parse(fs.readFileSync(dbFile, "utf8"));
const editDb = (fn) => {
  const data = db();
  fn(data);
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
};
async function ready() {
  for (let n = 0; n < 100; n++) {
    try {
      if ((await fetch(base + "/api/books")).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw Error("Server not ready");
}
let browser;
(async () => {
  await ready();
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ["--no-sandbox"],
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  let count = 0;
  const wait = () => page.waitForTimeout(500);
  const text = () => page.locator("body").innerText();
  const click = (label) =>
    page
      .getByText(label, { exact: true })
      .filter({ visible: true })
      .last()
      .click();
  const field = (label) =>
    page.getByLabel(label, { exact: true }).filter({ visible: true });
  const check = async (label, fn) => {
    await fn();
    console.log("PASS", ++count, label);
  };
  const home = async () => {
    await page.reload();
    await page.getByText("Clean Code", { exact: true }).waitFor();
  };
  const account = async () => {
    await home();
    await click("Tài khoản");
  };
  const shot = async (name) => {
    fs.mkdirSync(path.join(project, "docs/screenshots"), { recursive: true });
    await page.screenshot({
      path: path.join(project, "docs/screenshots", name + ".png"),
      fullPage: true,
    });
  };
  try {
    await page.goto(base);
    await page.getByText("Clean Code", { exact: true }).waitFor();
    await check("Home lấy đủ 12 sách", async () =>
      assert.equal(
        await page
          .getByLabel("Yêu thích", { exact: true })
          .filter({ visible: true })
          .count(),
        12,
      ),
    );
    // Refresh must retain the existing list while reloading, then show the new API data.
    editDb((x) => (x.books[0].title = "Dế Mèn — dữ liệu làm mới"));
    await page
      .getByRole("button", { name: "Làm mới sách", exact: true })
      .click();
    await wait();
    await check("Làm mới Home tải lại dữ liệu API", async () =>
      assert.ok((await text()).includes("Dế Mèn — dữ liệu làm mới")),
    );
    await page.route("**/api/books", (r) => r.abort());
    page.once("dialog", (d) => d.accept());
    await page
      .getByRole("button", { name: "Làm mới sách", exact: true })
      .click();
    await wait();
    await check("Làm mới lỗi vẫn giữ danh sách cũ", async () =>
      assert.ok((await text()).includes("Dế Mèn — dữ liệu làm mới")),
    );
    await page.unroute("**/api/books");
    await click("Tài khoản");
    await click("Đăng nhập");
    await field("Email").fill("demo@bookstore.vn");
    await field("Mật khẩu").fill("123456");
    await click("Đăng nhập");
    await wait();
    await click("Tài khoản");
    await check("Đăng nhập và số điện thoại tài khoản", async () =>
      assert.ok((await text()).includes("0901234567")),
    );
    await click("Đơn hàng của tôi");
    await wait();
    await check("Ba đơn mẫu mới nhất ở trên", async () => {
      const t = await text();
      assert.ok(t.indexOf("Đơn #3") < t.indexOf("Đơn #2"));
      assert.ok(t.indexOf("Đơn #2") < t.indexOf("Đơn #1"));
    });
    await page.getByRole("button", { name: "Đơn #3", exact: true }).click();
    await check("Mở chi tiết đơn tại chỗ", async () => {
      assert.ok((await text()).includes("Sapiens: Lược Sử Loài Người × 1"));
      assert.ok((await text()).includes("25 Lê Lợi"));
    });
    await page.getByRole("button", { name: "Đơn #2", exact: true }).click();
    await check("Mở đơn khác đóng đơn trước", async () =>
      assert.equal(
        await page
          .getByText("Sapiens: Lược Sử Loài Người × 1", { exact: true })
          .filter({ visible: true })
          .count(),
        0,
      ),
    );
    await page.getByRole("button", { name: "Đơn #2", exact: true }).click();
    await check("Bấm lại thu gọn", async () =>
      assert.equal(
        await page
          .getByText("Giao đến", { exact: true })
          .filter({ visible: true })
          .count(),
        0,
      ),
    );
    await page
      .getByRole("button", { name: "Lọc Hoàn tất", exact: true })
      .click();
    await check("Lọc trạng thái hoàn tất", async () => {
      const t = await text();
      assert.ok(t.includes("Đơn #1"));
      assert.ok(!t.includes("Đơn #2"));
      assert.ok(!t.includes("Đơn #3"));
    });
    await shot("01-bo-loc-don-hang");
    await page.getByRole("button", { name: "Lọc Đã hủy", exact: true }).click();
    await check("Trạng thái lọc rỗng", async () =>
      assert.ok((await text()).includes("Không có đơn hàng ở trạng thái này")),
    );
    await account();
    await click("✎ Chỉnh sửa");
    await check("Email bị khóa", async () =>
      assert.equal(await field("Email (không thể đổi)").isEditable(), false),
    );
    await field("Họ tên").fill("");
    await field("Số điện thoại").fill("123");
    await click("Lưu thay đổi");
    await check("Hồ sơ validate dưới từng ô", async () => {
      const t = await text();
      assert.ok(t.includes("Vui lòng nhập họ tên"));
      assert.ok(t.includes("Số điện thoại không hợp lệ"));
    });
    await field("Họ tên").fill("Trần Văn B");
    await field("Số điện thoại").fill("0987654321");
    let profilePayload;
    page.once("request", () => {});
    const profileListener = (req) => {
      if (req.method() === "PATCH" && req.url().endsWith("/api/users/1"))
        profilePayload = req.postDataJSON();
    };
    page.on("request", profileListener);
    page.once("dialog", (d) => d.accept());
    await click("Lưu thay đổi");
    await wait();
    page.off("request", profileListener);
    await check("PATCH cập nhật tài khoản, giữ mật khẩu server", async () => {
      assert.deepEqual(profilePayload, {
        name: "Trần Văn B",
        phone: "0987654321",
      });
      assert.ok((await text()).includes("Trần Văn B"));
      assert.equal(db().users[0].password, "123456");
      const stored = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("@bookstore/auth")),
      );
      assert.equal(stored.user.password, undefined);
    });
    await shot("02-ho-so");
    await account();
    await check("Hồ sơ còn sau reload", async () =>
      assert.ok((await text()).includes("Trần Văn B")),
    );
    await click("Home");
    await click("Clean Code");
    await wait();
    await click("Thêm vào giỏ");
    await home();
    await click("Giỏ hàng");
    await click("Thanh toán");
    await wait();
    await check("Checkout điền sẵn thông tin mới", async () => {
      assert.equal(await field("Họ tên người nhận").inputValue(), "Trần Văn B");
      assert.equal(await field("Số điện thoại").inputValue(), "0987654321");
    });
    const submit = () =>
      page
        .getByText("Xác nhận đặt hàng", { exact: true })
        .filter({ visible: true });
    await check("Thiếu địa chỉ khóa nút, chưa hiện lỗi đỏ", async () => {
      assert.equal(
        await submit().locator("..").getAttribute("aria-disabled"),
        "true",
      );
      assert.ok(!(await text()).includes("Vui lòng nhập địa chỉ"));
    });
    await field("Địa chỉ").fill("12 Nguyễn Trãi, Quận 1, TP.HCM");
    await field("Số điện thoại").fill("123");
    await check("Số điện thoại sai khóa nút", async () =>
      assert.equal(
        await submit().locator("..").getAttribute("aria-disabled"),
        "true",
      ),
    );
    await field("Số điện thoại").fill("0987654321");
    await page
      .getByRole("radio", { name: "Chuyển khoản ngân hàng", exact: true })
      .click();
    await check("Chọn chuyển khoản", async () =>
      assert.equal(
        await page
          .getByRole("radio", { name: "Chuyển khoản ngân hàng", exact: true })
          .getAttribute("aria-checked"),
        "true",
      ),
    );
    await page.route("**/api/orders", (r) =>
      r.request().method() === "POST"
        ? r.fulfill({
            status: 503,
            contentType: "application/json",
            body: "{}",
          })
        : r.continue(),
    );
    await click("Xác nhận đặt hàng");
    await wait();
    await check("POST lỗi giữ giỏ và báo lỗi", async () => {
      assert.ok((await text()).includes("Máy chủ đang gặp sự cố"));
      assert.equal(db().orders.length, 3);
      const cart = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("@bookstore/cart")),
      );
      assert.equal(cart.length, 1);
    });
    await shot("03-checkout-loi");
    await page.unroute("**/api/orders");
    await shot("04-checkout");
    page.once("dialog", (d) => d.accept());
    await click("Xác nhận đặt hàng");
    await wait();
    await check("POST thành công tạo đúng đơn", async () => {
      const o = db().orders.at(-1);
      assert.equal(db().orders.length, 4);
      assert.equal(o.userId, 1);
      assert.equal(o.total, 389000);
      assert.equal(o.paymentMethod, "bank");
      assert.equal(o.status, "pending");
      assert.equal(o.address.name, "Trần Văn B");
      assert.equal(o.items[0].bookId, 3);
      assert.ok(!Number.isNaN(Date.parse(o.createdAt)));
    });
    await home();
    await click("Giỏ hàng");
    await check("Đặt thành công xóa giỏ và lưu giỏ rỗng", async () => {
      assert.ok((await text()).includes("Giỏ hàng trống"));
      assert.deepEqual(
        await page.evaluate(() =>
          JSON.parse(localStorage.getItem("@bookstore/cart")),
        ),
        [],
      );
    });
    await account();
    await page.route("**/api/orders?*", (r) => r.abort());
    await click("Đơn hàng của tôi");
    await page
      .getByText("Thử lại", { exact: true })
      .filter({ visible: true })
      .waitFor();
    await page.unroute("**/api/orders?*");
    await click("Thử lại");
    await wait();
    await check("Đơn hàng lỗi có thử lại và đơn mới đứng đầu", async () => {
      const t = await text();
      assert.ok(t.indexOf("Đơn #4") < t.indexOf("Đơn #3"));
    });
    await page.getByRole("button", { name: "Đơn #4", exact: true }).click();
    await shot("05-don-hang");
    // Reorder must use live stock/price instead of historical data.
    editDb((x) => {
      const book = x.books.find((b) => b.id === 1);
      book.price = 75000;
      book.stock = 1;
    });
    await page
      .getByRole("button", { name: "Lọc Hoàn tất", exact: true })
      .click();
    await page.getByRole("button", { name: "Đơn #1", exact: true }).click();
    page.once("dialog", (d) => d.accept());
    await click("Mua lại");
    await wait();
    await check("Mua lại dùng giá mới và chặn tồn kho", async () => {
      const cart = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("@bookstore/cart")),
      );
      const item = cart.find((i) => i.bookId === 1);
      assert.equal(item.price, 75000);
      assert.equal(item.quantity, 1);
      assert.equal(item.stock, 1);
      assert.ok((await text()).includes("Giỏ hàng"));
    });
    await account();
    editDb((x) => {
      x.notifications.find((n) => n.id === 5).read = false;
    });
    await page.route("**/api/notifications?*", (r) => r.abort());
    await click("Thông báo");
    await page
      .getByText("Thử lại", { exact: true })
      .filter({ visible: true })
      .waitFor();
    await page.unroute("**/api/notifications?*");
    await click("Thử lại");
    await wait();
    await check("Thông báo tải và thử lại khi lỗi", async () =>
      assert.ok((await text()).includes("Đơn hàng #2 đang giao")),
    );
    await shot("06-thong-bao");
    await page.route("**/api/notifications/5", async (r) => {
      await new Promise((ok) => setTimeout(ok, 300));
      await r.fulfill({
        status: 503,
        contentType: "application/json",
        body: "{}",
      });
    });
    await field("Chào mừng đến BookStore, Chưa đọc").click();
    await check("Đánh dấu đọc lạc quan ngay", async () =>
      assert.equal(await field("Chào mừng đến BookStore, Đã đọc").count(), 1),
    );
    await wait();
    await check("PATCH lỗi hoàn lại chưa đọc", async () =>
      assert.equal(await field("Chào mừng đến BookStore, Chưa đọc").count(), 1),
    );
    await page.unroute("**/api/notifications/5");
    await field("Chào mừng đến BookStore, Chưa đọc").click();
    await wait();
    await check("Thử lại lưu đã đọc trên server", async () =>
      assert.equal(db().notifications.find((n) => n.id === 5).read, true),
    );
    await field("Đơn hàng #2 đang giao, Chưa đọc").click();
    await wait();
    await check("Thông báo mở Đơn hàng", async () =>
      assert.ok((await text()).includes("Đơn #4")),
    );
    await account();
    await click("Thông báo");
    await wait();
    await field("Sách mới: Sapiens, Chưa đọc").click();
    await wait();
    await check("Thông báo mở đúng Chi tiết sách", async () =>
      assert.ok((await text()).includes("Yuval Noah Harari")),
    );
    await account();
    await click("Đăng xuất");
    await wait();
    await click("Đăng ký");
    await field("Họ tên").fill("Tài khoản mới");
    await field("Email").fill("buoi9-new@bookstore.vn");
    await field("Mật khẩu").fill("123456");
    await field("Nhập lại mật khẩu").fill("123456");
    await click("Đăng ký");
    await wait();
    await click("Tài khoản");
    await click("Đơn hàng của tôi");
    await wait();
    await check("User mới không thấy đơn của người khác", async () =>
      assert.ok((await text()).includes("Bạn chưa có đơn hàng nào")),
    );
    await account();
    await click("Thông báo");
    await wait();
    await check("Thông báo rỗng của user mới", async () =>
      assert.ok((await text()).includes("Chưa có thông báo nào")),
    );
    assert.deepEqual(errors, []);
    console.log("TOTAL", count, "PASS; no browser JavaScript errors");
  } catch (e) {
    console.error("SCREEN:", await text());
    throw e;
  }
})()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (browser) await browser.close();
    server.kill();
    fs.rmSync(temp, { recursive: true, force: true });
  });
