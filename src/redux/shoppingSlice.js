import { createSlice } from "@reduxjs/toolkit";

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState: {
    list: [],
    selectedProduct: null,
    shoppingLoadingState: "initial",
    responseError: "",
  },
  reducers: {
    loadShoppingProducts: (state, value) => {
      state.list = value.payload;
    },
    setShoppingLoadingState: (state, value) => {
      state.shoppingLoadingState = value.payload;
    },
    setResponseError: (state, value) => {
      state.responseError = value.payload;
    },
  },
});

export const {
  loadShoppingProducts,
  setShoppingLoadingState,
  setResponseError,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
