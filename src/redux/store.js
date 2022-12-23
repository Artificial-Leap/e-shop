import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./productsSlice";
export const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
});
