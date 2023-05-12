import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filteredList: [],
    selectedProduct: null,
    productsLoadingState: "initial",
    responseErrorProduct: "",
  },
  reducers: {
    loadProducts: (state, value) => {
      state.list = value.payload;
      state.filteredList = state.list;
    },
    setSelectedProduct: (state, value) => {
      state.selectedProduct = value.payload;
    },
    setProductsLoadingState: (state, value) => {
      state.productsLoadingState = value.payload;
    },
    setResponseErrorProduct: (state, value) => {
      state.responseErrorProduct = value.payload;
    },
    filterProducts: (state, value) => {
      state.filteredList = state.list.filter((currProd) =>
        currProd.name.includes(value.payload.filteredProd.toLowerCase())
      );
      if (value.payload.isFood) {
        state.filteredList = state.list.filter((currProd) => currProd.isFood);
      }
    },
  },
});

export const {
  loadProducts,
  setSelectedProduct,
  setProductsLoadingState,
  setResponseErrorProduct,
  filterProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
