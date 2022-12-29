import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./productsSlice";
import UserReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    products: ProductReducer,
    user: UserReducer,
  },
});
