import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import orderSlice from "./features/order/orderSlice";
import orderStatisticSlice from "./features/order/orderStatisticSlice";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import tokenSlice from "./features/login/tokenSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    user: userSlice,
    orderStatistic: orderStatisticSlice,
    token: tokenSlice,
  },
});
