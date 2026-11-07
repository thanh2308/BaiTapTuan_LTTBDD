import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}
const initialState: CartState = { items: [] };

const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm 1 sản phẩm; nếu đã có thì tăng số lượng (không vượt tồn kho)
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      if (action.payload.stock <= 0) return;
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) found.quantity = clamp(found.quantity + 1, found.stock);
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    // Mua lại dùng giá/tồn kho mới nhất và gộp trong một action, tránh state cũ ở UI.
    mergeReorder(state, action: PayloadAction<CartItem[]>) {
      for (const book of action.payload) {
        if (book.stock <= 0) continue;
        const found = state.items.find((i) => i.bookId === book.bookId);
        const quantity = clamp(
          (found?.quantity ?? 0) + book.quantity,
          book.stock,
        );
        if (found) Object.assign(found, book, { quantity });
        else state.items.push({ ...book, quantity });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    setQuantity(
      state,
      action: PayloadAction<{ bookId: number; quantity: number }>,
    ) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) found.quantity = clamp(action.payload.quantity, found.stock);
    },
    clearCart(state) {
      state.items = [];
    },
    // Nạp lại giỏ hàng đã lưu trong AsyncStorage
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  mergeReorder,
  removeItem,
  setQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
