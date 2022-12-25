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
      let sizeAlreadyAdded = false;
      let idxSize = null;
      state.cart.forEach((elem, idx) => {
        if (
          elem.id === action.payload.id &&
          elem.size === action.payload.size
        ) {
          idxSize = idx;
          sizeAlreadyAdded = true;
        }
      });
      if (sizeAlreadyAdded) {
        state.cart[idxSize].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
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
        if (
          elem.id === action.payload.id &&
          elem.size === action.payload.size
        ) {
          elem.quantity = action.payload.quantity;
        }
      });
    },
    changeSize: (state, action) => {
      state.cart.forEach((elem) => {
        if (elem.id === action.payload.id) {
          elem.size = action.payload.size;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  getProducts,
  changeQuantity,
  changeSize,
} = productsSlice.actions;

export default productsSlice.reducer;
