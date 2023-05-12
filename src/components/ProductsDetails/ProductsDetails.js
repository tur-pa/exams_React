import React, { useEffect, useRef } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ProductDetails() {
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.products.selectedProduct);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  const handleKeyDown = (event) => {
    event.preventDefault();
    if (event.key === "Backspace") {
      navigate(-1);
    }
  };
  return (
    <div className={commonColumnsStyles.AppColumn}>
      <ArrowBackIcon
        onClick={() => navigate(-1)}
        ref={ref}
        tabIndex={-1}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products Details</p>
        <span>Nazwa: {productDetails.name}</span>
        <span>Kategoria: {productDetails.category}</span>
        <span>Jedzenie?: {productDetails.isFood ? "tak" : "nie"}</span>
      </header>
    </div>
  );
}
export default ProductDetails;
