import ProductsList from "./components/ProductsList/ProductsList";
import ShopingList from "./components/ShopingList/ShopingList";
import AddProducts from "./components/AddProducts/AddProducts";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import produkty from "./common/consts/produkty";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";

function App() {
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [fullProductsList, setfullProductsList] = useState(produkty);
  const [filteredProductsList, setFilteredProductsList] =
    useState(fullProductsList);

  return (
    <div className={styles.appWrapper}>
      <AddProducts sendNewProductToParent={setfullProductsList} />
      <ProductsFilters />
      <div className={styles.columnsWrapper}>
        <ProductsList
          newProductsList={filteredProductsList}
          sendAddedProductsToParent={setProductsToBuy}
        />
        <ShopingList productsToBuy={productsToBuy} />
      </div>
    </div>
  );
}

export default App;
