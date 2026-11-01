import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import auth from "./authSlice";
import wishlist from "./wishlistSlice";
import { setTokenProvider } from "../api/client";

export const store = configureStore({ reducer: { cart, auth, wishlist } });
setTokenProvider(() => store.getState().auth.token);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

