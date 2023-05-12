import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import {
  setShoppingLoadingState,
  loadShoppingProducts,
  setResponseError,
} from "../../redux/shoppingSlice";
import { setSelectedProduct } from "../../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  setProductsLoadingState,
  setResponseErrorProduct,
} from "../../redux/productsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

function ProductsList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const productsList = useSelector((state) => state.products.filteredList);
  const loadProductStatus = useSelector(
    (state) => state.products.productsLoadingState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendItemClick = async (product) => {
    try {
      dispatch(setShoppingLoadingState("loading"));
      const res = await axios.post(
        `http://localhost:9000/products/shoppingList/new`,
        product
      );
      dispatch(loadShoppingProducts(res.data));
      dispatch(setShoppingLoadingState("success"));
      getShoppingProductsFromAPI();
    } catch (err) {
      dispatch(setShoppingLoadingState("error"));
      dispatch(setResponseError(err));
    }
  };

  const productDetails = async (e, product) => {
    try {
      e.preventDefault();
      dispatch(setProductsLoadingState("loading"));
      const res = await axios.get(
        ` http://localhost:9000/products/${product.id}`
      );
      dispatch(setSelectedProduct(res.data));
      dispatch(setProductsLoadingState("success"));
      navigate(`/products/productDetails/${product.id}`);
    } catch (err) {
      dispatch(setProductsLoadingState("error"));
      dispatch(setResponseErrorProduct(err));
    }
  };

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

  const handleKeyDown = (event, product) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(selectedIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex(selectedIndex - 1);
    } else if (event.key === "d") {
      event.preventDefault();
      productDetails(event, product);
    }
  };

  return (
    <div className={commonColumnsStyles.AppColumn}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {loadProductStatus === "loading" ? (
          <CircularProgress />
        ) : (
          productsList.map((product, currIndex) => (
            <span
              style={
                selectedIndex === currIndex
                  ? {
                      backgroundColor: "white",
                      border: "1px black solid",
                      borderRadius: "16px",
                      padding: "6px",
                    }
                  : null
              }
              tabIndex={currIndex === 0 ? 0 : null}
              onKeyDown={(event) =>
                handleKeyDown(event, productsList[selectedIndex])
              }
              onClick={() => sendItemClick(product)}
              onContextMenu={(e) => productDetails(e, product)}
            >
              {product.name} {product.id}
            </span>
          ))
        )}
        {/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */}
        {/* <span
          style={{
            
          }}
        >
          Przykładowy aktywny produkt
        </span> */}
      </header>
    </div>
  );
}

export default ProductsList;
