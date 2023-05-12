import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import {
  loadProducts,
  setProductsLoadingState,
  setResponseErrorProduct,
} from "../../redux/productsSlice";
import axios from "axios";

function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const dispatch = useDispatch();

  const getProductsFromAPI = async (path) => {
    try {
      dispatch(setProductsLoadingState("loading"));
      const res = await axios.get(`http://localhost:9000/${path}`);
      dispatch(loadProducts(res.data));
      dispatch(setProductsLoadingState("success"));
    } catch (err) {
      dispatch(setProductsLoadingState("error"));
      dispatch(setResponseErrorProduct(err));
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button
          variant="contained"
          onClick={() => getProductsFromAPI("products")}
        >
          Załaduj produkty
        </Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
