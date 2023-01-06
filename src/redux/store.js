import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./productsSlice";
import UserReducer from "./userSlice";
import TranslateReducer from "./translateSlice";
export const store = configureStore({
  reducer: {
    products: ProductReducer,
    user: UserReducer,
    language: TranslateReducer,
  },
});
