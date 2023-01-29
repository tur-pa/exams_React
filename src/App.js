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

  //UPDATE PRODUCTLIST WHENEVER WE ADD NEW ONE
  useEffect(() => {
    setFilteredProductsList(fullProductsList);
  }, [fullProductsList]);

  return (
    <>
      <div className={styles.appWrapper}>
        {console.log(filteredProductsList)}
        <div className={styles.LeftPanel}>
          <AddProducts sendNewProductToParent={setfullProductsList} />
        </div>
        <div className={styles.RightPanel}>
          <ProductsFilters
            productsToFilter={fullProductsList}
            sendFilteredNazwaToParentComponent={setFilteredProductsList}
          />
        </div>
      </div>
      <div className={styles.columnsWrapper}>
        <ProductsList
          newProductsList={filteredProductsList}
          sendAddedProductsToParent={setProductsToBuy}
        />
        <ShopingList productsToBuy={productsToBuy} />
      </div>
    </>
  );
}

export default App;
