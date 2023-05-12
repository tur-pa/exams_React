import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  loadShoppingProducts,
  setShoppingLoadingState,
  setResponseError,
} from "../../redux/shoppingSlice";
import axios from "axios";
import React, { useEffect } from "react";

function ShoppingList() {
  const shoppingList = useSelector((state) => state.shopping.list);
  const loadStatus = useSelector(
    (state) => state.shopping.shoppingLoadingState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getShoppingProductsFromAPI();
  }, []);

  const getShoppingProductsFromAPI = async () => {
    try {
      dispatch(setShoppingLoadingState("loading"));
      const res = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadShoppingProducts(res.data));
      dispatch(setShoppingLoadingState("success"));
    } catch (err) {
      dispatch(setShoppingLoadingState("error"));
      dispatch(setResponseError(err));
    }
  };

  const deleteItemClick = async (id) => {
    try {
      dispatch(setShoppingLoadingState("loading"));
      const res = await axios.delete(
        `http://localhost:9000/products/shoppingList/${id}`
      );
      dispatch(loadShoppingProducts(res.data));
      dispatch(setShoppingLoadingState("success"));
      getShoppingProductsFromAPI();
    } catch (err) {
      dispatch(setShoppingLoadingState("error"));
      dispatch(setResponseError(err));
    }
  };

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p onClick={() => getShoppingProductsFromAPI()}>Shopping List</p>
        {loadStatus === "loading" ? (
          <CircularProgress />
        ) : shoppingList.length > 0 ? (
          shoppingList.map((product, id) => (
            <span onClick={() => deleteItemClick(product.id)}>
              {product.name} {id + 1}
            </span>
          ))
        ) : (
          "no products on shopping list"
        )}
      </header>
    </div>
  );
}

export default ShoppingList;
