const fs = require("node:fs");
const ts = require("typescript");
const test = require("node:test");
const assert = require("node:assert/strict");
require.extensions[".ts"] = (module, filename) => {
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText,
    filename,
  );
};
const { filterBooks, normalize } = require("../src/utils/filters.ts");
const { books } = require("../db.json");
const cartModule = require("../src/store/cartSlice.ts");
const authModule = require("../src/store/authSlice.ts");
const wishlistModule = require("../src/store/wishlistSlice.ts");
const base = { keyword: "", categoryId: null, priceRange: null };
test("Tìm kiếm tiếng Việt không dấu, chữ hoa và tác giả", () => {
  assert.equal(normalize("  ĐẮC NHÂN TÂM  "), "dac nhan tam");
  assert.ok(
    filterBooks(books, { ...base, keyword: "nha gia" }).some(
      (b) => b.title === "Nhà Giả Kim",
    ),
  );
  assert.ok(
    filterBooks(books, { ...base, keyword: "DAC NHAN" }).some(
      (b) => b.title === "Đắc Nhân Tâm",
    ),
  );
  assert.ok(
    filterBooks(books, { ...base, keyword: books[0].author }).some(
      (b) => b.id === books[0].id,
    ),
  );
  assert.equal(filterBooks(books, { ...base, keyword: "zzzzzzzz" }).length, 0);
});
test("Lọc AND và ranh giới khoảng giá", () => {
  const result = filterBooks(books, {
    ...base,
    keyword: "react",
    categoryId: books.find((b) => b.title.includes("React Native")).categoryId,
  });
  assert.equal(result.length, 1);
  const samples = [99999, 100000, 300000, 300001].map((price, i) => ({
    ...books[0],
    id: i,
    price,
  }));
  assert.deepEqual(
    filterBooks(samples, { ...base, priceRange: "lt100" }).map((b) => b.price),
    [99999],
  );
  assert.deepEqual(
    filterBooks(samples, { ...base, priceRange: "100to300" }).map(
      (b) => b.price,
    ),
    [100000, 300000],
  );
  assert.deepEqual(
    filterBooks(samples, { ...base, priceRange: "gt300" }).map((b) => b.price),
    [300001],
  );
  assert.equal(filterBooks(books, base).length, 12);
});
test("Giỏ hàng bất biến, gộp sách và chặn vượt tồn kho", () => {
  const {
    default: reducer,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  } = cartModule;
  const book = {
    bookId: 1,
    title: "Clean Code",
    price: 450000,
    emoji: "",
    color: "",
    stock: 5,
  };
  const initial = reducer(undefined, { type: "@@init" });
  let state = reducer(initial, addItem(book));
  for (let i = 0; i < 8; i++) state = reducer(state, addItem(book));
  assert.equal(initial.items.length, 0);
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].quantity, 5);
  state = reducer(state, setQuantity({ bookId: 1, quantity: -9 }));
  assert.equal(state.items[0].quantity, 1);
  state = reducer(state, addItem({ ...book, bookId: 2, price: 389000 }));
  assert.equal(
    state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    839000,
  );
  state = reducer(state, removeItem(1));
  assert.deepEqual(
    state.items.map((i) => i.bookId),
    [2],
  );
  assert.equal(reducer(state, clearCart()).items.length, 0);
  assert.equal(
    reducer(initial, addItem({ ...book, stock: 0 })).items.length,
    0,
  );
});
test("Đăng nhập, sửa tài khoản và đăng xuất", () => {
  const { default: reducer, setCredentials, updateUser, logout } = authModule;
  let state = reducer(
    undefined,
    setCredentials({
      user: { id: 1, name: "Demo", email: "demo@bookstore.vn" },
      token: "fake-token",
    }),
  );
  assert.ok(state.user && state.token);
  state = reducer(state, updateUser({ name: "Thanh" }));
  assert.equal(state.user.name, "Thanh");
  assert.deepEqual(reducer(state, logout()), { user: null, token: null });
});
test("Yêu thích bật/tắt không tạo bản sao ID", () => {
  const { default: reducer, toggleWishlist } = wishlistModule;
  let state = reducer(undefined, toggleWishlist(3));
  assert.deepEqual(state.ids, [3]);
  state = reducer(state, toggleWishlist(3));
  assert.deepEqual(state.ids, []);
});

const {
  validateEmail,
  validatePassword,
  validateRequired,
} = require("../src/utils/validators.ts");
test("Validation: rỗng, định dạng và mật khẩu sáu ký tự", () => {
  assert.equal(validateEmail("  "), "Vui lòng nhập email");
  assert.ok(validateEmail("abc"));
  assert.equal(validateEmail(" demo@bookstore.vn "), null);
  assert.ok(validatePassword(""));
  assert.ok(validatePassword("12345"));
  assert.equal(validatePassword("123456"), null);
  assert.ok(validateRequired("họ tên")("  "));
  assert.equal(validateRequired("họ tên")("Thanh"), null);
});
test("Hydrate giỏ hàng và yêu thích trước khi lưu tiếp", () => {
  const saved = [
    {
      bookId: 3,
      title: "Clean Code",
      quantity: 4,
      stock: 5,
      price: 389000,
      emoji: "",
      color: "",
    },
  ];
  let cart = cartModule.default(undefined, cartModule.hydrateCart(saved));
  assert.equal(cart.items[0].quantity, 4);
  cart = cartModule.default(
    cart,
    cartModule.setQuantity({ bookId: 3, quantity: 100 }),
  );
  assert.equal(cart.items[0].quantity, 5);
  const wish = wishlistModule.default(
    undefined,
    wishlistModule.hydrateWishlist([3, 5]),
  );
  assert.deepEqual(wish.ids, [3, 5]);
  assert.deepEqual(
    wishlistModule.default(wish, wishlistModule.toggleWishlist(3)).ids,
    [5],
  );
});

test("Mua lại gộp số lượng và dùng giá/tồn kho mới nhất", () => {
  const book = {
    bookId: 1,
    title: "Sách cũ",
    quantity: 3,
    stock: 20,
    price: 100000,
    emoji: "",
    color: "",
  };
  const current = cartModule.default(undefined, cartModule.hydrateCart([book]));
  const next = cartModule.default(
    current,
    cartModule.mergeReorder([
      { ...book, title: "Sách mới", stock: 4, price: 120000, quantity: 5 },
      { ...book, bookId: 2, stock: 0, quantity: 1 },
    ]),
  );
  assert.equal(next.items.length, 1);
  assert.equal(next.items[0].quantity, 4);
  assert.equal(next.items[0].price, 120000);
  assert.equal(next.items[0].title, "Sách mới");
  assert.equal(current.items[0].quantity, 3);
});
