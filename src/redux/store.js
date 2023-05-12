import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import shoppingReducer from "./shoppingSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    shopping: shoppingReducer,
  },
});
