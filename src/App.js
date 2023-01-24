import ProductsList from "./components/ProductsList/ProductsList";
import ShopingList from "./components/ShopingList/ShopingList";
import AddProducts from "./components/AddProducts/AddProducts";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import produkty from "./common/consts/produkty";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";

function App() {
  const [fullProductsList, setfullProductsList] = useState(produkty);
  const [filteredProductsList, setFilteredProductsList] =
    useState(fullProductsList);

  return (
    <div className={styles.appWrapper}>
      <AddProducts />
      <ProductsFilters />
      <div className={styles.columnsWrapper}>
        <ProductsList newProductsList={filteredProductsList} />
        <ShopingList />
      </div>
    </div>
  );
}

export default App;
