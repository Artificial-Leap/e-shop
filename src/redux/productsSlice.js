import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const filtered = state.cart.filter((elem) => {
        if (elem.id !== action.payload) {
          return elem;
        }
      });
      state.cart = filtered;
    },

    getProducts: (state, action) => {
      state.products = action.payload;
    },

    changeQuantity: (state, action) => {
      state.cart.forEach((elem) => {
        if (elem.id === action.payload.id) {
          elem.quantity = action.payload.quantity;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, getProducts, changeQuantity } =
  productsSlice.actions;

export default productsSlice.reducer;
